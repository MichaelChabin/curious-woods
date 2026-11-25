---
status: Build report, 15 Nov 2026, for Michael. The bench is built and checked on the Mac. Nothing is committed; it waits for his go. Not tried on an iPad.
role: What the brain bench is, where each file is, the choices made, what still looks wrong, and what in the prompt could not be done.
related: Prompt-Build-Brain-Bench-01.md, Report-Survey-Brain-Atlas-01.md, Build-Brain-Bench-01/index.html (the pictures), cw-deploys/experiments/brain-bench.html, cw-deploys/models/brain/README.md
---

# The brain bench: build report

The pictures are in **`Build-Brain-Bench-01/index.html`**. Double-click it in Finder. Seventeen pictures: seven at each of the two sizes, and three close views of the signal.

To try it now, before any commit: http://localhost:8765/experiments/brain-bench.html (a server from another session is already serving the folder on this Mac).

## What was built

One page, `cw-deploys/experiments/brain-bench.html`, called *The brain bench*.

- **The brain** is the Allen model, the 3.0 MB copy with every triangle kept. As it loads it is centred, flipped so left is left, and the eight swapped names are put right. The glass is the survey's, unchanged.
- **It opens front-left**, the view of the survey's picture 4, and turns slowly. The first touch stops the turning for good. One finger, or the mouse, turns it.
- **Getting better at things** lights the caudate (three parts), the putamen, both segments of the pallidum, the nucleus accumbens, the subthalamic nucleus and the substantia nigra, both sides, each in its own colour.
- **The switchboard** lights the thalamus, both sides.
- **A signal from the right eye** runs the amber pulse. See below.
- Tapping a lit button clears it.
- **Under the brain**, three lines: the CW name, the common name, and the atlas's names small beneath. For the basal ganglia, each part's common name is in its colour.
- **Two glass eyes**, plain spheres 24 mm across, placed by hand.
- **Credits** at the foot, small: HuBMAP's model, the Allen atlas, McGill's notice, with CC BY 4.0 named.

## Where each file is

| File | What it is |
|---|---|
| `cw-deploys/experiments/brain-bench.html` | the bench |
| `cw-deploys/models/brain/allen-f-full-meshopt.glb` | the model, as fetched and packed in the survey; not edited |
| `cw-deploys/models/brain/allen-true-names.json` | the eight-line table that puts the swapped names right |
| `cw-deploys/models/brain/brain-names.json` | the names table |
| `cw-deploys/models/brain/README.md` | what the three files are, and the credit that must travel with the model |
| `cw-deploys/js/vendor/three-r186/three.module.js` and `jsm/` (four files) | Three.js r186, the WebGL build and its model loader |
| `cw-deploys/experiments/index.html` | one new item at the top |
| `CWVault/claude/Build-Brain-Bench-01/` | the pictures and their page |

**Why `models/brain/`.** `cw-deploys/models/` is where the site already keeps models that pages load (the Geometry constructions). The brain gets a folder of its own there because it is three files and a credit, and later pages will call it by that address.

**Why more Three.js.** The house's Three.js is r186, but only its WebGPU build was in the vendor folder. The survey's glass is a small WebGL shader, and you asked that the glass not be restyled, so I added r186's WebGL build beside it. It is the same release and shares the 1.4 MB core file that was already there, so it adds about 0.9 MB. I fetched it from npm (`three@0.186.0`); nothing is installed in the project.

## The names table

`brain-names.json` has four sections.

- **`names`**: the twelve CW names. Each has its common name, its kind (true part, loose fit, placed by hand), its status, and the parts it points to. The two that light on this bench carry their colours.
  - The six clean matches and the basal ganglia are entered as ruled.
  - The four with no part are entered as *placed, not yet made*, each with the fold your survey gave.
  - **Conscious thought is entered as *not ruled***, a loose fit, with the survey's candidate parts. Your rulings did not mention it and I did not decide it.
- **`parts`**: all 142 parts. Each has the atlas's exact name (from the Allen label volume) and a common name.
  - 31 common names are in use on this bench.
  - **111 are proposed, and marked so.** Most are the atlas's name with the brackets dropped. Where several parts make one familiar thing they share a name: ten parts are "amygdala", five are "lateral ventricle", five are "insula". Please read them.
- **`placed`**: the eyes, with their positions, marked placed by hand.
- **`road`**: the signal's road, step by step, each step marked true part or placed by hand.

Two things about names that you should know.

