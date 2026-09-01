# 00-DECISIONS

Append-only. One line per settled question, newest at the bottom of its
section. **Never edit a line, never delete one, never reorder.** If a decision
is reversed, add a new line saying so and leave the old one standing.

This file cannot conflict with anything, because it does not describe how the
world is. It records what was decided and why. When you have forgotten why
something is the way it is, look here first.

Format: `YYYY-MM-DD — decision — reason. [who]`
`[M]` Michael originated. `[C]` Claude proposed, Michael accepted.

---

## Standing — which document to believe

When documents disagree, this is the order. Only the top one is authoritative
for its subject; the rest are history and may be wrong.

| Subject | Authoritative | Superseded, kept for history |
|---|---|---|
| Map tools — what exists and what each is for | `Map-Tool-Catalog.md` | `Rectangle-Tool-worknote.md`, `Map-Tools.md`, `Map-Tool-Roadmap.md`, `Map-Regroup-Aug19.md` |
| Map tools — voice register | `Voice-Samples-Map.md` | — |
| What is moving right now | `00-BOARD.md` | — |
| What has been settled | this file | — |

Deep-dive documents (`Fog-Map.md`, `Irrationality-on-the-Map.md`) are not
superseded — they are the long form of a catalog entry and the catalog links
to them. They are believed on detail, the catalog is believed on scope.

---

## Decisions

2026-08-22 — The catalog is the single source for map tools; everything else is
dated sediment. — Five documents were all written as if authoritative, and the
conflicts confused a session. [C]

2026-08-22 — Corrections stay visible rather than being silently replaced. When
a claim fails, the record says what was claimed, that it failed, and what
replaced it. — Michael half-remembers things and a clean page makes his memory
feel wrong when it is actually right. [C]

2026-08-22 — Nothing goes to Claude Code until Michael has read the tool's
kid-voice paragraph and it landed. — Gate 3 is also the comprehension gate;
if Michael cannot follow the paragraph, the tool is not ready regardless of
whose fault that is. [C]

2026-08-22 — Deploy when a child could do something she could not do the day
before, not once per session. — Otherwise Claude Code is spent on churn and the
Netlify URL keeps moving. [C]

2026-08-22 — The walk restarts, and its first step is handles-versus-menu. —
Everything else in the interface inherits from that choice, and the
seventeen-tool list is available as a stress test. [M]

2026-08-22 — The walk designs the container, not the membership. Stress-test
the architecture against roughly thirty tools when seven are catalogued. — What
is expensive to change is how many collections exist, how a tool says what it
is for, and where explanation lives. Which tools sit where is cheap. [C]

2026-08-22 — Sound is a separate project and does not belong on the map board.
[M]

2026-08-22 — The running total under the constant-area drag updates
continuously during the drag rather than on request. — Equal ratios cut equal
slabs; a child will see the number climb by the same step at each doubling
without being told to look. [M]

2026-08-22 — Both readings of the same grid are kept: a 10-wide map at tenths
and a 100-wide map at integers are the identical lattice, and the tool lets her
hold both. — This is T8's strongest use and the reason it is a tool rather than
a setting. [M]

2026-08-23 — The map-tool documents are migrated into the vault at
`CWVault/claude/`, not declared Project artifacts. Nine documents, including
`Modular-Arithmetic-for-Kids.md`. — This closes the first item under *Open, and
deliberately so*, which stands unedited above because this file is append-only.
Work living only in a Claude Project has no path onto disk unless someone
carries it, and this is the third batch found that way. [M]

2026-08-23 — `MANIFEST.md` keeps its scope: the publish directory and nothing
else. `CWVault/claude/` is registered on the board alone. — Widening MANIFEST
makes it a second board, and two files disagreeing about what exists is the
problem this session exists to fix. [M]

---

### The shelf — settled 24 Aug

These are the load-bearing ones. The walk set out to move four modes —
Multiply, Build, Explore, Properties — off the top of the window and into
collections down the sides. The answer turned out to be that they do not move.
They dissolve.

