import React from 'react';

export type PixelBox = {x:number; y:number; width:number; height:number};
// Logical 1920×1080 coordinates. Road scenes end at the feet, band subtitles at y942.
export function stageArea(mode:'diagram'|'platform'='diagram'):PixelBox {
  return {x:24,y:100,width:1872,height:mode==='platform'?744:824};
}
export function easeReveal(frame:number, at:number, duration=18) {
  if(duration<=0) throw new Error('Reveal duration must be positive');
  const t=Math.max(0,Math.min(1,(frame-at)/duration));
  return t*t*(3-2*t);
}
export function containBox(source:PixelBox, area:PixelBox) {
  if([source.width,source.height,area.width,area.height].some(n=>!Number.isFinite(n)||n<=0))
    throw new Error('Contain requires positive source and stage dimensions');
  const scale=Math.min(area.width/source.width,area.height/source.height);
  return {scale,x:area.x+(area.width-source.width*scale)/2-source.x*scale,
    y:area.y+(area.height-source.height*scale)/2-source.y*scale};
}
export type RevealItem={id:string;at:number;duration?:number;weight?:number};
// Future items take ZERO space. A new item continuously takes its share from present items.
// Use column for bottom readouts, row for side comparisons. Both share the same geometry.
export function revealSlots(frame:number, items:readonly RevealItem[],area:PixelBox,
  axis:'row'|'column'='row',gap=24) {
  if(new Set(items.map(i=>i.id)).size!==items.length) throw new Error('Duplicate reveal id');
  const active=items.map(item=>({item,p:easeReveal(frame,item.at,item.duration)})).filter(x=>x.p>0);
  if(active.some(x=>(x.item.weight??1)<=0)) throw new Error('Reveal weights must be positive');
  const total=active.reduce((sum,x)=>sum+x.p*(x.item.weight??1),0);
  const gaps=active.map((x,i)=>i===0?0:gap*Math.min(active[i-1].p,x.p));
  const extent=(axis==='row'?area.width:area.height)-gaps.reduce((a,b)=>a+b,0);
  if(extent<0) throw new Error('Gaps exceed stage');
  let cursor=axis==='row'?area.x:area.y;
  return active.map(({item,p},i)=>{
    cursor+=gaps[i]; const size=extent*p*(item.weight??1)/total;
    const box={x:axis==='row'?cursor:area.x,y:axis==='column'?cursor:area.y,width:axis==='row'?size:area.width,height:axis==='column'?size:area.height};cursor+=size;
    return {id:item.id,progress:p,...box};
  });
}
export function pixelMark(id:string,role:'subject'|'control'|'label'|'frame'|'hud'|'subtitle',
  options:{required?:boolean;allowOverlay?:boolean}={}) {
  return {'data-pixel-id':id,'data-pixel-role':role,
    'data-pixel-required':options.required?'true':undefined,
    'data-pixel-overlay':options.allowOverlay?'true':undefined};
}
// Mark the actual object, including strokes/callouts, rather than an empty full-screen wrapper.
export function PixelSubject({id,bounds,area=stageArea(),children}:{
  id:string;bounds:PixelBox;area?:PixelBox;children:React.ReactNode;
}) {
  const fit=containBox(bounds,area);
  return <g {...pixelMark(id,'subject',{required:true})}
    transform={`translate(${fit.x} ${fit.y}) scale(${fit.scale})`}>{children}</g>;
}
