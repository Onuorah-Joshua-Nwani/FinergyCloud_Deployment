const http = require('http');
const port = process.env.PORT || 3000;

console.log('FinergyCloud starting...');
console.log('PORT:', port);

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<!DOCTYPE html>
<html>
<head>
  <title>FinergyCloud Live</title>
  <style>
    body { 
      font-family: Arial; 
      background: linear-gradient(135deg, #1a365d, #2b77ad); 
      color: white; 
      text-align: center; 
      padding: 50px; 
      margin: 0; 
    }
    h1 { font-size: 3rem; margin-bottom: 20px; }
    .status { 
      background: rgba(255,255,255,0.1); 
      padding: 30px; 
      border-radius: 15px; 
      margin: 20px auto; 
      max-width: 600px; 
    }
    .success { 
      background: #16a085; 
      padding: 15px 30px; 
      border-radius: 25px; 
      display: inline-block; 
      margin-bottom: 20px; 
    }
  </style>
</head>
<body>
  <h1>🌱 FinergyCloud</h1>
  <div class="status">
    <div class="success">✅ RAILWAY DEPLOYMENT SUCCESSFUL</div>
    <h2>Platform is Live</h2>
    <p>Port: ${port} | Time: ${new Date().toLocaleString()}</p>
    <p>Uptime: ${Math.floor(process.uptime())} seconds</p>
  </div>
  <p>🤖 AI Predictions | 📊 ESG Scoring | 💼 Portfolio Management</p>
</body>
</html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ FinergyCloud running on port ${port}`);
  console.log(`🌐 Server ready at http://0.0.0.0:${port}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});