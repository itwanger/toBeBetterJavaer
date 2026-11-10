import React, {type ReactNode} from 'react';
import {PixelPluginCard, type PixelCardItem} from './PixelPluginCard';
import {pixelColors as C} from './PixelWorld';

type Four<T> = readonly [T, T, T, T];
type Props = {
  frame: number;
  items: Four<PixelCardItem>;
  arrivalFrames: Four<number>;
  dockFrame?: number;
  checkFrame?: number;
  lead?: ReactNode;
};

function rise(frame: number, start: number | undefined, duration: number) {
  if (start === undefined) return 0;
  const t = Math.max(0, Math.min(1, (frame-start)/duration));
  return t*t*(3-2*t);
}
const mix = (a: number, b: number, t: number) => a + (b-a)*t;

// One card fills the stage. Each newcomer makes room, then the quartet can dock on the left.
export function FourCardLineup({frame, items, arrivalFrames, dockFrame, checkFrame, lead}: Props) {
  const progress = arrivalFrames.map(start => rise(frame, start, 16));
  const [first, second, third, fourth] = progress;
  const dock = rise(frame, dockFrame, 22);
  const checked = rise(frame, checkFrame, 12);
  const x = [mix(960,530,second), mix(1690,1390,second), mix(960,530,fourth), mix(1690,1390,fourth)];
  const width = mix(mix(1320,770,second),384,dock);
  const height = mix(mix(mix(514,410,second),266,third),186,dock);
  const font = mix(mix(137,86,second),50,dock);
  const glyph = mix(mix(mix(152,110,second),80,third),48,dock);
  const gap = mix(mix(38,24,third),14,dock);

  return <g fill={C.ink}>
    {lead && first < 1 && <g opacity={1-first}>{lead}</g>}
    {items.map((item, i) => {
      const appear = progress[i];
      if (!appear) return null;
      const scale = i === 0 ? mix(.86,1,first) : mix(.18,1,appear);
      // Keep the new right-hand card clear of its moving neighbour.
      const center = i % 2 && appear < 1 ? Math.max(x[i], x[i-1]+width*(1+scale)/2+28) : x[i];
      const cx = mix(center, i % 2 === 0 ? 304 : 724, dock);
      const cy = mix(i < 2 ? mix(503,350,third) : mix(795,674,third), i < 2 ? 388 : 624, dock);
      return <g key={i} opacity={appear} transform={`translate(${cx} ${cy}) scale(${scale})`}>
        <PixelPluginCard item={item} {...{width, height, font, glyph, gap, checked}}/>
      </g>;
    })}
  </g>;
}
