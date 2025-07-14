/**
 * Fix Blog Content - Convert LaTeX to Plain Text
 * This script removes all LaTeX formatting from blog content to resolve template string issues
 */

import fs from 'fs';

console.log('🔧 Fixing blog content LaTeX formatting...');

// Read the blog content file
const blogPath = './shared/blog-content.ts';
let content = fs.readFileSync(blogPath, 'utf8');

// Replace LaTeX document structure with plain text
content = content.replace(/\\documentclass\{article\}/g, '');
content = content.replace(/\\usepackage\[[^\]]*\]\{[^}]*\}/g, '');
content = content.replace(/\\usepackage\{[^}]*\}/g, '');
content = content.replace(/\\geometry\{[^}]*\}/g, '');
content = content.replace(/\\title\{([^}]*)\}/g, '$1');
content = content.replace(/\\author\{([^}]*)\}/g, 'Author: $1');
content = content.replace(/\\date\{([^}]*)\}/g, 'Date: $1');
content = content.replace(/\\begin\{document\}/g, '');
content = content.replace(/\\end\{document\}/g, '');
content = content.replace(/\\maketitle/g, '');

// Replace LaTeX sections with plain text headers
content = content.replace(/\\section\{([^}]*)\}/g, '$1');
content = content.replace(/\\subsection\{([^}]*)\}/g, '$1');
content = content.replace(/\\subsubsection\{([^}]*)\}/g, '$1');

// Replace LaTeX lists with plain text
content = content.replace(/\\begin\{itemize\}/g, '');
content = content.replace(/\\end\{itemize\}/g, '');
content = content.replace(/\\item\s+/g, '• ');

// Replace LaTeX text formatting
content = content.replace(/\\textbf\{([^}]*)\}/g, '$1');
content = content.replace(/\\textit\{([^}]*)\}/g, '$1');
content = content.replace(/\\emph\{([^}]*)\}/g, '$1');

// Replace LaTeX quotes
content = content.replace(/``([^']*)''/g, '"$1"');
content = content.replace(/`([^']*)''/g, '"$1"');

// Replace LaTeX percentage signs
content = content.replace(/\\%/g, '%');

// Replace LaTeX dollar signs
content = content.replace(/\\$/g, '$');

// Clean up extra whitespace
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

// Write the fixed content back
fs.writeFileSync(blogPath, content);

console.log('✅ Blog content LaTeX formatting fixed successfully!');
console.log('All LaTeX syntax has been converted to plain text format.');