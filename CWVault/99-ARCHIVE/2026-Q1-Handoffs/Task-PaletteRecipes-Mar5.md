# Task: Write Recipe Lines for palettes.json
**Created:** March 5, 2026
**For:** Any chat with access to the filesystem
**Estimated scope:** Medium — 16 palettes, ~8 colors each, plus 3 craft swatches

---

## What This Is

The palette tool in the Curious Woods geometry workspace shows a small recipe line at the bottom of each palette — a quiet material note describing what is in the currently selected color. For example: "cobalt aluminate" or "iron, sulfur?" The question mark is intentional and important (see below).

The goal is not chemistry education. It is to make chemistry **present**. A child choosing a color for a rose window sees "cobalt aluminate" without being asked to learn it. The scaffold is there anyway.

---

## The Task

Add two fields to every color entry in `palettes.json`:

```json
"recipe": "cobalt aluminate",
"uncertain": false
```

The display logic is simple: show the recipe text, append "?" if uncertain is true.

The file is at:
`/Users/michaelchabin/CuriousWoods/prototypes/art/palettes.json`

---

## Principles for Writing Recipes

**Be accurate but not pedantic.** Reasonable accuracy matters — these are seen by children and parents. Exact compound names matter less than honest elemental truth. "Iron, oxygen" is fine where "iron oxide" is uncertain.

**Be elemental where uncertain.** If you know the exact pigment compound, use it. If you're inferring from color, stay at the elemental level. "Copper, oxygen" rather than guessing between malachite, verdigris, or chrysocolla.

**The question mark is a feature, not a hedge.** Mark uncertain: true wherever you genuinely aren't sure. A child seeing "iron, sulfur?" learns that not everything is known — that scientists and conservators still argue about some of these. This is both honest and intriguing. Do not mark everything uncertain to be safe. Mark it uncertain when it actually is.

**Keep recipes short.** One to four words ideally. This is a quiet note, not a label. "cobalt aluminate" / "iron, oxygen" / "carbon black" / "lead, tin?"

**Ink-based works are different from oil paint.** Fan Kuan and Hiroshige use carbon-based inks and mineral pigments — different material story from European oil painting. Note this where relevant.

**Glass palettes have documented chemistry** — be specific and confident here. The Chartres, Gaudí, and Alhambra recipes are well-established in the literature.

---

## Three Craft Swatches

These are not in the JSON yet — they will be added as a special entry. Write recipes for:

- **Empty** — no glass. Recipe: "no glass" / uncertain: false
- **Clear** — forest glass, the pale blue-green of uncolored medieval glass. Color: `#c2d4bc`. The color comes from iron naturally present in sand — no additives, no intentional colorant. Recipe: "iron in sand, unrefined" / uncertain: false
- **Lead** — lead came, the metal strips between glass pieces. Recipe: "lead, antimony" / uncertain: false (lead came typically contains ~2% antimony for hardness)

These three sit in a dedicated bottom row of the palette, separated from the color swatches above by ~6-8px. They represent materials of the craft, not colors from a source.

---

## Palette-Specific Notes

**Chartres, Gaudí, Alhambra** — default glass palettes. Chemistry is documented. Be specific. Key glass colorants:
- Deep blue: cobalt oxide
- Ruby red: gold nanoparticles (colloidal gold — genuinely surprising, worth the exact term)
- Green: copper oxide or iron depending on firing atmosphere
- Purple/violet: manganese dioxide
- Yellow/amber: iron, sulfur (or silver stain in later periods)
- Colorless/white: no additives, or tin oxide for opacity

**Hokusai, Hiroshige** — Japanese woodblock prints. Pigments include:
- Hokusai blue / Prussian blue: iron, cyanide (ferric ferrocyanide — Prussian blue was the first synthetic pigment, 1704, and Hokusai used it extensively. The cyanide is worth noting — it sounds alarming but is non-toxic in this form. Mark uncertain: false, this is well documented.)
- Hiroshige also used Prussian blue heavily
- Reds: mercury sulfide (vermilion) or iron oxide
- Blacks: carbon ink

**Van Gogh (both)** — oil paint, well-documented palette:
- Blues: cobalt blue, Prussian blue, ultramarine (lapis lazuli origin, later synthetic)
- Yellows: chrome yellow (lead chromate — toxic, which is interesting)
- Greens: viridian (chromium oxide), emerald green (copper arsenite — also toxic)
- Van Gogh's pigments are exceptionally well studied. Be specific, low uncertainty.

