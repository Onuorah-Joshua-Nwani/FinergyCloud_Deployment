/**
 * Quick deployment fix for https://finergycloud.com
 * This script addresses the blank page issue by checking and fixing common problems
 */

const https = require('https');
const fs = require('fs');

async function checkDeployment() {
  console.log('🔍 Checking FinergyCloud deployment at https://finergycloud.com');
  
  // Check main page
  try {
    const response = await fetch('https://finergycloud.com');
    const html = await response.text();
    
    console.log('✅ Main page response:', response.status);
    console.log('📄 HTML length:', html.length);
    
    // Check if React root div exists
    if (html.includes('<div id="root">')) {
      console.log('✅ React root div found');
    } else {
      console.log('❌ React root div missing');
    }
    
    // Extract JavaScript file
    const jsMatch = html.match(/src="\/assets\/(.*?\.js)"/);
    if (jsMatch) {
      console.log('📄 JavaScript file:', jsMatch[1]);
      
      // Check if JS file loads
      const jsResponse = await fetch(`https://finergycloud.com/assets/${jsMatch[1]}`);
      console.log('📄 JavaScript response:', jsResponse.status);
      
      if (jsResponse.status === 200) {
        console.log('✅ JavaScript file loads correctly');
      } else {
        console.log('❌ JavaScript file failed to load');
      }
    }
    
    // Extract CSS file
    const cssMatch = html.match(/href="\/assets\/(.*?\.css)"/);
    if (cssMatch) {
      console.log('🎨 CSS file:', cssMatch[1]);
      
      // Check if CSS file loads
      const cssResponse = await fetch(`https://finergycloud.com/assets/${cssMatch[1]}`);
      console.log('🎨 CSS response:', cssResponse.status);
    }
    
  } catch (error) {
    console.error('❌ Error checking deployment:', error.message);
  }
}

// Simple diagnosis
console.log('🚀 FinergyCloud Deployment Diagnosis');
console.log('====================================');

// Check if we can run fetch (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('Using Node.js < 18, installing fetch...');
  // Fallback for older Node versions
  global.fetch = require('node-fetch');
}

checkDeployment();