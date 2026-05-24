# File Reorganization Plan — March 7, 2026

**From:** Project Manager
**Purpose:** Documents the current file structure outside the vault and the deploy workflow.
**Status:** 50-PROTOTYPES plan CANCELLED (see note below). Deploy folder structure established.

> **Note:** The original plan to move prototypes inside the vault (50-PROTOTYPES) has been reversed. Obsidian cannot usefully display HTML/asset files, so there is no advantage and real cost in visibility. Working files stay outside the vault alongside stories/, templates/, and tools/.

---

## Why

The prototypes folder currently lives outside the vault at `/Users/michaelchabin/CuriousWoods/prototypes/`. As the project grows, keeping assets outside the vault creates confusion about what is current, makes vault-relative paths inconsistent, and means the file organization guide doesn't reflect reality. Moving everything inside the vault under `50-PROTOTYPES/` resolves this cleanly before the file count grows further.

---

## Current State (verified March 7, 2026)

```
/Users/michaelchabin/CuriousWoods/prototypes/
├── geometry-v1.html                  ← active working file
├── cw-default-page-lab.html          ← superseded layout file (keep for reference)
├── Original Default Page Lab.html    ← archive
├── art/
│   ├── palettes.json
│   ├── Alahambra.jpg
│   ├── Chinese Porcelan.jpeg
│   ├── Degas Guitarist.jpeg
│   ├── Earth.jpeg
│   ├── Glass Chartres.jpg
│   ├── Glass Gaudi.jpg
│   ├── Hiroshige Rain on Bridge.jpg
│   ├── Hokusai Great Wave.jpg
│   ├── Manet The Piper.jpeg
│   ├── Matisse The Red Room.jpg
│   ├── Sargent 4 Girls.jpeg
│   ├── Sargent Lilly and Rose.jpeg
│   ├── Sun surface closup.jpg
│   ├── Van Gogh Cafe Terrace.jpeg
│   ├── Van Gogh Stary Night.jpg
│   └── Vermeer Girl with Perl Earring.jpeg
├── models/
│   ├── geo_hexagon_triangle.svg
│   ├── geo_nested_triangle.svg
│   ├── geo_pentagon_pentagram.svg
│   ├── geo_squares_nested.svg
│   ├── ratio_golden_5.svg
│   └── Not Used/
│       ├── art_vangogh_starrynight.svg
│       ├── proof_pythagoras_fourcorner.svg
│       ├── proof_pythagoras_isoceles.svg
│       ├── proof_pythagoras_twosquare.svg
│       ├── ratio_golden_3.svg
│       ├── ratio_golden_3_s.svg
│       └── ratio_golden_5_s.svg
└── Old/
    ├── geometry-layer1.html
    ├── geometry-layer1 copy.html
    ├── geometry-layer1old.html
    ├── geometry-layer2.html
    ├── cw-test.html
    └── NewName.html
```

**Vault destination (exists, currently empty):**
`/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/`

---

## Target State

```
/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/
├── geometry-v1.html                  ← active working file
├── cw-default-page-lab.html          ← keep for reference
├── Original Default Page Lab.html    ← keep for reference
├── art/
│   └── (all files as-is)
├── models/
│   └── (all files as-is, including Not Used/ subfolder)
└── Old/
    └── (all files as-is)
```

The tools folder stays where it is — it is not a prototype asset:
`/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js` — no change.

---

## Path Updates Required in geometry-v1.html

After the move, all relative paths inside `geometry-v1.html` that reference `art/` or `models/` must be updated. The Coder should search the file for these patterns and update them:

**Before:**
```
art/palettes.json
art/Glass Chartres.jpg
models/geo_hexagon_triangle.svg
(etc.)
```

**After:** paths remain the same relative structure — `art/` and `models/` move with the file, so relative references should continue to work without change, provided the HTML file and its asset folders are moved together as a unit.

**Verify after move:** Open `geometry-v1.html` in a browser served from the new location and confirm palettes load, art images load, and model SVGs load. Fix any broken paths before marking complete.

---

## Execution Steps (for Coder)

1. Confirm no active edits are in progress on `geometry-v1.html`
2. Take a dated snapshot first: copy `geometry-v1.html` to `geometry-v1-Mar7.html` in the same folder (before moving anything)
3. Move the entire `prototypes/` folder contents into `50-PROTOTYPES/` — move as a unit, not file by file
4. Serve from new location and verify all assets load correctly
5. Update any absolute paths in the file if needed (relative paths should be fine)
6. Confirm in handoff: "File reorg complete, all assets verified at new paths"

---

## After the Move

All chats should reference files at the new paths going forward:

| Asset | New Path |
|-------|----------|
| Active prototype | `/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/geometry-v1.html` |
| Model SVGs | `/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/models/` |
| Palette data | `/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/art/palettes.json` |
| Art images | `/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/art/` |
| Dev tools | `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js` (unchanged) |
| Vault root | `/Users/michaelchabin/CuriousWoods/CuriousWoods/` (unchanged) |

PM will update Current-Status.md and PM-Handoff.md with new paths once Coder confirms completion.

---

## Note on the `tools/` Folder

`/Users/michaelchabin/CuriousWoods/tools/` contains `cw-dev-tools.js`. This is not a prototype — it is a development utility. It stays outside the vault for now. If it makes sense to move it later (e.g., into a `50-PROTOTYPES/tools/` subfolder), that is a separate decision.
