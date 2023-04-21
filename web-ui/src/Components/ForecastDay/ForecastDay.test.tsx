import { render, screen } from "@testing-library/react";
import ForecastDay from "./ForecastDay";
import { DayData } from "../../constants/WeatherForecastResponse";

describe("Forecast Day Component", () => {
  const dayData: DayData = {
    date: "2022-02-24Z",
    threeHourlyForecasts: [
      {
        start: "06:00",
        end: "09:00",
        forecastElements: [
          { type: "Wind Direction", units: "compass", value: "WSW" },
          { type: "Feels Like Temperature", units: "C", value: "3" },
          { type: "Wind Gust", units: "mph", value: "29" },
          { type: "Screen Relative Humidity", units: "%", value: "90" },
          {
            type: "Precipitation Probability",
            units: "%",
            value: "90",
          },
          { type: "Wind Speed", units: "mph", value: "11" },
          { type: "Temperature", units: "C", value: "6" },
          { type: "Visibility", units: "", value: "Moderate 4-10 km" },
          { type: "Weather Type", units: "", value: "Heavy rain" },
          { type: "Max UV Index", units: "", value: "0" },
        ],
      },
      {
        start: "09:00",
        end: "12:00",
        forecastElements: [
          { type: "Wind Direction", units: "compass", value: "WSW" },
          { type: "Feels Like Temperature", units: "C", value: "-10" },
          { type: "Wind Gust", units: "mph", value: "22" },
          { type: "Screen Relative Humidity", units: "%", value: "87" },
          {
            type: "Precipitation Probability",
            units: "%",
            value: "93",
          },
          { type: "Wind Speed", units: "mph", value: "13" },
          { type: "Temperature", units: "C", value: "-4" },
          {
            type: "Visibility",
            units: "",
            value: "Very good 20-40 km",
          },
          { type: "Weather Type", units: "", value: "Light rain" },
          { type: "Max UV Index", units: "", value: "1" },
        ],
      },
    ],
  };

  const renderForecastDay = (data: DayData = dayData) => {
    render(<ForecastDay dayData={data} />);
  };

  test("displays date as title", () => {
    renderForecastDay();

    expect(
      screen.getByRole("heading", {
        name: new Date(dayData.date).toLocaleDateString(),
      })
    ).toBeInTheDocument();
  });

  test("displays tile for each three hourly forecast", () => {
    const tileTitles: Array<string> = dayData.threeHourlyForecasts.map(
      (forecast) => {
        return `${forecast.start} - ${forecast.end}`;
      }
    );

    renderForecastDay();

    tileTitles.forEach((tileTitle) => {
      expect(screen.getByText(tileTitle)).toBeInTheDocument();
    });
  });
});
