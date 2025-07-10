import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./auth";
import { insertPredictionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', async (req: any, res) => {
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
  app.get('/api/subscription/status', isAuthenticated, async (req: any, res) => {
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

  app.post('/api/subscription/create', isAuthenticated, async (req: any, res) => {
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
          success: true,
          message: "Successfully switched to free plan"
        });
      }

      // For paid plans, simulate Stripe checkout
      // In a real implementation, you would:
      // 1. Create or retrieve Stripe customer
      // 2. Create Stripe checkout session
      // 3. Return checkout URL

      // Dummy implementation - simulate successful subscription
      const mockStripeCustomerId = `cus_mock_${userId}_${Date.now()}`;
      const mockStripeSubscriptionId = `sub_mock_${userId}_${Date.now()}`;
      
      await storage.updateUserSubscription(userId, {
        stripeCustomerId: mockStripeCustomerId,
        stripeSubscriptionId: mockStripeSubscriptionId,
        subscriptionPlan: planId,
        subscriptionStatus: 'active',
        subscriptionStartDate: new Date(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });

      // Simulate checkout URL (in real implementation, this would be from Stripe)
      const mockCheckoutUrl = `${successUrl}?session_id=mock_session_${Date.now()}`;

      res.json({
        checkoutUrl: mockCheckoutUrl,
        sessionId: `mock_session_${Date.now()}`,
      });

    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });

  app.post('/api/subscription/cancel', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;

      await storage.updateUserSubscription(userId, {
        subscriptionStatus: 'canceled',
        subscriptionPlan: 'free',
        subscriptionEndDate: new Date(),
      });

      res.json({ success: true, message: "Subscription canceled successfully" });
    } catch (error) {
      console.error("Error canceling subscription:", error);
      res.status(500).json({ message: "Failed to cancel subscription" });
    }
  });
  
  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Predictions routes
  app.post("/api/predictions", async (req, res) => {
    try {
      const validatedData = insertPredictionSchema.parse(req.body);
      const prediction = await storage.createPrediction(validatedData);
      res.json(prediction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create prediction" });
    }
  });

  app.get("/api/predictions", async (req, res) => {
    try {
      const predictions = await storage.getPredictions();
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch predictions" });
    }
  });

  // ESG metrics routes
  app.get("/api/esg-metrics", async (req, res) => {
    try {
      const metrics = await storage.getEsgMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ESG metrics" });
    }
  });

  app.get("/api/esg-metrics/project/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const metrics = await storage.getEsgMetricsByProjectId(projectId);
      if (!metrics) {
        return res.status(404).json({ message: "ESG metrics not found" });
      }
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ESG metrics" });
    }
  });

  // Market insights routes
  app.get("/api/market-insights", async (req, res) => {
    try {
      const insights = await storage.getMarketInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market insights" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, company, inquiryType, subject, message, investmentRange, preferredContact } = req.body;
      
      // Log the contact form submission (in production, you would send emails, store in DB, etc.)
      console.log("Contact form submission:", {
        name,
        email,
        company,
        inquiryType,
        subject,
        message,
        investmentRange,
        preferredContact,
        timestamp: new Date().toISOString()
      });
      
      // Simulate successful submission
      res.json({ 
        success: true, 
        message: "Thank you for your inquiry. We'll get back to you within 24 hours." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Sorry, there was an error sending your message. Please try again." 
      });
    }
  });

  // Project type ESG template routes
  app.get("/api/project-type-esg-templates", async (req, res) => {
    try {
      const templates = await storage.getProjectTypeEsgTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project type ESG templates" });
    }
  });

  app.get("/api/project-type-esg-templates/:projectType", async (req, res) => {
    try {
      const { projectType } = req.params;
      const template = await storage.getProjectTypeEsgTemplate(projectType);
      if (!template) {
        return res.status(404).json({ message: "ESG template not found for project type" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project type ESG template" });
    }
  });

  // Dashboard metrics endpoint
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      const esgMetrics = await storage.getEsgMetrics();
      
      const totalValue = projects.reduce((sum, p) => sum + (p.capacity * 1000000), 0);
      const avgIrr = projects.reduce((sum, p) => sum + p.irr, 0) / projects.length;
      const avgEsg = esgMetrics.reduce((sum, e) => sum + e.overall, 0) / esgMetrics.length;
      const lowRiskProjects = projects.filter(p => p.riskLevel === "low").length;
      const riskLevel = lowRiskProjects / projects.length > 0.7 ? "Low" : "Medium";

      res.json({
        averageIRR: Math.round(avgIrr * 10) / 10,
        esgScore: Math.round(avgEsg * 10) / 10,
        analyzedValue: `₦${Math.round(totalValue / 1000000)}M+`,
        riskLevel
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard metrics" });
    }
  });

  // Micro-Reward System endpoints
  app.get("/api/rewards/stats", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const stats = await storage.getUserRewardStats(userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reward stats" });
    }
  });

  app.get("/api/rewards/achievements", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  app.get("/api/rewards/activities", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const activities = await storage.getUserRewardActivities(userId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reward activities" });
    }
  });

  app.get("/api/rewards/challenges", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const [challenges, progress] = await Promise.all([
        storage.getActiveChallenges(),
        storage.getUserChallengeProgress(userId)
      ]);
      
      const challengesWithProgress = challenges.map(challenge => {
        const userProgress = progress.find(p => p.challengeId === challenge.id);
        return {
          ...challenge,
          userProgress: userProgress || {
            progress: 0,
            completed: false,
            rewardClaimed: false
          }
        };
      });
      
      res.json(challengesWithProgress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  app.post("/api/rewards/activity", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { activityType, description, points, xpGained, metadata } = req.body;
      
      const activity = await storage.addRewardActivity({
        userId,
        activityType,
        description,
        points,
        xpGained,
        metadata
      });
      
      // Update user stats
      const currentStats = await storage.getUserRewardStats(userId);
      const newPoints = currentStats.sustainabilityPoints + points;
      const newXp = currentStats.xp + xpGained;
      const newLevel = Math.floor(newXp / 1000) + 1;
      
      await storage.updateUserRewardStats(userId, {
        sustainabilityPoints: newPoints,
        xp: newXp,
        level: newLevel
      });
      
      // Check for new achievements
      const newAchievements = await storage.checkAndUnlockAchievements(userId);
      
      res.json({
        activity,
        newAchievements,
        updatedStats: {
          sustainabilityPoints: newPoints,
          xp: newXp,
          level: newLevel
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add reward activity" });
    }
  });

  app.post("/api/rewards/claim-challenge", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { challengeId } = req.body;
      
      const progress = await storage.updateChallengeProgress(userId, challengeId, 1.0);
      
      res.json({
        success: true,
        progress
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to claim challenge reward" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
