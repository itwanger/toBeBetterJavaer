import React from 'react';
import {Img, staticFile} from 'remotion';
import {pixelColors as C} from './PixelWorld';

type Crop = {x:number; y:number; width:number; height:number};
type Excerpt = {crop:Crop; left:number; top:number; scale:number};
type Props = {
  page: {file:string; width:number; height:number};
  figure: Excerpt;
  readings: readonly (Excerpt & {enterTop:number})[];
  focus:number;
  underline: {x:number; y:number; width:number; progress:number};
};
const mix = (start:number, end:number, progress:number) => start+(end-start)*progress;

function PageExcerpt({page, crop, left, top, scale}: Excerpt & {page:Props['page']}) {
  return <div style={{position:'absolute', left, top, width:crop.width*scale, height:crop.height*scale, overflow:'hidden'}}>
    <Img src={staticFile(page.file)} style={{position:'absolute', width:page.width*scale, height:page.height*scale,
      left:-crop.x*scale, top:-crop.y*scale}}/>
  </div>;
}

// Place in the source page's coordinate system. At focus=0 the original printed page is visible.
export function PaperFigureLayers({page, figure, readings, focus, underline}: Props) {
  if (focus<=0) return null;
  const {crop} = figure;
  return <>
    <div style={{position:'absolute', left:crop.x, top:crop.y, width:crop.width, height:crop.height, background:'#fff'}}/>
    <div style={{position:'absolute', inset:0, background:'#fff', opacity:Math.min(1,focus/.44)}}/>
    <PageExcerpt page={page} crop={crop} left={mix(crop.x,figure.left,focus)}
      top={mix(crop.y,figure.top,focus)} scale={mix(1,figure.scale,focus)}/>
    <div style={{position:'absolute', inset:0, opacity:Math.max(0,(focus-.44)/.56)}}>
      {readings.map(r=><PageExcerpt key={r.crop.x+'-'+r.crop.y} {...r} page={page} top={mix(r.enterTop,r.top,focus)}/>)}
      <div style={{position:'absolute', left:underline.x, top:underline.y, width:underline.width*underline.progress,
        height:2.6, background:C.gold}}/>
    </div>
  </>;
}
