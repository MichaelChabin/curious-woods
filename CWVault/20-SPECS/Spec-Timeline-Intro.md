---
kind: mechanic
status: warm
intuitions: [i13, i05, i03, i14]
domain: [history, astronomy, geography]
era:
place:
scale: [time]
lab: none
hook: The dot leaves the ice, rolls up eleven thousand years, and stops at the year the story starts.
---

# Spec — Timeline Intro

*Working name: After the Ice. Established 7–8 Sep 2026 from two Cowork sessions with Michael (Eileen present for the second). Prototype: `cw-deploys/experiments/timeline-bench.html`. Data: `cw-deploys/stories/events.json`.*
*Status: built as a bench, most rulings in; open questions in §9. Sits beside `Spec-Timeline-Graph.md` (the Lab) — this is the Lab's front door, not the Lab.*

---

## BRIEF

Every dated story opens with a short animation that places its year on the whole of
human history. A copper dot leaves year 0 — when the ice let go, about 12 000 years
ago — and travels to the story's year in about ten seconds, leaving events behind it
as it passes. The child can stop it and tap anything. The events are drawn from a
worldwide pool and differ every run, so she keeps meeting new ones. The dashboard
carries her own copy that accumulates every event the intro has ever shown her.

**Pillar: Stories** (shared infrastructure, like Postcard). **Serves i13** (historical
sweep: the whole point), **i05** (the odometer makes 11 816 a distance, not a number),
**i03** (the same year as a position, a rolling count, a label, a sentence) and
**i14** (three independent inventions of farming on one axis).

What it is testing: **can ten seconds, repeated, give a child a felt sense of the
order and rate at which civilization arrived?** Michael's own marker: he has a good
grasp of history and a weak sense of *when*, and blames BC dates; Eileen and he both
learned things from the first run (the Greeks added vowels to the Phoenician alphabet).
The feeling of fluency arrives when a new fact has somewhere to land — roughly five
anchors per millennium, each met several times.

---

## 1. The calendar

Year 0 = 10 000 BCE, per `00-FOUNDATION/CW-Date-Convention.md`. Today is 12 026.

**The name of year 0 is "after the ice."** Tested as a suffix: *Socrates was born about
9 530 years after the ice.* Chosen over "when the glaciers began to melt" because it is
a noun phrase, a child who has never seen a glacier can picture ice going away, and
because the melting actually began ~20 000 years ago and stalled; the warmth *stayed*
about 11 700 years ago, which is when Göbekli Tepe, wild barley and the first villages
appear — so the road starts and things happen at once.

**Written dates.** Michael's ruling, 8 Sep: the CW year first, the conventional year
in parentheses — `11 752 after the ice (1752)`, `about 6 500 (3500 BC)`. "About" is
used generously before the story's own lead-up, where dates are exact.

**Two conventions disagree and the prototype follows neither fully — reported, not
resolved.** `CW-Date-Convention.md` (March) writes `12,026` with commas and quiets the
leading 1; `Spec-Timeline-Graph.md` §2 (August, newer) rules **no commas anywhere in
CW**, thin-space grouping (`12 026`), and quiet digits computed from what is on screen.
The prototype writes commas because Michael wrote them that way on 8 Sep. When it moves
toward `active/` it should write numbers through `js/cw-number.js` (which is *how a
number is written, everywhere*) and let that settle it. The landing line already says
"the year we call 1816," which is the quiet-1 idea in words.

**Deep time.** Michael raised it again on 8 Sep: put year 0 at the Earth's formation so
that today reads ~4 565 712 026, and every timeline is a magnified piece of the one
before it, attached at scale. This is exactly `Spec-Timeline-Graph.md` §2 (digits are
only ever added on the left; today always ends `…12 026`; seven tiers). That spec's
tier-6 figure is `4 575 712 026`, Michael's was `4 565 712 026`; the spec's rule stands
and the digit is an "about" either way. The intro does **not** implement deep time.
Ruling from the conversation: "after the ice" stays the child's everyday calendar, the
one she does sums in; the Earth line is a story she meets later, the day she learns the
ice road was never the beginning either. The odometer already rolls ten digits.

---

## 2. Three tiers, three questions

Each tier answers one question, at its own scale, and none has to lie because the top
one never moves.

**Tier 1 — the fixed line. "How far?"** Full width, 0 at the left, *now* at the right,
ticks every 1 000 years, labels at 5 000 and 10 000. Never rescaled. Diamonds appear on
it as events are passed; the destination's diamond is copper. Above it the **odometer**:
five rolling digits in bold Georgia, tabular, "years after the ice" beneath. Four-fifths
of this line is nearly empty and everything a child has heard of crowds into the last
inch. That emptiness is the lesson and is the reason this tier exists.

