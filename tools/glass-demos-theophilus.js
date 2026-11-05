#!/usr/bin/env node
/* glass-demos-theophilus.js — the six demos of Glass 900 years ago (the board `theophilus`), written as gestures through
   glass-log.js from CWVault/claude/Demos-Glass-900-Years-Ago-01.md (5 Nov 2026, Michael's prompt
   Prompt-Revise-Glass-900-Years-Ago-07.md, part 6) and saved to cw-deploys/models/logs/theo_*.json.

   Each demo is its step list exactly — the same circles and lines in the same order, every one from points earlier steps
   made (a miss throws here, not in the browser) — and then its glass, coloured as the file's Glass note says, on the board's
   real pieces: every face the construction makes inside the design is found by sampling the plane and asking the lab's own
   face walk, and each face is coloured by where its sample lies (a petal, an overlap, the lens's upper half…). So a shape the
   look page fills in one go — a mullioned arch, a petal cut by a line — is coloured piece by piece, as the prompt asks. The
   words of each step go into the log file as `steps`, aligned to the circles and lines in order; the player shows no words
   (it has no place for them), and nothing reads the field yet. A face whose samples ask for two colours is two pieces the walk
   ran together at a pinch (the Gothic window, where the round window touches an arch within the engine's tolerance of another
   crossing): it takes the majority's colour and is printed as MIXED, for the report.

   Colours are Chartres (art/palette/palettes.json, chartres_glass): blue, red, amber, purple, green.
   Run: node tools/glass-demos-theophilus.js   — prints each demo's pieces by colour, with their areas, for the report. */
'use strict';
const G = require('./glass-log.js');
const U = 200, X0 = -100;                       // the unit, and where 0 stands (0 at (−100, 0), 1 at (100, 0))
const S3 = Math.sqrt(3), S5 = Math.sqrt(5);
const W = (x, y) => [X0 + x * U, y * U];      // unit coordinates to world
const C = { blue: '#1a3a8c', red: '#8b1a1a', amber: '#c8780a', purple: '#4a1a8c', green: '#1a6a2a' };
const deg = d => d * Math.PI / 180;
const on = (cx, cy, d, r) => [cx + (r || 1) * Math.cos(deg(d)), cy + (r || 1) * Math.sin(deg(d))];   // a point on a circle, in units
const inC = (p, c, r) => Math.hypot(p[0] - c[0], p[1] - c[1]) < (r === undefined ? 1 : r);
function inPoly(p, v) { let ins = false; for (let i = 0, j = v.length - 1; i < v.length; j = i++) {
  if ((v[i][1] > p[1]) !== (v[j][1] > p[1]) && p[0] < (v[j][0] - v[i][0]) * (p[1] - v[i][1]) / (v[j][1] - v[i][1]) + v[i][0]) ins = !ins; } return ins; }
const hexAround = (c, r) => [0, 60, 120, 180, 240, 300].map(d => on(c[0], c[1], d, r));   // the six rim points round a centre

