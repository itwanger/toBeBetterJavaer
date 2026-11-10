import React from 'react';
import {pixelColors as C} from './PixelWorld';

type Point = readonly [number, number];
type Props = {
  points: readonly Point[]; // Left-to-right samples in source-image coordinates
  sourceWidth: number;
  sourceHeight: number;
  mode: 'nodes' | 'continuous';
  frame: number;
  start: number;
  end: number;
  labels?: readonly string[];
  dottedLast?: boolean;
  endLabel?: {text: string; x: number; y: number; width?: number};
  opacity?: number;
  ink?: string;
};
const bound = (x: number) => Math.max(0, Math.min(1,x));
const ease = (x: number) => x*x*(3-2*x);
const mix = (a: number, b: number, t: number) => a+(b-a)*t;

function tracePosition(points: readonly Point[], nodes: boolean, progress: number): Point {
  if (nodes) {
    const step = progress*(points.length-1);
    const i = Math.min(Math.floor(step), points.length-2);
    const t = ease(bound((step-i-.12)/.88));
    return [mix(points[i][0],points[i+1][0],t), mix(points[i][1],points[i+1][1],t)];
  }
  const x = mix(points[0][0], points[points.length-1][0], ease(progress));
  const i = points.findIndex(([px]) => px >= x);
  if (i <= 0) return [x, points[0][1]];
  const [ax,ay] = points[i-1], [bx,by] = points[i];
  return [x, mix(ay,by,(x-ax)/(bx-ax))];
}

export function ChartLineTrace({points, sourceWidth, sourceHeight, mode, frame, start, end,
  labels, dottedLast = false, endLabel, opacity = 1, ink = '#2458b8'}: Props) {
  const clipId = React.useId();
  if (points.length < 2 || end <= start) return null;
  const nodes = mode === 'nodes';
  const progress = bound((frame-start)/(end-start));
  const [x,y] = tracePosition(points, nodes, progress);
  const last = points[points.length-1], previous = points[points.length-2];
  const markers = nodes ? points : [points[0], last];
  const active = Math.floor(progress*(points.length-1));
  const visible = bound((frame-start+3)/7)*opacity;
  if (!visible) return null;
  return <svg width={sourceWidth} height={sourceHeight} viewBox={`0 0 ${sourceWidth} ${sourceHeight}`} aria-hidden
    style={{position:'absolute',inset:0,pointerEvents:'none',opacity:visible}}>
    <defs><clipPath id={clipId}><rect width={x} height={sourceHeight}/></clipPath></defs>
    <g clipPath={`url(#${clipId})`} fill="none" stroke={ink} strokeWidth="8.5">
      <polyline points={(dottedLast ? points.slice(0,-1) : points).map(p=>p.join(',')).join(' ')} strokeLinejoin="round"/>
      {dottedLast && <line x1={previous[0]} y1={previous[1]} x2={last[0]} y2={last[1]} strokeDasharray="12 10"/>}
    </g>
    {markers.map(([px,py],i) => {
      if (x < px) return null;
      const hit = start+(end-start)*i/(markers.length-1);
      const pulse = bound((frame-hit)/20);
      return <g key={i}>
        <circle cx={px} cy={py} r="6.5" fill="white" stroke={ink} strokeWidth="3.5"/>
        {pulse<1 && <circle cx={px} cy={py} r={12+21*pulse} fill="none" stroke="#c54d16" strokeWidth={4.6} opacity={(1-pulse)*.9}/>}
      </g>;
    })}
    <circle cx={x} cy={y} r={frame>=end ? 20 : 17} fill="#cd4715" opacity=".22"/>
    <circle cx={x} cy={y} r={frame>=end ? 12 : 10.5} fill={C.gold} stroke={C.ink} strokeWidth="3.8"/>
    {nodes && labels?.[active] && <g transform={`translate(${points[active][0]} ${points[active][1]})`}>
      <path d="M0 11v14" stroke={C.ink} strokeWidth="3"/>
      <rect x={active===0 ? -39 : -65} y="23" width="130" height="44" rx="5" fill={C.ink}/>
      <text x={active===0 ? 26 : 0} y="55" fontFamily="PingFang SC,sans-serif" fontSize="32" fontWeight="650"
        textAnchor="middle" fill={C.paper}>{labels[active]}</text>
    </g>}
    {frame>=end && endLabel && <g transform={`translate(${endLabel.x} ${endLabel.y})`}>
      <rect width={endLabel.width ?? 143} height="43" rx="5" fill={C.ink}/>
      <text x={(endLabel.width ?? 143)/2} y="32" textAnchor="middle" fontFamily="PingFang SC,sans-serif"
        fontSize="29" fontWeight="650" fill={C.paper}>{endLabel.text}</text>
    </g>}
  </svg>;
}
