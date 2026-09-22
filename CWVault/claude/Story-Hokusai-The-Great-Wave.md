---
title: "Hokusai: The Great Wave"
subtitle: "~11,830 after the ice, or 1830."
year: 1830
cw_year: 11830
placement: across, with a left margin      # the 20 Sept ruling
touches: [colour, pigment, chemistry, printing, Japan, Edo, trade, iron, light]
links: [chartres-blue-glass, starry-night, tambora, frankenstein, faraday, maps]
tools: [painting-timeline, colour-sampler, maps]
maya: none            # Remember is not summoned: the practice queue does not exist yet
status: built, unhung; words read once by Michael and revised (20 Sept)
built: cw-deploys/active/hokusai-the-great-wave.html   # hung 20 Sept
picture: art/hokusai-the-great-wave-gallery.jpg   # the whole print, 600 px wide, never cropped (Spec-Gallery, 21 Sept)
frame: "#2e4a63"                                  # the deepest blue in the print
frame-width: 12
size: large
icon:                                             # the tab icon, square, per the Page standard; not the gallery picture
  from: art/hokusai-great-wave.jpg
  crop: [330, 150, 930, 750]        # the crest and its claws
  file: art/hokusai-icon-256.png
image:
  file: art/hokusai-great-wave.jpg
  source: "The Metropolitan Museum of Art, New York, accession JP1847 (DP141063), open access"
  license: "CC0 / public domain"
  note: "Resized to 1800 px wide, quality 85, from the museum's 3863 px original. A strong, unfaded-blue impression with its paper margins."
maps:
  - region: japan            # in the margin, beside "The country with its door shut"
  - region: western-europe   # in the margin, beside "The blue"
  - region: world            # full shell, after More
---

# Hokusai: The Great Wave

**Brought into line with the Vermeer page, 22 Sept** (Michael: yes to a longer line and a
dashed route; asked for Egyptian blue in the margin). What changed:

- The 40-year line at the head is gone; the subtitle is the date line. **Hokusai's World**
  follows *More* (`js/timeline.js`): 1760–1855, his life above the line (born, Shunrō, the
  name Hokusai, the first *Manga* in Nagoya, the Wave, "nothing before seventy", his death),
  the world below (the *Phaeton* at Nagasaki 1808, Tambora, Mary Shelley at Geneva 1816, the
  dear blue c. 1820, the 1825 order, the cheap blue from Zhapu, Faraday, Hiroshige's Tōkaidō
  with its road drawn when selected, photography, Perry). The map is a new crop,
  `japan-and-china` (110–146°E, 20–42°N); London, Paris, Geneva and Tambora are cards on the
  west edge. Mary Shelley and Tambora are there for the next story as much as this one.
