import http from 'http';

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>FinergyCloud Test Server</title></head>
      <body>
        <h1>🚀 FinergyCloud Test Server</h1>
        <p>Server is running successfully on port 5000!</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        <p>Request: ${req.method} ${req.url}</p>
      </body>
    </html>
  `);
});

const port = 5000;
const host = '0.0.0.0';

server.listen(port, host, () => {
  console.log(`🚀 Test server running on ${host}:${port}`);
  console.log(`🌐 Preview: http://localhost:${port}/`);
  console.log(`🟢 REPLIT SERVER READY ON PORT ${port} 🟢`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});