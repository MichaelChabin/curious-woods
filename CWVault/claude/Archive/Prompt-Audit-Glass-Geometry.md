---
status: Ready to paste, 23 Oct 2026. From the Glass Geometry refactor chat. Read-only.
role: The Claude Code prompt that audits `js/glass.js` and the boards built on it, before anything is refactored. The same first step the Time Machine took (`Prompt-Audit-Timeline-Graphics.md`). Its report is read by Michael, who rules; a go-ahead prompt follows.
how to use: Paste the block below whole into a Claude Code session at the root of `_CW`. Ask it to write the report to `CWVault/claude/Audit-Glass-Geometry-Oct23.md`.
---

# Prompt: audit Glass Geometry

> **This pass is read-only. Do not change any code.** Write a plain-language report for a designer, not a programmer: short sections, no jargon you don't explain. Save it as `CWVault/claude/Audit-Glass-Geometry-Oct23.md`. We decide what to do after Michael has read it.
>
> **Read first, in this order.** `CWVault/00-WHAT-CW-IS.md`. `CWVault/claude/Inventory-Glass-Stories.md`, which is the list of stories the lab must serve and what each needs; it is the measure for everything below. `CWVault/claude/Series-Glass-Geometry.md`, the shell every board shares (its header says where the inventory overrides it). `CWVault/claude/Rulings-Sept-2026.md`, the sections *Gestures across tools*, *A lab is a place*, *Capability levels*, and anything on the fullscreen board. `CWVault/claude/Worknote-Parallel-Window.md` and `CWVault/claude/Worknote-Fraction-Window.md`, for the boards that are built and the one that is next. `CWVault/claude/Prompt-Extract-Glass-Module.md`, for how `glass.js` came to be. `cw-deploys/MANIFEST.md` for the `js/` entries.
>
> **Then the code.** `cw-deploys/js/glass.js` (about 6,500 lines) and `cw-deploys/js/plane.js`. The pages that mount them: `active/glass-geometry.html` (the lab standing alone, level `both`), `active/geo-1-glass-circles.html` (Stained Glass Circles, the window profile at `circles`), `experiments/geo-2-glass-wright-window.html` (the Wright window, at `wright`), and `experiments/geo-2-glass-lines.html` (the straightedge board, at `lines`, which the inventory proposes retiring). Also `models/constructions.json` and `art/palette/palettes.json`, for what the boards load. `active/glass-multiplication.html` is out of scope; it is being archived.
>
> **Background.** Glass Geometry was extracted into `js/glass.js` on 1 Oct. Since then each new board has been added as a flag inside it: `APP` (the window profile), `BOARD` (the straightedge board), `WRIGHT`, and `FRAMED` (the two framed boards together). The inventory now lists six or seven boards, each of which supplies one thing — how panes get made — on one shared shell. We want to know how far the code is from that, and the cheapest honest route to it.
>
> **What the report should cover.**
>
> 1. **Shell, board, or dead.** Go through `glass.js` section by section (its `// ====` headers). For each, say whether it is shell (the inventory's "what the lab is" list: plane, frame, glass and came, the column, what she makes), one board's (and which), or dead or unreachable. Trace the four flags: where each one is tested, how many places, and how deeply the boards' code is interleaved with the shell's. Give a rough size for each bucket in lines. The point is to tell Michael, honestly, how tangled it is.
>
> 2. **Hard-wired against the inventory.** The inventory says these must vary by board or by story: the frame (present or not; snapping to the grid; locked or free); the grid (given, with resolution that can change); how a crossing behaves (makes a point, or doesn't); how lead arises (from colour, or from selected segments); mirror and quadrant modes; the palette (clear glass in every one). For each, say what the code does today, whether it is one switch or scattered, and what would have to change. Note anything else you find that the inventory assumes varies but the code assumes fixed.
>
> 3. **Disagreements with the series page.** Where the code's behaviour differs from *The single workflow*, *The plane and the frame*, *Glass and came* and *What she makes*. Include: fullscreen (how it is entered and left today, and on which boards); the frame as a crop of an endless plane (the Wright experiment confines the plane to the frame, which Michael has called a mistake); readouts while dragging; the plan with its parts list, which does not exist yet; where Share lives.
>
> 4. **The shell candidates whose definitions are pending.** Michael intends a session each to define these durably: Save and Open (and her library's keys), Demo with replay (and `forkStepThrough`, `checkWipThen`), the sound question, the "Roman glass" default fill, notes on constructions, the picker window, Remember, the eraser. For each: what it does, where it lives, what else depends on it, and whether it could be removed or replaced without touching the rest. This section is a reading list for those sessions; don't judge whether each should stay.
>
> 5. **A picture behind the plane.** The perspective version of the fraction window needs a painting or photograph behind the plane, carried by zoom and pan. Say whether `plane.js` and the drawing order in `glass.js` make that cheap or expensive, and what would need to be in place first.
>
> 6. **The shape of a board.** Two possibilities: a board stays a set of flags inside `glass.js` (as now), or a board is a small separate file the engine loads, supplying how panes get made and nothing else, with the shell asking it for the panes and drawing the rest. Describe what the second would look like in this code — what the interface between shell and board would have to carry — and what it would cost compared with staying as flags, judged against seven boards rather than three. Don't recommend yet in this section; just lay out both.
>
> 7. **The straightedge board.** What retiring level `lines` would remove from `glass.js`, and whether anything the other boards use lives only behind `BOARD`.
>
> 8. **`plane.js`.** Whether it is the one plane the Labs ruling describes (one origin, the metre, zoom and pan, the grid) or whether `glass.js` keeps a second idea of the plane beside it. Name any place a page reads the viewport as if the canvas were the whole window.
>
> 9. **An order of work**, in small steps, each leaving the three live pages (the standalone lab, Glass Circles, the Wright experiment) working and looking the same except for named changes. Separate tidying (nothing a child can see changes) from rebuilding. Say where the rebuild of Glass Circles on the shell would come, and what has to be true before it. Say what each step risks.
>
> 10. **Anything that surprised you**, and anything you are unsure of. Where the documents leave something open, name it as open; do not invent an answer.
>
> **Ground rules for what follows, so the report can anticipate them.** One engine; the thing to refuse is a second one. One shell, defined once, that every board inherits. A board supplies how panes get made and nothing else. Glass Geometry decides gestures first. Tidying and bug-fixing stay separate. Every step is checked against the current version before the next.
>
> Stop after the report. Do not commit anything.
