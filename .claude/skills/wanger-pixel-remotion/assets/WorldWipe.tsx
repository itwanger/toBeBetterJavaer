import React from 'react';
import { pixelColors as C } from './PixelWorld';

export function WorldWipe({ f, change }: { f: number; change: number }) {
  const id = React.useId();
  const distance = Math.abs(f - change);
  if (distance >= 9) return null;
  const t = 1 - distance / 9;
  const size = 72;
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <defs>
        {Array.from({ length: 12 }, (_, i) => {
          const wave = (f <= change ? i : 11 - i) / 38;
          const radius = size * Math.max(0, Math.min(1, (t - wave) / (1 - wave)));
          return (
            <pattern
              key={i}
              id={`${id}-diamond-${i}`}
              width={size}
              height={size}
              patternUnits="userSpaceOnUse"
            >
              {[
                [0, 0],
                [size, 0],
                [0, size],
                [size, size],
                [size / 2, size / 2],
              ].map(([x, y]) => (
                <path
                  key={x + '-' + y}
                  d={`M${x} ${y - radius / 2}l${radius / 2} ${radius / 2} -${radius / 2} ${radius / 2} -${radius / 2} -${radius / 2}Z`}
                  fill={C.navy}
                />
              ))}
            </pattern>
          );
        })}
      </defs>
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={160 * i} width="160" height="1080" fill={`url(#${id}-diamond-${i})`} />
      ))}
    </svg>
  );
}
