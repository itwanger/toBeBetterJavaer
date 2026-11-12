import React from 'react';
import {AbsoluteFill,Audio,staticFile,useCurrentFrame} from 'remotion';
import {subtitleAt} from '../../../shared/remotion/components/Scenes';
import timing from '../../assets/references/ch5-phrase-timing.json';
import mix from '../../build/sound-mix.json';
import {PixelWorld} from './PixelWorld';
import {FlagCourse,FlagRunner} from './FlagCourse';
import {PowerUpOutro} from './PowerUpOutro';
import {WorldWipe} from './WorldWipe';
import {D} from './Chapter2Design';
import {HistoryOriginal,HistoryOverview,SameModel,CrossModel,CompactHistory,CotRecap} from './HistoryMechanism';
const E=timing.events;
const flag={percent:99,run:E.run,jump:E.seat-19,seat:E.seat,descend:E.seat+12,bottom:E.seat+31,land:E.recap+20,go:E.recap+40,end:E.recap};
export function Chapter5Scene(){const f=useCurrentFrame(),caption=subtitleAt(timing.subtitles,f),game=f>=E.run&&f<E.recap;
 if(f>=E.outro)return <PowerUpOutro frame={f-E.outro} cues={{unlock:E.unlock-E.outro,like:E.like-E.outro,follow:E.follow-E.outro,name:E.name-E.outro,bye:E.bye-E.outro}} caption={caption}/>;
 return <PixelWorld mode={game?'platform':'diagram'} ground={false} coins={f>=E.seat?5:4} topic={{title:'历史思考如何处理',term:'CoT'}} caption={caption} captionStyle={game?'band':'plaque'} highlight={/(DeepSeek Harness|signature|assistant|user|Token|KV Cache|deepseek-v4-pro|deepseek-flash|99%|CoT)/g} foreground={<>{!game&&(f<E.overview?<HistoryOriginal f={f}/>:f<E.same?<HistoryOverview f={f}/>:f<E.cross?<SameModel f={f}/>:f<E.compact?<CrossModel f={f}/>:f<E.run?<CompactHistory f={f}/>:<CotRecap f={f}/>)}{game&&<FlagRunner f={f} frames={flag}/>} {[E.overview,E.same,E.filter,E.benefits,E.cross,E.compact,E.run,E.recap].map(change=><WorldWipe key={change} f={f} change={change}/>)}</>}>{game&&<FlagCourse f={f} frames={flag}/>}</PixelWorld>;
}
export function Chapter5(){return <AbsoluteFill style={{fontWeight:D.weight}}><Audio src={`${staticFile('audio/voiceover-with-effects.wav')}?v=${mix.outputSha256.slice(0,12)}`} startFrom={timing.chapterStartFrame} endAt={timing.chapterEndFrame}/><Chapter5Scene/></AbsoluteFill>}
