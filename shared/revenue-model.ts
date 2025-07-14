/**
 * FinergyCloud Revenue Model - Simple Business Model Explanation
 */

export interface RevenueStream {
  name: string;
  description: string;
  timeline: string;
  target: string;
}

export const revenueModel: RevenueStream[] = [
  {
    name: "Software Subscriptions",
    description: "Monthly/annual subscriptions for AI-powered investment analysis platform",
    timeline: "2025 onwards",
    target: "Investment funds, development finance institutions, renewable energy developers"
  },
  {
    name: "AI Prediction Reports",
    description: "Pay-per-report for detailed project risk analysis using our 94% accurate XGBoost models",
    timeline: "2025 onwards", 
    target: "Investors evaluating specific renewable energy projects"
  },
  {
    name: "ESG Data Services",
    description: "Comprehensive ESG scoring and compliance reporting for renewable energy portfolios",
    timeline: "2025 onwards",
    target: "Corporations, pension funds, impact investors"
  },
  {
    name: "Market Intelligence",
    description: "Real-time market data, regulatory updates, and investment opportunity alerts",
    timeline: "2026 onwards",
    target: "Institutional investors, development banks, government agencies"
  }
];

export const simpleBusinessModel = {
  problem: "Investors lose money on renewable energy projects in emerging markets because they can't accurately assess which projects will succeed",
  solution: "AI-powered platform that predicts project success with 94% accuracy",
  customers: "Investment funds, development banks, renewable energy developers in Nigeria, Ghana, Kenya",
  revenue: "Monthly subscriptions ($500-5000/month) + pay-per-report analysis ($200-1000/report)",
  currentStage: "MVP pilot with 10 users, seeking initial funding and pilot customers"
};