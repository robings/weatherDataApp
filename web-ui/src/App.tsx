import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";
import WindIndicator from "./Components/WindIndicator/WindIndicator";

const App = function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <WindIndicator speed="16" gustSpeed="25" windDirection="NW" />
        <TableWeatherForecast />
      </header>
    </div>
  );
};

export default App;
