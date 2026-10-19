/* probe.js — the probe on the sea floor (17 Oct 2026, Drain the sea; CWVault/claude/Spec-Drain-the-Sea.md,
   which was not on disk when this was built — the brief of 17 Oct is what it follows).

   cwProbe(map, opts) → { active(), end(), destroy(), twoFinger(on?) }

   An instrument that rides a moving map (js/map.js with the pyramid and its data layers). A tap on
   the sea enters it: the map zooms in on the tap if it is wider than the probe's box, and a ring sits
   on the spot. The ring is the compass (17 Oct 2026, Michael): the needle inside it shows which way a
   compass pointed when that floor cooled, from the polarity table (stories/plates/reversals.json) by
   the age, and nothing else sits beside the ring. The words — how deep the floor is, how old it is,
   which way the compass pointed — go in a strip docked along the map's bottom edge, inside the map,
   on a translucent band, with Done at its right end; the strip comes with the probe and goes with
   it. The chron's name stays out of the child's words (it is in `reading.chron` for a bench). A tap
   on land does nothing. While the probe is on, one finger drags it over the floor and the strip reads
   as it goes; near the map's edge the ground drifts under it, at a capped speed, so she can follow a
   stripe off the edge of the view; two fingers pan the map (opts.twoFinger, on by default; the bench
   can switch it off). Done ends it; so does Escape. Nothing on the map answers a tap while the probe
   is on; the probe's overlay takes every pointer.

   opts: { reversals: the table (or null), onRead(reading), onDone(), twoFinger: true,
           extra(reading): HTML a page adds to the strip after the probe's words (18 Oct 2026: the sea's sentence,
           the water ball's line); `probe.refresh()` redraws the strip when what it says has changed,
           zoom: { lon: 11, lat: 6.5 } (half-widths in degrees of the box a tap zooms to; null for no zoom),
           edge: 36, drift: 6 (pixels: the band at the edge where the ground drifts, and the fastest it goes a frame),
           lift: 28 (pixels the ring sits above a finger, so the finger does not hide it; 0 for a mouse) }
   reading: { lon, lat, depth (m; 0 on land), age (Ma or null), anomaly (nT or null), chron, polarity ('n' | 'r' | null), pending }

   Classic script; needs map.js, and js/cw-style.js before it (19 Oct 2026). Georgia; nothing responds to hover. */
