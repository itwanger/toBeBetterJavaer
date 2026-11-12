import React from 'react';
import {Img,staticFile} from 'remotion';
import {pixelMark} from './PixelLayout';
import {pixelColors as C} from './PixelWorld';
// User-authorized interface demonstration; cut to genuine capture at frame 84.
export function HarnessTypingOpening({f,send=43,prompt='了解 CoT 思维链吗？',framesDirectory='images/ergo-typing-v1'}:{f:number;send?:number;prompt?:string;framesDirectory?:string}){
 const typing=f<send;
 const spriteFrame=typing?Math.floor(f/4)%4:3;
 const text=prompt.slice(0,Math.min(prompt.length,Math.floor(f/3)+1));
 return <>
  <div {...pixelMark('opening-harness-demo','subject',{required:true})} style={{position:'absolute',left:550,top:176,width:1320,height:619,borderRadius:24,overflow:'hidden',background:'#141414',color:'#ededed'}}>
   <div style={{position:'absolute',left:22,top:18,width:68,height:24,borderRadius:14,background:'#7359ff',textAlign:'center',fontSize:22,lineHeight:'24px'}}>▱</div>
   <div style={{position:'absolute',left:120,top:16,fontSize:24,color:'#a4a4aa'}}>◫　⊕</div>
   <div style={{position:'absolute',left:80,top:140,width:1160,textAlign:'center',fontSize:46,fontWeight:600}}>探索未至之境 <span style={{fontSize:25,padding:'3px 10px',borderRadius:8,background:'#374258',verticalAlign:'middle'}}>预览版</span></div>
   <div style={{position:'absolute',left:92,top:224,fontSize:29,color:'#b6b6bc'}}>DeepSeek Harness　⌄　 ·　标准模式　⌄</div>
   <div {...pixelMark('typed-prompt-input','control',{required:true,allowOverlay:true})} style={{position:'absolute',left:80,top:276,width:1160,height:234,borderRadius:32,background:'#2b2b2d',boxShadow:typing?'inset 0 0 0 2px #45454a':'inset 0 0 0 2px #79a7ff'}}>
    <div style={{position:'absolute',left:34,top:34,fontSize:60,lineHeight:'78px',whiteSpace:'nowrap'}}>{text}{typing&&<span style={{display:'inline-block',height:62,width:3,marginLeft:7,background:'#91b7ff',verticalAlign:'middle',opacity:Math.floor(f/8)%2?.2:1}}/>}</div>
    <div style={{position:'absolute',left:32,bottom:28,fontSize:30,color:'#c0c0c6'}}>＋　♧ 完全权限 ⌄</div>
    <div style={{position:'absolute',right:116,bottom:30,fontSize:26,color:'#b6b6bc'}}>DeepSeek-V4.1-Flash High ⌄</div>
    <div style={{position:'absolute',right:24,bottom:20,width:68,height:68,borderRadius:'50%',background:'#79a7ff',display:'flex',justifyContent:'center',alignItems:'center',transform:f>=send&&f<send+5?'scale(.88)':'none'}}>
     <svg width={42} height={42} viewBox="0 0 42 42"><path d={typing?'M21 34V8M9 20 21 8 33 20':'m9 22 8 8 17-20'} stroke="white" fill="none" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
   </div>
  </div>
  <Img {...pixelMark('corner-typing-operator','control',{required:true})}
   src={staticFile(`${framesDirectory}/frame-${spriteFrame}.png`)}
   style={{position:'absolute',left:140,top:514,width:360,height:360,imageRendering:'pixelated'}}/>
  {typing&&<svg width={94} height={68} style={{position:'absolute',left:242,top:461}} shapeRendering="crispEdges">
   <path d="M4 4h82v46H48v12H34V50H4z" fill={C.paper} stroke={C.ink} strokeWidth={6}/>
   {[0,1,2].map(i=><rect key={i} x={19+i*20} y={22} width={10} height={10} fill={C.ink} opacity={(Math.floor(f/6)%3)===i?1:.35}/>)}
  </svg>}
 </>;
}
