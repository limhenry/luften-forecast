import { WeatherParams, LocationInfo, WeatherData } from "../types/weather";
export declare class WeatherService {
    private static readonly API_URL;
    /**
     * Fetches weather data from Open-Meteo API
     */
    fetchWeatherData(params: WeatherParams): Promise<{
        locationInfo: LocationInfo;
        weatherData: WeatherData;
    }>;
    /**
     * Creates default weather parameters for Hamburg, Germany
     */
    static getDefaultParams(): WeatherParams;
}
//# sourceMappingURL=weatherService.d.ts.map