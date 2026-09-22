/* sampler.js — Curious Woods: the magnifier and the colour sampler, for any picture.
   Colour and Pixels shelf (Ruling-Labs-and-the-Plane, proposed 21 Sep 2026).
   First used inline by Hokusai: The Great Wave (19–20 Sep 2026); pulled out here for the
   Vermeer on 21 Sep so the paintings share one tool instead of copying it.

   cwSampler(frame, anchors, opts)  → { arm(bool), fit(), drop(), repaint() }

   `frame` is an element holding one <img> (the picture). The sampler adds the magnifier
   to it. The frame must show the whole picture at its own shape (give it the picture's
   aspect-ratio); nothing else in the frame is read.

   `anchors` is the painting's own colours, each measured off THIS scan, with what it is:
     { rgb:[r,g,b], m:'material', name:'what she is told', chem:'one or two sentences' }
   Two anchors of the same material are two strengths of one thing; the sampler never
   offers them to her as a choice.

   opts:
     power     how much bigger the print is in the magnifier (4)
     maxZoom   how far a pinch goes (6)
     tie       ΔE under which two different materials are named together (4.5)
     far       ΔE past which the colour is said to be a mixture (22)
     onSample  called with { rgb, hex, what, chem, hedge } each time the magnifier lands,
               but only while armed
     onState   called with { zoomed, loupe } whenever either changes, so the page can
               show or hide its words

   Gestures, per Glass Geometry (Rulings, "Gestures across tools"): tap puts the magnifier
   down there, or moves it there; drag the magnifier to slide it; pinch zooms the picture
   in place; once zoomed, one finger pans. Nothing responds to hover. At rest the frame
   lets a finger scroll the page (touch-action: pan-y); zoomed in, it keeps the finger
   (touch-action: none) until she asks for the whole picture back.

   Two things found at the bench and kept: the <img> must not be draggable, or a native
   image drag fires pointercancel one move into a pan; and a trackpad pinch arrives as a
   ctrl-wheel whose delta is clamped, so one flick does not jump to the limit.

   Classic script, no dependencies. */
