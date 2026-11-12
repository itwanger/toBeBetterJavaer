import React from 'react';
import {PixelWhale} from './DeepSeekIdentity';
import {pixelColors as C} from './PixelWorld';
import {D} from './Chapter2Design';
import evidence from '../../assets/references/ch2-reasoning.json';
function PanelTitle({model=false,status,opacity=1}:{model?:boolean;status?:string;opacity?:number}){
 return <div style={{height:80,boxSizing:'border-box',flexShrink:0,background:model?'#c1dfd2':'#eee9db',borderBottom:`3px solid ${model?C.teal:C.ink}`,display:'flex',alignItems:'center',gap:24,padding:'0 18px',color:C.ink}}>
  <div style={{display:'flex',gap:10,flexShrink:0}}>{[C.orange,C.gold,C.teal].map(c=><i key={c} style={{width:10,height:10,borderRadius:5,background:c}}/>)}</div>
  <div style={{display:'flex',alignItems:'center',gap:12,fontSize:D.secondary,fontWeight:D.weight,whiteSpace:'nowrap'}}>
   {model?<svg width={48} height={48} viewBox="0 0 48 54" shapeRendering="crispEdges"><path d="M4 0h40v22H4Zm0 30h40v22H4Z" fill={C.teal}/><path d="M10 7h8v8h-8Zm0 30h8v8h-8Z" fill={C.gold}/></svg>:<PixelWhale size={56}/>}{model?'DeepSeek 模型':'DSH'}
  </div>
  {status&&<span style={{marginLeft:'auto',fontSize:D.secondary,color:C.teal,whiteSpace:'nowrap',opacity}}>{status}</span>}
 </div>;
}
// Opening reasoning only. Mechanism shots use HarnessExchangeStage.
export function HarnessContextModel({f}:{f:number}){
 const body=evidence.paragraphs.join('\n\n'),n=Math.min(body.length,100+Math.floor(f*1.8)),cut=body.slice(0,n).lastIndexOf(' ');
 return <div style={{position:'absolute',left:24,top:94,width:1866,height:847,border:`4px solid ${C.ink}`,boxSizing:'border-box',background:D.ink,color:D.paper,fontFamily:D.font,fontWeight:D.weight,overflow:'hidden'}}>
  <PanelTitle status={`深度求索中 · ${1+Math.floor(f/30)} 秒`}/>
  <div style={{padding:'30px 48px',fontSize:D.body,lineHeight:'70px'}}>
   <div style={{color:D.muted,margin:'26px 0 24px',lineHeight:'normal'}}>⌃ 思考</div>
   <div style={{whiteSpace:'pre-wrap'}}>{body.slice(0,cut+1)}<span style={{color:D.gold}}>{body.slice(cut+1,n)}</span>{n<body.length&&<span style={{display:'inline-block',width:6,height:48,background:D.gold,marginLeft:8,opacity:Math.floor(f/7)%2?1:.3}}/>}</div>
  </div>
 </div>;
}