- **The years before 1800 filled in** (Michael's list, 22 Sept, with two of mine): Harunobu's
  first full-colour prints (1765 — the invention the Wave is made of); the Meiwa tsunami
  (1771); *Kaitai Shinsho* (1774); Gennai's elekiter (1776); Uranus (1781); Asama and the
  Tenmei famine (1783, which rhymes with Tambora thirty-two years later); Shiba Kōkan's
  copperplate and Western perspective (1783 — why Fuji can be small and far); *The Marriage of
  Figaro* (1786); the French Revolution (1789); *Dream of the Red Chamber* in print (1791).
  Michael cut Prince Sado's death (1762): unforgettable, and connected to nothing else in CW.
  New places: the Yaeyama Islands, Mount Asama, Beijing. The six European events share one
  card, **Europe**, because five separate cards crowded the map's edge; `timeline.js` grew a
  `spread` place for it, whose window shows the towns themselves rather than a dot called
  Europe. In that window Geneva and Vienna are usually dropped for want of room — the panel
  still names them.
- **The cyanide, and the industry** (Michael, 22 Sept). *Is it poison?* — the cyanide is real
  cyanide, held so tightly to the iron that the blue is harmless, and is in fact a medicine
  (Prussian blue is given for swallowed radioactive caesium or thallium); the colours around it
  on this sheet were the deadly ones — orpiment is arsenic, red often meant mercury, white meant
  lead. Then: the makers kept the recipe secret for eighteen years, it was printed in London in
  1724 (Woodward, *Phil. Trans.* 33), and after that the blue was made in barrels. That is how a
  Berlin accident becomes cheap colour on a Chinese junk. **Scheele's green** (1775) went on the
  line for the same reason, and makes the poison point without explaining it.
- The world map that ended *More* moved into *The blue* as the map of **the two ways the blue
  came**: the Dutch way (Amsterdam, round Africa, Batavia, Nagasaki) and the Chinese way
  (Canton, Zhapu, Nagasaki), then on to Edo — all dashed (`possible`), with a paragraph of
  rough times: five or six months to Batavia; one or two Dutch ships a year to Nagasaki; a
  week or two by junk from Zhapu; a month or so from Nagasaki to Edo. None of it is a
  recorded journey and the text says so.
- **Egyptian blue** in the margin beside its paragraph: a heap of the powder (Commons, public
  domain), with a caption on what it is and its infrared glow (Verri 2009).
- The magnifier and sampler are `js/sampler.js`, with this sheet's own words for its doubts
  (the new `hedge` option). Drag now slides the magnifier, as the text always said.
- *Sample colours* and the other tool words live in the left column.
- The look is `css/story.css`, shared with Vermeer.

*The page is the text of record: `cw-deploys/experiments/hokusai-the-great-wave.html`.
This file holds the frontmatter, the tool specs and the notes.*

---

## The tools this story calls

### 1. The timeline (new; the first of the painting series)

Static. Nothing animates. One line at the head of the page, the full width of the shell.

1815 to 1855, nine events plus the print's own marker in copper at 1830. Plain years, per
the Rulings. Labels hang below the rail on thin leaders and pack into as many rows as they
need — a label goes in the lowest row where it does not touch a neighbour, and each row is
as tall as its tallest label — so the arrangement survives any event list.

**The span, and why.** From the earliest event that explains the picture to the latest event
the picture explains: Tambora in 1815 at one end, the American warships in 1853 at the other.
That is now a ruling (`Rulings-Sept-2026.md`, "How wide a timeline is"), made because this
story wanted forty years and had been asked for twenty or thirty.

**What was cut.** A 12,000-year line ran above this one on 19 Sept, with sixteen markers from
`stories/events.json` and a copper wedge joining its last three pixels to the ends of the
short line. Michael cut it on 20 Sept: the long line is context she will read elsewhere, and
in a story it competes. The build is in git history if a later story wants it back.

### 2. The magnifier, the zoom, and the colour sampler

One picture, three behaviours, one gesture.

**Tap** the print anywhere and a 148 px circle sits there showing the print at four times the
size, with a small crosshair at its centre. Drag the circle to move it; tap somewhere else to
jump it there. *Put the magnifier away* removes it. This works from the moment the page loads,
because the first thing the story asks her to do is count three boats that are easy to miss.

**Pinch** zooms the print in place, up to six times. Two pointers on a touch screen;
`ctrl`+wheel and `gesturechange` on a Mac trackpad. Once she is zoomed in, one finger pans and
the frame takes `touch-action: none`; *The whole print* gets her out. At rest the frame is
`touch-action: pan-y`, so a finger on the picture scrolls the page as it always does.

**The magnifier is the sampler** (Michael's ruling, 20 Sept). Before the text says *Sample a
colour* it only magnifies. After, the print moves down the page into the tool's slot, widens
to the shell, and the same circle also reports what is under its crosshair: a swatch, the hex
and `rgb()` values, the nearest pigment and a sentence of its chemistry.

**Where the pigment list comes from.** Nine anchors, each measured off *this* scan rather than
taken from a swatch book, because this sheet has faded and the honest question is what the
photograph actually holds. Match is nearest neighbour in CIE Lab. Three rules:

- if the two nearest anchors are within ΔE 4.5 **and are different materials**, the tool names
  both and says the colour alone cannot separate them (this happens over most of the sky,
  where the thinnest grey and the browned paper have converged);
- if they are the same material (two strengths of Prussian blue, two states of the paper), it
  names the nearer and says nothing about the tie;
- past ΔE 22 it says the colour is between two printings rather than picking one.

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

### 3. Three maps

Through `maps/map.js` and the base pictures in `art/maps/`. Two of them sit in the story's
left margin; the world map runs the full shell after *More*.

- **`japan`** (rendered for this story), beside *The country with its door shut*: Nagasaki
  `lit`, Edo named, Kyoto `minor`, and the Pacific as a `water` note. Tapping Nagasaki gives
  Dejima.
- **`western-europe`**, beside *The blue*: Berlin `lit`, with Amsterdam, London and Paris
  `minor` — Amsterdam because the story says the blue arrived from Holland twice and nothing
  else on the page shows where that is.
- **`world`**, after *More*: the five places the story names — Berlin (`lit`), Canton, Zhapu,
  Nagasaki, Edo — at full size, with London, Paris, New York and San Francisco `minor` for
  bearing, and the Pacific and the Atlantic as water. The route the colour took, and nothing
  else on it.

The marks carry no `side` hints. The map pass of 20 Sept gave `map.js` a placer that tries
eight positions round each dot and takes the calmest ground, and it is better at this than a
story chat guessing; `side` exists for when a story has a reason, and here it has none.
Nothing was dropped for want of room, at 300 px or at 1028.

A margin map is not named by the text. It carries its own caption and the prose never mentions
it, which is the difference between a picture the story stops for and a picture that answers a
question she may not have asked. That is now a ruling.

---

## Notes for us

**The beat.** The blue in this wave is a colour that a paint-maker in Berlin made by accident,
and it reached a country that had shut its doors. Everything else — the boats, the blocks, the
price, Edo — is there to carry it.

**What to cut first.** *Afterwards* could go and the story would still stand; it is there
because the ending it gives (hardly any two surviving sheets are the same colour any more, and
the wave is the last thing standing in all of them) pays off the colour tool. After that, the
paragraph on Egyptian blue.

**Remember.** Not on the page. Maya is absent, the inscription may only appear when the text
names what goes in the practice queue, and there is no practice queue.

**Dates.** The subtitle carries the after-the-ice count; Michael kept it on 20 Sept even after
the long timeline came out, so it now stands on its own. Everywhere in the prose the years are
plain: 1830, 1706, 1849.

**Two labels corrected rather than taken as written.** Michael asked for "Faraday's first
electric motor" — that was 1821, and 1831 is the induction experiment, so the 1831 marker reads
*Faraday gets electricity from a magnet*. And he asked for "Japanese Emperor expels foreigners"
— the Emperor had no power, the shogunate did, and the 1825 order was to drive off approaching
ships rather than to expel anyone resident, so it reads *Japan orders foreign ships driven
away*.

**Honesty checks, one per claim that could be challenged.**

- *Thirty people.* Three boats, eight rowers and two more in each bow. The count is the
  standard one and it can be made from the print itself — which is what the magnifier is for.
- *About seventy.* Hokusai was born in 1760; the sheet is 1830–32. So 70 to 72.
- *Four men.* Publisher, artist, cutter, printer. Some sheets involved more than one cutter;
  "four" is the shape of the trade, and the text says "took four people".
- *Most artists in Japan changed their names too, though not thirty times.* Changing art-names
  was ordinary practice; thirty is exceptional even so, which the qualifier says.
- *The drawing was destroyed.* True of the standard method: the `hanshita-e` was pasted face
  down and cut away. A very few survive because they were never used.
- *Potash is refined wood ash.* Potassium carbonate, leached from ashes. Michael's phrasing,
  and accurate.
- *Two helpings of noodles.* Korenberg's figure, for the middle of the century.
- *A hundred and eleven sheets.* Korenberg located and photographed 111. Others put the number
  of known first-edition impressions slightly higher. "Have been found and photographed" is the
  claim that is safe.
- *Eight thousand from a set of blocks.* The Asian Art Museum's figure for a well-used set; it
  is also the figure usually quoted for the total printed of this design, and the two are not
  the same thing. The text keeps them apart.
- *More than a million people in Edo.* British Museum, for the early 1830s.
- *Dejima, about 120 metres long.* The island was roughly 120 × 75 m.
- *Diesbach, around 1706, trying to make red.* The account comes from Stahl, 1731, written
  twenty-five years after the event; "around" is doing real work.
- *Red goes in and does not come out.* Intervalence charge transfer, absorbing around 680 nm.
  Simplified but not falsified.
- *The first blue anybody made on purpose in a workshop.* Corrected in the text: Egyptian blue
  was manufactured three thousand years earlier and the recipe was lost.
- *Cheap Prussian blue from China around 1829.* Smith's account, and the standard one.
- *Zhapu.* Its merchants held the trade with Japan; junks for Nagasaki sailed from there. The
  map says that and does not claim that this particular pigment came on one of them.
- *The blocks are lost.* Korenberg. Nobody knows when.
- *The sky is different in every copy.* Follows from `bokashi` being wiped by hand for each
  sheet. Stated as a consequence, not as a survey.

**Not checked.** The volume and page numbers of the Cartwright and Nakamura paper; author,
title, journal and year are confirmed, the rest was behind a paywall.

**One thing found at the bench worth keeping.** The print must carry `draggable="false"` and
`-webkit-user-drag: none`. Without them a native image drag fires `pointercancel` one move into
a pan and the picture stops dead, which looks like a bug in the pan and is not.

**Open.** Whether the left margin should carry the deeper parchment tone and the 0.5 px
separator that `UI-Language.md` §1 gives the context membrane. Left plain for now, so the page
does not have a mostly-empty panel running down it. Michael's ear.

---

## Sources

- Capucine Korenberg, "The making and evolution of Hokusai's *Great Wave*", British Museum,
  2020 (a version appears in *Late Hokusai: Thought, Technique, Society*, ed. Timothy Clark).
  Survey of 111 impressions, the eight states, the pigments, the price, the lost blocks.
- Henry D. Smith II, "Hokusai and the Blue Revolution in Edo Prints", in *Hokusai and His Age*,
  ed. John T. Carpenter, Hotei Publishing, 2005. Prussian blue's arrival.
- Julyan H. E. Cartwright and Hisami Nakamura, "What kind of a wave is Hokusai's *Great wave
  off Kanagawa*?", *Notes and Records of the Royal Society*, 2009.
- The Metropolitan Museum of Art, *Under the Wave off Kanagawa*, accession JP1847. Date,
  dimensions, medium, and the image.
- "The Ukiyo-e Woodblock Printing Process", Asian Art Museum, San Francisco. Blocks, `kentō`,
  `baren`, sheets per day, sheets per block set.
- British Museum, "Historical city travel guide: Edo (Tokyo), early 19th century". Edo's
  population; the price of a print.
- MFA CAMEO, "Prussian Blue: Ukiyo-e colorant". *Bero-ai*; Chinese production making it
  affordable in the late 1820s; what it replaced.
- The *Hōei* eruption of Mount Fuji, December 1707, and the ash over Edo.
