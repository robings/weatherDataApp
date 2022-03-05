import { temperatureColours } from "../../constants/temperatureColours";
import Thermometer from "./Thermometer";

interface TemperatureWidgetProps {
  unit: string;
  temperature: string;
  feelsLikeTemperature: string;
  compact: boolean;
}

const determineTemperatureColour = (temperature: string): string => {
  const temperatureAsNumber: number = parseInt(temperature);

  if (temperatureAsNumber <= 0) {
    return temperatureColours.subZero;
  }

  if (temperatureAsNumber <= 10) {
    return temperatureColours.cold;
  }

  if (temperatureAsNumber <= 20) {
    return temperatureColours.warm;
  }

  if (temperatureAsNumber <= 30) {
    return temperatureColours.hot;
  }

  return temperatureColours.veryHot;
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
          <Thermometer
            temperature={temperature}
            feelsLikeTemperature={feelsLikeTemperature}
            temperatureColour={temperatureColour}
            feelsLikeTemperatureColour={feelsLikeTemperatureColour}
          />
        </div>
      )}
    </>
  );
};

export default TemperatureWidget;
