# Spec — Glass Multiplication (v2.1 restructure)

Status: Consolidated build brief. July 26 2026.
Baseline: `cw-deploys/glass-multiplication.html` (v1, frozen).
Working file: `cw-deploys/glass-multiplication-v2.html`.
Current file state: v2 with Batches A/B/C built (appearance, build sub-modes,
families). **This v2.1 restructure supersedes the Batch-B/C structure where they
conflict** — it reorganises the modes and the selection mechanism. Batch A
(appearance & sound) stands as-is.

---

## Core principle
The whole interactive is multiplication. The "times table" is a small window
(first quadrant, 10×10) onto the number plane, where symmetry, factorisation, the
primes, and several number families all surface at once. Multiplication = area:
every product is a rectangle, and a product that appears more than once shows **all**
its rectangles together (5×3 and 3×5 are the same area in two orientations).

## Reveal — the atomic action
"Reveal a number" = fill every cell where that product lives with its prime-colour
glass, and play its prime tones **once**. Used by Multiply, every Build tool, and
Properties.
- Sound: one sounding per distinct number, as all of its instances appear. Pace by ear.
- Always show **all instances** (a×b and b×a), never just the diagonal — symmetry is
  the payoff.
- **Fill the table** is the silent exception (no sound).

The light interior-outline "highlight" (an earlier misreading of the word) is **not**
used by Properties/Build anymore, but kept in the code as a reserve — likely useful
later as a transient "this one is sounding now" marker.

---

## Top bar — modes
`Multiply · Build · Explore · Properties`   (Factoring, Division, … later)

### Mode-entry table state
- Multiply → clears
- Build → clears
- Explore → **fills** (silently)
- Properties → clears

Within a mode, tools and selections **accumulate** (layer). Only mode-entry and the
global **Clear**/**Fill** reset the table. (This revises Batch B's "each sub-mode
clears.")

### Multiply
The namesake. Two gestures coexist, no sub-toggle:
- **Tap** a bottom pane, then a left pane → reveal each factor pane, then reveal the
  product (all instances). Mirrored if the left pane is tapped first.
- **Drag Multiplication:** grab any bottom-row or left-column pane and drag. The
  rectangle is **anchored at the origin**; the dragged corner follows the pointer
  freely (up/down and left/right), snapping to panes — start at 5 and end anywhere.
  Live: rectangle + running product. On release, reveal in succession (colour +
  sound): the bottom factor, the left factor, then the product at all its instances
  (so all its rectangles light together). Factors re-light even if already on the table.
- Accumulates (leaves the numbers up). Clear resets.

### Build
Blank on entry. Tools:
- **Build with primes** — tap a prime to multiply it into the current number. [v1 behaviour kept; accumulation quirk still open, see below]
- **Build by selecting** — tap an empty pane to reveal that number.
- **Rows & Columns** — tap a bottom pane → reveal that column's line; tap a left pane
  → reveal that row's line. Persists.
- **Multiples** — tap a bottom or left pane → reveal all multiples of that number
  (every cell whose product is divisible by it). Persists.
- **Diagonals ↗** (constant *difference*, parallel to the squares diagonal) — tap any
  pane (edge ideal) → reveal the whole ↗ diagonal through it. Persists.
- **Diagonals ↘** (constant *sum*, the anti-diagonal) — tap any pane → reveal the
  whole ↘ diagonal through it. Persists.

All Build tools accumulate; switching tools does not clear; Clear resets.

### Explore
Fills on entry (silent). Tap a number → factorisation, rectangles, sound. [existing]

### Properties  (renamed from Families)
Intrinsic number-property sets. Clears on entry; selections accumulate.
Squares, Pronics, Powers of 2, Powers of 3, Triangular, Nearly-square (k²±1).
Selecting one reveals every instance of its members, colour + sound, in succession.

---

## Globals — table/view actions
A small left-justified group at the **top of the left column, above the number-
properties block** (separate from the mode row; may wrap to two lines — fine):
- **Fill** — build the whole table, silently. Always available.
- **Clear** — empty to blank (keep the unity cell at the origin), stay in the current
  mode, leave the Show-Numbers toggle as-is, drop any highlights. Replaces "Start Over".
- **Show Numbers ⇄ Hide Numbers** — toggle the product numerals on all panes (moved
  out of the modebar). It is a toggle with an on/off state; Fill and Clear are one-shot.

The mode row stays free to grow (Factoring, Division, patterns not yet named).

---

## Selection mechanism
**Disable the small coordinate-plane numerals** (the 0–10 on the axes). All number
selection now happens by tapping the big **bottom-row / left-column panes** (which
already read 1–10, since row 1 × c = c and r × column 1 = r).
- In any mode where you select by tapping edge panes (Multiply, and Build's
  Rows/Columns, Multiples, Diagonals), the bottom row and left column **show 1–10**
  even when Show Numbers is off, so a child can choose.
The plane keeps its axes, gridlines, and the on-demand construction reveal.
Why: the numerals were too small to tap, sat on only two sides, and kids expect
bottom × left.

---

## Settled decisions
- Multiples lives in **Build** (it's parameterised by a tap, unlike the intrinsic Properties).
- Multiply **accumulates** (leaves numbers up).
- Edge panes show 1–10 for selection regardless of Show Numbers.
- Drag Multiplication **coexists** with tap inside Multiply (not a separate button).
- Diagonals: **↗ = constant difference, ↘ = constant sum.**
- Reveal shows **all instances**; sound **once per number**; pace by ear.
- Drag rectangles are always **anchored at the origin** (area = product); all instances shown together.

## Parked
- "Multiply" may later be lifted out to sit prominently on its own (teachers treat the
  times-table as sacred).
- Follow-on interactive: **The Large Number Plane** — see `99-IDEAS/Interactives.md`.

## Open (low priority)
- Build-with-primes accumulation (tap 2 then 3 builds 2 and 3, not 6) — left as v1 for now.
