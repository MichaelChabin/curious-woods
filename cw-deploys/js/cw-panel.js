// ============================================================
// CW.createInfoPanel — the canvas info window, as a shared piece.
// CW.createChoicePanel — the choice panel (controls pass, Aug 13).
//
// Extracted from Glass Geometry's tip-window pattern (Phase 4
// follow-up): a parchment window that floats over the canvas,
// draggable by its whole surface, a 'close' word top-right, fading
// in and out. Every canvas window must be draggable and closeable;
// this is that rule as a component. Classic script, no build step.
//
// The choice panel is the second species the controls walk named
// (Decisions-Controls-Aug12 §1): an occasional act opens it; the
// outcomes are words, each beside one quiet recipe line; it takes
// one choice and fades. Movable and closable like any panel —
// closing without choosing is the quiet no. It never lingers.
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

CW.createChoicePanel = function(opts) {
    opts = opts || {};
    var el = document.createElement('div');
    el.style.cssText =
        'position:fixed;z-index:800;background:rgba(244,241,232,0.96);' +
        'border:0.5px solid #c8b89a;border-radius:6px;padding:10px 16px 12px;' +
        'box-shadow:0 2px 12px rgba(42,38,32,0.1);user-select:none;' +
        '-webkit-user-select:none;touch-action:none;cursor:grab;' +
        'pointer-events:auto;width:' + (opts.width || 264) + 'px;' +
        'display:none;opacity:0;transition:opacity 200ms ease-in;';

    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:6px;';
    var close = document.createElement('span');
    close.textContent = 'close';
    close.style.cssText = 'font-family:Georgia,serif;font-size:11px;color:#b0a090;cursor:default;transition:color 80ms;';
    close.addEventListener('mouseenter', function() { close.style.color = '#546A80'; });
    close.addEventListener('mouseleave', function() { close.style.color = '#b0a090'; });
    bar.appendChild(close);

    var body = document.createElement('div');
    el.appendChild(bar);
    el.appendChild(body);

    // Movable like any panel; the choice rows and the close word are not
    // drag handles, everything else is.
    var dragging = false, sx, sy, ox, oy;
    el.addEventListener('pointerdown', function(e) {
        if (e.target === close || e.target.dataset.choiceRow || (e.target.parentNode && e.target.parentNode.dataset && e.target.parentNode.dataset.choiceRow)) return;
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
    });
    el.addEventListener('pointerup', function() { dragging = false; el.style.cursor = 'grab'; });

    function fadeOut() {
        el.style.opacity = '0';
        setTimeout(function() { if (el.style.opacity === '0') el.style.display = 'none'; }, 220);
    }

    var api = {
        el: el,
        // open({ choices: [{word, line, action?}] }) — a row with no action
        // is the quiet no: it closes the panel and nothing else happens.
        open: function(config) {
            body.innerHTML = '';
            (config.choices || []).forEach(function(choice) {
                var row = document.createElement('div');
                row.dataset.choiceRow = '1';
                row.style.cssText = 'margin:0 0 9px;padding:3px 0;cursor:default;line-height:1.45;';
                var word = document.createElement('span');
                word.textContent = choice.word;
                word.style.cssText = 'font:13px Georgia,serif;color:#546A80;transition:color 80ms;';
                var line = document.createElement('span');
                line.textContent = ' — ' + choice.line;
                line.style.cssText = 'font:italic 11px Georgia,serif;color:#546A80;opacity:0.65;';
                row.appendChild(word);
                row.appendChild(line);
                row.addEventListener('mouseenter', function() { word.style.color = '#3D3D3A'; });
                row.addEventListener('mouseleave', function() { word.style.color = '#546A80'; });
                row.addEventListener('click', function() {
                    fadeOut();
                    if (choice.action) choice.action();
                });
                body.appendChild(row);
            });
            // A choice panel is transient: it opens centred over the world
            // each time rather than remembering a place.
            el.style.visibility = 'hidden'; el.style.display = '';
            var w = el.offsetWidth, h = el.offsetHeight;
            el.style.left = Math.max(10, Math.round((window.innerWidth - w) / 2)) + 'px';
            el.style.top  = Math.max(10, Math.round(window.innerHeight * 0.4 - h / 2)) + 'px';
            el.style.visibility = '';
            requestAnimationFrame(function() { el.style.opacity = '1'; });
        },
        close: fadeOut,
        visible: function() { return el.style.display !== 'none' && el.style.opacity !== '0'; }
    };
    close.addEventListener('click', function() { fadeOut(); if (opts.onDismiss) opts.onDismiss(); });

    document.body.appendChild(el);
    return api;
};

})();
