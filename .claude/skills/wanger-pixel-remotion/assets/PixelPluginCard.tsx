import React from 'react';
import {pixelColors as C} from './PixelWorld';

export type PixelCardItem = {
  name: string;
  icon: string; // SVG path on a 28 × 28 grid
  color: string;
  ink?: string;
};

export const pixelCardThemes = {
  manuscript: {color: C.teal, ink: C.paper, icon: 'M5 2h13v3h3v3h3v17H5z M17 4v6h5 M9 14h10 M9 19h8'},
  layout: {color: C.gold, icon: 'M2 4h24v19H2z M2 10h24 M12 10v13'},
  histogram: {color: C.mint, icon: 'M2 23h24 M5 21v-7h3v7 M12 21V9h3v12 M19 21V4h3v17'},
  paper: {color: C.orange, icon: 'M2 5h7l5 3 5-3h7v17h-7l-5 3-5-3H2z M14 8v17'},
} as const;

type Props = {
  item: PixelCardItem;
  width?: number;
  height?: number;
  font?: number;
  glyph?: number;
  gap?: number;
  checked?: number;
};

// Center the card with the containing SVG group's transform.
export function PixelPluginCard({item, width = 770, height = 266, font = 86,
  glyph = 80, gap = 24, checked = 0}: Props) {
  const ink = item.ink ?? C.ink;
  const iconTop = -(glyph + gap + font) / 2;
  return <>
    <rect x={-width/2+8} y={-height/2+10} width={width} height={height} fill={C.ink}/>
    <rect x={-width/2} y={-height/2} width={width} height={height} fill={item.color} stroke={C.ink} strokeWidth="6"/>
    <path transform={`translate(${-glyph/2} ${iconTop}) scale(${glyph/28})`}
      d={item.icon} fill="none" stroke={ink} strokeWidth="1.9" strokeLinejoin="miter"/>
    <text y={iconTop+glyph+gap+font*.87} textAnchor="middle" fontSize={font}
      fontWeight="650" fill={ink}>{item.name}</text>
    <path d="M0 11l10 10L33-3" fill="none" stroke={ink} strokeWidth="7" opacity={checked}
      transform={`translate(${width/2-72} ${-height/2+36})`}/>
  </>;
}
