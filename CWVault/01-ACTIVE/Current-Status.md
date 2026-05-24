# Current Status — Curious Woods Project

## BRIEF

Status: Glass interactive substantially complete. Numbers feature shipped March 16. Constructions panel playback system next. Demo/testing phase begins imminently.
Last updated: March 16, 2026 by Project Manager

---

## Quick Status

**✅ GLASS INTERACTIVE — SUBSTANTIALLY COMPLETE**
- Active file: `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html`
- Construction engine, fill system, palette tool, Constructions panel (basic structure), tools menu — all working
- Numbers feature (axis labels) shipped March 16 — see Handoff-Mar16-Numbers.md
- New Coder starts from Handoff-Coder-Mar16.md — supersedes all earlier coder handoffs

**🛠️ IN PROGRESS — CONSTRUCTIONS PANEL PLAYBACK**
The Constructions panel basic structure exists. What remains (in order):
1. Playback system — child-controlled navigation (tap to advance/back), pause flags, "watching" state
2. "Show me" → "try it" sequence (sequence, not parallel options)
3. Save as Construction — PNG capture + note UI + localStorage
4. Dwell time tracking for session data
5. Touch magnifier (offset crosshairs for fat-finger problem)
6. How-to note

See Handoff-Coder-Mar16.md for full design and implementation detail.

**✅ LAYER 2 (MAYA) — DESIGNED, BLOCKED**
- Spec: `20-SPECS/Spec-Maya-Presence-Cursor.md`
- Blocked until Glass demo is stable

---

## What Has Been Built (as of March 16, 2026)

### Active File
**`/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html`**
This is the single working file. All previous files superseded.
Deploy: drag `cw-deploys/` folder to Netlify → thecuriouswoods.netlify.app

### Construction Engine
- Two seed points, tap-tap for infinite lines, drag for circles
- Intersection detection: line-line, line-circle, circle-circle — automatic
- Logical segments and arcs between intersection points
- Tap to emphasize; emphasized edges closing a region auto-fill with forest glass `#c2d4bc`
- Double-tap segment: scaffold toggle (construction hint, visually recessive)
- Undo: tap empty canvas. New construction: double-tap empty canvas.
- All actions logged as JSON — save/load/undo derive from log replay

### Fill System
- Auto-fill on region closure: forest glass `#c2d4bc`
- Tap filled region with color selected: repaints
- Tap filled region with Empty swatch: removes fill entirely
- Lead toggle: 2px border on all filled regions globally

### Numbers Feature (shipped March 16)
- Integer axis labels on construction points
- x-axis auto-detected; y-axis earned by construction
- Default ON; toggle in Constructions panel
- Suppressed in glass mode and PNG export
- Pedagogical intent: numbers as property of space that geometry summons
- See Handoff-Mar16-Numbers.md for full rationale

### Palette Tool (Tools → Color)
- Named palette as selector — clicking name reveals switcher + "Choose..."
- Color swatches 3-wide; recipe text on hover (italic, small, below palette)
- Three craft swatches below hairline rule: Empty · Clear · Lead
- Floating picker window: parchment background, 200ms fade, draggable
- palettes.json v1.1: colors as objects with hex, recipe, uncertain fields
- Four palettes: Gaudí (default), Medieval, Persian, Alhambra

### Constructions Panel (Tools → Constructions)
- Basic structure exists with "How this works" and "Examples" sections
- Replaces Drawing Guide (retired — SVG tracing overlay had fundamental precision mismatch)
- Playback system not yet built — see Handoff-Coder-Mar16.md

### Tools Menu
- Hover to reveal, collapses after 1200ms; items stagger in with deliberate pacing
- Working: Save (JSON/PNG), Load, New, Lines toggle, Glass toggle, Sound, Color, Constructions
- Stubs: Share

### Visual Design
- Canvas: parchment `#f4f1e8`
- Payne's gray `#546A80` throughout for interactive text; Georgia serif
- Left panel: transparent membrane `rgba(210,200,180,0.18)`, 0.5px border `#c8b89a`
- Emphasized segments: glow effect (soft halo pass + crisp line)
- Points: copper `#BE622F`, birth animation scale 2×→1× over 400ms
- "I want to Remember this": permanent, draggable, copper accent on "Remember"

---

## Asset Files

