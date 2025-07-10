# FinergyCloud - Independent Deployment Guide

## Overview

This guide provides instructions for deploying FinergyCloud as a completely independent platform on any hosting provider, with no external dependencies.

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database (local or cloud)
- npm or yarn package manager

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database_name

# Session Configuration  
SESSION_SECRET=your-secure-session-secret-here

# Optional: API Keys (for enhanced features)
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# Node Environment
NODE_ENV=production
```

## Quick Start

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud.git
   cd ojn-msp-1-finergycloud
   npm install
   ```

2. **Setup Database**
   ```bash
   npm run db:push
   ```

3. **Build and Start**
   ```bash
   npm run build
   npm start
   ```

4. **Access Application**
   - Website: http://localhost:5000
   - Mobile App: http://localhost:5000/?platform=mobile

## Deployment Platforms

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Railway

1. Connect GitHub repository
2. Add PostgreSQL service
3. Configure environment variables
4. Deploy with automatic builds

### DigitalOcean App Platform

1. Create new app from GitHub
2. Add managed PostgreSQL database
3. Configure environment variables
4. Deploy with automatic CI/CD

### Traditional VPS/Server

1. **Server Setup**
   ```bash
   # Install Node.js and PostgreSQL
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql
   ```

2. **Clone and Configure**
   ```bash
   git clone https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud.git
   cd ojn-msp-1-finergycloud
   npm install
   npm run build
   ```

3. **Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name finergycloud
   pm2 startup
   pm2 save
   ```

4. **Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Database Configuration

### PostgreSQL Setup

1. **Local Installation**
   ```bash
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   
   # Windows
   Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE finergycloud;
   CREATE USER finergycloud_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE finergycloud TO finergycloud_user;
   ```

3. **Connection String**
   ```
   DATABASE_URL=postgresql://finergycloud_user:secure_password@localhost:5432/finergycloud
   ```

### Cloud Database Options

- **Neon**: https://neon.tech (PostgreSQL as a Service)
- **Supabase**: https://supabase.com (PostgreSQL with extras)
- **PlanetScale**: https://planetscale.com (MySQL alternative)
- **AWS RDS**: Amazon Relational Database Service
- **Google Cloud SQL**: Google's managed database service

## SSL/HTTPS Configuration

### Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Logs

### Basic Logging

The application includes built-in logging. View logs with:

```bash
# PM2 logs
pm2 logs finergycloud

# Direct logs
tail -f logs/app.log
```

### Health Monitoring

Create a simple health check endpoint monitoring script:

```bash
#!/bin/bash
# health-check.sh
curl -f http://localhost:5000/api/health || exit 1
```

## Backup Strategy

### Database Backup

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backups/finergycloud_$DATE.sql

# Keep only last 7 days
find backups/ -name "*.sql" -mtime +7 -delete
```

### Application Backup

```bash
# Backup application files
tar -czf backups/app_backup_$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  .
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Session Secret**: Use a strong, random session secret
3. **Database**: Use strong passwords and restrict access
4. **Firewall**: Only open necessary ports (80, 443, 22)
5. **Updates**: Keep dependencies updated regularly

## Performance Optimization

1. **Enable Gzip Compression**
   ```javascript
   // In server configuration
   app.use(compression());
   ```

2. **Static Asset Caching**
   ```nginx
   location /static/ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Database Connection Pooling**
   ```javascript
   // Already configured in the application
   // Pool size and timeout settings in db.ts
   ```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find and kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Database Connection Failed**
   - Check DATABASE_URL format
   - Verify database is running
   - Check firewall settings

3. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Log Analysis

```bash
# Check application logs
grep "ERROR" logs/app.log

# Monitor in real-time
tail -f logs/app.log | grep -E "(ERROR|WARN)"
```

## Support

For technical support and questions:
- Email: onuorahani@gmail.com
- GitHub Issues: https://github.com/onuorah-joshua-nwani/ojn-msp-1-finergycloud/issues
- LinkedIn: https://www.linkedin.com/company/finergycloud

## License

MIT License - See LICENSE file for details.

---

**FinergyCloud Platform** - Independently owned and operated renewable energy investment platform.