---
status: Current
role: Session ledger — the controls walk begins; two panel species named; Save/Share and Color settled in principle
date: 2026-08-12 (evening) — continued 2026-08-13 (morning)
brief: Walk-Controls-Geometry-Aug12.md · Spec-Interface-Standard-v2-Aug09.md
---

# Decisions — controls walk, first session

The walk opened at Save, as the brief proposed. The first finding was structural rather
than local: the surface has been using one panel idea for two different jobs. Naming the
two species settled Save/Share and Color in the same stroke, and the pattern is expected
to carry to Multiplication and beyond.

---

## 1. Two panel species, named and ruled

**Choice panels** serve occasional acts — Save, New, the replay Cancel. One opens,
presents its outcomes as words, each beside one quiet recipe line; it takes one choice
and fades. A choice panel never lingers after the choice; lingering is clutter, not
commitment.

**Tool panels** are working surfaces — the color panel today, a prime toolbox in
Multiplication tomorrow. A word in the membrane summons one; it stays while the child
works in that register; she closes it when she is done. Persistent *by her choice*,
never fading. The standard's "a moved panel is a commitment" generalizes: **an opened
toolbox is a commitment.**

The grammar in one line: *the membrane holds words; words summon panels; choice panels
decide and fade; tool panels work and stay until closed.* This passes §6's test — a
child cannot learn it in one lab and be wrong about it in another.

## 2. Save/Share becomes one choice panel

The built chain — **Save Construction / Save as Image** then **Postcard / Full sheet**
then the note box — flattens into a single choice panel. The record/artifact
distinction the standard names (§2, two saves everywhere) is what the first dialog was
groping at; the recipe lines now carry it. Draft words, pending the voice pass:

> **Save construction** — *a file you can open and keep working on*
> **Postcard** — *a picture to send*
> **Full sheet** — *a picture to keep*
> **Share** — *send a copy to someone*

One tap chooses; the note box follows as today. **Share rejoins the surface** — the
walk found a complete share path in the code with no word invoking it. Whether the
summoning word stays "Save" or becomes something honest about containing Share is a
walk item still open; the strings above are drafts and the full child-facing list
prints at review when this is built. *(Superseded 13 Aug: Share dissolves into the
postcard — the panel is three words, and no Share word exists. See §12.)*

## 3. Color becomes a summonable tool panel

The color panel gains a close, and "Color" — already a word in How-this-works — becomes
the word that summons it. Michael's own practice argued this: construct first, colour
all at once. That is "the geometry is the foundation; glass is a visual layer" lived as
a workflow, and the unclosable panel was forcing colour into view during construction.

- **Return visits no longer auto-open the panel.** Today it opens itself on every
  return; that is the app choosing the child's focus for her. Removed.
- **First visit keeps its one teaching moment:** the panel may open uninvited once, at
  the first moment colour becomes relevant, per first-visit-as-teacher — and never
  again uninvited after that.

## 4. Edges settled with the species

- **Panel open/close is not logged and not undoable** — a transient view preference,
  the lattice tie's precedent. Undo touches marks; panels are neither marks nor
  viewing ops.
- **A summoned panel opens in the same place every time.** If the child moves it, the
  moved position is remembered — the commitment rule extended to position.

## 5. The work-in-progress guard, in Michael's words

The guard becomes a choice panel; every word now names its destination. Michael's
phrasing, split as word + recipe line (drafts until the voice pass):

> **Save this first** — *then start a new construction*
> **Start a new construction** — *and forget this one*
> **Keep working** — *on this one*

**The same panel guards New, Open, and the `.json` drop** — closing the gap found in
the Phase 2 sweep, where dragging a construction file onto the canvas silently
replaced unsaved work while New and Open both asked first.

**Considered and rejected, deliberately:** auto-keeping unsaved work as unnamed
constructions so the guard could disappear (nothing lost, nothing to guard). A
library of unnamed files is clutter and a bad model of caring for your work.
Recorded so the door stays closed on purpose, not by forgetting.

## 6. Replay Cancel joins the species

The same panel form, tapped mid-replay:

> **Start over** — *a blank window*
> **Continue from here** — *keep what's built and make it your own*
> **Keep watching** — *the replay goes on*

