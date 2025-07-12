#!/bin/bash
# Comprehensive deployment script for FinergyCloud
# This script handles the complete build and deployment process for Replit Cloud Run

set -e  # Exit on any error

echo "🚀 Starting FinergyCloud deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Set environment variables
export NODE_ENV=production
export PORT=${PORT:-8080}

log_info "Environment: $NODE_ENV"
log_info "Port: $PORT"
log_info "Working Directory: $(pwd)"

# Check Node.js version
log_info "Checking Node.js version..."
node_version=$(node --version)
log_info "Node.js version: $node_version"

# Check npm version
npm_version=$(npm --version)
log_info "npm version: $npm_version"

# Clean previous builds
log_info "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache/
log_success "Previous builds cleaned"

# Install dependencies
log_info "Installing dependencies..."
npm ci --production=false
log_success "Dependencies installed"

# Run build
log_info "Building application..."
npm run build
log_success "Application built successfully"

# Verify build output
log_info "Verifying build output..."
if [ -f "dist/index.js" ]; then
    log_success "Server build found at dist/index.js"
else
    log_error "Server build not found at dist/index.js"
    exit 1
fi

if [ -d "dist/public" ]; then
    log_success "Client build found at dist/public"
else
    log_error "Client build not found at dist/public"
    exit 1
fi

# Check start.js exists
if [ -f "start.js" ]; then
    log_success "Production startup script found"
else
    log_error "start.js not found"
    exit 1
fi

# Install only production dependencies for final deployment
log_info "Installing production dependencies..."
npm ci --production=true
log_success "Production dependencies installed"

log_success "🎉 Deployment preparation completed successfully!"
log_info "🚀 Ready to start with: node start.js"

# Optional: Start the server if requested
if [ "$1" = "--start" ]; then
    log_info "Starting server..."
    node start.js
fi