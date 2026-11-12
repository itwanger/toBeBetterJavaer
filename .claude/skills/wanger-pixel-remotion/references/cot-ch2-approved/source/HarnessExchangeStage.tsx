import React from 'react';
import {PixelWhale} from './DeepSeekIdentity';
import {pixelColors as C} from './PixelWorld';
import {D} from './Chapter2Design';
import {PixelThoughtDraft} from './PixelThoughtDraft';
import {PromptSymbol,TokenSymbol,ResultSymbol} from './PixelSymbols';
import {route} from './GenerationRoutes';
import {TokenGlyph,CacheStore,cacheHeight,NORMAL,THOUGHT,EXTRA} from './GenerationMaterials';
const p=(f:number,a:number,d=20)=>Math.max(0,Math.min(1,(f-a)/d));
const ease=(t:number)=>t*t*(3-2*t);
function Header({model=false}:{model?:boolean}){
 return <div style={{height:model?112:78,boxSizing:'border-box',display:'flex',alignItems:'center',gap:model?20:16,padding:model?'0 26px':'0 22px',background:model?'#c1dfd2':'#eee9db',borderBottom:`4px solid ${model?C.teal:C.ink}`,fontWeight:680,color:C.ink,fontSize:model?70:52}}>
  <div style={{display:'flex',gap:model?14:8,marginRight:model?12:4}}>{[C.orange,C.gold,C.teal].map(c=><i key={c} style={{width:model?14:8,height:model?14:8,background:c}}/>)}</div>
  <PixelWhale size={model?76:60}/>{model?'DeepSeek 模型':'DSH'}
 </div>;
}
export function HarnessExchangeStage({f}:{f:number}){
 const cot=f>=712,more=f>=1199,direct=f>=438&&!cot;
 const emissions=more?[...THOUGHT,...EXTRA]:cot?THOUGHT:direct?[631]:NORMAL;
 const received=emissions.filter(e=>f>=e+18).length;
 const generated=emissions.filter(e=>f>=e).length;
 const finalAnswer=cot&&!more&&f>=1048;
 // The desktop window and its ports stay fixed. Only the contents change scale/position.
 const leftW=680,leftH=620,leftX=24,leftY=210,leftR=leftX+leftW;
 const modelW=916,modelX=1890-modelW,modelS=modelW/1000,modelY=520-900*modelS/2;
 const rows=Math.min(3,emissions.reduce((sum,e)=>sum+ease(p(f,e+18,18)),0));
 // Make room while the first packet travels; no empty paper is mounted before receipt.
 const payload=ease(p(f,emissions[0],18));
 const promptSize=224-112*payload;
 const promptX=228+(536-228)*payload,promptY=237+(102-237)*payload;
 const completion=finalAnswer?ease(p(f,1048,18)):0;
 const paperY=260+(3-rows)*16-40*completion;
 const cache=cot&&f>=878,h=cache?cacheHeight(f,generated):0,cacheT=ease(p(f,878,22));
 const calcY=430-100*cacheT,exitY=700-210*cacheT;
 const dshInY=leftY+170,dshOutY=leftY+450;
 const modelInY=modelY+270*modelS,modelOutY=modelY+exitY*modelS;
 const gapX=(leftR+modelX)/2;
 const request=route([[leftR,dshInY],[gapX,dshInY],[gapX,modelInY],[modelX,modelInY]],20);
 const response=route([[modelX,modelOutY],[gapX,modelOutY],[gapX,dshOutY],[leftR,dshOutY]],20);
 const internal=route([[0,270],[70,270],[70,calcY],[940,calcY],[940,exitY],[0,exitY]],20);
 const next=emissions.find(e=>e>f),start=next===410?332:direct?493:(next??0)-20;
 const computing=next!==undefined&&f>=start&&f<next;
 const progress=next===undefined?0:p(f,start,next-start),signal=internal.point(progress);
 const finalTransfer=cot&&!more&&f>=1030&&f<1048;
 const outgoing=finalTransfer?1030:emissions.find(e=>f>=e&&f<e+18);
 const responsePoint=response.point(outgoing===undefined?0:p(f,outgoing,18));
 const requestPoint=request.point(p(f,188,20));
 const cacheTop=900-48-h;
 const read=f>=1010&&f<1030;
 const readPoint=route([[745,cacheTop+64],[940,cacheTop+64],[940,calcY],[880,calcY]],20).point(p(f,1010,20));
 return <div style={{position:'absolute',inset:0,fontFamily:D.font,fontWeight:680,color:C.ink,opacity:ease(p(f,154,26))}}>
  <div style={{position:'absolute',left:leftX,top:leftY,width:leftW,height:leftH,border:`4px solid ${C.ink}`,boxSizing:'border-box',background:D.ink,overflow:'hidden'}}>
   <Header/>
   <svg width={leftW} height={leftH} style={{position:'absolute',inset:0,pointerEvents:'none'}}>
    <PromptSymbol x={promptX} y={promptY} size={promptSize}/>
   </svg>
   {!direct&&<div style={{position:'absolute',left:28,top:paperY}}>
    <PixelThoughtDraft f={f} arrivals={emissions.map(e=>e+18)} width={616}/>
   </div>}
   {(direct&&received>0||finalAnswer)&&<svg width={direct?280:160} height={direct?280:160} viewBox="0 0 280 280" style={{position:'absolute',left:direct?80:260,top:direct?270:438,overflow:'visible',transform:!finalAnswer?`translateX(${Math.sin((f-649)*1.7)*5*(1-p(f,649,14))}px)`:undefined}}>
    <ResultSymbol x={12} y={10} size={256} correct={finalAnswer}/>
   </svg>}
  </div>
  <div style={{position:'absolute',left:modelX,top:modelY,width:1000,height:900,transform:`scale(${modelS})`,transformOrigin:'top left',border:`6px solid ${C.teal}`,boxSizing:'border-box',background:'#d9eee3'}}>
   <Header model/>
   <svg width={1000} height={900} style={{position:'absolute',inset:0}}>
    {/* Only computation connects the physical entry and exit; no generated text or recurrence inside. */}
    <path d={internal.d} stroke={C.teal} fill="none" strokeWidth={14/modelS} opacity={computing?1:.7}/>
    {computing&&<rect x={signal[0]-12/modelS} y={signal[1]-12/modelS} width={24/modelS} height={24/modelS} fill={C.gold}/>}
    {[210,500,790].map((x,i)=>{
     const lit=computing&&Math.abs(signal[1]-calcY)<1&&Math.abs(signal[0]-x)<96;
     return <g key={x} transform={`translate(${x-95} ${calcY-95})`} shapeRendering="crispEdges"><path d="M8 0h174v8h8v174h-8v8H8v-8H0V8h8Z" fill={C.teal} stroke={C.mint} strokeWidth={6}/>
      {[0,1,2].flatMap(r=>[0,1,2].map(c=><rect key={`${r}${c}`} x={29+c*46} y={29+r*46} width={38} height={38} fill={(lit||(read&&f>=1026&&i===2))&&c===Math.floor(f/3)%3?C.gold:(r+c)%2?C.mint:'#80aea8'}/>))}
     </g>;
    })}
    {/* These two notches are the model boundary ports, not input/output content boxes. */}
    <path d="M0 244v52" stroke={C.gold} strokeWidth={20/modelS}/><path d={`M0 ${exitY-26}v52`} stroke={C.orange} strokeWidth={20/modelS}/>
   </svg>
   {cache&&<div style={{position:'absolute',left:90,top:cacheTop}}><CacheStore f={f} generated={generated} emissions={emissions}/></div>}
   {read&&<svg width={1000} height={900} style={{position:'absolute',inset:0}}><g opacity={1-p(f,1027,3)} transform={`translate(${readPoint[0]} ${readPoint[1]})`}><rect x={-30} y={-18} width={26} height={36} fill={C.mint}/><rect x={4} y={-18} width={26} height={36} fill={C.gold}/></g></svg>}
  </div>
  <svg width={1920} height={1080} style={{position:'absolute',inset:0,overflow:'visible'}}>
   {f>=180&&<><path d={request.d} fill="none" stroke={C.teal} strokeWidth={14} opacity={f<208?1:.85}/><path d={`M${modelX-34} ${modelInY-22}l26 22-26 22`} fill="none" stroke={C.teal} strokeWidth={12}/></>}
   {f>=208&&<><path d={response.d} fill="none" stroke={C.orange} strokeWidth={14} opacity={outgoing!==undefined?1:.85}/><path d={`M${leftR+34} ${dshOutY-22}l-26 22 26 22`} fill="none" stroke={C.orange} strokeWidth={12}/></>}
   {f>=188&&f<208&&<TokenGlyph x={requestPoint[0]-32} y={requestPoint[1]-32} index={0} size={64} question/>}
   {outgoing!==undefined&&(direct||finalTransfer?<TokenSymbol x={responsePoint[0]-40} y={responsePoint[1]-40} size={80} color={direct?C.orange:C.mint}/>:<TokenGlyph x={responsePoint[0]-36} y={responsePoint[1]-36} index={Math.max(0,emissions.indexOf(outgoing))} size={72}/>)}
  </svg>
 </div>;
}
