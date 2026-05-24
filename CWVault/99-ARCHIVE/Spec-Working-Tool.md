> **SUPERSEDED — April 2026.** This spec describes a floating Tools menu that was replaced by the persistent "How this works" left panel and canvas tip windows. Preserved for historical reference; do not treat as current. Current truth: `../../CLAUDE.md` and `../00-FOUNDATION/Design-Principles.md`.

---

# Spec — Working Tool

## BRIEF (read this, skip the rest if you're building)

Status: Fully designed. Not yet built.
Last updated: February 24, 2026 by Project Manager

What this is:
- The phase between the Construction Engine (Layer 1) and Maya Integration (Layer 2)
- Transforms the construction engine into a genuinely usable tool
- Must be complete before Maya integration begins

What to build:
1. Operation log (JSON) — save/load, unlimited undo, Maya demo playback all fall out of this
2. Region detection and fill — boundary selection, closure detection, palette
3. Color palette UI — vertical strip, four opening palettes, draggable
4. Menu — floating, draggable, seven items
5. Labels — fully designed, see Labels section
6. Image export — automatic bounding box from construction extents with padding

Four opening palettes defined with hex values — see Color Palettes section below.
Stories can specify a palette on load.

One open question remains:
- Hex values are proposed — verify against reference images before final commit

Read the full document for: operation log format, region detection details, palette specs, menu spec

---

## Development Phases

| Phase | Name | Status |
|-------|------|--------|
| Layer 1 | Construction Engine | In active debugging |
| Working Tool | This spec | Designed, not yet built |
| Layer 2 | Maya Integration | Blocked until Working Tool complete |

---

## Operation Log

Every action saved as a JSON sequence of discrete operations.

**Format:**
```json
{
  "version": 1,
  "name": "my construction",
  "created": "2026-02-24T...",
  "operations": [ ... ]
}
```

**Operation types:** `init`, `line`, `circle`, `region`, `fill`, `emphasize`, `deemphasize`, `scaffold`, `label`

**Key decision:** Emphasis is a temporary selection gesture, not a permanent state. Fills are
the permanent artifacts. Emphasis auto-clears after a region closes. This means shared edges
between adjacent regions are handled naturally — any line can be reused for the next region.

**Key principle:** Points are NOT logged as user actions. They are computed consequences
of line/circle constructions during replay. The log records what the user did;
points are derived from that.

**This single format serves four purposes:**
- Save / load
- Unlimited undo (single tap empty space steps backward through log)
- Maya demonstration playback
- Construction library

Version number included for forward compatibility.

**Undo behavior change:** Double-tap empty space no longer clears — that function moves
to `New` in the menu (with confirmation). Single tap empty space = step back through log.

---

## Region Detection and Fill

- User selects boundary segments in any order — no required sequence
- After each selection, tool checks for closed loop — first closure wins
- On closure: fill and palette appear immediately at current palette color, default opacity
- Boundary segments are a distinct visual category from emphasized segments

**When new constructions interact with a filled region:**
- New construction passing through a boundary segment: creates new points, splits segment,
  both halves inherit boundary state, fill adapts silently
- New construction passing through fill interior: visible but does not affect the fill

**Dissolving a region:**
- Deliberately deselecting a boundary segment dissolves the region
- Remaining segments stay highlighted
- Undo after closure returns to in-progress selection state with segments still highlighted

---

## Color Palettes

Four opening palettes. Stories can specify a palette on load.
Hex values are proposed — verify against reference images before final commit.

### Gaudí (default)
| Color | Hex |
|-------|-----|
| Deep ruby | #C0152A |
| Cobalt blue | #1B3FA0 |
| Emerald green | #0D7A3E |
| Golden amber | #E8A020 |
| Deep violet | #5B1F82 |
| Burnt orange | #D45A0A |
| Magenta | #B5195E |
| Warm yellow | #F0D030 |

### Medieval — Chartres (six colors only — restriction is historically intentional)
| Color | Hex |
|-------|-----|
| Ruby red | #A81020 |
| Cobalt blue | #163B8C |
| Golden yellow | #D4A012 |
| Forest green | #1A6B30 |
| Deep purple | #4A1060 |
| White glass | #E8E4D8 |

### Persian — Isfahan, Safavid
| Color | Hex |
|-------|-----|
| Persian turquoise | #1A9B8C |
| Lapis blue | #1B3F7A |
| Saffron | #D4820A |
| Ivory | #E8DFC0 |
| Terracotta | #B84A20 |
| Deep teal | #0D5C54 |
| Warm gold | #C89820 |

### Alhambra — Nasrid
| Color | Hex |
|-------|-----|
| Warm gold | #C8920A |
| Terracotta red | #A83820 |
| Ivory white | #EDE4C8 |
| Deep ochre | #B87010 |
| Mosaic blue | #1A4A8C |
| Olive green | #5A6E20 |
| Burnt sienna | #8C3A18 |

---

## Palette UI

- Vertical strip, left edge by default
- Draggable to any position
- Transparent background, subtle shadow for readability
- Transparency slider at bottom of strip
- Palette name shown with left/right arrows to switch palettes
- Palette stays open while filled regions exist
- Click filled region → samples its color into palette
- Click color then filled region → repaints that region
- Collapsible to thin sliver showing current color only

---

## Menu

**Icon:** Small rose window. Subtle "menu" label for first-time users — fades after first use.
**Style:** Transparent background, floating above canvas, draggable, collapsible to icon only.

**Seven items (single word each):**

| Item | Function |
|------|----------|
| Save | Expands to: reconstruction file / image |
| Load | Load a saved construction |
| New | Clear canvas (confirmation required) |
| Labels | Label points or segments (interaction TBD) |
| Lines | Toggle — hides/shows construction lines |
| Glass | Toggle — hides/shows uncolored geometry ("glass only" mode) |
| Share | Share the construction |

---

## Labels

Labels are the child's voice — her chance to say whatever she likes about what she's made.
They are not system annotations. They appear in saved images and in the reconstructable file.

**Creating a label:**
- Child taps Labels in the menu
- Then taps anywhere on the canvas — a text box appears at that position
- She types freely

**Label appearance:**
- Movable and resizable
- Background matches the canvas (warm parchment) — feels native, not dropped-in
- Font: humanist serif or semi-formal italic (e.g. Palatino or equivalent web font)
  — easy to read, timeless, in keeping with the tool's aesthetic
  — treat as direction, not hard commitment; test at implementation

**Deleting a label:**
- Each label has a visible delete control
- Deleting removes it from the project entirely (not hide/show — gone)
- Undo (single tap empty space) restores a deleted label via operation log

**Persistence:**
- Labels saved in the reconstructable JSON file as `label` operations
  — fields: unique ID, position (x, y), size (w, h), text content
- Deletion logged as `delete_label` operation with the label's ID
- Labels appear in exported images
- Labels do not appear in Glass mode (construction lines hidden — labels stay)
  — actually: TBD whether Glass mode affects labels. Default: labels always visible.

**Sharing:**
- When a child shares with grandparents, she can add more in a note at share time
  — this is outside the canvas, in the share flow, not a canvas label

---

## Open Questions

**Image export bounding box:** Automatic — calculated from construction extents with padding.
No user-defined crop. A child finishing a construction wants to share it, not configure it.

**Hex values:** Proposed, not final. Verify against reference images before committing.
