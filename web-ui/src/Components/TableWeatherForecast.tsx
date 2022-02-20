import { useEffect, useState } from "react";
import {
  ForecastElement,
  ThreeHourlyForecast,
  WeatherForecastResponse,
} from "./WeatherForecastResponse";

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
            <th>
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
            <td>{element.value}</td>
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
      {threeHourlyForecasts.map((threeHourlyForecast) => {
        return (
          <>
            <h3>{`${threeHourlyForecast.start} - ${threeHourlyForecast.end}`}</h3>
            <ThreeHourlyForecastTable
              forecastElements={threeHourlyForecast.forecastElements}
            />
          </>
        );
      })}
    </>
  );
};

const TableWeatherForecast = function TableWeatherForecast() {
  const [weatherForecastData, setWeatherForecastData] =
    useState<WeatherForecastResponse | null>(null);

  useEffect(() => {
    const getWeatherForecast = async () => {
      const forecastCall = await fetch(
        "https://localhost:5001/weatherforecast"
      );
      let forecast: WeatherForecastResponse | null = null;
      if (forecastCall.status === 200) {
        forecast = await forecastCall.json();
        if (forecast) {
          setWeatherForecastData(forecast);
        }
      }
    };
    void getWeatherForecast();
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
          {weatherForecastData.dayData.map((day) => {
            return (
              <div>
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
