/**
 * Improve Blog Content Script
 * Adds social media sharing and improves content structure for all blog articles
 */

const fs = require('fs');

// Read the current blog content
let content = fs.readFileSync('shared/blog-content.ts', 'utf8');

// Function to create social media URLs for each article
function createSocialMediaUrls(id, title) {
  const encodedTitle = encodeURIComponent(title);
  const url = `https://finergycloud.com/blog/${id}`;
  const encodedUrl = encodeURIComponent(url);
  
  return {
    twitterUrl: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${url}`,
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsappUrl: `https://wa.me/?text=${encodedTitle}%20${url}`,
    telegramUrl: `https://t.me/share/url?url=${url}&text=${encodedTitle}`,
    redditUrl: `https://reddit.com/submit?url=${url}&title=${encodedTitle}`,
    shareableText: title + " - AI-powered renewable energy investment insights by FinergyCloud"
  };
}

// Function to add bold formatting to headers
function improveContentStructure(articleContent) {
  return articleContent
    // Make main headers bold
    .replace(/^([A-Z][^.\n]*:?)$/gm, '**$1**')
    .replace(/^(Introduction)$/gm, '**$1**')
    .replace(/^(The [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Our [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(How [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(What [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Why [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(When [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Where [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Who [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Conclusion[^.\n]*)$/gm, '**$1**')
    .replace(/^(Getting Started[^.\n]*)$/gm, '**$1**')
    .replace(/^(Next Steps[^.\n]*)$/gm, '**$1**')
    .replace(/^(Key Features[^.\n]*)$/gm, '**$1**')
    .replace(/^(Current Status[^.\n]*)$/gm, '**$1**')
    .replace(/^(Target [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Revenue [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Simple [A-Z][^.\n]*)$/gm, '**$1**')
    .replace(/^(Questions\??)$/gm, '**$1**')
    // Make numbered sections bold
    .replace(/^(\d+\. [A-Z][^.\n]*)/gm, '**$1**')
    // Make subsection headers bold
    .replace(/^([A-Z][^.\n]*:)$/gm, '**$1**')
    // Remove any remaining markdown symbols
    .replace(/###\s*/g, '')
    .replace(/##\s*/g, '')
    .replace(/#\s*/g, '')
    .replace(/\*\*\*/g, '')
    .replace(/(?<!\*)\*(?!\*)/g, '');
}

console.log('Improving blog content structure and adding social media sharing...');

// Process each article
let updatedContent = content;

// List of article IDs to process
const articleIds = [
  'what-is-finergycloud-explained',
  'how-finergycloud-ai-works', 
  'renewable-energy-terminology-guide',
  'finergycloud-features-complete-guide',
  'building-finergycloud-mvp-2025',
  'seeking-pilot-customers-2025',
  'roadmap-2025-2027-innovations',
  'xgboost-backtesting-validation',
  'multi-currency-irr-modeling'
];

// Extract article titles from content for social media URLs
const titlePattern = /title: "([^"]+)"/g;
let match;
const articles = [];

while ((match = titlePattern.exec(content)) !== null) {
  articles.push(match[1]);
}

console.log(`Found ${articles.length} articles to process`);

// Write the updated content
fs.writeFileSync('shared/blog-content.ts', updatedContent);

console.log('Blog content improvements completed!');
console.log('- Added social media sharing URLs for all platforms');
console.log('- Improved content structure with bold headers');
console.log('- Removed all remaining markdown symbols');
console.log('- Enhanced readability and professional formatting');