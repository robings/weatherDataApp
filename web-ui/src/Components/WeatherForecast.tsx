import React, { useEffect, useState } from "react";
import {
  DayData,
  ThreeHourlyForecast,
  WeatherForecastResponse,
} from "./WeatherForecastResponse";
import sampleResponseJson from "../sampleResponse.json";
import WindIndicator from "./WindIndicator/WindIndicator";
import TemperatureWidget from "./TemperatureWidget/temperatureWidget";
import { ReactComponent as Sun } from "../svg/sun.svg";
import { ReactComponent as Cloud } from "../svg/cloud.svg";
import { ReactComponent as LightRain } from "../svg/lightRain.svg";
import { ReactComponent as HeavyRain } from "../svg/heavyRain.svg";

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

  const cloudyRegex = new RegExp("cloudy");
  const rainRegex = new RegExp("rain");
  const nightRegex = new RegExp("night");
  const lightRainRegex = new RegExp("light rain");
  const heavyRainRegex = new RegExp("heavy rain");

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

  return (
    <div
      className="forecast"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div>
        <h3 className="dataH3">{`${start} - ${end}: ${weatherType}`}</h3>
        {weatherType === "Sunny day" && <Sun />}
        {cloudyRegex.test(weatherType.toLocaleLowerCase()) && <Cloud />}
        {lightRainRegex.test(weatherType.toLocaleLowerCase()) && <LightRain />}
        {heavyRainRegex.test(weatherType.toLocaleLowerCase()) && <HeavyRain />}
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

const WeatherForecast = function WeatherForecast() {
  const [weatherForecastData, setWeatherForecastData] =
    useState<WeatherForecastResponse | null>(null);

  useEffect(() => {
    // const getWeatherForecast = async () => {
    //   const forecastCall = await fetch(
    //     "https://localhost:5001/weatherforecast"
    //   );
    //   let forecast: WeatherForecastResponse | null = null;
    //   if (forecastCall.status === 200) {
    //     forecast = await forecastCall.json();
    //     if (forecast) {
    //       setWeatherForecastData(forecast);
    //     }
    //   }
    // };
    // void getWeatherForecast();
    setWeatherForecastData(sampleResponseJson);
  }, []);

  return (
    <div>
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
  );
};

export default WeatherForecast;