2026-08-24 — **Modes are abolished. The gesture and the place it starts decide
what happens.** The axis is where you make things; the field is where you ask
about things. A drag is a whole sentence. — Neither a mode menu at the top nor
handles on a rectangle. A construction gesture was producing an interrogation
answer, which is why the existing multiplication tool feels rich and swamping
at once; Divide and Make This Square feel clean because they only ever answer
the question that was asked. [C]

2026-08-24 — **There is no view menu.** What looked like display options — show
both rectangles, show every way to make this number, show unique products only
— are catalog tools, not settings. Flip, tap-a-number, and the diagonal fold
respectively. — Building them as a menu means building each of them twice. Show
what she asked for; let more arrive by gesture. [C]

2026-08-24 — **No "choose your view the first time" preference.** — It puts
state somewhere she cannot see, and in six weeks neither she nor Michael will
remember what was picked. The leftover choice in Divide works because it is a
live decision about two tiles visible in front of her. A view preference is not
that. [C]

### Gesture grammar — settled 24 Aug

2026-08-24 — **First click plants a vertical bar on the axis; the second sets
the height and builds the rectangle.** So the first number is x — not as a rule
she must remember, but as the order things happened in front of her. — Only the
same-axis case needs the rule at all, since one click on x and one on y is
unambiguous by position. A rule that applies exactly when needed and is
invisible otherwise. Also makes this the same instrument as Divide: width
first, in both tools, and the axis is where widths live. [C]

2026-08-24 — **Two numbers may be taken from the same axis.** 6 and 7 both from
x is deliberate and slightly odd, and it is the doorway to the pronic walk —
6×7, 7×8, 8×9, each a quarter short of a square. — Worth preserving even though
nobody would guess it exists. [M]

2026-08-24 — **On touch, the drag is the hover.** Finger down on the axis, the
bar follows with the number reading live, release to plant. The ordinary case is
one continuous stroke: down on the axis, slide to set the width, move up into
the field and the rectangle grows behind the finger, release to commit. A plain
tap is a drag of zero length, so nothing extra is built and she never learns
there were two options. — Hover does not exist on a tablet and most of these
children are on tablets. Nothing may depend on a cursor change. [M]

2026-08-24 — **The live readout floats above the finger, on the side the drag
came from; a second fixed copy sits in a constant corner, the same corner in
every tool.** — Her finger covers what she is setting. Mirroring off the drag
direction rather than a handedness setting means it never asks a ten-year-old
which hand she uses, and above is the offset that reliably clears a hand
approaching from below. The fixed copy is for reading carefully once she has
stopped, and is the only one that works when her hand is genuinely in the way.
[C]

2026-08-24 — **Release is forgiving: a stray release snaps to the nearest legal
spot rather than cancelling.** — Fluent users make fewer mistakes, so the cost
falls on beginners if it cancels. Bonus: she can deliberately fling toward the
edge to get the extreme, which is the first thing a child probing for breakage
will try. [M]

2026-08-24 — **Edges answer in the same voice as the middle.** No special cases,
no error messages, no cheerful apology. — A child probing for what breaks is
doing mathematics, and the tool's answer should be either "you found a hole" or
"you found the shape." Division by zero is handled by the geometry — a bar of
zero width has nowhere to put the tiles — rather than by a rule anyone wrote.
[C]

### Operations — settled 24 Aug

2026-08-24 — **Refinement into tenths is always her choice, never automatic**,
in both Divide and Make This Square. — In Make This Square the moment worth
having is *four is too small, five is too big, and there is no whole number in
between*. An automatic slide into tenths skips it in half a second. [M]

2026-08-24 — **The flip is a journey, not a claim.** The copy rotates and slides
onto the original, sitting exactly — proving same size — then continues across
the diagonal and settles into its own cell. Same number, two homes, the diagonal
visibly the crease between them. On the diagonal the flip goes nowhere: 7×7
rotates onto itself and stops, so squares are the numbers with only one home.
[C]

