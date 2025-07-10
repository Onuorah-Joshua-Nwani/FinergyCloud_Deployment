# How to Separate Web Platform from Main Branch

## Current Situation
You merged the web platform into your main branch, but you want to keep them separate.

## Solution: Create Separate Branches

### Step 1: Create a Clean Web Platform Branch
1. Go to your GitHub repository: https://github.com/Onuorah-Joshua-Nwani/ojn-msp-1-finergycloud
2. Click on "Branches" tab
3. Create a new branch called "web-platform-standalone"
4. This will contain only the web platform files

### Step 2: Revert Main Branch (Option A - Recommended)
1. Go to your repository's main branch
2. Click on "Commits" to see the commit history
3. Find the merge commit that added the web platform
4. Click on it and select "Revert this commit"
5. This will remove the web platform files from main branch

### Step 3: Alternative - Manual Cleanup (Option B)
If reverting doesn't work, manually remove these web platform files from main branch:
- `client/` folder
- `server/` folder  
- `shared/` folder
- `package.json` (web platform version)
- `package-lock.json` (web platform version)
- `vite.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `drizzle.config.ts`
- `components.json`
- `postcss.config.js`
- `PLATFORM.md`
- `DEPLOYMENT_GUIDE.md`
- `GIT_COMMANDS.md`

### Step 4: Final Repository Structure
After separation:

**Main Branch:**
- Your original mobile app
- Static website files (index.html, about.html, etc.)
- Original assets and documentation

**Web-Platform-Standalone Branch:**
- Complete React/Express web application
- Database integration
- AI features and advanced analytics
- All web platform documentation

## Commands to Run (if using local git)
```bash
# Clone repository
git clone https://github.com/Onuorah-Joshua-Nwani/ojn-msp-1-finergycloud.git
cd ojn-msp-1-finergycloud

# Create clean web platform branch
git checkout -b web-platform-standalone

# Remove mobile app files, keep only web platform
rm -rf mobile-app/
rm -rf assets/
rm -rf documentation/
rm -rf dashboard-integration/
rm -rf technical-documentation/
rm -rf .devcontainer/
rm -rf .theia/
rm *.html
rm CNAME
rm FinergyCloud-Pitch-Deck.md
rm favicon.ico
rm logo-usage-guide.html
rm privacy.html
rm security.html

# Commit clean web platform
git add .
git commit -m "Clean web platform branch - removed mobile app files"
git push -u origin web-platform-standalone

# Switch back to main and revert the merge
git checkout main
git revert HEAD~1  # Revert the merge commit
git push origin main
```

## Result
- **Main branch**: Original mobile app and static website
- **Web-platform-standalone**: Clean web platform only
- Both can be deployed independently
- No file conflicts between branches

This gives you the clean separation you wanted!