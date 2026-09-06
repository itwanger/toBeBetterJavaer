import React from 'react';
import {AbsoluteFill, interpolate, spring, useVideoConfig} from 'remotion';
export const C = {bg:'#ededed', ink:'#0a0a0a', red:'#c02020', blue:'#2d5be3', green:'#16a34a', orange:'#e07b12', gray:'#8a8a8a'};
export const FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
export const card: React.CSSProperties = {background:'white', border:`4px solid ${C.ink}`, borderRadius:32, boxShadow:'12px 12px 0 rgba(10,10,10,.14)'};
export const enter = (frame:number, fps=30) => spring({frame: Math.max(0,frame), fps, config:{damping:20,stiffness:210}});
export const clamp = (frame:number,a:number,b:number) => interpolate(frame,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const Label: React.FC<{children:React.ReactNode;color?:string}> = ({children,color=C.ink}) => <div style={{fontSize:25,fontWeight:700,letterSpacing:2,color}}>{children}</div>;
export const Stage:React.FC<{children:React.ReactNode}> = ({children}) => <AbsoluteFill style={{background:C.bg,fontFamily:FONT,color:C.ink}}>{children}</AbsoluteFill>;
export const ChapterStrip:React.FC<{active?:number;brand:React.ReactNode;chapters:string[]}> = ({active=0,brand,chapters}) => <div style={{position:'absolute',top:48,left:96,right:96,display:'flex',gap:14,alignItems:'center'}}>
  <div style={{fontSize:27,fontWeight:900,marginRight:'auto',letterSpacing:-1}}>{brand}</div>
  {chapters.map((name,i)=><div key={name} style={{fontSize:23,fontWeight:700,padding:'13px 25px',border:`2px solid ${i===active?C.ink:'#ccc'}`,borderRadius:999,background:i===active?C.ink:'transparent',color:i===active?'white':i<active?C.gray:'#555'}}>{String(i+1).padStart(2,'0')}　{name}</div>)}
</div>;
export const widthOf = (text:string) => [...text].reduce((sum,ch)=>sum+(/[\x00-\x7F]/.test(ch)?0.58:1),0);
export function subtitleLines(text:string):string[]{
  const cleaned=text.replace(/——/g,'').trim();
  const chunks=cleaned.match(/[^，。？！：；、,!?;]+[，。？！：；、,!?;]?/g)??[cleaned];
  const lines:string[]=[]; let line='';
  for(const chunk of chunks){
    if(widthOf(line+chunk)>34 && line){lines.push(line);line='';}
    if(widthOf(chunk)>34){
      for(const char of chunk){if(widthOf(line+char)>34){lines.push(line);line='';}line+=char;}
    }else line+=chunk;
  }
  if(line)lines.push(line);
  return lines;
}
export const Arrow:React.FC<{width?:number;color?:string}> = ({width=130,color=C.ink}) => <svg width={width} height={38} viewBox={`0 0 ${width} 38`}><path d={`M2 19 H${width-14} M${width-30} 5 L${width-12} 19 L${width-30} 33`} stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const Popped:React.FC<{frame:number;delay?:number;children:React.ReactNode;style?:React.CSSProperties}> = ({frame,delay=0,children,style}) => {
  const {fps}=useVideoConfig();const p=enter(frame-delay,fps);
  return <div style={{...style,opacity:frame<delay?0:1,transform:`translateY(${(1-p)*20}px) scale(${.96+.04*p})`}}>{children}</div>;
};

export const SubtitleLine:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',bottom:106,left:96,right:96,display:'flex',justifyContent:'center'}}><div style={{background:C.ink,color:'white',padding:'16px 34px',borderRadius:18,fontSize:40,fontWeight:600,lineHeight:1.45,whiteSpace:'nowrap',maxWidth:1650}}>{children}</div></div>;
