# CW Default Page Lab — Handoff
*Written at end of Developer Toolkit session — March 1, 2026*
*For the next chat continuing this work*

---

## What this is

A design laboratory for the Curious Woods default page layout, and a developer
toolkit for specifying visual design precisely. Both are working and on disk.
Michael is designing both the story/interactive pages and the developer tool
simultaneously — that's intentional, not confusion.

---

## Files on disk

```
/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js
/Users/michaelchabin/CuriousWoods/prototypes/cw-default-page-lab.html
```

Open the HTML file via local server (Safari has file:// restrictions):
```
cd /Users/michaelchabin/CuriousWoods
python3 -m http.server 8080
```
Then open: http://localhost:8080/prototypes/cw-default-page-lab.html

Michael is on a Mac using Safari. The EyeDropper API in cw-dev-tools.js
is Chrome-only and needs to be replaced with a native color input for Safari.

---

## The toolkit (cw-dev-tools.js)

Single injectable JS file. One script tag activates it, removing it leaves
no trace. Toolbar appears bottom-center.

**Tools:**
- ⊹ Layout — drag resizable named rectangles, export coordinates
- ⬜ Component — build buttons/text boxes visually, place on page
- — Lines — draw test strokes at any width/opacity/style
- ◉ Color — eyedropper (Chrome only, needs Safari fix) + 12-swatch palette
  with CW defaults pre-loaded, persists in localStorage
- 🖼 Underlay — load image, opacity slider (the full underlay with scale/drag
  is in the page itself, not the toolkit — see below)
- ⬇ Export — outputs cwDesignSpec JS object, copy or download

Keyboard: backtick toggles toolbar, 1–5 activate tools, Cmd+E exports.

---

## The design lab page (cw-default-page-lab.html)

### Layout
Two panels filling the viewport. Left ~220px, right takes remainder.
Both on parchment background #f4f1e8.

### Left panel
Transparent warm tint: rgba(210, 200, 180, 0.18). Not a container —
pure atmosphere. pointer-events: none so geometry/content passes through.
0.5px separator line at right edge: #c8b89a. This is the "context membrane."

### Right panel
Chartres story in Georgia 20px, #2a2620, line-height 1.4, max-width 700px
centered. Show/hide story button in control strip fades it with 400ms transition.

### Tools anchor (top-left of left panel region)
Word "Tools" in #546A80, Georgia 14px. On hover after 150ms delay, "Save"
and "Share" slide down and fade in (300ms ease-out). On mouse-out, collapse
200ms ease-in. These are not buttons — just words.

### Remember inscription
"I want to" / "Remember" / "this" — 16px plain / 19px copper #b87333 / 16px plain.
Fixed position, vertically centered in left panel region by default.
Draggable during design (grab cursor). Has transition: top 400ms ease-in-out
so it can animate downward to accommodate panel content and return to center.
Never disappears, never animates in the finished product. The child's icon
of agency.

Planned behavior (not yet built): when content occupies the left panel,
the inscription moves down to stay below it with breathing room.
When content leaves, it returns to vertical center.

### Underlay (in the page, not the toolkit)
Load image via "Load underlay…" button. Control panel appears with:
- Scale slider (0.1–4×)
- Opacity slider (0.05–1)
- Offset X / Offset Y sliders
- Hide/Show toggle
- Reset Position button
Drag image directly to reposition. Scroll on image to scale.
Control panel is draggable by its header.

**Next step for underlay:** Replace sliders with direct manipulation —
drag to reposition, corner handles to resize. Aspect ratio locked.
Two modes to consider: designer mode (free resize?) vs child mode (locked).
Spec not finalized.

### Control strip (bottom-right, fixed)
- Hide story / Show story
- Show palette / Hide palette
- Load underlay…

### Pre-drawn separator comparison lines
On load, three vertical lines are drawn on the toolkit canvas in the right
panel area: 0.5px, 1px, 1.5px, all in #c8b89a, labeled. For evaluating
separator weight. These are seeded into CWDevTools.state.lines for export.

### Show palette
Expands left panel from 220px to 320px (400ms ease-in-out). Palette swatches
fade in with 100ms delay after panel settles. This is a demo of the panel
expansion behavior — real palette logic comes later.

---

## Design principles established

**The left panel is a context membrane.** Tools appear there when contextually
relevant and fade when they aren't. Not a sidebar, not a toolbar. When a tool
is in the panel, the system is managing it. When a tool is dragged out onto
the canvas, the user has committed to keeping it visible — it stays regardless
of context. Tools in the panel are suggestions; tools on the canvas are choices.

**Layering model:**
- World layer — geometry, story, content. Lives behind the panel tint.
- Panel atmosphere — transparent tint + separator. pointer-events: none.
  Geometry extends freely behind it.
- Tools layer — text boxes, inscription, palette, anything interactive.
  z-index 100. Floats above the panel.
- Toolkit layer — dev tools canvas and overlays. z-index 9996–10000.

**Things in front of the panel are tools you can use.
Things behind it are the world.**

---

## What is in the queue (not yet built)

### 1. Tools as a proper menu system
Michael has a spec for this from a separate designer chat. Key ideas:
- "Tools" becomes a navigation word, not just a hover reveal
- Clicking a tool name (Underlay, Palette, etc.) opens that tool in the
  left panel, replacing whatever was there
- Other tool names collapse back into "Tools"
- The Underlay tool and Palette tool should live inside the left panel
  the same way — expanding the panel, fading in — not as floating dark panels
- Tools dragged out of the panel onto the canvas persist, pinned, regardless
  of context. Appearance of pinned tools TBD.
- GET THE SPEC from Michael before building this.

### 2. Palette redesign
Current palette (demo only) uses 4-wide grid. New spec:
- Small, comfortable color chips
- 3 wide by default
- 4 wide only if more than 12 colors
- Palette name at top left — this IS the palette selection mechanism
  (clicking the name switches palettes)
- Opacity slider at bottom, constrained
- Fits comfortably in the left panel at rest width
- Appears contextually: in geometry workspace, when a closed region
  is highlighted. Palette is context-sensitive, not always visible.

### 3. Underlay tool in left panel
Currently: floating dark panel (not consistent with design language).
Should be: lives in left panel like palette, same visual treatment.
Controls TBD — waiting on direct manipulation (drag + corner handles)
decision and designer spec.

### 4. Left panel expansion responding to content
Panel should expand to accommodate content placed into it — not triggered
by a button, but by content arriving. When content leaves, panel contracts.
Remember inscription yields downward when content is present, returns to
center when it departs. Transition: 400ms ease-in-out throughout.

### 5. Corner handles for underlay
Replace sliders with direct manipulation. Aspect ratio locked for children.
Designer mode may have more freedom — not decided.

### 6. Safari eyedropper fix
EyeDropper API is Chrome-only. Replace with native color input in
cw-dev-tools.js for Safari compatibility.

### 7. Slider visual style (from Michael's notes)
Slider buttons: 15px tall, 10px wide, Payne's gray at 100% opacity.
Slider track: 3px thick line, same color as 1.5px separator comparison line.
Track does not animate. This applies to all sliders in the left panel tools.

---

## CW palette (pre-loaded in toolkit)

```javascript
parchment:  '#f4f1e8'
paynesGray: '#546A80'
darkGray:   '#3D3D3A'
darkBrown:  '#2a2620'
blue:       '#2c5aa0'
copper:     '#BE622F'
teal:       '#4AABAA'
```

Left panel tint for reference: rgba(210, 200, 180, 0.18)
Separator: #c8b89a
Copper (Remember word): #b87333

---

## Animation timing (established)

- Tools hover delay: 150ms
- Tools expansion: 300ms ease-out
- Tools collapse: 200ms ease-in
- Panel width change: 400ms ease-in-out
- Content fade-in: 100ms delay after panel settles, then 200ms ease-in
- Remember inscription movement: 400ms ease-in-out
- Story show/hide: 400ms ease-in-out
- Remember inscription: NO animation ever (position can change, presence never)

---

## How to start the next session

1. Read this file
2. Read cw-dev-tools.js to understand the toolkit structure
3. Read cw-default-page-lab.html to understand current page state
4. Ask Michael for the Tools menu spec from the designer chat
5. Confirm which queue item to tackle first

The work is real, the files are on disk, the design is coherent.
Pick up where this left off.
