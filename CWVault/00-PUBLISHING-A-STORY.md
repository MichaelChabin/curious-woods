---
status: Standing method — 15 Sept 2026. Michael to approve; then every story, interactive, and practice goes out this way.
role: The pipeline from "written" to "on curiouswoods.org", so nothing finished sits unposted.
related: 00-WHAT-CW-IS.md, Rulings-Sept-2026.md, cw-deploys/MANIFEST.md (Page standard), active/the-man-who-learned-without-knowing.html (the model page)
---

# Publishing a story

Five stages. A story is at exactly one of them at any time, and the Stories Ledger says which.

**1. Written.** The story exists as one markdown file in the vault (`CWVault/claude/Story-<name>.md`), written to `Story-Voice.md` and checked as its last section says, with its frontmatter complete: title, year (if any), the one-line timeline explanation, what it touches, links, what tools it calls, sources, and its gallery entry (the icon: a crop of the hook image or a drawn mark like the star; a frame colour; optionally a frame width; a size, per Spec-Gallery.md). Every interactive the story calls either exists already (a spec in the vault or a bench in `experiments/`) or is specified in the story's notes under "The tool this story calls": what's on the screen, what she does, what it counts, what it shows and when. Claude Code builds from names and specs; it never invents an interactive. Michael has read the words and said yes to the words. That yes is about the text; he sees the graphics at stage 3. Nothing moves until he has said it.

**2. Built.** One Claude Code session, one prompt (below). The page is built to the page standard in `MANIFEST.md`, on the model of `the-man-who-learned-without-knowing.html`: the interactives placed as the story's frontmatter says (`placement: panel`, `beside`, or `across`, per the Rulings), "I want to remember this" obeying the Maya flag. The icon goes into `art/` as a PNG. The page is registered in `MANIFEST.md` and on the board, `tools/check-deploys.sh` passes, and the session stops to report before committing. It is built into `experiments/`, committed, and pushed, so it is live at its own address but hung nowhere: the child can't find it, Michael can.

**3. Read.** Michael opens it on the iPad and the Mac and reads it as the child will, pictures and interactives in place, once as a reader and not an author. Eileen if she's about. Anything wrong goes back to stage 2 as a fix, not a redesign. This is the only way to see a story with its graphics: there is no preview short of the page.

**4. Hung.** The page moves from `experiments/` to `active/` (with a `_redirects` line so the old address keeps working), and its line goes into `stories/gallery.json` (slug, title, href, icon, frame, frameWidth, size, from the frontmatter). That's the only edit the gallery needs per story; the wall hangs it.

**5. Live.** Commit, push, Netlify builds. Open curiouswoods.org and find it in the gallery. Move the ledger line to "live."

## Two places, one truth

A chat in the CW project can write to the project's files or to the vault on disk; Claude Code sees only the vault. So any document a prompt will name (a story, a spec, a rulings page) must exist in `CWVault/` before the prompt is pasted. The manager chat keeps the two in step; when in doubt, the vault copy is the one that counts.

## Interactives and practices

The same five stages, with one difference at stage 1: an interactive or practice starts life as a bench in `experiments/` and is "written" when its spec exists and Michael has used the bench. It graduates to `active/` when a story calls it, or, for a practice or a standalone tool like About Your Brain, when Michael says it hangs on its own.

## The prompt for stage 2

Paste this, filling the two blanks:

> Read `CWVault/00-WHAT-CW-IS.md`, then `cw-deploys/MANIFEST.md` (Page standard), then `CWVault/claude/Rulings-Sept-2026.md`. Build the story in `CWVault/claude/Story-______.md` as `cw-deploys/experiments/______.html`, on the model of `active/the-man-who-learned-without-knowing.html`: same page standard, interactives placed per the story's `placement:` line (panel, beside, or across, as the Rulings define them), Remember per the Maya flag, the References section rendered after More. Icon from the story's frontmatter into `art/` as PNG. Do not add it to the gallery; Michael reads it at its own address first. Register the page in `MANIFEST.md` and add its line to `00-BOARD.md`. Run `tools/check-deploys.sh`. Anything the story leaves open, leave open and name it; do not invent. Stop and report before committing; after Michael's yes, commit and push.

## What this replaces

The seven-step build order of 10 Sept assumed a reader and a loader that would render stories from data. The brain sessions built the first stories as pages instead, and the pages are good, so this is the pipeline. A loader may come back later if hand-built pages become the bottleneck; for now they are faster and better.
