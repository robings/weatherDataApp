import React from "react";
import {
  ForecastElement,
  ThreeHourlyForecast,
  WeatherForecastResponse,
} from "../constants/WeatherForecastResponse";
import { Link } from "react-router-dom";
import { appStrings } from "../constants/app.strings";

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

const TableWeatherForecast = function TableWeatherForecast(props: {
  weatherForecastData: WeatherForecastResponse | null;
}) {
  const { weatherForecastData } = props;

  return (
    <div>
      <Link to="/">{appStrings.graphicalFormat}</Link>
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
