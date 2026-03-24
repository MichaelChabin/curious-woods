# Curious Woods — CLAUDE.md

## What This Is

Curious Woods is an AI-guided learning platform for curious, independent children (ages 8–14). It is built on the principle that curiosity and independence drive learning — not assessment or standards. The first interactive is **Glass**, a stained-glass geometric construction and coloring tool.

This is not a typical edtech app. There is no tracking, no standardization, no curriculum alignment. Stories broaden experience and generate curiosity; the AI guide (Maya) is an infinitely patient partner, not a tutor.

## Architecture

**Single-file for now, modular by design.** `geometry-v1.html` contains all HTML, CSS, and JS for the Glass interactive. This was a pragmatic choice to reach a working demo quickly — the code is already organized into ~20 clearly delineated sections (marked with `// ====` headers and `What:` descriptions) that map naturally to future modules. Components like the palette picker, constructions panel, picker window, and Remember inscription are designed to be reused across interactives and story pages.

**No build step, no npm, no frameworks.** This is a static site. Vanilla JS, HTML5 Canvas, Web Audio API. Keep it that way. When modularization happens, prefer ES modules (`<script type="module">`) over introducing a bundler.

**Operation log is the spine.** Every canvas action is logged as JSON. Save, load, undo, construction replay, and Maya's future demo playback all derive from log replay. Operations: `init`, `line`, `circle`, `region`, `fill`, `emphasize`, `deemphasize`, `scaffold`, `label`. Protect the integrity of this system.

**Two gestures, everything follows:**
- Tap-tap → infinite line (through two points)
- Drag → circle (center + radius, snaps to existing points)
- Intersections are detected automatically and immediately usable

## File Layout

```
CuriousWoods/
├── CLAUDE.md              ← You are here
├── CuriousWoods/          ← Obsidian vault (design docs, specs, planning)
│   ├── 00-FOUNDATION/     ← Read-only reference (philosophy, UI spec, story template)
│   ├── 01-ACTIVE/         ← Current focus, status, next priorities
│   ├── 10-PROJECTS/       ← Design explorations (Geometry, Geography, Stories)
│   ├── 20-SPECS/          ← Implementation specs (Layer 1 spec is authoritative)
│   ├── 30-SKILLS/         ← Claude skills (placeholder)
│   ├── 50-PROTOTYPES/     ← Links to working HTML
│   └── 99-IDEAS/          ← Idea capture
├── cw-deploys/            ← NETLIFY PUBLISH DIRECTORY
│   ├── index.html         ← Landing/navigation page
│   ├── geometry-v1.html   ← PRIMARY WORKING FILE (~3000 lines)
│   ├── art/               ← Palette images, reference artwork
│   │   └── palettes.json  ← 17 historical color palettes with glass recipes
│   └── models/            ← SVG geometry models + JSON operation logs
├── prototypes/            ← Experimental HTML prototypes (not deployed)
├── stories/               ← Story HTML prototypes
├── templates/             ← Story page templates
└── tools/                 ← cw-dev-tools.js (injectable debug toolkit)
```

## Deployment

- **Deploy target:** `cw-deploys/` folder → Netlify (thecuriouswoods.netlify.app)
- **Workflow:** Edit files → `git commit` → `git push` → Netlify auto-deploys (~30 seconds)
- **Git remote:** `https://github.com/MichaelChabin/curious-woods.git`
- **Netlify publish directory:** `cw-deploys` (no build command)
- **Versioning:** Git is the version history — no need for dated backup copies or duplicate folders

## Current State (March 2026)

**Layer 1 (Construction Engine):** Substantially complete. Construction, fill, palettes, tools menu, numbers, and constructions panel all working.

**In progress:** Constructions panel playback, save-as-construction, touch magnifier.

**Layer 2 (Maya AI integration):** Blocked until Glass is demo-ready. Do not start Maya API work.

**Current priorities live in:** `CuriousWoods/01-ACTIVE/Next-3.md`

## Design Principles

- **Marauder's Map:** Controls appear as words, not buttons. Options fade in when possible, fade out when irrelevant. No disabled/greyed-out states ever.
- **Left panel is a context membrane:** Tools appear when relevant, contract when they don't. Sized exactly by its contents.
- **"Remember this" inscription:** Permanent, never fades, encodes child data ownership.
- **No deletion on canvas:** Scaffold toggle fades construction lines to 22% opacity instead.
- **Color accessibility:** Palettes ensure luminance contrast; construction geometry never depends on color discrimination alone.
- **Privacy:** Anonymous identifiers only. No real-world identity data collected, ever. Data is locally stored and child-portable.

## Key Specs

When working on a feature, read the relevant spec first:

- **Layer 1 (construction engine):** `CuriousWoods/20-SPECS/Layer 1 — Consolidated Specification.md`
- **Maya presence/cursor:** `CuriousWoods/20-SPECS/Spec-Maya-Presence-Cursor.md`
- **UI language:** `CuriousWoods/00-FOUNDATION/UI-Language.md`
- **Interface design:** `CuriousWoods/00-FOUNDATION/Interface-Foundation.md`
- **System philosophy:** `CuriousWoods/00-FOUNDATION/CW-System-Foundation.md`
- **Story template:** `CuriousWoods/00-FOUNDATION/Story-Template.md`

## Conventions

- **Commit style:** Descriptive messages summarizing what changed and why
- **Versioned backups:** Date-stamped copies (e.g., `geometry-v1-20260321.html`) before major changes
- **Decision markers:** Use `DECISION:`, `OPEN:`, `HANDOFF:` in session notes
- **Animation timing:** Panel width 400ms, option appear 200ms, hover delay 150ms, image fade-in 300ms / fade-out 400ms (see UI-Language.md for full table)

## What NOT to Do

- Do not introduce npm, bundlers, or frameworks without discussion
- Do not split geometry-v1.html into modules without architectural justification
- Do not start Maya/Claude API integration — Layer 2 is blocked
- Do not add assessment, scoring, tracking, or curriculum alignment features
- Do not use anthropomorphic design for Maya (she is a gradient blob, not a character)
- Do not write files using bash tools — use filesystem tools (Michael works on Mac; bash runs in a sandbox)

## Five Cognitive Modes (Foundation)

All design decisions connect back to these:
1. **Curiosity** — Explorer state, triggered by stories
2. **Focus** — Deliberate problem-solving (short, bounded)
3. **Making** — Fluent doing, rhythm, flow state
4. **Pattern Recognition** — Seeing relationships and structure
5. **Consolidation** — Offline reorganization (reflection, sleep)

## Target Users

- Children ages 8–14 (curious, independent learners)
- Homeschooling families
- Neurodivergent learners whose curiosity outpaces standard curriculum
- Global reach — must work on older devices (2017+ iPads)
