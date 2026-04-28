# Specification: Auto-Complete Segment Selection

This is the authoritative specification for auto-completing segment paths during lead placement. If existing code contradicts this document, the code should be changed to match.

---

## What auto-complete does

When the user is selecting segments to place lead (building a glass shape), she sometimes needs to click many segments to trace a path. If she clicks a segment that is not adjacent to the currently selected set, and there is exactly one unambiguous shortest path connecting them, the intermediate segments are automatically selected.

This makes shape selection dramatically faster for complex shapes without ever making a wrong guess.

---

## When auto-complete fires

1. The user clicks a segment (call it **B**).
2. B is not adjacent to any currently selected (leaded) segment.
3. The system finds the **most recently selected segment** (call it **A**) — this is the starting point for the pathfinding.
4. Search for the shortest path in the segment adjacency graph from A to B.
5. **If exactly one shortest path exists and it is 6 segments or fewer (including A and B):** auto-select all intermediate segments along that path. Lead appears on all of them at once, including B.
6. **If multiple shortest paths of the same length exist:** select B alone. This is the current behavior — the user disambiguates by clicking intermediate segments.
7. **If no path exists within the length limit:** select B alone.

---

## The segment adjacency graph

Two segments are adjacent if they share an endpoint (an intersection point or a seed point). The adjacency graph is the set of all segments and their shared-endpoint connections. This graph already exists in the geometry engine.

---

## Path length limit

Maximum path length: **6 segments** (including the start and end segments). This means at most 4 intermediate segments are auto-filled.

Rationale: a 2–6 segment bridge feels intuitive — the child can see the logic of the path that was chosen. Longer auto-completions across complex constructions could be surprising and hard to verify visually.

---

## What "shortest path" means

The shortest path is the path with the fewest segments (hops in the adjacency graph). Segment length in world coordinates is irrelevant — only the number of segments matters.

---

## Uniqueness test

The auto-complete only fires when the shortest path is **unique**. If two or more paths tie for shortest:

- Do not auto-complete.
- Select B alone (current behavior).
- The user clicks an intermediate segment to disambiguate, then clicks B again. Now the path from the intermediate segment to B may be unique, and auto-complete can fire for that shorter span.

---

## Visual feedback

When auto-complete fires:

- All intermediate segments and B receive lead simultaneously.
- No animation or sequential highlighting — they all appear at once, as if the user had clicked each one.
- The operation log records each `emphasize` operation individually (one per segment), in path order from A to B. This ensures correct replay behavior.

---

## Interaction with undo

Each auto-completed segment is a separate `emphasize` operation in the log. Undo removes them one at a time, in reverse order — same as if the user had clicked each segment manually. This is simple and consistent.

---

## Edge cases

- **No selected segments yet:** The user clicks the first segment to start. There is no "A" to pathfind from. Auto-complete does not apply — just select the clicked segment normally.
- **Multiple disconnected selected sets:** Pathfinding starts from the most recently clicked segment, regardless of whether other selected segments exist elsewhere. The user's last action defines the context.
- **Circular paths:** If the shortest path from A to B goes "the long way around" a circle, and there's also a short way, there are two paths — auto-complete does not fire. The user clicks an intermediate segment to clarify direction.
- **Already-selected segments in the path:** If some intermediate segments are already selected (leaded), they still count as part of the path. The auto-complete selects only the unselected segments along the path.

---

## Algorithm summary

```
function tryAutoComplete(selectedSegments, lastSelected, clickedSegment):
    if clickedSegment is adjacent to any selected segment:
        return null  // normal selection, no auto-complete needed

    // BFS from lastSelected to clickedSegment in the segment adjacency graph
    paths = findAllShortestPaths(lastSelected, clickedSegment, maxLength=6)

    if paths.length == 1:
        return paths[0]  // the unique shortest path (list of segments)
    else:
        return null  // ambiguous or too long — no auto-complete
```

---

## What this does NOT do

- **No automatic shape closure.** Auto-complete bridges a gap between two clicked segments. It does not detect that a shape is "almost closed" and fill in the last segment.
- **No path preference by geometry.** All segments are equal in the adjacency graph. Shorter segments (in world units) are not preferred over longer ones.
- **No visual preview.** The path is not shown before committing. The auto-complete is instant — if the user doesn't like it, she undoes.
