---
status: Orientation — April 2026
role: One-page entry point to the vault
---

# Start Here

This is the Curious Woods design vault. For current implementation state, read `../CLAUDE.md` at the repo root.

## The Spine

Three documents define the platform. Everything else is instrumental to these.

1. **[The Intuitions](00-FOUNDATION/The-Intuitions.md)** — the intuitions and cultural fluencies a child needs to thrive in college (MIT OCW as the destination). Small, finite, evidence-grounded. Currently seventeen.

2. **[Maya's Map](00-FOUNDATION/Mayas-Map.md)** — Maya's operating model. Child at center, competence outline, intuition nodes beyond. How Maya navigates.

3. **[Design Principles](00-FOUNDATION/Design-Principles.md)** — the authoring rules: process over conquerors, preserve wonder, few flexible interactives, lead always on, and the rest.

Read those three first. The rest of the vault makes sense once you have them.

## Supporting Foundation

- `00-FOUNDATION/CW-System-Foundation.md` — the five cognitive modes
- `00-FOUNDATION/Interface-Foundation.md` — interface principles
- `00-FOUNDATION/UI-Language.md` — naming and interaction vocabulary
- `00-FOUNDATION/Story-Template.md` — story authoring structure

## Current Work

- `01-ACTIVE/Current-Status.md` — where Glass is right now
- `01-ACTIVE/Next-3.md` — priority order for the next few sessions
- `01-ACTIVE/Handoff-*.md` — session handoffs (most recent wins; additive when marked)

## Design Explorations

- `10-PROJECTS/` — design work in progress. Most active: Glass (geometry) and Stories. See folders for status.

## Specs

- `20-SPECS/` — implementation specs. `Layer 1 — Consolidated Specification.md` is the authoritative spec for the geometry engine.

## What's Archived

- `99-ARCHIVE/` — superseded specs and abandoned directions. Preserved for historical reference; not current truth.

## How the Vault Is Organized

The vault is **intuition-organized**, not feature-organized. Interactives and stories are instrumental — they exist to serve specific intuitions from the spine. Any new spec or story should name which intuitions it serves.

## If You Are Claude Code (the Keeper)

You maintain this vault. Specifically:
- Keep structure consistent; flag drift when you see it.
- Write new files when ideas firm up; update existing ones when things change.
- Keep cross-references clean.
- Flag stale content; propose archiving rather than silent deletion.
- Preserve the spine — the three canonical documents are load-bearing.
- Use git history for memory; don't duplicate what git tracks.

When in doubt about adding a file, prefer not to. Lean is better than thorough.
