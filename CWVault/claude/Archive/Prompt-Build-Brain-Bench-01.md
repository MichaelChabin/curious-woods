---
status: Michael's prompt, 15 Nov 2026, from the "brain lab references" chat. Follows the survey. Builds one bench in experiments. Stop and report before any commit.
role: Put the real brain in a child's hand. One bench where the Allen brain turns under a finger, the basal ganglia and the switchboard light when asked, and one amber signal runs from the right eye along the true road to the back of the head.
related: Report-Survey-Brain-Atlas-01.md (read it first, whole), Survey-Brain-Atlas-01/index.html, Brain-Lab-Map.md, atlas-sources/brain/README.md, cw-deploys/experiments/two-eyes.html, cw-deploys/active/about-your-brain.html
updated: 2026-11-15
---

# Build: the brain bench

Read `claude/Report-Survey-Brain-Atlas-01.md` first, whole. It is your own survey; this step builds on what it found. Michael has seen the pictures and called them wonderful, so **the glass stays as the survey drew it**. Don't restyle it.

## What Michael has ruled

1. **The brain is the Allen model**, the 3.0 MB copy with every triangle kept, centred, x flipped so left is left, and the eight swapped names put right as it loads.
2. **Every part keeps the atlas's own name, untouched.** CW's names sit on top, in a separate table. One CW name may point to several parts, and one part may serve several names. The model itself is never renamed.
3. **Three names for anything she can light:** the CW name ("the switchboard"), the common name ("thalamus"), and the atlas's exact name underneath for anyone who wants it. Where the atlas's name is a mouthful ("transverse temporal gyrus (Heschl's gyrus)"), she sees the common one ("auditory cortex").
4. **Each match is marked by kind:** a true part, a loose fit, or a patch placed by hand. A page can then say honestly which it is.
5. **The six clean matches are accepted:** hearing, moving, touch, experience, the switchboard, smoothness and balance, each to the parts your report names.
6. **Getting better at things** is the caudate (three parts), the putamen, both segments of the pallidum, and the three small partners: nucleus accumbens, subthalamic nucleus, substantia nigra.
7. **The four names with no part** (where seeing starts, reading, the words you know, how many) will each be a patch placed by hand inside the true fold it lives in. **Not in this bench.** Enter them in the table as *placed, not yet made*, with the folds your report gives.
8. **The shell** is the drawing trick, as in the survey. **The soft folds** are accepted.
9. **Amber is the signal's colour and nothing else's.** The region colours are still placeholders.

## The bench

One page in `cw-deploys/experiments/`, named in the manner of the benches already there. Vanilla JavaScript and Three.js, as the house does it. It is a bench, so its words are for Michael, plain and few; it is not a story page.

**The model and the table are separate files** beside the page, so that later pages can call the same brain:

- the model, as fetched and packed in the survey;
- the eight-line table that puts the swapped names right;
- the names table (rulings 2 to 7). Fill in the CW names above. For common names, fill in the parts this bench lights and propose the rest, marked *proposed*, for Michael to read. Don't present a proposed name as settled.

Put them where the repo's own habits say such files go, and say where.

**What she can do**

- **Turn it** with one finger, or the mouse. It opens front-left, the view of the survey's picture 4, turning slowly until touched.
- **Getting better at things.** One button. The basal ganglia light as in picture 4, each in its own colour, both sides.
- **The switchboard.** One button. The thalamus lights.
- **A signal from the right eye.** One button. See below.
- Tapping a lit button again clears it.

Under the brain, one line gives the three names of what is lit: CW name first, common name, and the atlas's names small beneath. For the basal ganglia, the common names of its parts, each in its colour.

**Two glass eyes.** The atlas has no eyes and no optic nerve. Place two plain glass spheres where the eyes would be, by hand, and mark them in the table as *placed by hand*. They give the signal somewhere to start and tell her which way the brain faces.

## The signal

One amber pulse, starting at the right eye. This is the thing the bench exists to show, so take care with it.

- **The road:** right eye, then a stretch drawn by hand to the optic chiasm (the atlas lacks the nerve; mark it as drawn), then the chiasm, where the pulse **divides in two**: one goes back along the right optic tract, one crosses and goes back along the left. Each reaches the lateral geniculate body on its side, then travels the optic radiation to the back of the head, ending at the fold between the cuneus and the lingual gyrus.
- **Run it through the true parts.** The pulse travels inside the chiasm, tracts and radiations of the model, along their middles, not along a line drawn near them. The radiation is a broad sheet; whether the pulse runs as one thread through its middle or fans across it is yours to judge. Say which you chose and why.
- **Two neurons, one handoff.** The first cell runs from the eye to the lateral geniculate; a second runs from there to the back of the head. Show the handoff: the pulse arrives, the geniculate brightens for a moment, and a new pulse leaves. It should read as a relay, not a pause.
- **The times** are the ones on `about-your-brain.html`: the switchboard at about 35 ms, the back of the head about 25 ms later. A small counter reads *ms of brain time*. The pulse runs slowly enough to follow, then repeats.
- While the signal runs, the road's parts show faintly so she can see where it is going; the rest of the brain dims a little.
- **No fibre splits.** If words are needed, the true statement is that about half the fibres cross and half stay. Don't write that a fibre divides.

## Credit

At the foot of the page, small: the credit lines your report gives for HuBMAP's model, the Allen atlas, and McGill's notice, with the licence named.

## Open items. Don't invent these.

- **The head** that appears while turning. Wanted, not in this bench.
- **The hand-placed patches** for the four names. Not in this bench.
- **The other ten things the brain does** on `about-your-brain.html`. Not in this bench.
- **The region colours.** Placeholders.
- **Whether this brain replaces the painting** on `about-your-brain.html`. Michael rules that after he has held the bench. Don't touch that page.

## Check, then stop

- Run the bench on the Mac. Take pictures at 1,024 × 768 and at an iPad's upright size: as it opens; the basal ganglia lit; the switchboard lit; the signal at the eye, at the chiasm as it divides, at the handoff, and at the back of the head. Put them in `CWVault/claude/Build-Brain-Bench-01/pictures/` with a plain `index.html` that opens by double-click.
- Report the frame rate on the Mac while turning, and the time from opening the page to first seeing the brain.
- Update `MANIFEST.md` and `00-BOARD.md` as the house rules ask.
- Write `CWVault/claude/Report-Build-Brain-Bench-01.md` for Michael, in plain words: what was built, where each file is, the choices you made, what still looks wrong, and anything in this prompt you could not do. Checksums at the foot, as before.

**Stop and report before any commit.** The bench has not been tried on an iPad and Michael will want to. When he says go, commit and push so that he can open it at curiouswoods.org; say then what address to open.
