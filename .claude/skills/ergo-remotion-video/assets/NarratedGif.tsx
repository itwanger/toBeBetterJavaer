import React from 'react';
import { AnimatedImage, Freeze, interpolate, staticFile, useVideoConfig } from 'remotion';

// Cues use chapter-local frames and seconds from the original GIF.
export function NarratedGif({ f, file, cues, width, height }: {
  f: number;
  file: string;
  cues: ReadonlyArray<{ frame: number; seconds: number }>;
  width: number;
  height: number;
}) {
  const { fps } = useVideoConfig();
  if (cues.length === 0) return null;
  const seconds = cues.length === 1 ? cues[0].seconds : interpolate(
    f, cues.map(cue => cue.frame), cues.map(cue => cue.seconds),
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  return (
    <Freeze frame={Math.round(seconds * fps)}>
      <AnimatedImage src={staticFile(file)} width={width} height={height} />
    </Freeze>
  );
}
