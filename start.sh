#!/bin/bash
set -e

echo "🚀 FinergyCloud Run Button Startup"
echo "Working directory: $(pwd)"
echo "Node version: $(node --version)"

# Set environment variables
export NODE_ENV=development
export PORT=5000

# Make sure robust-start.js is executable
chmod +x robust-start.js

# Start the server using the robust startup script
echo "🔄 Starting server with robust startup script..."
exec node robust-start.js