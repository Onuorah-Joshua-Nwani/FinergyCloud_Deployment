#!/bin/bash

# FinergyCloud Development Server Startup Script
echo "🚀 Starting FinergyCloud Development Server..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if we're in production mode
if [ "$NODE_ENV" = "production" ]; then
    echo "🌟 Starting in production mode..."
    node start.js
else
    echo "🔧 Starting in development mode..."
    NODE_ENV=development npx tsx server/index.ts
fi