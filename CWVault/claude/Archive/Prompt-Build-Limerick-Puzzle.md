---
status: 28 Sept 2026. Replaces the 27 Sept drag-version prompt. The build prompt for Wordplay (the limerick puzzle), per Publishing-a-Story.md. Paste the quoted block into one Claude Code session at the root of `_CW`.
role: Build prompt. The spec is CWVault/claude/Limericks-Puzzle.md; the tricks are CWVault/claude/Poetry-Tricks.md; the behaviour to match is CWVault/claude/mockups/limerick-compose-mockup.html (Michael's yes, 28 Sept). The older limerick-puzzle-mockup.html (dragging) is superseded; don't build from it.
---

# Build prompt: Wordplay

> Read `CWVault/claude/What-CW-Is.md`, then `cw-deploys/MANIFEST.md` (Page standard), then `CWVault/claude/Rulings-Sept-2026.md` and `CWVault/claude/Story-Voice.md`. Then read the spec, all of it, `CWVault/claude/Limericks-Puzzle.md`, and `CWVault/claude/Poetry-Tricks.md`. Then open the mockup, `CWVault/claude/mockups/limerick-compose-mockup.html`, in a browser and play it: the Opening and *Next*, three or four limericks (one with a wrong tap, one finished only with *Next line, please*, and Bright with its third and fourth lines tapped the other way round), a title given, a postcard with a note, a limerick kept and opened again from *My list*. Michael has used the mockup and said yes to it. The build matches its behaviour and its words; it is not a redesign. Ignore `limerick-puzzle-mockup.html`, the older dragging version.
>
> This is not a story page. It is a puzzle that hangs in the gallery, so it does not use `template-story.html`, and `check-story.sh` does not apply. It follows the Page standard in everything else (head, title, tab icon, Georgia, the Maya flag via `js/cw-flags.js`). Its name on the wall and in the tab is **Wordplay**.
>
> **1. The limericks, as data.** Put the pool in `stories/limericks.json`, one record per limerick: `id`, `lines` (five), `credit`, `ease` (easy, middle, hard), and where the spec gives them `title`, `intro`, `swap` (the pair of line numbers that may change places), `picture`. Forty limericks: the twelve at the top of the spec's list and the twenty-eight in *The next 28*. Take every word, credit and mark from the spec, not from memory. The page reads the file, so the pool can grow without touching the page. The Lear *beard* limerick is not in the pool; it lives in the Opening.
>
> **2. Check the twelve anonymous newcomers (29 to 40).** Find each one in a printing before 1931: Carolyn Wells, *A Nonsense Anthology* (1902, Project Gutenberg #9380); Wells, *The Book of American Limericks* (1925); Langford Reed, *The Complete Limerick Book* (1924); or, for Nantucket, the *Princeton Tiger*, 1902. Where the printed wording differs from the spec, use the printed wording and say what changed. Any you can't find in a pre-1931 printing comes out, and a Lear from *A Book of Nonsense* goes in its place: choose one a ten-year-old would laugh at, nothing cruel, and say which. Nantucket stays in if it checks out (Michael, 28 Sept). Record what you found, one line each, in the spec under *The next 28*.
>
> **3. Pictures.** Fetch Lear's own drawings, public domain, from the best clean scans (Wikimedia Commons, Project Gutenberg #13646 for *A Book of Nonsense*, the 1872 *More Nonsense*): the Old Man with a beard for the Opening, and one for each Lear limerick in the pool (the bush and the sixteen newcomers, 13 to 28). Save originals and a `SOURCES.md` (where each came from, the licence) in `art-originals/limericks/`, web copies in `art/stories/limericks/` (or wherever the art reorganisation put story art; say which), and name each file in its record's `picture`. A limerick with a picture offers *Add the picture* on the postcard; one without doesn't. Niger's map is not in this build.
>
> **4. The page.** `cw-deploys/experiments/wordplay.html`, built from the mockup:
> - The parchment; a plain ← at the top left above it (back to the page she came from, or the gallery if there is none; no page has had one before, so say so in the report); *My list* at the top right once her list has anything on it.
> - **The Opening**, a page of its own, the first time she comes: the Lear text exactly as the spec gives it, the drawing where the mockup's placeholder is, the beard limerick, and then "In what follows, the lines of the limerick will appear in a stack under *Ideas*. Your job is to compose the limerick by tapping the ideas in the right order." *Next*, bottom right, brings the first limerick, which is Niger.
> - **Each limerick:** its `intro`, if any, at the top in the faded type; a line kept for the title; a small gap; the poem; the credit.
> - **Ideas:** the five lines shuffled, bottom right, under a faint rule and the label IDEAS, smaller and in italics. For her first three limericks, beside IDEAS in lower-case italics: "(tap the line you think comes next)". She taps the idea that is the next line; it fades away and the line is typed into the poem, letter by letter, with the cursor and the quiet synthesized keys, one line at a time; lines 3 and 4 indented. Every line must be tapped, even the last. A wrong tap does nothing (Michael may later want a small shake; leave a clear place for it). A `swap` pair may be tapped in either order.
> - *Next line, please* under the ideas: taps the next line for her.
> - **When the poem is whole:** the bell, after the last line is typed; the credit fades in; the poem's `title` if it has one; if not, *Give it a title* in the title line, a plain field she types into with her own keyboard, saved as she types. If she typed a `swap` pair the other way round, the note from the mockup: "In the original, the third and fourth lines are the other way round:", the two lines, "But your arrangement works every bit as well." Then *Write it again* at the left and *Another one* at the right, and *Share Postcard* and *Keep on my list* centred below them.
> - Words that do things are Payne's grey, `#546A80`, hover `#3d5266` (the Remember note's colours). No on-page keyboard and no *Say it*: both are deferred to a site-wide design (Michael, 28 Sept).
>
> **5. Order.** After the Opening and Niger, a fresh random order each visit, never the same limerick twice in a row, leaning toward `easy` ones for her first few. Nothing is gated.
>
> **6. Share Postcard.** Glass Geometry's Postcard is the model (`active/glass-geometry.html`, around `renderPostcardPNG` and `navigator.share`): the share sheet where the browser has one, a download where it doesn't. The card holds, from the top: her note (*Your note*), the limerick's picture if she tapped *Add the picture*, the title (the poem's or hers), the poem as she composed it, its credit. She cannot upload a picture of her own.
>
> **7. Her list.** *Keep on my list* puts the poem on her list; on a kept poem the word reads *Take it off my list*. *My list* opens Glass Geometry's picker window listing each kept limerick by title (hers, or its own) or else its first line, with the credit under it. Tapping one opens it whole, with *Write it again* to scramble it and compose it again. No dates, no counts. Kept limericks should one day also show in the gallery's Saved Stories (Michael, 28 Sept); not in this build, but name it in the report.
>
> **8. Her device, and nothing else.** In her browser's storage only, every call wrapped so the page still works without it: whether she has seen the Opening; how many limericks she has done (for the reminder); the last few she saw (for the order); her list; her titles. Nothing leaves her device.
>
> **9. Not in this build:** Remember (`maya: none`); the trick notes in `Poetry-Tricks.md` beyond the two intros the spec already gives (Niger, the pelican); search; the Niger map.
>
> **10. Gallery picture and icon.** The gallery picture is a drawn mark, not a picture from any one limerick: five lines on parchment in the limerick's shape (long, long, short and indented, short and indented, long), in ink, the last line half typed with the cursor showing. Real words or plain strokes, whichever reads better at wall size; try both, pick, and say which. `art/gallery/wordplay-gallery.svg` (or PNG). Frame: dark walnut, about `#5a4632`; frame width 8; size small. The tab icon is a 256-px square PNG of the same mark, `art/icons/wordplay-icon-256.png`.
>
> **11. Checks.** Register the page in `MANIFEST.md` and add its line to `00-BOARD.md` at stage 2, Built. Run `tools/check-deploys.sh` and fix what it reports. Try it at phone width and desktop width, with a mouse and, if you can, a finger: the Opening and *Next*; the reminder for three limericks and then gone; a wrong tap doing nothing; lines typed one at a time; a swap pair reversed and the note; *Next line, please* finishing a poem alone; the bell after the last line; a title typed and on the postcard; the postcard with and without a Lear drawing and with a note; keep, *My list*, reopen, *Write it again*; the back arrow; the page with storage blocked. Anything the spec leaves open, leave open and name it; don't invent. Stop and report before committing: what the anonymous check found and what changed, where the drawings came from, which gallery mark you chose, what the checks said, anything that didn't resolve. After Michael's yes, commit and push.
>
> **12. Hanging, only after Michael has read the page at its own address and said to hang it.** Move it from `experiments/` to `active/wordplay.html` with a `_redirects` line so the old address still works, add its line to `stories/gallery.json` (slug `wordplay`, title `Wordplay`, href, the gallery picture, frame, frameWidth, size), move its board line to Hung, commit and push, and check it on curiouswoods.org.

