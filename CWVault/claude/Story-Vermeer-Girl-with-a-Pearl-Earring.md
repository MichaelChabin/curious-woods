---
title: "Vermeer: Girl with a Pearl Earring"
subtitle: "~11,665 after the ice, or about 1665."      # the date line (Spec-Timeline-and-Map)
year: 1665
cw_year: 11665
placement: across, with a left margin
timeline_line: "Everything precious in this picture is imaginary, except the blue."
touches: [colour, pigment, chemistry, trade, Delft, porcelain, microscopes, light]
links: [hokusai-the-great-wave, chartres-blue-glass, leeuwenhoek, newton-prism, delft-blue]
tools: [colour-sampler, magnifier, maps]          # js/sampler.js, js/map.js
maya: none            # Remember is not summoned: the practice queue does not exist yet
status: live, hung 22 Sept; Michael has seen it ("This is beautiful", 21 Sept); Johannes Vermeer's World added the same day
built: cw-deploys/active/vermeer-girl-with-a-pearl-earring.html   # hung 22 Sept; the experiments address redirects
icon:
  from: art/stories/vermeer/vermeer-girl-pearl-earring.jpg
  crop: [440, 500, 1000, 1060]      # eyes, lips, the blue, and the pearl
  file: art/icons/vermeer-icon-256.png
gallery:                           # for stories/gallery.json, when hung
  picture: art/gallery/vermeer-girl-with-a-pearl-earring-gallery.jpg   # the whole painting, 600 px wide (22 Sept)
  frame: "#3d6e92"                 # the ultramarine itself, measured off the turban
  frameWidth: 12
  size: medium
image:
  file: art/stories/vermeer/vermeer-girl-pearl-earring.jpg
  source: "Mauritshuis, The Hague, inventory 670 — the museum's own scan as published on Wikimedia Commons (1665_Girl_with_a_Pearl_Earring.jpg, 12285 × 14550)"
  license: "Public domain (the painting and a faithful reproduction of it). The Mauritshuis's own download terms ask for non-commercial use and the credit 'Mauritshuis, The Hague'; CW is both, and the caption credits it."
  note: "Taken from Commons' 1920 px rendition and resized to 1400 × 1658, quality 86, 640 KB. The post-2018 cleaned state."
maps:
  - region: netherlands      # in the margin, beside "Delft" — rendered 21 Sept, 2.5–7.5°E, 50.7–53.7°N
  - region: lapis-road       # full width in the flow, in "The blue" — rendered 21 Sept, 2°W–76°E, 24–56°N, exaggeration 2
---

# Vermeer: Girl with a Pearl Earring

*The page is the text of record: `cw-deploys/experiments/vermeer-girl-with-a-pearl-earring.html`.
This file holds the frontmatter, the tools, Vermeer's World, and the notes.*

---

## The beat

Everything precious in this picture is imaginary, except the blue. The pearl is two touches
of white paint with no hook; the girl was nobody; the turban was a costume. The blue was a
stone carried from the mountains of Afghanistan, and it cost more than gold.

The story opens on the pearl, with the magnifier, because she can see the missing hook for
herself before anyone tells her it's missing.

---

## The tools this story calls

### The magnifier and the colour sampler — `js/sampler.js` (new, 21 Sept)

The same tool as Hokusai's, pulled out of that page into one shared script so the paintings
call one thing instead of copying it (Ruling-Labs-and-the-Plane, proposed: the Colour and
Pixels shelf). `cwSampler(frame, anchors, opts)`. The page supplies the anchors and wires
its own words and readout; the script owns the gestures.

Two changes from the Hokusai version, both found at the bench:

- **Dragging the magnifier slides it.** The Hokusai page's text says "drag it about to
  look", and on that page dragging does not move it — a drag at rest scrolls the page. The
  magnifier now takes the finger itself (`touch-action: none` on the circle only, since
  touch-action is decided where a touch starts), so dragging it slides it, while a finger
  anywhere else on the picture still scrolls the page.
- **A tap inside the magnifier lands where you tap.** The first version of the slide took
  every touch on the circle as the start of a drag, so a tap near where the magnifier already
  sat did nothing. A tap is a tap wherever it lands; only movement makes a slide.

