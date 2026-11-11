export type PixelAction={id:string;frame:number;kind:string;heartDelta?:number;
  sound?:{name:string;peakDbfs:number}};
export function actionAt(events:readonly PixelAction[],id:string) {
  const event=events.find(e=>e.id===id);
  if(!event) throw new Error(`Missing action: ${id}`);
  return event.frame;
}
export function heartsAt(frame:number,events:readonly PixelAction[],initial=3) {
  return events.filter(e=>e.frame<=frame).sort((a,b)=>a.frame-b.frame)
    .reduce((hearts,e)=>Math.max(0,Math.min(3,hearts+(e.heartDelta??0))),initial);
}
// Contact time drives pose/particles, HUD and the sound-plan compiler. No second SFX timestamp.
export function actionProgress(frame:number,events:readonly PixelAction[],id:string,duration:number) {
  if(duration<=0) throw new Error('Action duration must be positive');
  return Math.max(0,Math.min(1,(frame-actionAt(events,id))/duration));
}