(function () {
  'use strict';

  var CSS = [
    '.cw-sampler{position:relative;overflow:hidden;line-height:0;touch-action:pan-y;cursor:zoom-in;}',
    '.cw-sampler.zoomed{touch-action:none;cursor:grab;}',
    '.cw-sampler.zoomed.dragging{cursor:grabbing;}',
    '.cw-sampler>img{display:block;width:100%;height:100%;transform-origin:0 0;will-change:transform;',
    '  user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-user-drag:none;}',
    /* the magnifier takes the finger itself (touch-action is decided where a touch starts),
       so dragging it slides it instead of scrolling the page */
    '.cw-sampler .cw-loupe{position:absolute;width:148px;height:148px;margin:-74px 0 0 -74px;border-radius:50%;',
    '  background-repeat:no-repeat;pointer-events:auto;touch-action:none;cursor:move;display:none;',
    '  box-shadow:0 0 0 1.5px rgba(255,255,255,.9),0 0 0 3px rgba(42,38,32,.55),0 6px 18px rgba(42,38,32,.28);}',
    '.cw-sampler .cw-loupe.on{display:block;}',
    '.cw-sampler .cw-loupe::after{content:"";position:absolute;left:50%;top:50%;width:11px;height:11px;',
    '  margin:-5.5px 0 0 -5.5px;border-radius:50%;border:1px solid rgba(255,255,255,.95);',
    '  box-shadow:0 0 0 1px rgba(42,38,32,.6);}',
    '@media (max-width:760px){.cw-sampler .cw-loupe{width:116px;height:116px;margin:-58px 0 0 -58px;}}'
  ].join('\n');
  var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);

  function lab(rgb) {
    function f(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    var r = f(rgb[0]), g = f(rgb[1]), b = f(rgb[2]);
    var X = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
    var Y = (r * 0.2126729 + g * 0.7151522 + b * 0.0721750);
    var Z = (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) / 1.08883;
    function t(v) { return v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116; }
    var fx = t(X), fy = t(Y), fz = t(Z);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
  function hex(rgb) { return '#' + rgb.map(function (v) { return v.toString(16).padStart(2, '0'); }).join(''); }

  function cwSampler(frame, anchors, opts) {
    opts = opts || {};
    var POWER = opts.power || 4, MAX_ZOOM = opts.maxZoom || 6;
    var TIE = opts.tie || 4.5, FAR = opts.far || 22;
    var img = frame.querySelector('img');
    img.draggable = false;
    frame.classList.add('cw-sampler');
    var loupe = document.createElement('div'); loupe.className = 'cw-loupe'; frame.appendChild(loupe);
    var anchorLab = anchors.map(function (a) { return lab(a.rgb); });

    var zoom = 1, ox = 0, oy = 0, armed = false, spot = null;
    var lastState = '';
    function tell() {
      var s = (zoom > 1.001) + '|' + !!spot;
      if (s !== lastState) { lastState = s; if (opts.onState) opts.onState({ zoomed: zoom > 1.001, loupe: !!spot }); }
    }

    // the sheet, read at its own resolution
    var cvs = null, ctx = null;
    function sheet() {
      if (cvs) return true;
      if (!img.naturalWidth) return false;
      cvs = document.createElement('canvas'); cvs.width = img.naturalWidth; cvs.height = img.naturalHeight;
      ctx = cvs.getContext('2d', { willReadFrequently: true });
      try { ctx.drawImage(img, 0, 0); } catch (e) { cvs = null; return false; }
      return true;
    }

    function identify(rgb) {
      var L = lab(rgb);
      var ranked = anchors.map(function (a, i) { return { a: a, d: dist(L, anchorLab[i]) }; })
                          .sort(function (p, q) { return p.d - q.d; });
      var best = ranked[0], next = ranked[1];
      if (next && next.d - best.d < TIE && next.a.m !== best.a.m) {
        return { what: 'either ' + best.a.name + ', or ' + next.a.name,
                 chem: best.a.chem + ' — ' + next.a.chem,
                 hedge: 'In this picture those two come out the same colour, near enough, so the colour on its own cannot tell them apart. Where they sit in the picture can.' };
      }
      if (best.d > FAR) {
        return { what: best.a.name + ', mixed with something', chem: best.a.chem,
                 hedge: 'This is some way off any single colour in the picture — probably two paints laid over each other, or an edge where two meet.' };
      }
      return { what: best.a.name, chem: best.a.chem,
               hedge: best.d > 11 ? 'A fair match. Paint is not evenly coloured, so nothing here is exact.' : 'A close match.' };
    }

    function clampPan() {
      var r = frame.getBoundingClientRect();
      ox = Math.min(0, Math.max(-(zoom - 1) * r.width, ox));
      oy = Math.min(0, Math.max(-(zoom - 1) * r.height, oy));
    }
    function paint() {
      clampPan();
      img.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(' + zoom + ')';
      frame.classList.toggle('zoomed', zoom > 1.001);
      placeLoupe();
      tell();
    }
    function placeLoupe() {
      if (!spot) { loupe.classList.remove('on'); return; }
      var r = frame.getBoundingClientRect();
      loupe.style.left = (spot.u * r.width * zoom + ox) + 'px';
      loupe.style.top = (spot.v * r.height * zoom + oy) + 'px';
      var bw = r.width * zoom * POWER, bh = r.height * zoom * POWER, size = loupe.offsetWidth || 148;
      loupe.style.backgroundImage = 'url("' + img.currentSrc + '")';
      loupe.style.backgroundSize = bw + 'px ' + bh + 'px';
      loupe.style.backgroundPosition = (size / 2 - spot.u * bw) + 'px ' + (size / 2 - spot.v * bh) + 'px';
      loupe.classList.add('on');
    }
    function readAt(u, v) {
      if (!armed || !opts.onSample || !sheet()) return;
      var sx = Math.round(u * cvs.width), sy = Math.round(v * cvs.height), d;
      try { d = ctx.getImageData(Math.max(0, sx - 2), Math.max(0, sy - 2), 5, 5).data; }
      catch (e) { opts.onSample({ error: true }); return; }
      var R = 0, G = 0, B = 0, k = d.length / 4;
      for (var i = 0; i < d.length; i += 4) { R += d[i]; G += d[i + 1]; B += d[i + 2]; }
      var rgb = [Math.round(R / k), Math.round(G / k), Math.round(B / k)];
      var id = identify(rgb);
      opts.onSample({ rgb: rgb, hex: hex(rgb), what: id.what, chem: id.chem, hedge: id.hedge });
    }
    function setSpot(cx, cy) {
      var r = frame.getBoundingClientRect();
      var u = ((cx - r.left) - ox) / (r.width * zoom), v = ((cy - r.top) - oy) / (r.height * zoom);
      if (u < 0 || v < 0 || u > 1 || v > 1) return;
      spot = { u: u, v: v }; placeLoupe(); tell(); readAt(u, v);
    }
    function zoomTo(z, at) {
      var r = frame.getBoundingClientRect();
      var p = at || { x: r.width / 2, y: r.height / 2 };
      var nz = Math.min(MAX_ZOOM, Math.max(1, z)), k = nz / zoom;
      ox = p.x - (p.x - ox) * k; oy = p.y - (p.y - oy) * k; zoom = nz;
      if (zoom <= 1.001) { zoom = 1; ox = 0; oy = 0; }
      paint();
    }

    // pointers: tap places the magnifier, a drag that starts on it slides it,
    // a drag elsewhere pans once zoomed, two fingers pinch
    var pts = new Map(), startDist = 0, startZoom = 1, startMid = null, moved = 0, mode = null, last = null;
    function onLoupe(cx, cy) {
      if (!spot) return false;
      var r = frame.getBoundingClientRect(), half = (loupe.offsetWidth || 148) / 2;
      var lx = r.left + spot.u * r.width * zoom + ox, ly = r.top + spot.v * r.height * zoom + oy;
      return Math.hypot(cx - lx, cy - ly) < half;
    }
    frame.addEventListener('pointerdown', function (ev) {
      pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY }); moved = 0;
      if (pts.size === 1) {
        last = { x: ev.clientX, y: ev.clientY };
        mode = onLoupe(ev.clientX, ev.clientY) ? 'slide' : (zoom > 1.001 ? 'pan' : null);
        if (mode) { frame.setPointerCapture(ev.pointerId); if (mode === 'pan') frame.classList.add('dragging'); }
      } else if (pts.size === 2) {
        var ab = Array.from(pts.values()), r = frame.getBoundingClientRect();
        startDist = Math.hypot(ab[0].x - ab[1].x, ab[0].y - ab[1].y); startZoom = zoom;
        startMid = { x: (ab[0].x + ab[1].x) / 2 - r.left, y: (ab[0].y + ab[1].y) / 2 - r.top }; mode = 'pinch';
      }
    });
    frame.addEventListener('pointermove', function (ev) {
      if (!pts.has(ev.pointerId)) return;
      pts.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (pts.size === 2 && startDist > 0) {
        var ab = Array.from(pts.values());
        zoomTo(startZoom * Math.hypot(ab[0].x - ab[1].x, ab[0].y - ab[1].y) / startDist, startMid);
        moved = 99; ev.preventDefault(); return;
      }
      if (!last) return;
      var dx = ev.clientX - last.x, dy = ev.clientY - last.y;
      moved += Math.abs(dx) + Math.abs(dy); last = { x: ev.clientX, y: ev.clientY };
      if (mode === 'slide') { setSpot(ev.clientX, ev.clientY); ev.preventDefault(); }
      else if (mode === 'pan') { ox += dx; oy += dy; paint(); ev.preventDefault(); }
    });
    function end(ev) {
      var had = pts.size;
      pts.delete(ev.pointerId);
      if (frame.hasPointerCapture && frame.hasPointerCapture(ev.pointerId)) frame.releasePointerCapture(ev.pointerId);
      frame.classList.remove('dragging');
      // a tap is a tap wherever it lands, on the magnifier or off it; only a drag slides
      if (had === 1 && moved < 7) setSpot(ev.clientX, ev.clientY);
      if (pts.size < 2) startDist = 0;
      mode = pts.size === 1 && zoom > 1.001 ? 'pan' : null;
      last = pts.size === 1 ? Array.from(pts.values())[0] : null;
    }
    frame.addEventListener('pointerup', end);
    frame.addEventListener('pointercancel', function (ev) { pts.delete(ev.pointerId); frame.classList.remove('dragging'); mode = null; });

    frame.addEventListener('wheel', function (ev) {
      if (!ev.ctrlKey) return;
      ev.preventDefault();
      var r = frame.getBoundingClientRect(), d = Math.max(-40, Math.min(40, ev.deltaY));
      zoomTo(zoom * Math.pow(0.99, d), { x: ev.clientX - r.left, y: ev.clientY - r.top });
    }, { passive: false });
    var gz = 1;
    frame.addEventListener('gesturestart', function (ev) { ev.preventDefault(); gz = zoom; });
    frame.addEventListener('gesturechange', function (ev) {
      ev.preventDefault(); var r = frame.getBoundingClientRect();
      zoomTo(gz * ev.scale, { x: ev.clientX - r.left, y: ev.clientY - r.top });
    });

    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(paint, 120); });
    if (img.complete) sheet(); else img.addEventListener('load', sheet);

    return {
      arm: function (on) { armed = !!on; if (armed) { sheet(); if (spot) readAt(spot.u, spot.v); } },
      fit: function () { zoom = 1; ox = 0; oy = 0; paint(); },
      drop: function () { spot = null; placeLoupe(); tell(); },
      repaint: function () { requestAnimationFrame(paint); }
    };
  }

  window.cwSampler = cwSampler;
})();
