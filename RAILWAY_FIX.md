# Railway Deployment Fix for FinergyCloud

## The Problem
Your deployment is failing because vite.config.ts contains Replit-specific plugins that don't exist on Railway.

## Solution Steps

### 1. In Railway Dashboard

#### Update Build Command
Go to your service → Settings → Build Command and replace with:
```bash
npm install && vite build --config vite.config.production.ts && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

#### Add Environment Variables
Go to Variables tab and ensure you have:
```
NODE_ENV=production
SESSION_SECRET=your-long-random-string-here
PORT=5000
```

### 2. In Your GitHub Repository

Make sure these files exist:
- `vite.config.production.ts` (created above)
- `.railwayignore` (created above)

### 3. Alternative: Modify package.json scripts

If the above doesn't work, temporarily add a railway-specific build script. Create a new file `railway-build.sh`:

```bash
#!/bin/bash
# Install dependencies
npm install

# Build frontend with production config
./node_modules/.bin/vite build --config vite.config.production.ts

# Build backend
./node_modules/.bin/esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

Make it executable and commit:
```bash
chmod +x railway-build.sh
git add railway-build.sh
git commit -m "Add Railway build script"
git push
```

Then in Railway, use Build Command: `./railway-build.sh`

### 4. Database Setup

If you haven't already:
1. Add PostgreSQL service in Railway
2. Railway will automatically add DATABASE_URL to your environment

### 5. Common Error Messages and Fixes

#### "Cannot find module '@replit/vite-plugin-runtime-error-modal'"
- Use the production vite config as shown above

#### "Error: SESSION_SECRET is required"
- Add SESSION_SECRET environment variable in Railway

#### "Error: connect ECONNREFUSED" (database)
- Add PostgreSQL service in Railway
- Wait for database to be ready before deploying

#### "Cannot find module 'esbuild'"
- Already in devDependencies, should work with npm install

### 6. After Successful Deploy

1. Run database migrations:
   - Go to Railway → Your Service → Shell
   - Run: `npm run db:push`

2. Access your app:
   - Railway provides URL like: `your-app.up.railway.app`

## Still Having Issues?

Share the exact error message from Railway build logs and I'll provide a specific fix.