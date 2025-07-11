# Railway Deployment Final Fix

## Issues and Solutions

### 1. Deployment Crashes
The app crashes because it needs proper session configuration and environment variables.

### 2. Custom Domain Not Working
After adding CNAME, you need to wait for DNS propagation (can take up to 48 hours).

## Complete Fix Instructions

### Step 1: Update These Files in GitHub

#### server/routes.ts
Add this health check at the beginning of `registerRoutes` function (after line 11):
```javascript
  // Health check endpoint for Railway
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
```

#### server/index.ts
Replace the port configuration (around line 62):
```javascript
  // Use Railway's PORT or fallback to 5000 for local development
  const port = process.env.PORT || 5000;
  server.listen({
    port: Number(port),
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
```

### Step 2: Railway Environment Variables
Add these in Railway's Variables tab:
- `NODE_ENV` = `production`
- `SESSION_SECRET` = `any-random-string-you-create`

### Step 3: Railway Settings
1. Under Settings > Networking:
   - Port: Set to `5000`
   - Generate Domain if not already done

2. Under Settings > Health Checks:
   - Enable health checks
   - Path: `/api/health`
   - Timeout: 30 seconds

### Step 4: Custom Domain Setup
1. In Railway > Settings > Domains:
   - Add your custom domain
   - Railway will give you a CNAME record

2. In your domain provider:
   - Add CNAME record pointing to Railway's domain
   - Wait for DNS propagation (up to 48 hours)

3. Check propagation status at: https://dnschecker.org

## Debugging Steps
1. Check Railway logs for specific errors
2. Verify all environment variables are set
3. Ensure health check endpoint responds
4. Test with Railway's generated domain first before custom domain

## Expected Result
- App runs without crashes
- Health checks pass
- Accessible via Railway domain immediately
- Custom domain works after DNS propagation