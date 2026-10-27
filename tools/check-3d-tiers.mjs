#!/usr/bin/env node
// check-3d-tiers.mjs — the tier timer of js/3d/scene.js fed made-up frames (Standard-Interactives §2; 27 Oct 2026).
// The browser pane cannot run a page's frames steadily while it is not being looked at, so the timing that picks
// a tier is checked here with the frames a machine would give: steady at the rate, steady below it, stalls, a
// hidden tab, a sag that comes and goes, a 50 Hz display.   Usage: node tools/check-3d-tiers.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, '../cw-deploys/js/3d/scene.js'), 'utf8').replace(/^import \* as THREE from 'three';$/m, 'const THREE = {};');
const { cwTierTimer } = await import('data:text/javascript;base64,' + Buffer.from(src).toString('base64'));

let fails = 0;
function run(name, target, frames, expectDrops, expectPhase, atFloor = false) {
  // frames: a list of [count, gapMs, visible?]; a 'drop' is answered by dropped() as the page would, and the
  // second drop reaches the floor (full → middle → floor)
  const t = cwTierTimer({ target });
  let now = 0, drops = 0;
  for (const [count, gap, visible = true] of frames) {
    for (let i = 0; i < count; i++) {
      now += gap;
      if (t.frame(now, gap, visible, atFloor) === 'drop') { drops++; t.dropped(); if (drops >= 2) atFloor = true; }
    }
  }
  const ok = drops === expectDrops && t.phase === expectPhase;
  if (!ok) fails++;
  console.log((ok ? 'ok   ' : 'FAIL ') + name + ' — drops ' + drops + ' (want ' + expectDrops + '), phase ' + t.phase + ' (want ' + expectPhase + ')');
}
run('steady 60 on a 60 Hz display', 60, [[240, 16.7]], 0, 'done');
run('steady 30 for two seconds: one drop, then 60 at the lower tier, done', 60, [[61, 33.4], [240, 16.7]], 1, 'done');
run('60 with a stall every half second (a shader compiling)', 60, [[12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90], [12, 16.7], [1, 90]], 0, 'done');
run('every frame a stall (14 a second): dropped after four seconds', 60, [[100, 70]], 1, 'test');
run('three refreshes a frame (50 ms, 20 a second): a slow frame, not a stall; one drop', 60, [[41, 50], [240, 16.7]], 1, 'done');
run('throttled to two frames a second while "visible" for ten seconds: dropped once ten frames are in (it cannot be told from a failing machine)', 60, [[20, 500]], 1, 'test');
run('throttled to one frame a second while "visible" for eight seconds: says nothing yet', 60, [[8, 1000]], 0, 'test');
run('hidden for the first three seconds, then steady 60', 60, [[180, 16.7, false], [240, 16.7]], 0, 'done');
run('55 a second (18 ms): holds, within the slack', 60, [[240, 18]], 0, 'done');
run('52 a second (19 ms) for two seconds: too slow, one drop', 60, [[106, 19.2], [240, 16.7]], 1, 'done');
run('a 50 Hz display at 20 ms: holds', 50, [[240, 20]], 0, 'done');
run('a 120 Hz display at 60 a second: holds (the rate asked is 60)', 60, [[240, 16.7]], 0, 'done');
run('done, then a sag of 33 ms for five seconds: one more drop', 60, [[240, 16.7], [180, 16.7], [160, 33.4]], 1, 'done');
run('done, then a sag of four seconds that recovers: no drop', 60, [[240, 16.7], [180, 16.7], [120, 33.4], [120, 16.7], [120, 33.4], [120, 16.7]], 0, 'done');
run('a sag that goes on: a second drop five seconds later, none at the floor', 60, [[240, 16.7], [180, 16.7], [600, 33.4]], 2, 'done');
run('a sag made of stalls (every frame 80 ms, twelve a second) for five seconds: one drop', 60, [[240, 16.7], [75, 80]], 1, 'done');
run('done, then throttled to two frames a second while "visible": no drop', 60, [[240, 16.7], [30, 500]], 0, 'done');
run('steady 30 at the floor already: no drop, done', 60, [[240, 33.4]], 0, 'done', true);
console.log(fails ? 'check-3d-tiers: ' + fails + ' failure(s)' : 'check-3d-tiers: all pass');
process.exit(fails ? 1 : 0);
