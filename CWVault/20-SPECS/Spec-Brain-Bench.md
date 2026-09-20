---
status: Spec v1 — 10 Sept 2026, for Michael to correct before it goes to Claude Code
pillar: Labs (a standard resource, like Glass), called by every story in the brain series
role: What the Brain bench is, how it looks the same everywhere, what a story may ask of it, and what it stores. Versions at the end; v0 is small on purpose.
intuitions: #3 (the same brain as a picture, a set of addresses, and a set of her own numbers), #5 (how big, how fast), #10 (a model she can run), #16 (it was mapped by people, one region at a time)
---

# The Brain bench

## What it is

A map of the child's own brain that stories can point at and that her measurements land on. It is one thing, recognizably the same on every page, so that when she sees it she knows what it is and what will happen when she taps it. It is not an anatomy lesson. It is an address book with a picture, and over time the picture fills with her own numbers.

The rule that makes it hers: nothing appears on the map that she didn't earn by running an experiment or reading a story. On first opening, the map is a bare silhouette. Three at a Glance adds the IPS. The star adds the hippocampus, the basal ganglia, and the cerebellum. The Speed of a Thought adds the bars. The map is a record of where she's been, drawn on a brain.

## How it looks, everywhere

**The icon.** Michael's blue watercolour of the brain from the side, front to the left (see *The art*, below). At dashboard size it is a story icon like any other; in the left panel it is a 40px mark beside the word *Brain*. Same painting at every size, never redrawn.

**Where it lives.** In the left panel, under Tools, as the word *Brain* with the icon beside it. It appears (fades in, 200ms) when a story or tool has something to show on it, and is otherwise absent, by the Marauder's Map rule. Dragged onto the canvas, it stays, like any tool. From the dashboard it is reachable as its own icon once she has earned at least one region.

**When open.** A panel-tool, like the palette and the model in Glass: draggable header with the word *Brain* and the word *close*, no buttons. Inside, the silhouette at about 320px wide, and beneath it, the regions she has earned, as words in Payne's gray, one per line, each with the story that earned it in 11px italic beneath (the palette's recipe-line style). Tap a word, the region glows on the map (copper, 300ms); tap the region, the word glows. Nothing else in v0.

**Two views.** The side view is the default. A second view, the inside view (a brain cut down the middle, so the hippocampus, basal ganglia, and cerebellum can be seen), is reached by the word *inside* under the map and returns with *outside*. Both views use the same line style. The star story is the first to need the inside view.

## What a story may ask of it

A story or tool talks to the bench with a small vocabulary. This is the whole interface; if a story needs something not here, that's a new version, not an exception.

*Show.* Name one or more regions; they glow in copper while the story is at that point in the text (the story-image rule: fade in 300ms, out 400ms). Regions: `ips`, `hippocampus`, `basal-ganglia`, `cerebellum`, `v1` (the back, where seeing starts), `motor`, `prefrontal`, `auditory`, `letterbox` (the visual word form area), `somatosensory`. Ten to start; add as stories need them, never ahead of need.

*Earn.* Add a region to her map permanently, with the story's name as the reason. Once earned, a region shows on every future opening.

*Deposit a number.* A tool hands the bench a measurement with a name and a unit: her subitizing limit (4), her reaction time (230 ms), her two-point threshold on the fingertip (2 mm). The bench keeps it and shows it beside the region when the region is tapped. This is the "her own numbers" half of the map.

*The bars* (v1). The Speed of a Thought deposits three times: eye to V1, V1 to prefrontal, prefrontal to hand. The bench draws them as three bars along the path on the side view, lengths proportional to her times, with the total. This is the one drawing that is generated from her data rather than fixed.

*The slider* (v2). The Brain That Rebuilds Itself asks for a slider under the map with two positions labelled by the story ("before", "three months of juggling"); the bench swells or shrinks a named region between them. No numbers; the swelling is the claim.

## What it stores

Local only, one JSON record, `cw.brain.v1`: the list of earned regions with the story that earned each and a date; the deposited numbers with name, unit, value, date, and the tool that measured it. Readable by a child, exportable as part of her text-file history, deletable by her. No identifier of any kind, and nothing ever leaves the device.

## What it must never do

Score her. Compare her to anyone. Say "your brain is good at" or "your brain is bad at." Show a region she hasn't earned. Show the whole labelled brain as a reference diagram (that's a textbook; if she wants that, it's a search away). Use colour to mean "healthy" or "active" in the fMRI-poster way; the only colours are the line blue and the copper glow. Move, shrink, or hide the Remember inscription.

## Honesty

Regions are drawn as areas with soft edges, not sharp territories, because they aren't sharp. Where a function's address is argued (subitizing: IPS, or the attention system that feeds it), the story carries the hedge, and the bench just glows what the story names. The inside view is a drawing, not a scan; it should look like one.

## Versions

*v0 (build first).* Side view, inside view, ten regions, show / earn / deposit, the earned-regions list, local storage, the icon at two sizes. Enough for Three at a Glance and the star.

*v1.* The bars, for The Speed of a Thought; the ability for a second tool to update a deposited number (a re-run replaces, keeps the old one as history).

*v2.* The slider, for The Brain That Rebuilds Itself; the homunculus overlay for The Map of You (the body drawn beside the somatosensory strip, stretched by her two-point numbers).

*Later, if ever.* A "her brain vs. a crow's" toggle for the animal stories; the H01 cube as a zoom-in from one square millimetre of the side view down to a single neuron, with counts at each step.

## The art (settled 10 Sept)

Both views are Michael's watercolours: `brain-outside.jpg` (886px, side view, front to the left) and `brain-inside.png` (1254px, cut down the middle, same style). They are the bench, not a model for one. The icon is the outside painting at small size. `brain-views.svg` embeds both paintings with the ten regions drawn over them as soft copper ellipses, each with `data-region` set to the vocabulary id and a `.deep` class (dashed) where the region lies beneath the surface on that view. The inside view carries only the seven regions that make sense on a midline cut; the bench switches to the outside view for the other three. Placements are a first pass by eye; `make_overlay.py` regenerates the file from two small tables if Michael wants anything moved. Put all three files in `experiments/brain/`.

## For Claude Code, when it's time

Build v0 only. Single file, `experiments/brain-bench.html`, no frameworks. Inline `brain-views.svg` (do not redraw anything); regions are the `<ellipse>` elements already in it, and the glow is the `.lit` / `.earned` classes already defined there. Expose one global, `CW.brain`, with `show(ids)`, `hide()`, `earn(id, story)`, `deposit({name, unit, value, tool})`, `open()`, `close()`. A story page includes the file and calls these at the right paragraphs. Test that a page with no earned regions shows a bare silhouette and no list.
