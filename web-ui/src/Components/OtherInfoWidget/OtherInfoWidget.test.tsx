import { render, screen } from "@testing-library/react";
import { ForecastElement } from "../../constants/WeatherForecastResponse";
import OtherInfoWidget from "./OtherInfoWidget";

describe("other info widget", () => {
  const visibility = "Good 10 - 20 km";
  const precipitationProbability: ForecastElement = {
    type: "Precipitation Probability",
    units: "%",
    value: "30",
  };
  const UVIndex = "1";
  const humidity: ForecastElement = {
    type: "Screen Relative Humidity",
    units: "%",
    value: "80",
  };

  const renderOtherInfoWidget = () => {
    render(
      <OtherInfoWidget
        visibility={visibility}
        precipitationProbability={precipitationProbability}
        UVIndex={UVIndex}
        humidity={humidity}
      />
    );
  };

  test("displays visibility passed in", () => {
    renderOtherInfoWidget();

    // react testing library doesn't render the actual svg, instead
    // putting the filename in (when importing the svg as a ReactComponent)
    expect(screen.getByText("visibility.svg")).toBeInTheDocument();
    expect(screen.getByText(visibility)).toBeInTheDocument();
  });

  test("displays precipitation probability passed in", () => {
    renderOtherInfoWidget();

    const expectedProbability = `${precipitationProbability.value}${precipitationProbability.units}`;

    expect(screen.getByText("precipitation.svg")).toBeInTheDocument();
    expect(screen.getByText(expectedProbability)).toBeInTheDocument();
  });

  test("displays UV Index passed in", () => {
    renderOtherInfoWidget();

    expect(screen.getByText(`Max UV Index: ${UVIndex}`)).toBeInTheDocument();
  });

  test("displays humidity passed in", () => {
    renderOtherInfoWidget();

    const expectedHumidity = `${humidity.value}${humidity.units}`;

    expect(
      screen.getByText(`Humidity: ${expectedHumidity}`)
    ).toBeInTheDocument();
  });
});
