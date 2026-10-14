---
status: Written 13 Oct 2026, for Michael to paste into Claude Code, after pictures batch 1 (Pictures-Deep-01.md) was answered, applied and pushed (d3dec02). Brought up to date the same day after pictures batch 2 (Pictures-Deep-02.md, pushed 66ff710): the manifest now holds both batches, batch 2's `near` words are already in the tool, and the checks include batch 2's Mores. Run 13 Oct 2026, afternoon, in Claude Code, and pushed with Michael's timeline changes (`4b76e41`): both batches at *built*. Done; kept as the record of how the pictures are drawn. A later pictures batch needs no new build, only its entries and `near` words in `tools/pictures-manifest.py`.
role: Puts the deep-time pictures into the Mores on the Time Machine page: each picture in its More's window, with its caption and credit, read from art/stories/deep/manifest.json. The first build of the pictures kind; every later pictures batch only adds to the manifest.
---

# Prompt: pictures in the Mores

> Read `CWVault/00-WHAT-CW-IS.md`; `CWVault/claude/Story-Voice.md`, the section *The interactive*; `CWVault/claude/Rulings-Sept-2026.md`, *Pictures in a story* and *Images that support a story*; the pictures insert of `CWVault/claude/Prompt-Pool.md`; and `CWVault/claude/Pictures-Deep-01.md` and `Pictures-Deep-02.md`, their *Round 3* entries and *For the build*. Then the `MANIFEST.md` entries for `art/stories/deep/`, `stories/deep-time-periods.json` and `active/time-machine.html`.
>
> **What is there.** `cw-deploys/art/stories/deep/` holds thirty-three files (JPEGs, one PNG, three SVG drawings) and `manifest.json`, written by `tools/pictures-manifest.py`, never by hand. The manifest's `pictures` are keyed `period-<id>` (the `id` field of a period in `stories/deep-time-periods.json`, such as `hippos-in-london`) and `event-<id>` (an event's `id` in `stories/deep-time-events.json`; today `event-lucy`, `event-fern-spike`, `event-lystrosaurus` and `event-big-thwack`, the last labelled *Moon forms*). Each key holds a list in the order the More shows them. An empty list means the answer is none (*Mammoths*); a picture with `held` is not shown (none today). Each picture has `file`, `caption`, `credit`, `source`, `licence`, `author`, and sometimes `note` and `near`. Three files are SVG drawings; an `img` takes them as it takes a JPEG. A caption or credit may hold `<i>…</i>` for a name in italics and nothing else; the file is ours, so insert them as HTML.
>
> **Where the Mores are drawn.** A period's More is built inline in `active/time-machine.html`, in `showPeriod`: a heading, the official name, the span line (`rec.more.spanLine`) in `.stepped`, the paragraphs, *Known from*, the references, all put in `cwWindow`. An event's More is `cwDeepTime.moreHTML(rec)` in `js/deep-time.js`, called from `showRec`. Both windows are `.tm-more`, 460 px wide.
>
> **The job.**
>
> 1. **One function draws the pictures, on the shelf.** Add to `js/deep-time.js` a loader for the manifest (`cwDeepTime.pictures(url)`, fetched once, beside the periods store) and a function that returns a picture's HTML. Use it in both Mores, so a period and an event draw a picture the same way. Do not copy it into the page. This is the one new piece of machinery the build adds.
>
> 2. **Where each picture goes.** The first picture sits **directly below the span line** (the date line, for an event), before the first paragraph. A second picture sits **level with the paragraph that names it**: directly after the first paragraph that contains its `near` word. Batch 2's `near` words are already in the manifest (*Soft bodies* "Dickinsonia", *Trilobites* "lenses", *Dinosaurs* "Pangaea", the event *Lystrosaurus* "shovel lizard", *Moon forms* "Theia"); `pic()` in `tools/pictures-manifest.py` takes `near=`. Add batch 1's there, then rerun the tool, never editing the JSON: *Heat* "dawn redwood"; *Cooling* "Mesohippus"; *Grass* "Deinotherium"; *Lucy* "Laetoli"; *Hand axes* "Nariokotome"; *After the ice* "Tassili". If the word is not found, the picture goes after the last paragraph, and the console says so. The text never says where a picture is (Story-Voice); nothing in the Mores changes.
>
> 3. **What a picture looks like.** The picture at the window's width. A tall one (Lucy, the hippo's tooth, the Nariokotome cast, the *Deinotherium* skull, the *Titanoboa* bone) is capped at about 340 px high and centred, never cropped. Under it, the caption in the More's ink at 14 px, then the credit on its own line in the references' size and colour (`.refs`). Give the `img` its `width` and `height`, so the window does not jump as it loads: add both to the manifest from the files, in the same tool. Use `alt` from the caption with its tags stripped. Load the picture only when the More opens.
>
> 4. **A tap opens it larger.** A tap on a picture opens it in its own `cwWindow`, draggable and closeable, with the caption and credit under it. Pass the window's `<img>` as `opts.zoom`, which gives the sampler's gestures already in `js/map.js`: pinch or ctrl-wheel to 6×, drag to pan, double tap, and *Reset*. `map.js` already styles a picture in a window as a `figure` with a `figcaption`; use that. Nothing responds to hover.
>
> 5. **When it fails, nothing breaks.** If the manifest does not load, or a key is missing, the More is drawn as it is today, and the console says why once. A file that fails to load leaves no frame, only its caption and credit.
>
> 6. **The page standard.** Bump `CW_VERSION` in `active/time-machine.html` and the `?v=` on `js/deep-time.js` in the same commit. Run `tools/check-deploys.sh`.
>
> **Check, then stop.**
>
> - Open the timeline on the Mac at 1024 wide. Go down to *Mammals*, *Ice*, *Mammoths* and *The last ice age*, and open the More of each of the twelve periods of batch 3. Confirm each picture, in order, with its caption and credit. Second pictures should sit after the paragraph naming them. *Mammoths* should have none, and look exactly as before. Then open the event *Lucy* on the *Lucy* line: one picture, the same file as the period's. Then batch 2: the nine periods of the Earth's line and the Animals line (*Molten* to *Mammals*), each with its picture or two (the whale drawing on *Animals*, the Pangaea map second on *Dinosaurs*), and the events *Fern spike*, *Lystrosaurus* (the Karoo hills first, the skull by its "shovel lizard" paragraph) and *Moon forms* (two drawings, Theia's by its paragraph).
> - Tap three pictures: one wide (the Badlands), one tall (Lucy), and the map (*Ice sheets*). Each should open larger, zoom, pan and close.
> - At phone width (375), open *Grass* and *After the ice*. Nothing should overflow the window, and no caption should be clipped.
> - Open a More with no pictures (*Shells* or *Flowers*, from Periods-Deep-02) and an After-the-Ice event. They should be exactly as before.
> - Check the console for errors. Send screenshots of the *Grass* More open, the *Lucy* More open, and a picture opened larger.
> - **The ladder.** Move `Pictures-Deep-01.md`'s and `Pictures-Deep-02.md`'s status words from *changes applied* to *built*, and say so in their status lines. Update `Pictures-Ledger.md`'s *Done* line. Update `MANIFEST.md`: the `art/stories/deep/` entry is now read by `js/deep-time.js` and `active/time-machine.html`, and the page and module entries say how. Add a board entry.
> - Anything this leaves open, name it; do not invent.
>
> Stop and report before committing. After my yes, commit and push.

## Notes for us

**Why this shape.** The insert says one picture in the More, below the span line. Six Mores have two, because each raises two questions. The Rulings say a picture sits level with the text that names it, so the second picture goes by its paragraph, not stacked under the first. The anchor is a word in the manifest rather than a paragraph number, because a reworded More keeps its names.

**What this does not do.** It does not touch the After the Ice events' Mores (`openMore`), which have no pictures yet. It adds no picture to a summary, only to the More. It does not put pictures on the map or in the column. It does not start pictures batch 3 (`Periods-Deep-02.md`), which begins from `Pictures-Ledger.md` in its own session. It does not fix the Time Machine's sea curve (116.5 m against 130 at 20,000 years), which waits for the store check.

**Open, for Michael after he looks.** Whether the caption and credit want to be smaller still on a phone. Whether a picture in a More should also hang in her gallery, which the Rulings would allow.
