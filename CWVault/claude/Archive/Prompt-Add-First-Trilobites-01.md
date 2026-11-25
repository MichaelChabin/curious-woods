---
status: Michael's prompt for Claude Code, 21 Nov 2026, from the "time lab" chat. Michael has read Event-First-Trilobites-01.md and approved it as it stands. It has not been through the four checkers; it goes in marked so, for the next editor pass to read.
role: Put the event *First trilobites* into the deep-time store, so the Time lab can arrive on it.
related: Event-First-Trilobites-01.md (the event), Events-Deep-03.md (its neighbours, and the form), Prompt-Pool.md (the Events insert), tools/deep-events-from-vault.py, Prompt-Revise-Time-Lab-Bench-10c-02.md (which arrives on this event if the store has it)
updated: 2026-11-21
---

# Add one event: First trilobites

Read `CWVault/00-BOARD.md`, then `CWVault/claude/Event-First-Trilobites-01.md`.

1. **Give the event a home the build will find.** The other deep-time events live in `Events-Deep-01.md` to `-07.md`. Put this one where `tools/deep-events-from-vault.py` will read it: a new `Events-Deep-08.md` holding this one event if the tool takes a new file without change, and otherwise say what it needs before you change the tool. Do not write over any existing batch file. Copy the event's words exactly; change none.
2. **Mark it unchecked.** The new file's status line says: built on Michael's reading of 21 Nov 2026; not yet through the checkers; waiting for the next editor pass. Carry the event's "For the checkers" notes with it.
3. **Rebuild the deep-time store** with the tool, as Prompt-Pool's Events insert names, and say what changed in the store. Only this event should be new.
4. **Kind.** The draft says "a crop or animal". If the store's closed list has a better word for a fossil animal, say so in the report and leave the draft's word.
5. **Look at it in place.** Open the Time Machine and read the event where it falls, at 521 Ma. Open the Time lab: say whether it now arrives on *First trilobites* (it will only after step 10c is in) or still on Chengjiang.
6. **Report, without changing them,** which periods' *Inside it* lists should now name this event (*Trilobites* and *Shells*, most likely).
7. Update the board and MANIFEST in the same commit.

Report, then commit and push only on Michael's word.