- **HuBMAP's file names are not always the atlas's.** The file calls a part `primary_motor_cortex`; the Allen atlas calls it *precentral gyrus*. Seven others differ in small ways. The table keys each part by the file's name, because that is what the model answers to, and gives the atlas's own name beside it. The page shows the atlas's.
- **The optic chiasm is not one of the Allen atlas's 141 structures.** HuBMAP added it. The table says so.

## The signal

The road, in order: the right eye; the optic nerve; the chiasm; both optic tracts; both lateral geniculate bodies; both optic radiations; the fold between cuneus and lingual gyrus on each side.

**It runs inside the true parts.** As the page loads it finds the middle of each part from the part's own shape, and the pulse travels along those middles.

- *Chiasm.* Cut into eight slices front to back. The pulse that stays follows the middle of the right half. The pulse that crosses starts with it and slides over to the middle of the left half.
- *Tracts and radiations.* The page walks outward over each part's surface from one end and takes the middle of each band of the walk. For a tube this is its axis. For the radiation it is the middle of the sheet.
- I measured the points: each is the middle of a ring of the part's own surface, and lies 0.4 to 2 mm from the nearest point of that surface. I did not run a strict inside-or-outside test.

**Three stretches are drawn by hand, and shown as dots.**

1. *The optic nerve*, eye to chiasm. You asked for this.
2. *From each geniculate body to the radiation, about 13 mm.* **This one you did not ask for.** The atlas's radiation does not touch the geniculate; it begins 13 mm to the side. The ground between is the atlas's unnamed white matter. The pulse crosses it in a straight line.
3. *The last 4 mm*, from the back end of the radiation to the nearest point where cuneus and lingual gyrus meet.

**One thread, not a fan.** The pulse runs as one thread through the middle of the radiation. A fan would say that one cell's signal spreads across the sheet, which is the same untruth as a fibre dividing. One cell is one thread. The cost is that the radiation's front loop, which swings forward before turning back, is averaged into the thread and not followed.

**The handoff.** The first pulses reach the two geniculate bodies together at 35 ms. Each body turns amber and swells for about half a second, and a new pulse leaves it in the same instant. Nothing waits.

**The times.** 35 ms at the geniculate, 60 ms at the fold, as on *About Your Brain*. The counter runs at 7 ms of brain time for each second of watching, so the whole trip takes about eight and a half seconds. It holds at 60 for a second and a half, goes dark for a second, and starts again.

**The dividing.** From the eye to the chiasm two pulses travel as one, so the spot is twice as bright. In the chiasm they part, each half as bright. The words under the brain say "about half the fibres cross and half stay." Nothing on the page says a fibre divides.

**While it runs**, the chiasm, tracts, geniculate bodies and radiations show as pale glass, not amber, and the rest of the brain dims to about 60%.

## Other choices

- **One button at a time.** Lighting one clears the others. The line under the brain can then name one thing. If you want the switchboard lit while the signal runs through it, that is a small change.
- **The eyes.** Centres 32 mm either side of the midline, their tops about 1 cm below the underside of the frontal lobe, just behind the front of the brain. Judged from the model's shape, not measured from a head. They are in the table, so moving them is a number.
- **Coming closer.** A pinch or the mouse wheel brings the brain nearer. You did not ask for it. The signal is small in the opening view and I wanted to see the chiasm.
- **The small posteroventral putamen** is lit with the putamen. Your ruling says "the putamen"; the atlas counts this piece apart. The survey said it belongs. The table notes that you did not name it.
- **The geniculate's common name** is "lateral geniculate body", your word. The atlas's is "dorsal lateral geniculate nucleus".

## Measured on the Mac

An M1 Pro MacBook, in Safari, window 1,523 × 724 at double density, served from this Mac.

- **Frame rate while turning: 60 a second**, with nothing lit, with the basal ganglia lit, and with the signal running. 60 is the screen's limit, so I cannot say how much is to spare.
- **Time from opening the page to first seeing the brain: 0.3 to 0.5 seconds.** That is with no network. From curiouswoods.org it will be longer by the time it takes to fetch 3.0 MB of model and about 2.3 MB of Three.js.

## What still looks wrong

- **The eyes look like two marbles hung under the brain.** They do tell you which way it faces. They are plain, as asked, and large beside the folds.
- **The three small partners are hard to find** in the opening view. They are lit, but they sit low and behind the putamen.
- **In the opening view the whole road is small.** The dividing at the chiasm is a few pixels. It reads well only when you come closer (the three close pictures).
- **The pulse is a round glow with almost no tail.** It reads as a dot moving, not as something travelling along a wire.
- **The radiation, shown faintly, is a pale slab** with a hard outline, heavier than the other road parts.
- **The end is not at the back of the head.** The fold where the radiation reaches it is about 25 mm in from the back surface. The pulse stops there, which is true, but "the back of the head" promises more.
- **The brain keeps turning while the signal runs**, unless you have touched it. The road is harder to follow on a turning brain.
- **At the iPad's upright size** there is empty space above and below the brain.
- **The colour words under the brain are paler** than the glass they name.
- Everything the survey listed is still true: smoky glass, no far half, the pallidum hidden from the side, the tangle of pale inner shapes.

