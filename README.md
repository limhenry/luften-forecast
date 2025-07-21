# Luften Forecast

A TypeScript Node.js application that fetches and displays weather forecast data using the Open-Meteo API.

## Features

- Fetches hourly weather data for Hamburg, Germany
- Displays temperature, relative humidity, and calculated absolute humidity
- Shows timezone and location information
- Clean, formatted console output with proper units
- Calculates absolute humidity using meteorological Magnus formula
- **RESTful API server for Home Assistant integration**
- **JSON endpoints for weather statistics and graphs**

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To run the console application in development mode:

```bash
npm run dev
```

To run the API server in development mode:

```bash
npm run dev:server
```

To build the project:

```bash
npm run build
```

To run the compiled console application:

```bash
npm start
```

To run the compiled API server:

```bash
npm run start:server
```

To clean the build directory:

```bash
npm run clean
```

## Docker Deployment

### Prerequisites

Install Docker and Docker Compose:

- **macOS**: Install [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
- **Linux**: Install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
- **Windows**: Install [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)

### Quick Deploy

```bash
npm run deploy
```

### Manual Docker Commands

```bash
# Build and start the container
npm run docker:build
npm run docker:up

# View logs
npm run docker:logs

# Stop the container
npm run docker:down

# Restart the container
npm run docker:restart
```

### Troubleshooting Docker Builds

If you encounter build issues, try these steps:

```bash
# Clean Docker cache and rebuild
docker compose down
docker system prune -f
docker compose build --no-cache
docker compose up -d
```

Common issues:

- **"tsc: not found"**: Build cache issue - use `--no-cache` flag
- **Build hangs**: Network or dependency issue - check internet connection
- **Permission errors**: Ensure Docker daemon is running

### Docker Environment

The containerized API server will be available at:

- **API**: `http://localhost:2385/api/weather`
- **Health**: `http://localhost:2385/health`

### Production Deployment

For production deployment, update the `docker-compose.yml` file:

1. Configure environment variables
2. Set up proper logging and monitoring

## Project Structure

```
luften-forecast/
├── src/
│   ├── index.ts                    # Console application entry point
│   ├── server.ts                   # API server entry point
│   ├── api/
│   │   └── weatherApiServer.ts     # Express.js API server
│   ├── services/
│   │   └── weatherService.ts       # Weather API service layer
│   ├── formatters/
│   │   └── weatherFormatter.ts     # Data formatting and display logic
│   ├── utils/
│   │   └── humidity.ts             # Humidity calculation utilities
│   └── types/
│       └── weather.ts              # TypeScript type definitions
├── dist/                           # Compiled JavaScript output
├── home-assistant-config.yaml      # Home Assistant configuration examples
├── Dockerfile                      # Docker container definition
├── docker-compose.yml              # Docker Compose configuration
├── .dockerignore                   # Docker ignore file
├── deploy.sh                       # Deployment script
├── .github/
│   └── copilot-instructions.md
├── .vscode/
│   ├── tasks.json                  # VS Code build tasks
│   └── launch.json                 # Debug configurations
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `openmeteo` - Open-Meteo API client for fetching weather data
- `typescript` - TypeScript compiler and development tools

## Scripts

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled console application
- `npm run start:server` - Run the compiled API server
- `npm run dev` - Run console app in development mode with hot reloading
- `npm run dev:server` - Run API server in development mode with hot reloading
- `npm run clean` - Remove the dist directory
- `npm run deploy` - Build and deploy with Docker (requires Docker)
- `npm run docker:build` - Build Docker image
- `npm run docker:up` - Start Docker container
- `npm run docker:down` - Stop Docker container
- `npm run docker:logs` - View Docker container logs
- `npm run docker:restart` - Restart Docker container

## API Endpoints

When running the server (`npm run start:server`), the following endpoints are available:

- **`GET /health`** - Health check endpoint
- **`GET /api/weather`** - Weather data formatted for Home Assistant Statistics cards
- **`GET /api/weather/raw`** - Raw weather data with full metadata

### Home Assistant Integration

The API provides data in a format compatible with Home Assistant's Statistics graph card. See `home-assistant-config.yaml` for configuration examples.

#### API Response Format

```json
{
  "location": {
    "name": "53.54°N, 10.00°E",
    "timezone": "Europe/Berlin",
    "coordinates": { "latitude": 53.54, "longitude": 10.0 }
  },
  "statistics": {
    "temperature": [
      { "datetime": "2025-07-21T00:00:00.000Z", "value": 24.4, "unit": "°C" }
    ],
    "relative_humidity": [
      { "datetime": "2025-07-21T00:00:00.000Z", "value": 66, "unit": "%" }
    ],
    "absolute_humidity": [
      { "datetime": "2025-07-21T00:00:00.000Z", "value": 0.15, "unit": "g/m³" }
    ]
  }
}
```

## Output Format

The application displays weather data in a tabular format:

```
Time                    Temp    RH      AH
2025-07-21T12:00:00.000Z 20.6°C  75% RH  0.13 g/m³ AH
```

Where:

- **Temp**: Temperature in Celsius
- **RH**: Relative Humidity as percentage
- **AH**: Absolute Humidity in grams per cubic meter

## Credits

This project was lovingly crafted by **GitHub Copilot** 🤖 (awesome AI) on behalf of a wonderfully lazy human 😴.

While the human provided creative direction and quality assurance (aka "does this look right?"), all the heavy lifting - from TypeScript wizardry to Docker containerization - was handled by your friendly neighborhood AI assistant.

_Proof that the future of coding is collaborative... and that humans are getting really good at delegation!_ ✨

## License

ISC
