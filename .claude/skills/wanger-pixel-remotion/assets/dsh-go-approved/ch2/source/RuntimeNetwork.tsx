import React from 'react';
import {Img,staticFile} from 'remotion';
import timing from '../../assets/references/ch2-phrase-timing.json';
import {pixelColors as C} from './PixelWorld';
import {ease,mix,font} from './DshDesign';
import {Device,AppHeader,Logo,Computer,Spinner,ui} from './RuntimeExperience';
import {FileIcon} from './GoTask';
const E=timing.events;
export const REMOTE={phone:{x:32,y:112,w:460,h:810},computer:{x:1120,y:205,w:760},left:510,right:1100};
export function PixelWhale({size=320}:{size?:number}){return <Img src={staticFile('images/dsh/pixel-whale-v1.png')} style={{width:size,height:size,imageRendering:'pixelated',objectFit:'contain'}}/>;}
function Packet({x,y,color=C.gold,locked=false}:{x:number;y:number;color?:string;locked?:boolean}){return <g transform={`translate(${x} ${y})`}><rect x="-23" y="-20" width="46" height="40" rx="3" fill={color} stroke={C.ink} strokeWidth="4"/>{locked?<path d="M-9-2v-9q9-18 18 0v9m-21 0h24v17h-24Z" fill={C.ink} stroke={C.ink} strokeWidth="3"/>:<path d="M-12-7h24m-24 13h18" stroke={C.ink} strokeWidth="4"/>}</g>;}
export function LocalAndModel({f}:{f:number}){
 const t=ease(f,E.cloud,22),reply=f>=E.cloud+59;
 const x1=720,x2=1185,request=ease(f,E.cloud+17,20),answer=ease(f,E.cloud+39,20);
 return <>
 <Device x={32} y={mix(112,180,t)} w={mix(1856,680,t)} h={mix(810,700,t)}><AppHeader title="DSH Go" subtitle="本机引擎" small={t>.5}/><div style={{padding:mix(40,24,t)}}>
  <div style={{display:'flex',alignItems:'center',gap:25,background:'#fff',padding:22,borderRadius:20}}><Logo size={mix(110,64,t)}/><div style={{fontSize:mix(46,34,t)}}>运行环境<div style={{fontSize:mix(31,25,t),color:ui.sub,marginTop:12}}>Ubuntu · Node.js</div></div><strong style={{marginLeft:'auto',fontSize:mix(88,49,t),whiteSpace:'nowrap'}}>约 1 GB</strong></div>
  <div style={{marginTop:24,fontSize:mix(38,32,t),color:C.teal}}>● Agent 引擎运行中</div>
  <div style={{marginTop:22,background:ui.blue,padding:22,borderRadius:18,fontSize:mix(38,33,t),lineHeight:1.4}}>把花销做成表和图<div style={{fontSize:mix(32,28,t),marginTop:24,color:ui.sub}}>{t===0?'读取文件 → 调用工具 → 交付文件':reply?'收到模型结果，继续执行工具':'正在请求模型…'}</div></div>
  <div style={{display:'flex',gap:25,marginTop:18,alignItems:'center',fontSize:29}}><FileIcon size={52}/><FileIcon size={52} color={C.orange}/><span>{reply?'继续写入文件':'本机文件与工具'}</span></div>
 </div></Device>
 {t>0&&<><div style={{position:'absolute',left:mix(1940,1195,t),top:180,width:680,height:700,background:C.gold,border:`8px solid ${C.ink}`,boxShadow:'8px 10px 0 #b69c75',boxSizing:'border-box',opacity:t,textAlign:'center'}}><div style={{fontSize:56,fontWeight:700,padding:'27px 0',borderBottom:`6px solid ${C.ink}`}}>DeepSeek Flash</div><div style={{marginTop:20,transform:`translateY(${Math.sin((f-E.cloud)/12)*5}px)`}}><PixelWhale size={380}/></div><div style={{fontSize:40,marginTop:7}}>云端模型</div><div style={{fontSize:30,marginTop:20,color:C.teal}}>{reply?'模型结果已返回':f>=E.cloud+39?'正在返回结果':'处理推理请求'}</div></div>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:t,pointerEvents:'none'}}><path d={`M${x1} 425H${x2}m-20-15 20 15-20 15`} fill="none" stroke={C.teal} strokeWidth="8"/><path d={`M${x2} 650H${x1}m20-15-20 15 20 15`} fill="none" stroke={C.orange} strokeWidth="8"/>{request>0&&request<1&&<Packet x={mix(x1,x2,request)} y={425}/>} {answer>0&&answer<1&&<Packet x={mix(x2,x1,answer)} y={650} color={C.mint}/>}</svg><div style={{position:'absolute',left:750,top:350,width:400,textAlign:'center',fontSize:38,opacity:t}}>推理请求</div><div style={{position:'absolute',left:750,top:690,width:400,textAlign:'center',fontSize:38,opacity:t}}>模型结果</div></>}
 </>;
}
export function RemoteHarness({f}:{f:number}){const done=f>=100;return <div style={{position:'absolute',inset:0,background:'#141517',color:'#f0f2f4',fontFamily:font,fontWeight:600}}><div style={{position:'absolute',left:0,top:0,bottom:0,width:155,background:'#202123',padding:'25px 15px',boxSizing:'border-box'}}><div style={{fontSize:28}}>deepseek</div><div style={{fontSize:17,marginTop:7}}>HARNESS</div>{['⊕ 新会话','♧ 插件','◷ 任务','⌑ 工作区'].map(s=><div key={s} style={{fontSize:25,marginTop:35,color:'#bfc6cc'}}>{s}</div>)}<div style={{fontSize:26,background:'#34373b',padding:15,marginTop:28,borderRadius:14}}>花销表</div></div><div style={{position:'absolute',left:183,right:28,top:28,bottom:20}}><div style={{fontSize:26,color:'#b7c1cb'}}>默认工作区 <span style={{float:'right'}}>标准模式⌄</span></div><div style={{background:'#2b3647',borderRadius:18,padding:22,fontSize:32,lineHeight:1.4,marginTop:24}}>把这个月的花销做成表和图，按类别汇总。</div><div style={{fontSize:31,color:'#b1e7ce',marginTop:25}}>{done?'✓ 已交付 2 个文件':<><Spinner f={f}/> 正在执行任务</>}</div>{['读取花销数据','按类别汇总','生成表格与图表'].map((s,i)=><div key={s} style={{fontSize:30,color:f>i*30?'#d1e4da':'#818d98',marginTop:12}}>{f>i*30+25?'✓':'›'} {s}</div>)}{done&&<div style={{marginTop:20,padding:'12px 20px',borderRadius:12,background:'#254b40',fontSize:25,lineHeight:1.45}}>▧ 10月花销表.xlsx<br/>▧ 10月花销趋势.png</div>}<div style={{position:'absolute',bottom:0,left:0,right:0,fontSize:27,background:'#2b2d30',padding:'15px 18px',borderRadius:16,color:'#b7bfc8'}}>＋ 继续任务… <span style={{float:'right'}}>↑</span></div></div></div>;}
function along(points:number[][],progress:number){let length=0;const lengths=points.slice(1).map((p,i)=>{const n=Math.hypot(p[0]-points[i][0],p[1]-points[i][1]);length+=n;return n});let d=progress*length;for(let i=0;i<lengths.length;i++){if(d<=lengths[i])return [mix(points[i][0],points[i+1][0],d/lengths[i]),mix(points[i][1],points[i+1][1],d/lengths[i])];d-=lengths[i];}return points[points.length-1];}
export function ConnectionStage({f}:{f:number}){
 const relay=f>=E.relay,secure=f>=E.encrypted,progress=((f-E.ssh)%76)/76;
 const points=relay?[[510,470],[610,470],[610,695],[990,695],[990,470],[1100,470]]:[[510,470],[1100,470]];
 const [x,y]=along(points,progress),[rx,ry]=along(points,1-progress);
 return <><svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 {relay&&<path d="M510 420H1100" stroke="#bdac91" strokeWidth="6" strokeDasharray="16 14"/>}
 <path d={'M'+points.map(p=>p.join(' ')).join('L')} fill="none" stroke={C.teal} strokeWidth="9" strokeLinejoin="round"/>
 {!relay&&<path d="M1100 610H510m20-15-20 15 20 15" fill="none" stroke={C.orange} strokeWidth="8"/>}<path d="m1080 455 20 15-20 15" fill="none" stroke={C.teal} strokeWidth="8"/>
 <Packet x={x} y={y} locked={secure}/><Packet x={rx} y={relay?ry:610} color={C.mint} locked={secure}/>
 </svg><div style={{position:'absolute',left:530,top:240,width:550,textAlign:'center',fontSize:49,fontWeight:700}}>{secure?'DSH Remote':'SSH 隧道'}</div><div style={{position:'absolute',left:530,top:320,width:550,textAlign:'center',fontSize:34,color:relay?C.orange:C.teal}}>{relay?'直连未通 → 切换中继':secure?(f>=E.p2p?'P2P 直连':f>=E.routing?'局域网直连':'端到端加密'):'加密连接'}</div>
 {!relay&&<><div style={{position:'absolute',left:570,top:405,fontSize:32}}>请求</div><div style={{position:'absolute',left:930,top:650,fontSize:32}}>执行结果</div></>}
 {relay&&<div style={{position:'absolute',left:665,top:515,width:270,textAlign:'center'}}><div style={{background:C.navy,border:`7px solid ${C.ink}`,padding:18,boxShadow:'8px 8px 0 #b69c75'}}>{[0,1,2].map(i=><div key={i} style={{height:52,background:C.paper,border:`4px solid ${C.ink}`,marginBottom:i===2?0:12,display:'flex',alignItems:'center',gap:10,padding:'0 12px'}}><i style={{width:14,height:14,background:(Math.floor(f/9)+i)%3?C.teal:C.gold}}/><i style={{width:14,height:14,background:C.teal}}/><div style={{height:7,width:110,background:'#b8c9be',marginLeft:8}}/></div>)}</div><div style={{fontSize:35,marginTop:24}}>中继服务器</div><div style={{fontSize:27,color:C.teal,marginTop:10}}>转发加密数据</div></div>}
 </>;
}
