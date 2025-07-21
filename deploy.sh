#!/bin/bash

# Build and deploy script for Luften Forecast API

set -e

echo "🔨 Building TypeScript..."
npm run build

echo "🐳 Building Docker image..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for service to be healthy..."
sleep 10

echo "🏥 Checking health..."
docker-compose exec luften-forecast wget --no-verbose --tries=1 --spider http://localhost:3000/health

echo "✅ Deployment complete!"
echo "📊 API available at: http://localhost:2385/api/weather"
echo "❤️  Health check: http://localhost:2385/health"

echo ""
echo "📋 Useful commands:"
echo "  docker-compose logs -f           # View logs"
echo "  docker-compose down              # Stop services"
echo "  docker-compose restart           # Restart services"
