---
status: Live, hung 23 Sept 2026. Words agreed with Michael; page written, tested, previewed, revised; read by Michael and committed the same day.
role: The third painting story. Built on Story-Pattern.md, with the Vermeer page as the model.
related: Story-Pattern.md, Story-Vermeer-Girl-with-a-Pearl-Earring.md, Story-Hokusai-The-Great-Wave.md, Story-Voice.md, Spec-Timeline-and-Map.md, Publishing-a-Story.md
placement: across, with a left margin
page: cw-deploys/active/van-gogh-starry-night.html
gallery: { slug: van-gogh-starry-night, title: "Van Gogh: Starry Night",
  picture: art/gallery/van-gogh-starry-night-gallery.jpg, frame: "#2a4192", frameWidth: 12, size: large }
---

# Starry Night

The page carries the words; this file carries the rulings, the reasons, and what is still open.

## Michael's rulings

- **"Plainly, in his own terms, no drama."** No diagnosis, no myth, no ear. Refined
  22 Sept: the story *is* dramatic; what we avoid is the kind of drama that makes him
  trivial.
- **Say why he went.** Leaving it out reads as a page keeping a secret. His reason was
  practical — he was afraid of himself and he wanted to keep working — and a child can
  follow that all the way through. Use *afraid* and *spells*, never *depressed* or
  *anxious*: a clinical word hands her a diagnosis.
- **Quotations set apart.** Michael: "Set apart they are more noticeable, they tell the
  child 'this is what he said'." Three letters carry the page: 760 (why he went), 777
  (the morning star), and the late-November letter to Bernard (his own verdict).
- **Southern France, not Provence**, except in the spire line where the contrast does
  the work.
- **The Eiffel Tower goes on the line, not in the body.** It has been stealing the show
  for 150 years and must not steal this one. The ten thousand gas lamps live inside the
  event panel she opens herself.
- **Timeline labels are short** (23 Sept). Michael's examples: *Faraday's generator*,
  *First photos*, *Origin of Species*, *Edison's lightbulb*, *Eiffel Tower*, *Johanna
  publishes Van Gogh's letters*, *Starry Night in New York*. The first five are shared
  labels and were changed in `stories/world-events.json`, so Hokusai and Vermeer get
  them too.
- **The sampler's control words go under the painting** (23 Sept), not in the left
  column, once the picture opens — otherwise a child may never notice them. Done on all
  three painting pages; the summoning word *Sample colours* stays in the left column.

## The beat

What he saw, what he moved, and what he brought with him. The sky was there and can be
checked. The cypress was there, but not like that. The village was not there at all, and
its spire is Dutch.

## The shape of the page

1. **Van Gogh: Starry Night** — *~11,889 after the ice, or 1889.*
2. **Look at the big star.** The painting full width, captioned *Tap the big star to the
   right of the tree*. It is Venus, and it was really there.
3. **The window.** The asylum in one plain paragraph, then letter 760 set apart, then
   the spells, then letter 777, then: *He painted this about two weeks later.*
4. **What was out there.** The sky (checkable), the tree (there, but not like that), the
   village (not there; the spire is Dutch).
5. **What the sky is made of.** *Sample colours* in the left column. Ultramarine back to
   Vermeer's lapis, Guimet's oven, cobalt, the yellows, indian yellow's unverifiable
   story, emerald green and its arsenic, and the cypress with its probable Prussian blue
   — the tie back to the Great Wave.
6. **Afterwards.** His own verdict, then the painting's travels, then: *It is in New
   York now, and people queue to stand in front of it.* The margin map of the journey
   sits here.
7. **More.** Johanna, Theo, Japan (margin: the Hiroshige he copied), the building.
8. **Vincent van Gogh's World**, then **References**.

## What was built, 23 Sept

**Art.** `art/stories/van-gogh/van-gogh-starry-night.jpg`, 1800 × 1425, 738 KB — the Google Art Project
scan from Wikimedia Commons, public domain. A 600-px gallery copy, and a tab icon cut
from the moon. `art/stories/van-gogh/hiroshige-sudden-shower.jpg`, 900 × 1364, for the Japan door.
Van Gogh's own copy of that print is still to fetch; it would make that margin picture a
two-step stack — the print he owned, then the copy he made.

