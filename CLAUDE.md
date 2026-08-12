# Curious Woods — CLAUDE.md

## Read This First

**Before changing anything, read `CWVault/00-BOARD.md`.** It is the single statement of
what is moving, what is parked, and what each thread's next action is. It is written at
the end of every session and read at the start of the next. If this file and the board
disagree, the board wins — it is newer by construction.

Three rules for every chat working on this project:

1. **Read the board before acting.** Not the whole vault. The board, plus whatever spec
   the board points at.
2. **Write the delta before finishing.** Update the board yourself. Never leave it to
   Michael to remember — that dependency is what broke the previous system.
3. **Ideas go to `CWVault/03-SEEDS/` as faceted notes,** never into a flat list. Facet
   values are closed; see `CWVault/00-FOUNDATION/Facet-Vocabulary.md`. Propose new values,
   never add them silently.
4. **Anything that produces a file updates `cw-deploys/MANIFEST.md` and
   `CWVault/00-BOARD.md` in the same commit.** The disk is the coordination surface
   between chat sessions and Claude Code sessions, which cannot see each other. Three
   benches sat unregistered for a day because this rule did not exist.
5. **Do not infer a document's contents from its filename.** On 5 August a board was
   built from a folder listing while `01-ACTIVE/Plan-Plane-Extraction.md` sat unopened in
   that same listing, and the resulting advice contradicted the active plan. If a file is
   in `01-ACTIVE/`, open it.

A note on staleness, learned the hard way: this project accumulated three documents all
claiming to describe current state, all five months old, one pointing at a directory that
no longer existed. Sections of *this* file are dated too, and say so where they are. When
something here contradicts `MANIFEST.md`, `00-BOARD.md`, or the most recent
`01-ACTIVE/Decisions-*.md`, those win, and the contradiction should be reported rather
than quietly worked around.

## What This Is

Curious Woods is an AI-guided learning platform for curious, independent children aged 10 and up. It is built on the principle that curiosity and independence drive learning — not assessment or standards. The platform has four pillars: **Labs** (substantial visual environments — Euclid, the Number Theory Lab, Codes/Bases/Modulus), **Stories**, **Practice**, and **Maya** (the embedded Claude Guide).

The first Lab is **Euclid** — a compass-and-straightedge construction environment. *Glass* is Euclid's first story mode, where constructions become stained-glass windows. The destination is MIT OpenCourseWare and equivalents; the method is recursive decomposition of university material until accessible to a curious ten-year-old.

This is not a typical edtech app. There is no tracking, no standardization, no curriculum alignment. Stories broaden experience and generate curiosity; Maya is an infinitely patient partner, not a tutor — and architecturally refuses to teach, reference educational standards, or follow current educational best practices. See [CWVault/00-FOUNDATION/CW-System-Foundation.md](CWVault/00-FOUNDATION/CW-System-Foundation.md) for the full philosophy.

## Architecture

**Static site, no build step, no npm, no frameworks.** Vanilla JS, HTML5 Canvas, Web
Audio API. Shared code is classic scripts in `cw-deploys/js/` — no bundler. If
modularization deepens, prefer ES modules (`<script type="module">`) over introducing one.

