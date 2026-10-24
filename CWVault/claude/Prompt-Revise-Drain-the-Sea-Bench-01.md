# Prompt — Revise the Drain the Sea bench, 01

*17 Oct 2026, from Michael's first look on the iPad. Paste the block below whole.*

> Read `CWVault/claude/Spec-Drain-the-Sea.md` and this prompt. This revises `experiments/maps/drain-the-sea-bench.html` and the probe's shelf file. No story page changes. Four things, and one ruling to record.
>
> **0. Record the ruling.** Append to `CWVault/claude/Rulings-Sept-2026.md` and to `00-DECISIONS.md`, dated 17 Oct 2026, Michael:
>
> *The picture gets the screen.* When the point of an interactive is the picture (a map, a timeline, the plane), it is not confined to the text column. It takes the full width of the window, less a small margin, and as much height as the screen allows. The text column is for text. This holds for Glass Geometry's plane too, which is meant to run to infinity.
>
> Do not change Glass Geometry in this session; just list in the report what it would take to bring it under the ruling.
>
> **1. Layout.** The map breaks out of the text column to the full width of the window, with a small margin, and opens about three-quarters of the viewport's height. The bottom resize strip stays. The deep-time timeline is drawn **over the map's top edge**, on a translucent band in the page's paper colour, so the map runs up underneath it. Its labels must stay legible over any ground, so report how they look over dark sea, pale land and the drained floor. The story's three paragraphs stay above, in the column, as a story would have them. The bench's own toggles go below the map. Check iPad landscape and portrait (screenshots, or say what needs Michael's finger).
>
> **2. The probe's readout.** Nothing beside the probe except the ring. The **needle goes inside the ring**: the ring is the compass, sized so the needle reads at a glance without hiding the ground around it. The **words go in a strip docked along the map's bottom edge**, inside the map, translucent like the timeline's band: the depth, the age, which way the compass pointed. *Done* sits at the right end of that strip. The strip appears when the probe does and goes when it goes. Keep the chron name out of the child's words (it may stay in a bench-only line).
>
> **3. No ice on the sea floor.** On this bench the ice layer is off. Anywhere, in any page, `map.js` must never draw ice below the current sea level; fix that at the source, and report whether any existing page relied on it.
>
> **4. Stripes that read as stripes.** At the bench's current probe zoom the stripes look like camouflage. Try the probe's Atlantic zoom one level closer, and draw the stripes layer as a crisper two-tone (split at zero anomaly, with only a little softening). Report screenshots at two zooms, in the Atlantic and in the Pacific, and say where the stripes first line up with the ridge.
>
> Bump the bench's stamp and script versions, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Anything left open, name it. Stop and report before committing.
