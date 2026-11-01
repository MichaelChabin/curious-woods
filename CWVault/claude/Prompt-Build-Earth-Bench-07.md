---
status: Michael's prompt for step 7 of the Earth bench, 1 Nov 2026 (after step 6e, 834c3982). Written in the "recent rows" chat.
role: The window: a new page in front of the Earth bench that introduces a way of picking a time or a range. The brief as given.
related: Worknote-Deep-Time-Window-02.md (the design and its reasons; read it first), Worknote-Deep-Time-Window.md (revision 1: the 4.6 billion window in detail), Sketch-Earth-in-Squares-01.html, Window-Mockups-Nov01/, Worknote-Time-Slider.md, Spec-Earth-3D.md
updated: 2026-11-01
---

# Step 7: the window

Before the Earth bench opens, a page of its own that introduces a way of picking a time or a range: a stained-glass window where each square is a stretch of time, over the bench's own timeline. We perfect it here before it joins the globe. Nothing on `experiments/earth-3d.html` changes in this step except that it is reached through the new page.

Read first: CLAUDE.md's four and the board, then `CWVault/claude/Worknote-Deep-Time-Window-02.md` and revision 1 beside it. The worknotes are the design; this prompt is the build. Where they disagree, revision 2 wins, and say so in the report. The sketch `CWVault/claude/Sketch-Earth-in-Squares-01.html` is a working prototype of the first window and of dragging a span; the mockups in `CWVault/claude/Window-Mockups-Nov01/` show the layout. Neither is code to copy as is.

## The page

A new page, `experiments/earth-3d-window.html`, in front of the bench: the experiments index opens it, and *Next* at bottom right goes to `earth-3d.html` as it is. The page standard, `CW_VERSION`, MANIFEST and the board as CLAUDE.md says.

Glass Geometry's left column, with the house convention: *How this works* opens a text box (placeholder words for now, marked as placeholder; Michael will write them); bulleted words in normal type open tools (Window, Timeline); italic words are commands. No boxed buttons.

## The window

One window shown at a time. To its left, a narrow column of four italic commands, biggest at the top; pressing one replaces the window with that scale. Mark the one in use in copper, unless Glass Geometry already marks a command in use some other way, in which case match it and say so.

| Command | Square | Block | Squares | Glass | Plaques |
|---|---|---|---|---|---|
| *4.6 billion years* | 1 million years | 100 million (10 × 10) | 4,600, five rows of 1,000, the rest of the fifth row clear future glass | the twelve eras, revision 1's colours and gradient | the twelve, revision 1's words |
| *The last million years* | 1,000 years | 100,000 | 1,000 | ice age against warm spell, two ways (below) | *Ice age* and *Warm spell* (below); from 130,000 years ago, the periods *Hippos in London*, *Ice sheets*, *After the ice* |
| *The last 100,000 years* | 100 years | 10,000 | 1,000 | graded by the sea (below) | *Ice sheets*, *After the ice* |
| *The last 12,000 years* | 10 years | 1,000 | 1,200, twelve blocks | plain glass, each square a slightly different shade | none yet |

Everything in revision 1's layout holds for every window: past at top left, future to the right, time running down each column of ten and then right; the silver came, about 2 points between blocks and about 5 between rows; handmade-glass shading; a thin gold mark at now; events as single squares backlit in a brighter version of their own colour; plaques on rollover (iPad: while her finger is down), one at a time, below the region, ivory with a fine border and a stripe of the era's colour; the era lit on rollover with the rest gently dimmed. Labels: on the 4.6 billion window, 0 to 4 billion on the left only, counting forward; on the others, under the block edges, and the 12,000 window counts years after the ice (year 0 at the left edge, now 12,026). The label under the cursor says "ago" and, on the 12,000 window, the ordinary year as well ("the 1760s").

Events: take them from the repo's own event files (`stories/deep-time-events.json`, `stories/timeline-events.json`, and whatever else the bench already uses), by label, inside each window's span. Report which you took.

**The glass of the last million and the last 100,000** comes from `stories/curves/sea-level-ice-ages.json`, the curve the globe's sea already follows, so the glass and the globe agree. For the last million, build both, with a bench-only switch so Michael can choose by looking:
- A: two colours, ice age and warm spell. Set the line between them so the warm spells fall where the interglacials do (the sea within a few metres of today's, or higher). Report the threshold and the warm spells it gives.
- B: graded, the paler the lower the sea (the more ice), warm spells in the warm colour.

The last 100,000 is graded like B. Plaque words for the two kinds, placeholders for Michael: *Ice age*: "Sheets of ice cover much of the north, and the sea is low enough to walk to some islands." *Warm spell*: "Warm, like now. Forests grow where the ice was." The periods' plaques use each period's label and the first sentence of its summary from `stories/deep-time-periods.json`.

Run every neighbouring pair of colours on every window through a color-blindness simulation and report any pair that fails.

## The timeline below

The Earth bench's own timeline: the stretching age line with its two copper flags, *stretch* and *back*. Use its code (Michael, 1 Nov); don't write a new one. If using it means moving code into `js/`, say what you would move and why, and stop there rather than changing how `earth-3d.html` behaves.

To the right of the timeline, the commands *stretch*, *shrink* and *back*.

- Dragging across squares in the window sets the timeline to that span, with the line's usual glide.
- Moving the flags, stretching, shrinking or going back moves the lit squares in the window to match.
- *shrink* is new, the opposite of *stretch*: the whole line as it stands fits between the flags, so the line grows by the same factor a stretch would shrink it, new time filling in on both sides. Now is a wall: what would run past today comes in on the left instead. If the new span is longer than the window in use, the window steps up to the next scale by itself.
- A stretch finer than one square is fine: the window just lights the square it falls in.

## Not in this step

The globe, carrying her span into the globe, stories painting the glass, the intro page's real words, selecting a whole era with one tap.

## Check, then stop

Check on the Mac in the pane and at iPad size: each window, its labels and plaques, A and B, a drag on each window, stretch, shrink (including the wall at now and the step up to the next scale), back, the lit squares following the flags. Small pictures beside the report, in `CWVault/claude/Earth-3D-Bench-07-Nov01/`; the report in `CWVault/claude/Report-Earth-3D-Bench-07.md`. Note anything a finger can't do on the iPad.

Stop and report. Don't commit.
