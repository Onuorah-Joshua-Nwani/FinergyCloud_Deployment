#!/bin/bash

# Railway build script for FinergyCloud
echo "Starting FinergyCloud build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the client
echo "Building client application..."
cd client
npm run build || vite build
cd ..

# Build the server
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build complete!"