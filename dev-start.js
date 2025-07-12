#!/usr/bin/env node

/**
 * Development startup script for FinergyCloud
 * This script bypasses npm and directly starts the TypeScript server
 * Optimized for Replit Run Button compatibility
 */

import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set environment for development
process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '5000';

console.log('🚀 FinergyCloud Development Server');
console.log(`📍 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT}`);

// Direct TypeScript execution for maximum compatibility
const startCommand = 'npx tsx server/index.ts';

console.log('⚡ Starting TypeScript server directly...');

const child = exec(startCommand, {
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    PORT: process.env.PORT || '5000'
  }
});

// Pipe all output to console
child.stdout?.on('data', (data) => {
  process.stdout.write(data);
});

child.stderr?.on('data', (data) => {
  process.stderr.write(data);
});

child.on('error', (error) => {
  console.error('❌ Server startup failed:', error.message);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code} (signal: ${signal})`);
    process.exit(code || 1);
  }
  console.log('✅ Server stopped gracefully');
});

// Graceful shutdown handling
['SIGTERM', 'SIGINT', 'SIGQUIT'].forEach(signal => {
  process.on(signal, () => {
    console.log(`🛑 ${signal} received, shutting down...`);
    child.kill(signal);
  });
});

console.log('✅ Server initialization complete');