"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const openmeteo_1 = require("openmeteo");
class WeatherService {
    /**
     * Fetches weather data from Open-Meteo API
     */
    async fetchWeatherData(params) {
        try {
            const responses = await (0, openmeteo_1.fetchWeatherApi)(WeatherService.API_URL, params);
            const response = responses[0];
            const locationInfo = {
                latitude: response.latitude(),
                longitude: response.longitude(),
                timezone: response.timezone() || "Unknown",
                timezoneAbbreviation: response.timezoneAbbreviation() || "Unknown",
                utcOffsetSeconds: response.utcOffsetSeconds(),
            };
            const hourly = response.hourly();
            const weatherData = {
                hourly: {
                    time: [
                        ...Array((Number(hourly.timeEnd()) - Number(hourly.time())) /
                            hourly.interval()),
                    ].map((_, i) => new Date((Number(hourly.time()) +
                        i * hourly.interval() +
                        locationInfo.utcOffsetSeconds) *
                        1000)),
                    temperature2m: hourly.variables(0).valuesArray(),
                    relativeHumidity2m: hourly.variables(1).valuesArray(),
                },
            };
            return { locationInfo, weatherData };
        }
        catch (error) {
            throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
    /**
     * Creates default weather parameters for Hamburg, Germany
     */
    static getDefaultParams() {
        return {
            latitude: 53.5422831,
            longitude: 9.9964499,
            hourly: ["temperature_2m", "relative_humidity_2m"],
            models: "icon_seamless",
            timezone: "auto",
            forecast_days: 1,
        };
    }
}
exports.WeatherService = WeatherService;
WeatherService.API_URL = "https://api.open-meteo.com/v1/forecast";
//# sourceMappingURL=weatherService.js.map