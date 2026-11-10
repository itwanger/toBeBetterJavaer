import React, { type ReactNode } from 'react';
import { Img, staticFile } from 'remotion';
import { pixelColors as C } from './PixelWorld';

type Props = {
  file: string;
  sourceWidth: number;
  sourceHeight: number;
  rect: readonly [x: number, y: number, width: number, height: number];
  progress: number;
  nextFile?: string;
  nextOpacity?: number;
  zoom: number;
  backdropOpacity?: number;
  center?: readonly [number, number];
  mat?: number;
  children?: ReactNode;
};

// Place inside PixelImageWindow. The rectangle and its children use source CSS pixels.
export function NativeDetailLens({
  file, sourceWidth, sourceHeight, rect, progress, zoom, center, mat = 0, backdropOpacity = 0.45, nextFile, nextOpacity = 0, children,
}: Props) {
  const t = Math.min(1, Math.max(0, progress));
  if (t === 0) return null;
  const [x, y, width, height] = rect;
  const outerWidth = width + 2 * mat;
  const outerHeight = height + 2 * mat;
  const inset = Math.min(16, sourceWidth / 8, sourceHeight / 8);
  const targetScale = Math.min(zoom, (sourceWidth - 2 * inset) / outerWidth,
    (sourceHeight - 2 * inset) / outerHeight);
  const [cx, cy] = center ?? [sourceWidth / 2, sourceHeight / 2];
  const endX = Math.max(inset, Math.min(cx - outerWidth * targetScale / 2, sourceWidth - inset - outerWidth * targetScale));
  const endY = Math.max(inset, Math.min(cy - outerHeight * targetScale / 2, sourceHeight - inset - outerHeight * targetScale));
  const scale = 1 + (targetScale - 1) * t;

  const imageStyle: React.CSSProperties = {position: 'absolute', left: -x, top: -y, width: sourceWidth, height: sourceHeight, maxWidth: 'none'};
  return <>
    <div style={{ position: 'absolute', inset: 0, background: `rgba(9,10,16,${backdropOpacity * t})` }} />
    <div style={{
      position: 'absolute', left: (x - mat) * (1 - t) + endX * t, top: (y - mat) * (1 - t) + endY * t,
      width: outerWidth * scale, height: outerHeight * scale, overflow: 'hidden',
      background: '#151517', opacity: Math.min(1, t * 4), boxShadow: '0 8px 24px #0008',
    }}>
      <div style={{
        position: 'absolute', left: mat * scale, top: mat * scale, width, height,
        overflow: 'hidden', transformOrigin: '0 0', transform: `scale(${scale})`,
      }}>
        <Img src={staticFile(file)} style={imageStyle} />
        {nextFile && nextOpacity > 0 && <Img src={staticFile(nextFile)} style={{...imageStyle, opacity: nextOpacity}} />}
        {children}
      </div>
      <div style={{ position: 'absolute', inset: 0, border: `3px solid ${C.gold}`, pointerEvents: 'none' }} />
    </div>
  </>;
}
