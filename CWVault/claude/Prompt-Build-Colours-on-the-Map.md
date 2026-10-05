---
status: Draft, 2 Oct 2026 — **not ready to paste.** Three things first, named under *Before pasting*. Michael to read the design note and this prompt together.
role: The prompt that makes a child's palette the index to the World at the foot of a story. First use: *The Glass Rose* and Theophilus's World.
how to use: When the three blockers are cleared, paste the prompt below whole into a Claude Code session in `_CW/`.
related: claude/Spec-Colours-on-the-Map.md, claude/World-Theophilus.md, claude/Spec-Timeline-and-Map.md, claude/Prompt-Extract-Glass-Module.md
---

# Building colours on the map

**Before pasting, in this order.** The prompt names all three and the builder will stop if
they are missing.

1. **The two wrong recipes in `art/palette/palettes.json` are corrected.** The Chartres red
   is given as "gold, colloidal" and the pink as "gold, manganese". Both are out by about
   five hundred years; medieval ruby is copper, and flashed. This feature puts recipes on a
   map, so a quiet error becomes a published one. Correct them, or mark them `uncertain` and
   leave them out of this build.
2. **`stories/world-events.json` holds Theophilus's World.** `CWVault/claude/World-Theophilus.md`
   says the records are still waiting to go in. Three of its lines are marked unchecked
   (Abelard, the Chartres roses, Cahokia) — those don't block this build, but the file's
   existence does.
3. **Michael has decided the two open questions** in the design note: where the row of
   swatches sits, and whether it shows her palette or the story's. If the second is still
   open when this is pasted, the prompt below takes the story's palette and says so.

## The prompt

