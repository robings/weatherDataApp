import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("app", () => {
  const renderApp = () => {
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

    return { mockedGetWeatherForecast };
  };

  test("renders weather forecast title", () => {
    renderApp();

    expect(
      screen.getByRole("heading", { name: "Weather Forecast" })
    ).toBeInTheDocument();
  });

  test("calls api to get weather forecast", async () => {
    const { mockedGetWeatherForecast } = renderApp();

    await waitFor(() => {
      expect(mockedGetWeatherForecast).toHaveBeenCalledTimes(1);
    });
  });

  test("shows non tabular format by default", async () => {
    const expectedDate = new Date(sampleResponseJson.dateTimeOfForecast);

    const expectedTitle = `${
      sampleResponseJson.location
    } ${expectedDate.toLocaleDateString()} ${expectedDate.toLocaleTimeString()}`;

    renderApp();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: expectedTitle })
      ).toBeInTheDocument();
    });

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("calls api a second time on refreshing", async () => {
    const { mockedGetWeatherForecast } = renderApp();

    await waitFor(() => {
      expect(mockedGetWeatherForecast).toHaveBeenCalledTimes(1);
    });

    userEvent.click(screen.getByRole("button", { name: "Refresh" }));

    await waitFor(() => {
      expect(mockedGetWeatherForecast).toHaveBeenCalledTimes(2);
    });
  });

  test("moves to tabular format page on clicking link", async () => {
    const expectedDate = new Date(sampleResponseJson.dateTimeOfForecast);

    const expectedTitle = `${
      sampleResponseJson.location
    } ${expectedDate.toLocaleDateString()} ${expectedDate.toLocaleTimeString()}`;

    const { mockedGetWeatherForecast } = renderApp();

    await waitFor(() => {
      expect(mockedGetWeatherForecast).toHaveBeenCalledTimes(1);
    });

    userEvent.click(
      screen.getByRole("link", { name: "Weather Data in Tabular Format" })
    );

    expect(await screen.findAllByRole("table")).toHaveLength(38);
    expect(
      screen.getByRole("heading", { name: expectedTitle })
    ).toBeInTheDocument();
    expect(mockedGetWeatherForecast).toHaveBeenCalledTimes(1);
  });
});
