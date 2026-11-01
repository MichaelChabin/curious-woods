---
status: Worknote, revision 2, 1 Nov 2026, from the "recent rows" chat. Michael's design, not yet a ruling. Revision 1 (31 Oct – 1 Nov, the "how to convey 4.6 billion" chat) is kept as Worknote-Deep-Time-Window.md; everything in it still stands except where this revision says otherwise. The first build is Prompt-Build-Earth-Bench-07.md.
role: The deep-time window: a stained-glass rectangle that introduces deep time and is the way she picks a span. This revision turns it from one window into a ladder of windows over a timeline, and settles the first build.
related: Worknote-Deep-Time-Window.md (revision 1: layout, came, colours, the twelve plaques, light), Worknote-Time-Slider.md (stretch), Worknote-Time-Machine.md, Spec-Earth-3D.md, Prompt-Build-Earth-Bench-07.md
sketches: The Earth in Squares https://claude.ai/artifact/AKeE8nkwNg3voyAkmdKXvm (a copy is in the vault as claude/Sketch-Earth-in-Squares-01.html); mockups from this chat in claude/Window-Mockups-Nov01/ (last million from LR04, last 12,000, the window over the timeline, the layout)
pillar: Labs (Time Machine; a shared tool any story can open)
intuitions: #5 order of magnitude, #13 historical sweep, #11 measure by counting
---

# The deep-time window, revision 2

## Michael's two problems

1. Give a child an intuitive sense of deep Earth time.
2. A quick way for anyone to pick a period of interest. The range is 4.6 billion years, but most of the time people want the recent past, above all the last 12,000 years (after the ice let go; most of human history).

His theory: once she understands the interface (and we need a page that explains it), she can quickly get to the time she wants. He won't know until he has tried it.

## Decided (1 Nov 2026, Michael)

**Two layers, each with one job.** The window (the glass, on top) chooses roughly *when*. The timeline (below) shows *what happened* in the span she picked, and its flags do the fine adjusting and measuring. The glass takes over the period tiers' job (click a period, a finer line opens), or at least we try whether it can.

**A ladder of windows, one shown at a time.** Pressing a scale replaces the window with that scale's window; the bigger one disappears, so width matters less. The scales, by number, not name (Michael: "just the years"; 12,000 because this year is 12,026 after the ice, easy to remember):

| Command | Square | Block | Squares |
|---|---|---|---|
| *4.6 billion years* | a million years | 100 million | 4,600 (five rows of 1,000, the fifth running on into clear future glass) |
| *The last million years* | 1,000 years | 100,000 | 1,000 |
| *The last 100,000 years* | 100 years | 10,000 | 1,000 |
| *The last 12,000 years* | 10 years | 1,000 | 1,200 (twelve blocks) |

The old buttons for the last thousand and the last hundred years are gone from this design: the 12,000 window covers them for picking (the industrial revolution, 1760 to 1840, is eight squares), and the timeline's stretch does the rest. The chunk arrow is retired: "earlier" is the next scale up.

**The house convention for controls** (as in Glass Geometry): the left column has *How this works*, which opens a text box explaining what is going on, with optional controls; bulleted words in normal type open tools (Window, Timeline, Map); italic words are commands. No boxed buttons.

**Placement.** The four scale commands stand as a narrow column of italic words to the left of the glass, biggest at the top, the one in use marked (copper in the mockup, unless Glass Geometry already has a way). *stretch* and *shrink* (and *back*) stand to the right of the timeline.

**Shrink, the opposite of stretch** (Michael). She places the two flags, say 50 years apart on a 200-year line, and taps *shrink*: the whole 200 years now fits between the flags, so the line becomes 800 years, new time filling in on both sides. Now is a wall: if a shrink would run past today, the right end stays at now and the new time comes in on the left. If a shrink outgrows the window in use, the window steps up to the next scale ("Maybe set up the next row").

**The glass and the timeline move together.** Dragging across squares sets the timeline's span; moving the flags and stretching or shrinking moves the lit squares.

**The glass is dynamic.** A story can paint it (eras, dynasties, ice and warmth), one colour theme at a time. Stories end with "the world of Van Gogh" or the like, with a timeline and the globe or map; the window may stay up there for context, knowing it could distract.

