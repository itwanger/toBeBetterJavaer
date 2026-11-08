import React from 'react';
import { Img, staticFile } from 'remotion';
import { pixelColors as C } from './PixelWorld';
import { PixelImageWindow } from './PixelImageWindow';

type SourceImage = { file: string; sourceWidth: number; sourceHeight: number };
type Detail = { title: string; x: number; y: number; w: number; h: number; color: string };

// One rectangle in source-image coordinates drives both the outline and the magnified view.
export function FigureDetail({
  file,
  sourceWidth,
  sourceHeight,
  detail,
}: SourceImage & { detail: Detail | null }) {
  const scale = Math.min(1170 / sourceWidth, 780 / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  return (
    <>
      <PixelImageWindow
        file={file}
        sourceWidth={sourceWidth}
        sourceHeight={sourceHeight}
        left={27}
        width={width}
        height={height}
        top={112}
        camera={{ cx: sourceWidth / 2, cy: sourceHeight / 2, scale }}
      >
        {detail && (
          <div
            style={{
              position: 'absolute',
              left: detail.x,
              top: detail.y,
              width: detail.w,
              height: detail.h,
              outline: `4px solid ${detail.color}`,
            }}
          />
        )}
      </PixelImageWindow>
      {detail && <DetailWindow {...{ file, sourceWidth, sourceHeight, detail }} />}
    </>
  );
}
function DetailWindow({ file, sourceWidth, sourceHeight, detail }: SourceImage & { detail: Detail }) {
  const w = 656,
    bodyHeight = 818 - 12 - 72;
  const zoom = Math.min((w - 32) / detail.w, (bodyHeight - 32) / detail.h);
  return (
    <div
      style={{
        position: 'absolute',
        left: 1237,
        top: 112,
        width: w,
        height: 818,
        boxSizing: 'border-box',
        border: `6px solid ${C.ink}`,
        background: '#fcfaf5',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 28,
          color: C.paper,
          background: C.navy,
          fontSize: 39,
          fontWeight: 650,
        }}
      >
        {detail.title}
      </div>
      <div style={{ height: 'calc(100% - 72px)', display: 'grid', placeItems: 'center' }}>
        <div
          style={{
            position: 'relative',
            width: detail.w * zoom,
            height: detail.h * zoom,
            overflow: 'hidden',
          }}
        >
          <Img
            src={staticFile(file)}
            style={{
              position: 'absolute',
              left: -detail.x * zoom,
              top: -detail.y * zoom,
              width: sourceWidth * zoom,
              height: sourceHeight * zoom,
              maxWidth: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
