# Minimal Express.js deployment for Railway
FROM node:18-alpine

# Install express globally to avoid package.json issues
RUN npm install -g express

WORKDIR /app

# Copy the server file
COPY server.js .

# Expose port (Railway will override with $PORT)
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start server with enhanced logging
CMD ["node", "server.js"]