---
status: Draft — written 2026-08-12, awaiting Michael's read
role: The reading store. One page. What turns a prototype into an instrument.
date: 2026-08-12
---

# S3 — the reading store

An instrument is a different species from an interactive: it keeps its readings, so a
child can say *I know this now and did not before.* Four Perception Lab prototypes exist
and none is an instrument, because none keeps a reading. S3 is the missing part. It is
deliberately small.

## What it is

An **append-only log of readings, one store per instrument.** Nothing is ever edited or
deleted; a new reading is appended. The store has no opinions about what readings mean —
it keeps them and gives them back.

## The reading unit

Decided 12 August 2026:

```json
{ "value": 4.2, "t": "2026-08-12T19:40:11-06:00", "u": 0.5 }
```

- **`value`** (required) — a number.
- **`t`** (required) — an ISO-8601 timestamp, from the very first reading. A reading is
  a value *with a time*; the second reading makes it a series for free, where grafting
  time on later is a rewrite (`03-SEEDS/the-beam-substrate.md`).
- **`u`** (optional) — uncertainty, in the same units as `value`. Instruments storing
  clean numbers omit it. It exists so a range ("the melting point of silica") or a guess
  ("the era of first glass") can live in the same shape, if the Reference Atlas ever
  shares it.

An instrument may add its own fields beside these (the JND tool will want its mode:
complementary, analogous, warm-cool…) but may never repurpose the core three. The core
is what makes every store readable by anything that reads one.

## The store

- **A JSON file shape:** `{ "s3": 1, "instrument": "colour-jnd", "unit": "…",
  "readings": [ … ] }`. The `s3: 1` is the format version. `unit` names what `value`
  is measured in, once, for the whole store.
- **Local:** localStorage, same as constructions. No accounts, no server.
- **Exportable:** the child can save the store as a file she carries, and open one she
  saved — the same contract constructions honor. Export *is* the file shape above;
  there is no separate format.

## What it must never do

Never rendered as a score, a streak, a grade, or progress. The store offers readings;
**the comparison is hers to make, never a verdict delivered to her.** No instrument
counts, congratulates, or notices an absence. Display is the instrument's business, and
the instrument obeys the same rule.

## Open, deliberately

Whether the Reference Atlas shares S3's *store* or merely its *shape*. The reading unit
was chosen so either answer works; nothing needs deciding until the atlas starts.