Reduction to two was considered and declined: Start over stays, as fewer steps for a
busy kid.

## 7. Lattice crossings are the lab's own promise, kept

The standard's open question on minting's reach (§8.7) is answered from the walk: **any
tool can start from a lattice crossing, and using one mints it in passing** — the
`lattice_point` op recorded before the tool's own op, so replay stays honest. The
argument is the lab's founding rule applied to the map: *intersections are detected
automatically and immediately usable*, and the lattice is a set of intersections.
Multiplication's fractions depend on this — start at a crossing, draw the line through
zero.

## 8. The map constructs itself — once per session

The map is a construction, and a toggle makes it feel free, like weather. Michael's
resolution: **the first time each session the child asks for the map, the visible
window assembles itself by compass and straightedge** — legible first steps
(perpendicular, transfer the unit), accelerating as the numbers grow, about five
seconds, the world staying live beneath it. Later toggles in the same session are
instant. Session after session she doesn't just learn *that* the grid is a geometric
construction — she accumulates a reasonably good idea of *how it was done*, without a
word of instruction. Because the reveal covers whatever space shows, no two sessions
replay identically; it resists becoming a splash screen.

**Bench first, per the standing method:** the duration, the acceleration curve, the
length of the legible phase, and whether a tap skips ahead (skippable risks
always-skipped) are perceptual questions. A small `experiments/` page with knobs
settles them by looking.

Considered context, recorded: Euclid could have constructed the grid — every lattice
point is compass-and-straightedge constructible — and did not; coordinates waited
roughly two millennia for Descartes. That story is seeded as
`03-SEEDS/the-map-euclid-never-drew.md` and may also become a canonical construction
in the picker ("the grid, built by hand").

## 9. "Just the glass" — the finished-window viewing

Michael: fill the glass and hide the map — *we need to be able to do that.* Two
findings settle where this lives:

- **The export already behaves.** The postcard render draws fills, lead and the note —
  no map, no construction lines, no points. Nothing to add to Save as Image; the gap
  is in the live view only.
- **The live view's flag already exists and is unreachable.** `showGlass` suppresses
  both the lattice and construction lines when true, and nothing on the built surface
  ever sets it — the walk's second complete-but-unreachable path, after Share.

So the need is one destination-named viewing toggle, candidate words pending the voice
pass: **Just the glass** ↔ **Show the making**. It is a viewing change: recorded in
the log so replay reproduces what she saw, skipped by undo, per the standard.

Noted in passing, Michael on the map and the purists: geometry with a map is more fun
than without, and the traditionalists' objection is answered by the reveal itself —
the map is not a cheat here; it is a construction the lab demonstrably performs. The
emergent numbering (points mode) keeps numbers earned; the map stays a choice.

## 10. The three-state cycle dissolves — Michael's simplification

A choice panel for Numbers (Map · Points · None) was proposed and is withdrawn as
over-built. Michael's dissolution: **the map is one thing.** Turning it on has no
effect on what was made before; turning it off has none either. Constructions persist
regardless, and points that carry numbers keep them — the earned numbers were never a
mode, they belong to the points. So the control is:

> **Show map ↔ Hide map** — destination-named, one tap, no panel.

"No numbers at all" already has an owner: **Just the glass** (§9). The old cycle was
doing two jobs; each now has its own word. This answers the standard's deferred
question (§8.3, name the next stop or reduce three to two): reduced, with a reason.

**Build notes, recorded now:** old saved logs carry the three-valued `numbers` op —
replay needs a one-line mapping. And if a construction dense with minted points ever
feels cluttered by its own numerals, the answer is per-viewing defaults, not a third
state. **Propagation:** Multiplication's Numbers control becomes the same word pair;
one grammar in both labs.

The lattice tie's fate: resolved in §11 — Geometry loses the toggle entirely.

## 11. The tie is per-viewing — and Geometry has no toggle

Michael's unease, found principled: a tied grid quietly mints finer lines nobody
constructed every time the zoom crosses a decade — the map-as-weather problem again,
one level down. The similarity argument (a finer lattice is the same construction
re-run) does not rescue it: same-construction-re-run is still a construction; the
unit was *declared*, and tenths of it are cheap to construct but not free.

