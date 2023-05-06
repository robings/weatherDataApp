import { Link } from "react-router-dom";
import { WeatherForecastResponse } from "../../constants/WeatherForecastResponse";
import ForecastDay from "../ForecastDay/ForecastDay";
import { appStrings } from "../../constants/app.strings";

const getDate = (date: string): string => {
  const dateAsDate = new Date(date);
  return `${dateAsDate.toLocaleDateString()} ${dateAsDate.toLocaleTimeString()}`;
};

const Forecast = function Forecast(props: {
  weatherForecastData: WeatherForecastResponse | null;
}) {
  const { weatherForecastData } = props;

  return (
    <>
      {weatherForecastData && (
        <>
          <Link to="/table">{appStrings.tableFormat}</Link>
          <h2>
            {`${weatherForecastData.location} ${getDate(
              weatherForecastData.dateTimeOfForecast
            )}`}
          </h2>
          {weatherForecastData.dayData.map((day, index) => {
            return (
              <div key={`${day.date}-${index}`}>
                <ForecastDay dayData={day} first={index === 0} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Forecast;