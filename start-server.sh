#!/bin/bash
echo "Starting FinergyCloud server..."
cd "$(dirname "$0")"
NODE_ENV=development PORT=5000 npx tsx server/index.ts