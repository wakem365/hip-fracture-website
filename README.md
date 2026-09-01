# Hip Fracture, Step by Step

Patient/family/provider-facing education site mapping hip fracture care
(Pre-Op → Intra-Op → Post-Op) to a step-by-step, evidence-cited timeline.
Built for a dedicated orthopedic trauma research year with NYU Hospital for
Joint Diseases / NYU Langone Orthopedic Center, evidence base primarily
Dr. Kenneth Egol and Dr. Sanjit Konda's published research.

No real patient data is used anywhere in the app.

## Stack

- [Vite](https://vitejs.dev/) + React 19
- [Framer Motion](https://www.framer.com/motion/) for page transitions, staggered
  reveals, and micro-interactions
- [lucide-react](https://lucide.dev/) for icons
- Plain inline styles using NYU brand tokens (see `src/theme.js`) — no CSS
  framework, to keep the port from the original artifact 1:1

## Getting started

```bash
npm install
npm run dev      # starts a dev server, prints a local URL
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  theme.js               brand color/font tokens — edit here to restyle
  data/
    citations.js          CITATIONS registry (authors, journal, DOI/PMID, type)
    steps.js               PHASES + STEPS (the timeline content)
  components/
    FemurSchematic.jsx     renders the de-identified radiograph for a
                            fracture type — swap point for new images (see
                            below)
    CiteChip.jsx            single citation card
    EvidenceDropdown.jsx    collapsible "Evidence" section on a step
    TimelineRow.jsx          the numbered dot timeline (major + sub steps)
    DetailCard.jsx           what/why/evidence panel for the selected step
  pages/
    Home.jsx                 landing page, phase picker
    PhasePage.jsx             per-phase timeline + sub-timeline + detail
    LiteraturePage.jsx        full citation list, chronological
  App.jsx                    top-level page router + AnimatePresence transitions
```

### Adding a citation

Add a new keyed entry to `CITATIONS` in `src/data/citations.js`, then
reference its key in a step's `citations: [...]` array in `src/data/steps.js`.
No component changes needed. A step without a confirmed citation should set
`evidence: "..."` instead of `citations`, which renders as an explicit
"not yet identified" flag rather than a guess.

### Swapping in different radiographs

`FemurSchematic.jsx` maps each `diagram` key (`fnf`, `basicervical`, `it`,
`subtroch`) to an image in `src/assets/radiographs/`. To replace one, drop a
new de-identified, institutionally-approved image in as `<type>.png` (or
update the import path in that one component) — nothing else needs to
change, since every caller only passes a `type` string.

## Content notes

- Radiographs in `src/assets/radiographs/` are de-identified representative
  examples supplied directly by the user, one per fracture pattern — not a
  specific patient's imaging, and not hotlinked or scraped from the web.
- The `CITATIONS` registry is a verified subset of Egol/Konda's output
  (2002–2026), not their complete bibliography.
- CRPP fixation currently has no confirmed NYU-specific citation — flagged
  in the UI rather than guessed, pending discussion with Dr. Konda.
