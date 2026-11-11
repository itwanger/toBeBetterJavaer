import React from "react";
import { Svg, Txt, move, lerp } from "./PixelStage";
import { pixelColors as C } from "./PixelWorld";
type Tier = { label: string; count: 1 | 2 | 3; at: number; tint: string };
export function RewardTickets({
  frame: f,
  title,
  ticket,
  tiers,
}: {
  frame: number;
  title: string;
  ticket: string;
  tiers: readonly [Tier, Tier?, Tier?];
}) {
  const rows = tiers.filter((tier): tier is Tier => Boolean(tier));
  const show = rows.map((tier) => move(f, tier.at, 18)),
    total = show.reduce((sum, weight) => sum + weight, 0);
  return (
    <Svg>
      <rect width="960" height="540" fill={C.cream} />
      <g transform="translate(480 82)">
        <rect x="-181" y="-22" width="362" height="46" fill={C.ink} />
        <Txt x={0} y={10} anchor="middle" size={25}>
          {title}
        </Txt>
      </g>
      {show.map((v, i) => {
        if (!v) return null;
        const w = (920 * v) / total,
          cx =
            20 +
            (920 * show.slice(0, i).reduce((a, b) => a + b, 0)) / total +
            w / 2;
        const tier = rows[i];
        return (
          <g key={i} opacity={v} transform={`translate(${cx} 0)`}>
            <path
              d={`M${-w / 2 + 5} 155h${Math.max(0, w - 10)}`}
              stroke="#c8a875"
              strokeWidth="4"
            />
            <rect x="-95" y="133" width="190" height="44" fill={C.cream} />
            <Txt x={0} y={165} anchor="middle" size={27} fill={C.ink}>
              {tier.label}
            </Txt>
            {Array.from({ length: tier.count }, (_, j) => {
              const a = move(f, tier.at + j * 6, 13);
              return (
                <g
                  key={j}
                  opacity={a}
                  transform={`translate(${lerp(-14, 0, a)} ${222 + j * 53 + (3 - tier.count) * 26 + (1 - a) * 16})`}
                >
                  <path
                    d="M-111 0h222v13h-6v12h6v26h-222V25h6V13h-6z"
                    fill="#b39471"
                    transform="translate(3 4)"
                  />
                  <path
                    d="M-111 0h222v13h-6v12h6v26h-222V25h6V13h-6z"
                    fill={tier.tint}
                    stroke={C.ink}
                    strokeWidth="3"
                  />
                  <path
                    d="M-88 31a10 10 0 1 1 13 2m-1-9 2 9-9 1"
                    fill="none"
                    stroke={C.ink}
                    strokeWidth="3"
                  />
                  <Txt x={-60} y={35} size={22} fill={C.ink}>
                    {ticket}
                  </Txt>
                  <path d="M56 4v42" stroke={C.ink} strokeDasharray="3 4" />
                  <Txt
                    x={78}
                    y={34}
                    size={20}
                    anchor="middle"
                    fill={C.ink}
                    code
                  >
                    0{j + 1}
                  </Txt>
                </g>
              );
            })}
          </g>
        );
      })}
    </Svg>
  );
}