---

# Fixes, 29 Sept 2026 (Michael's testing)

Paste this block into one Claude Code session at the root of `_CW`. The mockup `CWVault/claude/mockups/limerick-compose-mockup.html` has all four fixes in it; match it.

> Read `cw-deploys/MANIFEST.md` (Page standard), then open the Wordplay page wherever it now is (`cw-deploys/experiments/wordplay.html`, or `active/` if it has been hung) and the updated mockup, `CWVault/claude/mockups/limerick-compose-mockup.html`. Four fixes; nothing else on the page changes.
>
> **1. ← goes back one page inside Wordplay.** Keep a trail of the pages she has seen in this visit: the Opening, and each limerick with her arrangement if she finished it. ← goes back to the previous one: a finished limerick comes back whole, as she composed it, with her title; an unfinished one comes back freshly scrambled. With nothing earlier in the trail, ← goes to the gallery. The trail is for this visit only and is never stored.
>
> **2. *The Curious Woods*, beside the ←,** a word in the Payne's grey (`#546A80`), which always goes to the gallery.
>
> **3. No idea starts in its own place.** When the ideas are shuffled, no line may sit at the position in the stack that it takes in the poem, and for a limerick with a `swap` pair, neither line of the pair may sit at either of those two positions. (Of the 120 orders of five lines, 44 qualify; with a swap pair, 24.) Reshuffle until the order qualifies.
>
> **4. *Give it a title* gets out of the way.** When she taps it, the words vanish, and the field shows only the blinking cursor and the faint line under it. If she taps away having typed nothing, *Give it a title* comes back.
>
> Run `tools/check-deploys.sh`. Try each fix at phone and desktop width. Restamp the page. Stop and report before committing; after Michael's yes, commit and push.

