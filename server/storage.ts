import { 
  projects, 
  predictions, 
  esgMetrics, 
  marketInsights,
  projectTypeEsgTemplates,
  users,
  achievements,
  userAchievements,
  rewardActivities,
  rewardChallenges,
  userChallengeProgress,
  type Project, 
  type InsertProject,
  type Prediction,
  type InsertPrediction,
  type EsgMetrics,
  type InsertEsgMetrics,
  type MarketInsight,
  type InsertMarketInsight,
  type ProjectTypeEsgTemplate,
  type InsertProjectTypeEsgTemplate,
  type User,
  type UpsertUser,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
  type RewardActivity,
  type InsertRewardActivity,
  type RewardChallenge,
  type InsertRewardChallenge,
  type UserChallengeProgress,
  type InsertUserChallengeProgress,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: { email: string; passwordHash: string; firstName?: string | null; lastName?: string | null; }): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserSubscription(userId: string, subscriptionData: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
  }): Promise<User>;
  
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
  
  // Project Type ESG Templates
  getProjectTypeEsgTemplates(): Promise<ProjectTypeEsgTemplate[]>;
  getProjectTypeEsgTemplate(projectType: string): Promise<ProjectTypeEsgTemplate | undefined>;
  createProjectTypeEsgTemplate(template: InsertProjectTypeEsgTemplate): Promise<ProjectTypeEsgTemplate>;
  
  // Micro-Reward System
  getUserRewardStats(userId: string): Promise<{
    sustainabilityPoints: number;
    level: number;
    xp: number;
    streak: number;
    totalCo2Saved: number;
    totalEnergyGenerated: number;
  }>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  getAchievements(): Promise<Achievement[]>;
  getUserRewardActivities(userId: string): Promise<RewardActivity[]>;
  getActiveChallenges(): Promise<RewardChallenge[]>;
  getUserChallengeProgress(userId: string): Promise<UserChallengeProgress[]>;
  
  // Reward actions
  addRewardActivity(activity: InsertRewardActivity): Promise<RewardActivity>;
  updateUserRewardStats(userId: string, stats: {
    sustainabilityPoints?: number;
    level?: number;
    xp?: number;
    streak?: number;
    totalCo2Saved?: number;
    totalEnergyGenerated?: number;
  }): Promise<User>;
  checkAndUnlockAchievements(userId: string): Promise<Achievement[]>;
  updateChallengeProgress(userId: string, challengeId: number, progress: number): Promise<UserChallengeProgress>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Only seed data if database is available
    if (db) {
      this.seedData().catch(err => console.log('Seed data failed:', err.message));
      this.seedRewardData().catch(err => console.log('Seed reward data failed:', err.message));
    }
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    if (!db) return undefined;
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.log('Database query failed:', error.message);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: { email: string; passwordHash: string; firstName?: string | null; lastName?: string | null; }): Promise<User> {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const [user] = await db
      .insert(users)
      .values({
        id,
        email: userData.email,
        passwordHash: userData.passwordHash,
        firstName: userData.firstName,
        lastName: userData.lastName,
      })
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserSubscription(userId: string, subscriptionData: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
  }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...subscriptionData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }
  async seedEsgTemplateData() {
    // Check if ESG templates already exist
    const existingTemplates = await db.select().from(projectTypeEsgTemplates);
    if (existingTemplates.length > 0) {
      return; // Already seeded
    }

    // Seed ESG templates
    const templateData = [
      {
        projectType: "solar",
        environmental: 9.2,
        social: 8.5,
        governance: 8.8,
        overall: 8.8,
        co2Reduction: 3200,
        cleanEnergyGenerated: 15.2,
        waterSaved: 1200000,
        jobsCreated: 185,
        communitiesServed: 12,
        educationPrograms: 6,
        riskCategory: "low",
      },
      {
        projectType: "wind",
        environmental: 8.9,
        social: 7.8,
        governance: 8.2,
        overall: 8.3,
        co2Reduction: 2800,
        cleanEnergyGenerated: 18.5,
        waterSaved: 450000,
        jobsCreated: 145,
        communitiesServed: 8,
        educationPrograms: 4,
        riskCategory: "medium",
      },
      {
        projectType: "hydro",
        environmental: 9.5,
        social: 9.1,
        governance: 9.2,
        overall: 9.3,
        co2Reduction: 4200,
        cleanEnergyGenerated: 25.8,
        waterSaved: 2500000,
        jobsCreated: 220,
        communitiesServed: 15,
        educationPrograms: 8,
        riskCategory: "low",
      },
      {
        projectType: "biomass",
        environmental: 7.8,
        social: 8.9,
        governance: 7.5,
        overall: 8.1,
        co2Reduction: 2100,
        cleanEnergyGenerated: 12.3,
        waterSaved: 350000,
        jobsCreated: 280,
        communitiesServed: 22,
        educationPrograms: 12,
        riskCategory: "medium",
      },
      {
        projectType: "geothermal",
        environmental: 9.0,
        social: 8.2,
        governance: 8.5,
        overall: 8.6,
        co2Reduction: 3500,
        cleanEnergyGenerated: 20.1,
        waterSaved: 800000,
        jobsCreated: 165,
        communitiesServed: 10,
        educationPrograms: 5,
        riskCategory: "medium",
      },
    ];

    await db.insert(projectTypeEsgTemplates).values(templateData);
  }

  async seedData() {
    try {
      // Check if data already exists
      const existingProjects = await db.select().from(projects);
      if (existingProjects.length > 0) {
        return; // Data already seeded
      }
    } catch (error) {
      console.log('Database not available, skipping seed data');
      return;
    }

    // Seed projects
    const [project1] = await db
      .insert(projects)
      .values({
        name: "Lagos Solar Farm",
        type: "solar",
        location: "lagos",
        capacity: 5.0,
        status: "active",
        irr: 16.8,
        esgScore: 8.9,
        riskLevel: "low",
      })
      .returning();

    const [project2] = await db
      .insert(projects)
      .values({
        name: "Abuja Wind Project",
        type: "wind",
        location: "abuja",
        capacity: 2.5,
        status: "pending",
        irr: 14.5,
        esgScore: 8.2,
        riskLevel: "medium",
      })
      .returning();

    // Seed ESG metrics
    await db
      .insert(esgMetrics)
      .values({
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
      });

    // Seed market insights
    await db
      .insert(marketInsights)
      .values([
        {
          title: "The AI Revolution in Renewable Energy Investment",
          date: new Date("2024-12-15"),
          excerpt: "Discover how artificial intelligence is transforming renewable energy investment decisions and why traditional models are failing.",
          content: null,
          author: "FinergyCloud Research Team",
        },
        {
          title: "ESG Scoring Revolution: Making Sustainability Measurable",
          date: new Date("2024-12-12"),
          excerpt: "How AI is revolutionizing ESG scoring and making environmental impact quantifiable.",
          content: null,
          author: "FinergyCloud Research Team",
        },
      ]);
      
    // Seed reward data
    await this.seedRewardData();
  }

  async seedRewardData() {
    // Check if achievements already exist
    const existingAchievements = await db.select().from(achievements).limit(1);
    if (existingAchievements.length > 0) {
      console.log('Reward data already seeded');
      return; // Reward data already seeded
    }
    console.log('Seeding reward data...');

    // Seed achievements
    await db
      .insert(achievements)
      .values([
        {
          name: "First Investment",
          description: "Make your first renewable energy investment",
          icon: "trophy",
          category: "investment",
          difficulty: "bronze",
          points: 100,
          requirement: { type: "sustainability_points", value: 50 },
          isActive: true,
        },
        {
          name: "Green Champion",
          description: "Save 1000 tons of CO2 through investments",
          icon: "leaf",
          category: "environmental",
          difficulty: "silver",
          points: 250,
          requirement: { type: "co2_saved", value: 1000 },
          isActive: true,
        },
        {
          name: "Energy Pioneer",
          description: "Generate 10 MWh of clean energy",
          icon: "zap",
          category: "environmental",
          difficulty: "silver",
          points: 200,
          requirement: { type: "energy_generated", value: 10 },
          isActive: true,
        },
        {
          name: "Sustainability Streak",
          description: "Maintain a 30-day activity streak",
          icon: "calendar",
          category: "engagement",
          difficulty: "gold",
          points: 500,
          requirement: { type: "streak", value: 30 },
          isActive: true,
        },
        {
          name: "Level Master",
          description: "Reach level 10 in the platform",
          icon: "star",
          category: "engagement",
          difficulty: "platinum",
          points: 1000,
          requirement: { type: "level", value: 10 },
          isActive: true,
        },
      ]);

    // Seed challenges
    await db
      .insert(rewardChallenges)
      .values([
        {
          title: "Weekly Green Investor",
          description: "Make 3 sustainable investments this week",
          type: "weekly",
          requirement: { type: "investments", value: 3 },
          reward: { points: 150, xp: 300, badge: "green_investor" },
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
        {
          title: "ESG Analysis Expert",
          description: "Complete ESG analysis for 5 projects",
          type: "weekly",
          requirement: { type: "esg_analyses", value: 5 },
          reward: { points: 100, xp: 200, badge: "esg_expert" },
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        },
        {
          title: "Daily Engagement",
          description: "Use the platform for 7 consecutive days",
          type: "daily",
          requirement: { type: "daily_logins", value: 7 },
          reward: { points: 75, xp: 150, badge: "daily_user" },
          isActive: true,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      ]);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getPredictions(): Promise<Prediction[]> {
    return await db.select().from(predictions);
  }

  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    // Mock AI prediction logic - same as before
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

    const predictionData = {
      ...insertPrediction,
      predictedIrr: Math.round(predictedIrr * 10) / 10,
      successProbability: Math.round(finalSuccessProb * 100) / 100,
      riskLevel,
      confidence: Math.round(finalConfidence * 100) / 100,
    };

    const [prediction] = await db
      .insert(predictions)
      .values(predictionData)
      .returning();
    
    return prediction;
  }

  async getEsgMetrics(): Promise<EsgMetrics[]> {
    return await db.select().from(esgMetrics);
  }

  async getEsgMetricsByProjectId(projectId: number): Promise<EsgMetrics | undefined> {
    const [metrics] = await db.select().from(esgMetrics).where(eq(esgMetrics.projectId, projectId));
    return metrics || undefined;
  }

  async createEsgMetrics(insertMetrics: InsertEsgMetrics): Promise<EsgMetrics> {
    const [metrics] = await db
      .insert(esgMetrics)
      .values(insertMetrics)
      .returning();
    return metrics;
  }

  async getMarketInsights(): Promise<MarketInsight[]> {
    return await db.select().from(marketInsights);
  }

  async createMarketInsight(insertInsight: InsertMarketInsight): Promise<MarketInsight> {
    const [insight] = await db
      .insert(marketInsights)
      .values(insertInsight)
      .returning();
    return insight;
  }

  async getProjectTypeEsgTemplates(): Promise<ProjectTypeEsgTemplate[]> {
    return await db.select().from(projectTypeEsgTemplates);
  }

  async getProjectTypeEsgTemplate(projectType: string): Promise<ProjectTypeEsgTemplate | undefined> {
    const [template] = await db
      .select()
      .from(projectTypeEsgTemplates)
      .where(eq(projectTypeEsgTemplates.projectType, projectType));
    return template || undefined;
  }

  async createProjectTypeEsgTemplate(insertTemplate: InsertProjectTypeEsgTemplate): Promise<ProjectTypeEsgTemplate> {
    const [template] = await db
      .insert(projectTypeEsgTemplates)
      .values(insertTemplate)
      .returning();
    return template;
  }

  // Micro-Reward System implementation
  async getUserRewardStats(userId: string): Promise<{
    sustainabilityPoints: number;
    level: number;
    xp: number;
    streak: number;
    totalCo2Saved: number;
    totalEnergyGenerated: number;
  }> {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) {
      throw new Error("User not found");
    }
    
    return {
      sustainabilityPoints: user.sustainabilityPoints || 0,
      level: user.level || 1,
      xp: user.xp || 0,
      streak: user.streak || 0,
      totalCo2Saved: user.totalCo2Saved || 0,
      totalEnergyGenerated: user.totalEnergyGenerated || 0,
    };
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    const userAchievs = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
    return userAchievs;
  }

  async getAchievements(): Promise<Achievement[]> {
    const achievs = await db
      .select()
      .from(achievements)
      .where(eq(achievements.isActive, true));
    return achievs;
  }

  async getUserRewardActivities(userId: string): Promise<RewardActivity[]> {
    const activities = await db
      .select()
      .from(rewardActivities)
      .where(eq(rewardActivities.userId, userId))
      .orderBy(rewardActivities.createdAt);
    return activities;
  }

  async getActiveChallenges(): Promise<RewardChallenge[]> {
    const challenges = await db
      .select()
      .from(rewardChallenges)
      .where(eq(rewardChallenges.isActive, true));
    return challenges;
  }

  async getUserChallengeProgress(userId: string): Promise<UserChallengeProgress[]> {
    const progress = await db
      .select()
      .from(userChallengeProgress)
      .where(eq(userChallengeProgress.userId, userId));
    return progress;
  }

  async addRewardActivity(activity: InsertRewardActivity): Promise<RewardActivity> {
    const [newActivity] = await db
      .insert(rewardActivities)
      .values(activity)
      .returning();
    return newActivity;
  }

  async updateUserRewardStats(userId: string, stats: {
    sustainabilityPoints?: number;
    level?: number;
    xp?: number;
    streak?: number;
    totalCo2Saved?: number;
    totalEnergyGenerated?: number;
  }): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        ...stats,
        lastActivityDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async checkAndUnlockAchievements(userId: string): Promise<Achievement[]> {
    const userStats = await this.getUserRewardStats(userId);
    const allAchievements = await this.getAchievements();
    const userAchievements = await this.getUserAchievements(userId);
    
    const unlockedAchievements: Achievement[] = [];
    const userAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));
    
    for (const achievement of allAchievements) {
      if (userAchievementIds.has(achievement.id)) continue;
      
      const requirement = achievement.requirement as { type: string; value: number };
      let isUnlocked = false;
      
      switch (requirement.type) {
        case 'sustainability_points':
          isUnlocked = userStats.sustainabilityPoints >= requirement.value;
          break;
        case 'co2_saved':
          isUnlocked = userStats.totalCo2Saved >= requirement.value;
          break;
        case 'energy_generated':
          isUnlocked = userStats.totalEnergyGenerated >= requirement.value;
          break;
        case 'level':
          isUnlocked = userStats.level >= requirement.value;
          break;
        case 'streak':
          isUnlocked = userStats.streak >= requirement.value;
          break;
      }
      
      if (isUnlocked) {
        await db.insert(userAchievements).values({
          userId,
          achievementId: achievement.id,
          progress: 1.0,
        });
        unlockedAchievements.push(achievement);
      }
    }
    
    return unlockedAchievements;
  }

  async updateChallengeProgress(userId: string, challengeId: number, progress: number): Promise<UserChallengeProgress> {
    const [existingProgress] = await db
      .select()
      .from(userChallengeProgress)
      .where(eq(userChallengeProgress.userId, userId))
      .where(eq(userChallengeProgress.challengeId, challengeId));
    
    if (existingProgress) {
      const [updated] = await db
        .update(userChallengeProgress)
        .set({
          progress,
          completed: progress >= 1.0,
          completedAt: progress >= 1.0 ? new Date() : null,
        })
        .where(eq(userChallengeProgress.id, existingProgress.id))
        .returning();
      return updated;
    } else {
      const [newProgress] = await db
        .insert(userChallengeProgress)
        .values({
          userId,
          challengeId,
          progress,
          completed: progress >= 1.0,
          completedAt: progress >= 1.0 ? new Date() : null,
        })
        .returning();
      return newProgress;
    }
  }
}

