# Curious Woods — CLAUDE.md

## What This Is

Curious Woods is an AI-guided learning platform for curious, independent children (ages 8–14). It is built on the principle that curiosity and independence drive learning — not assessment or standards. The first interactive is **Glass**, a stained-glass geometric construction and coloring tool.

This is not a typical edtech app. There is no tracking, no standardization, no curriculum alignment. Stories broaden experience and generate curiosity; the AI guide (Maya) is an infinitely patient partner, not a tutor.

## Architecture

**Single-file for now, modular by design.** `geometry-v1.html` contains all HTML, CSS, and JS for the Glass interactive. The code is organized into ~20 clearly delineated sections (marked with `// ====` headers and `What:` descriptions) that map naturally to future modules. Components like the palette picker, constructions panel, picker window, and Remember inscription are designed to be reused across interactives and story pages.

**No build step, no npm, no frameworks.** This is a static site. Vanilla JS, HTML5 Canvas, Web Audio API. Keep it that way. When modularization happens, prefer ES modules (`<script type="module">`) over introducing a bundler.

**Operation log is the spine.** Every canvas action is logged as JSON. Save, load, undo, construction replay all derive from log replay. Operations: `init`, `line`, `circle`, `region`, `fill`, `emphasize`, `deemphasize`, `scaffold`, `label`, `repaint_fill`, `dissolve_fill`, `numbers`. Protect the integrity of this system.

**Two gestures, everything follows:**
- Tap-tap → infinite line (through two points)
- Tap-hold-drag → circle (center + radius, snaps to existing points)
- Intersections are detected automatically and immediately usable

## Current Design (as of March 2026)

### The Left Panel — "How this works"

The old Tools dropdown menu has been **removed**. The left panel now has a single persistent element: "How this works" — a collapsible heading with six bullet items, all visible from the start:

```
How this works
  • Lines and Circles      → opens tip window on canvas
  • Cutting Shapes          → opens tip window on canvas
  • Color                   → opens tip window + color panel
  • Hiding Lines            → opens tip window on canvas
  • Save or Share           → triggers save/share action directly (return visit)
                              or opens tip window first (first visit)
  • New and Open            → triggers new/open action directly (return visit)
                              or opens tip window first (first visit)
```

Below the "How this works" panel: the **color chips** (palette swatches). These live permanently in the panel, not floating.

### Canvas Tip Windows

- Appear on the canvas with explanatory text
- **No title bar** on canvas — just body text and "close" in top-right
- **Draggable** (pointer events, `user-select: none`, `touch-action: none`)
- **Closeable** — closing simply closes, no animation
- Some contain **tappable action words** (e.g., "New", "Open", "Save", "Share", "Choose new colors") rendered as clickable spans in a darker color (`#3D3D3A`)

### Tip Window Content

**Lines and Circles:**
All your beautiful patterns begin with circles, lines, and two points. / To make a line, tap a point, then tap another. / To make a circle, tap a point, then drag to another. / Where lines and circles intersect, new points appear. / Use those to make more lines and circles. / Tap any empty space to undo.

**Cutting Shapes:**
To cut your glass, tap a line. It will fill with lead. / Then tap connected lines. / When you enclose a shape it will turn to glass.

**Color** (triggers at ≥ 4 filled glass shapes):
To color glass, tap a color, then tap the glass. / To choose a different set of colors, tap Choose new colors. / Use the slider to change lead thickness.

**Hiding Lines:**
Double click a line to make it fade / or to make a faded line reappear. / Double click a line and hold the mouse down to / change more than one line.

**Save or Share:**
Tap Save to save your work as an image or as a file you can open and work on later. / Tap Share to send a copy to someone else.

**New and Open:**
Tap New to start a new construction. / Tap Open to see examples and to open constructions you've saved.

### Smart Trigger Suppression

On first visit, tip windows appear at threshold moments. But if the child is already using a feature before its tip triggers, do NOT show the canvas window. All bullets are always visible — no bullet manipulation needed.

### Lead and Glass

- **Lead is always on.** There is no lead on/off toggle. This is a stained glass tool — lead is structural.
- **Selecting segments IS placing lead.** When the child taps a segment, it renders as a lead came (not a "highlighted" construction line). The lead uses the current lead thickness.
- **Any closed boundary of selected segments/arcs is a valid glass shape.** No "orphan" restrictions — lines extending beyond a shape, independent shapes floating inside larger shapes, and shapes sharing tangent points are all valid geometry.
- **Lead thickness** is controlled by a slider in the color panel, labeled "lead thickness." The slider track renders at the current thickness. The thumb is a fixed size.

### Color Panel Layout

