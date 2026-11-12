import React from 'react';
import {pixelColors as C} from './PixelWorld';
import {TokenGlyph,colorFor} from './GenerationMaterials';
const p=(f:number,a:number,d:number)=>Math.max(0,Math.min(1,(f-a)/d));
const ease=(t:number)=>t*t*(3-2*t);
// The approved paper / margin / pencil vocabulary; no empty rows before receipt.
export function PixelThoughtDraft({f,arrivals,width=1472}:{f:number;arrivals:number[];width?:number}){
 const count=arrivals.filter(a=>f>=a).length;
 if(!count)return null;
 const newest=arrivals[count-1],write=p(f,newest,18);
 const rows=Math.min(count,3),enter=count===1?ease(p(f,newest,12)):1;
 const h=94+42*(count<=3?Math.max(1,count-1+ease(write)):rows);
 const scroll=count>3?(count-4+ease(write))*42:0;
 const lineY=70+(count-1)*42-scroll;
 return <div style={{height:(h+8)*width/768*enter,overflow:'hidden',opacity:enter,flexShrink:0}}>
  <svg width={width} height={(h+8)*width/768} viewBox={`-4 -4 768 ${h+8}`} style={{display:'block'}}>
   <path d={`M12 0h704l32 32v${h-32}H12Z`} fill={C.paper} stroke={C.teal} strokeWidth={6}/>
   <path d="M716 0v32h32" fill={C.haze} stroke={C.teal} strokeWidth={5}/>
   <path d={`M76 20v${h-36}`} stroke={C.orange} strokeWidth={4}/>
   <defs><clipPath id="dsh-paper-lines"><rect x={28} y={45} width={690} height={h-60}/></clipPath></defs>
   <g clipPath="url(#dsh-paper-lines)">{arrivals.slice(0,count).map((a,i)=>{
    const amount=i===count-1?write:1;
    return <g key={a} transform={`translate(0 ${70+i*42-scroll})`}>
     <TokenGlyph x={36} y={-22} size={28} index={i}/>
     <rect x={100} y={-14} width={(440+(i%3)*48)*amount} height={16} fill={colorFor(i)}/>
     <path d={`M100 12H${Math.min(656,100+(500+(i%2)*50)*amount)}`} stroke={C.ink} strokeWidth={5}/>
    </g>;
   })}</g>
   <g transform={`translate(${100+(440+((count-1)%3)*48)*write} ${lineY-8}) rotate(-38)`} shapeRendering="crispEdges">
    <path d="M0-44h22v58H0Z" fill={C.gold} stroke={C.ink} strokeWidth={3}/><path d="M0 14l11 22 11-22Z" fill={C.haze} stroke={C.ink} strokeWidth={3}/><rect x={0} y={-54} width={22} height={12} fill={C.orange}/>
   </g>
  </svg>
 </div>;
}
