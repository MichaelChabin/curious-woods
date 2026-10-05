#!/usr/bin/env node
/* glass-log.js — write a Glass Geometry construction log by gesture, outside the browser.

   The lab's own geometry code is read straight out of cw-deploys/js/glass.js (the operation
   log, the geometry helpers, fills and region detection — the parts with no DOM in them) and
   run here with stubs for the plane and the chrome. A construction is then a list of
   gestures in world coordinates — the same two gestures the child has, plus lead — and
   every id (seed:0, cc:1:2:0, lc:4:1:0, a segment key) is resolved the way the lab resolves
   it, so a log written here replays exactly as one the child drew. The alternative, writing
   ids by hand, is where the March logs went wrong.

   Usage, from a script:
     const G = require('./glass-log.js');
     const g = G.create();                  // seeds at (-100,0) and (100,0), the unit 200
     g.circle(-100, 0, 100, 0);             // centre, then a point it passes through
     g.line(-100, 0, 100, 0);               // two points
     g.lead(0, 100);                        // the segment or arc nearest this spot; a
                                            // closed loop fills, as it does in the lab
     g.write('cw-deploys/models/logs/x.json', 'Name', 'description');

   A gesture names a location by where it is; the nearest recorded point within `tol`
   (6 world units) is taken, and a miss throws, so a wrong coordinate cannot slip through
   as a different point. 2 Oct 2026, for the canonical set (board, Glass). */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'cw-deploys/js/glass.js'), 'utf8');

function section(fromHeader, toHeader) {
  // From the `// ====` line above `fromHeader` to the `// ====` line above `toHeader`.
  const a = SRC.indexOf('// ' + fromHeader);
  const b = SRC.indexOf('// ' + toHeader);
  if (a < 0 || b < 0) throw new Error('section not found: ' + fromHeader + ' .. ' + toHeader);
  const start = SRC.lastIndexOf('// ====', a);
  const end = SRC.lastIndexOf('// ====', b);
  return SRC.slice(start, end);
}

const CODE = [
  section('OPERATION LOG + DATA STRUCTURES', 'CANVAS NOTES'),
  section('GEOMETRY HELPERS', 'THE PLANE (shared)')
].join('\n');

