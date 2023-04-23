import WeatherSVG from "../WeatherSVG/WeatherSVG";
import WindIndicator from "../WindIndicator/WindIndicator";
import { ReactComponent as PrecipitationSVG } from "../../svg/precipitation.svg";
import { useState } from "react";
import { ThreeHourlyForecast } from "../../constants/WeatherForecastResponse";
import { temperatureColours } from "../../constants/temperatureColours";

const determineTemperatureColour = (temperature: string): string => {
  const temperatureAsNumber: number = parseInt(temperature);

  if (temperatureAsNumber <= 0) {
    return temperatureColours.subZero;
  }

  if (temperatureAsNumber <= 10) {
    return temperatureColours.cold;
  }

  if (temperatureAsNumber <= 20) {
    return temperatureColours.warm;
  }

  if (temperatureAsNumber <= 30) {
    return temperatureColours.hot;
  }

  return temperatureColours.veryHot;
};

const ForecastTile = function ForecastTile(props: {
  compact: boolean;
  forecast: ThreeHourlyForecast;
}) {
  const { compact, forecast } = props;
  const { start, end, forecastElements } = forecast;
  const [compactValue, setCompactValue] = useState<boolean>(compact);

  const weatherType =
    forecastElements.find((e) => e.type === "Weather Type")?.value ?? "";

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
            <WeatherSVG weatherType={weatherType} />
          </div>
          <div className="quarters">
            <div className="tempContainer">
              <div
                className="temp"
                style={{ color: `${determineTemperatureColour(temperature)}` }}
              >
                {temperatureForDisplay}
              </div>
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
          <h4>{timeSpan}</h4>
        </div>
      )}
      {!compactValue && (
        <div className="newForecast big" onClick={toggleSize}>
          <div className="summaryContainer">
            <div className="summary">
              <WeatherSVG weatherType={weatherType} />
              <div className="summaryText">{weatherType}</div>
            </div>
            <div className="bigTempContainer">
              <div className="tempContainer">
                <div
                  className="temp"
                  style={{
                    color: `${determineTemperatureColour(temperature)}`,
                  }}
                >
                  {temperatureForDisplay}
                </div>
              </div>
              <div className="tempContainer">
                <div
                  className="feelsLike"
                  style={{
                    color: `${determineTemperatureColour(
                      feelsLikeTemperature
                    )}`,
                  }}
                >
                  {feelsLikeTemperatureForDisplay}
                </div>
              </div>
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
          <h4>{timeSpan}</h4>
        </div>
      )}
    </>
  );
};

export default ForecastTile;
