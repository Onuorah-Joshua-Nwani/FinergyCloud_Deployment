# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Build minimal server
RUN npx esbuild server/minimal.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/minimal.js

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the minimal server
CMD ["node", "dist/minimal.js"]