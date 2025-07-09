import { 
  projects, 
  predictions, 
  esgMetrics, 
  marketInsights,
  type Project, 
  type InsertProject,
  type Prediction,
  type InsertPrediction,
  type EsgMetrics,
  type InsertEsgMetrics,
  type MarketInsight,
  type InsertMarketInsight
} from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Predictions
  getPredictions(): Promise<Prediction[]>;
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  
  // ESG Metrics
  getEsgMetrics(): Promise<EsgMetrics[]>;
  getEsgMetricsByProjectId(projectId: number): Promise<EsgMetrics | undefined>;
  createEsgMetrics(metrics: InsertEsgMetrics): Promise<EsgMetrics>;
  
  // Market Insights
  getMarketInsights(): Promise<MarketInsight[]>;
  createMarketInsight(insight: InsertMarketInsight): Promise<MarketInsight>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private predictions: Map<number, Prediction>;
  private esgMetrics: Map<number, EsgMetrics>;
  private marketInsights: Map<number, MarketInsight>;
  private currentProjectId: number;
  private currentPredictionId: number;
  private currentEsgId: number;
  private currentInsightId: number;

  constructor() {
    this.projects = new Map();
    this.predictions = new Map();
    this.esgMetrics = new Map();
    this.marketInsights = new Map();
    this.currentProjectId = 1;
    this.currentPredictionId = 1;
    this.currentEsgId = 1;
    this.currentInsightId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed projects
    const project1: Project = {
      id: this.currentProjectId++,
      name: "Lagos Solar Farm",
      type: "solar",
      location: "lagos",
      capacity: 5.0,
      status: "active",
      irr: 16.8,
      esgScore: 8.9,
      riskLevel: "low",
      createdAt: new Date("2024-01-15")
    };
    
    const project2: Project = {
      id: this.currentProjectId++,
      name: "Abuja Wind Project",
      type: "wind",
      location: "abuja",
      capacity: 2.5,
      status: "pending",
      irr: 14.5,
      esgScore: 8.2,
      riskLevel: "medium",
      createdAt: new Date("2024-02-01")
    };

    this.projects.set(project1.id, project1);
    this.projects.set(project2.id, project2);

    // Seed ESG metrics
    const esg1: EsgMetrics = {
      id: this.currentEsgId++,
      projectId: project1.id,
      environmental: 8.7,
      social: 8.1,
      governance: 8.4,
      overall: 8.4,
      co2Reduction: 2450,
      cleanEnergyGenerated: 12.5,
      waterSaved: 890000,
      jobsCreated: 156,
      communitiesServed: 8,
      educationPrograms: 4,
      createdAt: new Date()
    };

    this.esgMetrics.set(esg1.id, esg1);

    // Seed market insights
    const insight1: MarketInsight = {
      id: this.currentInsightId++,
      title: "The AI Revolution in Renewable Energy Investment",
      date: new Date("2024-12-15"),
      excerpt: "Discover how artificial intelligence is transforming renewable energy investment decisions and why traditional models are failing.",
      content: null,
      author: "FinergyCloud Research Team",
      createdAt: new Date()
    };

    const insight2: MarketInsight = {
      id: this.currentInsightId++,
      title: "ESG Scoring Revolution: Making Sustainability Measurable",
      date: new Date("2024-12-12"),
      excerpt: "How AI is revolutionizing ESG scoring and making environmental impact quantifiable.",
      content: null,
      author: "FinergyCloud Research Team",
      createdAt: new Date()
    };

    this.marketInsights.set(insight1.id, insight1);
    this.marketInsights.set(insight2.id, insight2);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async getPredictions(): Promise<Prediction[]> {
    return Array.from(this.predictions.values());
  }

  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const id = this.currentPredictionId++;
    
    // Mock AI prediction logic
    const { projectType, location, gridStability, communityEngagement, projectSize } = insertPrediction;
    
    let baseIrr = 12.0;
    let successProb = 0.75;
    let confidence = 0.85;
    
    // Adjust based on project type
    switch (projectType) {
      case "solar":
        baseIrr += 2.5;
        successProb += 0.1;
        break;
      case "wind":
        baseIrr += 1.8;
        successProb += 0.08;
        break;
      case "hydro":
        baseIrr += 3.0;
        successProb += 0.12;
        break;
    }
    
    // Adjust based on location
    if (location === "lagos" || location === "abuja") {
      baseIrr += 1.0;
      successProb += 0.05;
    }
    
    // Adjust based on grid stability
    switch (gridStability) {
      case "high":
        baseIrr += 0.8;
        successProb += 0.08;
        break;
      case "medium":
        baseIrr += 0.3;
        break;
      case "low":
        baseIrr -= 0.5;
        successProb -= 0.1;
        break;
    }
    
    // Adjust based on project size
    if (projectSize > 5) {
      baseIrr += 0.5;
      confidence += 0.05;
    }
    
    const predictedIrr = Math.max(8.0, Math.min(25.0, baseIrr + (Math.random() - 0.5) * 2));
    const finalSuccessProb = Math.max(0.5, Math.min(0.95, successProb + (Math.random() - 0.5) * 0.1));
    const finalConfidence = Math.max(0.75, Math.min(0.98, confidence + (Math.random() - 0.5) * 0.1));
    
    let riskLevel = "medium";
    if (predictedIrr > 15 && finalSuccessProb > 0.85) riskLevel = "low";
    if (predictedIrr < 12 || finalSuccessProb < 0.7) riskLevel = "high";

    const prediction: Prediction = {
      ...insertPrediction,
      id,
      predictedIrr: Math.round(predictedIrr * 10) / 10,
      successProbability: Math.round(finalSuccessProb * 100) / 100,
      riskLevel,
      confidence: Math.round(finalConfidence * 100) / 100,
      createdAt: new Date()
    };
    
    this.predictions.set(id, prediction);
    return prediction;
  }

  async getEsgMetrics(): Promise<EsgMetrics[]> {
    return Array.from(this.esgMetrics.values());
  }

  async getEsgMetricsByProjectId(projectId: number): Promise<EsgMetrics | undefined> {
    return Array.from(this.esgMetrics.values()).find(m => m.projectId === projectId);
  }

  async createEsgMetrics(insertMetrics: InsertEsgMetrics): Promise<EsgMetrics> {
    const id = this.currentEsgId++;
    const metrics: EsgMetrics = {
      ...insertMetrics,
      id,
      projectId: insertMetrics.projectId || null,
      createdAt: new Date()
    };
    this.esgMetrics.set(id, metrics);
    return metrics;
  }

  async getMarketInsights(): Promise<MarketInsight[]> {
    return Array.from(this.marketInsights.values());
  }

  async createMarketInsight(insertInsight: InsertMarketInsight): Promise<MarketInsight> {
    const id = this.currentInsightId++;
    const insight: MarketInsight = {
      ...insertInsight,
      id,
      content: insertInsight.content || null,
      author: insertInsight.author || null,
      createdAt: new Date()
    };
    this.marketInsights.set(id, insight);
    return insight;
  }
}

export const storage = new MemStorage();
