import React from 'react';
import {pixelMark} from './PixelLayout';
import {pixelColors as C} from './PixelWorld';

const ease=(f:number,a:number,d=10)=>{const p=Math.max(0,Math.min(1,(f-a)/d));return p*p*(3-2*p);};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;

// Three keyword cues over the native input area; only spoken items enter the layout.
export function ReasoningKeywords({f,starts=[433,455,488],end=519,width=1872,top=660,labels=['拆解问题','分析条件','不同思路']}:{
 f:number;starts?:readonly [number,number,number];end?:number;width?:number;top?:number;labels?:readonly [string,string,string];
}){
 if(f<=starts[0]||f>=end)return null;
 const card=320,gap=56,single=(width-card)/2,pair=(width-card*2-gap)/2,triple=(width-card*3-gap*2)/2;
 const two=ease(f,starts[1]),three=ease(f,starts[2]);
 const xs=[lerp(lerp(single,pair,two),triple,three),lerp(pair+card+gap,triple+card+gap,three),triple+2*(card+gap)];
 const active=labels.map((text,i)=>({text,i,x:xs[i],opacity:ease(f,starts[i],8)})).filter(n=>n.opacity>0);
 return <div style={{position:'absolute',left:0,top,width,height:100}}>
  {active.map(({text,i,x,opacity})=><div key={text} {...pixelMark(`thought-keyword-${i}`,'label',{required:true,allowOverlay:true})}
   style={{position:'absolute',left:x,top:10*(1-opacity),width:card,height:86,display:'flex',alignItems:'center',justifyContent:'center',gap:18,
    background:'#25263bf5',color:C.paper,fontSize:54,fontWeight:650,border:`3px solid ${C.gold}`,boxShadow:'5px 5px 0 #0006',opacity}}>
   <span style={{width:22,height:22,background:[C.gold,C.orange,C.teal][i]}}/>{text}
  </div>)}
  <svg width={width} height={100} style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   {active.slice(1).map(n=><path key={n.i} d={`M${n.x-43} 43h28m-10-10 10 10-10 10`} stroke={C.gold} strokeWidth={5} fill="none" opacity={n.opacity}/>)}
  </svg>
 </div>;
}
