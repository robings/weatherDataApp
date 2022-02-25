import { render, screen } from "@testing-library/react";
import WeatherSVG from "./WeatherSVG";

const weatherTypes = [
  ["Clear night", "clearNight.svg"],
  ["Sunny day", "sun.svg"],
  ["Partly cloudy (night)", "partlyCloudyNight.svg"],
  ["Partly cloudy (day)", "partlyCloudyDay.svg"],
  ["Mist", "mist.svg"],
  ["Fog", "fog.svg"],
  ["Cloudy", "cloud.svg"],
  ["Overcast", "cloud.svg"],
  ["Light rain shower (night)", "lightRain.svg"],
  ["Light rain shower (day)", "lightRain.svg"],
  ["Drizzle", "drizzle.svg"],
  ["Light rain", "lightRain.svg"],
  ["Heavy rain shower (night)", "heavyRain.svg"],
  ["Heavy rain shower (day)", "heavyRain.svg"],
  ["Heavy rain", "heavyRain.svg"],
  ["Sleet shower (night)", "sleet.svg"],
  ["Sleet shower (day)", "sleet.svg"],
  ["Sleet", "sleet.svg"],
  ["Hail shower (night)", "hail.svg"],
  ["Hail shower (day)", "hail.svg"],
  ["Hail", "hail.svg"],
  ["Light snow shower (night)", "lightSnow.svg"],
  ["Light snow shower (day)", "lightSnow.svg"],
  ["Light snow", "lightSnow.svg"],
  ["Heavy snow shower (night)", "heavySnow.svg"],
  ["Heavy snow shower (day)", "heavySnow.svg"],
  ["Heavy snow", "heavySnow.svg"],
  ["Thunder shower (night)", "thunder.svg"],
  ["Thunder shower (day)", "thunder.svg"],
  ["Thunder", "thunder.svg"],
];

describe("weather svg component", () => {
  test.each(weatherTypes)(
    "returns svg relevant to the weather type passed in",
    (weatherType, svgFileName) => {
      render(<WeatherSVG weatherType={weatherType} />);

      // testing library render is not rendering the svg, as it doesn't have SVGR, but does render
      // the filename which is enough to show that the right svg is being selected.
      expect(screen.getByText(svgFileName)).toBeInTheDocument();
    }
  );

  test("returns no svg if weather type not found", () => {
    render(<WeatherSVG weatherType="notAWeatherType" />);

    expect(screen.queryByText("svg", { exact: false })).not.toBeInTheDocument();
  });
});
