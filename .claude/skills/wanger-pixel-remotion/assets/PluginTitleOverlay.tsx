import React from 'react';
import {Img, staticFile} from 'remotion';
import {pixelColors as C} from './PixelWorld';

type Props = {
  box: {left: number; top: number; width: number; height: number};
  icon: string;
  title: string;
  pluginId: string;
  progress: number;
};

// Place over the screenshot's content rectangle, below the window border, HUD and captions.
export function PluginTitleOverlay({box, icon, title, pluginId, progress}: Props) {
  if (progress <= 0) return null;
  return <div style={{position: 'absolute', ...box, display: 'flex', alignItems: 'center',
    justifyContent: 'center', gap: 40, background: 'rgba(16,17,17,.88)', opacity: progress}}>
    <Img src={staticFile(icon)} style={{width: 188, height: 188}}/>
    <div style={{transform: `translateY(${(1-progress)*18}px)`}}>
      <div style={{fontFamily: 'PingFang SC,sans-serif', fontWeight: 700, fontSize: 108, color: '#fff8e7'}}>{title}</div>
      <div style={{fontFamily: 'Menlo,monospace', fontSize: 47, color: C.gold}}>{pluginId}</div>
    </div>
  </div>;
}
