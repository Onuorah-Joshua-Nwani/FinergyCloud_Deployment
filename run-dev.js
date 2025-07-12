#!/usr/bin/env node

/**
 * Ultra-robust development server for Replit Run Button
 * Handles all edge cases and provides detailed crash diagnosis
 */

process.env.NODE_ENV = 'development';
process.env.PORT = process.env.PORT || '5000';

import { exec } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 FinergyCloud Development Server (Crash-Resistant)');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);

// Pre-flight checks
const serverFile = join(process.cwd(), 'server/index.ts');
const nodeModules = join(process.cwd(), 'node_modules');

console.log('Running pre-flight checks...');
console.log(`Server file exists: ${existsSync(serverFile)}`);
console.log(`Node modules exists: ${existsSync(nodeModules)}`);

// Check if tsx is available
exec('which tsx', (error, stdout) => {
  if (error) {
    console.log('tsx not found globally, using npx...');
  } else {
    console.log(`tsx found at: ${stdout.trim()}`);
  }
});

// Multiple fallback startup methods
const startupMethods = [
  'npx tsx server/index.ts',
  'tsx server/index.ts',
  'node --loader tsx/esm server/index.ts'
];

let methodIndex = 0;

function tryStartup() {
  if (methodIndex >= startupMethods.length) {
    console.error('❌ All startup methods failed');
    process.exit(1);
  }

  const command = startupMethods[methodIndex];
  console.log(`🔄 Attempting startup method ${methodIndex + 1}: ${command}`);

  const child = exec(command, {
    env: process.env,
    cwd: process.cwd()
  });

  let startupTimeout = setTimeout(() => {
    console.log('⚠️ Startup taking too long, checking next method...');
    child.kill();
    methodIndex++;
    tryStartup();
  }, 10000);

  child.stdout?.on('data', (data) => {
    process.stdout.write(data);
    if (data.includes('Server started successfully')) {
      clearTimeout(startupTimeout);
      console.log('✅ Server startup confirmed');
    }
  });

  child.stderr?.on('data', (data) => {
    process.stderr.write(data);
  });

  child.on('error', (error) => {
    clearTimeout(startupTimeout);
    console.error(`❌ Method ${methodIndex + 1} failed:`, error.message);
    methodIndex++;
    setTimeout(tryStartup, 1000);
  });

  child.on('exit', (code, signal) => {
    clearTimeout(startupTimeout);
    if (code !== 0 && methodIndex < startupMethods.length - 1) {
      console.log(`⚠️ Method ${methodIndex + 1} exited with code ${code}, trying next...`);
      methodIndex++;
      setTimeout(tryStartup, 1000);
    } else if (code !== 0) {
      console.error(`❌ Final method failed with code ${code}`);
      process.exit(code);
    }
  });

  // Handle shutdown
  ['SIGTERM', 'SIGINT'].forEach(signal => {
    process.on(signal, () => {
      console.log(`🛑 Received ${signal}, shutting down...`);
      child.kill(signal);
    });
  });
}

tryStartup();