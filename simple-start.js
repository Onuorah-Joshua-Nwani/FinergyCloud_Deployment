// Ultra-simple startup script to eliminate all possible crash points
process.env.NODE_ENV = 'development';
process.env.PORT = '5000';

console.log('Starting FinergyCloud...');

// Import and run the server directly
import('./server/index.ts').catch(err => {
  console.error('Startup failed:', err);
  process.exit(1);
});