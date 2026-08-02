# Handoff — Site Reorganization
**Date:** 2026-08-01
**For:** Claude Code
**Status:** Ready to run

## Purpose
Reorganize `cw-deploys` so current work is obvious at a glance, superseded
versions are out of the deploy path, and Claude Code has a written map of
where everything lives.

## Decisions settled before writing this
- `geometry-v1.html` is current (its "how this works" help panel is wired up;
  the dated copies' are not). Claude Code verifies before moving.
- `active/` carries currency, so filenames there drop versions and dates.
- Number Theory Lab is intentionally demoted from the main index to
  Experiments — Glass Multiplication is expected to replace and exceed it.
  Exception: its grid and axis rendering is the visual target for Glass
  Multiplication v2.2, so the manifest records that.
- `outdated-files/` sits outside the repo. Anything inside `cw-deploys` is
  served by Netlify whether or not it is linked.
- `prototypes/` survives as staging for new work.

---

## PROMPT AS GIVEN TO CLAUDE CODE

```
CURIOUS WOODS — SITE REORGANIZATION

Repo: /Users/michaelchabin/_CW/cw-deploys (deploys to Netlify)
Also touches: /Users/michaelchabin/_CW/prototypes

Use `git mv` for everything inside the repo so history survives.
Commit at the end, but DO NOT PUSH. Michael tests locally first.

--- STEP 0: VERIFY BEFORE MOVING ---
Compare geometry-v1.html, geometry-v1-20260321.html, geometry-v1-20260325.html
(size, mtime, and whether the "how this works" help panel is wired up).
Michael believes geometry-v1.html is current because its help panel works.
Report what you find. If anything contradicts that, STOP and ask.

--- TARGET STRUCTURE ---
cw-deploys/
  index.html
  MANIFEST.md            (new)
  active/
    glass-geometry.html          <- geometry-v1.html
    glass-multiplication.html    <- glass-multiplication-v2.html
  experiments/
    index.html                   (rewrite; currently empty)
    number-theory-v1.html        <- cw-deploys root
    pi-beads.html                <- prototypes/bead-counter_3.html
    necker-brain-map.html        <- prototypes/
    cursor-modes.html            <- prototypes/proto-cursor-modes.html
    sound-workbench.html         <- prototypes/proto-sound-workbench.html
    clinks-triangular.html       (already there)
  art/  models/  stories/  text/   (unchanged, stay at root)

/Users/michaelchabin/_CW/outdated-files/   (NEW — outside the repo, so Netlify never serves it)
  geometry-v1-20260321.html
  geometry-v1-20260325.html
  glass-multiplication.html      (the v1)
  proto-cursor-mar16.html        <- prototypes/
  cw-default-page-lab.html       <- prototypes/

prototypes/ survives as staging. Leave Triangle.png there unless a moved
file references it — grep to check; if referenced, move it alongside.

--- STEP 1: RELATIVE PATHS (highest risk) ---
Every page drops one directory level. Grep each moved file for references to
art/, models/, stories/, text/, palettes.json, and any sibling .html, in
src=, href=, fetch(), and JS string literals. Rewrite to ../ form.
Catch ./art/ and /art/ variants too. Report every rewrite you make.

--- STEP 2: INDEXES ---
Main index.html links exactly three items:
  Glass Geometry      -> active/glass-geometry.html
  Glass Multiplication -> active/glass-multiplication.html
  Experiments         -> experiments/index.html
Keep the existing house style: parchment #f4f1e8, slate #546A80,
copper #b87333, Georgia serif, typographic word controls (not buttons).

experiments/index.html: same style, one-line description per item, listing
number-theory-v1, pi-beads, necker-brain-map, cursor-modes, sound-workbench,
clinks-triangular. Note on number-theory-v1 that its grid and axis rendering
is the visual reference for Glass Multiplication v2.2.

--- STEP 3: MANIFEST.md ---
At cw-deploys root. Short. Covers:
  - active/ = current, shipping. No version numbers or dates in filenames here.
  - experiments/ = live but unpolished; linked from experiments index only.
  - outdated-files/ (outside repo) = superseded versions, never deployed.
  - assets live at repo root: art/, models/, stories/, text/
  - pages in subfolders reach assets via ../
  - one line per active and experimental page saying what it is
  - superseded-version protocol: move to ../outdated-files/, keep its dated
    or versioned filename as the archive record

--- STEP 4: TEST ---
Serve locally, open all eight pages, confirm zero 404s in console and that
every index link resolves. Report results. Then commit, do not push.
```

---

## After the run
Nothing reaches Netlify until Michael pushes. Test locally, then push; the
Netlify build fires on the push and every URL under the site changes shape.
Old bookmarks to `/geometry-v1.html` and `/glass-multiplication-v2.html`
will 404 after that.

## Open follow-ups
- Netlify redirects from old paths to new, if any bookmarks matter.
- Glass Multiplication v2.2: adopt Number Theory Lab's grid and axis rendering.
