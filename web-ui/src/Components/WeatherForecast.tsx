import React, { useEffect, useState } from "react";
import {
  DayData,
  ThreeHourlyForecast,
  WeatherForecastResponse,
} from "./WeatherForecastResponse";
import sampleResponseJson from "../sampleResponse.json";
import WindIndicator from "./WindIndicator/WindIndicator";

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
  const endTime = new Date(`1970-01-01T${end}`).getHours();

  const windInformation = {
    speed:
      forecastElements.find((e) => e.type === "Wind Speed")?.value ??
      "Not available",
    gustSpeed:
      forecastElements.find((e) => e.type === "Wind Gust")?.value ??
      "Not available",
    windDirection:
      forecastElements.find((e) => e.type === "Wind Direction")?.value ??
      "Not available",
  };

  return (
    <>
      <h3>{`${start} - ${end}`}</h3>
      <WindIndicator
        speed={windInformation.speed}
        gustSpeed={windInformation.gustSpeed}
        windDirection={windInformation.windDirection}
        compact={
          !(today && time >= startTime && time <= endTime && time === startTime)
        }
      />
    </>
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
