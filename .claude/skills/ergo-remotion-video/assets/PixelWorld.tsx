import React, { type ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';

export const pixelColors = {
  ink: '#25263b',
  navy: '#34364c',
  cream: '#fff2d4',
  sky: '#ffcb82',
  haze: '#ffe5ab',
  hill: '#e9a065',
  hillBack: '#f5b779',
  teal: '#128175',
  mint: '#91dcc1',
  orange: '#e97142',
  gold: '#ffcb54',
  muted: '#65526a',
  paper: '#fff9e6',
  steel: '#586075',
};
export const grid = (x: number) => Math.round(x / 4) * 4;
export const travel = (x: number, y: number, t: number) => grid(x + (y - x) * t * t * (3 - 2 * t));

function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      fill={pixelColors.paper}
      d="M0 32h24V16h28V0h64v16h28v16h28v16H0Z"
    />
  );
}

// Use the horizon and platform for a workshop or journey; a dense diagram can use the plain world.
type WorldProps = {
  mode: 'platform' | 'diagram';
  caption?: string;
  captionStyle?: 'plaque' | 'band';
  topic?: { title: string; term?: string };
  highlight?: RegExp;
  coins?: number;
  ground?: boolean;
  children: ReactNode;
  foreground?: ReactNode;
  sign?: { badge: string; title: string };
};

function StatusBar({ coins }: { coins: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 17,
        right: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        height: 64,
        padding: '0 20px',
        background: pixelColors.ink,
        color: pixelColors.paper,
        border: '3px solid ' + pixelColors.paper,
        boxShadow: '4px 4px 0 #716b62',
        fontSize: 38,
      }}
    >
      <svg width="106" height="32" viewBox="0 0 106 32" aria-label="三颗红心">
        {[0, 36, 72].map((x) => (
          <path
            key={x}
            transform={`translate(${x} 0)`}
            d="M2 8h4V4h8v4h4V4h8v4h4v10h-4v4h-4v4h-4v4h-4v-4h-4v-4H6v-4H2Z"
            fill="#ef6658"
          />
        ))}
      </svg>
      <span
        style={{
          fontFamily: 'Menlo,monospace',
          color: pixelColors.gold,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <svg width="22" height="31" viewBox="0 0 22 31" aria-hidden="true">
          <path d="M5 1h12v4h4v21h-4v4H5v-4H1V5h4Z" fill={pixelColors.gold} />
          <path d="M6 6h4v18H6Z" fill={pixelColors.paper} />
        </svg>
        ×{String(coins).padStart(2, '0')}
      </span>
      <span>沉默王二</span>
    </div>
  );
}

export function PixelWorld({
  mode,
  caption,
  captionStyle = 'plaque',
  topic,
  highlight,
  coins,
  ground = mode === 'platform',
  children,
  foreground,
  sign,
}: WorldProps) {
  const c = pixelColors;
  return (
    <AbsoluteFill style={{ background: c.cream, fontFamily: "'PingFang SC','Microsoft YaHei',sans-serif" }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute' }}>
        {mode === 'platform' && (
          <g>
            <rect width="1920" height="1080" fill={c.haze} />
            <rect width="1920" height="252" fill={c.sky} />
            <Cloud x={40} y={130} />
            <Cloud x={1020} y={56} />
            <Cloud x={1620} y={134} />
            <path
              d="M0 260h100v-40h84v-32h84v-24h104v36h60v36h76v24h260v-32h64v-40h96v-24h100v40h72v32h96v24h724v80H0Z"
              fill={c.hillBack}
            />
            <path
              d="M0 304h164v-28h76v-24h108v24h76v28h434v-28h80v-20h124v20h118v28h492v-32h98v-40h116v24h34v88H0Z"
              fill={c.hill}
            />
          </g>
        )}
        {sign && (
          <g fontWeight="bold">
            <rect x="64" y="60" width="118" height="75" fill={c.ink} />
            <text
              x="123"
              y="111"
              textAnchor="middle"
              fontSize="43"
              fontFamily="Menlo,monospace"
              fill={c.gold}
            >
              {sign.badge}
            </text>
            <text x="208" y="117" fontSize="60" fill={c.ink}>
              {sign.title}
            </text>
          </g>
        )}
        {children}
        {ground && (
          <g>
            <rect y="850" width="1920" height="92" fill={c.ink} />
            <rect y="854" width="1920" height="16" fill={c.teal} />
            <rect y="870" width="1920" height="16" fill={c.mint} />
            <rect y="886" width="1920" height="52" fill={c.muted} />
            {Array.from({ length: 18 }, (_, i) => (
              <rect key={i} x={i * 112} y="904" width="60" height="8" fill={c.navy} />
            ))}
          </g>
        )}
      </svg>
      {foreground}
      {coins !== undefined && <StatusBar coins={coins} />}
      {topic && (
        <div
          style={{
            position: 'absolute',
            left: 24,
            top: 17,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 15,
            padding: '0 18px',
            background: c.ink,
            color: c.paper,
            border: `3px solid ${c.paper}`,
            fontFamily: "'PingFang SC',sans-serif",
            fontSize: 37,
            fontWeight: 650,
          }}
        >
          {topic.title}{' '}
          {topic.term && (
            <span style={{ color: c.gold, fontFamily: 'Menlo,monospace', fontSize: 31 }}>{topic.term}</span>
          )}
        </div>
      )}
      {captionStyle === 'band' && caption && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 138,
            background: c.navy,
            color: c.paper,
            fontFamily: "'PingFang SC',sans-serif",
            fontSize: 51,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {caption}
        </div>
      )}
      {captionStyle === 'plaque' && caption && (
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'max-content',
            maxWidth: 1800,
            boxSizing: 'border-box',
            padding: '8px 26px',
            fontSize: 48,
            lineHeight: 1.2,
            color: c.paper,
            background: c.ink,
            border: '3px solid ' + c.paper,
            boxShadow: '4px 4px 0 #82796f',
            textAlign: 'center',
          }}
        >
          {highlight
            ? caption.split(highlight).map((part, i) => (
                <span key={i} style={{ color: i % 2 ? c.gold : undefined }}>
                  {part}
                </span>
              ))
            : caption}
        </div>
      )}
    </AbsoluteFill>
  );
}
