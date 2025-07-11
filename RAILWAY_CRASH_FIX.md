# Railway Crash Fix - Critical Environment Variables

Railway is crashing because of missing environment variables and database configuration. Here's what you need to set in Railway dashboard:

## Required Environment Variables

### 1. SESSION_SECRET (CRITICAL)
```
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random
```
**Without this, the app will crash immediately**

### 2. NODE_ENV
```
NODE_ENV=production
```

### 3. PORT (Optional - Railway sets automatically)
```
PORT=3000
```

## Database Configuration (Optional)

If you want database functionality:
```
DATABASE_URL=postgresql://username:password@host:port/database
```

**Note: The app can run WITHOUT a database (uses memory storage)**

## How to Set Environment Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Variables" tab
4. Add these environment variables:
   - `SESSION_SECRET` = `finergycloud-super-secret-session-key-2025-railway-deployment`
   - `NODE_ENV` = `production`

## Quick Fix Steps

1. **Set SESSION_SECRET** - This is the most critical fix
2. **Redeploy** - Railway will automatically redeploy with new variables
3. **Check logs** - Should show "Database not available, running without database" instead of crashing

## Expected Behavior After Fix

✅ App starts successfully  
✅ Serves website on Railway domain  
✅ Uses memory storage (no database needed)  
✅ Session management works  
✅ All pages load correctly  

The app is designed to work perfectly without a database for the static website experience.