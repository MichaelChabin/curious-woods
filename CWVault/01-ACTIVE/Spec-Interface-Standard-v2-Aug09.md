# Curious Woods — Interface Standard (v2)

**Status:** Revised 2026-08-09 after Michael's full review of the draft.
Reconciles the February documents (Interface-Foundation, UI-Language) with
built reality (Glass Geometry through Phase 4) and the needs of five surfaces:
Stories, Physics of Music, Rhythmic Practice, the Multiplication family
(extending to division, fractions, roots), and the Timeline. Where February
and the built thing disagree, this document names the winner. Nothing here is
child-facing copy.

**Relation to existing documents:** Interface-Foundation remains authoritative
for the color palette, typography, and (when built) the Maya conversation UI.
UI-Language remains the source for animation timing and the two-panel story
layout, except where superseded below (hover-expand; panel fading). This
document sits above both.

---

## 1. Governing principles

1. **Labs produce artifacts; practice produces fluency; the child chooses
   when.** A lab never quizzes, congratulates, or announces objectives.
   Wanting-to-know lives in the Practice app and belongs to the child.
2. **The world continues; tools float over it.** The world — plane, story
   page, keyboard lattice, timeline — extends past every window, never
   letterboxed. The membrane and everything in it renders *above* the world,
   unobscured at all times: the world shows through translucent gaps but never
   through contents. Palette chips, words, and panels always win.
3. **Controls are words, and a control-word says what tapping it will do.**
   Show map / Hide map — the destination, never the current state. No dots or
   symbols between words unless they mean something the words don't. Nothing
   greyed out, ever; options appear when possible and fade when they don't
   apply.
4. **Nothing speaks like a teacher.** Flat and factual survives; enthusiasm
   and assessment don't. Biomorphs is the calibration reference. Every commit
   that changes child-facing text prints the full string list at review.
5. **The child's data is hers.** Local, portable, exportable as a file she
   carries. No accounts, no server-held history. Sharing is child-initiated.

## 2. The standard parts

Present on every surface unless a surface argues its way out in writing.

**Ground and type.** Parchment `#f4f1e8`; Georgia; the Foundation palette and
CSS variables; 700px max for reading text.

**The membrane (left panel).** Sized by its contents, breathing per
UI-Language timing, translucent over the world per principle 2. Holds what is
*live*: contextual word-controls, the palette when relevant, the viewing
strip, the Remember inscription. Occasional acts (New, Open, Save and kin) do
not hold permanent residence — see choice panels. On narrow screens the
membrane's contents fit above the fold or scroll independently; the world
never scrolls to reach a control.

**Info panels.** The Geometry pattern, extracted as a shared component:
movable, closable, floating above the world. Fading is conditional: **a panel
fades only if untouched and static. A moved panel is a commitment** — the
child has curated her workspace, and it stays until she closes it (the same
principle as tools dragged onto the canvas). Two kinds, fixed at opening and
never changing kind afterward:
- **Lens panels** open about the current selection and track it — select 7
  and the panel shows the multiples of 7; select 11 and the same panel now
  speaks of 11. One panel per question, not per answer.
- **Record panels** hold a specific thing — instructions, a saved item — and
  never mutate under her. A record must never silently become a lens.

**Choice panels.** A control with more than one outcome opens a small panel of
choices: each a clickable word beside one quiet line saying what it does, in
the recipe-line voice (11px Georgia italic, reduced opacity — a plain fact,
never a tooltip, never instruction). This replaces UI-Language's hover-expand,
which assumed a cursor. The panel behaves as any panel: movable, closable,
fades after choosing. The explanation lines are child-facing copy and ride
the voice pass. The explanation beside the word is also the newcomer's cue
that words act.

**The viewing strip.** One place where a surface's state controls live, named
by destination per principle 3. Sound off lives here on every sounding
surface, same position, same words. (Three-state cycles: deferred to the
controls pass; instinct says reduce three to two.)

**Undo.** Undo touches only marks on the world. The log records viewing
changes so replay reproduces what the child saw, but undo skips them — state
changes are reversed by their own explicit controls (that is what
destination-named titles are for). Tap-in-empty-space must never make the map
disappear.

**Save and share.** Two saves everywhere, one distinction: *the record* (a
replayable log — construction ops, a build sequence, a recorded tune) and
*the artifact* (an image — postcard or letter — the child annotates and sends
to a grandparent). Both local. Every lab honors the typed-thing contract: it
can say what is on the table right now as a typed thing. That contract feeds
saving, Remember, and the tap contract below.