// A demo: its steps (gesture, points in units, words), the box to sample for glass, and the colour of a sample point (or null).
function build(file, name, desc, steps, box, colourAt) {
  const g = G.create();
  const words = [];
  steps.forEach(s => {
    if (s[0] === 'c') { const c = W(...s[1]), e = W(...s[2]); g.circle(c[0], c[1], e[0], e[1]); }
    else { const a = W(...s[1]), b = W(...s[2]); g.line(a[0], a[1], b[0], b[1]); }
    words.push(s[3]);
  });
  // Every face inside the box, by sampling: keyed by its edges so two faces on the same vertices (a lens and its crescents)
  // stay apart; each face keeps every sample that fell in it, and a face whose samples disagree on a colour is reported.
  const faces = new Map(), step = 0.02, off = 0.0137;
  for (let x = box[0] + off; x < box[2]; x += step) for (let y = box[1] + off; y < box[3]; y += step) {
    const colour = colourAt([x, y]); if (!colour) continue;
    const w = W(x, y), f = g.lab.face(w[0], w[1]); if (!f) continue;
    const key = f.edges.map(e => e.type === 'arc' ? 'a' + e.circIdx + ':' + Math.round(e.angleA * 1e4) + ':' + Math.round(e.sweep * 1e4) : 's' + [e.a, e.b].sort().join('-')).sort().join('|');
    let rec = faces.get(key);
    if (!rec) { rec = { sample: [x, y], colours: {}, area: Math.abs(f.area) / (U * U), n: 0 }; faces.set(key, rec); }
    rec.colours[colour] = (rec.colours[colour] || 0) + 1; rec.n++;
  }
  const byColour = {}; let mixed = 0;
  // Colour each face at its first sample, larger faces first so the smallest sit on top in the record's order too.
  Array.from(faces.values()).sort((a, b) => b.area - a.area).forEach(rec => {
    // A face whose samples disagree is two pieces the walk ran together at a pinch (the Gothic window's round window, where it
    // touches an arch within the engine's tolerance of another crossing); it takes the colour most of its samples asked for, and is
    // reported, since no colour is right for all of it.
    const ranked = Object.keys(rec.colours).sort((a, b) => rec.colours[b] - rec.colours[a]);
    if (ranked.length > 1) { mixed++; console.log('  MIXED face (area ' + rec.area.toFixed(3) + ') at ' + rec.sample.map(v => v.toFixed(3)) + ': ' + ranked.map(k => k + ' ' + rec.colours[k]).join(', ') + ' -> ' + ranked[0]); }
    const colour = ranked[0], w = W(...rec.sample);
    g.pane(w[0], w[1], C[colour]);
    (byColour[colour] = byColour[colour] || []).push(rec.area);
  });
  g.write('cw-deploys/models/logs/' + file, name, desc, { steps: words });
  console.log(name + ': ' + steps.length + ' steps, ' + faces.size + ' pieces of glass' + (mixed ? ', ' + mixed + ' MIXED' : ''));
  Object.keys(byColour).forEach(k => console.log('  ' + k + ': ' + byColour[k].length + ' piece' + (byColour[k].length === 1 ? '' : 's') + ', areas ' + byColour[k].map(a => a.toFixed(3)).join(' ')));
  return g;
}

const O = [0, 0], I = [1, 0], T = [0.5, S3 / 2], B = [0.5, -S3 / 2];
const rim0 = hexAround(O), rim1 = hexAround(I);   // the rim points round 0 and round 1, at 0°, 60°, … (rim0[0] is 1, rim1[3] is 0)
// A petal of a rose round c pointing at angle d: the lens of the two circles centred on the rim points either side of d.
const petal = (c, d) => p => inC(p, on(c[0], c[1], d - 60)) && inC(p, on(c[0], c[1], d + 60));
const anyPetal = (c, ds) => p => ds.some(d => petal(c, d)(p));

// 1. The two first circles (4 steps).
build('theo_two_circles.json', 'The two first circles',
  'The two first circles: a circle on 0 through 1, a circle on 1 through 0, the line through 0 and 1, and the line through the two crossings. The lens is red above the line and amber below; the two crescents are blue.',
  [['c', O, I, 'A circle centered on 0, through 1.'],
   ['c', I, O, 'A circle centered on 1, through 0. The two circles cross above and below.'],
   ['l', O, I, 'A line through 0 and 1. It meets the circles at two new points, one at each end.'],
   ['l', T, B, 'A line through the two crossing points. It cuts the middle shape in four.']],
  [-1.1, -1.1, 2.1, 1.1],
  p => { const a = inC(p, O), b = inC(p, I); if (a && b) return p[1] > 0 ? 'red' : 'amber'; if (a || b) return 'blue'; return null; });

// 2. The six-petal rose (7 steps).
const roseSteps = [
  ['c', O, I, 'A circle centered on 0, through 1.'],
  ['c', I, O, 'A circle centered on 1, through 0. It crosses the first circle at two new points.'],
  ['c', T, O, 'A circle centered on the upper crossing, through 0. It makes another new point on the first circle.'],
  ['c', rim0[2], O, 'A circle centered on that new point, through 0.'],
  ['c', rim0[3], O, 'Keep going around: centered on the next new point, through 0.'],
  ['c', rim0[4], O, 'And the next.'],
  ['c', B, O, 'And the last. The six petals are finished.']];
build('theo_six_petal_rose.json', 'The six-petal rose',
  'The six-petal rose: the two first circles, then five more round the first, each centred on the newest crossing and drawn back through 0. Inside the first circle the petals alternate red and amber; the rest is blue.',
  roseSteps, [-1.1, -1.1, 1.1, 1.1],
  p => { if (!inC(p, O)) return null; for (let k = 0; k < 6; k++) if (petal(O, 60 * k)(p)) return k % 2 ? 'amber' : 'red'; return 'blue'; });

