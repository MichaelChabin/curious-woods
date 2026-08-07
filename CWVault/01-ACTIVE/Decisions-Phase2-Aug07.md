---
status: Current — awaiting Michael's review before Phase 3
role: Session ledger — Phase 2, Glass Geometry standing on the plane
date: 2026-08-07
---

# Decisions — Phase 2, proving nothing was lost

Reported by Claude Code, 7 August, same day as Phase 1's acceptance. Phase 2 is
deliberately thin on code and heavy on verification: one boundary fix, then a
systematic pass over every tool, gesture, save, replay and tip on the extracted
plane with y up. Committed, not pushed.

## The one code change

**`getAxisLabels()` no longer measures the unit from the model.** It asks
`plane.unitLength()`, which the lab declares when the init op replays — the
boundary decision 4 required. Its sibling `getAxisPointIds()` got the same
substitution. The seeds are still read for axis *detection* and label
*placement*: that is the lab's own geometry work, not the violation. The
emergent-numbering model is otherwise untouched — numbers still appear only
where the child has constructed a point.

## Verified working, in a served browser

Every check ran on a cleared profile (fresh first visit), zero console errors
end to end.

- **Gestures** — tap-tap line; tap-hold-drag circle with snap; tap-empty undo
  (removes the last op after the double-click delay); double-click fade to
  scaffold and double-click restore (line returns at full opacity, measured at
  the pixel level; seeds exempt per the axis-point rule); **eraser sweep** both
  ways — double-click-hold-drag across two circles fades both, the same gesture
  starting on a faded circle restores both, mode locked at sweep start; pan
  (content follows the pointer — the y-up sign flip is right); wheel zoom about
  the screen centre; double-click-empty places a canvas note.
- **Lead and glass** — four arc taps close the vesica lens and it fills; the
  seed-line segment crossing the lens takes emphasis (lead) on tap, and a
  second tap removes it without dissolving the fill (the segment is not part of
  the fill's boundary walk — correct); swatch selection recolors the glass;
  lead-thickness slider thickens the cames live and the track renders at the
  chosen thickness.
- **Save** — Cmd-S opens the consolidated type dialog; Save Construction writes
  the localStorage entry and index (name, note, notePos, PNG thumbnail, **no
  viewport field**); the saved thumbnail renders the finished glass correctly
  under the flip; the uniqueness observation appears after saving at 15 points
  with the session's real numbers (15 points, 2 lines, 7 circles → 4.1 × 10³¹).
  Save as Image renders the postcard preview — mat, inner line, parchment,
  leaded glass — matching the screen.
- **Load and replay** — dropping a `.json` construction replays it and fits the
  view through the plane's single clamp; the picker lists saved entries (with
  delete) ahead of the three builtins; opening one starts step-through at the
  default view; → advances, ← reverts (a recolor stepped back to bottle green),
  |← and →| jump; drawing mid-replay forks — controls disappear, the geometry
  stays, the child owns it; the work-in-progress dialog guards New and Open,
  and its Save path snapshots the log before the continuation clears the canvas.
- **Tips** — the first-visit window shows on a cleared profile; the smart
  suppression was observed doing exactly what the spec asks: after the child
  demonstrates leading and fading unprompted, `shapes` and `eraser` are marked
  seen **without ever being shown** (flags verified in localStorage), and they
  stay away in later constructions. The Color bullet opens panel plus tip; tip
  windows drag and close.
- **Palette** — all 15 palettes load in the picker; switching to Hokusai
  retitles the panel and rebuilds its 8 swatches; universal chips and recipe
  rows render.
- **Numbers** — labels 0, 1, 2 render from the plane-declared unit; the toggle
  handler flips on/off and records the `numbers` op.
- **Notes** — the note box scales and tracks the view through pan and zoom
  (world-space width behaving as recorded).

## Not verifiable from here — the short list for a human hand

- **Pinch zoom on real touch hardware** — same code path as wheel through
  `plane.setZoom()`, but untested by a real gesture.
- **The Share sheet** (`navigator.share`) and opening the downloaded postcard
  PNG in an image viewer.
- **iPad Safari generally** — including that the `user-select` fix actually
  kills the select-and-paint-blue behaviour there.
- **The color tip's positive auto-trigger** (four fills, no repaint, tip opens
  unbidden). Its trigger loop, suppression branch, and seen-marking were all
  exercised; only this one predicate path wasn't humanly driven to completion.

## Found in passing, none of it new

- **The constructions panel is unreachable.** `openConstructions()` — the only
  entry to `#tool-constructions`, which holds the Numbers on/off toggle and the
  example thumbnails — has no caller. Identical in the pre-Phase-1 build; the
  Open word goes to the picker instead. Either the panel is superseded and
  should go, or Numbers needs a new home. Michael's call.
- **Drop-loading a file skips the work-in-progress check** and silently replaces
  unsaved work. Pre-existing.
- **The connected-segment hover hint** renders on faded arcs and after
  deemphasis. Cosmetic, pre-existing.

## Stop

Phase 3 — the ambient lattice, with number-theory-v1 as the behavioural
reference — does not start until this is reviewed.
