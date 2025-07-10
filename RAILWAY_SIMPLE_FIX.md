# Railway Deployment - Simple Fix Guide

## Where to Find Build Settings in Railway

### Step 1: Navigate to Build Settings
1. Go to your Railway project dashboard
2. Click on your service (the main app, not database)
3. Look for these tabs at the top: **Deployments | Settings | Variables | Metrics**
4. Click on **Settings** tab

### Step 2: Find Build & Deploy Section
In the Settings page, scroll down to find:
- **Build Command** field
- **Start Command** field

### Step 3: Update Commands

Since you already have `railway.json` file (I created it above), Railway should automatically use it. But if it doesn't:

#### Option A: Manual Settings (if railway.json is ignored)
In the **Build Command** field, paste this:
```
npm install && npx vite build --config vite.config.production.ts && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

In the **Start Command** field, paste this:
```
npm start
```

#### Option B: Let railway.json Handle It
Just make sure:
1. Commit and push the `railway.json` file to GitHub
2. Railway will automatically detect and use it

### Step 4: Add Environment Variables
1. Click on **Variables** tab
2. Add these:
   - `NODE_ENV` = `production`
   - `SESSION_SECRET` = `any-long-random-string-here-make-it-secure`
   - Railway automatically adds `PORT` and `DATABASE_URL`

### Step 5: Redeploy
1. After making changes, click **Deploy** button
2. Or push a new commit to trigger automatic deployment

## Quick Checklist
✓ `vite.config.production.ts` exists (I created it)
✓ `railway.json` exists (I created it)
✓ Environment variables set
✓ PostgreSQL database added (if not, add it from Railway dashboard)

## Still Can't Find Settings?

Railway UI might have changed. Look for:
- **"Deploy"** section
- **"Build & Deploy"** settings
- **"Configure"** button
- Gear icon (⚙️) next to your service

The build command field might also be called:
- "Build Command"
- "Custom Build Command"
- "Build Script"

---

**Note**: The key is to use `vite.config.production.ts` instead of the regular `vite.config.ts` to avoid Replit plugin errors.