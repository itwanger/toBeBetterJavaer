import React from 'react';
import {Img,staticFile} from 'remotion';
import {D} from './Chapter2Design';
import {DshBrand} from './DeepSeekIdentity';
import {PixelMediaWindow} from './PixelImageWindow';
import {AnchoredNativeControl} from './AnchoredNativeControl';
import timing from '../../assets/references/ch2-phrase-timing.json';
const E=timing.events;
const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
export function CotUsage({f}:{f:number}){
 const open=f>=E.panel;const file=`images/ch2-usage/${open?'open':'closed'}.png`;
 const {width:w,height:h}=D.frame;const camera={left:351,top:774,width:w};
 const s=w/camera.width;
 return <PixelMediaWindow {...D.frame} chrome={<DshBrand compact/>}>
  <Img src={staticFile(file)} style={{position:'absolute',left:-camera.left*s,top:-camera.top*s,width:2560*s,maxWidth:'none'}}/>
  {!open&&<AnchoredNativeControl file={file} sourceWidth={2560} sourceHeight={1640} camera={camera} stageWidth={w} stageHeight={h} rect={[860,1272,430,72]} anchor={[880,1308]} zoom={2.5} progress={p(f,E.button-12,E.button+5)} underline={[24,64,260]} dim={.38} backdropBlur={2}/>}
  {open&&<AnchoredNativeControl file={file} sourceWidth={2560} sourceHeight={1640} camera={camera} stageWidth={w} stageHeight={h} rect={[868,848,641,413]} anchor={[880,1250]} zoom={1.65} progress={p(f,E.panel,E.panel+15)} underline={f>=E.output?[25,387,575]:undefined} dim={.58} backdropBlur={4} sourceRadius={24}/>}
 </PixelMediaWindow>
}
