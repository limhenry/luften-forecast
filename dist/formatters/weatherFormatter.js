"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherFormatter = void 0;
const humidity_1 = require("../utils/humidity");
class WeatherFormatter {
    /**
     * Displays location and timezone information
     */
    static displayLocationInfo(locationInfo) {
        console.log(`Weather forecast for ${locationInfo.latitude}°N, ${locationInfo.longitude}°E (${locationInfo.timezone})`);
        console.log(`Timezone: ${locationInfo.timezone} (${locationInfo.timezoneAbbreviation})`);
        console.log("---");
        console.log("Time\t\t\t\tTemp\tRH\tAH");
        console.log("----------------------------------------");
    }
    /**
     * Processes raw weather data and calculates absolute humidity
     */
    static processWeatherData(weatherData) {
        const processedData = [];
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
            const temperature = weatherData.hourly.temperature2m[i];
            const relativeHumidity = weatherData.hourly.relativeHumidity2m[i];
            const absoluteHumidity = (0, humidity_1.calculateAbsHumidity)(temperature, relativeHumidity / 100); // Convert % to decimal
            processedData.push({
                time: weatherData.hourly.time[i],
                temperature,
                relativeHumidity,
                absoluteHumidity,
            });
        }
        return processedData;
    }
    /**
     * Displays formatted weather data
     */
    static displayWeatherData(processedData) {
        processedData.forEach((point) => {
            console.log(point.time.toISOString(), `${point.temperature.toFixed(1)}°C`, `${point.relativeHumidity.toFixed(0)}% RH`, `${point.absoluteHumidity.toFixed(2)} g/m³ AH`);
        });
    }
}
exports.WeatherFormatter = WeatherFormatter;
//# sourceMappingURL=weatherFormatter.js.map