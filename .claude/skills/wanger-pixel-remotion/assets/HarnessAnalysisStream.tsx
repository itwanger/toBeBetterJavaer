import React from 'react';
import {pixelMark} from './PixelLayout';
import {pixelColors as C} from './PixelWorld';
const W=1872;
const ease=(f:number,a:number,d:number)=>{const p=Math.max(0,Math.min(1,(f-a)/d));return p*p*(3-2*p);};
// Mount inside the 1872x832 native viewport. Excerpt must be supplied with provenance.
export function HarnessAnalysisStream({f,excerpt:reasoningExcerpt,statusAt=84,analysisAt=156,excerptAt=233,fadeAt=289,endAt=301}:{f:number;excerpt:string;statusAt?:number;analysisAt?:number;excerptAt?:number;fadeAt?:number;endAt?:number}){
 if(f<statusAt||f>=endAt)return null;
 const opacity=ease(f,statusAt,18)*(1-ease(f,fadeAt,Math.max(1,endAt-fadeAt)));
 const base=W/2560,z=1.65;
 const left=454*base-(454-440)*z,top=416*base-(416-375)*z;
 const expanded=ease(f,excerptAt,18),height=264+172*expanded;
 const count=Math.max(1,Math.min(reasoningExcerpt.length,Math.floor(f-analysisAt)+1));
 const streaming=f>=analysisAt,visible=reasoningExcerpt.slice(0,count);
 const tail=visible.length>39?'…'+visible.slice(-39):visible;
 const timer=Math.min(7,1+Math.floor((f-statusAt)/30));
 return <div {...pixelMark('native-anchored-analysis','control',{required:true,allowOverlay:true})}
  style={{position:'absolute',left,top,width:1072,height,overflow:'hidden',borderRadius:14,opacity,background:'#141414',color:'#aaaab1',boxShadow:'0 12px 32px #0008',outline:'2px solid #ffcb5450'}}>
  <div style={{position:'absolute',left:28,top:22,fontSize:46,lineHeight:'58px'}}>◈ 正在分析请求</div>
  {streaming&&<div {...pixelMark('streaming-reasoning-fragment','label',{required:true,allowOverlay:true})}
   style={{position:'absolute',left:30,top:94,width:1008,fontSize:40,lineHeight:'56px',height:56+172*expanded,overflow:'hidden',overflowWrap:'anywhere',whiteSpace:expanded<.5?'nowrap':'normal',color:'#d1d1d7'}}>
   {expanded<.5?tail:visible}<span style={{display:'inline-block',width:5,height:38,marginLeft:6,verticalAlign:'middle',background:C.gold,opacity:Math.floor(f/5)%2?.35:1}}/>
  </div>}
  <div style={{position:'absolute',left:28,right:28,bottom:96,height:1,background:'#303034'}}/>
  <div {...pixelMark('animated-analysis-timer','label',{required:true,allowOverlay:true})} style={{position:'absolute',left:28,bottom:28,fontSize:43,lineHeight:'56px',color:'#81a5ed'}}>⚑ 深度求索中，用时 {timer} 秒…</div>
  <div style={{position:'absolute',left:28,top:streaming?82:height-24,width:streaming?386:658,height:4,background:C.gold,opacity:.75}}/>
 </div>;
}

