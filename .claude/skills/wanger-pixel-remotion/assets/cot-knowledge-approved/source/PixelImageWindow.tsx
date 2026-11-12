import React, { type ReactNode } from 'react';
import { Img, staticFile } from 'remotion';
import { pixelColors as C } from './PixelWorld';

type Props = {
  file: string;
  sourceWidth: number;
  sourceHeight: number;
  camera: { cx: number; cy: number; scale: number };
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  children?: ReactNode;
};

// Source dimensions and overlay coordinates are CSS pixels; the PNG may have a higher pixel density.
export function PixelImageWindow({
  file,
  sourceWidth,
  sourceHeight,
  camera,
  width: w = 1864,
  height: h = 832,
  top = 94,
  left,
  children,
}: Props) {
  const scale = Math.max(camera.scale, w / sourceWidth, h / sourceHeight);
  const cropX = Math.min(sourceWidth - w / scale, Math.max(0, camera.cx - w / scale / 2));
  const cropY = Math.min(sourceHeight - h / scale, Math.max(0, camera.cy - h / scale / 2));
  return <PixelMediaWindow width={w} height={h} top={top} left={left}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: sourceWidth,
            height: sourceHeight,
            transformOrigin: '0 0',
            transform: `translate(${-cropX * scale}px,${-cropY * scale}px) scale(${scale})`,
          }}
        >
          <Img
            src={staticFile(file)}
            style={{ display: 'block', width: sourceWidth, height: sourceHeight }}
          />
          {children}
        </div>
  </PixelMediaWindow>;
}

export function PixelMediaWindow({width:w,height:h,top=94,left,children,chrome}:{
 width:number;height:number;top?:number;left?:number;children:ReactNode;chrome?:ReactNode
}){
  return (
    <div data-pixel-role="frame"
      style={{
        position: 'absolute',
        left: left ?? (1920 - w - 8) / 2,
        boxSizing: 'content-box',
        top,
        width: w,
        background: C.paper,
        border: `4px solid ${C.ink}`,
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 30,
          paddingLeft: 15,
          background: '#eee9db',
          borderBottom: `3px solid ${C.ink}`,
        }}
      >
        {[C.orange, C.gold, C.teal].map((color) => (
          <span key={color} style={{ width: 10, height: 10, background: color, borderRadius: 5 }} />
        ))}
        {chrome&&<div style={{marginLeft:'auto',marginRight:12,display:'flex',alignItems:'center'}}>{chrome}</div>}
      </div>
      <div style={{ position: 'relative', width: w, height: h, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}
