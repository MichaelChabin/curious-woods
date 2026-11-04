---
status: Built and checked 4 Nov 2026; committed and pushed the same day on Michael's word in the prompt ("When you are finished, please commit and push the result. I'll be away from this machine but would like to see it on the iPad"). Waiting on his read on the iPad.
role: What Story-Glass-900-Years-Ago-02.md asked for (Michael's text of 4 Nov replacing all the earlier text of the Glass 900 years ago page), what was built, how it was checked, what needs his eye, and what is open.
related: Story-Glass-900-Years-Ago-02.md, Report-Glass-900-Years-Ago-Revise-05.md, cw-deploys/active/geo-1-glass-circles.html, cw-deploys/art/stories/geo-1-glass-circles/double-rose-and-hexagon.svg
pictures: Glass-900-Years-Ago-Nov04-Words02/ (mac-*.jpg are the pane at 1440 × 900; ipad-upright-*.jpg the pane at 768 × 1024; ipad-side-*.jpg at 1024 × 768; draw-double-rose.py drew the SVG)
---

# Report: Glass 900 years ago, the words (text 02)

Built on `10b39b6d` (the tree after the Time lab bench was pushed). The story file carries no prompt; Michael's message was "read Story-Glass-900-Years-Ago-02.md" and its frontmatter says what it is: his text of 4 Nov 2026, "replacing all the earlier text." So the page `active/geo-1-glass-circles.html` now carries his words and nothing of the 8 Oct draft. The board, `js/glass.js`, is untouched; the page's stamp is `2026-11-04 10b39b6 · glass 05 · words 02`.

## What changed

**The words.** Every paragraph on the page from the title to the board is his text of 4 Nov, in his order, with his punctuation (the ellipses, the one dash). The 8 Oct draft is gone whole, including the counts after the board (14 locations, 6,548, the 300 trillion) and "Give it a try."

**One word changed, to match the screen.** His text says "You can also tap Demo." The word in the board's column is *Demos*, and the Rulings (Instructions to the child, 16 Sept) say the word in the story must match the word on the screen exactly. The page says *Demos*. If he would rather the column said *Demo*, that is a change to the board, not the page; say so.

**The other words checked against the screen:** "How this works" is the panel's heading; "tap a color then tap any shape" is what the Color box says; 0 and 1 are the two copper points; a line does extend past the screen's edge; a circle does form centred on the first point with its edge through the second. "Below you'll see a white space" is true: the board follows his last paragraph. "On the left side" is true of the board's column.

**The date line.** The subtitle said 1120; his text says "in about the year 1100," twice. The subtitle now reads *~11,100 after the ice, or about 1100.* The World section's own dating of the book (about 1120, the best guess 1100 to 1120) stands, and the References say "about 1100 to 1120."

**The double rose and hexagon.** His text says "It looks like this:" and then `[picture: the double rose and hexagon]`. No such picture exists in the repository, in his Downloads, on the iCloud Desktop or in Preview's folder (two March pictures in Downloads, `Hexagon.png` and `Hexagon Plus.png`, are a single six-petal rose in a hexagon in red and blue glass, not a double rose). So this session drew what the words say, as a design on the chalked board: a rose of six petals, a second rose turned half a step, so twelve petals meeting at the centre, six of them reaching the corners of a hexagon drawn around them, in lead-grey lines on chalk white, with the thirteen circles that make the petals drawn faintly behind. It is `art/stories/geo-1-glass-circles/double-rose-and-hexagon.svg`, 2.5 kB, sitting in the flow of the text at 440 px, with a caption. The script that drew it is beside this report. **It is a reading of his words, not his picture;** if he has one, it replaces this file and the page needs no other change.

**The compass.** `[picture: a compass]` has no picture. Nothing on disk shows one, and fetching a photograph from the web was not done without his word. The page carries a comment where the picture would go, and the paragraph that describes the compass stands without it. A photograph of a real iron compass of about that time, with its source and licence, is the picture the words want.

**The three stacks stay.** The five manuscript pages stand level with the first paragraph, which names the book; the came photographs level with the paragraph that names came; the three windows Michael made on this board level with "the next step is to make your window," ending level with the last line before the board, as before. None of them is named by his text in so many words; each is evidence for a sentence of it. If any should go, say which.

**The References.** The Theophilus line stays (its date now "about 1100 to 1120"). The Five Sisters line is out: the photograph it credited has not been on the page since 8 Oct.

**The board's place.** After his last paragraph ("You can also tap Demos…"), so that she reads how it works before she reaches it, and "Below you'll see" is true. The page ends with the board, then Theophilus's World, then References, as before.

## How it was checked

- **The page, in the pane** at 1440 × 900 (the Mac): the top with the manuscript stack (`mac-01`); the double rose in the flow, centred in the column, the circles faint, the petals and hexagon dark (`mac-02`); the came stack beside the came paragraph, the examples stack ending level with the last paragraph, the instructions (`mac-03`); the board, its column at the page's left column, 0 and 1 in the table (`mac-04`). Console: the stamp only, no errors.
- **An iPad upright** (the pane at 768 × 1024): the rail folds, each stack centred above its paragraph (`ipad-upright-01`); the double rose at 440 px in the column (`ipad-upright-02`); the board with its column, the first-visit box at the column's foot (`ipad-upright-03`).
- **An iPad on its side** (1024 × 768): the last paragraphs and the board (`ipad-side-01`).
- `tools/check-deploys.sh` on the page: no errors; one warning, the untracked files (the three palette photographs, old, and the new SVG, which this commit adds).
- Not checked: the iPadOS simulator by finger (the board is unchanged, and the words are words); the site after the push, which is Michael's look.

**Pictures**, in `Glass-900-Years-Ago-Nov04-Words02/`:

| File | What it shows |
|---|---|
| `mac-01-top.jpg` | The title, the new date line, the manuscript stack, the first paragraphs. |
| `mac-02-double-rose.jpg` | The double rose and hexagon in the flow, with its caption. |
| `mac-03-came-examples-instructions.jpg` | The came stack and the examples stack beside the paragraphs about came and the window; the instructions. |
| `mac-04-board.jpg` | The board after the last paragraph. |
| `ipad-upright-01-top.jpg` | The iPad upright: the rail folded, the stack above the first paragraph. |
| `ipad-upright-02-double-rose.jpg` | The iPad upright: the double rose. |
| `ipad-upright-03-board.jpg` | The iPad upright: the board and the start of Theophilus's World. |
| `ipad-side-01-board.jpg` | The iPad on its side: the last paragraphs and the board. |
| `draw-double-rose.py` | The script that drew the SVG. |

## What needs Michael's eye

- The double rose and hexagon: whether the drawing is the pattern he meant, and whether a design in lead on chalk is the right picture there, or a window of glass.
- *Demos* for *Demo*.
- The three stacks, now that the text no longer points at them.
- The date line: 1100 against the World's 1120.

## Open, and named, not decided

- The compass picture. A photograph wants his word before it is fetched.
- The story's frontmatter (per Story-Voice: title, year, placement, the timeline line, sources, the gallery picture) is not in `Story-Glass-900-Years-Ago-02.md`; the page keeps what the earlier build had (across; Rose II as the gallery picture).
- The Stories Ledger line still names the story *Stained Glass Circles* and says the draft is not in a story file; both corrected to the 4 Nov text.
