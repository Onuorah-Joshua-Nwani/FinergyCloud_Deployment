#!/bin/bash
set -e

echo "🚀 FinergyCloud Startup Script"
echo "Working directory: $(pwd)"
echo "Node version: $(node --version)"

# Set environment variables
export NODE_ENV=development
export PORT=5000

# Kill any existing processes
pkill -f "tsx.*server" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true
sleep 2

# Start the server directly
exec npx tsx server/index.ts