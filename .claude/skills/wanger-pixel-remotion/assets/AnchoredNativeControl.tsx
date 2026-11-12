import React from 'react';
import {Img,staticFile} from 'remotion';

type Geometry = {
 stageWidth:number;stageHeight:number;
 camera:{left:number;top:number;width:number};
 rect:readonly [number,number,number,number];
 anchor:readonly [number,number];zoom:number;progress:number;safeInset?:number;
};
export function anchoredControlBox({stageWidth:w,stageHeight:h,camera,rect,anchor,zoom,progress,safeInset=36}:Geometry){
 const [sx,sy,sw,sh]=rect;
 const t=Math.max(0,Math.min(1,progress));
 const inset=Math.max(0,Math.min(safeInset,w/4,h/4));
 const base=w/camera.width;
 const scale=Math.min(base+(zoom-base)*t,(w-2*inset)/sw,(h-2*inset)/sh);
 const width=sw*scale,height=sh*scale;
 const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
 return {left:clamp((anchor[0]-camera.left)*base-(anchor[0]-sx)*scale,inset,w-inset-width),
  top:clamp((anchor[1]-camera.top)*base-(anchor[1]-sy)*scale,inset,h-inset-height),width,height,scale};
}

// Mount over the genuine image, in the same viewport. Includes border/shadow clearance.
export function AnchoredNativeControl(props:Geometry & {
 file:string;sourceWidth:number;sourceHeight:number;id?:string;
 underline?:readonly [number,number,number];dim?:number;
 sourceRadius?:number;backdropBlur?:number;
}){
 const {file,sourceWidth,sourceHeight,rect,progress,underline,id='native-control-focus',dim=.16,sourceRadius,backdropBlur=0}=props;
 const t=Math.max(0,Math.min(1,progress));if(t===0)return null;
 const box=anchoredControlBox(props),[sx,sy]=rect;
 return <>
  <div style={{position:'absolute',inset:0,background:`rgba(0,0,0,${dim*t})`,backdropFilter:backdropBlur?`blur(${backdropBlur*t}px)`:undefined}}/>
  <div data-pixel-id={id} data-pixel-role="control" data-pixel-required="true" data-pixel-overlay="true"
   style={{position:'absolute',left:box.left,top:box.top,width:box.width,height:box.height,overflow:'hidden',
    borderRadius:sourceRadius===undefined?12:sourceRadius*box.scale,opacity:t,outline:'2px solid #ffcb5480',boxShadow:'0 10px 28px #0008'}}>
   <Img src={staticFile(file)} style={{position:'absolute',left:-sx*box.scale,top:-sy*box.scale,width:sourceWidth*box.scale,height:sourceHeight*box.scale,maxWidth:'none'}}/>
   {underline&&<div style={{position:'absolute',left:underline[0]*box.scale,top:underline[1]*box.scale,width:underline[2]*box.scale,height:4,background:'#ffcb54'}}/>}
  </div>
 </>;
}
