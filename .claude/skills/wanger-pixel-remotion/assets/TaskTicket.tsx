import React from 'react';
import {Mark} from './PixelMarks';
import {pixelColors as C} from './PixelWorld';

export function TaskTicket({x,y,scale=1,accepted=false}: {x:number; y:number; scale?:number; accepted?:boolean}){
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-40 -25h59l18 18v33h-77z" stroke={C.ink} strokeWidth="4" fill={accepted?C.mint:C.gold}/>
    <path d="M19 -24v18h17" fill="none" stroke={C.ink} strokeWidth="3"/>
    {accepted?<path d="M-20 0l10 10 19-20" stroke={C.teal} strokeWidth="6" fill="none"/>:<Mark type="branch" x={-5} y={2} s={1.12}/>}
  </g>;
}
