// 原稿配图的镜头聚焦：在原图上平移、放大到正在讲的局部，讲完再拉回全图。
// 原图不裁剪、不重绘，只移动取景窗口；焦点用原图的归一化坐标 [左, 上, 右, 下] 表示，0–1。
import React from 'react';
import { Img, interpolate, staticFile, Easing } from 'remotion';
import { C, MONO, card } from './index';

export type Focus = [number, number, number, number];
export const FULL: Focus = [0, 0, 1, 1];
export type FocusKey = { at: number; focus: Focus };

/** 左侧配图卡片 + 右侧说明列的布局。 */
export const FOCUS_BOX = { left: 96, top: 150, width: 1300, height: 732 };
export const FOCUS_GUIDE = { left: 1436, top: 150, width: 388 };
/** 配图独占中央时的取景框，与 FigureCard 默认区域一致。 */
export const FOCUS_BOX_WIDE = { left: 285, top: 157, width: 1350, height: 760 };

/** 按关键帧切换焦点，每次切换在 ease 帧内缓动过去。关键帧按 at 递增。 */
export const focusAt = (keys: FocusKey[], frame: number, ease = 26): Focus => {
  let i = 0;
  while (i + 1 < keys.length && frame >= keys[i + 1].at) i++;
  const to = keys[i].focus;
  const from = i ? keys[i - 1].focus : to;
  const t = i
    ? interpolate(frame, [keys[i].at, keys[i].at + ease], [0, 1], {
      easing: Easing.inOut(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })
    : 1;
  return to.map((v, j) => from[j] + (v - from[j]) * t) as Focus;
};

export interface FigureFocusProps {
  /** public/ 下的路径，例如 'images/fig1.png'。 */
  file: string;
  /** 原图像素尺寸，用来保持比例。 */
  imgW: number;
  imgH: number;
  focus: Focus;
  box?: { left: number; top: number; width: number; height: number };
  /** 卡片边框；false 时不加边框。 */
  framed?: boolean;
  /** 卡片边框颜色，例如错误猜测时用铁锈橙。 */
  frameColor?: string;
  /** 叠加在原图上的标记（框选圈、鼠标指针），按原图百分比定位，随镜头一起移动和缩放。 */
  children?: React.ReactNode;
}

/**
 * 在 maxBox 范围内取一个和原图同宽高比的取景框并居中。带边框的配图必须用它，图片正好填满边框，上下左右不留空白。
 */
export const fitBox = (imgW: number, imgH: number, maxBox = FOCUS_BOX) => {
  const scale = Math.min(maxBox.width / imgW, maxBox.height / imgH);
  const width = Math.round(imgW * scale);
  const height = Math.round(imgH * scale);
  return { left: maxBox.left + Math.round((maxBox.width - width) / 2), top: maxBox.top + Math.round((maxBox.height - height) / 2), width, height };
};

/**
 * 取景框内显示原图的 focus 区域，等比放大到能完整放下该区域。
 * 图片始终铺满取景框：放大倍数不低于铺满所需，位置也限制在原图范围内，边框里不会露出空白。
 */
export const FigureFocus: React.FC<FigureFocusProps> = ({
  file, imgW, imgH, focus, box = FOCUS_BOX, framed = true, frameColor = C.blue, children,
}) => {
  const [u0, v0, u1, v1] = focus;
  const fit = Math.min(box.width / (imgW * (u1 - u0)), box.height / (imgH * (v1 - v0)));
  const scale = Math.max(fit, box.width / imgW, box.height / imgH);
  const w = imgW * scale;
  const h = imgH * scale;
  const clampPos = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const left = clampPos(box.width / 2 - ((u0 + u1) / 2) * w, box.width - w);
  const top = clampPos(box.height / 2 - ((v0 + v1) / 2) * h, box.height - h);
  const frame: React.CSSProperties = framed
    ? { ...card, borderColor: frameColor }
    : {};
  return (
    <div style={{ position: 'absolute', ...box, ...frame, overflow: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ position: 'absolute', width: w, height: h, left, top }}>
        <Img src={staticFile(file)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        {children}
      </div>
    </div>
  );
};

/**
 * 原图上的框选：按原图归一化坐标 [左, 上, 右, 下] 画直角框，放进 FigureFocus 的 children。
 * 并列多栏的信息图不放大，整图展示，讲到哪一栏就框哪一栏。`label` 是贴在框左上角的小标签。
 */
export const FocusRing: React.FC<{ area: Focus; color?: string; opacity: number; label?: string }> = ({ area, color = C.rust, opacity, label }) => {
  const [u0, v0, u1, v1] = area;
  return (
    <div style={{
      position: 'absolute', left: `${u0 * 100}%`, top: `${v0 * 100}%`, width: `${(u1 - u0) * 100}%`, height: `${(v1 - v0) * 100}%`,
      border: `5px solid ${color}`, boxShadow: '0 0 0 3px white', boxSizing: 'border-box',
      opacity, transform: `scale(${1.04 - 0.04 * opacity})`, pointerEvents: 'none',
    }}>
      {label && (
        <div style={{ position: 'absolute', left: -5, bottom: '100%', background: color, color: 'white', fontFamily: MONO, fontSize: 20,
          padding: '4px 10px', whiteSpace: 'nowrap' }}>{label}</div>
      )}
    </div>
  );
};

/** 右侧说明列里的一张卡片：短标题 + 一句说明，随焦点切换入场。 */
export const FocusNote: React.FC<{ color?: string; title: string; children?: React.ReactNode; opacity: number }> = ({
  color = C.blue, title, children, opacity,
}) => (
  <div style={{ ...card, borderColor: color, padding: '20px 24px', marginBottom: 28, opacity,
    transform: `translateX(${(1 - opacity) * 22}px)` }}>
    <div style={{ fontSize: 24, fontWeight: 800, color }}>{title}</div>
    {children && <div style={{ fontSize: 26, fontWeight: 700, marginTop: 12, lineHeight: 1.45 }}>{children}</div>}
  </div>
);
