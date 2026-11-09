import React from 'react';
import {Img, staticFile} from 'remotion';
import {PixelWorld, pixelColors as C} from './PixelWorld';
import {LikeFollowTiles} from './LikeFollowTiles';

export type PowerUpCues = {unlock: number; like: number; follow: number; name: number; bye: number};
const limit = (n: number) => Math.max(0, Math.min(1, n));
const ramp = (f: number, start: number, end: number) => limit((f - start) / Math.max(1, end - start));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const arc = (t: number) => 4 * t * (1 - t);
const sole = 830;
const boxX = 946;
const boxY = 430;
const boxBottom = boxY + 80;

function QuestionBlock({lift, used, opacity}: {lift: number; used: boolean; opacity: number}) {
  return <g transform={`translate(${boxX} ${boxY - lift})`} opacity={opacity} shapeRendering="crispEdges">
    <path d="M-74 -80H74V-74H80V74H74V80H-74V74H-80V-74H-74Z" fill={C.ink}/>
    <path d="M-70 -70H68V66H-70Z" fill={used ? C.teal : C.orange}/>
    <path d="M-70 -70H65V55H-70Z" fill={used ? C.mint : C.gold}/>
    <path d="M-63 -62H45V-53H-55V18H-63Z" fill={C.paper}/>
    {used ? <path d="M-34 -1H-20V13H-10V23H0V13H10V3H20V-7H30V-17H42V0H32V10H22V20H12V30H2V40H-13V31H-23V21H-34Z" fill={C.teal}/>
      : <path d="M-29 -36H21V-29H32V-4H23V5H12V14H2V22H-13V4H-3V-5H8V-14H14V-21H-18V-7H-32V-27H-29ZM-13 32H2V47H-13Z" fill={C.ink}/>}
  </g>;
}

// Original pixel cap with an open-book mark. Its arc ends at the character's hand.
function BookMushroom({x,y,scale}: {x:number; y:number; scale:number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} shapeRendering="crispEdges">
    <path d="M-32 10H-38V-5H-33V-17H-25V-26H-15V-32H15V-27H24V-20H31V-10H38V8H32V13H17V27H10V33H-10V29H-17V13H-32Z" fill={C.ink}/>
    <path d="M-31 3V-6H-26V-15H-20V-21H-10V-25H12V-20H20V-14H26V-6H31V4H24V7H-25V3Z" fill={C.orange}/>
    <path d="M-20 -10H-14V-16H-6V-20H2V-15H-5V-9H-13V-4H-20Z" fill={C.gold}/>
    <path d="M-11 11H12V24H6V27H-6V24H-11Z" fill={C.paper}/>
    <path d="M-5 -8L3 -6V4L-5 2ZM5 -6L14 -9V1L5 4Z" fill={C.paper}/>
  </g>;
}

function Sparks({x,y,age,color}: {x:number; y:number; age:number; color:string}) {
  const t = ramp(age,0,15);
  if (age<=0 || t>=1) return null;
  return <g opacity={1-t} fill={color}>
    {Array.from({length:8},(_,i)=>{
      const a = i*Math.PI/4;
      const d = 35 + 118*t;
      return <rect key={i} x={x+Math.cos(a)*d} y={y+Math.sin(a)*d} width={13*(1-t)+4} height={13*(1-t)+4}/>;
    })}
  </g>;
}

function RewardFlight({age,sourceX,endY,color}: {age:number;sourceX:number;endY:number;color:string}) {
  if(age<0 || age>10) return null;
  return <g fill={color} shapeRendering="crispEdges">
    {[3,2,1,0].map(tail=>{
      const progress=limit((age-tail)/8);
      const x=lerp(sourceX,830,ease(progress));
      const y=lerp(521,endY,progress)-52*arc(progress);
      const side=tail===0?20:12-tail*2;
      return <rect key={tail} x={x-side/2} y={y-side/2} width={side} height={side} opacity={(1-tail*.18)*(1-ramp(age,8,10))}/>;
    })}
  </g>;
}

