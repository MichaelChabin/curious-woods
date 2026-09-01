// ============================================================
// THE PLANE — the coordinate space both labs stand on.
//
// One file, two consumers (Glass Geometry, Glass Multiplication);
// extracted in Phase 4 so the labs share a plane rather than two
// copies that drift. Classic script, no build step: defines
// window.CW.createPlane(opts) and CW.snap.
//
// A plane owns view state (pan = world point under the screen
// centre, zoom = pixels per world unit), the world↔screen
// transforms, the single zoom clamp, cached viewport dimensions,
// the ambient lattice and its adaptive step, and the pixel floor.
// World y is UP. The transforms are pure functions of (world
// point, view state) — the viewport size is held as state, never
// read from the DOM at transform time.
//
// The plane knows nothing about points, glass, panes, or primes.
// The lab declares its unit frame (decision 4) — where "0" sits
// and how long a unit is — and may supply its own default-view
// policy via opts.defaultView(viewW, viewH) → {x, y, zoom}.
// ============================================================

(function() {
'use strict';

window.CW = window.CW || {};

// Half-pixel snap for 1px strokes: one crisp pixel at any position.
CW.snap = function(v) { return Math.round(v) + 0.5; };

CW.createPlane = function(opts) {
    opts = opts || {};

    // Default default-view: centre the unit frame's neighbourhood the way
    // Glass Geometry always has — origin-centred, zoom keyed to screen
    // size so the workspace feels the same size on every device.
    var defaultView = opts.defaultView || function(w, h) {
        return { x: 0, y: 0, zoom: Math.min(w, h) / 900 };
    };

    var viewW = window.innerWidth, viewH = window.innerHeight;  // cached CSS px
    var start = defaultView(viewW, viewH);
    var pan   = { x: start.x, y: start.y };  // world point under the screen centre
    var zoom  = start.zoom;                  // px per world unit

    // The unit frame, declared by the lab (decision 4): where "0" sits in
    // world space and how many world units one unit interval spans. The
    // plane never reaches into the lab's model to find these.
    var unitOrigin = { x: -100, y: 0 };
    var unitLength = 200;

    // Lattice state: tied, the step adapts to zoom and the picture stays
    // self-similar as she descends; untied, the step freezes and zooming
    // crowds or spreads the same lines. Both are wanted (Phase 3).
    var _latticeTied = true, _latticeFrozenStep = null;

    // The one zoom clamp. Every zoom write passes through here.
    var ZOOM_MIN = 0.05, ZOOM_MAX = 10;

    // Tick label: positive in all four directions (map convention) is the
    // caller's job; this handles digits — and since 2 Sep it does not handle
    // them itself. CW.num is the one place a number is written (js/cw-number.js,
    // loaded before this file); these rules were the seed of that standard and
    // now come back from it, so a tick label and a tile numeral cannot drift.
    // One thing changed in the move, and it is a fix: sub-unit steps used to
    // skip thousands grouping, so at a step of 0.5 the label at 1000 read
    // "1000" while at a step of 1 it read "1 000". Both now group.
    function latticeLabelText(v, step) {
        if (step >= 1) return CW.num.count(Math.round(v));
        var dec = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
        return CW.num.decimal(Math.round(v * Math.pow(10, dec)), dec);
    }

    return {
        setViewport: function(w, h) { viewW = w; viewH = h; },
        viewportWidth:  function() { return viewW; },
        viewportHeight: function() { return viewH; },

        zoom:    function() { return zoom; },
        setZoom: function(z) { zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z)); },
        pan:     function() { return { x: pan.x, y: pan.y }; },
        setPan:  function(x, y) { pan.x = x; pan.y = y; },
        view:    function() { return { x: pan.x, y: pan.y, zoom: zoom }; },
        setView: function(v) { pan.x = v.x; pan.y = v.y; this.setZoom(v.zoom); },
        resetView: function() {
            var v = defaultView(viewW, viewH);
            pan.x = v.x; pan.y = v.y; zoom = v.zoom;
        },

        setUnitFrame: function(ox, oy, len) {
            unitOrigin.x = ox; unitOrigin.y = oy;
            if (len > 0) unitLength = len;
        },
        unitOrigin: function() { return { x: unitOrigin.x, y: unitOrigin.y }; },
        unitLength: function() { return unitLength; },

        setLatticeTied: function(t) {
            _latticeFrozenStep = t ? null : this.latticeStep();
            _latticeTied = !!t;
        },
        latticeTied: function() { return _latticeTied; },

        // World y is up: screen y grows downward, so y negates on the way
        // through. These are the only two places that know that.
        worldToScreen: function(wx, wy) {
            return { x: (wx - pan.x) * zoom + viewW / 2,
                     y: -(wy - pan.y) * zoom + viewH / 2 };
        },
        screenToWorld: function(sx, sy) {
            return { x: (sx - viewW / 2) / zoom + pan.x,
                     y: -(sy - viewH / 2) / zoom + pan.y };
        },

        // Ambient lattice step, in unit intervals: the smallest rung of
        // the 1–5–10 ladder whose line spacing exceeds 40px. One function
        // drives both labels and grid lines, the way number-theory-v1's
        // labelStep() keeps its texture coherent — and unlike the sketch,
        // the ladder renumbers by decades in both directions: 0.05, 0.1,
        // 0.5, 1, 5, 10, 50… as far as the zoom clamp lets it walk.
        latticeStep: function() {
            if (!_latticeTied && _latticeFrozenStep) return _latticeFrozenStep;
            var ppu = zoom * unitLength;
            var m = Math.floor(Math.log10(40 / ppu) + 1e-9);
            var step = Math.pow(10, m);              // spacing ≤ 40 by construction
            return (step * 5 * ppu > 40) ? step * 5 : step * 10;
        },

        // The ambient lattice, generated and never stored (decision 5).
        // Every stroke is a 1px line snapped to half-pixels: the sketch's
        // half-pixel-snapping inconsistency — everything snapped except
        // the grid — does not get to arrive here with the lattice, and a
        // 1px line at low opacity replaces the sketch's 0.5px stroke,
        // which could never resolve to a crisp pixel at any position.
        drawLattice: function(ctx) {
            var snap = CW.snap;
            var step = this.latticeStep();
            var stepW = step * unitLength;           // world units between lines
            var spacing = stepW * zoom;              // px between lines
            if (spacing < 3) return;                 // untied and far out: crowding has made its point
            var tl = this.screenToWorld(0, 0), br = this.screenToWorld(viewW, viewH);
            // Visible tick ranges with a one-step margin so lines don't pop at the edges
            var nx0 = Math.floor((Math.min(tl.x, br.x) - unitOrigin.x) / stepW) - 1;
            var nx1 = Math.ceil((Math.max(tl.x, br.x) - unitOrigin.x) / stepW) + 1;
            var ny0 = Math.floor((Math.min(tl.y, br.y) - unitOrigin.y) / stepW) - 1;
            var ny1 = Math.ceil((Math.max(tl.y, br.y) - unitOrigin.y) / stepW) + 1;
            var n, sx, sy;

            ctx.save();
            ctx.strokeStyle = '#546A80';
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.13;
            ctx.beginPath();
            for (n = nx0; n <= nx1; n++) {
                if (n === 0) continue;               // the axis pass draws it stronger
                sx = snap(this.worldToScreen(unitOrigin.x + n * stepW, 0).x);
                ctx.moveTo(sx, 0); ctx.lineTo(sx, viewH);
            }
            for (n = ny0; n <= ny1; n++) {
                if (n === 0) continue;
                sy = snap(this.worldToScreen(0, unitOrigin.y + n * stepW).y);
                ctx.moveTo(0, sy); ctx.lineTo(viewW, sy);
            }
            ctx.stroke();

            // The two axes through the origin, one step up in presence
            var ax = snap(this.worldToScreen(unitOrigin.x, 0).x);
            var ay = snap(this.worldToScreen(0, unitOrigin.y).y);
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.moveTo(ax, 0); ctx.lineTo(ax, viewH);
            ctx.moveTo(0, ay); ctx.lineTo(viewW, ay);
            ctx.stroke();

            // Tick numbers, positive in all four directions (map convention).
            // Label rows clamp to the viewport edge when their axis is out of
            // view — the window is small, the map is not.
            var rowY = Math.max(2, Math.min(ay + 4, viewH - 14));
            var colX = Math.max(28, Math.min(ax - 5, viewW - 4));
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = '#546A80';
            ctx.font = '10px Georgia, serif';
            ctx.textBaseline = 'top'; ctx.textAlign = 'center';
            for (n = nx0; n <= nx1; n++) {
                if (n === 0) continue;
                sx = this.worldToScreen(unitOrigin.x + n * stepW, 0).x;
                ctx.fillText(latticeLabelText(Math.abs(n) * step, step), sx, rowY);
            }
            ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
            for (n = ny0; n <= ny1; n++) {
                if (n === 0) continue;
                sy = this.worldToScreen(0, unitOrigin.y + n * stepW).y;
                ctx.fillText(latticeLabelText(Math.abs(n) * step, step), colX, sy);
            }
            ctx.textBaseline = 'top'; ctx.textAlign = 'right';
            ctx.fillText('0', colX, rowY);
            ctx.restore();
        },

        // The screen's limit, not the plane's: how much world one screen
        // pixel spans. The only unconditional floor; the lab reports it
        // in whatever units it declared.
        pixelFloor: function() { return 1 / zoom; }
    };
};

})();
