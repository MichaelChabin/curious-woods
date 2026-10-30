---
status: Ready for Michael's read, 30 Oct 2026. A revision of the sixth Earth bench, before step 7. Paste the block below whole into a fresh Claude Code session.
role: The map-like turn close in, the Taiwan wedge, the window's size readout, a full-screen word, seven opening views, the deepest zoom on big screens, the stretching slider as a trial, and sharing the kept picture with a note.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-06.md, Worknote-Time-Slider.md, Standard-Interactives.md
---

# Prompt: the Earth, sixth bench revised

> **First, two checks.**
> - Read `CWVault/claude/Spec-Earth-3D.md`; under *Open*, the flat world's projection should say *Ruled 29 Oct (Michael): Equal Earth*. If it doesn't, stop and tell Michael. Don't write the spec yourself, and don't stash, restore or check out anything under `CWVault/`.
> - Run `git status`. If `CWVault/claude/Spec-Earth-3D.md` is modified or `CWVault/claude/Archive/` is untracked, commit exactly those two, nothing else, with the message *The Earth's spec (Michael's rulings of 28–30 Oct) and the archive of finished prompts and reports*, and push. Michael has said yes to this.
>
> Then read your `CWVault/claude/Report-Earth-3D-Bench-06.md` and `CWVault/claude/Worknote-Time-Slider.md`. Same bench, `experiments/earth-3d.html`. Nothing a child can see changes. Where this prompt and the spec disagree, the spec wins.
>
> **1. The turn close in, like a map.** Close in, dragging east now swings the globe in a way that looks nothing like a map. Close in, a drag moves the ground the way a map moves: east–west along the parallels, north–south along the meridians, north always up, the picture never rolling or swinging. Far out it stays the globe on a stand, as now. The change from one to the other is smooth as she zooms, with no point where the feel jumps. Say how you did it.
>
> **2. The Taiwan wedge.** At today, a long pale triangle of shade runs over the sea from Taiwan down to Luzon, and lightens Taiwan's southern half. It is a young piece of crust in the plate model. This side of the seam, no piece draws anything over the sea at all (no wash, no rim, no island, no drowned band, whatever the route); the ball of today's ground underneath shows what is there. Find any other piece that does the same and say where.
>
> **3. The window's size, shown.** While she drags the window's bars, and for a couple of seconds after, the window shows its size in small grey type: *820 × 760*, in the same pixels as the page's layout. Michael will measure on the Mac and the iPad and say what the opening size should be. Don't change the opening size yet.
>
> **4. A full-screen word.** ***Full screen*** in the left column fills the screen with the Earth's window; the essential words float over it, small, at one edge: *Map* / *Globe*, *Reset view*, *Keep this picture*, and the age slider along the bottom. The same word, or the platform's own way out, returns. Where the device has no full screen (some phones), the word doesn't show. Michael may want this on every interactive later; build it so another page could use it.
>
> **5. Seven opening views.** The bench opens on one of these, at random, each framed on its subject: the Alps, whole; the Nile from its delta to Lake Victoria; the Tibetan Plateau; Australia, whole; Mexico City, close; the Amazon basin; Lake Victoria. *Reset view* returns to the view it opened on. `?view=alps` (and so on) picks one, for checking.
>
> **6. The deepest zoom on big screens.** On Michael's LG 6K, Nantucket stays small (about 4 mm across), while on the iPad he can bring it to 2 cm. Probably the bench drops a tier on the big screen and the tier stops the zoom early. A fast machine on a big screen should still reach the deepest level; drop the sharpness, not the reach. The corner readout shows the tier and the deepest level she can reach. Say what you found.
>
> **7. Trial: the stretching slider.** In place of the fine slider, bench only. The age slider's line stays even, today to 4,567 million years. She places two marks on it; a tap between them stretches that stretch to fill the whole line, and she can do it again and again; the word ***back*** steps out one stretch. Under the line, in small grey type: what one pixel is worth now (*one pixel: 5 million years*, then *500,000 years*, and so on), counting the screen's own pixels, as `devicePixelRatio` gives them. Build both ways to place the marks, switchable on the bench for Michael to try with his hands:
> - *tap twice*: two taps on the line put the two marks down;
> - *drag in*: the marks start at the line's two ends, and she drags them in.
>
> The stretch happens as a short glide, not a jump. The Earth follows the age throughout, as now. If the Earth is in its glide between 2.6 and 5 million years, nothing about that changes.
>
> **8. Share the kept picture, with a note.** *Keep this picture* opens a small panel: the picture, a line where she can write a note (optional, a sentence or two), and two words, ***Share*** and ***Save***. The picture carries, at the bottom, her note if she wrote one, the Earth's age and the place at the centre (the nearest named place, or the latitude and longitude), today's date, and the credit, all in the page's type. *Share* hands the picture to the device's own share sheet (Messages, Mail, Photos and the rest, by the Web Share API), with the note and the age as the message; *Save* saves the file. Where the device can't share files, only *Save* shows. Nothing is sent anywhere by the page itself.
>
> **Check before reporting**, on the Mac in the pane: the turn close in over the Alps, east and north, and far out, with a short sequence of pictures; Taiwan at today; the size readout while dragging; *Full screen* in and out; each of the seven views (`?view=`); the readout of tier and deepest level at a large window; the stretching slider both ways, three stretches deep and back out, with the pixel line at each step; a kept picture with a note, and the panel. Small JPEGs beside the report. Say plainly what needs Michael's eye.
>
> Name the bench's version in its stamp, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine, the Sun bench and a story map open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-06b.md`. Stop and report. When Michael says so, commit and push.
