# Use Node.js 18 alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

RUN curl google.com

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source code
COPY src/ ./src/

# Remove dev dependencies to reduce image size
RUN npm ci --registry=https://registry.npmjs.org/ --loglevel verbose

# Build the TypeScript code
RUN npm run build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the server
CMD ["node", "dist/server.js"]
