// 卡片内的常用元素：等宽小标签、代码配色、打字机、分格进度条、排行表、便签式结论卡。卡片样式和配色都来自 index 的 card 与 C。
import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, LABEL_FONT, MONO, SERIF, card} from './index';

/** 卡片代码里的配色：方法和选中值用蓝，键名和字符串用铁锈橙，标点用正文色，注释用灰。 */
export const SYNTAX = {method: C.blue, key: C.rust, string: C.rust, punct: C.ink, note: C.gray};

const ease = (frame: number, from: number, frames: number) =>
  interpolate(frame, [from, from + frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});

/** 卡片组件。`tilt` 是旋转角度，便签式的结论卡用 -2 到 2 度。 */
export const Card: React.FC<{style?: React.CSSProperties; tilt?: number; children: React.ReactNode}> = ({style, tilt = 0, children}) => (
  <div style={{...card, ...style, transform: `${style?.transform ?? ''} rotate(${tilt}deg)`}}>{children}</div>
);

/** 卡片顶部的小标签，比如“Markdown · 第 1 页”。英文数字用 Arial，中文用苹方，按原文大小写显示。 */
export const Kicker: React.FC<{color?: string; style?: React.CSSProperties; children: React.ReactNode}> = ({color = C.gray, style, children}) => (
  <div style={{fontFamily: LABEL_FONT, fontSize: 22, fontWeight: 600, letterSpacing: 1, color, ...style}}>{children}</div>
);

/** 打字机：从 `start` 帧起每 `perChar` 帧打出一个字符。 */
export const typed = (text: string, frame: number, start: number, perChar = 1.5) =>
  text.slice(0, Math.max(0, Math.min(text.length, Math.floor((frame - start) / perChar))));

/** 打字光标，蓝色实心块。 */
export const Caret: React.FC = () => (
  <span style={{display: 'inline-block', width: '0.55em', height: '1.05em', verticalAlign: '-0.15em', background: C.blue}} />
);

/** 选中态：浅蓝底，用于正在被替换的值。 */
export const Selected: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{background: C.select, color: C.blue, padding: '0 4px'}}>{children}</span>
);

/** 分格进度条。`filled` 是已填格数，配合 `segmentsAt` 按帧填充；缓存命中这类瞬间完成的场景直接传 `total`。 */
export const SegmentBar: React.FC<{total: number; filled: number; height?: number; gap?: number; color?: string}> = ({
  total, filled, height = 52, gap = 8, color = C.blue,
}) => (
  <div style={{display: 'flex', gap, height}}>
    {Array.from({length: total}, (_, i) => <div key={i} style={{flex: 1, background: i < filled ? color : C.track}} />)}
  </div>
);