**The anchors.** Fifteen, each measured off this scan at a place where the 2020 study named
the paint. Unlike Hokusai's, these names are not guesses: the Mauritshuis took samples and
found out what each part is made of. What the sampler guesses is only which part she tapped,
from its colour.

| colour | what it is | from the study |
|---|---|---|
| `#3d6e92` | ultramarine (with chalk in the shadows) | van Loon |
| `#acb9c5` | ultramarine with lead white | van Loon |
| `#13232e` | ultramarine laid on dark, over indigo | Vandivere |
| `#d6c09a`, `#bf9a66` | the turban's yellow: earth yellow, lead white, a faded plant-yellow glaze | Vandivere |
| `#cca060` | the jacket: lead-tin yellow and yellow ochre | Vandivere |
| `#695724` | the jacket's shadow: ochre darkened with ultramarine | van Loon |
| `#f2cebe`, `#caa88b`, `#8e6e57` | skin: lead white, vermilion, red lake, earths; a trace of ultramarine | Vandivere; van Loon |
| `#c15d4b` | lips: red lake (cochineal) with lead white | Vandivere |
| `#f1efe3` | lead white — the collar and the pearl's shine; English lead | Vandivere |
| `#9a9386` | lead white laid thin over the dark — most of the pearl | Vandivere (the pearl is "translucent and opaque touches of white paint") |
| `#29261c`, `#231a0f` | the dark behind her: charcoal under a faded glaze of weld and indigo — once a green curtain | Vandivere |

Only two pairs of different materials fall within ΔE 12 of each other (turban yellow against
skin in shadow; turban yellow in shadow against the jacket), both well past the tie
threshold. The deepest turban blue sits 17–19 away from the background, so the black and the
blue never trade names.

**The pearl needed its own anchor.** It is about twenty pixels across in this scan: one white
highlight, a thin grey, and the dark showing through. A tap on it first came back as "either
her skin in shadow or ultramarine with white", which is the one wrong answer the story cannot
afford, since it opens on the pearl. The thin grey is now named for what it is.

### Maps — `js/map.js`

- **`netherlands`** (rendered for this story), in the margin beside *Delft*: Delft `lit`,
  Amsterdam `minor`, the North Sea as water. The Hague sits on top of Delft at this scale; the
  caption says so rather than drawing a dot that can't be tapped.
- **`lapis-road`** (rendered for this story), **full width in the flow**, in *The blue*, and
  named by the text ("The map below shows the whole way"). It started in the margin and was
  moved: seventy-eight degrees of longitude in 300 pixels is a sliver, and the distance is the
  point of the section. By the margin ruling, a picture she is meant to study rather than
  glance at runs across. The mines `lit`, Aleppo, Venice, Delft, the Mediterranean.
  **A possible route, dashed** (21 Sept, Michael asked for one): across Persia by caravan
  (Balkh, Herat, Isfahan, Baghdad, the Euphrates) to Aleppo, the port at Alexandretta, by sea
  south of Cyprus and Crete and up the Adriatic to Venice, over the Brenner, down the Rhine to
  Delft. Nobody recorded any one stone's road, so the path is `possible` (dashed) and the
  caption and the text both say it is a guess. **The time**, worked out rather than found:
  straight legs of about 3,400 km overland in Asia, 2,800 km by sea and 1,100 km in Europe;
  real roads longer. Caravans went two to three miles an hour for about nine hours a day,
  1,000 miles in five to eight weeks (Thesiger and others, via factsanddetails.com) — call it
  thirty kilometres a day. Travelling days only: about eight months. With caravans forming,
  ships waiting on the wind, winter passes and selling along the way: "a year or two is a fair
  guess". Venice as the first European port: National Gallery, London.

---

## Vermeer's World

After *More*, before *References*, per `Spec-Timeline-and-Map.md`. **Built 21 Sept** on
Michael's word, as the first use of the real component rather than a one-off: `js/timeline.js`
(`cwWorld(host, data)`), which draws the timeline itself and uses `js/map.js` for the map, as the
spec asks. The data lives in the page's script as `WORLD`; the shape below is the same.

