// ---- Brand tokens ----
// Color values are sourced from siteConfig.js's SITE.brand (per-hospital),
// so every component that imports these names re-themes automatically —
// edit colors in siteConfig.js, not here. The token names below (VIOLET,
// ULTRA_VIOLET, etc.) are historical — this app started as NYU-only — but
// kept as-is since every component already imports them; what they hold is
// whatever the current deployment's brand color is, not literally violet.
import { SITE } from "./siteConfig";

export const VIOLET = SITE.brand.primary;
export const ULTRA_VIOLET = SITE.brand.primaryBright;
export const INK = SITE.brand.ink;
export const TINT = SITE.brand.tint;
export const GREY = "#6D6D6D";
export const BG = "#FAF9FB";
export const AMBER = "#B4562F";
export const TEAL = "#0E7C7B";

export const FONT_SERIF = "'Source Serif 4', Georgia, serif";
export const FONT_BODY = "'Inter', system-ui, sans-serif";
export const FONT_MONO = "'JetBrains Mono', monospace";

// Converts a brand hex token (e.g. VIOLET) to an rgba() string — used for
// shadow/overlay colors that need partial opacity, so those stay tied to
// the brand color instead of being hardcoded separately.
export function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
