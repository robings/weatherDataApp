import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import api from "./api/api";
import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WeatherForecast from "./Components/WeatherForecast";
import { WeatherForecastResponse } from "./Components/WeatherForecastResponse";
import { ReactComponent as Sun } from "./svg/sun.svg";

const App = function App() {
  const [weatherForecastData, setWeatherForecastData] =
    useState<WeatherForecastResponse | null>(null);

  const loadWeatherForecast = useCallback(async () => {
    const forecast = await api.getWeatherForecast();

    if (forecast) {
      setWeatherForecastData(forecast);
    }
  }, []);

  useEffect(() => {
    void loadWeatherForecast();
  }, [loadWeatherForecast]);

  return (
    <div className="App">
      <header>
        <Sun />
        <h1>Weather Forecast</h1>
        <button onClick={loadWeatherForecast}>Refresh</button>
      </header>
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
    </div>
  );
};

export default App;
