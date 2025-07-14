import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error('Express error:', err);
      res.status(status).json({ message });
    });

    // For development, serve content directly without requiring full build
    if (process.env.NODE_ENV === "production") {
      try {
        serveStatic(app);
      } catch (error) {
        console.log("Production build not available, serving development content");
        setupVite(app, server);
      }
    } else {
      // Development mode - use Vite for frontend serving
      setupVite(app, server);
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
    
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error('Error stack:', error.stack);
    
    // Don't exit immediately, try to provide some debugging info
    if (error.message.includes('Cannot resolve module')) {
      console.error('Module resolution error - check imports and dependencies');
    }
    if (error.message.includes('TypeScript')) {
      console.error('TypeScript compilation error - check syntax');
    }
    
    console.error('Server startup failed, exiting...');
    process.exit(1);
  }
})();
