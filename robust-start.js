#!/usr/bin/env node
/**
 * Ultra-robust startup script for Replit preview stability
 * Handles crashes, memory issues, and provides continuous server availability
 */

import { spawn } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 FinergyCloud Robust Startup');
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('Target Port:', process.env.PORT || '5000');

// Kill any existing processes
function killExistingServers() {
  try {
    console.log('🧹 Cleaning up existing server processes...');
    
    // Kill any existing tsx processes
    spawn('pkill', ['-f', 'tsx.*server'], { stdio: 'pipe' });
    
    // Kill any node processes on port 5000
    spawn('pkill', ['-f', 'node.*5000'], { stdio: 'pipe' });
    
    // Wait a moment for cleanup
    setTimeout(() => {
      console.log('✓ Cleanup completed');
    }, 1000);
  } catch (error) {
    console.log('Note: No existing processes to clean up');
  }
}

// Function to start the server with auto-restart
function startServerWithRestart() {
  let restartCount = 0;
  const maxRestarts = 10;
  
  function startServer() {
    if (restartCount >= maxRestarts) {
      console.error('❌ Maximum restart attempts reached. Please check for errors.');
      process.exit(1);
    }
    
    console.log('🔄 Starting FinergyCloud server...');
    
    const server = spawn('npx', ['tsx', 'server/index.ts'], {
      env: {
        ...process.env,
        NODE_ENV: 'development',
        PORT: '5000'
      },
      stdio: 'inherit'
    });
    
    server.on('exit', (code, signal) => {
      console.log(`Server exited with code ${code}, signal ${signal}`);
      
      if (code !== 0 && signal !== 'SIGTERM' && signal !== 'SIGINT') {
        restartCount++;
        console.log(`⚠️  Server crashed! Restarting (attempt ${restartCount}/${maxRestarts})...`);
        
        // Wait 2 seconds before restarting
        setTimeout(() => {
          startServer();
        }, 2000);
      }
    });
    
    server.on('error', (error) => {
      console.error('Server error:', error);
      restartCount++;
      
      setTimeout(() => {
        startServer();
      }, 2000);
    });
    
    // Handle process termination
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM, shutting down gracefully...');
      server.kill('SIGTERM');
    });
    
    process.on('SIGINT', () => {
      console.log('Received SIGINT, shutting down gracefully...');
      server.kill('SIGINT');
    });
    
    // Test server health after startup
    setTimeout(() => {
      testServerHealth();
    }, 5000);
  }
  
  startServer();
}

// Function to test server health
function testServerHealth() {
  import('http').then(({ default: http }) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/health',
      method: 'GET'
    }, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Server health check passed');
        console.log('🌐 Preview URL: http://localhost:5000');
        console.log('📱 Mobile app: http://localhost:5000/?platform=mobile');
      } else {
        console.log('⚠️  Server health check failed');
      }
    });
    
    req.on('error', (error) => {
      console.log('⚠️  Server health check error:', error.message);
    });
    
    req.setTimeout(5000, () => {
      console.log('⚠️  Server health check timeout');
      req.destroy();
    });
    
    req.end();
  });
}

// Start the process
killExistingServers();
setTimeout(() => {
  startServerWithRestart();
}, 2000);