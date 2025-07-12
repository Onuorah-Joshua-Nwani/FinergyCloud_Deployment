#!/bin/bash
# Production startup script for Replit Cloud Run deployment
set -e

echo "Starting FinergyCloud in production mode..."

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-8080}

# Check if dist directory exists, if not build the app
if [ ! -d "dist" ]; then
    echo "Building application..."
    npm run build
fi

# Start the production server
echo "Starting server on port $PORT..."
exec node dist/index.js