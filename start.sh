#!/bin/bash
export NODE_ENV=development
export PORT=5000
echo "Starting FinergyCloud server..."
npx tsx server/index.ts