**Matisse — The Red Room** — oil paint:
- Reds: cadmium red, vermilion (mercury sulfide)
- Blues: ultramarine, cobalt
- Greens: viridian

**Vermeer — Girl with a Pearl Earring** — oil paint, 17th century Dutch:
- Blues: natural ultramarine (lapis lazuli, ground — extremely expensive in Vermeer's time, worth noting)
- Blacks: carbon black, bone black
- Flesh tones: lead white, ochres (iron oxide), vermilion
- The pearl: lead white
- Mark some uncertain — Vermeer's exact mixtures are still studied

**Manet — The Piper** — oil paint, 19th century:
- Blacks: ivory black (carbon from burned bone)
- Reds: vermilion, cadmium red
- Flesh: lead white, ochre
- Manet's palette is fairly well documented

**Sargent — Carnation, Lily, Lily, Rose** — oil paint, painted outdoors at dusk:
- Pinks/whites: lead white, rose madder (organic, from madder root)
- Greens: viridian, emerald green
- The lantern glow colors: cadmium yellow, chrome orange

**Earth — Blue Marble** — not pigment at all. These are wavelengths of light:
- Ocean blues: water absorbing red wavelengths, scattering blue
- Land greens: chlorophyll absorbing red and blue, reflecting green
- Cloud whites: all wavelengths scattered equally
- This is a completely different material story — light, not pigment. Worth reflecting that in the recipes. "water, depth" / "chlorophyll" / "ice crystals" etc.

**Sun — Solar Granulation** — also light, not pigment:
- The colors are thermal radiation — temperature differences in the solar plasma
- Bright centers (granules): hotter plasma rising, ~6000K
- Dark borders (intergranular lanes): cooler plasma sinking, ~5500K
- Recipes here are plasma physics, not chemistry: "plasma, 6000K" / "iron, ionized?" 
- This is genuinely uncertain and genuinely interesting. Mark most uncertain: true.

**Chinese Blue and White** — ceramic glaze:
- Blues: cobalt oxide, same source as medieval glass (often imported from Persia)
- White: kaolin clay, fired
- The cobalt connection to Chartres is worth a consistent recipe — "cobalt oxide" for both

**Fan Kuan — Travelers in Mountains** — ink and mineral pigments on silk, c. 1000 CE:
- Blacks/grays: carbon ink (pine soot or lamp black)
- The painting is nearly monochromatic — mostly carbon in varying dilutions
- Recipes here are very simple: "carbon, water" for most colors
- Mark uncertain: false — ink paintings are well understood

**Degas — The Guitarist** and **Van Gogh — Café Terrace** — these palettes were derived from memory rather than image analysis. Verify the colors against the actual images before writing recipes. The recipes themselves can be written confidently once the colors are confirmed — both painters' palettes are well documented.

---

## Output Format

Each color entry should look like this when done:

```json
{
  "hex": "#1a3a8c",
  "recipe": "cobalt oxide",
  "uncertain": false
}
```

Note: the current palettes.json stores colors as plain hex strings in an array, not as objects. **The schema will need to change** from:

```json
"colors": ["#1a3a8c", "#8b1a1a", ...]
```

to:

```json
"colors": [
  { "hex": "#1a3a8c", "recipe": "cobalt oxide", "uncertain": false },
  { "hex": "#8b1a1a", "recipe": "gold, colloidal", "uncertain": false },
  ...
]
```

This is a breaking change — confirm with the Layout Manager that the palette tool rendering code is updated to read the new format before deploying.

---

## The Three Craft Swatches Entry

Add a new palette entry for the craft swatches — separate from the historical palettes, always present regardless of which palette is loaded:

```json
{
  "id": "craft_swatches",
  "name": "craft",
  "source": null,
  "description": "Materials of the craft — always present",
  "colors": [
    { "hex": null, "label": "empty", "recipe": "no glass", "uncertain": false },
    { "hex": "#c2d4bc", "label": "clear", "recipe": "iron in sand, unrefined", "uncertain": false },
    { "hex": null, "label": "lead", "recipe": "lead, antimony", "uncertain": false }
  ]
}
```

(Lead and Empty have special rendering behavior handled by the palette tool — hex values alone don't capture them fully.)

---

## When Done

The updated palettes.json should be saved in place at:
`/Users/michaelchabin/CuriousWoods/prototypes/art/palettes.json`

Flag the Degas and Café Terrace palettes clearly if color verification is still pending — don't block the rest of the work on those two.