**Sampler.** Sixteen anchors, each measured off this scan as a median over an 11 × 11
patch, at places the MoMA / Rochester Institute of Technology pigment maps identify.
The white anchor says plainly that lead white and zinc white are the same colour to look
at and only a laboratory can tell them apart. The *fair* hedge names the impasto: the
paint stands half a centimetre off the canvas and casts its own shadows.

The emerald green around the moon is **not** an anchor. It is named in the prose but
could not be pinned on this scan with confidence, and a tool that guesses is worse than a
tool that stays quiet.

**Maps.** Two new renders:

- `france-and-the-low-countries` (−6 to 10 E, 42.5 to 53.5 N), 2000 × 2055 — portrait,
  which is what a 300-px margin column wants. It carries the painting's own travels and
  a note at the west edge: *and then New York, 5,800 km west*.
- `france-to-the-north-sea` (−10 to 20 E, 41.5 to 53.5 N), 2000 × 1184 — wide and
  shallow, about 610 px tall at full width, for the World. The first attempt used the
  portrait crop there and ran over 1,000 px tall, which breaks the rule that the words
  should be near whichever end she taps.

**Shared list.** Four events added to `stories/world-events.json` — Daumier's
*Gargantua* (1831), *Origin of Species* (1859), Edison's lightbulb (1879), the Eiffel
Tower (1889) — and seven places to `stories/places.json`.

**Shared look.** `css/story.css` gained a `blockquote` rule and `.cite`. Set-apart
quotations belong to the pattern now, not to this page.

**Tested.** Headless Chromium at 1440 × 1100 and 390 × 844, all three painting pages: no
console errors, no failed requests, no horizontal scroll, maps and World built, both
quotations rendering, the sampler naming the big star correctly, and the control words
landing under the picture.

## Vincent van Gogh's World, as built

1830 to 1950 — longer than the other two, because this is the one story where the thing
outlives the man by fifty years.

From the shared list: Faraday (1831), Daumier (1831), first photos (1839), Perry's ships
(1853), *Origin of Species* (1859), Edison's lightbulb (1879), the Eiffel Tower (1889).
Four carry a `why` in this story's voice; the Eiffel Tower's reads *"It opened to the
public the week Van Gogh entered the asylum. His brother was in that city."*

His own, above the line: born at Zundert (1853), Paris (1886), Arles (1888), into the
asylum (May 1889), Starry Night (June 1889, the focus), dies aged 37 at Auvers (1890),
Theo dies (1891).

The painting's own, below: Johanna publishes Van Gogh's letters (1914), Starry Night in
New York (1941).

Far places as cards: New York and Menlo Park west, Edo east.

**Still wanted:** the second path — his own life across Europe — in the same margin
frame, switched by the stack word. That needs one live map swapping its marks rather
than two pictures in `stack.js`, and it is the one new piece of machinery this story was
always going to spend.

## References

- The Museum of Modern Art, New York, *The Starry Night*, 472.1941 — catalogue entry,
  credit line and provenance.
- Van Gogh Museum / Huygens edition of the letters, vangoghletters.org: 760 (Theo,
  21 April 1889), 777 (Theo, early June 1889), and the late-November 1889 letter to
  Émile Bernard.
- ColourLex on the pigment maps made by MoMA and the Rochester Institute of Technology.
- Van Gogh Museum on Johanna van Gogh-Bonger and the family collection.

## Still to check

- The prize money Guimet won in 1828.
- Whether the indian yellow identification is firm or a best guess.
- Whether the painting crossed the Atlantic in 1938 or travelled with Rosenberg in 1940
  — the difference between a shipping crate and an escape.
- Which star in the picture is Venus. The page points at the big one to the right of the
  cypress, which is the usual identification, but it is not sourced in this file yet.
- Whether there is a firm scholarly view on the cypress, or whether "nobody knows"
  stands.
- Cobalt blue's price against ultramarine's in 1889. The page says cobalt cost more;
  that is the received account but it is not checked.
- How many paintings he made in the Saint-Rémy year (the usual figure is about 150).

## Added to the story queue, 22 Sept

- **Why you've heard of Van Gogh** — the Johanna story. A painter nobody bought, a widow
  who read seven hundred letters, and a fame that was made on purpose by somebody whose
  name is not on it.
- **Daumier's *Gargantua*** — December 1831, six months in prison for drawing the king
  as a giant being fed by the poor. The same year as the Great Wave and Faraday's magnet:
  three dots on one year of the shared line, in three different trades, one of them a man
  going to jail for a picture. Now on the shared list as `daumier-gargantua-1831`.
