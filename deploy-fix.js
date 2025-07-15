#!/usr/bin/env node
/**
 * Deployment Fix Script for FinergyCloud
 * This script ensures the latest fixes are properly deployed
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting deployment fix for FinergyCloud...');

// Step 1: Clean and rebuild
console.log('🧹 Cleaning old builds...');
try {
  execSync('rm -rf dist/ || true', { stdio: 'inherit' });
  console.log('✅ Old builds cleaned');
} catch (error) {
  console.log('⚠️  Clean step had issues, continuing...');
}

// Step 2: Build the project
console.log('🔨 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 3: Verify build output
console.log('🔍 Verifying build output...');
const requiredFiles = [
  'dist/index.js',
  'dist/public/index.html',
  'dist/public/assets'
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
}
console.log('✅ All required files present');

// Step 4: Verify React app is properly built
console.log('🔍 Verifying React app build...');
const indexHtml = readFileSync('dist/public/index.html', 'utf8');
if (!indexHtml.includes('FinergyCloud - AI Risk Intelligence') || 
    !indexHtml.includes('assets/')) {
  console.error('❌ React app not properly built');
  process.exit(1);
}
console.log('✅ React app properly built');

// Step 5: Test production server
console.log('🧪 Testing production server...');
try {
  const { spawn } = await import('child_process');
  
  const serverProcess = spawn('node', ['dist/index.js'], {
    env: { ...process.env, NODE_ENV: 'production', PORT: '9000' },
    stdio: 'pipe'
  });
  
  // Give server time to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test root route
  const testResult = execSync('curl -s http://localhost:9000/', { encoding: 'utf8' });
  if (!testResult.includes('FinergyCloud - AI Risk Intelligence')) {
    console.error('❌ Production server test failed');
    serverProcess.kill();
    process.exit(1);
  }
  
  serverProcess.kill();
  console.log('✅ Production server test passed');
  
} catch (error) {
  console.error('❌ Production server test failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 Deployment fix completed successfully!');
console.log('📋 Summary of fixes applied:');
console.log('  • Fixed Express middleware missing next parameters');
console.log('  • Fixed root route to serve React app properly');
console.log('  • Added production static file serving');
console.log('  • Enhanced error handling and timeout protection');
console.log('  • Verified React app builds and serves correctly');
console.log('\n✅ The deployment should now work correctly!');
console.log('🌐 Try accessing: https://finergycloud.com/');