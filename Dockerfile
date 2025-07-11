# Use Node.js 18 Alpine
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and .npmrc
COPY package.json .
COPY .npmrc .

# Clean install without package-lock
RUN rm -f package-lock.json
RUN npm cache clean --force
RUN npm install --no-package-lock --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Build minimal server
RUN npx esbuild server/minimal.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/minimal.js

# List built files for debugging
RUN ls -la dist/

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the minimal server
CMD ["node", "dist/minimal.js"]