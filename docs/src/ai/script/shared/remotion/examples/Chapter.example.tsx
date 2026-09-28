// 章节骨架。复制为项目 remotion/src/Chapter<N>.tsx 后，把 ch1 / CHAPTERS[0] / index 换成本章，
// 先跑 build_timing.py 生成 ch<N>-phrase-timing.json，再写场景。场景名与事件名随内容改。
import React from 'react';
import {staticFile, useCurrentFrame} from 'remotion';
import {C, card, Popped} from '../../../shared/remotion/components';
import {SceneEntrance} from '../../../shared/remotion/components/Enhancements';
import {ChapterShell, FigureCard, SceneChain, subtitleAt} from '../../../shared/remotion/components/Scenes';
import timing from '../../assets/references/ch1-phrase-timing.json';
import mix from '../../build/sound-mix.json';
import {CHAPTERS} from '../../build/cues';

const INDEX = 0;
const E = timing.events as Record<string, number>;

const panel: React.CSSProperties = {...card, position: 'absolute', boxSizing: 'border-box'};
const heading: React.CSSProperties = {position: 'absolute', left: 150, top: 178, fontSize: 57, fontWeight: 900};

// 场景内的 useCurrentFrame() 是 Sequence 局部帧；加上场景起点后才能和 E 里的章节帧比较。
const Opening: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <SceneEntrance>
      <div style={heading}>本章标题</div>
      <Popped frame={f} delay={E.detail} style={{...panel, left: 150, top: 330, width: 600, height: 300, padding: 36}}>
        <div style={{fontSize: 40, fontWeight: 850, color: C.blue}}>术语起音前约 5 帧入场</div>
      </Popped>
    </SceneEntrance>
  );
};

const Figure: React.FC = () => <FigureCard file="images/figure-1.png" />;

export const Chapter1: React.FC = () => {
  const f = useCurrentFrame();
  const chapter = CHAPTERS[INDEX];
  return (
    <ChapterShell
      index={INDEX}
      chapters={CHAPTERS.map((c) => c.title)}
      brand={<>本期品牌</>}
      subtitle={subtitleAt(timing.subtitles, f)}
      audio={{
        src: `${staticFile('audio/voiceover-with-effects.wav')}?v=${mix.outputSha256.slice(0, 12)}`,
        startFrom: chapter.startFrame,
        endAt: chapter.endFrame,
      }}
    >
      <SceneChain
        totalFrames={timing.chapterFrames}
        scenes={[
          [0, Opening],
          [E.figure, Figure],
        ]}
      />
    </ChapterShell>
  );
};
