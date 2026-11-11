import React from "react";
import { staticFile } from "remotion";
import { pixelColors } from "./PixelWorld";
import { Svg } from "./PixelStage";

type Rect = readonly [x: number, y: number, width: number, height: number];
type Cell = { source: Rect; destination: Rect };

// Crop and move the existing inked panels; source rectangles use viewBox units.
export function IllustrationFocus({
  file,
  sourceSize,
  cells,
  selected,
  progress,
}: {
  file: string;
  sourceSize: readonly [number, number];
  cells: readonly Cell[];
  selected: number;
  progress: number;
}) {
  const t = Math.max(0, Math.min(1, progress));
  return (
    <Svg>
      <rect width="960" height="540" fill={pixelColors.cream} />
      {cells.map(({ source, destination: [x, y, w, h] }, i) => {
        const active = i === selected;
        const lift = active ? 10 * Math.sin(Math.PI * t) : 0;
        const cx = x + w / 2,
          cy = y + h / 2;
        return (
          <g
            key={i}
            opacity={active ? 1 : 1 - 0.65 * t}
            transform={`translate(${cx} ${cy - lift}) scale(${active ? 1 + 0.085 * t : 1}) translate(${-cx} ${-cy})`}
          >
            <svg
              x={x}
              y={y}
              width={w}
              height={h}
              viewBox={source.join(" ")}
              overflow="hidden"
            >
              <svg
                x={source[0]}
                y={source[1]}
                width={source[2]}
                height={source[3]}
                viewBox={source.join(" ")}
                overflow="hidden"
              >
                <image
                  href={staticFile(file)}
                  width={sourceSize[0]}
                  height={sourceSize[1]}
                />
              </svg>
            </svg>
          </g>
        );
      })}
    </Svg>
  );
}
