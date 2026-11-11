import React from "react";
import { pixelColors as C } from "./PixelWorld";
const ivory = C.paper,
  mono = "Menlo,monospace";
export function move(f: number, start: number, length = 18) {
  const t = Math.max(0, Math.min(1, (f - start) / length));
  return t * t * (3 - 2 * t);
}
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="1920"
    height="1080"
    viewBox="0 0 960 540"
    style={{
      position: "absolute",
      inset: 0,
      fontFamily: "PingFang SC,sans-serif",
    }}
  >
    {children}
  </svg>
);
export function Txt({
  x,
  y,
  size = 32,
  fill = ivory,
  anchor = "start",
  children,
  code = false,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
  code?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={code ? mono : undefined}
      fontSize={size}
      fontWeight={680}
      fill={fill}
    >
      {children}
    </text>
  );
}
