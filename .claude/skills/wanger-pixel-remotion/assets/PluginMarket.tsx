import React from 'react';
import {pixelColors as C} from './PixelWorld';

type Shop = {name: string; icon: string; color: string};
type Props = {
  shops: readonly Shop[];
  title: string;
  frame: number;
  openFrame: number;
  tokenFrame: number;
  trafficFrame: number;
};
const wood = '#a66347';
const timber = '#583e41';
const step = (f: number, start: number, duration: number) =>
  Math.min(1, Math.max(0, (f - start) / duration));

function Sprite({x, y, color, walking = 0}: {x: number; y: number; color: string; walking?: number}) {
  const stride = walking ? Math.floor(walking / 4) % 2 : 0;
  return <g transform={`translate(${Math.round(x)} ${Math.round(y) - stride})`}>
    <path fill={C.ink} d="M3 0h7v1h2v3h1v6h-2v2h2v6h-2v4H8v-4H5v4H2v-5H0v-4h2v-3H1V3h2z"/>
    <path fill="#f7c293" d="M3 4h7v2h2v3h-2v2H4V9H3z"/>
    <path fill={timber} d="M2 2h8v2H8v2H5V5H2z"/>
    <path fill={C.ink} d="M9 6h1v2H9z"/>
    <path fill={color} d="M3 12h7v1h2v3h-2v1H3v-2H2v-2h1z"/>
    <path fill="#f7c293" d="M10 14h3v2h-3z"/>
    <path fill={C.ink} d={stride ? 'M0 20h5v2H0z M9 19h4v2H9z' : 'M1 20h4v2H1z M8 20h4v2H8z'}/>
  </g>;
}

function Booth({shop, x, index, frame, openFrame}: {
  shop: Shop; x: number; index: number; frame: number; openFrame: number;
}) {
  const lift = Math.round(26 * (1 - step(frame, openFrame + 12 + 4 * index, 18)));
  return <g transform={`translate(${x} 0)`}>
    {/* Timber bay, recessed shelf, and the cartridge on its display stand. */}
    <path fill={C.ink} d="M1 104h94v77H1z"/>
    <path fill={timber} d="M4 108h88v70H4z"/>
    <path fill="#704f46" d="M9 111h78v42H9z"/>
    <path fill={wood} d="M9 117h78v2H9z M9 142h78v2H9z"/>
    <path fill={C.ink} d="M17 117h33v31H17z"/>
    <path fill={shop.color} d="M19 119h29v27H19z"/>
    <path transform="translate(22 120) scale(.85)" d={shop.icon} fill="none" stroke={C.ink}
      strokeWidth="2" strokeLinejoin="miter"/>
    <path fill={C.gold} d="M22 146h24v2H22z"/>
    <g transform="translate(61 119) scale(1.3)"><Sprite x={0} y={0} color={shop.color}/></g>
    <path fill={wood} d="M3 110h4v41H3z M89 110h4v41h-4z"/>
    {lift > 0 && <g>
      <rect x="7" y="114" width="82" height={lift} fill={wood}/>
      {[6,12,18,24].filter(row => row < lift).map(row =>
        <rect key={row} x="7" y={114 + row} width="82" height="1" fill={timber}/>)}
    </g>}
    {/* Stepped striped canopy. The valance casts a continuous dark shadow. */}
    <path fill={C.ink} d="M6 94h83v4h3v4h3v5h2v9h-3v2H3v-2H0v-9h2v-5h2v-4h2z"/>
    <path fill={shop.color} d="M8 96h79v3h3v4h3v5h2v5h-2v2H3v-2H2v-5h2v-5h2v-4h2z"/>
    {[0,1,2,3].map(i => <path key={i} transform={`translate(${10 + i * 21} 0)`}
      fill={C.paper} d="M3 96h9l-1 6v6H0v-6h1v-3h2z M0 109h11v5H1v-1H0z"/>)}
    <path fill={C.ink} d="M0 151h97v5h-2v26H2v-26H0z"/>
    <path fill={wood} d="M3 153h91v2H3z"/>
    <path fill={C.navy} d="M5 158h86v20H5z"/>
    <rect x="6" y="158" width="2" height="19" fill={shop.color}/>
    <text x="49" y="173" textAnchor="middle" fontWeight="750" fontSize="12" fill={C.paper}>{shop.name}</text>
  </g>;
}

function Coin({x, y}: {x: number; y: number}) {
  return <g transform={`translate(${Math.round(x)} ${Math.round(y)})`}>
    <path fill={C.ink} d="M-4 -7h8v2h2V5H4v2h-8V5h-2V-5h2z"/>
    <path fill={C.gold} d="M-3 -5h6v1h1v8H3v1h-6V4h-1v-8h1z"/>
    <path fill="#fff5be" d="M-2 -3h2v6h-2z"/>
  </g>;
}

