import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { appStrings } from "../../constants/app.strings";
import sampleResponseJson from "../../sampleResponse.json";
import WeatherForecast from "./WeatherForecast";

describe("weather forecast component", () => {
  const renderWeatherForecast = () => {
    render(
      <MemoryRouter>
        <WeatherForecast weatherForecastData={sampleResponseJson} />
      </MemoryRouter>
    );
  };

  test("displays link to tabular format page", () => {
    renderWeatherForecast();

    expect(
      screen.getByRole("link", { name: appStrings.tableFormat })
    ).toHaveAttribute("href", "/table");
  });

  test("displays placename, date and time", () => {
    const expectedDate = new Date(sampleResponseJson.dateTimeOfForecast);

    const expectedTitle = `${
      sampleResponseJson.location
    } ${expectedDate.toLocaleDateString()} ${expectedDate.toLocaleTimeString()}`;

    renderWeatherForecast();

    expect(
      screen.getByRole("heading", { name: expectedTitle })
    ).toBeInTheDocument();
  });

  test("displays a title for each date", () => {
    renderWeatherForecast();

    sampleResponseJson.dayData.forEach((day) => {
      const expectedDate = new Date(day.date).toLocaleDateString();

      expect(
        screen.getByRole("heading", { name: expectedDate })
      ).toBeInTheDocument();
    });
  });
});
