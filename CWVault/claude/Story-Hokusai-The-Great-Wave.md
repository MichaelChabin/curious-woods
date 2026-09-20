---
title: "Hokusai: The Great Wave"
subtitle: "~11,830 after the ice, or 1830."
year: 1830
cw_year: 11830
placement: across
timeline_line: "The blue in this wave was made by accident in Berlin, and it reached a country that had shut its doors."
touches: [colour, pigment, chemistry, printing, Japan, Edo, trade, iron, light]
links: [chartres-blue-glass, starry-night, tambora, frankenstein, faraday, maps]
tools: [painting-timelines, colour-sampler]
maya: none            # Remember is not summoned: the practice queue does not exist yet
status: written — awaiting Michael's yes on the words (stage 1)
built: cw-deploys/experiments/hokusai-the-great-wave.html
icon:
  from: art/hokusai-great-wave.jpg
  crop: [330, 150, 930, 750]        # the crest and its claws
  file: art/hokusai-icon-256.png
image:
  file: art/hokusai-great-wave.jpg
  source: "The Metropolitan Museum of Art, New York, accession JP1847 (DP141063), open access"
  license: "CC0 / public domain"
  note: "Resized to 1800 px wide, quality 85, from the museum's 3863 px original. A strong, unfaded-blue impression with its paper margins."
---

# Hokusai: The Great Wave

*The page is the text of record: `cw-deploys/experiments/hokusai-the-great-wave.html`.
This file holds the frontmatter, the tool specs and the notes.*

---

## The tools this story calls

### 1. The timeline pair (new; the first of the painting series)

Static. Nothing animates. Two lines, one above the other, at the head of the page,
running the full width of the wide column.

**The long line.** Year 0 to 12,026, to scale. Left endcap `0 — the glaciers begin
to melt`; right endcap `now — 12,026`. Sixteen markers from
`cw-deploys/stories/events.json`, chosen for even spacing rather than for interest,
so that a child who reads three painting stories meets the same spine three times.
The painting's own marker is copper and larger, labelled `The Great Wave / 11,830`.
Labels hang below the rail with a thin leader line each, packed into as many rows as
they need: a label goes in the lowest row where it does not touch a neighbour, and
each row is as tall as its tallest label.

**The short line.** 11,815 to 11,855 — forty years — at 52% of the column width,
centred, with nine events and the painting's marker. Years on this line are written
plainly (1830), because that is what the Rulings ask for everywhere except as a
distance; the long line keeps the after-the-ice counts, because there they *are*
distances.

**The joint.** Two copper lines run from 11,815 and 11,855 on the long rail down to
the two ends of the short rail. On the long rail those two points are about three
pixels apart, so the joint is a narrow wedge, and the note under the pair says so in
figures the page computes at load: *the same 40 years, pulled out of the line above —
where they take up about 3 pixels.*

The event data sits in one block at the top of the page's script (`SPINE`, `LEADUP`,
`DEST`), so the next painting changes data and nothing else.

### 2. The colour sampler

The print sits in the reading column as an illustration. When the text says
**Sample a colour**, the same element moves down the page into the tool's slot,
widens to the full column, and arms. Tap anywhere on it and the readout gives:

- a swatch of the colour under the finger (a 5 × 5 pixel average, not one pixel);
- the hex and `rgb()` values, because that is what the screen is actually using;
- the nearest pigment, with one or two sentences of chemistry;
- a line saying how good the match is.

**Where the pigment list comes from.** Nine anchors, each one measured off *this*
scan rather than taken from a swatch book, because this sheet has faded and the
honest question is what the photograph actually holds. Match is nearest-neighbour in
CIE Lab. Three rules:

- if the two nearest anchors are within ΔE 4.5 **and are different materials**, the
  tool names both and says the colour alone cannot separate them (this happens over
  most of the sky, where the thinnest grey and the browned paper have converged);
- if they are the same material (two strengths of Prussian blue, two states of the
  paper), it names the nearer and says nothing about the tie;
- past ΔE 22 it says the colour is between two printings rather than picking one.

The anchors, with what each is:

| colour | what it is |
|---|---|
| `#345069` | Prussian blue, laid on solid — and indigo in the black outline ink |
| `#647785` | Prussian blue, thinned with water |
| `#a2b5a8` | the pale green of the foam: thinned Prussian blue over a yellow |
| `#8c8a80` | a mid grey, from its own block |
| `#575c5b` | the dark band at the horizon: thinned sumi |
| `#d6bc88` | the yellow of the boats: turmeric, perhaps with orpiment |
| `#c8b89f` | bare paper, browned |
| `#c4b398` | the thinnest grey of the sky |
| `#f7e4c8` | bare paper at the margin, still close to its original colour |

---

## Notes for us

**The beat.** The blue in this wave is a colour that a paint-maker in Berlin made by
accident, and it reached a country that had shut its doors. Everything else — the
boats, the blocks, the price, Edo — is there to carry it.

