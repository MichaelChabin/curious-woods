---
status: Draft, 2 Oct 2026. Michael's idea of 2 Oct, written up. Not canon: a design note for one feature, to be read with `Spec-Timeline-and-Map.md` and `Spec-Maps.md`, which are canon and win where they disagree.
role: How a child's own palette becomes the index to the World at the foot of a story. First use: *The Glass Rose* and Theophilus's World. Probably also how the Colour lab finally gets a door.
related: claude/Story-The-Glass-Rose.md, claude/World-Theophilus.md, claude/Spec-Timeline-and-Map.md, claude/Spec-Maps.md, claude/Labs-Ledger.md
---

# Colours on the map

## The idea

At the foot of *The Glass Rose* there is a World: a line of dates with a map under it,
Theophilus in the middle. A tap on a date lights a place; a tap on a place lights a date.

She arrives at that World having just finished a window. She chose those colours. So her
palette sits beside the map, the same swatches she was tapping ten minutes ago, and a tap
on one of them marks where it came from.

That is the whole feature. The palette is the index to the map.

It works because the gesture is already hers. She has tapped those squares forty times to
colour glass. The fortieth tap, in a different place, says where blue comes from. Nobody
explains that a palette can be an index; she finds out by tapping.

## Not the timeline

The first thought was to put the materials on the line. They don't go there. Cobalt does
not have a date — it has a mountain. Materials have places, which is the map's half of the
World, and the line can go on doing what it does. The pair already exists: this adds a
third way in, alongside tapping a date and tapping a place.

## What a tap does

It answers. On the map, immediately, completely: the place lights, and one sentence
appears in the panel that already sits between the line and the map.

> **Copper** — *the green*
> Dug out of the Rammelsberg, a day's ride from the workshop. The same mine gave him the
> lead for the joints.

That is the whole answer for most colours. No link, no second step.

**The rule about *more*.** The risk here isn't the idea, it's that it breeds — a row of
nine colours each with a door, most of them leading to a paragraph, and after two she stops
tapping. So: *more* appears only on the colours that have a real story behind them. Four,
maybe five, out of nine. The rest answer and close. A colour with no story is not a failure;
it is a colour whose answer fits in a sentence.

The ones that earn *more*, for this story:

- **Blue.** Because the honest answer is that nobody is sure, and why nobody is sure is the
  story: it was either dug out of a mountain or melted down from thousand-year-old Roman
  and Byzantine glass that somebody found and kept.
- **Red.** Because medieval red glass is not red all the way through. Full-thickness copper
  red is so dark it reads as black, so the glassmaker blew a bubble of clear glass with a
  skin of red on it. Every red piece in a window is a sandwich. A child who has just filled
  a leaf with flat colour will like knowing that.
- **The glass itself.** See below — it's the best one and she gets it free.
- **Lapis.** Not a glass colour at all; the painter's blue, and the contrast is the point.
  Theophilus's blue was a metal stirred into a melt in Germany. The painter's blue was a
  stone dug out of one valley in Afghanistan and carried four thousand miles, which is why
  for several centuries blue paint cost more than gold. This record is already written and
  already shared with Vermeer's story; same facts, different last line.

## The pale green is the first entry, and it's free

In the lab, when she closes a loop of lead, the area fills with pale green glass before she
colours anything. That pale green is not a decoration. It is what glass looks like when
nobody has coloured it: iron, in the sand, never quite got out.

So the pale green sits first in the row, before her own colours, and its answer is the one
fact in this whole set that comes straight from Theophilus's own book. He says to use beech
ash. Beech, burnt, leached, and stirred into sand — which is why northern windows are glass
from a forest, and why Venetian glass, made with the ash of a seaside plant brought from
the Levant, is a different substance with a different colour.

A forest, a day's walk from the workshop. It marks a place on the map that isn't a mine or
a port. It is the only material in the story he could have fetched himself.

## What can honestly be placed for 1120, and what can't

This is the part that needs care. Medieval glass provenance is often unknown, and a feature
built on it will lie unless it is allowed to say so.

**Placeable, with a named source.**

| Colour | Metal | Place | Note |
|---|---|---|---|
| pale green (the glass) | iron, in the sand | a beech forest near Helmarshausen | Theophilus says beech ash himself |
| the lead joints | lead | Rammelsberg, at Goslar | not a colour, but it's in every window |
| green | copper | Rammelsberg, or scrap bronze | copper was also simply reused |
| amber, brown | iron | everywhere; it's in the sand | the colour you get by not trying |
| purple | manganese | traded, probably from the Mediterranean | hedge: "brought in, probably from the south" |

