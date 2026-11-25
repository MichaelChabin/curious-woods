---
status: Michael's prompt for step 12c of the Time lab bench, 24 Nov 2026, from the "World view, seas and shelf" chat. Written with sight of Report-Time-Lab-Bench-12b.md, Report-Time-Lab-Seas-Nov20.md and the live page. It overturns Michael's ruling of 23 Nov on the shelf, on his word of 24 Nov ("Yesterday I had it backward"). One point is the chat's default, and the new words for How this works are the chat's draft; both are marked.
role: Past the seam there is one sea. The shelf and the shallow seas look exactly like the ocean beside them. The shelf's word goes. A bench row lets Michael compare with the look of step 12b. One new sentence in How this works says what the shallow seas are and where they stop.
related: Report-Time-Lab-Bench-12b.md (the page as it stands), Report-Time-Lab-Seas-Nov20.md (where the seas came from), Prompt-Revise-Time-Lab-Bench-12b-01.md, js/3d/earth.js
updated: 2026-11-24
---

# The Time lab bench, step 12c: one sea

`cw-deploys/experiments/time-lab.html`. Read Report-Time-Lab-Bench-12b.md first. If anything below disagrees with what that report says was built, stop and say so before changing anything.

Touch no shared script, with the same exception as steps 12 and 12b: what the seas and the shelf need inside `js/3d/earth.js` may change behind options a page names. A page that names none must draw as it does now.

## What changes, and why

On 23 Nov Michael ruled that the shelf is a feature of its own, in its own colour (`#505083`), with its own word. On 24 Nov he withdrew that. His reasons:

- A shelf is, by definition, under water. A shallow sea is sea. When she goes back in time she should see the Earth as it was: land and sea.
- The patches of a second and third colour, and the places where they lie over each other, drew the eye and told her nothing.
- What matters is that she can see the seaway that kept *Tyrannosaurus* in western North America, and the sea that covered New Mexico before the dinosaurs. A plain sea across the land shows both.

The shelf comes back, in grey, on the day the oceans are drained. Not now.

## One sea

Past the seam (2.6 Ma):

- **The shelf and the shallow seas cannot be told from the ocean beside them**, at any point on the ball or on the map. The ocean is not one colour: Report 12b gives `#5793b4` at the middle of the ball down to `#33699a` at its edge. Match that at every point, or let the ocean itself show; your choice. Say which you chose.
- **Painted whole.** Nothing of the land's picture shows through the sea.
- **No seam** where a seaway meets a shelf, or where either meets the ocean. The faint lighter lines in the Gulf at 90 and 69 Ma, where two shelves overlapped, should be gone. Say whether they are.
- **Today's lakes and bays inside the land** (Hudson Bay, the Great Lakes) are in the shelf's paint now. They become the same sea. Say how they look at 480 Ma.
- The soft shorelines stay. The tears stay as they fall; hide nothing.
- The deep ice still paints over the sea.
- The seas come in from the seam and go out past 535 Ma as they do now. Nothing snaps at the seam.

This side of the seam nothing changes. Doggerland and the land bridge at 12,000 and 21,000 years must look exactly as they do now.

## The words

- ***Show shelf / Hide shelf* goes**, in both views, and `?shelf=` with it.
- ***Hide shallow seas* stays**, and `?seas=0`. With the seas hidden, the seaways go and the land's picture shows there, as now. The shelf stays sea.
- The credit for the seas stays as it is.

## Kept, and a way to compare

- Keep what step 12b built for the shelf's own colour (`shelfColour`, `setShelf`) and what step 12 built for the grey, switched off. Say where each lives and what turns it on. Drain the Sea will want them.
- **A bench row in *How this works*: *the sea: one blue / as before*.** *As before* is step 12b's look exactly: the shelf in `#505083`, the seas in their light blue. The page opens on *one blue*. `?sea=before` opens on the other. (The chat's default.) The row is there so Michael can compare on the iPad. It goes when he has ruled.

## One sentence in *How this works*

In both views, after the words that are there now. This is the chat's draft, not yet Michael's word, so build it where it is easy to change:

> The shallow seas over the land were worked out by geologists, one map for every five million years, back to about 535 million years ago. Before that this Earth shows none. That means we have no map of them, not that there were none.

If it makes the panel too long at either size, say so. Don't trim it.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024):

- 480, 262, 201, 90 and 69 Ma in The World, on the globe and on the map; 90 Ma in Time;
- 480, 90 and 69 Ma again with the row on *as before*, from the same view, so the two can be laid side by side;
- 90 Ma with the seas hidden;
- 12,000 and 21,000 years: unchanged;
- 537 and 600 Ma: no seas, and no shelf showing;
- the arrival on *First trilobites*, unchanged; an event tapped; a city tapped; *Pick a time*;
- WebGL, once;
- the Earth bench and Ancient Seas open and draw as before, with a clean console.

Under *Needs Michael's eye*, say plainly:

1. How the tears look in one blue at 480 and 262 Ma. Do they read as an abstract view, or as mistakes?
2. Whether a continent that is mostly sea at 480 Ma still reads as a continent.
3. Anything that was land in the *as before* look and is sea now, or the other way round, that you did not expect.

Pictures in `CWVault/claude/Time-Lab-Bench-12c-Nov24/`; the report in `CWVault/claude/Report-Time-Lab-Bench-12c.md`.

Stop and report. Don't commit.
