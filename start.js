#!/usr/bin/env node
/**
 * Production startup script for FinergyCloud
 * This script starts the application in production mode for Replit Cloud Run
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '8080';

console.log('🚀 Starting FinergyCloud in production mode...');
console.log(`📊 Environment: ${process.env.NODE_ENV}`);
console.log(`🌐 Port: ${process.env.PORT}`);
console.log(`📁 Working Directory: ${process.cwd()}`);

// Check if build directory exists
const distPath = join(__dirname, 'dist', 'index.js');
console.log(`🔍 Checking for build at: ${distPath}`);

if (!existsSync(distPath)) {
  console.error('❌ Build directory not found! Running build command...');
  const { spawn } = await import('child_process');
  
  const buildProcess = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true
  });
  
  buildProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('✅ Build completed successfully');
      startServer();
    } else {
      console.error('❌ Build failed with exit code:', code);
      process.exit(1);
    }
  });
} else {
  console.log('✅ Build found, starting server...');
  startServer();
}

async function startServer() {
  try {
    // Import and start the server
    await import('./dist/index.js');
    console.log('✅ FinergyCloud server started successfully');
  } catch (error) {
    console.error('❌ Failed to start FinergyCloud server:', error);
    console.error('Error details:', error.stack);
    
    // Try alternative paths
    const altPaths = [
      './dist/server/index.js',
      './server/index.js'
    ];
    
    for (const altPath of altPaths) {
      try {
        console.log(`🔄 Trying alternative path: ${altPath}`);
        await import(altPath);
        console.log('✅ Server started with alternative path');
        return;
      } catch (altError) {
        console.log(`❌ Alternative path ${altPath} failed:`, altError.message);
      }
    }
    
    console.error('❌ All startup attempts failed');
    process.exit(1);
  }
}