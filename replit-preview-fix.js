/**
 * FinergyCloud Preview Window Fix
 * This script ensures proper server startup for Replit preview functionality
 */

import { spawn } from 'child_process';
import { execSync } from 'child_process';

console.log('🚀 FinergyCloud Preview Window Fix');
console.log('Starting server with optimized settings...');

// Kill any existing server processes
const killExisting = () => {
  try {
    execSync('pkill -f "tsx server/index.ts" || true');
    execSync('pkill -f "simple-start.js" || true');
    console.log('✓ Cleaned up existing processes');
  } catch (error) {
    console.log('No existing processes to clean up');
  }
};

// Start the server
const startServer = () => {
  killExisting();
  
  console.log('🔄 Starting FinergyCloud server...');
  
  const server = spawn('node', ['simple-start.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
      ...process.env,
      NODE_ENV: 'development',
      PORT: '5000'
    }
  });

  server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    
    if (output.includes('🟢 REPLIT SERVER READY ON PORT 5000 🟢')) {
      console.log('✅ Server ready for preview window!');
      console.log('Preview URL: https://7dd13212-e6ad-4c47-be70-2f844171b442-00-15tmn1l2tiykx.spock.replit.dev');
    }
  });

  server.stderr.on('data', (data) => {
    console.error(`Server error: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
    if (code !== 0) {
      console.log('Restarting server...');
      setTimeout(startServer, 2000);
    }
  });

  return server;
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  killExisting();
  process.exit(0);
});

// Start the server
startServer();