// 两期以上重复手写后提升的通用图形：Agent 机器人头、用户头像、用户消息气泡。只负责版式，文字和颜色由项目传入。
import React from 'react';
import { C } from './index';

/** Simple robot head for Agent and model nodes. */
export const AgentBot: React.FC<{label?: string; color?: string; size?: number}> = ({label, color = C.blue, size = 100}) => (
  <div style={{textAlign: 'center'}}>
    <svg width={size} height={size * 0.8} viewBox="0 0 100 80" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="19" width="76" height="53" rx="13" fill="white" />
      <path d="M50 19V8M5 35v20m90-20v20M37 56h26" />
      <circle cx="50" cy="7" r="4" fill="white" />
      <circle cx="33" cy="39" r="4" fill={color} />
      <circle cx="67" cy="39" r="4" fill={color} />
    </svg>
    {label && <div style={{fontSize: size * 0.24, fontWeight: 800, marginTop: 6, color, whiteSpace: 'nowrap'}}>{label}</div>}
  </div>
);

/** Person head and shoulders, used for the user who sends a message. */
export const UserIcon: React.FC<{size?: number; color?: string}> = ({size = 80, color = C.blue}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
    <circle cx="24" cy="16" r="9" fill="white" />
    <path d="M7 44c2-10 9-15 17-15s15 5 17 15" fill="white" />
  </svg>
);

/** A user's chat message: icon plus speech bubble. */
export const UserBubble: React.FC<{text: string; width?: number; color?: string}> = ({text, width = 330, color = C.blue}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, width}}>
    <UserIcon size={70} color={color} />
    <div style={{flex: 1, background: C.card, border: `3px solid ${color}`, borderRadius: 18, padding: '14px 20px', fontSize: 30, fontWeight: 800}}>
      {text}
    </div>
  </div>
);
