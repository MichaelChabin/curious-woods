# Handoff — Glass Multiplication v2.1b (for Claude Code)

**Read first:** `CWVault/01-ACTIVE/Decisions-GlassMult-Jul28.md` (why), then
`CWVault/20-SPECS/Spec-Glass-Multiplication-v2.md` (the standing spec). This note is
implementation guidance for one batch of three changes.

## Files
- **Modify:** `cw-deploys/active/glass-multiplication.html`. (Formerly
  `cw-deploys/glass-multiplication-v2.html`; the deploy folder was reorganised and
  active files no longer carry version numbers — see `cw-deploys/MANIFEST.md`.) One
  self-contained HTML file: inline CSS/JS, no external assets. Keep it that way.
- **Reference:** `cw-deploys/experiments/number-theory-v1.html` — the visual reference
  for v2.2's grid and axis rendering. Not part of this batch, but worth a look before
  touching the construction SVG.
- Add a `<style id="v2-1b-style">` block after `v2-1-style` for CSS overrides. Do not
  rewrite earlier blocks; append and override, as previous batches did.

## Not in this batch
16×16 and the primes 11/13, the Map Size control, the map around zero, story panels,
the shared viewport module. All of those are v2.2 or later.

---

## 1. Empty panes: no glass, and real came

**Intent.** An empty aperture is a number *not yet made*, not uncoloured glass. The
parchment and the background construction show through it. Glass arrives only when the
child builds a number.

**The trap.** There is currently no lead object in the build. `.grid` has a dark
background (`var(--leading)`) and the cells sit on it with a 2px gap, so what looks
like came is background showing through. Make the cells transparent and that background
floods every aperture — the whole table goes dark. The came must become a drawn thing.

**Do this:**
- `.grid` → `background:transparent; gap:0; padding:0`. Cells butt against each other;
  no gaps to leak through, and no doubled lines at interior joins.
- Add a came overlay inside `.board`, above the cells, `pointer-events:none` (the cells
  must keep catching clicks — nothing sits behind the apertures and nothing needs to).
  An absolutely-positioned SVG sized to the grid is cleanest: 11 vertical and 11
  horizontal lines at the cell boundaries, plus a perimeter. Interior stroke ~2.5px,
  perimeter ~4px, colour `var(--leading)`. Width is then independent of layout, which
  matters when panes shrink in v2.2.
- `.cell` (unbuilt) → `background:transparent`. Remove the green
  `linear-gradient(155deg,rgb(201,218,196),…)` from `v2-a-style` by override.
- `.cell.built` keeps `background:var(--leading)` — glass still needs its dark backing.
- **Unity pane:** `.cell.clear.built` keeps its radial gradient. Verify by eye that it
  still reads as *built* against empty neighbours; it is the one pane that has to say
  "something is here and it happens to be colourless." Nudge its contrast if needed.
- **Selectable edges:** `#glass-map.selecting .cell.edge:not(.built)` currently tints
  the green. With no green to tint, replace with a faint warm wash over the parchment
  (a low-alpha ink fill), and keep the hover state one step stronger. The edge panes
  must still read as the things you can tap.
- The construction SVG already draws faint cell-boundary gridlines at z-index 1 beneath
  the board. Once the apertures are transparent these show through, which is the point
  — spec §1.5, clear but not dominant. Check the two don't visibly disagree by a pixel;
  both derive from `grid.getBoundingClientRect()`, so they should align.

---

## 2. Build with primes: let the number grow

**Intent.** No "=" key and no timing. Tapping 2 then 3 gives 6, then 5 gives 30. Every
intermediate stays on the glass, and every one of them is a divisor of where she ended.

**The bug.** `addPrime()` auto-commits: as soon as `productCells(n)` contains an unbuilt
cell it calls `revealNumber(n)` and then `composition=[]`. The reset is why 2 then 3
can only ever give 2.

**Do this:**
- Keep `composition` across taps. Push the prime, compute `n`, `setProduct(n,composition)`,
  reveal `n`. Do **not** clear `composition`.
