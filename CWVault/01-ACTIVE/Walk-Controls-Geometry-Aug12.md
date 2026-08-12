---
status: Brief — written 2026-08-12 for the controls-pass opening walk
role: Every control on Glass Geometry as built, with the questions the Interface Standard asks of each
brief: CWVault/01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md
---

# Controls walk — Glass Geometry

The controls pass opens here, per the standard's closing line: a walk examining New,
Open and Save as choice-panel candidates. This document lists every control surface as
it exists in `active/glass-geometry.html` today, what tapping it actually does, and the
question the standard puts to it. Nothing here is a decision; the walk makes those.

**The standard's tests, applied to everything below:** Is the word named by destination
(principle 3)? Does an act with more than one outcome open a choice panel — clickable
words, each beside one quiet recipe line — rather than a bare dialog (§2)? Is a panel a
lens or a record, declared at opening (§2)? Does the membrane hold only what is *live*,
with occasional acts (New, Open, Save and kin) holding no permanent residence (§2)?
44px touch targets (§2). Every new or changed child-facing string prints in full at
review (principle 4).

---

## 1. The action row: New · Open · Save

Three italic words in the How-this-works panel — the walk's core.

**New** → work-in-progress guard → clears the canvas. The guard is a bare
three-word dialog: **Save / Discard / Cancel**. This is already a choice panel in
embryo — words, multiple outcomes — but it has no recipe lines and no panel behavior
(not movable, not closable as a panel). The walk decides its full form.

**Open** → same WIP guard → the picker window (saved and canonical constructions).
The picker is a grid of thumbnails behind a backdrop. Question: is the picker a record
panel under the taxonomy, and does Open need a choice panel at all, or is the picker
already its answer?

**Save** → a *chain* of bare dialogs: **Save Construction / Save as Image / Cancel**,
then for images **Postcard / Full sheet / Cancel**, then the name-and-note box, then
the export preview. This chain is the strongest choice-panel candidate on the surface —
the standard's two-saves language (*the record* and *the artifact*) is exactly the
distinction the first dialog gropes at without saying. Recipe lines could carry it:
"Save Construction — *a file you can open and keep working on*" vs "Save as Image —
*a picture to keep or send*." All such lines are child-facing copy and ride the voice
pass. Also reachable via Cmd/Ctrl+S.

**Share is currently unreachable.** The code carries a full share path
(`navigator.share`, fallback toast) and a `'share'` save-mode, but no word on the
surface invokes it. March-era design had "Save or Share"; the built row says Save
only. The walk decides whether Share is a word, a choice inside Save's panel, or
deferred. (Multiplication has *no* save word at all — a known gap the pass must fill
with whatever pattern this walk settles.)

**Standing residence.** The standard says occasional acts do not hold permanent
residence in the membrane, yet New/Open/Save sit permanently in the How-this-works
panel today. Where do they live instead — and does the answer survive the five-surface
test?

## 2. Numbers · points — the three-state cycle

One word cycling map → points → off, showing the **current** state, not the
destination. Tapping "Numbers · points" takes you to *map* — the word names where you
are, not where the tap goes, which principle 3 forbids. Standard §8.3 defers exactly
this to the controls pass; instinct on record says reduce three states to two. Mode
changes are logged as `numbers` ops (replay reproduces them; undo skips them —
correct per the standard).

## 3. grid follows zoom / grid keeps its step — the lattice tie

Visible only in map mode; toggles; **names the current state** ("grid follows zoom"
when tied). Lane 5's finding to honor: these state-words read as version notes even to
Michael. Verbs read as actions; declaratives read as changelog. The walk should treat
this word as the test case for whatever state-word answer the pass adopts. The tie is
deliberately not logged (transient view preference) — that stays.

## 4. How this works — heading and four topic items

Lines and Circles · Cutting Shapes · Color · Hiding Lines, each opening a tip window
on the canvas (draggable, closable, close-word top-right). Under the taxonomy these
are **record panels** — instructions, fixed content — and mostly conform already.
Check: fade rules (a moved panel is a commitment — is that honored?), and whether
first-visit trigger suppression still matches built behavior.

## 5. The colors panel

Palette name (tappable → palette picker), color chips, craft row, recipe line, lead
thickness slider, "Choose new colors" (→ picker). Largely conforming: lives in the
membrane, is live, is a lens on the current palette. Walk items: the palette *name* as
a tappable word is invisible-as-control (the recipe-line-as-newcomer's-cue idea from
§2 applies); chip and slider touch targets vs 44px; the panel follows the
How-this-works panel's height (fixed in Lane 1 — confirm, don't redo).

## 6. Replay controls

|← ← → →| arrows plus **Cancel**, which opens **Start over / Continue from here /
Cancel** — another embryonic choice panel, same treatment as the WIP guard. Arrow
glyphs are the only non-word controls on the surface; the walk should say whether
that's an exception the standard tolerates (destination is self-evident) or a thing
to name.

## 7. The model tool

"Nested Squares" title (tappable → model picker in chooser mode), scale and opacity
sliders, close word, drag to reposition. A record panel holding a ghost overlay.
Mostly conforming; confirm title-as-control has its cue.

## 8. Conforming already — walk past, don't redesign

- **Remember** inscription: fixed point, never fades, capture unbuilt (§7). Untouched
  by this pass.
- **Sound permission** ("may I use sound?" — yes / no): already the standard's
  quiet-word pattern.
- **Pixel-floor readout**: settled copy from the Phase 3 review.
- **Undo** (tap empty space): touches only marks, skips viewing ops — fixed in
  Lane 1, confirm only.

## 9. Known gaps in scope for the pass

- **Drop-loading a `.json` onto the canvas bypasses the WIP guard** and silently
  replaces unsaved work. New and Open guard; the drop does not. (Board, Phase 2
  sweep.) Whatever the walk decides for the guard should cover the drop.
- **The W compass letter** sits behind the membrane (flagged from Lane 1 to this
  pass).
- Multiplication items waiting on this walk's pattern: a save/share menu word;
  bottom-row numerals and lattice labels both numbering the x axis.

---

*Order for the walk itself: 1 (the row, one act at a time), then 2–3 (the state-word
question), then 6 (same pattern as 1), then 5 and 7 (cue question), then 9. Items in
8 are confirmations. Every new string produced by the walk prints in full at review.*
