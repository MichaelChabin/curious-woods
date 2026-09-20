---
status: Rulings — 14 Sept 2026, from the brain-series sessions; amended 15 Sept (dates), 16 Sept (picture placement; instructions to the child; the Maya flag and Remember; gestures across tools; images as evidence), 18 Sept (colour; a picture in a window; the three conflicts reconciled), 19–20 Sept (the gallery: what comes and goes; the paintings as stories; Spec-Gallery). Canonical until Michael says otherwise; where this contradicts CW-System-Foundation.md, ask. Where it contradicts UI-Language.md or other earlier design documents, this wins. One copy lives in the project and one in the vault; the manager chat keeps them identical. If they differ, tell the manager chat and don't guess.
role: The decisions that came out of building The Man Who Learned Without Knowing, Three at a Glance and About Your Brain, written down so no later session relitigates them.
---

# Rulings, September 2026

## Dates
In prose, conventional years, full stop: 1953, 1874, 2008. Michael's reason: "1953 is a word, not a number." The "after the ice" count (11,953) is retired from story text and the atlas.

After-the-ice years are **not** eliminated. They stay on the timeline, where they are distances, not labels. The scale of time is the timeline's job, not the date's. Whether the timeline runs before a story or hangs in the gallery is a separate question (see What-CW-Is; currently leaning gallery).

*(An earlier text of this entry said "retired everywhere, timelines included." That was superseded by Michael on 15 Sept and is wrong.)*

## Colour (18 Sept 2026)

**The glass palettes in `palettes.json` are a source, not a constraint.** They were pulled from glass and paintings, they sit well together, and a page built from them will look right, which is why they are the first place to look. But a tool may use colours outside them when the job needs it, and `palettes.json` stays what it is: the palette of the Glass labs, with its chemical recipes, not a site-wide law.

What holds everywhere is the weaker rule. Whatever a page uses must sit comfortably beside the rest of the site, and it must do its own job first. A map's job is to be read: height has to read as height and ice has to read as ice, and no palette gets to override that. Michael's reason: "The glass colours should not be restrictions."

The first case was the map palette. Hokusai gave a beautiful ocean and then painted Greenland the colour of desert, because iron oxide is what the ramp reaches at altitude, and the same iron oxide is a near-twin of the vermilion a story marks its places with, so the marks disappeared into the mountains. The map got its own ground colours. See `Spec-Maps.md`.

## A margin, in an across story (20 Sept 2026)

**`across` gains a left margin.** The 16 Sept text said an across story has no side panel at
all. That was right about the picture the text stops for and wrong about everything else. A
story may want a small picture that is *reference* rather than subject — a map answering
*where is that*, a portrait, a diagram of a thing named in passing. Michael, on the Hokusai
story: "Actually a margin — the left column should be in the UI docs." It is: `UI-Language.md`
§1–§2, the context membrane.

So: the reading column stays 700 px and stays where it is. To its left sits a margin 300 px
wide with a 28 px gap — 1028 px in all, and that shell is what a full-width picture spans. A
margin picture sits beside the text it belongs to and scrolls with it. Below 1068 px there is
no room for a margin, and every margin picture drops into the flow above its text.

**A margin picture is not named by the text.** This is the difference that matters. A picture
the text stops for must be named, because the child is being asked to look at it now. A margin
picture answers a question she may not have asked; it carries a caption of its own and the
prose never mentions it. A story that finds itself writing "the map on the left" has put the
picture in the wrong place.

**What still belongs across the full width:** anything she works in, anything with a tool
attached, and anything she is meant to study rather than glance at.

## How wide a timeline is (20 Sept 2026)

Michael, on the Hokusai story: "We need some kind of guideline that permits that kind of
choice." The choice was widening a timeline past the twenty or thirty years asked for, to
reach Perry's ships in 1853.

**The rule: a story's timeline runs from the earliest event that explains the picture to the
latest event the picture explains.** Nothing outside that is on it. For the Great Wave that is
Tambora in 1815, which put the strange skies in everyone's eyes, to the American warships in
1853, which ended the closed country the print was made inside. Forty years, and every marker
on it earns its place from one end or the other.

