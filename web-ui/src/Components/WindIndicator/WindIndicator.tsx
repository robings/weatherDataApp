import { appStrings } from "../../app.strings";

interface WindIndicatorProps {
  speed: string;
  gustSpeed: string;
  windDirection: string;
  compact: boolean;
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
  const { speed, gustSpeed, windDirection, compact } = props;

  const transformDegrees =
    compassDirectionMap.find((d) => d.direction === windDirection)
      ?.bearingAngle ?? 0;

  return (
    <div className="component">
      <svg
        id="compass"
        width={compact ? "50" : "100"}
        height={compact ? "50" : "100"}
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
        <g id="compassCrossLayerOne" transform="rotate(45 50 50)">
          <path
            d="M 50 25 L 55 45 L 75 50 L 55 55 L 50 75 L 45 55 L 25 50 L 45 45 Z"
            fill="#BDC3C7"
            stroke="#95A5A6"
            strokeWidth={1}
          />
          <line
            x1="50"
            y1="25"
            x2="50"
            y2="75"
            stroke="#95A5A6"
            strokeWidth={1}
          />
          <line
            x1="25"
            y1="50"
            x2="75"
            y2="50"
            stroke="#95A5A6"
            strokeWidth={1}
          />
        </g>
        <g id="compassCross">
          <path
            d="M 50 20 L 55 45 L 80 50 L 55 55 L 50 80 L 45 55 L 20 50 L 45 45 Z"
            fill="#BDC3C7"
            stroke="#F7630C"
            strokeWidth={1}
          />
          <line
            x1="50"
            y1="21"
            x2="50"
            y2="79"
            stroke="#95A5A6"
            strokeWidth={1}
          />
          <line
            x1="21"
            y1="50"
            x2="79"
            y2="50"
            stroke="#95A5A6"
            strokeWidth={1}
          />
        </g>
        <g id="text">
          <text x="50" y="20" textAnchor="middle" fill="currentColor">
            N
          </text>
          <text x="88" y="57" textAnchor="middle" fill="currentColor">
            E
          </text>
          <text x="50" y="96" textAnchor="middle" fill="currentColor">
            S
          </text>
          <text x="12" y="57" textAnchor="middle" fill="currentColor">
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
      </svg>
      <div
        className="windSpeeds"
        style={{
          marginTop: compact ? "0" : "30px",
        }}
      >
        <div>{`${speed} mph`}</div>
        <div>{`${appStrings.windIndicator.gust}: ${gustSpeed} mph`}</div>
      </div>
    </div>
  );
};

export default WindIndicator;
