# Layer 1 — Consolidated Specification
**Date:** February 20, 2026 (revised)
**Status:** Definitive. Supersedes all previous Layer 1 specs.
**File to update:** `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`

Read this document in full before touching the code.

## ⚠️ CRITICAL: File Writing

**Always use `filesystem:` tools — never `bash_tool`.**
Michael works on a Mac. bash_tool runs in a Linux sandbox he cannot see.
Files written with bash are invisible to him. All reads and writes must
go through filesystem MCP tools.

---

## BRIEF

Two bare points. No starter segment. No labels. Everything is a construction.
All lines are infinite. One gesture creates them: tap A, tap B.
Interactive units are logical segments between consecutive points on each line.
Thin precise lines (0.5px) with click-to-emphasize (2px).
Point birth animation. Sounds. Scaffold fade. Subpixel rendering fix.

---

## Why All Lines Are Infinite

Starting with two points and constructing two circles (centered on each,
passing through the other) produces 2 new intersection points with segments,
but 4 with infinite lines. The extra two points are where each circle crosses
the line on the far side — often exactly the points needed for the next step.
Maximum generative power from the minimum gesture. The child doesn't need to
know this. She just notices more things are glowing.

---

## Initial State

Canvas opens with exactly two points and nothing else.
No connecting line. No labels. No grid.

Seed points are visually distinct from constructed points —
slightly larger, slightly more luminous — but not labeled.
Labels (0 and 1) are a future discovery moment, not a starting condition.

```
Seed points:        pointSize * 1.4 radius, full opacity, copper #BE622F
Constructed points: pointSize radius, full opacity, copper #BE622F
```

---

## Visual Parameters (Michael's current preferred values)

```javascript
PARAMS = {
  pointSize:      1.5,   // base radius of constructed points in world units
  birthScale:     3.0,   // point birth animation starts at 3x final size
  birthDuration:  400,   // point birth animation duration in ms
  lineWidth:      0.5,   // all lines at default width
  circleWidth:    0.5,   // all circles at default width
  emphasisWidth:  2.0,   // emphasized logical segment or circle
  lineOpacity:    1.0,   // all construction objects at full opacity
  scaffoldOpacity: 0.22  // faded scaffold objects
}
```

Tunable via parameter panel. "Log Current Values" outputs to console.

---

## Subpixel Rendering Fix

Lines disappearing at certain zoom levels is caused by subpixel positioning.

**1. Snap coordinates to half-pixel boundaries before drawing:**
```javascript
function snapToPixel(value) {
  return Math.round(value) + 0.5;
}
// Apply to all line/circle stroke coordinates after world-to-screen transform
```

**2. Use only pixel-friendly line widths:**
0.5, 1.0, 1.5, 2.0, 2.5px only.
Avoid values like 1.3px — inconsistent rendering on Retina displays.

**3. Handle device pixel ratio on the canvas element:**
```javascript
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
ctx.scale(dpr, dpr);
```

---

## Two Gestures

### Drag: the compass

1. Press on an existing point and drag outward
2. Ghost circle grows, centered on pressed point
3. Circle snaps to existing points as radius approaches them
4. Release while snapped → circle commits
5. Release in empty space → ghost fades, no circle created

### Tap-tap: the straightedge

1. Tap point A → highlights
2. Ghost line stretches from A toward cursor, extending to canvas bounds
3. Tap any existing point B → infinite line commits through A and B,
   extending to canvas bounds in both directions
4. Tap empty space → ghost fades, gesture cancels

That is the complete gesture. One behavior, no variants.
The tap-and-hold extension gesture and the tap-pass-tap gesture
are both retired. Do not implement either.

---

## Object Model

```javascript
// Points
Point: {
  id, x, y,
  type: 'seed' | 'intersection' | 'free',
  label: null  // reserved for future use, not displayed in Layer 1
}

// Lines (all lines are infinite)
Line: {
  id,
  point1Id, point2Id,      // define direction and position, not endpoints
  pointsOnLine: [id, ...], // all points on this line, sorted by position
  isScaffold: false
  // no isEmphasized here — emphasis is per logical segment, not per line
}

// Logical segments (not stored — derived from Line.pointsOnLine)
// A logical segment is the portion of a line between two consecutive
// points in pointsOnLine. It has its own emphasis state:
LogicalSegment: {
  lineId,
  pointAId, pointBId,  // consecutive points on the line
  isEmphasized: false
}
// Store these in a Map keyed by "lineId:pointAId:pointBId"

// Circles
Circle: {
  id,
  centerId, edgePointId, radius,
  isScaffold: false,
  isEmphasized: false
}

// Intersections (detected, not yet placed)
Intersection: {
  x, y,
  parentObjects: [id, id],
  placed: boolean
}
```

**Maintaining pointsOnLine:**
When any new point is placed or constructed, check all existing lines to see
if the point lies on them (within floating point tolerance). If yes, add the
point to that line's pointsOnLine array and re-sort by position along the
line's direction vector. This is how logical segments stay current.

