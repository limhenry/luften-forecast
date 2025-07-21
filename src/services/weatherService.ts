import { fetchWeatherApi } from "openmeteo";
import { WeatherParams, LocationInfo, WeatherData } from "../types/weather";

export class WeatherService {
  private static readonly API_URL = "https://api.open-meteo.com/v1/forecast";

  /**
   * Fetches weather data from Open-Meteo API
   */
  async fetchWeatherData(
    params: WeatherParams
  ): Promise<{ locationInfo: LocationInfo; weatherData: WeatherData }> {
    try {
      const responses = await fetchWeatherApi(WeatherService.API_URL, params);
      const response = responses[0];

      const locationInfo: LocationInfo = {
        latitude: response.latitude(),
        longitude: response.longitude(),
        timezone: response.timezone() || "Unknown",
        timezoneAbbreviation: response.timezoneAbbreviation() || "Unknown",
        utcOffsetSeconds: response.utcOffsetSeconds(),
      };

      const hourly = response.hourly()!;

      const weatherData: WeatherData = {
        hourly: {
          time: [
            ...Array(
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  locationInfo.utcOffsetSeconds) *
                  1000
              )
          ),
          temperature2m: hourly.variables(0)!.valuesArray()!,
          relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
        },
      };

      return { locationInfo, weatherData };
    } catch (error) {
      throw new Error(
        `Failed to fetch weather data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Creates default weather parameters for Hamburg, Germany
   */
  static getDefaultParams(): WeatherParams {
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