**Decided:**
- **Multiplication: grid follows zoom**, as its default. There the tie is honest —
  resolution is the subject; panes are keyed by number; "how fine" is a
  multiplication question.
- **Geometry: the grid keeps its step, and there is no toggle.** The map she watched
  being constructed is the map. Zoom in and its lines spread like any drawn thing
  seen closer; a made thing behaves like a made thing.

This dissolves the walk's last state-word problem — the tie word leaves Geometry's
surface entirely, and nothing remains to name.

**Named question for the map-reveal bench:** zoom far enough and an untied grid goes
useless. The candidate answer is the reveal's own machinery — when the child zooms
past the grid's usefulness, the finer grid *constructs itself*, visibly: resolution
earned on camera rather than minted from nowhere. Whether that is lovely or maddening
on every decade crossing is a look-at-it question. The conservative version — the
grid simply keeps its step — is coherent and shippable without it.

## 12. Share dissolves into the postcard — resolved 13 Aug, morning

Share was found unreachable (§2 put it back as a word in the Save panel draft). A
separate Share word — even a separate Share panel — was considered overnight.
Michael's morning resolution deletes both: **tapping Postcard shares it.** The recipe
lines had already assigned the meanings — postcard, *a picture to send*; full sheet,
*a picture to keep* — so a Share word was a duplicate of Postcard's own line. The
panel stays three words about three destinations:

> **Save construction** — *a file you can open and keep working on*
> **Postcard** — *a picture to send*
> **Full sheet** — *a picture to keep*

**Sizes settled with it.** Screens ignore the DPI tag and paint raw pixels — the
300dpi render that prints beautifully displays enormous in an email. So: **Postcard
renders at 1200×800** (postcard-at-screen-size, doubled for retina; a few hundred KB)
and goes straight to the share sheet, download fallback where sharing is unavailable.
**Full sheet keeps the 300dpi render (1800×1200)** — the one she prints and does what
she likes with. Kept version for keeping, sent version for sending.

**The construction's sendability needs no new word either.** Save construction
already exports the `.json` file, and on iPad the OS sheet is where saving and
sending both live. Build note: offer the construction file through `navigator.share`
where available, download otherwise — the postcard's own pattern. The receiving child
opens it as a copy (the standing rule) and makes it her own; the social loop closes
with zero added surface.

**Flag for the voice pass:** the panel's summoning word is still *Save*, and the
panel now contains a send. The recipe lines carry the meaning; whether the word
should too is a voice question, not a structure question.

## 13. Titles are facts; acts get words — 13 Aug, morning

The palette-name cue dissolved on inspection: it was never a cue problem, it was a
redundancy. "Chartres" (tappable, opens the picker) and "Choose new colors" (opens
the same picker) were two controls for one act, and only one of them says what
tapping does. Resolved: **the title stops being a control.** The palette name is a
fact — the name of what is loaded; "Choose new colors" is the one way in, already
correctly named. The same rule covers the model panel's title ("Nested Squares"):
**titles are facts; acts get words.** Nothing is secretly a button.

## 14. Conditional presence — the Marauder's Map, applied literally

Where do the occasional acts live? Not in a menu. **The words stay in their row, but
only when tapping them would do something:**

- **Empty canvas: only Open shows.** New is irrelevant — the canvas already is new —
  and Save has nothing to save.
- **Work exists: New, Open, Save all present.**

Residence becomes conditional presence — which is what "no permanent residence"
means once it stops being read as "hide them behind a menu." The "nothing to save
yet" toast dies with this (it was a disabled state wearing a trench coat). A
first-visit child on an empty canvas sees exactly one act available.

**Propagation:** Multiplication inherits the same conditional row — it currently has
no save word at all (the known gap), and §12's three-word panel comes with it.

---

## The walk is closed — 13 Aug, morning

Every item from the brief is decided, confirmed-as-conforming, or explicitly
benched. Fourteen sections above; the build brief assembles them for execution.
Benched: the map reveal's timing and skip behaviour, and re-stepping-as-construction
(§8, §11). Flagged to the voice pass: every draft string in this ledger, the
summoning word "Save" (§12), and the state of the How-this-works copy generally.
