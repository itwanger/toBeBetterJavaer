import React from "react";
import { Svg, Txt, lerp } from "./PixelStage";
import { pixelColors as C } from "./PixelWorld";
const names = ["low", "medium", "high", "xhigh", "max"];
const points = [
  [-65, 14],
  [-18, 14],
  [18, -20],
  [70, -20],
  [24, 49],
  [70, 49],
  [91, 12],
];
const routes = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [3, 6],
  [5, 6],
];
function StepTrace({ depth, f }: { depth: number; f: number }) {
  const n = Math.min(routes.length, Math.round(lerp(1, 7, depth / 4)));
  return (
    <g transform="translate(265 239) scale(1.45)">
      {routes.slice(0, n).map(([a, b], i) => {
        const [x, y] = points[a],
          [xx, yy] = points[b],
          t = ((f + i * 7) % 33) / 33;
        return (
          <g key={i}>
            <path
              d={`M${x} ${y}h${(xx - x) / 2}v${yy - y}h${(xx - x) / 2}`}
              stroke={C.mint}
              fill="none"
              strokeWidth="3"
            />
            <rect
              x={
                t < 0.5
                  ? lerp(x, (x + xx) / 2, t * 2)
                  : (x + xx) / 2 + ((xx - x) * Math.max(0, t - 0.72)) / 0.56
              }
              y={lerp(y, yy, Math.min(1, Math.max(0, (t - 0.5) / 0.22)))}
              width="5"
              height="5"
              fill={C.gold}
            />
            <rect x={x - 5} y={y - 5} width="10" height="10" fill={C.mint} />
            <rect x={xx - 5} y={yy - 5} width="10" height="10" fill={C.gold} />
          </g>
        );
      })}
    </g>
  );
}
export function EffortDesk({
  frame: f,
  strength,
  label,
}: {
  frame: number;
  strength: number;
  label?: string;
}) {
  const setting = Math.max(0, Math.min(4, strength));
  const level = Math.round(setting),
    angle = -62 + setting * 31;
  return (
    <Svg>
      <rect width="960" height="540" fill={C.cream} />
      <g shapeRendering="crispEdges">
        <path
          d="M43 124h16v-16h843v15h15v291h-15v17H56v-14H43z"
          fill="#bd9361"
        />
        <path
          d="M37 117h17v-17h840v16h17v284h-17v18H54v-17H37z"
          fill="#dba575"
          stroke={C.ink}
          strokeWidth="5"
        />
        <path d="M56 117h835v278H56z" fill="#f6dca4" />
        <path d="M58 118h830" stroke={C.paper} strokeWidth="7" />
        <path
          d="M82 145h396v192H82z"
          fill="#305553"
          stroke={C.ink}
          strokeWidth="5"
        />
        <path d="M92 155h376v172H92z" fill="#203e40" />
        {[109, 444].map((x) => (
          <path
            key={x}
            d={`M${x} 174h11m-11 132h11`}
            stroke="#50706d"
            strokeWidth="3"
          />
        ))}
        <Txt x={108} y={191} size={21} fill={C.mint}>
          当前步骤
        </Txt>
        <StepTrace f={f} depth={setting} />
        <path
          d="M503 236h45v-22h40"
          fill="none"
          stroke={C.teal}
          strokeWidth="5"
        />
        <path
          d="M498 254h61v-20h33"
          fill="none"
          stroke="#bd9e66"
          strokeWidth="3"
        />
        {[-60, -30, 0, 30, 60].map((a, i) => (
          <g key={a} transform={`translate(712 263) rotate(${a})`}>
            <path
              d="M-18-87l-4-24h44l-5 24z"
              fill={
                i <= level
                  ? [C.mint, "#a4dba5", C.gold, "#efb256", C.orange][i]
                  : "#ceb994"
              }
              stroke={C.ink}
              strokeWidth="3"
            />
          </g>
        ))}
        <Txt x={712} y={136} anchor="middle" size={21} fill={C.ink}>
          推理强度
        </Txt>
        <g transform="translate(712 265)">
          <path
            d="M-67-29l18-27h92l25 24v59l-22 22h-92l-21-22z"
            fill="#9a7050"
            stroke={C.ink}
            strokeWidth="4"
          />
          <path
            d="M-67-42l20-24h92l24 24v54L47 34h-94l-20-22z"
            fill={C.gold}
            stroke={C.ink}
            strokeWidth="4"
          />
          <g transform={`translate(0 -11) rotate(${angle})`}>
            <path d="M-4 7v-43h8V7z" fill={C.ink} />
          </g>
        </g>
        <Txt x={712} y={342} size={25} fill={C.ink} anchor="middle">
          {label ?? names[level]}
        </Txt>
        {names.map((name, i) => (
          <g key={name}>
            <rect
              x={84 + i * 159}
              y="361"
              width="147"
              height="21"
              fill={i <= level ? C.teal : "#cebd96"}
            />
            <path
              d={`M${90 + i * 159} 366h132`}
              stroke={i <= level ? C.mint : "#ded2b7"}
              strokeWidth="3"
            />
          </g>
        ))}
      </g>
    </Svg>
  );
}
