---
status: Report — the sixth Earth bench (Prompt-Build-Earth-Bench-06.md, step 6 of Spec-Earth-3D's Getting there, with three fixes from step 5b); built 29 Oct 2026 on ee7fcfb; checked in the pane on the Mac; not committed
role: What was built (Iceland to the seam, the glide, today's names, the flat world in Equal Earth, tap to a place, the window's bars), how the flat world is drawn and what it costs, what was found, what was checked, and what needs Michael's eye
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-05b.md, Prompt-Build-Earth-Bench-06.md, cw-deploys/js/3d/earth.js, cw-deploys/js/3d/scene.js, cw-deploys/js/3d/still.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Bench-06-Oct29/ (the pictures)
updated: 2026-10-29
---

# Report: the Earth bench, step 6 (29 Oct 2026)

**The spec first.** `Spec-Earth-3D.md`, under *Open*, says "The flat world's projection. *Ruled 29 Oct (Michael): Equal
Earth*". Checked; nothing written in it.

Nothing a child sees changes. `globe.js`, `map.js`, the Time Machine and every story are untouched. `scene.js` and
`still.js` are shared with the Sun bench and the shelf bench: what I added to them does nothing unless a page asks for
it, and both benches open with no console messages. The Sun bench's kept picture comes out as before.

The pictures are in `Earth-3D-Bench-06-Oct29/`: 27 small JPEGs, 1.6 MB.

## 1. Three fixes from step 5b

### Iceland and Hawaii stay to the seam

The ball of today's ground under the pieces is now whole from today to the seam, and fades out over the 0.3 million years
after it (`UNDER_PAST`, a smoothstep). It is painted like everything else: the photograph fades to paint by the seam, as
it does on the pieces.

- **At 2.5 million years** Iceland is whole, in paint (`iceland-2_5-2_7ma.jpg`, left).
- **At 2.7 million years** it is about three quarters there, paler, with a rim of bared shelf round it (the sea is 17 m
  lower there, 3 m at 2.5). It is gone by 2.9.

**Islands gone past the seam.** No piece holds these, so past the seam they're gone until plate boundaries. I found them
by drawing every living piece's outline, carried out by the bloat, over Blue Marble's land at 4,096 × 2,048, and keeping
the land that touches no piece. These are the ones of 150 km² and more:

- **The North Atlantic:** Iceland; Jan Mayen.
- **The Pacific:** Hawaii (the Big Island, Maui, Oʻahu, Kauaʻi and Molokaʻi); Samoa (Savaiʻi and ʻUpolu); Tahiti;
  Kiritimati.
- **Round New Guinea:** New Britain (37,000 km², the largest after Iceland); Woodlark; the D'Entrecasteaux Islands; Umboi.
- **Indonesia's edge:** the Talaud Islands.
- **The East Pacific:** the Galápagos (Isabela, Santa Cruz, Santiago, San Cristóbal); Coiba.
- **The Atlantic:** the Canaries west of Fuerteventura (Tenerife, Gran Canaria, La Palma, La Gomera); Madeira; the Azores
  (São Miguel, Terceira); Cape Verde (Santo Antão, São Nicolau, Sal, Boa Vista, Maio, Santiago, Fogo); Bioko and São
  Tomé; Barbados and Tobago.
- **The Indian Ocean:** Socotra; Grande Comore; Réunion and Mauritius; Kerguelen.
- **The far south:** South Georgia; the South Orkneys; Elephant Island; the Balleny Islands.
- **The Arctic:** Bennett Island in the De Long group.
- **Not islands:** Blue Marble's July sea ice north of the East Siberian and Chukchi Seas, which reads as land, goes too.

**Gaps between pieces.** The same ball fills the gaps between pieces on land, and they open past the seam too. The
largest:

- 183,000 km² in southern Nigeria and Cameroon;
- 72,000 at Panama, so the isthmus opens at the seam;
- several tens of thousands in Alaska, the Yukon and eastern Siberia.

They were open past the seam in step 5b as well; only the timing has moved.

### The pieces glide

Between the seam and 5 million years (`GLIDE_TO`), each piece eases from today's place to where the model puts it at that
age. The ease is a smoothstep: no jolt as it leaves today's place, none as it arrives at the model's. At 5 million years
and beyond, every piece is exactly where the model has it. The places ride with their pieces.

**The note.** While the glide is on, the honest block's first line adds, after "the continents where they were,
painted.":

> Here the continents are easing into the places the plate model gives them; the path between is drawn, not known.

It goes onto the kept picture with the rest of the block. Adjust the words as you like; they're one string,
`GLIDE_NOTE`, in the bench.

**The pictures, close in.**

San Francisco, 600 km across (`glide-sf.jpg`). San Francisco is this far from today's place:

| million years | 2.59 | 3 | 4 | 5 |
|---|---|---|---|---|
| distance | 0 | 14 km | 158 km | 316 km |

- **At 4 million years** the sliver west of the city is moving on its own plate, and a strait opens between it and the
  rest of the coast.
- **At 5** the coast is off the top right of the picture.

New Guinea, 1,800 km across (`glide-newguinea.jpg`):

- **At 2.59 million years** New Britain is there, and the bared shelf shows in buff.
- **At 3** New Britain is gone.
- **At 4 and 5** the north coast's pieces move north. The pieces' pale wash, which comes in past the seam on your
  earlier ruling, shows here as straight-sided pale polygons over the sea.

### Today's names

Places on the Earth now carry today's names. `places.json` and the stories are unchanged; the Earth's own list renames
them (`TODAY_NAMES` in `earth.js`).

**Changed:**

- **Edo → Tokyo.** It takes the stories' weight, 3. The Time Machine's Tokyo, 7 km away, is merged into it as before.
  `tokyo-today.jpg`.
- **Antioch → Antakya.** `antakya-today.jpg`.

**Left as they are:**

- **Arcetri, near Florence:** Arcetri is still its name.
- **Saint-Rémy and Auvers:** the short forms of today's Saint-Rémy-de-Provence and Auvers-sur-Oise. **Say if you want the
  long forms.**
- **Angkor Wat, Cahokia and Tambora:** a temple, a site and a volcano, with no other modern name.
- **Everything else** in places.json, and all twelve of the Time Machine's cities, already carry today's names.

## 2. Flat

The word *Map*, in the left column under the ground's pair, lays the same Earth out flat. It then reads *Globe*, and brings
the ball back: one word, as the Time Machine's is.

- **The projection.** Equal Earth (Šavrič, Patterson and Jenny, 2018), centred on the 0° meridian.
- **Whole and still.** The flat world is fitted to the window with at least 14 px of the page's parchment round it. It
  doesn't pan, turn or zoom: the fingers and the wheel move nothing while it is up.
- **The sliders.** Both sliders and *another guess* work on it as on the ball.
- **No animation** between the two.

### How I drew it

I drew it by **projecting the pieces**, not by laying the ball's picture out.

**The pieces.** Every piece's mesh is drawn again, in a scene of its own, through a flat (orthographic) camera. The copies
share the ball's geometry. A vertex shader turns each point by its plate, as the ball's own meshes do, and projects it.

**Every fragment reads at its own point.** Each fragment works out where it is on the world by inverting the projection
(Newton's method, four steps). Its plate carries that point back to where the ground lies today, and the picture, the
data, the sea test and the ice are all read there. So the flat world has the ball's look at every age:

- the same pieces and pictures;
- the same sea, ice and paint;
- the same grades, and the same soft edges for the guessed and invented ages.

The sea, today's ground under the pieces and the molten Earth fill the outline the same way.

**What differs from the ball.**

- **The sea's two blues.** They run from the middle of the outline to its edge, as on the ball they run from the centre
  to the limb.
- **No limb shading and no haze.** Those make a ball look round.
- **The limb line** runs round the outline, a CSS pixel wide.

**The 180° meridian.** Every triangle is unwrapped about its own centre's longitude, so it is never torn across the map.
A piece that can reach the 180° meridian is drawn a second time, a whole world to the side. Every fragment past the edge
is thrown away by the exact outline, so what crosses the edge is cut cleanly and appears on both sides.

- **Russia's far east, today:** Chukotka is cut along the curved edge, and its tip east of 180° appears on the left edge
  beside Alaska.
- **Fiji** is cut the same way.
- **Antarctica** runs along the south pole's edge.

`flat-edges-today.jpg`, from a 3,072 px picture.

**The poles** are the projection's own flat edges with rounded corners, not points.

- **Antarctica** lies along the bottom edge.
- **Greenland's ice and the Arctic islands** lie under the top edge.
- **At 540 million years,** pieces lie across the south pole's edge, and the edge holds (`flat-south-edge-540ma.jpg`).
- **Close in,** the band of a few degrees round each pole is a pixel or two tall on the flat world. Triangles that
  touch a pole are approximate there, but I could see no gap at 3,072 px.

**Places** are placed by the same placer and rules, with the halo, and *places* turns them off.

### At every age, beside the globe

`flat-globe-today.jpg`, `-21000y`, `-250ma`, `-540ma`, `-3000ma`, `-4300ma`, `-4509ma` each show the flat world on the
left and the globe at its home view on the right.

- **250 million years:** Pangaea is entire.
- **3,000 million:** the guessed cratons with their soft edges.
- **4,300 million:** the invented blobs.
- **4,509 million:** the molten Earth.

Both backends draw it:

- **WebGPU:** no console messages through every age, *another guess*, both grounds, and *Map* and *Globe* back and forth.
- **WebGL 2** (`?gl=1`): the same, at today and 250 million years (`webgl-flat-today-250ma.jpg`).

### A tap on the flat world

A tap goes back to the globe, centred on the place tapped, 3,000 km across the window's height (`FROM_FLAT_KM`).

- **A tap on a place's dot or name** centres on that place exactly.
- **Anywhere else,** it centres on the point tapped.
- **On the parchment,** nothing happens.

The flat world shows the age, so the globe is centred on where the place was then. Checked:

- a real click on the Sahel: the globe at 23° E, 15° N, 3,000 km across (`flat-tap-sahara-globe.jpg`);
- a tap on Melbourne's name: Melbourne at the centre (`flat-tap-melbourne-globe.jpg`);
- the same at 250 million years: the globe centred where Melbourne was then, 74.5° S (`flat-tap-melbourne-250ma-globe.jpg`).

**For you to judge.**

### What it costs a frame on the Mac

I timed it with the bench's own timer: off-screen frames, waiting for the card, at 1,516² device pixels, the full tier,
WebGPU. "Dragging" means the age moved a million years a frame through 200 million years, so every plate's turn is read
each frame.

The flat world and the globe were timed in turns in one tab, under the same load. Safari was running on the Mac again,
two WebKit processes at 15–18%.

| | dragging the age | still |
|---|---|---|
| the flat world | 10.7, 10.9, 11.0 ms | 7.9, 7.9, 8.1 ms |
| the globe | 11.3, 10.9, 11.2 ms | 8.2, 8.1, 7.9 ms |

The flat world costs what the globe does.

My first build drew the second copy of every piece and came out at 17 to 22 ms dragging. Now the second copy is drawn only
for a piece whose bounds, turned by its plate, can reach the 180° meridian. That is 327 meshes at 200 million years
instead of 626, and a picture three times the size showed no land lost (Chukotka's tip and Fiji included).

## 3. Tap to centre and zoom

On the globe, a tap on a place (its dot, within 10 px, or its name) glides it to the centre and zooms in a step.

- **The glide** takes 0.6 s (`TAP_GLIDE_S`).
- **The step** divides the height above the ground by 2.5 (`TAP_ZOOM_STEP`).
- **Reset view** brings it home.
- **A drag that starts on a place** turns the Earth: only a tap moves to it. Dragging from Nairobi turned it 4.4°, with no
  glide.

Checked: Nairobi from the home view ended exactly at the centre, the camera from 4.9 to 2.56
(`tap-city-before.jpg`, `tap-city-after.jpg`). Reset view returned to 20° E, 15° N at 4.9.

`scene.js` has two additions for this: `glideTo`, which eases the view as Reset view does (so the labels hold still while
it moves), and `onTap`.

## 4. A window she can crop

The window has bars on its right edge and along its bottom, as the map's and the Time Machine's are, in their tint and
with their grip line. She can drag it narrower, wider, shorter or taller, from 160 px up to the page's right edge and
twice the usual height.

**The Earth keeps the size it has at the usual window, and stays centred: the window crops it.** The camera takes a view
offset of the usual square picture, so the Earth doesn't grow or shrink with the window. The flat world is the exception:
it is whole by definition, so it is fitted to the window whatever its shape. A wide, short window gives a large flat
map, and the square window leaves parchment above and below it.

**Reset view** puts the window back to its usual size, as well as the view. I chose the word that was already there
rather than a new one.

**On a phone, no bars:** checked at 375 × 812, where the Earth runs at the floor tier and *Map* is there
(`phone-flat-today.jpg`).

**Kept pictures** take the window's shape, at full size:

| window | kept picture | files |
|---|---|---|
| tall, 420 × 900 | 1,911 × 4,764 | `kept-tall.jpg`, `kept-tall-flat.jpg` |
| wide, 1,040 × 428 | 4,096 × 2,067 | `kept-wide.jpg`, `kept-wide-flat.jpg` |

The JPEGs here are small copies. I measured the tall globe picture's limb: the ball is centred to the pixel.

**Two things the cropped window brought out, fixed in `still.js`:**

- **The smeared kept picture.** WebGPU hands back every row of a picture but the last padded to 256 bytes. A width that
  isn't a multiple of 64 (1,911) came out as a smear. The square stage and the Sun's 4,096-wide pictures never met this.
  The rows are now read by their true stride.
- **The credit ran off the edge of a narrow picture.** It is now wrapped like the other lines. One line keeps exactly the
  height it had, so the Sun's picture is unchanged.

**The same stride fixed in `earth.js`.** The placer's reading of the ground under the labels (a 400 px picture, so
padded) had had the same stride error since step 5. So it read the evenness of the wrong pixels, and the labels' choice
of side was slightly off. Fixed; names may now sit on different sides from step 5b's pictures.

## Found, not changed

- **Young pieces still dissolving at today.** A piece fades in over the 8 million years after its birth, as `globe.js` has
  it. Four pieces were born within that span, so at today they're still partly dissolved, and show close in as darker,
  straight-sided wedges of sea:
  - the Vitiaz Trench round Fiji, born 1 million years ago (`fiji-young-piece-today.jpg`);
  - Flores–Alor, at 5.3 million years;
  - the Banda Arc, at 5.9 million years;
  - Luzon, at 5 million years.

  It has been there since step 2, on the ball, and shows on the flat world too. **A fix:** this side of the seam, a piece
  alive today shows whole. **Your call.**
- **Mannheim and Como lie in no piece,** so they stay at today's place and float in open sea at 540 and 3,000 million
  years, on the ball and the flat world alike. This dates from 5b's one list.
- **The bench's own `cwPair`** (its 800 px pair pictures) has the same row-stride problem the kept picture had. It's bench
  only and I left it.

## Needs Michael's eye

1. **The flat world:**
   - the sea's two blues from the middle to the edge;
   - the limb line round it;
   - the place names over it;
   - how small it is in the square window.
2. **A tap on the flat world** landing on the globe, centred and 3,000 km across.
3. **The glide's note**, its words, and the glide itself in `glide-sf.jpg` and `glide-newguinea.jpg`.
4. **Iceland at 2.7 million years,** three quarters there and fading out by 2.9.
5. **The islands and the gaps that go past the seam,** above, until plate boundaries.
6. **Saint-Rémy and Auvers** in their short forms.
7. **The window's crop:** the Earth keeps its size and the window cuts it; the flat world is fitted.
8. **The young pieces' wedges** at today.
9. **The iPad:** not tried.

## Left open, as the prompt says

- **The animation** from the ball to the flat world.
- **Marks on the flat world** beyond places.
- **Sharper pictures for particular places** on the globe (your Egypt thought).
- **Plate boundaries.**
- **The probe.**

## Changed

- **`cw-deploys/js/3d/earth.js`:**
  - today's ground to the seam (`UNDER_PAST`);
  - the glide (`GLIDE_TO`, `glide()`);
  - `TODAY_NAMES`;
  - the flat world (`setFlat`, the Equal Earth functions, the `tricentre` attribute on every mesh — `ref` is a word WGSL
    reserves — and the flat copies and materials);
  - `tap`, `markAt`, `FROM_FLAT_KM`, `TAP_GLIDE_S`, `TAP_ZOOM_STEP`;
  - the scale taken from the usual window when cropped;
  - the placer's ground read by its row stride.
- **`cw-deploys/js/3d/scene.js`:** `onTap`, `glideTo`, `hold`, `drawWith` and `stage()`, `setFrame` and `refSize()`,
  `onReset`.
- **`cw-deploys/js/3d/still.js`:**
  - draws the scene in force;
  - keeps a cropped camera's offset;
  - reads padded rows by their stride;
  - wraps the credit.
- **`cw-deploys/experiments/earth-3d.html`:**
  - the word *Map* and *Globe*;
  - the bars;
  - `GLIDE_NOTE`;
  - the bench's helpers drawing the scene in force (`cwSetFlat`, `cwSetCrop` and `cwCrop` for checks);
  - the stamp `2026-10-29 ee7fcfb · earth-3d step 6`;
  - `scene.js?v=2026-10-29c`, `earth.js?v=2026-10-29g`, `still.js?v=2026-10-29f`.
- **`cw-deploys/experiments/index.html`:** the bench's item.
- **`cw-deploys/MANIFEST.md`:** a new entry.
- **`CWVault/00-BOARD.md`:** the delta.

`tools/check-deploys.sh`: no errors; its one warning is Glass Multiplication's missing tab icon, from before this step. Not committed: waiting for your word.
