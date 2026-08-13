---
status: Current — awaiting Michael's review; the voice pass gates the push
role: Session ledger — the controls build as executed, both labs
date: 2026-08-13
brief: Brief-Controls-Build-Aug13.md · Decisions-Controls-Aug12.md
---

# Decisions — the controls build

Reported by Claude Code, 13 August. Executed per the build brief, in its
order. Everything below is browser-verified, zero console errors, both labs.
Contradictions found in the code are reported here, not accommodated
silently, per the brief's own rule.

## Built as briefed

- **The choice panel is a component** — `CW.createChoicePanel` in
  `js/cw-panel.js` (extended, not forked): outcomes as words, each beside
  one quiet recipe line (11px Georgia italic, reduced opacity), movable,
  closable, takes one choice and fades. A row with no action is the quiet
  no. Opens centred each time — transience is the species' character;
  remembered position belongs to tool panels.
- **The WIP guard** is one choice panel in Michael's words, fronting New,
  Open, **and the `.json` drop** (Phase 2 gap closed and verified through a
  scripted drop). The old three-word dialog is gone.
- **The Save panel** replaced the dialog chain: Save construction /
  Postcard / Full sheet, with the ledger's recipe lines. **Postcard is the
  share action** — renders 1200×800 and goes to the share sheet, download
  fallback; no Share word exists. Save construction offers the `.json`
  through the share sheet where available (download otherwise) after the
  usual name-and-note flow. Cmd+S opens the panel.
- **Replay Cancel** is the same species: Start over / Continue from here /
  Keep watching, as decided.
- **The color panel is a tool panel**: close word in its header, summoned
  by Color, never auto-opens on return visits; its one uninvited opening
  remains the first-visit teaching moment (the existing trigger path).
- **Titles are facts**: the palette title and the model title are inert;
  "Choose new colors" stays the one way to the palette picker, and the
  model panel gained **Choose new model** (new string) as its picker word.
- **Show map ↔ Hide map** replaced the three-state cycle in both labs.
  Geometry: earned numbers render whenever the map is hidden; new logs
  write `shown`/`hidden`; replay maps the three historical values and the
  older booleans (map → shown; points/off/true/false → hidden) — verified
  by replaying crafted pre-build logs through the real drop path, both
  directions. Multiplication: same word pair, map-shown default.
- **The lattice tie left Geometry entirely** — `setLatticeTied(false)` at
  startup, frozen at the default view's step; zooming spreads or crowds the
  same lines. Multiplication keeps its tie word and its follows-zoom
  default, unchanged.
- **Just the glass ↔ Show the making** wires the dormant `showGlass` flag
  as a viewing-strip word: logged (`show_glass` op), skipped by undo,
  hides lattice, construction lines and points; glass, lead and notes
  remain. Verified.
- **Conditional presence**: an empty canvas shows only Open; New and Save
  fade in with the first mark and collapse away when absent. The
  "nothing to save yet" toast is gone in both its homes; the empty-glass
  postcard now renders an honest empty parchment the preview shows before
  she decides. Cmd+O's alert (a bare dialog by any name) became the
  guarded picker path.
- **Multiplication propagation**: a conditional Save word in the acts row
  (present when anything beyond 1 is on the glass), the Save choice panel,
  postcard-shares/full-sheet-downloads with the same mat composition, and
  the Show map pair.

## Contradictions found and reported, not accommodated

1. **The full sheet was never 1800×1200.** The brief says "Full sheet keeps
   the 300dpi render (1800×1200)", but the code's full sheet has been
   **3000×2400** since March — 1800×1200 is the *postcard's* old print
   render. "Keeps" was honored: the full sheet is unchanged at 3000×2400,
   300dpi tag intact. The postcard is 1200×800 as decided, mat and note
   scaled to keep its look, and **carries no DPI tag** (a 300dpi tag on a
   screen-sized render would print at 4×2.7 inches).
2. **Multiplication has no construction to save.** The brief propagates the
   full three-word panel, but Phase 4 explicitly chose no persistence for
   this lab: there is no operation log, no file format, and no open path.
   Building "Save construction — a file you can open and keep working on"
   would have been a false promise. The panel there is two words
   (Postcard / Full sheet), and the third waits on a real decision: **what
   is the record of a multiplication session?** That is design work the
   walk did not do; flagged to the board.
3. **The model tool is unreachable on the built surface** — the walk's
   third complete-but-unreachable path, after Share and `showGlass`. The
   model panel opened only from the models picker, and the picker only from
   the model panel's own title: a closed loop with no external door. §13's
   title-as-control removal is built, and Choose new model sits inside the
   panel, but the panel itself still has no summoning word — placing one is
   a controls decision the brief did not make, so none was invented.

## Found and fixed during verification

- **Viewing ops alone counted as work.** Show map on an empty canvas
  summoned New and Save, and the WIP guard would front an Open with
  nothing to guard. "Work exists" now means marks: the presence check and
  the guard both skip viewing ops (`logHasMarks`).

## Flagged to the voice pass

Every choice-panel string (the ledger's drafts, now live); **Choose new
model**; the WIP guard's middle words reading "start a new construction"
on the Open and drop routes too (one panel, three doors — Michael's words
applied as the ledger specifies); Multiplication's share-fallback line
reusing Geometry's ("Sharing not available on this browser — image
downloaded instead").

## Owed to hands-on

Safari could not be driven (Allow Remote Automation still off; the screen
recording permission still needs the app relaunch). The postcard share
sheet and the construction-file share are exercised only as fallback
downloads here; **the iPad pass owns both**, plus VoiceOver and pinch, as
the board already records. The Multiplication export is a snapshot of the
live canvas (the window as she sees it, membrane cropped); the full sheet
upscales it ~1.4× — honest v1, refine at a bench if it reads soft in print.
