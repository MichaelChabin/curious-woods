# Handoff — Glass Multiplication v2.1 build (for Claude Code)

**Design brief:** read `CWVault/20-SPECS/Spec-Glass-Multiplication-v2.md` first — that
is the source of truth for what to build. This note is just implementation guidance.

## Files
- **Modify:** `cw-deploys/glass-multiplication-v2.html` (the working file). It already
  has Batch A/B/C built. **Batch A appearance stands — do not redo it.** v2.1 reworks
  the modes and the selection mechanism (see spec); it supersedes the Batch-B/C
  structure where they conflict.
- **Reference (frozen, don't touch):** `cw-deploys/glass-multiplication.html` (v1).
- One self-contained HTML file: inline CSS/JS, no external assets. Keep it that way.

## Reuse the existing engine — don't reinvent
- **"Reveal a number"** is essentially the existing `fillProduct(n)`: it marks every
  instance built, shows the origin rectangles via `frame()`, and plays the tones. Build
  the new modes on top of this, don't rewrite it.
- **Sound:** `notesFor()` uses the octave arc `[0,4,7,12,12,7,4,0]`, and `playFactors`
  plays **one tone per prime factor with NO finale chord** (a recent fix — do not
  re-add a trailing chord; that reintroduces the extra-tone/dissonance bugs). Sound
  once per distinct number.
- **`frame(width,height)`** draws an origin-anchored rectangle — reuse it for the drag
  rectangle and for showing all instances.
- **Cells:** a `cells` Map keyed `"row,col"`; each cell button has
  `dataset.product / row / column` and pre-built prime `.inner` pieces revealed by the
  `.built` class. Reveal = add `.built` to the target cells.
- Appearance overrides live in `<style id="v2-a-style">`; the construction reveal in
  `<script id="v2-construction-script">` (plays on-demand only, via the "rebuild" link).
- No persistence (`load`/`save` are no-ops). Prime colours reassigned via CSS vars
  (5=red, 7=green); empty glass is opaque `rgb(194,212,188)`.

## The main structural moves
- **Selection:** remove/repurpose the absolutely-positioned axis-numeral buttons
  (`.axis-key`, values 0–10). Selection now = tapping the **edge panes** (row 1 = bottom,
  column 1 = left), which already read 1–10. Keep those edge panes showing 1–10 in the
  selecting modes even when Show Numbers is off.
- **Top bar:** add **Multiply** mode; rename Families→**Properties** (intrinsic sets
  only); move Rows&Columns, Multiples, Diagonals into **Build**; split Diagonals into
  **↗ (constant difference)** and **↘ (constant sum)**.
- **Multiply:** tap-two-panes AND drag-a-rectangle coexist (distinguish tap vs drag by
  pointer movement). Drag rectangle anchored at origin, far corner follows freely.
- **Globals** (Fill / Clear / Show⇄Hide Numbers): left-justified group at the top of the
  left column, above the info block. Retire "Start Over" (Clear replaces it). Move Show
  Numbers out of the modebar.
- **Clearing model:** mode-entry sets the table (Multiply/Build/Properties clear,
  Explore fills); within a mode everything accumulates; only Clear/Fill reset.

## Acceptance checklist (verify in a browser)
- Mode entry: Multiply/Build/Properties clear; Explore fills (silent).
- Axis numerals gone; tapping bottom/left panes selects; those panes show 1–10 with
  Show Numbers off.
- Multiply: tap bottom then left → factors reveal in succession, then product at ALL
  instances (all rectangles). Drag from an edge pane → same, with a live rectangle.
- Build tools accumulate; switching tools doesn't clear; Clear empties (keeps unity).
- Properties: each set reveals all instances, colour + sound, one sound per number.
- Diagonals ↗ = difference, ↘ = sum; both persist.
- Fill is silent; every other reveal sounds. Show⇄Hide toggles the pane numerals.

## Deploy
Commit and push the one file; Netlify builds automatically:
`git add cw-deploys/glass-multiplication-v2.html && git commit -m "Glass Multiplication v2.1" && git push`
→ live at `https://curiouswoods.netlify.app/glass-multiplication-v2`.
