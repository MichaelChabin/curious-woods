---
status: 26 Sept 2026. A one-session Claude Code job; paste the prompt below whole. Michael asked for it after the Frankenstein pictures landed in a folder of seventy files.
role: Move cw-deploys/art/ from one flat folder into folders by kind and by story, rewriting every reference so nothing on the site or in the vault points at an old path.
related: Publishing-a-Story.md, Story-Pattern.md, Spec-Gallery.md, cw-deploys/MANIFEST.md, tools/check-deploys.sh
---

# Prompt: reorganise `cw-deploys/art/`

> Read `CWVault/00-WHAT-CW-IS.md`, then `cw-deploys/MANIFEST.md`, then this file. The job is to move `cw-deploys/art/` from one flat folder of about seventy files into the shape below, and to rewrite every reference so that nothing points at an old path. Do it with one script in `tools/` (`tools/reorganise-art.py` or `.sh`), so the whole move is reviewable and repeatable, not by hand. Nothing is deleted. Stop and report before committing.
>
> **The shape.**
>
> ```
> art/
>   icons/       every *-icon-256.png and *-icon-256.svg (the browser-tab icons)
>   gallery/     every *-gallery.jpg and *-gallery.png (the pictures hung on the wall)
>   maps/        as it is now; do not touch its contents
>   palette/     the sixteen paintings from March that palettes.json was made from, plus palettes.json
>   stories/<slug>/   everything else, by the story that uses it
>   shared/      a picture used by more than one story
> ```
>
> **Which story a picture belongs to** is decided by who references it, not by its name: grep every `.html`, `.js`, `.json` and `.css` under `cw-deploys/` for `art/<name>` and put the file in the folder of the page that names it, using the page's slug from `MANIFEST.md` (`vermeer-girl-with-a-pearl-earring` → `stories/vermeer/`; keep slugs short and plain: `vermeer`, `hokusai`, `van-gogh`, `necker`, `brain`, `three-at-a-glance`, `frankenstein`, `glass-geometry`, and so on; say which you chose). A picture named by two stories goes to `shared/`. A picture named by nothing is **reported and left where it is**, not moved and not deleted; the six Frankenstein pictures have no page yet and go to `stories/frankenstein/` on the strength of the story's frontmatter in `CWVault/claude/Story-Have-You-Thought-of-a-Story.md`.
>
> **The palette paintings** get plain names as they move: lowercase, hyphens, no spaces, spelling fixed, `.jpg` throughout (`Vermeer Girl with Perl Earring.jpeg` → `palette/vermeer-girl-with-a-pearl-earring.jpg`, `Sargent 4 Girls.jpeg` → `palette/sargent-four-girls.jpg`, `Sun surface closup.jpg` → `palette/sun-surface-close-up.jpg`). Rewrite `palettes.json`, `experiments/gallery/home-mock-salon.html` and `experiments/fills-and-light.html` to match; those are the only files that use them, but check.
>
> **Rewriting references.** After the move, every reference in every `.html`, `.js`, `.json`, `.css` and `.md` under `cw-deploys/` is rewritten to the new path, whether written as `art/x`, `../art/x`, `/art/x`, or `./art/x`; keep each reference's own prefix and change only the part after `art/`. Then grep the whole deploy for `art/` and confirm that every remaining reference resolves to a file that exists. Run `tools/check-deploys.sh` and `tools/check-story.sh` on every page in `active/`, and open three pages in a browser (Vermeer, Starry Night, the gallery `index.html`) to see that the pictures, icons and gallery wall all load. No `_redirects` entries: nothing outside the site links to `art/`.
>
> **The vault.** The story files in `CWVault/claude/Story-*.md` name their pictures in frontmatter (`icon.from`, `icon.file`, `gallery.picture`, `image.file`, `images[].file`, `maps`); rewrite those paths too. Then update the three places that tell future sessions where art goes: `CWVault/claude/Publishing-a-Story.md` (stage 2 says "The icon goes into `art/` as a PNG": now `art/icons/`, and the story's pictures into `art/stories/<slug>/`, the gallery picture into `art/gallery/`), `CWVault/claude/Story-Pattern.md` (add one line under "Building on what came before"), and the comments in `cw-deploys/template-story.html`. Add the folder shape above to `MANIFEST.md`. Note in `00-BOARD.md` that the move happened and the date.
>
> **Also:** add `art-originals/` to `.gitignore`. Remove `art/.DS_Store` from the tree and add `.DS_Store` to `.gitignore` if it isn't there.
>
> Report: the folder listing after the move; the list of files that were referenced by nothing and were left in place; the number of references rewritten and in how many files; the output of the two check scripts; and anything that did not resolve. Then stop. Nothing is committed until Michael has read the report.