**Tier 2 — the road. "What happened along the way?"** A road drawn in perspective,
four passes winding down toward the viewer: the far pass small and pale near the
horizon, the near pass full width. Year 0 is at the far left; the road ends at the
story's year, marked from the start by a small copper ring. **Pass scales are computed
from the destination**, 8 : 4 : 2 : 1 of the years — Frankenstein's far pass carries the
first 6 300 years and its near pass the last 790; Socrates gets the same shape over
9 530. Each pass takes as many events as it has room for on screen (one per ~118 px,
scaled), which is why the far pass holds three and the near one five or six without
anyone deciding that. Every label reads left to right whatever direction the pass runs;
the zigzag is the dot's path, not the reading order. Perspective also justifies the
changing scale without a word: far things really are foreshortened.

**Both dots run at once.** The dot on the fixed line moves at constant speed; the dot
on the road races the far passes and slows as it comes near. A child watching the two
together sees the stretch happening and is never fooled by it. A faint shaded patch on
the fixed line shows which stretch the current pass covers, like a map inset.

**Tier 3 — the lead-up. "What was going on just before this story?"** A straight,
generous strip that opens when the road dot lands and draws itself in three seconds.
Its span is the story's business: Frankenstein gets the sixty years before (Franklin's
kite, Galvani's frogs, Volta's pile, Aldini's corpse in London, Tambora, the ghost
stories by the lake); Socrates gets the century before (Pythagoras, Athens voting,
Heraclitus, Aeschylus, Anaxagoras); Ashurbanipal gets the eclipse on clay and a prince
learning to read. **This is where a story's theme lives, unnamed.** The world line
stays worldwide and random; the lead-up is the story's own neighbourhood. Real images
belong here first, since these are few and specific.

