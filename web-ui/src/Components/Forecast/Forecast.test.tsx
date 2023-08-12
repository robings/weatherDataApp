import { render, screen } from "@testing-library/react";
import { WeatherForecastResponse } from "../../constants/WeatherForecastResponse";
import sampleResponseJson from "../../sampleResponse.json";
import Forecast from "./Forecast";
import { appStrings } from "../../constants/app.strings";
import { MemoryRouter } from "react-router-dom";

describe("Forecast Component", () => {
  const renderForecast = (
    data: WeatherForecastResponse = sampleResponseJson
  ) => {
    render(
      <MemoryRouter>
        <Forecast weatherForecastData={data} />
      </MemoryRouter>
    );
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
      const weekday = new Date(day.date).toLocaleDateString("en-gb", {
        weekday: "long",
      });

      expect(
        screen.getByRole("heading", { name: `${weekday} ${expectedDate}` })
      ).toBeInTheDocument();
    });
  });

  test("displays link to tabular format page", () => {
    renderForecast();

    expect(
      screen.getByRole("link", { name: appStrings.tableFormat })
    ).toHaveAttribute("href", "/table");
  });
});
