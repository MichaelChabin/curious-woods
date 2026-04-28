/**
 * CW Developer Toolkit — cw-dev-tools.js
 * Version 1.0 — February 2026
 *
 * Single-file injectable design toolkit for Curious Woods prototypes.
 * Add one script tag to activate. Remove it to leave no trace.
 *
 * Usage:
 *   <script src="/Users/michaelchabin/_CW/tools/cw-dev-tools.js"></script>
 *
 * Keyboard shortcuts:
 *   `        Toggle toolbar visible/hidden
 *   Escape   Cancel current tool
 *   Cmd+E    Open Export panel
 *   1-5      Activate tools directly
 */

(function () {
  'use strict';

  // ─── Namespace ────────────────────────────────────────────────────────────────
  const CWDevTools = {
    activeTool: null,
    toolbarVisible: true,
    state: {
      layout: {},
      components: {},
      lines: {
        constructionLine: { width: 1.5, color: '#546A80', opacity: 1.0, style: 'solid', cap: 'round' },
      },
      markers: {},
      palette: {
        parchment:  '#f4f1e8',
        paynesGray: '#546A80',
        darkGray:   '#3D3D3A',
        darkBrown:  '#2a2620',
        blue:       '#2c5aa0',
        copper:     '#BE622F',
        teal:       '#4AABAA',
      },
      selectedPaletteColor: null,
      underlay: { opacity: 0.3, visible: false },
    },
    els: {},
    layoutRects: [],
    placedComponents: [],
    testLines: [],
    lineDrawing: false,
    markers: [],
  };

  // ─── CSS ──────────────────────────────────────────────────────────────────────
  const CSS = `
    #cw-toolbar {
      position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
      background: #1a1a1a; border-radius: 8px; padding: 6px 10px;
      display: flex; gap: 4px; align-items: center;
      z-index: 10000; box-shadow: 0 2px 12px rgba(0,0,0,0.5);
      font-family: system-ui, sans-serif; font-size: 12px;
      user-select: none; transition: opacity 0.2s;
    }
    #cw-toolbar.cw-hidden { opacity: 0; pointer-events: none; }
    .cw-tool-btn {
      background: #2a2a2a; color: #ccc; border: 1px solid #444;
      border-radius: 5px; padding: 5px 10px; cursor: pointer;
      font-size: 11px; white-space: nowrap;
      transition: background 0.15s, color 0.15s;
    }
    .cw-tool-btn:hover { background: #3a3a3a; color: #fff; }
    .cw-tool-btn.cw-active { background: #4AABAA; color: #fff; border-color: #4AABAA; }
    .cw-export-btn { background: #2c5aa0 !important; color: #fff !important; border-color: #2c5aa0 !important; }
    .cw-export-btn:hover { background: #3a6fc0 !important; }
    #cw-toolbar-sep { width: 1px; background: #444; height: 20px; margin: 0 4px; }

    #cw-coord-readout {
      position: fixed; pointer-events: none; z-index: 10001;
      background: rgba(26,26,26,0.9); color: #fff;
      font: 11px/1 monospace; padding: 3px 7px; border-radius: 10px;
      white-space: nowrap; display: none;
    }

    #cw-overlay {
      position: fixed; inset: 0; pointer-events: none;
      z-index: 9998; overflow: hidden;
    }
    #cw-overlay.cw-active { pointer-events: all; }

    #cw-underlay {
      position: fixed; inset: 0; z-index: 9997; pointer-events: none;
      background-size: contain; background-repeat: no-repeat;
      background-position: center; display: none;
    }

    #cw-lines-canvas {
      position: fixed; inset: 0; z-index: 9996; pointer-events: none;
    }
    #cw-lines-canvas.cw-active { pointer-events: all; cursor: crosshair; }

    .cw-panel {
      position: fixed; z-index: 9999;
      background: #1e1e1e; border: 1px solid #444; border-radius: 8px;
      padding: 14px; color: #ddd;
      font-family: system-ui, sans-serif; font-size: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6); min-width: 220px;
    }
    .cw-panel h3 {
      margin: 0 0 10px; font-size: 13px; color: #fff;
      cursor: move; display: flex; justify-content: space-between; align-items: center;
    }
    .cw-panel label { display: block; margin-bottom: 6px; color: #aaa; }
    .cw-panel input[type=range] { width: 100%; margin: 2px 0; }
    .cw-panel input[type=number],
    .cw-panel input[type=text],
    .cw-panel select {
      background: #2a2a2a; border: 1px solid #555; color: #ddd;
      border-radius: 4px; padding: 3px 6px; font-size: 11px;
      width: 100%; box-sizing: border-box;
    }
    .cw-panel input[type=color] {
      width: 40px; height: 24px; border: none; background: none; cursor: pointer;
    }
    .cw-panel-row {
      display: flex; gap: 8px; align-items: center; margin-bottom: 6px;
    }
    .cw-panel-row label { margin: 0; flex: 1; }
    .cw-btn {
      background: #3a3a3a; color: #ddd; border: 1px solid #555;
      border-radius: 4px; padding: 5px 10px; cursor: pointer;
      font-size: 11px; margin-top: 6px;
    }
    .cw-btn:hover { background: #4a4a4a; }
    .cw-btn-primary { background: #2c5aa0; color: #fff; border-color: #2c5aa0; }
    .cw-btn-primary:hover { background: #3a6fc0; }
    .cw-close { cursor: pointer; color: #888; font-size: 14px; }
    .cw-close:hover { color: #fff; }

    .cw-layout-rect {
      position: fixed; box-sizing: border-box;
      border: 1px dashed #4AABAA; background: rgba(74,171,170,0.08);
      z-index: 9998; pointer-events: all; cursor: move;
    }
    .cw-layout-label {
      position: absolute; top: 4px; left: 6px;
      color: #fff; font: 11px/1 system-ui; pointer-events: none;
    }
    .cw-resize-handle {
      position: absolute; width: 8px; height: 8px;
      background: #4AABAA; border-radius: 1px;
    }

    .cw-palette-grid {
      display: grid; grid-template-columns: repeat(6, 1fr);
      gap: 4px; margin-top: 8px;
    }
    .cw-swatch {
      width: 28px; height: 28px; border-radius: 4px; cursor: pointer;
      border: 2px solid transparent; box-sizing: border-box;
    }
    .cw-swatch.cw-selected { border-color: #fff; }
    .cw-swatch.cw-empty { background: #2a2a2a; border: 1px dashed #555; }
    .cw-swatch-wrap { display: flex; flex-direction: column; align-items: center; }
    .cw-swatch-name {
      font: 9px/1 system-ui; color: #888; text-align: center;
      margin-top: 2px; max-width: 32px;
      overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
    }

    #cw-comp-preview {
      min-height: 60px; display: flex; align-items: center;
      justify-content: center; background: #111;
      border-radius: 4px; margin: 8px 0; padding: 12px;
    }

    #cw-export-modal {
      position: fixed; inset: 0; z-index: 10002;
      background: rgba(0,0,0,0.7);
      display: flex; align-items: center; justify-content: center;
    }
    #cw-export-inner {
      background: #1a1a1a; border: 1px solid #555; border-radius: 10px;
      padding: 20px; width: 560px; max-width: 90vw;
      max-height: 80vh; display: flex; flex-direction: column;
    }
    #cw-export-inner h3 { margin: 0 0 12px; color: #fff; }
    #cw-export-code {
      flex: 1; overflow: auto; background: #111; border-radius: 6px;
      padding: 12px; font: 12px/1.6 monospace; color: #a8d8a8;
      white-space: pre; border: 1px solid #333; max-height: 400px;
    }
    #cw-export-btns { display: flex; gap: 8px; margin-top: 12px; }
  `;

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    injectCSS();
    buildOverlay();
    buildUnderlay();
    buildLinesCanvas();
    buildCoordReadout();
    buildToolbar();
    bindGlobalKeys();
    document.addEventListener('mousemove', onGlobalMouseMove);
    loadPaletteFromStorage();
  }

  function injectCSS() {
    const style = document.createElement('style');
    style.id = 'cw-dev-tools-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  // ─── Infrastructure ───────────────────────────────────────────────────────────
  function buildOverlay() {
    const el = document.createElement('div');
    el.id = 'cw-overlay';
    document.body.appendChild(el);
    CWDevTools.els.overlay = el;
  }

  function buildUnderlay() {
    const el = document.createElement('div');
    el.id = 'cw-underlay';
    document.body.appendChild(el);
    CWDevTools.els.underlay = el;
  }

  function buildLinesCanvas() {
    const cv = document.createElement('canvas');
    cv.id = 'cw-lines-canvas';
    resize(cv);
    document.body.appendChild(cv);
    CWDevTools.els.linesCanvas = cv;
    window.addEventListener('resize', () => { resize(cv); redrawLines(); });
    function resize(c) { c.width = window.innerWidth; c.height = window.innerHeight; }
  }

  function buildCoordReadout() {
    const el = document.createElement('div');
    el.id = 'cw-coord-readout';
    document.body.appendChild(el);
    CWDevTools.els.coordReadout = el;
  }

  // ─── Toolbar ──────────────────────────────────────────────────────────────────
  function buildToolbar() {
    const bar = document.createElement('div');
    bar.id = 'cw-toolbar';

    const tools = [
      { id: 'layout',    label: '⊹ Layout',    key: '1' },
      { id: 'component', label: '⬜ Component', key: '2' },
      { id: 'lines',     label: '— Lines',     key: '3' },
      { id: 'color',     label: '◉ Color',     key: '4' },
      { id: 'underlay',  label: '🖼 Underlay',  key: '5' },
    ];

    tools.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'cw-tool-btn';
      btn.textContent = t.label;
      btn.title = `${t.label} (${t.key})`;
      btn.addEventListener('click', () => toggleTool(t.id));
      bar.appendChild(btn);
      CWDevTools.els[t.id + 'Btn'] = btn;
    });

    const sep = document.createElement('div');
    sep.id = 'cw-toolbar-sep';
    bar.appendChild(sep);

    const expBtn = document.createElement('button');
    expBtn.className = 'cw-tool-btn cw-export-btn';
    expBtn.textContent = '⬇ Export';
    expBtn.title = 'Export (Cmd+E)';
    expBtn.addEventListener('click', openExportModal);
    bar.appendChild(expBtn);

    document.body.appendChild(bar);
    CWDevTools.els.toolbar = bar;
  }

  function toggleTool(id) {
    if (CWDevTools.activeTool === id) deactivateTool();
    else { deactivateTool(); activateTool(id); }
  }

  function activateTool(id) {
    CWDevTools.activeTool = id;
    const btn = CWDevTools.els[id + 'Btn'];
    if (btn) btn.classList.add('cw-active');
    CWDevTools.els.coordReadout.style.display = 'block';
    switch (id) {
      case 'layout':    startLayoutTool(); break;
      case 'component': openComponentPanel(); break;
      case 'lines':     openLinesPanel(); break;
      case 'color':     openColorPanel(); break;
      case 'underlay':  openUnderlayPanel(); break;
    }
  }

  function deactivateTool() {
    const prev = CWDevTools.activeTool;
    if (!prev) return;
    CWDevTools.activeTool = null;
    const btn = CWDevTools.els[prev + 'Btn'];
    if (btn) btn.classList.remove('cw-active');
    CWDevTools.els.coordReadout.style.display = 'none';
    if (prev === 'layout') stopLayoutTool();
    if (prev === 'lines')  stopLinesTool();
    closeAllPanels();
  }

  // ─── Coord readout ────────────────────────────────────────────────────────────
  function onGlobalMouseMove(e) {
    if (!CWDevTools.activeTool) return;
    let x = e.clientX, y = e.clientY;
    if (typeof window.getWorldCoordinates === 'function') {
      const wc = window.getWorldCoordinates(e.clientX, e.clientY);
      if (wc) { x = Math.round(wc.x); y = Math.round(wc.y); }
    }
    const ro = CWDevTools.els.coordReadout;
    ro.textContent = `x: ${Math.round(x)}  y: ${Math.round(y)}`;
    ro.style.left = (e.clientX + 14) + 'px';
    ro.style.top  = (e.clientY - 22) + 'px';
  }

  // ─── Tool 1: Layout ───────────────────────────────────────────────────────────
  let _layoutDrawing = false, _lsx, _lsy, _lCurrentRect;

  function startLayoutTool() {
    const ov = CWDevTools.els.overlay;
    ov.classList.add('cw-active');
    ov.style.cursor = 'crosshair';
    ov.addEventListener('mousedown', _layoutDown);
  }

  function stopLayoutTool() {
    const ov = CWDevTools.els.overlay;
    ov.classList.remove('cw-active');
    ov.style.cursor = '';
    ov.removeEventListener('mousedown', _layoutDown);
    document.removeEventListener('mousemove', _layoutMove);
    document.removeEventListener('mouseup', _layoutUp);
  }

  function _layoutDown(e) {
    if (e.target !== CWDevTools.els.overlay) return;
    _layoutDrawing = true; _lsx = e.clientX; _lsy = e.clientY;
    const rect = document.createElement('div');
    rect.className = 'cw-layout-rect';
    Object.assign(rect.style, { left: _lsx + 'px', top: _lsy + 'px', width: '0', height: '0' });
    const lbl = document.createElement('div');
    lbl.className = 'cw-layout-label'; lbl.textContent = 'area';
    rect.appendChild(lbl);
    document.body.appendChild(rect);
    _lCurrentRect = rect;
    addResizeHandles(rect);
    makeDraggableEl(rect);
    document.addEventListener('mousemove', _layoutMove);
    document.addEventListener('mouseup', _layoutUp);
  }

  function _layoutMove(e) {
    if (!_layoutDrawing || !_lCurrentRect) return;
    const x = Math.min(e.clientX, _lsx), y = Math.min(e.clientY, _lsy);
    const w = Math.abs(e.clientX - _lsx), h = Math.abs(e.clientY - _lsy);
    Object.assign(_lCurrentRect.style, { left: x+'px', top: y+'px', width: w+'px', height: h+'px' });
  }

  function _layoutUp() {
    if (!_layoutDrawing) return;
    _layoutDrawing = false;
    document.removeEventListener('mousemove', _layoutMove);
    document.removeEventListener('mouseup', _layoutUp);
    const rect = _lCurrentRect; _lCurrentRect = null;
    if (!rect) return;
    if (parseInt(rect.style.width) < 10 || parseInt(rect.style.height) < 10) {
      rect.remove(); return;
    }
    const name = prompt('Name this area:', 'area') || 'area';
    const key = toCamelCase(name);
    rect.querySelector('.cw-layout-label').textContent = name;
    rect.dataset.key = key;
    CWDevTools.layoutRects.push(rect);
    syncLayoutRect(rect);
  }

  function syncLayoutRect(rect) {
    const key = rect.dataset.key || 'area';
    CWDevTools.state.layout[key] = {
      x: parseInt(rect.style.left), y: parseInt(rect.style.top),
      width: parseInt(rect.style.width), height: parseInt(rect.style.height),
    };
  }

  function addResizeHandles(rect) {
    [
      { dir:'nw', s:'top:-4px;left:-4px;cursor:nw-resize;' },
      { dir:'ne', s:'top:-4px;right:-4px;cursor:ne-resize;' },
      { dir:'sw', s:'bottom:-4px;left:-4px;cursor:sw-resize;' },
      { dir:'se', s:'bottom:-4px;right:-4px;cursor:se-resize;' },
      { dir:'n',  s:'top:-4px;left:calc(50% - 4px);cursor:n-resize;' },
      { dir:'s',  s:'bottom:-4px;left:calc(50% - 4px);cursor:s-resize;' },
      { dir:'w',  s:'top:calc(50% - 4px);left:-4px;cursor:w-resize;' },
      { dir:'e',  s:'top:calc(50% - 4px);right:-4px;cursor:e-resize;' },
    ].forEach(({ dir, s }) => {
      const h = document.createElement('div');
      h.className = 'cw-resize-handle'; h.style.cssText = s; h.dataset.dir = dir;
      h.addEventListener('mousedown', (e) => { e.stopPropagation(); startResize(e, rect, dir); });
      rect.appendChild(h);
    });
  }

  function startResize(e, rect, dir) {
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY;
    const ol = parseInt(rect.style.left), ot = parseInt(rect.style.top);
    const ow = parseInt(rect.style.width), oh = parseInt(rect.style.height);
    function mv(ev) {
      const dx = ev.clientX - sx, dy = ev.clientY - sy;
      let l=ol, t=ot, w=ow, h=oh;
      if (dir.includes('e')) w = Math.max(20, ow + dx);
      if (dir.includes('s')) h = Math.max(20, oh + dy);
      if (dir.includes('w')) { l = ol+dx; w = Math.max(20, ow-dx); }
      if (dir.includes('n')) { t = ot+dy; h = Math.max(20, oh-dy); }
      Object.assign(rect.style, { left:l+'px', top:t+'px', width:w+'px', height:h+'px' });
      syncLayoutRect(rect);
    }
    function up() { document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); }
    document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up);
  }

  function makeDraggableEl(el) {
    el.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('cw-resize-handle')) return;
      e.preventDefault();
      const sx = e.clientX, sy = e.clientY;
      const ol = parseInt(el.style.left), ot = parseInt(el.style.top);
      function mv(ev) {
        el.style.left = (ol + ev.clientX - sx) + 'px';
        el.style.top  = (ot + ev.clientY - sy) + 'px';
        if (el.dataset.key) syncLayoutRect(el);
      }
      function up() { document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); }
      document.addEventListener('mousemove', mv); document.addEventListener('mouseup', up);
    });
  }

  // ─── Tool 2: Component ────────────────────────────────────────────────────────
  function openComponentPanel() {
    const panel = makePanel('cw-comp-panel', '⬜ Component', 300, 100);
    let compType = 'button';

    const props = {
      button: {
        width:120, height:44, borderRadius:8,
        padT:0, padR:20, padB:0, padL:20,
        bg:'#2c5aa0', bw:0, bc:'#000', bs:'none',
        text:'Button', ff:'Georgia', fs:16, fw:'normal', tc:'#ffffff', shadow:'none',
      },
      textbox: {
        width:220, padT:8, padR:12, padB:8, padL:12,
        bg:'transparent', bw:1, bc:'#546A80', bs:'solid',
        ff:'Georgia', fs:14, fw:'normal', lh:1.5, tc:'#2a2620',
        text:'Sample text',
      },
    };

    const row0 = makeRow(panel);
    addLabel(row0, 'Type:');
    const typeSelect = makeSelect(['button','textbox'], compType, row0);

    const preview = document.createElement('div');
    preview.id = 'cw-comp-preview';
    panel.appendChild(preview);

    const propsDiv = document.createElement('div');
    panel.appendChild(propsDiv);

    const actRow = document.createElement('div');
    actRow.style.cssText = 'display:flex;gap:6px;margin-top:8px;align-items:center;';
    panel.appendChild(actRow);

    const nameInp = document.createElement('input');
    nameInp.type = 'text'; nameInp.value = 'myButton';
    nameInp.style.cssText = 'flex:1;background:#2a2a2a;border:1px solid #555;color:#ddd;border-radius:4px;padding:4px 6px;font-size:11px;';
    actRow.appendChild(nameInp);

    const placeBtn = document.createElement('button');
    placeBtn.className = 'cw-btn cw-btn-primary'; placeBtn.textContent = 'Place';
    placeBtn.style.marginTop = '0';
    actRow.appendChild(placeBtn);

    const saveBtn = document.createElement('button');
    saveBtn.className = 'cw-btn'; saveBtn.textContent = 'Save Spec';
    saveBtn.style.marginTop = '0';
    actRow.appendChild(saveBtn);

    function refresh() {
      preview.innerHTML = '';
      preview.appendChild(buildPreviewEl(compType, props[compType]));
    }

    function buildProps() {
      propsDiv.innerHTML = '';
      const p = props[compType];
      addN(propsDiv, 'Width', p, 'width', 40, 600, refresh);
      if (compType === 'button') {
        addN(propsDiv, 'Height', p, 'height', 20, 120, refresh);
        addN(propsDiv, 'Radius', p, 'borderRadius', 0, 60, refresh);
      }
      addColorRow(propsDiv, 'Background', p, 'bg', refresh);
      addText(propsDiv, 'Label', p, 'text', refresh);
      addN(propsDiv, 'Font size', p, 'fs', 8, 48, refresh);
      addColorRow(propsDiv, 'Text color', p, 'tc', refresh);
      if (compType === 'button') addSel(propsDiv, 'Shadow', p, 'shadow', ['none','subtle','medium'], refresh);
      if (compType === 'textbox') addSel(propsDiv, 'Border', p, 'bs', ['solid','dashed','none'], refresh);
    }

    typeSelect.addEventListener('change', () => { compType = typeSelect.value; buildProps(); refresh(); });
    placeBtn.addEventListener('click', () => placeComponent(compType, props[compType]));
    saveBtn.addEventListener('click', () => {
      const key = toCamelCase(nameInp.value || 'component');
      CWDevTools.state.components[key] = specFromProps(compType, props[compType]);
      showToast(`Saved "${key}"`);
    });

    buildProps(); refresh();
    document.body.appendChild(panel);
    makePanelDraggable(panel);
  }

  function buildPreviewEl(type, p) {
    const el = document.createElement(type === 'button' ? 'button' : 'div');
    el.textContent = p.text;
    const shadow = p.shadow === 'subtle' ? '0 1px 4px rgba(0,0,0,0.3)'
                 : p.shadow === 'medium' ? '0 3px 10px rgba(0,0,0,0.4)'
                 : 'none';
    el.style.cssText = `
      width:${p.width}px; background:${p.bg}; color:${p.tc};
      font-family:${p.ff||'Georgia'}; font-size:${p.fs}px; font-weight:${p.fw||'normal'};
      padding:${p.padT||8}px ${p.padR||12}px ${p.padB||8}px ${p.padL||12}px;
      border:${p.bw||0}px ${p.bs||'none'} ${p.bc||'#000'};
      ${type==='button' ? `height:${p.height}px; border-radius:${p.borderRadius}px; box-shadow:${shadow};` : `line-height:${p.lh||1.5};`}
      box-sizing:border-box; cursor:default;
    `;
    return el;
  }

  function specFromProps(type, p) {
    if (type === 'button') {
      return {
        type:'button', width:p.width, height:p.height, borderRadius:p.borderRadius,
        padding:{top:p.padT,right:p.padR,bottom:p.padB,left:p.padL},
        background:p.bg, border:{width:p.bw,color:p.bc,style:p.bs},
        text:p.text, font:{family:p.ff,size:p.fs,weight:p.fw},
        textColor:p.tc, shadow:p.shadow,
      };
    } else {
      return {
        type:'textbox', width:p.width,
        padding:{top:p.padT,right:p.padR,bottom:p.padB,left:p.padL},
        background:p.bg, border:{width:p.bw,color:p.bc,style:p.bs},
        font:{family:p.ff,size:p.fs,weight:p.fw,lineHeight:p.lh},
        textColor:p.tc,
      };
    }
  }

  function placeComponent(type, p) {
    const el = buildPreviewEl(type, p);
    el.style.position = 'fixed';
    el.style.left = '200px'; el.style.top = '200px';
    el.style.zIndex = '9998';
    document.body.appendChild(el);
    makeDraggableEl(el);
    CWDevTools.placedComponents.push(el);
  }

  // ─── Tool 3: Lines ────────────────────────────────────────────────────────────
  let _linesStart = null;

  function openLinesPanel() {
    const panel = makePanel('cw-lines-panel', '— Lines', 260, 120);
    const p = CWDevTools.state.lines.constructionLine;

    addSlider(panel, 'Width (px)', p, 'width', 0.5, 4, 0.5, () => {});
    addColorRow(panel, 'Color', p, 'color', () => {});
    addSlider(panel, 'Opacity', p, 'opacity', 0.1, 1, 0.05, () => {});
    addSel(panel, 'Style', p, 'style', ['solid','dashed','dotted'], () => {});
    addSel(panel, 'Cap', p, 'cap', ['round','butt','square'], () => {});

    const hint = document.createElement('div');
    hint.style.cssText = 'color:#666;font-size:10px;margin-top:6px;';
    hint.textContent = 'Click and drag on page to draw test lines.';
    panel.appendChild(hint);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'cw-btn'; clearBtn.textContent = 'Clear Lines';
    clearBtn.addEventListener('click', () => { CWDevTools.testLines=[]; redrawLines(); });
    panel.appendChild(clearBtn);

    document.body.appendChild(panel);
    makePanelDraggable(panel);

    const cv = CWDevTools.els.linesCanvas;
    cv.classList.add('cw-active');
    cv.addEventListener('mousedown', _linesDown);
  }

  function stopLinesTool() {
    const cv = CWDevTools.els.linesCanvas;
    cv.classList.remove('cw-active');
    cv.removeEventListener('mousedown', _linesDown);
    document.removeEventListener('mousemove', _linesMove);
    document.removeEventListener('mouseup', _linesUp);
  }

  function _linesDown(e) {
    _linesStart = { x: e.clientX, y: e.clientY };
    CWDevTools.lineDrawing = true;
    document.addEventListener('mousemove', _linesMove);
    document.addEventListener('mouseup', _linesUp);
  }

  function _linesMove(e) {
    if (!CWDevTools.lineDrawing || !_linesStart) return;
    redrawLines();
    const p = CWDevTools.state.lines.constructionLine;
    drawLine(CWDevTools.els.linesCanvas.getContext('2d'),
      _linesStart.x, _linesStart.y, e.clientX, e.clientY, p, true);
  }

  function _linesUp(e) {
    if (!CWDevTools.lineDrawing) return;
    CWDevTools.lineDrawing = false;
    document.removeEventListener('mousemove', _linesMove);
    document.removeEventListener('mouseup', _linesUp);
    if (!_linesStart) return;
    const p = CWDevTools.state.lines.constructionLine;
    CWDevTools.testLines.push({
      x1:_linesStart.x, y1:_linesStart.y, x2:e.clientX, y2:e.clientY,
      props: { ...p }
    });
    redrawLines();
    _linesStart = null;
  }

  function redrawLines() {
    const cv = CWDevTools.els.linesCanvas;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    CWDevTools.testLines.forEach(l => drawLine(ctx, l.x1, l.y1, l.x2, l.y2, l.props, false));
  }

  function drawLine(ctx, x1, y1, x2, y2, p, preview) {
    ctx.save();
    ctx.globalAlpha = preview ? p.opacity * 0.6 : p.opacity;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.width;
    ctx.lineCap = p.cap || 'round';
    ctx.setLineDash(p.style === 'dashed' ? [8,5] : p.style === 'dotted' ? [2,5] : []);
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    ctx.restore();
  }

  // ─── Tool 4: Color ────────────────────────────────────────────────────────────
  function openColorPanel() {
    const panel = makePanel('cw-color-panel', '◉ Color', 280, 120);

    const eyeRow = makeRow(panel);
    const eyeBtn = document.createElement('button');
    eyeBtn.className = 'cw-btn'; eyeBtn.textContent = '🎨 Sample'; eyeBtn.style.marginTop='0';
    eyeRow.appendChild(eyeBtn);

    const sampledSwatch = document.createElement('div');
    sampledSwatch.style.cssText = 'width:28px;height:28px;border-radius:4px;background:#333;border:1px solid #555;flex-shrink:0;';
    eyeRow.appendChild(sampledSwatch);

    const sampledHex = document.createElement('span');
    sampledHex.style.cssText = 'font:11px monospace;color:#aaa;';
    sampledHex.textContent = '—';
    eyeRow.appendChild(sampledHex);

    let lastSampled = null;
    eyeBtn.addEventListener('click', async () => {
      if (!window.EyeDropper) { alert('EyeDropper API requires Chrome 95+.'); return; }
      try {
        const r = await new window.EyeDropper().open();
        lastSampled = r.sRGBHex;
        sampledSwatch.style.background = lastSampled;
        sampledHex.textContent = lastSampled;
      } catch(e) {}
    });

    const addRow = makeRow(panel);
    const addNameInp = document.createElement('input');
    addNameInp.type = 'text'; addNameInp.placeholder = 'name…';
    addNameInp.style.cssText = 'flex:1;background:#2a2a2a;border:1px solid #555;color:#ddd;border-radius:4px;padding:3px 6px;font-size:11px;';
    addRow.appendChild(addNameInp);
    const addBtn = document.createElement('button');
    addBtn.className = 'cw-btn'; addBtn.textContent = 'Add'; addBtn.style.marginTop='0';
    addRow.appendChild(addBtn);

    const palTitle = document.createElement('div');
    palTitle.style.cssText = 'color:#888;font-size:10px;margin:8px 0 4px;text-transform:uppercase;letter-spacing:0.05em;';
    palTitle.textContent = 'Project Palette (right-click to rename)';
    panel.appendChild(palTitle);

    const palGrid = document.createElement('div');
    palGrid.className = 'cw-palette-grid';
    panel.appendChild(palGrid);
    CWDevTools.els.paletteGrid = palGrid;

    function rebuildPalette() {
      palGrid.innerHTML = '';
      const entries = Object.entries(CWDevTools.state.palette);
      entries.forEach(([name, hex]) => {
        const wrap = document.createElement('div');
        wrap.className = 'cw-swatch-wrap';
        const sw = document.createElement('div');
        sw.className = 'cw-swatch' + (CWDevTools.state.selectedPaletteColor === hex ? ' cw-selected':'');
        sw.style.background = hex;
        sw.title = `${name}: ${hex}`;
        sw.addEventListener('click', () => {
          CWDevTools.state.selectedPaletteColor = hex;
          palGrid.querySelectorAll('.cw-swatch').forEach(s => s.classList.remove('cw-selected'));
          sw.classList.add('cw-selected');
        });
        sw.addEventListener('contextmenu', e => {
          e.preventDefault();
          const n = prompt('Rename:', name);
          if (n && n !== name) {
            const v = CWDevTools.state.palette[name];
            delete CWDevTools.state.palette[name];
            CWDevTools.state.palette[toCamelCase(n)] = v;
            rebuildPalette(); savePaletteToStorage();
          }
        });
        const lbl = document.createElement('div');
        lbl.className = 'cw-swatch-name'; lbl.textContent = name;
        wrap.appendChild(sw); wrap.appendChild(lbl);
        palGrid.appendChild(wrap);
      });
      for (let i = entries.length; i < 12; i++) {
        const sw = document.createElement('div');
        sw.className = 'cw-swatch cw-empty';
        palGrid.appendChild(sw);
      }
    }

    addBtn.addEventListener('click', () => {
      if (!lastSampled) { showToast('Sample a color first'); return; }
      const name = addNameInp.value.trim() || 'color' + Object.keys(CWDevTools.state.palette).length;
      CWDevTools.state.palette[toCamelCase(name)] = lastSampled;
      addNameInp.value = '';
      rebuildPalette(); savePaletteToStorage();
    });

    rebuildPalette();
    document.body.appendChild(panel);
    makePanelDraggable(panel);
  }

  function savePaletteToStorage() {
    try { localStorage.setItem('cwPalette', JSON.stringify(CWDevTools.state.palette)); } catch(e) {}
  }

  function loadPaletteFromStorage() {
    try {
      const s = localStorage.getItem('cwPalette');
      if (s) Object.assign(CWDevTools.state.palette, JSON.parse(s));
    } catch(e) {}
  }

  // ─── Tool 5: Underlay ─────────────────────────────────────────────────────────
  function openUnderlayPanel() {
    const panel = makePanel('cw-underlay-panel', '🖼 Underlay', 270, 120);
    const ul = CWDevTools.els.underlay;

    const fileInp = document.createElement('input');
    fileInp.type = 'file'; fileInp.accept = 'image/*'; fileInp.style.display = 'none';
    panel.appendChild(fileInp);

    const loadBtn = document.createElement('button');
    loadBtn.className = 'cw-btn'; loadBtn.textContent = 'Load Image…';
    loadBtn.addEventListener('click', () => fileInp.click());
    panel.appendChild(loadBtn);

    fileInp.addEventListener('change', () => {
      const file = fileInp.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      ul.style.backgroundImage = `url(${url})`;
      ul.style.opacity = CWDevTools.state.underlay.opacity;
      ul.style.display = 'block';
      CWDevTools.state.underlay.visible = true;
      toggleBtn.textContent = 'Hide';
    });

    const opRow = makeRow(panel);
    addLabel(opRow, 'Opacity:');
    const opSlider = document.createElement('input');
    opSlider.type = 'range'; opSlider.min = 10; opSlider.max = 80; opSlider.step = 5;
    opSlider.value = Math.round(CWDevTools.state.underlay.opacity * 100);
    opSlider.style.flex = '1';
    opSlider.addEventListener('input', () => {
      CWDevTools.state.underlay.opacity = opSlider.value / 100;
      ul.style.opacity = CWDevTools.state.underlay.opacity;
    });
    opRow.appendChild(opSlider);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'cw-btn';
    toggleBtn.textContent = CWDevTools.state.underlay.visible ? 'Hide' : 'Show';
    toggleBtn.addEventListener('click', () => {
      CWDevTools.state.underlay.visible = !CWDevTools.state.underlay.visible;
      ul.style.display = CWDevTools.state.underlay.visible ? 'block' : 'none';
      toggleBtn.textContent = CWDevTools.state.underlay.visible ? 'Hide' : 'Show';
    });
    panel.appendChild(toggleBtn);

    document.body.appendChild(panel);
    makePanelDraggable(panel);
  }

  // ─── Export ───────────────────────────────────────────────────────────────────
  function openExportModal() {
    document.getElementById('cw-export-modal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'cw-export-modal';

    const inner = document.createElement('div');
    inner.id = 'cw-export-inner';

    const h3 = document.createElement('h3');
    h3.textContent = '⬇ Export Design Spec';
    inner.appendChild(h3);

    const code = document.createElement('pre');
    code.id = 'cw-export-code';
    code.textContent = buildExportString();
    inner.appendChild(code);

    const btns = document.createElement('div');
    btns.id = 'cw-export-btns';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'cw-btn cw-btn-primary'; copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(code.textContent).then(() => showToast('Copied!'));
    });
    btns.appendChild(copyBtn);

    const dlBtn = document.createElement('button');
    dlBtn.className = 'cw-btn'; dlBtn.textContent = 'Download .js';
    dlBtn.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([code.textContent], {type:'text/javascript'}));
      a.download = 'cw-design-spec.js'; a.click();
    });
    btns.appendChild(dlBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'cw-btn'; closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => modal.remove());
    btns.appendChild(closeBtn);

    inner.appendChild(btns);
    modal.appendChild(inner);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  function buildExportString() {
    const markersObj = {};
    CWDevTools.markers.forEach(m => { markersObj[m.name] = { x:m.x, y:m.y }; });
    const spec = {
      palette: CWDevTools.state.palette,
      layout: CWDevTools.state.layout,
      components: CWDevTools.state.components,
      lines: CWDevTools.state.lines,
      markers: markersObj,
    };
    return 'const cwDesignSpec = ' + JSON.stringify(spec, null, 2) + ';\n';
  }

  // ─── Panel helpers ────────────────────────────────────────────────────────────
  function makePanel(id, title, left, top) {
    document.getElementById(id)?.remove();
    const panel = document.createElement('div');
    panel.className = 'cw-panel'; panel.id = id;
    panel.style.left = left + 'px'; panel.style.top = top + 'px';
    const h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(title));
    const closeX = document.createElement('span');
    closeX.className = 'cw-close'; closeX.textContent = '✕';
    closeX.addEventListener('click', () => { panel.remove(); deactivateTool(); });
    h3.appendChild(closeX);
    panel.appendChild(h3);
    return panel;
  }

  function makePanelDraggable(panel) {
    const h3 = panel.querySelector('h3');
    if (!h3) return;
    h3.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('cw-close')) return;
      e.preventDefault();
      const sx=e.clientX, sy=e.clientY;
      const ol=parseInt(panel.style.left), ot=parseInt(panel.style.top);
      function mv(ev) { panel.style.left=(ol+ev.clientX-sx)+'px'; panel.style.top=(ot+ev.clientY-sy)+'px'; }
      function up() { document.removeEventListener('mousemove',mv); document.removeEventListener('mouseup',up); }
      document.addEventListener('mousemove',mv); document.addEventListener('mouseup',up);
    });
  }

  function closeAllPanels() {
    ['cw-comp-panel','cw-lines-panel','cw-color-panel','cw-underlay-panel'].forEach(id => {
      document.getElementById(id)?.remove();
    });
    const cv = CWDevTools.els.linesCanvas;
    if (cv) { cv.classList.remove('cw-active'); cv.removeEventListener('mousedown', _linesDown); }
  }

  function makeRow(parent) {
    const row = document.createElement('div');
    row.className = 'cw-panel-row';
    parent.appendChild(row);
    return row;
  }

  function addLabel(parent, text) {
    const lbl = document.createElement('label');
    lbl.textContent = text;
    parent.appendChild(lbl);
    return lbl;
  }

  function makeSelect(opts, sel, parent) {
    const el = document.createElement('select');
    opts.forEach(o => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = o;
      if (o === sel) opt.selected = true;
      el.appendChild(opt);
    });
    if (parent) parent.appendChild(el);
    return el;
  }

  function addN(parent, label, obj, key, min, max, cb) {
    const row = makeRow(parent);
    addLabel(row, label+':');
    const inp = document.createElement('input');
    inp.type='number'; inp.min=min; inp.max=max; inp.value=obj[key];
    inp.style.width='70px';
    inp.addEventListener('input', () => { obj[key]=+inp.value; cb(); });
    row.appendChild(inp);
    return inp;
  }

  function addSlider(parent, label, obj, key, min, max, step, cb) {
    const row = makeRow(parent);
    addLabel(row, label+':');
    const sl = document.createElement('input');
    sl.type='range'; sl.min=min; sl.max=max; sl.step=step; sl.value=obj[key];
    sl.style.flex='1';
    const val = document.createElement('span');
    val.style.cssText='color:#aaa;font:11px monospace;width:32px;text-align:right;';
    val.textContent = obj[key];
    sl.addEventListener('input', () => { obj[key]=+sl.value; val.textContent=sl.value; cb(); });
    row.appendChild(sl); row.appendChild(val);
  }

  function addColorRow(parent, label, obj, key, cb) {
    const row = makeRow(parent);
    addLabel(row, label+':');
    const inp = document.createElement('input');
    inp.type='color'; inp.value=obj[key]||'#000000';
    const hex = document.createElement('span');
    hex.style.cssText='font:11px monospace;color:#aaa;';
    hex.textContent=obj[key];
    inp.addEventListener('input', () => { obj[key]=inp.value; hex.textContent=inp.value; cb(); });
    row.appendChild(inp); row.appendChild(hex);
  }

  function addText(parent, label, obj, key, cb) {
    const row = makeRow(parent);
    addLabel(row, label+':');
    const inp = document.createElement('input');
    inp.type='text'; inp.value=obj[key];
    inp.addEventListener('input', () => { obj[key]=inp.value; cb(); });
    row.appendChild(inp);
  }

  function addSel(parent, label, obj, key, opts, cb) {
    const row = makeRow(parent);
    addLabel(row, label+':');
    const sel = makeSelect(opts, obj[key], row);
    sel.addEventListener('change', () => { obj[key]=sel.value; cb(); });
  }

  // ─── Keyboard ─────────────────────────────────────────────────────────────────
  function bindGlobalKeys() {
    document.addEventListener('keydown', e => {
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      if (e.key === '`') {
        CWDevTools.toolbarVisible = !CWDevTools.toolbarVisible;
        CWDevTools.els.toolbar.classList.toggle('cw-hidden', !CWDevTools.toolbarVisible);
        return;
      }
      if (e.key === 'Escape') { deactivateTool(); return; }
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') { e.preventDefault(); openExportModal(); return; }
      const toolMap = { '1':'layout','2':'component','3':'lines','4':'color','5':'underlay' };
      if (toolMap[e.key]) toggleTool(toolMap[e.key]);
    });
  }

  // ─── Utilities ────────────────────────────────────────────────────────────────
  function toCamelCase(str) {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
              .replace(/^[A-Z]/, c => c.toLowerCase());
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = `
      position:fixed;bottom:70px;left:50%;transform:translateX(-50%);
      background:#4AABAA;color:#fff;padding:6px 16px;border-radius:20px;
      font:12px system-ui;z-index:10003;pointer-events:none;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    `;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  // ─── Boot ─────────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.CWDevTools = CWDevTools;

})();
