# Note: Cursor Interaction Decisions — March 19, 2026

**For:** Designer, Coder
**From:** Prototyper session, March 19
**Prototype:** `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-modes.html`

---

## What Was Decided

### Point Detection — Precision Model

The snap/hit radius for points is **3px**. This is deliberate and non-negotiable.

The philosophy: the child is looking at the point she intends to click. The highlight confirms intent; it does not anticipate it. A large magnet radius (the previous 36px) teaches imprecision — the wrong lesson for a tool that will be used to construct the rational numbers on a coordinate plane.

**Spec values:**
- Snap/hit distance: **3px**
- Normal point radius: **2px**
- Hover point radius: **4px** (binary — no gradual growth)
- Point color at rest: copper `#BE622F`
- Point color on hover: `#e07830` (warmer copper)
- **No halos.** Points are bare copper dots at all times.

The hover triggers only when the cursor is within 3px of the point center. At that distance the child is already committed to clicking it.

---

### Segment Hover — New Interaction

Segments now highlight when the cursor is within **12px** (perpendicular distance to the line). This is the primary accessibility feature for selection — not magnification.

**Spec values:**
- Hover trigger distance: **12px** perpendicular
- Normal stroke: **0.5px**, opacity **0.6**, Payne's gray `#546A80`
- Hover stroke: **2px**, opacity **0.85**, lighter blue `#8aaccc`
- Selected flash stroke: **1.4px**, copper `#BE622F`, opacity **0.9**

**Priority rule:** Points win over segments. If the cursor is within 3px of a point, no segment highlights regardless of proximity. This mirrors the click priority already in the geometry tool.

**During eraser mode:** Hover is fully suppressed. No segment highlights while the eraser is active — hover state must not interfere with fade state.

---

### Eraser Gesture — New

A gesture-based system for de-emphasizing construction lines. No eraser button or persistent mode.

**Gesture vocabulary:**

| Gesture | Action |
|---------|--------|
| Single-click segment | Select it (existing behavior) |
| Double-click segment | Toggle fade (10% opacity) |
| Double-click + hold, drag | Eraser sweep — fades or restores segments as cursor passes over them |
| Double-click empty space | Undo last fade/restore action |

**Sweep behavior:** Direction (fade or restore) is set by the first segment contacted in a sweep and held for the entire drag. If the first segment touched is already faded, the sweep restores; otherwise it fades. This prevents accidental toggling back and forth within a single gesture.

**Eraser cursor:** Rounded rectangle, Payne's gray inner, white outer, rotates to follow drag direction. Shape defined in `proto-cursor-mar16.html` → `drawEraserCursor()`. The cursor flashes briefly on plain double-click (no hold) to confirm the gesture registered.

**On release:** Returns to whatever cursor mode was active before the double-click. Eraser is always transient.

**Undo:** Each fade/restore action (including sweep) pushes a snapshot of `fadedSegments` onto an undo stack. Double-clicking empty space pops it. Stack depth: 50.

**Faded segments remain fully selectable.** Fade is visual only — the geometry is unchanged. A faded segment can still be single-clicked to select it.

---

### What Magnification Is Now For

With point hover at 3px and segment hover at 12px, most selection ambiguity is resolved without magnification. The remaining valid use case for the precision magnifier is **closely-spaced points** — where two points are near enough that their 3px hit zones overlap or nearly overlap, making it impossible to target the segment between them without zooming. This validates keeping magnification in the tool; it just isn't the primary affordance for normal use.

---

## What Still Needs Decisions

- **Cursor spec document** — all states are now stable. Needs to be written and handed to Coder. Blocked previously on line/segment hover; that is now resolved.
- **Cursor vocabulary sheet** — a static layout of all cursor states side by side. Useful for Eileen presentation and for the spec.

## What the Coder Needs to Integrate

1. Point hover (grow 2→4px, color shift, 3px threshold)
2. Segment hover (thicken + brighten, 12px threshold, point priority)
3. Hover suppression during eraser mode
4. Eraser gesture (double-click to fade, double-click+hold to sweep, double-click empty to undo)
5. Eraser cursor shape (from `proto-cursor-mar16.html`)

Full working implementation is in `proto-cursor-modes.html` — the Coder can read it directly.
