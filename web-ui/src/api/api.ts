import { SiteListResponse } from "../constants/SiteListResponse";
import { WeatherForecastResponse } from "../constants/WeatherForecastResponse";
import { apiStrings } from "../constants/api.strings";
// import sampleResponse from "../sampleResponse.json";

const getWeatherForecast = async (
  locationId: string
): Promise<WeatherForecastResponse> => {
  let forecastCall: Response;

  try {
    forecastCall = await fetch(
      `https://localhost:5001/weatherforecast?locationId=${locationId}`,
      {
        method: "GET",
      }
    );
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

const getSiteList = async (searchString: string): Promise<SiteListResponse> => {
  let siteListCall: Response;

  try {
    siteListCall = await fetch(
      `https://localhost:5001/weatherforecast/sites?searchString=${searchString}`,
      {
        method: "GET",
      }
    );
  } catch {
    throw new Error(apiStrings.siteListError);
  }

  if (siteListCall.status >= 400 && siteListCall.status < 500) {
    throw new Error(apiStrings.siteListNotFound);
  }

  if (siteListCall.status === 500) {
    throw new Error(apiStrings.siteListError);
  }

  return siteListCall.json();
};

// const getWeatherForecast = async (): Promise<WeatherForecastResponse> => {
//   return Promise.resolve(sampleResponse);
// };

const api = { getWeatherForecast, getSiteList };

export default api;
