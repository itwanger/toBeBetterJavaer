import React from 'react';
import {pixelColors as C} from './PixelWorld';
import {route,OUTPUT_X} from './GenerationRoutes';
import {PromptSymbol,TokenSymbol} from './PixelSymbols';
const p=(f:number,a:number,d=20)=>Math.max(0,Math.min(1,(f-a)/d));
const ease=(v:number)=>v*v*(3-2*v);
export const tokenColors=[C.mint,'#6cc6b9','#a8dec7','#8cbddd','#bed9eb'];
export const NORMAL=[228,270,312,410],THOUGHT=[750,802,854,906,958],EXTRA=[1220,1262,1304,1346];
export const colorFor=(index:number)=>tokenColors[((index%5)+5)%5];
export function TokenGlyph({x,y,index,size=64,reply=false,question=false}:{x:number;y:number;index:number;size?:number;reply?:boolean;question?:boolean}){
 if(question)return <PromptSymbol x={x} y={y} size={size}/>;
 if(!reply)return <TokenSymbol x={x} y={y} size={size} color={colorFor(index)}/>;
 return <g transform={`translate(${x} ${y}) scale(${size/64})`} shapeRendering="crispEdges"><path d="M0 0h64v48H28L12 62V48H0Z" fill={C.gold} stroke={C.ink} strokeWidth={3}/>{[0,1,2].map(i=><rect key={i} x={10} y={12+i*12} width={22+i*8} height={6} fill={C.ink}/>)}</g>;
}
export function cacheHeight(f:number,generated:number){return (144+84*(generated>5?p(f,1220,20):0))*p(f,878,22)}
export function CacheStore({f,generated,emissions}:{f:number;generated:number;emissions:number[]}){
 const h=cacheHeight(f,generated),columns=Math.min(5,generated),start=(820-columns*130)/2;
 const selected=4;
 return <div style={{height:h,flexShrink:0,opacity:p(f,878,22),position:'relative'}}><svg width={820} height={h} style={{overflow:'visible'}} shapeRendering="crispEdges">
  <path d={`M24 8h772v${Math.max(0,h-34)}H24Z`} fill={C.teal} stroke={C.mint} strokeWidth={5}/>
  {Array.from({length:18},(_,i)=><rect key={i} x={40+i*42} y={h-23} width={22} height={22} fill={C.gold}/>)}
  {Array.from({length:generated},(_,i)=>{
   const born=Math.max(878+i*3,emissions[i]),t=ease(p(f,born,18)),targetX=start+(i%5)*130,targetY=30+Math.floor(i/5)*84;
   const fresh=emissions[i]>=878,landing=p(f,born+16,4);
   // Small state pairs use the gaps between occupied cells, then expand inside their own slot.
   const writePos=route([[OUTPUT_X,-(707-h)/2],[OUTPUT_X,-30],[targetX+115,-30],[targetX+115,targetY+34]]).point(p(f,born+2,14));
   const scale=fresh?.24+.76*ease(landing):1;
   const cx=fresh?(landing>0?targetX+115-65*ease(landing):writePos[0]):targetX+50;
   const cy=fresh?(landing>0?targetY+34:writePos[1]):targetY+34-45*(1-t);
   return <g key={i} opacity={fresh?p(f,born+2,3):t} transform={`translate(${cx-50*scale} ${cy-34*scale}) scale(${scale})`}><rect width={100} height={68} fill={C.ink}/><rect x={7} y={8} width={38} height={52} fill={colorFor(i)}/><rect x={55} y={8} width={38} height={52} fill={i===selected&&f>=1010?C.gold:'#6a9ab4'}/></g>;
  })}

 </svg></div>;
}
