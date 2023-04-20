import { render, screen } from "@testing-library/react";
import { ThreeHourlyForecast } from "../../constants/WeatherForecastResponse";
import ForecastTile from "./ForecastTile";

describe("forecast tile component", () => {
  const forecast: ThreeHourlyForecast = {
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
  };

  const renderForecastTile = (
    compact: boolean = true,
    data: ThreeHourlyForecast = forecast
  ) => {
    render(<ForecastTile compact={compact} forecast={data} />);
  };

  describe("in compact mode", () => {
    test("renders time span for tile", () => {
      renderForecastTile();

      const expectedTimeSpan = `${forecast.start} - ${forecast.end}`;

      expect(screen.getByText(expectedTimeSpan)).toBeInTheDocument();
    });

    test("displays temperature", () => {
      renderForecastTile();

      expect(screen.getByText("6°")).toBeInTheDocument();
    });

    test("displays precipitation percentage", () => {
      renderForecastTile();

      expect(screen.getByText("90%")).toBeInTheDocument();
    });

    test("displays wind speeds", () => {
      renderForecastTile();

      expect(screen.getByText("11")).toBeInTheDocument();
      expect(screen.getByText("29")).toBeInTheDocument();
    });
  });

  describe("in non-compact mode", () => {
    test("renders time span for tile", () => {
      renderForecastTile(false);

      const expectedTimeSpan = `${forecast.start} - ${forecast.end}`;

      expect(screen.getByText(expectedTimeSpan)).toBeInTheDocument();
    });

    test("displays temperature", () => {
      renderForecastTile(false);

      expect(screen.getByText("6°")).toBeInTheDocument();
    });

    test("displays feels like temperature", () => {
      renderForecastTile(false);

      expect(screen.getByText("3°")).toBeInTheDocument();
    });

    test("displays precipitation percentage", () => {
      renderForecastTile(false);

      expect(screen.getByText("90%")).toBeInTheDocument();
    });

    test("displays wind speeds", () => {
      renderForecastTile(false);

      expect(screen.getByText("11 mph")).toBeInTheDocument();
      expect(screen.getByText("Gusting: 29 mph")).toBeInTheDocument();
    });
  });
});
