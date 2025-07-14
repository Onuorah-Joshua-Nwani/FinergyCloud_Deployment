import http from 'http';
import { spawn } from 'child_process';

console.log('🔍 Network connectivity test for Replit environment');

// Test basic HTTP server
const server = http.createServer((req, res) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Network test successful!');
});

server.listen(5000, '0.0.0.0', () => {
  console.log('✅ HTTP server listening on 0.0.0.0:5000');
  
  // Test internal connectivity
  setTimeout(() => {
    console.log('🧪 Testing internal connection...');
    
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/',
      method: 'GET'
    }, (res) => {
      console.log('✅ Internal connection successful!');
      console.log('🟢 REPLIT SERVER READY ON PORT 5000 🟢');
      
      // Keep server running for preview
      setInterval(() => {
        console.log('🔄 Server alive:', new Date().toISOString());
      }, 30000);
    });
    
    req.on('error', (err) => {
      console.error('❌ Internal connection failed:', err.message);
    });
    
    req.end();
  }, 1000);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});