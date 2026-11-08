import React from 'react';
import { Img, staticFile } from 'remotion';
import { grid, travel } from './PixelWorld';

const phase = (f: number, a: number, b: number) => Math.min(1, Math.max(0, (f - a) / (b - a)));

// Panels share a top edge. Supply hops in narration order, with the contact frame of each move.
export function PanelHopper({ f, top, panels, hops }: {
  f: number;
  top: number;
  panels: ReadonlyArray<{ center: number; edgeOffset: number; facing: 1 | -1; idlePose: number }>;
  hops: ReadonlyArray<{ land: number; from: number; to: number }>;
}) {
  if (panels.length === 0) return null;
  const hop = [...hops].reverse().find(({ land }) => f >= land - 24);
  let x = panels[hops[0]?.from ?? 0].center,
    foot = top - 3,
    direction = panels[hops[0]?.from ?? 0].facing;
  let sheet = 'release',
    pose = panels[hops[0]?.from ?? 0].idlePose;
  if (hop) {
    const from = panels[hop.from].center,
      to = panels[hop.to].center;
    direction = to > from ? 1 : -1;
    const t = f - hop.land,
      launch = from + direction * panels[hop.from].edgeOffset,
      landing = to - direction * Math.max(0, panels[hop.to].edgeOffset - 4);
    if (t < -15) {
      x = travel(from, launch, phase(t, -24, -15));
      sheet = 'walk';
      pose = Math.floor((t + 24) / 3) % 8;
    } else if (t < 0) {
      const u = phase(t, -15, 0);
      x = grid(launch + (landing - launch) * u);
      foot -= grid(4 * 88 * u * (1 - u));
      sheet = 'carry';
      pose = u < 0.25 ? 1 : 2;
    } else if (t < 8) {
      x = travel(landing, to, phase(t, 0, 8));
      sheet = 'walk';
      pose = Math.floor(t / 3) % 8;
    } else {
      x = to;
      direction = panels[hop.to].facing;
      pose = panels[hop.to].idlePose;
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 68,
        top: foot - 200,
        width: 136,
        height: 200,
        overflow: 'hidden',
        transform: direction < 0 ? 'scaleX(-1)' : undefined,
      }}
    >
      <Img
        src={staticFile(`images/pixel-ergo-${sheet}.png`)}
        style={{
          position: 'absolute',
          left: -136 * pose,
          width: 1088,
          height: 200,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
