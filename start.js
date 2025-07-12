#!/usr/bin/env node
/**
 * Production startup script for FinergyCloud
 * This script starts the application in production mode
 */

process.env.NODE_ENV = 'production';

// Import and start the server
import('./dist/index.js').catch((error) => {
  console.error('Failed to start FinergyCloud server:', error);
  process.exit(1);
});