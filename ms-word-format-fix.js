/**
 * Convert blog content to standard MS Word format
 * Remove all markdown symbols and make content feel human-written
 */

import fs from 'fs';

console.log('🔧 Converting blog content to MS Word format...');

const blogPath = './shared/blog-content.ts';
let content = fs.readFileSync(blogPath, 'utf8');

// Remove all markdown headers (###, ##, #)
content = content.replace(/^#{1,6}\s+/gm, '');

// Remove bold markdown (***, **)
content = content.replace(/\*\*\*([^*]+)\*\*\*/g, '$1');
content = content.replace(/\*\*([^*]+)\*\*/g, '$1');

// Remove italic markdown (*)
content = content.replace(/\*([^*]+)\*/g, '$1');

// Remove list bullets and make them natural
content = content.replace(/^•\s+/gm, '');
content = content.replace(/^-\s+/gm, '');
content = content.replace(/^\*\s+/gm, '');

// Remove code blocks
content = content.replace(/```[\s\S]*?```/g, '');

// Clean up any remaining special formatting
content = content.replace(/`([^`]+)`/g, '$1');

// Remove excessive newlines
content = content.replace(/\n{3,}/g, '\n\n');

// Remove any remaining markdown artifacts
content = content.replace(/\*+/g, '');
content = content.replace(/#+/g, '');

fs.writeFileSync(blogPath, content);

console.log('✅ Blog content converted to MS Word format!');
console.log('All markdown symbols removed - content now feels human-written.');