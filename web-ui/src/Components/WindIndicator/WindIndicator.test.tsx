import { render, screen } from "@testing-library/react";
import { appStrings } from "../../app.strings";
import WindIndicator from "./WindIndicator";

describe("wind indicator", () => {
  const speed = "16";
  const gustSpeed = "25";
  const windDirection = "NW";

  const renderWindIndicator = () => {
    const { container } = render(
      <WindIndicator
        speed={speed}
        gustSpeed={gustSpeed}
        windDirection={windDirection}
      />
    );

    return { container };
  };

  test("displays title", () => {
    renderWindIndicator();

    expect(
      screen.getByRole("heading", { name: appStrings.windIndicator.title })
    ).toBeInTheDocument();
  });

  test("displays wind speed passed in", () => {
    renderWindIndicator();

    expect(screen.getByText(speed)).toBeInTheDocument();
  });

  test("displays gust speed passed in", () => {
    renderWindIndicator();

    expect(
      screen.getByText(`${appStrings.windIndicator.gust}: ${gustSpeed} mph`)
    ).toBeInTheDocument();
  });

  test("rotates compass pointer base on wind direction passed in", () => {
    const { container } = renderWindIndicator();

    // the attribute of part of the svg is important to check it is working.
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const compassPointer = container.querySelector("#compassPointer");
    expect(compassPointer).toHaveAttribute("transform", "rotate(315 50 50)");
  });
});