2026-08-24 — **Make This Square offers two options where Divide offers three,
and nothing occupies the gap.** No greyed-out button, no explanation, no
tooltip. — There is no fraction that squares to 18. If the tools are built to
look deliberately alike, the missing button is the difference between rational
and irrational, sitting where she can find it without a word being said. [C]

### Primes — settled 24 Aug

2026-08-24 — **Primes are buttons, filled in from the bottom and left edges.** —
There is no reason to place the first ones anywhere but the axes, and filling
from the edges makes the axes the *source*: every number in the field arrives
from two numbers on the edges. She would never articulate it, but she will have
watched it happen a hundred times. [M]

2026-08-24 — **A press means "let this prime into the world," not "multiply by
it once."** Cells arrive already carrying however many copies they need. For 2,
all multiples fill at once and she is told so; 3 downward is quick enough to be
worth watching build. — The sweep is the surprising part. Requiring repeated
presses to reach 12 = 2×2×3 would destroy it. [M]

2026-08-24 — **The order of the primes is hers to choose, and the exhibit is the
asymmetry.** 7 first buys three cells, then 5 buys three more, then 3 starts
multiplying against what is there, then 2 takes half the map in one gesture.
Reversed, 2 floods immediately and 7 is a whisper. Same primes, same final map,
completely different experience. — Small primes being worth vastly more is the
fact behind the fog, T5, and the density result. Replayable in a different
order. [C]

