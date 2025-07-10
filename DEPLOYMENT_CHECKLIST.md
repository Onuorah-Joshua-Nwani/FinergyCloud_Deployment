# FinergyCloud Platform Deployment Checklist

## Files That Should Be in Your GitHub Branch

### Essential Platform Files:
- `index.html` (in root) - Main entry point
- `package.json` - Dependencies and scripts
- `package-lock.json` - Dependency lock file

### Frontend (client/) Directory:
- `client/src/` - All React source code
- `client/index.html` - Vite entry point

### Backend (server/) Directory:
- `server/index.ts` - Main server file
- `server/routes.ts` - API routes
- `server/auth.ts` - Authentication system
- `server/storage.ts` - Data storage
- `server/db.ts` - Database connection
- `server/vite.ts` - Vite integration

### Shared Code:
- `shared/schema.ts` - Database schemas
- `shared/currency.ts` - Currency utilities

### Configuration Files:
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS config
- `tsconfig.json` - TypeScript config
- `drizzle.config.ts` - Database config
- `postcss.config.js` - PostCSS config
- `components.json` - UI components config

### Documentation:
- `README.md` - Platform documentation
- `PLATFORM.md` - Technical details
- `development environment.md` - Project context

## Files to REMOVE from Your Branch:

### Old Mobile App Files:
- Any `index.html` files that reference mobile app
- Old `README.md` with mobile app content
- Any React Native or mobile-specific directories
- Old deployment scripts not related to web platform

### Old Configuration:
- Any old `package.json` files with different dependencies
- Old build configurations
- Legacy documentation files

## Quick Fix Steps:

1. **Delete everything** in your GitHub branch
2. **Upload only** the files from this development environment
3. **Commit** with message "Clean platform deployment"
4. **Wait** 2-5 minutes for GitHub Pages to rebuild

This ensures a clean deployment without mixed old/new files.