import { ForecastElement } from "../../constants/WeatherForecastResponse";
import { ReactComponent as VisibilitySVG } from "../../svg/visibility.svg";
import { ReactComponent as PrecipitationSVG } from "../../svg/precipitation.svg";

interface OtherInfoWidgetProps {
  visibility: string;
  precipitationProbability: ForecastElement;
  UVIndex: string;
  humidity: ForecastElement;
}

const OtherInfoWidget = function OtherInfoWidget(props: OtherInfoWidgetProps) {
  const { visibility, precipitationProbability, UVIndex, humidity } = props;

  return (
    <div className="otherInfo">
      <div>
        <VisibilitySVG
          style={{
            width: "20px",
            height: "20px",
            margin: "0",
          }}
        />
        {visibility}
      </div>
      <div>
        <PrecipitationSVG style={{ width: "20px", height: "20px" }} />
        {precipitationProbability.value ?? "Not found"}
        {precipitationProbability.units ?? ""}
      </div>
      <div>Max UV Index: {UVIndex}</div>
      <div>
        {"Humidity: "}
        {humidity.value ?? "Not found"}
        {humidity.units ?? ""}
      </div>
    </div>
  );
};

export default OtherInfoWidget;
