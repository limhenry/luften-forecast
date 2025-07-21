import express from "express";
import cors from "cors";
import { WeatherService } from "../services/weatherService";
import { WeatherFormatter } from "../formatters/weatherFormatter";
import { ProcessedWeatherPoint, LocationInfo } from "../types/weather";

function formatForHomeAssistant(
  data: ProcessedWeatherPoint[],
  locationInfo: LocationInfo
) {
  return {
    location: {
      name: `${locationInfo.latitude.toFixed(
        2
      )}°N, ${locationInfo.longitude.toFixed(2)}°E`,
      timezone: locationInfo.timezone,
      coordinates: {
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
      },
    },
    statistics: {
      temperature: data.map((point) => ({
        datetime: point.time.toISOString(),
        value: parseFloat(point.temperature.toFixed(1)),
        unit: "°C",
      })),
      relative_humidity: data.map((point) => ({
        datetime: point.time.toISOString(),
        value: parseFloat(point.relativeHumidity.toFixed(0)),
        unit: "%",
      })),
      absolute_humidity: data.map((point) => ({
        datetime: point.time.toISOString(),
        value: parseFloat(point.absoluteHumidity.toFixed(2)),
        unit: "g/m³",
      })),
    },
    metadata: {
      total_points: data.length,
      forecast_start: data[0]?.time.toISOString(),
      forecast_end: data[data.length - 1]?.time.toISOString(),
      generated_at: new Date().toISOString(),
      data_source: "Open-Meteo API",
    },
  };
}

function setupRoutes(
  app: express.Application,
  weatherService: WeatherService
): void {
  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Weather data endpoint for Home Assistant
  app.get("/api/weather", async (req, res) => {
    try {
      const params = WeatherService.getDefaultParams();
      const { locationInfo, weatherData } =
        await weatherService.fetchWeatherData(params);
      const processedData = WeatherFormatter.processWeatherData(weatherData);

      // Format data for Home Assistant Statistics card
      const homeAssistantData = formatForHomeAssistant(
        processedData,
        locationInfo
      );

      res.json(homeAssistantData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Raw weather data endpoint
  app.get("/api/weather/raw", async (req, res) => {
    try {
      const params = WeatherService.getDefaultParams();
      const { locationInfo, weatherData } =
        await weatherService.fetchWeatherData(params);
      const processedData = WeatherFormatter.processWeatherData(weatherData);

      res.json({
        location: locationInfo,
        data: processedData,
        metadata: {
          total_points: processedData.length,
          first_time: processedData[0]?.time,
          last_time: processedData[processedData.length - 1]?.time,
          generated_at: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
}

export function createWeatherApiServer(
  port: number = 3000
): express.Application {
  const app = express();
  const weatherService = new WeatherService();

  // Setup middleware
  app.use(cors());
  app.use(express.json());

  // Setup routes
  setupRoutes(app, weatherService);

  return app;
}

export function startWeatherApiServer(port: number = 3000): void {
  const app = createWeatherApiServer(port);

  app.listen(port, () => {
    console.log(`🌤️  Weather API Server running on http://localhost:${port}`);
    console.log(
      `📊 Home Assistant endpoint: http://localhost:${port}/api/weather`
    );
    console.log(
      `📋 Raw data endpoint: http://localhost:${port}/api/weather/raw`
    );
    console.log(`❤️  Health check: http://localhost:${port}/health`);
  });
}
