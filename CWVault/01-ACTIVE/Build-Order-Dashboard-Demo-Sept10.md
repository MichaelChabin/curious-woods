---
status: Proposed 10 Sept 2026 — Michael to approve. Then one step per Mac afternoon.
role: The order of work to get a demo dashboard live at curiouswoods.org, with icons that open stories a child can read.
related: 00-WHAT-CW-IS.md, 01-ACTIVE/Brief-Reader-Prototype-Aug31.md, 20-SPECS/Spec-Timeline-Intro.md, 01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md, 02-CONSTELLATIONS/Frankenstein-11816/
---

# Build order — the dashboard demo

## What "done" looks like

curiouswoods.org opens on a dashboard: six story icons and one practice icon. Tap a story and, if it has a year, After the Ice runs first; then the story, in the flowing form of *The Man Who Learned Without Knowing*. Links in the story open a preview (image, a short paragraph, a Read button); Read opens that story. The left column holds her trail, her list, and Remember. That's the whole demo. Eileen can sit down cold and find something she likes within three taps.

## Scope fence

In: the Frankenstein constellation as the linked web; the brain stories (Three at a Glance, The Man Who Learned Without Knowing, the Necker cube page as it stands); After the Ice on dated stories; trail and list as local state on the device.

Out, until the demo has been seen: Maya; search; asides beyond the red-link list; the mirror-star and Brain Map tools (the story says "try it" and the tool is a placeholder until step 7); postcards; any Glass work. The labs stay live at their old addresses but leave the dashboard.

## The steps

Each step is one Claude Code session with one prompt. Every prompt points at files rather than restating them, names what is open and says not to invent it, and stops to report before committing. Each commit updates MANIFEST.md and 00-BOARD.md.

**0. Michael, first, on the Mac.** Read the Frankenstein hub and nodes. Choose the six dashboard stories (a suggestion: Frankenstein, Tambora, Sophie Germain, Darwin's "I think", The Man Who Learned Without Knowing, Three at a Glance). Say yes or no to this order. Nothing is built before this.

**1. Story format and loader.** One story = one markdown file with frontmatter (title, year, hook image plus a square crop box for its dashboard icon, preview paragraph, touches, links, calls) and a body in the flowing form. The icon is never separate artwork: it is a detail of the hook image, cut by the script; the Frankenstein nodes already have most of the frontmatter. Stories live in the repo at `cw-deploys/stories/<slug>.md`. A small script in `tools/` reads them all and writes `cw-deploys/stories/stories.json` plus a red-link report (links with no story behind them: the to-write list). Run by hand, output committed; no build step on Netlify. The script also moves the Frankenstein nodes across and reports what frontmatter is missing.

**2. The reader.** `cw-deploys/reader.html?story=<slug>`. Right side: After the Ice at the top when the story has a year (reuse the timeline bench's code as a component; scrollable back to), then the story rendered from markdown, "More:" at the end, links live. A link opens the preview card; Read on the card opens the story and adds it to the trail. Left column per the Interface Standard: trail, my list, Remember. Local storage only. Georgia. Tested on the iPad.

**3. The dashboard.** `index.html` becomes the dashboard: six story icons and one practice icon, nothing else. The old index moves to `experiments/` and the labs get `_redirects` entries so their old addresses keep working. Her dashboard timeline (the accumulating copy, with zoom) is a later step; for the demo the dashboard is icons.

**4. Images.** Ten or so hook images from Wellcome, Gallica, Commons, or Gutenberg, resized into `cw-deploys/art/`, source and licence recorded in each story's frontmatter. Without images there is no demo.

**5. Voice pass.** The six dashboard stories rewritten where needed into the flowing form, in the voice of the Henry story and the calibration drafts: first person where it strengthens, testimony by name, one beat each, dates with commas, the specific word for a person's work. Michael reads each; nothing ships he hasn't read. The remaining Frankenstein nodes stay as previews and get written out later, in the order the red-link report says they're wanted.

**6. Live.** Deploy. Check curiouswoods.org on the Mac, the iPad, and a phone. Eileen's cold-start test: something she likes within three taps; the Archimedes detour (leave, learn, return, not lost); three unprompted "wait, they knew each other?" moments in ten minutes.

**7. Then, not before.** The mirror-star tool from the Henry story's spec, called from the story. The dashboard timeline. Asides. Search. Each one its own step, in that order unless the demo says otherwise.

## Time

Steps 1 to 3 are code and go quickly: three afternoons. Step 4 is an afternoon. Step 5 is the slow one and depends on Michael's reading; call it a week. So: a rough demo you can click through in about a week, and one Eileen would call good in two or three, with the difference being writing, not machinery.
