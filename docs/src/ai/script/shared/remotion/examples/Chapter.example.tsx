// 章节骨架。复制为项目 remotion/src/Chapter<N>.tsx 后，把 ch1 / CHAPTERS[0] / index 换成本章，
// 先跑 build_timing.py 生成 ch<N>-phrase-timing.json，再写场景。场景名与事件名随内容改。
import React from 'react';
import {staticFile, useCurrentFrame} from 'remotion';
import {C, card, clamp, Popped} from '../../../shared/remotion/components';
import {SceneEntrance} from '../../../shared/remotion/components/Enhancements';
import {ChapterShell, FigureCard, SceneChain, subtitleAt} from '../../../shared/remotion/components/Scenes';
import {FigureFocus, FocusNote, fitBox, focusAt, FOCUS_BOX, FOCUS_GUIDE, FULL, Focus} from '../../../shared/remotion/components/FigureFocus';
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

// 原稿配图整图静态展示时不套黑框和阴影，直接放在背景上。
const Figure: React.FC = () => <FigureCard file="images/figure-1.png" plain />;

// 局部有细节的配图做镜头聚焦：先全图，再按配音依次放大到各块，最后拉回全图；右侧说明卡随焦点入场。
// 并列多栏的信息图不放大，整图展示，用 FocusRing 圈出当前栏。
// 焦点是原图归一化坐标 [左, 上, 右, 下]，在关键帧里逐块写，窗口要包住完整的一组内容。
const PART_A: Focus = [0.05, 0.12, 0.5, 0.6];
const PART_B: Focus = [0.5, 0.12, 0.95, 0.6];
const FocusFigure: React.FC = () => {
  const f = useCurrentFrame() + E.focus;
  const keys = [{at: E.focus, focus: FULL}, {at: E.partA, focus: PART_A}, {at: E.partB, focus: PART_B}, {at: E.wrap, focus: FULL}];
  return (
    <>
      {/* 带边框的配图用 fitBox 取同宽高比的取景框，边框紧贴图片。 */}
      <FigureFocus file="images/figure-2.png" imgW={1672} imgH={941} box={fitBox(1672, 941, FOCUS_BOX)} focus={focusAt(keys, f)} />
      <div style={{position: 'absolute', ...FOCUS_GUIDE}}>
        <FocusNote title="第一块" opacity={clamp(f, E.partA - 5, E.partA + 7)}>要点短语</FocusNote>
        <FocusNote title="第二块" color={C.orange} opacity={clamp(f, E.partB - 5, E.partB + 7)}>要点短语</FocusNote>
      </div>
    </>
  );
};

export const Chapter1: React.FC = () => {
  const f = useCurrentFrame();
  const chapter = CHAPTERS[INDEX];
  return (
    <ChapterShell
      index={INDEX}
      chapters={CHAPTERS.map((c) => c.title)}
      brand={<>本期品牌</>}
      progress={CHAPTERS}
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
          [E.focus, FocusFigure],
        ]}
      />
    </ChapterShell>
  );
};
