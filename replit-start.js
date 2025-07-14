#!/usr/bin/env node
/**
 * Alternative startup script for Replit Run Button
 * Uses the robust-start.js approach for maximum stability
 */

import { spawn } from 'child_process';

console.log('🚀 Replit Run Button Startup (Robust)');

const server = spawn('node', ['robust-start.js'], {
  stdio: 'inherit'
});

server.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Server exited with code ${code}`);
    process.exit(code);
  }
});

process.on('SIGTERM', () => server.kill('SIGTERM'));
process.on('SIGINT', () => server.kill('SIGINT'));