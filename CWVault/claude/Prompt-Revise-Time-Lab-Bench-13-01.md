---
status: Michael's prompt for step 13 of the Time lab bench, 25 Nov 2026, from the "World view, seas and shelf" chat. On his word of 25 Nov ("Please do. I think this is hugely useful"). Needs step 12d committed first. Written with sight of Report-Time-Lab-Bench-12d.md (not yet committed when this was written), Report-Time-Lab-Bench-12.md and the live page. Points marked *(the chat's default)* are not yet Michael's word.
role: One panel, *Places*, for everything that marks where something is on the Earth: cities, today's coastlines, the equator and poles, and her markers. A tap on a marker opens it instead of deleting it. A marker can be followed, so the globe keeps it in the middle while the years change. With two or more markers, *Places* gives the distance between them at the year on the line.
related: Report-Time-Lab-Bench-12d.md (the page as it will stand), Report-Time-Lab-Bench-12.md (what the coastlines are, and why they break), Report-Time-Lab-Bench-11.md (Measure), Report-Time-Lab-Bench-12b.md (an event's place turns to face her), js/3d/earth.js
updated: 2026-11-25
---

# The Time lab bench, step 13: Places

`cw-deploys/experiments/time-lab.html`. Read `CWVault/00-BOARD.md` and `CWVault/claude/Report-Time-Lab-Bench-12d.md` first. Step 12d must be committed before you start; if it is not, stop and say so. If anything below disagrees with what the reports say was built, stop and say so before changing anything.

Touch no shared script, with the same exception as steps 12 to 12d: what this needs inside `js/3d/earth.js` may change behind options a page names. A page that names none must draw as it does now.

## Why

Michael wants her to be able to mark a spot and watch it travel: how England, or the place she lives, moves through time. Today the lab has the pieces of this in three separate words (*Show cities*, *Show coastlines*, *Place markers*), and a tap on a marker deletes it, which Michael now thinks was the wrong choice. He would rather not have several tool panels open at once.

So: one panel, *Places*, for the marks laid on the Earth. The tools that change the Earth itself (*Hide shallow seas*, *Map*) stay as plain words. *Measure* stays as it is, and measures time.

## The panel

In both views, *Show cities*, *Show coastlines* and *Place markers* give way to one word, ***Places***, which opens a tool panel. It sits where those words sat, in the column in Time and in *How This Works* in The World.

Roughly, with two markers down and one followed:

```
Places
  Show cities
  Show coastlines
  Show equator and poles
  Place a marker

  near London      following · remove
  near Edinburgh   follow · remove

  near London to near Edinburgh: 1,400 km,
  about as far as London to Rome
```

(The numbers are placeholders. Work out the real ones.)

- **The three show words** do what *Show cities* and *Show coastlines* do now, and *Show equator and poles* is new (below). Each turns to *Hide …* when on.
- ***Place a marker*** works as *Place markers* does now: a tap on the Earth places one. Say how she leaves placing mode, and whether that needs changing.
- **The markers are listed** in the order she placed them, each with ***follow*** (or ***following***) and ***remove***.
- **A marker's name** is *near* and the nearest city in the lab's cities, today's names (*near London*), or *Marker 1, 2…* if none is within about 500 km. *(the chat's default)*
- **One tool panel at a time.** Opening *Places* closes *Measure*, and opening *Measure* closes *Places*, as Michael asked. An event's panel is not a tool panel and is unchanged.
- When *Places* closes, everything shown stays shown and the markers stay where they are. It only closes the panel.
- It follows the panel rules already built: it moves, keeps its place, fits the window and scrolls inside itself as step 12d made the Time panel do.

## A tap on a marker

A tap on a marker no longer deletes it. It opens *Places* with that marker lit, its name in copper. *Remove* in the panel is the only way to delete one.

**Placing a marker** also opens *Places* with the new one lit, so *follow* is right there. This is the option Michael asked for: follow when she places it, or not.

