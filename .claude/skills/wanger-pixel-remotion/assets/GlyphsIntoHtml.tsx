import React from 'react';
import {Img, staticFile} from 'remotion';
import {pixelColors as C} from './PixelWorld';

type Sample = {file: string; left: number; top: number; progress: number};
type Props = {samples: readonly Sample[]; filename: string; reveal: number; fileOpacity: number; opened: number};
const pos = {position: 'absolute', boxSizing: 'border-box'} as const;
const mix = (from: number, to: number, progress: number) => from+(to-from)*progress;

// Coordinates share FullPageReading's 1440 x 650 surface.
export function GlyphsIntoHtml({samples, filename, reveal, fileOpacity, opened}: Props) {
  return <>
    {samples.map(({file, left, top, progress}) => <div key={file} style={{...pos,
      left: mix(left,975,progress), top: mix(top,494,progress), opacity: reveal*(1-progress),
      transform: `translate(-50%, -50%) scale(${mix(1,.2,progress)})`, borderBottom: '4px solid '+C.gold}}>
      <Img src={staticFile(file)} style={{display: 'block', height: 122}}/>
    </div>)}
    <div style={{...pos, left: mix(975,254,opened), top: mix(496,560,opened), opacity: fileOpacity,
      transform: `translate(-50%,-50%) scale(${mix(1,.76,opened)})`, whiteSpace: 'nowrap'}}>
      <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, padding: '12px 24px',
        color: C.paper, background: C.ink, borderBottom: '6px solid '+(opened>.5?C.mint:C.gold)}}>
        <svg width="39" height="51" viewBox="0 0 39 51" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M3 2h21l12 12v34H3zM24 2v13h12M10 26h17m-17 8h12"/>
        </svg>
        <span style={{fontFamily: 'Menlo,monospace', fontSize: 43}}>{filename}</span>
        {opened>.5 && <span style={{fontFamily: 'PingFang SC,sans-serif', fontSize: 49, color: C.mint}}>离线</span>}
      </div>
    </div>
  </>;
}
