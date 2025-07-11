// Absolutely minimal Railway server
const http = require('http');

const port = process.env.PORT || 3000;

console.log('=== FinergyCloud Starting ===');
console.log('Port:', port);
console.log('Time:', new Date().toISOString());

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);
  
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-cache'
  });
  
  res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>FinergyCloud - Railway Fixed</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #1a365d, #2b77ad);
      color: white;
      margin: 0;
      padding: 20px;
      text-align: center;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .status {
      background: rgba(255,255,255,0.1);
      padding: 30px;
      border-radius: 15px;
      margin: 20px 0;
      backdrop-filter: blur(10px);
    }
    .success {
      background: #16a085;
      color: white;
      padding: 15px 30px;
      border-radius: 25px;
      display: inline-block;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .info {
      background: rgba(255,255,255,0.05);
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    .grid-item {
      background: rgba(255,255,255,0.1);
      padding: 15px;
      border-radius: 8px;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌱 FinergyCloud</h1>
    
    <div class="status">
      <div class="success">✅ RAILWAY DEPLOYMENT FIXED</div>
      <h2>Application Successfully Running</h2>
      <p>Your FinergyCloud platform is now live on Railway</p>
    </div>
    
    <div class="info">
      <h3>Deployment Status</h3>
      <div class="grid">
        <div class="grid-item">
          <strong>Port:</strong><br>${port}
        </div>
        <div class="grid-item">
          <strong>Environment:</strong><br>${process.env.NODE_ENV || 'Production'}
        </div>
        <div class="grid-item">
          <strong>Uptime:</strong><br>${Math.floor(process.uptime())} seconds
        </div>
        <div class="grid-item">
          <strong>Time:</strong><br>${new Date().toLocaleString()}
        </div>
      </div>
    </div>
    
    <div class="info">
      <h3>Platform Features</h3>
      <p>🤖 AI-Powered Predictions | 📊 ESG Scoring | 💼 Portfolio Management</p>
      <p><em>Renewable Energy Investment Platform</em></p>
    </div>
    
    <p><strong>Server Response:</strong> ${new Date().toISOString()}</p>
  </div>
</body>
</html>
  `);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ FinergyCloud server RUNNING on port ${port}`);
  console.log(`🌐 URL: http://0.0.0.0:${port}`);
  console.log(`📅 Started: ${new Date().toISOString()}`);
  console.log('=== Server Ready ===');
});

server.on('error', (err) => {
  console.error('❌ Server Error:', err.message);
  console.error('Code:', err.code);
  console.error('Stack:', err.stack);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM - Shutting down gracefully');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT - Shutting down gracefully');
  server.close(() => process.exit(0));
});

console.log('Server setup complete, listening...');