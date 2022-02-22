import { appStrings } from "../../app.strings";

interface WindIndicatorProps {
  speed: string;
  gustSpeed: string;
  windDirection: string;
}

const compassDirectionMap: Array<{ direction: string; bearingAngle: number }> =
  [
    { direction: "N", bearingAngle: 0 },
    { direction: "NNE", bearingAngle: 22.5 },
    { direction: "NE", bearingAngle: 45 },
    { direction: "ENE", bearingAngle: 67.5 },
    { direction: "E", bearingAngle: 90 },
    { direction: "ESE", bearingAngle: 112.5 },
    { direction: "SE", bearingAngle: 135 },
    { direction: "SSE", bearingAngle: 157.5 },
    { direction: "S", bearingAngle: 180 },
    { direction: "SSW", bearingAngle: 202.5 },
    { direction: "SW", bearingAngle: 225 },
    { direction: "WSW", bearingAngle: 247.5 },
    { direction: "W", bearingAngle: 270 },
    { direction: "WNW", bearingAngle: 292.5 },
    { direction: "NW", bearingAngle: 315 },
    { direction: "NNW", bearingAngle: 337.5 },
  ];

const WindIndicator = function WindIndicator(props: WindIndicatorProps) {
  const { speed, gustSpeed, windDirection } = props;

  const transformDegrees =
    compassDirectionMap.find((d) => d.direction === windDirection)
      ?.bearingAngle ?? 0;

  return (
    <div className="component">
      <h3>{appStrings.windIndicator.title}</h3>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        style={{ fontSize: "20", float: "left" }}
      >
        <g id="compassRing">
          <circle
            r="49"
            cx="50"
            cy="50"
            strokeWidth={1}
            stroke="currentColor"
            fill="#0063B1"
          />
        </g>
        <g id="compassCross">
          <path
            d="M 50 20 L 55 45 L 80 50 L 55 55 L 50 80 L 45 55 L 20 50 L 45 45 Z"
            fill="#000000"
            stroke="#F7630C"
            strokeWidth={1}
          />
        </g>
        <g id="text">
          <text x="50" y="20" text-anchor="middle" fill="currentColor">
            N
          </text>
          <text x="88" y="57" text-anchor="middle" fill="currentColor">
            E
          </text>
          <text x="50" y="96" text-anchor="middle" fill="currentColor">
            S
          </text>
          <text x="12" y="57" text-anchor="middle" fill="currentColor">
            W
          </text>
        </g>
        <path
          id="compassPointer"
          d="M 49 50 L 50 10 L 51 50 Z"
          fill="#FF0000"
          stroke="#EE0000"
          strokeWidth={1}
          transform={`rotate(${transformDegrees} 50 50)`}
        />
        <text
          x="50"
          y="65"
          text-anchor="middle"
          fill="currentColor"
          style={{ fontSize: "40" }}
        >
          {speed}
        </text>
      </svg>
      <div
        style={{ float: "left", paddingTop: "70px" }}
      >{`${appStrings.windIndicator.gust}: ${gustSpeed} mph`}</div>
    </div>
  );
};

export default WindIndicator;
