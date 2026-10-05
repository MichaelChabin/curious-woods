const G = require('/Users/michaelchabin/_CW/tools/glass-log.js');
const S3 = 100 * Math.sqrt(3);
let fails = 0;
function check(name, g, x, y, expect) {
  const face = g.lab.face(x, y);
  const got = face ? { edges: face.edges.length, area: Math.round(face.area) } : null;
  const ok = expect === null ? face === null : (face && face.edges.length === expect.edges && Math.abs(face.area - expect.area) < expect.area * 0.02);
  if (!ok) fails++;
  console.log((ok ? 'ok   ' : 'FAIL ') + name + ' → ' + JSON.stringify(got) + (ok ? '' : ' expected ' + JSON.stringify(expect)));
}
function rose() { const g = G.create(); g.circle(-100,0,100,0).circle(100,0,-100,0); [60,120,180,240,300].forEach(d => g.circle(-100+200*Math.cos(d*Math.PI/180), 200*Math.sin(d*Math.PI/180), -100, 0)); return g; }
// the six petals (each centred 100 from O at angles 30+60k) and the six curved triangles between them (at angle 60k, 150 from O)
{ const g = rose();
  // a petal points at a corner: the lens of the two circles centred on that corner's neighbours,
  // centres 200√3 apart: 2r²acos(d/2r) − (d/2)√(4r²−d²) = 7247; six of them fill the middle at O
  const d = 200 * Math.sqrt(3), r = 200, petal = 2 * r * r * Math.acos(d / (2 * r)) - (d / 2) * Math.sqrt(4 * r * r - d * d);
  for (let k = 0; k < 6; k++) { const a = (60 * k) * Math.PI / 180; check('petal ' + k, g, -100 + 150 * Math.cos(a), 150 * Math.sin(a), { edges: 2, area: petal }); }
  const tri = (Math.PI * r * r - 6 * petal) / 6;   // the curved triangle between two petals along the rim
  for (let k = 0; k < 6; k++) { const a = (30 + 60 * k) * Math.PI / 180; check('triangle ' + k, g, -100 + 100 * Math.cos(a), 100 * Math.sin(a), { edges: 3, area: tri }); }
  check('open ground', g, 900, 900, null);
  check('centre vertex: twelve arc ends, a tap just off it', g, -95, 3, { edges: 2, area: petal });
}
// a lone circle: nothing crosses it
{ const g = G.create().circle(-100, 0, 100, 0);
  check('lone circle', g, -100, 50, { edges: 1, area: Math.PI * 200 * 200 });
  check('outside the lone circle', g, 400, 0, null); }
// rings: two circles that do not cross — the small one inside the big one
{ const g = G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0);   // vesica, then a small circle inside the lens
  // the top crossing and the centre O give a radius-200 circle; for a small one use the vesica's two crossings... make it via a circle on the lens's crossing through the other crossing: radius 346 — too big. Instead: circle on seed 1 through the top crossing is the same radius. A lone small circle needs a point inside: none exist without lines, so test the ring with the big circle alone outside a lone small circle at a crossing: circle on T (0, S3) through… every reachable point is 200 away. So test the ring with two concentric-ish lone circles: circle 0→1 (r 200) and a circle centred on the vesica's top crossing through 1 (r 200) do cross. Rings need a line to find an inner point; done in the square test below.
  check('vesica lens (its arcs cut at 0 and 1: four edges)', g, 0, 0, { edges: 4, area: 2 * (Math.PI / 3 - Math.sqrt(3) / 4) * 200 * 200 }); }
// with lines: tangent circles (circle 0→1 and circle 2→1 touch at 1), a ring, and a square of segments
{ const g = G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0).line(-100, 0, 100, 0);   // E = (300, 0) is point 2
  g.circle(300, 0, 100, 0);                                                                          // circle 2→1: tangent to circle 0→1 at 1
  check('tangent: inside circle 0→1 above the line, outside the lens', g, -100, 100, { edges: 3, area: Math.PI * 200 * 200 / 2 - 2 * (Math.PI / 3 - Math.sqrt(3) / 4) * 200 * 200 / 2 });
  check('tangent: inside circle 2→1 below the line, outside the lens with circle 1→0', g, 300, -100, { edges: 3, area: Math.PI * 200 * 200 / 2 - 2 * (Math.PI / 3 - Math.sqrt(3) / 4) * 200 * 200 / 2 });
  check('tangent: inside circle 1→0 above the line, outside both touching circles', g, 100, 60, { edges: 3, area: Math.PI * 200 * 200 / 2 - 2 * (Math.PI / 3 - Math.sqrt(3) / 4) * 200 * 200 });
}
{ const g = G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0).line(-100, 0, 100, 0).circle(-100, 0, 300, 0);   // circle0 (r200) inside circle O→E (r400): a ring, both cut by the line
  check('ring: between the two circles above the line, less what circle 1→0 takes', g, -100, 300, { edges: 4, area: (Math.PI * 400 * 400 - Math.PI * 200 * 200) / 2 - (Math.PI * 200 * 200 / 2 - 2 * (Math.PI / 3 - Math.sqrt(3) / 4) * 200 * 200 / 2) });
  check('ring: the inner disc still fills by itself', g, -100, 100, { edges: 3, area: Math.PI * 200 * 200 / 2 - 2 * (Math.PI / 3 - Math.sqrt(3) / 4) * 200 * 200 / 2 });
}
{ const g = G.create().circle(-100, 0, 100, 0).circle(100, 0, -100, 0).line(-100, 0, 100, 0);
  g.circle(100, 0, -300, 0).circle(-300, 0, 100, 0).line(-100, 346.41, -100, -346.41).circle(-100, 0, 300, 0).circle(300, 0, -100, 0).line(100, 346.41, 100, -346.41).line(-100, 200, 100, 200);
  const sq = g.lab.face(0, 190); const okSq = sq && sq.edges.some(e => e.type === 'seg') && sq.area > 0 && sq.area < 10000; console.log((okSq ? 'ok   ' : 'FAIL ') + 'square of segments: the strip under the top side, outside the lens → ' + (sq && JSON.stringify({ edges: sq.edges.length, area: Math.round(sq.area), types: sq.edges.map(e => e.type).join(',') })));
  if (!okSq) fails++;
}
console.log(fails ? fails + ' FAILED' : 'all passed');
