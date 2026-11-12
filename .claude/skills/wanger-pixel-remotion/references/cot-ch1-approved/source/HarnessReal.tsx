import React from 'react';
import {Img,staticFile} from 'remotion';
import {pixelMark} from './PixelLayout';
import {pixelColors as C} from './PixelWorld';
import actions from '../../build/pixel-events.json';
import timing from '../../assets/references/ch1-phrase-timing.json';
import {actionAt} from './PixelAction';
import {ReasoningKeywords} from './ReasoningKeywords';
import keywordTiming from '../../assets/references/reasoning-keywords.json';

// Fill the actual stage by cropping only the native bottom usage footer.
// Source is uniformly scaled; no side fill or additional window chrome.
const H=832,W=1872,X=24,Y=92;
const at=(id:string)=>actionAt(actions.chapters.ch1,id);
const statusAt=timing.subtitles[1].startFrame;
const analysisAt=timing.subtitles[2].startFrame;
const ease=(f:number,start:number,duration:number)=>{const t=Math.max(0,Math.min(1,(f-start)/duration));return t*t*(3-2*t);};
type Camera={left:number;top:number;width:number};
const conversation:Camera={left:420,top:180,width:1720};
const full:Camera={left:0,top:0,width:2560};
const mix=(a:Camera,b:Camera,t:number):Camera=>({left:a.left+(b.left-a.left)*t,top:a.top+(b.top-a.top)*t,width:a.width+(b.width-a.width)*t});
function camera(f:number):Camera{
 if(f<at('analysis-open'))return full;
 if(f<329)return mix(full,conversation,ease(f,at('analysis-open'),28));
 // Keep the thought heading and its actual text in view through both clauses.
 if(f>=387&&f<at('complete'))return mix(conversation,{left:420,top:390,width:1720},ease(f,387,24));
 return conversation;
}
// Genuine excerpt transcribed from reopen-thought.png; streaming is an editorial demonstration.
const reasoningExcerpt='The user is asking in Chinese: "了解 CoT 思维链吗？" — "Do you know about CoT, chain of thought?" This is a simple knowledge question, no tools needed.';
function SparseDetail({f}:{f:number}){
 if(f<statusAt||f>=at('analysis-open'))return null;
 const opacity=ease(f,statusAt,18)*(1-ease(f,289,12));
 const base=W/2560,z=1.65;
 const left=454*base-(454-440)*z,top=416*base-(416-375)*z;
 const expanded=ease(f,233,18),height=264+172*expanded;
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

function source(f:number){
 if(f<at('send'))return 'prompt';
 if(f<statusAt)return 'run-0002';
 if(f<at('analysis-open'))return 'analysis-closed';
 if(f<at('expand'))return 'analysis-open';
 if(f<at('complete'))return 'reopen-thought';
 if(f<at('collapse'))return 'finished-top';
 if(f<at('recall'))return 'collapsed';
 if(f<at('recall-analysis'))return 'reopen-outer';
 if(f<at('recall-thought'))return 'reopen-analysis';
 return 'reopen-thought';
}
function CompletionFocus({f,cam}:{f:number;cam:Camera}){
 const begin=timing.subtitles[10].startFrame,end=timing.subtitles[11].startFrame;
 if(f<begin||f>=end)return null;
 const emphasis=ease(f,begin,14)*(1-ease(f,end-12,12));
 const base=W/cam.width,z=base+(2.4-base)*emphasis;
 // Stay near the native label, with room for the complete border and shadow.
 const sx=440,sy=382,sw=400,sh=90;
 const left=Math.max(36,(454-cam.left)*base-(454-sx)*z);
 const top=(416-cam.top)*base-(416-sy)*z;
 return <>
  <div style={{position:'absolute',inset:0,background:'#000',opacity:.16*emphasis}}/>
  <div {...pixelMark('native-completion-focus','control',{required:true,allowOverlay:true})} style={{position:'absolute',left,top,width:sw*z,height:sh*z,overflow:'hidden',borderRadius:12,opacity:emphasis,outline:'2px solid #ffcb5480',boxShadow:'0 10px 28px #0008'}}>
   <Img src={staticFile('images/desktop-wide/collapsed.png')} style={{position:'absolute',left:-sx*z,top:-sy*z,width:2560*z,height:1200*z,maxWidth:'none'}}/>
   <div style={{position:'absolute',left:14*z,bottom:10*z,width:332*z,height:4,background:C.gold}}/>
  </div>
 </>;
}
function CotDefinition({f}:{f:number}){
 const outline=ease(f,at('definition'),38),named=ease(f,at('name'),16);
 const first=ease(f,754,18),second=ease(f,782,20),third=ease(f,810,20);
 const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
 const nodeW=326,nodeH=76;
 const single={x:(1776-nodeW*1.25)/2,y:570,scale:1.25};
 const pair=[{x:436,y:590,scale:1.08},{x:988,y:542,scale:1.08}];
 const triple=[{x:179,y:620,scale:1},{x:725,y:576,scale:1},{x:1271,y:532,scale:1}];
 const blend=(a:typeof single,b:typeof single,t:number)=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),scale:lerp(a.scale,b.scale,t)});
 const starts=[754,790,818];
 const positions=[blend(blend(single,pair[0],second),triple[0],third),blend(pair[1],triple[1],third),triple[2]];
 const imageTop=228-78*first+32*named;
 const nodes=['拆解问题','分析条件','尝试思路'].map((label,i)=>{
  const appear=ease(f,starts[i],12),p=positions[i];
  return {label,i,appear,...p,x:p.x+(i>0?24*(1-appear):0),y:p.y+32*named+12*(1-appear)};
 }).filter(n=>n.appear>0);
 return <div {...pixelMark('cot-definition-stage','subject',{required:true})} style={{position:'absolute',left:72,top:120,width:1776,height:780}}>
  <div {...pixelMark('native-reasoning-excerpt','control',{required:true,allowOverlay:true})} style={{position:'absolute',left:58,top:imageTop,width:1660,height:324,overflow:'hidden'}}>
   <Img src={staticFile('images/desktop-wide/reopen-thought.png')} style={{position:'absolute',left:-460,top:-582,width:2560,height:1200,maxWidth:'none'}}/>
  </div>
  <svg width={1776} height={780} style={{position:'absolute',inset:0}} shapeRendering="crispEdges">
   <path transform={`translate(0 ${imageTop-140})`} d="M116 114H1660V126H1732V142H1744V468H1732V484H1660V496H116V484H44V468H32V142H44V126H116Z" pathLength={1} fill="none" stroke={C.orange} strokeWidth={8} strokeDasharray={1} strokeDashoffset={1-outline}/>
   {nodes.slice(0,-1).map((step,i)=>{
    const next=nodes[i+1],p=ease(f,starts[next.i]+4,12),x=step.x+nodeW*step.scale+20,y=step.y+nodeH*step.scale/2,nx=next.x-20,ny=next.y+nodeH*next.scale/2;
    return <g key={i}><path d={`M${x} ${y}H${(x+nx)/2}V${ny}H${nx}`} pathLength={1} fill="none" stroke={C.ink} strokeWidth={8} strokeDasharray={1} strokeDashoffset={1-p}/><path d={`M${nx-16} ${ny-12}l16 12-16 12`} fill="none" stroke={C.ink} strokeWidth={8} opacity={ease(f,starts[next.i]+12,6)}/></g>;
   })}
  </svg>
  {nodes.map(({x,y,scale,appear,label,i})=><div key={label} {...pixelMark(`reasoning-step-${i}`,'label',{required:true,allowOverlay:true})} style={{position:'absolute',left:x,top:y,height:nodeH,width:nodeW,display:'flex',alignItems:'center',gap:22,opacity:appear,color:C.ink,fontSize:64,fontWeight:650,whiteSpace:'nowrap',transformOrigin:'0 0',transform:`scale(${scale})`}}><span style={{display:'block',flexShrink:0,width:48,height:48,background:i===2?C.teal:C.orange,boxShadow:`6px 6px 0 ${C.haze}`}}/>{label}</div>)}
  {named>0&&<div {...pixelMark('cot-name','label',{required:true,allowOverlay:true})} style={{position:'absolute',right:58,top:imageTop-120,padding:'10px 26px',background:C.gold,border:`6px solid ${C.ink}`,boxShadow:`8px 8px 0 ${C.orange}`,fontSize:76,lineHeight:'88px',fontWeight:800,color:C.ink,opacity:named}}>CoT 思维链</div>}
 </div>;
}
export function HarnessReal({f}:{f:number;events:Record<string,number>}){
 if(f>=at('definition'))return <CotDefinition f={f}/>;
 const cam=camera(f),z=W/cam.width,file=`images/desktop-wide/${source(f)}.png`;
 return <div style={{position:'absolute',left:X,top:Y,width:W,height:H,borderRadius:28,overflow:'hidden'}}>
  <div {...pixelMark('real-harness-context','subject',{required:true})} style={{position:'absolute',inset:0,overflow:'hidden'}}>
   <Img src={staticFile(file)} style={{position:'absolute',left:-cam.left*z,top:-cam.top*z,width:2560*z,height:1200*z,maxWidth:'none'}}/>
   <SparseDetail f={f}/>
   <CompletionFocus f={f} cam={cam}/>
   <ReasoningKeywords f={f} starts={keywordTiming.starts as [number,number,number]} end={keywordTiming.end}/>
  </div>
 </div>;
}
