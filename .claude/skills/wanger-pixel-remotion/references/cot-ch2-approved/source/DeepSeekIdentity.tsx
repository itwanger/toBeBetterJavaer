import React from 'react';
import {Img,staticFile} from 'remotion';
import {D} from './Chapter2Design';
export function PixelWhale({size=96}:{size?:number}){return <Img src={staticFile('images/dsh/pixel-whale-v1.png')} style={{width:size,height:size,objectFit:'contain',imageRendering:'pixelated',flexShrink:0}}/>}
export function DshBrand({compact=false}:{compact?:boolean}){return <span style={{display:'inline-flex',alignItems:'center',gap:compact?8:18,fontFamily:D.mono,fontSize:compact?20:D.title,fontWeight:D.weight,color:compact?D.ink:undefined,lineHeight:1}}><PixelWhale size={compact?28:96}/>DSH</span>}
