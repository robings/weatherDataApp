import { render, screen } from "@testing-library/react";
import { appStrings } from "../../app.strings";
import WindIndicator from "./WindIndicator";

describe("wind indicator", () => {
  const speed = "16";
  const gustSpeed = "25";
  const windDirection = "NW";

  const renderWindIndicator = (
    wD: string = windDirection,
    compact: boolean = false
  ) => {
    const { container } = render(
      <WindIndicator
        speed={speed}
        gustSpeed={gustSpeed}
        windDirection={wD}
        compact={compact}
      />
    );

    return { container };
  };

  test("displays wind speed passed in", () => {
    renderWindIndicator();

    expect(screen.getByText(speed, { exact: false })).toBeInTheDocument();
  });

  test("displays gust speed passed in", () => {
    renderWindIndicator();

    expect(
      screen.getByText(`${appStrings.windIndicator.gust}: ${gustSpeed} mph`)
    ).toBeInTheDocument();
  });

  const compassDirections: Array<Array<string | number>> = [
    ["N", 0],
    ["NNE", 22.5],
    ["NE", 45],
    ["ENE", 67.5],
    ["E", 90],
    ["ESE", 112.5],
    ["SE", 135],
    ["SSE", 157.5],
    ["S", 180],
    ["SSW", 202.5],
    ["SW", 225],
    ["WSW", 247.5],
    ["W", 270],
    ["WNW", 292.5],
    ["NW", 315],
    ["NNW", 337.5],
  ];
  test.each(compassDirections)(
    "rotates compass pointer base on wind direction passed in",
    (compassDirection, bearingAngle) => {
      const { container } = renderWindIndicator(compassDirection as string);

      // the attribute of part of the svg is important to check it is working.
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const compassPointer = container.querySelector("#compassPointer");
      expect(compassPointer).toHaveAttribute(
        "transform",
        `rotate(${bearingAngle} 50 50)`
      );
    }
  );

  test("displays compass full size if not compact", () => {
    const { container } = renderWindIndicator();

    // the attribute of part of the svg is important to check it is working.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const compassPointer = container.querySelector("#compass");
    expect(compassPointer).toHaveAttribute("width", "100");
    expect(compassPointer).toHaveAttribute("height", "100");
  });

  test("displays compass half size if compact", () => {
    const { container } = renderWindIndicator(undefined, true);

    // the attribute of part of the svg is important to check it is working.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const compassPointer = container.querySelector("#compass");
    expect(compassPointer).toHaveAttribute("width", "50");
    expect(compassPointer).toHaveAttribute("width", "50");
  });
});
