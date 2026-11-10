import React from 'react';
import {NativeDetailLens} from './NativeDetailLens';
import {pixelColors as C} from './PixelWorld';

type Rect = readonly [x: number, y: number, width: number, height: number];
type Focus = {rect: Rect; zoom: number; center: readonly [number, number]};
type Props = {
  file: string;
  nextFile: string;
  nextOpacity: number;
  sourceWidth: number;
  sourceHeight: number;
  input: Focus;
  target: Focus;
  targetOutline?: Rect;
  frame: number;
  inputFrame: number;
  targetFrame: number;
  inputDuration?: number;
  targetDuration?: number;
  backdropOpacity?: number;
};
function rise(frame: number, start: number, duration: number) {
  const t = Math.min(1, Math.max(0, (frame-start)/Math.max(1,duration)));
  return t*t*(3-2*t);
}

// Mount inside WorkspaceOverview. Both lenses inherit the same stationary source coordinate system.
export function ControlHandoff({file, nextFile, nextOpacity, sourceWidth, sourceHeight, input, target,
  targetOutline, frame, inputFrame, targetFrame, inputDuration = 14, targetDuration = 15, backdropOpacity = 0.26}: Props) {
  const source = {sourceWidth, sourceHeight, backdropOpacity};
  const inputProgress = rise(frame,inputFrame,inputDuration)*(1-rise(frame,targetFrame-inputDuration,inputDuration));
  return <>
    <NativeDetailLens {...source} {...input} file={file} nextFile={nextFile} nextOpacity={nextOpacity} progress={inputProgress}/>
    {targetOutline && <div style={{
      position:'absolute', left:targetOutline[0], top:targetOutline[1], width:targetOutline[2], height:targetOutline[3],
      boxSizing:'border-box', border:'2px solid '+C.gold, borderRadius:3, opacity:rise(frame,targetFrame-3,7),
    }}/>}
    <NativeDetailLens {...source} {...target} file={nextFile} progress={rise(frame,targetFrame,targetDuration)}/>
  </>;
}
