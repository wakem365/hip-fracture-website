# A Guide to Hip Fractures

Patient/family/provider-facing education site mapping hip fracture care
(Before Surgery → During Surgery → After Surgery) to a step-by-step,
evidence-cited pathway.

This codebase is built to be deployed for more than one hospital: a
hospital's name, logo, and photos live in one config file
(`src/siteConfig.js`), while the pathway content, citations, and all page
components stay the same across deployments. See "Deploying for a new
hospital" below.

The clinical evidence cited throughout is a verified subset of research
conducted by NYU Langone physicians and researchers (primarily
Dr. Kenneth Egol and Dr. Sanjit Konda's published work), credited as the
source of that research regardless of which hospital is deploying the site.

No real patient data is used anywhere in the app.

## Stack

- [Vite](https://vitejs.dev/) + React 19
- [Framer Motion](https://www.framer.com/motion/) for page transitions, staggered
  reveals, and micro-interactions
- [lucide-react](https://lucide.dev/) for icons
- Plain inline styles using shared brand tokens (see `src/theme.js`) — no CSS
  framework

## Getting started

```bash
npm install
npm run dev      # starts a dev server, prints a local URL
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Deploying for a new hospital

Everything a new deployment needs to change lives in `src/siteConfig.js`:

```js
export const SITE = {
  hospitalName: "Jamaica Hospital Medical Center",
  hospitalShortName: "Jamaica Hospital",
  logoImg: null,          // import and set a real logo file when available
  heroBuildingImg: null,  // import and set a hero background photo when available
  heroImages: { pre: null, intra: introOpImg, post: postOpImg }, // one photo per phase
};
```

Any field left `null` falls back to a generic placeholder in the component
that uses it (a text wordmark instead of a logo, a plain gradient instead of
a building photo, an icon panel instead of a phase photo) — the site never
silently shows another hospital's branding. Swap in real assets by importing
them at the top of `siteConfig.js` and assigning them to the relevant field.

`RESEARCH_CREDIT` / `RESEARCH_CREDIT_FULL` in the same file control how the
NYU Langone research attribution reads in running text (e.g. "Research by
NYU Langone found that..."). This is about where the *evidence* came from,
not which hospital is hosting the site, so it should stay as-is across
deployments rather than being edited per-hospital.

Everything else — the pathway steps, the citation registries, every page and
component — is shared and shouldn't need hospital-specific edits.

## Project structure

```
src/
  siteConfig.js             per-hospital branding (name, logo, photos) — see above
  theme.js                  shared color/font tokens — edit here to restyle
  data/
    citations.js             current CITATIONS registry (authors, journal, DOI/PMID, type)
    historicCitations.js     historic citation registry
    steps.js                 PHASES + STEPS (the pathway content)
  components/
    FemurSchematic.jsx       renders the de-identified radiograph for a
                             fracture type or fixation method — swap point
                             for new images (see below)
    CiteChip.jsx             single citation card
    EvidenceDropdown.jsx     collapsible "Evidence" section on a step
    TimelineRow.jsx          the numbered dot timeline (major + sub steps)
    DetailCard.jsx           what/why/evidence panel for the selected step
    LandingHero.jsx          full-screen hero — reads branding from siteConfig
    WhySurgerySection.jsx    "Why Surgery Can't Wait" section
    SurveyWidget.jsx         feedback widget (gated on finishing the After
                             Surgery timeline — see App.jsx)
  pages/
    Home.jsx                 landing page, phase picker
    PhasePage.jsx            per-phase timeline + sub-timeline + detail
    LiteraturePage.jsx       full citation list, chronological
  App.jsx                    top-level page router + AnimatePresence transitions
```

### Adding a citation

Add a new keyed entry to `CITATIONS` in `src/data/citations.js`, then
reference its key in a step's `citations: [...]` array in `src/data/steps.js`.
No component changes needed. A step without a confirmed citation should set
`evidence: "..."` instead of `citations`, which renders as an explicit
"not yet identified" flag rather than a guess.

### Swapping in different radiographs

`FemurSchematic.jsx` maps each `diagram` key to an image in
`src/assets/radiographs/`. To replace one, drop a new de-identified,
institutionally-approved image in and update the import in that one
component — nothing else needs to change, since every caller only passes a
`type` string.

## Content notes

- Radiographs in `src/assets/radiographs/` are de-identified representative
  examples supplied directly by the user — not a specific patient's imaging,
  and not hotlinked or scraped from the web.
- The `CITATIONS` registry is a verified subset of NYU Langone research
  output (2002–2026), not a complete bibliography.
