import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WeatherForecast from "./Components/WeatherForecast";

const App = function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <Routes>
          <Route path="/" element={<WeatherForecast />} />
          <Route path="/table" element={<TableWeatherForecast />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
