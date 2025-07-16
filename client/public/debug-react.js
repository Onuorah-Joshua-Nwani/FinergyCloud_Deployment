/**
 * Debug React mounting issues
 * Best practice diagnostic script for React app troubleshooting
 */

console.log('=== React Debug Script Starting ===');

// 1. Check if root element exists
const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);
if (rootElement) {
  console.log('Root element HTML:', rootElement.outerHTML);
}

// 2. Check if React is loaded
console.log('React available:', typeof React !== 'undefined');
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');

// 3. Check for JavaScript errors
window.addEventListener('error', function(e) {
  console.error('JavaScript Error:', e.error);
  console.error('Error message:', e.message);
  console.error('Error filename:', e.filename);
  console.error('Error line:', e.lineno);
});

// 4. Check for unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
});

// 5. Test basic React createElement
try {
  console.log('Testing React.createElement...');
  const testElement = React.createElement('div', {}, 'Test');
  console.log('React.createElement works:', testElement);
} catch (error) {
  console.error('React.createElement failed:', error);
}

// 6. Test if CSS is loading
const computedStyle = getComputedStyle(document.documentElement);
const mobileBackground = computedStyle.getPropertyValue('--mobile-background');
console.log('CSS Variables loaded:', {
  mobileBackground: mobileBackground,
  professionalNavy: computedStyle.getPropertyValue('--professional-navy'),
  professionalGray: computedStyle.getPropertyValue('--professional-gray')
});

// 7. Check URL parameters
const urlParams = new URLSearchParams(window.location.search);
console.log('URL parameters:', {
  platform: urlParams.get('platform'),
  allParams: Object.fromEntries(urlParams.entries())
});

console.log('=== React Debug Script Complete ===');