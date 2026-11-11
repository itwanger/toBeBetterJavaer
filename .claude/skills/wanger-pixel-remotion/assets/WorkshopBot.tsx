import React from 'react';

const ink='#202b36', steel='#4b6265', brass='#eeb157', pale='#ffe8a6', jade='#75d7ac', sky='#8fcacc';
export type WorkshopRole = 'code' | 'test' | 'review';
const colors = {code: jade, test: brass, review: sky};

// Each sprite has a distinct tool, faceplate and head shape. Coordinates are in sprite pixels.
export function WorkshopBot({x,y,job,f,scale=1,walk=false}:{x:number;y:number;job:WorkshopRole;f:number;scale?:number;walk?:boolean}){
 const tick=Math.floor(f/5)%2,arm=walk?tick:Math.floor(f/7)%2;
 return <g transform={`translate(${x} ${y-(walk?tick:0)}) scale(${scale})`} shapeRendering="crispEdges">
  <ellipse cx="0" cy="0" rx="13" ry="2" fill="#273a3d"/>
  <path d="M-9 -13h7v10h-2v3h-9v-4h4zM2 -13h7v9h4v4H3z" fill={ink}/>
  <path d={walk&&tick?'M-12 -6h7v4h-7zM4 -2h9v2H4z':'M-11 -3h7v3h-7zM4 -4h8v4H4z'} fill={colors[job]}/>
  <path d="M-10 -21h19v12H6v3H-7v-3h-3z" fill={ink}/>
  <path d="M-8 -20H7v9H-8z" fill={colors[job]}/><path d="M-5 -18h6v4h-6z" fill={steel}/>
  <path d="M-12 -36h4v-3H8v3h5v14h-4v4H-8v-3h-4z" fill={ink}/>
  <path d="M-10 -33h21v10H7v3H-6v-3h-4z" fill={colors[job]}/>
  <path d="M-6 -31h16v6H-6z" fill="#243742"/>
  {job==='code'?<><path d="M-12 -35h6v-6h10v3h6v3h5v3h-27z" fill={jade}/><path d="M-3 -30h3v3h-3zm7 0h3v3H4z" fill={pale}/></>:
   job==='test'?<><path d="M-5 -39v-3h11v3h3v4H-8v-4z" fill={brass}/><path d="M-4 -28h3l2-3 3 5 2-2h3" stroke={jade} fill="none"/></>:
   <><path d="M-8 -36h14v3H-8z" fill={sky}/><path d="M-3 -30h3v3h-3zM3 -32h6v6H3z" fill={pale}/></>}
  <g transform={`translate(0 ${arm*2})`}><path d="M8 -19h5v4h6v5H9z" fill={ink}/>
   <path d="M10 -17h4v3h4v2h-8z" fill={colors[job]}/>
   {job==='review'?<><rect x="16" y="-29" width="10" height="10" fill={ink}/><rect x="18" y="-27" width="6" height="6" fill={sky}/><path d="M16 -20h4v7h-4z" fill={pale}/></>:
    job==='test'?<path d="M17 -20h3v9h-3zm-2 -5h7v5h-7z" fill={brass}/>:<path d="M16 -13h10v3H16z" fill={pale}/>}
  </g>
 </g>;
}
