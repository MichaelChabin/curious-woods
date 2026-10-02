#!/usr/bin/env node
/* glass-constructions.js — the canonical set of constructions that ships with Glass Geometry,
   written as gestures through glass-log.js and saved to cw-deploys/models/logs/.
   Michael's list of 1–2 Oct 2026 (board, Glass): Rose · Equilateral triangle · Hexagon ·
   Perpendicular bisector · Square · Hexagram · Pentagon · Pentagram, nested · Pythagoras.
   Each ends in glass, so a replay has somewhere to arrive, except the Rose, whose lead and
   glass are the child's own part in The Glass Rose. Run: node tools/glass-constructions.js */
'use strict';
const G = require('./glass-log.js');
const O = [-100, 0], A = [100, 0], R = 200;
const rad = d => d * Math.PI / 180;
const onC = (deg, r, c) => [(c || O)[0] + (r || R) * Math.cos(rad(deg)), (c || O)[1] + (r || R) * Math.sin(rad(deg))];
const S3 = 100 * Math.sqrt(3);                 // 173.205…
const T = [0, S3], Bo = [0, -S3];              // the vesica's crossings
const out = [];
function done(g, file, name, desc) { g.write('cw-deploys/models/logs/' + file, name, desc); out.push(name + ': ' + g.ops().length + ' ops, ' + g.lab.fills.size + ' glass'); }

// The rose's seven circles: the six corners of the hexagon, a side apart, found by the compass alone.
function rose(g) {
  g.circle(-100, 0, 100, 0).circle(100, 0, -100, 0);
  [60, 120, 180, 240, 300].forEach(d => { const v = onC(d); g.circle(v[0], v[1], -100, 0); });
  return g;
}
const hexV = [0, 60, 120, 180, 240, 300].map(d => onC(d));

// 1. Rose — as the story specifies it; her lead and glass come after.
done(rose(G.create()), 'geo_rose.json', 'Rose',
  'The six-petal rose from The Glass Rose: a circle from 0 through 1, a circle on 1 back through 0, then round the crossings, each new circle centred on the last crossing and drawn back to the middle, until the sixth petal closes the walk. Seven circles, no lines: the compass alone, in walking order. The lead and the glass are hers.');

// 2. Equilateral triangle — Elements I.1.
done(G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0)
  .line(-100, 0, 100, 0).line(-100, 0, 0, S3).line(100, 0, 0, S3)
  .polygon([O, A, T]),
  'geo_nested_triangle.json', 'Equilateral Triangle',
  'Elements I.1: a circle from each seed through the other; their crossing is the apex; the three sides; lead round them and the triangle turns to glass.');

// 3. Hexagon — Elements IV.15, by the rose.
{ const g = rose(G.create());
  for (let i = 0; i < 6; i++) { const a = hexV[i], b = hexV[(i + 1) % 6]; g.line(a[0], a[1], b[0], b[1]); }
  done(g.polygon(hexV), 'geo_hexagon_triangle.json', 'Hexagon',
    'Elements IV.15 by the rose: the seven circles find six crossings a side apart round the middle circle; the six sides; lead round them and the hexagon turns to glass.'); }

// 4. Perpendicular bisector — the first thing a line adds: the vesica cut in four.
{ const g = G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0).line(-100, 0, 100, 0).line(0, S3, 0, -S3);
  const r30 = onC(30), l30 = onC(150, R, A);           // mid-arcs of the lens, right and left
  g.loop([r30, [50, 0], [0, S3 / 2]]).loop([l30, [-50, 0], [0, S3 / 2]])
   .loop([[r30[0], -r30[1]], [50, 0], [0, -S3 / 2]]).loop([[l30[0], -l30[1]], [-50, 0], [0, -S3 / 2]]);
  done(g, 'geo_bisector.json', 'Perpendicular Bisector',
    'Elements I.10: the two circles cross above and below; the line through the crossings cuts the seed line in half at a right angle. The vesica falls into four pieces of glass.'); }

// 5. Square — Elements I.46 on the seed side, with I.11 for the right angles.
{ const g = G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0).line(-100, 0, 100, 0);
  const D = [-300, 0], E = [300, 0];
  g.circle(100, 0, D[0], D[1]).circle(D[0], D[1], 100, 0).line(-100, 100 * Math.sqrt(12), -100, -100 * Math.sqrt(12));   // perpendicular at O
  g.circle(-100, 0, E[0], E[1]).circle(E[0], E[1], -100, 0).line(100, 100 * Math.sqrt(12), 100, -100 * Math.sqrt(12));    // perpendicular at A
  const P = [-100, 200], Q = [100, 200];
  g.line(P[0], P[1], Q[0], Q[1]);
  done(g.polygon([O, A, Q, P]), 'geo_squares_nested.json', 'Square',
    'Elements I.46: a right angle at each end of the seed side (I.11, by the big circles), the side carried up each one by the first two circles, and the top joined. Lead round it and the square turns to glass.'); }

