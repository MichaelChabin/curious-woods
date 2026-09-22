---
status: Standard — 21 Sept 2026, from the Frankenstein prototype, six versions in one sitting with Michael. Not yet a component; the prototype is the reference.
role: The pattern for showing a story's events in time and in space at once. Every story that has a "<Name>'s World" section uses it.
related: Spec-Maps.md (the map underneath), Spec-Map-Lab.md (where this pattern grows), Rulings-Sept-2026.md (how wide a timeline is; gestures)
reference: cw-deploys/experiments/maps/prototype-frankenstein.html — self-contained, open it in a browser. Behaviour and look are settled there; the code is a sketch.
---

# A timeline over a map

One list of events, read two ways. The timeline uses each event's date and ignores its place; the map uses its place and ignores its date. Tap an event on either and it lights on both, and a panel below says what happened and what it has to do with the story.

Michael's reason for wanting it: some children will spend more time here than in the story. It is the story's world laid out where she can wander in it.

## Where it goes

After *More*, under the heading **"<Name>'s World"** — *Mary Shelley's World*, *Hokusai's World*. Not at the front of the story. At the front it is a list of things she has no reason to care about yet; at the end, every event is anchored to something she now knows. The front of the story places her in time with a single date line instead.

## The timeline

**One line. The story's person above it; the world below.** The side means something — a child will look for a reason, so the reason must be true. Her life and everyone else's meet at the same line, so what happened to her sits directly over what was happening in the world that year.

**Two ink colours.** The person's events in the house ink `#2a241c`; the world's in slate `#3f5a78`, dots and labels both. The story's focus event is copper `#b5652b`. A selected event is vermilion.

**Labels above the line drop the person's name.** The side already says whose they are: *Born*, *Dundee*, *Begins Frankenstein*. Keep the name only where the sentence needs it: *Mary tells the story*.

**Labels pack away from the line** into as many rows as they need, each in the nearest row where it touches no neighbour. Crowded years hang down (or up) a long way, and that is the point: it shows how much was happening at once. A thin leader runs from each dot to its label; labels carry the halo so a leader passing behind never strikes through the text.

**Years sit just under the line**, small and grey (11 px, `#9a958b`), with a tick every five years. The first and last are anchored inward so neither is clipped.

**Span** follows the ruling on how wide a timeline is.

## The map

The story's regional base picture, full colour, per `Spec-Maps.md`. The person's places get vermilion dots; the world's get slate dots, matching the timeline. A place for bearing only is a small grey dot and cannot be tapped.

**Routes** draw only while their event is selected — the 1814 elopement, the 1816 road to Geneva.

**Countries appear when the story is about who held what**, as outlines, and one may be filled when the story needs it picked out. They are that year's countries, not today's: the Frankenstein map shows France without Savoy and Nice, which belonged to the Kingdom of Sardinia until 1860. A country filled with colour avoids the earth's colours and the dot colours — Switzerland is plum `#7a3a6a` at 30%.

**A place too far away for the map gets a card at the map's edge, on the side where it really lies**, with its name, date and distance: Tambora on the right, 12,300 km east; Jefferson and Adams on the left, 6,000 km west. Tapping the card selects the event and opens the world map in a window with the place and one familiar place for bearing. The side is information; never put a card on the wrong side for looks.

## Tapping

Nearest-mark picking, per `Spec-Maps.md`: measure to every dot and label, take the nearest inside 20 px for a mouse and 32 px for a finger. **The label counts, but a dot wins a close call** — a label box is scored ten pixels worse than a dot, or a neighbour's label steals taps meant for the dot beside it.

Where dots crowd on the line — on an iPad *Begins Frankenstein* and *Turner's red skies* are six pixels apart, and *Faraday's motor* sits exactly on *Polidori dies* — no picking can separate them under a finger. The names can. In crowded years the names are the targets.

A place holding several events lists them all, oldest first. Tapping what is already selected clears it; tapping empty ground clears everything.

## The panel

