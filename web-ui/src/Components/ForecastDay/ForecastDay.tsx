import React from "react";
import { DayData } from "../../constants/WeatherForecastResponse";
import ForecastTile from "../ForecastTile/ForecastTile";

const ForecastDay = function ForecastDay(props: { dayData: DayData }) {
  const { date, threeHourlyForecasts } = props.dayData;
  const dayDate = new Date(date);

  return (
    <div className="forecastDay">
      <h3>{dayDate.toLocaleDateString()}</h3>
      {threeHourlyForecasts.map((threeHourlyForecast, index) => {
        return (
          <React.Fragment key={`${threeHourlyForecast.start}-${index}`}>
            <ForecastTile forecast={threeHourlyForecast} compact />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ForecastDay;
