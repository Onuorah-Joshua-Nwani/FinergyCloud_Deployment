/**
 * Comprehensive Blog Content Fix
 * Removes all LaTeX formatting and artifacts from blog content
 */

import fs from 'fs';

console.log('🔧 Comprehensive blog content fix starting...');

const blogPath = './shared/blog-content.ts';
let content = fs.readFileSync(blogPath, 'utf8');

// Remove all standalone backslashes
content = content.replace(/\\\n/g, '\n');
content = content.replace(/\\\s*\n/g, '\n');
content = content.replace(/^\s*\\\s*$/gm, '');

// Remove LaTeX quotes and formatting
content = content.replace(/``([^']*)''/g, '"$1"');
content = content.replace(/`([^']*)''/g, '"$1"');

// Remove percentage escapes
content = content.replace(/\\%/g, '%');

// Remove dollar escapes
content = content.replace(/\\\$/g, '$');

// Clean up any remaining LaTeX artifacts
content = content.replace(/\\([a-zA-Z]+)/g, '$1');

// Remove multiple consecutive newlines
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

// Remove empty template strings
content = content.replace(/content: `\s*\n\s*\\\s*\n/g, 'content: `');

// Fix empty content blocks
content = content.replace(/content: `\s*\n\s*`/g, 'content: `Blog content is being updated...`');

// Write the cleaned content
fs.writeFileSync(blogPath, content);

console.log('✅ Comprehensive blog content fix completed!');
console.log('All LaTeX artifacts removed from blog content.');