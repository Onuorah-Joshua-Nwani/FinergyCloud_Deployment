const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

console.log('=== Ultra-Minimal FinergyCloud Server ===');
console.log('Port:', port);
console.log('Environment:', process.env.NODE_ENV);

// Basic middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'FinergyCloud server is running'
  });
});

// Root route - always works
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FinergyCloud - Live</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { 
          font-family: system-ui, -apple-system, sans-serif; 
          margin: 0; 
          padding: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }
        .container { 
          max-width: 800px; 
          margin: 0 auto; 
          text-align: center;
        }
        h1 { 
          font-size: 3rem; 
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .status { 
          background: rgba(255,255,255,0.2); 
          padding: 20px; 
          border-radius: 12px; 
          margin: 30px 0;
          backdrop-filter: blur(10px);
        }
        .info { 
          background: rgba(255,255,255,0.1); 
          padding: 20px; 
          border-radius: 12px; 
          margin: 20px 0;
          backdrop-filter: blur(10px);
        }
        .badge {
          display: inline-block;
          background: #16a34a;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          margin: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌱 FinergyCloud</h1>
        <div class="badge">✅ LIVE & RUNNING</div>
        
        <div class="status">
          <h2>🚀 Deployment Successful</h2>
          <p>Your FinergyCloud platform is now live on Railway!</p>
        </div>
        
        <div class="info">
          <strong>Server Information:</strong><br>
          Environment: ${process.env.NODE_ENV || 'production'}<br>
          Port: ${port}<br>
          Timestamp: ${new Date().toISOString()}<br>
          Status: Operational
        </div>
        
        <div class="info">
          <h3>🌍 Renewable Energy Investment Platform</h3>
          <p>AI-powered predictions • ESG scoring • Portfolio management</p>
          <p>The server is responding correctly and ready for traffic.</p>
        </div>
        
        <div class="info">
          <strong>🔗 Platform Links:</strong><br>
          <a href="/health" style="color: #60a5fa;">Health Check</a> | 
          <a href="/api/health" style="color: #60a5fa;">API Status</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// API health
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'FinergyCloud API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Catch all
app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ FinergyCloud server running on port ${port}`);
  console.log(`🌐 Ready to receive traffic`);
});