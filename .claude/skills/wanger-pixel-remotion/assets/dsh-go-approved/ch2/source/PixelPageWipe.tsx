import React from 'react';
import {pixelColors as C} from './PixelWorld';

// A short workspace handoff. HUD and subtitles remain outside this rectangle.
export function PixelPageWipe({f,change,x=32,y=112,w=1856,h=810}:{f:number;change:number;x?:number;y?:number;w?:number;h?:number}) {
 const d=f-change;
 if(Math.abs(d)>=8)return null;
 const phase=(d+8)/16;
 return <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  {Array.from({length:8},(_,i)=>{
   const local=Math.max(0,Math.min(1,phase*2-(i%2)*.06));
   const leaving=Math.max(0,Math.min(1,(phase-.5)*2));
   const left=d<=0?0:leaving*w;
   const width=d<=0?(d===0?w:local*w):w-left;
   return <g key={i}><rect x={x+left} y={y+i*h/8} width={width} height={h/8+.5} fill={C.paper}/>{width>28&&d!==0&&<rect x={d<0?x+width-24:x+left} y={y+i*h/8} width="24" height={h/8+.5} fill={i%2?C.mint:C.gold}/>}</g>;
  })}
 </svg>;
}
