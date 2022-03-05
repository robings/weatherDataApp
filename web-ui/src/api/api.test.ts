import fetch from "jest-fetch-mock";
import { apiStrings } from "../constants/api.strings";
import { APIBaseUrl } from "../constants/settings";
import sampleResponseJson from "../sampleResponse.json";
import api from "./api";

beforeEach(() => {
  fetch.enableMocks();
  fetch.resetMocks();
});

describe("api", () => {
  test("calls fetch with correct method", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleResponseJson));

    await api.getWeatherForecast();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe(`${APIBaseUrl}/weatherforecast`);
    expect(fetch.mock.calls[0][1]?.method).toBe("GET");
  });

  test("returns expected data", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleResponseJson));

    const response = await api.getWeatherForecast();

    expect(response).toEqual(sampleResponseJson);
  });

  test("throws if API unavailable", async () => {
    fetch.mockReject(new Error("API not available."));

    await expect(() => api.getWeatherForecast()).rejects.toThrow(
      apiStrings.error
    );
  });

  const fourHundredCodes: number[] = [400, 401, 403, 404];
  test.each(fourHundredCodes)(
    "throws if a response is received with status code: %p",
    async (code) => {
      fetch.mockResponseOnce("Error", { status: code });

      await expect(() => api.getWeatherForecast()).rejects.toThrow(
        apiStrings.notFound
      );
    }
  );

  test("throws if a response is received with a 500 status code", async () => {
    fetch.mockResponseOnce("Error", { status: 500 });

    await expect(() => api.getWeatherForecast()).rejects.toThrow(
      apiStrings.error
    );
  });
});
