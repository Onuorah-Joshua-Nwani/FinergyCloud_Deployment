# Railway Crash Fix Guide

## Common Crash Causes and Solutions

### 1. Port Configuration (FIXED)
Updated `server/index.ts` to use Railway's PORT environment variable:
```javascript
const port = process.env.PORT || 5000;
```

### 2. Required Environment Variables
In Railway Service Settings > Variables, add:
- `NODE_ENV=production`
- `SESSION_SECRET=your-random-secret-key-here` (generate a random string)
- `DATABASE_URL` (if using PostgreSQL - Railway can provide this)

### 3. Session Store Configuration
The app uses express-session which needs proper configuration in production.

### 4. Health Check Configuration
Railway needs a health check endpoint to know if your app is running.

## Permanent Fix Steps

1. **Add Environment Variables in Railway:**
   - Go to your service in Railway
   - Click on "Variables" tab
   - Add:
     ```
     NODE_ENV=production
     SESSION_SECRET=generate-a-random-string-here
     ```

2. **Enable Railway's Health Checks:**
   - In Railway service settings
   - Go to "Settings" > "Health Checks"
   - Enable health checks
   - Set path to `/` or `/api/health`

3. **Check Logs:**
   - Click on "Logs" tab in Railway
   - Look for any error messages
   - Common issues:
     - Missing environment variables
     - Database connection errors
     - Memory limits

## Creating a Health Check Endpoint

Add this to your `server/routes.ts`:
```typescript
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

## Restart Policy
Railway.json already has restart policy configured:
- `restartPolicyType: "ON_FAILURE"`
- `restartPolicyMaxRetries: 10`

This means Railway will automatically restart your app if it crashes, up to 10 times.

## Next Steps
1. Add the required environment variables
2. Monitor the logs for specific error messages
3. The app should run stably without manual intervention