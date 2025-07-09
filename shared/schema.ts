import { pgTable, text, serial, integer, boolean, real, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // solar, wind, hydro, biomass, geothermal
  location: text("location").notNull(),
  capacity: real("capacity").notNull(), // MW
  status: text("status").notNull(), // active, pending, completed
  irr: real("irr").notNull(),
  esgScore: real("esg_score").notNull(),
  riskLevel: text("risk_level").notNull(), // low, medium, high
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  projectType: text("project_type").notNull(),
  location: text("location").notNull(),
  gridStability: text("grid_stability").notNull(),
  communityEngagement: text("community_engagement").notNull(),
  projectSize: real("project_size").notNull(),
  predictedIrr: real("predicted_irr").notNull(),
  successProbability: real("success_probability").notNull(),
  riskLevel: text("risk_level").notNull(),
  confidence: real("confidence").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const esgMetrics = pgTable("esg_metrics", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  environmental: real("environmental").notNull(),
  social: real("social").notNull(),
  governance: real("governance").notNull(),
  overall: real("overall").notNull(),
  co2Reduction: real("co2_reduction").notNull(), // tons/year
  cleanEnergyGenerated: real("clean_energy_generated").notNull(), // GWh
  waterSaved: real("water_saved").notNull(), // liters
  jobsCreated: integer("jobs_created").notNull(),
  communitiesServed: integer("communities_served").notNull(),
  educationPrograms: integer("education_programs").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketInsights = pgTable("market_insights", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  author: text("author"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectTypeEsgTemplates = pgTable("project_type_esg_templates", {
  id: serial("id").primaryKey(),
  projectType: text("project_type").notNull(), // solar, wind, hydro, biomass, geothermal
  environmental: real("environmental").notNull(),
  social: real("social").notNull(),
  governance: real("governance").notNull(),
  overall: real("overall").notNull(),
  co2Reduction: real("co2_reduction").notNull(),
  cleanEnergyGenerated: real("clean_energy_generated").notNull(),
  waterSaved: real("water_saved").notNull(),
  jobsCreated: integer("jobs_created").notNull(),
  communitiesServed: integer("communities_served").notNull(),
  educationPrograms: integer("education_programs").notNull(),
  riskCategory: text("risk_category").notNull(), // low, medium, high
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("password_hash"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status").default("inactive"), // active, inactive, past_due, canceled
  subscriptionPlan: varchar("subscription_plan").default("free"), // free, basic, premium
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  // Micro-Reward System fields
  sustainabilityPoints: integer("sustainability_points").default(0),
  level: integer("level").default(1),
  xp: integer("xp").default(0),
  streak: integer("streak").default(0),
  lastActivityDate: timestamp("last_activity_date"),
  totalCo2Saved: real("total_co2_saved").default(0),
  totalEnergyGenerated: real("total_energy_generated").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Achievements table
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // environmental, social, governance, financial
  difficulty: text("difficulty").notNull(), // bronze, silver, gold, platinum
  points: integer("points").notNull(),
  requirement: jsonb("requirement").notNull(), // {type: "co2_saved", value: 1000}
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User achievements table
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
  progress: real("progress").default(0), // 0.0 to 1.0
});

// Reward activities table
export const rewardActivities = pgTable("reward_activities", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  activityType: text("activity_type").notNull(), // project_created, prediction_made, esg_improved, daily_login
  description: text("description").notNull(),
  points: integer("points").notNull(),
  xpGained: integer("xp_gained").notNull(),
  metadata: jsonb("metadata"), // Additional activity data
  createdAt: timestamp("created_at").defaultNow(),
});

// Reward challenges table
export const rewardChallenges = pgTable("reward_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // daily, weekly, monthly, special
  requirement: jsonb("requirement").notNull(), // {type: "projects_created", value: 5}
  reward: jsonb("reward").notNull(), // {points: 100, xp: 50, badge: "eco_warrior"}
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User challenge progress table
export const userChallengeProgress = pgTable("user_challenge_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => rewardChallenges.id).notNull(),
  progress: real("progress").default(0), // 0.0 to 1.0
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  rewardClaimed: boolean("reward_claimed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertPredictionSchema = createInsertSchema(predictions).omit({
  id: true,
  predictedIrr: true,
  successProbability: true,
  riskLevel: true,
  confidence: true,
  createdAt: true,
});

export const insertEsgMetricsSchema = createInsertSchema(esgMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertMarketInsightSchema = createInsertSchema(marketInsights).omit({
  id: true,
  createdAt: true,
});

export const insertProjectTypeEsgTemplateSchema = createInsertSchema(projectTypeEsgTemplates).omit({
  id: true,
  createdAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
});

export const insertRewardActivitySchema = createInsertSchema(rewardActivities).omit({
  id: true,
  createdAt: true,
});

export const insertRewardChallengeSchema = createInsertSchema(rewardChallenges).omit({
  id: true,
  createdAt: true,
});

export const insertUserChallengeProgressSchema = createInsertSchema(userChallengeProgress).omit({
  id: true,
  createdAt: true,
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Prediction = typeof predictions.$inferSelect;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type EsgMetrics = typeof esgMetrics.$inferSelect;
export type InsertEsgMetrics = z.infer<typeof insertEsgMetricsSchema>;
export type MarketInsight = typeof marketInsights.$inferSelect;
export type InsertMarketInsight = z.infer<typeof insertMarketInsightSchema>;
export type ProjectTypeEsgTemplate = typeof projectTypeEsgTemplates.$inferSelect;
export type InsertProjectTypeEsgTemplate = z.infer<typeof insertProjectTypeEsgTemplateSchema>;

// Micro-Reward System types
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type RewardActivity = typeof rewardActivities.$inferSelect;
export type InsertRewardActivity = z.infer<typeof insertRewardActivitySchema>;
export type RewardChallenge = typeof rewardChallenges.$inferSelect;
export type InsertRewardChallenge = z.infer<typeof insertRewardChallengeSchema>;
export type UserChallengeProgress = typeof userChallengeProgress.$inferSelect;
export type InsertUserChallengeProgress = z.infer<typeof insertUserChallengeProgressSchema>;

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
