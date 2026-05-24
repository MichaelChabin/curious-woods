# Constructions Panel — Redesign Spec
*Captured: 2026-03-13. Coder session context: geometry-v1.html*

---

## What we're replacing

The current Constructions panel has three cards (Equilateral Triangle, Hexagon, Nested Squares), each with "try it" (ghost SVG overlay) and "show me" (log replay at fixed 720ms/op). This is being replaced entirely.

---

## New Panel Layout

When `#tool-constructions` opens in the left panel, it shows:

```
Constructions          [close]

  How this works
  Examples
```

Both are clickable text lines (same Georgia style as the Tools menu L2 labels).

### "How this works" — expands inline

A collapsible list of basic commands, indented below the line:

```
  Tap two points → line
  Tap a point and drag → circle
  Tap a segment to select it
  Connected segments fill with glass
  Tap empty → undo
  Tap twice → start over
```

Clicking "How this works" again collapses it (toggle). Same reveal/collapse animation as L3 menu items.

### "Examples" — expands inline

Shows two default thumbnails side by side (small, ~80×80 SVG icons from SVG_CACHE), then the word "Choose…" below them:

```
  [△ triangle] [⬡ hexagon]
  Choose…
```

Default pair: Equilateral Triangle + Hexagon.

Clicking a thumbnail → loads that construction's PNG preview onto the canvas (see Preview behavior below).

Clicking "Choose…" → opens the picker window (see Picker Window below).

---

## Picker Window

Same infrastructure as the palette picker (`#picker-window`, same grid, same drag handle, same close button).

Populated with PNG thumbnails of all available constructions — both:
- **Built-in defaults** (Triangle, Hexagon, Nested Squares — PNGs generated and stored in `models/previews/`)
- **User-saved constructions** (PNGs saved alongside their JSON logs)

Thumbnail size: same as palette picker art (200×200px cells).
Below each thumbnail: construction name.

Clicking a thumbnail:
1. Closes the picker
2. Loads the PNG preview onto the canvas (see below)

---

## PNG Preview on Canvas

When a construction is selected (from thumbnails or picker), a preview card appears on the canvas. It is **not** the ghost/overlay system — it is a self-contained floating element.

### Structure

```
┌─────────────────────────┐
│ close                   │
│                         │
│   [PNG image]           │
│                         │
│  Show me how this       │
│  was done               │
└─────────────────────────┘
```

- Movable by dragging the image area
- `close` at top left: removes preview from screen entirely
- `Show me how this was done` at bottom: launches construction replay

### On "Show me how this was done"

1. PNG preview **disappears immediately** (clean cut, no fade)
2. Canvas resets to init (two seed points)
3. Replay begins (see Playback section below)
4. On completion: `close · repeat` appears at top-left of canvas

### Post-Replay Controls

`close · repeat` at top-left of canvas (copper color, Georgia, same register as Remember inscription):

- **close** — clears the replayed construction, returns to user's previous work
- **repeat** — restarts the replay from init

The completed construction **stays on screen** after replay — child can look at it, tap segments, color it. `close` is the explicit exit.

---

## Save As Construction — Changes

### PNG thumbnail capture

When user selects "Save As Construction":
1. Capture bounding-box PNG of current canvas (same logic as `exportImage()` but saved to a Blob, not downloaded)
2. Show the note UI (see below)
3. On confirm: download both the `.json` log and the `.png` thumbnail as a pair

File naming: `[construction-name].json` + `[construction-name].png`

### Note text box

After "Save As Construction" is selected, a movable text box appears on canvas:

- Font: Georgia, same size as Tools menu L2 (14px), color: darkest color in current palette, or Payne's gray (`#536878`) if darkest palette color isn't legible
- Placeholder text: *"add a note…"* (italic, muted)
- Editable textarea, transparent background, border: 0.5px parchment
- Movable by dragging a small handle at top
- Two buttons below: **save** · **skip**
  - `save` → includes note text in the JSON and proceeds to download
  - `skip` → proceeds without a note

### Note stored in JSON

```json
{
  "version": 1,
  "name": "my construction",
  "created": "...",
  "note": "This is how you make a hexagon from two circles.",
  "operations": [...]
}
```

### Note displayed when construction is loaded