The span is the story's to choose and it is stated in the story's notes, with the two events
that fix the ends. A timeline that has been widened for symmetry, or to make a nice round
number, has been widened for the wrong reason.

## Copper on a map (20 Sept 2026)

`Spec-Maps` says everything a story draws is vermilion, with two wash colours and no third.
That holds, with one addition: **a place the story is actually about is drawn in copper**, a
little larger than the rest. Michael: "I think it is a good idea to be consistent for kids."
Copper already means *this is the one* on a timeline; it now means the same thing on a map, so
the meaning travels with her instead of being relearned. One place per map at most. In
`map.js` it is `lit: true` on a `place`.

## The Maya flag, and "I want to Remember this" (16 Sept 2026)

Maya is an implementation of Claude that ships later. **Everything we build carries a Maya flag**, one global switch saying whether she is present, and behavior may legitimately differ on each side of it. Build both sides from the start; don't retrofit.

The first thing that hangs off the flag is the Remember inscription.

**Maya present:** "I want to Remember this" is there all the time, exactly as `UI-Language.md` §4 describes: permanent, unfading, the one fixed point. It can afford to be always available because Maya can find out what the child actually wants to remember. She can ask.

**Maya absent (today):** the inscription appears **only** when the text explicitly refers to it, fading in as that reference comes near, and only with a promise of what it will do: that it will put a specific thing in her practice queue. Without Maya there is nobody to work out what she meant, so an always-present button would be a button that does nothing in particular. A story that summons it must name what goes in the queue.

Two consequences. First, the `#remember` element in Glass Geometry is a placeholder with no handler, so today it should not be on screen at all; it is not "permanent but broken," it is "not yet summoned." Second, with Maya absent the inscription arrives inline where the text calls it, which a single column handles naturally. Where it lives in one column *with* Maya present is still open.

Nothing may promise the practice queue until the practice queue exists.

## The brain
One painting, two views (outside, cutaway), one set of region tables. It lives in two places and must stay one thing:

*Standalone*: About Your Brain, in the gallery. The mini-atlas: regions, names, plain explanations, ten experiences that light up pathways, speed control, museum-exhibit stance.

*Inside stories*: the same engine, with the controls the story needs and no others. A story may call it more than once; each call is a separate picture with its own starting state.

## Pictures in a story

**A picture belongs to a stretch of text, and the text must name it.** That much holds in every arrangement. There are three arrangements for a picture the text stops for, and the story says which, once, in its frontmatter: `placement: panel`, `placement: beside`, or `placement: across`.

*Panel* is the original two-column layout of `UI-Language.md`: narrative right, a single left panel that shows whichever picture belongs to the text nearest the middle of the window. Pictures swap; the reading eye never moves. The Man Who Learned Without Knowing is built this way. Right for a story with one or two interactives that arrive at different moments.

*Beside* (16 Sept, Michael, on Three at a Glance) is also two columns, but nothing swaps: every picture is present, sitting beside the text that names it and scrolling with the story. Michael preferred it for a story with several experiments: no experiment waits on another, and it is plain that they are separate experiments, titled *Experiment 1*, *Experiment 2*, and so on. Three at a Glance is built this way.

*Across* (16 Sept) is for a picture that needs width: a construction, a grid, a bench the child works in. It runs the full width of the text column and the story continues underneath. There is no side panel in this arrangement for *that* picture — but see "A margin, in an across story" (20 Sept), which gives across a left margin for small reference pictures; the page is one column. Anything the picture needs (a palette, tool words) belongs to the picture and sits where the picture puts it. Supporting images sit in the flow of the text, at full column width. Michael's reason: geometry doesn't fit in a side panel.

What made the original rule good is preserved in all three: the reading eye never has to negotiate with an image.

**Which is the default** for a new story is not yet ruled; until it is, the story chat chooses and says why in its notes. Working guidance: one or two interactives, *panel*; several experiments, *beside*; anything wide, *across*.

**The naming words follow the placement.** With *panel* or *beside*, the text says "on the left" ("Tap the brain on the left…"). With *across*, it says "here" or "below" or just names the thing ("The table below is yours now"). A story must not say "on the left" about a picture that runs across the page.

**What a picture keeps.** When its text moves off (in *panel*, when it swaps out): a picture she can only *look at* resets to its starting state; a picture she *works in* keeps what she made. The star story was the first case ("her trips are hers and stay") and it is now the general rule, not an exception.

