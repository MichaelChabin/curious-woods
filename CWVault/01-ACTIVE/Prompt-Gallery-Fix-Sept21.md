---
status: Claude Code prompt — 21 Sept 2026. One session, one commit.
role: Put the art gallery back: whole pictures at their own proportions, frames that follow them.
---

# Prompt

Read `CWVault/20-SPECS/Spec-Gallery.md` again; its "A work on the wall" section changed today. The first gallery build made every picture a 256-px square and cropped the paintings to fit. That was a misreading, and the spec now says so plainly: **a gallery picture hangs whole, at its own proportions; a painting or print is never cropped; only the drawn marks (star, three dots, brain, ensō) are square.** The wall's CSS already lets widths vary and takes frame colour and width per work, so this is about the picture files and the data, not the layout.

Do this:

1. In `cw-deploys/art/`, for every gallery picture that is a painting or print, make an uncropped version from the original already in `art/` (e.g. `Hokusai Great Wave.jpg`, `Vermeer Girl with Perl Earring.jpeg`): whole image, about 600 px on the long side, JPEG, named `<slug>-gallery.jpg`. Leave the `-icon-256.png` files where they are; they are tab icons and the Page standard needs them square. Do not make gallery versions of the drawn marks; they hang as they are.

2. In `stories/gallery.json`, rename the field `icon` to `picture` on every entry (keep reading `icon` in the page as a fallback), and point each painting's `picture` at its new `-gallery.jpg`. Set `size` by what the picture is: a landscape print like the Wave hangs `large` or `medium` at full width; a portrait like the Vermeer hangs `medium` and tall; drawn marks stay `small` or `medium`. Frame colour and width stay per work; check each frame colour still suits its picture now that the whole picture shows.

3. In `index.html`, confirm nothing forces a square: no `aspect-ratio`, no `object-fit: cover`, no fixed height on `.frame img`. If any exists, remove it. Practice keeps its square ensō in the centre; that is the one square that is always the same and always in the same place.

4. Update the story pages' frontmatter where they name an `icon:` for the gallery, to `picture:` with the whole image. Tab icons unchanged.

Bump `CW_VERSION` on every page touched, run `tools/check-deploys.sh`, update `MANIFEST.md` (the new `-gallery.jpg` files, with their sources) and `00-BOARD.md`. Anything unclear, leave open and name it; do not invent. Stop and report before committing.
