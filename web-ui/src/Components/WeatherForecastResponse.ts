export interface WeatherForecastResponse {
  dateTimeOfForecast: string;
  location: string;
  locationId: string;
  dayData: Array<DayData>;
}

export interface DayData {
  date: string;
  threeHourlyForecasts: Array<ThreeHourlyForecast>;
}

export interface ThreeHourlyForecast {
  start: string;
  end: string;
  forecastElements: Array<ForecastElement>;
}

export interface ForecastElement {
  type: string;
  units: string;
  value: string;
}
