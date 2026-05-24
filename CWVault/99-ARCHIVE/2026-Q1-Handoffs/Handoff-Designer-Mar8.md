# Designer Handoff — March 8, 2026
**From:** Coder Chat (Sonnet 4.6)
**To:** Designer Chat
**Supersedes:** Handoff-Designer-Mar5.md
**Purpose:** Catch the Designer up on what has been built, what design decisions were made during coding, and what open questions need design attention.

---

## What Has Been Built

The working prototype is a single file:
`/Users/michaelchabin/CuriousWoods/prototypes/geometry-v1.html`

It is substantially complete as a construction and coloring tool. The following are all working and tested:

### Construction Engine
- Two seed points, tap-tap to draw infinite lines, drag from a point to draw circles
- Intersection detection: line-line, line-circle, circle-circle — all automatic
- Logical segments and arcs between intersection points
- Tap a segment or arc to emphasize it (bold); emphasized edges that form a closed region auto-fill
- Double-tap a segment to toggle it to scaffold opacity (construction hint, visually recessive)
- Undo by tapping empty canvas; double-tap empty canvas confirms new construction

### Fill System
- Fills are bounded by straight segments and/or circle arcs
- Filled regions can be repainted by selecting a color and tapping the fill
- Fills can be dissolved (removed) using the Empty craft swatch
- All actions logged as JSON — save/load/undo all derive from log replay

### Color / Palette Tool
- Opens from Tools → Color
- Shows named palette (currently Chartres or Gaudi) as color swatches, 3 wide
- Three craft swatches below a hairline rule: Empty · Clear · Lead
- Lead toggles a lead-border effect on all fills (inset shadow + border on filled regions)
- Hovering a swatch shows its historical recipe in small italic text below the palette
- Palette name at top is clickable: shows a short switcher list + "Choose..." which opens a full picker
- Picker window: floating, draggable, shows SVG thumbnails of available models or painting thumbnails for palettes

### Drawing Guide (Model) Tool
- Opens from Tools → Drawing Guide
- Loads an SVG overlay on a separate layer above the canvas
- Currently five models: Nested Squares, Nested Triangles, Hexagon+Triangle, Pentagon+Pentagram, Golden Rectangle
- Sliders: scale (5–150, default 25) and opacity (5–100, default 35)
- The guide image is draggable on the canvas
- Model name is clickable: opens the picker to change models

### Tools Menu
- Hover "Tools" to reveal; collapses after 1200ms of no hover
- Menu items stagger in with deliberate pacing (cubic-bezier ease, 40ms between items)
- Active items: Save (as construction JSON / as image PNG), Load, New, Labels (stub), Lines toggle, Color, Drawing Guide, Glass (stub), Share (stub)

### Visual Design Implemented
- Canvas background: parchment `#f4f1e8`
- All interactive text: Payne's gray `#546A80`, Georgia serif
- Left panel: transparent membrane `rgba(210,200,180,0.18)`, 0.5px border `#c8b89a`
- Emphasized segments/arcs: drawn with a **glow effect** — soft halo pass (`shadowBlur`, Payne's gray, low opacity) followed by a crisp line on top. This was tried in the last session and landed well.
- Points: 1.5px, warm copper `#BE622F`, with birth animation (scale from 2× over 400ms, cubic ease-out)
- "I want to Remember this" inscription: permanent, draggable, Georgia, copper accent on "Remember"

---

## Design Decisions Made During Coding (Designer Should Know)

These were resolved pragmatically during implementation. They may be worth revisiting.

**Palette switching via the palette name as selector.** Clicking the palette name at the top of the panel reveals an inline switcher (not a dropdown, not a button). This felt consistent with "words not buttons." Seems right but hasn't had a design review.

**Floating picker window.** A shared picker window (parchment background, 200ms fade, draggable) serves both palette selection and model selection. The same component, two modes. This was an efficiency decision — one picker rather than two. Worth checking that this feels unified.

**Lead as a toggle that applies to all fills, not a per-fill property.** Lead is either on or off globally. When Lead is active, all filled regions render with a border. This was simpler to implement, but a child might want lead on some regions and not others. Deferred; the current behavior is a placeholder.

**Model initial scale at 25% (SVG is 800×800 viewBox).** At 100% the guide fills the entire canvas. At 25% it appears at a reasonable starting size relative to the seed point spacing. This is a guess — no design rationale, just a default that seemed workable.

---

## Open Design Question — Drawing Guide Click-Through

**This is the most important open question for a design session.**

The Drawing Guide overlay (`z-index: 590`, `pointer-events: all`) intercepts all mouse events because it is draggable. This means: when the guide is positioned over the canvas, the child cannot construct through it. She can't draw lines or circles in the region the guide occupies.

This defeats the purpose of a guide — you want to construct *using* it as a reference, not around it.

Several options have been discussed:

1. **Lock/unlock toggle on the guide itself** — a tiny "fix" / "free" label in the corner of the model image (or a small padlock icon). When locked, `pointer-events: none` on the image; the guide becomes pure glass and all clicks pass through to the canvas. Click the label/icon to unlock and reposition. This was Michael's preferred framing going into the break.

2. **x/y position sliders in the panel** — position the guide entirely through the panel sliders, never through dragging on the canvas. The canvas would then never need to intercept the guide's events. More deliberate placement; less spatial.

3. **Edge-only drag handle** — only the edge or a small corner region of the model image is draggable; the interior passes clicks through.

4. **Modifier key** — hold Option to construct, otherwise the guide is draggable.

The "fix / free" label (option 1) was described as fitting CW's "words not buttons" philosophy. The word should be tiny, italic, Georgia, Payne's gray — same register as the recipe text and the "close" links. Position: probably top-left corner of the guide image, floating above it as an overlay element.

**What the Designer should resolve:** Which approach, and if option 1, the exact visual treatment of the lock control.

---

## Visual Polish Items — Not Yet Addressed

- **Glow color** is currently Payne's gray at 18% opacity. Could be warmer (toward copper) or cooler. Worth a design opinion.
- **Glow parameters** (`GLOW.blur = 9`, `GLOW.width = 10`) set by feel. Adjustable constants.
- **Picker thumbnail size** for paintings is unresolved — currently 200×200px in a 3-column grid, same as model thumbnails. Paintings are rectangular; this may need a different layout.
- **Lead border appearance** — currently a 2px inset shadow `#777777`. Whether this reads as actual lead (versus just a border) hasn't been evaluated visually with real palette colors.
- **Backlighting / transmitted light** — simulating glass lit from behind. Mentioned as a future enhancement; not started.

---

## File Locations

| Item | Path |
|------|------|
| Main prototype | `/Users/michaelchabin/CuriousWoods/prototypes/geometry-v1.html` |
| Model SVGs | `/Users/michaelchabin/CuriousWoods/prototypes/models/` |
| Palette data | `/Users/michaelchabin/CuriousWoods/prototypes/art/palettes.json` |
| Dev tools | `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js` |
| Vault root | `/Users/michaelchabin/CuriousWoods/CuriousWoods/` |

---

## How to Start a Designer Session

1. Read this document
2. Open the prototype in Safari: `/Users/michaelchabin/CuriousWoods/prototypes/geometry-v1.html`
3. Try: hover Tools → Color → select a color → draw a construction → close a region (fill appears with glow) → tap the fill with a color selected
4. Try: hover Tools → Drawing Guide → drag the guide → try to construct through it (this is the problem)
5. The key question for the session is the Drawing Guide click-through solution

Previous Designer handoff for additional context on palette design decisions: `01-ACTIVE/Handoff-Designer-Mar5.md`
