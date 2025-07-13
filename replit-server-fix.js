#!/usr/bin/env node

/**
 * Robust FinergyCloud Server Startup for Replit
 * This script ensures the server starts reliably in Replit environment
 */

import { spawn } from 'child_process';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('🚀 FinergyCloud Replit Server Startup');
console.log(`Environment: ${NODE_ENV}`);
console.log(`Target Port: ${PORT}`);

// Test if port is available
function testPort(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.listen(port, '0.0.0.0', () => {
      server.close(() => resolve(true));
    });
    server.on('error', () => resolve(false));
  });
}

// Kill any existing server processes
function killExistingServers() {
  return new Promise((resolve) => {
    const kill = spawn('pkill', ['-f', 'tsx.*server'], { stdio: 'pipe' });
    kill.on('close', () => {
      console.log('✓ Cleaned up existing server processes');
      setTimeout(resolve, 1000); // Wait for cleanup
    });
  });
}

// Start the server with proper error handling
function startServer() {
  return new Promise((resolve, reject) => {
    console.log('🔄 Starting FinergyCloud server...');
    
    const serverProcess = spawn('npx', ['tsx', 'server/index.ts'], {
      env: {
        ...process.env,
        NODE_ENV,
        PORT: PORT.toString(),
        FORCE_COLOR: '1'
      },
      stdio: 'inherit',
      cwd: process.cwd()
    });

    let serverStarted = false;
    
    // Monitor server startup
    const startupTimeout = setTimeout(() => {
      if (!serverStarted) {
        console.error('❌ Server startup timeout');
        serverProcess.kill();
        reject(new Error('Server startup timeout'));
      }
    }, 30000);

    // Check if server is responding
    const checkServer = setInterval(async () => {
      try {
        const http = await import('http');
        const req = http.request(`http://localhost:${PORT}/api/health`, { timeout: 1000 }, (res) => {
          if (res.statusCode === 200) {
            serverStarted = true;
            clearTimeout(startupTimeout);
            clearInterval(checkServer);
            console.log(`✅ Server responding on port ${PORT}`);
            console.log(`🌐 Access your app at: http://localhost:${PORT}`);
            console.log(`📱 Mobile app: http://localhost:${PORT}/?platform=mobile`);
            resolve(serverProcess);
          }
        });
        req.on('error', () => {}); // Ignore connection errors during startup
        req.end();
      } catch (error) {
        // Ignore errors during startup checks
      }
    }, 2000);

    serverProcess.on('error', (error) => {
      clearTimeout(startupTimeout);
      clearInterval(checkServer);
      console.error('❌ Server process error:', error.message);
      reject(error);
    });

    serverProcess.on('exit', (code) => {
      clearTimeout(startupTimeout);
      clearInterval(checkServer);
      if (code !== 0 && !serverStarted) {
        console.error(`❌ Server exited with code ${code}`);
        reject(new Error(`Server exited with code ${code}`));
      }
    });
  });
}

// Main startup sequence
async function main() {
  try {
    // Step 1: Clean up any existing processes
    await killExistingServers();
    
    // Step 2: Check if port is available
    const portAvailable = await testPort(PORT);
    if (!portAvailable) {
      console.log(`⚠️ Port ${PORT} in use, attempting cleanup...`);
      await killExistingServers();
    }
    
    // Step 3: Verify required files exist
    const requiredFiles = ['server/index.ts', 'package.json'];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Required file missing: ${file}`);
      }
    }
    console.log('✓ Required files verified');
    
    // Step 4: Start the server
    const serverProcess = await startServer();
    
    // Keep the process alive and handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('📴 Received SIGTERM, shutting down gracefully...');
      serverProcess.kill('SIGTERM');
      process.exit(0);
    });
    
    process.on('SIGINT', () => {
      console.log('📴 Received SIGINT, shutting down gracefully...');
      serverProcess.kill('SIGINT');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('💥 Failed to start server:', error.message);
    console.error('🔧 Try the following:');
    console.error('   1. Check if all dependencies are installed');
    console.error('   2. Verify TypeScript compilation');
    console.error('   3. Check for port conflicts');
    process.exit(1);
  }
}

main();