2026-08-24 — **A wrong prime does not produce a message. The button does not go
down.** — Silence still leaves her wondering whether she pressed properly. A
button that will not depress has already said so, physically, with no mark on
the screen and nothing to feel bad about. [C, extending M's "we don't respond"]

2026-08-24 — **1 is not a button. It is filled in from the beginning and has no
colour.** — To Pythagoras 1 was the generator. Every other cell shows what it is
made of; 1 is made of nothing, so it shows nothing. She never has to be told it
is not prime — it is the only cell with no sections, and it was there before she
pressed anything. [M]

2026-08-24 — **The endless-supply workshop is built before the consumable-supply
puzzle.** — Endless is a workshop, consumable is a puzzle with a solution. Two
different tools; the workshop is the one that surprises teachers. [C]

---

## Observed with children

The scarcest evidence this project has. Everything else in the vault is
computed or argued. Recorded separately so it is not flattened into opinion.

2026-08-23 — **Children find the odd numbers quickly and generalise to any
number on their own, unprompted.** Michael has run the square construction —
1, 3, 5, 7 wrapping into a square — with children on paper over a period of
years. They see it works for any number without being told. Never yet tried
with arbitrary (non-integer) numbers; that is what the tool adds.

  *Consequence, drawn 24 Aug:* nothing animates over the top of a child who is
  about to guess. If she is reaching for 9, the tool must not supply it first.
  This is a constraint on animation timing that comes from practice rather than
  theory.

2026-08-24 — **Teachers are surprised by the 2-sweep**, when selecting all
multiples of 2 completes half the map in one gesture. Michael's observation from
running this by hand. Recorded because a reaction from an adult who already
knows the mathematics is evidence about the *presentation*, not the content.

---

## Corrections

Kept because the wrong version is often the memorable one.

2026-08-19 — **Claimed:** a 10×10 map contains 55 distinct products.
**Actually:** 55 is the number of distinct *rectangles* (unordered a×b pairs).
There are 42 distinct products. **Caught by:** computation, gate 2. The gap
between the two numbers is the collisions, and is itself worth showing.

2026-08-22 — **Claimed:** a constant-area drag will settle into the square by
perimeter friction, because perimeter is minimal at the square.
**Actually:** true but useless. For N = 53 (√53 = 7.2801) the perimeter at
x = 7 is 29.143 against a minimum of 29.120 — 0.077% above minimum while a
full 0.28 away from the root. The well is far too shallow to feel.
**Replaced by:** drive the detent from the difference between the sides,
|x − N/x|, which is 0.571 at x = 7, 0.161 at x = 7.2, and falls cleanly to 0.
**Caught by:** computation, gate 2, after being asserted confidently in
conversation.

2026-08-22 — **Claimed, by appearance:** the frontmatter in `CWVault/claude/` is
the frontmatter those documents were written with. **Actually:** it was
reconstructed. The nine documents reached disk through `pbpaste`, which captured
the *rendered* preview, so the markdown syntax was gone before the files existed
— frontmatter flattened onto one line with no delimiters, headings and lists
reduced to plain paragraphs. On 23 Aug the blocks were rebuilt by splitting that
line at the known keys (`status`, `role`, `pillar`, `intuitions`, `authority`,
`related`) and wrapping in `---`. Every value is original; the *structure* is
inferred. **Recorded because** in three months it will look original, and because
restoring the headings and lists is the same inference at larger scale and must
be flagged the same way.

2026-08-24 — **Claimed, by datestamp:** the T8/T9 additions file and the first
block of decisions above were written on 22 Aug. **Actually:** they were written
on the 23rd. `Map-Tool-Catalog-Additions-Aug22.md` was named and stamped a day
early, and the decision entries were stamped to match it, so that whole block
runs one day ahead of itself. The Divide and Make This Square specs, stamped
23 Aug, are correct. **Consequence:** the *order* of everything is right; only
the absolute dates in that first block are off by one. Left uncorrected in place
because this file is append-only and because a wrong date that is documented is
safer than a right date that was quietly swapped in.

---

## Open, and deliberately so

Listed so they are not mistaken for oversights.

- Migrate the map-tool documents into the vault, or declare them Project
  artifacts. They are currently in neither git nor the vault.
- A base-six map. The arithmetic is easy; the symbols are the problem, since
  101 does not look like five.
- Whether the real-number plane, polar, and spherical maps arrive — held until
  each can be shown to delight rather than merely generalise.

Added 24 Aug:

- **Kid-voice paragraphs for Divide and Make This Square.** Gate 3 unmet on
  both; neither goes to Claude Code until written and read. To be written
  together, in one voice, alongside Multiply's.
- **Multiply has no spec**, and yesterday changed it substantially. Three pieces
  are undesigned rather than merely unwritten: the tap-a-number branch (half the
  tool); what a rectangle *does* after it exists, which gates most of the
  seventeen-item catalog — if it vanishes on the next tap, most of the catalog
  has nowhere to live; and where the product number appears, since area is the
  hardest of the three answers to read off a picture.
- **Does the flip journey repeat every time?** Lovely once, forty animations by
  the fortieth multiplication. Divide solved this with per-divisor acceleration,
  but the flip is a choice rather than a step. Bench question.
- **Is a same-axis rectangle a different animal?** 6 and 7 both from x has no
  natural home, since neither number was ever a height. Lands at (6,7) like any
  other, or looks different? Bench question.
- **Do the colour sections show how many of each prime, or only which?** 12 and
  6 both contain 2 and 3. If sections are proportional to the count, 12 reads
  two-thirds blue and 6 reads half — different pictures, sortable. May already
  be answered by the existing scheme; if not, may be worth it. Also unknown
  whether the scheme survives *animation*, which is a different demand than
  showing a factorisation at rest.
- **The prime-button design has no bench and no computation behind it.** It went
  from idea to settled in about four exchanges of conversation on 23 Aug. The
  entries above are recorded as decisions because they were decided, not because
  they were tested. Read them cold before they harden into a spec.
- **Whether Make This Square should know about T3.** Both find √18 — one by
  settling into a shape, one by building it ring by ring. Unknown whether a
  child meeting both finds that satisfying or confusing.
- **That the primes go on forever is not addressed by any of this**, and a child
  could reasonably conclude from four buttons, then five, then six, that someone
  has the complete list. Not a flaw to patch here. A hook for something later.
