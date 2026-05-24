# Handoff to Coder — March 21, 2026

**From:** Project Manager
**Supplements:** Handoff-Coder-Mar16.md — read that first, then this
**Source:** Prototyper session (proto-cursor-modes.html)

This document adds cursor behavior and interaction decisions from the Prototyper. Nothing in Handoff-Coder-Mar16.md is superseded — this is additive.

---

## Cursor Vocabulary — What Is Now Decided

The Prototyper has been working in parallel on cursor states. Two states are confirmed and ready to implement. The full cursor vocabulary sheet and written spec are still being finished — they will arrive as a separate document. Do not wait for them before implementing what is below; these decisions are stable.

### Default crosshair cursor

Already in the tool. No changes needed.

### Eraser cursor

Rounded rectangle shape.
- Payne's gray inner fill
- White outer border
- **Rotates to follow drag direction**

Reference implementation: `drawEraserCursor()` in `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-mar16.html`

Working prototype (eraser already integrated): `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-modes.html`

These are the only two cursor states in scope for now. Additional states (approach glow, snap indicator, etc.) come when the full cursor spec arrives.

---

## Gesture Vocabulary — Mac (confirmed decisions)

These are now explicit design decisions, not just future possibilities.

| Gesture | Action |
|---------|--------|
| Click point | Select (1st click) or construct line (2nd click on different point) |
| Click + drag from point | Construct circle — live preview during drag, commits on release near a 2nd point |
| Click empty space | Undo last action |
| Double-click segment | Fade / restore (scaffold toggle) |
| Double-click + hold + drag | Eraser sweep |

The construction gestures (two-click line, drag circle) are already implemented in `geometry-v1.html`. The Prototyper confirmed these as the canonical interaction model — no changes needed to the construction mechanics, only to ensure cursor state changes correctly during these gestures.

### Circle construction preview

During a drag from a point, display:
- A dashed copper radius line from the center point to the cursor
- A live circle arc at the current radius

This is the visual feedback that tells the child a circle is being drawn. No label needed — the appearing arc is sufficient.

**Release on a second point** → commit circle
**Release on empty space** → silently abandon, preview disappears

Check whether this preview is already in `geometry-v1.html`. If not, it needs to be added.

---

## Touch / iPad — Parked

The Prototyper explored touch support thoroughly and made real progress:
- Offset cursor (40px above contact point)
- Tap-vs-drag detection at `touchend`
- Circle preview on drag
- Double-tap for fade/restore and undo
- Palm rejection via `e.touches.length !== 1`

**This work is parked.** Touch code exists in `proto-cursor-modes.html` but is untested. Do not integrate it into `geometry-v1.html` yet. We return to iPad after Mac behavior is solid and cursor work is integrated.

The touch magnifier (offset crosshairs) from Handoff-Coder-Mar16 is still in scope — that is a targeted usability fix, not the full touch layer. Those are separate things.

---

## Cursor State Hooks — Reminder

From Handoff-Coder-Mar16: stub cursor state transitions as comments in the relevant event handlers. When the full cursor spec arrives, these are the insertion points.

```javascript
// CURSOR: set state 'default' here
// CURSOR: set state 'drag-initiated' here
// CURSOR: set state 'eraser' here
// CURSOR: set state 'rest' here
```

The eraser cursor is now ready to wire — no need to leave it as a stub. The others wait for the spec.

---

## Prototype Files (for reference only — do not edit)

| File | Purpose |
|------|---------|
| `prototypes/proto-cursor-modes.html` | Cursor + interaction prototype — Prototyper's working file |
| `prototypes/proto-cursor-mar16.html` | Eraser cursor shape reference — `drawEraserCursor()` lives here |

These are the Prototyper's files. Copy what you need from them; do not treat them as merge targets.

---

## Nothing Else Changes

Priority order from Handoff-Coder-Mar16 stands:
1. Constructions panel playback system
2. Save as Construction (PNG + note + localStorage)
3. Dwell time tracking
4. Touch magnifier
5. How-to note

Cursor integration (eraser + state hooks) can happen alongside any of these — it is not a blocker and not a new priority, just implementation detail that is now specified.
