import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame} from 'remotion';
import {subtitleAt} from '../../../shared/remotion/components/Scenes';
import timing from '../../assets/references/ch3-phrase-timing.json';
import mix from '../../build/sound-mix.json';
import {PixelWorld} from './PixelWorld';
import {FlagCourse,FlagRunner} from './FlagCourse';
import {WorldWipe} from './WorldWipe';
import {D} from './Chapter2Design';
import {ArticleLayers} from './Chapter3Mechanism';
import {Chapter3Harness} from './Chapter3Harness';
const E=timing.events;
const flag={percent:70,run:E.run,jump:E.seat-19,seat:E.seat,descend:E.seat+12,bottom:E.seat+31,land:E.end+20,go:E.end+40,end:E.end};
export function Chapter3Scene(){const f=useCurrentFrame(),game=f>=E.run;
 return <PixelWorld mode={game?'platform':'diagram'} ground={false} coins={f>=E.seat?3:2} topic={{title:'思考块怎样展示',term:'CoT'}} caption={subtitleAt(timing.subtitles,f)} captionStyle={game?'band':'plaque'} highlight={/(DeepSeek Harness|DeepSeek|text|reasoning|70%)/g}
 foreground={<>{!game&&(f<E.early?<ArticleLayers f={f}/>:<Chapter3Harness f={f}/>)}{game&&<FlagRunner f={f} frames={flag}/>}<WorldWipe f={f} change={E.early}/><WorldWipe f={f} change={E.modern}/><WorldWipe f={f} change={E.protocol}/><WorldWipe f={f} change={E.folds}/><WorldWipe f={f} change={E.run}/></>}>
 {game&&<FlagCourse f={f} frames={flag}/>}
 </PixelWorld>;
}
export function Chapter3(){return <AbsoluteFill style={{fontWeight:D.weight}}><Audio src={`${staticFile('audio/voiceover-with-effects.wav')}?v=${mix.outputSha256.slice(0,12)}`} startFrom={timing.chapterStartFrame} endAt={timing.chapterEndFrame}/><Chapter3Scene/></AbsoluteFill>}
