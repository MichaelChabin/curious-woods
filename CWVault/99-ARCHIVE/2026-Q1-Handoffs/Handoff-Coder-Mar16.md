# Handoff to New Coder — March 16, 2026

**From:** Designer Chat
**Supersedes:** constructions-redesign.md, Handoff-Coder-Mar8.md
**Active file:** `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html`
**Deploy:** drag `cw-deploys/` to Netlify → thecuriouswoods.netlify.app

Read this document first. Then read Current-Status.md for broader project context.
Do not rely on constructions-redesign.md or Handoff-Coder-Mar8.md — this document supersedes both.

---

## State of the Tool (as of March 16)

The following are complete and working:
- Construction engine: tap-tap lines, drag circles, intersections, fills, undo
- Palette tool with four palettes, craft swatches (Empty/Clear/Lead), recipe lines
- Numbers toggle: integer labels on axis points, x-axis auto-detected, y-axis earned by construction
- Save as Construction (JSON), Save as Image (PNG)
- Glass toggle, Lines toggle, Sound
- Constructions panel: basic structure exists with How this works and Examples sections

The previous Coder reached context limit mid-session. The constructions-redesign.md document captures much of what was discussed and designed, but several design decisions have since been updated. This document is the authoritative source.

---

## What Needs to Be Built — In Order

### 1. Constructions Panel — Playback System

This is the most significant item and the one where the previous design needs updating.

#### The core mechanic: child-controlled navigation

**Playback is not automatic.** The child taps to advance, and can tap backward to revisit.

This is the critical departure from constructions-redesign.md, which specified automatic timed playback with delays per operation type. That approach is wrong for this tool. The child is not watching a video — she is navigating a construction. The difference matters.

**How it works:**
- Playback walks the operation log one *significant step* at a time
- After each significant step, playback pauses and waits for a tap to continue
- The child can tap backward to return to the previous step
- Forward and back navigation words appear quietly at the bottom of the canvas during playback — "next ▸" and "◂ back" — in the same copper/Georgia register as other CW words

**What "significant step" means:**
Steps are defined by consequence, not by operation. A step is a moment where something new becomes visible:
- First line appears
- First circle appears
- First intersection lights up
- A region closes and fills
- A color is applied

An intermediate line that extends a construction without producing a new intersection is not a pause point — it happens fluidly and the next significant step is the pause.

**Pause points in the operation log:**
Significant steps are marked with a flag in the log:
```json
{ "op": "line", "pause": true, "pauseNote": "first line" }
```
`pauseNote` is for the curator's reference only, never displayed. Playback pauses after any op marked `pause: true`. Eileen will set these flags when she records curated constructions. Build the flag into the format now.

**During playback:**
- A quiet word "watching" appears in the Constructions panel with a small "stop" nearby
- "stop" mid-playback leaves the partial construction on canvas (child can explore it)
- When playback completes: "close · repeat" appears at top-left of canvas in copper Georgia
  - `close` — clears the replayed construction
  - `repeat` — restarts from init

#### The "show me" → "try it" sequence

In constructions-redesign.md, "try it" and "show me" were independent choices from thumbnails. They are now two phases of the same experience:

1. Child taps "show me" on a construction thumbnail
2. Canvas clears, playback begins with child-controlled navigation
3. Construction completes, "close · repeat" appears
4. Panel now offers "try it" — loading the ghost SVG overlay so the child can construct toward it

The child watches, then attempts. These are not parallel options — they are a sequence.

#### Ghost overlay ("try it")
- SVG file rendered at low opacity (20–25%) on canvas
- `pointer-events: none` — purely visual, child constructs on top
- Fixed size, no sliders
- Persists until child closes panel or starts new construction
- SVGs are the existing files in `cw-deploys/models/`

#### Picker ("Choose…")
- Opens the existing picker window infrastructure
- Populated with PNG thumbnails of available constructions
- Built-ins: Triangle, Hexagon, Nested Squares (PNGs in `cw-deploys/models/previews/`)
- User-saved constructions from localStorage also appear here
- Clicking a thumbnail loads that construction's preview card (see below)

#### PNG Preview Card
The preview card from constructions-redesign.md is correct and worth keeping:
- Movable floating element on canvas
- Shows PNG thumbnail of the construction
- `close` at top left
- "Show me how this was done" at bottom → launches playback sequence above
- If construction has a note, note appears as small text overlay near the card

---

### 2. Save as Construction — PNG Capture + Note UI

From constructions-redesign.md, this design is correct. Keeping it as-is:

- On "Save As Construction": capture bounding-box PNG of canvas (same logic as exportImage but to Blob)
- Show movable note text box on canvas: Georgia, placeholder "add a note…", transparent bg, 0.5px border
- Two words below: `save` · `skip`
- `save` includes note in JSON and proceeds to download both `.json` and `.png` as a pair
- `skip` proceeds without note
- Note stored in JSON: `{ "version":1, "name":"...", "created":"...", "note":"...", "operations":[...] }`
- When construction loaded: note appears as movable text overlay near preview card, small `×` to dismiss

