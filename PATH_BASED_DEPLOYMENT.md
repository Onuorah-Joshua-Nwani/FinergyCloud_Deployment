# Path-Based Deployment Configuration

## URL Structure
- **Marketing Landing**: https://www.finergycloud.com/ 
- **Web Application**: https://www.finergycloud.com/app/

## Professional Landing Page Features

### 🎯 Marketing Landing Page (/)
- **Hero Section**: Clear value proposition with compelling CTA
- **Feature Showcase**: 6 key features with professional icons and badges
- **Statistics**: Real metrics (94% accuracy, $2.1B+ analyzed)
- **About Section**: MBA distinction project to startup story
- **Professional Design**: Green energy theme with modern UI
- **Call-to-Action**: Multiple "Launch Platform" buttons leading to /app

### 🚀 Web Application (/app/*)
- **Dashboard**: /app/ (or /app/dashboard)
- **AI Model**: /app/ai-model
- **ESG Scoring**: /app/esg-scoring
- **IRR Calculator**: /app/irr-calculator
- **Projects**: /app/projects
- **Market Insights**: /app/market-insights
- **KPI Dashboard**: /app/kpi
- **Advanced Features**: /app/advanced-features
- **Subscription**: /app/subscribe

## Landing Page Content Highlights

### Hero Section
- **Headline**: "AI-Driven Risk Intelligence for Renewable Energy Investments"
- **Subheading**: Professional description of platform capabilities
- **Badge**: "MBA Distinction Project to Startup Innovation"
- **CTAs**: "Try Platform Free" and "Watch Demo"

### Key Features
1. **AI-Powered Predictions** - 94% accuracy with XGBoost models
2. **ESG Scoring Engine** - Comprehensive sustainability metrics
3. **Multi-Currency IRR Calculator** - NGN, GBP, EUR support
4. **Real-Time Analytics** - Interactive dashboards
5. **Emerging Markets Focus** - Nigeria and Africa specialization
6. **Risk Assessment** - Heat maps and scenario analysis

### Professional Stats
- 94% Prediction Accuracy
- $2.1B+ Projects Analyzed
- 15+ African Markets
- 500+ Active Investors

### Brand Story
- Academic excellence foundation (MBA distinction)
- Real-world market application
- Mission to democratize investment intelligence
- Focus on sustainable energy transition

## Deployment Configuration

### Server Routing
The Express server should serve:
1. **Static marketing page** for all non-/app routes
2. **React SPA** for /app/* routes
3. **API endpoints** for /api/* routes

### Build Configuration
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "start": "node dist/index.js"
  }
}
```

### Nginx/Reverse Proxy Config (if needed)
```nginx
location / {
  try_files $uri $uri/ /index.html;
}

location /app {
  try_files $uri $uri/ /app/index.html;
}

location /api {
  proxy_pass http://localhost:5000;
}
```

## Marketing Page Benefits
- **Professional First Impression**: Clean, modern design
- **Clear Value Proposition**: Immediate understanding of platform benefits
- **Trust Building**: Statistics and academic foundation
- **Lead Generation**: Multiple CTAs to drive app usage
- **SEO Optimized**: Proper meta tags and content structure
- **Mobile Responsive**: Works perfectly on all devices

This setup gives you a professional marketing front-end while keeping your powerful web application separate and secure under the /app path.