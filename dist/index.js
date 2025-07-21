"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weatherService_1 = require("./services/weatherService");
const weatherFormatter_1 = require("./formatters/weatherFormatter");
async function main() {
    try {
        const weatherService = new weatherService_1.WeatherService();
        const params = weatherService_1.WeatherService.getDefaultParams();
        // Fetch weather data
        const { locationInfo, weatherData } = await weatherService.fetchWeatherData(params);
        // Display location information
        weatherFormatter_1.WeatherFormatter.displayLocationInfo(locationInfo);
        // Process and display weather data
        const processedData = weatherFormatter_1.WeatherFormatter.processWeatherData(weatherData);
        weatherFormatter_1.WeatherFormatter.displayWeatherData(processedData);
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        process.exit(1);
    }
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=index.js.map