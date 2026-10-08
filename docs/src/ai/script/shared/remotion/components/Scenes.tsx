import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, card, ChapterStrip} from './index';
import {SceneEntrance} from './Enhancements';
import {InterviewAvatar} from './InterviewAvatar';

/**
 * Reusable scene shells. They carry layout only: titles, subtitles, media paths and frame
 * numbers always come from the project (phrase-timing, cues), never from this file.
 */

export type TimedText = {text: string; startFrame: number; endFrame: number};

/** Subtitle visible at a chapter-local frame, or '' between groups. */
export const subtitleAt = (subtitles: TimedText[], frame: number): string =>
  subtitles.find((s) => frame >= s.startFrame && frame < s.endFrame)?.text ?? '';

export type SceneEntry = [startFrame: number, Scene: React.FC];

/**
 * Mounts each scene once, from its start frame until the next scene starts.
 * Replaces hand-written durationInFrames arithmetic between neighbouring Sequences.
 */
export const SceneChain: React.FC<{scenes: SceneEntry[]; totalFrames: number}> = ({scenes, totalFrames}) => (
  <>
    {scenes.map(([from, Scene], i) => {
      const until = i + 1 < scenes.length ? scenes[i + 1][0] : totalFrames;
      return (
        <Sequence key={i} from={from} durationInFrames={Math.max(1, until - from)}>
          <Scene />
        </Sequence>
      );
    })}
  </>
);

export interface ChapterShellProps {
  /** 0-based index of this chapter in `chapters`. */
  index: number;
  chapters: string[];
  brand: React.ReactNode;
  subtitle: string;
  /** Chapter slice of the delivery audio; pass a versioned src so Studio reloads new mixes. */
  audio: {src: string; startFrom: number; endAt: number};
  /** Hide the chapter strip, e.g. while an interview opening uses the top area. */
  showStrip?: boolean;
  /**
   * All chapters' absolute frame ranges (CHAPTERS from build/cues). When given, a segmented progress bar
   * is drawn under the subtitle and the subtitle moves up to make room.
   */
  progress?: ChapterRange[];
  background?: string;
  children: React.ReactNode;
}

export type ChapterRange = {startFrame: number; endFrame: number};

const PROGRESS = {bottom: 30, height: 6, gap: 10, side: 96};

/**
 * Segmented progress bar, one segment per chapter, widths proportional to chapter length. Past chapters
 * are full, the current one fills with `globalFrame`, later ones stay grey.
 */
export const ChapterProgress: React.FC<{chapters: ChapterRange[]; globalFrame: number; active: number}> = ({chapters, globalFrame, active}) => {
  const total = chapters[chapters.length - 1].endFrame - chapters[0].startFrame;
  return (
    <div style={{position: 'absolute', left: PROGRESS.side, right: PROGRESS.side, bottom: PROGRESS.bottom, height: PROGRESS.height, zIndex: 30,
      display: 'flex', gap: PROGRESS.gap}}>
      {chapters.map((c, i) => {
        const fill = i < active ? 1 : i > active ? 0 : Math.min(1, Math.max(0, (globalFrame - c.startFrame) / (c.endFrame - c.startFrame)));
        return (
          <div key={i} style={{flex: `${(c.endFrame - c.startFrame) / total} 1 0`, height: '100%', background: C.line, overflow: 'hidden'}}>
            <div style={{width: `${fill * 100}%`, height: '100%', background: i === active ? C.blue : C.soft}} />
          </div>
        );
      })}
    </div>
  );
};

/** Background, chapter audio, chapter strip and single-line subtitle shared by every chapter. */
export const ChapterShell: React.FC<ChapterShellProps> = ({
  index, chapters, brand, subtitle, audio, showStrip = true, progress, background = C.bg, children,
}) => {
  const frame = useCurrentFrame();
  return (
  <AbsoluteFill style={{background, color: C.ink, fontFamily: FONT}}>
    <Audio src={audio.src} startFrom={audio.startFrom} endAt={audio.endAt} />
    {children}
    {showStrip && (
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 134, zIndex: 20,
          background, transform: 'translateZ(0)', pointerEvents: 'none',
        }}
      >
        <ChapterStrip brand={brand} chapters={chapters} active={index} />
      </div>
    )}
    {subtitle && (
      <div style={{position: 'absolute', bottom: progress ? 58 : 42, left: 72, right: 72, zIndex: 30, display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            background: C.ink, color: 'white', padding: '15px 30px', borderRadius: 18,
            fontSize: 39, fontWeight: 600, lineHeight: 1.45, whiteSpace: 'nowrap',
          }}
        >
          {subtitle}
        </div>
      </div>
    )}
    {progress && <ChapterProgress chapters={progress} globalFrame={progress[index].startFrame + frame} active={index} />}
  </AbsoluteFill>
  );
};