Below the pair, full width, in reserved space so the page never jumps. The event's date and place in small grey, a title, and two to five sentences **in the story's voice** — what happened, and why it belongs next to this story. Not a gazetteer entry.

Facts are checked like any other in the story, and the panel shows only what survives. Kilometres, not miles; where an old unit is the point (a Roman milestone), keep it and give the kilometres.

## The data a story writes

One list, which the story file carries and the page reads:

```
events:
  - id: summer        year: 1816.45   side: person   focus: true
    label: Begins Frankenstein        place: geneva   route: r1816
    when: 1816 · Lake Geneva          title: The summer without a summer
    text: Cold rain keeps five people indoors ...
places:
  geneva:   Lake Geneva    46.22  6.18   person
  tambora:  Tambora        -8.25  118.0  world   card: east
routes:
  r1816: London – Dover – Calais – Paris – Troyes – Dijon – Geneva
countries: [france@1816, switzerland: fill]
```

## Converting Hokusai

The Hokusai page has nine timeline events at the head of the story, with no places. Converted, the timeline moves to after *More* as **Hokusai's World**, pairs with the world map already there, and each event gets a side and a place.

A proposed split, for Michael to accept or change:

*Above — Hokusai and the blue that reached him:* Prussian blue reaches Japan from Holland, expensive (1820, Nagasaki); cheap Prussian blue arrives from China (1829, Nagasaki); **the Great Wave** (about 1831, Edo — the copper focus, now an event rather than a separate marker); Hiroshige's road to Kyoto (1833, Edo to Kyoto, a route); dies, aged 88 (1849, Edo).

*Below — the world:* Tambora (1815, Sumbawa); Japan orders foreign ships driven away (1825, Edo); Faraday gets electricity from a magnet (1831, London); photography announced (1839, Paris); US warships in Edo Bay (1853, Uraga).

On the world map nothing is out of frame, so no cards. The date line at the head of the story replaces the timeline there.

## Built so far (21 Sept)

`js/timeline.js` exists — `cwTimeline` and `cwWorld` — and *Johannes Vermeer's World*, in
`experiments/vermeer-girl-with-a-pearl-earring.html`, is its first use. It lives in `js/`, not
`experiments/maps/` as the prompt below says, so a story can be hung without its path breaking;
and it draws its map with `js/map.js`, which gained three place facets for it (`world`, `on`,
`onTap`). Two small decisions taken there: a route draws only while its own event alone is
selected (tapping a place with many events must not make it look as if it owns every road out
of it); and on a phone a far-away card sits under the map, still on its own side, because over
the map it covered the places that matter. Still to do from the prompt: the Frankenstein bench
rebuilt on the component, and the Hokusai conversion.

## The prompt for the component, when Michael says go

> Read `CWVault/claude/Spec-Timeline-and-Map.md`, then `CWVault/claude/Spec-Maps.md`, then open `cw-deploys/experiments/maps/prototype-frankenstein.html` in a browser and use it. The prototype settles the behaviour and the look; its code is a sketch and should not be copied wholesale.
>
> Build `experiments/maps/timeline.js` — the two-sided timeline — and a small controller that joins it to `map.js`, the panel, the far-away cards and the world window. Use `map.js` for the map, with its placer, contours and picking; do not reimplement them. A story supplies one data file in the shape the spec shows.
>
> Measure widths with `getBoundingClientRect()`, not a parent's `clientWidth`; the prototype had that bug and it clipped the last year.
>
> Rebuild the Frankenstein prototype as `experiments/maps/bench-shelley.html` from a data file extracted from the prototype, using `art/maps/europe` (already rendered, uncommitted). It should look and behave the same.
>
> Then convert the Hokusai page per the spec's section *Converting Hokusai*, with the split Michael approves. Stop and report before committing.

## Not yet decided

Whether a story may have a second person above the line (Mary and Percy). Whether the focus event should also mark the map. Whether the pair ever hangs in the gallery on its own — Michael suspects some children will prefer it to the story.