**The iPad.** A finger can't pick one square at the 12,000 scale (about 8 points against 44). The glass picks spans by dragging, which a finger does well; precision is the timeline's job. If that isn't enough: wrap a window onto two or three lines for bigger squares, or a magnifier under the finger.

**Where it is tried first.** A new page in front of the Earth bench (experiments/earth-3d), introducing this way of picking a time or a range, perfected there before it joins the 3D globe, which in turn joins the Time Machine's content. The Earth bench has its own timeline (the stretching age line with two flags, *stretch* and *back*); the new page uses that code (Michael, 1 Nov).

**For the first build** (Michael agreed to all, 1 Nov):
- All four windows.
- Glass: the twelve eras on the 4.6 billion window (revision 1's colours). The last million: ice age against warm spell, two ways to choose from on the bench (A, two colours; B, graded by how much ice), from the sea-level curve the globe already uses (see Sources). The last 100,000: graded from the same curve. The last 12,000: plain glass for now.
- Plaques: the twelve on the 4.6 billion window. On the last million, two (ice age, warm spell), with the last swing given the periods we already have (*Hippos in London*, *Ice sheets*, *After the ice*). On the last 100,000, *Ice sheets* and *After the ice*. None on the 12,000 yet.
- The intro page's words: placeholder first; the words written once it works. Michael's draft of 30 Oct (Worknote-Time-Slider) was for a slider and pixels and needs rewriting for squares.
- *Next* at bottom right goes to the globe as it is. Carrying her span into the globe waits.
- Labels count forward on the left of the 4.6 billion window; the label under the cursor says "ago".

## Sources for the glass

- **The last million years.** The record must be published. Two were considered: the LR04 sea-floor stack (Lisiecki and Raymo 2005, 5.3 million years) and the Antarctic ice cores (EPICA Dome C, about 800,000 years, too short for the row). The mockup used LR04. For the build, the repo's own `stories/curves/sea-level-ice-ages.json` is better still: Spratt and Lisiecki 2016 to 798,000 years (itself built from the sea-floor records) and Bintanja and van de Wal 2008 beyond, the curve the globe's sea already follows, so the glass and the globe will agree.
- **What the real record shows** (from the LR04 mockup): warm spells are short, mostly 10,000 to 20,000 years, a column or two of a block, so "most of it cold" shows on its own. One warm spell per block holds loosely: the rhythm drifts against round 100,000s, a few blocks get two, one straddles a block edge. Graded glass shows the sawtooth: the ice grows slowly, then goes fast. Michael and Eileen saw one warm spell per block in the sketch, whose warm spells were approximate and too long.
- **The last 100,000.** At 100-year squares any of these curves is smooth. Later: the Greenland ice core (NGRIP) would show the twenty-odd sudden warmings of the last ice age.

## Milanković (candidate story; facts checked so far)

On his honeymoon in Dalj in 1914, arrested as a Serbian citizen, held about six months at the Nezsider camp; his wife Kristina got him released to Budapest, where he worked in the Hungarian Academy of Sciences' library under police watch, reporting weekly, to the war's end. There he finished *Théorie mathématique des phénomènes thermiques produits par la radiation solaire* (1920). Köppen and Wegener took up his curve in *Die Klimate der geologischen Vorzeit* (1924); the *Kanon der Erdbestrahlung* followed in 1941; the deep-sea work of the late 1960s and 1970s (the 1976 paper) bore him out. Twist: the 100,000-year rhythm in the last-million row is the part his theory explains least well, still argued (the 100,000-year problem). Not yet confirmed: "all by hand, in 100 days".

## Open

- A or B for the last million (the bench will show both).
- How the scale in use is marked: copper, or Glass Geometry's existing way.
- The ladder beside the 4.6 billion window's row labels (0 to 4 billion), which are also on the left: fine as a narrow column, or the ladder above the glass instead. Try both and look.
- A new event for the industrial revolution (Watt's engine or Coalbrookdale), so the 12,000 window has a lit square to aim for.
- The words of the intro page.
- How a whole era is selected (from revision 1).
- What colours the 12,000 window when no story paints it.
- The color-blindness check of the twelve eras (from revision 1).

## Kept from revision 1, unchanged

Layout of the 4.6 billion window, the came, the twelve colours, the twelve plaques and their behaviour, events as backlit squares in their own colour, the light on rollover and selection, the closing sweep, plain words over technical terms.
