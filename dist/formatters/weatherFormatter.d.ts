import { LocationInfo, WeatherData, ProcessedWeatherPoint } from "../types/weather";
export declare class WeatherFormatter {
    /**
     * Displays location and timezone information
     */
    static displayLocationInfo(locationInfo: LocationInfo): void;
    /**
     * Processes raw weather data and calculates absolute humidity
     */
    static processWeatherData(weatherData: WeatherData): ProcessedWeatherPoint[];
    /**
     * Displays formatted weather data
     */
    static displayWeatherData(processedData: ProcessedWeatherPoint[]): void;
}
//# sourceMappingURL=weatherFormatter.d.ts.map