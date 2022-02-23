interface TemperatureWidgetProps {
  unit: string;
  temperature: string;
  feelsLikeTemperature: string;
  compact: boolean;
}

const determineTemperatureColour = (temperature: string): string => {
  const temperatureAsNumber: number = parseInt(temperature);

  if (temperatureAsNumber <= 0) {
    return "#00B7C3";
  }

  if (temperatureAsNumber <= 10) {
    return "#00CC6A";
  }

  if (temperatureAsNumber <= 20) {
    return "#FFB900";
  }

  if (temperatureAsNumber <= 30) {
    return "#F7630C";
  }

  return "#E81123";
};

const TemperatureWidget = function TemperatureWidget(
  props: TemperatureWidgetProps
) {
  const { unit, temperature, feelsLikeTemperature, compact } = props;

  const temperatureColour = determineTemperatureColour(temperature);
  const feelsLikeTemperatureColour =
    determineTemperatureColour(feelsLikeTemperature);

  return (
    <>
      {compact && (
        <div
          className="temperatureWidget"
          style={{ borderColor: temperatureColour }}
        >
          <div>{`${temperature}°${unit}`}</div>
          <div
            className="smallText"
            style={{ borderTop: `1px solid ${feelsLikeTemperatureColour}` }}
          >{`(feels like ${feelsLikeTemperature}°${unit})`}</div>
        </div>
      )}
      {!compact && (
        <div className="temperatureWidget" style={{ border: "none" }}>
          <div>{`${temperature}°${unit}`}</div>
          <div className="smallText">{`(feels like ${feelsLikeTemperature}°${unit})`}</div>
          <svg
            id="thermometer"
            width="215"
            height="30"
            viewBox="0 0 215 30"
            style={{ fontSize: "7" }}
          >
            <rect
              id="feelsLikeTempIndicator"
              x="5"
              y="10"
              height="3"
              width={(200 / 50) * parseInt(feelsLikeTemperature)}
              fill={feelsLikeTemperatureColour}
            />
            <rect
              id="tempIndicator"
              x="5"
              y="2"
              height="7"
              width={(200 / 50) * parseInt(temperature)}
              fill={temperatureColour}
            />
            <line
              x1="5"
              y1="14.5"
              x2="205"
              y2="14.5"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="5.5"
              y1="15"
              x2="5.5"
              y2="18"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="45.5"
              y1="15"
              x2="45.5"
              y2="18"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="85.5"
              y1="15"
              x2="85.5"
              y2="18"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="125.5"
              y1="15"
              x2="125.5"
              y2="18"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="165.5"
              y1="15"
              x2="165.5"
              y2="18"
              stroke="#000000"
              strokeWidth="1"
            />
            <line
              x1="204.5"
              y1="15"
              x2="204.5"
              y2="18"
              stroke="#000000"
              strokeWidth="1"
            />
            <text x="5" y="25" textAnchor="middle" fill="currentColor">
              0
            </text>
            <text x="45" y="25" textAnchor="middle" fill="currentColor">
              10
            </text>
            <text x="85" y="25" textAnchor="middle" fill="currentColor">
              20
            </text>
            <text x="125" y="25" textAnchor="middle" fill="currentColor">
              30
            </text>
            <text x="165" y="25" textAnchor="middle" fill="currentColor">
              40
            </text>
            <text x="205" y="25" textAnchor="middle" fill="currentColor">
              50
            </text>
          </svg>
        </div>
      )}
    </>
  );
};

export default TemperatureWidget;
