---
status: Report, 24 Nov 2026. Step 12c of the Time lab bench, built on `1e724aca` (step 12b is in it, committed and live). Checked in the pane at 1,024 × 768 and 768 × 1,024, on WebGPU and once on WebGL. Reported first, as the prompt asks. Committed and pushed on Michael's word, 24 Nov 2026, so he can test on the iPad; his ruling is still to come.
role: What step 12c did to `experiments/time-lab.html` and behind a new option in `js/3d/earth.js`; the answers the prompt asked for; the one choice it left; what the check found; what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-12c-01.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-12b.md (the page as it stood), Report-Time-Lab-Seas-Nov20.md (where the seas came from), js/3d/earth.js
updated: 2026-11-24
---

# Report: the Time lab bench, step 12c (24 Nov 2026)

![[Time-Lab-Bench-12c-Nov24/05-90-globe-one-blue.jpg]]

*90 Ma, one sea. The seaway that kept Tyrannosaurus in the west is plain water between two lands.*

![[Time-Lab-Bench-12c-Nov24/06-90-globe-as-before.jpg]]

*The same view, the row on* as before*: step 12b's look.*

## Against Report 12b

Nothing in the prompt disagrees with what Report 12b says was built. One small thing the prompt expected is not so, and I did not change it: see *537 Ma* below.

## What was changed

- `cw-deploys/experiments/time-lab.html`. The stamp is `2026-11-24 1e724ac · time-lab step 12c · one sea`.
- `cw-deploys/js/3d/earth.js`, behind one new option, `oneSea`. A page that does not name it draws as it did. The Earth bench and Ancient Seas open and draw with a clean console.

`check-deploys` reports no error for this page. Its two errors are another session's pages under `experiments/simple_rules/`. Thirty-seven pictures are in `Time-Lab-Bench-12c-Nov24/`.

## One sea

**The choice: I matched the ocean; I did not let it show.** The shelf and the shallow seas are painted, whole, in the ocean's own colour at that point of the ball or the map. It is the colour the sea ball itself computes there, so it follows the ocean from `#5793b4` at the middle to `#33699a` at the edge with nothing to tune.

Why not let the ocean show through: the pieces overlap. A shelf left clear would uncover whatever piece lies under it, and land would appear where step 12b had sea. Painted, a shelf covers exactly what it covered yesterday. So the two looks differ in colour only, and the row compares like with like.

**What the prompt asked me to say.**

- **The faint lines in the Gulf at 90 and 69 Ma are gone** (`05`, `07`, `15`, `17`). They were two washes lying over each other. One opaque colour cannot lie twice.
- **No seam** where a seaway meets a shelf or either meets the ocean. I could find none at any age I looked at.
- **Nothing of the land's picture shows through the sea.**
- **Hudson Bay and the Great Lakes at 480 Ma** are sea, the same blue. Hudson Bay is a hole of open water in the middle of Laurentia, in today's shape (`01`, right of centre; `02` shows it in the old blue-grey). It is there at 537 and 600 Ma too (`21`, `22`). The Great Lakes are too small to pick out at this size.
- **The soft shorelines stay.** The tears stay as they fall.
- **The deep ice still paints over the sea** (`27`, at 300 Ma; `28` is the same as before).
- **Nothing snaps at the seam.** I looked at 2.6, 3.8 and 6 Ma over south-east Asia: stills only, and no jump between them.
- **This side of the seam nothing changes.** At 21,000 years over Europe, 21,000 years over the land bridge, and 12,000 years over Europe, the page is the same as the live site to the pixel: all 480,000 pixels of each picture (`24`, `25`, `26`).

**537 Ma: the seas are not quite gone.** The prompt lists 537 with 600 as "no seas". They go out over five million years past the last map at 535, as they have since 20 Nov, so at 537 they are at 60% and gone at 540. In one blue that fade is a thin blue veil over the land (`21`). At 600 Ma there are none, and no shelf shows (`22`, `23`). I left the fade as it was: the prompt also says they go out "as they do now".

## The words

- *Show shelf / Hide shelf* is gone from both views, and `?shelf=` with it.
- *Hide shallow seas* and `?seas=0` stay. Hidden, the seaways go and the land's picture shows there; the shelf stays sea (`09`, `19`). At 90 Ma that leaves a North America close to today's.
- The credit for the seas is as it was.

## Kept, and where

| | Lives in | Turned on by |
|---|---|---|
| The shelf's own colour | `earth.js`: the option `shelfColour`, the calls `setShelf(on)` and `shelf()`, in the land's paint | A page naming `shelfColour: '#hex'`. This page still names it (`LOOK.seas.bare`, `#505083`; `?bare=` takes another), because *as before* needs it. `setOneSea(false)` uncovers it. |
| The grey of step 12 | `earth.js`: `SEAS_CRUST`, `SEAS_CRUST_BLUE`, the uniform `uCrust`, in the seas' paint | `seasCrust: true` or a colour, or `setSeasCrust(true)`. Here, `?crust=grey` with `?sea=before`. |
| One sea | `earth.js`: the option `oneSea`, the calls `setOneSea(on)` and `oneSea()` | A page naming `oneSea`. It lies over the two above and changes neither. |

