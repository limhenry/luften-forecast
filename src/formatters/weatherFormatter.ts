import {
  LocationInfo,
  WeatherData,
  ProcessedWeatherPoint,
} from "../types/weather";
import { calculateAbsHumidity } from "../utils/humidity";

export class WeatherFormatter {
  /**
   * Displays location and timezone information
   */
  static displayLocationInfo(locationInfo: LocationInfo): void {
    console.log(
      `Weather forecast for ${locationInfo.latitude}°N, ${locationInfo.longitude}°E (${locationInfo.timezone})`
    );
    console.log(
      `Timezone: ${locationInfo.timezone} (${locationInfo.timezoneAbbreviation})`
    );
    console.log("---");
    console.log("Time\t\t\t\tTemp\tRH\tAH");
    console.log("----------------------------------------");
  }

  /**
   * Processes raw weather data and calculates absolute humidity
   */
  static processWeatherData(weatherData: WeatherData): ProcessedWeatherPoint[] {
    const processedData: ProcessedWeatherPoint[] = [];

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      const temperature = weatherData.hourly.temperature2m[i];
      const relativeHumidity = weatherData.hourly.relativeHumidity2m[i];
      const absoluteHumidity = calculateAbsHumidity(
        temperature,
        relativeHumidity / 100
      ); // Convert % to decimal

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
  static displayWeatherData(processedData: ProcessedWeatherPoint[]): void {
    processedData.forEach((point) => {
      console.log(
        point.time.toISOString(),
        `${point.temperature.toFixed(1)}°C`,
        `${point.relativeHumidity.toFixed(0)}% RH`,
        `${point.absoluteHumidity.toFixed(2)} g/m³ AH`
      );
    });
  }
}
