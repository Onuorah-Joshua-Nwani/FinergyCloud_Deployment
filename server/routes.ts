import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPredictionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
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

  const httpServer = createServer(app);
  return httpServer;
}
