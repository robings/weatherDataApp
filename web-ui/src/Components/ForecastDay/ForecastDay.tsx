import React, { useState } from "react";
import { DayData } from "../../constants/WeatherForecastResponse";
import ForecastTile from "../ForecastTile/ForecastTile";

const ForecastDay = function ForecastDay(props: {
  dayData: DayData;
  first: boolean;
}) {
  const { first } = props;
  const { date, threeHourlyForecasts } = props.dayData;
  const [expanded, setExpanded] = useState<boolean>(first);
  const dayDate = new Date(date);
  const day = dayDate.toLocaleDateString("en-gb", { weekday: "long" });
  const expandMore = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 96 960 960"
      width="20"
    >
      <path
        d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"
        fill="currentColor"
      />
    </svg>
  );
  const expandLess = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 96 960 960"
      width="20"
    >
      <path
        d="m283 711-43-43 240-240 240 239-43 43-197-197-197 198Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="forecastDay">
      <h3>
        {`${day} ${dayDate.toLocaleDateString()}`}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? expandLess : expandMore}
        </button>
      </h3>
      {expanded &&
        threeHourlyForecasts.map((threeHourlyForecast, index) => {
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
