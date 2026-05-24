# Prototyper Session Handoff — March 19, 2026

**From:** Prototyper Chat (this session)
**Continues:** Handoff-Prototyper-Mar17.md

---

> **Superseded by:** [[Handoff-Prototyper-Mar21]]

---

## What We Did This Session

Focused entirely on cursor interaction in `proto-cursor-modes.html`. No new prototype files — all work is iterative refinement of the existing cursor modes prototype.

### Changes Made to proto-cursor-modes.html

**1. Point hover highlight — tightened dramatically**

Previous snap/hit distance was 36px (inherited from the transform mode logic). This is appropriate for a forgiving children's app but wrong for a precision construction tool. Michael's framing: the child is looking at the point she intends to click, so the highlight should confirm intent, not anticipate it.

- `snapDistance`: 36px → 3px
- `hitRadius`: 14px → 3px
- `POINT_RADIUS_HOVER`: 5px → 4px
- White halos removed entirely from point rendering — bare copper dots at all times

Points now only highlight when the cursor is essentially on top of them. The crosshair is the primary affordance; the point grow is confirmation.

**2. Segment hover highlight — added**

Segments now highlight when the cursor passes within 12px (perpendicular distance). They thicken from 0.5px to 2px and brighten from Payne's gray to a lighter blue. Points take priority: if the cursor is within 3px of a point, no segment highlights regardless of proximity.

This allows the child to hover along a line and see exactly which segment will be selected — making rapid successive segment clicks much easier without magnification.

**3. Eraser: double-click to fade, double-click+hold to sweep**

Designed and implemented a new gesture layer for de-emphasizing construction lines:

- **Double-click a segment**: fades it to 10% opacity. The eraser cursor (rounded rectangle, Payne's gray, rotates to follow drag direction — from proto-cursor-mar16) flashes briefly to confirm the gesture.
- **Double-click + hold**: eraser cursor persists. Sweeping over segments fades them. Sweeping over already-faded segments restores them. Direction is set by the first segment touched in a sweep (fade or restore), and held for the entire drag.
- **Release**: returns to whatever cursor mode was active before.
- **Double-click empty space**: undo — pops the last fade/restore state.

Faded segments remain fully selectable (single-click still works). This is consistent with how the geometry tool handles line visibility generally.

**4. Two bugs fixed**

*Bug 1 — Eraser re-toggling on first mousemove:*
`eraserTouched` was initialized as `new Set()` on eraser activation. The segment just toggled by `toggleFade()` was not in the set, so the first `mousemove` event immediately called `eraserSweepHit()` on it, reversing the fade. Fix: initialize as `new Set([idx])` — pre-seed with the double-clicked segment.

*Bug 2 — Hover state fighting fade state:*
`hoveredSegIdx()` was still running every frame during eraser sweeps, returning the segment under the cursor as "hovered." The hover rendering path in `drawSceneGeometry` uses a brighter color and thicker stroke — making faded segments appear to flicker back. Fix: `hoveredPoint()` and `hoveredSegIdx()` both return null/-1 immediately when `eraserActive` is true.

---

## Design Decisions Confirmed This Session

**Precision over forgiveness for point detection.** 3px snap radius is intentional and correct for this tool. The coordinate plane work (constructing rational numbers) requires that the child develop confidence in exact placement. A large magnet radius teaches imprecision.

**No halos on points.** The white halo was a visual separator for points against segments — useful when snap distance was large and a hovered point needed to stand out. At 3px it's irrelevant, and the bare dot is cleaner.

**Segment highlighting is the real accessibility feature.** Not magnification. A child hovering near a segment sees it light up; she knows exactly what she'll click. This handles ~90% of selection clarity. Magnification remains available for closely-spaced points where disambiguation is genuinely needed.

**Eraser is a mode, not a tool.** It's invoked by gesture (double-click) and exits automatically on mouseup. There's no eraser button, no mode toggle. The gesture vocabulary is: single-click = select, double-click = fade/restore, double-click+hold = sweep. This is consistent with the "error-preventing design" philosophy — you can't accidentally stay in eraser mode.

**Faded lines stay selectable.** The fade is purely visual. The geometry underneath is unchanged. A faded segment can still be selected, extended, or made part of a construction. The child is managing visual clutter, not deleting work.

---

## Open Questions / Next Steps

1. **Cursor vocabulary sheet** — still not built. All the states are now stable enough to document visually. Useful for presenting to Eileen and for the Coder spec.

2. **Cursor spec document** — line/segment hover state is now decided (thicken + brighten, 12px threshold, point wins). This unblocks the full spec. Should be written before handing cursor work to the Coder.

3. **Eraser in the geometry tool** — the eraser gesture needs to be integrated into `geometry-v1.html`. The prototype has a clean, self-contained implementation. The Coder should read both `proto-cursor-modes.html` and `proto-cursor-mar16.html` (for the eraser cursor shape).

4. **Sound workbench** — untouched this session. Still a separate story.

5. **Close-point disambiguation** — the two deliberately close points (ids 5 and 6, ~12px apart) still require magnification to click their shared segment. This is the correct remaining use case for the precision magnifier. No design change needed; the scenario validates why magnification exists.

---

## File Locations

| Item | Path |
|------|------|
| Cursor modes prototype | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-modes.html` |
| Sound workbench | `/Users/michaelchabin/CuriousWoods/prototypes/proto-sound-workbench.html` |
| Cursor vocabulary prototype (older, eraser shape) | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-mar16.html` |
| Geometry tool | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Vault active | `/Users/michaelchabin/CuriousWoods/CuriousWoods/01-Active/` |

---

## Server Setup

```bash
cd /Users/michaelchabin/CuriousWoods
python3 -m http.server 8000
```

Hard reload: Cmd+Shift+R
