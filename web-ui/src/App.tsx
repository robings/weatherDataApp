import "./App.css";
import TableWeatherForecast from "./Components/TableWeatherForecast";

const App = function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Forecast</h1>
        <TableWeatherForecast />
      </header>
    </div>
  );
};

export default App;