**Sound.** Two registers, one rule each:
- *The interface's voice* is one voice: a shared tone table across all
  surfaces, so 7 sounds the same in Multiplication, Rhythmic Practice, and
  the Sound Series, and the vocabulary transfers.
- *Content sounds* are unlimited — timbre, instruments, sonar, culturally
  significant sound arriving attached to tools. The no-notation rule (steps
  0–11, ratios, Hz; no letters, sharps, flats, staff) is the Sound Series'
  own epistemology, not global law; a story about why pianos have black keys
  may say "black keys."
- **Permission:** no surface produces any sound until the child has said yes,
  once, explicitly — a quiet word at the first moment sound could happen, not
  a modal on load. Her answer persists locally. Sound off is always one tap
  away in the viewing strip, same place on every surface. (A child may be up
  at night, or in a library.) Technically, the AudioContext resume is
  synchronous inside the gesture handler; Safari requires it and Safari is on
  every acceptance checklist.

**Touch.** iPad is first-class: 44px minimum for controls, pinch landing on
the surface's own clamp, Share sheet, downloadable artifacts that open
correctly from Files, full-screen by default where the platform allows (Add
to Home Screen launches labs like apps). Precision *on the world* is an owned
open question — see §8.

**Accessibility — the tap contract.** Anything tappable can say what it is
and what it is made of, in one line: "fifteen — three, five"; "point, where
two circles cross." The spoken order matches the visual order (pieces
smallest-first), so ear and eye learn the same grammar. This is the
typed-thing contract spoken aloud; the virtual cursor speaks the same line;
the lines are child-facing copy. Color never carries meaning alone at the
standard level; where a lab makes color load-bearing (Multiplication's
primes), a colorblind-safe workshop is the named answer and its quality is
load-bearing.

## 3. The plane, where it applies

Multiplication, Geometry, and the Timeline stand on `js/plane.js`: one
camera, pan and zoom without bounds, placeable 0 and 1, the declared unit,
the 1–5–10 lattice ladder, tied/untied zoom, the pixel floor. The Timeline is
the plane with one axis and years for units; its anchor years are furniture,
never announced.

**The Sound Series' axes — the stress test, specified.** The y axis is one
axis under two rulers: every position is both a step from home and a
frequency in Hz — the same physical fact named two ways (number is not
numeral, applied to pitch). The mode decides which ruler drives: tone mode
scrolls in equal steps (a log axis in disguise), frequency mode in equal Hz
(linear). With both rulers visible, equal tone steps are visibly unequal
frequency steps — the logarithm encountered as a property of hearing before
anyone names it. The x axis is time: music leaves marks, a recording is a
construction, and it inherits everything constructions have — save the
record, replay it, postcard it. MIDI input draws on this plane directly.
Dual rulers and a log-spaced lattice are new plane capability; if pan-and-
zoom survives one linear and one log axis, the plane is a real platform.

## 4. Stories and the story–lab door

Stories keep the February two-panel layout: right panel pure narrative, left
panel synchronized images. The addition: **a lab tool can appear in a story's
left panel running a replayed record.** A story shows an equilateral triangle
being made — that is a saved construction replaying; "could I see another?"
loads a different log. Stories that wait for a physical judgment made with an
instrument (the tuning narratives) are the same door from the other side; a
separately named form is likely unnecessary now that stories can contain any
interactive — to be confirmed against the experimental stories Michael is
writing. Noted for the record: the tools are becoming a storytelling grammar
— stories told in the lab's vocabulary let a child walk from story into lab
carrying the vocabulary with her.

## 5. The five-surface test

A part is *standard* only if it survives all five surfaces; otherwise it is
per-lab and must say so.

| Part | Stories | Music Physics | Rhythmic Practice | Multiplication family | Timeline |
|---|---|---|---|---|---|
| Parchment/type | yes | yes | yes | yes | yes |
| Membrane + word-controls | yes | yes | yes | yes | yes |
| Info/choice panels | rare (prose is the world) | yes | yes | yes | yes |
| Viewing strip | no | yes | small | yes | yes |
| Plane | via replayed tools | yes — dual-ruler y, time x | no | yes | yes (one axis) |
| Record + artifact saves | passages/images | recordings, tuning sessions | practice records, no scores | constructions/builds | marked spans |
| Interface tone table | where sound occurs | yes | yes | yes | optional |
| Sound permission + off | yes | yes | yes | yes | yes |
| Tap contract | yes | yes | yes | yes | yes |
| Remember gesture | yes | yes | it is the destination | yes | yes |

