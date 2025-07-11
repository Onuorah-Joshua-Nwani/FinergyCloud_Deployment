// Ultra-simple Express server for Railway deployment
const express = require('express');
const app = express();

// Railway provides PORT environment variable
const PORT = process.env.PORT || 3000;

// Log startup information
console.log('=== FinergyCloud Server Starting ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);
console.log('Platform: Railway');

// Basic middleware
app.use(express.json());
app.use(express.static('public', { index: false }));

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({
    status: 'healthy',
    service: 'FinergyCloud',
    timestamp: new Date().toISOString(),
    port: PORT,
    uptime: Math.floor(process.uptime())
  });
});

// Main landing page
app.get('/', (req, res) => {
  console.log('Root page requested');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FinergyCloud - Renewable Energy Investment Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #bbe1fa 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.6;
        }
        .container {
            max-width: 1000px;
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            font-size: 4.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(45deg, #fff, #bbe1fa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
        }
        .tagline {
            font-size: 1.8rem;
            margin-bottom: 3rem;
            opacity: 0.95;
            font-weight: 300;
        }
        .status-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 40px;
            margin: 30px 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .success-badge {
            display: inline-block;
            background: linear-gradient(45deg, #00a86b, #00d084);
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 25px;
            box-shadow: 0 4px 15px rgba(0, 168, 107, 0.3);
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 40px 0;
        }
        .feature {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 15px;
            padding: 25px;
            transition: transform 0.3s ease;
        }
        .feature:hover {
            transform: translateY(-5px);
        }
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
        }
        .feature h3 {
            font-size: 1.3rem;
            margin-bottom: 10px;
            color: #bbe1fa;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 30px 0;
            font-size: 0.95rem;
        }
        .info-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .links {
            margin-top: 40px;
        }
        .link {
            color: #bbe1fa;
            text-decoration: none;
            margin: 0 20px;
            font-weight: 500;
            padding: 10px 20px;
            border: 1px solid rgba(187, 225, 250, 0.3);
            border-radius: 25px;
            transition: all 0.3s ease;
            display: inline-block;
        }
        .link:hover {
            background: rgba(187, 225, 250, 0.2);
            color: white;
        }
        @media (max-width: 768px) {
            .logo { font-size: 3rem; }
            .tagline { font-size: 1.4rem; }
            .container { padding: 20px 15px; }
            .status-card { padding: 25px; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🌱 FinergyCloud</div>
        <div class="tagline">Renewable Energy Investment Platform</div>
        
        <div class="status-card">
            <div class="success-badge">✅ LIVE ON RAILWAY</div>
            <h2 style="margin-bottom: 20px; font-size: 2rem;">Platform Successfully Deployed</h2>
            <p style="font-size: 1.2rem; opacity: 0.9;">Your FinergyCloud renewable energy investment platform is now operational and ready to serve users worldwide.</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <div class="feature-icon">🤖</div>
                <h3>AI-Powered Predictions</h3>
                <p>Advanced machine learning models provide accurate investment forecasting for renewable energy projects.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📊</div>
                <h3>ESG Scoring</h3>
                <p>Comprehensive Environmental, Social, and Governance metrics for sustainable investment decisions.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">💼</div>
                <h3>Portfolio Management</h3>
                <p>Professional-grade tools for tracking and optimizing renewable energy investment portfolios.</p>
            </div>
        </div>
        
        <div class="status-card">
            <h3 style="margin-bottom: 20px;">Deployment Information</h3>
            <div class="info-grid">
                <div class="info-item">
                    <strong>Environment:</strong><br>${process.env.NODE_ENV || 'Production'}
                </div>
                <div class="info-item">
                    <strong>Platform:</strong><br>Railway Cloud
                </div>
                <div class="info-item">
                    <strong>Port:</strong><br>${PORT}
                </div>
                <div class="info-item">
                    <strong>Status:</strong><br>Operational
                </div>
                <div class="info-item">
                    <strong>Uptime:</strong><br>${Math.floor(process.uptime())}s
                </div>
                <div class="info-item">
                    <strong>Deployed:</strong><br>${new Date().toLocaleString()}
                </div>
            </div>
        </div>
        
        <div class="links">
            <a href="/health" class="link">Health Check</a>
            <a href="/api/status" class="link">API Status</a>
        </div>
    </div>
</body>
</html>`);
});

// API status endpoint
app.get('/api/status', (req, res) => {
  console.log('API status requested');
  res.status(200).json({
    status: 'operational',
    platform: 'FinergyCloud Renewable Energy Investment Platform',
    deployment: 'Railway',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    port: PORT
  });
});

// Catch all other routes
app.get('*', (req, res) => {
  console.log('Catch-all route hit:', req.path);
  res.redirect('/');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ FinergyCloud server running on port ${PORT}`);
  console.log(`🌐 Server ready at http://0.0.0.0:${PORT}`);
  console.log(`📊 Platform status: Operational`);
  console.log('=== Server startup complete ===');
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});