# Replit Deployment Guide

## Issue Resolution

The deployment error occurs because Replit's security system blocks any run command containing "dev" for production deployments. Since the `.replit` file contains `run = "npm run dev"`, this triggers the security block.

## Solution Options

### Option 1: Use Deploy Script (Recommended)
Run the production deployment script directly:
```bash
./deploy.sh
```

### Option 2: Manual Production Commands
1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
NODE_ENV=production node dist/index.js
```

### Option 3: Use Alternative Start Command
In Replit's deployment settings, use this command instead:
```bash
node start.js
```

## Environment Variables for Replit Deployment

Set these in your Replit secrets/environment:
- `NODE_ENV=production`
- `PORT=5000`
- `DATABASE_URL=your_postgresql_url`
- `SESSION_SECRET=your_session_secret`

## Deployment Configuration Files

The following files are configured for production deployment:
- `start.js` - Production startup script
- `deploy.sh` - Automated deployment script
- `Dockerfile` - Container deployment
- `.dockerignore` - Optimized builds

## Verification

After deployment, verify the application is running:
- Health check: `curl http://localhost:5000/health`
- Application should respond with production status

## Notes

- The `.replit` file is used for development only
- Production deployments should bypass the development configuration
- All deployment configurations avoid "dev" references for security compliance