export const segmentsAt = (frame: number, start: number, end: number, total: number) =>
  Math.round(interpolate(frame, [start, end], [0, total], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

export type RankRow = {
  name: string;
  /** 名称下方的等宽小字，比如模型 ID。 */
  id?: string;
  tag?: string;
  /** 标签颜色：rust 铁锈橙，blue 蓝。 */
  tone?: 'rust' | 'blue';
  /** 条形长度，0 到 1。 */
  value: number;
  score: string;
  extra?: string;
};

const RANK_COLS = [400, 140, 330, 130, 150];
const BORDER = 3;

/**
 * 排行表：表头等宽小字，各行按 `stagger` 帧错峰入场，条形图从 0 长出。
 * 到 `highlightAt` 帧时，`highlight` 里的行加蓝框，其余行变淡。帧号都是场景局部帧。
 */
export const RankTable: React.FC<{
  columns: string[]; rows: RankRow[]; frame: number; start?: number; stagger?: number; highlight?: number[]; highlightAt?: number;
  rowHeight?: number; widths?: number[];
}> = ({columns, rows, frame, start = 0, stagger = 4, highlight = [], highlightAt = Infinity, rowHeight = 76, widths = RANK_COLS}) => {
  const focus = ease(frame, highlightAt, 10);
  const cell = (i: number, align: 'left' | 'right' = 'left'): React.CSSProperties => ({width: widths[i], flexShrink: 0, textAlign: align});
  return (
    <div style={{width: widths.reduce((a, b) => a + b, 0) + 24}}>
      <div style={{display: 'flex', padding: '0 12px 14px'}}>
        {columns.map((c, i) => <Kicker key={c} style={cell(i, i >= 3 ? 'right' : 'left')}>{c}</Kicker>)}
      </div>
      {rows.map((r, i) => {
        const appear = ease(frame, start + i * stagger, 10);
        const grow = ease(frame, start + i * stagger + 4, 16);
        const picked = highlight.includes(i);
        const dim = picked ? 1 : 1 - 0.6 * focus;
        const tagColor = r.tone === 'blue' ? C.blue : C.rust;
        return (
          <div key={r.name} style={{
            display: 'flex', alignItems: 'center', height: rowHeight, padding: '0 12px', boxSizing: 'border-box',
            borderBottom: `1px solid ${C.line}`, opacity: appear,
            transform: `translateY(${(1 - appear) * 12}px)`,
            outline: picked ? `${BORDER}px solid rgba(33,80,180,${focus})` : 'none', outlineOffset: -BORDER,
            background: picked && focus > 0 ? C.card : 'transparent',
          }}>
            <div style={{...cell(0), opacity: dim}}>
              <div style={{fontSize: 30, fontWeight: 600, color: C.ink}}>{r.name}</div>
              {r.id && <div style={{fontFamily: MONO, fontSize: 18, color: C.gray, marginTop: 4}}>{r.id}</div>}
            </div>
            <div style={{...cell(1), opacity: dim}}>
              {r.tag && <span style={{fontFamily: MONO, fontSize: 17, letterSpacing: 2, color: tagColor, border: `2px solid ${tagColor}`,
                padding: '3px 8px'}}>{r.tag}</span>}
            </div>
            <div style={{...cell(2), paddingRight: 30, boxSizing: 'border-box'}}>
              <div style={{height: 18, background: C.track}}>
                <div style={{width: `${r.value * grow * 100}%`, height: '100%', background: picked || focus === 0 ? C.blue : C.soft}} />
              </div>
            </div>
            <div style={{...cell(3, 'right'), fontFamily: MONO, fontSize: 30, color: C.blue, opacity: dim}}>{r.score}</div>
            {r.extra !== undefined && <div style={{...cell(4, 'right'), fontFamily: MONO, fontSize: 30, color: C.ink, opacity: dim}}>{r.extra}</div>}
          </div>
        );
      })}
    </div>
  );
};

/**
 * 便签式结论卡：大号衬线结论，等宽小字写数据来源，铁锈橙衬线字收尾。中文不用斜体，强调靠颜色。
 * 从 `at` 帧起淡入，同时从 `tilt + 3` 度转到 `tilt` 度落定。
 */
export const NoteCard: React.FC<{
  frame: number; at: number; lines: React.ReactNode[]; detail?: React.ReactNode; footer?: React.ReactNode; tilt?: number;
  style?: React.CSSProperties;
}> = ({frame, at, lines, detail, footer, tilt = -2, style}) => {
  const p = ease(frame, at, 14);
  return (
    <Card tilt={tilt + 3 * (1 - p)} style={{padding: '44px 48px', opacity: p, ...style}}>
      {lines.map((line, i) => (
        <div key={i} style={{fontFamily: SERIF, fontSize: 68, lineHeight: 1.15, whiteSpace: 'nowrap', color: C.blue, letterSpacing: -1}}>{line}</div>
      ))}
      {detail && <div style={{fontFamily: MONO, fontSize: 20, lineHeight: 1.7, color: C.ink, marginTop: 30}}>{detail}</div>}
      {footer && <div style={{fontFamily: SERIF, fontSize: 34, lineHeight: 1.4, color: C.rust, marginTop: 26}}>{footer}</div>}
    </Card>
  );
};
