> **SUPERSEDED — April 2026.** This spec describes a three-level Tools menu in the left panel. Replaced by the persistent "How this works" panel + canvas tip windows. Preserved for historical reference; do not treat as current. Current truth: `../../CLAUDE.md` and `../00-FOUNDATION/Design-Principles.md`.

---

**Source:** Design conversation, February 27, 2026
**Purpose:** Defines the Tools menu system for all Curious Woods content. Authoritative for all implementations.

---

## BRIEF

Status: Complete specification. Authoritative for all content types.
Last updated: February 27, 2026

Core decisions:

- Tools is a permanent fixture in the left panel, present in all content including stories
- Three levels: Tools word, context-sensitive items, subcommands
- All levels use the same animation: fade in, slide right, push down
- Tools are data-driven — the base system is written once, contexts supply their contents
- Tools dragged to workspace persist until child closes them
- Tools menu is the manual override — restores anything closed, surfaces anything not yet open
- No exceptions to the base behavior — consistency is the system's most important property

---

## 1. Structure

The Tools system has three levels.

**Level 1 — The constant**
The single word "Tools" in Payne's gray `#546A80`, 14px Georgia, always visible in the left panel, always in the same position at the top. Present in every content type including stories where available tools may be minimal. This never moves, never fades, never changes appearance.

**Level 2 — Context-sensitive items**
Revealed on hover over Tools. These are the available actions for the current content. Examples across content types:

- Simple story: Save
- Story with interactive: Save, Interactive
- Geometry workspace: Save, Load, Overlay, Palette
- Rhythmic practice: Save, Settings

Only items genuinely available in this context appear. There are no greyed-out or disabled items. If something isn't possible right now it simply isn't there.

**Level 3 — Subcommands**
Revealed on hover over any Level 2 item that has them. These are qualifiers or variants of the parent action. Examples:

- Save → As Image, As Construction
- Overlay → Choose Image, Hide, Show
- Palette → [palette names if multiple available]

Level 2 items with no subcommands execute immediately on click. Level 2 items with subcommands reveal them on hover and wait for a Level 3 click to execute.

---

## 2. Animation Behavior

All three levels share identical animation behavior. Consistency is non-negotiable — the system must feel like one thing, not a collection of separate behaviors.

**Reveal:** Items fade in and slide rightward 8-10 pixels over 150ms ease-out. Items below the appearing group push downward at exactly the same speed, so the panel expands fluidly to accommodate.

**Hover delay:** 150ms before any reveal begins. Prevents accidental triggering from cursor movement passing through the area.

**Collapse:** Items fade out and slide left back to origin over 120ms ease-in. Items below return upward at the same speed. The panel contracts fluidly.

**Collapse trigger:** Mouse leaving the entire Tools cluster collapses everything to Level 1. A 300ms delay before collapse begins prevents accidental dismissal when moving between items.

**Level behavior:** Hovering a Level 2 item while Level 3 items from a previous Level 2 item are visible collapses the previous Level 3 group and reveals the new one. Only one Level 3 group is visible at a time.

**The Remember inscription** at the bottom of the panel moves down with the panel expansion and returns as it contracts. It is never pushed off screen.

---

## 3. Typography

All Tools menu items follow the same typographic treatment as contextual controls throughout the system — words, never buttons.

- Level 1 "Tools": Payne's gray `#546A80`, 14px Georgia
- Level 2 items: Payne's gray `#546A80`, 14px Georgia, indented 12px from Tools
- Level 3 items: Payne's gray `#546A80`, 13px Georgia, indented 24px from Tools

On hover over any item: color deepens slightly toward `#3D3D3A` over 80ms. No border, no background change, no underline. Just a subtle confirmation that the item is live.

---

## 4. The Two Lives of Tools

Tools in the left panel are contextual. They appear when relevant and recede when not. This is the system's judgment.

Tools dragged into the workspace become persistent. They stay where the child puts them until she explicitly closes them. This is the child's judgment.

**The Tools menu is the manual override for both directions:**

- It can surface a tool the system hasn't automatically offered
- It can restore a tool the child has closed

**If a tool is already open in the workspace:** Clicking it in the Tools menu brings it to the front and pulses it gently once — a brief brightening over 300ms that says "it's already here, look." It does not open a duplicate.

---

## 5. Context Specification

Each content type supplies its Tools menu contents as a simple data structure. The rendering system reads this and handles everything else. A content type specifies:

- Which Level 2 items are available
- Which Level 2 items have Level 3 subcommands and what they are
- Which items can be dragged to the workspace
- What each item does when clicked

The base rendering system — animation, typography, panel expansion, drag behavior, workspace persistence — is never modified for individual content types. Content types supply data. The system renders behavior.

---

## 6. Examples by Content Type

**Simple story**
Level 2: Save
Save executes immediately — adds story to dashboard. No subcommands.

**Story with embedded interactive**
Level 2: Save, Interactive
Save executes immediately. Interactive opens the relevant control panel in the left panel or workspace.

**Geometry workspace — Glass**
Level 2: Save, Load, Overlay, Palette
Save → As Image, As Construction
Load → From File
Overlay → Choose Image, Hide, Show
Palette → Gaudí, Chartres, Alhambra, Persian Tiles

**Rhythmic practice**
Level 2: Save, Settings
Save executes immediately. Settings → opens practice configuration panel.

---

## 7. Architectural Principle

The base system is written once. Adding a new interactive requires only supplying a context specification — which tools exist, at which levels, with which behaviors. The rendering machinery applies universally.

There are no exceptions to the base animation behavior, typography, or interaction model. Consistency across all content types is what allows a child to learn the system once and apply it everywhere. Every exception adds cognitive overhead for every child who encounters it. The system's power comes from its uniformity.

---

## 8. Relationship to Left Panel

The Tools menu is the permanent top anchor of the left panel. The Remember inscription is the permanent bottom anchor. Everything between them is dynamic — images, palettes, animations, contextual options arriving and departing as content demands.

Tools and Remember define the panel's identity. The dynamic middle is the panel's contents.

See `00-FOUNDATION/CW-UI-Language.md` for full left panel behavior and animation timing.
