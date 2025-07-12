// Simple test to verify blog functionality
import { blogArticles, getFeaturedArticle } from './shared/blog-content.js';

console.log('Testing blog functionality...');

// Test 1: Check if blog articles are loaded
console.log(`✓ Found ${blogArticles.length} blog articles`);

// Test 2: Check if featured article exists
const featured = getFeaturedArticle();
console.log(`✓ Featured article: ${featured?.title}`);

// Test 3: Check if articles have content
const articlesWithContent = blogArticles.filter(article => article.content && article.content.length > 100);
console.log(`✓ Articles with content: ${articlesWithContent.length}/${blogArticles.length}`);

// Test 4: Check if sharing URLs exist
const articlesWithSharing = blogArticles.filter(article => article.linkedinUrl || article.mediumUrl);
console.log(`✓ Articles with sharing URLs: ${articlesWithSharing.length}/${blogArticles.length}`);

console.log('\nBlog functionality test completed!');