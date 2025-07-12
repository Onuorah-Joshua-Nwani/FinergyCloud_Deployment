#!/usr/bin/env node

/**
 * Development startup script for FinergyCloud
 * Ensures proper environment setup and error handling
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting FinergyCloud development server...');

// Set environment
process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '5000';

console.log(`📊 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT}`);

// Start the server with proper error handling
const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    PORT: process.env.PORT || '5000'
  }
});

serverProcess.on('error', (error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});

serverProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`❌ Development server exited with code ${code} (signal: ${signal})`);
    process.exit(code || 1);
  }
  console.log('✅ Development server stopped gracefully');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, stopping development server...');
  serverProcess.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, stopping development server...');
  serverProcess.kill('SIGINT');
});

console.log('✅ Development server starting...');