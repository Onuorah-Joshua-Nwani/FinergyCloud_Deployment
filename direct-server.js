#!/usr/bin/env node
/**
 * Direct server startup without Vite for debugging
 * This will help isolate if the issue is with Vite or the Express server
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'Direct server is running'
  });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>FinergyCloud - Direct Server</title></head>
      <body>
        <h1>FinergyCloud Direct Server</h1>
        <p>Server is running successfully!</p>
        <p>Time: ${new Date().toLocaleString()}</p>
        <p><a href="/api/health">Health Check</a></p>
      </body>
    </html>
  `);
});

// Static files fallback
app.use(express.static(path.join(__dirname, 'client/public')));

const port = process.env.PORT || 5000;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`🚀 Direct server running on ${host}:${port}`);
  console.log(`📱 Health check: http://localhost:${port}/api/health`);
  console.log(`🌐 Preview: http://localhost:${port}/`);
  console.log(`🟢 REPLIT SERVER READY ON PORT ${port} 🟢`);
});