Under one sea, `?crust=grey` alone shows nothing: the sea is painted over it. Drain the Sea will turn one sea off first.

## The bench row

*the sea: one blue / as before*, in How this works. The page opens on one blue. `?sea=before` opens on the other (the chat's default, built so).

**As before is step 12b's look exactly.** At 90 Ma, `?sea=before` here and the live page give the same picture to the pixel.

**Where the row is: in both views** (Michael's word, 24 Nov, "Yes, add it", after reading this report). As first built it was in the Time view's How this works only, with the bench's other rows. It is now also at the foot of The World's panel, alone, under a rule and *bench only* (`45`). A tap on either marks both. Checked by a real click at iPad size, both ways, and with `?sea=before`.

## The sentence

In both views, after the words that were there. It is one string, `WORDS.htwSeas`, so a change is one edit.

- **The World** (`30`, `40`): it fits at both sizes. With the row added the panel is 628 px tall, in a window 768 or 1,024 tall (`30` and `40` were taken before the row went in, at 563).
- **Time** (`32`): **the panel is too long, and was already.** It was 882 px tall and is now 1,013, in a window 768 tall, and it opens low on the page, over the mosaic. The sentence adds 106 px and the row 25. She has to drag the panel up to read the end of it, as she did yesterday. The same at iPad size. Not trimmed.

In Time the sentence comes after the line that says how well the Earth at this year is known (*Measured · …*), which is the last of the words that were there.

## What was checked

**At 1,024 × 768.**

- 480, 262, 201, 90 and 69 Ma in The World, on the globe (`01`, `03`, `04`, `05`, `07`) and on the map (`11`, `13`, `14`, `15`, `17`). 90 Ma in Time (`20`).
- 480, 90 and 69 Ma with the row on *as before*, from the same view, globe (`02`, `06`, `08`) and map (`12`, `16`, `18`).
- 90 Ma with the seas hidden (`09`, `19`).
- 12,000 and 21,000 years against the live site: identical.
- 537 and 600 Ma.
- The row by a real click, both ways. `?sea=before`. `?seas=0`.
- The arrival on First trilobites: 521 Ma, selected, no panel, the ring at the middle (`30`). It behaves as it did.
- The asteroid tapped by a real click: the handle and the globe arrive, the panel opens (`31`). Mexico City tapped: it came to the middle. Pick a time, and its back.
- WebGL, once: 90 Ma on the globe and the map draw the same (`33`).
- The Earth bench and Ancient Seas: they open and draw, no errors.
- The console: the version line only.

**At 768 × 1,024.** The arrival (`40`). The five ages on the globe and the map. 480 and 90 Ma both ways (`41` to `44`); 69 Ma both ways. 90 Ma with the seas hidden. 537 and 600 Ma. 12,000 and 21,000 years. The asteroid, by the page's own hook and not a click. Pick a time. Time, with its panel.

## Not tried

- An iPad, Safari, or the simulator. The prompt asked for the Mac and iPad size.
- **Anything moving.** The pane runs frames only while it is looked at. Nothing snaps between the stills I took; I did not watch a drag across the seam or across 535.
- A city tapped at iPad size.
- Close in. Every view was at the lab's home distance.

## Known and left

- **The shelf rim of the oldest ages.** Past about a billion years, where the continents are guessed and invented, each has a pale rim, the 2D globe's shelf wash. It is a different paint, outside what the prompt lists, and I did not touch it. If one sea should reach back there too, say so.
- **The ring of an event in the sea.** See the third point below.

## Needs Michael's eye

**1. The tears in one blue.** They read better than they did. The pale and blue-grey polygons made every piece's cut edge visible; now most of a tear is simply a strait.

- **262 Ma** (`03`, `13`): Pangaea is one land with narrow water through it. Most of it reads as coast. **A few short, straight, thin blue slashes in the middle of the land read as mistakes**, like scratches (centre of `03`).
- **480 Ma** (`01`, `11`): the long straight edges at the lower left of Gondwana are still straight. They read as an abstract view, not as coast, but not as errors either.

**2. A continent that is mostly sea.** At 480 Ma **Laurentia does not read as a continent.** It is three or four islands (`01`, `11`). Gondwana still reads as one. On the map the whole world at 480 looks like scattered islands in one ocean. That is what Scotese drew, shown plainly; whether she can follow a continent through it as she drags is the question, and I could not judge that from stills.

**3. Land and sea I did not expect.**

- **Between the two looks, nothing.** Every place that was land yesterday is land now, and the same for sea. That is what painting bought.
- **The First trilobites ring sits in open water** (`30`, `40`). Siberia was flooded at 521 Ma. Yesterday the ring stood on pale blue, which read as ground. It is true to the animals, but she arrives looking at a ring in the sea.
- **The asteroid's ring is at the water's edge** (`31`). Also true.
- **Hudson Bay in old Laurentia**, above. Yesterday it read as shelf. Today it reads as a real bay, 480 million years too early.
- **The veil at 537 Ma**, above.
