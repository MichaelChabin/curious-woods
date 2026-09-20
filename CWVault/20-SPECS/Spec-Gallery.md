---
status: Spec — 20 Sept 2026, from the salon-hang mock Michael approved. Rulings folded into Rulings-Sept-2026.md; this is how to build it.
role: The child's home page: how works hang, what each story must supply, what comes and goes, and the fixed row below.
related: cw-deploys/experiments/gallery/home-mock-salon.html (the model), 00-WHAT-CW-IS.md, Rulings-Sept-2026.md (The gallery), 00-PUBLISHING-A-STORY.md (stage 4, Hung)
---

# Spec — The Gallery

## What it is

`index.html` at curiouswoods.org. A wall of framed pictures, each a story or a tool, hung as a curator would hang a show; below a hairline, Practice in the centre and three small plaques at the right. Georgia, the warm ground `#f4f1e8`, nothing else on the page. The mock at `experiments/gallery/home-mock-salon.html` is the model: build from it, don't redesign it.

## A work on the wall

Each work is a link. Inside: a **frame** (a coloured border, 7–16 px, a colour that suits the picture), a **mat** (8 px, off-white, or the wall colour for drawn icons), the **picture**, and the **title** below, centred, 15 px Georgia, `#3D3D3A`, the same for every work. Works vary in width as paintings do; the wall flows in four columns on a wide screen, two on a phone; nothing overlaps.

Every story or tool that hangs supplies, in its frontmatter:

```
icon: art/<file>            # a crop of its hook image, or its own drawn mark; never separate artwork
frame: "#2b3f6b"            # frame colour
frame-width: 14             # px, optional; default 10. Varies for looks, not meaning
size: large | medium | small  # how wide it hangs; labs large, stories medium, small for drawn marks
```

The wall reads these from `stories/gallery.json`, one entry per work: `{slug, title, href, icon, frame, frameWidth, size}`. Adding a story to the gallery is adding its line to that file (Publishing-a-Story, stage 4). No other edit.

## What comes and goes

The wall is rehung every visit: the works are shuffled, so it always looks appealing and never the same. The fixed row below never moves.

A story she has finished comes down next visit unless she has kept it; when it comes down, another goes up from the pool of works she hasn't seen. *Finished* means she reached the end of the story text (not the end of More); the story page records this locally. *Kept* means she chose "keep this" on the story page or in Saved Stories; kept stories don't come down. All of this is `localStorage` on her device, nothing anywhere else, and if it's empty (new device, cleared) the wall simply hangs the pool.

The wall holds about nine works at a time on a wide screen. When the pool is smaller than that (it is, today), it hangs what there is.

## The fixed row

Below a hairline. **Practice**, centred: the copper ensō in its copper frame, about 140 px, no title (the mark is the name). At the right, three plaques of one size, each a small labelled card: **Saved Stories** (the stories she has kept; a plain list page, `saved.html`), **Labs** (the labs, listed; `labs.html`, or the old index moved), **Experiments** (`experiments/index.html`, as now). Labs and Experiments carry no picture.

## Not in this version

The dashboard timeline (After the Ice hung on the wall; where and how it starts is unruled). Position-true hangs per screen size (the hang survives reflow only in order). Maya. The practice queue behind Practice (the icon links to the tapping bench until the queue exists).

## The prompt (Claude Code, one session)

> Read `CWVault/00-WHAT-CW-IS.md`, `CWVault/claude/Rulings-Sept-2026.md` (The gallery), `CWVault/20-SPECS/Spec-Gallery.md`, and `cw-deploys/MANIFEST.md` (Page standard). Build the gallery from `cw-deploys/experiments/gallery/home-mock-salon.html`: (1) `cw-deploys/stories/gallery.json` listing every work now live (The Man Who Learned Without Knowing, Three at a Glance, About Your Brain, The Necker Cube, Glass Geometry, Glass Multiplication) with icon, frame, frameWidth, size — use the icons already in `art/`; where a work has no icon yet, say so and leave it out. (2) A new `cw-deploys/index.html` per the spec: reads gallery.json, shuffles, hangs; fixed row with Practice (ensō, linking to the tapping bench for now), Saved Stories, Labs, Experiments; finished/kept from localStorage per the spec, and a `keep this` control is a later step, so today nothing comes down. (3) `saved.html` and `labs.html`, plain, in the page standard. (4) Move the current index to `experiments/index-old.html` and add `_redirects` lines for anything that moves. Page standard on every new page; CW_VERSION stamped; `tools/check-deploys.sh` passes; MANIFEST and the board updated. Anything the spec leaves open, leave open and name it. Stop and report before committing.