The map is its own crop, `north-sea` (4°W–10°E, 50°N–55°N): London, Newton's farm at
Woolsthorpe, Delft and Utrecht on one picture. `western-europe` would have been mostly France and
sea with four dots in one corner. China is a card at the east edge — on a phone it sits under the
map instead, because over it it covered Delft — and tapping it opens the world map in a window.

One event was added after the list below was first written: **the Great Plague**, 1665, London —
it is why Newton was at home at Woolsthorpe with a prism, and it puts a second place on the map.

**Span, per the ruling:** 1632, the year the man and the town that explain the picture begin
together (Vermeer and Leeuwenhoek born, days apart), to 1676, the year the picture's world
closes (the baker is paid with paintings; Leeuwenhoek, now the estate's trustee, writes to
London about the animals in pepper water). The 1881 sale is not on it: the picture doesn't
explain the sale.

```
events:
  - id: born          year: 1632.83   side: person
    label: Born                        place: delft
    when: 1632 · Delft                 title: Baptised in the New Church
    text: On the last day of October 1632. Four days later the same church baptised
          Antonie van Leeuwenhoek.
  - id: leeuwenhoek   year: 1632.84   side: world
    label: Leeuwenhoek born            place: delft
    when: 1632 · Delft                 title: The boy who would see bacteria
    text: Baptised four days after Vermeer, in the same church. He grew up to make the
          best microscopes of his time.
  - id: ming          year: 1644      side: world
    label: Chinese porcelain stops     place: jingdezhen
    when: 1644 · China                 title: A war in China
    text: The Ming dynasty fell, and the porcelain the Dutch had been buying stopped
          coming. Delft's potters saw their chance.
  - id: potters       year: 1647      side: world
    label: Delft potters copy it       place: delft
    when: 1647 · Delft                 title: Four potteries, then twenty
    text: Clay covered in a glaze made white with tin and painted with cobalt blue. Four
          potteries in 1647; more than twenty by 1661.
  - id: guild         year: 1653.99   side: person
    label: Joins the painters' guild   place: delft
    when: 1653 · Delft                 title: A quarter of the fee
    text: He was twenty-one, and could pay only a quarter of the fee to join. He paid the
          rest three years later.
  - id: thunderclap   year: 1654.78   side: world
    label: The gunpowder store explodes  place: delft
    when: 1654 · Delft                 title: The Delft Thunderclap
    text: Eighty to ninety thousand pounds of gunpowder. More than two hundred houses
          flattened. Carel Fabritius, who had studied with Rembrandt, died at his easel.
  - id: girl          year: 1665      side: person   focus: true
    label: Girl with a Pearl Earring   place: delft
    when: about 1665 · Delft           title: The girl who was nobody
    text: A tronie — a face in costume, not a portrait. A pearl with no hook, and a
          turban painted in a blue that cost more than gold.
  - id: newton        year: 1666      side: world
    label: Newton's prism              place: woolsthorpe
    when: 1666 · England               title: White light is all the colours
    text: While Vermeer was painting, Isaac Newton was splitting sunlight into colours with
          a glass prism, and working out that white light is all of them at once.
  - id: disaster      year: 1672.5    side: world
    label: France invades              place: utrecht
    when: 1672 · the Dutch Republic    title: The disaster year
    text: Louis XIV's armies marched into the Republic. Nobody was buying paintings, and
          Vermeer's debts began to pile up.
  - id: dies          year: 1675.96   side: person
    label: Dies, aged 43               place: delft
    when: 1675 · Delft                 title: Owing money all over town
    text: December 1675. He was buried in the Old Church.
  - id: baker         year: 1676.07   side: person
    label: The baker is paid           place: delft
    when: 1676 · Delft                 title: Two paintings for three years of bread
    text: His widow gave the baker, Hendrick van Buyten, two paintings to settle a bill of
          617 guilders.
  - id: animalcules   year: 1676.77   side: world
    label: Tiny animals in pepper water  place: delft
    when: 1676 · Delft to London       title: Leeuwenhoek writes to London
    text: The same year he was made trustee of Vermeer's estate, Leeuwenhoek wrote to the
          Royal Society about tiny animals swimming in a drop of water.
places:
  delft:        Delft             52.01   4.36   person
  jingdezhen:   Jingdezhen        29.27 117.18   world   card: east
  woolsthorpe:  Woolsthorpe       52.81  -0.63   world
  utrecht:      Utrecht           52.09   5.12   world
  amsterdam:    Amsterdam         52.37   4.90   world    (21 Sept)
  paris:        Paris             48.86   2.35   world    (21 Sept)
region: north-sea-and-paris
```

