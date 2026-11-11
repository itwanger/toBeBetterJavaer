import React from 'react';
import {Mark} from './PixelMarks';
import {pixelColors as C} from './PixelWorld';
type MarkName = React.ComponentProps<typeof Mark>['type'];
type Ability = {label: string; mark: MarkName; at: number; color: string};
type Spec = {value: string; label: string};
type StageProps = {
  frame: number;
  models: readonly [string, string];
  specs: readonly [Spec, Spec];
  abilities: readonly Ability[];
  events: {firstModel: number; secondModel: number; base: number; firstSpec: number; secondSpec: number};
  baseLabel?: string;
};
const {ink,gold,paper,mint}=C;
const mono="Menlo, monospace";
const glide=(f:number,start:number,len:number)=>{const t=Math.max(0,Math.min(1,(f-start)/len));return t*t*(3-2*t)};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;

function Cart({x,y,scale,label,fill,opacity=1}:{x:number;y:number;scale:number;label:string;fill:string;opacity?:number}){
 return <g data-pixel-id={label} data-pixel-role="subject" data-pixel-required={opacity>0.98?"true":undefined} transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
   <path d="M-274 -82h527l21 21v143h-548z" fill={ink} transform="translate(6 8)"/>
   <path d="M-274 -82h527l21 21v143h-548z" fill={fill} stroke={ink} strokeWidth="6"/>
   <rect x="-257" y="-65" width="55" height="7" fill={ink}/>
   <rect x="193" y="58" width="58" height="6" fill={ink}/>
   <text x="0" y="27" textAnchor="middle" fill={ink} fontFamily={mono} fontWeight={700} fontSize="73">{label}</text>
 </g>;
}
// Each arriving item opens its own width. Old items keep their identity and slide continuously.
function rowSlots(weights: number[], fullWidth: number, soloWidth: number, gap: number) {
  const count = weights.reduce((total, weight) => total + weight, 0);
  if (!count) return [];
  const span = mix(soloWidth, fullWidth, Math.min(1, Math.max(0, count - 1)));
  const unit = (span - gap * Math.max(0, count - 1)) / Math.max(1, count);
  let left = (1920 - unit * count - gap * Math.max(0, count - 1)) / 2;
  return weights.map((weight, index) => {
    if (index) left += weight * gap;
    const width = unit * weight;
    const center = left + width / 2;
    left += width;
    return {center, width};
  });
}

function Specs({frame, rise, reveal, specs, secondAt}: {frame:number; rise:number; reveal:number; specs:StageProps['specs']; secondAt:number}) {
  if (!reveal) return null;
  const second = glide(frame, secondAt, 18);
  const slots = rowSlots([1, second], 1736, 1140, 38);
  const y = mix(765, 548, rise) + (1-reveal)*100;
  const height = mix(264, 168, rise);
  const font = mix(138, 92, rise);
  return <g opacity={reveal}>
    {specs.map(({value,label}, index) => {
      const {width, center} = slots[index];
      if (width < 12) return null;
      return <g key={label} transform={`translate(${center} ${y})`}>
        <rect x={-width/2+7} y={-height/2+8} width={width} height={height} fill="#ccaf81"/>
        <rect x={-width/2} y={-height/2} width={width} height={height} fill={C.paper} stroke={ink} strokeWidth="6"/>
        <svg x={-width/2} y={-height/2} width={width} height={height} overflow="hidden">
          <path d={`M12 12h64v8H12zM${width-76} ${height-20}h64v8h-64z`} fill={C.mint}/>
          <g opacity={glide(width,index?510:0,145)}><text x={width/2} y={height*.39+font*.25} fill={C.teal} fontSize={font} fontFamily={mono} fontWeight="700" textAnchor="middle">{value}</text>
          <text x={width/2} y={height*.86} fontSize={mix(52,44,rise)} fill={ink} fontWeight="680" textAnchor="middle">{label}</text></g>
        </svg>
      </g>;
    })}
  </g>;
}

function AbilityRow({frame,abilities}: {frame:number; abilities:readonly Ability[]}) {
  const weights = abilities.map(({at}, index) => glide(frame, at+(index===0?5:0), 17));
  const slots = rowSlots(weights, 1736, 850, 22);
  return <g>{abilities.map(({label, mark, color}, i) => {
    if (!weights[i]) return null;
    const {center, width} = slots[i];
    if (width < 12) return null;
    const nameSize = label.length > 4 ? 47 : 52;
    const textWidth = nameSize * label.length;
    const contentLeft = (width - (70 + 18 + textWidth)) / 2;
    return <g key={label} transform={`translate(${center-width/2} ${745+(1-weights[i])*60})`}>
      <rect x="6" y="8" width={width} height="152" fill="#bd9b70"/>
      <rect width={width} height="152" fill={color} stroke={ink} strokeWidth="6"/>
      <svg width={width} height="152" overflow="hidden">
        <g opacity={glide(width,88+textWidth,65)}><Mark x={contentLeft+35} y={76} s={2.35} type={mark}/>
        <text x={contentLeft+88} y={77+nameSize*.34} fill={ink} fontWeight="720" fontSize={nameSize}>{label}</text></g>
      </svg>
    </g>;
  })}</g>;
}

export function ModelSpecReveal({frame:f, models, specs, abilities, events, baseLabel="共享基座"}:StageProps){
 const pair=glide(f,events.secondModel-2,20), base=glide(f,events.base+12,30);
 const spec=glide(f,events.firstSpec,20), rise=abilities.length ? glide(f,abilities[0].at,22) : 0;
 const first=glide(f,events.firstModel-7,12);
 const modelY=mix(mix(548,307,base),mix(222,184,rise),spec);
 const dx=mix(0,467,pair), cartScale=mix(2.12,1.42,pair)-.12*base-.16*rise;
 const chipY=mix(718,mix(445,355,rise),spec);
 const chipScale=mix(1.26,mix(.94,.76,rise),spec);
 const pinTop=chipY-90*chipScale, wireStart=modelY+80*cartScale;
 const bend=mix(wireStart,pinTop,.52);
 return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}} fontFamily="PingFang SC,sans-serif">
    {base>0&&<g opacity={base} stroke={C.teal} strokeWidth="9" fill="none">
      {[-1,1].map(side=><path key={side} d={`M${960+side*dx} ${wireStart}V${bend}H${960+side*122*chipScale}V${chipY-68*chipScale}`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-base}/>)}
    </g>}
    <Cart x={960-dx} y={modelY} scale={cartScale} label={models[0]} fill={gold} opacity={first}/>
    <Cart x={960+dx} y={modelY} scale={cartScale} label={models[1]} fill={mint} opacity={pair}/>
    {base>0&&<g opacity={base} transform={`translate(960 ${chipY}) scale(${chipScale})`}>
      {Array.from({length:9},(_,i)=><path key={i} d={`M${-244+i*61} -91v27m0 128v27`} stroke={gold} strokeWidth="13"/>)}
      <rect x="-296" y="-68" width="592" height="136" fill={ink} stroke={gold} strokeWidth="7"/>
      <Mark x={-174} y={0} s={2.55} type="chip" color={gold}/>
      <text x="-104" y="22" fill={paper} fontSize="66" fontWeight="720">{baseLabel}</text>
    </g>}
    <Specs frame={f} reveal={spec} rise={rise} specs={specs} secondAt={events.secondSpec}/>
    <AbilityRow frame={f} abilities={abilities}/>
   </svg>;
}
