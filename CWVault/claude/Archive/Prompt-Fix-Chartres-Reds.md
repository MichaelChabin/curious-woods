---
status: Ready for Claude Code, 3 Nov 2026.
role: Correct two wrong recipe lines in the Chartres palette. Data fix only.
related: claude/Spec-Colours-on-the-Map.md (section "Out of period")
---

# Fix the Chartres reds in palettes.json

Two recipe lines in the Chartres palette name gold. Gold ruby glass is Kunckel's, late 1600s, about five hundred years after Chartres. Medieval red is copper, flashed as a thin skin on clear glass; medieval pink comes from manganese. See `claude/Spec-Colours-on-the-Map.md`, "Out of period".

## The change

In `palettes.json`, palette `chartres_glass` only:

| hex | recipe now | recipe after | uncertain after |
|---|---|---|---|
| `#8b1a1a` | `gold, colloidal` | `copper, flashed` | `false` |
| `#c84878` | `gold, manganese` | `manganese` | `false` |

Change nothing else: no hex values, no other palettes. The Gaudí palette's `gold, colloidal` is a 20th-century window and stays. Leave the Chartres white (`tin oxide`) alone too. It is a known open question, not part of this fix.

## Steps

1. Find every copy of `palettes.json` the site reads (deploy and vault). Report the paths.
2. In each, find the two lines by hex **and** current recipe. If either line is not there exactly as shown above, stop and report what you found. Don't guess.
3. Make the change. Check the file still parses as JSON.
4. Search the codebase for any other place the strings `gold, colloidal` or `gold, manganese` are tied to Chartres (copy, captions, story text). Report them; don't change them.
5. Append a line to `00-DECISIONS.md`: "3 Nov 2026 — Chartres red is copper, flashed; Chartres pink is manganese. The earlier gold lines were out of period by ~500 years."
6. Show the diff and stop. Commit and push only after Michael says go.