- **Reset** on: tapping the unity pane (1,1), tapping the new unity chip, `Clear`, and
  mode change. `setProduct()` with no args, `composition=[]`.
- **Overflow.** If `n` has no cell on the map, do not commit the tap — leave
  `composition` as it was, sound the existing `softMiss()`, and set the readout to
  "That number continues beyond this window." The soft whoosh is deliberate and is
  **not an error tone** — it means "well, that didn't work," nothing more. Do not
  replace it, sharpen it, or add any error styling alongside it. Keeping state
  consistent with what the glass can show is worth more than letting the number run off
  the map. (Judgment call; flag it if it feels wrong in use.)
- `hasReachableEmpty()` existed only to serve the auto-commit logic. It can go.
- Already-built numbers are no longer a special case: if 6 is already on the table,
  tapping 3 after 2 simply re-reveals it and the composition continues.

---

## 3. Unity chip, running total, and raising the chips

- Add a **1 / unity chip** to the left of the 2 chip in `.decoder`, styled like the
  others but rendered as clear glass — reuse the `.cell.clear.built` radial gradient so
  it matches the origin pane. Tapping it resets the composition to 1.
- Show the **running total** near the chips: the current composition as
  `1 × 2 × 3 = 6`, in the readout or a small line directly under the chip row.
  Michael's call on placement once he sees it.
- **Raise the chip row.** It currently sits below a 268px-min-height properties panel
  and there is little vertical room left underneath for modes and future controls.
  Move the decoder above the properties panel, or drop the panel's min-height so the
  chips float up. Six chips are coming in v2.2, so leave the row able to wrap without
  pushing anything off-screen.

---

## 4. Compass labels

**Intent.** The map has directions even when only one quadrant is drawn. This is the
same claim the axes already make by running past the glass with ticks and an "11" out
there: the window is small, the map is not. Labels go on now, not with the
four-quadrant map later.

**Do this:**
- Add **N, E, S, W** to the construction SVG (`v2-construction-script`, in the
  `c-persist` group alongside the existing `beyond` labels), at the four ends of the
  drawn axes: E at the right end of the x-axis, W at its left end past the origin, N at
  the top of the y-axis, S at its bottom end past the origin.
- W and S point into territory that exists and is not drawn. That is the point. They
  are not errors and need no explanation in the UI.
- Style: discreet. Reuse `.c-beyond` (italic 12px Georgia, low-alpha) or a sibling class
  at similar weight. Smaller than the numerals, never competing with the glass.
- Ensure the plane's padding leaves room. The axes already extend `0.75 * cell` past
  the grid and the plane has 54/72/98/98 padding, so there should be space — but check
  that the labels are not clipped, and that enough of the underlying construction is
  visible around them for the direction to read as a property of the *map* rather than a
  decoration on the board.
- These are drawn once per map size, so they must survive the `draw()` redraw on resize.

---

## Acceptance checklist (verify in a browser)

- Empty panes show parchment and the faint construction lines through them; no green.
- Came reads as continuous lead; no doubled lines at interior joins; no dark flooding.
- Clicking anywhere on a pane still selects it — the came never eats a click.
- The unity pane reads as built and colourless against empty neighbours.
- In Multiply, the bottom row and left column still read as selectable with Show
  Numbers off.
- Build with primes: 2 → 2, then 3 → 6, then 5 → 30, each revealed at all instances,
  intermediates left standing.
- Tapping the unity pane or the unity chip resets to 1; Clear resets; switching modes
  resets.
- A tap that would leave the window is refused with the "beyond this window" message
  and the soft whoosh — which still sounds like a shrug, not an error — and the
  composition is unchanged.
- N, E, S and W are legible at all four axis ends, unclipped, and clearly subordinate to
  the glass; they survive a window resize.
- Fill is still silent; every other reveal still sounds; still one sounding per number,
  one tone per prime factor, no trailing chord.

## Deploy
`git add cw-deploys/active/glass-multiplication.html && git commit -m "Glass Multiplication v2.1b" && git push`
→ live under `https://curiouswoods.netlify.app/` at whatever path `active/` now serves.