## What I could not do

- **Pictures at a true 1,024 pixels.** The app's browser pane is 800 points wide. It lays the page out at 1,024 × 768 and at 820 × 1,180 correctly, but hands back pictures 800 pixels across. I tried a headless Firefox for full-size pictures; it hung and I dropped it.
- **An iPad.** Not tried, as you expected.
- **The frame rate's headroom**, as above.

## What was checked, and what was not

- The three buttons light and clear, by script and by a real click. A real drag turns the brain and stops the slow turning. The wheel brings it closer. A pinch was not tried; there is no touch screen here.
- `tools/check-deploys.sh` passes for the page.
- No errors in the console from the page.
- The signal's moments in the pictures were held by a bench-only switch, so each picture is of an exact time. I did not watch the signal run in real time for long; the pane does not run frames steadily. Safari ran it, but nobody was looking.
- Opening the page in Safari three times for the measurements left three tabs open there.
- `about-your-brain.html` is untouched.
- MANIFEST and the board are updated. **Nothing is committed.** Other sessions have uncommitted work in MANIFEST, the board and the experiments index; when you say go I will commit this session's parts only.

## When you say go

I will commit and push. The address will be **https://curiouswoods.org/experiments/brain-bench.html**.

## After the report

Michael said "Commit the working tree changes" the same day. Committed, this session's parts only; not pushed. The page's stamp was bumped for the commit (`acc00e2`), which is the only change to it since the checks above. Another session's commit (`acc00e29`) had already carried this session's board lines.

## Checksums

`shasum -a 256`. A file cannot hold its own sum, so the report's is of everything above this heading:
`sed '/^## Checksums$/,$d' Report-Build-Brain-Bench-01.md | shasum -a 256`

- `Report-Build-Brain-Bench-01.md`, above this heading: `f122051380be59154eb335631022b12b1f0a313682cf80ffbbe73604ea766d27`
- `Build-Brain-Bench-01/index.html`: `2ecee3c7f6f6f7f0c68d1d4b4d109fff5109aed7639405448391e3331ce88764`
- `cw-deploys/experiments/brain-bench.html`: `027a78d28956cf0965cb9d4f4c4ad967b67110330e8a3bd8c487f1b00284b5d8`
- `cw-deploys/models/brain/allen-f-full-meshopt.glb`: `52f7ea6399bf6a688fa0688db9305810b057328b849c9eae9fbbbc63ba09da08`
- `cw-deploys/models/brain/allen-true-names.json`: `ca9b6422b0bd05163c3561e37445696b7673ded527a29a6449665ff3deff29ca`
- `cw-deploys/models/brain/brain-names.json`: `908a96371ef1849c7dc23e7f6a9635646bf7ce6a7003f3f842254c391009f58c`
- `cw-deploys/models/brain/README.md`: `54927ccc043a3cfb569064e076a5159c9b7ebbe3c4e6df0a2bc59bc572205c59`
- `cw-deploys/js/vendor/three-r186/three.module.js`: `9052042d676cb0fdc1ddfefe193053f34b7ac0513a616fdac4535d49987812ea`

## Decided by default, 19 to 20 Nov 2026

Added 25 Nov 2026, after the checksums so that the sum above still holds. Michael did not rule on four small choices in this report; on 25 Nov ("I agree with all your recommendations", the "Woods this week" chat) they were recorded as decided, each standing as built. No code changed.

1. **The switchboard while the signal runs: as built.** One button at a time, so lighting the signal clears the switchboard: the thalamus is not lit as a whole while the signal runs, and only the two geniculate bodies inside it turn amber at the handoff. (The prompt of 25 Nov put this as "the switchboard stays lit while the signal runs". That is not what the page does; the page is what stands. Recorded so, for Michael to correct.)
2. **The 13 mm straight crossing stays,** from each geniculate body to the atlas's radiation, drawn by hand and shown as dots.
3. **The back of the head stays** as the end's name, though the fold is about 25 mm in from the back surface.
4. **Conscious thought stays unplaced:** a loose fit, not ruled; its candidates stay in the names table.
