import React from 'react';
import {Img,staticFile} from 'remotion';
import {PixelMediaWindow} from './PixelImageWindow';
const p=(f:number,a:number,d=20)=>Math.max(0,Math.min(1,(f-a)/d));
const s=(t:number)=>t*t*(3-2*t);
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
export function ArticleLayers({f}:{f:number}){
 // One intact source image: full view, then camera pushes into the nested structure.
 const t=s(p(f,35,90)),scale=lerp(.765,1.10,t),w=lerp(1175,1690,t),h=806;
 const cx=768,cy=lerp(512,555,t);
 return <PixelMediaWindow width={w} height={h} left={(1920-w)/2-4} top={94}>
  <Img src={staticFile('images/03-three-folds.png')} style={{position:'absolute',width:1536*scale,height:1024*scale,maxWidth:'none',left:w/2-cx*scale,top:h/2-cy*scale}}/>
 </PixelMediaWindow>;
}
