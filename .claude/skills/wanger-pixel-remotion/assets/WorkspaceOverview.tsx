import React, {type ReactNode} from 'react';
import {Img, staticFile} from 'remotion';
import {PixelImageWindow} from './PixelImageWindow';

type Props = {
  file: string;
  sourceWidth: number;
  sourceHeight: number;
  width?: number;
  top?: number;
  nextFile?: string;
  nextOpacity?: number;
  children?: ReactNode;
};

// Use same-viewport captures for both states. All children use the screenshot's CSS coordinates.
export function WorkspaceOverview({file, sourceWidth, sourceHeight, width = 1840, top = 92,
  nextFile, nextOpacity = 0, children}: Props) {
  const scale = width / sourceWidth;
  return <PixelImageWindow file={file} sourceWidth={sourceWidth} sourceHeight={sourceHeight}
    width={width} height={sourceHeight*scale} top={top} camera={{cx:sourceWidth/2, cy:sourceHeight/2, scale}}>
    {nextFile && nextOpacity > 0 && <Img src={staticFile(nextFile)} style={{
      position:'absolute', left:0, top:0, width:sourceWidth, height:sourceHeight, opacity:nextOpacity,
    }}/>}
    {children}
  </PixelImageWindow>;
}
