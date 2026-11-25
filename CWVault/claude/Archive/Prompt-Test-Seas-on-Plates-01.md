---
status: READY 20 Nov 2026. Written in the "Woods This Week" session for Claude Code, on Michael's word ("please do"), after he saw the ancient-seas bench on the iPad.
role: A test on the ancient-seas bench: can the shallow seas from Kocsis and Scotese's coastlines ride the Time lab's own plates, so the lab gets its seaway without moving onto Scotese's Earth?
related: Report-Survey-Ancient-Seas-01.md (the survey, and the three paths under "What it would take"), Prompt-Publish-Ancient-Seas-01.md, Ancient-Seas-Nov18/build.py, cw-deploys/experiments/ancient-seas.html, Spec-Earth-3D.md (the ruling of 27 Oct: keep Merdith, decide about Scotese by looking)
updated: 2026-11-20
---

# The seas on the Time lab's own plates: a test

## Why

Michael has looked at the bench on the iPad. The seaway looks great, with the T. rex finds
along its western side. But he trusts code that moves plates more than a painting every five
million years, and he would rather not give up the Time lab's Earth.

Two things from the survey make a third way worth trying:

- The seaway at 69 Ma is not in Scotese and Wright's painted heights at all. It comes from
  Kocsis and Scotese's coastlines. So the sea can be taken without the paintings.
- A sea that lies inside a continent rides with that continent. Carried onto Merdith's North
  America, the seaway should sit on the right rocks, wherever the two plate models put the
  continent on the globe.

The survey's report called this path 3 and doubted it: where the two models cut the plates
differently, the sea may tear, or land beside a coast rather than on it. This step finds out
by looking.

## What to build

On `cw-deploys/experiments/ancient-seas.html` only. Nothing in `time-lab.html`. If a shared
script (`js/3d/earth.js`, `js/3d/scene.js`) must change, stop and report first.

**One new word on the bench: *Seas on the plates*.** It acts on the right Earth, the Time
lab's own, and leaves the left Earth as it is.

- Take the flooded ground from Kocsis and Scotese's coastline for the moment: the ground that
  is continent but lies outside their coast.
- Carry each piece of it back to today on Scotese's plates (the PALEOMAP rotation file in the
  coastline record), then forward to the same age on Merdith's, the model the Time lab uses.
  Do it plate by plate, so that a sea on North America stays on North America.
- Paint it on the right Earth as shallow sea, in the pale shelf blue of Spec-Maps' ramp, over
  the Time lab's land.
- The T. rex finds on the right Earth already ride Merdith's plates. Leave them as they are.

The two Zenodo downloads were not kept. Fetch them again as `build.py` did, into a scratch
folder, and add the new step to a fresh copy of the script (`Ancient-Seas-Nov20/build.py`;
never write over the Nov 18 one). If the network refuses the downloads, stop and say so.

**The moments.** 262 Ma and 69 Ma, as the bench has them.

**One more, if it is cheap (Claude's suggestion; Michael may strike it): 80 Ma.** Michael
remembered the seaway reaching all the way north. It did, a few million years earlier. A
third moment at 80 Ma, with the sea through from the Gulf of Mexico to the Arctic on both
Earths, would show him that, and would test the method at a third age. If it costs more than
a little, leave it out and say what it would take.

**The journey from 69 Ma to now.** If the coastlines for the steps between are in the record,
let the seas on the right Earth change through the journey as the left Earth's maps do. If
that is more than a small addition, leave the journey as it is and say what it would take.

## What to measure

Looking is the test, but give Michael numbers to go with it. At each moment:

- Of the flooded ground carried across, how much lands on the Time lab's land, how much falls
  in its ocean, and how much of the Time lab's land that should be flooded is missed.
- Where it tears: name the places (which coasts, which plate edges) and how wide the gaps or
  overlaps are, in kilometres.
- For 69 Ma: do the finds from Montana, the Dakotas and Wyoming line the seaway's western
  shore on the right Earth, as they do on the left? How far is each Earth's shore from Hell
  Creek?
- For 262 Ma: where the sea lands near New Mexico, and how far that is from where Scotese
  drew it.

Say plainly whether the seas inside continents sit right, and whether the edges are good
enough to show a child with the word *worked out* beside them.

## Not in this step

Anything in `time-lab.html`; Scotese's plates in the Time lab (path 1); the mask for the
Chicxulub ring; the Delaware Basin; land animals and plants; quakes and eruptions; a line for
the bench on the Experiments page.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size, and once in Safari on the iPad simulator: each
moment with *Seas on the plates* on and off, far and close in over North America; the T. rex
finds shown; the journey; the console clean; `tools/check-deploys.sh`.

Pictures in `CWVault/claude/Ancient-Seas-Nov20/`. The report in
`CWVault/claude/Report-Survey-Ancient-Seas-02.md`: what was built, the numbers above, the
pictures by number, what tears and where, and what it would take to bring the seas into the
Time lab itself if Michael likes what he sees.

Stop and report. Don't commit. Michael looks at benches on the site, on his iPad, so end the
report by saying the bench is ready for his word to commit and push.
