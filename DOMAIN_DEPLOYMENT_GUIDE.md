# Domain Deployment Guide for FinergyCloud

## Current Setup
- **Domain**: https://www.finergycloud.com/
- **Repository**: https://github.com/Onuorah-Joshua-Nwani/ojn-msp-1-finergycloud
- **Web Platform Branch**: `Onuorah-Joshua-Nwani-finergyapp-platform-standalone`
- **Current Site**: Static website (main branch)

## Deployment Options

### Option 1: Replace Current Site (Recommended)
Deploy the web platform to replace your current static website:
1. **Vercel Deployment**:
   - Connect GitHub repository
   - Select branch: `Onuorah-Joshua-Nwani-finergyapp-platform-standalone`
   - Add custom domain: `www.finergycloud.com`
   - Configure environment variables

2. **Railway Deployment**:
   - Connect GitHub repository
   - Select the web platform branch
   - Add custom domain in Railway settings
   - Configure PostgreSQL database

### Option 2: Subdomain Deployment
Keep current site and add web platform on subdomain:
- **Current**: https://www.finergycloud.com/ (static website)
- **Web Platform**: https://app.finergycloud.com/ (full application)

### Option 3: Path-based Deployment
- **Current**: https://www.finergycloud.com/ (landing page)
- **Web Platform**: https://www.finergycloud.com/app/ (application)

## Recommended Deployment Steps

### 1. Vercel Deployment (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web platform branch
vercel --prod
```

### 2. Configure Domain
- Add `www.finergycloud.com` as custom domain
- Update DNS settings if needed
- SSL certificate will be automatic

### 3. Environment Variables
Set in deployment platform:
```
DATABASE_URL=your-postgresql-connection-string
SESSION_SECRET=random-secure-string-min-32-chars
NODE_ENV=production
```

### 4. Database Setup
For production, use:
- **Neon** (PostgreSQL as a service)
- **Railway Database** (if using Railway)
- **Supabase** (PostgreSQL with additional features)

## Benefits of Web Platform Deployment

Your visitors will get:
- **AI-powered predictions** instead of static content
- **Interactive dashboards** with real-time data
- **Multi-currency support** for global users
- **Advanced analytics** and ESG scoring
- **Mobile-responsive design** for all devices
- **User authentication** and personalized experience

## Current vs New Experience

**Current Site**: Static information about FinergyCloud
**New Web Platform**: Full interactive renewable energy investment platform

The web platform provides significantly more value to your visitors with actual investment tools and analytics.

## Next Steps
1. Choose deployment platform (Vercel recommended)
2. Set up environment variables
3. Configure custom domain
4. Deploy web platform branch
5. Test all features in production

Your domain is already configured - now you can provide a world-class investment platform experience!