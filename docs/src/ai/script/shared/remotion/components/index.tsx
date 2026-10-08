import React from 'react';
import {AbsoluteFill, interpolate, spring, useVideoConfig} from 'remotion';
// 全片色调：暖米色背景，蓝色主色，铁锈橙强调，绿色只表示正确或通过，深色写正文，灰色写次要信息。
export const C = {
  bg:'#f7f2e8', card:'#fefdf9', ink:'#232838', blue:'#2150b4', rust:'#b8532a', green:'#2f7d4f', gray:'#6b6f7d', faint:'#a9aeba',
  line:'#d8d1c3', shadow:'#dcdee0', track:'#e6e9f0', soft:'#a7b6db', select:'#dce4f6',
};
export const FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
export const MONO = 'ui-monospace, "SF Mono", Menlo, "PingFang SC", monospace';
export const SERIF = '"Times New Roman", "Songti SC", serif';
// 卡片：直角、3px 蓝色细边、无模糊的灰色偏移阴影，底色比背景更白。
export const card: React.CSSProperties = {
  background:C.card, border:`3px solid ${C.blue}`, borderRadius:0, boxShadow:`16px 16px 0 ${C.shadow}`, boxSizing:'border-box', color:C.ink,
};
export const enter = (frame:number, fps=30) => spring({frame: Math.max(0,frame), fps, config:{damping:20,stiffness:210}});
export const clamp = (frame:number,a:number,b:number) => interpolate(frame,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const Label: React.FC<{children:React.ReactNode;color?:string}> = ({children,color=C.ink}) => <div style={{fontSize:25,fontWeight:700,letterSpacing:2,color}}>{children}</div>;
export const Stage:React.FC<{children:React.ReactNode}> = ({children}) => <AbsoluteFill style={{background:C.bg,fontFamily:FONT,color:C.ink}}>{children}</AbsoluteFill>;
export const ChapterStrip:React.FC<{active?:number;brand:React.ReactNode;chapters:string[]}> = ({active=0,brand,chapters}) => <div style={{position:'absolute',top:48,left:96,right:96,display:'flex',gap:14,alignItems:'center'}}>
  <div style={{fontSize:27,fontWeight:900,marginRight:'auto',letterSpacing:-1}}>{brand}</div>
  {chapters.map((name,i)=><div key={name} style={{fontSize:23,fontWeight:700,padding:'13px 25px',border:`2px solid ${i===active?C.ink:C.line}`,borderRadius:999,background:i===active?C.ink:'transparent',color:i===active?'white':i<active?C.faint:C.gray}}>{String(i+1).padStart(2,'0')}　{name}</div>)}
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
