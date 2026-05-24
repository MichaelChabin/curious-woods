# Note to Coder — Action Layer Architecture
**Created:** March 5, 2026
**From:** Designer Chat
**Priority:** Plant this flag before palette and model tools get wired up

---

## The Core Requirement

Every action the child can take on the canvas must be callable programmatically — not just through UI events. This is not a Maya feature. It is a foundational architectural decision that makes Maya possible later without rewriting the canvas.

---

## Why This Matters Now

The palette tool and model tool are currently being built by the Layout Manager. As those tools get wired into the canvas — applying fills, loading models, setting opacity — there is a risk that the UI events and the canvas actions become tangled together. If a fill only happens because a child tapped a swatch, and that tap is the only path to filling a region, then Maya can never fill a region. That is the wrong architecture.

The right architecture separates:

**The action layer** — what can happen
- Fill this region with this color
- Clear this region
- Load this model at this opacity and scale
- Set palette to this palette
- Draw a line through these two points
- Create a circle centered here through this point
- Toggle scaffold on this object
- Set lead borders on/off

**The input layer** — what triggered it
- Child's tap or drag
- Maya's instruction
- A story event (a narrative moment that triggers a canvas illustration)
- A developer console command during testing

The action layer should not know or care which input triggered it. The input layer calls actions by name with parameters. That is the only relationship between them.

---

## What This Looks Like in Practice

A simple example. Instead of:

```javascript
swatch.addEventListener('click', () => {
  selectedRegion.style.fill = swatch.color;
});
```

Something closer to:

```javascript
// The action — callable from anywhere
function fillRegion(regionId, colorHex) {
  // apply the fill
  // record the action in the operation log
  // update any dependent state
}

// The input — calls the action
swatch.addEventListener('click', () => {
  fillRegion(selectedRegion.id, swatch.color);
});

// Maya — also calls the same action
function mayaFillRegion(regionId, colorHex) {
  fillRegion(regionId, colorHex);
}
```

The operation log already records every construction action as JSON. Fill actions, palette selections, and model loads should be recorded the same way — same log, same format. This gives Maya full visibility into what has happened on the canvas and the ability to replay or extend it.

---

## Maya's Canvas Abilities (from the Geometry Workspace Overview)

For reference, Maya will eventually need to:

- Draw temporary translucent marks on the canvas (ghost segments, arcs, circles) that fade after a few seconds
- Highlight or pulse existing objects the child has built
- Fill regions with colors (demonstrating a palette choice)
- Load and position a model
- Suggest a construction (ghost preview of a line or circle not yet drawn)

None of these require building Maya now. They require building the action layer now so that Maya can be connected to it later without surgery.

---

## Pre-Maya Testing

Before Maya exists, the Coder should have a simple way to invoke canvas actions programmatically — a minimal developer console or command interface. This does not need to be designed or polished. It is a development tool, not a child-facing feature. Its only purpose is to verify that the action layer works independently of the UI.

---

## Relationship to the Layout Manager's Work

The Layout Manager is building the palette tool and model tool panels — the visible UI, the swatch grid, the picker window, the panel animations. That work is correct and should continue as specced.

What the Layout Manager's work does not cover — and should not be expected to cover — is how those panel interactions connect to the canvas. That connection is the Coder's responsibility. The handoff point is:

- Layout Manager: child taps a swatch → the palette tool knows which color is selected
- Coder: that selection → fillRegion() is called with the right parameters → the canvas updates → the action is logged

The Layout Manager should not wire panel events directly to canvas mutations. Leave that join for the Coder.

---

## Summary

One sentence: **build the canvas so Maya can drive it, even though Maya isn't here yet.**

This is the kind of decision that is nearly free to make now and very expensive to make later.