## Following

- ***follow*** makes this marker the followed one. Only one is followed at a time. Choosing another quietly lets go of the first.
- **While it is followed, the globe keeps it in the middle as the year changes**: when she drags the handle, when the arrows change the line, when *Pick a time* lands, and later in *play*. It stays upright, as every turn does since step 10c. No zoom.
- **The equator and poles are what show the motion.** They belong to the Earth, not to the marker. So if *Show equator and poles* is off when she follows, turn it on. *(the chat's default)*
- **On the map**, nothing turns, as in step 12b. The followed marker is still marked as followed.
- **Her finger on the globe stops the following**, and the word goes back to *follow*. *(the chat's default)*
- **An event tapped while a marker is followed**: the following wins, the globe does not turn to the event, and the event's ring shows wherever its place is. *(the chat's default)*
- **This side of the seam** the plates do not move, so a followed marker holds still. Nothing special is needed.
- **Where her marker's piece did not exist yet**, say what the marker does now and what following does then. Don't invent a rule; report it.
- Under reduced motion: no easing, just the turn.

## The equator and poles

- A thin line for the equator and a small mark at each pole, in the Earth's own frame: they do not ride the plates. The continents move under them.
- The same quiet line colour as the coastlines, or quieter. Nothing in vermilion.
- On the globe and on the map.

## Distance

- **With two or more markers**, *Places* shows the distance from the followed one to each of the others. With none followed, from the first placed. *(the chat's default)*
- **Along the surface**, in kilometres, rounded to a sensible step, at the year on the line. It changes as she moves the handle.
- **With something she can feel beside it**, from a short fixed list: London to Rome (about 1,430 km), New York to Los Angeles (about 3,940 km), London to New York (about 5,570 km), halfway round the Earth (about 20,000 km). Pick the nearest and say *about as far as*. Check the numbers; add a few more if the gaps are too wide. *(the chat's default)*
- If either marker's piece did not exist at that year, say so in plain words in place of a number.

## The coastlines

They already ride their plates (step 5; Report 12 gives the table of why they break). Michael found them useful at 100 Ma, where today's Gulf coast lies out in the sea: it shows that the land under the water is continent.

Look at the stretches that are not drawn because one end lies just outside a piece's simplified outline (385 of them). If an end can ride the nearest piece within a few kilometres, draw it. Do not draw a stretch whose ends ride different plates, and do not draw anything before its piece exists. Report the new count beside Report 12's table, at 69, 100, 201 and 639 Ma. If this proves larger than it looks, stop at the report and leave it for step 14.

## Kept as it is

*Measure* and its markers on the line. *Hide shallow seas*. The cities' look and a tap on a city. The event's ring. Everything from steps 12 to 12d.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024), in both views:

- *Places* opened and closed; *Measure* opened while *Places* is open, and the other way round;
- each show word on and off, on the globe and the map;
- a marker placed on England and one on Scotland; the panel lit on placing; the names;
- England followed; the handle dragged from now back to 480 Ma; pictures at 0, 66, 300 and 480 Ma showing England in the middle and the equator moving; the distance at each;
- following switched to Scotland; a finger on the globe; an event tapped while following;
- a tap on a marker, and *remove*;
- the coastlines at 100 Ma over North America, before and after;
- the arrival on *First trilobites*, unchanged.

Under *Needs Michael's eye*, say plainly whether England and Scotland come together in this plate model, and roughly when. Michael would like that to be her first discovery, so don't promise it if the model doesn't show it.

Write `CWVault/claude/Report-Time-Lab-Bench-13.md`, with pictures in `CWVault/claude/Time-Lab-Bench-13-Nov25/` (or the day you run it). Update the board and MANIFEST in the same commit.

**Before committing, run `git status` and make sure the index holds only this step's files.** Commit by naming your paths. Report first; commit and push only on Michael's word.
