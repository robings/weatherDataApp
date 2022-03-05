import { render, screen } from "@testing-library/react";
import { temperatureColours } from "../../constants/temperatureColours";
import TemperatureWidget from "./TemperatureWidget";

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

    const tempScenarios = [
      ["0", temperatureColours.subZero],
      ["9", temperatureColours.cold],
      ["16", temperatureColours.warm],
      ["25", temperatureColours.hot],
      ["45", temperatureColours.veryHot],
      ["-1", temperatureColours.subZero],
      ["-10", temperatureColours.subZero],
    ];
    test.each(tempScenarios)(
      "displays border with colour relevant to temperature %p",
      (temp, expectedColour) => {
        const { container } = renderTemperatureWidget(true, temp);

        // the attribute is important to check it is working.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const temperatureWidget = container.querySelector(".temperatureWidget");
        expect(temperatureWidget).toHaveAttribute(
          "style",
          `border-color: ${expectedColour.toLocaleLowerCase()};`
        );
      }
    );

    test.each(tempScenarios)(
      "displays border with colour relevant to feels like temperature %p",
      (temp, expectedColour) => {
        const { container } = renderTemperatureWidget(true, undefined, temp);

        // the attribute is important to check it is working.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const temperatureWidget = container.querySelector(".smallText");
        expect(temperatureWidget).toHaveAttribute(
          "style",
          `border-top: 1px solid ${expectedColour};`
        );
      }
    );
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

    const positiveStartXPos = "125";
    const scaleTo1Deg = 4;
    const testScenarios = [
      ["0", positiveStartXPos, "0", temperatureColours.subZero],
      ["9", positiveStartXPos, `${scaleTo1Deg * 9}`, temperatureColours.cold],
      ["16", positiveStartXPos, `${scaleTo1Deg * 16}`, temperatureColours.warm],
      ["30", positiveStartXPos, `${scaleTo1Deg * 30}`, temperatureColours.hot],
      [
        "45",
        positiveStartXPos,
        `${scaleTo1Deg * 45}`,
        temperatureColours.veryHot,
      ],
      ["-1", "121", `${scaleTo1Deg}`, temperatureColours.subZero],
      ["-10", "85", `${scaleTo1Deg * 10}`, temperatureColours.subZero],
    ];
    test.each(testScenarios)(
      "displays expected rectangle for temperature %p",
      (temp, expectedStartXPos, expectedRectangleLength, expectedColour) => {
        const { container } = renderTemperatureWidget(false, temp);

        // the attribute of part of the svg is important to check it is working.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const temperatureReadout = container.querySelector("#tempIndicator");
        expect(temperatureReadout).toHaveAttribute("x", expectedStartXPos);
        expect(temperatureReadout).toHaveAttribute(
          "width",
          expectedRectangleLength
        );
        expect(temperatureReadout).toHaveAttribute("fill", expectedColour);
      }
    );

    test.each(testScenarios)(
      "displays expected rectangle for feels like temperature %p",
      (temp, expectedStartXPos, expectedRectangleLength, expectedColour) => {
        const { container } = renderTemperatureWidget(false, undefined, temp);

        // the attribute of part of the svg is important to check it is working.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const feelsLikeTemperatureReadout = container.querySelector(
          "#feelsLikeTempIndicator"
        );
        expect(feelsLikeTemperatureReadout).toHaveAttribute(
          "x",
          expectedStartXPos
        );
        expect(feelsLikeTemperatureReadout).toHaveAttribute(
          "width",
          expectedRectangleLength
        );
        expect(feelsLikeTemperatureReadout).toHaveAttribute(
          "fill",
          expectedColour
        );
      }
    );
  });
});