| Item | Path |
|------|------|
| Active file | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Palettes JSON | `/Users/michaelchabin/CuriousWoods/cw-deploys/art/palettes.json` |
| Art images | `/Users/michaelchabin/CuriousWoods/cw-deploys/art/` |
| Model SVGs | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/` |
| Model logs | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/logs/` |
| Model previews | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/previews/` |
| Dev tools | `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js` |
| Deploy folder | `/Users/michaelchabin/CuriousWoods/cw-deploys/` |
| Vault root | `/Users/michaelchabin/CuriousWoods/CuriousWoods/` |

**Deploy workflow:** `cw-deploys/` is both the working folder and the deploy target.
Drag `cw-deploys/` to Netlify to deploy. Root `index.html` routes to available tools.
Verified working March 7.

**Folder structure at `/Users/michaelchabin/CuriousWoods/`:**
- `CuriousWoods/` — Obsidian vault (documents only)
- `cw-deploys/` — working files + Netlify deploy target
- `stories/` — story HTML files
- `templates/` — page templates
- `tools/` — dev tools (cw-dev-tools.js)

---

## Design Decisions Log (March 2026)

**March 16**
- Numbers feature: axis labels, all-positive map convention, earned y-axis, default ON
- Toggle in Constructions panel; logged in operation log; suppressed in glass mode and PNG export
- Pedagogical framing: numbers as property of space that geometry summons
- Playback redesigned: child-controlled navigation (tap forward/back), not timed auto-play
- "Show me" and "try it" are a sequence, not parallel options — watch first, then attempt
- Pause points are curatorial (`pause: true` flag in log), not algorithmic
- Cursor vocabulary deferred to Layout Manager; touch magnifier is the one exception (implement now)
- New Coder chat opened; Handoff-Coder-Mar16.md supersedes all earlier coder handoffs
- Active file confirmed as `cw-deploys/geometry-v1.html` (single working copy, also deploy target)

**March 8**
- Drawing Guide retired; replaced by Constructions panel with try-it/show-me
- Demo/testing system designed: session hooks + exit survey with child-visible data + opt-in share
- Sound: permission ask before first sound, mute toggle in Tools menu
- Starter constructions: equilateral triangle, hexagon, nested squares

**March 7**
- Deploy folder `cw-deploys/` established as working folder and Netlify deploy target
- `index.html` router written at deploy root
- 50-PROTOTYPES plan reversed — Obsidian cannot usefully display HTML/asset files

**March 6**
- geometry-v1.html became single working file; all previous files superseded
- Lead border: 2px
- Action layer: every canvas action is a named callable function (Maya-ready)
- Auto-fill on region closure: forest glass `#c2d4bc`
- showLines and showGlass wired as working toggles

**March 5**
- Palette switching leaves existing fills unchanged
- Craft swatches: Empty / Clear / Lead — dedicated bottom row in palette picker
- palettes.json schema v1.1: colors as objects {hex, recipe, uncertain}
- Recipe task completed: all 16 palettes have recipe/uncertain fields

---

## Open Design Questions

- Airtable vs Google Form as survey receiver (Michael's decision — needed before demo)
- Framing page: yes or no, what it says (Michael's decision)
- Picker thumbnail layout for paintings: 2-column or 3-column
- Models JSON companion file: schema needed for context-sensitive defaults
- Backlighting / transmitted light: future session
- Lead border visual review: does 2px `#777777` inset shadow read as actual lead
- Rating scale visual design for exit survey: stars vs word scale (Designer)
- Cursor vocabulary (Layout Manager — in progress, see Note-CursorVocabulary-Mar8.md)
- Scale Beam tile design + visual language (6 open questions for Designer — see 20-SPECS/Scale-Beam-Tool.md)

---

## Chat Roster (current)

| Chat | Purpose | Status |
|------|---------|--------|
| Project Manager (Opus) | Documents, coordination | Active |
| Designer (Opus) | Design sessions | Active |
| Coder (Sonnet) | geometry-v1.html | Active — working from Handoff-Coder-Mar16.md |
| Story Developer (Sonnet) | Story series development | Active — stained glass series + Scale Beam spec complete. Sessions end with Session Harvest. |
| Layout Manager | Cursor vocabulary, visual design | Active — cursor spec in progress |

---

## Planned Interactives

| Name | Description | Status |
|------|-------------|--------|
| Glass | Stained glass construction and coloring | Active — demo imminent |
| Tiles | Shape duplication, rotation, tiling the plane | Planned |
| Cities and Buildings | Reconstructing ancient sites | Planned |
| Sets | Overlapping regions, intersection, union | Planned |
| Euclid | Classic constructions, proofs | Planned |
| Coordinate Plane | Child-built coordinate system | Specced |

---

## Architecture Decisions (stable)

- **Web app continues as development vehicle.** Electron deferred deliberately.
- **Single file prototype.** geometry-v1.html holds everything until a reason to split emerges.
- **Operation log is the spine.** Save, load, undo, demo playback, Maya demonstrations all derive from it.
- **Maya integration blocked** until Glass is stable and demo-ready. Maya spec complete.
- **Privacy:** No identity data ever collected. Behavioral data (anonymous) collected with disclosure and child-visible opt-in for demo testing.
- **Action layer:** Every canvas action is a named callable function so Maya can invoke them without surgery later.
- **Cursor vocabulary waits for Layout Manager.** Touch magnifier is the one exception — implement now.
