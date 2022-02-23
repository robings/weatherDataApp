import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WeatherForecast from "./Components/WeatherForecast";
import { ReactComponent as Sun } from "./svg/sun.svg";

const App = function App() {
  return (
    <div className="App">
      <header>
        <Sun />
        <h1>Weather Forecast</h1>
      </header>
      <Routes>
        <Route path="/" element={<WeatherForecast />} />
        <Route path="/table" element={<TableWeatherForecast />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
