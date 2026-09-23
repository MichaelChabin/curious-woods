---
status: Working synthesis, 23 Sept 2026. Written from the three painting pages; Michael has corrected it as it went.
role: What a CW story page has become, so the next one (Mary Shelley, the Necker cube, the rest of the paintings) starts from here instead of from nothing.
related: Story-Voice.md, Publishing-a-Story.md, Rulings-Sept-2026.md, Spec-Timeline-and-Map.md, Spec-Maps.md, Ruling-Labs-and-the-Plane.md, Story-Vermeer-Girl-with-a-Pearl-Earring.md (the model)
---

# The story page, as it has settled

Three pages in, a way of making a story has appeared that nobody designed ahead of time. This
file writes it down. The Vermeer page is the model; Hokusai, the first draft of it, was brought
into line on 22 Sept; Starry Night was built straight onto it on 23 Sept and needed no new
machinery at all.

## What the page is for

A story gives her one thing to look at hard, and then shows her what was going on around it.
The looking is the story. The "around it" is where the connections are: the painter was
baptised four days before the man who first saw bacteria; the blue came from Afghanistan by
camel; Newton was splitting light while the paint dried.

Michael's point, 22 Sept: even a university course on the Romantic poets can leave out
Napoleon's wars and the electric pile, because the teacher does not know about them. That
makes the poems harder to understand and harder to remember. A child with a timeline and a
map in front of her can make those connections herself. The page makes them possible. It
does not point them out.

## The shape, top to bottom

1. **Title and a date line.** The subtitle carries the after-the-ice count and the plain
   year. No timeline at the top.
2. **The thing itself, first, with something to do.** "Tap the pearl." She is looking before
   she is reading. The magnifier and pinch work from the first moment.
3. **The body.** Short sections under short plain headings. Each one opens on a fact
   and not on a thesis. Years are plain. Everything is written for an adult reader who
   happens to be ten, and uses nothing CW has not already given her.
4. **Tools arrive when the text calls them.** A word in the left column (*Sample colours*),
   and the text says "Tap *Sample colours*". The tool opens where the text is. It does not
   open at the top of the page, and it does not open in a pop-up.
   - **The word sits level with the paragraph that names it** (23 Sept, Michael). So the
     `.tools` block goes immediately before that paragraph, never before its heading. The
     `.35em` top margin in `css/story.css` is what drops a 15 px bold word onto a
     20 px/1.4 first baseline; it is a rule, not a nudge.
   - **Once the picture opens, the tool's own control words move under it** (23 Sept,
     Michael) — *The whole picture*, *Put the magnifier away*, *Put it back* — because a
     child looking at a picture that has just filled the page will not look back at the
     margin. Only the summoning word stays on the left.
