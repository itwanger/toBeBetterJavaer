import React from 'react';
import {Img,staticFile} from 'remotion';
import {ease,mix,PetSprite,font} from './DshDesign';
import {pixelColors as C} from './PixelWorld';

// Editorial reconstruction of the repository's monthly-expense task.
// Frame timing is illustrative, not a measured execution speed. Values and filenames
// come from f-remote-zh-light.webp; no running stopwatch or performance claim is shown.
export function FileIcon({color=C.teal,size=48}:{color?:string;size?:number}){
 return <svg width={size} height={size} viewBox="0 0 48 48"><path d="M8 3h23l10 10v32H8Z" fill="#fff" stroke={color} strokeWidth="3"/><path d="M30 3v12h11M15 24h19M15 31h19M15 38h12" fill="none" stroke={color} strokeWidth="3"/></svg>;
}
function DeviceIcon({computer=false}:{computer?:boolean}){
 return <svg width="56" height="56" viewBox="0 0 56 56"><path d={computer?'M5 9h46v31H5ZM18 48h20M28 40v8':'M15 3h26v50H15ZM24 45h8'} fill="none" stroke="currentColor" strokeWidth="4"/></svg>;
}
export function TaskScreen({f,host='本机',menu=0,selected=false}:{f:number;host?:string;menu?:number;selected?:boolean}){
 const results=ease(f,28,17),done=f>=56;
 const progress=Math.min(1,Math.max(0,f/56));
 const rows=[['读取花销数据',8],['按类别汇总',20],['生成表格与图表',35]] as const;
 return <div style={{position:'absolute',inset:0,background:'#f1f4fc',fontFamily:font,color:'#202736',fontWeight:600}}>
  <div style={{position:'absolute',left:68,top:28,display:'flex',gap:24,alignItems:'center'}}>
   <Img src={staticFile('images/tile.svg')} style={{width:70,height:70}}/>
   <div><div style={{fontSize:45}}>10 月花销表</div><div style={{fontSize:31,color:'#536377'}}> <span style={{color:C.teal}}>●</span> {host}⌄</div></div>
  </div>
  <div style={{position:'absolute',right:80,top:48,padding:'14px 30px',borderRadius:34,background:'#fff',fontSize:36}}>✧ V4 Pro</div>
  <div style={{position:'absolute',left:80,top:150,width:1670,height:104,background:'#dfe9fd',borderRadius:30,display:'flex',alignItems:'center',padding:'0 35px',boxSizing:'border-box',fontSize:49}}>把这个月的花销做成表和图，按类别汇总。</div>
  <div style={{position:'absolute',left:80,top:290,width:mix(1670,630,results)}}>
   {rows.map(([text,at],i)=>{
    const enter=ease(f,at-8,8),checked=f>=at+11;
    return <div key={text} style={{height:98,display:'flex',alignItems:'center',gap:26,fontSize:43,opacity:enter,transform:`translateY(${mix(18,0,enter)}px)`}}>
     <div style={{width:60,height:60,background:checked?'#daeee3':'#e1e7f7',borderRadius:16,display:'grid',placeItems:'center',color:C.teal}}>{checked?'✓':<span style={{display:'inline-block',transform:`rotate(${f*11}deg)`,fontSize:50}}>◌</span>}</div>
     {text}
    </div>;
   })}
   <div style={{height:10,background:'#dbe1e8',width:'90%',marginTop:18,overflow:'hidden',borderRadius:5}}><div style={{height:'100%',width:`${progress*100}%`,background:C.teal}}/></div>
   {done&&<div style={{marginTop:24,color:C.teal,fontSize:40,opacity:ease(f,56,8)}}>✓ 已交付 2 个文件</div>}
  </div>
  {results>0&&<div style={{position:'absolute',left:mix(1820,755,results),top:280,width:990,height:410,opacity:results,background:'#fff',borderRadius:30,padding:'22px 36px',boxSizing:'border-box'}}>
   <div style={{display:'flex',alignItems:'baseline',gap:22}}><span style={{fontSize:34,color:'#536377'}}>10 月总支出</span><span style={{fontSize:68,fontWeight:750}}>¥6,842</span></div>
   {[['房租',3200,C.teal],['餐饮',1486,C.gold],['交通',612,C.orange]].map(([name,value,color],i)=><div key={name} style={{height:66,display:'flex',alignItems:'center',gap:20,fontSize:36}}>
    <span style={{width:80}}>{name}</span><div style={{width:600,height:28,background:'#f2f4f7',borderRadius:8,overflow:'hidden'}}><div style={{width:600*Number(value)/3200*ease(f,34+i*5,14),height:'100%',background:String(color)}}/></div><span style={{fontSize:33}}>¥{value}</span>
   </div>)}
   <div style={{display:'flex',gap:18,marginTop:10,opacity:ease(f,50,10),transform:`translateY(${mix(16,0,ease(f,50,10))}px)`}}>
    {['10月花销表.xlsx','10月花销趋势.png'].map((file,i)=><div key={file} style={{display:'flex',alignItems:'center',gap:10,fontSize:29,padding:'12px',background:i?'#fff4dd':'#e9f6f0',borderRadius:12}}><FileIcon size={36} color={i?C.orange:C.teal}/>{file}</div>)}
   </div>
  </div>}
  <div style={{position:'absolute',left:80,bottom:28,width:1670,height:78,background:'#fff',borderRadius:40,display:'flex',alignItems:'center',gap:28,padding:'0 30px',boxSizing:'border-box',fontSize:38,color:'#717b90'}}>＋<span>给 DSH 发消息…</span><span style={{marginLeft:'auto'}}>↑</span></div>
  {done&&<PetSprite pet="deepy-whale" state={f<125?'happy':'idle'} elapsed={f-56} x={1690} foot={714} scale={2.2}/>}
  {menu>0&&<>
   <div style={{position:'absolute',inset:0,background:`rgba(30,38,60,${menu*.22})`}}/>
   <div style={{position:'absolute',left:68,top:mix(240,143,menu),width:770,background:'#f8faff',borderRadius:34,padding:30,boxSizing:'border-box',opacity:menu,boxShadow:'0 16px 30px #26304935'}}>
    <div style={{fontSize:46,marginBottom:28}}>切换主机 <span style={{float:'right',fontSize:38,color:'#81899c'}}>×</span></div>
    {[['本机','这台手机上的 DSH'],['电脑','SSH · 已连接'],['工作室 Mac','远程 · macOS']].map(([name,desc],i)=><div key={name} style={{display:'flex',alignItems:'center',gap:26,height:126,padding:'0 22px',background:(selected?i===1:i===0)?'#dff2ea':'#fff',border:`3px solid ${(selected?i===1:i===0)?C.teal:'transparent'}`,borderRadius:22,boxSizing:'border-box',marginBottom:10}}>
     <DeviceIcon computer={i>0}/><div><div style={{fontSize:43}}>{name}</div><div style={{fontSize:29,color:'#6a7788'}}>{desc}</div></div><span style={{marginLeft:'auto',fontSize:46,color:C.teal}}>{(selected?i===1:i===0)?'✓':''}</span>
    </div>)}
   </div>
  </>}
 </div>;
}

export function RemoteWork({f}:{f:number}){
 const task=ease(f,0,18),files=ease(f,18,12);
 return <div style={{padding:'34px 38px',color:C.ink,fontFamily:font}}>
  <div style={{display:'flex',alignItems:'center',gap:20,fontSize:53,fontWeight:750}}><Img src={staticFile('images/tile.svg')} style={{width:68,height:68}}/>DSH <span style={{fontSize:30,color:C.teal,marginLeft:'auto'}}>● 已连接</span></div>
  <div style={{fontSize:39,marginTop:40,background:C.cream,padding:24,opacity:task}}>10 月花销表</div>
  <div style={{marginTop:35,display:'flex',gap:20,alignItems:'center',fontSize:32,opacity:files}}><FileIcon size={56}/>10月花销表.xlsx <span style={{color:C.teal,marginLeft:'auto'}}>✓</span></div>
  <div style={{marginTop:26,display:'flex',gap:20,alignItems:'center',fontSize:32,opacity:files}}><FileIcon size={56} color={C.orange}/>10月花销趋势.png <span style={{color:C.teal,marginLeft:'auto'}}>✓</span></div>
 </div>;
}
