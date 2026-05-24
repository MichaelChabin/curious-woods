# Prototyper Session Handoff — March 16, 2026 (Session 2)

**From:** Prototyper Chat (this session)
**Continues:** Handoff-Prototyper-Mar16.md

---

## What We Built This Session

### Cursor Vocabulary Prototype
**File:** `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-mar16.html`
**Server:** `cd /Users/michaelchabin/CuriousWoods && python3 -m http.server 8000`
**URL:** `http://localhost:8000/prototypes/proto-cursor-mar16.html`

A fully interactive canvas prototype demonstrating the cursor vocabulary for
the geometry tool. Five construction points on parchment background with lines.
Native cursor hidden; custom cursor takes over completely.

---

## Current Cursor Design (as built)

### Form
- **Crosshair inscribed in a circle**
- Circle: 9px radius, 0.75px stroke
- Crosshairs: 0.6px stroke, 2px gap at center (so the copper point shows through)
- White halo behind both circle and crosshairs for legibility against any background

### Color behavior
- **Circle:** always `#1a2830` (near-black) — no variation
- **Crosshairs at rest:** `#8a9aaa` (light blue-gray)
- **Crosshairs on approach:** smoothly darken toward `#1a2830` as cursor enters snap zone
- **Crosshairs at snap:** full `#1a2830`
- **Consequence imminent (hold F):** copper `#BE622F` with slow breathing pulse

### Tap (click on point)
- Small dark ring (6px outer, 3px inner) appears instantly at the point
- Fades out over 300ms
- No transition in — instantaneous appearance

### Drag (from point)
- Same small ring grows to full size (9px/4px) over first 30px of travel
- Stretches in direction of travel (max 1.6× elongation)
- Crosshairs hidden during drag
- On release: crosshair snaps back **instantly** (no transition)

### Erase gesture (drag from empty canvas)
- Cursor becomes a small rounded rectangle in Payne's gray
- Rotates to be **perpendicular** to direction of travel (broad side leading)
- Lines/arcs brushed over fade to 12% opacity immediately
- Hit detection uses segment-to-segment distance (reliable)
- Fresh erase gesture clears previous fades (for prototype simplicity)
- R key resets all points and fades

### Points (prototype)
- 2px radius copper `#BE622F` — matched to geometry-v1 `PARAMS.pointSize`
- White halo (1.5px) for legibility
- No size change on approach (kept clean)

---

## Interaction Map (what triggers what)

| Gesture | Starts from | Cursor form | Notes |
|---------|-------------|-------------|-------|
| Hover | anywhere | crosshair+circle | darkens on approach |
| Click | point | small ring → fade | tap |
| Drag | point | ring grows + stretches | circle gesture |
| Release drag | — | snap back to crosshair | instantaneous |
| Drag | empty canvas | eraser rectangle | fade gesture |
| Hold F | — | copper pulse | consequence imminent |
| R | — | reset | prototype only |

---

## Design Decisions Made This Session

**Cursor is always Payne's gray** — the original brief proposed copper for
create acts, but we found a single-color cursor is cleaner. The circle being
consistently dark provides legibility without color-coding. May revisit.

**Circle always dark, crosshairs darken on approach** — this creates a
two-layer signal: the circle is always present and readable; the crosshairs
become more prominent as you approach something actionable. Feels right.

**Snap = instantaneous** — both the tap ring appearance and the post-drag
return to crosshair are instantaneous. Transitions felt wrong for a precision
tool. Fades are reserved for the tap ring itself (which is purely informational).

**Eraser is a new gesture not in the original brief** — drag from empty canvas
fades lines as the eraser passes through them. Important for dense constructions
where double-tapping individual segments is impractical. The eraser rectangle
rotates perpendicular to travel direction (broad side leading, like a real eraser).
Undo (tap on empty canvas in geometry tool) reverses fades. The brush gesture
should batch all fades in one gesture as a single undo entry (note for Coder).

---

## What Still Needs Design Work

From the original cursor vocabulary brief, these states are prototyped but
may need further refinement:
- **Consequence imminent** — copper pulse works but hasn't been evaluated
  carefully against real intersection detection
- **Line/segment hover** — no cursor behavior defined yet for hovering over
  a line (not a point). The brief doesn't address this. Probably Payne's gray
  (modify color) but needs a design decision.
- **Demo playback cursor** — the brief emphasizes cursor during demonstration.
  The prototype shows the vocabulary in isolation; needs to be evaluated in
  motion against actual playback sequences.

---

## Next Steps

1. **Write cursor spec** — turn prototype into a document the Coder can
   implement. Exact px values, timings, color hex codes, transition behavior.
   All values are in `CURSOR` constants in the prototype file.

2. **Touch magnifier prototype** — still urgent per the handoff. The magnifier
   crosshair should use the same cursor vocabulary (copper crosshair, same gap).

3. **Sound workbench** — confirmed as Prototyper responsibility. Standalone HTML
   tool producing JSON. Design session needed before build session.

4. **Line/segment hover state** — needs a design decision before spec is written.

---

## File Locations

| Item | Path |
|------|------|
| Cursor prototype | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-mar16.html` |
| Prototypes folder | `/Users/michaelchabin/CuriousWoods/prototypes/` |
| Geometry tool | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Palettes JSON | `/Users/michaelchabin/CuriousWoods/cw-deploys/art/palettes.json` |
| Vault active | `/Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/` |

---

## Server Setup

Always launch from the CuriousWoods root so all folders are reachable:
```bash
cd /Users/michaelchabin/CuriousWoods
python3 -m http.server 8000
```

Prototype URL: `http://localhost:8000/prototypes/proto-cursor-mar16.html`
Hard reload to bypass cache: Cmd+Shift+R

---

## Color Reference

| Name | Hex | Used for |
|------|-----|----------|
| Parchment | `#f4f1e8` | background |
| Payne's gray | `#546A80` | UI text, eraser cursor |
| Copper | `#BE622F` | points, consequence cursor |
| Cursor rest | `#8a9aaa` | crosshairs at rest |
| Cursor snap | `#1a2830` | circle always; crosshairs at snap |
| YInMn blue | (see geometry tool) | construction lines |
