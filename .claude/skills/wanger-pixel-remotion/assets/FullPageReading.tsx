import React, {type ReactNode} from 'react';
import {Img, staticFile} from 'remotion';

type Page = {file: string; width: number; height: number};
type Crop = {x: number; y: number; width: number; height: number; scale: number; left: number; top: number};
type Excerpt = {file: string; top: number; progress: number};
type Props = {page: Page; heading: Crop; label: string; excerpts: readonly Excerpt[]; children?: ReactNode};
const pos = {position: 'absolute', boxSizing: 'border-box'} as const;

function PageCrop({page, crop}: {page: Page; crop: Crop}) {
  const {x, y, width, height, scale, left, top} = crop;
  return <div style={{...pos, left, top, width: width*scale, height: height*scale, overflow: 'hidden'}}>
    <Img src={staticFile(page.file)} style={{...pos, left: -x*scale, top: -y*scale,
      width: page.width*scale, height: page.height*scale, maxWidth: 'none'}}/>
  </div>;
}

// Place inside a 1440 x 650 screenshot window. Excerpt images come from the same original document.
export function FullPageReading({page, heading, label, excerpts, children}: Props) {
  const scale = Math.min(449.28/page.width, 398.112/page.height);
  const thumbnailWidth = page.width*scale;
  const thumbnailHeight = page.height*scale;
  return <div style={{...pos, left: 0, top: 0, width: 1440, height: 650, background: '#f0efeb'}}>
    <div style={{...pos, left: 29+(449.28-thumbnailWidth)/2, top: 104+(398.112-thumbnailHeight)/2,
      width: Math.ceil(thumbnailWidth)+2, height: Math.ceil(thumbnailHeight)+2,
      boxShadow: '5px 7px 0 #c9c5b8', border: '1px solid #b8b5aa'}}>
      <PageCrop page={page} crop={{x: 0, y: 0, width: page.width, height: page.height, scale, left: 0, top: 0}}/>
    </div>
    <div style={{...pos, left: 508, top: 40, height: 570, borderLeft: '1px solid #c9c5b8'}}/>
    <div style={{...pos, left: 547, top: 42, width: 850, borderBottom: '2px solid #302d29', paddingBottom: 10,
      color: '#48453d', fontFamily: 'PingFang SC,sans-serif', fontSize: 25, letterSpacing: 2}}>{label}</div>
    <PageCrop page={page} crop={heading}/>
    {excerpts.map(({file, top, progress}) => <Img key={file} src={staticFile(file)}
      style={{...pos, left: 545, top, width: 854, opacity: progress, transform: `translateY(${(1-progress)*9}px)`}}/>)}
    {children}
  </div>;
}
