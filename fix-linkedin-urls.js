/**
 * Fix LinkedIn URLs - Replace complex encoded URLs with simple working format
 */

import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Fixing LinkedIn sharing URLs...');

// Read the current blog content
const filePath = './shared/blog-content.ts';
let content = readFileSync(filePath, 'utf8');

// Replace all LinkedIn URLs with the simple format that works
content = content.replace(
  /linkedinUrl: "https:\/\/www\.linkedin\.com\/sharing\/share-offsite\/\?url=https:\/\/finergycloud\.com[^"]*"/g,
  'linkedinUrl: "https://www.linkedin.com/sharing/share-offsite/?url=https://finergycloud.com"'
);

// Write the updated content
writeFileSync(filePath, content);

console.log('✅ Fixed all LinkedIn sharing URLs to use simple format');
console.log('📋 LinkedIn URLs now use: https://www.linkedin.com/sharing/share-offsite/?url=https://finergycloud.com');