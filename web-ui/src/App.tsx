import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import api from "./api/api";
import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WeatherForecast from "./Components/WeatherForecast/WeatherForecast";
import {
  WeatherForecastResponse,
  ThreeHourlyForecast,
} from "./constants/WeatherForecastResponse";
import { appStrings } from "./constants/app.strings";
import { ReactComponent as Sun } from "./svg/sun.svg";
import SiteSelector from "./Components/SiteSelector/SiteSelector";
import ForecastTile from "./Components/ForecastTile/ForecastTile";

const App = function App() {
  const [weatherForecastData, setWeatherForecastData] =
    useState<WeatherForecastResponse | null>(null);

  const [locationId, setLocationId] = useState<string>("");
  const [temp3hrForecast, setTemp3hrForecast] = useState<ThreeHourlyForecast>({
    start: "06:00",
    end: "09:00",
    forecastElements: [
      { type: "Wind Direction", units: "compass", value: "WSW" },
      { type: "Feels Like Temperature", units: "C", value: "3" },
      { type: "Wind Gust", units: "mph", value: "29" },
      { type: "Screen Relative Humidity", units: "%", value: "90" },
      {
        type: "Precipitation Probability",
        units: "%",
        value: "90",
      },
      { type: "Wind Speed", units: "mph", value: "11" },
      { type: "Temperature", units: "C", value: "6" },
      { type: "Visibility", units: "", value: "Moderate 4-10 km" },
      { type: "Weather Type", units: "", value: "Heavy rain" },
      { type: "Max UV Index", units: "", value: "0" },
    ],
  });

  const [error, setError] = useState<string>("");

  const loadWeatherForecast = useCallback(async () => {
    setError("");
    let forecast;

    try {
      forecast = await api.getWeatherForecast(locationId);
      setWeatherForecastData(forecast);
      setTemp3hrForecast(forecast.dayData[0].threeHourlyForecasts[0]);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }, [locationId]);

  useEffect(() => {
    void loadWeatherForecast();
  }, [loadWeatherForecast]);

  return (
    <div className="App">
      <header>
        <Sun />
        <h1>Weather Forecast</h1>
        {/* <button onClick={loadWeatherForecast}>{appStrings.refresh}</button> */}
      </header>
      {error && (
        <div className="error">
          {error} {appStrings.previousData}
        </div>
      )}
      <SiteSelector
        setLocationId={setLocationId}
        loadWeatherForecast={loadWeatherForecast}
      />
      <ForecastTile compact forecast={temp3hrForecast} />
      <ForecastTile compact forecast={temp3hrForecast} />
      <Routes>
        <Route
          path="/"
          element={
            <WeatherForecast weatherForecastData={weatherForecastData} />
          }
        />
        <Route
          path="/table"
          element={
            <TableWeatherForecast weatherForecastData={weatherForecastData} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div className="contains">
        Contains public sector information licensed under the Open Government
        Licence
      </div>
    </div>
  );
};

export default App;
