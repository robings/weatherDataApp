import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import api from "./api/api";
import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WeatherForecast from "./Components/WeatherForecast/WeatherForecast";
import { WeatherForecastResponse } from "./constants/WeatherForecastResponse";
import { appStrings } from "./constants/app.strings";
import { ReactComponent as Sun } from "./svg/sun.svg";

const App = function App() {
  const [weatherForecastData, setWeatherForecastData] =
    useState<WeatherForecastResponse | null>(null);

  const [error, setError] = useState<string>("");

  const loadWeatherForecast = useCallback(async () => {
    setError("");
    let forecast;

    try {
      forecast = await api.getWeatherForecast();
      setWeatherForecastData(forecast);
    } catch (e: unknown) {
      setError((e as Error).message);
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
        <button onClick={loadWeatherForecast}>{appStrings.refresh}</button>
      </header>
      {error && (
        <div className="error">
          {error} {appStrings.previousData}
        </div>
      )}
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
      <div>
        Contains public sector information licensed under the Open Government
        Licence
      </div>
    </div>
  );
};

export default App;
