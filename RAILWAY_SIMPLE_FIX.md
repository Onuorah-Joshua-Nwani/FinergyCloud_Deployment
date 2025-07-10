# Railway Deployment Simple Fix

## Problem
Railway build fails with "Could not resolve entry module 'client/index.html'" error.

## Solution
Created a `nixpacks.toml` configuration file that tells Railway exactly how to build the project:

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x", "npm-10_x"]

[phases.build]
cmds = ["npm install", "npm run build"]

[start]
cmd = "npm start"
```

## What This Does
1. **Setup Phase**: Ensures Node.js 20 and npm 10 are available
2. **Build Phase**: Runs standard npm install and build commands
3. **Start Command**: Uses npm start to run the production server

## Files Modified
- Created `nixpacks.toml` - Railway's build configuration
- Updated `railway.json` - Simplified to use npm run build
- Fixed `vite.config.production.ts` - Added proper __dirname handling for ES modules

## Environment Variables Needed
In Railway Service settings, add:
- `NODE_ENV=production`
- `SESSION_SECRET=your-secret-key-here`
- `DATABASE_URL` (if using PostgreSQL)

## Deployment Steps
1. Push all changes to GitHub
2. Click "Redeploy" in Railway
3. Railway will use nixpacks.toml to build correctly

The build should now succeed!