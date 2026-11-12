import React from 'react';
import {Img,staticFile} from 'remotion';
import {PixelMediaWindow} from './PixelImageWindow';
import {HarnessContextModel} from './HarnessContextModel';
import {D} from './Chapter2Design';
import {HarnessExchangeStage} from './HarnessExchangeStage';
import {WorldWipe} from './WorldWipe';
const p=(f:number,a:number,d=20)=>Math.max(0,Math.min(1,(f-a)/d));
const smooth=(t:number)=>t*t*(3-2*t);
function ArticleFocus({f}:{f:number}){
 const t=smooth(p(f,1110,36));
 const scale=D.frame.height/1024+(D.frame.width/1536-D.frame.height/1024)*t;
 const cy=512+(690-512)*t;
 const width=1536*scale;
 return <PixelMediaWindow width={width} height={D.frame.height} top={D.frame.top} left={D.frame.left+(D.frame.width-width)/2}>
  <Img src={staticFile('images/article-flow/read.png')} style={{position:'absolute',width:1536*scale,height:1024*scale,maxWidth:'none',left:0,top:D.frame.height/2-cy*scale}}/>
 </PixelMediaWindow>;
}
export function CotTokenContext({f}:{f:number}){
 return <>{f>=1086&&f<1199?<ArticleFocus f={f}/>:<>{f<180&&<div style={{opacity:1-p(f,154,26)}}><HarnessContextModel f={Math.min(f,154)}/></div>}{f>=154&&<HarnessExchangeStage f={f}/>}</>}<WorldWipe f={f} change={1086}/><WorldWipe f={f} change={1199}/></>;
}
