---
status: Report — the shared 3D shelf and the Sun bench, built 26 Oct 2026; committed the same day on Michael's word after the heat check, not pushed
role: What was built to Michael's prompt of 26 Oct, what was measured, and what the standard left open
updated: 2026-10-26
---

# Report: the shared 3D shelf, with one bench (26 Oct 2026)

Michael's prompt: *build the shared 3D shelf, with one bench*. Built in Claude Code on the Mac; committed on his
word after the ten-minute heat check passed on the iPad and the Mac; not pushed.

## What was not there

`CWVault/claude/Standard-Interactives.md` and `CWVault/claude/Worknote-3D-Session-25Oct.md`, both named as the
first things to read, are not on disk (nor in the iCloud vault this Mac can see). The shelf was built to the
prompt, to the Ideas Ledger's three entries of 26 Oct (*Aim high, then scale*; *One way to write shaders: WebGPU
and TSL*; *One finger turns the ball*, ruled), and to the two sketches in `prototypes/3d-sketches/`, which did
arrive (11:41 on 26 Oct). The worknote's lesson about the glow was taken from the Sun sketch's own code, which
had already learned it. Where the prompt pointed at a section of the standard (§2 tiers, §4 gestures, §5 scale
notes), the section was reconstructed from the prompt and the ledger; those reconstructions are listed at the end
as things for Michael to rule on when the page is carried over.

## three.js

**r186**, npm `three@0.186.1`, tagged 24 Sep 2026 — the release current on 26 Oct and the one the standard names.
Fetched from the npm registry's tarball, not a CDN; copied into `cw-deploys/js/vendor/three-r186/`: the WebGPU
build (`three.webgpu.js`), the core it imports (`three.core.js`), the TSL entry (`three.tsl.js`) and the MIT
licence. The npm package ships no minified build of the WebGPU renderer, and there is no build step here, so the
files ship as the package carries them; Netlify compresses them over the wire.

| file | on disk | gzipped |
|---|---|---|
| `js/vendor/three-r186/three.webgpu.js` | 2,284,850 | 446,598 |
| `js/vendor/three-r186/three.core.js` | 1,458,113 | 288,306 |
| `js/vendor/three-r186/three.tsl.js` | 36,854 | 7,697 |
| `js/3d/scene.js` | 13,616 | 5,072 |
| `js/3d/cutaway.js` | 3,871 | 1,571 |
| `js/3d/noise.js` | 2,549 | 1,239 |
| `js/3d/glow.js` | 2,626 | 1,252 |
| `js/3d/honest.js` | 2,813 | 1,261 |
| `js/3d/still.js` | 4,110 | 1,872 |
| `experiments/sun-3d.html` | 16,379 | 6,315 |

A first visit to a 3D page fetches about 740 KB; the shelf itself is under 15 KB.

## The shelf, `cw-deploys/js/3d/`

ES modules (`<script type="module">` with an import map for `three`, `three/webgpu`, `three/tsl`), each small,
each one thing; every shader in TSL, no GLSL `ShaderMaterial` anywhere. The MANIFEST entry of 26 Oct describes
each file; in short:

- **`scene.js`** — `cwScene(host, options)`: the WebGPU renderer with its automatic WebGL 2 fallback, the camera,
  the ball the page's objects hang on, the three tiers and the timing that picks one, the five gestures, reduced
  motion, the phone's still, the words *Reset view* and *Let it move*. Test flags `?tier=`, `?gl=1`, `?reduce=1`.
- **`cutaway.js`** — a ball with a quarter out, closed by two half-discs; the page supplies the surface material
  and a TSL function of the face point for the cut faces.
