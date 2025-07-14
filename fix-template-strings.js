/**
 * Fix all template string syntax errors in blog content
 */

import fs from 'fs';

console.log('🔧 Fixing template string syntax errors...');

const blogPath = './shared/blog-content.ts';
let content = fs.readFileSync(blogPath, 'utf8');

// Fix all content properties that are missing opening backticks
content = content.replace(/(\s+content:\s*)\n([A-Z])/g, '$1`$2');

// Fix any remaining standalone content: lines
content = content.replace(/(\s+content:\s*$)/gm, '$1`Blog content is being updated...`');

// Ensure all content blocks end with closing backticks before the next property or object
content = content.replace(/([a-zA-Z0-9.,;:!?\s]+)\n(\s+}\s*,?\s*\n)/g, '$1`\n$2');

// Fix specific broken template strings
content = content.replace(/content:\s*\n\s*([A-Z][^`]*?)(\n\s+})/g, 'content: `$1`$2');

fs.writeFileSync(blogPath, content);

console.log('✅ Template string syntax errors fixed!');