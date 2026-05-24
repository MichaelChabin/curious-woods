# Current Focus

## BRIEF (read this, skip the rest if you're building)

Status: Working Tool phase largely complete. Palette UI + menu done. Glass toggle bug to fix. Arc-bounded fills next.  
Last updated: February 25, 2026

What exists:
- Layer 1 construction engine: `/prototypes/geometry-layer1.html` — working, needs rebuild to consolidated spec
- Two gestures: tap-tap (infinite line), drag (compass), with ghost previews and snap
- Intersection detection: auto, immediately usable
- Undo: single tap empty space. Clear: double-tap empty space.
- Maya gradient blob prototype: `/prototypes/geometry-layer2.html` — breathing + attention working

Layer 1 definitive spec: `20-SPECS/Layer 1 — Consolidated Specification.md`
  Supersedes all previous Layer 1 documents (originals moved to 99-ARCHIVE).
  Key features: two bare unlabeled seed points (labels are a future discovery),
  all lines infinite, 0.5px default with click-to-emphasize at 2px (logical segments),
  scaffold double-tap, point birth animation 3x→1x over 400ms, synthesized sounds,
  subpixel rendering fix.

Current decisions:
- Maya is a gradient blob system in canvas palette (Payne's gray + copper), not a character
- No face, no anthropomorphic features — attention communicated through density gradient
- Blobs converge into five tool forms: crosshairs, magnifier, pencil, energetic knot, sphere
- Maya's constructions are visually distinct (reduced opacity) and fade after ~2 minutes
- Text appears near Maya's position, not in a fixed panel. Brevity always.
- Maya replaces toolbars — tap her for contextual menu (pre-API), talk to her (post-API)
- Emotional intelligence framework: see Session-Feb17-Maya-Presence-Design.md

What to build next:
- **FIRST**: Fix Glass toggle — should hide ALL construction lines/circles (not just scaffolds), leaving only fills visible
- Arc-bounded fills: closure detection for mixed segment+arc boundaries; fill rendering using arc paths
- Labels: movable text annotations, saved in op log, appear in exports
- Image export already works for straight-line fills; needs arc support after arc fills done
- **Layer 2 (Maya wisp) is BLOCKED — Maya integration begins only after construction tool is stable**

Read the full document for: layer breakdown, session history, model guidance

---

**Last Updated:** February 22, 2026 (Project Manager — new PM reconciliation)

---

## What I'm Working On Now

**Geometry Workspace — Layer 2: Maya Presence + Equilateral Triangle Walkthrough**

Layer 1 (construction engine) is complete and being revised (5 changes + scaffold toggle). Maya's gradient blob presence is being developed in parallel in geometry-layer2.html. Maya is a contained circular form (~90px) made of overlapping Payne's gray and copper radial gradients, with directional attention and irregular breathing.

**Full design vision:** [[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]]

**Layer 1 prototype:** `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`

---

## Required Foundation Specs

For Layer 2, read:

- [[20-SPECS/Spec-Maya-Presence-Cursor]] ← **PRIMARY for coding sessions — complete implementation spec**
- [[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]] — equilateral triangle walkthrough, developmental arc
- [[01-ACTIVE/Session-Feb17-Maya-Presence-Design]] — design rationale, emotional intelligence framework
- [[00-FOUNDATION/CW-System-Foundation]] — cognitive modes, system philosophy (read once for context)
- [[00-FOUNDATION/Interface-Foundation]] — color palette, typography (brief only — skip the full doc)

---

## Layer 2: Maya Presence

**Goal:** Add Maya as a gradient blob presence on the canvas that transforms into tools, demonstrates constructions, and narrates the equilateral triangle walkthrough.

**Spec:** [[20-SPECS/Spec-Maya-Presence-Cursor]] — full implementation details.
**Design rationale:** [[01-ACTIVE/Session-Feb17-Maya-Presence-Design]]

### What Layer 2 Needs

- [x] **Gradient blob rendering** — 4 overlapping radial gradients (Payne's gray + copper), ~90px contained circular form
- [x] **Breathing** — irregular cohesion variation via layered sine waves, radius ±6px, opacity ±0.12
- [x] **Directional attention** — internal density gradient shifts toward attention target, copper at leading edge
- [ ] **Two movement modes** — attending (slow reorientation) and traveling (stream with dense region leading)
- [ ] **Five transformations** — crosshairs, magnifier, pencil, energetic knot, sphere (blobs converge ~300ms)
- [ ] **Dev panel** — temporary floating menu to trigger Maya behaviors for testing
- [ ] **Demonstration sequence** — move → transform → act → return; Maya's constructions visually distinct and fade after ~2 min
- [ ] **Event system** — Maya responds to: circle committed, segment committed, intersection appeared, canvas idle, gesture cancelled
- [ ] **Text near wisp** — brief utterances anchored to Maya's canvas position, translucent backing, fade in/out
- [ ] **Scripted walkthrough** — equilateral triangle session: Maya demonstrates circle, child replicates, Maya demonstrates line, child replicates, intersections discovered together
- [ ] **Pacing** — when child might discover something, Maya gives them a beat; when child is flowing, Maya says nothing

### Done When

- Maya's wisp is visible and breathing on the canvas
- She demonstrates circle and line constructions with visible transformations
- Her constructions are visually distinct (softer, luminous) and fade after ~2 min
- She narrates the equilateral triangle reactively (responds to events, not pre-timed)
- Text appears near her position, fades naturally
- The walkthrough feels like discovery with a companion, not a tutorial

---

## 🔧 Layer 1: IN ACTIVE DEBUGGING (as of February 22, 2026)

**Prototype:** `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`

**What works (confirmed):**
- Pannable/zoomable canvas with warm parchment background
- Two seed points (unlabeled) — labels are a future discovery
- Tap-tap gesture for lines with ghost preview
- Drag gesture for circles with ghost preview and snap-to-point
- Intersection detection: line-line, line-circle, circle-circle — auto-detected, immediately usable
- Model B: intersections real from detection (pulse gold until used)
- Undo (single tap empty space) and clear (double-tap empty space)
- Audio: all gesture sounds working (lazy AudioContext init fixed Feb 22)
- Point birth animation: 3x→1x scale over 400ms
- Subpixel rendering fix
- Emphasis fires on single tap (fixed Feb 22)

**⚠️ NOT YET TESTED (rebuilt end of Feb 22 session):**
- Arc-by-arc emphasis: `logicalArcs` system — tap arc should highlight just that arc
- Scaffold toggle on circles: double-tap should fade whole circle to 22%
- Ghost circle during drag: verify still correct after rewrite
- Line gesture: verify no interference from arc hit detection changes

**Design decisions:**
- Vanilla JavaScript + HTML5 Canvas (no framework)
- Intersections immediately usable (Model B)
- Undo/clear via empty-space taps
- 0.5px default lines, click-to-emphasize at 2px (logical segments/arcs)

---

## Subsequent Layers

**Layer 3:** Sandbox mode with segment selection and closed-region coloring.

**Layer 4:** Sensory layer — ambient sound, color temperature shifts, Maya's presence light.

**Layer 5:** Number line construction session — extending, marking units, labeling, negative numbers.

**Layer 6:** Coordinate plane construction — perpendicular through origin, grid animation by Maya.

---

## Model Guidance

- **Use Opus** for design questions, Maya's conversational approach, pacing, scenario walkthroughs.
- **Use Sonnet** for building code, the event system, rendering Maya's canvas marks.
- The equilateral triangle walkthrough is fully scripted in the [[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]] document.

---

## Session Notes

### February 25, 2026 — Menu + Palette UI Build Session (Sonnet 4.6)
- **Palette UI complete**: vertical strip, canvas-drawn, four historical palettes (Gaudí default, Chartres, Isfahan, Alhambra)
- Swatches 40×48px, opacity slider, collapse tab, fully draggable
- Paint mode: tap swatch → enters paint mode (cell cursor), tap filled region → repaints
- `repaint_fill` op added to log: `{op:'repaint_fill', fillId, color, opacity}`
- Fills now store opacity independently (default 0.4)
- **Menu complete**: rose window icon top-right, collapses to icon, seven items
- Save expands to File (JSON) / Image (PNG with auto bounding box)
- Image export: auto bounding box from construction extents + 60px padding, renders to offscreen canvas
- Lines toggle: hides/shows all construction lines and circles
- Glass toggle: BUG — currently only hides scaffold lines. Should hide ALL construction geometry, leaving only fills. Fix needed next session.
- Labels stub: alert placeholder
- Share stub: alert placeholder
- New: confirmation dialog → clears construction
- Load: drag-to-canvas (same as before)
- Menu closes on tap-outside
- **Key technical note**: palette and menu both use `ctx.setTransform(dpr,0,0,dpr,0,0)` pattern for CSS-pixel-space drawing inside dpr-scaled canvas. This is the correct approach.
- **Context window note**: this session hit the limit. File was delivered via container → present_files → download workflow (filesystem MCP writes to Mac not working reliably this session).
- **Next session priorities**: (1) Fix Glass toggle — should hide all lines/circles not just scaffolds, (2) Arc-bounded fills (curved region detection), (3) Labels
- File: `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`

### February 27, 2026 — Developer Toolkit Build Session (Toolkit chat)
- `tools/cw-dev-tools.js` built and working — injectable, one script tag, no trace when removed
- `prototypes/cw-default-page-lab.html` built — two-panel design lab with Chartres story, Remember inscription, separator comparisons
- Left panel confirmed as transparent warm tint (`rgba(210,200,180,0.18)`) — world shows through
- Key framing: left panel is a **context membrane** — tools appear contextually, dragging to canvas = commitment
- Underlay tool confirmed as pedagogical mechanic: place rose window/tile pattern, child reverse-engineers it
- Next toolkit additions: underlay scale/drag-to-position, geometry palette redesign, panel expansion logic, text component controls
- To run: `python3 -m http.server 8080` from `/Users/michaelchabin/CuriousWoods`

### February 27, 2026 — UI Language + Developer Toolkit Session (Design chat + Toolkit chat)
- UI Language document created: `00-FOUNDATION/UI-Language.md` — authoritative for all new content
- Two-panel layout established: right panel pure content, left panel living/dynamic
- Controls are words, not buttons — Marauder's Map principle
- Remember inscription: permanent, never fades, child's data ownership signal
- Palette recipe line: chemistry the child learned becomes the color she's choosing
- Underlay mechanic: real image at 20-40% opacity, child reverse-engineers it, no instruction
- 30-SKILLS folder created as placeholder for SKILL-Story-Developer.md
- Interface-Foundation updated to point to UI-Language as companion
- Developer toolkit producing results — Michael spending time tuning visual appearance
- Graphics Design chat not yet opened — trigger: concrete reactions from toolkit session

### February 25, 2026 — Design Session (Opus 4.6, Design chat)
- Electron deferred deliberately: web app continues as dev vehicle; wrap when maximally functional as a spec
- Saving strategy identified as critical unresolved question — needs design decision before more infrastructure
- Full interactives map established for first time: Glass, Tiles, Cities and Buildings, Sets, Euclid, Coordinate Plane
- Sets emerged naturally from fill overlap observation (overlapping fills → visible intersection color)
- Single app vs. multiple apps: decide just before building second interactive
- Graphics and Visual Design chat: open after developer overlay session; Michael needs concrete reactions first
- Interactive Design chat: open when second interactive begins
- Overlapping fills at 40% opacity: evaluate visually for beautiful vs. muddy with Gaudí palette
- Documents: `10-PROJECTS/Planned-Interactives.md` created

### February 24, 2026 — Working Tool Build Session 2 (Sonnet 4.6, Working Tool Coding chat)
- Palette UI complete: color selection, repaint existing fills, opacity slider, four palettes, draggable, collapsible
- Menu complete: rose window icon, Save→File/Image, Load, New, Labels (stub), Lines toggle, Glass (stub), Share (stub)
- Known bug: Glass toggle only hides scaffold lines — trivial fix (one condition per render loop), first thing next session
- Next: Glass fix, then arc-bounded fills

### February 24, 2026 — Working Tool Build Session 1 (Sonnet 4.6, Working Tool Coding chat)
- Operation log architecture complete — save/load/undo all derive from log replay
- Save: Cmd+S with name prompt. Load: drag-to-canvas.
- Region fill working: emphasis closes region, fill appears, emphasis auto-clears
- Multiple fills accumulate independently; overlapping fills blend at 40% opacity
- Seven Gaudí palette colors cycle per fill
- Dissolve working: deemphasize boundary segment removes fill
- KEY DECISION: Emphasis is a temporary selection gesture, not permanent state. Fills are the permanent artifacts. Shared edges between adjacent regions handled naturally.
- Next: palette UI, then menu, then image export

### February 24, 2026 — Working Tool Design Session (Opus 4.6, Design chat)
- Established Working Tool as a distinct development phase between Construction Engine and Maya Integration
- Operation log designed: single JSON format serves save/load, unlimited undo, Maya demo playback, construction library
- Operations: init, line, circle, region, fill, emphasize, deemphasize, scaffold, label. Points are computed consequences, not logged.
- Unlimited undo falls out of operation log naturally — no separate implementation needed
- Double-tap empty space replaced by New in menu (with confirmation)
- Region detection: boundary segments selected in any order, first closure wins, fill appears immediately
- New constructions through boundary segments split them, both halves inherit boundary state
- Four color palettes designed with hex values: Gaudí (default), Medieval/Chartres, Persian/Isfahan, Alhambra/Nasrid
- Stories can specify a palette on load
- Palette UI: vertical strip, draggable, transparency slider, collapsible to sliver
- Menu: floating rose-window icon, seven single-word items (Save, Load, New, Labels, Lines, Glass, Share)
- OPEN: image export bounding box — automatic from extents, or user-defined crop?
- OPEN: Labels interaction — not yet designed
- OPEN: Hex values proposed, not final — verify against reference images
- Spec: `20-SPECS/Spec-Working-Tool.md`

### February 22, 2026 — Priority Reframe Design Session (Opus 4.6, Design chat)
- Maya integration reframed: Layer 2 is BLOCKED pending tool completion + library infrastructure
- The "development version" is the prototyping environment, not a separate product
- After Layer 1 debugging: next priority is library functions (save/load highest-leverage)
- Development menu needed: explicit UI for functions Maya will eventually own
- Maya onboarding designed (preserved for later): Maya is already building when scene opens, notices child, names what she was building, offers to show how it works. If child starts immediately, Maya steps aside.
- Text appears near Maya without box or background
- OPEN: which library function gets built first after Layer 1? Save/load proposed.
- DECISION: gesture vocabulary stays exclusive in all versions. Menu for non-gesture functions (save/load, etc.) but no tool buttons replacing gestures.

### February 22, 2026 — Layer 1 Audio + Emphasis Debugging (Sonnet 4.6, Geometry Coding chat)
- **Root cause found**: bash_tool writes go to Linux container, NOT Michael's Mac. All previous session's "fixes" were lost. Must use `filesystem:write_file` exclusively.
- **Audio fixed**: Lazy AudioContext init with `ensureAudio()` returning a Promise. `playSound()` chains `.then(() => scheduleSound())`. Audio now works on first gesture.
- **Circle hit detection fixed**: Circles tested before line segments. Nearest circumference wins.
- **Emphasis logic fixed**: Single tap fires immediately (was requiring two taps due to sameObject check failing).
- **Arc-by-arc emphasis rebuilt**: Full `logicalArcs` system added — parallel to `logicalSegments`. Each arc between consecutive `pointsOnCircle` entries is a separate object with `isEmphasized`. Hit test checks circumference distance + angle window. Render uses `ctx.arc(angA, angB)`.
- **NOT YET TESTED**: The arc system was the final write before context window limit. Test first thing next session.
- **Key lesson**: Always use `filesystem:` MCP tools for reads and writes on Michael's Mac. bash_tool is for computation only.

### February 20, 2026 — Spec Consolidation (Opus 4.6, Project Manager chat)
- Layer 1 consolidated spec created: `20-SPECS/Layer 1 — Consolidated Specification.md`
- Supersedes Layer-1-Build-Brief, Spec-Layer1-Amendment-Feb19, Spec-Scaffold-Toggle (all archived to 99-ARCHIVE)
- Key evolution from earlier specs: seed points now unlabeled (labels are future discovery),
  lines 0.5px default with emphasis system (click logical segment → 2px), birth animation 3x→1x/400ms
- CW Developer Toolkit spec created: `20-SPECS/Spec CW Developer Toolkit.md`
- Toolkit noted in Session Protocol — all coding chats should offer to include it
- Geometry Workspace Overview updated to reflect infinite lines, scaffold toggle, no initial segment
- Maya spec at v3.0 (gradient blobs) — breathing + attention working in layer2 prototype

### February 19, 2026 — Maya Visual Design Session (Opus 4.6, Project Manager chat)
- Replaced wisp-of-light concept with particle system in canvas palette
- Maya is Payne's gray + copper particles, not teal luminous glow
- Directional attention via density gradient (denser side faces work)
- Breathing via irregular cohesion variation (not sinusoidal pulse)
- Particles coalesce into tool forms like iron filings snapping to a magnet
- Spec-Maya-Presence-Cursor.md rewritten as v2.0
- Decision: Maya replaces toolbars entirely — tap her for contextual menu (pre-API)
- Decision: tools discussion — save, load, color, clean up all mediated through Maya
- Design principle: "A bird's glide is not human but nice"
- Discussed API integration timing and costs (~$2/child/month with Sonnet + Polly)

### February 18, 2026 — Project Manager Integration (Opus 4.6, Project Manager chat)
- Adopted Session Protocol as governing document
- Read and integrated CW-System-Foundation (cognitive modes, story types, practice methods, competence map)
- Read and integrated Session-Feb17-Maya-Presence-Design (wisp, transformations, emotional intelligence)
- Added brief headers to Interface-Foundation and Claude-Learning-System
- Updated Layer 2 descriptions across Current-Focus, Next-3, Current-Status to reflect wisp design
- Added cognitive mode references to Geometry Workspace Overview brief
- Resolved: point visual simplification (two states only: default + approach glow)
- Resolved: Maya demonstrates by moving cursor and performing gestures, child watches then replicates
- Open: Layer 2 file decision (extend geometry-layer1.html or start geometry-layer2.html)
- Open: point size reduction (currently too dominant, try 4-6px with contrasting color)

### February 17, 2026 (evening) — Maya Presence Design Session (Sonnet 4.6)
- Developed complete design for Maya as wisp of light in canvas space
- Defined five transformation forms: crosshairs, magnifier, pencil, energetic knot, sphere
- Established movement physics, state machine, and emotional intelligence framework
- Defined response framework for: genuine curiosity, social signals, policy violations, testing/crude inputs
- Established text-near-wisp communication model (brevity principle)
- Outlined memory categories: construction history, curiosity threads, emotional relationship, session shape
- Full session summary: [[01-ACTIVE/Session-Feb17-Maya-Presence-Design]]
- Implementation spec: [[20-SPECS/Spec-Maya-Presence-Cursor]]

### February 17, 2026 — Layer 1 Build Session (Sonnet)
- Built complete construction engine in one session using Layer-1-Build-Brief
- Prototype at `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`
- All Layer 1 criteria met: equilateral triangle constructable, ghost previews work, intersections detected and usable, snap feels natural
- Design decisions: Model B intersections (immediately usable), undo/clear via empty space taps, line extension via approach highlighting
- Construction engine feels right in the hand — ready for Layer 2

### February 16, 2026 — Geometry Workspace Design Session (Opus)
- Developed complete design vision for unified geometry construction environment
- Established two-gesture grammar: tap-tap (straightedge) and drag (compass)
- Defined three feedback states: Highlight, Glow, Ghost preview
- Walked through three sessions in detail: equilateral triangle, number line, coordinate plane
- Defined Maya's three voices: words, canvas marks, highlighting
- Articulated "shared responsibility" model — Maya as partner, not instructor
- Resolved origin problem: build number line first, then perpendicular through 0 via circles on 1 and -1

### February 16, 2026 — Vault Reorganization (Opus, "Project Manager" chat)
- Audited all 29 vault files, reorganized folder structure
- Fixed all wiki-links, updated stale documents
- Created Layer-1-Build-Brief for focused Sonnet sessions
- Removed exposed API token, archived stale files

### January 29, 2026 — Five-Page Structure & Claude Learning System
- Evolved to five-page pattern: WHAT → WHERE → WHEN → STORY → WHY
- Created Claude-Learning-System.md specification

### January 27, 2026 — Three-Page Structure
- Defined three-page pattern, layout specifications
- Completely rewrote Story-Template.md (v2.0)

### January 26, 2026 — Setup & Typography
- Created Obsidian vault structure
- Documented Interface Foundation spec, Story Template pattern

---

**Usage Instructions:**

1. **At start of EVERY session:** Open this file first
2. **For building Layer 2:** Use Sonnet — read this file + Geometry Workspace for Maya's scripted session
3. **For design questions:** Use Opus — read this file + Geometry Workspace + Interface Foundation
4. **Update session notes** at bottom with date
