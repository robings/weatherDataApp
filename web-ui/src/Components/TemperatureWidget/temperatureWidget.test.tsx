import { render, screen } from "@testing-library/react";
import TemperatureWidget from "./temperatureWidget";

describe("temperatureWidget", () => {
  const testTemp = "16";
  const testUnit = "C";
  const testFeelsLikeTemp = "15";

  const renderTemperatureWidget = (compact: boolean) => {
    render(
      <TemperatureWidget
        unit={testUnit}
        temperature={testTemp}
        feelsLikeTemperature={testFeelsLikeTemp}
        compact={compact}
      />
    );
  };

  describe("in compact mode", () => {
    test("displays temperature", () => {
      renderTemperatureWidget(true);

      expect(
        screen.getByText(new RegExp(`${testTemp}°${testUnit}`))
      ).toBeInTheDocument();
    });

    test("displays feels like temperature", () => {
      renderTemperatureWidget(true);

      expect(
        screen.getByText(
          new RegExp(`(feels like ${testFeelsLikeTemp}°${testUnit})`)
        )
      ).toBeInTheDocument();
    });
  });
});