(function () {
  'use strict';

  // the colours are js/cw-style.js's, the one style file (19 Oct 2026): copper is the marker's #b5652b (was #b87333)
  var S = window.CW && window.CW.STYLE;
  if (!S) throw new Error('probe.js needs js/cw-style.js loaded before it');
  var INK = S.ink, COPPER = S.copper, PAPER = S.alpha(S.parchment, 0.82), SOFT = S.inkSoft, WORD = S.payne, WORD_HOVER = S.payneHover, HALO = S.alpha(S.parchment, 0.9), HALO_RING = S.alpha(S.parchment, 0.85);
  var RING = 48;   // the compass's diameter in screen pixels: the needle reads at a glance, the ground round it still shows
  var css = [
    '.cw-probe{position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none;cursor:crosshair;user-select:none;-webkit-user-select:none;z-index:5;}',
    '.cw-probe .ring{position:absolute;width:' + RING + 'px;height:' + RING + 'px;margin:' + (-RING / 2) + 'px 0 0 ' + (-RING / 2) + 'px;pointer-events:none;}',
    '.cw-probe .ring svg{display:block;width:100%;height:100%;overflow:visible;}',
    '.cw-probe .strip{position:absolute;left:0;right:0;bottom:0;background:' + PAPER + ';padding:9px 96px 9px 14px;font-family:Georgia,"Times New Roman",serif;font-size:15px;line-height:1.35;color:' + INK + ';pointer-events:none;min-height:1.35em;}',
    '.cw-probe .strip .quiet{color:' + SOFT + ';}',
    '.cw-probe .strip .extra{color:' + SOFT + ';}',
    '.cw-probe .done{position:absolute;right:14px;bottom:9px;font-family:Georgia,serif;font-size:14px;font-style:italic;color:' + WORD + ';cursor:pointer;pointer-events:auto;line-height:1.35;}',
    '.cw-probe .done:hover{color:' + WORD_HOVER + ';}',
    '@media (max-width:600px){.cw-probe .strip{font-size:14px;padding-right:72px;}}'
  ].join('\n');
  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function withCommas(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function ageWords(ma) {                       // the floor's age, in words a line would use
    if (ma === null || ma === undefined) return null;
    if (ma < 0.01) return 'new floor, made in the last ten thousand years';
    if (ma < 1) return 'about ' + withCommas(Math.round(ma * 100) * 10000) + ' years old';
    if (ma < 10) return 'about ' + (Math.round(ma * 10) / 10).toString().replace(/\.0$/, '') + ' million years old';
    return 'about ' + Math.round(ma) + ' million years old';
  }
  function depthWords(m) {
    if (m >= 1000) return 'The floor here is ' + withCommas(Math.round(m / 10) * 10) + ' metres down.';
    return 'The floor here is ' + withCommas(Math.round(m)) + ' metres down.';
  }
  function chronFor(table, ma) {
    if (!table || ma === null) return null;
    var cs = table.chrons || [];
    for (var i = 0; i < cs.length; i++) if (ma >= cs[i].top && ma < cs[i].base) return cs[i];
    return null;
  }
  // the ring is the compass: a copper circle on a paper halo, a small N at the top, and the needle inside when the
  // floor's age gives a polarity — its copper end to the north for normal, to the south for reversed; a dot alone otherwise
  function ringSVG(polarity) {
    var r = 20, c = 24, h = '<svg viewBox="0 0 48 48" aria-hidden="true">' +
      '<circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke="' + HALO_RING + '" stroke-width="5"/>' +
      '<circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke="' + COPPER + '" stroke-width="1.8"/>' +
      '<text x="' + c + '" y="7.5" text-anchor="middle" font-family="Georgia,serif" font-size="7" fill="' + INK + '" stroke="' + HALO + '" stroke-width="2" paint-order="stroke">N</text>';
    if (polarity === 'n' || polarity === 'r') {
      var rot = polarity === 'n' ? 0 : 180;
      h += '<g transform="rotate(' + rot + ' ' + c + ' ' + c + ')">' +
        '<polygon points="24,9 27.5,24 24,39 20.5,24" fill="' + HALO + '"/>' +
        '<polygon points="24,10.5 26.8,24 24,37.5 21.2,24" fill="' + INK + '"/>' +
        '<polygon points="24,10.5 26.8,24 21.2,24" fill="' + COPPER + '"/></g>';
    }
    h += '<circle cx="' + c + '" cy="' + c + '" r="2" fill="' + INK + '" stroke="' + HALO + '" stroke-width="1"/></svg>';
    return h;
  }

  function cwProbe(map, opts) {
    opts = opts || {};
    var stage = map.stage(), table = opts.reversals || null;
    var ZOOM = opts.zoom === undefined ? { lon: 11, lat: 6.5 } : opts.zoom;
    var EDGE = opts.edge || 36, DRIFT = opts.drift || 6, LIFT = opts.lift === undefined ? 28 : opts.lift;
    var twoFinger = opts.twoFinger !== false;
    var active = false, overlay = null, ring = null, card = null, done = null, pos = null, reading = null, pendingTap = null;
    var pointers = {}, nPointers = 0, finger = null, drifting = 0, lastPan = null;

    function enter(lon, lat) {
      active = true; pos = { lon: lon, lat: lat };
      overlay = document.createElement('div'); overlay.className = 'cw-probe';
      ring = document.createElement('div'); ring.className = 'ring'; ring.innerHTML = ringSVG(null);
      card = document.createElement('div'); card.className = 'strip';
      done = document.createElement('span'); done.className = 'done'; done.textContent = (opts.words && opts.words.done) || 'Done';
      overlay.appendChild(ring); overlay.appendChild(card); overlay.appendChild(done);
      stage.appendChild(overlay);
      done.addEventListener('click', function (e) { e.stopPropagation(); end(); });
      done.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
      overlay.addEventListener('pointerdown', onDown);
      overlay.addEventListener('pointermove', onMove);
      overlay.addEventListener('pointerup', onUp);
      overlay.addEventListener('pointercancel', onUp);
      overlay.addEventListener('click', function (e) { e.stopPropagation(); });
      if (ZOOM && map.bounds && map.fit) {
        var b = map.bounds();
        if (b.east - b.west > 2 * ZOOM.lon * 1.15) {   // wider than the probe's box: come in to it (the one zoom a tap may do)
          map.fit({ west: lon - ZOOM.lon, east: lon + ZOOM.lon, south: Math.max(-85, lat - ZOOM.lat), north: Math.min(85, lat + ZOOM.lat) });
        }
      }
      read(); place();
    }
    function end() {
      if (!active) return;
      active = false;
      stopDrift();
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = ring = card = done = null; pos = null; reading = null; pointers = {}; nPointers = 0; finger = null;
      if (opts.onDone) opts.onDone();
    }
    function place() {
      if (!active || !pos) return;
      var p = map.pixelOf(pos.lon, pos.lat);
      ring.style.left = p.x + 'px'; ring.style.top = p.y + 'px';
    }
    function read() {
      if (!active || !pos) return;
      var s = map.sample(pos.lon, pos.lat);
      var c = chronFor(table, s.age);
      reading = { lon: pos.lon, lat: pos.lat, depth: s.depth, age: s.age, anomaly: s.anomaly, chron: c ? c.chron : null, chronName: c ? c.name || null : null,
                  polarity: c ? c.polarity : null, pending: s.pending };
      var h = '';
      if (s.pending && s.depth === null) h = '<span class="quiet">…</span>';
      else if (!s.depth) h = '<span class="quiet">Land.</span>';
      else {
        h = depthWords(s.depth);
        if (s.age === null) h += ' ' + (s.pending ? '<span class="quiet">…</span>' : '<span class="quiet">Part of a continent, under water: not new floor, so it has no age here.</span>');
        else {
          h += ' It is ' + ageWords(s.age) + '.';
          if (c) h += ' When it cooled, a compass here pointed <b>' + (c.polarity === 'n' ? 'north' : 'south') + '</b>.';
          else if (table && s.age >= (table.reach || 0)) h += ' <span class="quiet">Older than the reversal table reaches, ' + Math.round(table.reach) + ' million years.</span>';
        }
      }
      if (opts.extra) { var x = opts.extra(reading); if (x) h += ' <span class="extra">' + x + '</span>'; }
      card.innerHTML = h;
      ring.innerHTML = ringSVG(c ? c.polarity : null);
      if (opts.onRead) opts.onRead(reading);
    }
    // --- the pointers: one moves the probe, two pan the map ---
    function at(e) { var r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    function moveProbeTo(x, y) {
      var w = stage.clientWidth, h = stage.clientHeight;
      x = Math.max(0, Math.min(w, x)); y = Math.max(0, Math.min(h, y));
      var q = map.lonLatAt(x, y);
      pos = { lon: q.lon, lat: q.lat };
      read(); place();
    }
    function onDown(e) {
      if (e.button && e.button !== 0) return;
      e.preventDefault(); e.stopPropagation();
      try { overlay.setPointerCapture(e.pointerId); } catch (err) {}
      var p = at(e);
      pointers[e.pointerId] = p; nPointers = Object.keys(pointers).length;
      if (nPointers === 1) {
        finger = { x: p.x, y: p.y, lift: e.pointerType === 'touch' ? LIFT : 0 };
        moveProbeTo(p.x, p.y - finger.lift);
        startDrift();
      } else if (nPointers === 2 && twoFinger) {
        stopDrift(); finger = null;
        lastPan = mean();
      }
    }
    function mean() { var ks = Object.keys(pointers), sx = 0, sy = 0; ks.forEach(function (k) { sx += pointers[k].x; sy += pointers[k].y; }); return { x: sx / ks.length, y: sy / ks.length }; }
    function onMove(e) {
      if (!pointers[e.pointerId]) return;
      e.preventDefault();
      pointers[e.pointerId] = at(e);
      if (nPointers >= 2 && twoFinger && lastPan) {
        var m = mean();
        map.panBy(m.x - lastPan.x, m.y - lastPan.y);
        lastPan = m;
        read(); place();
        return;
      }
      if (nPointers === 1 && finger) {
        finger.x = pointers[e.pointerId].x; finger.y = pointers[e.pointerId].y;
        moveProbeTo(finger.x, finger.y - finger.lift);
      }
    }
    function onUp(e) {
      if (!pointers[e.pointerId]) return;
      e.stopPropagation();
      delete pointers[e.pointerId]; nPointers = Object.keys(pointers).length;
      if (nPointers < 2) lastPan = null;
      if (nPointers === 1) { var k = Object.keys(pointers)[0]; finger = { x: pointers[k].x, y: pointers[k].y, lift: e.pointerType === 'touch' ? LIFT : 0 }; startDrift(); }
      if (nPointers === 0) { finger = null; stopDrift(); }
    }
    // --- the drift: the ground slides under a finger held near the edge, at most DRIFT px a frame ---
    function startDrift() { if (!drifting) drifting = requestAnimationFrame(driftStep); }
    function stopDrift() { if (drifting) { cancelAnimationFrame(drifting); drifting = 0; } }
    function driftStep() {
      drifting = 0;
      if (!active || !finger) return;
      var w = stage.clientWidth, h = stage.clientHeight, dx = 0, dy = 0, fy = finger.y - finger.lift;
      if (finger.x < EDGE) dx = (EDGE - finger.x) / EDGE * DRIFT;
      else if (finger.x > w - EDGE) dx = -(finger.x - (w - EDGE)) / EDGE * DRIFT;
      if (fy < EDGE) dy = (EDGE - fy) / EDGE * DRIFT;
      else if (fy > h - EDGE) dy = -(fy - (h - EDGE)) / EDGE * DRIFT;
      if (dx || dy) { map.panBy(dx, dy); moveProbeTo(finger.x, fy); }
      drifting = requestAnimationFrame(driftStep);
    }
    // --- entering: a tap on the sea ---
    function onStageClick(e) {
      if (active) return;
      var p = at(e), q = map.lonLatAt(p.x, p.y), s = map.sample(q.lon, q.lat);
      if (s.depth === null && s.pending) { pendingTap = { lon: q.lon, lat: q.lat, when: Date.now() }; return; }   // the tile is still arriving: decide when it has
      if (s.depth > 0) enter(q.lon, q.lat);                                                          // quiet on land
    }
    stage.addEventListener('click', onStageClick);
    map.onData(function () {
      if (pendingTap && !active && Date.now() - pendingTap.when < 2000) {
        var s = map.sample(pendingTap.lon, pendingTap.lat);
        if (!s.pending || s.depth !== null) { var t = pendingTap; pendingTap = null; if (s.depth > 0) enter(t.lon, t.lat); }
      }
      if (active && reading && reading.pending) read();
    });
    map.onView(function () { if (active) place(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') end(); });

    return {
      active: function () { return active; },
      end: end,
      reading: function () { return reading; },
      refresh: function () { if (active) read(); },
      twoFinger: function (on) { if (on !== undefined) twoFinger = !!on; return twoFinger; },
      destroy: function () { end(); stage.removeEventListener('click', onStageClick); }
    };
  }
  cwProbe.ageWords = ageWords;
  window.cwProbe = cwProbe;
})();