**Added 21 Sept, at Michael's request:** *Rembrandt paints The Night Watch* (1642, Amsterdam);
*Newton born* (Christmas Day 1642 by the English calendar, Woolsthorpe — he would work out the
laws of motion, the law of gravity, and calculus; Michael wrote "laws of gravity", and the
singular is Newton's); *Molière's The Bourgeois Gentleman* (1670, Paris; first played for the
King at Chambord in October, then in Paris in November). Paris would not fit the old `north-sea`
crop, so the World now sits on `north-sea-and-paris` (3°W–12°E, 48.3°N–54.6°N). Vermeer's *Born*
dot was hidden under Leeuwenhoek's (four days apart); `timeline.js` now parts two dots that
would touch — the person's rises off the line, the world's drops — and draws the person's on top.

```
```

Crowding: nine of the twelve events are in Delft, and five of them within a year of another.
That is the point the spec makes about crowded years hanging down a long way, and it is true
here: his whole life happened in one town.

---

## Notes for us

**Delft, in the flow (22 Sept, Michael).** *View of Delft* is no longer behind a tap on the
margin map. It sits in the story, full width, right after "Delft was a town of canals…", under
a new line: "This is what Delft looked like to Vermeer. He painted it when he was about
twenty-eight." Its caption ends **Next: a map of the town**, and the picture becomes Blaeu's
plan in the same slot (`js/stack.js`, which now carries each step's `ratio`, since the two
pictures are not the same shape, and calls back so the plan's marks come and go with it). The
margin map is a plain map again, with Delft's own note back on its dot. The marks are dark blue
(#23355c): copper and vermilion were too near the colour of the roofs (Michael).

**The blue in three pictures, and six places on the plan (22 Sept).** The margin figure beside
*The blue* is a **stack** (`js/stack.js`): the stone from Sar-e-Sang, the powder washed out of
it, and a close crop of the turban from our own scan. A bold word at the end of the caption
names the next one and comes round to the first. Blaeu's plan now carries six marks: the New
Church (baptised), the market square, Vermeer's house, the Old Church (buried), Leeuwenhoek's
house, and where he stood to paint *View of Delft*. The churches, the market and the harbour
are drawn on the plan and can be pointed at; the two houses are only as good as the street, so
they say *about here*, and the caption says so too. The marks fade while she pinches, because
the picture moves under them and they would lie. **The gunpowder store is not marked:** the
1649 plan does not label the convent it was kept in, and a dot placed by memory would be wrong
by a couple of hundred metres.

**Revisions of 22 Sept (Michael's list).** The gunpowder is "about forty thousand kilograms:
forty tonnes" (80–90,000 lb; the Dutch pound of the day was within a percent of the English).
A line on craquelure after the painting's size. *Sample colours* (renamed from *Sample a
colour*) is a word in the left column, and all the painting's tool words live there, as in
Glass Geometry; the text says "Tap *Sample colours*" and not "on the left", because on a phone
the column folds into the text. The Delft margin map is now a tap target: it opens *View of
Delft* and Blaeu's 1649 plan full width below the Delft paragraph, each with the magnifier
and pinch (no colour reading); tapping again puts them away. Delft's own map text went,
since a tap on the map now means the pictures. The lapis map carries the three legs as notes
(caravan about five months; ship one to two; Alps and Rhine about six weeks), and Venice and
Delft have a line each. On a phone the Alps note is dropped for want of room; the text still
gives the total. The Leeuwenhoek picture is now his flea (figure 7 of the Wellcome plate).

**Revisions of 21 Sept (Michael's list).** *Afterwards* ends on a new paragraph: "Today the
painting is one of the most famous in the world. It is priceless." In *More*: Leeuwenhoek now
builds "some of the first useful microscopes" (a single glass bead in a metal plate), with a
margin picture of figures A–D from the plate facing p. 337 of *Arcana naturae detecta* (1695),
which the Wellcome Collection catalogues as bacteria — the caption says only "tiny living
things", because which letter those figures illustrate was not confirmed. *Elsewhere, at the
same time* became **Newton**, in Michael's words. New: **Molière** (Monsieur Jourdain and prose,
with one line saying what prose is) and **Rembrandt** (Amsterdam, about sixty km off; *The Night
Watch* in the margin; the name came later, when the varnish darkened; Fabritius was his pupil;
he died poor in 1669). Order in *More* is Leeuwenhoek, Newton, Molière, Rembrandt, so each
margin picture lands beside its own paragraph. A candidate if the bacteria figures read as too
bare: Leeuwenhoek's flea plate (Wellcome M0016633, CC BY 4.0) — the downloads stopped before
it could be fetched.

**What to cut first.** *More* before anything in the body. In the body, the Delftware
paragraph: it is lovely and it is the weakest link to the beat. It stays for now because it
sets up a second, cheaper blue that sat in every kitchen in Delft while Vermeer used the dear
one — which is the beat said another way, without anyone saying it.

**Remember.** Not on the page; no practice queue.

**The date line.** Spec-Timeline-and-Map puts "a single date line" at the front of a story and
the prototype has none, so the form is Hokusai's subtitle, which Michael kept. If the date line
is meant to be something else, it's one line to change here and in Hokusai.

**The Hokusai page and `sampler.js`.** Hokusai still carries its own inline copy of the tool,
without either fix above. It should switch to `js/sampler.js` in the same Claude Code pass
that converts it to *Hokusai's World*. Until then its text ("drag it about to look") promises
something its page doesn't do.

**Honesty checks, one per claim that could be challenged.**

- *No hook.* Mauritshuis, 28 April 2020: "the hook to hang the 'pearl' from her ear is missing."
- *The pearl is touches of white.* Same release: "translucent and opaque touches of white paint."
- *44.5 × 39 cm.* Mauritshuis collection page.
- *A tronie.* Mauritshuis collection page: "a painting of an imaginary figure."
- *"The kind of foreign-looking dress Dutch painters liked to put on a model."* The collection
  page's "exotic dress, wearing an oriental turban". The story does not claim nobody wore one.
- *Eyelashes, found 2020.* Vandivere, Wadum and Leonhardt 2020, and the release.
- *350 years.* About 1665 to the 2018 examination.
- *Baptised 31 October; Leeuwenhoek four days later.* Essential Vermeer chronology (31 Oct,
  Nieuwe Kerk); Essential Vermeer on Leeuwenhoek (born 24 Oct, baptised 4 Nov, Nieuwe Kerk).
- *Leeuwenhoek "the first person to see living things far too small for any eye".* The
  standard credit for microorganisms, from his 1676 letter. Hooke's *Micrographia* (1665) came
  first but showed things a sharp eye can find, like mould; the claim is worded to that line.
- *A quarter of the fee.* Essential Vermeer: 1.5 of 6 guilders on 29 Dec 1653, the rest 24 July 1656.
- *The inn on the market square.* Mechelen, his family's inn. Essential Vermeer, and the EID essay.
- *"A houseful of children."* Sources disagree (eleven named; fifteen in other counts). No number.
- *About thirty-five paintings.* Usual count 34–37.
- *Died at 43, December 1675.* Essential Vermeer.
- *The baker, 617 guilders, the next month.* 26 Jan 1676, 617 guilders 6 stuivers. "About
  three years of bread" is the usual reading of the sum; "about" is doing work.
- *Four potteries in 1647, more than twenty by 1661.* Essential Vermeer on the VOC and Delft.
- *China fell into a war in the 1640s and porcelain stopped coming.* The Ming fell in 1644;
  Essential Vermeer: imports "stagnated around 1645".
- *Tin glaze and cobalt.* Royal Delft (tin); cobalt is the standard blue of blue-and-white.
- *The explosion.* 12 Oct 1654, morning; 80–90,000 lb; "more than two hundred houses";
  Fabritius "died at his easel". Essential Vermeer. The story does not give a death toll,
  because nobody knows it.
- *Nearly all lapis from one set of mines in northern Afghanistan, via Venice.* van Loon 2020:
  "mined in Afghanistan … imported through Venice". The mines (Sar-i-Sang, Badakhshan) are the
  standard attribution; the story doesn't name them.
- *The recipe, around 1400.* Cennino Cennini; Ganio and others 2018: grind, knead into rosin,
  mastic and wax, massage in water, repeat for paler grades.
- *Heated to about 600 °C.* van Loon 2020. *Why*: the story says nobody is sure.
- *Three sulfur atoms with an extra electron, in cages.* The trisulfur radical anion in the
  sodalite cage; Ganio and others 2018. Absorbs around 600 nm.
- *More precious than gold.* Mauritshuis release, verbatim.
- *Ultramarine in the jacket's shadows and a trace in the skin.* van Loon 2020, verbatim.
- *The curtain.* Vandivere 2020: charcoal underlayer, weld and indigo glaze, faded; the
  release: "diagonal lines and colour variations that suggest folded fabric in the upper
  right-hand corner".
- *"Two hundred years" forgotten.* Vermeer was largely forgotten until Thoré-Bürger's articles
  of the 1860s. Loose, and worded "hardly anybody remembered".
- *1881: two guilders thirty, about thirty euros, de Stuers and des Tombe.* Mauritshuis, "How
  much is the Girl worth?" The bequest was 1903.
- *Icke and the pearl.* Vincent Icke, astrophysicist, 2014, *Nederlands Tijdschrift voor
  Natuurkunde*; reported in the New Statesman, 2016. Stated as his suggestion.
- *English lead.* Vandivere 2020: lead isotope analysis. "Differs from one mine to another" —
  the principle, not a survey.
- *Cochineal from Mexico.* Van Loon lists red lake (cochineal); cochineal is a Mexican and
  Central American insect.
- *Leeuwenhoek trustee, 1676; the letter, 9 Oct 1676.* Essential Vermeer (30 Sept 1676); Lens
  on Leeuwenhoek (letter L-040). Whether they were friends: Mitchell 2026, "we will never know".
- *Newton's prism "while Vermeer was painting her".* Newton's prism work was 1665–66. The
  painting is dated "about 1665". Close enough to say *while*; not a date claim.
- *The VOC ran Dejima for nearly 160 years.* 1641–1799. **Not** claimed: that the VOC brought
  Prussian blue to Hokusai — it had been dissolved by then.

**Not checked.** The EID essay's author's full name (the citation gives "Mitchell L.").

---

## Sources

- Abbie Vandivere, Jørgen Wadum and Emilien Leonhardt, "The Girl in the Spotlight: Vermeer at
  work, his materials and techniques in *Girl with a Pearl Earring*", *Heritage Science* 8, 20
  (2020). Open access.
- Annelies van Loon and others, "Out of the blue: Vermeer's use of ultramarine in *Girl with a
  Pearl Earring*", *Heritage Science* 8, 25 (2020). Open access.
- Monica Ganio, Emeline Pouyet, Samuel Webb, Catherine Schmidt Patterson and Marc Walton,
  "From lapis lazuli to ultramarine blue: investigating Cennino Cennini's recipe using sulfur
  K-edge XANES", *Pure and Applied Chemistry* 90 (2018).
- Mauritshuis, "Closer to Vermeer and the Girl" (press release, 28 April 2020); the collection
  page for inventory 670; "How much is the Girl with a Pearl Earring worth?"
- L. Mitchell, "Delft Neighbors — Vermeer and van Leeuwenhoek", *Emerging Infectious Diseases*
  32, 6 (2026), 1033–1035.
- Essential Vermeer (Jonathan Janson): the chronology; the Delft Thunderclap; the VOC in Delft;
  Vermeer's children; Leeuwenhoek and Vermeer.
- Lens on Leeuwenhoek: letter L-040, 9 October 1676.
- New Statesman, "The Girl with a Ball Bearing Earring?", October 2016 (Icke).
