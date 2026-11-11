import React from 'react';
import {pixelColors as C} from './PixelWorld';
const ink=C.ink, brass='#eeb157', pale=C.paper;
function Folder({x,y,scale}:{x:number;y:number;scale:number}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`} shapeRendering="crispEdges">
  <path d="M-28 -17h18l6 6h30v33h-56v-39z" fill={ink}/><path d="M-25 -14h14l6 6h29v6h-49z" fill="#e49d51"/>
  <path d="M-26 -4h52v24h-52z" fill={brass}/><path d="M-23 -1h46v5h-46z" fill={pale}/>
 </g>;
}
// Place in an SVG. Local bounds including the shadow are 150 × 95 units.
export function EmptyFolderWindow({progress}:{progress:number}){
 const open=Math.max(0,Math.min(1,progress));
 return <g transform="translate(-165 -94)" shapeRendering="crispEdges">
    <rect x="168" y="97" width="147" height="92" fill="#d9ba82"/>
    <rect x="165" y="94" width="147" height="92" fill={ink}/><rect x="168" y="97" width="141" height="86" fill={C.paper}/>
    <rect x="168" y="97" width="141" height="9" fill={C.teal}/><path fill={pale} d="M171 100h3v3h-3zm6 0h3v3h-3zm124 0h5v3h-5z"/>
    <g opacity={1-open}><Folder x={238} y={142} scale={1.14}/></g>
    {open>0&&<g opacity={open}><rect x="168" y="106" width="141" height="12" fill="#f4dcab"/><Folder x={179} y={111} scale={.17}/><path d="M187 110h2v2h2v2h-2v2h-2z" fill={ink}/></g>}
    <path d="M0 0v13h3v-4h3l3 5 3-2-3-5h4z" transform={`translate(${257-17*open} ${162-11*open})`} fill={ink} stroke={pale} strokeWidth="1"/>
   </g>;
}
