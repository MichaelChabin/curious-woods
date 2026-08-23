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

---

## Open, and deliberately so

Listed so they are not mistaken for oversights.

- Migrate the map-tool documents into the vault, or declare them Project
  artifacts. They are currently in neither git nor the vault.
- A base-six map. The arithmetic is easy; the symbols are the problem, since
  101 does not look like five.
- Whether the real-number plane, polar, and spherical maps arrive — held until
  each can be shown to delight rather than merely generalise.
