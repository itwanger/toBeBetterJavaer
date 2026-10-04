// 连续画面章节骨架。复制为项目 remotion/src/Chapter<N>.tsx 后，把 ch1 / INDEX 换成本章。
// 一章只有一个画面空间：主角跨段落延续，位置、缩放、透明度都按章节帧插值，不用 SceneChain 硬切。规范见 shared/VISUAL_STYLE.md。
import React from 'react';
import { Sequence, staticFile, useCurrentFrame } from 'remotion';
import { C } from '../../../shared/remotion/components';
import { ChapterShell, FigureCard, subtitleAt } from '../../../shared/remotion/components/Scenes';
import { ClaudeCodeWindow } from '../../../shared/remotion/components/ProductWindows';
import { Actor, Spotlight, life, track } from '../../../shared/remotion/components/Stage';
import timing from '../../assets/references/ch1-phrase-timing.json';
import mix from '../../build/sound-mix.json';
import { CHAPTERS } from '../../build/cues';

const INDEX = 0;
const E = timing.events as Record<string, number>;
const PROMPT = '帮我写一个登录接口';

// 主角一：产品窗口。前半段居中演示操作，后半段缩到左边，变成右侧图示的来源。
const Product: React.FC<{ f: number }> = ({ f }) => (
  <Actor x={track(f, [[E.shrink, 960], [E.shrink + 20, 360]])} y={540} scale={track(f, [[E.shrink, 0.9], [E.shrink + 20, 0.42]])}
    opacity={life(f, E.product, E.figure - 6)}>
    <ClaudeCodeWindow state={{
      input: PROMPT.slice(0, Math.round(track(f, [[E.typing, 0], [E.typing + 24, 1]]) * PROMPT.length)),
      caret: f < E.send && Math.floor(f / 15) % 2 === 0,
      working: life(f, E.send, undefined, 6),
      frame: f,
      menu: 0,
      cursor: 1,
      output: track(f, [[E.send + 8, 0], [E.send + 50, 1]]),
    }} />
  </Actor>
);

// 主角二：右侧的图形。产品窗口缩到左边时出现，后面的段落在它身上继续变化，而不是换一张新图。
const Result: React.FC<{ f: number }> = ({ f }) => (
  <Actor x={1220} y={540} scale={track(f, [[E.shrink + 10, 0.9], [E.shrink + 24, 1]])} opacity={life(f, E.shrink + 10, E.figure - 6)}>
    <div style={{ width: 640, height: 8, borderRadius: 4, background: C.blue }} />
  </Actor>
);

export const Chapter1: React.FC = () => {
  const f = useCurrentFrame();
  const chapter = CHAPTERS[INDEX];
  const focusX = track(f, [[E.shrink, 960], [E.shrink + 20, 1180]]);
  return (
    <ChapterShell index={INDEX} chapters={CHAPTERS.map((c) => c.title)} brand={<>本期品牌</>} subtitle={subtitleAt(timing.subtitles, f)}
      audio={{ src: `${staticFile('audio/voiceover-with-effects.wav')}?v=${mix.outputSha256.slice(0, 12)}`, startFrom: chapter.startFrame,
        endAt: chapter.endFrame }}>
      <Spotlight x={focusX} y={540} />
      <Product f={f} />
      <Result f={f} />
      <Sequence from={E.figure}><FigureCard file="images/figure-1.png" plain /></Sequence>
    </ChapterShell>
  );
};