**The plane is the platform; labs are viewings of it.** `cw-deploys/js/plane.js`
(extracted in Phase 4, August 2026) holds the coordinate space both labs stand on: view
state behind one API, pure transforms, one zoom clamp, world y up, the ambient 1–5–10
lattice, the pixel floor. `cw-deploys/js/cw-panel.js` is the shared floating info-panel
component (Geometry's tip-window pattern). The labs themselves —
`active/glass-geometry.html` and `active/glass-multiplication.html` — remain single-file
pages standing on those shared scripts.

**Operation log is the spine.** Every canvas action is logged as JSON. Save, load, undo,
and construction replay all derive from log replay. Operations include `init`, `line`,
`circle`, `region`, `fill`, `emphasize`, `deemphasize`, `scaffold`, `label`,
`repaint_fill`, `dissolve_fill`, `numbers`, and — since Phase 4 — `lattice_point`
(lattice-click minting, recording a unit-coordinate address). The log records viewing
changes so replay reproduces what the child saw, but undo skips them (Lane 1, 12 Aug).
Protect the integrity of this system.

**Two gestures, everything follows:**
- Tap-tap → infinite line (through two points)
- Tap-hold-drag → circle (center + radius, snaps to existing points)
- Intersections are detected automatically and immediately usable

## Current Design (as of August 2026)

This file no longer carries a full design description — that is how the March version
went stale while claiming to be current. Design state lives in exactly two places:

1. **`CWVault/00-BOARD.md`** — what is moving, what is parked, every thread's next action.
2. **The ledgers and specs the board points at.** For interface work the authority chain
   is `CWVault/01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md` (sits above
   Interface-Foundation and UI-Language), then the `01-ACTIVE/Decisions-*` ledgers,
   newest first.

The shape in one paragraph — dated 12 August 2026, and expected to go stale: two labs
are live, **Glass Geometry** and **Glass Multiplication**, both standing on the shared
plane (`cw-deploys/js/plane.js`). Multiplication is a canvas viewing of the plane —
panes keyed by number, pieces smallest-prime-first, primes to 19, colour is prime
identity and nothing competes with it inside that viewing (colour is declared
per-viewing; see `Decisions-Fog-Aug12.md`). The colourblind-safe 16th workshop is the
accessibility answer and **does not exist yet**. The next interface work is the
**controls pass**, with the Interface Standard as its brief, beginning with a Geometry
walk of New, Open and Save as choice-panel candidates.

## File Layout

Project root lives at `/Users/michaelchabin/_CW/` (the leading underscore floats it to
the top of directory listings). Local disk only — git repos and iCloud sync don't mix.

```
_CW/
├── CLAUDE.md              ← You are here
├── CWVault/               ← Obsidian vault (design docs, specs, planning)
│   ├── 00-BOARD.md        ← READ FIRST — the single statement of current state
│   ├── 00-FOUNDATION/     ← Philosophy, UI foundations, facet vocabulary
│   ├── 01-ACTIVE/         ← Decision ledgers, plans, specs in play
│   ├── 02-CONSTELLATIONS/ ← Story constellations
│   ├── 03-SEEDS/          ← Faceted idea notes (closed facet vocabulary)
│   ├── 10-PROJECTS/  20-SPECS/  30-SKILLS/  50-PROTOTYPES/
│   ├── 99-ARCHIVE/        ← Dated, superseded documents
│   └── 99-IDEAS/          ← Closed to new writing; still holds unmigrated threads
├── cw-deploys/            ← NETLIFY PUBLISH DIRECTORY — read MANIFEST.md before any file here
│   ├── MANIFEST.md        ← What every deployed file is; kept current in the same commit
│   ├── active/            ← Shipping labs: glass-geometry.html, glass-multiplication.html
│   ├── experiments/       ← Public but unpolished; listed only in experiments/index.html
│   ├── js/                ← Shared scripts: plane.js, cw-panel.js
│   └── art/ models/ stories/ text/  ← Assets, reached from pages with ../
├── prototypes/            ← Staging — NOT served; work that has not earned a URL
├── outdated-files/        ← Superseded versions, dated filenames; NOT served
├── artifacts/             ← Salvaged 2025 artifacts — ideas, not code (03-SEEDS/artifact-salvage.md)
├── plans/                 ← March-era sprint plans; historical
└── tools/                 ← cw-dev-tools.js (injectable debug toolkit)
```

**A file under `cw-deploys/` is public whether or not anything links to it.** The only
non-public staging is `prototypes/`. There is no third state.

## Deployment

- **Deploy target:** `cw-deploys/` folder → Netlify (curiouswoods.netlify.app)
- **Workflow:** Edit files → `git commit` → `git push` → Netlify auto-deploys (~30 seconds)
- **Git remote:** `https://github.com/MichaelChabin/curious-woods.git`
- **Netlify publish directory:** `cw-deploys` (no build command)

## Design Principles

- **Introduce features when the child is most likely to want them**, not when they first become available. Never explain something the child can't yet do anything with.
- **First visit vs. return visits:** First visit, the app acts as a teacher. Return visits, the app trusts the child remembers. No spontaneous tip windows on return — the How this works panel provides access to everything.
- **Marauder's Map:** Controls appear as words, not buttons. Options fade in when possible, fade out when irrelevant. No disabled/greyed-out states.
- **Every canvas window must be draggable and closeable.** No exceptions.
- **The geometry is the foundation.** Glass is a visual layer on top. The geometry doesn't change because of glass. Every point and line remains accessible and functional regardless of what's been colored.
- **"Remember this" inscription:** Permanent, never fades, encodes child data ownership.
- **Color accessibility:** Palettes ensure luminance contrast; construction geometry never depends on color discrimination alone.
- **Privacy:** Anonymous identifiers only. No real-world identity data collected, ever. Data is locally stored and child-portable.

## What NOT to Do

- Do not introduce npm, bundlers, or frameworks without discussion
- Do not extract further shared modules beyond `plane.js` and `cw-panel.js` without architectural justification
- Do not start Maya/Claude API integration — Layer 2 is blocked until Glass is demo-ready
- Do not add assessment, scoring, tracking, or curriculum alignment features
- Do not reject "orphan" segments or disconnected geometry in shape selection — all closed boundaries are valid
- Do not add a lead on/off toggle — lead is always on
- Do not use anthropomorphic design for Maya (she is a gradient blob, not a character)

## Future Work (not yet — do not start)

- **Region subtraction** for overlapping fills (compositing order is the temporary fix)
- **Maya/Claude integration** (Layer 2)
- **Modularization** of geometry-v1.html into ES modules
- **Full planar subdivision** / automatic region detection
- **Sound design** across interactives
- **Return visit timing** (localStorage timestamp to re-orient after long absences)
- **Running notes** as a general tool (currently notes only appear during save flow)
- **The `?` icon convention** on every tool for contextual help
- **Testing infrastructure**

## Key Specs (in Obsidian vault)

- **Interface standard (sits above the two below):** `CWVault/01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md`
- **Layer 1 (construction engine):** `CWVault/20-SPECS/Layer 1 — Consolidated Specification.md`
- **UI language:** `CWVault/00-FOUNDATION/UI-Language.md`
- **Interface design:** `CWVault/00-FOUNDATION/Interface-Foundation.md`
- **System philosophy:** `CWVault/00-FOUNDATION/CW-System-Foundation.md`

## Five Cognitive Modes (Foundation)

All design decisions connect back to these:
1. **Curiosity** — Explorer state, triggered by stories
2. **Focus** — Deliberate problem-solving (short, bounded)
3. **Making** — Fluent doing, rhythm, flow state
4. **Pattern Recognition** — Seeing relationships and structure
5. **Consolidation** — Offline reorganization (reflection, sleep)

## Target Users

- Children aged 10 and up (curious, independent learners). 10 is the floor of competence-map decomposition; there is no upper bound.
- Homeschooling families
- Neurodivergent learners whose curiosity outpaces standard curriculum
- Global reach — must work on older devices (2017+ iPads)
