# cw-deploys — what is here

Netlify publishes this folder and nothing above it. Anything outside
`cw-deploys/` is never served.

## Folders

**`active/`** — current, shipping. Hung in the gallery (`index.html`, by a line in
`stories/gallery.json`) or listed on `labs.html`.
No version numbers or dates in filenames here: the file at
`active/glass-geometry.html` is *the* Glass Geometry, always.

**`experiments/`** — live and reachable, but unpolished. Linked only from
`experiments/index.html`, never from the main index. Version numbers are
allowed here.

**`_redirects`** — root of this folder, alongside `_headers`. Netlify reads it. Holds the
301s left behind when a live page moves; a page that has been published keeps its old URL
working, for the same reason retired files are never deleted.

**`../outdated-files/`** — outside this folder, so Netlify never serves it.
Superseded versions, kept as the archive record.

**`js/`** — shared code, at the root of this folder. Classic scripts, no
build step. `cw-flags.js` (15 Sep 2026) — feature flags, `CW.flags = { maya: false }`, loaded first on every `active/` page with a version query; the Maya flag is all it holds, because nothing else about Maya exists yet, and Remember on story pages reads it (visible always with Maya; fades in as the text's reference nears without her). **`cw-number.js` — how a number is written, everywhere** (extracted
2 Sep 2026 on Michael's instruction that the benches and labs all write numbers
the same way; the third shared file, and the first added since Phase 4). Until
it existed there were four dialects: plane.js grouped thousands for tick labels,
the Multiply bench had its own decimal trimmer derived from that, the Ruling
bench had its own stacked fractions, and Glass Multiplication wrote `String(n)`
on a pane with no grouping at all. It gathers the rules already settled
elsewhere and cites them — stacked fractions never slashes (walk step 3), never
more precision than the act showed (Controls-Aug12 §6), trimmed and grouped
(plane.js's own labels), and **the math axis**: every term on a line sits on the
line where a fraction bar and the middles of × = − live, which is not the
baseline. It serves both the DOM (`CW.num.html`, and a stylesheet it injects
itself so markup cannot be adopted without the alignment) and canvas
(`CW.num.draw` / `drawText` / `measure`, where the y passed is always the axis).
**Load it before `plane.js`**, which uses it. Adopting it re-rendered nothing
except one fix, verified across 480 000 label values: sub-unit lattice steps
used to skip thousands grouping, so at a step of 0.5 the label at 1000 read
`1000` while at a step of 1 it read `1 000`; both group now.
`plane.js` — the coordinate space both labs stand on (view state,
transforms, one zoom clamp, the ambient lattice, the pixel floor); extracted
in Phase 4 so the labs cannot drift apart. Its tick labels were the seed of
`cw-number.js` and now come back from it. `cw-panel.js` — the canvas panels
as components: the info window (draggable, closable, fading — Geometry's
tip-window pattern; used by Multiplication's number description) and, since
the controls build (13 Aug), the **choice panel** — an occasional act's
outcomes as words with recipe lines, taking one choice and fading; used by
both labs for Save, and by Geometry for the WIP guard and replay Cancel.

**`art/` `models/` `stories/` `text/`** — assets, at the root of this folder.
Pages in `active/` and `experiments/` reach them with `../` —
`../art/palettes.json`, `../models/logs/geo_hexagon_triangle.json`.
A page that moves between folders must have those paths checked.
`stories/gallery.json` — **what hangs in the gallery** (20 Sep 2026; `CWVault/20-SPECS/Spec-Gallery.md`):
a plain array, one entry per work, `{slug, title, href, icon, frame, frameWidth, size}`, hrefs
and icons relative to the site root. `index.html` and `saved.html` read it; nothing else does.
Adding a story to the gallery is adding its line here (Publishing-a-Story, stage 4), no other
edit. Three works today: The Man Who Learned Without Knowing (the star SVG, copper, medium),
Three at a Glance (the three dots SVG, near-black, small), About Your Brain (the watercolour
PNG, warm grey, medium), and since later the same day Glass Geometry (`art/geometry-icon-256.png`,
deep blue frame 14 px, large — the labs hang large). Frame colours are the salon mock's; no story
frontmatter declared one. **Left out for want of an icon:** Glass Multiplication (no icon yet;
the check has warned since 15 Sep) and The Necker Cube. The lab is reachable from `labs.html`;
the Necker Cube from the experiments index.
`stories/events.json` — the Timeline Intro's event pool (8 Sep 2026): 65 world
events and five story lead-ups, CW years, schema noted inside the file and aligned
with `Spec-Timeline-Graph.md` §4 where fields overlap. Data the page merely reads;
blurbs are unsourced first drafts, images unfilled.
`art/brain-icon-256.png` — the watercolour brain at 256 px (13 Sep 2026), the main
index's icon for About Your Brain; the first icon-as-link on the site. The page's own tab
icon reads the same file (Safari on iPad ignores data-URI favicons, tested 13 Sep, so
the page points here rather than carrying the icon inline).
`art/star-icon-256.svg` — the star with a copper dot (14 Sep 2026), the main index's
icon for The Man Who Learned Without Knowing; the second icon-as-link.
`art/star-icon-256.png` — the same star rasterized (15 Sep), the story's tab and
home-screen icon, because Safari wants a PNG there.
`art/three-dots-icon-256.png` — three ink dots in a loose scatter on cream, one copper
(16 Sep 2026), from *Three at a Glance*'s frontmatter; the story's tab and home-screen icon.
`art/three-dots-icon-256.svg` is the same mark as vector, the main index's tile for the story
since it was hung on 16 Sep (the star's pattern).
`art/geometry-icon-256.png` — **Glass Geometry's icon** (20 Sep 2026): a square cut from
Michael's postcard *Abstraction 1* (a Glass Geometry construction: a blue lens, a red sliver,
a green and a blue triangle meeting at a point), the 900 px square at 575,170 of the 1800 × 1200
render, resized to 256; no text, all four pieces. The lab's tab icon and its picture on the wall.
`art/enso-icon-256.png` — **Practice's picture, for now** (20 Sep 2026): a square from
Michael's photograph of a brushed ensō on a sunlit wall, the circle centred and the stone
left out, resized to 256. Temporary on his word; the copper ensō drawn in the salon mock is
the mark the spec describes and is what this stands in for.
`art/jevons-1877.jpg` — the engraved portrait of William Stanley Jevons from *Popular Science
Monthly* volume 11, 1877 (Wikimedia Commons, `PSM V11 D660 William Stanley Jevons.jpg`, public
domain, author unknown), greyscale, resized to 760 px wide, 184 KB. Read by
`active/three-at-a-glance.html` beside the paragraph that introduces him; nothing else uses it.
`art/hokusai-great-wave.jpg` — Katsushika Hokusai, *Under the Wave off Kanagawa*, about
1830 (19 Sep 2026). The Metropolitan Museum of Art, accession JP1847, image DP141063, open
access / CC0; the museum's 3 863 px scan resized to 1 800 px wide at quality 85, 452 KB. A
strong impression with its paper margins, so the unprinted paper is part of what can be
sampled. Read by `experiments/hokusai-the-great-wave.html` and by nothing else; the colour
sampler reads its pixels off a canvas, which is why it must be served same-origin.
`art/hokusai-icon-256.png` — the story's tab and home-screen icon (19 Sep 2026): the crest
and its claws, cut from the print at 330,150–930,750 and resized to 256 px, per the Rulings'
"a story's icon is a detail of the story itself".
`art/maps/japan.webp` — Japan, 123°E–147°E, 29°N–46°N, standard parallel 37.5, 2000 × 1786, 150 KB
(20 Sep 2026, for the Hokusai story), with `japan.json` and the unused `japan-height.png` beside
it as the other regions have. Cropped west as far as the Chinese coast for two reasons: so
Nagasaki's name is not against the picture's edge at 300 px, and so the mainland the Chinese
ships came from is on the map.
`art/map-icon-256.png` — the map bench's tab icon (18 Sep 2026): a square of the world
picture, 30°W to 30°E and 25°N to 85°N, cut from `art/maps/world.webp` and quantised to 96
colours, 30 KB. Nothing drawn; the earth is the icon.
`art/maps/` — **the base pictures for maps** (18 Sep 2026; `CWVault/claude/Spec-Maps.md`):
one earth, many crops, rendered once by `experiments/maps/render.py` from ETOPO 2022 (NOAA
NCEI, ice surface, public domain) and never touched at runtime. Per region three files:
`<region>.webp` (2000 px wide, quality 85, colour is height and ice and nothing else — the
map's own ground ramps (Spec-Maps, *The ground colours*; the colour ruling of 18 Sep), a
faint north-west shade on the land and the ice, nothing drawn on it); `<region>.json`
(name, the four corners, the standard parallel, pixel width and height, the vertical
exaggeration, the picture's filename, and **the contours** — what `map.js` reads); and `<region>-height.png` (the same crop 512 px wide,
height in metres plus 11 000 as a 16-bit value, high byte red, low byte green; **nothing
reads it** — it is the sea-level slider's food, written and left). Regions so far: `world`
(180°W–180°E, 90°S–90°N, standard parallel 0, 2000 × 1000, 153 KB, from the 60 arc-second
grids, exaggeration 3), `western-europe` (11°W–20°E, 42°N–58°N — the prompt's 40°–60° trimmed by two
degrees each side so the picture runs landscape in a column instead of square; standard
parallel 50°, 2000 × 1606, 193 KB, from the 30 arc-second grids, exaggeration 1) and `japan`
(above; 176 KB, exaggeration 1). A new region is one line:
`python3 experiments/maps/render.py <name> <west> <south> <east> <north> [--exaggeration 1] [--levels 0,-200]`,
about fifteen seconds. **Contours, as vectors** (third pass, 20 Sep): the coast (0 m) and the
shelf edge (−200 m) are traced from the sampled height grid with contourpy (marching squares,
the engine matplotlib uses), simplified with Douglas–Peucker to half a pixel, rings shorter
than six pixels dropped, converted to longitude and latitude rounded to a tenth of a pixel's
worth of degrees, and written into the region's JSON as `"contours": {"0": [...], "-200": [...]}`,
one line per polyline. They made the JSONs the largest files of the set: `world` 189 KB
(252 coast lines, 6 975 points from 36 795; 232 shelf lines, 5 749 points), `western-europe`
231 KB (473 coast lines, 11 856 points from 53 240; 24 shelf lines, 1 363 points), `japan`
210 KB (333 coast lines, 8 087 points; 118 shelf lines, 3 418 points). Netlify serves JSON
compressed, so the wire cost is roughly a third of that; if the size matters later, a
coarser rounding or a higher ring floor are the two knobs. Other heights are `--levels`;
nothing renders them yet. The sea is `#22415f` at −9 000, `#33699a` at −4 000, `#5793b4` at
−800, `#7fb0cc` at −150, `#93bed7` at the shore (the spec's *the sea stops short of paper*:
the second pass ran almost to white at the shoreline and met the paper-coloured beach; Japan
showed it). Shading is 0.35 over land and ice and half that over water, the heights
multiplied by the region's exaggeration before the slope is taken. **Ice is its own layer** (second pass, 18 Sep): each resolution needs two source
grids, ice surface and bedrock; the script checks they share one registration and refuses
otherwise; thickness is surface minus bedrock, and where it is above zero the ice ramp
paints the pixel. The four source grids (4.4 GB) live in `cw-deploys/_data/`, which
`.gitignore` excludes; they are downloaded once from NOAA's THREDDS server and must never
be committed.
`stories/necker-cube/` — **The Necker Cube**, the first story (28 Apr 2026, commit
`bec6b4f`), a single-file page at `index.html`: the cube on a canvas that flips as you
look, narrative paragraphs from `narrative.json` beside it, Web Audio, the watercolour
brain `brain-watercolor.jpeg` (also read by `experiments/necker-brain-map.html`). Public
since April but linked from nowhere until 15 Sep, when the page standard's check found
it as the one page without a stamp; stamped that day and listed at the foot of
`experiments/index.html` as the record of the first story. Folder also holds the
plan and narrative drafts it was built from, and a stray `.DS_Store`.
`models/constructions.json` — the construction library's manifest (controls
build, 13 Aug): Geometry's picker reads it at load, so library growth is a
log file plus a line here, no code. An entry may carry `speed` (seconds) to
open at a chosen playback duration.

## Page standard (standing method, 15 Sep 2026; the version stamp since 13 Aug)

Every `.html` file under this folder opens with the same five lines, whatever else it
is, because a page that arrives without them ships broken in ways nobody notices until
an iPad shows it — the story page of 14 Sep arrived with none of them:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" href="../art/<its-icon>.png">
```

- **Doctype and charset**, or the em-dashes depend on the server's header and a local
  server shows mojibake.
- **Viewport**, or Safari lays the page out 980 px wide and shrinks it — and the page's
  own `@media` rules can never fire on an iPad.
- **A tab icon that is a file in `art/`, never a `data:` URI** — Safari ignores inline
  icons (proved 13 Sep), and wants a PNG. The same file serves `apple-touch-icon`. The
  home page tile may use an SVG; the tab may not.
- **Centred, at every width.** A page's content centres in the window — the reading
  column at 700 px, and anything wider than it (a map, a bench) centred under it, the
  notes centred below. Nothing hangs from the left edge of a wide window. Not a line
  the check can read; it is a thing to look at once in a window wider than the content
  (About Your Brain shipped for six days with its map pulled left by an unclosed div,
  found by Michael on 19 Sep).
- **A `CW_VERSION` constant** (date + short commit hash) logged to the console on load,
  as the first line of the page's main script — updated in the same commit as the
  change, like this file. Shared scripts are referenced with a version query
  (`plane.js?v=...`), bumped when the script changes. `_headers` makes HTML revalidate
  on every load. It does not help to test yesterday's work.

**The check:** `tools/check-deploys.sh` reads every page here (or the ones named on its
command line) for the five lines, errors on a data-URI icon, warns on an `active/` page
with no icon, and lists untracked files under `cw-deploys/` — public if ever added.
`.githooks/pre-commit` runs it over the staged pages; enabled once per clone with
`git config core.hooksPath .githooks`. A page that fails does not commit. A chat session
that builds a page cannot run the hook, so the five lines are its brief; the hook is the
backstop for the Claude Code session that lands the file.

## Pages

### the root
- **`index.html`** — **the gallery**, the child's home page (20 Sep 2026; `Spec-Gallery.md`,
  the Rulings' *The gallery*; built from `experiments/gallery/home-mock-salon.html`, not
  redesigned). Reads `stories/gallery.json`, shuffles it (Fisher–Yates, a new hang every
  visit), and hangs up to nine works: each a link holding a coloured frame (`frame`,
  `frameWidth`; 10 px default), an 8 px mat (off-white, or the wall colour when the icon is
  an SVG, i.e. a drawn mark), the picture, and the title centred below, 15 px Georgia, one
  type for all. `size` sets the width in its column: large 100 %, medium 80 %, small 56 %.
  The wall is four columns wide, two below 900 px; **the script deals the works into the
  columns in hang order** rather than letting CSS multi-column balance them, because with
  three works balancing left a column empty and the wall left-heavy, against the page
  standard's *centred at every width*; the columns are re-dealt only when their count
  changes on resize. Below a hairline: **Practice** centred, an ensō in a copper
  frame at 140 px with no visible title (the mark is the name; "Practice" is there for a
  screen reader) — since later on 20 Sep the photograph `art/enso-icon-256.png`, temporarily,
  in place of the mock's drawn copper mark, linking to `experiments/trace.html` until the practice queue exists; at
  the right three plaques of one size, Saved Stories (`saved.html`), Labs (`labs.html`),
  Experiments (`experiments/index.html`), no pictures. **What comes and goes:** a slug in
  `localStorage` `cw.gallery.finished` comes down unless it is also in `cw.gallery.kept`;
  the gallery reads both and writes neither. Today no page writes either key, so nothing
  comes down; the story page's end-of-text record and the *keep this* control are later
  steps. Tab icon: the star PNG, because the site has no mark of its own yet.
- **`saved.html`** — **Saved Stories**: the works whose slugs are in `cw.gallery.kept`, as a
  plain centred list of titles from `gallery.json`; "Nothing here yet." when there are none
  (no promise of how to keep one, since the control does not exist). Back link to the gallery.
- **`labs.html`** — **Labs**: Glass Geometry and Glass Multiplication as words with their
  one-line labels from the old home page; no pictures. About Your Brain is an official app
  beside the labs but hangs on the wall as a work, so it is not listed here (open for
  Michael). Back link to the gallery.

### active/
- **`glass-geometry.html`** — compass-and-straightedge construction environment;
  constructions become stained glass. **Hangs in the gallery since 20 Sep 2026** by
  `art/geometry-icon-256.png`, a cut from one of its own postcards, which is also its tab
  icon (the first it has had; stamp bumped the same day, nothing else in the file changed). Reads `../text/geometry-v1.json` for its
  copy, `../art/palettes.json` for palettes, and `../models/` for the built-in
  constructions. **Stands on the shared plane** (`../js/plane.js`, Phases 1–4):
  view state behind the plane's API, world y up, one zoom clamp, the emergent
  numbering's unit declared to the plane, the ambient lattice behind a Numbers
  control cycling map · points · off — and, since Phase 4, lattice-click
  minting: with the map showing, tapping a lattice intersection records a
  point (`lattice_point` op, unit-coordinate address). Saved logs replay
  unchanged but render mirrored across the seed axis relative to the retired
  y-down view. **Controls build (13 Aug):** occasional acts open choice
  panels (Save construction / Postcard / Full sheet — Postcard shares at
  1200×800, Full sheet keeps the 3000×2400 print render; the WIP guard also
  fronts the `.json` drop); **replaying opens the replay panel** (13 Aug
  afternoon, ledger §15): step arrows, Play with a 0–15s duration saved per
  construction (0 instant; last-used is the local default), Start over,
  tap-skips-ahead, close-as-fork — and the built-ins come from
  `models/constructions.json`; the action row is conditional
  (empty canvas shows only Open); the color panel is summoned by Color and
  closable; Numbers became Show map ↔ Hide map (old logs migrate at replay);
  the lattice tie is gone (grid keeps its step); Just the glass ↔ Show the
  making wires the `show_glass` viewing op. Ledgers:
  `CWVault/01-ACTIVE/Decisions-Phase{1,2,3}-Aug07.md`, `…Phase4-Aug08.md`,
  `…ControlsBuild-Aug13.md`.
- **`glass-multiplication.html`** — the times table as a window onto the number
  plane: every product a rectangle, prime factors in colour and sound.
  **Rewritten on the plane** (Phase 4, 8 Aug 2026): the map is a canvas
  viewing of the shared coordinate space (`../js/plane.js`) — panes are
  regions keyed by number, revealed everywhere they live including panes
  panned into later; pieces stack smallest prime first, identically
  everywhere (no mirror); colours are the `aslab` workshop's resting and lit
  palettes; primes reach 19 in sound and render as clear glass beyond the
  workshop's six; keyboard access via a pane cursor on the one tabbable
  canvas. Defaults to the map shown. Live since 8 Aug (that push's copy was
  approved via the printed-strings scan; the full read-aloud pass with Eileen
  comes later). **Controls build (13 Aug):** a conditional Save word (present
  when anything beyond 1 is on the glass) opens the choice panel — Postcard
  shares the window at 1200×800, Full sheet downloads the 3000×2400 print
  render (no construction save: this lab keeps no operation log, reported to
  the board); Numbers became Show map ↔ Hide map. Ledgers:
  `CWVault/01-ACTIVE/Decisions-Phase4-Aug08.md`,
  `…ControlsBuild-Aug13.md`; Michael's sorted post-Phase-4 review:
  `CWVault/01-ACTIVE/Review-GlassMult-Aug09.md`.
  **What `active/` carries is the 13 Aug build** (`CW_VERSION 2026-08-13 b32d541`),
  restored 1 Sep after the 24 Aug panel build was frozen unshipped to
  `../prototypes/glass-panel-build-aug24.html` — see the prototypes note at the foot
  of this file. Nothing deployed changed. The rebuild runs bench-first on the plane
  (`CWVault/01-ACTIVE/Walk-Glass-Aug26.md`), and this lab stays live throughout.
- **`about-your-brain.html`** — **About Your Brain.** An official app beside the two labs
  (Michael's ruling, 13 Sep 2026), and **the first card on the main index to link by icon**:
  the watercolour brain at `../art/brain-icon-256.png`, icon and title one link. A short
  reading (neurons, eighty-six billion of them, a hundred trillion connections, a brain
  the weight of a large cantaloupe) and then a map: Michael's two brain watercolours —
  the outside view and the inside view, reached by the words *inside* / *outside* — with
  twelve named places (*conscious thought*, *where seeing starts*, *how many*, …, each
  with a sentence when tapped; *all of them* lights the lot), and beside them **Ten
  Things It Does** — seeing three triangles, reading a word, hearing a beat, tracing a
  star in a mirror, remembering, touching something hot, playing ping-pong, seeing a
  chess position, hearing an old song, drawing a friend's face — each a signal
  travelling the brain as a comet along a road, with *step*, *real speed*, a slow-to-real
  slider and a counter of brain-time in ms; starting one stops the one before. Region ids
  and coordinates match `Spec-Brain-Bench.md`; this is the atlas, not the bench (no
  *earn*, no deposits, nothing stored). **Self-contained but for its icon**: both
  paintings are base64 in the file (4.1 MB), no shared scripts; the one `../` path is
  the tab icon, `<link rel="icon">` and `apple-touch-icon` both pointing at
  `../art/brain-icon-256.png`. **19 Sep:** one `</div>` added to close the map row —
  it had been open since the 13 Sep revision, so the footnote sat in the row as a fourth
  column and the brain and its word columns hung left in a wide window; now the row and
  the note centre under the reading column at every width. Later the same day, on Michael's second report: below
  1048 px, where the three pieces no longer fit in one row, the brain now comes first and
  the two word lists sit side by side beneath it (one media rule; before, the lists
  stacked above and below the brain). Nothing else changed. The
  revision arrived with the icon inline as a `data:`
  URI, and **Safari on iPad ignores data-URI favicons** — tested 13 Sep on the iPad
  (10th generation) simulator, iOS 18.2: a placeholder letter in the tab, while a
  two-page control on the same Safari showed the identical PNG as a file at once
  (Chrome honours both). Repointed to the file on Michael's word the same day, and the
  brain shows in the tab. Stamped the same day, per the standing method. A page that
  moves must have that one path checked. History: built as `experiments/brain-atlas.html` (never listed in
  `experiments/index.html`), moved to `active/brain-atlas.html` as *A Small Brain Atlas*
  and pushed as a demo on 12 Sep (`CW_VERSION 2026-09-12 82033fa`, now
  `../outdated-files/brain-atlas-20260912.html`); renamed here with the ten-pathway
  revision on 13 Sep, `_redirects` keeping the day-old URL alive. Its workbench —
  the paintings, the overlay, the checks, `make_overlay.py` — is `../prototypes/brain/`,
  moved out of the publish directory the same day; see the prototypes note at the foot.

- **`the-man-who-learned-without-knowing.html`** — story: **The Man Who Learned Without
  Knowing** (text: `CWVault/claude/Story-The-Man-Who-Learned-Without-Knowing.md`), on the
  home page beside About Your Brain since 14 Sep 2026, linked by its icon
  (`../art/star-icon-256.svg`, the star with a copper dot). The finished story page,
  self-contained: the two-panel layout of UI-Language §1 — the narrative on the right,
  the **context membrane** on the left carrying the star, then the brain, then the
  inscription. The star (380 px stage, mirrored left-right, the road 6% of the star's
  width, one bump per excursion, a trip counts when 80% of the road is travelled and the
  dot is back at the start; lifting the finger abandons the trip) runs ten trips, then
  *again* / *without the mirror* / *show the star* / *the graphs*. Scrolling to *Henry*
  brings the outside brain in, with *tap the brain to see what the surgeon removed* —
  the word or the picture turns it to the inside view and marks the hippocampus,
  *removed, 1953*. Scrolling to *Two memories* brings the brain back with *your brain,
  tracing the star* and *Henry's brain, tracing the star*, each a signal along the
  atlas's roads with step, again, clear and a slow-to-real slider. The inscription puts
  `mirror-star` in `cw.practice.queue`; trips live in `cw.mirror-star.v2`. **Nothing
  else on the site reads either key yet.** Both paintings are inline base64 (4.1 MB of
  the file). **Tested 14 Sep on the iPad (10th generation) simulator, iOS 18.2**: a finger
  drives the dot round the whole road; Henry brings the brain and both tap targets
  reveal the surgery; Two memories brings the second brain with both words. Copied from
  `experiments/trace-prototype-star-story.html` byte for byte on 14 Sep; **the page
  standard added on Michael's word, 15 Sep** — the file had arrived opening with
  `<title>`: no doctype, no charset (its em-dashes are raw UTF-8 and showed as mojibake
  on a local server), no viewport, no icon, no stamp. Now: the five lines, the icon as
  `../art/star-icon-256.png` (rasterized from the SVG, because Safari wants a PNG), and
  `</body></html>` at the foot; the narrative and script are untouched. **One
  consequence of the viewport line, reported:** the page's own rule stacks the panels
  below 800 css px, which could never fire while Safari laid it out at 980 — now an
  iPad narrower than 800 points in portrait (mini; the 2017-era 768-point iPads) shows
  the star *above* the story, where the text says *on the left*. The 10th-generation
  iPad (820) keeps two columns. The source copy in `experiments/` and a stray re-export
  of the atlas were removed 15 Sep on Michael's word; the story's original bytes are
  commit `fa56905`. Not the story-door route: `experiments/story-learned-without-knowing.html`
  (11 Sep, calling `trace.html`) stays as the record of that route; this page carries
  its own star engine and its own brain.

- **`three-at-a-glance.html`** — story: **Three at a Glance** (text:
  `CWVault/claude/Story-Three-at-a-Glance.md`, Draft 5, which matches the page), built 16 Sep
  2026 on the model of `active/the-man-who-learned-without-knowing.html` — stage 2 of
  `00-PUBLISHING-A-STORY.md` — then changed the same day on Michael's reads, read by him on
  the Mac and the iPad, and **hung on the home page 16 Sep** (stage 4): moved from
  `experiments/Three_at_Glance.html`, which `_redirects` sends here, and given the third icon
  tile beside the star, `../art/three-dots-icon-256.svg` with its title and no subtitle, as the
  story's frontmatter says. The story's text through
  *More*; the notes are not rendered.
  **Layout (Michael, 16 Sep; amends the Pictures-in-a-story ruling for this page):** the left
  column scrolls with the story, and each block is placed level with the paragraph that names
  it, pushed down only if the block above would overlap: **Experiment 1** (*tap on 3*,
  *preview*) beside "There's an experiment on the left"; **Experiment 2** (two columns: *the
  graphs* · *stop*, *tap on 2* to *tap on 7*, the flash knob under its graph) beside "This is
  a different version"; **Experiment 3** (*two colours*) beside "Tap two colours"; **Experiment
  4** (*a red one*, *a triangle*) beside "Tap a red one"; the brain beside "Tap the brain on
  the left". (The repeat of Experiment 2's graph beside the last Jevons paragraph was removed
  16 Sep with that paragraph's new ending.) Every experiment is available from the start; one runs at a time, and starting
  one stops another. Blocks are built by the script; placement reruns on resize, font load
  and any block's change of size (ResizeObserver). At 800 css px or less each block moves into
  the story just before its paragraph. Experiment 1 keeps its own record: its *tap on 3* runs
  never appear on Experiment 2's chart. The text names Experiments 2 to 4 where it sends her to
  them (16 Sep, Michael's yes).
  **Each round** (the Flash bench, inline; the story's notes are its spec): *Ready* at the
  field's left edge, halfway down, the moment she presses the word → 1 s → the dots, about
  200 ms, *Ready* going with them → 2 s blank → **the reveal**, the same dots on a canvas over
  the field for 600 ms → a 400 ms fade, the end of the round (17 Sep: the lead-in went and the
  reveal came down to a second, because a run felt too long). A press anywhere but on a word counts (Space or Enter too), one a round,
  from the dots until the reveal. Dots Payne's grey (#536878), all one size (r 14 counting, 8.5
  in Experiment 4, squares and triangles of equal area), never over *Ready*, never
  overlapping. *Preview*: three rounds, nothing recorded. *Stop* shows only on the running
  experiment and, since 17 Sep, **counts as finishing**: the rounds already seen are recorded,
  so a run stopped in its first round still has graphs. Rounds: 12 (4 targets) in Experiments 1–3, 12 in Experiment 4, whose set sizes are 4, 10 and
  20 since 17 Sep, drawn at radius 11;
  every *tap on n* uses groups of 2 to 7. Graphs only when asked: taps by n (or set size)
  against the chances there were, and seconds after the dots with each tap a dot and the
  median a line, with the story's captions; for Experiment 2 one chart above the number she
  looked for — copper for a tap when it was that number, a circle beneath for a tap when it
  wasn't, height the time, misses not shown (latest run per number). **The brain** (rebuilt 17 Sep): the
  outside painting (inline, 354 KB of the file) and five words — *The regions* (IPS, the colour
  patch and V1 lit together, as before), *Recognising 3*, *Counting*, *Noticing red*,
  *Recognising shapes* — each a signal travelling roads drawn as splines, a comet along each leg
  at a twelfth of life's speed, a line of words as each leg lands, and *Again*. The engine, the
  region coordinates and the *Recognising 3* pathway are About Your Brain's; the other three
  pathways are written for this story and their times are set out in the story's notes for
  Michael to check. Beside the Jevons paragraph, the engraving `../art/jevons-1877.jpg`.
  **Words** are bold and capitalised, and headings in the story are bold and half a line closer
  to their text (17 Sep); each experiment carries a 0.5 px border. **Graph labels** follow one
  convention: the vertical label rotated beside its axis and centred (*taps*, *time in
  seconds*), the horizontal label centred under it (*number of dots*, *number of shapes*,
  *number you looked for*), and the legend only on the upper graph of a pair. **Nothing is stored.** Remember
  obeys the Maya flag and, since the text never refers to it, stays invisible while `maya` is
  false. **No References section**: the story has none yet. Reads `../js/cw-flags.js` and
  `../art/three-dots-icon-256.png`. `CW_VERSION 2026-09-17 bf0397a`.
  Tested in Chrome (desktop app pane): round timing measured (Ready → dots 1.009 s, dots
  0.20 s, reveal 2.01 s later, fade 2.01 s after that, 0.61 s fade); preview and stop; full
  runs of *tap on 3* and *tap on 4*; every block level with its paragraph at 1280 wide, none
  overlapping; Experiment 2 run before Experiment 1; the by-number chart, the knob, the
  closing graph; all six blocks inside the story at 700 wide with no sideways scroll. **Not
  tested on an iPad, or in Safari by this session.**

### experiments/
- **`index-old.html`** — the home page as it stood from 13 to 20 Sep 2026 (two labs as
  words, three round icons, Experiments as a line), retired when the gallery took
  `index.html`. Recovered from git with its links rebased one folder up, given a tab icon
  and a fresh stamp, its footer saying what it is and linking to the gallery. Listed on the
  experiments index. No redirect: its old URL is the gallery's.
- **`gallery/`** — the three home-page mocks from the 15–20 Sep chat sessions:
  `home-mock-salon.html` (19–20 Sep, the salon hang Michael approved and the gallery was
  built from; sixteen paintings from `art/` with placeholder titles), `home-mock-gallery.html`
  and `home-mock-scatter.html` (15 Sep, the two hangs it was chosen over; given viewport,
  icon and a `2026-09-15 mock` stamp on 20 Sep so the check passes). Linked from the
  experiments index's Old Home Page entry.
- **`hokusai-the-great-wave.html`** — story: **Hokusai: The Great Wave** (19–20 Sep 2026;
  `CWVault/claude/Story-Hokusai-The-Great-Wave.md`), the first of the paintings series.
  `placement: across` **with a left margin** (the 20 Sep ruling): reading column 700 px, a
  300 px margin to its left with a 28 px gap, 1028 px shell, and everything wider than the
  column centred on that shell rather than on the column — which is the one sum to get right,
  because a breakout centred on the reading column hangs off the right of the screen.
  Below 1068 px the margin collapses and its pictures drop into the flow. Three things in it.
  **One timeline**, static, at the head of the page: 1815 to 1855, nine events and the print's
  own marker in copper at 1830 (the long 12 000-year line was built on 19 Sep and cut on 20 Sep
  on Michael's word — it distracted from the story). Labels hang below the rail on thin leaders
  and pack into as many rows as they need, lowest row that does not touch a neighbour, each row
  as tall as its tallest label, so the arrangement survives any event list. **Three maps**
  through `maps/map.js`: `japan` and `western-europe` in the margin, `world` full-shell after
  *More*; Nagasaki and Berlin drawn `lit`, the new copper facet. **The print**, with a
  magnifier and a zoom. Tap it anywhere and a 148 px circle sits there showing the print at
  four times the size, with a crosshair; drag the circle, or tap elsewhere to move it; *Put the
  magnifier away* removes it. Pinch (two pointers, or ctrl-wheel and `gesturechange` on a Mac
  trackpad) zooms the print in place to 6×; once zoomed, one finger pans and `touch-action`
  goes to `none`, with *The whole print* to get out. **The magnifier is the colour sampler**:
  before *Sample a colour* it only magnifies, and after it the print moves down the page, widens
  to the shell, and the same circle also reports the colour under its crosshair — a 5 × 5 pixel
  average, its hex and `rgb()`, and the nearest of nine pigment anchors with a sentence of
  chemistry. The anchors are measured off this scan, not taken from a swatch book, because the
  sheet has faded; match is nearest neighbour in CIE Lab, and where two anchors of **different
  materials** fall within ΔE 4.5 the tool names both and says the colour alone cannot separate
  them — which is what happens across most of the sky. Two things worth keeping: the print must
  carry `draggable="false"` and `-webkit-user-drag: none`, because a native image drag fires
  `pointercancel` and kills a pan one move in (found on the bench, 20 Sep); and the ctrl-wheel
  delta is clamped to ±40 so one flick of a trackpad does not jump straight to 6×. Reads
  `../art/hokusai-great-wave.jpg`, `../art/hokusai-icon-256.png` and `../art/maps/`. The sampler
  needs the image same-origin, so the page must be served, not opened from disk. No Remember:
  Maya is absent and the practice queue does not exist. Checked at 1440, 1100, 834 and 390 px —
  no horizontal scroll, no console errors. **`maps/map.js` must move to `js/` before this page
  is hung in `active/`**, which is the call Spec-Maps reserved for Michael; the relative path
  breaks on the move. **Not yet read on an iPad.**
- **`bead-string.html`** — bench: **Pull a Bead** (18 Sep 2026), the first bench of the
  Bead Lab (`CWVault/claude/Bead-Lab-Ideas.md`). One file, no dependencies. A string of
  beads pinned at both ends; each bead is joined to its two neighbours by a spring and
  follows one rule. Drag, release, pin by tapping. Controls: tension (×¼ to ×4, an octave
  each way), friction, bead count (3 to 40 — length and total weight stay fixed, so more
  beads means a truer string, not a lower note), slow motion, the pulls as arrows, a trace
  of the released bead, gravity (a hanging chain). **Listen** runs the same model in the
  audio thread, 158 to 1 261 times faster, and sends one bead's motion to the speaker;
  Pitch snaps to 110/220/440/880 Hz; friction is the only thing that fades the sound.
  Step count in the audio loop is chosen from the stiffness so the worst case (40 beads,
  ×4, 880 Hz) stays stable. Pitch checked against the beaded-string formula in a script
  (110 Hz at 12 beads; 220 at 40 beads ×4). Origin: a projected piece in the Denver Art
  Museum children's area; footage and a timestamped catalogue in `_CW/Beads Analysis/`
  (outside the deploy). Tab icon `art/beads-icon-256.png`. Not yet heard on an iPad.
- **`maps/`** — bench: **Maps** (18 Sep 2026; `CWVault/claude/Spec-Maps.md`, the bench of
  its build prompt). A map is a still picture of the ground with the story's marks on it,
  and nothing else. Three files. **`render.py`** makes one base picture into `art/maps/`
  (see the entry there): equirectangular with the standard parallel at the region's
  mid-latitude, three colour families as named constants at the top, none red and none
  green, warm at the bottom and cool at the top (the second pass of 18 Sep; the first was
  Hokusai's ramp, which painted Greenland the colour of desert and hid the vermilion in the
  mountains) — **land** `#e6dfcb` at the shore (one step under the page's `#f4f1e8`),
  `#d8cdaa` at 250 m, `#c3ab80` at 800, `#a89a80` at 1 600, `#8f8d90` at 2 400, `#aeb0b8`
  at 3 200, `#e8ecee` at 4 800, `#f2f5f6` at 6 000 (the spec's 4 200 and 5 400 lifted by
  600 m, because at 4 200 the whole Tibetan plateau came out white and read as an ice
  sheet); **ice**, by surface height, `#dfe7ec` at 0, `#eaf1f4` at 1 200, `#f6fafb` at
  3 000; **sea**, Hokusai with the floor lifted and, since the third pass (20 Sep), stopping short
  of paper: `#22415f` at −9 000, `#33699a` at −4 000, `#5793b4` at −800, `#7fb0cc` at −150,
  `#93bed7` at the shore; hillshade from 315° at 45°, multiplied at
  `HILLSHADE_STRENGTH = 0.35` over land and ice and half that over water, flat ground left
  exactly its colour, heights times the region's `--exaggeration` before the slope (3 for
  `world`, 1 otherwise; recorded in the JSON). Contours at `--levels` (0 and −200 by default)
  traced with contourpy, simplified, and written into the JSON — see `art/maps/`. The
  longitude/latitude-to-pixel conversion is one named pair, `to_pixel` and `to_lonlat`, the
  seam a map lab with a globe would replace; `map.js` carries the same pair as
  `cwMap.toPixel` and `cwMap.toLonLat`. Needs numpy, scipy, h5py, Pillow and contourpy;
  reads the netCDF through h5py so the whole grid never sits in memory. **`map.js`** — `cwMap(container, region, marks)` puts
  the WebP in the box and an SVG over it; the SVG's viewBox is kept equal to the box's
  rendered size (a ResizeObserver redraws), so everything drawn is in screen pixels
  whatever the picture's width. **The lines** (third pass, 20 Sep): the region's contours
  are drawn on every map, under the marks and over the picture, the coast `#4a4336` at
  55 % and the shelf edge `#2f5c78` at 30 %, one pixel with `vector-effect:
  non-scaling-stroke`, so a window map at 380 px has the same crisp coast as the flow map
  at 700. Not an option; the earth's, not the story's. **The labels** (same pass): ink
  `#2a241c` everywhere; under every label a translucent halo, `#f4f1ea` at 70 %, three
  pixels, round join — built as a separate layer of stroked text under all the glyphs, not
  an opaque stroke, so one label's halo never fogs its neighbour and it reads as air, not a
  slab. 15 px for a place the story names (4 px vermilion dot), 13 px for a lesser one
  (`minor: true`; 3 px `#8a8378` dot), 15 px italic for water (a `note` with `water: true`);
  `lit` keeps the copper dot. **Placement:** each label tries eight positions round its dot
  (a note nine, centre first), throws out any that overlap a placed label or the map's edge,
  and of the rest takes the calmest ground — the standard deviation of the picture's
  luminance under the box, read once from a 400 px canvas copy — with crowding by other dots
  and the preferred order as tie-breaks; a mark's own `side` wins whenever it fits (the
  story chose it), and a label that fits nowhere is dropped rather than overlapped (Lake
  Biwa beside Kyoto, in the session's test). Places the story names are placed before
  lesser ones. Four marks and no others:
  `place`, `path`, `region` (a wash at 18 %, `wash: 'grows'` green `#33663f` or `wash:
  'made'` violet `#5a4a8c`, no third; green if the mark does not say), `note`; a path is
  `#c84830`. A place
  with text toggles a paper-ground block on tap; with a story, navigates; with neither,
  nothing — no cursor change, no hover, no animation. `reset()` hides the blocks.
  `cwMapWindow(region, marks)` opens the same map at 380 px (the story stage width) in
  Glass Geometry's picker window copied line for line — invisible backdrop that closes it,
  the drag handle with *close* at its right, the 200 ms fade — except that the handle
  listens to pointer events so a finger can drag it too. `cwMap.load(url)` fetches a
  region's JSON and resolves the picture beside it. **`map-bench.html`** — the three cases:
  the world in the flow with Tambora, western Europe in the flow with London, Lake Geneva
  and the road between (by Dover and Strasbourg), and the name Tambora in a sentence
  opening the window. Tested in the built-in browser at 700 and 375 wide: text blocks
  toggle, the window drags and closes, no console errors. **Not tested on an iPad.**
  The third pass was looked at on all three regions at 700 px, in the window at 380, and on
  the Hokusai story's own Japan map: the coast is visible at both sizes; the shelf line on
  the world map reads as the drowned edge of each continent rather than a mess, though it
  is busiest round the Arctic shelves and the Sunda shelf, where it is also true; every
  label read over land and water; Japan's coast reads against its shelf.
  Decisions the spec left to the session, taken and named: a tap target of 14 px round
  each dot that has something to give (a 4 px dot is not a finger's target); a path's
  waypoint that is not a marked place is written as a `[lat, lon]` pair (the gazetteer
  belongs to the story build); the caption line under a flow map is the page's prose,
  not `map.js`'s; `map.js` stays beside the bench until a story calls it, when whether it
  moves to `js/` is Michael's call. Consequences of the source, not fixed: lakes are land
  (the grid carries their surface height, so Lake Geneva is a dot on paper, not water —
  Natural Earth would draw it, per the spec's *if we ever want them*); the Ross and Ronne
  shelves are white over water, which is what they are; Greenland's coast is speckled
  where 20 km pixels average ice-free fjord mountains with the sheet; the Tibetan plateau
  is pale grey-white at 4 500 m even with the white stops lifted, because it is as high as
  an Alpine summit and the ramp says so.
- **`trace.html`** — bench: **Trace.** A road on parchment, a copper dot that follows her
  hand through a transform, a rule for what counts as a mistake, and a counter that says
  nothing until asked (`CWVault/20-SPECS/Spec-Trace-Bench.md`; v0 of it, 11 Sep 2026).
  One file, two doors. **Lab door** (`trace.html`): words in the left panel by the
  Marauder's Map rule — road (square · Z · O · H · star), rule (channel · path), mirror
  (off · left-right · up-down · both), trails on/off, clear (only while there are trails),
  graph (only once there is an attempt), again (only from the graph). **Story door**
  (`trace.html?door=story`, or a page holding the file in a frame and calling
  `frame.contentWindow.CW.trace.open({road, rule, mirror, attempts, words, line,
  onattempt, onreveal})`): no panel, the set counted as "trip 3 of 10", graphs hidden
  until the set is done, then only the words the story exposes; the page posts its height
  to the parent so the frame fits. An HTML file can be included by another page no other
  way; the alternative — the engine as `js/cw-trace.js` — is Michael's call and is not
  taken. Roads are data in a unit square mapped onto the prototype's 316 px star, on a
  380 css px stage kept exactly so the prototype's finger evidence carries. An outline
  road's channel is the band between two inward-offset outlines (Milner's star; the
  square); a path road's is a band about its strokes (Z, O, H). Closed roads finish when
  80% of the length is travelled and the dot is back at the start (the prototype's rule);
  open roads (Z, H) when every sample of the road has been passed within a track width —
  a rule the spec does not give and this build chose. One collision per excursion. Trails
  in Chartres glass colours, one per attempt. Three graphs — bumps, seconds, length in
  roads — blue line, copper points, a copper series for attempts under a different
  transform, a hollow point at 0 for the last attempt of another day. Record
  `cw.trace.v1.<road>` in localStorage, `{date, attempts:[{collisions, ms, length,
  mirror, rule}]}`; the prototype's `cw.mirror-star.v1` is translated once if found.
  Calibration numbers, and what has and has not been tested, are in the header comment:
  **not yet run with a finger on an iPad** (the building session had no device); every
  road, mirror and rule verified by synthetic pointer drives in Chrome, including the
  reveal, the copper series and the hollow point. Track width unchanged at 6%.
  Standalone; does not stand on the plane. `CW_VERSION 2026-09-11 51d9bb0` (first
  commit 11 Sep; stamped per the standing method).
- **`story-learned-without-knowing.html`** — story: **The Man Who Learned Without
  Knowing**, the story-door route (text: `CWVault/claude/Story-The-Man-Who-Learned-Without-Knowing.md`).
  **Superseded on the home page 14 Sep** by `active/the-man-who-learned-without-knowing.html`,
  which carries its own star and brain; kept here, noted on the experiments index. Was
  the first story page in the deploy and the first caller of Trace's story door: the star in
  a frame in the left panel, ten trips, then *again* / *without the mirror* / *show the
  star*, and the word *Brain* arriving only after the reveal. Ported 11 Sep from the star
  prototype, which is retired to `../outdated-files/trace-prototype-star-story-20260911.html`
  (built 11 Sep by a chat session; never committed, never served). The Brain block is the
  prototype's inline drawing — the outside painting as base64, most of the file's 369 KB —
  until the Brain bench (`Spec-Brain-Bench.md`) replaces it with `CW.brain` calls.
  Narrative unchanged. `CW_VERSION 2026-09-11 51d9bb0`.
- **`timeline-bench.html`** — bench: **the Timeline Intro.** Every dated story's title
  card: a copper dot leaves year 0 ("after the ice", 10 000 BCE) and rolls up to the
  story's year in about ten seconds, leaving events behind it. Three tiers — a fixed
  full-span line that never rescales, with an odometer above it; a road drawn in
  perspective in four passes whose year-scales are computed from the destination
  (8:4:2:1) and which take as many events as they have room for; and the story's own
  lead-up strip, drawn after the landing. Tap the road to pause, tap any event for its
  paragraph (beside the far passes on a wide screen), *run it again* for a fresh draw,
  *your line so far* for everything it has ever shown her (localStorage). Five
  destinations. **Reads `../stories/events.json` — the page holds no events**; the pool
  and the story graph are to be one database. Dates written `11 752 after the ice (1752)`
  with commas for now — the March date convention and `Spec-Timeline-Graph.md` §2 disagree
  and the spec reports it; adopt `js/cw-number.js` before this leaves experiments.
  `CW_VERSION 2026-09-08 433c148` (first commit 8 Sep; stamped per the standing method). Spec:
  `CWVault/20-SPECS/Spec-Timeline-Intro.md`. Stands on nothing shared; standalone.
- **`ruling-bench.html`** — bench: **does multiplication care how the grid is
  ruled?** The second of the review's step-3 benches, companion to
  `multiply-bench.html`, which stays the authority for everything the two share.
  A rectangle on the shared plane and, under it, a ruling she **steps**: each
  axis shows one word with a step to either side — ‹ Thirds › — walking Units,
  Halves, Thirds, Fourths, Fifths and on without end, the words becoming 11ths,
  12ths past Tenths. **Nothing is special about ten**, which was the last place
  base ten was privileged here. **Split** unlinks the axes; the finer step
  stands down at the pixel floor, which moves with the zoom, so the answer is
  always *zoom in and there is more*.
  **The rectangle is a true size, not a count of pieces** — two exact rationals
  that do not change when the ruling does. That separation is the whole design:
  the ruling is a lens laid over a thing rather than the terms the thing is made
  of, which is what lets a ruling fail to measure it. **Any ruling is settable
  and the fit is something she sees**: when the ruling does not measure a side,
  the pieces at the far edge are **cut short — real glass cut at the boundary,
  filled and leaded, never a thin line** — and the count along that side does not
  come out whole. Nothing is disabled, nothing announced.
  **The readout is one line, on release:** `10/3 × 6/4 = 60/12` — **x before y**,
  matching the pane address (column, row); the sides as their rulings counted
  them, unreduced. It is absent while a finger is down and
  absent while the ruling cannot count both sides — there is no whole-number
  multiplication to state and a rounded one would break *never more precision
  than the act showed*.
  **The restack is division as regrouping, and it happens IN PLACE.** The wholes
  are already standing in the rectangle, so it finds them rather than rebuilding
  them: the ⌊w⌋ × ⌊h⌋ unit squares grid-aligned from the origin outline where
  they are, one seam a beat, **nothing moving**. Only then do the leftovers
  travel — the top strip, the right strip and the corner gather and pack into
  new squares laid along the top edge for ↑ and the right edge for →, each
  closing as its pieces complete it, plus a partial whose seam stays so its
  missing pieces are plainly absent. `10/3 × 6/4`: three wholes stand in the
  bottom row, 18 + 4 + 2 leftover pieces close two more along the top, and the
  line reads `60/12 = 5`. Only when the regrouping finishes does the second line
  appear, and it performs no arithmetic — the count is exact by construction,
  since ⌊w⌋⌊h⌋ + ⌊leftover/Q⌋ is ⌊area⌋ for every rectangle. **Both directions
  land on the same answer**, which is the point of there being two.
  **The camera** follows only when the composition outgrows the view — a picture
  already in front of her is left where she put it — marks the answer above the
  composition, holds it long enough to read, and then goes Home. The mark is
  **sized against the unit square, not the composition** — a mixed answer comes
  out almost exactly one unit wide at any zoom, in the plain face rather than
  bold; a short answer caps instead, since stretching a lone digit to a full unit
  would want a 180px face. No restack
  finishes off screen. Her hand outranks it: a touch stops the follow. The arrows stand down when the ruling does not fit
  (a cut piece cannot become part of a whole square) and past 600 pieces
  (the animation is the counting, and nobody counts six hundred of anything).
  Dragging from the 1 at any time starts over.
  Numbers throughout are `CW.num`'s. Its six bench questions are at the top of
  the source, along with the three readings the prompt left to the build.
  Stands on `js/plane.js` and `js/cw-number.js`; shares no other code with the
  Multiply bench, and the header names what to extract when a third bench wants
  it.
- **`multiply-bench.html`** — bench: Multiply, alone, on the plane. Step 3 of
  `CWVault/01-ACTIVE/Review-Glass-Aug26.md`'s order of work — one file per tool,
  standing on `js/plane.js` and nothing else, with **no table code**: no panes
  keyed by number, no modes, no Build, no Properties, no Fill, no prime colour,
  no sound, no log. The opening state is the plane as Geometry draws it plus one
  white unit tile at the origin, the 1, with its numeral. The grammar is the
  walk's (`01-ACTIVE/Walk-Glass-Aug26.md`, steps 1, 2 and 6): touch the 1 and
  drag to multiply, touch anywhere else to pan, pinch or wheel to zoom, and
  **tap a placed tile to see the rectangle that minted it** — the still half of
  *the mark is the memory*; the animated replay waits for the operation log.
  During the drag the 1's glass stretches — outline and transparent fill — with
  the twin riding across the diagonal at `TWIN_FAINT`, the live width and height
  centred on their own sides inside both rectangles so the twin reads the same
  two numbers exchanged, and no product anywhere. On release only the far-corner
  tile of each rectangle remains, with the product written on it at the moment
  of placing: one tile on the diagonal, two off it. Tiles persist; a place gets
  a tile once; **Undo steps and Clear sweeps**, and **Home** returns the view to
  the greeting; each word fades when it has nothing to do. **Hide duplicates
  keeps the lower tile** — width ≥ height, whichever rectangle her stroke drew —
  so what is left is one tile per unordered pair of sides, 55 of them in a
  10×10, and a stroke above the diagonal leaves its mark mirrored below it.
  Colour says one thing and it is **which side of the crease**: squares keep the
  unity white, everything else is grey on the declared base `#DCDCDC`.
  Resolution is zoom and there is **no grain control** —
  the finger snaps to whatever rung of plane.js's 1–5–10 ladder is on screen,
  and products are carried as exact integer-over-power-of-ten, so 1.3 × 2 reads
  2.6 and never 2.6000000000000005.
  **The four questions it was built to be looked at for are at the top of the
  source**, with the constant that moves each one named beside it. A fifth
  arrived unbidden on the first drive and is recorded, not patched: plane.js
  draws a lattice rung only above 40px spacing, so **tenths exist only above
  ~400px per unit**, and at that zoom a stroke from the origin reaches x ≈ 2 on
  an iPad. The walk's own illustration, 6.3 × 2, needs ~2 500px of run and is
  unreachable on any targeted screen — reach and refinement pull opposite ways,
  and the walk's step 3 already says it is *division*, not multiplication, that
  puts tiles between the lines.
  **Second pass, 1 Sep, from Michael's own bench pass** — six changes, three of
  them reversals, all recorded in the file's header and in that commit: hiding
  duplicates now keeps the lower tile rather than the one she drew; the tiles
  split into white on the crease and grey off it; the reserved tap gained its
  still body; and Home, Clear and newest-numeral-under-oldest arrived. Two
  things the pass did not foresee are left standing rather than patched: with
  duplicates hidden, tapping a mirrored mark shows a rectangle she never drew
  (changes 1 and 6 meeting), and Clear takes the undo ledger with it, so it is
  the one act here with no way back.
  **Third pass, 1 Sep** — Michael found a coarse-grain tile swallowing the taps
  of the fine tiles inside it, and only their numerals showing through, not
  their outlines. Both were the same cause: paint order and hit test were keyed
  to *when* a tile was made, when what she can see and aim at is decided by
  *how big it is*. **One comparator now drives both — largest first, and among
  equals newest first, so the smallest and the oldest finish on top** — which
  keeps his newest-under-oldest rule where it applies (equal-size numerals
  crowding at zoom-out) and extends it to nesting. Glass and came travel
  together, so a buried tile keeps its cell and not only its name. Two more from
  the same pass: **a tap inside the 1 now reaches the tiles she has built there**
  at a finer grain — the multiply gesture claims that whole square, so a
  zero-length drag on it falls through to the tap, while the 1 itself still
  answers nothing — and **the two side numerals moved to the top and right
  sides, bold, at the size the product will be written at on the corner cell**,
  because on the bottom and left they sat against the plane's own axis labels
  and were read as those. Standalone otherwise; deliberately not deployed into
  `active/` and not linked from the main index.

- **`number-theory-v1.html`** — multiplication and division as rectangles on a
  pannable number plane. **The behavioural reference for the extracted plane** — y-up,
  `viewW/viewH` caching, and a single `labelStep()` driving both labels and grid lines,
  which is why its texture stays coherent under zoom.
- **`canvas-panes.html`** — bench: can canvas carry leaded panes of layered glass while
  panning and zooming? Pane counts 10/16/24/32, glass detail full / flat / came-only,
  auto-stress. **Passed** — 32×32 is 1024 panes and 3840 pieces at 2.4 ms p95, 14% of
  the frame budget. It reports *draw time against the budget*, not frame rate: frame
  rate is vsync-clamped and reads 60fps until it reads 30, so it cannot fail and is
  useless as a gate. Any future performance bench should measure the same way.
- **`fills-and-light.html`** — bench: two declared palettes, a resting one and a lit one,
  rather than one degraded. Both derived from the workshop's declared colour in OKLCH so
  hue never moves, with out-of-gamut results flagged rather than silently clipped. All
  fifteen palettes from `../art/palettes.json` are imported, plus the colours the lab
  ships today. Showing a set — or selecting a pane — moves those panes to the lit palette;
  nothing is dimmed. Glass is flat with directional striations and seeds; inner cames and
  the pane frame carry separate colour and weight; highlights are elliptical, brighter
  when smaller, and only some pieces catch them. Results in
  `CWVault/01-ACTIVE/Decisions-Fills-Aug06.md`.
- **`prime-glass.html`** — bench: prime colours across four workshops with ordered
  stripes and a monochrome toggle. With colour off and order the only channel, 6, 10 and
  14 render identical — so colour currently carries information rather than delight, and
  a second channel is required. Two candidates are in the bench. In progress.
- **`map-reveal.html`** — bench: the map reveal. The grid of the visible window
  constructed by compass and straightedge — full circles only, the lab's own
  vocabulary — with knobs for duration, legible opening and acceleration, tap-skip,
  and a deep-zoom mode where the tenths construct themselves. Settles the reveal's
  tempo by looking (`CWVault/01-ACTIVE/Decisions-Controls-Aug12.md` §8, §11, §15:
  content is never compressed, only time). Standalone; does not stand on the plane.
- **`fog-map.html`** — sketch: every pane shaded by the rank of its largest prime
  factor, white at 2, saturating at the 256th, panning to a million. A *magnitude*
  viewing rather than a factor-reading one — it asks how big, not which. Standalone: it
  does not stand on the plane and is not the port. Listed in `experiments/index.html`.
  Seed: `CWVault/03-SEEDS/smoothness-fog.md`; ruling it provoked:
  `CWVault/01-ACTIVE/Decisions-Fog-Aug12.md`.
- **`pi-beads.html`** — how many beads fit around a circle; circumference ÷
  diameter, with past measurements kept.
- **`prime-tones.html`** — listening bench for the primes 11 and 13: four candidate
  schemes played against the four the lab already has. Settled the octave question
  (`CWVault/01-ACTIVE/Decisions-GlassMult-Aug03.md`). Whether it belongs to the Sound
  Series or stays interface work is open.
- **`clinks-triangular.html`** — triangular numbers as people arriving, leaving,
  and clinking glasses.
- **`necker-brain-map.html`** — the path a Necker cube flip takes through the
  brain, drawn as a station map. Uses
  `../stories/necker-cube/brain-watercolor.jpeg`.
- **`sound-workbench.html`** — bench for auditioning gesture sounds, feedback
  sounds, pitch and ratios.
- **`cursor-modes.html`** — what the pointer becomes for each gesture.

#### experiments/sound-benches/

The Sound Series, kept together since 31 Aug: three benches on one idea — that a note
is a fast rhythm — sharing a vocabulary, each correcting the one before it. Listed from
`experiments/sound-benches/index.html`, which the main experiments index links as a
single entry. **A bench belongs here** if it stands on that idea and shares the
vocabulary; anything else stays a level up. The three moved with `git mv` from
`experiments/`, where they had been live, so `_redirects` keeps the old URLs working.

- **`strobe-and-stars.html`** — bench: a loudspeaker edge-on under a strobe. The cone is one
  bar between `{` and `}`; the strobe runs at the bottom note, so that note freezes and is the
  reference. A voice at `n/d` visits exactly **d** phases and the flashes joined in order draw
  a polygon or star polygon `{d/(n mod d)}` — 7:5 is a pentagram, 45:32 is a mess.
  **Above each window is the circle the bar is the shadow of**, with drop lines: circular motion
  projected, which is a sine wave's content with no sine wave drawn. The shadow loses phases
  that `sin` maps together, so captions read "4 places · 3 shadows" — the even-denominator
  collapse is labelled rather than hidden. A tuning switch (true fraction ↔ equal temperament)
  **fills the gap that has been open since 25 Aug**: on a true ratio every figure closes and
  freezes; on the keyboard's version nothing closes and the figure creeps at `|q·f − p·S|`
  per second, which is the beat rate — 0.68/s for a tempered fifth at 200 Hz, matching the
  audible throb to two decimals. Additive tones (5 harmonics per voice) so the beat is audible
  while the drift is visible. Two or three voices; the triad shows the collapse plainly.
  **Carries its own warning in the reading**: this is a picture of the arithmetic, not of the
  sound — 7:5 and 45:32 look nothing alike and are indistinguishable by ear. Standalone.
  Design: `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`.
- **`scale-from-a-rhythm.html`** — bench: a whole major scale as one rhythm. Eight click
  voices at **24 : 27 : 30 : 32 : 36 : 40 : 45 : 48** — the just major scale over a common
  denominator — with a speed knob, per-voice toggles, the brightness and click-pitch controls
  shared with `six-against-five.html`, and a walk mode stepping one voice at a time so the
  scale sounds as a scale. Presets isolate the three 4:5:6 triads (24·30·36, 32·40·48,
  27·36·45), which between them use all eight numbers and nothing else: **the scale is one
  chord planted three times.** A sieve strip of 24–48 marks which numbers are built from only
  2s, 3s and 5s; nine survive, and dropping 25 (under a semitone from 24, crowding it) leaves
  the scale exactly — **a sieve, not a list.** Two findings that were not designed in: the
  **floor readout** (gcd of the active voices × the unit) is a real note under any one triad
  and falls to ~8 per second under all eight, which is *a chord has a floor and a scale does
  not*; and with the bottom voice tapped onto a real key, the three scale notes containing a 5
  (5/4, 5/3, 15/8) are exactly the three that miss the keyboard by more than 10 cents while
  the 3-limit ones land within 2 — at the 15-cent lighting tolerance five keys light and three
  do not, so the argument draws itself. Lane colours are the odd primes of each ratio; the
  piano strip is shared with the sound bench and is **designer-facing**, the letter names
  deliberate and not the child-facing scheme. Standalone; does not stand on the plane. Design:
  `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`.
- **`six-against-five.html`** — bench: does the ratio material survive being delivered as
  *counting* rather than as waves? Two click tracks at a fixed whole-number ratio, one speed
  knob from 1.5 to 330 per second. Below ~8 it is a countable rhythm, above ~20 a pitch, and
  the two numbers are the same the whole way; the track is ticked at both boundaries because
  the flutter between them is the finding. **Both voices lay down one identical click** and
  differ only in rate, so the tone at the top was never introduced — it assembles itself out
  of repetition. Seven ratios, 2:1 through 45:32. Three knobs: speed, **brightness** (a
  lowpass — now understood as the *roughness* control rather than a comfort control), and
  **click pitch** 400–4200 Hz, which was a buried constant at 1850 and is now choosable.
  A **piano strip** under the dot rows carries a continuous marker at each voice's exact
  pitch, lights the nearest key only within 15 cents, and reads both notes with cents
  deviation; tapping a key sets the slower voice and the faster follows by ratio. It is
  **designer-facing** — the letter names are deliberate and are not the child-facing scheme.
  Audio is a looping buffer rebuilt one full pattern long on every change, so nothing is
  resampled and no scheduler runs. **Carries its own reading below the bench** — the first
  extended sample of the child voice for this material, which is why this is one page and
  not two. Two short pieces sit directly under the instrument (*what note is that*, *what
  the picture is showing*); the long reading follows. Standalone; does not stand on the
  plane.
  **Revised the same day after a listening pass** (25 Aug) which disproved three claims the
  page had made with confidence: 7:5 and 45:32 are one sound about 8 cents apart, so simple
  fractions are *where* the sweet intervals are and not *why*; consonance is not the pair
  fusing into one note; and roughness lives in the partials, which is what brightness moves.
  A ringing at high brightness was a real defect — the click was truncated at the loop seam —
  and clicks now wrap around the buffer end. The reading was rewritten to match. Design:
  `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`, `…/Sound-Rhythm-Roll-Aug21.md`,
  `…/Sound-Series-Aug08.md`.
  Open: no tapping, and whether 3:2 stays clean at full brightness on the fixed build.

## When a page is superseded

Move the old file to `../outdated-files/` and **keep its dated or versioned
filename** — that name is the archive record of when it was current. The
replacement takes the plain name in `active/`.

So `geometry-v1-20260325.html` stays `geometry-v1-20260325.html` in the archive,
while the version that replaced it lives as `active/glass-geometry.html`.

`../prototypes/` is staging — work that has not yet earned a URL. A prototype
becomes an experiment by moving into `experiments/` with a descriptive name.

Staged there now (9 Aug 2026): the Sound Series' two Jankó instruments,
`janko-lattice.html` (touch — twelve notes on two tiers, all one colour, home
chosen and marked) and `janko-midi.html` (the same lattice lit by Web MIDI,
Chrome only). Built 8 Aug, deliberately **not publicly reachable** until the
Series decides its opening; both are self-contained. Design and reasoning:
`CWVault/01-ACTIVE/Sound-Series-Aug08.md`.

`star-in-a-mirror.html` (moved here 15 Sep 2026, from `experiments/`, where it sat
untracked) — **Star in a Mirror**, the practice version of the story's puzzle: the star at
480 px, mirror left-right or up-down as words, a *turn* slider, trips and the two graphs.
Waiting for a practice area; the story's inscription already queues `mirror-star` for
one. Not served. Carries doctype, charset and viewport; no stamp and no icon yet — the
check will say so when it moves into `cw-deploys/`.

`brain/` (moved here 13 Sep 2026, from `experiments/brain/`) — About Your Brain's
workbench: `brain-outside.jpg` and `brain-inside.png` (Michael's two watercolours),
`brain-views.svg` (the overlay the atlas embeds), `check-outside.png` /
`check-inside.png` (the render checks), and `make_overlay.py` (edit the REGIONS tables
and re-run to move a region). Source material for a shipping app, so it lives outside
the publish directory; the icon it produced is `cw-deploys/art/brain-icon-256.png`.

`glass-panel-build-aug24.html` (frozen 1 Sep 2026) — the 24 Aug panel build of
Glass Multiplication, `CW_VERSION 2026-08-24 e4cd030`, which sat uncommitted in
`active/` for a week and was never deployed. Frozen here rather than shipped:
`CWVault/01-ACTIVE/Review-Glass-Aug26.md` found it standing on two substrates at
once — the plane's tools (Multiply, Divide, Make a square, tiles from the origin)
on top of Phase 4's table rendering — and the 26 Aug ruling is **plane, table as a
viewing**, so the file as a whole does not port. What does port, and is the reason
to keep it: the **Building Numbers** rail on Geometry's *How this works* pattern,
the movable/resizable/closeable window component, the story windows with the
verbatim text of `01-ACTIVE/Stories-First-Set-Aug24.md`, the choice panel, and the
leftover grammar of Divide and Make a square. **It is not served** — `prototypes/`
sits outside `cw-deploys/`. Read it with `01-ACTIVE/Walk-Glass-Aug26.md` beside it,
which is what replaces it.