When a construction with a note is shown in the preview card, the note appears as a small text overlay — positioned above and left of the PNG image, same movable-text-box style. Has a small `×` to close/hide it independently of the preview card.

---

## Playback — Rhythm & Feel

**Core principle:** replay should feel like a friend drawing, not a machine executing.

### Op timing tiers

| Op type | Delay before | Notes |
|---|---|---|
| `init` | 0 | Seeds appear immediately |
| `line` | 800ms | Human gesture — deliberate |
| `circle` | 900ms | Slightly slower, drag gesture |
| `emphasize` | 500ms | Consequential, not a gesture |
| `fill` | 600ms | Revelation — deserves a breath |
| `scaffold` | 400ms | Supporting detail |
| `deemphasize` | 300ms | Quick cleanup |
| `repaint_fill` | 500ms | Color choice |

Intersection points emerge automatically from `replayLog()` — no separate delay needed.

### View during replay

`fitViewToConstruction()` is called once at init, then left alone. The child watches the construction grow into the space — not re-centering on every op.

### Open question (deferred)
Should replay use a *canonical* view (seeds always at a fixed comfortable size) rather than inheriting whatever zoom/pan the child was at? Leaning toward canonical for demos — needs Michael's call.

---

## Cursor During Replay

**Core principle:** when replay (or eventually Maya) is in control, the cursor signals that clearly. The child should feel: *something else is drawing this.*

### Cursor vocabulary

| Moment | Shape | Signal |
|---|---|---|
| Replay moving between points | Small soft circle, YInMn blue (#546A80) | "I'm here, thinking" |
| Hovering near a point | Circle gains inner dot | "I see this point" |
| Tap / point placed | Brief flash to small square → returns to circle | "I just did something" |
| Drag start (circle begins) | Elongates to small oval | "I'm pulling" |
| Mid-drag | Oval slightly larger | "Still pulling" |
| Release | Back to circle | "Done" |
| Replay complete | Cursor fades / disappears | "It's yours now" |

### Implementation notes

- CSS custom cursors via `canvas.style.cursor = 'url(data:...) Nx Ny, auto'`
- SVG data URIs inline — no separate files, crisp at any DPI
- Cursor hotspot declared per shape
- Cursor state managed inside `startPlayback()` / per-op callback
- On `stopPlayback()`: restore `canvas.style.cursor = ''`
- Max cursor image size: 128×128px (browser limit)

### Maya connection

This cursor vocabulary becomes Maya's gesture vocabulary. The circle that breathes, pauses at points, elongates when dragging — that *is* Maya moving. The cursor is her only physical representation. Design it like a character, not a pointer.

---

## Open Questions (not yet decided)

1. **Canonical vs. inherited view during replay** — fixed seed scale or whatever the child is at?
2. **Note box color logic** — "darkest palette color or Payne's gray" needs a legibility threshold defined (luminance < 0.3?)
3. **User-saved PNGs storage** — DECIDED. Use `localStorage` as primary persistence. On save, store the JSON log + a compressed PNG thumbnail in localStorage automatically — no downloads required for the picker to work. The picker checks localStorage first, then shows built-in defaults. Constructions persist as long as the browser cache isn't cleared — acceptable for demo and early rollout. Download remains available as explicit export/backup. Server-side storage is the natural next step for a full rollout (each child has a persistent library), but out of scope for now.
4. **Replay cursor** — design the actual SVG shapes before implementing. Should be a separate design session.
5. **"How this works" commands** — final wording pass needed. Current draft is functional, not yet the right voice for a child.

---

## Files that will change

- `cw-deploys/geometry-v1.html` — CONSTRUCTIONS PANEL section, SAVE AS CONSTRUCTION, new CSS
- `cw-deploys/models/previews/` — new directory for built-in construction PNGs (to be generated)
- `cw-deploys/models/logs/` — already exists, synthetic logs live here

---

## Implementation order (when ready)

1. Save-as-Construction PNG capture + note UI
2. New panel layout (How this works / Examples)  
3. PNG preview card on canvas (movable, close, Show me)
4. Picker window populated with constructions
5. Playback rhythm (tiered delays)
6. Post-replay close · repeat controls
7. Replay cursor (separate design session first)