function create(opts) {
  opts = opts || {};
  const unit = { x: -100, y: 0, len: 200 };
  const stubs = {
    PARAMS: { birthDuration: 0 },
    FOREST_GLASS: '#c2d4bc',
    state: { palette: { selected: null } },
    plane: {
      setUnitFrame(ox, oy, len) { unit.x = ox; unit.y = oy; unit.len = len; },
      unitOrigin() { return { x: unit.x, y: unit.y }; },
      unitLength() { return unit.len; },
      resetView() {}
    },
    syncCanvasNoteDOMs() {}, updateViewingWords() {}, checkHtwTriggers() {}, checkTipFadeThresholds() {},
    playSound() {}
  };
  // The lab names a fill by the clock (fill:<ms>). Gestures here arrive within one
  // millisecond, so the clock ticks once per call instead, or two fills would share a name.
  let tick = 0; const realNow = Date.now; Date.now = function () { return ++tick; };
  const names = Object.keys(stubs);
  const body = CODE + `
    return { ops: function () { return operationLog; }, set: function (l) { operationLog = l; replayLog(false); },
             init: initLog, append: appendOp, points: points, lines: lines, circles: circles,
             segs: logicalSegments, arcs: logicalArcs, fills: fills, checkAndFill: checkAndFill,
             dist: dist, getAngle: getAngle, angleBetween: angleBetween,
             face: (typeof findFaceAround === 'function') ? findFaceAround : null };`;
  const lab = new Function(...names, body)(...names.map(n => stubs[n]));
  lab.init();

  const tol = opts.tol || 6;
  function near(x, y, what) {
    let best = null, bd = Infinity;
    lab.points.forEach(p => { const d = lab.dist(x, y, p.x, p.y); if (d < bd) { bd = d; best = p; } });
    if (!best || bd > tol) throw new Error((what || 'point') + ' not found at (' + x + ', ' + y + '); nearest is ' + (best ? best.id + ' at ' + bd.toFixed(1) : 'none'));
    return best.id;
  }
  function nearestEdge(x, y) {
    let best = null, bd = Infinity;
    lab.segs.forEach((seg, key) => {
      const A = lab.points.get(seg.pointAId), B = lab.points.get(seg.pointBId); if (!A || !B) return;
      const cx = B.x - A.x, cy = B.y - A.y, lq = cx * cx + cy * cy; if (!lq) return;
      const t = Math.max(0, Math.min(1, ((x - A.x) * cx + (y - A.y) * cy) / lq));
      const d = lab.dist(x, y, A.x + t * cx, A.y + t * cy);
      if (d < bd) { bd = d; best = { key, obj: seg, kind: 'segment' }; }
    });
    lab.arcs.forEach((arc, key) => {
      const ci = lab.circles.get(arc.circIdx), ce = ci && lab.points.get(ci.centerId); if (!ci || !ce) return;
      const pA = lab.points.get(arc.pointAId), pB = lab.points.get(arc.pointBId); if (!pA || !pB) return;
      const d = Math.abs(lab.dist(x, y, ce.x, ce.y) - ci.radius);
      if (d >= bd) return;
      if (lab.angleBetween(lab.getAngle(x, y, ce), lab.getAngle(pA.x, pA.y, ce), lab.getAngle(pB.x, pB.y, ce))) { bd = d; best = { key, obj: arc, kind: 'arc' }; }
    });
    if (!best || bd > tol) throw new Error('no lead edge at (' + x + ', ' + y + '); nearest is ' + (best ? best.key + ' at ' + bd.toFixed(1) : 'none'));
    return best;
  }

  const api = {
    lab,
    at(x, y) { return near(x, y); },
    has(x, y) { try { near(x, y); return true; } catch (e) { return false; } },
    circle(cx, cy, ex, ey) {
      const c = near(cx, cy, 'centre'), e = near(ex, ey, 'edge');
      lab.append({ op: 'circle', centerId: c, edgeId: e }); return api;
    },
    line(ax, ay, bx, by) {
      const a = near(ax, ay, 'first point'), b = near(bx, by, 'second point');
      lab.append({ op: 'line', p1Id: a, p2Id: b }); return api;
    },
    // Lead on the edge nearest (x, y). A closed loop fills, exactly as the lab does it.
    lead(x, y) {
      const hit = nearestEdge(x, y);
      if (hit.obj.isEmphasized) throw new Error('already leaded: ' + hit.key);
      const before = lab.fills.size;
      lab.append({ op: 'emphasize', key: hit.key });
      lab.checkAndFill();
      api.lastFilled = lab.fills.size > before;
      return api;
    },
    // Lead a whole side: every segment lying between (ax, ay) and (bx, by) on their line, in
    // order. A side is often cut by crossings the construction left on it, and each piece
    // is its own tap for the child; this does the taps. Fills when the loop closes.
    side(ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy);
      const found = [];
      lab.segs.forEach((seg, key) => {
        const A = lab.points.get(seg.pointAId), B = lab.points.get(seg.pointBId); if (!A || !B) return;
        const on = q => Math.abs((dy * (q.x - ax) - dx * (q.y - ay)) / len) < 0.5;
        if (!on(A) || !on(B)) return;
        const tA = ((A.x - ax) * dx + (A.y - ay) * dy) / len, tB = ((B.x - ax) * dx + (B.y - ay) * dy) / len;
        if (Math.min(tA, tB) < -0.5 || Math.max(tA, tB) > len + 0.5) return;
        found.push({ key, obj: seg, t: Math.min(tA, tB) });
      });
      if (!found.length) throw new Error('no side between (' + ax + ', ' + ay + ') and (' + bx + ', ' + by + ')');
      found.sort((p, q) => p.t - q.t);
      const before = lab.fills.size;
      found.forEach(f => { if (!f.obj.isEmphasized) { lab.append({ op: 'emphasize', key: f.key }); lab.checkAndFill(); } });
      api.lastFilled = lab.fills.size > before;
      return api;
    },
    // Lead round a polygon given as [[x, y], ...]; the last side must fill.
    polygon(pts) {
      for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; api.side(a[0], a[1], b[0], b[1]); }
      if (!api.lastFilled) throw new Error('the polygon did not fill');
      return api;
    },
    loop(points) {           // lead round a list of [x, y] spots; the last tap must fill
      points.forEach(p => api.lead(p[0], p[1]));
      if (!api.lastFilled) throw new Error('the loop did not close');
      return api;
    },
    ops() {
      // Fill ids are the lab's clock; here they are numbered, which replays the same.
      let n = 0; const map = {};
      return lab.ops().map(op => {
        const o = Object.assign({}, op);
        if (o.op === 'fill') { map[o.fillId] = 'fill:' + (++n); o.fillId = map[o.fillId]; }
        if ((o.op === 'repaint_fill' || o.op === 'dissolve_fill') && map[o.fillId]) o.fillId = map[o.fillId];
        return o;
      });
    },
    write(file, name, description, extra) {
      const out = Object.assign({ version: 1, name, description }, extra || {}, { operations: api.ops() });
      fs.writeFileSync(path.join(ROOT, file), JSON.stringify(out, null, 2) + '\n');
      return api;
    }
  };
  return api;
}

module.exports = { create };

if (require.main === module) {
  // A check that the harness reproduces the triangle as the lab records it.
  const g = create();
  g.circle(-100, 0, 100, 0).circle(100, 0, -100, 0)
   .line(-100, 0, 100, 0).line(-100, 0, 0, 173.2).line(100, 0, 0, 173.2)
   .loop([[0, 0], [-50, 86.6], [50, 86.6]]);
  console.log(JSON.stringify(g.ops(), null, 1));
}
