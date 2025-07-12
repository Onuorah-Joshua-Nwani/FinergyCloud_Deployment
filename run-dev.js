#!/usr/bin/env node

/**
 * Robust development server script for Replit Run Button
 * Fixes npm run dev crashes by handling environment variables properly
 */

// Set environment before importing anything
process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '5000';

import { spawn } from 'child_process';

console.log('🚀 FinergyCloud Development Server (Run Button Compatible)');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);

// Use spawn instead of exec for better process control
const tsx = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: process.env,
  shell: false
});

tsx.on('error', (err) => {
  console.error('Failed to start development server:', err);
  process.exit(1);
});

tsx.on('close', (code) => {
  if (code !== 0) {
    console.error(`Development server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle shutdown signals
process.on('SIGTERM', () => tsx.kill('SIGTERM'));
process.on('SIGINT', () => tsx.kill('SIGINT'));