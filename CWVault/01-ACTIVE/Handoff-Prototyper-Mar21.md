# Prototyper Session Handoff — March 21, 2026

**From:** Prototyper Chat (this session)
**Continues:** Handoff-Prototyper-Mar19.md

---

## What We Did This Session

### Touch / iPad exploration — parked

We explored adding touch support to `proto-cursor-modes.html` and got quite far:
- Offset cursor (40px above contact point) so the finger doesn't obscure the target
- Proper tap-vs-drag detection resolved at `touchend` (not `touchstart`)
- Circle preview on drag from a point
- Double-tap for fade/restore and undo
- Palm rejection via `e.touches.length !== 1` guard

**Decision: park iPad work for now.** The touch gesture layer adds complexity that isn't needed to move the Mac prototype forward. The touch code is in the file but untested. We will return to it once the Mac behavior is solid and the Coder has integrated the cursor work.

---

## Mac Interaction Design — Decisions Made This Session

These are the behaviors that matter for the Mac prototype right now. Only two cursor states are in scope: **default crosshair** and **eraser cursor**.

### 1. Tap-vs-drag distinction (Mac)

On Mac this is already handled correctly by the existing `mousedown` / `mousemove` / `mouseup` / `click` event split. No changes needed. Documented here for completeness.

### 2. Gesture vocabulary (Mac — current scope)

| Gesture | Action |
|---------|--------|
| Click point | Select (1st click) or construct line (2nd click on different point) |
| Click + drag from point | Construct circle — live preview, commits when released near a 2nd point |
| Click empty space | Undo last fade/restore |
| Double-click segment | Fade / restore |
| Double-click + hold + drag | Eraser sweep |

The **line construction** (tap point → tap second point) and **circle construction** (drag from point → release on second point) are now explicit design decisions, not just future possibilities. They should be implemented in the Mac prototype before the Coder integration.

### 3. Circle preview

While dragging from a point, draw:
- A dashed copper radius line from the center point to the cursor
- A live circle arc at the current radius

This is the feedback that tells the child what gesture is being interpreted. No label needed — the circle appearing is enough.

Release on a second point → commit circle.
Release on empty space → abandon, preview disappears silently.

### 4. Eraser cursor (confirmed from Mar19)

Rounded rectangle, Payne's gray inner, white outer, rotates to follow drag direction.
Shape defined in `proto-cursor-mar16.html` → `drawEraserCursor()`.
Already implemented in `proto-cursor-modes.html`.

---

## What the Prototype Still Needs (Mac)

Line and circle construction are already implemented in `geometry-v1.html` — no need to re-prototype them here. The prototype's job is cursor vocabulary and interaction feel, not construction mechanics.

The main remaining Mac work is:

1. **Cursor vocabulary sheet** — a static visual of all cursor states side by side. Useful for Eileen presentation and as a Coder spec reference. All states are now stable enough to document.

2. **Cursor spec document** — written spec of all cursor states, transitions, and hit-test values for handoff to the Coder.

---

## File Locations

| Item | Path |
|------|------|
| Cursor modes prototype | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-modes.html` |
| Eraser cursor shape (reference) | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-mar16.html` |
| Geometry tool | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Vault active | `/Users/michaelchabin/CuriousWoods/CuriousWoods/01-Active/` |

---

## Server Setup

```bash
cd /Users/michaelchabin/CuriousWoods
python3 -m http.server 8000
```

Then open: `http://localhost:8000/prototypes/proto-cursor-modes.html`

Hard reload: Cmd+Shift+R

iPad testing (when we return to it): find Mac IP with `ipconfig getifaddr en0`, then open `http://[IP]:8000/prototypes/proto-cursor-modes.html` in Safari on iPad. Mac and iPad must be on the same Wi-Fi network.

---

## Next Session Priority

Wire the Mac mouse path for:
1. Two-click line construction
2. Click-drag circle construction with live preview

Both drawing functions are already in the file. It's purely event handler work.
