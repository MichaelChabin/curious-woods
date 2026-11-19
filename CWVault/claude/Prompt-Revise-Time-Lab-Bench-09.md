---
status: Michael's prompt for step 9 of the Time lab bench, 19 Nov 2026, from the "time lab handoff" chat, after step 8 (8d3cfe1f) and the earth.js fix (628fe223). Two points are the chat's defaults, not yet Michael's word; they are marked.
role: Two views, The World and Time; movable panels in place of the text block; the menu regrouped under Focus; a constant Earth; a temporary Pick a time.
related: Report-Time-Lab-Bench-08.md (the page as it stands), Worknote-Focus-View-02.md (why, and what steps 10 and 11 will be), Worknote-Mosaic-Focus-01.md, Standard-Interactives.md, js/cw-panel.js
updated: 2026-11-19
---

# The Time lab bench, step 9: The World and Time

`cw-deploys/experiments/time-lab.html` only. Read Report-Time-Lab-Bench-08.md first, and
Worknote-Focus-View-02.md for the reason behind this step.

The lab does two jobs. In one she chooses a time: the mosaic, the spans, the line. In the
other she has arrived and is looking: the Earth is the subject. This step gives each job
its own view.

## Two views

**Time** is the page as it stands: the Earth at the top, the mosaic, the timeline.

**The World** is new:

- The globe (or the map) fills the screen.
- The timeline lies across the bottom, over the Earth's lower edge, on a ground clear
  enough that the Earth shows through: the line, both flags and their years, the handle
  and its year, the events and their names. It works as it does in Time.
- The mosaic, *Select years* and the left column are not there.
- At the upper left, one word: *Time*. It returns her to the Time view at the same moment.
- At the upper right: *Reset* and *Align North*, when they have work to do (below).

One orchestrated move between the two views, quick, and a cut under reduced motion.
Within a view nothing changes place.

## The menu

*How this works* stays at the top, its text as it is.

The group **Earth** is renamed **Focus**. Under it, in this order:

1. ***The World*** / ***Time***: one word. It reads *The World* in the Time view and takes
   her there. In The World the same job is done by *Time* at the upper left.
2. ***Map*** / ***Globe***: one word, switching between the flat map and the globe.
3. ***Full screen***. On the iPad a drag with two fingers leaves full screen; that is
   known and accepted.

*Small Earth* and *Large Earth* go, with their code. The World does the work of
*Large Earth*.

***Reset*** leaves the menu. It applies only to the map or globe: its turn, its place and
its scale. It appears only when one of those has changed, and goes when it has been
tapped. In Time it stands to the right of the globe's box, level with the box's foot. In
The World it stands at the upper right.

***Align North*** is new. It appears whenever the globe is not standing north up. Tapped,
it turns the globe so that its axis runs straight up the screen, keeping the place she is
looking at as near the middle as it can, and then it goes. In Time it stands to the right
of the globe's box, level with the box's top. In The World it stands at the upper right,
above *Reset*. Say what it does on the map, where north is always up.

The group **Information** is unchanged.

## Panels, not a text block

The text block between the Earth and the timeline goes, in both views, with its period
area and its event area.

- A tap on a period, or on an event, opens a **panel**: a small window over the page that
  she can drag by its top and close with a tap. Use `js/cw-panel.js` if it fits. If it
  needs a change to fit, stop and report before changing a shared script.
- **One panel at a time.** A new tap replaces what the panel shows. The panel stays where
  she last put it, in each view, for the visit.
- It opens where it hides least: clear of the thing she tapped and clear of the handle.
- **An event's panel** carries what the event area carried: the date line by
  Ruling-Dates-01, the name, the summary, and *More*. Above them, small, the name of the
  period the event falls in. A tap on that name shows the period in the panel.
- **A period's panel** carries what the period area carried: its span, its length, its
  words. A period is treated as an event here, with its own *More* where the store has
  one. Say how many periods have a *More* and how many do not.
- The word limits of step 8 stay (30 for a period, 40 for a summary). *Iron*, at 31, is
  fine as long as it fits.
- The lift of a period's tiles on the mosaic stays.

## A constant Earth in Time

With the text block gone, the Earth in the Time view is one size on all eight spans, as
large as it comfortably can be while the line, both flags, the handle and the events'
names stay in sight without scrolling at 1,024 x 768. Say the size you chose at each
width, and what, if anything, is still under the fold on the 4.6 billion.

## Pick a time (temporary)

A word, *Pick a time*, at the end of the tools under *How this works*. It is for Michael
to learn what it is like to arrive somewhere unchosen. It will not ship as it is.

- It picks one event at random from the store.
- It goes to The World, on the smallest span under *Select years* that holds the event,
  with the handle at the event's year and the event's panel open.
- If the event's record carries a place, the globe turns to face it. Say how many of the
  store's events carry a place.
- At the upper left, beside *Time*, a second word appears: *back*. It returns her to the
  view, the span and the moment she was at before she tapped *Pick a time*, and then it
  goes. (The chat's default; Michael has not ruled on whether both words are wanted.)

## Small things

- The rounding rule for "about" years ago is approved (Michael, 19 Nov).
- In The World, the year on the handle never fades. Offer, behind a bench switch
  (`?fade=1`), the other words fading after a few quiet seconds and returning at a touch,
  for Michael to try. (The chat's suggestion; off unless he asks.)

## Not in this step

*select* and *unselect*, the flags that widen, the end of *back* on the line (step 10);
*play* and the Green Sahara (step 11); the first-visit hint; Scotese's plates; the seas;
the 13.8 billion years; the stories' Worlds; the front door; the swap.

## Check, then stop

On the Mac at 1,024 x 768 and at iPad size (768 x 1,024), by pointer and by finger:

- the move from Time to The World and back, by the menu word and by the word at the
  upper left, on a deep span and a recent one, on the globe and on the map;
- the timeline in The World doing everything it does in Time: the flags, *focus*, the
  handle, a tap on an event;
- a panel opened for an event and for a period, dragged, closed, replaced, and found
  where she left it; the period's name inside an event's panel;
- *Reset* and *Align North* appearing only when they have work, in both views, and going
  when tapped;
- the Earth the same size on all eight spans in Time;
- *Pick a time* five times, and *back* from each;
- reduced motion;
- the Earth drawing land at 262 Ma and at 20,700 years in both views, after the
  earth.js fix.

Pictures in `CWVault/claude/Time-Lab-Bench-09-Nov19/`; the report in
`CWVault/claude/Report-Time-Lab-Bench-09.md`, with what needs Michael's eye.

Stop and report. Don't commit.
