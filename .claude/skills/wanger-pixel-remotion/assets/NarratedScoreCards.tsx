import React from 'react';
import {Txt,move} from './PixelStage';
import {pixelColors as C} from './PixelWorld';
type Entry = { name: string; value: string; tint: string; at: number };
export function NarratedScoreCards({
  f,
  rows,
  y = 249,
  h = 150,
}: {
  f: number;
  rows: readonly Entry[];
  y?: number;
  h?: number;
}) {
  const weights = rows.map((r) => move(f, r.at, 13)),
    total = weights.reduce((a, b) => a + b, 0);
  if (total === 0) return null;
  return (
    <>
      {rows.map((r, i) => {
        const w = weights[i];
        if (!w) return null;
        const left =
          12 + (945 * weights.slice(0, i).reduce((a, b) => a + b, 0)) / total;
        const width = (945 * w) / total - 12;
        if (width < 10) return null;
        return (
          <svg
            key={r.name}
            x={left}
            y={y + (1 - w) * 22}
            width={width}
            height={h + 8}
            viewBox={`0 0 ${width} ${h + 8}`}
            overflow="hidden"
            opacity={w}
          >
            <path d={`M6 7h${width - 8}v${h - 3}H6z`} fill="#c6a47a" />
            <path
              d={`M2 2h${width - 19}l11 11v${h - 16}H2z`}
              fill={r.tint}
              stroke={C.ink}
              strokeWidth="4"
            />
            <Txt
              x={width / 2}
              y={46}
              size={27}
              code
              fill={C.ink}
              anchor="middle"
            >
              {r.name}
            </Txt>
            <Txt
              x={width / 2}
              y={h - 23}
              size={60}
              code
              fill={C.ink}
              anchor="middle"
            >
              {r.value}
            </Txt>
          </svg>
        );
      })}
    </>
  );
}
