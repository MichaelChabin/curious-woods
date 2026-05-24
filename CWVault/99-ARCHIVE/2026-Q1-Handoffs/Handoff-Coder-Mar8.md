# Handoff to Coder — March 8, 2026

**From:** Project Manager
**To:** Coder (geometry-v1.html)
**Priority:** High — this unblocks demo

Read this before touching the file. Four things to build, in this order.

---

## 1. Constructions Panel (replaces Drawing Guide)

The Drawing Guide tool is retired. The SVG tracing overlay approach had a fundamental precision mismatch with the geometry engine that cannot be cleanly resolved. Replace it entirely with a Constructions panel.

**In the Tools menu:**
- "Drawing Guide" becomes "Constructions"
- Same position, same hover behavior

**The panel UI:**
- Shows 3 default construction thumbnails + "Choose..." for the full library
- Starter set (hardcoded for now, JSON-driven later): Equilateral Triangle, Hexagon, Nested Squares
- Each thumbnail has two words beneath it: **"try it"** and **"show me"**
- Thumbnail images are the existing SVG files from `/prototypes/models/`

**"Try it" behavior:**
- Loads the construction's SVG as a ghost overlay on the canvas
- Low opacity (suggest 20–25% — adjust visually)
- `pointer-events: none` — the ghost is purely visual, the child constructs on top of it
- The ghost persists until the child closes the Constructions panel or starts a new construction
- No scale or opacity sliders — the ghost is at a fixed, visually calibrated size

**"Show me" behavior:**
- Plays back a curated operation log step by step on the canvas
- Walk the log array, call `appendOp()` on a timer with deliberate pacing (suggest 600–800ms between steps — adjust for feel)
- While playing: show a quiet word "watching" in the left panel with a gentle "stop" option
- Playback completes and canvas is left in the final state of the construction
- Operation log files will live at `models/logs/` — filenames match SVG names (e.g., `geo_triangle_equilateral.json`)
- For now, these log files may not exist yet — build the playback mechanism and test with a synthetic log. Eileen will record the real ones once Save as Construction is confirmed working.

**What is NOT being built yet:**
- The full picker ("Choose...") — stub it as a word that does nothing for now
- Models JSON (construction library schema) — coming in Priority 3. For now, hardcode the three defaults.

---

## 2. Sound Permission + Mute Toggle

**Permission request:**
- Before the first construction sound plays, show a quiet permission ask in the left panel
- Not a browser alert — a line of Georgia text in Payne's gray, consistent with CW language
- Something like: "may I use sound?" with "yes" and "no" as words (not buttons)
- If yes: sounds play normally, permission ask disappears, never shown again this session
- If no: sounds suppressed for the session; mute toggle in Tools reflects this state
- Appears only at the moment the first sound would trigger — not on page load

**Mute toggle in Tools menu:**
- A word "Sound" in the Tools menu (Level 2, no subcommands)
- Toggles to "Mute" when active (or vice versa — whatever reads more naturally)
- Consistent with the "words not buttons" language throughout
- Reflects and controls the same sound state as the permission ask

---

## 3. How-To Note

A collapsible panel that opens on launch and closes after the child's first action on canvas.

**Content (exact wording to be refined, but substance is fixed):**
- Tap twice to draw a line
- Drag to draw a circle
- Intersections appear on their own
- Tap a segment to select it; close a shape to fill it
- Double-tap a line or circle to make it a guide
- Tap empty space to undo; double-tap empty space to start over

**At the bottom, in copper:**
"watch it build ▸"

Clicking "watch it build ▸" opens the Constructions panel. This is the entry point to Show me — a child who doesn't know what to do can watch a construction, then try to build it herself.

**Behavior:**
- Open on launch
- Closes automatically after the child's first canvas action
- Reopenable from Tools menu (Level 2 item: "How to")
- Collapsible manually (a quiet "×" or equivalent — consistent with CW style)

---

## 4. Confirm: Operation Log Schema Stable?

Before Eileen records curated constructions, the operation log schema must be confirmed stable — no further format changes planned. Please confirm this explicitly in your next handoff. Once confirmed, she can record and the Save as Construction workflow begins.

**Save as Construction** must be working and tested before Eileen records. Confirm this is complete or nearly complete.

---

## File and Path Notes

- Single working file: `/Users/michaelchabin/CuriousWoods/prototypes/geometry-v1.html`
- Model SVGs: `/Users/michaelchabin/CuriousWoods/prototypes/models/`
- Operation log files (coming): `/Users/michaelchabin/CuriousWoods/prototypes/models/logs/`
- Use `filesystem:` tools for ALL file writes — never bash_tool

**File naming discipline (established March 6 — do not deviate):**
- `geometry-v1.html` is the only working file
- Snapshots before major changes: `geometry-v1-YYYYMMDD.html`
- Do not create new HTML files without PM instruction

---

## What This Handoff Does Not Cover

- Exit survey and session data hooks — see Note-Demo-Testing-Mar8.md
- File reorganization — see Note-FileReorg-Mar8.md (to be written)
- Models JSON / full construction library — Priority 3, after demo
