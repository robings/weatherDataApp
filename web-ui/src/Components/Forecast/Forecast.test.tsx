import { render, screen } from "@testing-library/react";
import { WeatherForecastResponse } from "../../constants/WeatherForecastResponse";
import sampleResponseJson from "../../sampleResponse.json";
import Forecast from "./Forecast";

describe("Forecast Component", () => {
  const renderForecast = (
    data: WeatherForecastResponse = sampleResponseJson
  ) => {
    render(<Forecast weatherForecastData={data} />);
  };

  test("displays placename, date and time", () => {
    const expectedDate = new Date(sampleResponseJson.dateTimeOfForecast);

    const expectedTitle = `${
      sampleResponseJson.location
    } ${expectedDate.toLocaleDateString()} ${expectedDate.toLocaleTimeString()}`;

    renderForecast();

    expect(
      screen.getByRole("heading", { name: expectedTitle })
    ).toBeInTheDocument();
  });

  test("displays a title for each date", () => {
    renderForecast();

    sampleResponseJson.dayData.forEach((day) => {
      const expectedDate = new Date(day.date).toLocaleDateString();

      expect(
        screen.getByRole("heading", { name: expectedDate })
      ).toBeInTheDocument();
    });
  });
});
