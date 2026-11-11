import React from "react";
import { Svg, Txt, move, lerp } from "./PixelStage";
import { pixelColors as C } from "./PixelWorld";
type Lane = {
  name: string;
  mode?: string;
  speed: number;
  speedLabel: string;
  cost: string;
};
type Props = {
  frame: number;
  prompt: string;
  output: readonly string[];
  lanes: readonly [Lane, Lane];
  costUnit: string;
  outputAt: number;
  billAt: number;
  baselineFrames: number;
  promptFrames?: number;
  windowTitle?: string;
};
/** Chapter-local clock relative to entry. Both panes stream exactly the same output. */
export function TerminalRace({
  frame: f,
  prompt,
  output,
  lanes,
  costUnit,
  outputAt,
  billAt,
  baselineFrames,
  promptFrames = 17,
  windowTitle = "Claude Code — zsh",
}: Props) {
  const shell = "#272731",
    salmon = "#f29d72";
  const time = f,
    bill = move(f, billAt - 5, 12),
    length = output.join("").length;
  const progress = (speed: number) =>
    Math.max(
      0,
      Math.min(1, ((f - outputAt) * speed) / Math.max(1, baselineFrames)),
    );
  return (
    <Svg>
      <rect width="960" height="540" fill={C.cream} />
      <rect
        x="12"
        y="53"
        width="934"
        height="412"
        rx="6"
        fill={shell}
        stroke={C.ink}
        strokeWidth="3"
      />
      <path d="M14 83V60q0-5 5-5h921q4 0 4 5v23z" fill="#ebe6dc" />
      {["#e97965", "#edb94e", "#70b590"].map((color, i) => (
        <circle key={color} cx={31 + 17 * i} cy="69" r="5" fill={color} />
      ))}
      <Txt x={480} y={75} size={18} anchor="middle" code fill="#47444b">
        {windowTitle}
      </Txt>
      <path d="M480 92v362" stroke="#65616a" strokeWidth="2" />
      {lanes.map((lane, i) => {
        const x = 32 + i * 467,
          pct = progress(lane.speed);
        const count = Math.floor(length * pct),
          model = lane.name,
          tint = i ? C.mint : salmon;
        const multiplier = lane.speedLabel;
        let consumed = 0;
        return (
          <g key={i}>
            <rect x={x} y="98" width="9" height="38" fill={tint} />
            <Txt x={x + 20} y={128} size={31} code fill={tint}>
              {model}
            </Txt>
            {lane.mode && (
              <Txt
                x={x + 423}
                y={127}
                size={23}
                code
                anchor="end"
                fill={i ? C.gold : C.paper}
              >
                {lane.mode}
              </Txt>
            )}
            <path d={`M${x} 149h424`} stroke="#55515b" strokeWidth="2" />
            <Txt x={x} y={188} size={24} fill={salmon}>
              ❯
            </Txt>
            <Txt x={x + 26} y={188} size={25}>
              {prompt.slice(
                0,
                Math.max(
                  1,
                  Math.ceil(prompt.length * move(time, 0, promptFrames)),
                ),
              )}
            </Txt>
            {output.map((line, j) => {
              const n = Math.max(0, Math.min(line.length, count - consumed));
              const cursor =
                count >= consumed && count < consumed + line.length;
              consumed += line.length;
              return (
                <text
                  key={j}
                  x={x + 14}
                  y={230 + j * 28}
                  xmlSpace="preserve"
                  fontFamily="Menlo,monospace"
                  fontSize="23"
                  fill={j === 0 ? C.mint : C.paper}
                >
                  {line.slice(0, n)}
                  {cursor && f % 18 < 13 ? "▍" : ""}
                </text>
              );
            })}
            <g transform={`translate(0 ${(1 - bill) * 43})`}>
              <rect x={x} y="333" width="422" height="7" fill="#514e58" />
              <rect x={x} y="333" width={422 * pct} height="7" fill={tint} />
              <Txt x={x} y={378} size={26} fill={tint}>
                {pct === 1 ? "✓ 已完成" : "生成中"}
              </Txt>
              <Txt x={x + 422} y={378} size={25} anchor="end" fill={C.paper}>
                {multiplier}
              </Txt>
            </g>
            {bill > 0 && (
              <g opacity={bill} transform={`translate(0 ${(1 - bill) * 13})`}>
                <rect
                  x={x - 8}
                  y="398"
                  width="438"
                  height="50"
                  fill={i ? C.mint : "#efe2c8"}
                />
                <Txt x={x + 3} y={431} size={21} fill={C.ink}>
                  {costUnit}
                </Txt>
                <Txt
                  x={x + 419}
                  y={432}
                  size={31}
                  anchor="end"
                  code
                  fill={C.ink}
                >
                  {lane.cost}
                </Txt>
              </g>
            )}
          </g>
        );
      })}
    </Svg>
  );
}
