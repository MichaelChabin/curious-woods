---
status: Current — awaiting Michael's review
role: Session ledger — Lane 1 of the post-Phase-4 review, as executed
date: 2026-08-12
---

# Decisions — Lane 1, the fix-now list

Reported by Claude Code, 12 August. Executed per `Review-GlassMult-Aug09.md`
Lane 1, with the two 8-Aug items confirmed rather than redone. Everything
verified in the browser, zero console errors, both labs.

## Confirmed, not redone

- **Safari audio.** `unlockAudio` runs synchronously inside every pointerdown,
  keyboard activation, and chip click — create, resume (including the
  `interrupted` state), one silent sample through — exactly as the Phase 4
  ledger records. Untouched today.
- **Tap highlights.** The highlight-catch is seeded per pane position and
  piece, draws from the middle detail tier up, brightness clamp opened to
  2.0; the bench's values untouched. Untouched today.

## The acceptance-test swap was ordered on the 8th and found undone

`Design-Phase4-Aug08.md` §10 still carried "monochrome check — 6, 10, 14
distinguishable with colour off via subdivision", a test belonging to the
overruled §2. Swapped today for the colourblind-workshop check, marked as a
standing vacancy until the 16th workshop exists. The overrule commit of 8 Aug
rewrote §2 but never touched §10.

## Multiplication fixes

- **Selection outline.** The pane-cursor outline was drawn after every tap
  (the canvas focuses on pointerdown, and taps move the cursor). It is now a
  keyboard affordance only: taps still move the cursor's position so the
  arrows resume from the tapped pane, but only arrow/Enter use shows the
  outline — the lit palette stays the one visual language for "this one".
  The outline was kept for keyboard access rather than deleted outright; if
  Michael wants it gone entirely the virtual cursor needs a replacement
  affordance first.
- **Startup grid / axis shading.** The table-style treatment of the edge
  panes in Multiply — tan background fill and frame stroke per pane — is
  deleted. First paint is the drawn lattice used everywhere else, with the
  axis numerals standing unshaded. Scoped to Multiply as the review says:
  the Build tools that ask for a row or column keep their shaded hint.
- **The white 1.** Unity pane and chip now render white and quietly
  crystalline with a slight bluish tint (`#ffffff → #e9eef5 → #cfd6e0`) —
  the tint is what separates *whole and white* from clear leaded glass,
  which means "prime beyond this workshop".
- **Fill pause.** Fill no longer fills the viewport; it fills the entire
  square below-left of a power-of-two corner — 16² first, then 32², 64² —
  pausing at each corner. The word **Continue?** (new child-facing string)
  appears beside Fill while a fill is paused and resumes toward the next
  corner; Clear and mode changes retire it. Large squares reveal in chunks
  so the sweep stays ~2.5 s. A sanity ceiling stops the doubling at 1024².
  Fill remains the one silent reveal.
- **No letterbox.** The canvas now spans the whole stage; the instrument
  column floats over its left edge as membrane (absolute, 190px, parchment
  at 0.9 opacity, wide screens only — narrow screens keep the stacked
  layout, which has no left tool region). The default view centres the
  greeting window in the glass right of the membrane; panned glass shows
  through the membrane faintly while the words and chips stay legible.
- **Found and fixed in passing: the greeting-view latch.** Embedded and
  slow-settling contexts report a transient tiny layout at load; the old
  code computed the default view from it once and latched. Until the child's
  first gesture (pan, zoom, wheel, arrows), every layout change now
  recomputes the greeting view; after her first gesture the view is hers and
  layout changes leave it alone.

## Geometry fixes

- **Constructions over the membrane.** The membrane's background was 18%
  opaque, so canvas marks showed through at ~82% — visually painting over
  the palette and words. Now parchment at 0.86: the world shows through
  translucently, the contents win (Interface Standard, principle 2).
- **Viewing-strip / colors-panel collision.** The tie row ("grid follows
  zoom") appearing under Numbers · map grows the How-this-works panel after
  the colors panel has been positioned below it. `updateNumbersControl` and
  the panel-list toggle now re-run `layoutPanelTools`, so the tools step
  down instead of colliding.
- **Postcard name field.** The save-note box now positions inside the
  parchment area of the export preview — offset past the rendered mat
  (30px at render scale) — never over the frame.
- **Undo skips viewing ops.** `undoOp` walks back past `numbers` ops and
  removes the most recent *mark*; the log keeps viewing ops for replay.
  Tap-in-empty-space after Show map removes the last mark and the map stays.

## Verification

Both labs exercised end to end in the browser at localhost, zero console
errors: multiply by tap and the reveal at every instance, Build by selecting
(no outline persists; keyboard outline appears on arrows with announcements),
Fill → 16² with honest gaps beyond → Continue? → 32² (17 arriving as clear
glass), Clear retiring Continue?, pan sliding glass under the membrane,
Geometry line/undo/Numbers cycle/Color panel/postcard preview.

**Safari:** attempted and blocked. `safaridriver` is present but Safari's
**Allow Remote Automation** (Safari → Settings → Developer) is off — a
security setting only Michael should enable; with it on, future sessions can
drive real Safari against the checklist. The page was left open in Safari on
the Mac for an eyeball. Nothing in today's changes touches Safari-sensitive
paths (the audio unlock is untouched), but the hands-on Safari/iPad pass
remains owed, as the board already records.

## Flagged for the controls pass (not fixed today)

- The compass letter **W** clamps to the window's left edge, which now sits
  behind the membrane. Lane 3's direction-indicator item owns this.
- The bottom-row pane numerals and the lattice's tick labels both number the
  x axis in Multiply — near-duplication Michael may want to look at when the
  controls pass reaches the axes.
- The canvas focus ring after a tap remains, as the Phase 4 ledger left it.
