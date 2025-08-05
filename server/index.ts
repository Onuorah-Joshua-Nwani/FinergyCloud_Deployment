import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Request timeout middleware to ensure fast responses
app.use((req, res, next) => {
  // Set a 30-second timeout for all requests
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      console.error(`Request timeout: ${req.method} ${req.path}`);
      res.status(408).json({ 
        message: 'Request timeout',
        status: 408 
      });
    }
  }, 30000);

  // Clear timeout when response finishes
  res.on('finish', () => {
    clearTimeout(timeout);
  });

  next();
});

// Domain redirect middleware - ensure all traffic goes to correct domain
app.use((req, res, next) => {
  const host = req.get('host');
  if (host && host.startsWith('www.')) {
    const redirectUrl = `https://${host.substring(4)}${req.originalUrl}`;
    console.log(`Redirecting from ${host} to ${host.substring(4)}`);
    return res.redirect(301, redirectUrl);
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Set default environment if not specified
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }
    
    console.log('Starting FinergyCloud server...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('SESSION_SECRET available:', !!process.env.SESSION_SECRET);
    console.log('DATABASE_URL available:', !!process.env.DATABASE_URL);
    
    const server = await registerRoutes(app);

    // Comprehensive error handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error('Express error:', {
        error: err,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
      });
      
      // Don't send stack traces in production
      const errorResponse = process.env.NODE_ENV === 'production' 
        ? { message, status }
        : { message, status, stack: err.stack };
      
      res.status(status).json(errorResponse);
    });

    // Handle 404 errors for API routes
    app.use('/api/*', (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ 
        message: `API endpoint ${req.path} not found`,
        status: 404
      });
    });

    // Catch unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Promise Rejection:', reason);
      console.error('Promise:', promise);
    });

    // Catch uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      console.error('Stack:', err.stack);
      // Don't exit in production, just log
      if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
      }
    });

    // For development, serve content directly without requiring full build
    if (process.env.NODE_ENV === "production") {
      try {
        // Try multiple paths for production static files
        const path = await import("path");
        const fs = await import("fs");
        
        const possiblePaths = [
          path.resolve(process.cwd(), "dist", "public"),
          path.resolve(process.cwd(), "public"),
          path.resolve(import.meta.dirname, "public")
        ];
        
        let staticPath = null;
        for (const testPath of possiblePaths) {
          console.log('Testing static path:', testPath);
          if (fs.existsSync(testPath)) {
            staticPath = testPath;
            console.log('Found static files at:', staticPath);
            break;
          }
        }
        
        if (staticPath) {
          // Serve static files
          const express = await import("express");
          app.use(express.static(staticPath));
          
          // Serve index.html for all non-API routes
          app.use("*", (_req, res) => {
            res.sendFile(path.resolve(staticPath, "index.html"));
          });
          
          console.log('Production static files served from:', staticPath);
        } else {
          console.log("No static files found, trying vite serve");
          setupVite(app, server);
        }
      } catch (error: any) {
        console.log("Production build error:", error.message);
        console.log("Falling back to development mode");
        setupVite(app, server);
      }
    } else {
      // Development mode - use Vite for frontend serving
      // Override process.exit to prevent Vite from killing the server
      const originalExit = process.exit;
      process.exit = ((code?: number) => {
        console.log(`Prevented process.exit(${code}) - keeping server alive`);
        return {} as never;
      }) as any;
      
      try {
        setupVite(app, server);
      } catch (error: any) {
        console.error('Vite setup error:', error.message);
        // Restore original process.exit after Vite setup
        process.exit = originalExit;
      }
    }

    // Use Railway's PORT or fallback to 5000 for local development
    const port = Number(process.env.PORT || 5000);
    const host = "0.0.0.0";
    
    server.listen(port, host, () => {
      log(`FinergyCloud serving on ${host}:${port}`);
      console.log('Server started successfully');
      console.log(`Access the application at: http://localhost:${port}`);
      console.log(`Mobile app: http://localhost:${port}/?platform=mobile`);
      console.log(`Health check: http://localhost:${port}/api/health`);
      
      // Signal to Replit that server is ready
      console.log(`\n🟢 REPLIT SERVER READY ON PORT ${port} 🟢`);
      if (process.env.REPLIT_DEV_DOMAIN) {
        console.log(`Preview URL: https://${process.env.REPLIT_DEV_DOMAIN}`);
      }
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
    
  } catch (error: any) {
    console.error('Failed to start server:', error);
    console.error('Error stack:', error.stack);
    
    // Don't exit immediately, try to provide some debugging info
    if (error.message && error.message.includes('Cannot resolve module')) {
      console.error('Module resolution error - check imports and dependencies');
    }
    if (error.message && error.message.includes('TypeScript')) {
      console.error('TypeScript compilation error - check syntax');
    }
    
    console.error('Server startup failed, exiting...');
    process.exit(1);
  }
})();
