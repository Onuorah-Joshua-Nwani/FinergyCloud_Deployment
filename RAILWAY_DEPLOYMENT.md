# Railway Deployment Guide for FinergyCloud

## Prerequisites Checklist

Before deploying to Railway, ensure your repository has these files:

### Required Files
- [x] `package.json` with correct scripts
- [x] `server/` folder with Express.js backend
- [x] `client/` folder with React frontend  
- [x] `shared/` folder with schemas
- [x] `.gitignore` (excluding node_modules, .env, dist)
- [x] `README.md` with project description

### Package.json Scripts
Ensure your package.json has these scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  }
}
```

## Step-by-Step Railway Deployment

### 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub for easiest integration

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository and branch

### 3. Add PostgreSQL Database
- In your project dashboard, click "New" → "Database" → "PostgreSQL"
- Railway automatically creates DATABASE_URL environment variable

### 4. Configure Environment Variables
Go to your service → Variables tab and add:

```bash
SESSION_SECRET=generate-a-long-random-string-here
NODE_ENV=production
PORT=3000

# Optional - Add if using Stripe
STRIPE_SECRET_KEY=sk_live_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

### 5. Configure Service Settings
Click on your service and check:
- **Root Directory**: `/` (leave empty if project is in root)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 6. Deploy Configuration
Railway will automatically:
1. Install dependencies (`npm install`)
2. Run database migrations (`npm run db:push`)
3. Build your app (`npm run build`)
4. Start the server (`npm start`)

### 7. Custom Domain (Optional)
- Go to Settings → Domains
- Add your custom domain
- Update DNS records as instructed

## Troubleshooting

### Build Fails
1. Check build logs in Railway dashboard
2. Common issues:
   - Missing dependencies: Add to package.json
   - TypeScript errors: Fix in local development first
   - Memory issues: Upgrade to paid plan

### Database Connection Fails
1. Verify DATABASE_URL is set in environment variables
2. Check if database service is running
3. Run `npm run db:push` in Railway's shell

### App Crashes After Deploy
1. Check runtime logs
2. Verify all environment variables are set
3. Ensure `dist/` folder is created during build

### Port Issues
Railway automatically assigns a PORT. Ensure your server uses:
```javascript
const PORT = process.env.PORT || 5000;
```

## Post-Deployment

### 1. Initialize Database
In Railway dashboard:
1. Click on your service
2. Go to "Settings" → "Deploy" → "Shell"
3. Run: `npm run db:push`

### 2. Access Your App
- Railway provides a URL like: `your-app.up.railway.app`
- Website: `https://your-app.up.railway.app`
- Mobile App: `https://your-app.up.railway.app/?platform=mobile`

### 3. Monitor Performance
- Check Metrics tab for CPU/Memory usage
- View Logs for errors
- Set up alerts for downtime

## Alternative: Deploy to Render

If Railway doesn't work, Render is similar:

### Render Deployment Steps
1. Go to https://render.com
2. Connect GitHub repository
3. Create "Web Service"
4. Add PostgreSQL database
5. Set environment variables:
   ```bash
   DATABASE_URL=(automatically set)
   SESSION_SECRET=your-secret
   NODE_ENV=production
   ```
6. Deploy with:
   - Build: `npm install && npm run build`
   - Start: `npm start`

## Cost Comparison

### Railway (Recommended)
- **Free Tier**: $5 credit/month
- **Hobby**: $5/month (includes database)
- **Pro**: Pay as you go

### Render
- **Free Tier**: Limited (spins down after 15 min)
- **Hobby**: $7/month for app + $7/month for database
- **Pro**: Based on usage

## Need Help?

If deployment fails:
1. Check the deployment logs
2. Verify all files are committed to GitHub
3. Ensure environment variables are set
4. Contact support with error messages

---

**Important**: Always test locally with `npm run build` and `npm start` before deploying!