---

## Intersection Detection

Detect intersections between all object pairs:
- Line — line
- Line — circle
- Circle — circle

All lines are infinite. Intersections are detected across full extent.
A line defined by two points near canvas center will intersect objects
anywhere on the canvas.

Detected intersections appear as glowing available points, pulsing gently.
They become permanent points when the child taps them.

---

## Emphasis System

The primary way to make constructions readable. Replaces choosing object types.

**Default:** All lines and circles at 0.5px, 100% opacity. Thin, precise.

**Emphasized:** 2px, 100% opacity. Reads clearly against 0.5px background.

**Interaction:**
- Single click on a logical segment (portion of line between two consecutive
  points) → that segment toggles emphasis. Rest of line unaffected.
- Single click on circle circumference → whole circle toggles emphasis.
- Click emphasized object → returns to default.

**Hit detection for logical segments:**
When child clicks near a line, find the nearest logical segment (consecutive
point pair) along that line. Emphasize only that segment.

**Visual result:** A hexagon built from six infinite lines, with its six
edges clicked to emphasis, reads as a hexagon. Construction lines remain
at 0.5px. The figure declares itself through emphasis.

Emphasis state is included in the undo stack.

---

## Scaffold Fade (secondary, still available)

Double-click any line or circle → fades to 22% opacity.
Double-click again → restores.
Scaffold state included in undo stack.

Sound:
- Fading: descending tone 500hz→350hz, 150ms
- Restoring: ascending tone 350hz→500hz, 150ms

---

## Point Birth Animation

All points animate on creation.

```
Start:    pointSize * birthScale (3x default)
End:      pointSize (1x)
Duration: birthDuration ms (400ms default)
Easing:   cubic ease-out
```

Seed points animate on canvas load.

---

## Line Weight Hierarchy

```
Emphasized logical segment:  2.0px  100% — declared construction
Emphasized circle:           2.0px  100% — declared construction
Default lines and circles:   0.5px  100% — construction scaffolding
Scaffold-faded objects:      0.5px   22% — receded, still present
Axes (future):               2.0px  100% — coordinate foundation
Grid lines (future):         0.5px   40% — reference
```

Include axis detection now: infinite lines through the origin at
0° or 90° render at 2px automatically when they exist.

---

## Sound Design (Web Audio API)

Synthesized only — no external files.
Use AudioContext, OscillatorNode, GainNode.
Create and destroy nodes per event. No persistent oscillators.
Master volume low. No sound on failed gestures, pan, or zoom.

```
Point creation:
  Sine, 700hz, attack 5ms, decay 200ms
  Character: finger lightly touching crystal

Intersection appearing (auto-detected):
  Two sines at 700hz + 710hz (gentle shimmer/beating)
  Attack 8ms, decay 300ms
  Character: something discovered

Line completing:
  Sine, 440hz, attack 5ms, decay 300ms
  Character: a line reaching across space

Circle completing:
  Perfect fifth — 480hz + 720hz
  Attack 10ms, decay 400ms
  Character: a shape closing

Snap confirmation (compass drag):
  Sine burst, 900hz, attack 2ms, decay 80ms
  Character: nearly subliminal

Emphasis on:
  Ascending, 600hz→800hz, 100ms

Emphasis off:
  Descending, 800hz→600hz, 100ms

Scaffold fade:
  Descending, 500hz→350hz, 150ms

Scaffold restore:
  Ascending, 350hz→500hz, 150ms
```

---

## Gesture Thresholds

```
Tap vs drag:      pointer moves < 8px before release = tap
Snap distance:    15px screen space
Hit detection:    Points 12px, Lines 8px, Circles 8px (screen space)
```

---

## Undo System

Single tap empty space → undo last action
Double-tap empty space → clear all, reset to two seed points

Undo stack includes: point placements, line/circle constructions,
emphasis toggles, scaffold toggles.

---

## Done When

- Canvas opens with two seed points and nothing else
- Seed points slightly larger than constructed points, no labels
- Tap A, tap B → infinite line commits, extends to canvas bounds
- Ghost line previews as infinite during gesture
- Tap empty space cancels gesture silently
- Single click on logical segment → emphasizes to 2px
- Single click emphasized segment → returns to 0.5px
- Whole circle emphasizes/de-emphasizes on click
- Double-click line or circle → scaffold fade to 22%
- Subpixel fix applied — lines crisp at all zoom levels
- Point birth animation: 3x → 1x, 400ms, cubic ease-out
- All sounds play for their events
- Intersection detection: line-line, line-circle, circle-circle
- Intersections detected across full line extent
- Axis detection logic present (activates when axes constructed)
- Undo covers all actions
- Equilateral triangle constructable and readable with emphasis

---

## What Layer 1 Does NOT Include

- Maya (Layer 2)
- Point labels (future discovery moment)
- Color regions (Layer 3)
- Coordinate plane (Layer 6)
- Number line (emergent, not built)
- CW Dev Tools (separate file, separate session)