export interface FigureCardProps {
  /** Path under public/, e.g. 'images/figure-1.png'. */
  file: string;
  /** Dark frame for terminal screenshots. */
  dark?: boolean;
  box?: {left: number; top: number; width: number; height: number};
  /** Default: no card, the figure sits directly on the background. false wraps it in a card. */
  plain?: boolean;
}

export const FIGURE_BOX = {left: 285, top: 157, width: 1350, height: 760};

/**
 * Original article figure, shown whole (contain) in the central area between strip and subtitle.
 * Shown plain by default; `dark` puts terminal screenshots on a dark card.
 */
export const FigureCard: React.FC<FigureCardProps> = ({file, dark = false, box = FIGURE_BOX, plain = !dark}) => (
  <SceneEntrance>
    <div
      style={
        plain
          ? {...box, position: 'absolute'}
          : {
            ...card, ...box, position: 'absolute',
            overflow: 'hidden', background: dark ? '#050505' : C.card,
          }
      }
    >
      <Img src={staticFile(file)} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
    </div>
  </SceneEntrance>
);

export interface HostCardProps {
  name?: string;
  src?: string;
  size?: number;
  left: number;
  top: number;
}

/** Round avatar with a thin rust ring and a dark name capsule, for self-intro and outro scenes. */
export const HostCard: React.FC<HostCardProps> = ({
  name = '二哥', src = 'images/ergo-avatar.jpg', size = 340, left, top,
}) => (
  <div style={{position: 'absolute', left, top, width: size, textAlign: 'center'}}>
    <Img
      src={staticFile(src)}
      style={{
        width: size, height: size, borderRadius: '50%', border: `4px solid ${C.rust}`,
        objectFit: 'cover', objectPosition: 'center top', boxSizing: 'border-box',
      }}
    />
    <div
      style={{
        display: 'inline-block', marginTop: 24, padding: '10px 30px', borderRadius: 999,
        background: C.ink, color: 'white', fontSize: 32, fontWeight: 800,
      }}
    >
      {name}
    </div>
  </div>
);

export interface InterviewStageProps {
  /** Short label at the top-left, e.g. the chapter name. */
  title: React.ReactNode;
  interviewerActive: boolean;
  candidateActive: boolean;
  /** 0 = candidate seated, 1 = candidate has left to the right. */
  candidateExit?: number;
  interviewer?: {src?: string; name?: string; role?: string};
  candidate?: {src?: string; name?: string; role?: string};
  /** Central semantic animation; position it inside x 470–1450. */
  children: React.ReactNode;
}

/** Doubao interviewer on the left and Ergo candidate on the right, facing each other. */
export const InterviewStage: React.FC<InterviewStageProps> = ({
  title, interviewerActive, candidateActive, candidateExit = 0, interviewer = {}, candidate = {}, children,
}) => (
  <>
    <div style={{position: 'absolute', left: 112, top: 75, fontSize: 30, fontWeight: 850}}>{title}</div>
    <div style={{position: 'absolute', left: 115, top: 348}}>
      <InterviewAvatar
        src={staticFile(interviewer.src ?? 'images/doubao-facing-right.png')}
        name={interviewer.name ?? '豆包'}
        role={interviewer.role ?? '面试官'}
        active={interviewerActive}
        accent={C.blue}
      />
    </div>
    <div
      style={{
        position: 'absolute', right: 115, top: 348,
        opacity: 1 - candidateExit, transform: `translateX(${candidateExit * 180}px)`,
      }}
    >
      <InterviewAvatar
        src={staticFile(candidate.src ?? 'images/ergo-facing-left.png')}
        name={candidate.name ?? '二哥'}
        role={candidate.role ?? '求职者'}
        active={candidateActive}
        accent={C.rust}
      />
    </div>
    {children}
  </>
);

export interface CoverFrameProps {
  /** 16:9 cover under public/, e.g. 'images/cover-16x9.png'. */
  file: string;
  /** Frames over which the cover fades out after frame 0; keep it before the first spoken word. */
  fadeFrames?: number;
}

/**
 * Shows the article's 16:9 cover on frame 0 of the full video, then fades it out. Players that show
 * the first frame as a poster (a bare <video> without poster) display the cover. Timeline is unchanged.
 */
export const CoverFrame: React.FC<CoverFrameProps> = ({file, fadeFrames = 6}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [1, 1 + fadeFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (opacity <= 0) return null;
  return (
    <AbsoluteFill style={{zIndex: 100, opacity}}>
      <Img src={staticFile(file)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </AbsoluteFill>
  );
};
