#!/bin/bash

# Simple build script for deployment
echo "🔨 Building FinergyCloud for deployment..."

# Create dist directory
mkdir -p dist

# Build server with esbuild
echo "📦 Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

if [ $? -eq 0 ]; then
    echo "✅ Server build successful"
else
    echo "❌ Server build failed"
    exit 1
fi

# Try to build frontend (with timeout to prevent hanging)
echo "🎨 Building frontend..."
timeout 60 npx vite build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "⚠️  Frontend build timed out or failed, but server can still run"
fi

echo "🚀 Build completed. Use 'node start.js' to run the application."