#!/usr/bin/env node

// Production entry point for FinergyCloud
// Handles multiple startup scenarios with proper error handling

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set production environment
process.env.NODE_ENV = 'production';

console.log('🚀 FinergyCloud - Starting production server...');
console.log('📍 Working directory:', __dirname);
console.log('🌍 Environment:', process.env.NODE_ENV);

// Add process error handlers
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

async function startServer() {
  try {
    const distPath = join(__dirname, 'dist', 'index.js');
    console.log('🔍 Checking for built files at:', distPath);
    
    if (existsSync(distPath)) {
      // Use built version if it exists
      console.log('✅ Built files found, starting from dist...');
      await import('./dist/index.js');
    } else {
      // Fallback to running TypeScript directly with tsx
      console.log('⚠️  Built files not found, running from TypeScript source...');
      console.log('📦 Loading tsx for TypeScript execution...');
      
      // Use tsx to run TypeScript directly (use dynamic import for ESM)
      const tsx = await import('tsx/esm');
      tsx.register();
      
      // Import and start the server
      console.log('📂 Importing server from:', join(__dirname, 'server', 'index.ts'));
      await import('./server/index.ts');
    }
    
    console.log('🎉 Server started successfully!');
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    console.error('📊 Stack trace:', error.stack);
    
    // Try alternative startup methods
    console.log('🔄 Attempting alternative startup...');
    try {
      // Try direct execution with tsx
      const { spawn } = require('child_process');
      const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
        stdio: 'inherit',
        cwd: __dirname,
        env: { ...process.env, NODE_ENV: 'production' }
      });
      
      serverProcess.on('error', (err) => {
        console.error('❌ Alternative startup failed:', err);
        process.exit(1);
      });
      
      serverProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`❌ Server process exited with code ${code}`);
          process.exit(code);
        }
      });
      
    } catch (fallbackError) {
      console.error('💀 All startup methods failed:', fallbackError);
      process.exit(1);
    }
  }
}

// Start the server
startServer();