const sleeve='M14 98L24 91H30L38 103L49 106L57 112L54 125L40 130L21 117L14 109Z';
function Actor({x,foot,height,pose,frame,wave,facingLeft}: {
  x:number; foot:number; height:number; pose:'think'|'walk'|'carry'|'point'|'release'; frame:number; wave:number; facingLeft:boolean;
}) {
  const sheet = pose==='walk'||pose==='carry'||pose==='release';
  const width = sheet ? 136 : pose==='think'?96:119;
  const nativeHeight = sheet ? 200 : 190;
  const index = pose==='walk'?Math.floor(frame/3)%8:pose==='carry'?2:pose==='release'?7:0;
  const image=<foreignObject width={width} height={nativeHeight}><div style={{position:'relative',width,height:nativeHeight,overflow:'hidden'}}>
    <Img src={staticFile('images/pixel-ergo-'+pose+'.png')} style={{position:'absolute',top:0,left:-index*width,
      width:(sheet?8:1)*width,height:nativeHeight,imageRendering:'pixelated'}}/>
  </div></foreignObject>;
  return <g transform={`translate(${x} ${foot}) scale(${(facingLeft?-1:1)*height/nativeHeight} ${height/nativeHeight}) translate(${-width*(pose==='point'?.43:.5)} ${-nativeHeight})`}>
    {pose==='release' && wave!==0 ? <>
      <defs><mask id="power-up-body"><rect width={width} height={nativeHeight} fill="#fff"/><path d={sleeve}/></mask>
        <clipPath id="power-up-hand"><path d={sleeve}/></clipPath></defs>
      <g mask="url(#power-up-body)">{image}</g>
      <g transform={`rotate(${wave} 52 117)`}><g clipPath="url(#power-up-hand)">{image}</g></g>
    </> : image}
  </g>;
}

export function PowerUpOutro({frame:f,cues:e,caption}: {frame:number;cues:PowerUpCues;caption:string}){
  const bump=e.unlock-12;
  const leap=ramp(f,bump-12,bump+12);
  const pickup=e.unlock+31;
  const flight=ramp(f,bump,pickup);
  const x=lerp(778,boxX,ease(ramp(f,bump-26,bump))) - 146*ease(ramp(f,bump+12,pickup));
  const jump=(sole-190-boxBottom+5)*arc(leap);
  const mushroomX=lerp(boxX,boxX-146,ease(flight));
  const mushroomY=lerp(boxY-75,sole-130,flight)-214*arc(flight);
  const grow=(at:number,amount:number,duration:number)=>{
    const t=ramp(f,at,at+duration);
    return amount*(ease(t)+.13*Math.sin(t*Math.PI*2)*Math.sin(t*Math.PI));
  };
  const height=190+grow(pickup,142,16)+grow(e.like+8,94,9)+grow(e.follow+8,119,10);
  const foot=sole-jump-18*arc(ramp(f,pickup,pickup+15));
  const pose=f<bump-26?'think':f<bump-12?'walk':f<bump+12?'carry':f<pickup?'walk':f<e.name?'point':'release';
  const wavePhase=ramp(f,e.bye-4,e.bye+2);
  const wave=wavePhase*(10+26*Math.sin((f-e.bye)*Math.PI/9));
  const blockOpacity=1-ramp(f,pickup-6,pickup+5);
  const mushroomScale=2*ease(ramp(f,bump,bump+8))*(1-ramp(f,pickup-2,pickup+3));
  return <PixelWorld mode="platform" ground={false} caption={caption}>
    <g shapeRendering="crispEdges">
      <ellipse cx={x} cy={sole+8} rx={height*.27} ry={8} fill="#d69651" opacity={.40-jump/700}/>
    </g>
    {blockOpacity>0 && <QuestionBlock lift={26*arc(ramp(f,bump,bump+10))} used={f>=bump} opacity={blockOpacity}/>}
    <Actor x={x} foot={foot} height={height} pose={pose} frame={f} wave={wave} facingLeft={f>=bump+12 && f<pickup}/>
    {mushroomScale>0 && <BookMushroom x={mushroomX+16*flight} y={mushroomY} scale={mushroomScale}/>}
    <Sparks x={x+24} y={sole-138} age={f-pickup} color={C.teal}/>
    <Sparks x={x} y={sole-height*.65} age={f-e.like-11} color={C.orange}/>
    <Sparks x={x} y={sole-height*.76} age={f-e.follow-11} color={C.teal}/>
    <LikeFollowTiles f={f} frames={{like:e.like,follow:e.follow,go:e.name+3}} transform="translate(1010 472) scale(1.32)"/>
    <RewardFlight age={f-e.like-3} sourceX={1200} endY={603} color={C.orange}/>
    <RewardFlight age={f-e.follow-3} sourceX={1515} endY={550} color={C.teal}/>
    {f>=e.name && <g transform={`translate(1025 ${630+18*(1-ease(ramp(f,e.name,e.name+8)))})`} opacity={ease(ramp(f,e.name,e.name+8))}>
      <text fill={C.ink} fontFamily="PingFang SC,sans-serif" fontWeight="750" fontSize="126">二哥</text>
      <rect x="4" y="23" width={245*ease(ramp(f,e.name+2,e.name+14))} height="9" fill={C.teal}/>
    </g>}
  </PixelWorld>;
}
