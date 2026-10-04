// 连续舞台：整章共用一个画面空间，元素按关键帧移动、缩放、淡入淡出，不靠卡片边框和硬切换场景。
import React from 'react';
import { AbsoluteFill, Easing, interpolate } from 'remotion';

export type Key = [frame: number, value: number];

/** 按关键帧插值，默认缓入缓出。关键帧必须按帧号递增。 */
export const track = (f: number, keys: Key[], easing = Easing.inOut(Easing.cubic)) => interpolate(
  f, keys.map((k) => k[0]), keys.map((k) => k[1]), { easing, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
);

/** 从 at 开始 frames 帧内由 0 到 1，再从 out 开始淡出；out 省略时不淡出。 */
export const life = (f: number, at: number, out?: number, frames = 10) => {
  const enter = track(f, [[at, 0], [at + frames, 1]]);
  return out === undefined ? enter : enter * track(f, [[out, 1], [out + frames, 0]]);
};

/** 以 (x, y) 为中心放置元素，scale 与 opacity 由调用方按帧计算。 */
export const Actor: React.FC<{
  x: number; y: number; scale?: number; opacity?: number; origin?: string; children: React.ReactNode;
}> = ({ x, y, scale = 1, opacity = 1, origin = 'center', children }) => {
  if (opacity <= 0.001) return null;
  const shift = origin === 'left' ? 'translate(0, -50%)' : 'translate(-50%, -50%)';
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity, transform: `${shift} scale(${scale})`,
      transformOrigin: origin === 'left' ? 'left center' : 'center', whiteSpace: 'nowrap' }}>
      {children}
    </div>
  );
};

/** 跟随焦点移动的柔光和极淡的点阵，用明暗区分主次，替代卡片边框。 */
export const Spotlight: React.FC<{ x: number; y: number; color?: string }> = ({ x, y, color = '45, 91, 227' }) => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <AbsoluteFill style={{ backgroundImage: 'radial-gradient(rgba(10,10,10,0.07) 1.6px, transparent 1.6px)', backgroundSize: '44px 44px' }} />
    <AbsoluteFill style={{ background: `radial-gradient(900px 620px at ${x}px ${y}px, rgba(${color}, 0.10), rgba(${color}, 0) 70%)` }} />
  </AbsoluteFill>
);
