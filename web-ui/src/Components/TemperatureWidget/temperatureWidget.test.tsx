import { render, screen } from "@testing-library/react";
import TemperatureWidget from "./temperatureWidget";

describe("temperatureWidget", () => {
  const testTemp = "16";
  const testUnit = "C";
  const testFeelsLikeTemp = "15";

  const renderTemperatureWidget = (
    compact: boolean,
    temperature: string = testTemp,
    feelsLikeTemperature: string = testFeelsLikeTemp
  ) => {
    const { container } = render(
      <TemperatureWidget
        unit={testUnit}
        temperature={temperature}
        feelsLikeTemperature={feelsLikeTemperature}
        compact={compact}
      />
    );

    return { container };
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

  describe("in non-compact mode", () => {
    test("displays temperature", () => {
      renderTemperatureWidget(false);

      expect(
        screen.getByText(new RegExp(`${testTemp}°${testUnit}`))
      ).toBeInTheDocument();
    });

    test("displays feels like temperature", () => {
      renderTemperatureWidget(false);

      expect(
        screen.getByText(
          new RegExp(`(feels like ${testFeelsLikeTemp}°${testUnit})`)
        )
      ).toBeInTheDocument();
    });

    // const testTemps = ["0", "9", "16", "30", "45", "-1", "-10"];

    const positiveStartXPos = "125";
    const scaleTo1Deg = 4;
    const testScenarios = [
      ["0", positiveStartXPos, "0"],
      ["9", positiveStartXPos, `${scaleTo1Deg * 9}`],
      ["16", positiveStartXPos, `${scaleTo1Deg * 16}`],
      ["30", positiveStartXPos, `${scaleTo1Deg * 30}`],
      ["45", positiveStartXPos, `${scaleTo1Deg * 45}`],
      ["-1", "121", `${scaleTo1Deg}`],
      ["-10", "85", `${scaleTo1Deg * 10}`],
    ];
    test.each(testScenarios)(
      "displays expected rectangle for temperature %p",
      (temp, expectedStartXPos, expectedRectangleLength) => {
        const { container } = renderTemperatureWidget(false, temp);

        // the attribute of part of the svg is important to check it is working.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const temperatureReadout = container.querySelector("#tempIndicator");
        expect(temperatureReadout).toHaveAttribute("x", expectedStartXPos);
        expect(temperatureReadout).toHaveAttribute(
          "width",
          expectedRectangleLength
        );
      }
    );

    // test.each(testTemps)(
    //   "displays expected rectangle for feels like temperature",
    //   (temp) => {
    //     const { container } = renderTemperatureWidget(false, undefined, temp);
    //     const expectedRectangleLength = `${(200 / 50) * parseInt(temp)}`;

    //     // the attribute of part of the svg is important to check it is working.
    //     // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    //     const temperatureReadout = container.querySelector(
    //       "#feelsLikeTempIndicator"
    //     );
    //     expect(temperatureReadout).toHaveAttribute(
    //       "width",
    //       expectedRectangleLength
    //     );
    //   }
    // );
  });
});