```
Palette name                    ← tappable to switch (for experienced users)
[chip] [chip] [chip] [chip] ...  ← palette colors

─────────────────────────────    ← separator line
[canvas bg] [clear]              ← universal chips (not part of any palette)

         lead thickness
[============================]   ← slider, track = current thickness

Choose new colors                ← opens palette picker
```

- **Canvas bg chip**: fills with the canvas background color — this is the "eraser" for glass
- **Clear chip**: default glass (bottle green) — no label needed
- The separator distinguishes palette colors (above) from universal tools (below)

### Overlapping Fills

When multiple filled regions overlap, **draw the largest fill first and the smallest on top** (compositing order by area). This is a temporary solution — full region subtraction is planned for the future.

### Fading Behavior

- **Double-click a line → fades the line AND its points**, except:
  - Points on labeled axes do not fade
  - Points that are endpoints of other non-faded lines do not fade
- **Restoring a line does NOT cascade** — only the line comes back. Points are restored individually.
- **Faded lines and points remain functional** — they can anchor new geometry and participate in shape selection.

### Circle Construction Feedback

During circle construction (tap-hold-drag), **only highlight the single point nearest to the cursor**, not every intersection along the circle. All intersection points are still created — only the visual/audio feedback is filtered to one point.

### Save Flow

Two distinct save actions:

**Save as Construction** — saves the operation log + thumbnail to localStorage. Includes a moveable, resizable note text box. The child names the construction and optionally adds a note. The note's position is saved with the construction.

**Save as Image** — renders a full-size PNG of the finished art: glass fills + lead lines + note text. No construction points, no construction lines, no circles. The note renders at the position the child placed it — it's part of the art, like a signature.

**Image export enhancements** (postcard quality):
- Render at 300 DPI
- Crop to bounding box of artwork + 15% padding
- Note text at fixed physical size (13pt at 300 DPI)
- Subtle vignette on background
- Slight shadow/bevel on lead lines
- Very subtle noise texture on glass fills
- Dark border mat with thin inner line

### Share

Uses `navigator.share()` with the rendered PNG and note text. Falls back to download if share API is unavailable.

### Construction Replay

When a construction is opened from the picker:
- Loads step-by-step into the live geometry engine
- **← → Cancel** controls on the canvas
- Each → click advances one step, with a brief highlight of the involved points (~350ms) before the geometry appears
- Glass/fill steps appear as one click (lead + color together)
- ← goes back one step
- **Cancel** shows dialog: "Start over" or "Continue from here"
- **Forking**: if the child starts drawing during replay, remaining steps are silently discarded, controls disappear
- **All constructions open as copies** — originals are never modified
- Canonical constructions (equilateral triangle, hexagon, etc.) always remain in the picker

### The Uniqueness Observation

After saving (if ≥ 15 points), a text box appears:

"You've made [n] points, [n] lines, and [n] circles. With those, there are more possible arrangements than atoms in the universe. The one you just made — no one has made that before."

Numbers are from the child's actual session. Shows every time the child saves. The math is real.

## File Layout

```
CuriousWoods/
├── CLAUDE.md              ← You are here
├── plans/                 ← Sprint plans for Claude Code (read before working)
├── CuriousWoods/          ← Obsidian vault (design docs, specs, planning)
│   ├── 00-FOUNDATION/     ← Read-only reference (philosophy, UI spec, story template)
│   ├── 01-ACTIVE/         ← Current focus, status, next priorities
│   ├── 10-PROJECTS/       ← Design explorations (Geometry, Geography, Stories)
│   ├── 20-SPECS/          ← Implementation specs (Layer 1 spec is authoritative)
│   └── 99-IDEAS/          ← Idea capture
├── cw-deploys/            ← NETLIFY PUBLISH DIRECTORY
│   ├── index.html         ← Landing/navigation page
│   ├── geometry-v1.html   ← PRIMARY WORKING FILE (~3000 lines)
│   ├── art/               ← Palette images, reference artwork
│   │   └── palettes.json  ← 17 historical color palettes with glass recipes
│   └── models/            ← SVG geometry models + JSON operation logs
├── prototypes/            ← Experimental HTML prototypes (not deployed)
└── tools/                 ← cw-dev-tools.js (injectable debug toolkit)
```

## Deployment

- **Deploy target:** `cw-deploys/` folder → Netlify (thecuriouswoods.netlify.app)
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
- Do not split geometry-v1.html into modules without architectural justification
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

- **Layer 1 (construction engine):** `CuriousWoods/20-SPECS/Layer 1 — Consolidated Specification.md`
- **UI language:** `CuriousWoods/00-FOUNDATION/UI-Language.md`
- **Interface design:** `CuriousWoods/00-FOUNDATION/Interface-Foundation.md`
- **System philosophy:** `CuriousWoods/00-FOUNDATION/CW-System-Foundation.md`

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
