import React from 'react';
/** Generic line icons (48px grid, 2.5 stroke). Product logos come from shared/assets/brands, not from here. */

export type IconProps = {size?: number; color?: string};
const base = (size: number, color: string) => ({width: size, height: size, viewBox: '0 0 48 48', fill: 'none', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true});

/** Save point: a flag on a timeline marker. */
export const CheckpointIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M6 40h36M14 40V8m0 2h20l-5 7 5 7H14"/><circle cx="14" cy="40" r="3" fill={color}/></svg>
);
/** Two chat bubbles for conversation history. */
export const ChatIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M6 8h24v16H16l-7 6v-6H6zM42 20v16h-3v6l-7-6H20v-8"/></svg>
);
/** Package box for installed dependencies. */
export const PackageIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M24 6 42 15v18L24 42 6 33V15zM24 24 42 15M24 24 6 15M24 24v18M15 10.5l18 9"/></svg>
);
/** Blocks with one changed block, for block-level diff snapshots. */
export const BlocksIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><rect x="6" y="6" width="16" height="16" rx="3"/><rect x="26" y="6" width="16" height="16" rx="3"/><rect x="6" y="26" width="16" height="16" rx="3"/><rect x="26" y="26" width="16" height="16" rx="3" fill={color} fillOpacity=".25"/><path d="m30 34 3 3 5-6"/></svg>
);
/** Envelope leaving, marked as not recallable. */
export const MailOutIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M4 12h30v22H4zM4 12l15 11 15-11M38 20l6 3-6 3"/></svg>
);
/** Rewind arrow for rollback. */
export const RewindIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M40 24a16 16 0 1 1-4.7-11.3M36 6v8h-8"/></svg>
);
/** Gear for configuration or source code. */
export const GearIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><circle cx="24" cy="24" r="7"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M9.9 38.1l4.2-4.2M33.9 14.1l4.2-4.2"/></svg>
);
/** Gavel for judging. */
export const GavelIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="m14 26 8-8m-4-4 12 12M8 40l14-14M30 10l8 8M26 14l8 8"/><path d="M6 42h18"/></svg>
);
/** Three probability bars. */
export const ProbIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M8 40V18M20 40V8M32 40V26M44 40V32M4 40h40"/></svg>
);
/** Whistle for a referee or judge. */
export const WhistleIcon: React.FC<IconProps> = ({size = 56, color = 'currentColor'}) => (
  <svg {...base(size, color)}><path d="M18 22h16l8-4v10a10 10 0 1 1-20-3zM34 18v-6"/><circle cx="20" cy="31" r="3"/></svg>
);
