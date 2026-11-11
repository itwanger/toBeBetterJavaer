import React from "react";
import { pixelColors as C } from "./PixelWorld";
import { Txt } from "./PixelStage";

type Tick = { position: number; label: string };
/** Supply ticks in travel order, with positions already mapped through the actual axis scale. */
export function AxisSweep({
  axis,
  origin,
  end,
  ticks,
  progress,
  labelWidth = 90,
}: {
  axis: "x" | "y";
  origin: readonly [number, number];
  end: number;
  ticks: readonly Tick[];
  progress: number;
  labelWidth?: number;
}) {
  const horizontal = axis === "x",
    start = horizontal ? origin[0] : origin[1];
  const t = Math.max(0, Math.min(1, progress)),
    pos = start + (end - start) * t;
  const px = horizontal ? pos : origin[0],
    py = horizontal ? origin[1] : pos;
  const sign = Math.sign(end - start);
  const active = ticks
    .filter(
      (v) => (v.position - start) * sign >= 0 && (pos - v.position) * sign >= 0,
    )
    .pop();
  const x =
    horizontal && active
      ? Math.max(
          Math.min(start, end),
          Math.min(
            Math.max(start, end) - labelWidth,
            active.position - labelWidth / 2,
          ),
        )
      : origin[0] + 19;
  const y = horizontal ? origin[1] - 55 : (active?.position ?? pos) - 16;
  return (
    <g>
      <path
        d={`M${origin[0]} ${origin[1]}L${px} ${py}`}
        fill="none"
        stroke={C.teal}
        strokeWidth="8"
      />
      <circle
        cx={px}
        cy={py}
        r="11"
        fill={C.gold}
        stroke={C.ink}
        strokeWidth="3"
      />
      {active && (
        <g transform={`translate(${x} ${y})`}>
          <rect width={labelWidth} height="38" fill={C.ink} />
          <Txt x={labelWidth / 2} y={27} size={23} code anchor="middle">
            {active.label}
          </Txt>
        </g>
      )}
    </g>
  );
}
