import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { insertPredictionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for Railway
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Setup authentication middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', async (req: any, res, next) => {
    try {
      // Check if user is already authenticated
      if ((req.session as any)?.user) {
        return res.json((req.session as any).user);
      }
      
      // Auto-authenticate for demo
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
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Subscription routes
  app.get('/api/subscription/status', isAuthenticated, async (req: any, res, next) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        plan: user.subscriptionPlan || 'free',
        status: user.subscriptionStatus || 'inactive',
        startDate: user.subscriptionStartDate,
        endDate: user.subscriptionEndDate,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
      });
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      res.status(500).json({ message: "Failed to fetch subscription status" });
    }
  });

  app.post('/api/subscription/create', isAuthenticated, async (req: any, res, next) => {
    try {
      const userId = req.user.id;
      const { planId, successUrl, cancelUrl } = req.body;

      // Validate plan ID
      const validPlans = ['free', 'basic', 'premium'];
      if (!validPlans.includes(planId)) {
        return res.status(400).json({ message: "Invalid plan ID" });
      }

      // For free plan, just update the user's subscription
      if (planId === 'free') {
        await storage.updateUserSubscription(userId, {
          subscriptionPlan: 'free',
          subscriptionStatus: 'active',
          subscriptionStartDate: new Date(),
        });
        
        return res.json({ 
          message: 'Free plan activated successfully',
          redirectUrl: successUrl || '/dashboard'
        });
      }

      // For premium plans, simulate Stripe checkout
      const mockCheckoutSession = {
        id: 'mock_checkout_session_' + Date.now(),
        url: `/api/subscription/success?session_id=mock_${Date.now()}&plan=${planId}`,
        customer: userId,
        subscription: {
          id: 'mock_subscription_' + Date.now(),
          status: 'active',
          current_period_start: new Date(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      };

      res.json({ 
        checkoutUrl: mockCheckoutSession.url,
        sessionId: mockCheckoutSession.id
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  app.get('/api/subscription/success', async (req: any, res, next) => {
    try {
      const { session_id, plan } = req.query;
      
      if (!session_id || !plan) {
        return res.status(400).json({ message: "Missing session_id or plan" });
      }

      // In a real app, verify the session with Stripe
      const userId = req.user?.id || 'demo_user';
      
      await storage.updateUserSubscription(userId, {
        subscriptionPlan: plan as string,
        subscriptionStatus: 'active',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        stripeSubscriptionId: session_id as string,
      });

      res.json({ 
        message: 'Subscription activated successfully',
        plan: plan,
        status: 'active'
      });
    } catch (error) {
      console.error("Error processing subscription success:", error);
      res.status(500).json({ message: "Failed to process subscription" });
    }
  });

  // Projects routes
  app.get('/api/projects', async (req, res, next) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', async (req, res, next) => {
    try {
      const result = insertPredictionSchema.omit({ id: true }).safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid project data", errors: result.error.issues });
      }
      
      const project = await storage.createProject(result.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Predictions routes
  app.get('/api/predictions', async (req, res, next) => {
    try {
      const predictions = await storage.getPredictions();
      res.json(predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      res.status(500).json({ message: "Failed to fetch predictions" });
    }
  });

  app.post('/api/predictions', async (req, res, next) => {
    try {
      const result = insertPredictionSchema.omit({ id: true }).safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid prediction data", errors: result.error.issues });
      }
      
      const prediction = await storage.createPrediction(result.data);
      res.status(201).json(prediction);
    } catch (error) {
      console.error("Error creating prediction:", error);
      res.status(500).json({ message: "Failed to create prediction" });
    }
  });

  // ESG metrics routes
  app.get('/api/esg-metrics', async (req, res, next) => {
    try {
      const metrics = await storage.getEsgMetrics();
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching ESG metrics:", error);
      res.status(500).json({ message: "Failed to fetch ESG metrics" });
    }
  });

  app.get('/api/esg-metrics/:projectId', async (req, res, next) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const metrics = await storage.getEsgMetricsByProjectId(projectId);
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching ESG metrics:", error);
      res.status(500).json({ message: "Failed to fetch ESG metrics" });
    }
  });

  // Market insights routes
  app.get('/api/market-insights', async (req, res, next) => {
    try {
      const insights = await storage.getMarketInsights();
      res.json(insights);
    } catch (error) {
      console.error("Error fetching market insights:", error);
      res.status(500).json({ message: "Failed to fetch market insights" });
    }
  });

  // Project type ESG templates
  app.get('/api/esg-templates', async (req, res, next) => {
    try {
      const templates = await storage.getProjectTypeEsgTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching ESG templates:", error);
      res.status(500).json({ message: "Failed to fetch ESG templates" });
    }
  });

  app.get('/api/esg-templates/:projectType', async (req, res, next) => {
    try {
      const projectType = req.params.projectType;
      const template = await storage.getProjectTypeEsgTemplate(projectType);
      res.json(template);
    } catch (error) {
      console.error("Error fetching ESG template:", error);
      res.status(500).json({ message: "Failed to fetch ESG template" });
    }
  });

  // Reward system routes
  app.get('/api/rewards/stats/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const stats = await storage.getUserRewardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching reward stats:", error);
      res.status(500).json({ message: "Failed to fetch reward stats" });
    }
  });

  app.get('/api/rewards/achievements/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get('/api/rewards/challenges', async (req, res, next) => {
    try {
      const challenges = await storage.getActiveChallenges();
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  const server = createServer(app);
  return server;
}