import React from 'react';
import {pixelColors as C} from './PixelWorld';
// Shared silhouettes: a terminal speech bubble is a prompt; a beveled data tile is a Token.
export function PromptSymbol({x=0,y=0,size=64}:{x?:number;y?:number;size?:number}){
 return <g transform={`translate(${x} ${y}) scale(${size/32})`} shapeRendering="crispEdges">
  <path d="M3 1h26v3h3v20h-3v3H14v2h-3v3H7v-5H3v-3H0V4h3Z" fill={C.ink}/>
  <path d="M4 4h24v2h1v16h-2v2H12v2H9v-2H4v-2H3V6h1Z" fill={C.gold}/>
  <path d="M5 5h22v2H5Z" fill={C.paper}/>
  <path d="M7 9h3v3h3v3h-3v3H7v-3h3v-3H7Zm9 8h9v3h-9Z" fill={C.ink}/>
 </g>;
}
export function TokenSymbol({x=0,y=0,size=64,color=C.mint}:{x?:number;y?:number;size?:number;color?:string}){
 return <g transform={`translate(${x} ${y}) scale(${size/32})`} shapeRendering="crispEdges">
  <path d="M6 2h20v4h4v20h-4v4H6v-4H2V6h4Z" fill={C.ink}/>
  <path d="M7 5h18v3h2v17h-3v2H7v-3H5V8h2Z" fill={color}/>
  <path d="M8 7h15v3H10v13H7V10h1Z" fill={C.paper}/>
  <path d="M23 10h3v14h-3Zm-13 13h13v3H10Z" fill={C.teal}/>
  <path d="M12 12h5v5h-5Zm6 6h4v4h-4Z" fill={C.ink}/>
 </g>;
}

export const RESULT_PIXELS={
 wrong:['1100011','1110111','0111110','0011100','0111110','1110111','1100011'],
 correct:['0000000011','0000000111','0000001110','0000011100','1100111000','1111110000','0111100000','0011000000'],
};
export function ResultSymbol({correct,x=0,y=0,size=64}:{correct:boolean;x?:number;y?:number;size?:number}){
 const pixels=RESULT_PIXELS[correct?'correct':'wrong'],offsetX=correct?0:6,offsetY=correct?4:6;
 return <g transform={`translate(${x} ${y}) scale(${size/40})`} fill={correct?C.mint:C.orange} shapeRendering="crispEdges">
  {pixels.flatMap((row,r)=>[...row].map((on,c)=>on==='1'?<rect key={`${r}-${c}`} x={offsetX+c*4} y={offsetY+r*4} width={4} height={4}/>:null))}
 </g>;
}
