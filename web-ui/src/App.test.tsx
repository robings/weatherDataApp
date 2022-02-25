import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import api from "./api/api";
import sampleResponseJson from "./sampleResponse.json";

jest.mock("./api/api");

beforeAll(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});

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

test("calls api to get weather forecast", async () => {
  const mockedGetWeatherForecast =
    api.getWeatherForecast as jest.MockedFunction<
      typeof api.getWeatherForecast
    >;
  mockedGetWeatherForecast.mockResolvedValue(sampleResponseJson);

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(mockedGetWeatherForecast).toHaveBeenCalledTimes(1);
  });
});
