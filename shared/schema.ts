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
  passwordHash: varchar("password_hash").notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status").default("inactive"), // active, inactive, past_due, canceled
  subscriptionPlan: varchar("subscription_plan").default("free"), // free, basic, premium
  subscriptionStartDate: timestamp("subscription_start_date"),
  subscriptionEndDate: timestamp("subscription_end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