- **`noise.js`** — `noise3`, `fbm3`, `hash3`, `cells3` (moving cells, the granules).
- **`glow.js`** — the one glow, drawn first: additive, `transparent` false so it sits in the opaque list where
  `renderOrder` −1 is obeyed, depth test and write off. Both backends apply a material's blending with
  `transparent` false (checked in r186's source), so they cannot differ.
- **`honest.js`** — *Honest about the picture*: each note read on as one sentence, its bracket in the quieter
  ink, Georgia and the inks from `cw-style.js`.
- **`still.js`** — one frame at full tier into a render target 4,096 px on the long side, read back, the notes
  and credit written under it, a PNG.
- **`lens.js`** — not written; the Star lab chat will say what it needs.

## The bench, `cw-deploys/experiments/sun-3d.html`

The Sun, Boiling on the shelf: granules (moving cells, warped, each brightening and fading, a fine grain at full
tier), limb darkening, the cut-away with the core to 0.25, the radiative zone to 0.70 and the convection zone to
1 at true scale, the shimmer in the radiative zone, rolling columns in the convection zone, hairlines at the
boundaries, the glow drawn first, a warm near-black ground (`#140f0b`) in a stage on the parchment page. Words:
*Boiling*, *Cut open*, *Reset view*, *Keep this picture*. A tap names the zone under the finger and marks it in
the legend. The corner readout (backend · tier · fps) is the bench's only. Listed in `experiments/index.html`.

Everything the sketch drew is drawn; nothing had to be faked. Two differences by choice: the noise is three's
MaterialX Perlin scaled 1.4 to the sketches' simplex swing (one library, not a GLSL port), and the glow has no
hard edge (the sketch's sprite showed its square). The idle turn ends at the first touch, where the sketch's
went on; *Reset view* brings it back.

## Measured on the Mac (M1 Pro, the browser pane, Chromium 152)

The pane's on-screen rate is not a measure of the shelf: a hidden pane draws nothing, and a visible one presents a
WebGPU canvas at 2–7 fps against 3.6 ms of GPU work (the same page on WebGL 2 presents at 60). So the bench carries
`cwBench(tier)`, which draws twenty frames off-screen and waits for the graphics card to finish each:

| tier | pixels | WebGPU, ms a frame | WebGL 2 |
|---|---|---|---|
| full | 1954 × 1044 | 3.63 | 16.1 (vsync-bound; see below) |
| middle | 1465 × 783 | 2.42 | 16.8 |
| floor | 977 × 522 | 1.40 | 16.7 |

On WebGL 2 three's readback waits on `requestAnimationFrame`, so the measure cannot see under one display refresh;
it says only *at least 60*. The on-screen readout on WebGL 2 says 60 at every tier.

**With WebGPU switched off** (`?gl=1`, which is what a browser without WebGPU gets): the same picture on WebGL 2,
no visual difference found; the gestures, the tap, the still (4,096 × 2,772, the right way up — the rows are
flipped on the WebGL side) all as on WebGPU. In the iPad Air (M4) simulator's Safari (iOS 26.5), which has no
WebGPU, the page runs on WebGL 2 at 60–61 fps, the cut faces and the shimmer drawn, a tap naming the surface, no
shader error (`?log=1` writes the console under the stage for a browser whose console cannot be reached; the
only line is three's *WebGPU is not available, running under WebGL2 backend*). Two early frames there showed the
ball whole, which was the idle turn carrying the wedge away, not a fault; so the idle turn now ends at the first
touch, and Michael may want it slower still, or a rock rather than a turn, since a full turn hides the cut half
the time.

Also checked: the five gestures by synthetic pointers (turn 0.41 rad for a 120 px drag, pinch 4.31 → 2.15,
two-finger move, wheel 4.31 → 5.00, tap: core, convection zone, surface, empty ground); reduced motion (`?reduce=1`:
still, *Let it move* → *Hold still*); the phone at 375 px (one frame, the message, no gesture); the page-standard
check (no errors).

**Not checked:** WebGPU in Safari (the real iPad has it; the simulator does not); the iPad itself; the heat over
ten minutes; a machine slower than the M1 Pro, so the tier drop has only ever been forced.

## What the standard, as the prompt gives it, turned out vague or wrong

1. **The tier test's numbers** are not in the prompt: chosen here as a second and a half to settle, then two
   seconds timed, dropping a tier when the average is slower than 48 a second, never climbing back in a session,
   the tier remembered in `sessionStorage`. Frames while the page is hidden, and single stalls of 50 ms or more,
   are not counted — without that, a page opened in a background tab reads as the slowest machine there is and
   drops to the floor (it did, in the first test).
2. **Timing frames cannot tell "60 with room to spare" from "60 barely".** A tier drop comes only when a machine is
   already struggling, and never before the child has seen it struggle for three and a half seconds. The GPU's own
   cost (as `cwBench` measures it) could pick a tier in one frame; it needs a readback, which the shelf could do
   once at the start. Michael to rule.
3. **§5's "brackets"** was read as the bracketed true measure after each note (`[a real one is about 1,000 km
   across …]`). If a bracket is something drawn, say so.
4. **The page's colour:** built as a parchment page with a dark stage, so the notes take `cw-style.js`'s inks as
   the prompt asks; the sketches were dark all over.
5. **Versioning modules:** the shelf's files import each other relatively, with no `?v=`; the page bumps the query
   on the files it imports, and the vendor folder is versioned by its name. The page standard speaks of classic
   scripts only.
6. **WebGL 2's readback polls on `requestAnimationFrame`** in three r186, so a still cannot be made while the page is
   hidden on that backend. Harmless for a child; it bit the test.
7. **The simulator has no WebGPU**, so the fallback is what any simulator test will show; WebGPU in Safari is only
   testable on the iPad itself or in Safari on the Mac.
8. **The Sun has no icon**; the bench wears the star's.
9. **The idle turn** is not in the prompt or the ledger. Built as a slow turn until the first touch (the sketch's
   *Spin* went on for ever); it hides the cut for half of every turn. A slow rock, or no idle motion but the
   boiling, would keep the cut in view. Michael to rule.

## Next

Michael opens `curiouswoods.org/experiments/sun-3d.html` — once committed and pushed; until then
`localhost:8765/experiments/sun-3d.html` on the Mac — on the iPad and the Mac, runs the ten-minute heat check, and
says commit or not. Then the Early Earth sketch moves onto the shelf.
