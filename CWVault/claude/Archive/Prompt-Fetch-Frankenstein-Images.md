---
status: 26 Sept 2026. A one-session Claude Code job; paste the prompt below whole. Written because the CW chat session's network cannot reach the Bodleian, Wikimedia or Wellcome image servers.
role: Fetch the five images for Story-Have-You-Thought-of-a-Story.md into cw-deploys/art/, at the sizes the page standard wants, with source and licence recorded.
related: claude/Story-Have-You-Thought-of-a-Story.md (the `image:` and `images:` frontmatter), Rulings-Sept-2026.md (Images that support a story), Story-Vermeer-Girl-with-a-Pearl-Earring.md (the sizes used there)
---

# Prompt: fetch the Frankenstein images

> Read `CWVault/00-WHAT-CW-IS.md`, then the `image:` and `images:` blocks in the frontmatter of `CWVault/claude/Story-Have-You-Thought-of-a-Story.md`. Fetch the five pictures below into `cw-deploys/art/`, resized as stated, and do nothing else to the story or the site. Keep the full-resolution originals outside git, in `_CW/art-originals/frankenstein/`, with the source URL in a `SOURCES.md` beside them. Stop and report before committing.
>
> **1. The notebook page (the object).** Bodleian MS. Abinger c. 56, folio 21r. IIIF image: `https://iiif.bodleian.ox.ac.uk/iiif/image/5359a811-63e4-49d7-8cc1-e6b4308a7969` — fetch `/full/full/0/default.jpg` as the original (3847 × 5342) and save `art/frankenstein-draft-21r.jpg` at 1400 px wide, quality about 86, and `art/frankenstein-draft-21r-gallery.jpg` at 600 px wide, whole page, own proportions, never cropped. Confirm on the image that the top line under "Chapter 7th" reads "It was on a dreary night of November" and that "handsome" with "Beautiful" above it is about fifteen lines down; report the line count. Licence CC BY-NC 4.0; credit "MS. Abinger c. 56, fol. 21r. Image: Bodleian Libraries, University of Oxford", link `https://digital.bodleian.ox.ac.uk/`.
>
> **2. The 1818 title page.** Wikimedia Commons, `File:Frankenstein_1818_edition_title_page.jpg`. Original via the Commons API (`action=query&titles=File:...&prop=imageinfo&iiprop=url`). Save `art/frankenstein-1818-title-page.jpg` at 600 px wide (a margin picture). Public domain. Confirm there is no author's name on it.
>
> **3. Aldini's plate.** Wellcome Collection, Giovanni Aldini, *Essai théorique et expérimental sur le galvanisme* (Paris, 1804), the plate showing the bodies and heads wired to the pile — catalogued as "Pl. 4", work `gz4mz66v`; the book is work `shwpkszx`, digitised as `b29272130`. Use the Wellcome IIIF (`https://iiif.wellcomecollection.org/image/<id>/full/1200,/0/default.jpg`; the id is in the work's IIIF manifest at `https://iiif.wellcomecollection.org/presentation/v3/b29272130`). If plate 4 is not the one with the bodies, pick the plate that is, and say which. Save `art/aldini-1804-plate.jpg` at 600 px wide. Public Domain Mark; credit "Wellcome Collection".
>
> **4. Galvani's frogs.** Luigi Galvani, *De viribus electricitatis in motu musculari commentarius* (Bologna, 1791), the plate with the prepared frogs on the bench and the wire (Tab. I or Tab. III; take the one where the frog legs are plainest). Commons has it under several names (search the Commons API for `Galvani De viribus electricitatis`); the Wellcome has the book digitised too. Take the cleanest scan; say which plate and which file. Save `art/galvani-1791-frogs.jpg` at 600 px wide. Public domain.
>
> **5. The Villa Diodati.** "Diodati, the residence of Lord Byron", drawn by William Purser, engraved by Edward Finden, about 1833, from Finden's *Landscape Illustrations to Byron*. On Commons (search the API for `Villa Diodati Finden`), at pdimagearchive.org (`images/ee52f7dc-84c1-4cef-ba76-9badc8849309`), and at the British Museum (1868,0822.4583). Take the cleanest copy of the uncoloured engraving; say which. Save `art/villa-diodati-finden.jpg` at 600 px wide. Public domain.
>
> For each file, record in `SOURCES.md`: the URL fetched, the original's pixel size, the licence, and the credit line. If any host refuses, say so and move on; do not substitute a different picture without saying so. Do not touch `MANIFEST.md`, `gallery.json`, or any page. Stop and report.

## Why these five

Rulings, 16 Sept: every image is evidence and answers a question the text raises. The page is the object. The title page shows "no name on it" instead of telling her. Aldini and Galvani answer "did people really do this?" The Diodati print answers "is the house real?" Left out: the 1831 Holst frontispiece (an artist's guess, fifteen years after the night) and any portrait (none exists from near 1816, and the text never asks what she looked like).
