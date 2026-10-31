---
status: Report — the Earth bench, step 6e (Prompt-Revise-Earth-Bench-06e.md, shortcuts for the timeline); built 30 Oct 2026 on 709a1e8a; checked in the pane on the Mac; committed on Michael's word, 30 Oct ("Commit, don't push"), 834c3982, and pushed on his word ("Push this when it is ready")
role: What was built, the table of spans, what each shortcut showed in the pane, back, and what needs Michael's eye
related: Spec-Earth-3D.md, Worknote-Time-Slider.md, Report-Earth-3D-Bench-06d.md, Prompt-Revise-Earth-Bench-06e.md, cw-deploys/experiments/earth-3d.html, Earth-3D-Bench-06e-Oct30/ (the pictures)
updated: 2026-10-30
---

# Report: the Earth bench, step 6e (30 Oct 2026)

Built on `709a1e8a` (step 6d and its board, and the Glass 900 push). Only `experiments/earth-3d.html` changes; no shared
script is touched, so the Time Machine, the Sun bench and the stories are as they were. Nothing under `CWVault/` was
stashed, restored or checked out. The pictures are in `Earth-3D-Bench-06e-Oct30/`: ten of them, 500 KB, the pane's own
screenshots, at the pane's scale (a 1,024 × 768 page drawn at about four fifths).

## What was built

**The list.** In the left column, centred beside the age slider, six words one under the other: *Dinosaurs*, *After the
Ice*, *Egypt*, *China*, *Mesoamerica*, *France*. They are words of the column's kind, a size smaller (15 px), and the list
is placed by the script so that its middle is the slider row's middle (`placeSpans`, run with every render of the slider and
whenever the window's height changes); it stays beside the slider as the window is cropped or the page resized. Each word
carries its span as a tooltip, for a mouse: *3,100 BCE to 30 BCE — the Upper and Lower Kingdoms united, to Cleopatra's
death*. In the narrow layout (under 760 px) the list follows the commands as a row of words above the window; in full
screen it follows *Full screen* in the floating box of commands.

**A tap.** The line glides to the span over the same 380 ms as a stretch, the flags easing to its ends; the Earth goes at
once to the span's start, its earlier end (the dinosaurs at 233 million years ago, Egypt at 3100 BCE), and the thumb rides
the glide to the right end of the line. *stretch* and *back* are absent during the glide as they are during a stretch, and a
tap on a shortcut during a glide is ignored. The stack of stretches is replaced by the whole, so **back returns to the
whole** whatever she had stretched to before; a stretch made inside a span stacks on it as usual, so from there *back*
returns to the span and then to the whole. While the line stands at a shortcut's span, that word reads as chosen (ink with
the copper underline, as *Coastlines* does when on).

**The table.** One line a shortcut, in the script (`SPANS`), from the earlier end to the later:

```
['Egypt', -3100, -30, 'the Upper and Lower Kingdoms united, to Cleopatra's death'],
```

A year CE is itself, BCE is negative (there is no year 0, so 3100 BCE is 5,125 years before 2026), `'today'` is now,
`{ ago: 12000 }` is years ago, `{ ma: 233 }` is million years ago; the fourth field is the note for the tooltip, empty for
*After the Ice*, which the prompt gave none. Years are taken from this year by `CW.yearToMa` (cw-time.js), so the spans
stay right as the years pass.

**The line's ends.** Under the line, the two ends' words were rounded by 6c's rule to three figures of the span, so Egypt's
5,125 years would have read *5,130 years ago* and 2,055 *2,060*. They now round as the flags' years do (6d: the smallest of
1, 2, 5 × a power of ten at or above a device pixel's worth), so an end reads as fine as the line can show and no finer; the
line's own two ends, *today* and *4,567 million years ago*, are named as they were. This is the one change outside the
prompt; it is listed under *Needs Michael's eye*.

## Checked in the pane on the Mac

