# Glass Multiplication — sorted review notes

**Status:** Michael's post-Phase-4 review, sorted 2026-08-09. Each item carries a
lane so no session picks up deferred work piecemeal. Items marked *(sent Aug 8)*
were in the pre-push message to Claude Code — confirm done rather than redo.

---

## Lane 1 — Fix now (bugs and small corrections)

- **Safari audio silent** *(sent Aug 8).* Video elsewhere plays; Chrome recovered
  after restart. Suspect AudioContext resume not synchronous inside the first
  gesture handler — Safari requires it. Check every sounding path. Safari joins
  the acceptance checklist permanently; it is the iPad's engine and verification
  ran Chrome-only.
- **Tap highlights barely visible in-app** *(sent Aug 8)* despite reading clearly
  at the bench (which never tested tap). Check the lit-palette application on the
  tap path against the intensity law, which was Claude Code's own reading of the
  bench rule.
- **Selection outline persists** — in Build by Selecting, the first number keeps
  a heavy outline. Per the port there is one visual language for "this one" (the
  lit palette); outlines should not exist at all. Likely fix is deletion.
- **Startup grid looks like the old table.** First paint should be the drawn
  lattice used everywhere else, not a table-style grid.
- **Axis numbers unshaded in Multiply mode.** The x/y axis labels don't need
  number-background shading there.
- **Number 1 rendered beautiful and white** — quietly crystalline, perhaps a
  slight bluish tint. Philosophically right: no prime pieces, the empty product.
  One collision to avoid: clear leaded glass already means "prime beyond this
  workshop." 1 must read as *whole and white*, not unstainable — the tint is
  probably what separates them.
- **Fill/build pause.** Pause at 16², then every power of two after, filling the
  entire square below-left of the corner number first; a single word — Continue?
  — resumes. Gives fill a shape independent of the viewport, which the no-window
  layout requires.
- **Extend the plane past the window** — no letterbox; the map continues behind
  the left tool region. (Pairs with the fill-pause item above.)
- **Confirm the stale acceptance test was swapped** *(sent Aug 8)*: monochrome
  6/10/14 test out, colorblind-workshop test in.
- **Geometry: constructions render over the membrane** — lines and fills paint
  on top of the palette and viewing words. The membrane and its contents render
  above the world, always (Interface Standard, principle 2); the world shows
  through translucently, contents always win.
- **Geometry: viewing-strip titles collide with the colors panel** when it
  opens.
- **Geometry: Save → Image/Postcard text overlaps the frame** — the name field
  should sit fully inside the parchment area.
- **Geometry: undo applies to viewing changes** — tap-in-empty-space after
  Show map hides the map. Undo touches only marks on the world; the log keeps
  viewing ops for replay, undo skips them (Interface Standard §2, Undo).

## Lane 2 — Standing practice (record once, applies forever)

- **Any commit adding or changing child-facing text prints the full current
  string list at review** *(sent Aug 8).* This is the working form of the voice
  pass between full passes with Eileen.
- **Voice-pass status:** approved for this push via the printed-strings scan.
  Full read-aloud pass with Eileen returns when there is text to see (panels,
  stories).

## Lane 3 — Interim layout (provisional, ahead of the controls pass)

- **Info panel** *(sent Aug 8)*: number stays top-left with its factorization;
  properties text ("appears in 2 places," visible rectangles, deficient…) moves
  into a movable, closable, fading panel on Geometry's existing pattern,
  extracted as a shared component.
- **Viewing-strip words stay where they are** (they are controls, not labels —
  see Lane 5 finding). Mode controls (Build with primes…) move up below the
  prime chips; on iPad they currently sit below the fold.
- **Direction indicators:** N to the left of the y axis, E below the x axis —
  kids mostly work in the upper right quadrant.
- **Resets:** Reposition (0 back to initial position) and Rescale (initial
  scale). Two words, probably viewing-strip citizens.
- **Save-as-image / share is not yet implemented** — needs a menu word. On the
  board as a gap, not a bug.

## Lane 4 — Bench first (perceptual questions; never argued from reasoning)

- **Rotational tiling.** Deliberate amendment to design-note §3, recorded as
  such: below the diagonal, pieces stack bottom-up smallest-first; above it,
  rotated 90° to build left-to-right; squares rotated 45°, building lower-left
  to upper-right along the diagonal. Rotation is not mirroring — every pane keeps
  the same pieces in the same order, turned, like real panels rotated in a frame.
  What it spends: "a pane reads identically everywhere." The prime-glass bench
  holds both schemes side by side; the 45° squares (diagonal leading) are the
  untested part.

## Lane 5 — Controls pass (one pass over the whole surface, not piecemeal)

- The organizing move: everything informational lives in the shared panel
  component; controls are words in the membrane, per UI-Language.
- **Finding to honor:** the viewing-strip state-words read as version notes even
  to Michael, who wrote the words-as-controls spec. Verbs in a Tools context
  read as actions; declarative state-words ("grid follows zoom") read as
  changelog. State-words need something verbs don't — phrasing, placement, or a
  first-touch moment. Bench question eventually.
- Deferred layout items live here, not in fix-now: overall control placement,
  what moves out of the top, the lower-left options.
- Input: the Interface Standard draft (Spec-Interface-Standard-Draft-Aug09).

## Lane 6 — Design conversations (their own sessions)

- **Quadrant extension.** Not negative multiplication — the plane is a map,
  positive values in all four cardinal directions, per the original spec. Panes
  keyed by number make the other quadrants near-free reflections. Likely a
  viewing-strip toggle. The symmetry is the point.
- **Long-press** in Multiplication: held open. Tap selects a number and nothing
  else; geometric points/lines/circles underlie this plane but stay unexposed
  until needed.
- **Multiplication extensions** (3x+1 orbits, division as the map read backward,
  fractions as lines through zero, roots on the diagonal, GCD as shared glass…):
  running candidate list, separate session.

## Lane 7 — Seeds (written, awaiting facet correction and commit)

- `smoothness-fog.md` — grayscale-by-prime-rank magnitude viewing; the poster.
- Subdivision (piece-cut-into-p) — already parked per the §2 overrule, with
  triangle/glyph variants recorded as ranked below it.

## Lane 8 — Owed elsewhere

- **iPad pass:** pinch, Share sheet, opening a downloaded postcard, blue-paint
  fix — against Netlify for pushed work, or Claude Code serves the preview on
  the home network for unpushed work.
- **Colorblind-safe workshop:** the accessibility answer and currently a
  vacancy; the schema now requires six distinguishable primes and no workshop
  has proven it can be done. First post-extraction build.
