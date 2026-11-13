import React from 'react';
import {Img,staticFile} from 'remotion';
import {pixelColors as C} from './PixelWorld';
import {font,ease,mix} from './DshDesign';

export const Txt=({x,y,w=600,size=48,color=C.ink,children,align='left'}:{x:number;y:number;w?:number;size?:number;color?:string;children:React.ReactNode;align?:'left'|'center'|'right'})=><div style={{position:'absolute',left:x,top:y,width:w,fontFamily:font,fontSize:size,fontWeight:680,lineHeight:1.25,color,textAlign:align}}>{children}</div>;
export function Brand({name,icon,x,y,size=190,color=C.gold,opacity=1}:{name:string;icon:string;x:number;y:number;size?:number;color?:string;opacity?:number}){
 return <div style={{position:'absolute',left:x,top:y,width:size,textAlign:'center',opacity}}><div style={{height:size,display:'grid',placeItems:'center',background:color,border:`6px solid ${C.ink}`,boxShadow:`8px 8px 0 #b49a71`,boxSizing:'border-box'}}><Img src={staticFile(icon==='dsh'?'images/tile.svg':`images/runtime/${icon}.svg`)} style={{width:size*.55,height:size*.55}}/></div><div style={{fontFamily:font,fontSize:Math.max(32,size*.22),fontWeight:750,marginTop:20,color:C.ink,whiteSpace:'nowrap'}}>{name}</div></div>;
}
export function Toggle({on,f=0}:{on:boolean;f?:number}){
 return <div style={{width:148,height:78,borderRadius:44,background:on?C.teal:'#bac2ce',padding:9,boxSizing:'border-box'}}><div style={{width:60,height:60,borderRadius:30,background:'#fff',transform:`translateX(${on?70:0}px)`}}/></div>;
}
export function Shield({x,y,size=240,blocked=false}:{x:number;y:number;size?:number;blocked?:boolean}){
 return <svg width={size} height={size} style={{position:'absolute',left:x,top:y}} viewBox="0 0 120 120" shapeRendering="crispEdges"><path d="M12 12h20V4h56v8h20v56H96v16H84v12H72v16H48V96H36V84H24V68H12Z" fill={blocked?C.orange:C.mint} stroke={C.ink} strokeWidth="5"/>{blocked?<path d="m40 38 40 40m0-40L40 78" stroke={C.ink} strokeWidth="12"/>:<path d="M42 58V40q0-22 18-22t18 22v18M34 58h52v34H34Zm26 12v12" fill="none" stroke={C.ink} strokeWidth="7"/>}</svg>;
}
export function FolderArt({x,y,w=480,color=C.gold,children}:{x:number;y:number;w?:number;color?:string;children?:React.ReactNode}){
 return <div style={{position:'absolute',left:x,top:y,width:w,height:w*.72}}><svg width={w} height={w*.72} viewBox="0 0 500 360"><path d="M8 8h170l40 48h274v296H8Z" fill={color} stroke={C.ink} strokeWidth="12"/><path d="M8 84h484" stroke={C.ink} strokeWidth="10"/></svg>{children}</div>;
}
export function Chip({x,y,w=420,h=300,color=C.gold,children}:{x:number;y:number;w?:number;h?:number;color?:string;children?:React.ReactNode}){
 return <div style={{position:'absolute',left:x,top:y,width:w,height:h,background:color,border:`8px solid ${C.ink}`,boxShadow:'10px 10px 0 #b49a71',boxSizing:'border-box'}}>
  {[0,1,2,3,4,5].map(i=><React.Fragment key={i}><i style={{position:'absolute',width:18,height:24,background:C.ink,left:30+i*(w-78)/6,top:-28}}/><i style={{position:'absolute',width:18,height:24,background:C.ink,left:30+i*(w-78)/6,bottom:-28}}/></React.Fragment>)}{children}
 </div>;
}
export function Flow({x1,y1,x2,y2,f,color=C.teal,locked=false,label}:{x1:number;y1:number;x2:number;y2:number;f:number;color?:string;locked?:boolean;label?:string}){
 const t=((Math.max(0,f)%54)/54),x=mix(x1,x2,t),y=mix(y1,y2,t);
 const dir=x2>=x1?1:-1;
 return <><svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={color} strokeWidth="7" fill="none"/><path d={`M${x2-dir*15} ${y2-14}l${dir*17} 14 ${-dir*17} 14`} stroke={color} strokeWidth="6" fill="none"/><rect x={x-14} y={y-17} width="28" height="34" fill={C.gold} stroke={C.ink} strokeWidth="4"/>{locked&&<path d={`M${x-7} ${y-1}v-12q7-13 14 0v12m-16 0h18v15h-18Z`} fill={C.ink} stroke={C.ink} strokeWidth="3"/>}</svg>{label&&<Txt x={(x1+x2)/2-180} y={(y1+y2)/2-70} w={360} size={32} align="center">{label}</Txt>}</>;
}
export function NativeHeading({children}:{children:React.ReactNode}){return <div style={{display:'flex',alignItems:'center',gap:28,fontSize:62,fontWeight:750,marginBottom:55}}><Img src={staticFile('images/tile.svg')} style={{width:86,height:86}}/>{children}</div>}
export function SettingsScreen({direct,on,fallback=false,compact=false}:{direct?:boolean;on:boolean;fallback?:boolean;compact?:boolean}){
 return <div style={{position:'absolute',inset:0,background:'#f1f4fc',padding:'65px 95px',fontFamily:font,color:C.ink,boxSizing:'border-box'}}>
  <NativeHeading>{compact?'远程主机':'开发者选项'}</NativeHeading>
  <div style={{background:'#fff',borderRadius:38,padding:'56px 52px',display:'flex',alignItems:'center',gap:30}}><div style={{fontSize:72,fontWeight:700,flex:1}}>{compact?'精简历史':'直接启动本机引擎'}</div><Toggle on={on}/></div>
  <div style={{fontSize:43,color:'#617085',marginTop:35}}>{compact?'支持的 DSH Remote 主机 · 重连后生效':'默认关闭'}</div>
  {fallback&&<div style={{marginTop:62,background:C.mint,borderRadius:28,padding:'30px 45px',fontSize:67,fontWeight:750}}>✓ 已回退 · PRoot 兼容启动</div>}
 </div>;
}
