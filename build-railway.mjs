#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('Railway Build Script Starting...');

// Check if client/index.html exists
if (!existsSync('./client/index.html')) {
  console.error('ERROR: client/index.html not found!');
  console.log('Current directory:', process.cwd());
  console.log('Directory contents:');
  execSync('ls -la', { stdio: 'inherit' });
  console.log('\nClient directory contents:');
  execSync('ls -la client/', { stdio: 'inherit' });
  process.exit(1);
}

try {
  // Clean npm cache to avoid version conflicts
  console.log('Cleaning npm cache...');
  execSync('npm cache clean --force || true', { stdio: 'inherit' });
  
  // Remove any existing lock files that might have version conflicts
  execSync('rm -f package-lock.json || true', { stdio: 'inherit' });
  
  // Install fresh dependencies
  console.log('Installing dependencies with clean slate...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  // Build using the production config
  console.log('Building client with vite...');
  execSync('npx vite build --config vite.config.production.ts', { stdio: 'inherit' });
  
  console.log('Building server with esbuild...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}