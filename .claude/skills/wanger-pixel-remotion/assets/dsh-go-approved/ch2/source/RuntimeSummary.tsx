import React from 'react';
import timing from '../../assets/references/ch2-phrase-timing.json';
import {pixelColors as C} from './PixelWorld';
import {ease,mix,font} from './DshDesign';
import {AppHeader,Device,Computer,Switch,Tap,Spinner,ui} from './RuntimeExperience';
import {REMOTE,RemoteHarness} from './RuntimeNetwork';
const E=timing.events;
const facts=['已按类别汇总','总支出 ¥6,842','已生成表格和图表'];
function SummaryWorkspace({f,width,compact=false}:{f:number;width:number;compact?:boolean}){
 const t=ease(f,E.records+55,40),sourceW=mix(width-56,Math.min(550,width*.46),t),summaryX=sourceW+68;
 if(compact)return <div style={{position:'absolute',inset:0,padding:35,color:'#edf2f1',fontFamily:font,lineHeight:1.2,boxSizing:'border-box'}}><div style={{fontSize:34,color:'#b6c2cd'}}>工作室 Mac · 10月花销表</div><div style={{background:'#244b40',padding:30,borderRadius:18,marginTop:30}}><div style={{fontSize:42,color:'#a8e3c7'}}>历史摘要</div>{facts.map(s=><div key={s} style={{fontSize:37,marginTop:24}}>✓ {s}</div>)}</div><div style={{fontSize:30,marginTop:20,color:'#bac5cc'}}>▧ 原始工具记录保留在电脑</div><div style={{position:'absolute',bottom:28,left:35,right:35,fontSize:30,padding:20,background:'#2c2f33',borderRadius:16}}>＋ 继续任务…</div></div>;
 return <div style={{position:'absolute',inset:0,color:'#edf2f1',fontFamily:font,lineHeight:1.15}}><div style={{padding:'18px 28px',fontSize:31,color:'#bfcbd3'}}>10 月花销表 <span style={{float:'right'}}>工作室 Mac · 历史工具记录</span></div>
 <div style={{position:'absolute',left:28,top:76,width:sourceW}}>
  <div style={{background:'#252b30',borderRadius:14,padding:'14px 24px',boxSizing:'border-box',height:146}}><div style={{fontSize:28,color:'#a9d8c7'}}>工具参数</div><div style={{fontSize:27,marginTop:12}}>读取 10月花销.csv</div><div style={{fontSize:26,marginTop:8}}><span style={{background:f>E.records+36?'#31564c':'transparent'}}>按类别汇总 · 生成图表</span></div></div>
  <div style={{background:'#252b30',borderRadius:14,padding:'14px 24px',boxSizing:'border-box',height:178,marginTop:15}}><div style={{fontSize:28,color:'#a9d8c7'}}>长输出</div><div style={{fontSize:26,marginTop:12}}>房租 3200 · 餐饮 1486 · 交通 612</div><div style={{fontSize:26,marginTop:8}}><span style={{background:f>E.records+48?'#31564c':'transparent'}}>总支出 ¥6,842</span> · …</div><div style={{fontSize:25,marginTop:8}}>10月花销表.xlsx / 10月花销趋势.png</div></div>
 </div>
 {t>0&&<div style={{position:'absolute',left:summaryX,top:76,width:Math.max(1,width-summaryX-28),height:339,background:'#245044',borderRadius:14,padding:26,boxSizing:'border-box',opacity:t,overflow:'hidden'}}><div style={{fontSize:37,color:'#a9e8cd'}}>历史摘要</div>{facts.map((s,i)=><div key={s} style={{fontSize:34,whiteSpace:'nowrap',marginTop:27,opacity:ease(f,E.records+70+i*16,12)}}>✓ {s}</div>)}</div>}
 {facts.map((s,i)=>{const p=ease(f,E.records+55+i*16,17);return p>0&&p<1?<div key={s} style={{position:'absolute',left:mix(200,summaryX+25,p),top:mix(220+i*30,130+i*65,p),background:C.mint,color:C.ink,padding:'10px 18px',borderRadius:10,fontSize:29,whiteSpace:'nowrap'}}>{s}</div>:null;})}
 <div style={{position:'absolute',left:30,bottom:12,fontSize:23,color:'#a6b3ba'}}>原始记录保留 · 只发送摘要副本</div>
 </div>;
}
function PhoneSummary({received,f}:{received:boolean;f:number}){return <><AppHeader title="10 月花销表" subtitle="● Mac · Remote" small/><div style={{padding:25}}><div style={{padding:20,background:ui.blue,borderRadius:18,fontSize:28}}>继续这个任务</div>{received?<div style={{marginTop:28,padding:25,background:'#dcefe6',borderRadius:18}}><div style={{fontSize:31,color:C.teal}}>历史摘要已接收</div>{facts.map(s=><div key={s} style={{fontSize:28,marginTop:25,lineHeight:1.5}}>✓ {s}</div>)}</div>:<div style={{marginTop:35,fontSize:29,color:C.teal}}><Spinner f={f}/> 同步历史…</div>}{received&&<div style={{marginTop:34,fontSize:29}}>● 上下文已接续</div>}</div><div style={{position:'absolute',bottom:28,left:22,right:22,padding:20,background:'#fff',borderRadius:30,fontSize:26,color:ui.sub}}>＋ 给 DSH 发消息… ↑</div></>;}
export function SummaryStage({f}:{f:number}){
 const zoom=ease(f,E.records,22)*(1-ease(f,E.transfer,24));
 const returnT=ease(f,E.transfer,24),received=f>=E.transfer+24;
 const focus=ease(f,E.compact,12)*(1-ease(f,E.records,18));
 const baseW=mix(900,1240,zoom),baseH=mix(680,520,zoom);
 const computerX=mix(REMOTE.computer.x,32,zoom),computerY=mix(REMOTE.computer.y,112,zoom),computerW=mix(REMOTE.computer.w,1856,zoom);
 return <>
 <div style={{opacity:1-zoom}}><Device {...REMOTE.phone} portrait><PhoneSummary received={received} f={f}/></Device></div>
 <div style={{opacity:1-focus*.2}}><Computer x={computerX} y={computerY} w={computerW} baseWidth={baseW} baseHeight={baseH} stand={1-zoom}>{f<E.records?<RemoteHarness f={130}/>:<SummaryWorkspace f={f} width={baseW-18} compact={returnT>.82}/>}</Computer></div>
 {focus>0&&<div style={{position:'absolute',left:60,top:230,width:mix(380,850,focus),padding:35,background:'#f9fbff',borderRadius:24,boxShadow:'0 12px 38px #25263b35',opacity:focus,boxSizing:'border-box'}}><div style={{fontSize:37,color:ui.sub}}>工作室 Mac · DSH Remote</div><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:52,marginTop:35,padding:'20px 0'}}>精简历史<Switch on={f>=E.compactOn}/></div><div style={{fontSize:33,marginTop:25,color:ui.sub}}>重新连接后生效</div><Tap x={700} y={130} f={f} at={E.compactOn-6}/></div>}
 {returnT>0&&returnT<1&&<div style={{position:'absolute',left:mix(1410,80,returnT),top:mix(340,360,returnT),width:mix(420,350,returnT),background:C.mint,border:`5px solid ${C.ink}`,borderRadius:14,padding:24,boxSizing:'border-box',fontSize:30,boxShadow:'8px 8px 0 #b69c75'}}>历史摘要{facts.map(s=><div key={s} style={{marginTop:13,fontSize:25}}>✓ {s}</div>)}</div>}
 {received&&<div style={{position:'absolute',left:545,top:430,width:510,textAlign:'center'}}><div style={{fontSize:42,color:C.teal}}>摘要已同步</div><svg width="510" height="100"><path d="M490 50H20m20-16L20 50l20 16" stroke={C.teal} strokeWidth="8" fill="none"/></svg><div style={{fontSize:31,lineHeight:1.5}}>后续任务继续</div></div>}
 </>;
}
