import { render, screen, within, Screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { appStrings } from "../../constants/app.strings";
import { forecastBgColours } from "../../constants/forecastBgColours";
import { WeatherForecastResponse } from "../../constants/WeatherForecastResponse";
import sampleResponseJson from "../../sampleResponse.json";
import WeatherForecast from "./WeatherForecast";

describe("weather forecast component", () => {
  const renderWeatherForecast = (
    data: WeatherForecastResponse = sampleResponseJson
  ) => {
    render(
      <MemoryRouter>
        <WeatherForecast weatherForecastData={data} />
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

  test("displays a title for each time period", () => {
    renderWeatherForecast();

    let expectedHeadings: Array<string> = [];
    sampleResponseJson.dayData.forEach((day) => {
      day.threeHourlyForecasts.forEach((forecast) => {
        expectedHeadings.push(
          `${forecast.start} - ${forecast.end}: ${
            forecast.forecastElements.find((e) => e.type === "Weather Type")
              ?.value
          }`
        );
      });
    });

    const level3Headings = screen.getAllByRole("heading", { level: 3 });

    const filteredLevel3Headings = level3Headings.filter(
      (h) => h.className === "dataH3"
    );

    filteredLevel3Headings.forEach((heading, index) => {
      expect(heading).toHaveTextContent(expectedHeadings[index]);
    });
  });

  const minimalDataForTest: WeatherForecastResponse = {
    dateTimeOfForecast: "2022-02-24T09:00:00Z",
    locationId: "TESTID",
    location: "TESTPLACE",
    dayData: [
      {
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
        ],
      },
      {
        date: "2022-02-25Z",
        threeHourlyForecasts: [
          {
            start: "00:00",
            end: "03:00",
            forecastElements: [
              { type: "Wind Direction", units: "compass", value: "W" },
              { type: "Feels Like Temperature", units: "C", value: "-1" },
              { type: "Wind Gust", units: "mph", value: "31" },
              { type: "Screen Relative Humidity", units: "%", value: "74" },
              { type: "Precipitation Probability", units: "%", value: "1" },
              { type: "Wind Speed", units: "mph", value: "16" },
              { type: "Temperature", units: "C", value: "4" },
              { type: "Visibility", units: "", value: "Excellent < 40 km" },
              { type: "Weather Type", units: "", value: "Clear night" },
              { type: "Max UV Index", units: "", value: "0" },
            ],
          },
          {
            start: "03:00",
            end: "06:00",
            forecastElements: [
              { type: "Wind Direction", units: "compass", value: "W" },
              { type: "Feels Like Temperature", units: "C", value: "-2" },
              { type: "Wind Gust", units: "mph", value: "27" },
              { type: "Screen Relative Humidity", units: "%", value: "79" },
              { type: "Precipitation Probability", units: "%", value: "0" },
              { type: "Wind Speed", units: "mph", value: "13" },
              { type: "Temperature", units: "C", value: "3" },
              { type: "Visibility", units: "", value: "Excellent < 40 km" },
              { type: "Weather Type", units: "", value: "Clear night" },
              { type: "Max UV Index", units: "", value: "0" },
            ],
          },
        ],
      },
    ],
  };

  /* eslint-disable testing-library/no-node-access */
  /* eslint-disable testing-library/prefer-screen-queries */
  function getByHeading(
    component: Screen | HTMLElement,
    heading: string,
    level: number | undefined = undefined,
    ancestor: 1 | 2 = 1
  ): HTMLElement {
    let headings: Element[];
    if (component instanceof HTMLElement) {
      headings = within(component).getAllByRole("heading", { level: level });
    } else {
      headings = component.getAllByRole("heading", { level: level });
    }
    if (headings === undefined) throw Error(`no headings found`);

    const headingComponent = headings.filter((x) => x.textContent === heading);

    if (headingComponent && headingComponent.length === 0)
      throw Error(`heading '${heading}' not found`);
    if (headingComponent.length > 1)
      throw Error(`Multiple headings found with '${heading}'`);

    if (!headingComponent[0].parentElement) {
      throw new Error("No parent found for heading");
    }

    if (ancestor === 2) {
      const parent = headingComponent[0].parentElement;
      if (!parent.parentElement) {
        throw new Error("No grandparent found for heading");
      }

      return parent.parentElement;
    }
    return headingComponent[0].parentElement;
  }
  /* eslint-enable testing-library/no-node-access */

  test("displays data passed in", () => {
    renderWeatherForecast(minimalDataForTest);

    const dayElement = getByHeading(
      screen,
      new Date("2022-02-24Z").toLocaleDateString(),
      3
    );

    // first forecast element
    const forecastElement = getByHeading(
      dayElement,
      "06:00 - 09:00: Heavy rain",
      3,
      2
    );

    expect(within(forecastElement).getByText("6°C")).toBeInTheDocument();
    expect(
      within(forecastElement).getByText("(feels like 3°C)")
    ).toBeInTheDocument();
    expect(within(forecastElement).getByText("11 mph")).toBeInTheDocument();
    expect(
      within(forecastElement).getByText("Gusting: 29 mph")
    ).toBeInTheDocument();
    expect(
      within(forecastElement).getByText("Moderate 4-10 km")
    ).toBeInTheDocument();
    expect(within(forecastElement).getByText("90%")).toBeInTheDocument();
    expect(
      within(forecastElement).getByText("Max UV Index: 0")
    ).toBeInTheDocument();

    // find the second day element
    const dayElementTwo = getByHeading(
      screen,
      new Date("2022-02-25Z").toLocaleDateString(),
      3
    );

    // second forecast element
    const forecastElementTwo = getByHeading(
      dayElementTwo,
      "00:00 - 03:00: Clear night",
      3,
      2
    );

    expect(within(forecastElementTwo).getByText("4°C")).toBeInTheDocument();
    expect(
      within(forecastElementTwo).getByText("(feels like -1°C)")
    ).toBeInTheDocument();
    expect(within(forecastElementTwo).getByText("16 mph")).toBeInTheDocument();
    expect(
      within(forecastElementTwo).getByText("Gusting: 31 mph")
    ).toBeInTheDocument();
    expect(
      within(forecastElementTwo).getByText("Excellent < 40 km")
    ).toBeInTheDocument();
    expect(within(forecastElementTwo).getByText("1%")).toBeInTheDocument();
    expect(
      within(forecastElementTwo).getByText("Max UV Index: 0")
    ).toBeInTheDocument();

    // third forecast element
    const forecastElementThree = getByHeading(
      dayElementTwo,
      "03:00 - 06:00: Clear night",
      3,
      2
    );

    expect(within(forecastElementThree).getByText("3°C")).toBeInTheDocument();
    expect(
      within(forecastElementThree).getByText("(feels like -2°C)")
    ).toBeInTheDocument();
    expect(
      within(forecastElementThree).getByText("13 mph")
    ).toBeInTheDocument();
    expect(
      within(forecastElementThree).getByText("Gusting: 27 mph")
    ).toBeInTheDocument();
    expect(
      within(forecastElementThree).getByText("Excellent < 40 km")
    ).toBeInTheDocument();
    expect(within(forecastElementThree).getByText("0%")).toBeInTheDocument();
    expect(
      within(forecastElementThree).getByText("Max UV Index: 0")
    ).toBeInTheDocument();
  });

  test.each(forecastBgColours)(
    "displays %p forecast with expected background colour: %p",
    (weatherType, expectedBgColour) => {
      const dataForTest: WeatherForecastResponse = {
        dateTimeOfForecast: "2022-02-24T09:00:00Z",
        locationId: "TESTID",
        location: "TESTPLACE",
        dayData: [
          {
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
                  { type: "Weather Type", units: "", value: weatherType },
                  { type: "Max UV Index", units: "", value: "0" },
                ],
              },
            ],
          },
        ],
      };

      renderWeatherForecast(dataForTest);

      const forecastElement = getByHeading(
        screen,
        `06:00 - 09:00: ${weatherType}`,
        3,
        2
      );

      expect(forecastElement).toHaveAttribute(
        "style",
        `background-color: ${expectedBgColour};`
      );
    }
  );
});
