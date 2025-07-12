# Replit Run Button Fix Documentation

## Issue Identified
The `npm run dev` command crashes when run through Replit's Run Button due to inline environment variable setting:
```json
"dev": "NODE_ENV=development tsx server/index.ts"
```

This syntax can cause process spawning issues in Replit's workflow environment.

## Solution Options

### Option 1: Update npm script to use Node.js file (Recommended)
Since package.json cannot be edited directly, we created `run-dev.js` as an alternative.

### Option 2: Manual .replit file update
Update `.replit` to use direct command:
```
run = "node run-dev.js"
```

### Option 3: Environment variable fix
The issue is that inline environment variables in npm scripts don't work reliably in Replit workflows.

## Test Results
- Direct command `NODE_ENV=development npx tsx server/index.ts` works perfectly
- Server starts successfully with all features functional
- Blog reading modal and social sharing working
- Database connection established
- Port 5000 serving correctly

## Current Status
- Server functionality: ✅ Working
- Blog features: ✅ Working  
- Run button: ❌ Crashes due to npm script env var issue
- Manual startup: ✅ Working

## Recommended Fix
Update `.replit` file to:
```
run = "node run-dev.js"
```

This bypasses the problematic npm script and uses our robust startup file.