/* probe.js — the probe on the sea floor (17 Oct 2026, Drain the sea; CWVault/claude/Spec-Drain-the-Sea.md,
   which was not on disk when this was built — the brief of 17 Oct is what it follows).

   cwProbe(map, opts) → { active(), end(), destroy(), twoFinger(on?) }

   An instrument that rides a moving map (js/map.js with the pyramid and its data layers). A tap on
   the sea enters it: the map zooms in on the tap if it is wider than the probe's box, a ring sits
   on the spot, and a card beside it says what is under it — how deep the floor is, how old it is
   in words, and a needle showing which way a compass pointed when that floor cooled, from the
   polarity table (stories/plates/reversals.json) by the age. A tap on land does nothing. While the
   probe is on, one finger drags it over the floor and the card reads as it goes; near the map's
   edge the ground drifts under it, at a capped speed, so she can follow a stripe off the edge of
   the view; two fingers pan the map (opts.twoFinger, on by default; the bench can switch it off).
   The word Done, on the card, ends it; so does Escape. Nothing on the map answers a tap while the
   probe is on; the probe's overlay takes every pointer.

   opts: { reversals: the table (or null), onRead(reading), onDone(), twoFinger: true,
           zoom: { lon: 11, lat: 6.5 } (half-widths in degrees of the box a tap zooms to; null for no zoom),
           edge: 36, drift: 6 (pixels: the band at the edge where the ground drifts, and the fastest it goes a frame),
           lift: 28 (pixels the ring sits above a finger, so the finger does not hide it; 0 for a mouse) }
   reading: { lon, lat, depth (m; 0 on land), age (Ma or null), anomaly (nT or null), chron, polarity ('n' | 'r' | null), pending }

   Classic script; needs map.js. Georgia; nothing responds to hover. */
(function () {
  'use strict';

  var INK = '#2a241c', COPPER = '#b87333', PAPER = 'rgba(244,241,232,0.94)', SOFT = '#6b655a';
  var css = [
    '.cw-probe{position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none;cursor:crosshair;user-select:none;-webkit-user-select:none;z-index:5;}',
    '.cw-probe .ring{position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border:2px solid ' + COPPER + ';border-radius:50%;box-shadow:0 0 0 2px rgba(244,241,232,0.8);pointer-events:none;}',
    '.cw-probe .ring::after{content:"";position:absolute;left:11px;top:11px;width:4px;height:4px;border-radius:50%;background:' + COPPER + ';}',
    '.cw-probe .card{position:absolute;max-width:230px;background:' + PAPER + ';padding:8px 10px 7px;font-family:Georgia,"Times New Roman",serif;font-size:14px;line-height:1.35;color:' + INK + ';pointer-events:none;border-radius:3px;}',
    '.cw-probe .card p{margin:0 0 4px;}',
    '.cw-probe .card .quiet{color:' + SOFT + ';}',
    '.cw-probe .card .small{font-size:12px;color:' + SOFT + ';}',
    '.cw-probe .needle{display:inline-block;vertical-align:middle;margin:0 8px 0 0;}',
    '.cw-probe .field{display:flex;align-items:center;min-height:40px;}',
    '.cw-probe .done{position:absolute;right:10px;bottom:8px;font-family:Georgia,serif;font-size:13px;font-style:italic;color:#546A80;cursor:pointer;background:' + PAPER + ';padding:3px 8px;border-radius:3px;pointer-events:auto;}',
    '.cw-probe .done:hover{color:#3D3D3A;}'
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
  function needleSVG(polarity) {
    var up = polarity === 'n', rot = up ? 0 : 180;
    return '<svg class="needle" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">' +
      '<circle cx="20" cy="20" r="17" fill="none" stroke="' + INK + '" stroke-opacity="0.45" stroke-width="1"/>' +
      '<text x="20" y="7" text-anchor="middle" font-family="Georgia,serif" font-size="7" fill="' + SOFT + '">N</text>' +
      '<g transform="rotate(' + rot + ' 20 20)">' +
      '<polygon points="20,6 23,20 20,34 17,20" fill="' + INK + '"/>' +
      '<polygon points="20,6 23,20 17,20" fill="' + COPPER + '"/>' +
      '</g><circle cx="20" cy="20" r="1.6" fill="' + INK + '"/></svg>';
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
      ring = document.createElement('div'); ring.className = 'ring';
      card = document.createElement('div'); card.className = 'card';
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
      var p = map.pixelOf(pos.lon, pos.lat), w = stage.clientWidth, h = stage.clientHeight;
      ring.style.left = p.x + 'px'; ring.style.top = p.y + 'px';
      // the card to the right of the ring, or to the left near the right edge; above when near the bottom
      var cw = card.offsetWidth || 200, ch = card.offsetHeight || 80;
      var x = p.x + 22, y = p.y - 10;
      if (x + cw > w - 6) x = p.x - 22 - cw;
      if (x < 6) x = 6;
      if (y + ch > h - 34) y = Math.max(6, p.y - 22 - ch);
      if (y < 6) y = 6;
      card.style.left = x + 'px'; card.style.top = y + 'px';
    }
    function read() {
      if (!active || !pos) return;
      var s = map.sample(pos.lon, pos.lat);
      var c = chronFor(table, s.age);
      reading = { lon: pos.lon, lat: pos.lat, depth: s.depth, age: s.age, anomaly: s.anomaly, chron: c ? c.chron : null, chronName: c ? c.name || null : null,
                  polarity: c ? c.polarity : null, pending: s.pending };
      var h = '';
      if (s.pending && s.depth === null) h = '<p class="quiet">…</p>';
      else if (!s.depth) h = '<p class="quiet">Land.</p>';
      else {
        h = '<p>' + depthWords(s.depth) + '</p>';
        if (s.age === null) h += (s.pending ? '<p class="quiet">…</p>' : '<p class="quiet">Part of a continent, under water. Not new floor, so it has no age here.</p>');
        else {
          h += '<p>It is ' + ageWords(s.age) + '.</p>';
          if (c) h += '<div class="field">' + needleSVG(c.polarity) + '<span>When it cooled, a compass here pointed <b>' + (c.polarity === 'n' ? 'north' : 'south') + '</b>.<br><span class="small">' + (c.name ? c.name + ', ' : '') + 'chron ' + c.chron + '</span></span></div>';
          else if (table && s.age >= (table.reach || 0)) h += '<p class="quiet small">Older than the reversal table reaches (' + Math.round(table.reach) + ' million years).</p>';
        }
      }
      card.innerHTML = h;
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
      twoFinger: function (on) { if (on !== undefined) twoFinger = !!on; return twoFinger; },
      destroy: function () { end(); stage.removeEventListener('click', onStageClick); }
    };
  }
  cwProbe.ageWords = ageWords;
  window.cwProbe = cwProbe;
})();
