export interface WeatherParams {
    latitude: number;
    longitude: number;
    hourly: string[];
    models: string;
    timezone: string;
    forecast_days: number;
}
export interface LocationInfo {
    latitude: number;
    longitude: number;
    timezone: string;
    timezoneAbbreviation: string;
    utcOffsetSeconds: number;
}
export interface WeatherData {
    hourly: {
        time: Date[];
        temperature2m: Float32Array;
        relativeHumidity2m: Float32Array;
    };
}
export interface ProcessedWeatherPoint {
    time: Date;
    temperature: number;
    relativeHumidity: number;
    absoluteHumidity: number;
}
//# sourceMappingURL=weather.d.ts.map