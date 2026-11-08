import React from 'react';
import { Img, staticFile } from 'remotion';

type Props = {
  frame: number;
  pose: 'listen' | 'think' | 'point';
  x: number;
  foot: number;
  height?: number;
  facing?: 'left' | 'right';
  opacity?: number;
};

// Anchor both poses at the shoes. The thinking pause and answering nod play once per cue.
export function ReactionActor({ frame, pose, x, foot, height = 190, facing = 'right', opacity = 1 }: Props) {
  const phase = Math.max(0, Math.min(1, frame / (pose === 'think' ? 24 : 14)));
  const tilt = (pose === 'think' ? -4 : 3) * Math.sin(Math.PI * phase);
  const lift = (pose === 'point' ? 5 : 1) * Math.sin(Math.PI * phase);
  const widths = { listen: 104, think: 96, point: 119 };
  const width = (height * widths[pose]) / 190;
  // The pointing sprite extends past its feet to screen right.
  const shoe = width * (pose === 'point' ? 0.43 : 0.57);
  return (
    <Img
      src={staticFile(`images/pixel-ergo-${pose}.png`)}
      style={{
        position: 'absolute',
        left: x - shoe,
        top: foot - height - lift,
        width,
        height,
        transformOrigin: `${shoe}px 100%`,
        transform: `rotate(${facing === 'right' ? tilt : -tilt}deg) scaleX(${facing === 'right' ? 1 : -1})`,
        imageRendering: 'pixelated',
        opacity,
      }}
    />
  );
}