**What to cut first.** The *Afterwards* section could go and the story would still
stand; it is there because the ending it gives (no two surviving sheets are the same
colour any more, and the wave is the last thing standing in all of them) pays off the
colour tool. After that, the paragraph on Egyptian blue.

**Placement.** `across`, and the print moves. The Rulings leave the default open and
ask the story chat to say why: a one-column page is what the wide timelines and the
wide print both need, and there is no side panel to swap anything into. The print
moving down to the tool rather than a second copy appearing is Michael's ruling of
19 Sept ("in the flow, then takes the centre when summoned"). The cost is that the
early slot collapses, so a child who scrolls back up finds the print gone until she
taps **Put it back**. Worth watching on the iPad.

**Remember.** Not on the page. Maya is absent, the inscription may only appear when
the text names what goes in the practice queue, and there is no practice queue.

**Dates.** The subtitle carries the after-the-ice count, per Michael's ruling of
19 Sept that the subtitle is a caption on the timeline rather than prose. Everywhere
in the prose the years are plain: 1830, 1706, 1849.

**Honesty checks, one per claim that could be challenged.**

- *Thirty people.* Three boats, eight rowers and two more in each bow. The count is
  the standard one and it can be made from the print itself.
- *About seventy.* Hokusai was born in 1760; the sheet is 1830–32. So 70 to 72.
- *Four men.* Publisher, artist, cutter, printer. Some sheets involved more than one
  cutter; "four" is the shape of the trade, not a headcount, and the text says
  "took four people", which is true of this one as far as anyone knows.
- *The drawing was destroyed.* True of the standard method: the `hanshita-e` was
  pasted face down and cut away. A very few survive because they were never used.
- *Two helpings of noodles.* Korenberg's figure, for the middle of the century.
- *A hundred and eleven sheets.* Korenberg located and photographed 111. Others put
  the number of known first-edition impressions slightly higher. The text says
  "have been found and photographed", which is the claim that is safe.
- *Eight thousand from a set of blocks.* The Asian Art Museum's figure for a
  well-used set; it is also the figure usually quoted for the total printed of this
  design, and the two are not the same thing. The text keeps them apart.
- *More than a million people in Edo.* British Museum, for the early 1830s.
- *Dejima, about 120 metres long.* The island was roughly 120 × 75 m.
- *Diesbach, around 1706, trying to make red.* The account comes from Stahl, 1731,
  written twenty-five years after the event; "around" is doing real work.
- *Red goes in and does not come back out.* Intervalence charge transfer, absorbing
  around 680 nm. Simplified but not falsified.
- *The first blue anybody made on purpose in a workshop.* Corrected in the text:
  Egyptian blue was manufactured three thousand years earlier and the recipe was
  lost. Prussian blue is the first modern synthetic pigment, not the first made blue.
- *Cheap Prussian blue from China around 1829.* Smith's account, and the standard one.
- *The blocks are lost.* Korenberg. Nobody knows when.
- *The sky is different in every copy.* Follows from `bokashi` being wiped by hand
  for each sheet. Stated as a consequence, not as a survey.

**Not checked.** The volume and page numbers of the Cartwright and Nakamura paper;
author, title, journal and year are confirmed, the rest was behind a paywall.

**Open.** Whether forty years is too wide for the short line — Michael asked for
twenty or thirty. Forty was chosen to reach Perry's ships in 1853, which is the
payoff of the closed-door section. Easy to narrow: two numbers in `LEADUP_FROM`
and `LEADUP_TO`.

---

## Sources

- Capucine Korenberg, "The making and evolution of Hokusai's *Great Wave*", British
  Museum, 2020 (a version appears in *Late Hokusai: Thought, Technique, Society*, ed.
  Timothy Clark). Survey of 111 impressions, the eight states, the pigments, the
  price, the lost blocks.
- Henry D. Smith II, "Hokusai and the Blue Revolution in Edo Prints", in *Hokusai and
  His Age*, ed. John T. Carpenter, Hotei Publishing, 2005. Prussian blue's arrival.
- Julyan H. E. Cartwright and Hisami Nakamura, "What kind of a wave is Hokusai's
  *Great wave off Kanagawa*?", *Notes and Records of the Royal Society*, 2009.
- The Metropolitan Museum of Art, *Under the Wave off Kanagawa*, accession JP1847.
  Date, dimensions, medium, and the image.
- "The Ukiyo-e Woodblock Printing Process", Asian Art Museum, San Francisco. Blocks,
  `kentō`, `baren`, sheets per day, sheets per block set.
- British Museum, "Historical city travel guide: Edo (Tokyo), early 19th century".
  Edo's population; the price of a print.
- MFA CAMEO, "Prussian Blue: Ukiyo-e colorant". *Bero-ai*; Chinese production making
  it affordable in the late 1820s; what it replaced.
- The *Hōei* eruption of Mount Fuji, December 1707, and the ash over Edo.
