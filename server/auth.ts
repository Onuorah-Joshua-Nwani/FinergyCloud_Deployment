import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
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
        email: email,
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
      res.json({ user: demoUser, message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      // Demo user for GitHub version
      const demoUser = {
        id: '17743017',
        email: email,
        firstName: firstName || 'Joshua',
        lastName: lastName || 'Nwani',
        profileImageUrl: null,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        subscriptionStatus: 'active',
        subscriptionPlan: 'free',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (req.session as any).user = demoUser;
      res.json({ user: demoUser, message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logout successful' });
    });
  });

  // GET route for login redirect
  app.get('/api/login', (req, res) => {
    res.redirect('/login');
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if ((req.session as any)?.user) {
    req.user = (req.session as any).user;
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};