// 6. Hexagram — the rose with its two triangles drawn, the star as one piece of glass.
{ const g = rose(G.create());
  [[0, 2], [2, 4], [4, 0], [1, 3], [3, 5], [5, 1]].forEach(p => g.line(hexV[p[0]][0], hexV[p[0]][1], hexV[p[1]][0], hexV[p[1]][1]));
  const inner = [30, 90, 150, 210, 270, 330].map(d => onC(d, R / Math.sqrt(3)));
  const boundary = []; for (let i = 0; i < 6; i++) { boundary.push(hexV[i]); boundary.push(inner[i]); }
  done(g.polygon(boundary), 'geo_hexagram.json', 'Hexagram',
    'The rose again, then the two triangles through alternate corners. Lead round the twelve edges of the star and it turns to glass.'); }

// The pentagon — Elements IV.11 by the half-radius construction: B above the centre, M the
// middle of OB, the circle on M through A meets OB at N, and AN is the side.
function pentagonLines(g) {
  g.circle(-100, 0, 100, 0).circle(100, 0, -100, 0).line(-100, 0, 100, 0);
  g.circle(100, 0, -300, 0).circle(-300, 0, 100, 0).line(-100, 100 * Math.sqrt(12), -100, -100 * Math.sqrt(12)); // perpendicular at O
  const B = [-100, 200];
  g.circle(B[0], B[1], -100, 0).line(-100 + S3, 100, -100 - S3, 100);       // the line through the crossings: y = 100, so M
  const M = [-100, 100];
  g.circle(M[0], M[1], 100, 0);
  const N = [-100, 100 - Math.sqrt(200 * 200 + 100 * 100)];
  g.circle(100, 0, N[0], N[1]);
  const V = [0, 72, 144, 216, 288].map(d => onC(d));
  g.circle(V[1][0], V[1][1], 100, 0).circle(V[4][0], V[4][1], 100, 0);
  for (let i = 0; i < 5; i++) { const a = V[i], b = V[(i + 1) % 5]; g.line(a[0], a[1], b[0], b[1]); }
  return V;
}
// 7. Pentagon.
{ const g = G.create(); const V = pentagonLines(g);
  done(g.polygon(V), 'geo_pentagon.json', 'Pentagon',
    'Elements IV.11, the way Richmond drew it: a radius straight up, its middle, the circle on that middle through 1 crossing the radius line below — and from 1 to that crossing is the side. Step it round the circle, join the corners, lead, and the pentagon turns to glass.'); }

// 8. Pentagram, nested — the diagonals make a star whose middle is a pentagon; its diagonals make another.
{ const g = G.create(); const V = pentagonLines(g);
  const diag = (P, k) => [[0, 2], [1, 3], [2, 4], [3, 0], [4, 1]].forEach(p => g.line(P[p[0]][0], P[p[0]][1], P[p[1]][0], P[p[1]][1]));
  const phi2 = (1 + Math.sqrt(5)) / 2; const r1 = R / (phi2 * phi2), r2 = r1 / (phi2 * phi2);
  const W = [0, 1, 2, 3, 4].map(k => onC(36 + 72 * k, r1));          // the inner pentagon's corners
  const U = [0, 1, 2, 3, 4].map(k => onC(72 * k, r2));               // the inner-inner pentagon's corners
  diag(V); diag(W);
  for (let k = 0; k < 5; k++) g.polygon([V[k], W[k], W[(k + 4) % 5]]);          // the five points of the star
  for (let k = 0; k < 5; k++) g.polygon([W[k], U[(k + 1) % 5], U[k]]);          // the five points of the inner star
  g.polygon(U);                                                                   // the pentagon at the heart
  done(g, 'geo_pentagram.json', 'Pentagram, nested',
    'The pentagon, then its five diagonals: a star, with a smaller pentagon at its middle. That pentagon has diagonals too, and they make a smaller star with a smaller pentagon in it. Glass on the points of both stars and on the pentagon at the heart; zoom in and the pattern goes on.'); }

