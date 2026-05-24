# Demo Testing — Design Note, March 8, 2026

**Source:** PM session, March 8, 2026
**Purpose:** Defines the exit survey and session data collection for the Glass demo.
**Status:** Design complete. Coder implements session hooks; survey receiver (Airtable or Google Form) set up by Michael before demo goes out.

---

## Guiding Principle

Children who test Curious Woods are participants, not subjects. They should see what was collected about their session before being asked to share it. This is pedagogically intentional — it gives them a sense of their own importance in the process and models transparent data practice.

No identity data is ever collected. No names, no accounts, no persistent identifiers.

---

## Session Data Hooks

The Coder adds lightweight instrumentation to the named action functions (the action layer already planned). All data lives in a session object in memory. Nothing is transmitted until the child explicitly shares it.

**Collect:**
- Total time on canvas (session duration in minutes)
- Number of constructions completed (regions filled ≥ 1)
- Number of fills made
- Number of fills removed (Empty swatch used)
- Palettes used (list of palette names activated)
- Demos watched via "show me" (list of construction names + count)
- "Try it" ghosts loaded (list of construction names)
- Undo count
- New construction count (how many times canvas was cleared)
- Whether sound was enabled or muted
- Whether the how-to note was reopened after auto-close

**Do not collect:**
- Any free-text input
- IP address or location
- Device or browser fingerprint
- The full operation log (this is a separate opt-in — see below)

**Format:** A flat JSON object. Keys should be human-readable (e.g., `fills_made`, `time_on_canvas_minutes`). This same object is shown to the child before sharing — it must be legible without explanation.

---

## Exit Survey Flow

Triggered by: Save as Image (the natural completion gesture). Appears as a quiet panel — not a modal, not a popup. Consistent with CW visual language.

**Step 1 — Three questions:**

1. "Would you do this again?" — yes / maybe / no (words, not buttons, not stars)
2. "Would you recommend it to a friend?" — yes / maybe / no
3. "How old are you roughly?" — a small set of word ranges: "under 8 / 8–10 / 11–13 / 14 or older / rather not say"

**Step 2 — Here's what you did today:**

Show the session data in plain, warm language. Not raw JSON — translated into sentences or a simple list. Examples:

- "You spent 23 minutes on the canvas."
- "You made 11 fills and completed 2 constructions."
- "You watched the hexagon demo twice."
- "You tried out the equilateral triangle guide."
- "You used the Chartres palette."

This moment should feel like a mirror, not a report. The child sees her own session reflected back.

**Step 3 — Sharing ask:**

Two separate questions, clearly distinguished:

1. "Is it okay to share your answers and session summary with the developers?"
   — yes / no

2. "Would you also like to share the full record of what you built? (This includes every step of your construction.)"
   — yes / no (only shown if question 1 is yes)

The full operation log is a separate opt-in because it is significantly more revealing than the session summary. Children should understand this distinction.

**After sharing:**
- A quiet confirmation: "Thank you. Your input helps make this better."
- No further action required. Survey panel recedes.

---

## Operation Log Formatting

If the child opts into sharing the full log, the log must be formatted and labeled so it makes sense to a non-technical reader. Raw JSON field names are not acceptable. Before transmission, the log should be annotated with:

- Human-readable action names (e.g., "drew a circle" not "ADD_CIRCLE")
- Timestamps relative to session start (e.g., "at 4 minutes 12 seconds")
- A brief header identifying it as a Curious Woods construction log

This is also what the child sees if she views her own log. The formatting work serves both transparency and shareability.

---

## Survey Receiver

Michael sets up the receiver endpoint before demo goes out. Options: Airtable or Google Form. The Coder submits to this endpoint only when the child confirms sharing.

The receiver must be set up and tested before the demo page goes live. Confirm the endpoint URL with the Coder before final build.

---

## What the Coder Needs to Build

1. Session object in memory — initialized on page load, updated by action layer hooks
2. Exit survey panel — triggered on Save as Image, consistent with CW visual language
3. Session data display — translate session JSON to plain language sentences
4. Submission handler — POST to survey receiver endpoint only on explicit child confirmation
5. Full log formatter — human-readable annotation of operation log, used only if second opt-in is yes

---

## What Michael Needs to Do Before Demo

- Choose: Airtable or Google Form as survey receiver
- Set up the endpoint and test it with a dummy submission
- Provide the endpoint URL to the Coder
