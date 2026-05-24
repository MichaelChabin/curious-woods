# Layer 1 Amendment — February 19, 2026

**Amends:** `01-ACTIVE/Layer-1-Build-Brief.md`  
**Prototype to update:** `/prototypes/geometry-layer1.html`  
**Status:** Ready to implement — apply all five changes in one session

These changes refine Layer 1 toward mathematical correctness and sensory richness.
Apply them in order. Each is independent but they form a coherent whole.

---

## Change 1: Remove the Initial Segment

**Current behavior:** Canvas starts with points 0 and 1 connected by a faint segment.

**New behavior:** Canvas starts with points 0 and 1 only. No segment.

**Why:** The segment was added for visibility but it violates the core principle —
everything is a construction. A free segment handed to the child is bad mathematics
and dilutes Maya's first demonstration (she would be drawing over an existing line).
Starting with two bare points is correct. Points 0 and 1 are given. Everything else
is built.

**Visibility:** Compensate with labeled points (see Change 2) and slightly more
luminous seed points. The canvas with two labeled points and nothing else is a
powerful opening image — it says "this is where everything begins."

---

## Change 2: Label Seed Points 0 and 1

**Current behavior:** Points are unlabeled orange dots.

**New behavior:** Seed points are labeled "0" and "1". Labels persist permanently.
New constructed points are unlabeled unless explicitly named later (Layer 2+).

**Why:** This is not just a labeling convention — it establishes the unit.
The distance from 0 to 1 is 1, by definition. Everything constructed from these
points inherits that measure. The first equilateral triangle has sides of length 1.
The number line, when built, will feel like recognition not introduction.

Using 0 and 1 rather than A and B removes the cognitive bridge between label and
measure that traditional geometry requires. Greek geometers used letters that were
also numerals — that meaning was lost when the tradition was inherited without
its context. We restore it from the beginning.

**Label appearance:**
```
Font:       Georgia, 13px
Color:      #2a2620 (dark brown) — same as primary text
Position:   Offset from point center — suggest below-right, ~10px offset
            Adjust per point to avoid overlapping constructions
Visibility: Always shown for seed points 0 and 1
            Not shown for unlabeled constructed points
```

**Label behavior:**
- Labels stay fixed relative to their point in world space
- Labels scale with zoom (remain readable at all zoom levels)
- Labels do not interfere with hit detection

---

## Change 3: Lines Are Infinite

**Current behavior:** Tap-tap creates a finite segment between two points.
Extension mode (tap-and-hold) creates a longer segment through additional points.

**New behavior:** Tap-tap creates an infinite line through two points.
The line extends across the entire canvas in both directions.
The tap-and-hold extension gesture is retired entirely.

**Why:** A line is infinite by definition. Finite segments were chosen for aesthetic
reasons but they introduce a mathematical error: to extend a segment, the old spec
required clicking to place an arbitrary termination point — a point not produced
by any construction. That violates the Euclidean principle that all points emerge
from constructions. Infinite lines solve this without any new gesture.

**Intersection detection:** Infinite lines intersect with everything they cross,
not just nearby objects. This increases intersection detection richness — more
points become discoverable from each construction.

**Ghost preview:** During tap-tap gesture, the ghost line should preview as
infinite — extending across the canvas — so the child sees exactly what will commit.

**Object model update:**
```
Line: { id, point1Id, point2Id }
Rendering extends the line infinitely through both points to canvas bounds.
point1 and point2 define direction and position, not endpoints.
```

**Retired:** The tap-and-hold extension gesture is no longer needed and should
be removed. This simplifies the interaction model.

---

## Change 4: Line Weight Hierarchy

Lines have different visual weights depending on their mathematical role.
The child does not choose these — they are determined automatically.

```
Axes (x-axis, y-axis):             2px
  Detected: infinite line passing through origin at 0 or 90 degrees
  to the unit segment. Primary coordinate structure.

Finite constructions (circles):    2px
  The child's work. Presence and weight.

Infinite constructed lines         1px at 80% opacity (#546A80)
(non-axis):                        Structure, not objects. Clear but secondary.

Grid lines (future):               0.5px — reference only
```

Note: No axes exist at Layer 1 stage — they emerge when the child constructs
them later. The axis detection rule is included now so rendering is correct
when that moment arrives.

---

## Change 5: Point Birth Animation and Sound

### 5a — Point Birth Animation

When any point is created, it animates from large to final size.

```
Start size:   2.5x final point radius
End size:     1x final point radius
Duration:     250ms
Easing:       ease-out
Character:    Like a drop of water finding its shape. Brief, physical, calm.
```

Apply to all point types including seed points on canvas load.

### 5b — Sound Design (Web Audio API)

All sounds synthesized via Web Audio API. No external files required.
Quiet, high register, brief. They belong on the parchment canvas.

**Point creation**
```
Type:         Single sine wave
Frequency:    700hz
Attack:       5ms
Decay:        200ms
Character:    A finger lightly touching crystal. Small, precise, clear.
```

**Intersection point appearing** (auto-detected, before child taps)
```
Type:         Two sine waves at 700hz + 710hz (gentle shimmer/beating)
Attack:       8ms
Decay:        300ms
Character:    Discovery rather than placement. Something was found.
```

**Circle completing**
```
Type:         Soft perfect fifth chord — 480hz + 720hz
Attack:       10ms
Decay:        400ms
Character:    Closure and roundness. A shape just closed.
```

**Line completing**
```
Type:         Single sine wave
Frequency:    520hz
Attack:       5ms
Decay:        250ms
Character:    Clean and decisive. Something drawn taut.
```

**Snap confirmation** (during compass drag when circle snaps to a point)
```
Type:         Very brief sine burst
Frequency:    900hz
Attack:       2ms
Decay:        80ms
Character:    Almost subliminal. Confirms without interrupting the gesture.
```

**Scaffold toggle**
```
Fading:       Descending tone 500hz to 350hz over 150ms
Restoring:    Ascending tone 350hz to 500hz over 150ms
Character:    Soft directional whoosh. Down for receding, up for returning.
```

**General principles:**
- Master volume low — sounds should be felt more than heard
- No sound on failed gestures — silence for failure
- No sound on pan or zoom
- Use AudioContext with OscillatorNode and GainNode per sound event
- Create and destroy nodes per event — do not keep persistent oscillators

---

## Updated "Done When" Criteria

- Canvas opens with two labeled points (0 and 1) and nothing else
- Points animate to size on creation
- Tap-tap creates infinite lines through two points, extending to canvas bounds
- Ghost preview during tap-tap shows infinite line
- Tap-and-hold extension gesture is removed
- Line weight hierarchy renders correctly
- Axis detection logic in place (will activate when axes are constructed)
- Double-tap on line or circle toggles scaffold opacity (20-25%)
- All six sounds play correctly for their events
- Equilateral triangle construction works correctly with infinite lines
- Intersection detection works with infinite lines
- Seed point labels visible, scale with zoom, offset cleanly

---

## Notes for the Coding Chat

Read this amendment alongside Layer-1-Build-Brief.md. This amendment supersedes
any conflicting instructions in the original brief.

The most significant structural change is lines becoming infinite — this affects
the object model, the rendering loop, and intersection detection. Infinite line
intersection math uses the line equation rather than endpoints but is otherwise
standard. Touch every place that currently assumes segments have endpoints.

Tap-and-hold gesture removal simplifies the state machine — one fewer state.

Web Audio API: use AudioContext with OscillatorNode and GainNode. Create and
immediately destroy nodes per sound event. Standard practice, avoids memory
accumulation. Well supported in all modern browsers.