// 9. Pythagoras — Elements I.47 on a 30-60-90 triangle, the squares on the three sides, no letters.
// Mirrored across x = 0, the midpoint of the seeds, so the hypotenuse runs from 0 to the far crossing on
// 1's side and the figure leans right, clear of the column (2 Oct).
{ const g0 = G.create(); const g = { circle: (a, b, c, d) => (g0.circle(-a, b, -c, d), g), line: (a, b, c, d) => (g0.line(-a, b, -c, d), g), polygon: pts => (g0.polygon(pts.map(q => [-q[0], q[1]])), g), ops: () => g0.ops(), lab: g0.lab, write: (f, n, d) => g0.write(f, n, d) };
  g.circle(-100, 0, 100, 0).line(-100, 0, 100, 0).circle(100, 0, -100, 0);
  const D = [-300, 0], E = [300, 0];
  g.line(D[0], D[1], T[0], T[1]).line(T[0], T[1], 100, 0);                        // the triangle D, A, T: right angle at T (Thales)
  // the square on the hypotenuse D–A, below
  g.circle(-100, 0, E[0], E[1]).circle(E[0], E[1], -100, 0).line(100, 100 * Math.sqrt(12), 100, -100 * Math.sqrt(12));   // perpendicular at A
  g.circle(D[0], D[1], -100, 0); const F = [-500, 0];
  g.circle(-100, 0, F[0], F[1]).circle(F[0], F[1], -100, 0).line(-300, 100 * Math.sqrt(12), -300, -100 * Math.sqrt(12)); // perpendicular at D
  g.circle(100, 0, D[0], D[1]).circle(D[0], D[1], 100, 0);
  const A1 = [100, -400], D1 = [-300, -400];
  g.line(A1[0], A1[1], D1[0], D1[1]);
  // the square on T–A, outward
  const u = [Math.sqrt(3) / 2, 0.5];                                              // perpendicular to TA, pointing away from D
  const T1 = [200, -S3];                                                          // A mirrored through… the far crossing of circle A→T's line
  g.circle(100, 0, 0, S3);
  g.circle(0, S3, T1[0], T1[1]).circle(T1[0], T1[1], 0, S3);
  const pa1 = [100 + 346.41 * u[0], 346.41 * u[1]], pa2 = [100 - 346.41 * u[0], -346.41 * u[1]];
  g.line(pa1[0], pa1[1], pa2[0], pa2[1]);                                         // perpendicular at A to TA
  const A2 = [100 + 200 * u[0], 200 * u[1]];                                      // (273.2, 100)
  g.circle(0, S3, 100, 0);
  const T2 = [S3, S3 + 100];                                                      // (173.2, 273.2) on line D–T beyond T
  g.line(A2[0], A2[1], T2[0], T2[1]);
  // the square on D–T, outward
  const L = Math.hypot(300, S3);                                                  // 346.41, the length of D–T
  const v = [-0.5, Math.sqrt(3) / 2];                                             // perpendicular to DT, pointing away from A
  g.circle(D[0], D[1], 0, S3);
  const T3 = [-600, -S3];                                                         // D mirrored: the far crossing of circle D→T with line D–T
  g.circle(0, S3, T3[0], T3[1]).circle(T3[0], T3[1], 0, S3);
  const pd1 = [D[0] + 600 * v[0], D[1] + 600 * v[1]], pd2 = [D[0] - 600 * v[0], D[1] - 600 * v[1]];
  g.line(pd1[0], pd1[1], pd2[0], pd2[1]);                                         // perpendicular at D to DT
  const D2 = [D[0] + L * v[0], D[1] + L * v[1]];                                   // (-473.2, 300)
  g.circle(0, S3, D[0], D[1]);
  const T4 = [T[0] + L * (-0.5), T[1] + L * (Math.sqrt(3) / 2)];                   // (-173.2, 473.2) on line T–A beyond T
  g.line(D2[0], D2[1], T4[0], T4[1]);
  g.polygon([D, A, T]).polygon([D, A, A1, D1]).polygon([A, A2, T2, T]).polygon([D, T, T4, D2]);
  done(g, 'geo_pythagoras.json', 'Pythagoras',
    'Elements I.47, without the letters. A triangle in a half-circle has a right angle at the top (Thales). Build a square on each side, lead round all four shapes, and the glass on the two short sides is exactly the glass on the long one. The inner grids of the picture are left out; the shapes say it.'); }

console.log(out.join('\n'));
