interface ThermometerProps {
  temperature: string;
  feelsLikeTemperature: string;
  temperatureColour: string;
  feelsLikeTemperatureColour: string;
}

const Thermometer = function Thermometer(props: ThermometerProps) {
  const {
    temperature,
    feelsLikeTemperature,
    temperatureColour,
    feelsLikeTemperatureColour,
  } = props;

  const temperatureAsNumber = parseInt(temperature, 10);
  const feelsLikeTemperatureAsNumber = parseInt(feelsLikeTemperature, 10);

  const temperatureXPos =
    temperatureAsNumber < 0 ? 125 - temperatureAsNumber * (200 / 50) * -1 : 125;
  const feelsLikeTemperatureXPos =
    feelsLikeTemperatureAsNumber < 0
      ? 125 - feelsLikeTemperatureAsNumber * (200 / 50) * -1
      : 125;
  const temperatureWidth =
    temperatureAsNumber < 0
      ? (200 / 50) * temperatureAsNumber * -1
      : (200 / 50) * temperatureAsNumber;
  const feelsLikeTemperatureWidth =
    feelsLikeTemperatureAsNumber < 0
      ? (200 / 50) * feelsLikeTemperatureAsNumber * -1
      : (200 / 50) * feelsLikeTemperatureAsNumber;

  return (
    <svg
      id="thermometer"
      width="330"
      height="30"
      viewBox="0 0 330 30"
      style={{ fontSize: "7" }}
    >
      <rect
        id="feelsLikeTempIndicator"
        x={feelsLikeTemperatureXPos}
        y="10"
        height="3"
        width={feelsLikeTemperatureWidth}
        fill={feelsLikeTemperatureColour}
      />
      <rect
        id="tempIndicator"
        x={temperatureXPos}
        y="2"
        height="7"
        width={temperatureWidth}
        fill={temperatureColour}
      />
      <line
        x1="5"
        y1="14.5"
        x2="325"
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
        y1="2"
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
        x1="205.5"
        y1="15"
        x2="205.5"
        y2="18"
        stroke="#000000"
        strokeWidth="1"
      />
      <line
        x1="245.5"
        y1="15"
        x2="245.5"
        y2="18"
        stroke="#000000"
        strokeWidth="1"
      />
      <line
        x1="285.5"
        y1="15"
        x2="285.5"
        y2="18"
        stroke="#000000"
        strokeWidth="1"
      />
      <line
        x1="324.5"
        y1="15"
        x2="324.5"
        y2="18"
        stroke="#000000"
        strokeWidth="1"
      />
      <text x="5" y="25" textAnchor="middle" fill="currentColor">
        -30
      </text>
      <text x="45" y="25" textAnchor="middle" fill="currentColor">
        -20
      </text>
      <text x="85" y="25" textAnchor="middle" fill="currentColor">
        -10
      </text>
      <text x="125" y="25" textAnchor="middle" fill="currentColor">
        0
      </text>
      <text x="165" y="25" textAnchor="middle" fill="currentColor">
        10
      </text>
      <text x="205" y="25" textAnchor="middle" fill="currentColor">
        20
      </text>
      <text x="245" y="25" textAnchor="middle" fill="currentColor">
        30
      </text>
      <text x="285" y="25" textAnchor="middle" fill="currentColor">
        40
      </text>
      <text x="325" y="25" textAnchor="middle" fill="currentColor">
        50
      </text>
    </svg>
  );
};

export default Thermometer;
