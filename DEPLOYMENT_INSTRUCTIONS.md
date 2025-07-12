# Replit Cloud Run Deployment Instructions

## 🚨 Required .replit File Changes

You need to add the deployment section to your `.replit` file. Since I cannot modify it directly, please add this to your `.replit` file:

```toml
run = "npm run dev"
modules = ["nodejs-20"]

[nix]
channel = "stable-24_05"

[[ports]]
localPort = 5000
externalPort = 80

[deployment]
run = ["node", "start.js"]
deploymentTarget = "cloudrun"
ignorePorts = false

[deployment.environment]
NODE_ENV = "production"
PORT = "8080"

[[deployment.ports]]
name = "main"
internalPort = 8080
externalPort = 80
```

## ✅ Files Ready for Deployment

The following production files are now configured:

- ✅ `start.js` - Production startup script (Cloud Run compatible)
- ✅ `production-start.sh` - Alternative startup script
- ✅ `deploy.sh` - Build and deployment automation
- ✅ `/health` endpoint - Added to server routes for health checks
- ✅ `Dockerfile` - Multi-stage production build
- ✅ `.dockerignore` - Optimized build performance

## 🔧 Environment Variables

Ensure these are set in Replit Secrets:
- `NODE_ENV=production`
- `PORT=8080` (Cloud Run default)
- `DATABASE_URL=your_postgresql_url`
- `SESSION_SECRET=your_secure_secret`

## 🚀 Deployment Process

1. **Add the deployment section to .replit file** (see above)
2. **Verify start.js exists** (✅ confirmed)
3. **Build the application** (if not already built):
   ```bash
   npm run build
   ```
4. **Deploy using Replit's deployment feature**

## 🔍 Verification

After deployment:
- Health check: `https://your-app.replit.app/health`
- Application should respond with production status
- Server logs should show "Starting FinergyCloud in production mode..."

## 📋 Troubleshooting

If deployment fails:
1. Ensure `.replit` file has the deployment section
2. Check that `start.js` exists in project root
3. Verify environment variables are set
4. Check build completed successfully (`dist/` directory exists)

The deployment configuration now meets Replit Cloud Run requirements with proper production settings and health monitoring.