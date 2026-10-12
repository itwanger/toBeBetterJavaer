// 真实终端录制的还原：Claude Code 这类 TUI 的会话按录制的文字逐行出现，只压缩时间。
// 文字、顺序、行数由项目从 record_tui.py 的 timeline.json 里取，组件只负责版式；没录到的内容不要补。
// 首次用于 agent-user-interjection（2026-10-12），从项目 ClaudeTerminal.tsx 提升。
import React from 'react';
import { Img, staticFile } from 'remotion';
import { C, MONO, card } from './index';

export type TermLine = { at: number; kind: 'user' | 'tool' | 'say' | 'result' | 'interrupt'; text: string };

const FONT_SIZE = 23;
const LINE_H = 34;
const DIM = C.faint;
const SPIN = ['✶', '✻', '✽', '✢', '·', '✢', '✽', '✻'];

const Row: React.FC<{ line: TermLine; highlight?: boolean }> = ({ line, highlight }) => {
  if (line.kind === 'user') {
    return (
      <div style={{ display: 'flex', gap: 14, background: `${C.card}1c`, padding: '4px 10px', margin: '6px 0',
        outline: highlight ? `4px solid ${C.soft}` : 'none', outlineOffset: 4 }}>
        <span style={{ color: DIM }}>❯</span><span style={{ color: C.card }}>{line.text}</span>
      </div>
    );
  }
  if (line.kind === 'result' || line.kind === 'interrupt') {
    return (
      <div style={{ paddingLeft: 28, color: line.kind === 'interrupt' ? C.rust : DIM, fontWeight: line.kind === 'interrupt' ? 800 : 400 }}>
        ⎿&nbsp;&nbsp;{line.text}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
      <span style={{ color: line.kind === 'tool' ? C.green : C.card }}>⏺</span>
      <span style={{ color: C.card, fontWeight: line.kind === 'tool' ? 700 : 400 }}>{line.text}</span>
    </div>
  );
};

/** 终端右上角的录制标签：真实录制用蓝色，对照录制（另一次会话）用铁锈橙。 */
export const RecordingBadge: React.FC<{ color?: string; children: React.ReactNode }> = ({ color = C.blue, children }) => (
  <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: 999, fontSize: 22, fontWeight: 800, background: color, color: 'white',
    fontFamily: 'Arial, "PingFang SC"' }}>{children}</span>
);

export interface ClaudeCodeTerminalProps {
  /** 章节局部帧，和 lines 的 at 同一坐标。 */
  f: number;
  box: { left: number; top: number; width: number; height: number };
  lines: TermLine[];
  /** 标题栏文字，写录制时的版本，例如 'Claude Code 2.1.285'。 */
  title: string;
  /** 标题栏图标，项目 public/ 下的路径。 */
  logo?: string;
  maxLines?: number;
  /** 输入框里正在打的字。 */
  typing?: string;
  /** 排在 spinner 上方的插话，以及录到的提示行。 */
  queued?: string | null;
  queuedHint?: string;
  queuedPlaceholder?: string;
  /** 0–1，排队消息外框的透明度。 */
  queuedRing?: number;
  /** 等于某条 user 行的文字时给这一行加框。 */
  highlightUser?: string;
  status: 'working' | 'interrupted' | 'done';
  /** 录到的 spinner 文案和完成行，例如 'Cooking…'、'Brewed for 57s'。 */
  spinnerText?: string;
  doneText?: string;
  /** 底部状态行；working 时追加 interruptHint。 */
  footer?: string;
  interruptHint?: string;
  badge?: React.ReactNode;
}

