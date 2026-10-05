---
status: 2 Oct 2026. Written for Michael to paste into Claude Code once he has said yes to the words of Draft 10. Stage 2 of Publishing-a-Story.
role: The build prompt for The Glass Rose, the first story of the geometry series (circles only).
related: claude/Story-The-Glass-Rose.md, claude/Publishing-a-Story.md, claude/Story-Pattern.md, claude/Geometry-Spine.md, claude/Spec-Timeline-and-Map.md, claude/Spec-Maps.md
---

# Build The Glass Rose

Paste the line below into Claude Code. Everything else is in this file.

> Read `CWVault/claude/Prompt-Build-The-Glass-Rose.md` and do what it says.

---

## The prompt

Read, in this order: `CWVault/00-WHAT-CW-IS.md`; `cw-deploys/MANIFEST.md` (the Page standard, and `js/glass.js`, `js/timeline.js`, `js/map.js`, `js/stack.js`); `CWVault/claude/Rulings-Sept-2026.md`; `CWVault/claude/Story-Pattern.md`; `CWVault/claude/Spec-Timeline-and-Map.md` and `CWVault/claude/Spec-Maps.md` (*The world that moves*). Then the story: `CWVault/claude/Story-The-Glass-Rose.md`, Draft 10. Its text runs from the title to *References*; everything after that is notes for us, and its sections *Two endings* and *Settled 25 Sept* are history, not instructions. Where the notes disagree with the story's frontmatter or with Michael's rulings of 2 Oct (in the status line), the frontmatter and the 2 Oct rulings win.

Build it as `cw-deploys/experiments/the-glass-rose.html`. Copy `cw-deploys/template-story.html`; do not start from a blank file. `active/vermeer-girl-with-a-pearl-earring.html` is the model for everything except the table, and `active/van-gogh-starry-night.html` for a World on the moving map.

**1. The table.** `placement: across`, full width and full height (Michael, 2 Oct). Directly under the title and date line, mount Glass Geometry from the shelf: `cwGlass(host, { level: 'circles', open: 'Rose', palette: 'chartres' })`. The host is the full width of the page and the full height of the window. The table opens with 0 and 1 and nothing else. Its own column and words are the lab's; the page adds no tool words of its own beside it, and no left column anywhere on the page. The italic line under the marker in the story (*Two locations, 0 and 1 …*) is the table's caption. Remember stays off: the story does not summon it and the Maya flag is false.

**2. The words.** Use the story's words exactly. Then check every instruction in them against the circles level as it stands, word for word, because the Rulings say the word in the story must match the word on the screen. Report every mismatch and **do not change the story's words to fix one**; Michael changes words. Known in advance: the Save paragraph in *This is your window* names *Postcard*, which left the Save panel on 2 Oct when *Share* became a column word. Also check: that a closed loop really fills with pale green; that "a row of colours appears beside the glass" is what happens, or whether she has to tap *Color* first; *Just the glass*; *New*.

**3. Pictures.** Each is evidence, with its source and licence recorded in the page's comments and in the report. Placed where the story marks them: the Notre-Dame north rose (full width; its caption says plainly that it is not divided into six; it runs in rings of sixteen and thirty-two), and the York floor as a stack (`js/stack.js`): the photograph, then John Harvey's drawing of the lines, *Next: the lines* and *Back to the floor*. Its caption must say it was the masons' floor, for the stone frames of windows. The story's notes list three margin pictures (dividers or Villard de Honnecourt's notebook, the Five Sisters window at York, cut glass with a lead came); place them where their paragraphs now are, or report that you could not find a good file with a clear licence. A picture you cannot license is left out and named, never a stand-in.

**4. The World.** *Theophilus's World* goes after *More*, on the moving world, exactly as Starry Night's: `region: '../art/maps/world-pyramid.json'`, `moving: true`, `reset: 'reset'`, `fit: { west: -6, south: 37, east: 16, north: 56 }`. The data is in the story file under *Theophilus's World*. Above the line: Theophilus and the craft (Michael, 2 Oct). Below: the world. On Divers Arts is the focus. No far-away cards: the map centres on whatever is tapped. Adelard's route is `possible`, dashed. Weights as written; they are proposals. The events above the line stay in the page. The events below the line go into `stories/world-events.json` and their places into `stories/places.json`, using the ids in the story file; Paris, Bath and Jingdezhen are already there. In each world event, the last sentence of `text` is this story's `why`; the sentences before it are the shared record. Do not touch any other event in those files.

**5. The date line** is *~11,120 after the ice, or 1120*. Check the arithmetic against the constant the timeline code uses, and report.

**6. The gallery picture and the icon.** The gallery picture is a rose drawn with Glass Geometry from `models/logs/geo_rose.json`, rendered as a mark (never the child's own, and not the tab icon). Save it in `art/`. Do not choose a frame colour or a size; those are decided when it is hung. The tab icon is a separate 256-px square PNG, from the same rose. **Do not add the page to `stories/gallery.json`.**

**7. Left open, and to be named in the report, not decided:**
- Whether the table stays on screen while the words below it scroll, or appears again where *Lead, then glass* begins. Build it once, at the top, and say how far back she has to scroll to use it from *Lead, then glass*. Do not pin it.
- *again*. The frontmatter says the rose log sits behind *again*, but no sentence in the story names *again* now. Leave it as the lab serves it, and say what she sees.
- What a replay does to what she has drawn.

**8. Then.** Register the page in `MANIFEST.md`, add its line to `00-BOARD.md`, and list it in `experiments/index.html`. Run `tools/check-story.sh` on the page and `tools/check-deploys.sh`, and fix everything they report. Check it at 1440 × 1100 and on an iPad-sized window: no console errors, no failed requests, no sideways scroll, the table taking a circle under a finger, the World's line and map answering a tap, every other story page unchanged. Stop and report before committing. After Michael's yes, commit and push. It is live at its own address and hung nowhere.
