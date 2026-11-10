import React from 'react';
import {pixelColors as C} from './PixelWorld';

const sans = 'PingFang SC,sans-serif';
const mono = 'Menlo,"PingFang SC",monospace';
const amber = '#ffb64f';

type Route = {place: string; name: string; monospace?: boolean};
type Props = {
  routes: readonly Route[];
  active: number;
  opacity: number;
  left?: number;
  top?: number;
};

// active is zero-based. Pass -1 while introducing the whole list.
export function NarratedRouteList({routes, active, opacity, left=1030, top=35}: Props) {
  return <div style={{position:'absolute', boxSizing:'border-box', fontFamily:sans, left, top,
    width:365, padding:'14px 16px', background:'#202127', color:C.paper, opacity, boxShadow:'5px 5px 0 #090a10'}}>
    {routes.map(({place, name, monospace}, index) => {
      const chosen = index === active;
      return <div key={place+'-'+name} style={{display:'flex', alignItems:'center', gap:11, minHeight:55,
        padding:'5px 9px', borderLeft:'5px solid '+(chosen?amber:'#46474e'),
        background:chosen?'#353139':'transparent', margin:'3px 0'}}>
        <div style={{fontSize:18, width:75, flexShrink:0, color:chosen?amber:'#bdbfc7'}}>{place}</div>
        <div style={{fontFamily:monospace?mono:sans, fontSize:36, lineHeight:1.12, fontWeight:650,
          color:chosen?'#fff5de':'#c5c5cc'}}>{name}</div>
      </div>;
    })}
  </div>;
}