/** 深色终端窗口：lines 按 at 逐行出现，只保留最下面 maxLines 行，顶端淡出，不出现被切一半的行。 */
export const ClaudeCodeTerminal: React.FC<ClaudeCodeTerminalProps> = ({
  f, box, lines, title, logo = 'images/claude-code.png', maxLines = 12, typing = '', queued, queuedHint = 'ctrl+x ctrl+s to send now',
  queuedPlaceholder = 'Press up to edit queued messages', queuedRing = 0, highlightUser, status, spinnerText = 'Cooking…', doneText,
  footer = '⏵⏵ accept edits on (shift+tab to cycle)', interruptHint = ' · esc to interrupt', badge,
}) => {
  const visible = lines.filter((l) => f >= l.at).slice(-maxLines);
  const spin = SPIN[Math.floor(f / 5) % SPIN.length];
  const rule = <div style={{ borderTop: `2px solid ${C.gray}`, margin: '8px 0' }} />;
  const fade = 'linear-gradient(to bottom, transparent 0, black 56px)';
  return (
    <div style={{ ...card, position: 'absolute', ...box, background: C.ink, borderColor: C.ink, overflow: 'hidden', fontFamily: MONO,
      fontSize: FONT_SIZE, lineHeight: `${LINE_H}px` }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', borderBottom: `2px solid ${C.gray}` }}>
        {[C.rust, C.faint, C.faint].map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />)}
        <div style={{ marginLeft: 14, display: 'flex', alignItems: 'center', gap: 10, color: C.card, fontFamily: 'Arial, "PingFang SC"', fontSize: 24,
          fontWeight: 700 }}>
          <Img src={staticFile(logo)} style={{ width: 30, height: 30, objectFit: 'contain' }} />{title}
        </div>
        <div style={{ marginLeft: 'auto' }}>{badge}</div>
      </div>
      <div style={{ position: 'absolute', left: 26, right: 26, top: 72, bottom: 210, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', overflow: 'hidden', maskImage: fade, WebkitMaskImage: fade }}>
        {visible.map((l, i) => <Row key={`${l.at}-${i}`} line={l} highlight={highlightUser === l.text} />)}
        {queued && (
          <div style={{ position: 'relative', marginTop: 10 }}>
            <div style={{ display: 'flex', gap: 14 }}><span style={{ color: DIM }}>❯</span><span style={{ color: C.card }}>{queued}</span></div>
            <div style={{ paddingLeft: 28, color: DIM }}>{queuedHint}</div>
            <div style={{ position: 'absolute', left: -12, right: 380, top: -8, bottom: -8, border: `4px solid ${C.soft}`, opacity: queuedRing }} />
          </div>
        )}
        {status === 'working' && <div style={{ color: C.rust, marginTop: 10 }}>{spin} {spinnerText}</div>}
        {status === 'done' && doneText && <div style={{ color: DIM, marginTop: 10 }}>✻ {doneText}</div>}
      </div>
      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 18 }}>
        {rule}
        <div style={{ display: 'flex', gap: 14, height: LINE_H }}>
          <span style={{ color: C.card }}>❯</span>
          {typing ? (
            <span style={{ color: C.card }}>{typing}<span style={{ display: 'inline-block', width: 12, height: 26, background: C.card,
              verticalAlign: 'middle', marginLeft: 2, opacity: Math.floor(f / 8) % 2 ? 1 : 0.2 }} /></span>
          ) : (
            <span style={{ color: DIM }}>{queued ? queuedPlaceholder : ''}</span>
          )}
        </div>
        {rule}
        <div style={{ color: DIM, fontSize: 20 }}>{footer}{status === 'working' ? interruptHint : ''}</div>
      </div>
    </div>
  );
};

/** 终端旁边状态栏的一行：文件名或测试名加状态框；untouched 表示录制结束时还没动。 */
export type StatusState = 'pending' | 'done' | 'untouched';
export const StatusRow: React.FC<{ name: string; state: StatusState; untouchedLabel?: string }> = ({ name, state, untouchedLabel = '未改' }) => {
  const color = state === 'done' ? C.blue : C.faint;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 46 }}>
      <div style={{ width: 30, height: 30, boxSizing: 'border-box', border: `3px ${state === 'done' ? 'solid' : 'dashed'} ${color}`,
        background: state === 'done' ? C.blue : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'done' && (
          <svg width={20} height={20} viewBox="0 0 20 20"><path d="M4 10l4 4 8-9" stroke="white" strokeWidth={3} fill="none" /></svg>
        )}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 25, fontWeight: 700, color: state === 'done' ? C.ink : C.faint }}>{name}</div>
      {state === 'untouched' && <div style={{ marginLeft: 'auto', fontSize: 22, fontWeight: 800, color: C.rust }}>{untouchedLabel}</div>}
    </div>
  );
};
