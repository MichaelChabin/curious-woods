---
status: Draft synthesis, 22 Sept 2026. Written from the Hokusai and Vermeer pages; Michael to read and correct.
role: What a CW story page has become, so the next one (Mary Shelley, the Necker cube, the rest of the paintings) starts from here instead of from nothing.
related: Story-Voice.md, Publishing-a-Story.md, Rulings-Sept-2026.md, Spec-Timeline-and-Map.md, Spec-Maps.md, Ruling-Labs-and-the-Plane.md, Story-Vermeer-Girl-with-a-Pearl-Earring.md (the model)
---

# The story page, as it has settled

Two pages in, a way of making a story has appeared that nobody designed ahead of time. This
file writes it down. The Vermeer page is the model; Hokusai is the first draft of it and will
be brought into line.

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
5. **Pictures in two sizes.** A margin picture is a glance: it has its own caption, and the
   text never mentions it. A full-width picture is something to study, and the text names it
   or a caption invites the tap that opens it (the Delft map opens *View of Delft* and
   Blaeu's plan).
6. **Afterwards.** What happened to the thing. It ends on a plain sentence ("It is
   priceless").
7. **More.** Side doors, one bold lead each. Mostly these are people and things alive at the
   same time in other trades: Leeuwenhoek, Newton, Molière, Rembrandt. A margin picture may
   sit beside one of them.
8. **‹Name›'s World.** The timeline over the map (below).
9. **References.** Real ones, with what each one was used for.

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

**This is the part that should grow across stories.** Today each page carries its own event
list. The next step is one shared list of the world's events (`stories/events.json` already
exists for the Timeline Intro), with each story picking the ones in its span. Then Tambora in
1815 is written once. It turns up in *Hokusai's World*, and in Mary Shelley's, where it is the
reason for the cold summer of 1816. Galileo's death in 1642 turns up in any World that covers
that year. The connections then happen by themselves: a child who has met an event in one
story sees it again in the next.

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
  whether the two men were friends.
- A guess is drawn as a guess. The lapis route is a dashed line, its caption says it is one
  likely way, and the time is "a fair guess" with the working shown.
- A tool says what it cannot tell. The sampler names two paints when their colours are too
  close to separate.
- Labels are checked, not simply taken as written. Faraday's 1831 experiment, not his motor.
  The shogunate, not the Emperor. The law of gravity, singular.

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
  years of the Great Wave. The object first is the cube itself, which flips while she
  watches. The World is small and mostly shared.
- **Starry Night and the north rose** follow the Vermeer page as it stands.

## Still open

- The shared event list: its shape, and who writes to it.
- Hokusai brought into line: *Hokusai's World*, the shared sampler, tools on the left.
- Two events on the same day draw as one dot on the timeline (Galileo and the *Night Watch*,
  1642). Worth a rule when it happens again.
- Feedback from children. The gallery has too little on it yet to tell us anything.