export class MemStorage implements IStorage {
  private mockAchievements: Achievement[] = [
    {
      id: 1,
      name: "First Investment",
      description: "Make your first renewable energy investment",
      icon: "trophy",
      category: "investment",
      difficulty: "bronze",
      points: 100,
      requirement: { type: "sustainability_points", value: 50 },
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Green Champion",
      description: "Save 1000 tons of CO2 through investments",
      icon: "leaf",
      category: "environmental",
      difficulty: "silver",
      points: 250,
      requirement: { type: "co2_saved", value: 1000 },
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "Energy Pioneer",
      description: "Generate 10 MWh of clean energy",
      icon: "zap",
      category: "environmental",
      difficulty: "silver",
      points: 200,
      requirement: { type: "energy_generated", value: 10 },
      isActive: true,
      createdAt: new Date(),
    },
  ];

  private mockChallenges: RewardChallenge[] = [
    {
      id: 1,
      title: "Weekly Green Investor",
      description: "Make 3 sustainable investments this week",
      type: "weekly",
      requirement: { type: "investments", value: 3 },
      reward: { points: 150, xp: 300, badge: "green_investor" },
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "ESG Analysis Expert",
      description: "Complete ESG analysis for 5 projects",
      type: "weekly",
      requirement: { type: "esg_analyses", value: 5 },
      reward: { points: 100, xp: 200, badge: "esg_expert" },
      isActive: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    },
  ];

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    // Mock implementation for memory storage
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    // Mock implementation for memory storage
    return undefined;
  }

  async createUser(userData: { email: string; passwordHash: string; firstName?: string | null; lastName?: string | null; }): Promise<User> {
    // Mock implementation for memory storage
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      id,
      email: userData.email,
      passwordHash: userData.passwordHash,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: "inactive",
      subscriptionPlan: "free",
      subscriptionStartDate: null,
      subscriptionEndDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Mock implementation for memory storage
    return {
      id: userData.id || 'mock-id',
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: "inactive",
      subscriptionPlan: "free",
      subscriptionStartDate: null,
      subscriptionEndDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async updateUserSubscription(userId: string, subscriptionData: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    subscriptionPlan?: string;
    subscriptionStartDate?: Date;
    subscriptionEndDate?: Date;
  }): Promise<User> {
    // Mock implementation for memory storage
    return {
      id: userId,
      email: null,
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      stripeCustomerId: subscriptionData.stripeCustomerId || null,
      stripeSubscriptionId: subscriptionData.stripeSubscriptionId || null,
      subscriptionStatus: subscriptionData.subscriptionStatus || "inactive",
      subscriptionPlan: subscriptionData.subscriptionPlan || "free",
      subscriptionStartDate: subscriptionData.subscriptionStartDate || null,
      subscriptionEndDate: subscriptionData.subscriptionEndDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Mock implementations for reward system in memory storage
  async getUserRewardStats(userId: string): Promise<{
    sustainabilityPoints: number;
    level: number;
    xp: number;
    streak: number;
    totalCo2Saved: number;
    totalEnergyGenerated: number;
  }> {
    return {
      sustainabilityPoints: 1250,
      level: 3,
      xp: 750,
      streak: 7,
      totalCo2Saved: 2450,
      totalEnergyGenerated: 12.5,
    };
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return [];
  }

  async getAchievements(): Promise<Achievement[]> {
    return this.mockAchievements;
  }

  async getUserRewardActivities(userId: string): Promise<RewardActivity[]> {
    return [];
  }

  async getActiveChallenges(): Promise<RewardChallenge[]> {
    return this.mockChallenges;
  }

  async getUserChallengeProgress(userId: string): Promise<UserChallengeProgress[]> {
    return [];
  }

  async addRewardActivity(activity: InsertRewardActivity): Promise<RewardActivity> {
    return { id: 1, ...activity, createdAt: new Date() };
  }

  async updateUserRewardStats(userId: string, stats: any): Promise<User> {
    return {
      id: userId,
      email: null,
      firstName: null,
      lastName: null,
      profileImageUrl: null,
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: "inactive",
      subscriptionPlan: "free",
      subscriptionStartDate: null,
      subscriptionEndDate: null,
      sustainabilityPoints: stats.sustainabilityPoints || 0,
      level: stats.level || 1,
      xp: stats.xp || 0,
      streak: stats.streak || 0,
      totalCo2Saved: stats.totalCo2Saved || 0,
      totalEnergyGenerated: stats.totalEnergyGenerated || 0,
      lastActivityDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async checkAndUnlockAchievements(userId: string): Promise<Achievement[]> {
    return [];
  }

  async updateChallengeProgress(userId: string, challengeId: number, progress: number): Promise<UserChallengeProgress> {
    return {
      id: 1,
      userId,
      challengeId,
      progress,
      completed: progress >= 1.0,
      completedAt: progress >= 1.0 ? new Date() : null,
      rewardClaimed: false,
      createdAt: new Date(),
    };
  }

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
    this.projectTypeTemplates = new Map();
    this.currentProjectId = 1;
    this.currentPredictionId = 1;
    this.currentEsgId = 1;
    this.currentInsightId = 1;
    
    this.seedData();
    this.seedEsgTemplates();
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

  private seedEsgTemplates() {
    // Solar project template
    const solarTemplate: ProjectTypeEsgTemplate = {
      id: 1,
      projectType: "solar",
      environmental: 9.2,
      social: 8.5,
      governance: 8.8,
      overall: 8.8,
      co2Reduction: 3200,
      cleanEnergyGenerated: 15.2,
      waterSaved: 1200000,
      jobsCreated: 185,
      communitiesServed: 12,
      educationPrograms: 6,
      riskCategory: "low",
      createdAt: new Date()
    };

    // Wind project template
    const windTemplate: ProjectTypeEsgTemplate = {
      id: 2,
      projectType: "wind",
      environmental: 8.9,
      social: 7.8,
      governance: 8.2,
      overall: 8.3,
      co2Reduction: 2800,
      cleanEnergyGenerated: 18.5,
      waterSaved: 450000,
      jobsCreated: 145,
      communitiesServed: 8,
      educationPrograms: 4,
      riskCategory: "medium",
      createdAt: new Date()
    };

    // Hydro project template
    const hydroTemplate: ProjectTypeEsgTemplate = {
      id: 3,
      projectType: "hydro",
      environmental: 9.5,
      social: 9.1,
      governance: 9.2,
      overall: 9.3,
      co2Reduction: 4200,
      cleanEnergyGenerated: 25.8,
      waterSaved: 2500000,
      jobsCreated: 220,
      communitiesServed: 15,
      educationPrograms: 8,
      riskCategory: "low",
      createdAt: new Date()
    };

    // Biomass project template
    const biomassTemplate: ProjectTypeEsgTemplate = {
      id: 4,
      projectType: "biomass",
      environmental: 7.8,
      social: 8.9,
      governance: 7.5,
      overall: 8.1,
      co2Reduction: 2100,
      cleanEnergyGenerated: 12.3,
      waterSaved: 350000,
      jobsCreated: 280,
      communitiesServed: 22,
      educationPrograms: 12,
      riskCategory: "medium",
      createdAt: new Date()
    };

    // Geothermal project template
    const geothermalTemplate: ProjectTypeEsgTemplate = {
      id: 5,
      projectType: "geothermal",
      environmental: 9.0,
      social: 8.2,
      governance: 8.5,
      overall: 8.6,
      co2Reduction: 3500,
      cleanEnergyGenerated: 20.1,
      waterSaved: 800000,
      jobsCreated: 165,
      communitiesServed: 10,
      educationPrograms: 5,
      riskCategory: "medium",
      createdAt: new Date()
    };

    this.projectTypeTemplates.set("solar", solarTemplate);
    this.projectTypeTemplates.set("wind", windTemplate);
    this.projectTypeTemplates.set("hydro", hydroTemplate);
    this.projectTypeTemplates.set("biomass", biomassTemplate);
    this.projectTypeTemplates.set("geothermal", geothermalTemplate);
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

  private projectTypeTemplates: Map<string, ProjectTypeEsgTemplate> = new Map();

  async getProjectTypeEsgTemplates(): Promise<ProjectTypeEsgTemplate[]> {
    return Array.from(this.projectTypeTemplates.values());
  }

  async getProjectTypeEsgTemplate(projectType: string): Promise<ProjectTypeEsgTemplate | undefined> {
    return this.projectTypeTemplates.get(projectType);
  }

  async createProjectTypeEsgTemplate(insertTemplate: InsertProjectTypeEsgTemplate): Promise<ProjectTypeEsgTemplate> {
    const template: ProjectTypeEsgTemplate = {
      ...insertTemplate,
      id: 1,
      createdAt: new Date()
    };
    return template;
  }
}

// Force MemStorage for development to use our mock data
export const storage = process.env.NODE_ENV === 'production' 
  ? new DatabaseStorage() 
  : new MemStorage();

console.log(`Storage type: ${storage.constructor.name}`);
console.log(`Environment: NODE_ENV=${process.env.NODE_ENV}, DATABASE_URL=${process.env.DATABASE_URL ? 'set' : 'not set'}`);

// Initialize with seed data
if (storage instanceof DatabaseStorage) {
  storage.seedData().catch(console.error);
  storage.seedEsgTemplateData().catch(console.error);
}
