# Prompt: How Drain the Sea depends on the Time Machine

*Status: run 24 Oct 2026, afternoon. The report is `claude/Audit-Drain-the-Sea-vs-Time-Machine-Oct24.md`.*

*19 Oct 2026. Read-only. Run alongside the timeline-graphics refactoring, after step 3 of the go-ahead or whenever convenient. Paste the block below whole.*

*24 Oct 2026: copied into the vault from the claude.ai project, where it was written. The refactoring finished 21 Oct (all fourteen steps), so run it against the refactored code. Zoom speed is ruled (see `Notes-Drain-the-Sea-Held.md`): wheel 0.10, pinch 0.65, one shared setting; say in the report where that number now lives and whether the bench still has its own slider.*

> **This pass is read-only. Do not change any code.** A short, plain-language report, written for a designer.
>
> Read `CWVault/claude/Spec-Drain-the-Sea.md`, `CWVault/claude/Prompt-Revise-Drain-the-Sea-Bench-02.md`, `CWVault/claude/Audit-Timeline-Graphics-Oct19.md` and `CWVault/claude/Prompt-Timeline-Graphics-Go-Ahead.md`. Then look at `experiments/maps/drain-the-sea-bench.html` and everything it loads.
>
> Drain the Sea is meant to be built on the Time Machine, not beside it. The Time Machine is now being refactored: one style file, one owner of the year, dead code removed, and the bracket replacing the Focus window. I want to know how much of Drain the Sea will follow that refactoring for free, and how much will be left behind.
>
> **Report:**
>
> 1. **Shared or copied.** For each part of the bench (the timeline, the map and globe, the layers, the left column, the drag bars, the probe, the depth gauge, the water ball, the readout strip, the zoom setting), say whether it uses the shared code the Time Machine uses, a copy of it, or something of its own. Name the files.
> 2. **The year.** How the probe sets the current year today, and whether it will go through the Time Machine's single owner of the year once that exists. If not, what it would take.
> 3. **The Focus window.** The bench's timeline window follows the probe using the Focus window, which the bracket is about to replace. What happens to that when the bracket arrives, and what the probe should drive instead.
> 4. **Style.** Every colour, line weight, type size or marker the bench defines for itself rather than taking from the shared style. That includes the new sea-floor blues and the ruling that white means ice: should they live in the one style file?
> 5. **Ice.** Whether the bench's ice handling is the same code the go-ahead's ice ruling will change, or separate.
> 6. **New shelf pieces.** Which bench parts are general enough to belong to the Time Machine itself (the probe, the depth gauge, the sea-level layer, the zoom setting) and which belong only to this story.
> 7. **Order.** A suggested order for bringing the bench on to the refactored Time Machine: what to do now, and what to wait for. Each step should leave both pages working.
>
> Stop after the report.
