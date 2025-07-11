# Railway 502 Complete Debug Guide

## Files Updated for Better Error Handling

### 1. server/index.ts (Enhanced startup logging)
- Added comprehensive startup logging
- Added server error handling
- Added process exit on server failures
- Added environment variable checks

### 2. server/auth.ts (Safer session handling)
- Added try-catch for session store creation
- Added logging for session store type
- Always falls back to memory store on any error

## Copy These Updated Files to GitHub:

### Updated server/index.ts:
```javascript
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

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Use Railway's PORT or fallback to 5000 for local development
    const port = process.env.PORT || 5000;
    server.listen({
      port: Number(port),
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`FinergyCloud serving on port ${port}`);
      console.log('Server started successfully');
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
```

### Updated server/auth.ts:
```javascript
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import memorystore from "memorystore";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  let sessionStore;
  try {
    if (process.env.DATABASE_URL) {
      // Use PostgreSQL if available
      const pgStore = connectPg(session);
      sessionStore = new pgStore({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: false,
        ttl: sessionTtl,
        tableName: "sessions",
      });
      console.log('Using PostgreSQL session store');
    } else {
      throw new Error('No DATABASE_URL, using memory store');
    }
  } catch (error) {
    // Always fallback to memory store on any database error
    console.log('Using memory session store:', error.message);
    const MemoryStore = memorystore(session);
    sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }
  
  return session({
    secret: process.env.SESSION_SECRET || "your-secret-key-here",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Simple demo authentication routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Demo user for GitHub version
      const demoUser = {
        id: '17743017',
        email: 'demo@finergycloud.com',
        firstName: 'Joshua',
        lastName: 'Nwani',
        profileImageUrl: null,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        subscriptionStatus: 'active',
        subscriptionPlan: 'basic',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (req.session as any).user = demoUser;
      res.json(demoUser);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    (req.session as any).user = null;
    res.json({ message: 'Logged out successfully' });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if ((req.session as any)?.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
```

## Next Steps:

1. **Update these files on GitHub**
2. **Push changes**
3. **Check Railway logs** after deployment

The enhanced logging will show exactly what's happening during startup and help identify the 502 cause.