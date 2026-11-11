import React from "react";
import { PixelMediaWindow } from "./PixelImageWindow";

type Camera = { cx: number; cy: number; scale: number };
// Source-space children (media + tracked marks) travel together. Window-space
// labels stay pinned. Caller chooses when to move and how tightly to frame.
export function FocusedMedia({
  width,
  height,
  sourceWidth,
  sourceHeight,
  top,
  left,
  camera,
  children,
  overlay,
}: {
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
  top?: number;
  left?: number;
  camera: Camera;
  children: React.ReactNode;
  overlay?: React.ReactNode;
}) {
  const { cx, cy, scale } = camera;
  return (
    <PixelMediaWindow width={width} height={height} left={left} top={top}>
      <div
        style={{
          position: "absolute",
          width: sourceWidth,
          height: sourceHeight,
          transformOrigin: "0 0",
          transform: `translate(${width / 2 - cx * scale}px,${height / 2 - cy * scale}px) scale(${scale})`,
        }}
      >
        {children}
      </div>
      {overlay}
    </PixelMediaWindow>
  );
}