---

# The column and her poems, 29 Sept 2026 (Michael)

Paste this block into one Claude Code session at the root of `_CW`, after the *Fixes, 29 Sept* block has been done. The mockup `CWVault/claude/mockups/limerick-compose-mockup.html` has all of it; match it.

> Read `cw-deploys/MANIFEST.md` (Page standard) and `CWVault/claude/Limericks-Puzzle.md` (the section *The column and her poems*). Open `cw-deploys/active/wordplay.html`, `cw-deploys/active/glass-geometry.html` and the updated mockup, `CWVault/claude/mockups/limerick-compose-mockup.html`. Wordplay's controls move into Glass Geometry's left column, and she gets a way to see her own poems. Use Glass Geometry's own column and panel code and look (`#htw-panel`, `.htw-item`, `.htw-action-word`, the `htw-canvas` window that drags and closes), not a copy that drifts from it; if that means lifting it into a shelf file both pages load, do so and say so.
>
> **1. The column,** top left, as in Glass Geometry: *How this works*, then two bulleted items, **Compose** and **Save and Share**, then the italic command words *Share*, *Add to my list*, *Show my poems*, *Go to previous*. On a phone the column folds above the page, as Geometry's does.
>
> **2. The two items** each open a small panel she can drag and close, with exactly this text:
> - **Compose:** "The lines of your poem are in a jumbled stack below the word IDEAS. Find the first line and tap it. It will be typed on the sheet. Do the same with the next line and each line that follows." / "When it is complete, you can give it a title."
> - **Save and Share:** "To add this poem to your list of favorites, tap *Add to my list*." / "You can see your list by tapping *Show my poems*." / "To share your poem as a postcard, tap *Share*."
>
> **3. The commands appear only when they can do something,** fading in as Geometry's do. *Share*, when the poem is finished: it opens the postcard (as *Share Postcard* did). *Add to my list*, when a new poem is finished: it puts the poem on her list as she composed it, with her title; then it reads *On my list*, greyed. *Show my poems*, once her list has anything on it. *Go to previous*, once there is a page to go back to: it does what ← did (the trail of this visit).
>
> **4. *Next*** at the bottom right of the poem area replaces *Another one*: a new poem, or, when she is looking at her own, her next one.
>
> **5. Her poems.** *Show my poems* changes to *Show new poems* and the page shows only the poems on her list, one at a time, whole, as she composed them, with her title in the title line (she can change it, or give one). No ideas. Under the credit, **Notes:** and a box where she writes what she likes; it is kept with the poem. Under the notes, at the left, *Remove from my list*: the poem comes off and her next one shows; when the last one goes, the page returns to new poems and *Show my poems* disappears. *Show new poems* goes back to composing.
>
> **6. What goes.** The ← arrow (replaced by *Go to previous*); *The Curious Woods* stays at the top and goes to the gallery. *My list* and its window, *Keep on my list*, *Share Postcard*, *Write it again* and *Another one* all go. *Next line, please* stays under the ideas.
>
> **7. Her device.** Her poems, their arrangements, titles and notes are kept in her browser's storage and nowhere else, calls wrapped as before. The trail is never stored.
>
> Run `tools/check-deploys.sh`. Try it at desktop and phone width: both panels open, drag and close; each command appears only when it should; add a poem, give it a title, *Show my poems*, write a note, *Next*, *Go to previous*, *Remove from my list* down to none; *Share* in both modes. Restamp the page. Stop and report before committing; after Michael's yes, commit and push.
>
> **Amended 29 Sept, after Michael saw the mockup (these override the items above):** *Next line, please* is gone entirely. *The Curious Woods* moves to the top of the left column, above *How this works*, in bold, and goes to the gallery; nothing sits above the parchment. The column is a pale strip down the left edge (`#f7f4ec`, a hairline `#d6c9ad` at its right), so its words stand out against it; on a phone the strip becomes a pale band across the top.

---

# One home for the texts, 29 Sept 2026 (Michael)

Paste this block into one Claude Code session at the root of `_CW`.

> The limericks now live in one place: `cw-deploys/stories/limericks.json`. `CWVault/claude/Limericks-Puzzle.md` no longer carries the poems' words; it keeps the decisions, sources and checks, and lists what is live (read its section *The limericks: where they live*). Three small edits, nothing else:
>
> 1. In `stories/limericks.json`, change `about` so it says the file is the only home of the texts (add a record to add a limerick), that Wordplay is at `active/wordplay.html`, and that the spec keeps decisions, sources and checks, not the words. Drop "Every word from CWVault/claude/Limericks-Puzzle.md".
> 2. In the comment at the top of `active/wordplay.html` and in Wordplay's line in `MANIFEST.md`, say the same in a sentence.
> 3. In the spec, under *What changed at the build*, add one line per limerick that came in or went out at the build, saying what you found when you checked it (the pre-1931 printing and page, or why it was dropped). Don't change anything else in the spec.
>
> Run `tools/check-deploys.sh`. Stop and report before committing; after Michael's yes, commit and push.
