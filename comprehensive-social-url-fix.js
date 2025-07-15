/**
 * Comprehensive Social Media URL Fix
 * Replace all blog-specific URLs with main FinergyCloud website URLs
 */

import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Fixing all social media URLs to use main website...');

const filePath = './shared/blog-content.ts';
let content = readFileSync(filePath, 'utf8');

// Fix all Telegram URLs
content = content.replace(
  /telegramUrl: "https:\/\/t\.me\/share\/url\?url=https:\/\/finergycloud\.com\/blog\/[^&]+&text=([^"]+)"/g,
  'telegramUrl: "https://t.me/share/url?url=https://finergycloud.com&text=$1%20-%20AI-powered%20renewable%20energy%20investment%20platform"'
);

// Fix all Reddit URLs
content = content.replace(
  /redditUrl: "https:\/\/reddit\.com\/submit\?url=https:\/\/finergycloud\.com\/blog\/[^&]+&title=([^"]+)"/g,
  'redditUrl: "https://reddit.com/submit?url=https://finergycloud.com&title=$1"'
);

// Fix remaining WhatsApp URLs that still have blog paths
content = content.replace(
  /whatsappUrl: "https:\/\/wa\.me\/\?text=([^%]+)%20https:\/\/finergycloud\.com\/blog\/[^"]+"/g,
  'whatsappUrl: "https://wa.me/?text=$1%20-%20AI-powered%20renewable%20energy%20investment%20platform%20https://finergycloud.com"'
);

writeFileSync(filePath, content);

console.log('✅ Fixed all social media URLs');
console.log('📋 All URLs now use: https://finergycloud.com');
console.log('🔗 LinkedIn: share-offsite format');
console.log('🐦 Twitter: with hashtags and main URL');
console.log('📘 Facebook: with quote parameter');
console.log('💬 WhatsApp: with platform description');
console.log('📱 Telegram: with platform description');
console.log('🤖 Reddit: simplified with main URL');