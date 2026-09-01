---
status: Draft brief — 31 Aug 2026, from the iPad design chat. Gate: Michael reads
  the constellation files and this brief before anything is built.
role: What must be settled before prototyping the story reader (the "new literary form")
related: 02-CONSTELLATIONS/Frankenstein-11816/, 20-SPECS/Spec-Timeline-Graph.md,
  00-FOUNDATION/Story-Template.md, 01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md
---

# Brief — the Reader prototype

## What it is

Not the Timeline (unbuilt, separate) and not the five-page story pattern. A third
surface: the **node reader**. Right panel: hook image → panel (60–80 words) → "more"
(150–250) → deep, with links that travel edges. Left panel (the context membrane):
the **visited trail**, **my list**, **search**, **Remember**. The child pursuing links
in any direction is effectively writing a biography herself — that is the form.

## Settle before building

1. **Michael reads the material.** The hub, `sophie-germain`, `aldini-london`,
   `how-we-know-tambora`, and this brief. If the grain is wrong, nothing else matters.
2. **The three vocabulary decisions.** `threads` as a facet (incl. `hidden-names`) — yes,
   no, or fold into `domain`. And whether the five claim-edge types plus facet edges
   are enough for the reader's link rendering. Added 1 Sept: a **`depends-on` edge** —
   pedagogical, about the reader rather than the world (differentials must not arrive
   before pixel-counting). It is the "essential bits" idea as an edge type. Maya reads
   it for ordering; the child never sees it as a lock — nothing in CW gates.
3. **The aside mechanic.** A name the story assumes (Archimedes) gets a very brief
   inline explanation — two sentences, in place, no navigation — with one button:
   **add this to my list**. Rules to settle: does an aside exist for every proper noun
   or only authored ones; does opening an aside count as "visited"; where does the
   two-sentence text live (a field in the target node, so it is written once).
4. **The left column's exact contents and order.** Visited trail (how long? does it
   collapse?), my list, search, Remember — and what "Remember this" captures on this
   surface (a node? a paragraph? the trail itself?). Interface-Standard-v2 governs;
   no new design language.
5. **Images.** Pick and fetch ~10 (Wellcome/Gallica/Commons/Gutenberg per the hub),
   resize into `cw-deploys/art/`, record source+license in each node. The hook is an
   image; without images there is no prototype.
6. **The loader.** One script: read `nodes/*.md` frontmatter + bodies → JSON the page
   consumes; search index falls out of the same pass. No server, no build step beyond
   this. Decide: loader runs at deploy (committed JSON) or in-browser.
7. **Scope fence.** One constellation, twenty nodes. No Maya, no Timeline rendering,
   no Chladni bench, no postcards yet — Remember and the trail are local state only.
8. **The success test, agreed in advance.** Cold start: something she likes within
   three clicks. Wandering: the Archimedes detour — leave the Germain story, learn who
   he was, return without feeling lost. And the Timeline spec's test transposed:
   three unprompted "wait, they knew each other?" moments in ten minutes.

## The wanted-list (added 1 Sept)

The database of unwritten stories costs nothing to build: it is the **red link**. A
story tag placed anywhere — in a node, a lab, an aside — is just a [[link]] to a node
that does not exist yet. The loader already reads every file; one extra pass collects
all link targets with no file behind them, and that list IS the to-write database,
sorted by how many places point at each. "Hexagram" tagged in Geometry and "pronic
numbers" tagged in the multiplication lab become two entries the moment the tag is
placed. Obsidian shows the same thing natively as unresolved links, so the authoring
side works today, before any code. No schema, no separate database, nothing to
maintain — and the same mechanism later lets Maya say "nobody has written this one
yet," which is itself a fine thing for a child to hear.

Settled framing (Michael, 1 Sept, for 00-DECISIONS when confirmed): **the dashboard
holds story icons and one practice icon and nothing else.** Labs are not on the
dashboard; they are where stories open out (the five-page pattern's page 5, the
"venues with overlays" principle). The labs are reached through curiosity, not listed
as destinations.

## Order

1–2 are Michael's, on the Mac, unhurried. 3–4 are one conversation. 5–6 are Claude's
and can start the moment 1 says the grain is right. 7–8 are already written down and
just need a yes.
