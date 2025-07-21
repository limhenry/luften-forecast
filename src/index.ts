import { WeatherService } from "./services/weatherService";
import { WeatherFormatter } from "./formatters/weatherFormatter";

async function main(): Promise<void> {
  try {
    const weatherService = new WeatherService();
    const params = WeatherService.getDefaultParams();

    // Fetch weather data
    const { locationInfo, weatherData } = await weatherService.fetchWeatherData(
      params
    );

    // Display location information
    WeatherFormatter.displayLocationInfo(locationInfo);

    // Process and display weather data
    const processedData = WeatherFormatter.processWeatherData(weatherData);
    WeatherFormatter.displayWeatherData(processedData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
