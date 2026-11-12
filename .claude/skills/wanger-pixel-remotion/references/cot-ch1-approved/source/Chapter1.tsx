import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame} from 'remotion';
import {subtitleAt} from '../../../shared/remotion/components/Scenes';
import timing from '../../assets/references/ch1-phrase-timing.json';
import actions from '../../build/pixel-events.json';
import mix from '../../build/sound-mix.json';
import {PixelWorld} from './PixelWorld';
import {pixelMark} from './PixelLayout';
import {actionAt} from './PixelAction';
import {HarnessReal} from './HarnessReal';
import {FlagCourse,FlagRunner} from './FlagCourse';
import {WorldWipe} from './WorldWipe';
import {PixelTypingOpening} from './PixelTypingOpening';
const E=timing.events;
const events=actions.chapters.ch1;
const seat=actionAt(events,'flag-seat');
const run=actionAt(events,'flag-run');
const jump=actionAt(events,'flag-jump');
const flag={percent:30,run,jump,seat,descend:seat+12,bottom:seat+31,land:E.end+20,go:E.end+40,end:E.end};
export function Chapter1Scene(){
 const f=useCurrentFrame();
 const game=f>=run;

 return <PixelWorld mode={game?'platform':'diagram'} ground={false} coins={f>=seat?1:0}
   topic={{title:'看见思维链',term:'CoT'}} caption={subtitleAt(timing.subtitles,f)}
   captionStyle={game?'band':'plaque'} highlight={/(DeepSeek Harness|CoT|Chain of Thought|30%)/g}
   foreground={<>
    {f<84&&<PixelTypingOpening f={f}/>}
    {!game&&f>=84&&<HarnessReal f={f} events={E}/>}
    {game&&<FlagRunner f={f} frames={flag}/>}
    <WorldWipe f={f} change={run}/>
    <WorldWipe f={f} change={E.definition}/>
    <WorldWipe f={f} change={84}/>
   </>}>
   {game&&<g {...pixelMark('flag-course','subject',{required:true})}><FlagCourse f={f} frames={flag}/></g>}
 </PixelWorld>;
}
export function Chapter1(){return <AbsoluteFill>
 <Audio src={`${staticFile('audio/voiceover-with-effects.wav')}?v=${mix.outputSha256.slice(0,12)}`} endAt={timing.chapterFrames}/>
 <Chapter1Scene/>
 </AbsoluteFill>;}
