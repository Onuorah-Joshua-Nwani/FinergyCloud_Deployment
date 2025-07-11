// Direct Node.js HTTP server - no Express dependencies
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (parsedUrl.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'FinergyCloud',
      timestamp: new Date().toISOString(),
      port: PORT,
      uptime: Math.floor(process.uptime())
    }));
    return;
  }
  
  // Default response - beautiful landing page
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinergyCloud - Live</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #1a365d 0%, #2d5aa0 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            max-width: 800px;
            padding: 40px 20px;
            text-align: center;
        }
        h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #4299e1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .status {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            backdrop-filter: blur(10px);
        }
        .badge {
            display: inline-block;
            background: #38a169;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
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
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .grid-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
        }
        a {
            color: #4299e1;
            text-decoration: none;
            margin: 0 10px;
        }
        a:hover { color: #63b3ed; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌱 FinergyCloud</h1>
        
        <div class="status">
            <div class="badge">✅ OPERATIONAL</div>
            <h2>Railway Deployment Successful</h2>
            <p>FinergyCloud renewable energy platform is live and running</p>
        </div>
        
        <div class="info">
            <h3>Platform Features</h3>
            <div class="grid">
                <div class="grid-item">🤖 AI Predictions</div>
                <div class="grid-item">📊 ESG Scoring</div>
                <div class="grid-item">💼 Portfolio Management</div>
            </div>
        </div>
        
        <div class="info">
            <h3>Server Status</h3>
            <div class="grid">
                <div class="grid-item">Port: ${PORT}</div>
                <div class="grid-item">Environment: ${process.env.NODE_ENV || 'Production'}</div>
                <div class="grid-item">Uptime: ${Math.floor(process.uptime())}s</div>
                <div class="grid-item">Time: ${new Date().toLocaleString()}</div>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <a href="/health">Health Check</a>
        </div>
    </div>
</body>
</html>`);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`FinergyCloud server running on port ${PORT}`);
  console.log(`Server ready at http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

console.log('FinergyCloud starting...');