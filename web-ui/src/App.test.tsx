import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders weather forecast title", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(
    screen.getByRole("heading", { name: "Weather Forecast" })
  ).toBeInTheDocument();
});
