# Simple Node.js deployment
FROM node:18-alpine

WORKDIR /app

# Copy the simple server file
COPY start.js .

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start server immediately (no dependencies needed)
CMD ["node", "start.js"]