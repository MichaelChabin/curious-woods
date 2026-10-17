#!/usr/bin/env node
/* glass-lines-constructions.js — the lines board's demos (Glass 2: Lines, 17 Oct 2026), written as
   gestures through glass-log.js with the board's frame (create({ board: true })) and saved to
   cw-deploys/models/logs/. The brief: claude/Prompt-Build-Glass-Lines.md, "Demos".

   Halves: the 2 by 1.5 frame; the free point up and to the left of the top-left corner; lines
   from it to the two bottom corners; the crossing lines; the line through their crossing, which
   lands in the middle of the bottom; the diagonals; the upright through the two middles. Then the
   same again for the height, using the same free point and the left and right sides, giving the
   level line through the middle. It ends in glass, as the standard set does: every pane inside
   the frame, coloured by the quarter it falls in, so the two lines through the middle show.
   Run: node tools/glass-lines-constructions.js */
'use strict';
const G = require('./glass-log.js');
const U = 240;                                     // the board's unit in world units (glass.js FRAME_UNIT)
const BL = [-U, -0.75 * U], BR = [U, -0.75 * U], TR = [U, 0.75 * U], TL = [-U, 0.75 * U];
const P = [-1.6 * U, 1.3 * U];                     // the free point, in world units (units −1.6, 1.3)
function llx(a, b, c, d) {                         // where line ab meets line cd
  const den = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  const t = ((a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0])) / den;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}
function expect(name, got, want) {
  if (Math.hypot(got[0] - want[0], got[1] - want[1]) > 0.5) throw new Error(name + ' lands at (' + got.map(v => v.toFixed(2)) + '), not (' + want + ')');
}

const g = G.create({ board: true });
g.free(P[0] / U, P[1] / U);
// the width: lines from the free point to the two bottom corners
g.line(P[0], P[1], BL[0], BL[1]).line(P[0], P[1], BR[0], BR[1]);
const A1 = llx(P, BL, TL, TR), B1 = llx(P, BR, TL, TR);           // where they cross the top line
g.line(BL[0], BL[1], B1[0], B1[1]).line(A1[0], A1[1], BR[0], BR[1]); // the crossing lines
const X1 = llx(BL, B1, A1, BR);
g.line(P[0], P[1], X1[0], X1[1]);                                  // through their crossing
const Mb = llx(P, X1, BL, BR); expect('the middle of the bottom', Mb, [0, -0.75 * U]);
g.line(BL[0], BL[1], TR[0], TR[1]).line(BR[0], BR[1], TL[0], TL[1]); // the diagonals
const C = [0, 0];
g.line(Mb[0], Mb[1], C[0], C[1]);                                  // the upright through the two middles
// the height: the same free point and the left and right sides
g.line(P[0], P[1], TR[0], TR[1]);
const A2 = llx(P, BR, TL, BL), B2 = llx(P, TR, TL, BL);           // where P–br and P–tr cross the left line
g.line(BR[0], BR[1], B2[0], B2[1]).line(A2[0], A2[1], TR[0], TR[1]);
const X2 = llx(BR, B2, A2, TR);
g.line(P[0], P[1], X2[0], X2[1]);
const Mr = llx(P, X2, BR, TR); expect('the middle of the right side', Mr, [U, 0]);
g.line(Mr[0], Mr[1], C[0], C[1]);                                  // the level line through the middle

// Glass: every pane inside the frame, found by sampling, each once, coloured by its quarter.
const QUARTER = { tl: '#1a3a8c', tr: '#8b1a1a', bl: '#c8780a', br: '#1a6a2a' };   // Chartres: cobalt, gold-red, amber, copper green
const seen = {}; const panes = [];
for (let y = BL[1] + 1; y < TR[1]; y += 2) for (let x = BL[0] + 1; x < TR[0]; x += 2) {
  const f = g.lab.face(x, y); if (!f) continue;
  const key = f.vertices.slice().sort().join(','); if (seen[key]) continue; seen[key] = true;
  const pts = f.vertices.map(id => g.lab.points.get(id));
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length, cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  if (cx <= BL[0] || cx >= TR[0] || cy <= BL[1] || cy >= TR[1]) continue;   // outside the frame: no glass
  panes.push({ x: x, y: y, colour: QUARTER[(cy > 0 ? 't' : 'b') + (cx > 0 ? 'r' : 'l')], area: f.area });
}
panes.sort((p, q) => q.area - p.area);
panes.forEach(p => g.pane(p.x, p.y, p.colour));

g.write('cw-deploys/models/logs/geo_halves.json', 'Halves',
  'The lines board\'s first demo: with one free point outside the frame and lines alone, the middle of the bottom is found (lines from the point to the two bottom corners, the crossing lines, the line through their crossing), then the diagonals and the upright through the two middles; the same again for the height from the left and right sides gives the level line. Every pane inside the frame then takes glass, a colour to each quarter.',
  { level: 'lines' });
console.log('Halves: ' + g.ops().length + ' ops, ' + g.lab.fills.size + ' panes of glass, ' + [...g.lab.points.values()].filter(p => p.type !== 'hidden').length + ' dots');
