import React from 'react';
import {PixelWhale} from './DeepSeekIdentity';
import {ResultSymbol} from './PixelSymbols';
import {D} from './Chapter2Design';
import timing from '../../assets/references/ch3-phrase-timing.json';
const E=timing.events;
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ramp=(f:number,a:number,d=18)=>{const t=clamp((f-a)/d);return t*t*(3-2*t)};
const typed=(text:string,f:number,at:number,duration:number)=>text.slice(0,Math.floor(clamp((f-at)/duration)*text.length));
const ink='#272731', muted='#c9c4c6',mint='#91dcc1',gold='#ffcb54';
const base:React.CSSProperties={position:'absolute',boxSizing:'border-box'};
function Cursor({f}:{f:number}){return <span style={{display:'inline-block',width:9,height:47,marginLeft:9,verticalAlign:'middle',background:gold,opacity:f%20<13?1:0}}/>}
function Chevron({open=false}:{open?:boolean}){return <svg width="42" height="42" viewBox="0 0 42 42" style={{transform:`rotate(${open?90:0}deg)`,flexShrink:0}}><path d="M13 6L29 21 13 36" fill="none" stroke="currentColor" strokeWidth="6"/></svg>}
function Spark(){return <svg width="48" height="48" viewBox="0 0 48 48"><path d="M18 0h12v12h12v12H30v12H18V24H6V12h12ZM36 34h8v8h-8Z" fill={mint}/></svg>}
function Pointer({f,at,x,y}:{f:number;at:number;x:number;y:number}){const q=clamp((f-at)/16);if(f<at-10||f>at+17)return null;return <svg style={{...base,left:x,top:y,overflow:'visible',pointerEvents:'none'}} width={60} height={74} viewBox="0 0 60 74"><path d="M4 4v51l15-13 14 27 13-7-14-26 24 1Z" fill={D.paper} stroke={ink} strokeWidth={4}/>{f>=at&&<circle cx={4} cy={4} r={18+40*q} fill="none" stroke={gold} strokeWidth={6} opacity={1-q}/>}</svg>}
function Shell({f,children}:{f:number;children:React.ReactNode}){
 const complete=f>=E.folds;const early=f<E.modern;
 return <div style={{...base,left:24,top:94,width:1866,height:834,border:`4px solid ${ink}`,background:ink,color:D.paper,fontFamily:D.font,fontWeight:680,overflow:'hidden'}}>
  <div style={{height:82,background:'#eee9db',color:ink,display:'flex',alignItems:'center',padding:'0 28px',gap:20,borderBottom:`4px solid ${ink}`}}>
   <div style={{display:'flex',gap:10,marginRight:10}}>{['#f2734b',gold,'#128577'].map(c=><i key={c} style={{width:12,height:12,background:c}}/>)}</div><PixelWhale size={52}/><span style={{fontSize:52}}>DSH</span>
   <span style={{marginLeft:'auto',fontSize:46,color:early?'#75676d':'#087e73'}}>{early?'早期模型':complete?'已完成':'DeepSeek · 深度思考'}</span>
  </div>
  <div style={{...base,left:0,top:82,width:'100%',height:638,overflow:'hidden'}}>{children}</div>
  <div style={{...base,left:28,right:28,bottom:20,height:82,border:'3px solid #585866',background:'#34343e',display:'flex',alignItems:'center',padding:'0 24px',gap:22,color:muted,fontSize:40}}><span style={{fontSize:48}}>＋</span><span>发送消息</span><span style={{marginLeft:'auto',color:mint,fontSize:38}}>DeepSeek</span><div style={{width:50,height:50,background:complete?'#656575':'#779eff',display:'grid',placeItems:'center'}}>{complete?'↑':<i style={{width:20,height:20,background:D.paper}}/>}</div></div>
 </div>;
}
function Bubble({f,early=false}:{f:number;early?:boolean}){
 const rise=early?ramp(f,E.derive,20):1;
 const adding=early&&f>=E.append;
 const h=early?150-50*rise:90;
 const y=early?182-158*rise:22;
 return <div style={{...base,top:y,left:early?80-34*rise:1000,right:early?80:46,height:h,background:'#3d3d49',borderLeft:`6px solid ${gold}`,padding:'16px 28px',fontSize:early?54-8*rise:46,lineHeight:1.45,display:'flex',alignItems:'center',gap:28}}>
  {early&&<span style={{color:gold,whiteSpace:'nowrap'}}>提示词</span>}
  <div>了解 CoT 思维链吗？{adding&&<span style={{display:rise>.5?'inline':'block',marginLeft:rise>.5?22:0,color:gold}}>{typed('让我们一步步思考',f,E.append,42)}{f<E.derive&&<Cursor f={f}/>}</span>}</div>
 </div>;
}
function SectionTitle({text,tag,color=mint}:{text:string;tag?:string;color?:string}){return <div style={{display:'flex',alignItems:'center',gap:18,color,fontSize:48,height:62}}><Spark/><span>{text}</span>{tag&&<span style={{marginLeft:'auto',fontFamily:D.mono,color,fontSize:44,border:`3px solid ${color}`,padding:'0 16px'}}>{tag}</span>}</div>}
function Early({f}:{f:number}){
 const show=f>=E.derive,answer=f>=E.mixed;
 return <><Bubble f={f} early/>{show&&<div style={{...base,top:150+220*(1-ramp(f,E.derive,20)),left:46,right:46,padding:'18px 28px',background:'#32323d',borderLeft:`6px solid ${mint}`,opacity:ramp(f,E.derive,12)}}>
  <SectionTitle text="回复"/>
  <div style={{fontSize:52,lineHeight:1.5,color:mint,marginTop:10}}>{typed('先说明 CoT 的定义，再解释中间步骤的作用。',f,E.derive,47)}{!answer&&<Cursor f={f}/>}</div>
  {answer&&<div style={{marginTop:22,paddingTop:20,borderTop:'3px solid #5b5965',fontSize:52,lineHeight:1.5,color:D.paper}}>{typed('CoT（思维链）：先展开推导步骤，再给出结论。',f,E.mixed,50)}{f<E.mixed+50&&<Cursor f={f}/>}</div>}
 </div>}</>;
}
function Thinking({f}:{f:number}){
 const failed=f>=E.reject&&f<E.retry;
 const retry=f>=E.retry;
 const at=retry?E.retry:f>=E.hypothesis?E.hypothesis:E.modern;
 const body=retry?'补充中间步骤，再给出定义。':f>=E.hypothesis?'只给结论，能说清 CoT 的区别吗？':'先解释定义，再说明推导步骤的作用。';
 return <><Bubble f={f}/><div style={{...base,top:142,left:46,right:46,padding:'20px 28px',background:'#303b3b',borderLeft:`6px solid ${mint}`}}>
  <SectionTitle text="思考"/><div style={{marginTop:16,fontSize:52,lineHeight:1.5,minHeight:84}}>{typed(body,f,at,retry?20:45)}<Cursor f={f}/></div>
  {f>=E.hypothesis&&<div style={{display:'flex',alignItems:'center',gap:24,marginTop:24,paddingTop:20,borderTop:'3px solid #576968',color:failed?D.coral:mint,fontSize:48}}><span style={{background:failed?'#67463f':'#245b52',padding:'6px 18px'}}>{retry?'重新推导':failed?'推翻假设':f>=E.verify?'验算':'提出假设'}</span>{f>=E.verify&&<><svg width={60} height={60} viewBox="0 0 60 60">{f<E.reject?<g fill="none" stroke={mint} strokeWidth={6}><circle cx={25} cy={24} r={17}/><path d="M37 37l17 17"/></g>:<ResultSymbol x={4} y={4} size={52} correct={retry}/>}</svg><span>{retry?'补全推导步骤':failed?'仅有结论，还不够':'核对定义与解释'}</span></>}</div>}
 </div><div style={{...base,left:80,top:530,color:mint,fontSize:46,display:'flex',alignItems:'center',gap:22}}><Spark/>深度求索中 · {Math.max(1,Math.floor((f-E.modern)/30)+1)} 秒</div></>;
}
function Blocks({f}:{f:number}){
 const separate=ramp(f,E.split,26),modern=f>=E.split;
 return <><Bubble f={f}/><div style={{...base,left:46,right:46,top:142,padding:'16px 28px',background:'#303b3b',borderLeft:`6px solid ${mint}`}}>
  <SectionTitle text={modern?'思考':'回复'} tag={f>=E.reasoning?'reasoning':undefined}/>
  <div style={{fontSize:52,lineHeight:1.45,marginTop:10,color:mint}}>先解释定义，再说明推导步骤的作用。</div>
 </div><div style={{...base,left:46,right:46,top:300+40*separate,padding:'16px 28px',background:modern?'#393740':'#303b3b',borderLeft:`6px solid ${modern?gold:mint}`,minHeight:190}}>
  {modern&&<SectionTitle text="回答" tag={f>=E.text?'text':undefined} color={gold}/>}
  <div style={{fontSize:52,lineHeight:1.45,marginTop:10}}>CoT（思维链）：先展开推导步骤，再给出结论。</div>
 </div></>;
}
function Fold({f}:{f:number}){
 const a=ramp(f,E.middle,16),b=ramp(f,E.inner,16),c=ramp(f,E.inner+10,10);
 const h=98+92*a+90*b+98*c;
 return <><div style={{...base,left:46,right:46,top:24,height:h,background:'#34343f',borderLeft:`6px solid ${mint}`,padding:'12px 24px',overflow:'hidden'}}>
  <div style={{height:70,display:'flex',gap:22,alignItems:'center',fontSize:54,color:mint}}><Chevron open={a>.5}/>已完成，用时 7 秒</div>
  {a>0&&<div style={{...base,left:45,right:24,top:100,opacity:a,borderLeft:'6px solid #647e76',paddingLeft:24}}>
   <div style={{display:'flex',alignItems:'center',gap:22,height:70,fontSize:52}}><Chevron open={b>.5}/>已完成分析</div>
   {b>0&&<div style={{marginLeft:42,marginTop:18,opacity:b}}><div style={{display:'flex',alignItems:'center',gap:22,fontSize:52}}><Chevron open={c>.5}/>思考</div>{c>0&&<div style={{fontSize:50,lineHeight:1.4,marginTop:18,paddingLeft:64,color:mint,opacity:c}}>{typed('先解释定义，再说明推导步骤的作用。',f,E.inner+12,12)}</div>}</div>}
  </div>}
 </div><div style={{...base,left:46,right:46,top:24+h+24,padding:'12px 28px',background:'#393740',borderLeft:`6px solid ${gold}`}}><SectionTitle text="回答" color={gold}/><div style={{fontSize:50,lineHeight:1.4,marginTop:6}}>CoT（思维链）：先展开推导步骤，再给出结论。</div></div>
 <Pointer f={f} at={E.middle} x={92} y={70}/><Pointer f={f} at={E.inner} x={136} y={150}/><Pointer f={f} at={E.inner+10} x={178} y={238}/></>;
}
export function Chapter3Harness({f}:{f:number}){return <Shell f={f}>{f<E.modern?<Early f={f}/>:f<E.protocol?<Thinking f={f}/>:f<E.folds?<Blocks f={f}/>:<Fold f={f}/>}</Shell>}
