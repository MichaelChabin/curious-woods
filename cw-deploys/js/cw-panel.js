// ============================================================
// CW.createInfoPanel — the canvas info window, as a shared piece.
//
// Extracted from Glass Geometry's tip-window pattern (Phase 4
// follow-up): a parchment window that floats over the canvas,
// draggable by its whole surface, a 'close' word top-right, fading
// in and out. Every canvas window must be draggable and closeable;
// this is that rule as a component. Classic script, no build step.
// ============================================================

(function() {
'use strict';

window.CW = window.CW || {};

CW.createInfoPanel = function(opts) {
    opts = opts || {};
    var el = document.createElement('div');
    el.className = 'cw-info-panel';
    el.style.cssText =
        'position:fixed;z-index:500;background:rgba(244,241,232,0.96);' +
        'border:0.5px solid #c8b89a;border-radius:6px;padding:12px 14px 14px;' +
        'box-shadow:0 2px 12px rgba(42,38,32,0.08);user-select:none;' +
        '-webkit-user-select:none;touch-action:none;cursor:grab;' +
        'pointer-events:auto;width:' + (opts.width || 220) + 'px;' +
        'display:none;opacity:0;transition:opacity 200ms ease-in;';
    if (opts.ariaLive) el.setAttribute('aria-live', opts.ariaLive);

    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:4px;';
    var close = document.createElement('span');
    close.textContent = 'close';
    close.style.cssText = 'font-family:Georgia,serif;font-size:11px;color:#b0a090;cursor:default;transition:color 80ms;';
    close.addEventListener('mouseenter', function() { close.style.color = '#546A80'; });
    close.addEventListener('mouseleave', function() { close.style.color = '#b0a090'; });
    bar.appendChild(close);

    var body = document.createElement('div');
    body.style.cssText = 'font:13px/1.55 Georgia,serif;color:#546A80;';
    el.appendChild(bar);
    el.appendChild(body);

    var dragging = false, sx, sy, ox, oy, moved = false;
    el.addEventListener('pointerdown', function(e) {
        if (e.target === close) return;
        e.preventDefault();
        dragging = true; sx = e.clientX; sy = e.clientY;
        ox = parseInt(el.style.left) || 0; oy = parseInt(el.style.top) || 0;
        el.style.cursor = 'grabbing';
        el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function(e) {
        if (!dragging) return;
        el.style.left = (ox + e.clientX - sx) + 'px';
        el.style.top  = (oy + e.clientY - sy) + 'px';
        moved = true;
    });
    el.addEventListener('pointerup', function() { dragging = false; el.style.cursor = 'grab'; });

    var api = {
        el: el,
        body: body,
        userMoved: function() { return moved; },
        setPosition: function(x, y) { el.style.left = x + 'px'; el.style.top = y + 'px'; },
        show: function() {
            if (el.style.display !== 'none' && el.style.opacity === '1') return;
            el.style.display = '';
            requestAnimationFrame(function() { el.style.opacity = '1'; });
        },
        hide: function() {
            el.style.opacity = '0';
            setTimeout(function() { if (el.style.opacity === '0') el.style.display = 'none'; }, 220);
        },
        visible: function() { return el.style.display !== 'none'; }
    };
    close.addEventListener('click', function() { api.hide(); if (opts.onClose) opts.onClose(); });

    document.body.appendChild(el);
    return api;
};

})();