5. **A picture may be a stack** (`js/stack.js`, 22 Sept, Michael's idea). One slot, several
   pictures, in a loop she can always come round: the stone, the powder washed out of it, the
   turban it was painted on. A bold word under the caption names where she is going — *Next:
   the powder*, and *Back to the stone* at the end. The word moves it, never a tap on the
   picture, because a picture may already have taps of its own (the magnifier, a place on a
   map) and a tap meaning two things is a trap. A step whose picture is missing is dropped and
   the loop closes over what is left.
6. **Pictures in two sizes.** A margin picture is a glance: it has its own caption, and the
   text never mentions it. A full-width picture is something to study, and the text names it
   or a caption invites the tap that opens it (the Delft map opens *View of Delft* and
   Blaeu's plan).
7. **Afterwards.** What happened to the thing. It ends on a plain sentence ("It is
   priceless").
8. **More.** Side doors, one bold lead each. Mostly these are people and things alive at the
   same time in other trades: Leeuwenhoek, Newton, Molière, Rembrandt. A margin picture may
   sit beside one of them.
9. **‹Name›'s World.** The line, then the panel, then the map (below). The panel is in the
   middle so that whichever end she taps, the words are near it, and the map is cropped wide
   and shallow, about 560 px tall at full width, for the same reason.
10. **References.** Real ones, with what each one was used for.

**A quotation is set apart** (23 Sept, Michael): indented, with the name and date under it
in italics. "Set apart they are more noticeable, they tell the child 'this is what he
said'." The rule lives in `css/story.css` as `blockquote` and `.cite`, so it belongs to
every story, not to the one that needed it first.

## The World: where the disciplines meet

One list of events, read two ways: the line uses the dates and the map uses the places. The
person's events sit above the line. The world's events sit below: science, war, plague,
theatre, trade, other painters.

- **The span** runs from the earliest event that explains the picture to the latest event
  the picture explains.
- **What earns a place:** an event that explains the picture, or one that she could meet
  again somewhere else in CW. Galileo dying in 1642, the year Newton was born, earns its
  place on both counts. A fact that is merely true does not.
- **Far places** are cards on the side where they really lie, and a tap opens the world map.
- **Each event's panel** is written in the story's voice. It says what the event has to do
  with the picture, or with the other events.
- **A label is short and names the thing; the panel explains it** (23 Sept, Michael).
  *Faraday's generator*, not "Faraday gets electricity from a magnet". *Origin of Species*,
  not "Darwin publishes". *Eiffel Tower*, not "The Eiffel Tower opens".

**The world's events are shared (built 22 Sept).** Two files hold what the world owns:

- `stories/world-events.json` — one record per event: what happened, when, where. Thirty-six
  as of 23 Sept.
- `stories/places.json` — where things happened, so two stories never disagree about where
  Zhapu is. Twenty-four as of 23 Sept.

A story names both files and then picks: `{ ref: 'tambora-1815', side: 'world', why: '…' }`.
The shared record says **what happened**; the story says which side of its line the event sits
on, and adds **`why`** — one sentence, in its own voice, tying it to this picture. Tambora ends
"…and the next year Europe had no summer" in Hokusai; in Mary Shelley's it will end with the
rain at Lake Geneva. Same facts, checked once; different last line.

A story never rewrites the shared words. Its own events — the ones about its person — stay in
the story file.

Michael's reason for it (22 Sept): this list is where the liberal arts come from. So it needs
deliberate room for what our stories don't naturally reach — a law, a banned book, an argument
about God, a piece of music, somebody wrong for three hundred years — and it should keep the
habit of not being all Europe. And the coverage view (what has any story touched, when, where)
is **ours, not hers**: the moment a child sees a list of what she has covered it becomes a
syllabus with ticks, and she will smell it.

## Building on what came before

Each new story should lean on the ones before it. It does that in three ways.

- **In the words.** A story can refer back to one she may have read ("the tiny island in
  Japan in *Hokusai: The Great Wave*"). It never assumes she has read it.
- **In the events.** The shared list above.
- **In the tools.** Tools live on shelves (`js/sampler.js`, `js/map.js`, `js/timeline.js`),
  not inside pages. A new story adds at most one new piece of machinery, and that piece goes
  on a shelf for the next story to use. Vermeer added three because it was the first.
  Frankenstein should need none.

## Saying what nobody knows

This has become part of the style, and children will trust the page for it.

- "Nobody knows" appears whenever it is true: who she was, whether the pearl is a pearl,
  whether the two men were friends, whether a cypress really stood where Van Gogh put one.
- A guess is drawn as a guess. The lapis route is a dashed line, its caption says it is one
  likely way, and the time is "a fair guess" with the working shown.
- A tool says what it cannot tell. The sampler names two paints when their colours are too
  close to separate, and says outright that lead white and zinc white are the same colour to
  look at.
- **A tool that cannot be sure stays out of the tool.** The emerald green around Van Gogh's
  moon is named in the prose but is not a sampler anchor, because it could not be pinned on
  the scan with confidence. A tool that guesses is worse than one that is quiet.
- Labels are checked, not simply taken as written. Faraday's 1831 experiment, not his motor.
  The shogunate, not the Emperor. The law of gravity, singular. Two of Van Gogh's three
  Japanese copies came from prints he owned; the third he traced off a magazine cover.

## How the tools behave

The tools share one set of habits, borrowed from Glass Geometry:

- The tool's words live in the left column. On a phone the column folds into the text, so
  the text never says "on the left".
- Tap, drag, pinch; nothing responds to hover.
- A map panel is one at a time, and any other action closes it.
- Nothing is lit before she touches it.

## The next stories, on this pattern

- **Mary Shelley.** The Frankenstein prototype is already a World. On this pattern it
  becomes a page like Vermeer's: the object first (a page of the manuscript?), then 1816,
  Tambora, Geneva, galvanism, the electric pile. Mostly shared events.
- **The Necker cube.** Necker drew it in 1832, a year after Faraday's magnet and within two
  years of the Great Wave. The object first is the cube itself. Nothing on the page may
  move: the picture does not change, the seeing does, and an animated cube would destroy
  the story. The World is small and mostly shared.
- **The north rose at Notre-Dame** follows the Vermeer page as it stands. The cleaning is
  the beat, and the tool has to say what it cannot know about transmitted light from one
  photograph.
- **Why you've heard of Van Gogh** — the Johanna story. A painter nobody bought, a widow who
  read seven hundred letters, and a fame that was made on purpose by somebody whose name is
  not on it.
- **Daumier's *Gargantua*** — December 1831, six months in prison for drawing the king as a
  giant being fed by the poor. The same year as the Great Wave and Faraday's magnet.

## Done since this was first written (23 Sept)

- The third painting, *Starry Night*, is built on this pattern and needed no new
  machinery at all. Vermeer spent three tools; Hokusai spent none; this one spent none.
- Timeline labels are short.
- The shared event list is settled and in use by all three pages: 36 events, 24 places.
- Set-apart quotations, the left-column baseline rule, and the control words moving under
  the picture are all in `css/story.css` and on all three pages.

## Done since this was first written (22 Sept)

- The look is one file, `css/story.css`. Both paintings use it; a page sets only its main
  picture's shape.
- Hokusai is on the pattern: *Hokusai's World*, the shared sampler, tools on the left, a
  dashed route for the blue.

## Still open

- Who writes to the shared event list. Its shape is settled; the Librarian pass has not
  happened, and nobody has yet had to resolve two stories wanting different words for the
  same event.
- Two events on the same day draw as one dot on the timeline (Galileo and the *Night Watch*,
  1642). Worth a rule when it happens again.
- A live map that swaps its marks, so one frame can show two paths (Van Gogh's life, then
  the painting's travels) under a stack word. Wanted, not built.
- Feedback from children. The gallery has too little on it yet to tell us anything.
