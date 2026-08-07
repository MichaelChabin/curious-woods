---
status: Current — first authored workshop, and the schema decision 9 was missing
role: The prime-colour schema, exported from the fills bench 6 Aug
date: 2026-08-06
---

# Workshop schema — decision 9's missing data path

Exported from `experiments/fills-and-light.html` by Michael, 6 August, via the bench's
"copy the twelve as JSON" button. **Captured here because the button copies to the
clipboard and nowhere else** — this was one paste away from being lost.

## Why this matters

Decision 9 says *palettes declare their own prime colours*, and Claude Code correctly
reported it had no data path: `art/palettes.json` is 15 palettes of
`{id, name, source, description, colors[]}`, where `colors` is a flat list of hexes with
`recipe` and `uncertain` fields, and nothing maps a colour to a prime. Prime colours lived
separately as 16 CSS variables.

**This export is that data path.** The bench produced the schema as a by-product of the
appearance work.

## The shape

```json
{
  "id": "aslab",
  "name": "As the lab ships",
  "rule": {
    "rest": { "chroma": "92%",  "lightness": 6 },
    "lit":  { "chroma": "125%", "lightness": 7 }
  },
  "declared": {
    "2": "#1a4a9a", "3": "#c8a800", "5": "#a83018",
    "7": "#4a8a30", "11": "#6b2ea8", "13": "#c26a10"
  },
  "primes": {
    "2":  { "rest": "#305da7", "lit": "#1b5bc4" },
    "3":  { "rest": "#d9bc43", "lit": "#e7bd00" },
    "5":  { "rest": "#b74a34", "lit": "#d0300b" },
    "7":  { "rest": "#609b4a", "lit": "#50a429" },
    "11": { "rest": "#7a47b5", "lit": "#8531d4" },
    "13": { "rest": "#d27f3a", "lit": "#e87600" }
  }
}
```

Three parts, and the division is the good part:

- **`declared`** — six authored colours, one per prime. The only part a human writes.
- **`rule`** — how resting and lit derive from declared, in OKLCH so hue holds.
- **`primes`** — the twelve computed results.

## Open question for whoever merges this

`primes` is **derived**, so storing it is redundant. Two defensible choices:

1. **Store it.** The file is then the record of what was actually seen and approved, and
   nothing recomputes at load. Protects against a future OKLCH library shifting a value
   silently — which is the failure mode the gamut-clipping note warns about.
2. **Compute it.** One source of truth; changing the rule updates everything.

Recommendation: **store it, and treat it as approved output rather than cache.** These
twelve were chosen by eye. A value chosen by eye should not be silently recomputed by a
library revision. Keep `declared` and `rule` as the authored inputs and `primes` as the
signed-off result, with a check on load that reports drift rather than fixing it.

## How it merges with `palettes.json`

The existing 15 entries carry `colors[]` with `recipe` and `uncertain` per hex — the
chemistry, which is a story asset (see `03-SEEDS/glass-from-sand.md`) and must survive.
The prime block is **additive**: keep `colors[]` as the palette's full character, add
`declared` / `rule` / `primes` as the six it lends to the primes.

Note the two lists need not be the same size, and usually will not be. Chartres has nine
colours; six of them do prime duty.

## The consequence nobody has stated yet

**A workshop's usable hue count sets its map ceiling.** Six primes are needed for a 16×16
map; four (2, 3, 5, 7) suffice for 10×10. Chinese Blue and White and Hokusai cannot
distinguish six. Rather than a defect, that can be honest: *a workshop with four glasses
makes a smaller window.* Whether the platform says so out loud, or simply offers those
workshops only where they work, is undecided.

## Status

`aslab` — "As the lab ships" — is the first workshop authored in this schema and the
reference for the rest. Fifteen artwork palettes still need their `declared` six chosen,
and the colourblind-safe workshop still needs authoring from scratch.
