---
status: Ready for build — assembled 2026-08-13 from the closed controls walk
role: The build brief. Everything the controls pass decided, ordered for execution.
authority: Decisions-Controls-Aug12.md (the ledger) · Spec-Interface-Standard-v2-Aug09.md (the standard)
scope: active/glass-geometry.html · active/glass-multiplication.html · possibly js/cw-panel.js
---

# Controls build — brief

The walk is closed; every decision below is settled and cited to its ledger section.
Nothing here is open for redesign during the build. Anything found in the code that
contradicts a decision gets reported, not silently accommodated.

**Standing obligations for this build:** every changed or added child-facing string
prints the complete current list — both labs — in the review summary. Safari is on
the acceptance checklist. `MANIFEST.md` and `00-BOARD.md` update in the same commit
as any file change. Session ends with `git status`, reporting anything untracked.

---

## 1. Two panel components (ledger §1)

**Choice panel.** Opens on an occasional act; presents outcomes as words, each with
one recipe line (11px Georgia italic, reduced opacity, per the standard §2); takes
one choice and fades. Movable and closable like any panel. Never lingers after the
choice.

**Tool panel.** Summoned by a membrane word; stays until the child closes it; never
fades. Opens in the same place every time; a moved position is remembered (§4).

Panel open/close is not logged and not undoable (§4). If extraction to a shared
component is warranted, `js/cw-panel.js` is the existing home — extend, don't fork.

## 2. The Save panel (§2, §12)

The word **Save** opens one choice panel (replacing the save-type and image-size
dialog chain):

> **Save construction** — *a file you can open and keep working on*
> **Postcard** — *a picture to send*
> **Full sheet** — *a picture to keep*

- **Postcard renders 1200×800** and goes to `navigator.share` (existing fallback:
  download + toast). It IS the share action; there is no Share word anywhere (§12).
- **Full sheet keeps the 300dpi render (1800×1200)**, download as today.
- **Save construction** keeps today's flow (name/note box, localStorage + `.json`
  export) — build note: offer the `.json` through `navigator.share` where available,
  download otherwise.
- The note box and export preview follow the choice as today.
- Strings above are drafts; the voice pass may change them. Print at review.

## 3. The work-in-progress guard (§5)

One choice panel, guarding **New**, **Open**, and — new — **the `.json` drop onto
the canvas** (closing the Phase 2 gap):

> **Save this first** — *then start a new construction*
> **Start a new construction** — *and forget this one*
> **Keep working** — *on this one*

Auto-keep of unsaved work was considered and rejected (§5); do not implement it.

## 4. Replay Cancel (§6)

The cancel dialog becomes the same choice-panel species:

> **Start over** — *a blank window*
> **Continue from here** — *keep what's built and make it your own*
> **Keep watching** — *the replay goes on*

## 5. The color panel becomes a tool panel (§3)

- Gains a close (the panel word pattern, "close" top-right like other panels).
- **"Color" in How-this-works summons it.**
- **Return visits: never auto-opens.** (Remove the current open-on-return.)
- First visit: may open uninvited once, at the first moment colour is relevant, and
  never again uninvited.

## 6. Titles are facts; acts get words (§13)

- The palette title ("Chartres") stops being tappable; **Choose new colors** is the
  one way to the picker.
- The model panel title ("Nested Squares") likewise stops being a control; give the
  chooser its own word if one is needed (smallest honest word, printed at review).

## 7. Numbers becomes Show map ↔ Hide map (§10)

- The three-state cycle and the word "Numbers · <state>" are gone. One
  destination-named toggle word: **Show map** when hidden, **Hide map** when shown.
- Earned numbers belong to the points and render whenever the map is hidden (the old
  'points' behaviour becomes the map-off state). "No numbers at all" is Just the
  glass's job, not a numbers state.
- The logged `numbers` op's vocabulary shrinks accordingly; **replay of old logs
  maps the three historical values** (map → shown; points/off → hidden) — one-line
  migration, test with a saved pre-build log.

## 8. The lattice tie (§11)

- **Geometry: remove the tie control entirely.** The grid keeps its step, always.
- **Multiplication: tied (follows zoom) as its default** — unchanged behaviour, no
  new control.
- Re-stepping-as-construction at deep zoom is benched, not built (§11).

## 9. Just the glass (§9)

- The dormant `showGlass` flag gets its word: a destination-named viewing toggle,
  **Just the glass** when showing the making, **Show the making** when showing just
  the glass. Lives in the viewing strip.
- It is a viewing change: logged (replay reproduces it), skipped by undo, per the
  standard. Verify it hides lattice, construction lines and points; glass, lead and
  labels remain.

## 10. Conditional presence for the action row (§14)

- **Empty canvas: only Open.** Work exists: **New, Open, Save.** Words fade in and
  out per the Marauder's Map timing (UI-Language).
- The "nothing to save yet" toast is removed — Save is simply absent when it would
  say that.

## 11. Multiplication propagation (§12, §14, §10)

- Gains the conditional action row and the full Save panel (§2) — its save/share gap
  closes with Geometry's machinery, one grammar in both labs.
- Its Numbers control becomes the same **Show map ↔ Hide map** pair (its default
  remains map-shown).
- The map reveal (§8 of the ledger) is NOT in this build — it waits on its bench.

## 12. Order of work (suggested)

1. Choice-panel component (extend cw-panel.js or sibling); build the WIP guard with
   it; route New, Open, and the drop through it.
2. Save panel + postcard resize + share paths.
3. Replay Cancel onto the component.
4. Color panel: close, summon, first-visit rule.
5. Show map ↔ Hide map + numbers-op migration; remove Geometry's tie.
6. Just the glass.
7. Conditional presence; kill the toast; titles-are-facts.
8. Multiplication propagation.
9. Full string print, both labs; Safari + iPad checklist; MANIFEST + board; git
   status.

## Acceptance

- No bare dialog remains on either surface; every multi-outcome act opens a choice
  panel with recipe lines.
- Nothing is ever greyed out or toast-blocked; absent means absent.
- Old saved logs replay correctly (numbers-op migration; mirrored-render caveat
  stands as known).
- Zero console errors, Safari included. Postcard share verified on iPad; construction
  file round-trips (export → drop-load on a second device/profile).
