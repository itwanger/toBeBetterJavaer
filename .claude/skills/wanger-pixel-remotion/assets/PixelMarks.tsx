import React from 'react';
import {pixelColors as C} from './PixelWorld';
// Symbols occupy a 32 × 32 sprite cell. Shared by the model chips and workshop.
export function Mark({type,x,y,s=1,color=C.ink}:{type:'code'|'chip'|'orbit'|'clock'|'test'|'review'|'branch';x:number;y:number;s?:number;color?:string}){
 const paths={
 code:'M9 7h4v4H9v3H6v4h3v3h4v4H9v-3H6v-3H2v-6h4v-3h3zM21 7h-2v4h3v3h4v4h-4v3h-3v4h4v-3h3v-3h4v-6h-4v-3h-3V7z',
 chip:'M6 6h20v20H6z M10 10v12h12V10z M9 2h3v4H9zm9 0h3v4h-3zM9 26h3v4H9zm9 0h3v4h-3zM2 9h4v3H2zm0 10h4v3H2zm24-10h4v3h-4zm0 10h4v3h-4z',
 orbit:'M11 6h10v3h4v6h-4v4h-9v-2H8v-6h3z M2 21h4v-3h3v4H6v2h7v-2h6v-3h5v-4h4v-3h3v6h-4v3h-5v3h-6v3H5v-2H2z',
 clock:'M10 2h12v4h5v5h3v11h-4v5h-6v3h-9v-3H6v-5H3V11h3V6h4z M11 7v3H8v11h4v4h9v-4h4V11h-4V7z M14 10h4v7h5v4h-9z',
 test:'M3 4h25v4H3zM3 24h25v4H3zM3 17h5v-6h5V7h3v8h3v4h3v-6h7v4h-4v6h-8v-5h-3v-5h-2v8H3z',
 review:'M6 4h15v3h4v14h-5v3H8v-3H4V8h2z M9 9v10h11V9z M21 21h5v4h4v5h-5v-4h-4z',
 branch:'M13 2h7v7h-2v5h9v8h3v8h-8v-8h2v-5H8v5h2v8H2v-8h3v-8h10V9h-2z'
 };
 return <g transform={`translate(${x} ${y}) scale(${s}) translate(-16 -16)`} shapeRendering="crispEdges"><path fillRule="evenodd" fill={color} d={paths[type]}/></g>;
}
