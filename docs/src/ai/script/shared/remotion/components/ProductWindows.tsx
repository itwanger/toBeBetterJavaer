// 产品界面示意：Claude Code 终端（输入框打字、发送后思考标记旋转、回复逐行出现、/model 菜单切换模型）和 Codex 窗口。
// 界面按产品风格绘制，不是截图。图标读取项目 public/images 下的 claude-code.png、codex.png（来源见 shared/assets/brands）。
import React from 'react';
import { Img, staticFile } from 'remotion';

const mono: React.CSSProperties = { fontFamily: 'Menlo, monospace', fontWeight: 700 };

export const WINDOW = { width: 1000, height: 560 };
// 回复区的代码行：每段一个色块，模拟语法高亮，不写具体代码文字。
const CODE: [number, string][][] = [
  [[90, '#c792ea'], [160, '#82aaff'], [60, '#c9cbd0']],
  [[40, 'transparent'], [120, '#c792ea'], [200, '#c3e88d']],
  [[40, 'transparent'], [180, '#82aaff'], [90, '#f78c6c'], [120, '#c9cbd0']],
  [[40, 'transparent'], [140, '#c792ea'], [220, '#c3e88d']],
  [[60, '#c9cbd0']],
];
const ORANGE = '#d97757';
/** /model 菜单默认列出的型号，按当代模型维护；项目可通过 models 传入其他列表。 */
export const MODELS = ['Haiku 4.5', 'Sonnet 5.5', 'Opus 5.5'];

export type WindowState = {
  input: string;
  caret: boolean;
  /** 0 未发送，1 已发送并在思考，标记随帧旋转。 */
  working: number;
  frame: number;
  /** /model 菜单显隐 0–1，cursor 为菜单光标所在行（可为小数，用于移动动画）。 */
  menu: number;
  cursor: number;
  /** 回复区进度 0–1：先出工具调用标记，再逐行出现代码。 */
  output: number;
};

const Chrome: React.FC = () => (
  <div style={{ height: 44, background: '#2a2a2c', display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px' }}>
    {['#ff5f57', '#febc2e', '#28c840'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}
  </div>
);

export const ClaudeCodeWindow: React.FC<{ state: WindowState; models?: string[] }> = ({ state, models = MODELS }) => {
  const { input, caret, working, frame, menu, cursor, output } = state;
  const rows = output * (CODE.length + 1);
  const selected = Math.round(cursor);
  return (
    <div style={{ width: WINDOW.width, height: WINDOW.height, borderRadius: 18, overflow: 'hidden', background: '#1c1c1e',
      boxShadow: '0 40px 90px rgba(10,10,10,.28), 0 0 0 1px rgba(255,255,255,.06) inset' }}>
      <Chrome />
      <div style={{ position: 'relative', padding: '30px 38px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Img src={staticFile('images/claude-code.png')} style={{ width: 44, height: 44 }} />
          <span style={{ fontSize: 34, fontWeight: 800, color: '#f2f2f2' }}>Claude Code</span>
        </div>
        <div style={{ marginTop: 30, border: '2px solid #55575c', borderRadius: 14, padding: '20px 26px', display: 'flex', alignItems: 'center',
          ...mono, fontSize: 42, color: '#f2f2f2' }}>
          <span style={{ color: '#8b8e94', marginRight: 22 }}>&gt;</span>
          {input}
          <span style={{ color: '#8b8e94', opacity: caret ? 1 : 0 }}>▍</span>
          <span style={{ marginLeft: 'auto', opacity: working, display: 'inline-block', transform: `rotate(${frame * 9}deg)`, color: ORANGE,
            fontSize: 46 }}>✻</span>
        </div>
        <div style={{ position: 'absolute', left: 38, right: 38, top: 250, opacity: 1 - menu }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: Math.min(1, rows) }}>
            <span style={{ color: ORANGE, fontSize: 30 }}>⏺</span>
            <div style={{ height: 18, width: 260, borderRadius: 9, background: '#e8e8ea' }} />
            <div style={{ height: 18, width: 120, borderRadius: 9, background: '#6b6e75' }} />
          </div>
          {CODE.map((line, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginTop: 20, marginLeft: 46, opacity: Math.max(0, Math.min(1, rows - 1 - i)) }}>
              {line.map(([w, color], j) => <div key={j} style={{ height: 16, width: w, borderRadius: 8, background: color }} />)}
            </div>
          ))}
        </div>
        <div style={{ position: 'relative', marginTop: 18, opacity: menu, transform: `translateY(${(1 - menu) * 16}px)` }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: cursor * 64, height: 60, borderRadius: 10, background: 'rgba(217,119,87,.16)' }} />
          {models.map((m, i) => (
            <div key={m} style={{ position: 'relative', height: 64, display: 'flex', alignItems: 'center', gap: 22, padding: '0 24px', ...mono,
              fontSize: 36, color: i === selected ? ORANGE : '#c9cbd0' }}>
              <span style={{ width: 24 }}>{i === selected ? '❯' : ''}</span>{m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** 叠在 Claude Code 后面的 Codex 窗口，只露出顶部，表示同类工具。 */
export const CodexWindow: React.FC = () => (
  <div style={{ width: 820, height: 420, borderRadius: 18, overflow: 'hidden', background: '#111216', boxShadow: '0 30px 70px rgba(10,10,10,.22)' }}>
    <Chrome />
    <div style={{ padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <Img src={staticFile('images/codex.png')} style={{ width: 44, height: 44 }} />
      <span style={{ fontSize: 34, fontWeight: 800, color: '#f2f2f2' }}>Codex</span>
    </div>
  </div>
);
