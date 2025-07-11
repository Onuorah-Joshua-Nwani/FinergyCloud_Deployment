# Railway 502 Bad Gateway Fix

## Problem
App deployed successfully but shows 502 Bad Gateway error. This means:
- ✅ Build completed successfully
- ❌ App is crashing on startup
- ❌ Server not listening on correct port or missing environment variables

## Critical Fix Required

### 1. Set Environment Variables in Railway Dashboard:

**Go to Railway → Your Project → Variables Tab and add:**

```
SESSION_SECRET=finergycloud-super-secret-session-key-2025-railway-deployment
NODE_ENV=production
PORT=3000
```

### 2. Railway Port Configuration Issue:

Railway expects your app to listen on `process.env.PORT` but might be passing a different port. 

**Update server/index.ts** to handle Railway's port properly:

```javascript
// At the end of server/index.ts, replace the listen line with:
const port = process.env.PORT || 5000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Database URL available: ${!!process.env.DATABASE_URL}`);
  console.log(`Session secret available: ${!!process.env.SESSION_SECRET}`);
});
```

## Most Likely Cause:
**Missing SESSION_SECRET** - Without this environment variable, Express sessions will crash immediately, causing 502 error.

## Quick Test:
After setting the environment variables, Railway should automatically redeploy. Check the logs in Railway dashboard to see the startup status.

## Expected Fix:
Setting `SESSION_SECRET` should resolve the 502 error immediately since the app is designed to run without a database.