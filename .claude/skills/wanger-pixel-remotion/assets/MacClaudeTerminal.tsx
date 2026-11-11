import React from "react";
import { Svg, Txt } from "./PixelStage";
import { pixelColors as C } from "./PixelWorld";
const salm = "#f29d72";
function Clawd({ f }: { f: number }) {
  const blink = f % 93 > 88;
  return (
    <g transform="translate(46 101) scale(1.88)" shapeRendering="crispEdges">
      <path
        d="M4 2h25v6h4v8h-4v3h-2v5h-3v-5h-4v5h-3v-5h-5v5H9v-5H6v5H3v-8H0V9h4z"
        fill={salm}
      />
      <path
        d={blink ? "M10 10h3v1h-3zm12 0h3v1h-3z" : "M10 8h3v5h-3zm12 0h3v5h-3z"}
        fill={C.ink}
      />
    </g>
  );
}
export function TerminalPadlock({
  x,
  y,
  closed,
}: {
  x: number;
  y: number;
  closed: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`} shapeRendering="crispEdges">
      <path
        d={`M-11 0v-13h4v-4h15v4h4v${closed * 13}`}
        fill="none"
        stroke={C.gold}
        strokeWidth="4"
      />
      <path d="M-16 0h33v24h-33z" fill={C.gold} />
      <path d="M-2 7h5v10h-5z" fill={C.ink} />
    </g>
  );
}
function MacTitleBar() {
  return (
    <g>
      <rect
        x="14"
        y="50"
        width="932"
        height="416"
        rx="9"
        fill="#272731"
        stroke={C.ink}
        strokeWidth="3"
      />
      <path d="M15 82V59q0-8 8-8h913q8 0 8 8v23z" fill="#ebe6dc" />
      {["#ef776a", "#edbc58", "#77bb91"].map((fill, i) => (
        <circle key={fill} cx={35 + i * 19} cy={66} r="6" fill={fill} />
      ))}
      <Txt x={480} y={72} size={17} code fill="#544f51" anchor="middle">
        claude — zsh
      </Txt>
    </g>
  );
}
export function ModelPicker({
  position,
  confirmed,
  choices,
  defaultModel,
}: {
  position: number;
  confirmed: number;
  choices: readonly string[];
  defaultModel?: string;
}) {
  return (
    <g>
      <Txt x={45} y={202} code size={28} fill={salm}>
        ❯ /model
      </Txt>
      <rect
        x="45"
        y={221 + position * 47}
        width="5"
        height="37"
        fill={C.mint}
      />
      {choices.map((label, i) => {
        const active = Math.round(position) === i;
        return (
          <g key={label}>
            <Txt
              x={76}
              y={249 + 47 * i}
              size={25}
              code
              fill={active ? C.mint : "#c9c4c6"}
            >
              {label}
            </Txt>
            {i === 0 && defaultModel && (
              <Txt x={435} y={249} size={24} code fill={C.paper}>
                {defaultModel}
              </Txt>
            )}
            {i === confirmed && (
              <Txt
                x={
                  i === 0 && defaultModel
                    ? 455 + defaultModel.length * 15
                    : 88 + label.length * 15
                }
                y={249 + 47 * i}
                size={25}
                fill={C.mint}
              >
                ✓
              </Txt>
            )}
          </g>
        );
      })}
    </g>
  );
}
export function MacClaudeTerminal({
  frame: f,
  model,
  children,
}: {
  frame: number;
  model: string;
  children: React.ReactNode;
}) {
  return (
    <Svg>
      <rect width="960" height="540" fill={C.cream} />
      <MacTitleBar />
      <Clawd f={f} />
      <Txt x={125} y={136} size={31} code fill={salm}>
        Claude Code
      </Txt>
      <Txt x={909} y={136} size={25} code fill={C.mint} anchor="end">
        {model}
      </Txt>
      <path
        d="M44 159h868"
        stroke="#57545d"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      {children}
    </Svg>
  );
}
