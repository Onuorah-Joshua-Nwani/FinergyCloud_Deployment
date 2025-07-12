#!/bin/bash
set -e
export NODE_ENV=development
export PORT=5000
echo "Starting FinergyCloud server..."
echo "Working directory: $(pwd)"
echo "Node version: $(node --version)"
echo "NPX available: $(which npx)"
exec npx tsx server/index.ts