// 3. The double rose and hexagon (16 steps).
const hex3 = [rim0[3], rim0[2], rim1[1], rim1[0], rim1[5], rim0[4]];   // (−1,0), (−1/2,√3/2), (3/2,√3/2), (2,0), (3/2,−√3/2), (−1/2,−√3/2)
build('theo_double_rose.json', 'The double rose and hexagon',
  'The double rose and hexagon, the design in the story: a rose of six petals round 0, a second round 1 sharing one petal, and the hexagon through the outer points. Inside the hexagon the eleven petals are red, the two curved triangles between the roses amber, the rest blue.',
  [['c', O, I, 'A circle centered on 0, through 1.'],
   ['c', I, O, 'A circle centered on 1, through 0.'],
   ['c', T, O, 'A circle centered on the upper crossing, through 0.'],
   ['c', B, O, 'A circle centered on the lower crossing, through 0.'],
   ['c', rim0[2], O, 'Centered on the new point at the upper left, through 0.'],
   ['c', rim0[4], O, 'Centered on the new point at the lower left, through 0.'],
   ['c', rim0[3], O, 'Centered on the new point far to the left, through 0. The rose around 0 is finished.'],
   ['c', rim1[1], I, 'Now around 1. Centered on the new point at the upper right, through 1.'],
   ['c', rim1[5], I, 'Centered on the new point at the lower right, through 1.'],
   ['c', rim1[0], I, 'Centered on the new point far to the right, through 1. Two roses, sharing one petal.'],
   ['l', hex3[0], hex3[1], 'Lines for the hexagon: from the far left point to the upper left.'],
   ['l', hex3[1], hex3[2], 'Across the top.'],
   ['l', hex3[2], hex3[3], 'Down to the far right point.'],
   ['l', hex3[3], hex3[4], 'Down to the lower right.'],
   ['l', hex3[4], hex3[5], 'Across the bottom.'],
   ['l', hex3[5], hex3[0], 'And back to where you started.']],
  [-1.05, -0.9, 2.05, 0.9],
  p => { if (!inPoly(p, hex3)) return null;
         if (anyPetal(O, [0, 60, 120, 180, 240, 300])(p) || anyPetal(I, [0, 60, 120, 180, 240, 300])(p)) return 'red';
         if (inC(p, O) && inC(p, I)) return 'amber'; return 'blue'; });

// 4. The twelve-petal rose (20 steps).
const hex4 = [rim0[0], rim0[1], rim0[2], rim0[3], rim0[4], rim0[5]];
const rim0b = [30, 90, 150, 210, 270, 330].map(d => on(0, 0, d));   // the second rose's centres: (√3/2, 1/2), (0, 1), …
build('theo_twelve_petal_rose.json', 'The twelve-petal rose',
  'The twelve-petal rose: the six-petal rose, a line straight up through 0, a second rose on the points that line and the first rose find, turned half a petal, and the hexagon through the first rose\'s points. Inside the hexagon the first rose\'s petals are red, the second\'s amber, each overlap of neighbouring petals amber, the rest blue.',
  [['c', O, I, 'A circle centered on 0, through 1.'],
   ['c', I, O, 'A circle centered on 1, through 0.'],
   ['c', T, O, 'Around the first circle, as for the six-petal rose: centered on the upper crossing, through 0.'],
   ['c', rim0[2], O, 'The next one around.'],
   ['c', rim0[3], O, 'The next.'],
   ['c', rim0[4], O, 'The next.'],
   ['c', B, O, 'The last. That is the first rose.'],
   ['l', O, [0, S3], 'A line from 0 straight up, through the point high above where two circles cross. It meets the first circle at the top and the bottom.'],
   ['c', [0, 1], O, 'A circle centered on the top point, through 0. It makes two new points on the first circle, halfway between the old ones.'],
   ['c', [0, -1], O, 'The same from the bottom point.'],
   ['c', rim0b[0], O, 'Now go around again, on the new points: centered here, through 0.'],
   ['c', rim0b[2], O, 'The next.'],
   ['c', rim0b[3], O, 'The next.'],
   ['c', rim0b[5], O, 'The last. A second rose, turned halfway between the petals of the first.'],
   ['l', hex4[0], hex4[1], 'The hexagon: from 1 to the next corner up.'],
   ['l', hex4[1], hex4[2], 'Across the top.'],
   ['l', hex4[2], hex4[3], 'Down the left.'],
   ['l', hex4[3], hex4[4], 'On down.'],
   ['l', hex4[4], hex4[5], 'Across the bottom.'],
   ['l', hex4[5], hex4[0], 'And back to 1.']],
  [-1.05, -0.9, 1.05, 0.9],
  p => { if (!inPoly(p, hex4)) return null;
         const a = anyPetal(O, [0, 60, 120, 180, 240, 300])(p), b = anyPetal(O, [30, 90, 150, 210, 270, 330])(p);
         if (b) return 'amber'; if (a) return 'red'; return 'blue'; });

