---
status: Ready for Michael's read, 30 Oct 2026. A short follow-up; paste it into Claude Code after revision 03 has been reported and accepted.
role: The frame's edges make points: where circles and lines cross the frame, and at its corners. Points she can build from.
related: Prompt-Revise-Glass-900-Years-Ago-03.md, js/glass.js
---

# Prompt: Glass 900 years ago, revision 2

> This follows revision 1 (`Prompt-Revise-Glass-900-Years-Ago-03.md`). Read the board as it stands after it. Change only this board.
>
> **The frame makes points.** Revision 1 said the frame's edges never make points and never enter the construction. That changes. The frame always sits on quarter units, which can be built from 0 and 1, so its edges count as lines she is given, the way a real table's edges would be.
>
> - Where a circle or line crosses one of the frame's edges, a point appears, the same as anywhere else shapes cross. She can build from it: centre a circle on it, drag a circle to it, run a line through it. Only on the edge itself, not on the edge carried on past the corners.
> - The four corners are points too. While the frame is still free (before her first circle or line), a drag that starts on a corner resizes the frame, as now, and the corners move with it. A circle can still end on a corner. Once the frame is fixed, a drag from a corner makes a circle, like a drag from any point.
> - A point on a frame edge that also lies on the x or y axis gets its number, as any point there does. At the start the bottom edge lies on the x axis and the left edge on the y axis, so this will happen often.
> - The frame enters the log: where it sits and its size are recorded when it becomes fixed, so a saved construction, a replay and a demo all rebuild the same points. Undo works as now; undoing a circle or line removes the frame points it made, and undoing back to no circles or lines frees the frame as before.
> - The frame is still lead, still crops the glass, and its edges still bound pieces, as in revision 1.
>
> **Check before reporting**, on the Mac and on the iPad in the pane: the corners as points before and after the frame is fixed; a resize from a corner before the first circle; a circle from 0 through 1 crossing the bottom edge, with its points and numbers; a circle centred on a point the frame made; a line through a corner; undo removing frame points; Save, Open and a replay rebuilding the same points. Screenshots beside the report. Say plainly what needs Michael's eye: how crowded the frame's edges get with points.
>
> Name the board's new version in its stamp, update `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
