import fetch from "jest-fetch-mock";
import { apiStrings } from "../constants/api.strings";
import { APIBaseUrl } from "../constants/settings";
import sampleResponseJson from "../sampleResponse.json";
import sampleSiteListResponseJson from "../sampleSiteListResponse.json";
import api from "./api";

beforeEach(() => {
  fetch.enableMocks();
  fetch.resetMocks();
});

describe("getWeatherForecast", () => {
  test("calls fetch with correct method", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleResponseJson));

    var locationId = "1234";

    await api.getWeatherForecast(locationId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe(
      `${APIBaseUrl}/weatherforecast?locationId=${locationId}`
    );
    expect(fetch.mock.calls[0][1]?.method).toBe("GET");
  });

  test("returns expected data", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleResponseJson));

    const response = await api.getWeatherForecast("1");

    expect(response).toEqual(sampleResponseJson);
  });

  test("throws if API unavailable", async () => {
    fetch.mockReject(new Error("API not available."));

    await expect(() => api.getWeatherForecast("1")).rejects.toThrow(
      apiStrings.error
    );
  });

  const fourHundredCodes: number[] = [400, 401, 403, 404];
  test.each(fourHundredCodes)(
    "throws if a response is received with status code: %p",
    async (code) => {
      fetch.mockResponseOnce("Error", { status: code });

      await expect(() => api.getWeatherForecast("1")).rejects.toThrow(
        apiStrings.notFound
      );
    }
  );

  test("throws if a response is received with a 500 status code", async () => {
    fetch.mockResponseOnce("Error", { status: 500 });

    await expect(() => api.getWeatherForecast("1")).rejects.toThrow(
      apiStrings.error
    );
  });
});

describe("getSiteList", () => {
  test("calls fetch with correct method", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleSiteListResponseJson));

    let searchString = "searchThis";

    await api.getSiteList(searchString);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe(
      `${APIBaseUrl}/weatherforecast/sites?searchString=${searchString}`
    );
    expect(fetch.mock.calls[0][1]?.method).toBe("GET");
  });

  test("returns expected data", async () => {
    fetch.mockResponseOnce(JSON.stringify(sampleSiteListResponseJson));

    const response = await api.getSiteList("searchThis");

    expect(response).toEqual(sampleSiteListResponseJson);
  });

  test("throws if API unavailable", async () => {
    fetch.mockReject(new Error("API not available."));

    await expect(() => api.getSiteList("searchThis")).rejects.toThrow(
      apiStrings.siteListError
    );
  });

  const fourHundredCodes: number[] = [400, 401, 403, 404];
  test.each(fourHundredCodes)(
    "throws if a response is received with status code: %p",
    async (code) => {
      fetch.mockResponseOnce("Error", { status: code });

      await expect(() => api.getSiteList("searchThis")).rejects.toThrow(
        apiStrings.siteListNotFound
      );
    }
  );

  test("throws if a response is received with a 500 status code", async () => {
    fetch.mockResponseOnce("Error", { status: 500 });

    await expect(() => api.getSiteList("searchThis")).rejects.toThrow(
      apiStrings.siteListError
    );
  });
});
