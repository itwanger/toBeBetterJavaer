import React, {type CSSProperties, type ReactNode} from 'react';
import {pixelColors as C} from './PixelWorld';

const layer: CSSProperties = {position:'absolute', boxSizing:'border-box', fontFamily:'PingFang SC,sans-serif'};
const amber = '#ffb64f';
const mono = 'Menlo,"PingFang SC",monospace';

type Props = {
  record: string;
  label: string;
  countLabel?: string;
  part: number;
  total: number;
  unit: string;
  basis: string;
  progress: number;
  formatValue?: (value:number) => string;
  children: ReactNode;
};

// The source excerpt is positioned by the caller so its original row and both endpoints are visible.
export function EvidenceSharePanel({record, label, countLabel, part, total, unit, basis, progress,
  formatValue=String, children}: Props) {
  const hasShare = total > 0 && Number.isFinite(total) && Number.isFinite(part) && part >= 0 && part <= total;
  const percent = hasShare ? Math.round(100*part/total) : null;
  const reveal = Math.min(1, Math.max(0, progress));
  return <div style={{...layer, left:304, top:72, width:1060, height:496, background:'#222328', color:C.paper,
    border:'2px solid #555461', boxShadow:'6px 7px 0 #0c0e13'}}>
    <div style={{...layer, left:34, top:25, color:C.mint, fontSize:32, fontWeight:600}}>{record}</div>
    {children}
    <div style={{...layer, left:34, top:195, fontSize:52, fontWeight:650}}>{label} <span style={{fontSize:31,color:amber}}>{countLabel}</span></div>
    <div style={{...layer, right:33, top:157, color:amber, fontFamily:mono, fontWeight:700, fontSize:100,
      opacity:reveal}}>{percent === null ? '—' : percent+'%'}</div>
    <div style={{...layer, left:34, right:34, top:298, height:40, background:'#4a4a54'}}>
      <div style={{height:'100%',width:(percent ?? 0)*reveal+'%',background:amber}}/>
    </div>
    <div style={{...layer, left:34, top:373, fontSize:39, color:C.paper}}>
      <b style={{color:amber}}>{formatValue(part)}</b> ÷ {formatValue(total)} {unit}
      <span style={{marginLeft:24,fontSize:29,color:'#cccad2'}}>{basis}</span>
    </div>
  </div>;
}
