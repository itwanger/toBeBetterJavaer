import React from 'react';
import {Img, staticFile} from 'remotion';
import {pixelColors as C} from './PixelWorld';
import deepy from '../../assets/references/deepy-pack.json';
import girl from '../../assets/references/girl-pack.json';

export {UI_FONT as font} from './Typography';
import {UI_FONT as font} from './Typography';
export const ease=(f:number,a:number,n=18)=>{const p=Math.max(0,Math.min(1,(f-a)/n));return p*p*(3-2*p)};
export const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
export const Tag=({children,color=C.gold,style={}}:{children:React.ReactNode;color?:string;style?:React.CSSProperties})=><div style={{position:'absolute',padding:'14px 26px',background:color,border:`5px solid ${C.ink}`,boxShadow:`8px 8px 0 #b49a71`,fontFamily:font,fontSize:48,fontWeight:680,color:C.ink,...style}}>{children}</div>;

// One phone shell; native UI stays antialiased and undistorted inside it.
export function Phone({x,y,w,children,screen}:{x:number;y:number;w:number;children?:React.ReactNode;screen?:React.ReactNode}){
 const h=w*824/1830;
 return <div data-go-phone="true" style={{position:'absolute',left:x,top:y,width:w,height:h,boxSizing:'content-box',background:C.ink,border:`16px solid ${C.ink}`,borderRadius:40,boxShadow:`10px 14px 0 #b69c75`,overflow:'hidden'}}>
  {screen?<div style={{position:'absolute',left:0,top:0,width:1830,height:824,transformOrigin:'0 0',transform:`scale(${w/1830})`}}>{screen}</div>:<Img src={staticFile('images/phone_chat_light.png')} style={{width:'100%',height:'100%'}}/>}{children}
 </div>;
}
type Anim='idle'|'typing'|'happy'|'notification';
export function PetSprite({pet,state,elapsed,x,foot,scale}:{pet:'deepy-whale'|'whale-girl';state:Anim;elapsed:number;x:number;foot:number;scale:number}){
 const pack=pet==='deepy-whale'?deepy:girl;
 const a=pack.animations[state];
 const sum=a.frames.reduce((s,v)=>s+v.ms,0);
 // Preserve the author's frame order. Celebration fits the spoken task-complete interval.
 let t=(Math.max(0,elapsed)*1000/30*(state==='happy'?1.08:1))%sum;
 let index=a.frames[0].i;
 for(const frame of a.frames){index=frame.i;if(t<frame.ms)break;t-=frame.ms;}
 const factor=scale/pack.scale;
 return <div data-pixel-id={pet} data-pixel-role="actor" style={{position:'absolute',left:x+(a.box.x-pack.anchor.x)*scale,top:foot+(a.box.y-pack.anchor.baseline)*scale,width:a.frameW*factor,height:a.frameH*factor,overflow:'hidden'}}>
  <Img src={staticFile(`images/pets/${pet}/${state}.png`)} style={{position:'absolute',left:-(index%a.cols)*a.frameW*factor,top:-Math.floor(index/a.cols)*a.frameH*factor,width:a.cols*a.frameW*factor,maxWidth:'none',imageRendering:'pixelated'}}/>
 </div>;
}
