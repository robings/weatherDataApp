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
import { appStrings } from "../../constants/app.strings";
import { forecastBgColours } from "../../constants/forecastBgColours";
import OtherInfoWidget from "../OtherInfoWidget/OtherInfoWidget";

const getDate = (date: string): string => {
  const dateAsDate = new Date(date);
  return `${dateAsDate.toLocaleDateString()} ${dateAsDate.toLocaleTimeString()}`;
};

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

  const bgColorDefinition: string[] =
    forecastBgColours.find((f) => f[0] === weatherType) || [];
  const bgColor: string =
    bgColorDefinition.length > 0 ? bgColorDefinition[1] : "transparent";

  const temperature =
    forecastElements.find((e) => e.type === "Temperature")?.value ??
    "Not found";
  const temperatureUnit =
    forecastElements.find((e) => e.type === "Temperature")?.units ?? "C";

  const feelsLikeTemperature =
    forecastElements.find((e) => e.type === "Feels Like Temperature")?.value ??
    "C";

  const visibility =
    forecastElements.find((e) => e.type === "Visibility")?.value ?? "Not found";

  const precipitationProbability = forecastElements.find(
    (e) => e.type === "Precipitation Probability"
  ) ?? { type: "Precipitation Probability", units: "%", value: "Not found" };

  const humidity = forecastElements.find(
    (e) => e.type === "Screen Relative Humidity"
  ) ?? { type: "Screen Relative Humidity", units: "%", value: "Not found" };

  const UVIndex =
    forecastElements.find((e) => e.type === "Max UV Index")?.value ??
    "Not found";

  return (
    <div
      className="forecast"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className={useCompactComponents ? "" : "nonCompact"}>
        <h3
          className="dataH3"
          style={useCompactComponents ? {} : { fontSize: "1.5em" }}
        >{`${start} - ${end}: ${weatherType}`}</h3>
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
      <OtherInfoWidget
        visibility={visibility}
        precipitationProbability={precipitationProbability}
        UVIndex={UVIndex}
        humidity={humidity}
      />
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
