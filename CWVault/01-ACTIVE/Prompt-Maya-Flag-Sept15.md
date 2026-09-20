---
status: Claude Code prompt — 15 Sept 2026. One session, one commit.
role: Introduce the Maya flag, make "I want to Remember this" obey it on story pages, and fix the Glass Geometry claim.
---

# Prompt

Read `CWVault/00-WHAT-CW-IS.md`, then `cw-deploys/MANIFEST.md` (the Page standard section), then `CWVault/claude/Rulings-Sept-2026.md`. Do not read the whole vault.

Three changes, one commit.

**1. The Maya flag.** Create `cw-deploys/js/cw-flags.js`, a classic script (no modules, no build step), that defines `window.CW = window.CW || {}` and `CW.flags = { maya: false }`. Maya is a Claude instance that will join the site later; nothing else about her exists yet, so the flag is the only thing this file does. Load it with a version query (`cw-flags.js?v=...`) on every page under `active/`, before the page's own scripts, per the Page standard's rule for shared scripts. Register it in `MANIFEST.md` under `js/`.

**2. Remember obeys the flag on story pages.** The rule, from `00-WHAT-CW-IS.md`:

> "I want to remember this" follows the Maya flag. With Maya enabled it is visible all the time. Without Maya it is invisible until the text refers to it, and fades in as that reference comes near.

Apply it to `active/the-man-who-learned-without-knowing.html`, which is the model story page. The `#remember` block is in the left column (lines ~148–152); the text refers to it once, in the paragraph "If you'd like to play with the puzzle some more, click *I want to Remember this* on the left…" (line ~171). Mark that reference with a class (`remember-ref`) so future stories can mark theirs the same way. Behaviour: with `CW.flags.maya` true, `#remember` shows as it does today. With it false, `#remember` starts at opacity 0 and takes no pointer events; as the marked paragraph scrolls toward the middle of the window, `#remember` fades in over roughly the last 300 px of that approach, reaching full opacity when the paragraph is centred; once fully shown it stays shown for the rest of the visit, even if she scrolls back up. Keep the block in the layout at all times (opacity, not display), so nothing in the left column jumps. Use a scroll listener or IntersectionObserver, whichever is simpler and works on iPad Safari; test both directions of scrolling.

Apply the same flag to `active/about-your-brain.html` only if it has a Remember block; if it does not, leave it and say so. Do not touch the labs' Remember (`glass-geometry.html`, `glass-multiplication.html`): they have no text to refer to it, and what the rule means for a lab is an open question for Michael, not for this session. Name it in the report.

**3. Glass Geometry's claim.** In `active/glass-geometry.html`, line ~1057 reads `'The one you just made — no one has made that before.'` That is not true for most constructions. Replace it with: `'The one you just made is one of billions that could be made. Most of them have never been seen.'` Search the same file, and `glass-multiplication.html`, for any other sentence claiming a construction is unprecedented or the first, and list what you find in the report; change only the one sentence unless another is the same claim word for word.

**Housekeeping.** Bump `CW_VERSION` in every page you touched. Run `tools/check-deploys.sh`. Add one line each to `MANIFEST.md` (for `cw-flags.js`) and `CWVault/00-BOARD.md` (the Maya flag now exists; Remember obeys it on story pages; labs open). Anything this prompt leaves open, leave open and name it; do not invent. Stop and report before committing.
