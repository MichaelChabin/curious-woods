---
status: Prompt for Claude Code, 20 Sept 2026. Paste the block below. Part 2 is Michael's to keep or strike.
role: Brings the star story page and About Your Brain into line with the ruling "The hippocampus is the librarian" (Rulings-Sept-2026.md, *The brain*).
---

# Prompt: the hippocampus is the librarian

> Read `CWVault/claude/Rulings-Sept-2026.md`, the section *The brain*, including "The hippocampus is the librarian (20 Sept 2026)". This job changes text only: no layout, no code logic, no localStorage keys.
>
> The two brain pages are built from templates in `cw-deploys/experiments/brain/src/` by `build.py`, which inlines the two brain paintings. Edit the templates, never the built files by hand. After running `build.py`, update the deployed copies in `cw-deploys/active/` (`the-man-who-learned-without-knowing.html` and `about-your-brain.html`) the same way they were produced before — check `git log` for those files to see how; if they were copied from the build output, copy again. Each replacement below is exact: find the old text, replace it with the new, and change nothing else. If any old text is not found exactly once, stop and report rather than guess.
>
> **Part 1 — `hm-page.template.html` (The Man Who Learned Without Knowing)**
>
> 1. Old: `The hippocampus, it turned out, is where the brain writes down <em>what happened.</em> Say it "hippo-CAMP-us"; it's named after a seahorse, because it's curled like one. You have two, one on each side, deep in the middle of the head, about level with your ears. Henry's were gone, so nothing new got written down. The pen was missing.`
>    New: `The hippocampus, it turned out, is the brain's librarian. Say it "hippo-CAMP-us"; it's named after a seahorse, because it's curled like one. You have two, one on each side, deep in the middle of the head, about level with your ears. When something happens to you, neurons — the brain's working cells — fire together all over your brain, and the hippocampus keeps track of which ones, so they can fire together again later. That is what remembering is. Henry's were gone, so nothing new could be found again. The librarian was missing.`
>
> 2. Old: `the hippocampus writes down <em>what happened,</em> and his couldn't.`
>    New: `the hippocampus keeps track of <em>what happened,</em> and his was gone.`
>
> 3. Old: `you:'Before you begin: experience sends conscious thought the last trip, the bumps and the feeling. You already expect this to be hard.'`
>    New: `you:'Before you begin: conscious thought asks the librarian for the last trip, the bumps and the feeling. You already expect this to be hard.'`
>
> 4. Old: `you:'Afterwards: the trip is sent to experience and written down, bumps and all. Tomorrow you will remember that it was hard.'`
>    New: `you:'Afterwards: the librarian keeps track of this trip, bumps and all, so it can be found again. Tomorrow you will remember that it was hard.'`
>
> 5. Old: `henry:'Afterwards: the trip is sent to be written down. It reaches the place where experience was. Nothing is there, and the signal goes out. Tomorrow the star will be new again. His hand will still know it.'`
>    New: `henry:'Afterwards: the trip is sent to be filed. It reaches the place where the librarian was. Nothing is there, and the signal goes out. Tomorrow the star will be new again. His hand will still know it.'`
>
> **Part 2 — `atlas.template.html` (About Your Brain)**
>
> 6. In the region table, the hippocampus entry. Old: `['hippocampus', 'experience', 'This is where the brain writes down what happens to you, so you can remember it later: where you left your shoes, what your friend said yesterday. It also holds your map of every place you know.`
>    New: `['hippocampus', 'the librarian', 'This is the brain\'s librarian. Whenever something happens to you, neurons all over your brain fire together, and this keeps track of which ones, so they can fire together again later: where you left your shoes, what your friend said yesterday. That is what remembering is. It also keeps your map of every place you know.`
>    (The rest of that entry, from "It is called the hippocampus" to the end, stays as it is. Mind the escaped apostrophe.)
>
> 7. Old: `line:'150 ms: conscious thought asks experience, the part that wrote down what happened.'`
>    New: `line:'150 ms: conscious thought asks the librarian, which kept track of what happened.'`
>
> 8. Old: `line:'300 ms: experience replays the scene to the back of the head, where seeing starts. You see the shoes by the door, faintly, with your eyes open.'`
>    New: `line:'300 ms: the librarian sets the same neurons firing again, at the back of the head, where seeing starts. You see the shoes by the door, faintly, with your eyes open.'`
>
> 9. Old: `line:'200 ms: experience compares it with every position this brain has seen.`
>    New: `line:'200 ms: the librarian compares it with every position this brain has seen.` (rest of that line unchanged)
>
> 10. Old: `line:'125 ms: experience recognizes the pattern. Three notes were enough.'`
>     New: `line:'125 ms: the librarian recognizes the pattern. Three notes were enough.'`
>
> 11. Old: `line:'150 ms: conscious thought asks experience for the face.'`
>     New: `line:'150 ms: conscious thought asks the librarian for the face.'`
>
> 12. Old: `line:'300 ms: experience replays it to where seeing starts. You see the face faintly, with your eyes open. This is imagining.'`
>     New: `line:'300 ms: the librarian sets it firing again where seeing starts. You see the face faintly, with your eyes open. This is imagining.'`
>
> 13. In the Wernicke entry, old: `after the doctor who noticed` — new: `after the neurologist who noticed` (the voice rule: a person's specific work, never "doctor").
>
> Then check: `grep -n "writes down\|written down\|wrote down\|experience sends\|sent to experience\|where experience" ` over both templates and both files in `active/` should find nothing; `grep -c "librarian"` should find the new text in all four. Open both pages in a browser, run *your brain, tracing the star* and *Henry's brain, tracing the star* on the story page and at least the shoes and the face on the atlas, and read the new lines as they appear. Stop and report before committing.

---

## Notes for us

**Why Part 2 exists.** The atlas gives each region a plain name — *where seeing starts*, *how many*, *getting better at things* — and the hippocampus's was *experience*. The star page borrows those names in its leg narration ("sent to experience"). The Rulings say the brain is one painting with one set of names in both places, so renaming the hippocampus in the story means renaming it in the atlas. *The librarian* fits the pattern of the other plain names, and it is Michael's word. If he'd rather keep *experience* as the region's name and use "librarian" only as a description, strike Part 2 and change items 3–5 back to say *experience* where they name the place.

**Two lines are better than before, not just consistent.** "The librarian sets the same neurons firing again, at the back of the head, where seeing starts. You see the shoes by the door" is the re-experiencing idea from *Numbers and Your Brain*, and it is what the atlas animation already shows. "The librarian was missing" keeps the rhythm of "The pen was missing" and is truer.

**The story document.** `Story-The-Man-Who-Learned-Without-Knowing.md` has been updated to the new text now, with a status note that the page rebuild is pending, so the doc and the page agree as soon as this prompt has run.

**Not in this prompt.** The cube story is only a document so far (Draft 2.1), and it already uses the librarian.