The page at 1,024 × 768 (the pane's own size that day), the track 661 px, `devicePixelRatio` 2. Each word tapped as a real
click, the glide finished by the bench's `finish()` (the pane runs no frames unless looked at), then the state read back.
In every case the glide had begun (an animation frame pending, the target set) and the stack was `[[0, 4567]]`.

| the word | the line's ends | one pixel | the title line | chosen |
|---|---|---|---|---|
| Dinosaurs | *66 million years ago* … *233 million years ago* | 130,000 years | The Earth at 4,334 million years old: 233 million years ago | Dinosaurs |
| After the Ice | *today* … *12,000 years ago* | 9.1 years | …: 12,000 years ago | After the Ice |
| Egypt | *2,055 years ago* … *5,125 years ago* | 2.3 years | …: 5,125 years ago | Egypt |
| China | *115 years ago* … *3,625 years ago* | 2.7 years | …: 3,625 years ago | China |
| Mesoamerica | *330 years ago* … *3,625 years ago* | 2.5 years | …: 3,625 years ago | Mesoamerica |
| France | *today* … *1,258 years ago* | a year | …: 1,258 years ago | France |

Pictures: `dinosaurs.png`, `after-the-ice.png`, `egypt.png`, `china.png`, `mesoamerica.png`, `france.png` — the list beside
the slider, the chosen word underlined, the ends and the title line. `page-1024x768-the-list-beside-the-slider.jpg` is the
whole page as it opens, the list's middle at the slider row's middle (680.5 against 680).

**back** from After the Ice: the line glides to the whole (*today* … *4,567 million years ago*, one pixel 3.5 million
years), the stack empty, *back* absent, no word chosen; the age stays at 12,000 years ago, the thumb at the line's left
end (`back-to-the-whole.png`). A stretch made by the flags inside Dinosaurs (100 to 200 million years ago) stacked on it:
*back* returned to Dinosaurs, the word chosen again, and a second *back* to the whole. A tap on a word during a glide did
nothing.

**Full screen** (the pane's fallback, the window filling the viewport): the list sits in the box of commands after *Full
screen*, its words at the box's 14 px, and works there (`full-screen-dinosaurs.jpg`: the dinosaurs' span along the
bottom); on the way out it goes back to the column, beside the slider again.

**The narrow layout** at 375 wide: the list is a row of words after *Full screen*, wrapping to two lines, above the window
(`phone-375-wide-the-list-after-the-commands.jpg`).

No console errors; `check-deploys` no errors (its one warning is another session's untracked palette pictures).

## Needs Michael's eye

- **The line's ends now round as the flags' years do** (6c's three-figure rule is gone). It makes Egypt read 5,125 as the
  title does; it also makes China's near end read *115 years ago* for 1912 (114 years ago; a pixel there is 2.7 years, the
  step 5). One line to put back if the old rule is wanted.
- **France is finer than a year a pixel on this Mac**: 1,258 years over 661 px at `devicePixelRatio` 2 is 0.94 years a
  device pixel (the *one pixel* line says *a year*; the labels' step is a year). The stretch gesture refuses to go finer
  than a year a pixel; a shortcut keeps its span exact, since the words name Charlemagne's year. On the iPad (about 700
  px, 2×) the same; on a 1× screen it is fine.
- **The chosen word** is marked while the line stands at its span (ink, copper underline). If the words should stay plain
  commands, one line.
- **The age on back** stays where it was; the prompt moves the age only on a shortcut. The Earth jumps to the span's
  start at the tap, while the line glides.
- **The list's height.** Six words make 163 px, so the list runs 41 px above and below the slider row; at 1,024 × 768 it
  ends 6 px above the viewport's bottom, under the title line's level. More words would push it lower; a tighter leading
  (the words are 27 px apart) would hold more.
- **After the Ice** has no note in the tooltip; the prompt gave none.
- Not tried by finger.

## Changed

`cw-deploys/experiments/earth-3d.html` only — the header note, the CSS for `.spans` (and `.left { position: relative }`),
`SPANS`, `markMa`, `markWord`, the list built in the script and appended last in the column, `goToSpan`, `markSpans`,
`placeSpans` (called from `renderStretch` and `setCrop`, and by a `ResizeObserver` on the window), `spanEndWord`
rewritten, the list among the full screen's words after *Full screen*, a sentence in the *Current year* panel,
`cwStretch.spans/goTo/spanWords/placeSpans/el` for checks; the stamp `2026-10-30 709a1e8 · earth-3d step 6e`. Committed
on Michael's word, 30 Oct, "Commit, don't push", this session's hunks only (`834c3982`), and pushed on his word; `MANIFEST.md` and `00-BOARD.md` in the same commit.
