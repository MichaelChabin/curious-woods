# Scale Beam Tool — Design Spec
*Status: Concept prototype complete. Ready for visual design pass.*
*Created: 2026-03-18 — Story Developer / PM chat*

---

## What it is

A horizontally draggable "infinite beam" that places temperatures (or dates, or any scalar value) in spatial relation to each other. The child drags the beam left and right to explore a scale. The item nearest the center of the screen highlights. Zoom controls let the child change how much of the scale fits on screen.

The core insight: **dragging to find where sand fits relative to gold teaches scale in a way a static number line never can.** Discovery through motion.

---

## Interaction model

- A long horizontal beam extends off-canvas in both directions
- Items hang from the beam on thin wires, like tags or pendants
- A fixed vertical marker sits at the screen center (a soft line, not intrusive)
- **Drag left/right** to move the beam; the center marker stays put
- The item closest to center highlights (wire turns teal, tile brightens)
- The highlighted item's name and temperature appear at the top
- **Zoom in/out** changes the degrees-per-screenwidth (e.g. 200°C → 5000°C per screen)
- No snap-to — the scale is continuous, not a series of stops

Zoom steps (current prototype): 50 / 100 / 200 / 500 / 1000 / 2000 / 5000 / 10000 °C per screen

---

## Content layers

Items on the beam come from three sources, visually distinguishable:

| Layer | Description | Visual treatment |
|---|---|---|
| **Base** | Universal anchors — absolute zero, boiling water, sun's surface | Always present, neutral style |
| **Personal** | Items the child has encountered in previous CW stories | Subtle marker (dot, border accent) indicating "you've been here" |
| **Story** | Items specific to the current story (e.g. glass melting for the Stained Glass arc) | Foregrounded, possibly introduced by Maya |

This layering means the beam accumulates meaning across the platform. A child who has done the Stained Glass story and later visits a Metalworking story will recognize gold and copper as familiar.

---

## Temperature dataset (stained glass story range)

| Item | Temp (°C) | Notes |
|---|---|---|
| Absolute zero | −273 | Base layer |
| Water freezes | 0 | Base layer |
| Candle wax melts | ~58 | Story layer |
| Water boils | 100 | Base layer |
| Lead melts | 327 | Story layer (early metalworking) |
| Aluminum melts | 660 | Story layer |
| Silver melts | 962 | Story layer |
| Gold melts | 1064 | Story layer |
| Copper melts | 1085 | Story layer |
| Glass melts (soda-lime) | ~1180 | **Story layer — key moment** |
| Sand melts (pure silica) | 1710 | **Story layer — key moment** |
| Sun's surface | ~5500 | Base layer |
| Sun's core | ~15,000,000 | Base layer (extreme zoom) |

---

## Tile design (needs Designer pass)

Each item hangs from the beam as a small tile, approximately 72×72px. Current prototype uses placeholder emoji. Needs:

- Simple flat illustration in CW vector style, consistent with the geometry tool's visual language
- Two-line label below the image (wraps if needed)
- Temperature in °C below the label, smaller weight
- **Active state:** teal border + teal wire, brightened background (currently `#E1F5EE` light / `#085041` dark)
- **Personal layer state:** TBD — suggestion: small filled dot on the wire, or a subtle ring around the tile
- **Story layer state:** TBD — suggestion: slightly warmer tile background, or a thin colored border matching the story's palette

The wire connecting tile to beam:
- Thin (1px), same color as beam at rest
- Teal at 1.5px when active
- Could animate gently (slight sway?) — low priority

---

## Zone bands (not yet implemented)

The beam could be divided into temperature zones with subtle background color shifts and quiet labels:

| Zone | Range | Suggested color |
|---|---|---|
| Everyday | −50 to 200°C | Ambient, no tint |
| Metalworking | 200 to 1200°C | Warm amber tint |
| Geology / Glass | 1200 to 3000°C | Deep amber / coral |
| Stellar | 3000°C+ | Red / fading to dark |

Zone color bleeds into the beam itself (the bar changes color as you drag into a hotter region). A quiet zone label fades in as you enter a new band.

---

## Beam visual design

Current prototype: flat gray rectangle, 10px tall, full canvas width.

Possible upgrades:
- Slight texture or material feel (brushed metal? wooden rule?)
- Temperature-responsive color — beam shifts from cool blue at left to deep red at right
- Tick marks at round intervals (currently 100° or 1000° depending on zoom)
- Tick labels above the beam in a small, muted font

---

## Zoom control

Current: simple − / + buttons, bottom right, with a label showing current degrees-per-screen.

Possible upgrade: a small dedicated "zoom strip" showing the current window as a highlighted region within the full range — a minimap. This would help children understand that they are looking at a portion of something much larger.

---

## Responsive / entry state

On first load (or story entry), the beam centers on the **story's key temperature** — e.g. 1710°C for the sand/glass moment. The child sees sand melting highlighted immediately, then drags to find context.

This is the pedagogical entry point: *"Sand melts at 1710°C — is that hotter or cooler than gold?"* The beam answers through motion.

---

## Extension to other scales

The beam mechanism is **scale-agnostic**. Confirmed future uses:

- **Timelines** (e.g. train history — already prototyped in an earlier session)
- **Stellar temperature scale** (with familiar anchors anchored far to the left)
- **Size scales** (atom → cell → human → planet → star → galaxy)
- **Sound / frequency scales**

This should become a **reusable CW engine component**, not a one-off. The data layer (items array with value + label + layer tag + illustration reference) should be separable from the rendering engine.

---

## Working prototype

A functional canvas-based prototype exists (built 2026-03-18 in the Story Developer chat). It demonstrates:
- Mouse and touch drag
- Center-highlight with name readout
- 8-step zoom (50°C to 10,000°C per screen)
- Tile rendering with placeholder emoji

Code available on request from that chat session. Ready to hand to Coder once design pass is complete.

---

## Open questions for Designer

1. What does a tile look like? Flat illustration style, icon style, or photographic?
2. How do we visually distinguish base / personal / story layers on the beam?
3. Does the beam itself change color with temperature, or stay neutral?
4. Zone bands — how subtle? Color wash, or a labeled region marker above the beam?
5. Active state animation — should the highlighted wire/tile have any motion, or stay static?
6. Does Maya have a presence in this tool? If so, where and in what form?

---

*Next step: Designer chat reviews this spec and produces tile illustrations + beam visual language.*
*Then: Coder chat integrates into CW architecture as a reusable component.*
