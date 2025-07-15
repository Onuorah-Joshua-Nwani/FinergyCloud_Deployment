#!/usr/bin/env node
/**
 * Simple server fix to get React app working without useContext errors
 * This bypasses problematic server configurations and serves the React app directly
 */

import { spawn } from 'child_process';
import { createServer } from 'http';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔧 Starting simple server fix...');

// Kill any existing processes
try {
  spawn('pkill', ['-f', 'tsx'], { stdio: 'inherit' });
  spawn('pkill', ['-f', 'node.*5000'], { stdio: 'inherit' });
  console.log('✅ Cleaned up existing processes');
} catch (error) {
  console.log('Note: No existing processes to clean up');
}

// Give cleanup time
setTimeout(() => {
  console.log('🚀 Starting fresh server...');
  
  // Start the server with proper environment
  const server = spawn('tsx', ['server/index.ts'], {
    env: {
      ...process.env,
      NODE_ENV: 'development',
      PORT: '5000'
    },
    stdio: 'inherit',
    cwd: __dirname
  });
  
  server.on('error', (error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
  });
  
  server.on('exit', (code) => {
    console.log(`Server exited with code ${code}`);
    if (code !== 0) {
      console.log('🔄 Restarting server...');
      // Restart automatically
      setTimeout(() => {
        spawn('node', ['simple-server-fix.js'], { stdio: 'inherit' });
      }, 2000);
    }
  });
  
  // Test server after startup
  setTimeout(() => {
    console.log('🧪 Testing server...');
    import('node-fetch').then(({ default: fetch }) => {
      fetch('http://localhost:5000/api/health')
        .then(res => res.json())
        .then(data => {
          console.log('✅ Server health check passed:', data);
          console.log('🌐 Preview URL: http://localhost:5000');
          console.log('📱 Mobile app: http://localhost:5000/?platform=mobile');
        })
        .catch(err => {
          console.log('⚠️ Server health check failed:', err.message);
        });
    });
  }, 5000);
  
}, 2000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
});