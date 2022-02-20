import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders weather forecast title", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "Weather Forecast" })
  ).toBeInTheDocument();
});
