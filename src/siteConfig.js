// ---------------------------------------------------------------------------
// SITE CONFIG
//
// This is the one file a new hospital deployment needs to edit to "plug in"
// their own identity — name, logo, and photos. Every page/component reads
// branding from here instead of hardcoding a hospital's name or images, so
// the rest of the app (layout, pathway content, citations) is reusable
// as-is across deployments.
//
// Fields left `null` fall back to a generic placeholder in the component
// that uses them (a text wordmark instead of a logo image, a plain gradient
// instead of a building photo, etc.) rather than silently showing another
// hospital's branding — swap in the real asset when it's available.
// ---------------------------------------------------------------------------
import logoImg from "./assets/brand/jamaica-hospital-logo.png";
import heroBuildingImg from "./assets/landing/jamaica-hospital-building.webp";
import preOpImg from "./assets/hero/pre-op-ambulance.webp";
import introOpImg from "./assets/hero/intra-op.png";
import postOpImg from "./assets/hero/post-op.webp";

export const SITE = {
  // Full legal/display name, used in page titles and formal contexts.
  hospitalName: "Jamaica Hospital Medical Center",
  // Shorter form used inline in running text (hero tagline, etc.).
  hospitalShortName: "Jamaica Hospital",

  logoImg,
  logoAlt: "Jamaica Hospital Medical Center",

  // Full-bleed photo behind the landing hero.
  heroBuildingImg,

  // One photo per pathway phase, shown on the three home-page panels.
  heroImages: {
    pre: preOpImg,
    intra: introOpImg,
    post: postOpImg,
  },

  // Brand colors, sampled from the hospital's logo — this is what theme.js
  // reads instead of hardcoding a specific hospital's palette, so every
  // component (which imports color tokens from theme.js, not from here
  // directly) automatically re-themes with no further edits.
  brand: {
    primary: "#0061AA", // sampled from the wordmark in the Jamaica Hospital logo
    primaryBright: "#0090D9", // lighter accent for gradients/highlights
    ink: "#0A1E30", // near-black navy, used for body headings and dark overlays
    tint: "#E3EEF7", // soft light-blue background wash
  },
};

// The clinical evidence and pathway content in this app is drawn from real
// published research, most of it conducted by NYU Langone physicians and
// researchers — that's true regardless of which hospital is deploying the
// site, so this credits the actual source of the research rather than
// claiming it as "this hospital's own data." Leave this as-is when setting
// up a new deployment; it isn't part of the per-hospital branding above.
export const RESEARCH_CREDIT = "NYU Langone";
export const RESEARCH_CREDIT_FULL = "NYU Langone physicians and researchers";
