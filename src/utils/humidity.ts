/**
 * Calculates absolute humidity from temperature and relative humidity
 * using the Magnus formula commonly used in meteorology
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity as a decimal (0-1, not percentage)
 * @returns Absolute humidity in g/m³
 */
export function calculateAbsHumidity(
  temperature: number,
  humidity: number
): number {
  const abs_temperature = temperature + 273.15;
  let abs_humidity = 6.112;
  abs_humidity *= Math.exp((17.67 * temperature) / (243.5 + temperature));
  abs_humidity *= humidity;
  abs_humidity *= 2.1674;
  abs_humidity /= abs_temperature;
  return abs_humidity;
}
