import WeatherSVG from "../WeatherSVG/WeatherSVG";
import WindIndicator from "../WindIndicator/WindIndicator";
import { ReactComponent as PrecipitationSVG } from "../../svg/precipitation.svg";
import { useState } from "react";
import { ThreeHourlyForecast } from "../../constants/WeatherForecastResponse";

const ForecastTile = function ForecastTile(props: {
  compact: boolean;
  forecast: ThreeHourlyForecast;
}) {
  const { compact, forecast } = props;
  const { start, end, forecastElements } = forecast;
  const [compactValue, setCompactValue] = useState<boolean>(compact);

  const timeSpan = `${start} - ${end}`;
  const temperature =
    forecastElements.find((e) => e.type === "Temperature")?.value ??
    "Not found";
  const temperatureForDisplay = `${temperature}°`;

  const feelsLikeTemperature =
    forecastElements.find((e) => e.type === "Feels Like Temperature")?.value ??
    "Not found";
  const feelsLikeTemperatureForDisplay = `${feelsLikeTemperature}°`;

  const precipitationProbability = forecastElements.find(
    (e) => e.type === "Precipitation Probability"
  ) ?? { type: "Precipitation Probability", units: "%", value: "Not found" };
  const precipitationProbabilityForDisplay = `${
    precipitationProbability.value ?? "Not found"
  }${precipitationProbability.units ?? ""}`;

  const windInformation = {
    speed:
      forecastElements.find((e) => e.type === "Wind Speed")?.value ??
      "Not found",
    gustSpeed:
      forecastElements.find((e) => e.type === "Wind Gust")?.value ??
      "Not found",
    windDirection:
      forecastElements.find((e) => e.type === "Wind Direction")?.value ??
      "Not found",
  };

  const toggleSize = () => {
    const valueToSet = !compactValue;
    setCompactValue(valueToSet);
  };

  return (
    <>
      {compactValue && (
        <div className="newForecast" onClick={toggleSize}>
          <div className="quarters">
            <WeatherSVG weatherType="Partly cloudy (day)" />
          </div>
          <div className="quarters">
            <div className="tempContainer">
              <div className="temp">{temperatureForDisplay}</div>
            </div>
          </div>
          <div className="quarters">
            <div className="precipitation">
              <div className="precipitationPercentage">
                {precipitationProbabilityForDisplay}
              </div>
              <PrecipitationSVG style={{ width: "20px", height: "20px" }} />
            </div>
          </div>
          <div className="quarters">
            <div className="indicatorContainer">
              <WindIndicator
                speed={windInformation.speed}
                gustSpeed={windInformation.gustSpeed}
                windDirection={windInformation.windDirection}
                compact
              />
            </div>
            <div className="windNos">
              <div className="tempContainer">
                <div className="windSpeed">{windInformation.speed}</div>
              </div>
              <div className="tempContainer">
                <div className="gusts">{windInformation.gustSpeed}</div>
              </div>
            </div>
          </div>
          <div className="time">{timeSpan}</div>
        </div>
      )}
      {!compactValue && (
        <div className="newForecast big" onClick={toggleSize}>
          <WeatherSVG weatherType="Partly cloudy (day)" />
          <div className="bigTempContainer">
            <div className="tempContainer">
              <div className="temp">{temperatureForDisplay}</div>
            </div>
            <div className="tempContainer">
              <div className="feelsLike">{feelsLikeTemperatureForDisplay}</div>
            </div>
          </div>
          <div className="precipitation">
            <PrecipitationSVG />
            <div className="precipitationPercentage">
              {precipitationProbabilityForDisplay}
            </div>
          </div>
          <div className="indicatorContainer">
            <WindIndicator
              speed={windInformation.speed}
              gustSpeed={windInformation.gustSpeed}
              windDirection={windInformation.windDirection}
              compact={false}
            />
          </div>
          <div className="time">{timeSpan}</div>
        </div>
      )}
    </>
  );
};

export default ForecastTile;
