import { ReactComponent as Sun } from "../../svg/sun.svg";
import { ReactComponent as ClearNight } from "../../svg/clearNight.svg";
import { ReactComponent as PartlyCloudyNight } from "../../svg/partlyCloudyNight.svg";
import { ReactComponent as PartlyCloudyDay } from "../../svg/partlyCloudyDay.svg";
import { ReactComponent as Mist } from "../../svg/mist.svg";
import { ReactComponent as Fog } from "../../svg/fog.svg";
import { ReactComponent as Cloud } from "../../svg/cloud.svg";
import { ReactComponent as LightRain } from "../../svg/lightRain.svg";
import { ReactComponent as Drizzle } from "../../svg/drizzle.svg";
import { ReactComponent as HeavyRain } from "../../svg/heavyRain.svg";
import { ReactComponent as Sleet } from "../../svg/sleet.svg";
import { ReactComponent as Hail } from "../../svg/hail.svg";
import { ReactComponent as LightSnow } from "../../svg/lightSnow.svg";
import { ReactComponent as HeavySnow } from "../../svg/heavySnow.svg";
import { ReactComponent as Thunder } from "../../svg/thunder.svg";

const weatherTypes = [
  { id: "0", name: "Clear night", svg: <ClearNight /> },
  { id: "1", name: "Sunny day", svg: <Sun /> },
  {
    id: "2",
    name: "Partly cloudy (night)",
    svg: <PartlyCloudyNight />,
  },
  {
    id: "3",
    name: "Partly cloudy (day)",
    svg: <PartlyCloudyDay />,
  },
  { id: "5", name: "Mist", svg: <Mist /> },
  { id: "6", name: "Fog", svg: <Fog /> },
  { id: "7", name: "Cloudy", svg: <Cloud /> },
  { id: "8", name: "Overcast", svg: <Cloud /> },
  {
    id: "9",
    name: "Light rain shower (night)",
    svg: <LightRain />,
  },
  { id: "10", name: "Light rain shower (day)", svg: <LightRain /> },
  { id: "11", name: "Drizzle", svg: <Drizzle /> },
  { id: "12", name: "Light rain", svg: <LightRain /> },
  {
    id: "13",
    name: "Heavy rain shower (night)",
    svg: <HeavyRain />,
  },
  { id: "14", name: "Heavy rain shower (day)", svg: <HeavyRain /> },
  { id: "15", name: "Heavy rain", svg: <HeavyRain /> },
  { id: "16", name: "Sleet shower (night)", svg: <Sleet /> },
  { id: "17", name: "Sleet shower (day)", svg: <Sleet /> },
  { id: "18", name: "Sleet", svg: <Sleet /> },
  { id: "19", name: "Hail shower (night)", svg: <Hail /> },
  { id: "20", name: "Hail shower (day)", svg: <Hail /> },
  { id: "21", name: "Hail", svg: <Hail /> },
  {
    id: "22",
    name: "Light snow shower (night)",
    svg: <LightSnow />,
  },
  {
    id: "23",
    name: "Light snow shower (day)",
    svg: <LightSnow />,
  },
  { id: "24", name: "Light snow", svg: <LightSnow /> },
  {
    id: "25",
    name: "Heavy snow shower (night)",
    svg: <HeavySnow />,
  },
  {
    id: "26",
    name: "Heavy snow shower (day)",
    svg: <HeavySnow />,
  },
  { id: "27", name: "Heavy snow", svg: <HeavySnow /> },
  {
    id: "28",
    name: "Thunder shower (night)",
    svg: <Thunder />,
  },
  { id: "29", name: "Thunder shower (day)", svg: <Thunder /> },
  { id: "30", name: "Thunder", svg: <Thunder /> },
];

const determineWeatherSvg = (weatherType: string) => {
  const weatherTypeLC = weatherType.toLocaleLowerCase();
  const weatherSVG = weatherTypes.find(
    (wT) => wT.name.toLocaleLowerCase() === weatherTypeLC
  )?.svg;

  if (weatherSVG) {
    return weatherSVG;
  }
  return;
};

const WeatherSVG = function WeatherSVG(props: { weatherType: string }) {
  const { weatherType } = props;

  return <>{determineWeatherSvg(weatherType)}</>;
};

export default WeatherSVG;