function StreetSign({x, label, color}: {x: number; label: string; color: string}) {
  return <g transform={`translate(${x} 207)`}>
    <path fill={timber} d="M-29 6h3v6h-3z M26 6h3v6h-3z"/>
    <path fill={C.ink} d="M-38 -8h76v2h2V7h-2v2h-76V7h-2V-6h2z"/>
    <path fill={color} d="M-36 -5h2V5h-2z M34 -5h2V5h-2z"/>
    <text textAnchor="middle" y="4.5" fontSize="11" fontWeight="700" fill={C.paper}>{label}</text>
  </g>;
}

// An illustrated market street on a 480 × 270 pixel grid, for four plugin counters.
export function PluginMarket({shops, title, frame, openFrame, tokenFrame, trafficFrame}: Props) {
  return <g transform="scale(4)" fontFamily="'PingFang SC', sans-serif">
    {/* Muted town roofs put the storefront on a street while keeping the counters in focus. */}
    <path fill="#f7dfae" d="M0 147v-21h11v-17h9v-9h7v9h10v22h19v-12h10v-10h11v10h11v19h16v-20h19v-9h8v9h16v24h200v-16h17v-15h13v-8h9v8h14v18h12v-27h8v-9h10v9h12v26h15v-16h12v20h14v24H0z"/>
    <path fill="#ecd39e" d="M0 172h480v17H0z"/>
    <path fill="#dbba87" d="M0 186h480v36H0z"/>
    <path fill="#f1d9aa" d="M0 189h480v30H0z"/>
    {[0,1,2].map(row => <g key={row} fill="#e4c48f">
      {Array.from({length: 15}, (_,i) => <rect key={i} x={i * 35 + (row % 2 ? 9 : -12)}
        y={191 + row * 10} width={i % 3 === 0 ? 12 : 5} height="1"/>)}
    </g>)}
    {/* The sign and pennants belong to the same arcade as the shop counters. */}
    <path fill={timber} d="M129 61h4v43h-4z M347 61h4v43h-4z"/>
    <path stroke={timber} strokeWidth="1" fill="none" d="M0 58l45 13 55 5 31-11 M349 65l32 11 55-5 44-13"/>
    {[12,36,61,86,107,363,387,412,437,461].map((x,i) => {
      const y = 59 + Math.min(15, Math.round(Math.min(x,480-x) / 4));
      return <path key={x} transform={`translate(${x} ${y})`} fill={[C.teal,C.orange,C.gold][i%3]} d="M0 0h8v4H6v2H4v2H2V5H0z"/>;
    })}
    <path fill={timber} d="M118 43h244v4h4v28h-4v5H118v-4h-4V47h4z"/>
    <path fill={C.ink} d="M118 40h244v4h4v27h-4v5H118v-4h-4V44h4z"/>
    <path fill="#e4ad65" d="M120 43h240v2H120z M120 70h240v2H120z"/>
    {[125,350].map(x => <path key={x} transform={`translate(${x} 56)`} fill={C.gold} d="M0 -3h2v2h2v2H2v2H0V1h-2v-2h2z"/>)}
    <text x="240" y="65" textAnchor="middle" fontSize="20" fontWeight="800" fill={C.paper}>{title}</text>
    {shops.map((shop,i) => <Booth key={shop.name} shop={shop} index={i} x={39 + i * 102} frame={frame} openFrame={openFrame}/>)}
    {frame >= tokenFrame && <g>
      <StreetSign x={141} label="Token 资助" color={C.gold}/>
      {[0,1,2].map(i => {
        const t = step(frame, tokenFrame + i * 6, 17);
        return t > 0 && <Coin key={i} x={109 - 19 * t + i * 4} y={95 + 53 * t - 16 * Math.sin(Math.PI * t) - i * 2}/>;
      })}
    </g>}
    {frame >= trafficFrame && <g>
      <StreetSign x={339} label="流量扶持" color={C.mint}/>
      {[0,1,2].map(i => {
        const t = step(frame, trafficFrame + i * 3, 19);
        return t > 0 && <g key={i} transform={`translate(${Math.round(476 - (69 + i * 19) * t)} ${Math.round(202 - 3 * t + i)}) scale(-1 1)`}>
          <Sprite x={0} y={-17} color={[C.teal, C.orange, C.gold][i]} walking={t < 1 ? frame : 0}/>
        </g>;
      })}
    </g>}
  </g>;
}
