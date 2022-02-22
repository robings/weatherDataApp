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

  const borderColor = determineTemperatureColour(temperature);

  return (
    <div className="temperatureWidget" style={{ borderColor: borderColor }}>
      <div>{`${temperature}°${unit}`}</div>
      <div className="smallText">{`(feels like ${feelsLikeTemperature}°${unit})`}</div>
    </div>
  );
};

export default TemperatureWidget;
