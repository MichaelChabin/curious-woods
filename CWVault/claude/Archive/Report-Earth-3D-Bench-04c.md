---
status: Report — the fourth Earth bench revised a second time, on Michael's rulings on step 4b (Prompt-Revise-Earth-Bench-04c.md); built 28 Oct 2026 on 4719840; checked in the pane on the Mac; committed and pushed on Michael's word, 28 Oct
role: What was removed (NASA's sea, the grey shelf), what was put back (the coast at today), what was added (land lighter, the note on the picture); what was checked; what needs Michael's eye
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-04b.md, Prompt-Revise-Earth-Bench-04c.md, cw-deploys/js/3d/earth.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Lift-Oct28/ (the pictures)
updated: 2026-10-28
---

# Report: the Earth bench, step 4 revised again (28 Oct 2026)

**The spec first.** On the first pass `Spec-Earth-3D.md` still had step 4b's rule (NASA's sea at today), so I stopped
and said so. Michael put the corrected spec in the vault (12:30). It now says the land-only Blue Marble, over CW's own sea,
at every age, under *The ground*, and the buff for an uncovered shelf under *The sea*. What is built here agrees with it.
I wrote nothing in the spec.

Nothing a child sees changes: `globe.js`, `map.js`, `cw-style.js`, `scene.js`, `honest.js`, `still.js`, the Time Machine
and every story are untouched. The Time Machine and the Sun bench open with no console errors (checked).

## Michael's rulings, applied

- **Our sea, at every age.** Removed: NASA's sea at today, the change at the first step back (`NASA_SEA_TO`, `uNasa`),
  the second sea mask, the mask of which waters showed (`buildShowMask`), `setSea` / `seaMode` / `nasaSea`, the `sea`
  and `blueSea` options, the words *NASA's sea / our sea always* and `?sea=`. The sea's ball is our deeper blue only. Only
  one photograph is left, the land-only Blue Marble, and it no longer swaps.
- **The ocean pictures are gone.** `art/globe/blue-marble-sea-july-{8192,4096,2048}.webp` were removed with `git rm`; they
  stay in git's history (4719840). Nothing else read them (searched `cw-deploys/` and `tools/`). The land-only pictures
  stay. The bathymetry source in the ignored `_data/blue-marble-bathy/` is untouched. It was never committed.
- **The buff shelf.** The grey (`GREY0` / `GREY1`, `uShelfGrey`), `setShelf` / `shelf`, the words *buff shelf / grey
  shelf* and `?shelf=` are gone. What a lowered sea uncovers is the 2D's buff (`shoreLand`'s first stops), as step 4 built it.
- **The fine slider** stays as built, bench only.
- **The coast at today.** It is drawn at today again, at `COAST_A` 0.6, 1.5 CSS pixels wide, as everywhere this side of
  the seam. Past the seam it is as before.

## Land lighter (bench only)

A small slider under the fine one, labelled **land lighter**, from *as now* (0) to 100, with `?lift=0…1` for a link. It
calls `earth.setLandLift(v)`.

**How (a curve, not a flat add).** On Blue Marble's colour only, in display values:

- Y = the colour's luma (0.2126 R + 0.7152 G + 0.0722 B)
- Y′ = Y + k · Y · (1 − Y)³, with k = `LAND_LIFT_K` (2) × the setting
- the colour is multiplied by Y′ / Y, which is 1 + k (1 − Y)³, and clamped at 1

What that does:

- **Shadows and mid-tones lift most.** The lift is largest at Y = 0.25, the forests and shaded slopes. At full, a Y of
  0.10 goes to 0.25, 0.20 to 0.40 and 0.25 to 0.46.
- **Deserts barely move.** A Y of 0.60 (the Sahara is about there) goes to 0.68, and white not at all, so nothing glares.
- **Greens stay green.** The colour is scaled, not added to, so hue and the channels' proportions stay. Greens get
  lighter, not greyer.
- **The curve never reverses.** It only ever brightens, never swaps a lighter and a darker tone (true for k up to 4).

Only the photograph's colour is lifted. The sea test reads the picture as it is, so no coast moves. The fade to paint by
2.6 million years is unchanged: the lift rides on the photograph and fades out with it. The old ground, the paint, the
shelf, the ice and the sea are not touched. When Michael names a setting, it becomes a constant (`k` = 2 × the setting)
and the slider goes.

## The note under the globe

While the photograph shows (Blue Marble up, this side of the seam), the honest block's credit line now reads:

> The land: satellite pictures from July 2004, a month of them stitched together without clouds. NASA Earth Observatory

It replaces the short credit *NASA Earth Observatory* in the same small grey line. It goes on the kept picture too,
because `still.js` takes the block's credit. I put it in the credit line, not in `honest.js`, so the shelf is untouched.
It is one string, `SHORT_CREDIT.blue`, in the page, for Michael to adjust. The full credit under the bench (Reto Stöckli,
NASA Goddard) is the land-only picture's again.

## Checked, on the Mac in the pane (M1 Pro, Chromium)

Blue Marble, seed 1234, the 3D at 512 px left and `globe.js` right. The home view is lon 20, lat 15. *North Sea* is
lon 3, lat 55, at 1.7 radii (the 2D stays at its own zoom there). Thirteen small JPEGs (about 90 KB each) are in
`Earth-3D-Lift-Oct28/`:

| | as now | halfway | full |
|---|---|---|---|
| today, home | `today-home-lift0` | `today-home-lift50` | `today-home-lift100` |
| today, North Sea | `today-northsea-lift0` | `today-northsea-lift50` | `today-northsea-lift100` |
| 21,000 years (sea −121 m), home | `21000y-home-lift0` | `21000y-home-lift50` | `21000y-home-lift100` |
| 21,000 years, North Sea | `21000y-northsea-lift0` | `21000y-northsea-lift50` | `21000y-northsea-lift100` |

`gl-21000y-home-lift50` is the same picture on WebGL 2. It draws the same.

- **Our sea at today:** the deeper blue at both views. No NASA blues and no black.
- **The coast at today:** drawn, a thin dark line along the North Sea's coasts and round Britain (`today-northsea-*`),
  and on Africa's coasts at the home view.
- **The buff shelf at 21,000:** Doggerland a buff plain from Britain to the continent (`21000y-northsea-*`), the Persian
  Gulf and the Red Sea's shores buff (`21000y-home-*`).
- **The lift:** at halfway the Congo's forest and Europe's plains open up and the Sahara is nearly unchanged. At full
  the forests are clearly lighter and greener, and Britain and France read as green fields.
- **The slider:** `input` sets the lift (70 gives *70 of 100*), and `?lift=0.5` opens at halfway.
- **No console errors** on WebGPU or WebGL 2. Only the stamp's log appears.

`tools/check-deploys.sh` passes; the result is in the board's entry.

**Not checked:** the iPad. I did not measure a frame's cost. The lift adds a dot product and a few multiplies to the
land's shader, so I expect no measurable cost.

## What needs Michael's eye

1. **The setting for land lighter** (as now, halfway or full, or a number between them). At full, Europe's plains go a
   bright yellow-green that reads less like a photograph. Halfway is the setting I would try first on the iPad.
2. **The buff beside the lifted land.** At 21,000 years, the lighter the land, the closer it comes to the buff of the
   bared shelf. At full, Doggerland separates from France less sharply than it does at *as now*.
3. **The wording of the note** (above). It is one line in the page.
4. **The coast at today** over the photograph. It is the same 1.5 px line as at 10,000 years. It sits on the
   photograph's own coast, which is sharp, so close in it doubles the edge a little.

## Open, named and left open

- The wash over each piece's sea still shows the pieces' outlines as faint lighter polygons in the open sea at today, now
  that our sea is up there too (`today-northsea-*`: the lines across the North Sea and the Atlantic). This is step 4's
  open item. It is more visible at today than before, because NASA's sea used to cover it.
- The gaps between pieces, and the −200 m line not drawn: as step 4b left them.

## Files

- `cw-deploys/js/3d/earth.js`: NASA's sea and the grey removed, as listed above. `LAND_LIFT_K`, `uLandLift`,
  `liftLand`, the `landLift` option and `setLandLift` / `landLift` added. The coast at today. The header updated.
- `cw-deploys/experiments/earth-3d.html`: the two pairs of words gone and the *land lighter* slider added, with
  `?lift=` and `cwSetLift`. The credit line for the honest block. The readout names the lift. The stamp is
  `2026-10-28 4719840 · earth-3d step 4c`, `earth.js` at `?v=2026-10-28m`.
- `cw-deploys/art/globe/blue-marble-sea-july-{8192,4096,2048}.webp`: removed.
- `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`, `CWVault/00-BOARD.md`: the entries.
- `CWVault/claude/Earth-3D-Lift-Oct28/`: the pictures. `Prompt-Revise-Earth-Bench-04c.md`: a status line.
