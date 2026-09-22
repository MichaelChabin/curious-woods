/* timeline.js — Curious Woods: a timeline over a map. "<Name>'s World".
   Spec: CWVault/claude/Spec-Timeline-and-Map.md (21 Sep 2026). Reference: the Frankenstein
   prototype, experiments/maps/prototype-frankenstein.html — its look and behaviour, not its
   code. The map is js/map.js; this file does not draw maps.

   cwTimeline(svg, o)       the two-sided timeline alone → { draw(), select(ids) }
   cwWorld(host, data)      the whole pair: timeline, map, far-away cards, panel

   One list of events, read two ways. The timeline uses each event's date and ignores its
   place; the map uses its place and ignores its date. Tap an event on either and it lights
   on both, and the panel below says what happened and what it has to do with the story.

   data = {
     from, to,                           years at the ends of the line
     region: '../art/maps/<r>.json',     the story's regional base picture (map.js)
     world:  '../art/maps/world.json',   for the far-away cards' window
     places: { id: { name, lat, lon, side:'person'|'world'|'minor', card?:'east'|'west',
                     far?: 'About 8,900 km to the east, in China' } },
     routes: { id: [ [lat, lon], ... ] },
     events: [ { id, year, side:'person'|'world', focus?, label, place, route?,
                 when, title, text } ],
     hint:   'Tap a date or a place.'
   }

   The side means something. The person's events sit above the line in the house ink; the
   world's below in slate. The story's focus event is copper. A selected event is vermilion,
   on the line and on the map. Labels above the line drop the person's name: the side says
   whose they are.

   Classic script, no dependencies beyond map.js. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var INK = '#2a241c', SLATE = '#3f5a78', COPPER = '#b5652b', VERMILION = '#c84830';
  var LEAD_P = '#c9b8b0', LEAD_W = '#c3ccd6', RAIL = '#8a8378', YEAR = '#9a958b';
  var LABEL = 14, ROW = 21, PAD = 26;

  var css = [
    '.cw-world{position:relative;}',
    '.cw-world .cw-tl{display:block;width:100%;touch-action:manipulation;user-select:none;-webkit-user-select:none;}',
    '.cw-world .cw-tl text{font-family:Georgia,"Times New Roman",serif;}',
    '.cw-world .cw-tl .cw-tl-lbl{paint-order:stroke;stroke:rgba(244,241,234,.8);stroke-width:3px;stroke-linejoin:round;}',
    '.cw-world .cw-wmap{position:relative;margin-top:4px;}',
    '.cw-world .cw-card{position:absolute;width:176px;padding:10px 12px;background:rgba(244,241,234,.94);',
    '  border:1px solid #d9d4c8;border-radius:3px;text-align:left;font:inherit;color:inherit;cursor:pointer;line-height:1.3;}',
    '.cw-world .cw-card .n{font-size:15px;display:flex;align-items:center;gap:8px;}',
    '.cw-world .cw-card .n i{display:inline-block;width:8px;height:8px;border-radius:50%;background:' + SLATE + ';flex:none;}',
    '.cw-world .cw-card .y{font-size:13px;color:#7d7a72;margin-top:3px;}',
    '.cw-world .cw-card .d{font-size:13px;color:#7d7a72;margin-top:6px;}',
    '.cw-world .cw-card.on{border-color:' + VERMILION + ';}',
    '.cw-world .cw-card.east{right:12px;}',
    '.cw-world .cw-card.west{left:12px;}',
    '.cw-world .cw-panel{min-height:190px;margin-top:18px;padding-top:14px;border-top:.5px solid #c8b89a;}',
    '.cw-world .cw-panel .hint{color:#7d7a72;font-size:15px;}',
    '.cw-world .cw-panel .when{font-size:13px;color:#7d7a72;letter-spacing:.02em;}',
    '.cw-world .cw-panel h3{font-weight:normal;font-size:20px;margin:2px 0 6px;}',
    '.cw-world .cw-panel p{font-size:17px;line-height:1.5;margin:0 0 16px;max-width:44em;}',
    /* on a phone a card over the map would cover the places that matter, so it sits under
       the map instead, still on the side where the place really lies */
    '@media (max-width:760px){.cw-world .cw-card{position:static;display:block;width:200px;padding:8px 10px;margin-top:8px;}',
    '  .cw-world .cw-card.east{margin-left:auto;} .cw-world .cw-card.west{margin-right:auto;}}'
  ].join('\n');
  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function el(tag, a, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in a) if (a.hasOwnProperty(k)) n.setAttribute(k, a[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  var measure = document.createElement('canvas').getContext('2d');
  function tw(t, size, bold) { measure.font = (bold ? 'bold ' : '') + size + 'px Georgia'; return measure.measureText(t).width; }

  // Nearest-mark picking: a dot or its label, within 20 px for a mouse and 32 for a finger.
  // A label box scores ten pixels worse than a dot, so a close call goes to the dot.
  function threshold(ev) { return ev.pointerType === 'mouse' ? 20 : 32; }
  function distToRect(x, y, r) {
    var dx = Math.max(r.x - x, 0, x - (r.x + r.w)), dy = Math.max(r.y - y, 0, y - (r.y + r.h));
    return Math.hypot(dx, dy);
  }
  function pick(targets, x, y, th) {
    var best = null, bd = 1e9;
    for (var i = 0; i < targets.length; i++) {
      var t = targets[i], d = Math.hypot(x - t.x, y - t.y);
      if (t.box) d = Math.min(d, distToRect(x, y, t.box) + 10);
      if (d < bd) { bd = d; best = t; }
    }
    return bd <= th ? best : null;
  }

  // ---------------------------------------------------------------- the timeline
  function cwTimeline(svg, o) {
    var selected = {}, targets = [];

    // Labels pack away from the line, each into the nearest row where it touches nothing.
    function pack(evs, x, W) {
      var rows = [], placed = [];
      evs.forEach(function (e) {
        var w = tw(e.label, LABEL, true) + 6, cx = x(e.year);
        var left = Math.max(2, Math.min(W - w - 2, cx - w / 2)), r = 0;
        while ((rows[r] || []).some(function (s) { return !(left + w + 8 < s.a || left > s.b + 8); })) r++;
        (rows[r] = rows[r] || []).push({ a: left, b: left + w });
        placed.push({ e: e, cx: cx, left: left, w: w, r: r });
      });
      return { rows: rows.length, placed: placed };
    }

    function draw() {
      var W = svg.getBoundingClientRect().width;   // not a parent's clientWidth: the prototype clipped its last year that way
      if (!W) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      targets = [];
      var x = function (y) { return PAD + (y - o.from) / (o.to - o.from) * (W - 2 * PAD); };
      var sorted = o.events.slice().sort(function (a, b) { return a.year - b.year; });
      var up = pack(sorted.filter(function (e) { return e.side === 'person'; }), x, W);
      var down = pack(sorted.filter(function (e) { return e.side !== 'person'; }), x, W);
      var railY = 8 + Math.max(1, up.rows) * ROW + 18;

      el('line', { x1: PAD, x2: W - PAD, y1: railY, y2: railY, stroke: RAIL, 'stroke-width': 1 }, svg);
      var first = Math.ceil(o.from / 5) * 5;
      for (var y = first; y <= o.to; y += 5) {
        el('line', { x1: x(y), x2: x(y), y1: railY, y2: railY + 4, stroke: RAIL }, svg);
      }
      // the years just under the line: every ten, plus both ends, anchored inward
      var years = [o.from];
      for (var yy = Math.ceil((o.from + 1) / 10) * 10; yy < o.to; yy += 10) if (yy - o.from >= 4 && o.to - yy >= 4) years.push(yy);
      years.push(o.to);
      years.forEach(function (yv) {
        var t = el('text', { x: x(yv), y: railY + 16, 'text-anchor': yv === o.from ? 'start' : (yv === o.to ? 'end' : 'middle'),
                             'font-size': 11, fill: YEAR }, svg);
        t.textContent = yv;
      });

      var labels = [], dots = [];
      function lay(set, above) {
        set.placed.forEach(function (p) {
          var e = p.e, on = !!selected[e.id], person = e.side === 'person';
          var ly = above ? railY - 18 - p.r * ROW : railY + 40 + p.r * ROW;
          var lead = above ? [railY - 5, ly + 5] : [railY + 5, ly - 13];
          el('line', { x1: p.cx, x2: p.cx, y1: lead[0], y2: lead[1], stroke: on ? VERMILION : (person ? LEAD_P : LEAD_W), 'stroke-width': 1 }, svg);
          var col = on ? VERMILION : (e.focus ? COPPER : (person ? INK : SLATE));
          dots.push({ x: p.cx, y: railY, on: on, person: person, r: on ? 6.5 : (e.focus ? 6 : (person ? 5 : 4)), fill: col, id: e.id });
          labels.push({ x: p.left + p.w / 2, y: ly, on: on, t: e.label,
                        fill: on ? VERMILION : (e.focus ? COPPER : (person ? INK : SLATE)) });
          targets.push({ id: e.id, x: p.cx, y: railY, box: { x: p.left, y: ly - 14, w: p.w, h: 18 } });
        });
      }
      lay(up, true); lay(down, false);
      // Two dots that would sit on top of each other (Vermeer and Leeuwenhoek, baptised four
      // days apart) part vertically: the person's rises off the line, the world's drops.
      // World dots are drawn first, the person's over them, a selected one last.
      dots.forEach(function (a) {
        if (!a.person) return;
        dots.forEach(function (b) {
          if (b.person || Math.abs(a.x - b.x) > a.r + b.r) return;
          a.y = railY - 4; b.y = railY + 4;
        });
      });
      targets.forEach(function (t) { dots.forEach(function (d) { if (d.id === t.id) t.y = d.y; }); });
      dots.sort(function (a, b) { return (a.on - b.on) || (a.person - b.person); });
      dots.forEach(function (d) {
        if (d.on) el('circle', { cx: d.x, cy: d.y, r: 11, fill: VERMILION, opacity: 0.16 }, svg);
        el('circle', { cx: d.x, cy: d.y, r: d.r, fill: d.fill }, svg);
      });
      labels.forEach(function (L) {
        var t = el('text', { x: L.x, y: L.y, 'text-anchor': 'middle', 'font-size': LABEL, 'class': 'cw-tl-lbl',
                             'font-weight': L.on ? 'bold' : 'normal', fill: L.fill }, svg);
        t.textContent = L.t;
      });
      var H = railY + 40 + Math.max(0, down.rows - 1) * ROW + 10;
      svg.setAttribute('height', H); svg.style.height = H + 'px';
    }

    svg.addEventListener('pointerdown', function (ev) {
      var r = svg.getBoundingClientRect();
      var t = pick(targets, ev.clientX - r.left, ev.clientY - r.top, threshold(ev));
      if (t) { if (o.onPick) o.onPick(t.id); } else if (o.onEmpty) o.onEmpty();
    });

    return {
      draw: draw,
      select: function (ids) { selected = {}; (ids || []).forEach(function (id) { selected[id] = true; }); draw(); }
    };
  }

  // ---------------------------------------------------------------- the pair
  function cwWorld(host, data) {
    host.classList.add('cw-world');
    host.innerHTML = '';
    var svg = el('svg', { 'class': 'cw-tl' }, host);
    var mapWrap = document.createElement('div'); mapWrap.className = 'cw-wmap'; host.appendChild(mapWrap);
    var mapBox = document.createElement('div'); mapWrap.appendChild(mapBox);
    var panel = document.createElement('section'); panel.className = 'cw-panel';
    panel.setAttribute('aria-live', 'polite'); host.appendChild(panel);

    var hint = data.hint || 'Tap a date or a place.';
    var byId = {}; data.events.forEach(function (e) { byId[e.id] = e; });
    var sel = { ids: [], place: null };

    function eventsAt(pid) {
      return data.events.filter(function (e) { return e.place === pid; }).sort(function (a, b) { return a.year - b.year; });
    }

    // the map's marks: one per place that is on the map, and a route while its event is selected
    var marks = [], placeMark = {}, routeMark = null, map = null;
    Object.keys(data.places).forEach(function (pid) {
      var p = data.places[pid];
      if (p.card) return;
      var m = { type: 'place', lat: p.lat, lon: p.lon, name: p.name,
                world: p.side === 'world', minor: p.side === 'minor' };
      if (p.side !== 'minor' && eventsAt(pid).length) m.onTap = function () { fromMap(pid); };
      placeMark[pid] = m; marks.push(m);
    });

    // cards for places too far away for the map, on the side where they really lie
    var cards = {};
    Object.keys(data.places).forEach(function (pid) {
      var p = data.places[pid];
      if (!p.card) return;
      var evs = eventsAt(pid);
      var b = document.createElement('button'); b.type = 'button'; b.className = 'cw-card ' + p.card;
      b.innerHTML = '<div class="n"><i></i>' + p.name + '</div>' +
        '<div class="y">' + evs.map(function (e) { return Math.floor(e.year); }).join(', ') + '</div>' +
        '<div class="d">' + (p.card === 'west' ? '← ' : '') + (p.far || '') + (p.card === 'east' ? ' →' : '') + '</div>';
      b.style.top = (p.cardTop || 50) + '%';
      b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (evs.length) { if (!(sel.ids.length === 1 && sel.ids[0] === evs[0].id)) selectEvent(evs[0].id); }
        if (data.world && typeof cwMap === 'function') {
          cwMap.load(data.world).then(function (w) {
            var marksW = [{ type: 'place', lat: p.lat, lon: p.lon, name: p.name, lit: true }];
            (p.bearing || []).forEach(function (q) { marksW.push({ type: 'place', lat: q.lat, lon: q.lon, name: q.name, minor: true }); });
            cwMapWindow(w, marksW);
          });
        }
      });
      mapWrap.appendChild(b); cards[pid] = b;
    });

    var tl = cwTimeline(svg, { from: data.from, to: data.to, events: data.events,
                               onPick: function (id) { selectEvent(id); }, onEmpty: clear });

    function render() {
      tl.select(sel.ids);
      Object.keys(placeMark).forEach(function (pid) { placeMark[pid].on = sel.place === pid; });
      if (routeMark) { marks.splice(marks.indexOf(routeMark), 1); routeMark = null; }
      // A route draws only while its own event is the one selected, not when a place's
      // whole list is, or a place with many events would seem to own every road out of it.
      if (sel.ids.length === 1) {
        var e = byId[sel.ids[0]];
        if (e.route && data.routes && data.routes[e.route]) {
          routeMark = { type: 'path', places: data.routes[e.route] };
          marks.unshift(routeMark);
        }
      }
      if (map) map.redraw();
      Object.keys(cards).forEach(function (pid) { cards[pid].classList.toggle('on', sel.place === pid); });
    }
    function showPanel(evs) {
      panel.innerHTML = evs.map(function (e) {
        return '<div><div class="when">' + e.when + '</div><h3>' + e.title + '</h3><p>' + e.text + '</p></div>';
      }).join('');
    }
    function selectEvent(id) {
      if (sel.ids.length === 1 && sel.ids[0] === id) { clear(); return; }   // tapping what is selected clears it
      sel.ids = [id]; sel.place = byId[id].place; render(); showPanel([byId[id]]);
    }
    function selectPlace(pid) {
      var evs = eventsAt(pid);
      if (!evs.length) return;
      if (sel.place === pid && sel.ids.length === evs.length) { clear(); return; }
      sel.ids = evs.map(function (e) { return e.id; }); sel.place = pid; render(); showPanel(evs);
    }
    function fromMap(pid) { var evs = eventsAt(pid); if (evs.length === 1) selectEvent(evs[0].id); else selectPlace(pid); }
    function clear() { sel.ids = []; sel.place = null; render(); panel.innerHTML = '<div class="hint">' + hint + '</div>'; }

    mapBox.addEventListener('click', function () { if (sel.ids.length) clear(); });   // empty ground clears

    panel.innerHTML = '<div class="hint">' + hint + '</div>';
    tl.draw();
    if (typeof cwMap === 'function') {
      cwMap.load(data.region).then(function (r) { map = cwMap(mapBox, r, marks); render(); })
        .catch(function (err) { console.warn('world map', err); });
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { tl.draw(); }, 120); });

    return { select: selectEvent, clear: clear };
  }

  window.cwTimeline = cwTimeline;
  window.cwWorld = cwWorld;
})();
