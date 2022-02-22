import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WeatherForecast from "./Components/WeatherForecast";

const App = function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <WeatherForecast />
        <TableWeatherForecast />
      </header>
    </div>
  );
};

export default App;
