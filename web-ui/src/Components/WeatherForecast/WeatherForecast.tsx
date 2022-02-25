import React from "react";
import {
  DayData,
  ThreeHourlyForecast,
  WeatherForecastResponse,
} from "../../constants/WeatherForecastResponse";
import WindIndicator from "../WindIndicator/WindIndicator";
import TemperatureWidget from "../TemperatureWidget/TemperatureWidget";
import { Link } from "react-router-dom";
import WeatherSVG from "../WeatherSVG/WeatherSVG";
import { ReactComponent as VisibilitySVG } from "../../svg/visibility.svg";
import { ReactComponent as PrecipitationSVG } from "../../svg/precipitation.svg";
import { appStrings } from "../../constants/app.strings";

const getDate = (date: string): string => {
  const dateAsDate = new Date(date);
  return `${dateAsDate.toLocaleDateString()} ${dateAsDate.toLocaleTimeString()}`;
};

const cloudyRegex = new RegExp("cloudy");
const rainRegex = new RegExp("rain");
const nightRegex = new RegExp("night");

const ThreeHourlyForecastDisplay = function ThreeHourlyForecastDisplay(props: {
  forecast: ThreeHourlyForecast;
  today: boolean;
}) {
  const { forecast, today } = props;
  const { start, end, forecastElements } = forecast;

  const time = new Date().getHours();
  const startTime = new Date(`1970-01-01T${start}`).getHours();
  let endTime = new Date(`1970-01-01T${end}`).getHours();
  if (endTime === 0) {
    endTime = 24;
  }

  const useCompactComponents = !(today && time >= startTime && time < endTime);

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

  const weatherType =
    forecastElements.find((e) => e.type === "Weather Type")?.value ?? "";

  let bgColor =
    cloudyRegex.test(weatherType.toLocaleLowerCase()) ||
    rainRegex.test(weatherType.toLocaleLowerCase())
      ? "#767676"
      : "#0078D7";

  if (nightRegex.test(weatherType.toLocaleLowerCase())) {
    bgColor = "#111111";
  }

  const temperature =
    forecastElements.find((e) => e.type === "Temperature")?.value ??
    "Not found";
  const temperatureUnit =
    forecastElements.find((e) => e.type === "Temperature")?.units ?? "C";

  const feelsLikeTemperature =
    forecastElements.find((e) => e.type === "Feels Like Temperature")?.value ??
    "C";

  const visiblity =
    forecastElements.find((e) => e.type === "Visibility")?.value ?? "Unknown";

  const precipitationProbability = forecastElements.find(
    (e) => e.type === "Precipitation Probability"
  );

  const uvIndex =
    forecastElements.find((e) => e.type === "Max UV Index")?.value ??
    "Not found";

  return (
    <div
      className="forecast"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div>
        <h3 className="dataH3">{`${start} - ${end}: ${weatherType}`}</h3>
        <WeatherSVG weatherType={weatherType} />
      </div>
      <TemperatureWidget
        unit={temperatureUnit}
        temperature={temperature}
        feelsLikeTemperature={feelsLikeTemperature}
        compact={useCompactComponents}
      />
      <WindIndicator
        speed={windInformation.speed}
        gustSpeed={windInformation.gustSpeed}
        windDirection={windInformation.windDirection}
        compact={useCompactComponents}
      />
      <div className="otherInfo">
        <div>
          <VisibilitySVG style={{ width: "20px", height: "20px" }} />
          {visiblity}
        </div>
        <div>
          <PrecipitationSVG style={{ width: "32px", height: "32px" }} />
          {precipitationProbability?.value ?? "Not found"}
          {precipitationProbability?.units ?? ""}
        </div>
        <div>UV Index: {uvIndex}</div>
      </div>
    </div>
  );
};

const WeatherForecastDay = function WeatherForecastDay(props: {
  dayData: DayData;
}) {
  const { threeHourlyForecasts, date } = props.dayData;

  const dayDate = new Date(date);
  const todaysDate = new Date().setHours(0, 0, 0, 0);
  const today = dayDate.setHours(0, 0, 0, 0) === todaysDate;

  return (
    <>
      <h3>{dayDate.toLocaleDateString()}</h3>
      {threeHourlyForecasts.map((threeHourlyForecast, index) => {
        return (
          <React.Fragment key={`${threeHourlyForecast.start}-${index}`}>
            <ThreeHourlyForecastDisplay
              forecast={threeHourlyForecast}
              today={today}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

const WeatherForecast = function WeatherForecast(props: {
  weatherForecastData: WeatherForecastResponse | null;
}) {
  const { weatherForecastData } = props;

  return (
    <>
      {weatherForecastData && (
        <div>
          <Link to="/table">{appStrings.tableFormat}</Link>
          {weatherForecastData && (
            <>
              <h2>
                {`${weatherForecastData.location} ${getDate(
                  weatherForecastData.dateTimeOfForecast
                )}`}
              </h2>
              {weatherForecastData.dayData.map((day, index) => {
                return (
                  <div key={`${day.date}-${index}`}>
                    <WeatherForecastDay dayData={day} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default WeatherForecast;
