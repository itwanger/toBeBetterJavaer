import React from 'react';
import {containBox, pixelMark} from './PixelLayout';

type Box = {x: number; y: number; width: number; height: number};

// Both boxes use the parent SVG's coordinates. Include strokes, callouts and shadow in bounds.
export function FitPixelSubject({bounds, area, progress=1, entryScale=0.94, id="fitted-subject", children}: {
  bounds: Box; area: Box; id?:string; progress?: number; entryScale?: number; children: React.ReactNode;
}) {
  const {width,height} = bounds;
  if (width <= 0 || height <= 0 || area.width <= 0 || area.height <= 0) return null;
  const fit = containBox(bounds,area).scale;
  const initial = Math.min(1, Math.max(0, entryScale));
  const scale = fit * (initial + (1-initial)*Math.max(0,Math.min(1,progress)));
  const x = area.x + (area.width - width*scale)/2 - bounds.x*scale;
  const y = area.y + (area.height - height*scale)/2 - bounds.y*scale;
  return <g {...pixelMark(id,'subject',{required:true})} transform={`translate(${x} ${y}) scale(${scale})`}>{children}</g>;
}
