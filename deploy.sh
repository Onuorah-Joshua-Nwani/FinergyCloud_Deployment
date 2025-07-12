#!/bin/bash
# Replit Production Deployment Script
set -e

echo "🚀 Starting FinergyCloud production deployment..."

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-5000}

# Install production dependencies only
echo "📦 Installing production dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build

# Start the production server
echo "✅ Starting production server on port $PORT..."
node dist/index.js