**Nobody is sure, and the feature should say so.**

- **Blue — cobalt.** Two live possibilities and no settled answer: ore from the Erzgebirge in
  Saxony or from Persia, or recycled Roman and Byzantine glass. Chemistry has narrowed it
  for particular windows and not for medieval blue in general. The map should mark more than
  one place and the sentence should say plainly that nobody knows which. This is the best
  thing in the set, not the weakest: a child who has only ever met answers should meet a
  real question.
- **White.** Opaque white in a 12th-century window is not well accounted for by the recipe
  currently in the file (see below). Either fix it with a source or leave white without
  provenance. A colour with no `from` simply doesn't light anything, and nothing explains why.

**Out of period. Must not appear in a 1120 window at all.**

- **Silver stain** — the yellow in `palettes.json` under Gaudí. It arrives around the 1300s,
  roughly two hundred years after the book. Fine in a later story; wrong here.
- **Gold ruby and gold pink.** `palettes.json` currently gives the Chartres red as
  "gold, colloidal" and the pink as "gold, manganese". Both are wrong for Chartres by about
  five hundred years: ruby from gold is Kunckel's, late 1600s, and gold pink later still.
  Medieval ruby is copper, and it is flashed. **These two recipe lines need correcting
  before this feature ships**, because the feature will put them on a map and give them a
  date, and then they are no longer a quiet mistake in a data file.

## What `palettes.json` has to carry

One new field per colour, beside `recipe` and `uncertain`, which it already has. Nothing
else in the file changes, and a colour without the field behaves exactly as today.

```json
{
  "hex": "#1a6a2a",
  "recipe": "copper oxide",
  "uncertain": false,
  "from": {
    "name": "Copper",
    "of": "the green",
    "place": "rammelsberg",
    "says": "Dug out of the Rammelsberg, a day's ride from the workshop. The same mine gave him the lead for the joints.",
    "sure": true
  }
}
```

`place` is an id in `stories/places.json`, the placebook the World already reads, so the
map does not learn a second way to hold a place. Where nobody is sure, `places` takes a list
instead of `place`, and `sure: false`:

```json
"from": {
  "name": "Cobalt",
  "of": "the blue",
  "places": ["erzgebirge", "kashan", "constantinople"],
  "says": "Nobody is sure. The cobalt came out of a mountain — in Saxony, or in Persia — or out of Roman and Byzantine glass that somebody found, broke up and melted down again.",
  "more": "cobalt-blue",
  "sure": false
}
```

`more` is the id of an event or a record that already exists elsewhere, not new prose kept
in the palette file. The palette holds one sentence per colour and a pointer; everything
longer lives where the World's words live.

New places needed in `places.json`: Helmarshausen and its forest, Rammelsberg at Goslar,
the Erzgebirge, Kashan, Sar-e-Sang in Badakhshan (shared with Vermeer, may already be there).

## Only one palette gets provenance for now

Chartres. It is the one the story uses, and the one whose period the World already covers.
Gaudí, Alhambra, Hokusai and the rest get the field when a story needs it, and the shape is
the same every time. The feature must do nothing visible on a palette that has no `from`
anywhere — no empty row, no greyed swatches.

## The Colour lab's door

The Labs Ledger says the painting stories touch Colour and none of them opens it. This may
be the door. A child who has learnt by tapping that her blue came out of a mountain and her
green out of a mine has the one intuition the Colour lab needs and nobody can hand her
directly: that a colour is a substance before it is a sensation.

Not now, and not in this build. But the row of swatches with places behind them is the
hinge, and it's worth knowing that before building it.

## What this serves

**Pillar:** Stories (the World at the foot of one), reaching toward Labs (Colour).

**Intuitions:** that the made world is made of fetched things; that where a thing comes
from is a question with an answer, and sometimes with no answer yet; that two bodies of
knowledge — a map and a list of dates — can be the same knowledge looked at twice.

## Open

- Does the row of swatches live beside the map, or under the panel? The panel sits between
  line and map so her words are never far from her finger; the swatches should obey the same
  concern and the layout follows from that, but it wants looking at rather than deciding here.
- Does it show the palette she used, or the palette the story shipped? Hers is the better
  idea and it means the World has to be told what she chose. If that proves awkward, the
  story's palette is an acceptable first version — the gesture survives either way.
- Sources. Every line in the table above needs one before it ships. The two unchecked ones
  I'd check first are the Rammelsberg's copper in the 1120s (the lead and silver are certain,
  the copper I am less sure of) and whether "a day's ride" is right for the distance from
  Helmarshausen to Goslar.
