# cw-deploys — what is here

Netlify publishes this folder and nothing above it. Anything outside
`cw-deploys/` is never served.

## Folders

**`active/`** — current, shipping. Linked from the main index.
No version numbers or dates in filenames here: the file at
`active/glass-geometry.html` is *the* Glass Geometry, always.

**`experiments/`** — live and reachable, but unpolished. Linked only from
`experiments/index.html`, never from the main index. Version numbers are
allowed here.

**`../outdated-files/`** — outside this folder, so Netlify never serves it.
Superseded versions, kept as the archive record.

**`art/` `models/` `stories/` `text/`** — assets, at the root of this folder.
Pages in `active/` and `experiments/` reach them with `../` —
`../art/palettes.json`, `../models/logs/geo_hexagon_triangle.json`.
A page that moves between folders must have those paths checked.

## Pages

### active/
- **`glass-geometry.html`** — compass-and-straightedge construction environment;
  constructions become stained glass. Reads `../text/geometry-v1.json` for its
  copy, `../art/palettes.json` for palettes, and `../models/` for the built-in
  constructions.
- **`glass-multiplication.html`** — the times table as a window onto the number
  plane: every product a rectangle, prime factors in colour and sound. Self-
  contained apart from the link home.

### experiments/
- **`number-theory-v1.html`** — multiplication and division as rectangles on a
  pannable number plane. Its grid and axis rendering is the visual reference for
  Glass Multiplication v2.2.
- **`pi-beads.html`** — how many beads fit around a circle; circumference ÷
  diameter, with past measurements kept.
- **`clinks-triangular.html`** — triangular numbers as people arriving, leaving,
  and clinking glasses.
- **`necker-brain-map.html`** — the path a Necker cube flip takes through the
  brain, drawn as a station map. Uses
  `../stories/necker-cube/brain-watercolor.jpeg`.
- **`sound-workbench.html`** — bench for auditioning gesture sounds, feedback
  sounds, pitch and ratios.
- **`cursor-modes.html`** — what the pointer becomes for each gesture.

## When a page is superseded

Move the old file to `../outdated-files/` and **keep its dated or versioned
filename** — that name is the archive record of when it was current. The
replacement takes the plain name in `active/`.

So `geometry-v1-20260325.html` stays `geometry-v1-20260325.html` in the archive,
while the version that replaced it lives as `active/glass-geometry.html`.

`../prototypes/` is staging — work that has not yet earned a URL. A prototype
becomes an experiment by moving into `experiments/` with a descriptive name.