**Then the landing:** *11 816 years after the ice — the year we call 1816*, and the
words. Page title (the story's name) sits at the top of the page above the odometer,
per Michael's 8 Sep ruling, so the whole thing reads as the story's title card.

---

## 3. The run

- **About ten seconds**, constant speed for the first 86 % of the time, then a short
  ease into the landing. Plus three seconds for the lead-up. Michael asked for ten;
  whether fourteen feels long is open (§9).
- **Tap the road or the line to pause**; tap again to go on. Tapping anything else
  should skip to the end (ruled 7 Sep: nobody sits through a title card; **not yet
  built**).
- **Events appear as the dot passes them**: a diamond on the fixed line, an icon +
  label + date on the road, fading in over 350 ms.
- **Tap any event** to read its paragraph. On a wide screen it opens in the empty
  space left of the far passes (Michael's ruling, so the story text below stays put);
  on a narrow one, below. The paragraph ends with *There is a story about this here*
  or *Nobody has written this story yet*, and words: **go to the story · put it on my
  list · back**. The first two are not wired.
- **Words at the end**: *run it again* (a fresh draw), *or take the road to* the other
  destinations, and *your line so far (n things)*.
- Reduced motion: jump to the end.

**Picking a run.** Year 0 and the destination are always in. For each pass, candidates
are the pool's events in that pass's years; capacity is the pass's screen length ÷ the
label gap; a minimum gap in years is derived from the same ratio. First fill prefers a
region not yet used in that pass, then anything that fits. Sort by year. The pool is
tagged by region (west-asia, east-asia, south-asia, europe, africa, americas, pacific,
world) so no run is all Mesopotamia; it should also be tagged by kind of thing (a crop, a
craft, a city, a record, a volcano, a sky event) and drawn across both. Wars and kings
are simply not in the pool — the *no wars as scaffolding* rule holds automatically.

**Themes.** Ruled 8 Sep: themes are a filing tool for the author (MIT OCW is itself a
kind of theme) and are **never shown to the child**. Test: if a theme's name would fit
on a school unit, it stays in the vault. The lead-up tier carries a story's theme
without naming it; an earlier idea of biasing the world line four-of-eleven toward the
theme is dropped in favour of that.

---

## 4. Her line (the dashboard variant)

Every run remembers the ids it showed. *Your line so far* renders the fixed line with
every event she has ever been shown, in order, tappable, with the odometer resting at
*now*. Ruled 7 Sep: **it accumulates** rather than showing the last run — over months it
becomes a map of everything she has read, laid out in time, which is a thing worth
owning and worth sharing, and the only record in the system that fits *her made things
are what is kept*. Stored in `localStorage` in the prototype (key `cw-after-the-ice`),
which is the right kind of place: local, disposable, hers. The dashboard version should
be where "Remember this" can point, and where the visited-nodes list (board, Parked —
warm, 31 Aug) and this thing probably turn out to be one thing.

---

## 5. The pool is the graph

Decided 8 Sep: **the event pool and the story graph are the same database.** Every
constellation node already has an `era`; the road should draw from the nodes, and events
that have no story yet are seeds in the vault, which is a list Michael wanted anyway.
`events.json` therefore follows `Spec-Timeline-Graph.md` §4 where the fields overlap
(`id`, `type`, `label`, `start`, `era`, `precision`, `place`, `blurb`, `image`,
`sources`) and adds `hook` (the one-line full label), `region`, `glyph` (which drawn
icon; not `kind`, which is a closed facet) and `story`. A later session merges it into
the constellation nodes; the requirement met here is that the page only *reads* data.

**Voice.** The blurbs are 40–80 words, one irresistible detail each, written for an
adult you like a lot (the §7 rule of the Graph spec). They are first drafts from
general knowledge, unsourced, and every one must be checked before a child sees it.
Sixty-five world events and five lead-ups of four to six each are in the file.

**Size.** A few hundred strong events before Caesar exist to be written (natural events
with real dates — Mazama, Agassiz, Storegga, the 1054 supernova, Thera, Lisbon; a couple
of hundred evidenced individuals; hundreds of beautiful objects whose stories can be
honestly imagined). Target for the next pass: ~150, with at least five per millennium
before 10 000 so the far passes never repeat too soon.

**A device the supernovae give for free:** a star 6 500 light-years away gets two dots
on the line — the light leaves about 4 500 after the ice, when Uruk is becoming a city,
and arrives in 1054. One event, two places, all of written history between them.

---

## 6. Icons

A small drawn vocabulary of kinds, one 24-unit stroke glyph each, in the page: ice,
seed, wall, stone, pot, metal, tablet, boat, star, fire, wheel, book, lens, leaf, cloth,
number, music, animal, city, eye, train, moon, spark, frog, kite, tower, brush, horse,
film, vote, mask, water. Michael likes them. Five hundred hand-made icons is a budget
nobody has; the vocabulary grows by kind, and real images are reserved for the lead-up
tier and for the story destinations.

---

## 7. Visual language

Inherits `Interface-Foundation.md` and `UI-Language.md`: parchment ground, Georgia
throughout, Payne's gray line, copper for the moving dot and the destination (points are
copper in CW), controls as words that fade in. The road is a band one step deeper than
parchment with a faint dashed centre line; far passes are smaller and lighter. Both
themes are defined by tokens (a warm dark for the dark scheme). Digits use
`font-variant-numeric: tabular-nums`. Timing follows the UI-Language table where it
applies (options fade in over 200 ms).

---

## 8. Built / ruled-but-unbuilt

**Built (bench, 8 Sep):** all three tiers; computed pass scales; the two dots and the
inset; odometer; per-pass capacity picking with region spread; tap-to-pause; tap-any-
event detail beside the far passes; the five destinations (Frankenstein, The Starry
Night, the Montparnasse train, Socrates, Ashurbanipal's library) each with a lead-up;
"your line so far" accumulating in localStorage; title at top; dates with the
conventional year in parentheses; dark theme; reduced motion.

**Ruled, not built:** labels thin to icon + date a few seconds after landing and return
on touch (Michael's rollover-labels idea, with the caveat that labels arriving as the dot
passes is the reading and iPads have no hover — a compromise, see §9); tap-anywhere
skips to the end; *go to the story* and *put it on my list* wired to the story graph and
the child's list; the fixed line shrinking to a thin strip with the copper dot at the
story's year as she scrolls into the story (a compass that never quite leaves); real
images in the lead-up; the pool drawn from constellation nodes rather than a separate
file; numbers through `cw-number.js`; the intro as the standard opening of every dated
story, scroll-back-able.

**Not this thing:** the Timeline Graph Lab (bars, bands, claim edges, wandering). The
intro is a title card and a door; the Lab is the room.

---

## 9. Open

1. **Rollover labels.** Michael proposed icons only, labels on rollover, to make room.
   Counter-proposal: labels during the run, thinning to icons after landing, back on
   touch. He has not ruled.
2. **Fourteen seconds.** Ten was the ask; the lead-up adds three plus a pause. Does it
   feel long on the fortieth run?
3. **Speed.** 1 200 years a second through the far passes — is the blur the point, or
   can nobody read the early cards? The odometer's ones digit is meant to blur.
4. **Does the perspective read as distance** or just as a smaller row? Are far-pass
   labels legible on an iPad?
5. **Does the near pass feel like an arrival**, or just the bottom of the page?
6. **Where does a story's lead-up get authored** — in the story's own header (span +
   event ids), which the road reads? Probably; it keeps the data with the story.
7. **Her line and the visited-nodes list** — one thing or two?
8. **A guessing game, later**: when a card is about to appear and she can call its year
   within five hundred, she is fluent. Not now.
9. **The number convention** (§1): commas vs thin spaces; settle at the `cw-number.js`
   pass.

---

## Related

- `20-SPECS/Spec-Timeline-Graph.md` — the Lab this is the door to; §2 deep time, §4 node schema, §7 three depths of text
- `00-FOUNDATION/CW-Date-Convention.md` — year 0, the quiet 1
- `02-CONSTELLATIONS/Frankenstein-11816/` — the first patch; the lead-up for Frankenstein is drawn from its set piece
- `00-FOUNDATION/Design-Principles.md` — no wars as scaffolding; makers over conquerors
- `cw-deploys/stories/events.json` — the pool
- `cw-deploys/experiments/timeline-bench.html` — the bench
