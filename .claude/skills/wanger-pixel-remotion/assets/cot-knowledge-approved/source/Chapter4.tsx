import React from 'react';
import {AbsoluteFill,Audio,Img,staticFile,useCurrentFrame} from 'remotion';
import {subtitleAt} from '../../../shared/remotion/components/Scenes';
import timing from '../../assets/references/ch4-phrase-timing.json';
import mix from '../../build/sound-mix.json';
import {PixelWorld} from './PixelWorld';
import {PixelWhale} from './DeepSeekIdentity';
import {PixelMediaWindow} from './PixelImageWindow';
import {FlagCourse,FlagRunner} from './FlagCourse';
import {WorldWipe} from './WorldWipe';
import {D} from './Chapter2Design';
const E=timing.events;
const mint=D.mint,gold=D.gold,ink=D.ink;
const box:React.CSSProperties={position:'absolute',boxSizing:'border-box'};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const p=(f:number,a:number,d=20)=>clamp((f-a)/d);
const s=(f:number,a:number,d=20)=>{const t=p(f,a,d);return t*t*(3-2*t)};
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const levels=['Off','Low','High','Max'];
function selected(f:number){return f>=E.selectOff?0:f>=E.selectMax?3:f>=E.selectHigh?2:f>=E.selectLow?1:2}
function Check({color=mint}:{color?:string}){return <svg width={48} height={48} viewBox="0 0 48 48"><path d="M6 24l12 12L42 10" stroke={color} strokeWidth={8} fill="none"/></svg>}
function Caret({up=false}:{up?:boolean}){return <svg width={32} height={32} viewBox="0 0 32 32" style={{transform:up?'rotate(180deg)':undefined}}><path d="M5 10l11 12 11-12" stroke="currentColor" strokeWidth={5} fill="none"/></svg>}
function Pointer({f,at,x,y}:{f:number;at:number;x:number;y:number}){if(f<at-14||f>at+16)return null;const t=p(f,at,16);return <svg style={{...box,left:x+28*(1-p(f,at-14,14)),top:y+30*(1-p(f,at-14,14)),overflow:'visible',pointerEvents:'none'}} width={70} height={80}><path d="M4 4v52l15-14 14 27 14-7-14-27 23 1Z" fill={D.paper} stroke={ink} strokeWidth={5}/>{f>=at&&<circle cx={4} cy={4} r={14+45*t} fill="none" stroke={gold} strokeWidth={6} opacity={1-t}/>}</svg>}
function Original({f}:{f:number}){
 const t=s(f,22,92),scale=lerp(.756,1.24,t),w=lerp(1161,1858,t),h=774,cy=lerp(512,332,t);
 return <PixelMediaWindow width={w} height={h} top={94}><Img src={staticFile('images/04-reasoning-levels.png')} style={{...box,width:1536*scale,height:1024*scale,maxWidth:'none',left:w/2-768*scale,top:h/2-cy*scale}}/></PixelMediaWindow>;
}
function RequestPanel({f}:{f:number}){
 if(f<E.request)return null;
 const entered=s(f,E.request,16),think=s(f,E.thinking,16),out=s(f,E.output,18)*(1-s(f,E.selectOff+20,16));
 const off=f>=E.selectOff+20;const h=150+140*think+164*out,top=408-h/2;
 return <div style={{...box,left:770+32*(1-entered),top,width:1000,height:h,opacity:entered,background:'#eee9db',border:`4px solid ${off?'#85838d':mint}`,color:ink,overflow:'hidden'}}>
  <div style={{height:98,display:'flex',alignItems:'center',gap:20,padding:'0 28px',fontSize:50,borderBottom:'3px solid #bdbcb0'}}><svg width={48} height={48} viewBox="0 0 48 48"><path d="M6 4h26l10 10v30H6Z" fill={gold} stroke={ink} strokeWidth={4}/><path d="M31 4v11h11M13 24h20M13 33h20" fill="none" stroke={ink} strokeWidth={4}/></svg>DeepSeek 模型<span style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:16,fontSize:46}}><PixelWhale size={48}/><span style={{fontSize:40}}>deepseek-flash</span></span></div>
  {think>0&&<div style={{padding:'12px 28px',opacity:think}}><div style={{display:'flex',alignItems:'center',fontFamily:D.mono,fontSize:48,color:'#087e73'}}>thinking<div style={{marginLeft:'auto',width:102,height:48,background:off?'#94949e':'#098577',padding:6}}><div style={{width:36,height:36,background:D.paper,transform:`translateX(${off?0:54}px)`}}/></div></div><div style={{fontFamily:D.mono,fontSize:48,marginTop:8}}>type: <span style={{color:off?'#765f65':'#087e73',background:off?'#ded6d1':'#b3e2cf',padding:'2px 12px'}}>{off?'"disabled"':'"enabled"'}</span></div></div>}
  {out>0&&<div style={{margin:'12px 28px 0',paddingTop:16,borderTop:'3px solid #bdbcb0',opacity:out,fontFamily:D.mono,fontSize:48}}><div style={{color:'#087e73'}}>output_config</div><div style={{marginTop:10}}>effort: <span style={{background:gold,padding:'2px 12px'}}>"max"</span></div></div>}
 </div>;
}
function Desktop({f}:{f:number}){
 const phase=s(f,E.selectLow,42),active=selected(f),menuX=lerp(1030,60,phase),menuY=lerp(190,180,phase),menuW=lerp(760,540,phase);
 const opening=s(f,E.options,16);const selectedY=menuY+84+active*94+47;
 const mention=f>=E.default?2:f>=E.maxMention?3:f>=E.highMention?2:f>=E.lowMention?1:f>=E.offMention?0:-1;
 const pulseAt=f>=E.selectOff?E.selectOff:E.transfer,flight=p(f,pulseAt,20);
 const routeY=selectedY;const bend=routeY>408?20:-20;const route=`M 608 ${routeY} H 646 Q 670 ${routeY} 670 ${routeY-bend} V ${408+bend} Q 670 408 694 408 H 756`;
 return <div style={{...box,left:24,top:94,width:1866,height:834,background:"transparent",color:D.paper,fontFamily:D.font,fontWeight:680,overflow:'hidden'}}>
  <div style={{...box,left:0,top:0,width:lerp(1866,660,phase),height:834,background:ink,border:`4px solid ${ink}`}}/>
  <div style={{position:"relative",boxSizing:"border-box",width:lerp(1866,660,phase),height:82,display:'flex',alignItems:'center',gap:20,padding:'0 28px',background:'#eee9db',color:ink,borderBottom:`4px solid ${ink}`}}><div style={{display:'flex',gap:10,marginRight:10}}>{[D.coral,gold,'#128577'].map(c=><i key={c} style={{width:12,height:12,background:c}}/>)}</div><PixelWhale size={52}/><span style={{fontSize:52}}>DSH</span></div>
  <div style={{...box,inset:'82px 0 170px',opacity:(1-phase)*(f>=E.modelClick?.28:1)}}>
   <div style={{...box,right:46,top:30,background:'#3d3d49',borderLeft:`6px solid ${gold}`,padding:'16px 28px',fontSize:50}}>了解 CoT 思维链吗？</div>
   <div style={{...box,left:46,right:46,top:158,background:'#34343f',padding:'22px 28px',fontSize:52,color:mint}}>⌄ 已完成，用时 7 秒</div>
   <div style={{...box,left:80,top:296,right:80,fontSize:52,lineHeight:1.6}}>CoT（思维链）：先展开推导步骤，<br/>再给出结论。</div>
  </div>
  <div style={{...box,left:28,right:28,bottom:20,height:146,opacity:1-phase,background:'#34343e',border:'3px solid #585866',padding:'18px 24px',color:D.muted,fontSize:44}}><div>发送消息</div><div style={{...box,left:24,bottom:16,fontSize:44}}>＋</div></div>
  <div style={{...box,left:lerp(1000,28,phase),top:730,width:lerp(740,604,phase),height:76,padding:'10px 24px',display:'flex',alignItems:'center',gap:18,border:`3px solid ${f>=E.modelClick?gold:'#585866'}`,background:'#454550',fontSize:46}}><PixelWhale size={44}/><span style={{fontSize:phase>.5?36:42}}>deepseek-flash</span><span style={{color:gold,marginLeft:'auto'}}>{levels[active]}</span><Caret up={f>=E.modelClick}/></div>
  {f>=E.modelClick&&f<E.options&&<div style={{...box,left:1030,top:462,width:760,height:254,padding:18,border:'4px solid #757482',background:'#3b3b47',boxShadow:'12px 12px 0 #17171e80'}}>{['模型','推理等级'].map((v,i)=><div key={v} style={{height:104,display:'flex',alignItems:'center',padding:'0 28px',gap:20,fontSize:52,background:i===1&&f>=E.effortClick?'#176d62':undefined}}><span>{i===0?'▣':'▥'}</span>{v}<span style={{marginLeft:'auto'}}>›</span></div>)}</div>}
  {f>=E.options&&<div style={{...box,left:menuX,top:menuY+16*(1-opening),width:menuW,height:488,opacity:opening,background:'#3b3b47',border:'4px solid #757482',boxShadow:'10px 10px 0 #17171e80'}}><div style={{height:84,padding:'10px 28px',display:'flex',alignItems:'center',fontSize:48,borderBottom:'3px solid #696978'}}>推理等级</div>{levels.map((v,i)=><div key={v} style={{height:94,margin:'0 12px',padding:'0 20px',display:'flex',gap:18,alignItems:'center',fontSize:54,fontFamily:D.mono,background:i===active?'#176d62':undefined,borderLeft:`6px solid ${f>=E.offMention&&f<E.selectLow&&i===mention?gold:'transparent'}`}}><span>{v}</span>{f>=E.default&&f<E.selectLow&&i===2&&<span style={{fontFamily:D.font,fontSize:42,color:gold}}>默认</span>}{active===i&&<div style={{marginLeft:'auto'}}><Check/></div>}</div>)}</div>}
  {f>=E.request&&<svg width={1858} height={824} style={{...box,left:0,top:0,pointerEvents:'none',opacity:s(f,E.request,16)}}><path d={route} stroke={mint} strokeWidth={12} fill="none"/><path d="M734 389l23 19-23 19" stroke={mint} strokeWidth={10} fill="none"/>{f>=pulseAt&&flight<1&&<path d={route} pathLength={1000} stroke={gold} strokeWidth={16} fill="none" strokeDasharray="24 1000" strokeDashoffset={24-flight*1024}/>}</svg>}
  <RequestPanel f={f}/>
  <Pointer f={f} at={E.modelClick} x={1460} y={766}/><Pointer f={f} at={E.effortClick} x={1390} y={632}/>
  {[E.selectLow,E.selectHigh,E.selectMax,E.selectOff].map((at,i)=><Pointer key={at} f={f} at={at} x={menuX+menuW-104} y={menuY+84+[1,2,3,0][i]*94+42}/>)}
 </div>;
}
const flag={percent:90,run:E.run,jump:E.seat-19,seat:E.seat,descend:E.seat+12,bottom:E.seat+31,land:E.end+20,go:E.end+40,end:E.end};
export function Chapter4Scene(){const f=useCurrentFrame(),game=f>=E.run;return <PixelWorld mode={game?'platform':'diagram'} ground={false} coins={f>=E.seat?4:3} topic={{title:'控制思考深度',term:'CoT'}} caption={subtitleAt(timing.subtitles,f)} captionStyle={game?'band':'plaque'} highlight={/(DeepSeek Harness|Off|Low|High|Max|thinking|enabled|disabled|output_config|90%)/g} foreground={<>{!game&&(f<E.desktop?<Original f={f}/>:<Desktop f={f}/>)}{game&&<FlagRunner f={f} frames={flag}/>}<WorldWipe f={f} change={E.desktop}/><WorldWipe f={f} change={E.run}/></>}>{game&&<FlagCourse f={f} frames={flag}/>}</PixelWorld>}
export function Chapter4(){return <AbsoluteFill style={{fontWeight:D.weight}}><Audio src={`${staticFile('audio/voiceover-with-effects.wav')}?v=${mix.outputSha256.slice(0,12)}`} startFrom={timing.chapterStartFrame} endAt={timing.chapterEndFrame}/><Chapter4Scene/></AbsoluteFill>}
