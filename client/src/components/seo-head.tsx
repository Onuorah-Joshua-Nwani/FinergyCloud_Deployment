import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const DEFAULT_SEO = {
  title: "FinergyCloud - AI Risk Intelligence for Renewable Energy Investors",
  description: "Transform renewable energy investment decisions with AI-powered analytics. IRR simulation, ESG scoring, and risk profiling for emerging markets.",
  keywords: "FinergyCloud, renewable energy investment, AI risk intelligence, ESG scoring, IRR simulation, emerging markets, sustainable finance",
  ogImage: "https://www.finergycloud.com/assets/images/finergycloud-logo.png"
};

const PAGE_SEO_CONFIG = {
  '/': {
    title: "FinergyCloud - AI Risk Intelligence Dashboard",
    description: "Real-time portfolio analytics and AI-powered insights for renewable energy investments. Track performance, ESG metrics, and risk assessments.",
    keywords: "renewable energy dashboard, portfolio analytics, ESG tracking, investment insights"
  },
  '/ai-model': {
    title: "AI Prediction Model - FinergyCloud",
    description: "Advanced XGBoost machine learning model for renewable energy project success prediction with 94% accuracy. Risk assessment and IRR forecasting.",
    keywords: "AI prediction model, XGBoost, renewable energy forecasting, risk assessment, IRR prediction"
  },
  '/esg-scoring': {
    title: "ESG Scoring System - FinergyCloud",
    description: "Comprehensive Environmental, Social, and Governance scoring for renewable energy projects. Sustainability impact assessment and benchmarking.",
    keywords: "ESG scoring, sustainability metrics, environmental impact, social governance, renewable energy ESG"
  },
  '/irr-calculator': {
    title: "IRR Calculator - FinergyCloud",
    description: "Multi-currency IRR calculator with advanced financial modeling for renewable energy investments. NGN, GBP, EUR support with real-time conversion.",
    keywords: "IRR calculator, financial modeling, renewable energy ROI, multi-currency, investment returns"
  },
  '/projects': {
    title: "Project Management - FinergyCloud",
    description: "Comprehensive renewable energy project portfolio management. Track solar, wind, and hydroelectric investments with detailed analytics.",
    keywords: "project management, renewable energy portfolio, solar projects, wind energy, hydroelectric investments"
  },
  '/market-insights': {
    title: "Market Insights - FinergyCloud",
    description: "Real-time renewable energy market analysis, industry trends, and regulatory updates. Expert intelligence for informed investment decisions.",
    keywords: "market insights, renewable energy trends, industry analysis, regulatory updates, market intelligence"
  },
  '/rewards': {
    title: "Sustainability Rewards - FinergyCloud",
    description: "Gamified sustainability tracking with achievements, challenges, and impact metrics. Earn rewards for green investment decisions.",
    keywords: "sustainability rewards, green achievements, environmental impact tracking, sustainable investing gamification"
  },
  '/kpi': {
    title: "KPI Analytics - FinergyCloud",
    description: "Advanced Key Performance Indicators dashboard for renewable energy investments. Real-time metrics, performance tracking, and data visualization.",
    keywords: "KPI dashboard, performance metrics, renewable energy analytics, investment tracking, data visualization"
  },
  '/subscribe': {
    title: "Subscription Plans - FinergyCloud",
    description: "Choose your FinergyCloud subscription plan. Access premium AI analytics, advanced ESG scoring, and exclusive market insights.",
    keywords: "subscription plans, premium features, AI analytics, ESG scoring, market insights"
  }
};

export default function SEOHead({ title, description, keywords, ogImage }: SEOHeadProps) {
  const [location] = useLocation();
  
  useEffect(() => {
    // Get page-specific SEO config
    const pageConfig = PAGE_SEO_CONFIG[location as keyof typeof PAGE_SEO_CONFIG];
    
    // Use provided props, then page config, then defaults
    const finalTitle = title || pageConfig?.title || DEFAULT_SEO.title;
    const finalDescription = description || pageConfig?.description || DEFAULT_SEO.description;
    const finalKeywords = keywords || pageConfig?.keywords || DEFAULT_SEO.keywords;
    const finalOgImage = ogImage || DEFAULT_SEO.ogImage;
    
    // Update document title
    document.title = finalTitle;
    
    // Update meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', finalDescription);
    updateMetaTag('og:image', finalOgImage);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalOgImage);
  }, [location, title, description, keywords, ogImage]);
  
  return null; // This component doesn't render anything
}

function updateMetaTag(name: string, content: string) {
  // Handle both name and property attributes
  const selector = `meta[name="${name}"], meta[property="${name}"]`;
  let meta = document.querySelector(selector) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}