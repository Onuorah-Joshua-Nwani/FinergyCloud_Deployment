// Simple Node.js server that starts immediately
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('FinergyCloud starting...');
console.log('Port:', PORT);
console.log('Environment:', process.env.NODE_ENV);

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>FinergyCloud - Renewable Energy Platform</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            max-width: 900px; 
            padding: 40px 20px;
            text-align: center;
        }
        h1 { 
            font-size: 4rem; 
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #a8dadc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .status-card { 
            background: rgba(255,255,255,0.1); 
            padding: 30px; 
            border-radius: 15px; 
            margin: 30px 0;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        .success-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .feature-card {
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .info-text {
            font-size: 1.1rem;
            line-height: 1.6;
            margin: 20px 0;
        }
        .links {
            margin-top: 30px;
        }
        .link {
            color: #7dd3fc;
            text-decoration: none;
            margin: 0 15px;
            font-weight: 500;
        }
        .link:hover {
            color: #38bdf8;
        }
        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            .subtitle { font-size: 1.2rem; }
            .container { padding: 20px 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌱 FinergyCloud</h1>
        <div class="subtitle">Renewable Energy Investment Platform</div>
        
        <div class="status-card">
            <div class="success-badge">✅ DEPLOYMENT SUCCESSFUL</div>
            <h2>Platform Successfully Deployed on Railway</h2>
            <p class="info-text">Your FinergyCloud platform is now live and operational!</p>
        </div>
        
        <div class="feature-grid">
            <div class="feature-card">
                <h3>🤖 AI-Powered Predictions</h3>
                <p>Advanced machine learning models for investment analysis</p>
            </div>
            <div class="feature-card">
                <h3>📊 ESG Scoring</h3>
                <p>Comprehensive sustainability and governance metrics</p>
            </div>
            <div class="feature-card">
                <h3>💼 Portfolio Management</h3>
                <p>Professional-grade investment tracking and analytics</p>
            </div>
        </div>
        
        <div class="status-card">
            <h3>Server Status</h3>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'Production'}</p>
            <p><strong>Port:</strong> ${PORT}</p>
            <p><strong>Status:</strong> Online & Operational</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
        
        <div class="links">
            <a href="/health" class="link">Health Check</a>
            <a href="/api/status" class="link">API Status</a>
        </div>
    </div>
</body>
</html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'FinergyCloud',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    port: PORT
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'operational',
    platform: 'FinergyCloud Renewable Energy Platform',
    deployment: 'Railway',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FinergyCloud server running on port ${PORT}`);
  console.log(`🌐 Server ready to accept connections`);
  console.log(`📊 Platform operational`);
});