// 5. A Gothic window (12 steps).
const TWO = [2, 0], ctr = [1, S5 / 2], touch = [2 / 3, S5 / 3];
build('theo_gothic_window.json', 'A Gothic window',
  'A Gothic window: two small pointed arches from the first three circles, a big arch over both from two circles twice the size, a mullion up the middle of each small arch, and a round window where two more circles cross, just touching every arch. The small arches blue, the round window red, the rest of the big arch purple.',
  [['c', O, I, 'A circle centered on 0, through 1.'],
   ['c', I, O, 'A circle centered on 1, through 0. Where they cross is the point of the first small arch.'],
   ['l', O, I, 'A line through 0 and 1. It reaches a new point at 2.'],
   ['c', TWO, I, 'A circle centered on 2, through 1. That makes the second small arch.'],
   ['c', O, TWO, 'A big circle centered on 0, through 2.'],
   ['c', TWO, O, 'A big circle centered on 2, through 0. Where they cross is the point of the big arch.'],
   ['l', T, B, 'A line through the crossings of the first two circles. It marks the middle of the first small arch.'],
   ['l', [1.5, S3 / 2], [1.5, -S3 / 2], 'The same for the second small arch.'],
   ['c', O, [1.5, 0], 'A circle centered on 0, through the middle of the second small arch.'],
   ['c', TWO, [0.5, 0], 'A circle centered on 2, through the middle of the first. These two cross where the round window will be centered.'],
   ['l', O, ctr, 'A line from 0 through that center. It crosses the first circle just below it.'],
   ['c', ctr, touch, 'The round window: centered there, through that crossing. It just touches every arch around it.']],
  [-0.05, 0.0, 2.05, 1.8],
  p => { if (p[1] <= 0) return null;
         if (inC(p, ctr, 0.5)) return 'red';
         if ((inC(p, O) && inC(p, I)) || (inC(p, I) && inC(p, TWO))) return 'blue';
         if (inC(p, O, 2) && inC(p, TWO, 2)) return 'purple'; return null; });

// 6. The quatrefoil (10 steps).
const M = [0.5, 0], up = [0.5, 0.5], dn = [0.5, -0.5], leaves = [O, I, up, dn];
build('theo_quatrefoil.json', 'The quatrefoil',
  'The quatrefoil: the two first circles and the two lines through them for scaffolding, a small circle on the halfway point, four circles of that size centred on 0, on 1 and on the small circle\'s top and bottom, and a circle round all four, just touching them. The four leaves blue, the overlaps between neighbouring leaves red, the rest of the big circle green.',
  [['c', O, I, 'A circle centered on 0, through 1.'],
   ['c', I, O, 'A circle centered on 1, through 0.'],
   ['l', O, I, 'A line through 0 and 1.'],
   ['l', T, B, 'A line through the two crossings. It cuts the line from 0 to 1 exactly in half.'],
   ['c', M, O, 'A small circle centered on that halfway point, through 0. It crosses the upright line above and below.'],
   ['c', O, M, 'A circle centered on 0, through the halfway point.'],
   ['c', I, M, 'The same, centered on 1.'],
   ['c', up, M, 'The same, centered on the top of the small circle.'],
   ['c', dn, M, 'And centered on its bottom. Four leaves.'],
   ['c', M, [-0.5, 0], 'A circle centered on the halfway point, through the far left of the left leaf. It just touches all four leaves.']],
  [-0.55, -1.05, 1.55, 1.05],
  p => { if (!inC(p, M, 1)) return null; const n = leaves.filter(c => inC(p, c, 0.5)).length;
         return n >= 2 ? 'red' : n === 1 ? 'blue' : 'green'; });