Rhythmic Practice is the deliberate outlier: the one surface where the child
*asked* to work on fluency, so rhythm-as-syntax is permitted there and
nowhere else. Even there: records, never scores; the queue is a garden she
visits, not a debt that accrues.

## 6. Standard vs per-lab

Per-lab and proudly so: the material (glass, sound, years), the gesture
vocabulary on the world, the workshops/palettes, which viewing-words exist,
defaults per viewing (Geometry greets with earned numbers; Multiplication
greets as a map). The test for any new element: could a child who learned it
in one lab be *wrong* about it in another? If yes, it either becomes standard
or gets a different name. Shared gestures are governed by the gesture
registry (§8.1).

## 7. Remember — the inscription and the queue

"I want to / Remember / this" is the membrane's one fixed point, per
February: never fades, never animates. It remains unbuilt; until the Practice
app can receive what it captures, no surface ships a rival save-to-practice
mechanism. When built, it works like this:

**Propose, don't ask.** "What exactly would you like to remember?" is a hard
question for a ten-year-old at a lit-up screen. Because every lab honors the
typed-thing contract, the system offers two or three candidates drawn from
what is on the table: *this construction · how to divide a line in half ·
why the crossings make equal parts.* Choosing among them is easy, and the
choosing itself does work.

**The type selects the practice.** The deep split the candidates surface is
artifact versus method. Methods (bisect a line, make this construction)
practice by replay-on-fresh-points: she starts with two new points and
*attempts*; "show me" sits quietly available and reveals the next step only
when asked — generation by default, recognition on request. Facts and
properties (what pronics are, a falling-object calculation, timeline
anchors, interval names) go to rhythmic practice.

**Queue items:** methods store the record (they are replayable logs); facts
store only the idea, rebuilt fresh. Settled 2026-08-09; propagates into every
lab's save format.

**The standing guard:** the queue is a garden she visits, never a debt that
accrues. Nothing counts what is overdue.

## 8. Open questions (owned, not forgotten)

1. **The gesture registry.** Long-press is Geometry's eraser and was held
   open as Multiplication's possible door to underlying construction tools —
   the same gesture must not mean *erase* in one lab and *reveal* in another
   (§6's own test). A small table of gestures with reserved cross-lab
   meanings, started before the collision ships. New, and load-bearing.
2. **Precision on the world (touch).** Construction needs point precision,
   not pixel precision, and points are discrete: generous snap on meaningful
   targets sized to fingers; where targets crowd inside one fingertip,
   tap-then-confirm-or-nudge (provisional landing shown, second tap commits,
   small drag walks to a neighbor — slow hands never punished). Drag is the
   hostile gesture: tap-tap alternatives (tap-center-tap-radius for circles)
   make tools drag-free on touch without changing the mouse experience. The
   Apple Pencil grants mouse-grade precision and is welcomed, never
   required. Settled at a bench with real ten-year-old fingers.
3. **Three-state cycles** (Numbers: map · points · off) under
   destination-naming: name the next stop, or reduce three to two. Deferred
   to the controls pass; instinct says reduce.
4. **Pattern viewings for accessibility.** Hatching/texture versions of a
   lab's default view, chosen deliberately like any viewing — worth exploring
   for low-vision and colorblind children. Distinct from the default-view
   decision (color as sole prime indicator), which stands. Bench when it
   comes.
5. **Maya.** The UI (February's button-plus-transcript) is deferred by
   choice: enough different tools first, so stress points show, and children
   lined up to test it. Nothing in this standard may preclude it or build it
   prematurely. Separately and larger: Maya always points children outward —
   and for a child without a reliable adult network, outward may point at
   nothing. That question stays visibly open; it is not a UI question.
6. **The Timeline's vertical.** Candidates: lanes — Events, People,
   Artifacts — shown in interesting ways, possibly topic-specific. Stays
   undecided until the Timeline officially starts.
7. **Minting's reach.** Should tools see unminted intersections directly, so
   a line-drag can start from a crossing and mint it in passing? Gesture-
   vocabulary question, with the map-mode collision (minting outranks
   double-click notes) folded in.
8. **Housekeeping with teeth:** `sound` is not yet a value in the `lab`
   facet (only Michael approves additions); the cello overlay's
   string-numbering convention is open.

---

*When accepted: this file moves to the vault as the standard, UI-Language and
Interface-Foundation each gain a status line pointing here, and the controls
pass cites it as its brief — beginning with a Geometry walk that examines
New, Open, and Save as choice-panel candidates.*
