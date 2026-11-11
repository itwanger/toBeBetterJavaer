import React from "react";
import { pixelColors as C } from "./PixelWorld";
import { Txt, lerp, move } from "./PixelStage";

export type ScoreEntry = { name: string; score: number; color: string };
/** Place in a transparent SVG above a single, continuously mounted recording. */
export function LiveScoreOverlay({
  frame: f,
  rows,
  compare,
  timing,
  title,
  subtitle,
  subtitleX = 211,
  unit = "%",
  maxValue = 100,
}: {
  frame: number;
  rows: readonly ScoreEntry[];
  compare: readonly [number, number];
  timing: { show: number; focus: number; second: number; ratio: number };
  title: string;
  subtitle: string;
  subtitleX?: number;
  unit?: string;
  maxValue?: number;
}) {
  const show = move(f, timing.show - 5, 12),
    focus = move(f, timing.focus - 5, 16);
  const second = move(f, timing.second - 5, 12),
    ratio = move(f, timing.ratio - 8, 10);
  const panelWidth = lerp(933, 553, focus),
    height = lerp(127, 104 + 49 * second, focus),
    panelY = 465 - height;
  return (
    <>
      {" "}
      {show > 0 && (
        <g
          opacity={show}
          transform={`translate(12 ${panelY + (1 - show) * 26})`}
        >
          <rect
            width={panelWidth}
            height={height}
            fill={C.ink}
            fillOpacity=".93"
          />
          <rect width="6" height={height} fill={C.gold} />
          <Txt x={19} y={31} code size={25} fill={C.gold}>
            {title}
          </Txt>
          <Txt x={subtitleX} y={31} size={22}>
            {subtitle}
          </Txt>
          {focus < 1 && (
            <g opacity={1 - move(f, timing.focus - 5, 6)}>
              {rows.map((r, i) => (
                <g
                  key={r.name}
                  transform={`translate(${23 + i * (916 / rows.length)} 0)`}
                >
                  <Txt x={0} y={70} size={22} code>
                    {r.name}
                  </Txt>
                  <Txt x={0} y={113} size={36} code fill={r.color}>
                    {r.score}
                    {unit}
                  </Txt>
                </g>
              ))}
            </g>
          )}
          {focus > 0 && (
            <g opacity={focus}>
              {[rows[compare[0]], rows[compare[1]]].map((r, i) => {
                const entry = i ? second : move(f, timing.focus - 5, 20);
                if (!entry) return null;
                const y = 64 + i * 48;
                return (
                  <g key={r.name} opacity={entry}>
                    <Txt x={20} y={y + 17} size={22} code>
                      {r.name}
                    </Txt>
                    <rect
                      x="182"
                      y={y}
                      width="235"
                      height="17"
                      fill="#51515f"
                    />
                    <rect
                      x="182"
                      y={y}
                      width={((235 * r.score) / maxValue) * entry}
                      height="17"
                      fill={r.color}
                    />
                    <Txt
                      x={532}
                      y={y + 21}
                      size={29}
                      code
                      anchor="end"
                      fill={r.color}
                    >
                      {r.score}
                      {unit}
                    </Txt>
                  </g>
                );
              })}
              {ratio > 0 && rows[compare[1]].score > 0 && (
                <g opacity={ratio}>
                  <rect x="420" y="7" width="113" height="32" fill={C.mint} />
                  <Txt
                    x={477}
                    y={31}
                    size={24}
                    code
                    anchor="middle"
                    fill={C.ink}
                  >
                    {(rows[compare[0]].score / rows[compare[1]].score).toFixed(
                      2,
                    )}
                    ×
                  </Txt>
                </g>
              )}
            </g>
          )}
        </g>
      )}
    </>
  );
}