**localStorage for user constructions:**
User-saved constructions are also stored in localStorage automatically on save — JSON log + compressed PNG thumbnail. The picker checks localStorage first, then shows built-ins. Download remains available as explicit backup. This is correct from constructions-redesign.md.

---

### 3. Dwell Time Tracking

The session data hooks (Note-Demo-Testing-Mar8.md) need to be extended for playback navigation.

Per-demo, track:
- Which construction was watched
- Whether the child navigated forward-only or used back
- Which step(s) she returned to and how many times
- Time spent at each pause step before tapping forward

This is richer behavioral data than "demo watched: true." Add it to the session object.

---

### 4. Cursor During Playback — DESIGN PENDING

**Do not implement cursor behavior yet.**

The cursor vocabulary is being developed by the Layout Manager based on Note-CursorVocabulary-Mar8.md. The Coder receives a finished spec before implementing. This is a visual design problem before it is an implementation problem.

What to build now: the cursor state *hooks* — places in the playback code where cursor state would be set. Leave them as comments or no-ops:
```javascript
// CURSOR: set state 'tap' here
// CURSOR: set state 'drag-initiated' here
// CURSOR: set state 'rest' here
```
When the Layout Manager delivers the spec, these hooks are where the implementation goes.

**One exception — touch magnifier (implement now):**
On touch interfaces, the user's finger obscures the point she is trying to tap. Implement a magnifier with crosshairs that appears offset above and slightly left of the touch point when the finger is near a snappable point.
- Offset: above and slightly left of actual touch position (conventional for right-handed users)
- Magnification: 2–3× (adjust visually)
- Crosshairs inside the magnifier show exactly where snap will land
- Appears only near snappable points, not on every touch
- The snap detection system already knows when precision is relevant — use that as the trigger
- This is both a usability fix (fat finger problem) and part of the cursor vocabulary

---

### 5. How-To Note

A collapsible panel open on launch, closes after first canvas action, reopenable from Tools.

Content:
- Tap twice to draw a line
- Drag to draw a circle
- Intersections appear on their own
- Tap a segment to select it; close a shape to fill it
- Double-tap a line or circle to make it a guide
- Tap empty space to undo; double-tap empty space to start over

At bottom in copper: "watch it build ▸" — opens Constructions panel

The wording above is functional. A final voice pass for the child audience is a future task.

---

## Design Decisions That Are Settled

These were debated and resolved. Do not reopen them during implementation.

**Playback is child-controlled, not automatic.** Timed auto-playback was designed first and rejected. The child navigates.

**"Show me" leads to "try it."** They are a sequence, not parallel options.

**Ghost overlay has no sliders.** Fixed opacity, fixed size. The precision mismatch between SVG overlay and geometry engine means tracing was never going to work. The ghost is a destination, not a tracing surface.

**Cursor design waits for Layout Manager.** One exception: touch magnifier, which is a usability requirement.

**Pause points are curatorial, not algorithmic.** Eileen decides where constructions breathe. The system respects `pause: true` flags in the log.

---

## File and Path Notes

| Asset | Path |
|-------|------|
| Active file | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Palettes JSON | `/Users/michaelchabin/CuriousWoods/cw-deploys/art/palettes.json` |
| Art images | `/Users/michaelchabin/CuriousWoods/cw-deploys/art/` |
| Model SVGs | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/` |
| Model logs | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/logs/` |
| Model previews | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/previews/` |
| Vault | `/Users/michaelchabin/CuriousWoods/CuriousWoods/` |

**Always use `filesystem:` MCP tools for all file writes — never bash_tool.**
bash_tool writes to a Linux container Michael cannot see. This will waste significant time.

**File naming discipline:**
- `geometry-v1.html` is the only working file
- Snapshots before major changes: `geometry-v1-YYYYMMDD.html`
- Do not create new HTML files without PM instruction

---

## What This Handoff Does Not Cover

These are designed but not yet ready for implementation:

- **Exit survey and full session data hooks** — see Note-Demo-Testing-Mar8.md
- **Cursor vocabulary** — see Note-CursorVocabulary-Mar8.md; waiting for Layout Manager spec
- **Models JSON** (context-sensitive construction library) — Priority 3 after demo
- **Object-oriented refactor** — the cursor, palette, and operation log are natural candidates for proper objects/modules. Direction to build toward, not an immediate task. Coder is likely already aware of this.

---

## Broader Context Notes (for orientation)

**Numbers feature:** Integer labels on axis points are complete as of March 16. The pedagogical intent is documented in Handoff-Mar16-Numbers.md — worth reading. It shapes how constructions involving the coordinate system should be designed.

**Eileen's role:** She will record the curated construction logs once Save as Construction is confirmed working and stable. Do not ask her to record until the format is confirmed final. Her recordings become the canonical starter library.

**Maya:** Not yet integrated. The cursor vocabulary and playback system we are building now will become Maya's gesture vocabulary. Design with that in mind — nothing should require human curation to be legible to an eventual AI driver.

**The demo:** The goal of this work is a demo ready for external testers within days. See Road-to-Demo-Mar8.md for the dependency map. The critical path runs through Save as Construction → Eileen records → Show me is testable with real content.
