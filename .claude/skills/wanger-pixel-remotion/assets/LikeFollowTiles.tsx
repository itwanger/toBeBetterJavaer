import React from 'react';
import { grid, pixelColors as C } from './PixelWorld';

export type ButtonFrames = { like: number; follow: number; go: number };
const step = (f: number, at: number, n: number) => Math.min(1, Math.max(0, (f - at) / n));
const tileW = 218;
const gap = 22;

function Tile({ f, at, follow }: { f: number; at: number; follow?: boolean }) {
  if (f < at) return null;
  const age = f - at;
  const down = age >= 3 && age < 7 ? 5 : 0;
  const y = grid(16 * (1 - step(f, at, 3))) + down;
  const x = follow ? tileW + gap : 0;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="4" y="6" width={tileW} height="86" fill={C.muted} />
      <rect
        width={tileW}
        height="86"
        fill={age >= 3 && age < 8 ? C.gold : C.paper}
        stroke={C.ink}
        strokeWidth="5"
      />
      {follow ? (
        <path
          transform="translate(20 20)"
          d="M0 8h6V2h14v6h8V2h14v6h6v16h-6v8h-8v8h-8v6h-6v-6h-8v-8H6v-8H0Z"
          fill="#ed6453"
          stroke={C.ink}
          strokeWidth="3"
        />
      ) : (
        <g transform="translate(20 14)" stroke={C.ink} strokeWidth="3">
          <path d="M0 28h12v30H0Z" fill={C.orange} />
          <path d="M12 27h9l8-18V2h9l5 6v16h16v8h3v10h-4v12h-6v4H12Z" fill={C.gold} />
        </g>
      )}
      <text x="145" y="58" textAnchor="middle" fontSize="42" fontWeight="bold" fill={C.ink}>
        {follow ? '关注' : '点赞'}
      </text>
    </g>
  );
}

export function LikeFollowTiles({ f, frames: E, transform = "translate(1240 452) scale(1.30)" }: { f: number; frames: ButtonFrames; transform?: string }) {
  if (f < E.like || f >= E.go) return null;
  const moving = step(f, E.follow - 4, 4);
  const click = f >= E.follow ? E.follow : E.like;
  const pointerY = f >= click + 3 && f < click + 7 ? 58 : 65;
  return (
    <g transform={transform} opacity={1 - step(f, E.go - 4, 4)}>
      <Tile f={f} at={E.like} />
      <Tile f={f} at={E.follow} follow />
      {f < E.follow + 10 && (
        <g transform={`translate(${grid(138 + (tileW + gap) * moving)} ${pointerY})`}>
          <path
            d="M0 22V0h7v15h5V9h6v7h5v-4h6v6h5v18h-5v9H11v-6H7v-8L-4 20l4-4 7 6"
            fill={C.paper}
            stroke={C.ink}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </g>
      )}
    </g>
  );
}
