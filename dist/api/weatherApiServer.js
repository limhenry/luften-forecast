"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWeatherApiServer = createWeatherApiServer;
exports.startWeatherApiServer = startWeatherApiServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const weatherService_1 = require("../services/weatherService");
const weatherFormatter_1 = require("../formatters/weatherFormatter");
function formatForHomeAssistant(data, locationInfo) {
    return {
        location: {
            name: `${locationInfo.latitude.toFixed(2)}°N, ${locationInfo.longitude.toFixed(2)}°E`,
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
function setupRoutes(app, weatherService) {
    // Health check endpoint
    app.get("/health", (req, res) => {
        res.json({ status: "ok", timestamp: new Date().toISOString() });
    });
    // Weather data endpoint for Home Assistant
    app.get("/api/weather", async (req, res) => {
        try {
            const params = weatherService_1.WeatherService.getDefaultParams();
            const { locationInfo, weatherData } = await weatherService.fetchWeatherData(params);
            const processedData = weatherFormatter_1.WeatherFormatter.processWeatherData(weatherData);
            // Format data for Home Assistant Statistics card
            const homeAssistantData = formatForHomeAssistant(processedData, locationInfo);
            res.json(homeAssistantData);
        }
        catch (error) {
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
            const params = weatherService_1.WeatherService.getDefaultParams();
            const { locationInfo, weatherData } = await weatherService.fetchWeatherData(params);
            const processedData = weatherFormatter_1.WeatherFormatter.processWeatherData(weatherData);
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
        }
        catch (error) {
            console.error("Error fetching weather data:", error);
            res.status(500).json({
                error: "Failed to fetch weather data",
                message: error instanceof Error ? error.message : "Unknown error",
            });
        }
    });
}
function createWeatherApiServer(port = 3000) {
    const app = (0, express_1.default)();
    const weatherService = new weatherService_1.WeatherService();
    // Setup middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Setup routes
    setupRoutes(app, weatherService);
    return app;
}
function startWeatherApiServer(port = 3000) {
    const app = createWeatherApiServer(port);
    app.listen(port, () => {
        console.log(`🌤️  Weather API Server running on http://localhost:${port}`);
        console.log(`📊 Home Assistant endpoint: http://localhost:${port}/api/weather`);
        console.log(`📋 Raw data endpoint: http://localhost:${port}/api/weather/raw`);
        console.log(`❤️  Health check: http://localhost:${port}/health`);
    });
}
//# sourceMappingURL=weatherApiServer.js.map