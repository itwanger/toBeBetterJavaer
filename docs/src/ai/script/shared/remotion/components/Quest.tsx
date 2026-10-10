// Shared rank staircase and timed quiz cards; callers provide topic icons, labels and audio anchors.
import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { C, Popped, card } from './index';
import { SceneEntrance } from './Enhancements';

const panel: React.CSSProperties = { ...card, position: 'absolute' };
const fadeIn = (f: number, at: number, frames = 6) =>
  interpolate(f, [at, at + frames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const DEFAULT_LEVELS = ['30%', '50%', '70%', '90%', '99%'];
// 台阶整体水平居中：5 级时左边距正好是 330，级数随稿子里实际出现的百分比变化。
const STEP = { base: 880, width: 252, rise: 105 };
const stairsLeft = (count: number) => (1920 - count * STEP.width) / 2;
const AVATAR = 132;
// 弹幕：画面上方两条轨道，错峰出场，每条从右往左匀速飘过一次，慢到能看清字。
const DANMU = { lanes: [150, 225], stagger: 24, frames: 210, from: 1920, to: -320 };

const stepTop = (i: number) => STEP.base - (i + 1) * STEP.rise;

const TrophyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 90, color = C.rust }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 6h20v12c0 6-4 11-10 11s-10-5-10-11zM14 10H6c0 6 3 10 8 10M34 10h8c0 6-3 10-8 10M24 29v7M15 42h18l-2-6H17z" fill="white" />
  </svg>
);

/**
 * Staircase of ranks, centred horizontally. Defaults to five ranks; pass `levels` with the percentages the script actually uses.
 * The host avatar climbs from the previous step onto `level`, sparks appear at `cheerAt`.
 */
export const LevelStairs: React.FC<{ level: number; cheerAt?: number; levels?: string[] }> = ({
  level,
  cheerAt,
  levels = DEFAULT_LEVELS,
}) => {
  const f = useCurrentFrame();
  const left0 = stairsLeft(levels.length);
  const climb = interpolate(f, [4, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fromTop = level === 0 ? STEP.base : stepTop(level - 1);
  const fromLeft = left0 + Math.max(level - 1, 0) * STEP.width;
  const toLeft = left0 + level * STEP.width;
  const avatarLeft = fromLeft + (toLeft - fromLeft) * climb + (STEP.width - AVATAR) / 2;
  const avatarTop = fromTop + (stepTop(level) - fromTop) * climb - AVATAR - 8;
  const cheer = cheerAt === undefined ? 0 : fadeIn(f, cheerAt, 6);
  return (
    <SceneEntrance>
      {levels.map((label, i) => {
        const done = i <= level;
        const color = i === levels.length - 1 ? C.rust : C.blue;
        return (
          <div
            key={label}
            style={{
              position: 'absolute',
              left: left0 + i * STEP.width,
              top: stepTop(i),
              width: STEP.width - 12,
              height: (i + 1) * STEP.rise,
              boxSizing: 'border-box',
              border: `3px ${done ? 'solid' : 'dashed'} ${done ? color : C.faint}`,
              background: done ? `${color}18` : 'transparent',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 18,
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 900, color: done ? color : C.faint }}>{label}</div>
          </div>
        );
      })}
      {/* 登顶后头像站在最高一级，奖杯移到台阶右侧，避免被头像挡住。 */}
      <div
        style={{
          position: 'absolute',
          left:
            level === levels.length - 1
              ? left0 + levels.length * STEP.width + 10
              : left0 + (levels.length - 1) * STEP.width + (STEP.width - 102) / 2,
          top: stepTop(levels.length - 1) - 112,
          opacity: level === levels.length - 1 ? 1 : 0.35,
        }}
      >
        <TrophyIcon size={96} color={level === levels.length - 1 ? C.rust : C.faint} />
      </div>
      <Img
        src={staticFile('images/ergo-avatar.jpg')}
        style={{
          position: 'absolute',
          left: avatarLeft,
          top: avatarTop,
          width: AVATAR,
          height: AVATAR,
          borderRadius: '50%',
          border: `4px solid ${C.rust}`,
          objectFit: 'cover',
          objectPosition: 'center top',
          boxSizing: 'border-box',
        }}
      />
      {cheer > 0 &&
        [-60, -20, 20, 60].map((deg) => (
          <div
            key={deg}
            style={{
              position: 'absolute',
              left: avatarLeft + AVATAR / 2 - 3,
              top: avatarTop - 40,
              width: 6,
              height: 30,
              borderRadius: 3,
              background: C.rust,
              opacity: cheer,
              transform: `rotate(${deg}deg)`,
              transformOrigin: '50% 100%',
              translate: '0 -6px',
            }}
          />
        ))}
    </SceneEntrance>
  );
};

export type QuizOption = { key: string; label: string; icon: React.ReactNode; at: number };

/**
 * Quiz card row. Options pop in at their own frames; cards listed in `answers` turn green at `answerAt`.
 * `danmu` chips drift once from right to left in two lanes above the cards from `danmuAt`, suggesting viewers answer in the comments.
 * `prompt` fills the card area while the question is asked and fades out just before the first option.
 */
export const QuizBoard: React.FC<{
  options: QuizOption[];
  offset: number;
  answers?: string[];
  answerAt?: number;
  danmu?: string[];
  danmuAt?: number;
  prompt?: React.ReactNode;
}> = ({ options, offset, answers = [], answerAt, danmu = [], danmuAt, prompt }) => {
  const f = useCurrentFrame() + offset;
  const width = options.length > 3 ? 360 : 460;
  const gap = 40;
  const total = options.length * width + (options.length - 1) * gap;
  const revealed = answerAt !== undefined && f >= answerAt;
  const promptOpacity = 1 - fadeIn(f, options[0].at - 6, 6);
  return (
    <SceneEntrance>
      {prompt && promptOpacity > 0 && <div style={{ position: 'absolute', inset: 0, opacity: promptOpacity }}>{prompt}</div>}
      {options.map((o, i) => {
        const right = revealed && answers.includes(o.key);
        const dim = revealed && !right;
        return (
          <Popped
            key={o.key}
            frame={f}
            delay={o.at}
            style={{
              ...panel,
              left: (1920 - total) / 2 + i * (width + gap),
              top: 330,
              width,
              height: 420,
              borderWidth: right ? 5 : 3,
              borderColor: right ? C.green : C.blue,
              opacity: dim ? 0.4 : 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 34,
            }}
          >
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: '50%',
                background: right ? C.green : C.blue,
                color: 'white',
                fontSize: 48,
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {o.key}
            </div>
            <div style={{ height: 150, display: 'flex', alignItems: 'center' }}>{o.icon}</div>
            <div style={{ fontSize: 38, fontWeight: 900, whiteSpace: 'nowrap' }}>{o.label}</div>
          </Popped>
        );
      })}
      {danmuAt !== undefined &&
        f >= danmuAt &&
        danmu.map((text, i) => {
          const start = danmuAt + i * DANMU.stagger;
          if (f < start || f > start + DANMU.frames) return null;
          const x = interpolate(f, [start, start + DANMU.frames], [DANMU.from, DANMU.to], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={text}
              style={{
                position: 'absolute',
                left: x,
                top: DANMU.lanes[i % DANMU.lanes.length],
                padding: '8px 22px',
                borderRadius: 999,
                background: 'white',
                border: `2px solid ${i % 2 ? C.rust : C.blue}`,
                fontSize: 28,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </div>
          );
        })}
    </SceneEntrance>
  );
};
