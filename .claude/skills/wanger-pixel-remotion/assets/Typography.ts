import type {CSSProperties} from 'react';

export const FONT_FAMILY = "'PingFang SC', 'Microsoft YaHei', sans-serif";
export const UI_FONT = FONT_FAMILY;
export const MONO_FONT = 'Menlo, monospace';
export const UI_WEIGHT = 680;
export const CODE_WEIGHT = 680;
export const CAPTION_WEIGHT = 400;
export const HUD_WEIGHT = 650;
export const UI_TEXT_STYLE: CSSProperties = {
  fontFamily: UI_FONT,
  fontWeight: 400,
};
export const MONO_TEXT_STYLE: CSSProperties = {
  fontFamily: MONO_FONT,
  fontWeight: CODE_WEIGHT,
};
// Override Remotion Studio's inline `will-change: transform` on the scaled Fit wrapper
// so Chromium rasterizes vector glyphs at target Retina scale instead of downsampling a 1080p bitmap.
export const FONT_CSS = `.remotion-studio-composition-container,
.remotion-studio-composition-container > div,
*:has(> [data-pixel-world]) {
  will-change: auto !important;
}
[data-pixel-world] {
  --video-font-family: ${UI_FONT};
  --video-mono-family: ${MONO_FONT};
  font-family: var(--video-font-family);
}`;
