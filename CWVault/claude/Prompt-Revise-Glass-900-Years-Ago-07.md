---
status: Ready for Michael's read, 5 Nov 2026. Replaces 06, which should not be sent. Paste the block below whole into Claude Code.
role: Revision 4 of the Glass 900 years ago board: the table suspended for this story, the colour panel open from the start, Chartres glass by default, clean swatches, and six new demos built from Demos-Glass-900-Years-Ago-01.md.
related: Demos-Glass-900-Years-Ago-01.md, Story-Glass-900-Years-Ago-02.md, Prompt-Revise-Glass-900-Years-Ago-05.md, js/glass.js, art/palette/palettes.json
---

# Prompt: Glass 900 years ago, revision 4

> Read the board `theophilus` as it stands now in `cw-deploys/js/glass.js`, the story page `active/geo-1-glass-circles.html`, and `CWVault/claude/Demos-Glass-900-Years-Ago-01.md`. Read them; don't infer them. Change only this board and its page. `Prompt-Revise-Glass-900-Years-Ago-06.md` is withdrawn; this replaces it.
>
> **1. The table is suspended on this board.** This story is a child's first encounter, and the table will get a story of its own. On this board: no frame, no table label, no size readouts, no table points, nothing cropped. The glass and the plane are as they would be with no table at all, edge to edge as revision 3 made them. Keep the table's code where it is, switched off by this board's profile, so another board can switch it on later. A construction saved with a table opens here without one.
>
> **2. Where 0 and 1 start.** 1/2, halfway between 0 and 1, sits at the centre of the drawing area. Choose the unit so that from −2 1/2 to 3 1/2 across and from −2 to 2 up is in view with a little margin: that holds the two first circles centred and a rose around 0 or around 1.
>
> **3. The colour panel is open from the start**, in the place revision 3 gave it (on the left, centred on the *How this works* column, its top just below *Reset view*). She can still close it and open it again from *Color*.
>
> **4. Chartres glass by default.** The board opens on the Chartres palette (`chartres_glass`). In the picker the order is Chartres, then the three Gaudí palettes, then the rest.
>
> **5. Swatches with clean edges.** Each swatch in the colour panel shows a dark edge with a ring of its own colour outside it, as if the colour were bleeding past the lead. Find where the ring comes from and remove it. Each swatch reads as a flat piece of glass with a single dark edge and nothing outside it. The chosen swatch stays plainly marked, by a mark that is not its own colour.
>
> **6. Six new demos.** Replace this board's demos with the six in `Demos-Glass-900-Years-Ago-01.md`, in its order and under its names: *The two first circles*, *The six-petal rose*, *The double rose and hexagon*, *The twelve-petal rose*, *A Gothic window*, *The quatrefoil*.
>
> - Build each from its step list exactly: the same circles and lines, in the same order, each from points made by earlier steps (the file was checked for that). Every coordinate is exact; build from the board's own points, never from typed decimals.
> - Where the demo player shows one step at a time, show that step's words (the italic sentence after it). If the player has no place for words, say so in the report and don't add one.
> - Colour each demo's finished glass as its **Glass** note says, using the board's real pieces. Where a note says a shape is several pieces on the board (the mullions in the Gothic window, the cut petals and the overlaps in the twelve-petal rose), colour every piece of it. In the twelve-petal rose, colour each overlap between neighbouring petals amber, like the second rose; that is a first guess for Michael's eye.
> - Each demo opens framed so the whole design is in view.
> - The look page Michael approved, for comparison: https://claude.ai/artifact/95924oP69n7fGmd39j44hv
>
> **Check before reporting**, on the Mac and on the iPad in the pane: the opening view (no table, 1/2 at the centre, the colour panel open, Chartres chosen); two circles and a rose drawn by hand and coloured, nothing cropped; the picker's order; the swatches close up, one chosen; each of the six demos stepped through from first to last and shown finished in glass, beside the look page's picture of the same; Save and Open of a construction made before this revision that had a table. Screenshots beside the report. Say plainly what needs Michael's eye: the demos' colours piece by piece, and the twelve-petal rose's overlaps.
>
> Name the board's new version in its stamp, update `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
