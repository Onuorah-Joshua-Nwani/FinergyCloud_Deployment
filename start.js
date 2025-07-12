#!/usr/bin/env node
/**
 * Production startup script for FinergyCloud
 * This script starts the application in production mode for Replit Cloud Run
 */

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '8080';

console.log('Starting FinergyCloud in production mode...');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);

// Import and start the server
import('./dist/index.js').catch((error) => {
  console.error('Failed to start FinergyCloud server:', error);
  console.error('Error details:', error.stack);
  process.exit(1);
});