> Read, in this order: `CWVault/00-WHAT-CW-IS.md`; `CWVault/claude/Spec-Colours-on-the-Map.md`,
> which is what you are building; `CWVault/claude/Spec-Timeline-and-Map.md` and
> `CWVault/claude/Spec-Maps.md`, which are canon and win wherever the design note disagrees
> with them; `CWVault/claude/World-Theophilus.md` for the records this World holds; and
> `cw-deploys/MANIFEST.md` for the page standard and the `js/` entries.
>
> Then read the code you are extending: `cw-deploys/js/timeline.js` — in particular `cwWorld`,
> the panel between the line and the map, and `onPick` — and enough of `cw-deploys/js/map.js`
> to see how `marks` and `places` work and how a place is lit (`lit`, `on`, `onTap`).
>
> **What this is for.** A child finishes a stained-glass window in Glass Geometry and arrives
> at the World at the foot of the story. Her palette sits beside the map. A tap on one of her
> own colours marks where that colour came from. The palette becomes the index to the map.
> It works because the gesture is already hers — she has tapped those swatches forty times
> to colour glass.
>
> **1. A third way into the World.** `cwWorld` already has two: tap a date, tap a place. This
> adds a row of swatches. A tap on a swatch does exactly what tapping a date does — lights
> the place on the map, puts the words in the panel that already sits between line and map —
> and nothing else. Do not build a second panel, a second selection model, or a tooltip. One
> thing is selected at a time across all three ways in, and a tap on a swatch clears a
> selected date and vice versa.
>
> **2. The data.** One new field per colour in `art/palette/palettes.json`, beside the
> `recipe` and `uncertain` it already has. The design note gives the shape; follow it exactly.
> `place` is an id in `stories/places.json`, so the map learns no second way to hold a place.
> Where nobody is sure, `places` takes a list and `sure` is false: light every one of them,
> and the sentence says plainly that nobody knows which. Add provenance to the **Chartres
> palette only**. Every other palette in the file must behave exactly as it does today: a
> palette with no `from` anywhere shows no swatch row at all — not an empty one, not a greyed
> one. Nothing explains the absence.
>
> New places for `stories/places.json`: Helmarshausen and its forest, Rammelsberg at Goslar,
> the Erzgebirge, Kashan, Sar-e-Sang in Badakhshan. Sar-e-Sang may already be there from
> Vermeer's story — check before adding, and do not add a second record for the same place
> under a different id.
>
> **3. *more* is rare, by design.** The risk in this feature is that it breeds: nine colours,
> nine doors, most leading to a paragraph, and after two she stops tapping. So a tap answers
> completely and immediately with one sentence, and `more` appears **only** on a colour whose
> `from` carries a `more` id. For this World that is four colours at most. `more` points at a
> record that already exists in `world-events.json` or the placebook; it is never new prose
> kept in the palette file. If a `more` id resolves to nothing, show no *more* — do not
> invent the longer text, and name the dangling id in your report.
>
> **4. The pale green goes first, and it is not one of her colours.** In the lab, a closed
> loop of lead fills with pale green glass before she colours anything. That pale green is
> what glass looks like when nobody has coloured it: iron in the sand that never quite came
> out. It sits at the head of the row, ahead of the palette's own colours, and its place is a
> beech forest near Helmarshausen — the one material in the story Theophilus could have
> fetched himself, and the one fact here that comes straight out of his own book. Mark it in
> the data so it is plainly the glass and not a colour she chose.
>
> **5. Honesty is a feature, not a caveat.** Several of these colours have no settled source.
> Cobalt is the important one: ore from Saxony, or from Persia, or recycled Roman and
> Byzantine glass, and chemistry has not settled it for medieval blue in general. The map
> marks all three and the sentence says nobody is sure. Do not soften that into a single
> confident place, and do not add hedging language of your own to colours whose `sure` is
> true. The data says what is known; render it and add nothing.
>
> **Invent nothing.** Not a sentence, not a date, not a place, not a mine. Every word a child
> reads here comes from `palettes.json`, `world-events.json` or `places.json`. If a colour in
> the Chartres palette has no honest source you can take from the design note, leave it
> without provenance; a swatch with no `from` is not tappable and nothing says why.
>
> **6. Which palette.** Show the story's shipped palette. Her own palette would be better and
> means the World has to be told what she chose; that link does not exist and you are not to
> build it. If you can see a clean way for a page to hand `cwWorld` a list of hexes she used,
> name it in your report and build nothing.
>
> **Where it goes.** Extend `js/timeline.js`, which owns `cwWorld`. Do not add a new shelf
> module for this, and do not touch `js/map.js` unless lighting several places at once is
> genuinely impossible with what it has — if it is, say what is missing rather than working
> round it. `css/story.css` is not to be edited.
>
> **A bench that proves it.** `experiments/world-colours-bench.html`: Theophilus's World with
> the Chartres palette, and a second `cwWorld` on the same page with a palette that has no
> provenance, to prove the swatch row is absent there. Two instances must not interfere.
>
> **Finishing.** Bump `CW_VERSION` on every page touched and the version query on every page
> that loads a changed script. Run `tools/check-deploys.sh`. Register the bench in
> `MANIFEST.md` and add the line to `00-BOARD.md`.
>
> Test headless at 1440 × 1100 and 390 × 844: no console errors, no failed requests, no
> horizontal scroll; tapping a swatch, a date and a place in any order leaves exactly one
> thing selected; the panel never goes off the bottom of the screen on the phone size; and a
> World with no provenance anywhere renders exactly as it does today.
>
> Anything unclear, leave it open and name it. Stop and report before committing.
>
> **In the report, say:** which colours ended up with provenance and which you left bare;
> which `more` ids resolved and which dangled; whether lighting several places at once needed
> anything from `map.js`; whether the swatch row sits where the design note's open question
> left it or whether the layout forced a different answer; what you had to decide that the
> design note didn't; and anything in `timeline.js` that surprised you.

## Why the prompt says what it says

- **The three blockers are named in the prompt, not just here**, because a session that
  starts with wrong recipes in the data will publish them on a map.
- **No new shelf module.** `cwWorld` already owns the line, the map, the cards and the panel.
  A fourth way of holding a selection is how a feature like this turns into machinery.
- ***more* restricted in the prompt itself**, because a builder's instinct is to make every
  item equally rich, and that is exactly the failure mode: a row where everything has a door
  and nothing is worth opening.
- **"Invent nothing" stated twice**, once as a heading. Provenance is the one subject here
  where a plausible sentence is indistinguishable from a true one, and a builder asked to
  fill a field will fill it.
- **Her palette explicitly deferred.** It is the better design and it is a second feature;
  naming it and forbidding it is cheaper than discovering it half-built.
