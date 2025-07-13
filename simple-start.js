#!/usr/bin/env node
/**
 * Simple startup script for Replit Run Button
 */

import { spawn } from 'child_process';

console.log('🚀 Starting FinergyCloud...');

const server = spawn('npx', ['tsx', 'server/index.ts'], {
  env: {
    ...process.env,
    NODE_ENV: 'development',
    PORT: '5000'
  },
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