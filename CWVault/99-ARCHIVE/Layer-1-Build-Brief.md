# Layer 1 Build Brief — Geometry Construction Engine

**Purpose:** Give Sonnet everything needed to build Layer 1 without reading 5 long foundation docs.

**Date:** February 16, 2026

---

## What We're Building

A pannable/zoomable HTML canvas where a child starts with two points (0 and 1) connected by a segment and builds geometric constructions using exactly two gestures. No Maya, no sound, no color shifts. Just the construction engine.

---

## The Canvas

- Warm, textured surface — not white, not grid-lined. Background color: `#f4f1e8` (parchment). Consider a subtle paper texture via CSS or canvas pattern.
- Pannable and zoomable. Objects on the canvas capture interaction first; empty space defaults to pan.
- World-space coordinates — constructions stay fixed when the view moves.
- Mouse: drag empty space to pan, scroll wheel to zoom.
- Touch: drag empty space to pan, pinch to zoom.
- Canvas fills the browser viewport.

---

## Initial State

Two points: **0** and **1**, connected by a faint segment. Placed near the center of the canvas, separated by a reasonable distance (maybe 200px at default zoom). These are the seed from which everything is constructed.

---

## Two Gestures

### Tap-tap: the straightedge

1. Tap an existing point → it highlights (active state).
2. A **ghost segment** stretches from that point to the cursor as you move.
3. Tap a second existing point → segment commits between the two points.
4. **Tap-and-hold extension:** Tap first point, then tap and *hold* the second point — the hold activates extension mode. Drag to extend the line *through and past* the second point. Release to commit the extended segment.
5. If the user taps empty space (not a point) as the second tap → ghost fades, gesture cancels. No arbitrary segments.

### Drag: the compass

1. Press on an existing point and drag outward.
2. A **ghost circle** grows, centered on the pressed point, with radius extending to the drag position.
3. The circle **snaps to existing points** as the radius approaches them — the target point glows, confirming snap.
4. Release while snapped to a point → circle commits (centered on the pressed point, passing through the snap target).
5. Release in empty space → ghost fades, no circle created. Every circle must pass through a meaningful point.

### Tap on empty space

Places a new free point. (Used sparingly — most points should emerge from constructions.)

### Tap on a glowing intersection

Promotes a detected intersection into a permanent point.

---

## Three Feedback States

These are universal visual cues:

1. **Highlight** — "This is active." A selected point or segment brightens subtly. Confirming the child's attention is registered. Used when: first tap of tap-tap, point being dragged for compass.

2. **Glow** — "This is available." Intersection points pulse gently when detected. Valid snap targets intensify as drag approaches. Used when: intersections exist but haven't been placed yet, a point is within snap distance during compass drag.

3. **Ghost preview** — "This is what will happen if you commit." Translucent preview of the construction in progress. Used when: ghost segment during tap-tap, ghost circle during drag. Distinct from committed objects (lower opacity, maybe dashed or softly glowing).

---

## Intersection Detection

The engine must automatically detect where:
- Lines cross lines (segment-segment intersection)
- Lines cross circles (segment-circle intersection)
- Circles cross circles (circle-circle intersection)

Detected intersections should appear as **glowing available points** — pulsing gently. They are not yet real points until the child taps them.

---

## Snap Behavior

During compass drag, when the circle's radius approaches an existing point:
- The circle snaps to that point (radius adjusts to pass exactly through it)
- The target point's glow intensifies
- Snap threshold: needs tuning, but start with ~15px screen distance
- If multiple points are in snap range, snap to the closest one

---

## Object Model

At minimum, the engine needs:

- **Point** — { id, x, y, type: 'free' | 'intersection' | 'seed' }
- **Segment** — { id, point1Id, point2Id } (line between two points, possibly extended beyond them)
- **Circle** — { id, centerId, edgePointId, radius } (center point, point it passes through)
- **Intersection** — { x, y, parentObjects: [id, id], placed: boolean } (detected but not yet committed)

All coordinates in world space. Rendering transforms world → screen using current pan/zoom state.

---

## Color Palette (from Interface Foundation)

```css
--cw-content-bg: #f4f1e8;      /* canvas background (parchment) */
--cw-border: #546A80;           /* Payne's gray — primary accent */
--cw-border-dark: #3D3D3A;      /* dark gray */
--cw-text-primary: #2a2620;     /* dark brown */
--cw-button-active: #2c5aa0;    /* blue — active/selected states */
```

For construction objects:
- Committed points: small solid circles, `#2a2620` or `#546A80`
- Committed segments: `#546A80`, 1.5-2px
- Committed circles: `#546A80`, 1-1.5px
- Ghost previews: same colors at 30-40% opacity, possibly dashed
- Glow/available: soft pulse using `#2c5aa0` or a warm gold
- Highlight/active: brightened version of object's color

---

## Gesture Detection Thresholds (starting values — will need tuning)

- **Tap vs. drag:** If pointer moves < 8px before release, it's a tap. Otherwise drag.
- **Tap timeout:** If press lasts > 300ms without movement, it's a hold (for tap-and-hold extension).
- **Snap distance:** 15px screen space.
- **Hit detection radius:** Points: 12px, Segments: 8px, Circles: 8px (all screen space, not world space).
- **Pan vs. object interaction:** If press starts on an object, it's an object interaction. If on empty space, it's a pan.

---

## Done When

- A child can build an equilateral triangle from two points using only tap-tap and drag:
  1. Start with points 0 and 1
  2. Drag from 0 (compass) → snap to 1 → circle commits
  3. Drag from 1 (compass) → snap to 0 → circle commits  
  4. Two circles intersect at two points (above and below the segment) → intersections glow
  5. Tap an intersection → it becomes a point
  6. Tap-tap to connect: new point to 0, new point to 1 → equilateral triangle
- Ghost previews show correctly during all gestures
- Intersections are detected and glow as available points
- Snap behavior feels natural, not frustrating
- Works on both mouse and touch
- Canvas pans and zooms when interacting with empty space

---

## Technical Decisions

**Recommended approach:** Single HTML file with vanilla JavaScript and HTML5 Canvas (2D context). No framework needed for Layer 1. The canvas API gives you direct pixel control for rendering, and the math for intersection detection is straightforward.

If a library is needed later (for complex object management or touch handling), Konva.js is a reasonable choice, but start simple.

**Key implementation concerns:**
- World-to-screen and screen-to-world coordinate transforms must be solid — everything else depends on them
- requestAnimationFrame rendering loop for smooth ghost previews and glow animations
- Separate interaction state machine: IDLE → FIRST_TAP → AWAITING_SECOND_TAP → committed, and IDLE → PRESSING_POINT → DRAGGING_CIRCLE → committed/cancelled
- Touch and mouse events should be unified into a single pointer abstraction

---

## File Location

Build at: `/Users/michaelchabin/CuriousWoods/CuriousWoods/` or `/Users/michaelchabin/CuriousWoods/prototypes/`

Use `filesystem:` tools, NOT `bash_tool` — bash runs in a container without access to Michael's Mac filesystem.

---

## What This Does NOT Include (Later Layers)

- Maya (text panel, canvas marks, highlighting) → Layer 2
- Coloring closed regions → Layer 3
- Sound, color temperature shifts, presence light → Layer 4
- Number line construction → Layer 5
- Coordinate plane construction → Layer 6

Build ONLY the construction engine. If it feels right in the hand, everything else can be built on top.