**A picture in a window (18 Sept 2026).** The arrangements above are for a picture the text stops for. A picture may also arrive because she tapped a name: a small map answering *where is that*, a timeline event opening what it holds. That one is not placed by the text at all; it opens over the page, answers, and shuts. It is not a new invention: it is the picker window Glass Geometry already uses (backdrop, drag handle, close), so it opens in a thing she knows how to shut. Nothing instructs her to open it; the name she tapped was the instruction.

## Images that support a story (16 Sept 2026)
Every image is evidence, not decoration. Each one answers a question the text raises: did people really do this, is this a real thing, what is it actually made of. An image that only makes the page prettier is left out; so is one that shows her something she can already picture (a honeycomb, ice on a window). Source and licence are recorded in the story's frontmatter.

## The gallery
The child's home page is her *gallery*, not a dashboard. Works hang like paintings in a show: each in a coloured frame that suits the picture (frame widths vary for looks, not meaning), a thin mat, the title centred below in one type; sizes vary; the wall flows and nothing overlaps. Below a hairline: Practice centred, the copper ensō with no title, about a third larger than a plaque; at the right, three plaques of one size, Saved Stories, Labs, Experiments, with no pictures. Spec-Gallery.md is the build.

**What comes and goes (19 Sept).** The wall is rehung each visit, always appealing and never the same. A story she has finished comes down next visit unless she has kept it, and another goes up. Kept stories live in Saved Stories; what she wants to remember goes to Practice; her trail is disposable. All of it on her device, nowhere else.

**A story's icon is a detail of the story itself**: a square crop of its hook image (Turner's cloud, Holst's fleeing student), or the story's own interactive drawn as a mark (the star story's tilted star with a copper dot). What it is never is artwork made only to be an icon. The story's frontmatter names the icon, the frame colour, an optional frame width, and a size; the build hangs it. *(Reconciled 18 Sept: the earlier "never separate artwork" and "the tilted star" were both right and are the same rule.)*

**The paintings are stories too (19 Sept).** Any picture that hangs earns a story of its own: who made it, how (a woodcut), the pigments, or a brief introduction to a famous or appealing work ("this is not a pipe").

## Timeline references
Every story gets a one-line explanation for the moment a child taps it on a timeline. One beat, adult register, no "learn about". For the star story: *Henry lost the ability to remember anything new. His hand kept learning anyway.*

## Voice
Story-Voice.md is the full statement. In brief: first person is the narrator's and never claims an experience; testimony is third person by name ("Michael tried this and he says…"); roles are specific (neurosurgeon, neuropsychologist, not "doctor"); sources are primary or peer-reviewed, and for the brain, neuroscience (Dehaene, Milner, Schwarzlose, Iversen at McMaster, Hart), never education research; positives first; a story shows a technique, it never prescribes one; a short References section follows More.

## Instructions to the child (16 Sept 2026)
Narrative may be elegant. Instructions must be literal. Where a story tells her to do something, it names the gesture and the word on the screen, in that order, with no metaphor in between: "tap *Just the glass*", not "hold it up to the light, which on this table means *Just the glass*". The word in the story must match the word on the screen exactly. *Tap* is the verb everywhere, for mouse and finger both.

## Gestures across tools (16 Sept 2026)
When a new tool or bench needs a gesture, or two gestures collide, **Glass Geometry decides first; if it has no answer, the multiplication lab (Glass) decides.** Only if neither has an answer is a new gesture invented, and then it is named and brought to Michael, not slipped in. The effect is that a gesture she has learned in one tool means the same thing in the next.

## Benches
Three skeletons cover most brain-series interactives: Flash, Creep, Trace (Spec-Trace-Bench.md). A new puzzle is a new road or rule, never a new program. Nothing is scored, ranked, or congratulated; counts appear only when she asks for the graph.

## What still needs a ruling
The default picture placement for new stories. Whether gallery size means anything, and whether the hang is fixed or shuffles. Whether the two-brain comparison should ever be side by side. Where the Remember inscription lives in a one-column story when Maya *is* present. Where After the Ice hangs and how it starts. Draft 3 of the star story document, to match the page.
