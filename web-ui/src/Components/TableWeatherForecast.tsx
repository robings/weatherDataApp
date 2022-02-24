import React, { useEffect, useState } from "react";
import {
  ForecastElement,
  ThreeHourlyForecast,
  WeatherForecastResponse,
} from "./WeatherForecastResponse";
import sampleResponseJson from "../sampleResponse.json";
import { Link } from "react-router-dom";

const getDate = (date: string): string => {
  const dateAsDate = new Date(date);
  return `${dateAsDate.toLocaleDateString()} ${dateAsDate.toLocaleTimeString()}`;
};

const ThreeHourlyForecastTable = function ThreeHourlyForecastTable(props: {
  forecastElements: Array<ForecastElement>;
}) {
  const { forecastElements } = props;

  return (
    <table>
      <thead>
        <tr>
          {forecastElements.map((element) => (
            <th key={`th-${element.type}`}>
              {element.type}
              <br />
              {element.units}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {forecastElements.map((element) => (
            <td key={`td-${element.type}`}>{element.value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const WeatherForecastDay = function WeatherForecastDay(props: {
  threeHourlyForecasts: Array<ThreeHourlyForecast>;
}) {
  const { threeHourlyForecasts } = props;

  return (
    <>
      {threeHourlyForecasts.map((threeHourlyForecast, index) => {
        return (
          <React.Fragment key={`${threeHourlyForecast.start}-${index}`}>
            <h3>{`${threeHourlyForecast.start} - ${threeHourlyForecast.end}`}</h3>
            <ThreeHourlyForecastTable
              forecastElements={threeHourlyForecast.forecastElements}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

const TableWeatherForecast = function TableWeatherForecast() {
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
      <Link to="/">&lt;&lt;&lt; Back to Graphical Format</Link>
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
                <h3>{new Date(day.date).toLocaleDateString()}</h3>
                <WeatherForecastDay
                  threeHourlyForecasts={day.threeHourlyForecasts}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default TableWeatherForecast;
