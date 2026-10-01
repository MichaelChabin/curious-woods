---
status: Ready to paste — 1 Oct 2026. Michael's prompt of 1 Oct, corrected by Claude Code after an analysis against the disk: four paths fixed, the mount line brought to the shelves' convention, the two-stage shape named, the fixed-position decision named, the rose log and the saved library added. Needs `Geometry-Spine.md` and `Labs-Ledger.md` on disk before it is pasted.
role: The prompt that makes Glass Geometry a shelf module (`js/glass.js`) served to stories, as the map and the sampler are. The step-one investment the geometry series rests on (Rulings-Sept-2026, "A lab is a place").
how to use: Paste the prompt below whole into a Claude Code session in `_CW/`. One session may stop after stage 1 with a clean standalone page; that is an acceptable report.
---

# Extracting Glass Geometry into a shelf module

**Before pasting, in this order:** the vault's rulings of 1 Oct are committed (done); the palette-as-window change to `active/glass-geometry.html` is checked and committed (see the board); `CWVault/claude/Geometry-Spine.md` and `CWVault/claude/Labs-Ledger.md` are saved from the chat into the vault (Michael). The prompt names both and the builder will stop if they are missing.

## The prompt

> Read, in this order: `CWVault/00-WHAT-CW-IS.md`; `CWVault/claude/Rulings-Sept-2026.md`, in particular *A lab is a place, and she adjusts to one new thing*, *Capability levels*, and *Gestures across tools*; `CWVault/claude/Labs-Ledger.md`; `CWVault/claude/Geometry-Spine.md`; `cw-deploys/MANIFEST.md` (Page standard, and the `js/` entries); and `CWVault/claude/Story-Pattern.md` for how the existing shelves (`js/map.js`, `js/sampler.js`, `js/timeline.js`, `js/stack.js`) are mounted by a story page.
>
> Then read the lab itself: `cw-deploys/active/glass-geometry.html`, about 4,990 lines. It is well sectioned; the section headers (`// CONSTANTS`, `// ACTION LAYER`, `// INTERACTION STATE MACHINE`, `// CONSTRUCTIONS`, `// PICKER WINDOW`, `// STARTUP` and the rest) tell you what each block does. It already stands on `js/plane.js` (the coordinate space), `js/cw-panel.js` (the info and choice panels), `js/cw-flags.js` and `js/cw-number.js`; those stay as they are.
>
> **What this is for.** Every geometry story from here on calls the same lab. If each one solved embedding for itself we would end up with six slightly different tables, which is the fragmentation the geometry spine exists to prevent. So the lab becomes one module, served to stories, exactly as the map and the sampler are.
>
> **The shape of the job: two stages.** Stage 1 is the module with one instance and the standalone page made thin over it. Stage 2 is the levels and the two-instance bench. Stopping after stage 1 with a clean standalone page and a report is an acceptable outcome for one session; say plainly which stage you reached.
>
> **1. `js/glass.js`.** Move the lab into a module that a page mounts into an element, in the shelves' own form — a function taking the host element and options and returning a small API, as `cwMap(container, region, marks, opts)`, `cwSampler(frame, anchors, opts)` and `cwWorld(host, data)` do:
>
> ```js
> var glass = cwGlass(el, { level: 'circles', open: 'rose', palette: 'chartres' });
> ```
>
> `level` names the powers served (below). `open` names a construction from `models/constructions.json` to have ready behind *again*, or is omitted. `palette` names a palette from `art/palette/palettes.json`. No existing shelf has a teardown; add `glass.destroy()` and say in your report what it has to undo. Where `map.js` and `sampler.js` disagree in their conventions, say which you followed.
>
> **2. `active/glass-geometry.html` keeps working, unchanged in behaviour, at the same URL.** It is hung in the gallery and a child can walk into it having read no story. It becomes a thin page that mounts the module at the fullest level. This is the acceptance test that matters most: if the standalone lab loses anything, the extraction is wrong. That includes what she has saved: the construction library lives in the browser under the page's own keys (`cw-cx-index`, the per-construction and preview keys, `cw-replay-duration`, the How-this-works flags), and a construction saved before the extraction must open after it. Keep the keys.
>
> **3. What the module owns.** All of it — the plane, the two gestures, locations and crossings, lead and fill, the palette, the operation log, undo, replay, `checkWipThen()`, `forkStepThrough()`, the picker window, How this works, New, Save and its choice panel, Postcard, Remember. A lab must be complete standing alone, so none of this moves to the page. A story page provides the title, the text, and nothing the lab needs to work.
>
> **4. Levels.** A level is a named set of powers. Implement two now:
>
> - `circles` — circles only. The straightedge gesture (tap, tap) is absent, not disabled and not greyed out, per the Marauder's Map rule. Nothing explains its absence.
> - `both` — circles and lines, which is what the lab does today.
>
> Name but do not build `lines`, `grid`, `rectangles`, `regions`, `plots`. They are the geometry spine's steps and will arrive in that order.
>
> A level is a floor, not a ceiling: a story asks for a minimum, and if the child has already earned more elsewhere she keeps it. There is no store of what she has earned (the browser holds only the library, the replay speed and the How-this-works flags); say so in your report and serve exactly the level asked for. Do not invent a store.
>
> **5. The rose log.** `open: 'rose'` names a construction that does not yet exist: the library holds the built-in triangle, hexagon and squares only. Write the rose log into `models/constructions.json` as the Glass Rose story specifies it (`CWVault/claude/Story-The-Glass-Rose.md`, *What the story asks of the lab*): circle 0→1, circle 1→0, then four more, each centred on the next crossing and drawn back to the middle, in walking order so the replay reads as a walk. If the library's format cannot express it, say so rather than forcing it.
>
> **6. A bench that proves it.** `experiments/glass-module-bench.html`: the module mounted twice on one page, once at `circles` and once at `both`, each in a box of ordinary size rather than the whole window. Two instances must not interfere — separate canvases, separate logs, separate undo. If they do interfere, that is the finding, and it is more useful than a clean report.
>
> **The part that will be awkward, so plan for it.** The lab currently owns the whole document. Measured on 1 Oct: 264 top-level declarations; 78 element lookups by id over 50 distinct ids; 13 listeners on the document; 8 reads of the window's size; and 18 rules positioned fixed to the viewport in 210 lines of CSS. Expect at least these, and name any others you find:
>
> - **CSS at document level.** It must be scoped to the mounted element so a story page's own type and colour are untouched, and so two instances can coexist. `css/story.css` must not be edited to accommodate the lab.
> - **Fixed positioning.** The column, the tip window, the panels, the picker and Remember are fixed to the viewport. In a story page they would float over the story's own column. Decide it this way: panels and windows position relative to the mounted element; on the standalone page that element fills the viewport, so nothing visible changes there. This is the one place where scoping is a design decision, and that is the decision.
> - **Key handlers on `document`.** Cmd-O and friends are bound globally. In a story page they must only fire when the lab has the focus.
> - **Full-window assumptions.** Sizing, the resize handler, and anything reading `window.innerWidth` or `canvas.clientWidth` as if the canvas were the viewport.
> - **Singletons.** Module-level state — the operation log, the view, the panels — that assumes one lab per page.
>
> Do not redesign anything else while you are in there. No new gestures, no new words, no tidying of behaviour you think is odd. Report what looked wrong and leave it.
>
> **Finishing.** Bump `CW_VERSION` on every page touched and the version query on every page that loads a changed script. Run `tools/check-deploys.sh`. Register `js/glass.js` and the bench in `MANIFEST.md` and add the line to `00-BOARD.md`. Update the Geometry: Glass section of `CWVault/claude/Labs-Ledger.md` to say the lab is a shelf module and which levels exist.
>
> Test headless at 1440 × 1100 and 390 × 844: no console errors, no failed requests, no horizontal scroll, and on the standalone page every one of draw, undo, lead, fill, colour, save, picker, How this works, New, replay and opening a construction saved before the change still works.
>
> Anything unclear, leave it open and name it. Stop and report before committing.
>
> **In the report, say:** which stage you reached; which conventions you took from `map.js` and `sampler.js` and where they disagreed; what had to be scoped and how; whether two instances really are independent; that no store of earned levels exists; whether the rose log could be written; and anything in the lab that surprised you — that file is a year old and nobody has read it end to end in a while.

## What changed from Michael's draft, and why

- `CWVault/claude/What-CW-Is.md` → `CWVault/00-WHAT-CW-IS.md`; `art/palettes.json` → `art/palette/palettes.json`: the paths as they are on disk.
- `cwGlass.mount(el, opts)` → `cwGlass(el, opts)` returning an API: the draft asked the builder to follow the shelves' conventions and then invented one; the shelves all take the host and options and return an API. Teardown named as new, since none has one.
- Two stages named, with stopping after the first allowed: the job is the size of the plane extraction (several sessions in August).
- The fixed-position decision taken in the prompt rather than left to collide with "do not redesign".
- The rose log added as a job: `open: 'rose'` named a construction the library does not hold.
- The saved library added to the acceptance test: the keys are the page's, and a child's saved rose must survive.
- The lab's existing shelf scripts named, so the builder does not pull them in twice.
