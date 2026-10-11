---
status: Written 11 Oct 2026, for Michael to paste into Claude Code, after he read Periods-Deep-03.md and ruled on its three open calls (below).
role: Loads the third and last batch of deep-time periods into the store, so all thirty periods have their words; loads the five new events the three period batches wrote; applies the small changes to earlier files that the batches left behind; and checks that every link in the periods lands on an event.
---

# Prompt: load periods batch 3, the five new events, and the batches' changes

> Read `CWVault/00-WHAT-CW-IS.md`, then `CWVault/claude/Prompt-Deep-Time-Periods.md` (the form of a period entry, under *What a period entry is* and *The fields a period has*), then the `MANIFEST.md` entries for `stories/deep-time-periods.json`, `stories/deep-time-events.json` and `stories/deep-time.json`, and the board entry of 10 Oct for the timeline stack, which is the last time the periods were loaded.
>
> **What is new in the vault (10–11 Oct 2026).** `CWVault/claude/Periods-Deep-03.md`: the last twelve periods, Recovery to After the ice, researched, written and checked, read by Michael on 11 Oct. With it, all thirty periods of `Periods-Deep.md` have words. The three period batches also wrote five new events, in the event form, under a heading *Two new events* or *One new event* near the end of each file: *Fern spike* and *Lystrosaurus* (Periods-Deep-01), *Big footprints* and *Dimetrodon* (Periods-Deep-02), *Lucy* (Periods-Deep-03). Each has `Replaces: none; new`. None is in the store yet.
>
> **Michael's rulings, 11 Oct**, on what batch 3 left open: *Antarctica freezes* changes from "about seventy metres" to "about fifty-five to seventy metres", and the period *Cooling* follows; the *Oxygen* plot is listed under every period whose span it covers, so it is added to *Mammals* and to the Ice line; *Lucy* keeps kind *object*; the Hand axes / Mammoths edge stays at 1 million. The *Oldest flowers* tail dot (140 against the text's 135) is still open: leave it.
>
> **The job.** The markdown is the source and the JSON is generated; edit the vault files, never the store by hand.
>
> 1. **Apply the batches' changes to earlier files.** Each batch ends with a section *Changes to earlier files* (or *Changes to earlier batches*). Do these, in the vault:
>    - `Events-Deep-05.md`, *Antarctica freezes*: in the summary and the More, "the sea fell by about seventy metres" becomes "the sea fell by about fifty-five to seventy metres". Add one line to its notes: "Changed 11 Oct (Michael, from Plots-Deep-01): fifty-five to seventy."
>    - `Periods-Deep-03.md`, *Cooling*: the same change in its More ("the sea fell by about seventy metres"), and strike the *Open* note at the end of its Checked line, since it is now settled.
>    - `Periods-Deep-03.md`: add *Oxygen* to the Plots part of *Inside it* for *Ice*, *Lucy*, *Hand axes*, *Mammoths*, *The last ice age*, *Hippos in London*, *Ice sheets* and *After the ice*. `Periods-Deep-01.md`, *Mammals*: the same. Say in each file's status line that this was Michael's ruling of 11 Oct.
>    - `Periods-Deep-01.md`, *Mammals*: add *Lucy* and *Ice lets go* to its *Inside it*; its *Index* line becomes "the horse (cat-sized at the start of *Heat*) and the elephant line, told in the text of its periods".
>    - `Events-Deep-03.md`, *Animals, kept*: replace its summary with the one given in Periods-Deep-01's changes section (it begins "About 539 million years ago. Geologists drew a line in a cliff in Newfoundland, by a burrow."). Its label in the store is *Animals, fossils*; leave the label as it is.
>    - `Periods-Deep.md`: under the tree, note that the Hand axes / Mammoths edge at 1 million is not an official boundary but the middle of the change from 41,000-year to 100,000-year ice ages (Michael, 10 Oct); under *Still open*, mark the index-animal line done, in the text of the periods, not as events.
>    - *Big thwack → Moon formed* (Periods-Deep-01) and *Flowers → Oldest flowers* (Periods-Deep-02) are label changes. Check what the store already has: on 10 Oct its labels were *Moon forms* and *Oldest flowers*. If the store's label is Michael's, leave it; the periods' links are handled in step 4.
>
> 2. **Rerun `tools/periods-from-vault.py`** with `Periods-Deep-03.md` added to its sources. The store should hold thirty periods, one for every leaf and branch of `stories/deep-time.json`, with names matching the tree exactly. Where a period's Span differs from the tree, the tree wins on the page, as the tool's `_about` says; report any difference anyway. Batch 3's periods have two things the first two batches did not: a *Span* written in thousands of years ("130,000 to 115,000 years ago") rather than Ma, and an *Opens to* that names the Time Machine ("the Time Machine's own lines"). Make sure both come through.
>
> 3. **Load the five new events.** Teach `tools/deep-events-from-vault.py` to read the new-event sections of `Periods-Deep-01.md`, `-02.md` and `-03.md` (or pass those files to it), and rerun it. Their ages and kinds, from their Age lines: *Fern spike* 66.0 Ma, kind *life*; *Lystrosaurus* 251.8 Ma, kind *crop or animal*; *Big footprints* 200.95 Ma, kind *crop or animal*; *Dimetrodon* 280 Ma with a tail to 295, kind *crop or animal*; *Lucy* 3.18 Ma, a maximum, kind *object*. Each should fall inside the period its batch meant it for: *Fern spike* at the start of *Recovery*, *Lystrosaurus* just inside *First dinosaurs* (above *The Great Dying*), *Big footprints* just inside *Giants* (our edge is 201), *Dimetrodon* in *One continent*, *Lucy* in the period *Lucy*. Two things to watch: *Fern spike*'s More links to a period, "(*Mammals*)"; if the store cannot link an event to a period, change the words to "(Corral Bluffs)" as its notes allow, and say so. And *Lucy* is both an event label and a period name; make sure the two do not collide in ids or links.
>
> 4. **Check the links.** Every name in italics in the thirty periods (summaries, Mores and *Inside it*) and in the five new events is meant to open an event or a plot. Michael renamed several event labels after the events were written, so the periods use names the store may not have: *Animals, kept* (store: *Animals, fossils*), *Moon formed* (*Moon forms*), *Banded iron* (*Rust*), *Oxygen in the air* (*Oxygen alone*), *Blue Earth* (*Oceans form*), *Flowers* the event (*Oldest flowers*), *The ice lets go* (*Ice lets go*). Resolve these by the store's aliases or by the event's heading, whichever the build uses; do not rewrite the Mores to match. Then list every italic name that still resolves to nothing, period by period. In *After the ice*, the plain words "the Time Machine" are meant to open the hand-over to the Time Machine's own lines; make them do so if the page can, and say if it cannot.
>
> 5. **Update `MANIFEST.md`** for the periods store (thirty of thirty; the sources; checked in round 4, which the 10 Oct entry says had not happened yet) and the events store (the three period files as sources; five new events).
>
> **Check, then stop.**
>
> - Open the timeline. Drop into *Mammals*, then *Ice*, then *Mammoths*, then *The last ice age*. Tap each of the twelve new periods and read its summary and More on the page. Confirm *Hippos in London* is still wide enough to tap on an iPad (it is about a ninth of its line).
> - Find the five new events on their lines and open their Mores. Confirm *Lystrosaurus* sits above *The Great Dying* and inside *First dinosaurs*, *Big footprints* inside *Giants*, *Lucy* inside *Lucy*.
> - Open *Cooling* and *Antarctica freezes* and confirm both say fifty-five to seventy.
> - Send a screenshot of the Ice line with its three periods, and one of *The last ice age* with its three.
> - Run `tools/check-deploys.sh`.
> - Add a board entry for this load, as for the 10 Oct stack.
> - Anything the files leave open, leave open and name it; do not invent.
>
> Stop and report before committing. After my yes, commit and push.

## Notes for us

**Why now.** The tree was rebuilt on 10 Oct with the thirty names and edges, and the periods store was built the same day from batches 1 and 2. Batch 3 was checked on 10 Oct and read by Michael on 11 Oct, so this closes the periods: all thirty with words, and the five events the period chats found wanting.

**What this does not do.** Pictures for the Mores (a pool chat, not a build). The *Oldest flowers* dot. The pool brief and the ledgers (Ideas-Ledger, 11 Oct). The store-level agreement check, which would have caught the seventy-metre figure before Michael had to.
