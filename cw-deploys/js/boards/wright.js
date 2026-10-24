/* boards/wright.js — the Wright window, the first board on the Glass shell's interface.

   Built 19 Oct 2026 as level 'wright' inside glass.js (claude/Prompt-Build-Geo-2-Glass-Wright-Window.md),
   gathered into one block there on 24 Oct (T4), moved here the same day (R4) onto the interface written
   in CWVault/claude/Spec-Glass-Shell.md. Registers itself as CW.boards.wright, a factory the shell calls
   once at mount with its services; the page loads it after js/glass.js and mounts with
   cwGlass(host, { board: 'wright', palette }).

   The model is rectangles in metres: the shell's frame, the panes it is divided into, and the cuts that
   divided them. The record holds the shell's init entry (`board: 'wright'`, the opening frame), the
   shell's `frame` and `lock` entries, a `cut` entry per line pulled ({ pane, dir, at }: the pane it
   crosses, 'h' for a level line at y = at or 'v' for an upright at x = at, in metres), and the shell's
   fill entries, each carrying the pane's rectangle (`pane`). Replay rebuilds panes and cuts from the
   entries in order; a cut through a pane that holds glass cuts the glass with it, the two halves named
   after the one. The frame's four sides are the first four segments on the board and nothing more
   special than that: a line is pulled off them as off any cut. No points, no circles, no straightedge.

   What the board does: offers its segments (the sides and the cuts) for a drag to start from; a drag
   from one pulls a line across the one pane on the side the hand moves to, settling on the grid (the
   shell's resolution), never on the pane's own edges; names the pane around a point and gives its
   outline; draws the pulled line and its readouts while the hand is down; adds up the colours under
   the board; carries its three tips. Colouring a pane is the shell's (a tap on a pane), as is the
   lead, the frame and its handles, Undo, Save, Share and every word in the column.

   Classic script, no build step. Stands on nothing but the shell's services; runs in Node for the
   harness (tools/glass-log.js) with `globalThis` for `window`. */
