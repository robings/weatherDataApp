import { WeatherForecastResponse } from "../Components/WeatherForecastResponse";
import { apiStrings } from "../constants/api.strings";

const getWeatherForecast = async (): Promise<WeatherForecastResponse> => {
  let forecastCall: Response;

  try {
    forecastCall = await fetch("https://localhost:5001/weatherforecast", {
      method: "GET",
    });
  } catch {
    throw new Error(apiStrings.error);
  }

  if (forecastCall.status >= 400 && forecastCall.status < 500) {
    throw new Error(apiStrings.notFound);
  }

  if (forecastCall.status === 500) {
    throw new Error(apiStrings.error);
  }

  return forecastCall.json();
};

const api = { getWeatherForecast };

export default api;