(function (root) {
  'use strict';
  var CW = root.CW = root.CW || {};
  CW.boards = CW.boards || {};

  CW.boards.wright = function (shell) {
    var DEFAULT = { left: -5, bottom: -5, width: 10, height: 10 };   // metres
    var panes = [];        // [{ x0, y0, x1, y1 }], in metres
    var cuts = [];         // [{ dir, at, from, to }]: 'h' at y = at from x = from to x = to; 'v' at x = at from y = from to y = to
    var pull = null;       // the line being pulled, from a press on a segment to its release

    // ── The model ─────────────────────────────────────────────────────────────────────────────
    // The frame has changed (it can only while nothing is built from it): the one pane is the frame
    // again, and glass laid on it follows.
    function onFrame(f) {
      panes = [{ x0: f.left, y0: f.bottom, x1: f.left + f.width, y1: f.bottom + f.height }];
      cuts = [];
      shell.glass().forEach(function (g) { if (g.pane) g.pane = Object.assign({}, panes[0]); });
    }
    function same(a, b) { return !!a && !!b && a.x0 === b.x0 && a.y0 === b.y0 && a.x1 === b.x1 && a.y1 === b.y1; }
    function paneIndex(r) { for (var i = 0; i < panes.length; i++) if (same(panes[i], r)) return i; return -1; }
    // The pane strictly around a point in metres; null on an edge or outside the frame.
    function paneAtU(ux, uy) {
      for (var i = 0; i < panes.length; i++) { var p = panes[i]; if (ux > p.x0 && ux < p.x1 && uy > p.y0 && uy < p.y1) return p; }
      return null;
    }
    // A cut's two halves, or null when it has no room (a line can't settle on the pane's own edges).
    function split(p, dir, at) {
      if (dir === 'h') { if (!(at > p.y0 && at < p.y1)) return null; return [{ x0: p.x0, y0: p.y0, x1: p.x1, y1: at }, { x0: p.x0, y0: at, x1: p.x1, y1: p.y1 }]; }
      if (!(at > p.x0 && at < p.x1)) return null;
      return [{ x0: p.x0, y0: p.y0, x1: at, y1: p.y1 }, { x0: at, y0: p.y0, x1: p.x1, y1: p.y1 }];
    }
    function replayCut(op) {
      if (!shell.frameUnits()) return;
      var i = paneIndex(op.pane); if (i < 0) return;                  // a cut whose pane is not there is nothing
      var halves = split(panes[i], op.dir, op.at); if (!halves) return;
      panes.splice(i, 1, halves[0], halves[1]);
      var p = op.pane;
      cuts.push(op.dir === 'h' ? { dir: 'h', at: op.at, from: p.x0, to: p.x1 } : { dir: 'v', at: op.at, from: p.y0, to: p.y1 });
      // Glass in the pane is cut with it: the fill gives way to two, named after it, so a later
      // repaint or dissolve of either half replays the same.
      shell.glass().filter(function (g) { return g.pane && same(g.pane, p); }).forEach(function (g) { shell.splitGlass(g, halves); });
    }
    function cutCount() { var n = 0, log = shell.log(); for (var i = 1; i < log.length; i++) if (log[i].op === 'cut') n++; return n; }
    function repaintCount() { var n = 0, log = shell.log(); for (var i = 0; i < log.length; i++) if (log[i].op === 'repaint_fill') n++; return n; }
    function M() { return shell.metre(); }
    function screen(ux, uy) { return shell.w2s(ux * M(), uy * M()); }

    // ── The segments and the pull ─────────────────────────────────────────────────────────────
    // The sides of the frame and every cut, in world coordinates, each carrying itself in metres.
    function segments() {
      var f = shell.frameUnits(); if (!f) return [];
      var U = M(), L = f.left, B = f.bottom, R = L + f.width, T = B + f.height, out = [];
      function edge(dir, at, from, to) {
        var ref = { dir: dir, at: at, from: from, to: to };
        out.push(dir === 'h' ? { x1: from * U, y1: at * U, x2: to * U, y2: at * U, ref: ref } : { x1: at * U, y1: from * U, x2: at * U, y2: to * U, ref: ref });
      }
      edge('h', B, L, R); edge('h', T, L, R); edge('v', L, B, T); edge('v', R, B, T);
      cuts.forEach(function (c) { edge(c.dir, c.at, c.from, c.to); });
      return out;
    }
    // A line comes off any edge, parallel to it and across the one pane on the side the hand moves
    // to; it moves on the grid and settles where it is let go, never on the pane's own edges.
    function dragSegment(seg, world) {
      var e = seg.ref;
      pull = { edge: e, start: world, pane: null, at: null, dir: e.dir };
      return {
        move: function (w, pos, moved) {
          var d = pull, U = M();
          if (!d.pane && !moved) return;
          var ux = w.x / U, uy = w.y / U, su = e.dir === 'h' ? uy - e.at : ux - e.at;   // which side of the edge the hand is on
          if (!d.pane || Math.abs(su) > 0.05) {
            var eps = 1e-3 * (su >= 0 ? 1 : -1);
            d.pane = (e.dir === 'h' ? paneAtU(d.start.x / U, e.at + eps) : paneAtU(e.at + eps, d.start.y / U)) || null;
          }
          if (!d.pane) { d.at = null; return; }
          // the line settles on the grid (the resolution's step), never on the pane's own edges
          var p = d.pane, step = shell.step(), lo = shell.clean((e.dir === 'h' ? p.y0 : p.x0) + step), hi = shell.clean((e.dir === 'h' ? p.y1 : p.x1) - step);
          if (hi < lo) { d.at = null; return; }                        // no room: a pane one step across takes no line
          d.at = Math.max(lo, Math.min(hi, shell.snap(e.dir === 'h' ? uy : ux)));
        },
        end: function () {
          var d = pull; pull = null;
          if (!d.pane || d.at === null || d.at === undefined) return;
          shell.fork();
          shell.append({ op: 'cut', pane: { x0: d.pane.x0, y0: d.pane.y0, x1: d.pane.x1, y1: d.pane.y1 }, dir: d.dir, at: d.at });
          shell.play('line');
        }
      };
    }

    // ── Drawn over the glass ──────────────────────────────────────────────────────────────────
    // The lead, the frame and the handles are the shell's. Unless Glass only: the line being pulled,
    // where it would settle, its length, and the two panes it is making, in the readout's style.
    function draw(ctx) {
      if (!shell.frameUnits() || shell.showGlass()) return;
      var d = pull;
      if (!(d && d.pane && d.at !== null && d.at !== undefined)) return;
      var lead = shell.lead(), step = M() * shell.zoom(), clean = shell.clean;
      var p = d.pane, halves = split(p, d.dir, d.at);
      var a = d.dir === 'h' ? screen(p.x0, d.at) : screen(d.at, p.y0), b = d.dir === 'h' ? screen(p.x1, d.at) : screen(d.at, p.y1);
      ctx.save();
      ctx.strokeStyle = lead.colour; ctx.lineWidth = lead.width; ctx.lineCap = 'round'; ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      var len = clean(d.dir === 'h' ? p.x1 - p.x0 : p.y1 - p.y0);
      if (d.dir === 'h') shell.readout(ctx, shell.readoutText('length', len, 'exact'), b.x + 8, b.y, 'left', 'middle');
      else shell.readout(ctx, shell.readoutText('length', len, 'exact'), a.x, Math.min(a.y, b.y) - 6, 'center', 'bottom');
      if (halves) halves.forEach(function (h) {
        var c = screen((h.x0 + h.x1) / 2, (h.y0 + h.y1) / 2), hw = clean(h.x1 - h.x0), hh = clean(h.y1 - h.y0), pw = hw * step, ph = hh * step;
        var size = shell.numText(hw) + ' by ' + shell.numText(hh), area = shell.readoutText('area', clean(hw * hh), 'exact');
        if (ph >= 34 && pw >= 70) { shell.readout(ctx, size, c.x, c.y - 2, 'center', 'bottom'); shell.readout(ctx, area, c.x, c.y + 2, 'center', 'top'); }
        else if (pw >= 110 || ph >= 20) shell.readout(ctx, size + ', ' + area, c.x, c.y, 'center', 'middle');
      });
      ctx.restore();
    }

    // ── The colour totals (19 Oct 2026) ───────────────────────────────────────────────────────
    // A line under the drawing area, right of the column: the area of each colour in use in the order
    // it came, the empty panes, and the window's whole area, which they add up to. Built from nodes,
    // not markup: a colour string comes from a saved or shared file. The board's own furniture.
    var totalsEl = null;
    var STYLE = '.cw-glass .g-wr-totals { position: absolute; left: 184px; bottom: 18px; z-index: 5; display: flex; gap: 16px; align-items: center; font: 12px Georgia, serif; color: #546A80; pointer-events: none; white-space: nowrap; }\n' +
                '.cw-glass .g-wr-totals .sw { display: inline-block; width: 12px; height: 12px; border: 1px solid #777777; vertical-align: -2px; margin-right: 5px; }\n' +
                '.cw-glass .g-wr-totals .all { opacity: 0.75; }';
    function mount(host) {
      if (!document.getElementById('cw-board-wright-style')) { var st = document.createElement('style'); st.id = 'cw-board-wright-style'; st.textContent = STYLE; document.head.appendChild(st); }
      totalsEl = document.createElement('div'); totalsEl.className = 'g-wr-totals'; host.appendChild(totalsEl);
    }
    function update() {
      var f = shell.frameUnits();
      if (!totalsEl || !f) return;
      totalsEl.style.display = shell.showGlass() ? 'none' : '';
      var order = [], by = {}, used = 0;
      shell.glass().forEach(function (g) {
        if (!g.pane) return;
        var a = (g.pane.x1 - g.pane.x0) * (g.pane.y1 - g.pane.y0);
        if (!by.hasOwnProperty(g.color)) { by[g.color] = 0; order.push(g.color); }
        by[g.color] += a; used += a;
      });
      var all = f.width * f.height;
      totalsEl.textContent = '';
      order.forEach(function (c) {
        var sp = document.createElement('span'), sw = document.createElement('i'); sw.className = 'sw'; sw.style.background = c;
        sp.appendChild(sw); sp.appendChild(document.createTextNode(shell.numText(by[c]))); totalsEl.appendChild(sp);
      });
      var em = document.createElement('span'); em.textContent = 'empty ' + shell.numText(all - used); totalsEl.appendChild(em);
      var tot = document.createElement('span'); tot.className = 'all'; tot.textContent = '= ' + shell.numText(all); totalsEl.appendChild(tot);
    }

    return {
      name: 'wright',
      frame: DEFAULT,
      madeWord: 'Show lines',
      reset: function () { panes = []; cuts = []; pull = null; },
      onFrame: onFrame,
      // A cut is something built from the frame: the shell's frame locks at the first.
      builtFromFrame: function () { return cutCount() > 0; },
      // The board's entries, by their shape: a cut.
      replay: function (op) { if (op.op !== 'cut') return false; replayCut(op); return true; },
      // The entries that change the picture, for the step grouping of a replay.
      visibleOps: { cut: true },
      // Every line is lead: the cuts as segments (the frame is the shell's, stroked by the lead pass).
      leadLines: function () {
        var U = M();
        return cuts.map(function (c) { return c.dir === 'h' ? { type: 'seg', x1: c.from * U, y1: c.at * U, x2: c.to * U, y2: c.at * U } : { type: 'seg', x1: c.at * U, y1: c.from * U, x2: c.at * U, y2: c.to * U }; });
      },
      segments: segments,
      paneAt: function (wx, wy) { var U = M(); return paneAtU(wx / U, wy / U); },
      // A pane's rectangle, in metres, as a polygon in world coordinates.
      panePolygon: function (r) { var U = M(); return [{ x: r.x0 * U, y: r.y0 * U }, { x: r.x1 * U, y: r.y0 * U }, { x: r.x1 * U, y: r.y1 * U }, { x: r.x0 * U, y: r.y1 * U }]; },
      dragSegment: dragSegment,
      // A tap on empty board is nothing here (Undo is a word).
      tapGround: function () { return false; },
      draw: draw,
      mount: mount,
      update: update,
      // For the Node harness (tools/glass-log.js) and a browser check: the model as it stands.
      state: function () { return { frame: shell.frameUnits(), panes: panes, cuts: cuts, paneAt: paneAtU, fillOf: shell.glassOn, unit: M() }; },
      tips: [
      // The Wright window's three (19 Oct 2026; plain words, for Michael to rewrite).
      {
        id: 'wr-frame',
        fades: function () { return cutCount() > 0; },
        label: 'Frame',
        trigger: function () { return true; },
        suppress: function () { return false; },
        content: [
          { text: 'The square is your window: 10 steps across and 10 steps up. The numbers along the bottom and the left count the steps.' },
          { text: '' },
          { text: 'Before your first line, drag one of the small dots outside the sides to make the window wider or taller, or smaller, up to 20 steps each way. While you drag, you see its width, its height and its area.' },
          { text: 'Once you draw a line, the window keeps its size.' }
        ]
      },
      {
        id: 'wr-lines',
        fades: function () { return cutCount() >= 2; },
        label: 'Lines',
        trigger: function () { return true; },
        suppress: function () { return false; },
        content: [
          { text: 'Press on any edge, a side of the window or a line you have drawn, and drag into the pane. A new line comes with you, parallel to the edge, across that one pane.' },
          { text: 'It moves in whole steps and settles where you let go. It cannot sit on the pane\'s own edges, and lines never cross: each new line stops at the lines around it.' },
          { text: 'While you drag, you see the line\'s length and the size and area of the two panes it is making.' },
          { text: '' },
          { text: 'Undo takes back your last line. Two fingers move the board, and a pinch zooms it.' }
        ]
      },
      {
        id: 'wr-color',
        colour: true,
        fades: function () { return repaintCount() >= 2; },
        label: 'Colors',
        trigger: function () { return shell.glass().length >= 2; },
        suppress: function () { return repaintCount() > 0; },
        content: [
          { text: 'Tap a pane to fill it with the colour you have chosen. With no colour chosen, it fills with clear glass.' },
          { text: 'Tap it again with another colour to change it. The first chip takes the glass away.' },
          { text: 'The numbers under the board add up the area of each colour, and of the empty panes, to the area of the whole window.' },
          { text: '' },
          { text: 'To choose a different set of colours, tap [Choose new colors].' },
          { text: 'Use the slider to change lead thickness.' }
        ]
      }
      ]
    };
  };
})(typeof window !== 'undefined' ? window : globalThis);
