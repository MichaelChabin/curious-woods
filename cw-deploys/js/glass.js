/* glass.js — Curious Woods: Glass Geometry as a shelf module. One lab, served to stories.
   Rulings: CWVault/claude/Rulings-Sept-2026.md ("A lab is a place", "Capability levels");
   the spine: CWVault/claude/Geometry-Spine.md; the prompt: claude/Prompt-Extract-Glass-Module.md.
   Extracted 1 Oct 2026 from active/glass-geometry.html, which now mounts it at the fullest level.

   cwGlass(host, opts)  → { el, level, replay(), focus(), resize(), destroy() }

   `host` is an element the page has given a size. The lab draws inside it: the plane on a
   canvas, the column, the tip window, the panels, the picker, Remember — all positioned
   relative to the host, so on the standalone page (where the host fills the viewport)
   nothing visible changes, and in a story page nothing floats over the story's own column.

   opts:
     level    the powers served (a floor, not a ceiling):
                'circles'  circles only — the straightedge gesture (tap, tap) is absent,
                           not greyed, and nothing says so
                'both'     circles and lines (the default; what the lab has always done)
              named, not built — the spine's steps, in order: 'lines', 'grid', 'rectangles',
              'regions', 'plots'. Asking for one of them, or an unknown name, is reported on
              the console and served as 'both'. There is no store of what she has earned
              (the browser holds only her library, the replay speed and the How-this-works
              flags), so the level asked for is the level served.
     open     a construction from models/constructions.json to have ready behind the story's
              own word (the Glass Rose's "again"): its key, its key without the _builtin_
              prefix, or its name. The table opens empty either way; replay() plays it.
     palette  a palette from art/palette/palettes.json by id or name ('chartres', 'Chartres',
              'chartres_glass'), the one Color opens with.
     base     where the site's folders are, if not the folder above this script.

   What the module owns is everything the lab needs to be complete standing alone: the
   plane, the two gestures, locations and crossings, lead and fill, the palette, the
   operation log, undo, replay, checkWipThen(), forkStepThrough(), the picker, How this
   works, New, Save and its choices, Postcard, Remember. A story page gives it a title, the
   text and a box, and nothing the lab needs to work.

   Her library stays under the keys it always had — cw-cx-index, cw-cx-<time>, the preview
   cache, cw-replay-duration, the How-this-works flags — so a construction saved before the
   extraction opens after it. Two instances on one page share the library, as they should,
   and nothing else: separate canvases, logs, undo, panels, audio.

   destroy() undoes what mounting did: stops the frame loop and every timer, removes the
   listeners it put on the document and the window (drags that must outlive the host's
   edge, and resize), disconnects the host's size observer, closes the audio context, and
   empties the host. The library in the browser is hers and is left alone.

   Stands on js/plane.js, js/cw-panel.js, js/cw-flags.js and js/cw-number.js, loaded before
   it. Classic script, no build step. */
(function () {
  'use strict';

  var CSS = [
    "    /* The host. The page gives it a size; everything the lab shows positions inside it,",
    "       so on the standalone page (where it fills the viewport) nothing visible changes and",
    "       in a story page nothing floats over the story's own column. */",
    "    .cw-glass { position: relative; overflow: hidden; background: #f4f1e8; font-family: Georgia, serif; box-sizing: border-box; outline: none; }",
    "    .cw-glass *, .cw-glass *::before, .cw-glass *::after { box-sizing: border-box; margin: 0; padding: 0; }",
    "",
    "    .cw-glass .g-canvas {",
    "      position: absolute; inset: 0; z-index: 0;",
    "      touch-action: none; display: block;",
    "      /* The plane owns these, not any one lab's chrome: without them a",
    "         circle-drag can select and paint the whole document in Safari. */",
    "      user-select: none; -webkit-user-select: none;",
    "    }",
    "",
    "    .cw-glass .g-left-panel {",
    "      width: 160px; min-width: 160px;",
    "      position: absolute; top: 0; left: 0; bottom: 0;",
    "      /* The membrane renders above the world, always: the world shows",
    "         through translucently, but the contents \u2014 palette, words \u2014 win",
    "         (Interface Standard, principle 2). The old 18%-opaque tint let",
    "         constructions paint straight over the words. */",
    "      background: rgba(244,241,232,0.86);",
    "      pointer-events: none;",
    "      transition: width 400ms ease-in-out, min-width 400ms ease-in-out;",
    "      overflow: visible; z-index: 10;",
    "    }",
    "    /* The window profile (8 Oct 2026): the column keeps its own touches, so a drag that starts over",
    "       it draws nothing and a finger there scrolls the page; the palette window's header is a strip",
    "       tall enough to take hold of; a margin at the right of the drawing area where a finger scrolls. */",
    "    .cw-glass.g-app .g-left-panel { pointer-events: auto; touch-action: pan-y; }",
    "    .cw-glass.g-app .workspace-tool-header { margin: -12px -14px 10px; padding: 14px 14px 10px; min-height: 42px; background: rgba(200,184,154,0.22); border-radius: 6px 6px 0 0; }",
    "    .cw-glass.g-app .g-scroll-margin { position: absolute; top: 0; right: 0; bottom: 0; z-index: 1; pointer-events: auto; touch-action: pan-y; }",
    "    .cw-glass .g-left-panel::after {",
    "      content: ''; position: absolute;",
    "      top: 0; right: 0; bottom: 0; width: 0.5px;",
    "      background: #c8b89a; pointer-events: none;",
    "    }",
    "",
    "    .cw-glass .g-model-layer {",
    "      position: absolute; inset: 0; z-index: 590;",
    "      pointer-events: none; display: none; overflow: hidden;",
    "    }",
    "    .cw-glass .g-model-layer img {",
    "      position: absolute; cursor: move;",
    "      pointer-events: all; user-select: none;",
    "      top: 50%; left: 50%;",
    "      transform: translate(-50%,-50%) scale(1);",
    "      max-width: none; transform-origin: center center;",
    "    }",
    "",
    "        /* --- Remember --- */",
    "    .cw-glass .g-remember {",
    "      position: absolute; left: 16px; top: 65%;",
    "      transform: translateY(-50%);",
    "      line-height: 1.55; z-index: 100;",
    "      cursor: grab; pointer-events: all; user-select: none;",
    "    }",
    "    .cw-glass .g-remember.dragging { transition: none; cursor: grabbing; }",
    "    .cw-glass .remember-plain { font-family: Georgia, serif; font-size: 16px; color: #2a2620; display: block; }",
    "    .cw-glass .remember-word { font-family: Georgia, serif; font-size: 19px; color: #b87333; display: block; }",
    "",
    "    /* --- Panel tools --- */",
    "    .cw-glass .panel-tool {",
    "      position: absolute; left: 16px; z-index: 100;",
    "      pointer-events: all; width: 188px;",
    "      opacity: 0; transition: opacity 200ms ease-in, top 400ms ease-in-out;",
    "    }",
    "    .cw-glass .panel-tool.visible { opacity: 1; }",
    "    .cw-glass .panel-tool-header {",
    "      display: flex; justify-content: space-between; align-items: baseline;",
    "      margin-bottom: 8px; cursor: grab;",
    "    }",
    "    .cw-glass .panel-tool-header:active { cursor: grabbing; }",
    "    .cw-glass .panel-tool-title { font-family: Georgia, serif; font-size: 14px; color: #546A80; font-weight: normal; line-height: 1; }",
    "    .cw-glass .panel-tool-close { font-family: Georgia, serif; font-size: 11px; color: #b0a090; cursor: default; transition: color 80ms; line-height: 1; }",
    "    .cw-glass .panel-tool-close:hover { color: #546A80; }",
    "",
    "    /* --- How-this-works tip window --- */",
    "    .cw-glass .htw-canvas { position: absolute; z-index: 500; background: rgba(244,241,232,0.96); border: 0.5px solid #c8b89a; border-radius: 6px; padding: 12px 14px 14px; box-shadow: 0 2px 12px rgba(42,38,32,0.08); user-select: none; touch-action: none; cursor: grab; pointer-events: all; width: 220px; }",
    "    .cw-glass .htw-canvas.dragging { cursor: grabbing; }",
    "    .cw-glass .htw-canvas.closing { transition: opacity 400ms ease-in, transform 400ms ease-in; opacity: 0; transform: translateX(-80px) scaleX(0.3); pointer-events: none; }",
    "    .cw-glass .htw-canvas-close { font-family: Georgia, serif; font-size: 11px; color: #b0a090; cursor: default; transition: color 80ms; }",
    "    .cw-glass .htw-canvas-close:hover { color: #546A80; }",
    "    .cw-glass .htw-body { font: 13px/1.55 Georgia, serif; color: #546A80; }",
    "    .cw-glass .htw-para { margin: 0 0 9px 0; }",
    "    .cw-glass .g-htw-panel { position: absolute; left: 16px; top: 20px; z-index: 110; pointer-events: all; user-select: none; }",
    "    /* The column's words (heading, bulleted items, the italic action words and",
    "       their fading) are ../css/htw.css, shared with Wordplay since 29 Sep 2026. */",
    "    .cw-glass .g-htw-panel-list { margin: 6px 0 0 0; padding: 0; list-style: none; overflow: hidden; max-height: 0; transition: max-height 200ms ease-in; }",
    "    .cw-glass .g-htw-panel-list.revealed { max-height: 300px; transition: max-height 320ms cubic-bezier(0.4,0,0.2,1); }",
    "    .cw-glass .htw-keyword { color: #3D3D3A; }",
    "    .cw-glass .htw-action { color: #3D3D3A; cursor: default; transition: color 80ms; }",
    "    .cw-glass .htw-action:hover { color: #1a1a18; }",
    "    .cw-glass .htw-pulse { color: #3D3D3A !important; font-weight: bold; transition: color 2s ease-out, font-weight 2s ease-out; }",
    "",
    "    /* --- Canvas notes --- */",
    "    .cw-glass .canvas-note { position: absolute; z-index: 550; pointer-events: all; width: 200px; min-height: 60px; background: rgba(244,241,232,0.75); border: 0.5px solid #c8b89a; border-radius: 6px; display: flex; flex-direction: column; resize: both; overflow: hidden; user-select: none; touch-action: none; }",
    "    .cw-glass .canvas-note.dragging .cn-drag { cursor: grabbing; }",
    "    .cw-glass .cn-drag { height: 6px; background: rgba(200,184,154,0.4); border-radius: 6px 6px 0 0; cursor: grab; position: relative; flex-shrink: 0; }",
    "    .cw-glass .canvas-note-close { position: absolute; top: -1px; right: 4px; font-family: Georgia, serif; font-size: 11px; color: #b0a090; cursor: default; transition: color 80ms; z-index: 1; }",
    "    .cw-glass .canvas-note-close:hover { color: #546A80; }",
    "    .cw-glass .cn-body { display: flex; flex: 1; min-height: 0; }",
    "    .cw-glass .cn-arrow { width: 20px; display: flex; align-items: flex-start; justify-content: center; padding-top: 8px; border-right: 0.5px solid rgba(200,184,154,0.5); flex-shrink: 0; cursor: grab; touch-action: none; color: #546A80; opacity: 0.5; font-size: 11px; font-family: Georgia, serif; }",
    "    .cw-glass .cn-text-wrap { flex: 1; min-width: 0; display: flex; flex-direction: column; }",
    "    .cw-glass .canvas-note textarea { font-family: Georgia, serif; font-style: italic; font-size: 13px; color: #546A80; background: transparent; border: none; outline: none; width: 100%; flex: 1; min-height: 30px; resize: none; line-height: 1.5; padding: 4px 8px; }",
    "    .cw-glass .canvas-note textarea::placeholder { color: #546A80; opacity: 0.35; }",
    "    .cw-glass .cn-text-display { font-family: Georgia, serif; font-style: italic; font-size: 13px; color: #546A80; white-space: pre-wrap; line-height: 1.5; min-height: 30px; padding: 4px 8px; }",
    "    .cw-glass .canvas-note.fading { transition: opacity 1s ease-out; opacity: 0; }",
    "",
    "    /* --- Slider --- */",
    "    .cw-glass .cw-slider-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }",
    "    .cw-glass .cw-slider-label { font-family: Georgia, serif; font-size: 10px; color: #9a8e80; width: 46px; flex-shrink: 0; }",
    "    .cw-glass input[type=range].cw-slider { flex: 1; height: 3px; appearance: none; background: #c8b89a; border-radius: 2px; outline: none; cursor: pointer; }",
    "    .cw-glass input[type=range].cw-slider::-webkit-slider-thumb { appearance: none; width: 10px; height: 15px; background: #546A80; border-radius: 2px; cursor: pointer; }",
    "",
    "    /* --- Palette tool --- */",
    "    /* A workspace window since 1 Oct 2026: it opens over the workspace, outside",
    "       the column, and moves and closes as the tip window does. 160 wide since Michael's",
    "       look of 1 Oct 2026 (the chips were too wide by a third); the swatch grid is",
    "       132 px, three chips of 40. */",
    "    /* .workspace-tool below sets a min-width of 188 and, now that both are class rules, would win;",
"       the id used to outrank it. One more class keeps this rule in front. */",
"    .cw-glass .g-tool-palette.workspace-tool { width: 160px; min-width: 0; opacity: 0; transition: opacity 200ms ease-in; }",
    "    .cw-glass .g-tool-palette.visible { opacity: 1; }",
    "    /* The palette title is a fact, not a control (ledger \u00a713) \u2014 no hover. */",
    "    .cw-glass .g-tool-palette .palette-name { font-family: Georgia, serif; font-size: 14px; color: #546A80; cursor: default; user-select: none; line-height: 1; }",
    "    .cw-glass .palette-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; }",
    "    .cw-glass .palette-grid.wide { grid-template-columns: repeat(4,1fr); }",
    "    .cw-glass .palette-swatch { height: 28px; width: 100%; border-radius: 3px; cursor: pointer; border: 1.5px solid transparent; transition: border-color 100ms; box-sizing: border-box; box-shadow: inset 0 0 0 2px #4a4540; }",
    "    .cw-glass .palette-swatch:hover { border-color: rgba(84,106,128,0.4); }",
    "    .cw-glass .palette-swatch.selected { border-color: #546A80; }",
    "    .cw-glass .craft-row { display: grid; grid-template-columns: repeat(2,1fr); gap: 5px; margin-top: 8px; padding-top: 8px; border-top: 0.5px solid #d8ceba; }",
    "    .cw-glass .palette-recipe { font-family: Georgia, serif; font-style: italic; font-size: 11px; color: rgba(42,38,32,0.7); margin-top: 8px; min-height: 14px; line-height: 1.3; }",
    "    .cw-glass .lead-slider-row { margin-top: 10px; }",
    "    .cw-glass .lead-slider-label { display: block; font-family: Georgia, serif; font-size: 11px; color: #546A80; margin-bottom: 4px; user-select: none; }",
    "    .cw-glass .lead-slider-track-wrap { position: relative; height: 20px; display: flex; align-items: center; }",
    "    .cw-glass .lead-slider-track { position: absolute; left: 0; right: 0; background: #546A80; border-radius: 1px; pointer-events: none; }",
    "    .cw-glass .lead-slider { position: absolute; left: 0; width: 100%; margin: 0; -webkit-appearance: none; appearance: none; background: transparent; cursor: pointer; height: 20px; }",
    "    .cw-glass .lead-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #546A80; border: 1.5px solid #f4f1e8; cursor: grab; }",
    "    .cw-glass .lead-slider::-moz-range-thumb { width: 12px; height: 12px; border-radius: 50%; background: #546A80; border: 1.5px solid #f4f1e8; cursor: grab; }",
    "    .cw-glass .lead-slider::-webkit-slider-runnable-track { background: transparent; }",
    "    .cw-glass .lead-slider::-moz-range-track { background: transparent; }",
    "    .cw-glass .palette-choose { display: block; font-family: Georgia, serif; font-size: 13px; color: #546A80; cursor: default; margin-top: 10px; transition: color 80ms; user-select: none; }",
    "    .cw-glass .palette-choose:hover { color: #3D3D3A; }",
    "",
    "    /* --- Model tool --- */",
    "    .cw-glass .g-tool-model .model-hint { font-family: Georgia, serif; font-size: 11px; font-style: italic; color: #9a8e80; display: block; margin-bottom: 10px; }",
    "",
    "    /* --- Workspace pinned tools --- */",
    "    .cw-glass .workspace-tool { position: absolute; z-index: 500; background: rgba(244,241,232,0.96); border: 0.5px solid #c8b89a; border-radius: 6px; padding: 12px 14px 14px; pointer-events: all; box-shadow: 0 2px 12px rgba(42,38,32,0.08); min-width: 188px; }",
    "    .cw-glass .workspace-tool-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; cursor: grab; touch-action: none; }",
    "    .cw-glass .workspace-tool-header:active { cursor: grabbing; }",
    "    .cw-glass .workspace-tool-title { font-family: Georgia, serif; font-size: 14px; color: #546A80; }",
    "    .cw-glass .workspace-tool-close { font-family: Georgia, serif; font-size: 11px; color: #b0a090; cursor: default; transition: color 80ms; }",
    "    .cw-glass .workspace-tool-close:hover { color: #546A80; }",
    "",
    "    /* --- Picker --- */",
    "    .cw-glass .g-picker-backdrop { position: absolute; inset: 0; z-index: 600; display: none; }",
    "    .cw-glass .g-picker-backdrop.visible { display: block; }",
    "    .cw-glass .g-picker-window { position: absolute; z-index: 601; background: #f0ede4; border: 0.5px solid #c8b89a; border-radius: 8px; padding: 18px; box-shadow: 0 4px 24px rgba(42,38,32,0.18); opacity: 0; transition: opacity 200ms ease-in; pointer-events: none; max-height: 85%; overflow-y: auto; }",
    "    .cw-glass .g-picker-window.visible { opacity: 1; pointer-events: all; }",
    "    .cw-glass .g-picker-drag-handle { height: 14px; margin: -18px -18px 0 -18px; border-radius: 8px 8px 0 0; cursor: grab; background: rgba(200,184,154,0.25); display: flex; align-items: center; justify-content: flex-end; padding: 0 10px; position: sticky; top: 0; z-index: 1; background: #f0ede4; }",
    "    .cw-glass .g-picker-drag-handle:active { cursor: grabbing; }",
    "    .cw-glass .g-picker-close-btn { font-family: Georgia, serif; font-size: 11px; color: #b0a090; cursor: default; transition: color 80ms; pointer-events: all; line-height: 14px; }",
    "    .cw-glass .g-picker-close-btn:hover { color: #546A80; }",
    "    .cw-glass .picker-grid { display: grid; grid-template-columns: repeat(3,200px); gap: 20px; margin-top: 14px; }",
    "    .cw-glass .picker-item { display: flex; flex-direction: column; align-items: center; cursor: default; }",
    "    .cw-glass .picker-heading { grid-column: 1 / -1; font-family: Georgia, serif; font-size: 13px; color: #546A80; margin: 6px 0 -10px; }",
    "    .cw-glass .picker-thumb { position: relative; width: 200px; height: 200px; border-radius: 5px; border: 1.5px solid transparent; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(244,241,232,0.6); transition: border-color 100ms; }",
    "    .cw-glass .picker-delete { position: absolute; top: 4px; right: 6px; font-family: Georgia, serif; font-size: 16px; color: #b0a090; cursor: default; transition: color 80ms; z-index: 1; line-height: 1; }",
    "    .cw-glass .picker-delete:hover { color: #8b1a1a; }",
    "    .cw-glass .picker-thumb:hover { border-color: rgba(84,106,128,0.4); }",
    "    .cw-glass .picker-thumb.selected { border-color: #546A80; }",
    "    .cw-glass .picker-item-name { font-family: Georgia, serif; font-size: 12px; color: #7a6e60; margin-top: 6px; text-align: center; line-height: 1.3; width: 200px; }",
    "",
    "    /* --- Drag hint --- */",
    "    .cw-glass .g-drag-hint { position: absolute; left: 16px; font: 9px/1 system-ui; color: #b0a090; pointer-events: none; z-index: 99; transition: opacity 1s ease-in; }",
    "    .cw-glass .g-drag-hint.faded { opacity: 0; }",
    "",
    "    /* --- Sound permission --- */",
    "    .cw-glass .g-sound-permission { position: absolute; left: 16px; z-index: 100; pointer-events: all; opacity: 0; transition: opacity 300ms ease-in; }",
    "    .cw-glass .g-sound-permission.visible { opacity: 1; }",
    "    .cw-glass .sound-ask { font-family: Georgia, serif; font-size: 13px; color: #546A80; line-height: 1.5; }",
    "    .cw-glass .sound-ask-word { font-family: Georgia, serif; font-size: 13px; color: #546A80; cursor: default; transition: color 80ms; margin-right: 10px; }",
    "    .cw-glass .sound-ask-word:hover { color: #3D3D3A; }",
    "",
    "    /* --- Post-replay controls --- */",
    "",
    "    /* --- Step-through replay controls --- */",
    "    /* The replay panel's rows (the panel shell is the shared component). The",
    "       arrows are the surface's only glyph controls \u2014 kept, flagged at review. */",
    "    .cw-glass .cx-step-arrows { display: flex; gap: 18px; justify-content: center; margin: 2px 0 8px; }",
    "    .cw-glass .cx-step-arrow { font-family: Georgia, serif; font-size: 16px; color: #546A80; cursor: default; transition: color 80ms; }",
    "    .cw-glass .cx-step-arrow:hover { color: #3D3D3A; }",
    "",
    "    /* --- WIP / cancel dialogs --- */",
    "    /* The old bare-dialog styles left with the dialogs \u2014 occasional acts",
    "       open choice panels now (CW.createChoicePanel). */",
    "",
    "    /* --- Export preview --- */",
    "    .cw-glass .g-export-preview { position: absolute; inset: 0; z-index: 790; background: rgba(42,38,32,0.6); display: flex; align-items: center; justify-content: center; pointer-events: all; }",
    "    .cw-glass .g-export-preview img { max-width: 90%; max-height: 85%; border-radius: 4px; box-shadow: 0 4px 24px rgba(0,0,0,0.3); user-select: none; }",
    "",
    "    /* --- Save note box --- */",
    "    .cw-glass .g-save-note-box { position: absolute; z-index: 800; pointer-events: all; width: 240px; min-height: 140px; background: rgba(244,241,232,0.75); border: 0.5px solid #c8b89a; border-radius: 6px; padding: 0 14px 10px; box-shadow: 0 2px 14px rgba(42,38,32,0.14); display: flex; flex-direction: column; resize: both; overflow: hidden; }",
    "    .cw-glass .save-note-header { cursor: grab; padding: 10px 0 4px; }",
    "    .cw-glass .save-note-header:active { cursor: grabbing; }",
    "    .cw-glass .g-save-note-name { font-family: Georgia, serif; font-size: 14px; color: #546A80; background: transparent; border: none; border-bottom: 0.5px solid rgba(200,184,154,0.7); outline: none; width: 100%; padding: 0 0 4px; line-height: 1.3; }",
    "    .cw-glass .g-save-note-name::placeholder { color: #546A80; opacity: 0.45; }",
    "    .cw-glass .g-save-note-text { font-family: Georgia, serif; font-style: italic; font-size: 13px; color: #546A80; background: transparent; border: none; border-bottom: 0.5px solid rgba(200,184,154,0.5); padding: 6px 0 4px; resize: none; overflow: auto; width: 100%; min-height: 40px; outline: none; line-height: 1.5; margin-top: 6px; flex: 1; }",
    "    .cw-glass .g-save-note-text::placeholder { color: #546A80; opacity: 0.35; }",
    "    .cw-glass .save-note-footer { display: flex; justify-content: flex-end; gap: 16px; margin-top: 8px; }",
    "    .cw-glass .save-note-cancel { font-family: Georgia, serif; font-size: 14px; color: #b0a090; cursor: default; transition: color 80ms; }",
    "    .cw-glass .save-note-cancel:hover { color: #546A80; }",
    "    .cw-glass .save-note-ok { font-family: Georgia, serif; font-size: 14px; color: #546A80; cursor: default; transition: color 80ms; }",
    "    .cw-glass .save-note-ok:hover { color: #3D3D3A; }",
    "",
    "    /* Ghost SVG overlay */",
    "    .cw-glass .g-ghost-layer { position: absolute; inset: 0; z-index: 591; pointer-events: none; display: none; overflow: hidden; }",
    "    .cw-glass .g-ghost-layer img { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); opacity: 0.22; max-width: none; user-select: none; width: 340px; height: 340px; }",
    "",
    "    /* The column's words \u2014 css/htw.css (29 Sep 2026), scoped. Wordplay still loads the file. */",
    "    .cw-glass .g-htw-panel-heading { display: block; font-family: Georgia, serif; font-size: 14px; color: #546A80; font-weight: normal; cursor: default; transition: color 80ms; line-height: 1; }",
    "    .cw-glass .g-htw-panel-heading:hover { color: #3D3D3A; }",
    "    .cw-glass .htw-item { display: block; font-family: Georgia, serif; font-size: 13px; color: #546A80; padding-left: 12px; cursor: default; transition: color 80ms; line-height: 1; margin-top: 8px; position: relative; }",
    "    .cw-glass .htw-item::before { content: '\\2022'; position: absolute; left: 0; }",
    "    .cw-glass .htw-item:hover { color: #3D3D3A; }",
    "    .cw-glass .htw-action-row { display: flex; gap: 14px; margin-top: 8px; padding-left: 12px; }",
    "    .cw-glass .htw-action-word { font-family: Georgia, serif; font-size: 13px; font-style: italic; color: #546A80; cursor: default; transition: color 80ms, opacity 400ms ease-in-out; }",
    "    .cw-glass .htw-action-word:hover { color: #3D3D3A; }",
    "    .cw-glass .htw-action-word.absent { opacity: 0; pointer-events: none; }"
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = CSS.replace(/^    /gm, '');
  document.head.appendChild(style);

  var MARKUP = [
    "<canvas class=\"g-canvas\"></canvas>",
    "<div class=\"g-left-panel\"></div>",
    "<div class=\"g-model-layer\"><img class=\"g-model-img\" src=\"\" alt=\"\" draggable=\"false\"></div>",
    "",
    "<!-- How this works panel -->",
    "<div class=\"g-htw-panel\">",
    "  <span class=\"g-htw-panel-heading\">How this works</span>",
    "  <ul class=\"revealed g-htw-panel-list\">",
    "    <li class=\"htw-item\" data-stage=\"construction\">Lines and Circles</li>",
    "    <li class=\"htw-item\" data-stage=\"shapes\">Cutting Shapes</li>",
    "    <li class=\"htw-item\" data-stage=\"color\">Color</li>",
    "    <li class=\"htw-item\" data-stage=\"eraser\">Hiding Lines</li>",
    "    <li class=\"htw-action-row\">",
    "      <span class=\"htw-action-word g-htw-action-new\">New</span>",
    "      <span class=\"htw-action-word g-htw-action-open\">Open</span>",
    "      <span class=\"htw-action-word g-htw-action-save\">Save</span>",
    "    </li>",
    "    <!-- The viewing words. The three-state Numbers cycle dissolved into one",
    "         destination-named pair (ledger \u00a710); the lattice tie left this",
    "         surface entirely \u2014 Geometry's grid keeps its step, always (\u00a711);",
    "         Just the glass is the finished-window viewing (\u00a79). -->",
    "    <li class=\"htw-action-row\" style=\"margin-top: 12px;\">",
    "      <span class=\"htw-action-word g-map-toggle\">Show map</span>",
    "    </li>",
    "    <li class=\"htw-action-row\">",
    "      <span class=\"htw-action-word g-glass-toggle\">Just the glass</span>",
    "    </li>",
    "    <!-- Share: the postcard, sent — a word of its own since 2 Oct 2026 (Michael: it was",
    "         buried in Save). Present only when there is something to send. -->",
    "    <li class=\"htw-action-row\" style=\"margin-top: 12px;\">",
    "      <span class=\"htw-action-word g-share\">Share</span>",
    "    </li>",
    "  </ul>",
    "</div>",
    "",
    "<!-- How this works canvas window -->",
    "<div class=\"htw-canvas g-htw-canvas\" style=\"display:none;\">",
    "  <div style=\"display:flex;justify-content:flex-end;margin-bottom:4px;\">",
    "    <span class=\"htw-canvas-close g-htw-close\">close</span>",
    "  </div>",
    "  <div class=\"htw-body g-htw-canvas-body\"></div>",
    "</div>",
    "",
    "<div class=\"g-remember\">",
    "  <span class=\"remember-plain\">I want to</span>",
    "  <span class=\"remember-word\">Remember</span>",
    "  <span class=\"remember-plain\">this</span>",
    "</div>",
    "<div class=\"g-drag-hint\">drag to position</div>",
    "",
    "<div class=\"g-sound-permission\">",
    "  <div class=\"sound-ask\">may I use sound?</div>",
    "  <div style=\"margin-top:4px;\">",
    "    <span class=\"sound-ask-word g-sound-yes\">yes</span><span class=\"sound-ask-word g-sound-no\">no</span>",
    "  </div>",
    "</div>",
    "",
    "<div class=\"g-ghost-layer\"><img class=\"g-ghost-img\" src=\"\" alt=\"\" draggable=\"false\"></div>",
    "",
    "<!-- The replay panel (ledger \u00a715) is built in JS on the shared info-panel",
    "     component: play + duration, the step arrows, Start over, close-as-fork. -->",
    "",
    "<!-- The WIP guard, replay Cancel, and Save act are choice panels now",
    "     (Decisions-Controls-Aug12 \u00a7\u00a72,5,6,12) \u2014 built by CW.createChoicePanel;",
    "     the old bare dialogs are gone. -->",
    "",
    "<!-- Note box (used by Save construction, Postcard, and Full sheet) -->",
    "<div class=\"g-save-note-box\" style=\"display:none;\">",
    "  <div class=\"save-note-header g-save-note-drag\">",
    "    <input class=\"g-save-note-name\" type=\"text\" placeholder=\"name\" autocomplete=\"off\">",
    "  </div>",
    "  <textarea class=\"g-save-note-text\" placeholder=\"add a note...\"></textarea>",
    "  <div class=\"save-note-footer\">",
    "    <span class=\"save-note-cancel g-save-note-cancel\">Cancel</span>",
    "    <span class=\"save-note-ok g-save-note-ok\">OK</span>",
    "  </div>",
    "</div>",
    "",
    "<!-- Export preview overlay -->",
    "<div class=\"g-export-preview\" style=\"display:none;\">",
    "  <img class=\"g-export-preview-img\" draggable=\"false\">",
    "</div>",
    "",
    "<div class=\"workspace-tool g-tool-palette\" style=\"display:none;\">",
    "  <div class=\"workspace-tool-header g-palette-drag-handle\">",
    "    <!-- The title is a fact, not a control (ledger \u00a713); the panel is a",
    "         tool panel \u2014 summoned by Color, closed by the child (\u00a73). Since",
    "         1 Oct 2026 it opens over the workspace, outside the column, a",
    "         movable window like the tip window: dragged by this header. -->",
    "    <span class=\"workspace-tool-title palette-name g-palette-name-btn\">Chartres</span>",
    "    <span class=\"workspace-tool-close g-palette-close\">close</span>",
    "  </div>",
    "  <div class=\"palette-grid g-palette-grid\"></div>",
    "  <div class=\"craft-row g-craft-row\"></div>",
    "  <div class=\"palette-recipe g-palette-recipe\">&nbsp;</div>",
    "  <div class=\"lead-slider-row\">",
    "    <span class=\"lead-slider-label\">lead thickness</span>",
    "    <div class=\"lead-slider-track-wrap\">",
    "      <div class=\"lead-slider-track g-lead-slider-track\"></div>",
    "      <input type=\"range\" class=\"lead-slider g-lead-slider\" min=\"5\" max=\"60\" value=\"20\" step=\"1\">",
    "    </div>",
    "  </div>",
    "  <span class=\"palette-choose g-palette-choose\">Choose new colors</span>",
    "</div>",
    "",
    "<div class=\"panel-tool g-tool-model\" style=\"display:none;\">",
    "  <div class=\"panel-tool-header g-model-drag-handle\">",
    "    <span class=\"panel-tool-title g-model-name-btn\" style=\"cursor:default;\">Nested Squares</span>",
    "    <span class=\"panel-tool-close g-model-close\">close</span>",
    "  </div>",
    "  <span class=\"model-hint\">click and drag to reposition</span>",
    "  <div class=\"cw-slider-row\">",
    "    <span class=\"cw-slider-label\">scale</span>",
    "    <input type=\"range\" class=\"cw-slider g-model-scale\" min=\"5\" max=\"150\" value=\"25\" step=\"1\">",
    "  </div>",
    "  <div class=\"cw-slider-row\">",
    "    <span class=\"cw-slider-label\">opacity</span>",
    "    <input type=\"range\" class=\"cw-slider g-model-opacity\" min=\"5\" max=\"100\" value=\"35\" step=\"1\">",
    "  </div>",
    "  <span class=\"palette-choose g-model-choose\">Choose new model</span>",
    "</div>",
    "",
    "<div class=\"g-picker-backdrop\"></div>",
    "<div class=\"g-picker-window\">",
    "  <div class=\"g-picker-drag-handle\"><span class=\"g-picker-close-btn\">close</span></div>",
    "  <div class=\"picker-grid g-picker-grid\"></div>",
    "</div>"
  ].join('\n');

  // Where the site's folders are: the folder above js/, found from this script's own
  // address so a page in active/ and a bench in experiments/ both resolve the same files.
  var SCRIPT_BASE = (function () {
    var s = document.currentScript, src = (s && s.src) || '';
    var m = src.match(/^(.*\/)js\/glass\.js(\?.*)?$/);
    return m ? m[1] : '../';
  })();

  var LEVELS = {
    // htw: the How-this-works items served; map: whether Show map is there; madeWord: the
    // word that brings the making back from Just the glass (Michael, 1 Oct 2026: at
    // circles the column is Circles, Color, New Open Save, Just the glass / Show lines).
    // fill: how a shape takes colour — 'edge' (lead its edges and they close) or 'tap' (tap inside it
    // with a colour chosen); measure: a circle measured while it is drawn. Both off on every level
    // (2 Oct 2026, Glass 1: Circles asks for them per mount); a level may own them later.
    circles: { circle: true, line: false, htw: ['circles', 'color'], map: false, madeWord: 'Show lines', fill: 'edge', measure: false },
    both:    { circle: true, line: true, htw: ['construction', 'shapes', 'color', 'eraser'], map: true, madeWord: 'Show the making', fill: 'edge', measure: false },
    // Named, not built: the spine's steps, arriving in this order.
    lines: null, grid: null, rectangles: null, regions: null, plots: null
  };

function cwGlass(host, opts) {
opts = opts || {};
var root = host;
var BASE = opts.base || SCRIPT_BASE;
function resolveUrl(u) { return (typeof u === 'string' && u.indexOf('../') === 0) ? BASE + u.slice(3) : u; }

var levelName = opts.level || 'both';
if (!LEVELS.hasOwnProperty(levelName)) { console.warn('glass: no level named "' + levelName + '"; serving both'); levelName = 'both'; }
else if (!LEVELS[levelName]) { console.warn('glass: level "' + levelName + '" is named but not built yet; serving both'); levelName = 'both'; }
var POWERS = LEVELS[levelName];
var FILL_MODE = (opts.fill === 'tap' || opts.fill === 'edge') ? opts.fill : (POWERS.fill || 'edge');
var MEASURE = (opts.measure !== undefined) ? !!opts.measure : !!POWERS.measure;
// The window profile (7 Oct 2026, The Glass Rose rewritten as a story about making windows):
// the lab seen entirely as a tool for stained-glass designs made of circles. Circles only, a
// tap inside a shape colours it (pale green with no colour chosen), the column reordered —
// Glass only · Undo, New Open Save, Share, Reset view, and a Demo list — Save keeping her
// own file, Open listing only her designs, the remove chip taking a pane away. The main
// lab is untouched: all of it is this flag.
var APP = opts.app === 'window';
if (APP) { levelName = 'circles'; POWERS = LEVELS.circles; FILL_MODE = 'tap'; MEASURE = false; }
var REMOVE = 'remove';            // the palette's sentinel for the chip that takes colour away (window profile)
var currentKey = null, fromDemo = false, currentDemo = null;   // what Save would overwrite (window profile)
// On a pointer device, tap-to-fill with a colour chosen shows a small ring (a PNG: Safari takes
// no SVG cursor), falling back to the crosshair. On touch there is no cursor.
var RING_CURSOR = 'url("' + BASE + 'art/icons/ring-cursor.png") 8 8, crosshair';
// The drawing area (window profile, Michael, 8 Oct 2026): a box inside the workspace, drawn with the
// column's own line, with a margin at the right where a finger scrolls the page. A gesture starts
// only inside it; one that has started may leave it.
var BOX_INSET = 12, BOX_MARGIN_RIGHT = 32;
function drawingBox() {
    return { x: 160 + BOX_INSET, y: BOX_INSET, w: hostW() - 160 - BOX_INSET - BOX_MARGIN_RIGHT, h: hostH() - 2 * BOX_INSET };
}
function inDrawingBox(pos) {
    if (!APP) return true;
    var b = drawingBox();
    return pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h;
}

root.classList.add('cw-glass');
if (APP) root.classList.add('g-app');   // the window profile's own rules in the CSS above
if (!root.hasAttribute('tabindex')) root.tabIndex = 0;
root.innerHTML = MARKUP;
function $(name) { return root.querySelector('.g-' + name); }
function hostW() { return root.clientWidth; }
function hostH() { return root.clientHeight; }
function hostRect() { return root.getBoundingClientRect(); }
function toLocal(cx, cy) { var r = hostRect(); return { x: cx - r.left, y: cy - r.top }; }

// Listeners on the document and the window, recorded so destroy() can take them off.
var docListeners = [], winListeners = [];
function onDoc(type, fn, o) { document.addEventListener(type, fn, o); docListeners.push([type, fn, o]); }
function offDoc(type, fn, o) {
    document.removeEventListener(type, fn, o);
    docListeners = docListeners.filter(function (l) { return !(l[0] === type && l[1] === fn); });
}
function onWin(type, fn, o) { window.addEventListener(type, fn, o); winListeners.push([type, fn, o]); }

// The shared panels build themselves on the body, fixed to the viewport. They move into
// the host and position inside it; the choice panel, which centres itself on the window
// each time it opens, is re-centred on the host (cw-panel.js is untouched).
function adoptPanel(p, centreOnOpen) {
    root.appendChild(p.el);
    p.el.style.position = 'absolute';
    if (centreOnOpen) {
        var open = p.open;
        p.open = function (config) {
            open(config);
            var w = p.el.offsetWidth, h = p.el.offsetHeight;
            p.el.style.left = Math.max(10, Math.round((hostW() - w) / 2)) + 'px';
            p.el.style.top  = Math.max(10, Math.round(hostH() * 0.4 - h / 2)) + 'px';
        };
    }
    return p;
}


// ============================================================
// CONSTANTS
// What:    Shared visual, threshold, and physics parameters used
//          across all drawing, hit-testing, and animation code.
// Depends: nothing
// Exposes: COLORS, THRESHOLDS, PARAMS, GLOW,
//          FOREST_GLASS, LEAD_COLOR, LEAD_BORDER_COLOR, LEAD_WIDTH,
//          showLines (mutable), showGlass (mutable)
// ============================================================

var COLORS     = { background:'#f4f1e8', border:'#546A80', active:'#2c5aa0', point:'#BE622F' };
var THRESHOLDS = { tapMovement:8, doubleClickTime:300, snapDistance:15, pointHitRadius:12, lineHitRadius:14, circleHitRadius:8 };
var PARAMS     = { pointSize:2, birthScale:2.0, birthDuration:400, lineWidth:0.5, circleWidth:0.5, emphasisWidth:2.0, scaffoldOpacity:0.22 };

// Glow parameters for emphasized segments/arcs
var GLOW = { color:'rgba(84,106,128,0.18)', blur:9, width:10 };

var FOREST_GLASS      = '#c2d4bc';

// ── LEADING (platform-level, shared by every lab that leads glass) ──
// The came colour is not this lab's to choose alone. #777777 was picked
// against this lab's light glass (#c2d4bc, luminance 207), where it is a
// strong dark line; against a dark pane (luminance ~85) it becomes a
// *lighter* line at a third of the contrast and stops reading as a line.
// Rule, from the fills bench (Decisions-Fills-Aug06): the came must hold
// contrast against light and dark glass both. The value below satisfies
// only the light half; choosing the shared value is open work — what is
// settled here is that it belongs to this platform layer, not to a lab.
var LEAD_COLOR        = '#4a4540';
var LEAD_BORDER_COLOR = '#777777';
var LEAD_WIDTH        = 2;

var showLines   = true;
var showGlass   = false;
// Where numbers live: 'map' shows the plane's ambient lattice (grid and
// tick numbers); 'points' turns the lattice down to reveal the emergent
// numbering — numbers only where the child has constructed a point;
// 'off' shows none. Geometry's default is 'points': numbers stay earned
// until the child asks for the map. The default is per-viewing (settled
// at the Phase 3 review) — Multiplication is expected to default to 'map'.
// The map is one thing (ledger §10): shown or hidden, one destination-named
// word. Earned numbers belong to the points and render whenever the map is
// hidden; "no numbers at all" is Just the glass's job. Geometry greets with
// the map hidden — earned numbers first.
var mapShown = false;

// ============================================================
// AUDIO
// What:    Web Audio API sound effects for construction events
//          (point, line, circle, snap, fill, emphasis, scaffold).
//          Browser autoplay policy requires unlockAudio() on first
//          user gesture before any sound will play.
// Depends: nothing
// Exposes: unlockAudio(), playSound(type)
// ============================================================

var audioCtx = null, audioUnlocked = false;
function unlockAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended' || audioCtx.state === 'interrupted') audioCtx.resume();
    if (!audioUnlocked) {
        var b = audioCtx.createBuffer(1,1,22050), s = audioCtx.createBufferSource();
        s.buffer = b; s.connect(audioCtx.destination); s.start(0); audioUnlocked = true;
    }
}
function playSound(type) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    var ac = audioCtx, gain = ac.createGain(); gain.connect(ac.destination);
    var t = ac.currentTime + 0.01;
    function osc(f,e) { var o = ac.createOscillator(); o.connect(gain); o.frequency.value = f; o.start(t); o.stop(t+e); }
    switch(type) {
        case 'point':    gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.15,t+0.005);gain.gain.exponentialRampToValueAtTime(0.001,t+0.2);osc(700,0.2);break;
        case 'line':     gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.15,t+0.005);gain.gain.exponentialRampToValueAtTime(0.001,t+0.3);osc(440,0.3);break;
        case 'circle':   gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.12,t+0.01);gain.gain.exponentialRampToValueAtTime(0.001,t+0.4);osc(480,0.4);osc(720,0.4);break;
        case 'snap':     gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.1,t+0.002);gain.gain.exponentialRampToValueAtTime(0.001,t+0.08);osc(900,0.08);break;
        case 'emphasis_on':  { var o=ac.createOscillator();o.connect(gain);o.frequency.setValueAtTime(600,t);o.frequency.linearRampToValueAtTime(800,t+0.1);gain.gain.setValueAtTime(0.1,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.1);o.start(t);o.stop(t+0.1);break; }
        case 'emphasis_off': { var o=ac.createOscillator();o.connect(gain);o.frequency.setValueAtTime(800,t);o.frequency.linearRampToValueAtTime(600,t+0.1);gain.gain.setValueAtTime(0.1,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.1);o.start(t);o.stop(t+0.1);break; }
        case 'scaffold_fade':    { var o=ac.createOscillator();o.connect(gain);o.frequency.setValueAtTime(500,t);o.frequency.linearRampToValueAtTime(350,t+0.15);gain.gain.setValueAtTime(0.1,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.15);o.start(t);o.stop(t+0.15);break; }
        case 'scaffold_restore': { var o=ac.createOscillator();o.connect(gain);o.frequency.setValueAtTime(350,t);o.frequency.linearRampToValueAtTime(500,t+0.15);gain.gain.setValueAtTime(0.1,t);gain.gain.exponentialRampToValueAtTime(0.001,t+0.15);o.start(t);o.stop(t+0.15);break; }
        case 'fill':    gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.1,t+0.05);gain.gain.exponentialRampToValueAtTime(0.001,t+0.6);osc(330,0.6);osc(495,0.6);break;
        case 'repaint': gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(0.08,t+0.03);gain.gain.exponentialRampToValueAtTime(0.001,t+0.3);osc(440,0.3);osc(550,0.3);break;
    }
}

// ============================================================
// OPERATION LOG + DATA STRUCTURES
// What:    Append-only log of geometric operations (init, line,
//          circle, emphasize, fill, scaffold…). replayLog() rebuilds
//          all derived Maps from scratch on every mutation, giving
//          free undo and save/load. Intersection points are auto-
//          detected and keyed (ll:, lc:, cc:).
// Depends: PARAMS (birthDuration), GEOMETRY HELPERS,
//          plane (resetView on initLog/newConstruction;
//          setUnitLength declared from the init op's seeds),
//          resizeCanvas() (called after file load)
// Exposes: operationLog, points, lines, circles,
//          logicalSegments, logicalArcs, fills, pointAnimations,
//          initLog(), replayLog(animateNew), appendOp(op),
//          undoOp(), newConstruction(),
//          _loadFromFile(file),
//          fitViewToConstruction()
// ============================================================

var operationLog = [];
var points = new Map(), lines = new Map(), circles = new Map();
var logicalSegments = new Map(), logicalArcs = new Map();
var fills = new Map(), pointAnimations = new Map(), canvasNotes = new Map();

function initLog() {
    operationLog = [{ op:'init', seed0:{x:-100,y:0}, seed1:{x:100,y:0} }];
    replayLog(false);
    // Always reset view to show seeds centered on a fresh canvas.
    plane.resetView();
}

function replayLog(animateNew) {
    var prev = new Map(pointAnimations);
    // Preserve editing state across replay
    var prevEditing = {};
    canvasNotes.forEach(function(cn) { if (cn.editing) prevEditing[cn.noteId] = true; });
    points.clear(); lines.clear(); circles.clear();
    logicalSegments.clear(); logicalArcs.clear(); fills.clear(); pointAnimations.clear(); canvasNotes.clear();
    // The viewing starts from its default and the log says the rest (window profile, 8 Oct 2026):
    // Glass only carried over from the last log into New and into a demo, hiding 0 and 1 on an
    // empty board and the Rose as it played. The main lab keeps its habit until Michael rules.
    if (APP) showGlass = false;
    for (var i = 0; i < operationLog.length; i++) {
        var op = operationLog[i];
        if (op.op === 'init') {
            _addPt('seed:0', op.seed0.x, op.seed0.y, 'seed', prev, animateNew);
            _addPt('seed:1', op.seed1.x, op.seed1.y, 'seed', prev, animateNew);
            // The seed distance IS the unit interval, and seed:0 is where the
            // count starts. The lab declares the whole frame to the plane here
            // (decision 4) rather than the plane reaching in.
            var seedUnit = dist(op.seed0.x, op.seed0.y, op.seed1.x, op.seed1.y);
            plane.setUnitFrame(op.seed0.x, op.seed0.y, seedUnit);
            // Duplicate-intersection merge radius, proportional to the unit
            // so a log with different seeds still replays sensibly. It must
            // stay view-independent: replay decides which intersections are
            // "the same point", and that decision cannot depend on zoom or
            // saved constructions would replay differently per device.
            _dupEpsilon = seedUnit * 0.025;
        } else if (op.op === 'line') {
            var p1 = points.get(op.p1Id), p2 = points.get(op.p2Id); if (!p1||!p2) continue;
            var line = { logIdx:i, p1Id:op.p1Id, p2Id:op.p2Id, pointsOnLine:[op.p1Id,op.p2Id], isScaffold:false };
            lines.set(i, line);
            points.forEach(function(pt) { if (pt.id===op.p1Id||pt.id===op.p2Id) return; if (ptOnLine(pt.x,pt.y,p1,p2)) line.pointsOnLine.push(pt.id); });
            sortLine(line); updateSegs(line, i); detectLineX(i, prev, animateNew);
        } else if (op.op === 'circle') {
            var c = points.get(op.centerId), e = points.get(op.edgeId); if (!c||!e) continue;
            var radius = dist(c.x,c.y,e.x,e.y);
            var circ = { logIdx:i, centerId:op.centerId, edgeId:op.edgeId, radius:radius, pointsOnCircle:[op.edgeId], isScaffold:false };
            circles.set(i, circ);
            points.forEach(function(pt) { if (pt.id===op.centerId||pt.id===op.edgeId) return; if (ptOnCircle(pt.x,pt.y,c,radius)) circ.pointsOnCircle.push(pt.id); });
            sortCirc(circ); updateArcs(circ, i); detectCircX(i, prev, animateNew);
        } else if (op.op === 'emphasize') {
            var s = logicalSegments.get(op.key); if (s) s.isEmphasized = true;
            var a = logicalArcs.get(op.key); if (a) a.isEmphasized = true;
        } else if (op.op === 'deemphasize') {
            var s = logicalSegments.get(op.key); if (s) s.isEmphasized = false;
            var a = logicalArcs.get(op.key); if (a) a.isEmphasized = false;
        } else if (op.op === 'fill') {
            fills.set(op.fillId, { fillId:op.fillId, vertices:op.vertices, edges:op.edges||null, color:op.color, opacity:(op.opacity !== undefined ? op.opacity : 1.0), dissolved:false });
        } else if (op.op === 'repaint_fill') {
            var f = fills.get(op.fillId); if (f) { f.color = op.color; f.opacity = (op.opacity !== undefined ? op.opacity : f.opacity); }
        } else if (op.op === 'dissolve_fill') {
            var f = fills.get(op.fillId); if (f) f.dissolved = true;
        } else if (op.op === 'scaffold') {
            if (op.target === 'line') { var l = lines.get(op.idx); if (l) l.isScaffold = op.value; }
            else if (op.target === 'point') { var pt = points.get(op.idx); if (pt) pt.isScaffold = op.value; }
            else { var cir = circles.get(op.idx); if (cir) cir.isScaffold = op.value; }
        } else if (op.op === 'lattice_point') {
            // Minted at a lattice intersection (decision 5's second half):
            // the op records the address in unit coordinates — exactly the
            // information the click contributed — and the world position is
            // resolved from the declared frame, so a log that redeclares its
            // frame replays coherently.
            var lo = plane.unitOrigin(), llen = plane.unitLength();
            var lpx = lo.x + op.u * llen, lpy = lo.y + op.v * llen;
            var lpDup = false;
            points.forEach(function(ex) { if (dist(lpx, lpy, ex.x, ex.y) < _dupEpsilon) lpDup = true; });
            if (!lpDup) {
                var lpId = 'lp:' + op.u + ':' + op.v;
                _addPt(lpId, lpx, lpy, 'lattice', prev, animateNew);
                _integrateNewPoint(lpId);
            }
        } else if (op.op === 'numbers') {
            // The vocabulary shrank at the controls build (ledger §10):
            // shown/hidden. Historical logs carry three values from Phase 3
            // (map/points/off) and booleans from the old emergent-numbers
            // toggle before that — all map forward: map → shown, everything
            // else → hidden (points and off differed only in numerals, and
            // earned numbers now render whenever the map is hidden).
            mapShown = (op.value === 'shown' || op.value === 'map');
        } else if (op.op === 'show_glass') {
            // Just the glass (ledger §9): a viewing change, recorded so
            // replay reproduces what she saw; undo skips it.
            showGlass = !!op.value;
        } else if (op.op === 'note_open') {
            // One space: a note records x, y, and widthW all in world
            // coordinates. Legacy logs stored `width` in screen pixels
            // (>= 100) or, earlier still, world values (< 100); a legacy
            // pixel width is adopted as world units directly — at the
            // default zoom (~1 px per world unit) that is what it meant.
            var noteW;
            if (op.widthW) noteW = op.widthW;
            else if (op.width && op.width >= 100) noteW = op.width;
            else noteW = 200;
            var noteObj = { noteId: op.noteId, text: op.text, x: op.x, y: op.y, widthW: noteW, open: true, editing: !!prevEditing[op.noteId] };
            if (op.anchors && op.anchors.length) { noteObj.anchors = op.anchors.slice(); }
            // Legacy: migrate anchorX/anchorY to anchors array
            else if (op.anchorX !== undefined && op.anchorY !== undefined) { noteObj.anchors = [{ x: op.anchorX, y: op.anchorY }]; }
            canvasNotes.set(op.noteId, noteObj);
        } else if (op.op === 'note_close') {
            var cn = canvasNotes.get(op.noteId); if (cn) cn.open = false;
        }
    }
    syncCanvasNoteDOMs();
    updateViewingWords();
}

function _addPt(id, x, y, type, prev, animateNew) {
    points.set(id, { id:id, x:x, y:y, type:type, isScaffold:false });
    if (prev.has(id)) pointAnimations.set(id, prev.get(id));
    else if (animateNew) pointAnimations.set(id, { startTime:Date.now(), duration:PARAMS.birthDuration });
}

function detectLineX(lineI, prev, an) {
    var line = lines.get(lineI), p1 = points.get(line.p1Id), p2 = points.get(line.p2Id);
    lines.forEach(function(o, j) {
        if (j >= lineI) return;
        var q1 = points.get(o.p1Id), q2 = points.get(o.p2Id), pt = llX(p1,p2,q1,q2);
        if (pt) regX('ll:'+Math.min(lineI,j)+':'+Math.max(lineI,j), pt, prev, an);
    });
    circles.forEach(function(c, j) {
        var ce = points.get(c.centerId);
        lcX(p1,p2,ce,c.radius).forEach(function(pt,k) { regX('lc:'+lineI+':'+j+':'+k, pt, prev, an); });
    });
}

function detectCircX(circI, prev, an) {
    var circ = circles.get(circI), ce = points.get(circ.centerId);
    lines.forEach(function(l, j) {
        var p1 = points.get(l.p1Id), p2 = points.get(l.p2Id);
        lcX(p1,p2,ce,circ.radius).forEach(function(pt,k) { regX('lc:'+j+':'+circI+':'+k, pt, prev, an); });
    });
    circles.forEach(function(o, j) {
        if (j >= circI) return;
        var oc = points.get(o.centerId);
        ccX(ce,circ.radius,oc,o.radius).forEach(function(pt,k) { regX('cc:'+Math.min(circI,j)+':'+Math.max(circI,j)+':'+k, pt, prev, an); });
    });
}

var _dupEpsilon = 5; // world units; set from the seed unit on every init replay

function regX(id, pt, prev, an) {
    if (points.has(id)) return;
    var dup = false;
    points.forEach(function(ex) { if (dist(pt.x,pt.y,ex.x,ex.y) < _dupEpsilon) dup = true; });
    if (dup) return;
    _addPt(id, pt.x, pt.y, 'intersection', prev, an);
    _integrateNewPoint(id);
}

// A newly recorded point joins any line or circle it happens to lie on —
// used by intersection registration and by lattice-point minting alike.
function _integrateNewPoint(id) {
    var np = points.get(id);
    lines.forEach(function(l) {
        var lp1 = points.get(l.p1Id), lp2 = points.get(l.p2Id);
        if (!l.pointsOnLine.includes(id) && ptOnLine(np.x,np.y,lp1,lp2)) { l.pointsOnLine.push(id); sortLine(l); updateSegs(l,l.logIdx); }
    });
    circles.forEach(function(cir) {
        var ce = points.get(cir.centerId);
        if (id === cir.centerId) return;
        if (!cir.pointsOnCircle.includes(id) && ptOnCircle(np.x,np.y,ce,cir.radius)) { cir.pointsOnCircle.push(id); sortCirc(cir); updateArcs(cir,cir.logIdx); }
    });
}

function appendOp(op) { operationLog.push(op); replayLog(true); checkHtwTriggers(); checkTipFadeThresholds(); }
// Undo touches only marks on the world (Interface Standard §2): the log
// keeps viewing ops so replay reproduces what the child saw, but undo skips
// over them — tap-in-empty-space must never make the map disappear. Viewing
// state is reversed by its own control (that is what destination-named
// titles are for).
var VIEWING_OPS = { numbers: true, show_glass: true };
// Work means marks on the world. Viewing ops alone are not work: they must
// not summon New and Save onto an empty canvas, and the WIP guard has
// nothing to guard when only the viewing changed.
function logHasMarks() {
    for (var i = 1; i < operationLog.length; i++) {
        if (!VIEWING_OPS[operationLog[i].op]) return true;
    }
    return false;
}
function undoOp() {
    var i = operationLog.length - 1;
    while (i >= 1 && VIEWING_OPS[operationLog[i].op]) i--;
    if (i < 1) return;
    operationLog.splice(i, 1);
    replayLog(false);
}

// ============================================================
// CANVAS NOTES
// What:    Notes as operations in the log. Double-click empty space
//          to place. note_open/note_close in operation log.
// ============================================================

var _noteCounter = 0;
var _undoTimer = null; // 300ms delay to distinguish single click (undo) from double click (note)

function syncCanvasNoteDOMs() {
    var inReplay = isStepThroughActive();
    // Remove note DOMs that are no longer in canvasNotes or are closed
    root.querySelectorAll('.canvas-note').forEach(function(el) {
        var nid = el.dataset.noteId;
        var cn = canvasNotes.get(nid);
        if (!cn || !cn.open) {
            if (inReplay && cn && !cn.open && !el.classList.contains('fading')) {
                // Fade out over ~1 second during replay
                el.classList.add('fading');
                setTimeout(function() { el.remove(); }, 1050);
            } else if (!el.classList.contains('fading')) {
                el.remove();
            }
        }
    });
    // Create/update DOMs for open notes
    canvasNotes.forEach(function(cn) {
        if (!cn.open) return;
        var el = root.querySelector('.canvas-note[data-note-id="' + cn.noteId + '"]');
        if (!el) {
            el = createCanvasNoteDom(cn, inReplay);
            root.appendChild(el);
        }
        // Position and width both from world coords — the note is part of
        // the construction, so its box scales with the view like everything else.
        var s = w2s(cn.x, cn.y);
        el.style.left = s.x + 'px';
        el.style.top = s.y + 'px';
        el.style.width = (cn.widthW * plane.zoom()) + 'px';
    });
}

function _updateNoteOp(cn, fields) {
    for (var i = operationLog.length - 1; i >= 0; i--) {
        if (operationLog[i].op === 'note_open' && operationLog[i].noteId === cn.noteId) {
            for (var k in fields) { operationLog[i][k] = fields[k]; cn[k] = fields[k]; }
            return;
        }
    }
}

function _finalizeNote(cn, el) {
    if (!cn.editing) return;
    cn.editing = false;
    var ta = el.querySelector('textarea');
    if (!ta) return;
    var textDiv = document.createElement('div');
    textDiv.className = 'cn-text-display';
    textDiv.textContent = ta.value || '';
    ta.parentNode.replaceChild(textDiv, ta);
}

function _finalizeAllEditingNotes() {
    canvasNotes.forEach(function(cn) {
        if (!cn.editing) return;
        var el = root.querySelector('.canvas-note[data-note-id="' + cn.noteId + '"]');
        if (el) _finalizeNote(cn, el);
    });
}

function createCanvasNoteDom(cn, readOnly) {
    var el = document.createElement('div');
    el.className = 'canvas-note';
    el.dataset.noteId = cn.noteId;

    // Drag bar
    var dragBar = document.createElement('div');
    dragBar.className = 'cn-drag';
    var close = document.createElement('span');
    close.className = 'canvas-note-close';
    close.textContent = '\u00d7';
    close.addEventListener('click', function(e) { e.stopPropagation(); closeCanvasNote(cn.noteId); });
    dragBar.appendChild(close);
    el.appendChild(dragBar);

    // Body: arrow cell + text area
    var body = document.createElement('div');
    body.className = 'cn-body';
    var arrow = document.createElement('div');
    arrow.className = 'cn-arrow';
    arrow.textContent = '\u25C1'; // ◁
    body.appendChild(arrow);

    var textWrap = document.createElement('div');
    textWrap.className = 'cn-text-wrap';

    if (readOnly) {
        var textDiv = document.createElement('div');
        textDiv.className = 'cn-text-display';
        textDiv.textContent = cn.text || '';
        textWrap.appendChild(textDiv);
    } else if (cn.editing) {
        var ta = document.createElement('textarea');
        ta.placeholder = 'type a note...';
        ta.value = cn.text || '';
        ta.addEventListener('input', function() { _updateNoteOp(cn, { text: ta.value }); });
        textWrap.appendChild(ta);
    } else {
        var textDiv = document.createElement('div');
        textDiv.className = 'cn-text-display';
        textDiv.textContent = cn.text || '';
        textWrap.appendChild(textDiv);
    }
    body.appendChild(textWrap);
    el.appendChild(body);

    // Resize observer — record the new width in world units
    if (!readOnly && typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(function() { _updateNoteOp(cn, { widthW: el.offsetWidth / plane.zoom() }); }).observe(el);
    }

    // Drag via the drag bar
    var dragging = false, sx, sy, ox, oy;
    dragBar.addEventListener('pointerdown', function(e) {
        if (e.target === close) return;
        e.preventDefault(); e.stopPropagation();
        dragging = true; sx = e.clientX; sy = e.clientY;
        ox = parseInt(el.style.left) || 0; oy = parseInt(el.style.top) || 0;
        el.classList.add('dragging'); dragBar.setPointerCapture(e.pointerId);
    });
    dragBar.addEventListener('pointermove', function(e) {
        if (!dragging) return;
        el.style.left = (ox + e.clientX - sx) + 'px';
        el.style.top = (oy + e.clientY - sy) + 'px';
        if (!readOnly) {
            var wc = s2w(parseInt(el.style.left), parseInt(el.style.top));
            _updateNoteOp(cn, { x: wc.x, y: wc.y });
        }
    });
    dragBar.addEventListener('pointerup', function() { dragging = false; el.classList.remove('dragging'); });

    // Callout lines: drag from arrow region to add anchor, double-click to remove last.
    // We detect clicks in the arrow region (left 24px of note body) via the note element
    // itself, since direct listeners on the arrow child can fail to fire in some layouts.
    if (!readOnly) {
        var noteId = cn.noteId;
        var anchorDragActive = false, anchorDragMoved = false;

        function isInArrowRegion(e) {
            var rect = el.getBoundingClientRect();
            var dragBarH = 6; // height of .cn-drag
            return e.clientX < rect.left + 24 && e.clientY > rect.top + dragBarH;
        }

        el.addEventListener('pointerdown', function(e) {
            if (!isInArrowRegion(e)) return;
            e.preventDefault(); e.stopPropagation();
            anchorDragActive = true; anchorDragMoved = false;
            var live = canvasNotes.get(noteId);
            if (live) live._anchorDragScreen = { x: e.clientX, y: e.clientY };
        });
        onDoc('pointermove', function(e) {
            if (!anchorDragActive) return;
            anchorDragMoved = true;
            var live = canvasNotes.get(noteId);
            if (live) live._anchorDragScreen = { x: e.clientX, y: e.clientY };
        });
        onDoc('pointerup', function(e) {
            if (!anchorDragActive) return;
            anchorDragActive = false;
            var live = canvasNotes.get(noteId);
            if (live) delete live._anchorDragScreen;
            if (!anchorDragMoved) return;
            var aw = s2w(e.clientX, e.clientY);
            if (live) {
                if (!live.anchors) live.anchors = [];
                live.anchors.push({ x: aw.x, y: aw.y });
                _updateNoteOp(live, { anchors: live.anchors.slice() });
            }
        });
        // Double-click in arrow region: remove most recent anchor
        var lastArrowClick = 0;
        el.addEventListener('dblclick', function(e) {
            if (!isInArrowRegion(e)) return;
            e.stopPropagation();
            var live = canvasNotes.get(noteId);
            if (live && live.anchors && live.anchors.length) {
                live.anchors.pop();
                _updateNoteOp(live, { anchors: live.anchors.slice() });
            }
        });
    }

    // Click outside to finalize editing — the finalizing click is consumed
    if (!readOnly && cn.editing) {
        setTimeout(function() {
            function onClickOutside(e) {
                if (!cn.editing) { offDoc('pointerdown', onClickOutside, true); return; }
                if (el.contains(e.target)) return;
                e.stopPropagation(); e.preventDefault();
                _finalizeNote(cn, el);
                offDoc('pointerdown', onClickOutside, true);
            }
            onDoc('pointerdown', onClickOutside, true);
        }, 100);
    }

    return el;
}

function placeCanvasNote(screenX, screenY) {
    _finalizeAllEditingNotes();
    var world = s2w(screenX, screenY);
    var noteId = 'n:' + (_noteCounter++);
    // The note starts in editing mode; replayLog will set editing:false, so we set it after.
    // A new note opens 200 screen px wide; recorded in world units.
    appendOp({ op: 'note_open', noteId: noteId, text: '', x: world.x, y: world.y, widthW: 200 / plane.zoom() });
    var cn = canvasNotes.get(noteId);
    if (cn) cn.editing = true;
    // Recreate the DOM in editing mode
    var oldEl = root.querySelector('.canvas-note[data-note-id="' + noteId + '"]');
    if (oldEl) oldEl.remove();
    var el = createCanvasNoteDom(cn, false);
    root.appendChild(el);
    var s = w2s(cn.x, cn.y);
    el.style.left = s.x + 'px'; el.style.top = s.y + 'px'; el.style.width = (cn.widthW * plane.zoom()) + 'px';
    setTimeout(function() {
        var ta = el.querySelector('textarea');
        if (ta) ta.focus();
    }, 50);
}

function closeCanvasNote(noteId) {
    appendOp({ op: 'note_close', noteId: noteId });
}
function newConstruction() {
    currentKey = null; fromDemo = false; currentDemo = null;
    operationLog = [{ op:'init', seed0:{x:-100,y:0}, seed1:{x:100,y:0} }];
    replayLog(false);
    plane.resetView();
    // Reset color to clear (bottle green)
    state.palette.selected = FOREST_GLASS;
    // Close any note tip windows, step-through controls, and loaded notes
    var htwEl = $('htw-canvas');
    if (htwEl && htwEl.style.display !== 'none') { htwEl.style.display = 'none'; htwActiveStageIdx = -1; }
    if (isStepThroughActive()) exitStepThrough();
    dismissLoadedNote();
    // Reset interaction state
    interactionState = 'IDLE'; selectedPoint = null; firstTapPoint = null;
    ghostLineEnd = null; ghostCircle = null; snapTarget = null;
}

// Render filled regions only, cropped tight, with optional note text.
// Bounding box is computed from fill polygon vertices, not all geometry.
function captureConstructionPNG(note, callback) {
    // Collect all fill polygon points for tight bounding box
    var allPolys = []; // each entry: { poly, fill }
    fills.forEach(function(f) {
        if (f.dissolved) return;
        var poly = expandFillToPolygon(f);
        if (poly.length >= 3) allPolys.push({ poly:poly, fill:f });
    });
    // Fall back to all points if no fills exist
    var hasFills = allPolys.length > 0;
    var minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
    if (hasFills) {
        allPolys.forEach(function(item) {
            item.poly.forEach(function(p) {
                minX=Math.min(minX,p.x); minY=Math.min(minY,p.y);
                maxX=Math.max(maxX,p.x); maxY=Math.max(maxY,p.y);
            });
        });
    } else {
        points.forEach(function(pt) { minX=Math.min(minX,pt.x);minY=Math.min(minY,pt.y);maxX=Math.max(maxX,pt.x);maxY=Math.max(maxY,pt.y); });
    }
    var pad=40, ww=maxX-minX+pad*2, wh=maxY-minY+pad*2;
    // Note text reserve: add bottom margin if note present
    var noteText = (note||'').trim();
    var noteFontPx = 15;  // canvas px before scale
    var noteLineH  = noteFontPx * 1.45;
    var noteLines  = noteText ? wrapText(noteText, 260) : [];
    var noteReserve = noteLines.length > 0 ? (noteLines.length * noteLineH + 18) : 0;
    var targetW = 600, targetH = 600;
    var sc = Math.min(targetW/ww, (targetH-noteReserve)/wh, 4);
    var pw = Math.round(ww*sc), ph = Math.round(wh*sc + noteReserve);
    var off = document.createElement('canvas'); off.width=pw; off.height=ph;
    var oc  = off.getContext('2d');
    oc.fillStyle = COLORS.background; oc.fillRect(0,0,pw,ph);
    // World y is up; canvas y is down — flip so the export matches the screen
    function wp(wx,wy) { return { x:(wx-minX+pad)*sc, y:(maxY-wy+pad)*sc }; }
    // The glass, if there is any; a construction with none yet shows its drawing
    // instead (2 Oct 2026 — the Rose, and anything she saves before leading it,
    // used to preview as blank parchment).
    allPolys.forEach(function(item) {
        var f = item.fill;
        var mapped = item.poly.map(function(p) { return wp(p.x,p.y); });
        oc.beginPath(); oc.moveTo(mapped[0].x,mapped[0].y);
        for (var i=1;i<mapped.length;i++) oc.lineTo(mapped[i].x,mapped[i].y);
        oc.closePath(); oc.fillStyle=f.color; oc.globalAlpha=f.opacity; oc.fill('evenodd');
        oc.globalAlpha=1;
    });
    if (!hasFills) {
        oc.strokeStyle = COLORS.border; oc.lineWidth = 1; oc.globalAlpha = 0.8;
        circles.forEach(function(ci) {
            var ce = points.get(ci.centerId); if (!ce) return;
            var c = wp(ce.x, ce.y);
            oc.beginPath(); oc.arc(c.x, c.y, ci.radius * sc, 0, Math.PI * 2); oc.stroke();
        });
        lines.forEach(function(l) {
            var ids = l.pointsOnLine; if (ids.length < 2) return;
            var a = points.get(ids[0]), b = points.get(ids[ids.length - 1]); if (!a || !b) return;
            var pa = wp(a.x, a.y), pb = wp(b.x, b.y);
            oc.beginPath(); oc.moveTo(pa.x, pa.y); oc.lineTo(pb.x, pb.y); oc.stroke();
        });
        oc.fillStyle = COLORS.point; oc.globalAlpha = 1;
        points.forEach(function(pt) { var q = wp(pt.x, pt.y); oc.beginPath(); oc.arc(q.x, q.y, 2.5, 0, Math.PI * 2); oc.fill(); });
    }
    // Note text at bottom
    if (noteLines.length > 0) {
        var tc = noteBoxTextColor();
        oc.fillStyle = tc;
        oc.font = 'italic '+noteFontPx+'px Georgia, serif';
        oc.textBaseline = 'top';
        var ty = ph - noteReserve + 10;
        var tx = pad * sc;
        noteLines.forEach(function(line) {
            oc.fillText(line, tx, ty);
            ty += noteLineH;
        });
    }
    callback(off.toDataURL('image/png'));
}

// Wrap text to fit within maxWidth pixels (canvas measurement at current font).
// Returns array of line strings. Called before canvas creation so uses a temp canvas.
function wrapText(text, maxPx) {
    var tmp = document.createElement('canvas').getContext('2d');
    tmp.font = 'italic 15px Georgia, serif';
    var words = text.split(' '), lines = [], cur = '';
    words.forEach(function(w) {
        var test = cur ? cur+' '+w : w;
        if (tmp.measureText(test).width > maxPx && cur) { lines.push(cur); cur=w; }
        else cur = test;
    });
    if (cur) lines.push(cur);
    return lines;
}

// Determine text color for note overlay: use darkest palette color if luminance < 0.15,
// otherwise fall back to Payne's gray.
function relativeLuminance(hex) {
    var r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
    function lin(c) { return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4); }
    return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b);
}
var PAYNES_GRAY = '#536878';
function noteBoxTextColor() {
    var pal = PALETTES_DATA[state.palette.current];
    if (!pal) return PAYNES_GRAY;
    var darkest=null, darkestLum=Infinity;
    pal.colors.forEach(function(c) {
        if (!c.hex) return;
        var lum=relativeLuminance(c.hex);
        if (lum<darkestLum) { darkestLum=lum; darkest=c.hex; }
    });
    return (darkest && darkestLum<0.15) ? darkest : PAYNES_GRAY;
}

// Log snapshot taken when a save is initiated by a flow whose continuation
// may clear the canvas before the child finishes naming (save-before-discard).
// doSaveConstruction consumes it; the save box's Cancel clears it.
var _pendingSaveLog = null;

var UNIQUENESS_COMPARISONS = [
    { min: 13,  text: 'more than all the grains of sand on every beach on Earth' },
    { min: 20,  text: 'more than all the drops of water in all the oceans' },
    { min: 50,  text: 'more than all the atoms in the Earth' },
    { min: 80,  text: 'more than all the atoms in the universe' },
    { min: 120, text: 'more than all the atoms in a billion universes' }
];

function computeUniqueness(p) {
    var pairs = p * (p - 1) / 2;
    var log10 = pairs * Math.log10(2);
    var exponent = Math.floor(log10);
    var mantissa = Math.pow(10, log10 - exponent);
    return { mantissa: Math.round(mantissa * 10) / 10, exponent: exponent };
}

function superscript(n) {
    var digits = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    return String(n).split('').map(function(d) { return digits[parseInt(d)] || d; }).join('');
}

function showUniquenessObservation() {
    var nPts = points.size, nLines = lines.size, nCircles = circles.size;
    var u = computeUniqueness(nPts);

    // Find comparison
    var comparison = '';
    for (var i = UNIQUENESS_COMPARISONS.length - 1; i >= 0; i--) {
        if (u.exponent >= UNIQUENESS_COMPARISONS[i].min) { comparison = UNIQUENESS_COMPARISONS[i].text; break; }
    }
    if (!comparison) return; // exponent < 13, don't show

    var bodyEl = $('htw-canvas-body');
    bodyEl.innerHTML = '';

    // Line 1: counts
    var p1 = document.createElement('p'); p1.className = 'htw-para';
    p1.textContent = 'You made ' + nPts + ' points, ' + nLines + ' line' + (nLines !== 1 ? 's' : '') + ', and ' + nCircles + ' circle' + (nCircles !== 1 ? 's' : '') + '.';
    bodyEl.appendChild(p1);

    bodyEl.appendChild(document.createElement('br'));

    // Line 2: scientific notation + comparison
    var p2 = document.createElement('p'); p2.className = 'htw-para';
    p2.textContent = 'With those points alone, there are ' + u.mantissa + ' \u00d7 10' + superscript(u.exponent) + ' possible arrangements \u2014 ' + comparison + '.';
    bodyEl.appendChild(p2);

    bodyEl.appendChild(document.createElement('br'));

    // Line 3: the clincher
    var p3 = document.createElement('p'); p3.className = 'htw-para';
    p3.textContent = 'The one you just made is one of billions that could be made. Most of them have never been seen.';
    bodyEl.appendChild(p3);
    htwActiveStageIdx = -1;
    var el = $('htw-canvas');
    if (htwLastPos) {
        el.style.left = htwLastPos.left; el.style.top = htwLastPos.top;
    } else {
        var s0 = w2s(-100, 0);
        el.style.left = Math.max(s0.x - 268, 10) + 'px';
        el.style.top  = Math.max(Math.round(s0.y - 130), 20) + 'px';
    }
    el.style.opacity = '0'; el.style.display = '';
    requestAnimationFrame(function() {
        el.style.transition = 'opacity 200ms ease-in'; el.style.opacity = '1';
        setTimeout(function() { el.style.transition = ''; }, 220);
    });
}

// ============================================================
// SAVE FLOW (revised)
// What:    "Save Construction" saves ops+thumbnail to localStorage.
//          "Save as Image" renders glass+lead+note as downloadable PNG.
//          Both use the new save-note-box for name/note input.
// ============================================================

var _saveMode = null; // 'construction' | 'image' | 'share'
var _imageSize = 'postcard'; // 'postcard' | 'fullsheet'
var _previewActive = false;
var _previewData = null; // { minX, minY, ww, wh, s, matPx, offX, offY, artW, artH, imgEl }

function renderPreviewCanvas(sizeKey) {
    // Fast preview: artwork + lead + border mat, no texture enhancements
    var allPolys = [];
    fills.forEach(function(f) {
        if (f.dissolved) return;
        var poly = expandFillToPolygon(f);
        if (poly.length >= 3) allPolys.push({ poly: poly, fill: f });
    });
    var leadLines2 = collectLeadLines();
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    allPolys.forEach(function(item) {
        item.poly.forEach(function(p) {
            minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
        });
    });
    leadLines2.forEach(function(l) {
        if (l.type === 'seg') {
            minX = Math.min(minX, l.x1, l.x2); minY = Math.min(minY, l.y1, l.y2);
            maxX = Math.max(maxX, l.x1, l.x2); maxY = Math.max(maxY, l.y1, l.y2);
        } else {
            minX = Math.min(minX, l.cx - l.r); minY = Math.min(minY, l.cy - l.r);
            maxX = Math.max(maxX, l.cx + l.r); maxY = Math.max(maxY, l.cy + l.r);
        }
    });
    if (!isFinite(minX)) { minX = -100; minY = -100; maxX = 100; maxY = 100; }
    var cW = maxX - minX, cH = maxY - minY;
    var pf = 0.15;
    minX -= cW * pf; minY -= cH * pf; maxX += cW * pf; maxY += cH * pf;
    var ww = maxX - minX, wh = maxY - minY;
    var sizes = { postcard: { w: 900, h: 600 }, fullsheet: { w: 1000, h: 800 } }; // screen-res preview
    var sz = sizes[sizeKey] || sizes.postcard;
    var matPx = 30;
    var artW = sz.w - matPx * 2, artH = sz.h - matPx * 2;
    var sc = Math.min(artW / ww, artH / wh);
    var offX = (artW - ww * sc) / 2, offY = (artH - wh * sc) / 2;
    var off = document.createElement('canvas'); off.width = sz.w; off.height = sz.h;
    var oc = off.getContext('2d');
    // World y is up; canvas y is down — flip so the preview matches the screen
    function wp(wx, wy) { return { x: (wx - minX) * sc + matPx + offX, y: (maxY - wy) * sc + matPx + offY }; }
    oc.fillStyle = '#2a2620'; oc.fillRect(0, 0, sz.w, sz.h);
    oc.strokeStyle = '#c8b89a'; oc.lineWidth = 1;
    oc.strokeRect(matPx - 0.5, matPx - 0.5, artW + 1, artH + 1);
    oc.fillStyle = COLORS.background; oc.fillRect(matPx, matPx, artW, artH);
    var sorted = allPolys.slice().sort(function(a, b) { return shoelaceArea(b.poly) - shoelaceArea(a.poly); });
    sorted.forEach(function(item) {
        var f = item.fill;
        var mapped = item.poly.map(function(p) { return wp(p.x, p.y); });
        oc.beginPath(); oc.moveTo(mapped[0].x, mapped[0].y);
        for (var i = 1; i < mapped.length; i++) oc.lineTo(mapped[i].x, mapped[i].y);
        oc.closePath(); oc.fillStyle = f.color; oc.globalAlpha = f.opacity; oc.fill('evenodd');
        oc.globalAlpha = 1;
    });
    var lw = Math.max(1, LEAD_WIDTH * sc);
    oc.lineJoin = 'round'; oc.lineCap = 'round';
    function drawLL(l) {
        if (l.type === 'seg') { var p1 = wp(l.x1, l.y1), p2 = wp(l.x2, l.y2); oc.beginPath(); oc.moveTo(p1.x, p1.y); oc.lineTo(p2.x, p2.y); oc.stroke(); }
        else { var c = wp(l.cx, l.cy); oc.beginPath(); oc.arc(c.x, c.y, l.r * sc, -l.aA, -l.aB, true); oc.stroke(); } // y-up flip
    }
    oc.strokeStyle = LEAD_BORDER_COLOR; oc.lineWidth = lw;
    sorted.forEach(function(item) {
        var mapped = item.poly.map(function(p) { return wp(p.x, p.y); });
        oc.beginPath(); oc.moveTo(mapped[0].x, mapped[0].y);
        for (var i = 1; i < mapped.length; i++) oc.lineTo(mapped[i].x, mapped[i].y);
        oc.closePath(); oc.stroke();
    });
    leadLines2.forEach(drawLL);
    return off.toDataURL('image/png');
}

function showExportPreview(sizeKey) {
    _previewActive = true;
    var dataUrl = renderPreviewCanvas(sizeKey);
    var preview = $('export-preview');
    var img = $('export-preview-img');
    img.src = dataUrl;
    preview.style.display = '';
    // Position note box on top of the preview image, centered
    showSaveNoteBox('image');
    // Re-center note box after image loads
    img.onload = function() {
        var rect = img.getBoundingClientRect(), hr = hostRect();
        var box = $('save-note-box');
        // The preview renders a dark border mat (30px at canvas resolution)
        // around the parchment; the name field sits fully inside the
        // parchment area, never over the frame.
        var previewSizes = { postcard: { w: 900, h: 600 }, fullsheet: { w: 1000, h: 800 } };
        var psz = previewSizes[sizeKey] || previewSizes.postcard;
        var matX = rect.width * (30 / psz.w), matY = rect.height * (30 / psz.h);
        box.style.left = Math.round(rect.left - hr.left + matX + 12) + 'px';
        box.style.top = Math.round(rect.top - hr.top + matY + 12) + 'px';
        // Scale note font to match export proportionally.
        // Preview is displayed at rect.width. Scale = rect.width / exportWidth
        var sizes = { postcard: { w: 1200, noteFont: 25 }, fullsheet: { w: 3000, noteFont: 38 } };
        var xsz = sizes[sizeKey] || sizes.postcard;
        var previewScale = rect.width / xsz.w;
        var previewFontPx = Math.round(xsz.noteFont * previewScale);
        var ta = $('save-note-text');
        ta.style.fontSize = previewFontPx + 'px';
        ta.style.lineHeight = '1.5';
    };
}

function hideExportPreview() {
    _previewActive = false;
    $('export-preview').style.display = 'none';
    // Reset note font size
    var ta = $('save-note-text');
    ta.style.fontSize = ''; ta.style.lineHeight = '';
}

// The Save panel (ledger §§2, 12): one choice panel, three words about
// three destinations. Postcard IS the share action — there is no Share
// word anywhere. When the canvas is empty the Save word is simply absent
// (conditional presence, §14); the guard below only covers Cmd+S.
// Share (2 Oct 2026, Michael): the postcard, sent — its own word in the column, no
// choice panel; it opens the postcard's preview and note box, and OK sends it.
// Postcard left the Save panel the same day.
function sharePostcard() {
    if (!logHasMarks()) return;
    _imageSize = 'postcard';
    showExportPreview('postcard');
}
// The window profile: Save keeps her own file. The first save asks for a name; after that
// it quietly overwrites. A demo, or anything started from one, always asks for a new name.
function saveHers() {
    if (!logHasMarks()) return;
    if (currentKey && !fromDemo) { var e = null; try { e = JSON.parse(localStorage.getItem(currentKey)); } catch (err) {}
        if (e) { doSaveConstruction(e.name, e.note || '', currentKey); return; } }
    showSaveNoteBox('construction');
}
function openSavePanel() {
    if (!logHasMarks()) return;
    if (APP) { saveHers(); return; }
    choicePanel.open({ choices: [
        { word: 'Save construction', line: 'a file you can open and keep working on', action: function() {
            showSaveNoteBox('construction');
        } },
        { word: 'Full sheet', line: 'a picture to keep', action: function() {
            _imageSize = 'fullsheet';
            showExportPreview('fullsheet');
        } }
    ] });
}

function showSaveNoteBox(mode) {
    _saveMode = mode;
    var box = $('save-note-box');
    var nameEl = $('save-note-name');
    var textEl = $('save-note-text');
    nameEl.value = ''; textEl.value = '';
    // Position: center of canvas area
    var panelW = parseInt(leftPanel.style.width) || PANEL_BASE_WIDTH;
    var cx2 = panelW + (hostW() - panelW) / 2;
    box.style.left = (cx2 - 120) + 'px';
    box.style.top = ((hostH() - 180) / 2) + 'px';
    box.style.display = '';
    // Show positioning prompt
    var prompt = $('save-note-prompt');
    if (!prompt) {
        prompt = document.createElement('div'); prompt.className = 'g-save-note-prompt';
        prompt.style.cssText = 'position:absolute;bottom:100%;left:0;right:0;font:12px Georgia,serif;color:#546A80;pointer-events:none;padding-bottom:4px;line-height:1.4;';
        prompt.textContent = (CONTENT && CONTENT.note_instruction) || 'This note will appear as part of your image. You can place it anywhere you like.';
        box.appendChild(prompt);
    }
    prompt.style.display = '';
    setTimeout(function() { nameEl.focus(); }, 60);
}

function dismissSaveNoteBox() {
    $('save-note-box').style.display = 'none';
    var prompt = $('save-note-prompt');
    if (prompt) prompt.style.display = 'none';
    if (_previewActive) hideExportPreview();
    _saveMode = null;
}

function executeSave() {
    var name = $('save-note-name').value.trim();
    var note = $('save-note-text').value.trim();
    var mode = _saveMode;
    var noteExportPos = null;

    if ((mode === 'image' || mode === 'share') && _previewActive) {
        // Compute note position as fraction of the preview image
        var noteBox = $('save-note-box');
        var img = $('export-preview-img');
        var imgRect = img.getBoundingClientRect(), hr2 = hostRect();
        var nbLeft = parseInt(noteBox.style.left) || 0;
        var nbTop = parseInt(noteBox.style.top) || 0;
        // Fraction within the preview image
        // Also capture box width as fraction for word-wrap in export
        var boxW = noteBox.offsetWidth;
        noteExportPos = {
            fx: (nbLeft - (imgRect.left - hr2.left)) / imgRect.width,
            fy: (nbTop - (imgRect.top - hr2.top)) / imgRect.height,
            fw: boxW / imgRect.width
        };
    } else {
        // Construction save or no preview — use screen position
        var noteBox = $('save-note-box');
        noteExportPos = { left: parseInt(noteBox.style.left) || 0, top: parseInt(noteBox.style.top) || 0 };
    }
    dismissSaveNoteBox();

    if (mode === 'construction') {
        doSaveConstruction(name, note);
    } else if (mode === 'image' || mode === 'share') {
        // Postcard IS the share action (ledger §12): a picture to send goes
        // to the share sheet; the full sheet — a picture to keep — downloads.
        doSaveImage(name, note, _imageSize === 'postcard', noteExportPos);
    }
}

function doSaveConstruction(name, note, existingKey) {
    // Use the snapshot if one was taken (save-before-discard), else the live log.
    var log = _pendingSaveLog || operationLog.slice();
    _pendingSaveLog = null;
    captureConstructionPNG(note, function(png) {
        name = name || ('construction ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        var key = existingKey || ('cw-cx-' + Date.now());
        var noteBox = $('save-note-box');
        var notePos = { left: parseInt(noteBox.style.left) || 0, top: parseInt(noteBox.style.top) || 0 };
        // No viewport block: load never restored it (a construction always
        // opens at the default view), so it is not recorded either. The
        // playback duration saves with the construction (ledger §15).
        var entry = { key: key, name: name, note: note || '', notePos: notePos, created: new Date().toISOString(), operations: log, speed: replayDuration, png: png };
        try {
            localStorage.setItem(key, JSON.stringify(entry));
            var index = cxGetStorageIndex();
            if (!existingKey) index.push({ key: key, name: name, created: entry.created });
            localStorage.setItem('cw-cx-index', JSON.stringify(index));
        } catch (e) {
            console.warn('localStorage save failed:', e);
            toast('could not save (storage full?)');
        }
        // The construction's own file rides the share sheet where one exists
        // (ledger §12) — on iPad the OS sheet is where sending lives, Mail
        // among its doors. Since 1 Oct 2026 (Michael) it never lands on the
        // disk: the browser's library is where it is kept, the sheet is how it
        // is sent, and where there is no sheet nothing more happens. The
        // receiving child opens it as a copy and makes it her own.
        var blob = new Blob([JSON.stringify({ version: 1, name: name, note: note || '', created: entry.created, speed: replayDuration, operations: log }, null, 2)], { type: 'application/json' });
        var fname = (name.replace(/[^a-z0-9 _-]/gi, '_').trim() || 'construction') + '.json';
        var jfile = null;
        try { jfile = new File([blob], fname, { type: 'application/json' }); } catch (e) {}
        toast('saved');
        currentKey = key; fromDemo = false;
        updateViewingWords();   // Open is present once she has a design to open (window profile)
        if (existingKey) { if (points.size >= 10) setTimeout(showUniquenessObservation, 800); return; }   // quietly, as the profile asks
        // Saved; then the offer (Michael, 2 Oct 2026): the sheet used to open on its own
        // with no word about what it was for. Where there is no sheet, no offer.
        if (jfile && navigator.share && navigator.canShare && navigator.canShare({ files: [jfile] })) {
            choicePanel.open({ choices: [
                { word: 'Share the file', line: 'someone can drop it on their own window to open it', action: function() {
                    // A declined or cancelled sheet is the child's no; the library has it either way.
                    navigator.share({ title: name, files: [jfile] }).catch(function() {});
                } },
                { word: 'Not now', line: 'it is in your library' }
            ] });
        }
        if (points.size >= 10) setTimeout(showUniquenessObservation, 800);
    });
}

function doSaveImage(name, note, isShare, noteScreenPos) {
    renderPostcardPNG(name, note, noteScreenPos, _imageSize, function(blob) {
        var filename = (name || 'glass-' + new Date().toISOString().slice(0, 10)).replace(/[^a-z0-9 _-]/gi, '_') + '.png';
        if (isShare && navigator.share && navigator.canShare) {
            var file = new File([blob], filename, { type: 'image/png' });
            navigator.share({ title: name || 'My Glass Construction', text: note || '', files: [file] })
                .catch(function(err) {
                    // Declined by the platform → download instead; a
                    // cancelled sheet is the child's no and stays quiet.
                    if (!err || err.name !== 'AbortError') {
                        var url2 = URL.createObjectURL(blob);
                        var a2 = document.createElement('a'); a2.href = url2; a2.download = filename; a2.click();
                        URL.revokeObjectURL(url2);
                    }
                });
        } else {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a'); a.href = url; a.download = filename; a.click();
            URL.revokeObjectURL(url);
            if (isShare) toast('Sharing not available on this browser \u2014 image downloaded instead');
        }
        if (points.size >= 10) setTimeout(showUniquenessObservation, 800);
    });
}

// Collect all emphasized (lead) segments and arcs for rendering
function collectLeadLines() {
    var leadSegs = [];
    logicalSegments.forEach(function(seg) {
        if (!seg.isEmphasized) return;
        var A = points.get(seg.pointAId), B = points.get(seg.pointBId);
        if (A && B) leadSegs.push({ type: 'seg', x1: A.x, y1: A.y, x2: B.x, y2: B.y });
    });
    logicalArcs.forEach(function(arc) {
        if (!arc.isEmphasized) return;
        var ci = circles.get(arc.circIdx), ce = ci && points.get(ci.centerId);
        var pA = points.get(arc.pointAId), pB = points.get(arc.pointBId);
        if (!ci || !ce || !pA || !pB) return;
        var aA = getAngle(pA.x, pA.y, ce), aB = getAngle(pB.x, pB.y, ce);
        leadSegs.push({ type: 'arc', cx: ce.x, cy: ce.y, r: ci.radius, aA: aA, aB: aB });
    });
    return leadSegs;
}

// Patch PNG blob to set 300 DPI via pHYs chunk (11811 pixels/meter)
function patchPngDpi(blob, dpi, callback) {
    var ppm = Math.round(dpi / 0.0254); // pixels per meter
    var reader = new FileReader();
    reader.onload = function() {
        var buf = new Uint8Array(reader.result);
        // Find IDAT chunk — insert pHYs before it
        var pos = 8; // skip PNG signature
        while (pos < buf.length) {
            var len = (buf[pos] << 24) | (buf[pos+1] << 16) | (buf[pos+2] << 8) | buf[pos+3];
            var type = String.fromCharCode(buf[pos+4], buf[pos+5], buf[pos+6], buf[pos+7]);
            if (type === 'IDAT') {
                // Build pHYs chunk: 4 len + 4 type + 9 data + 4 crc = 21 bytes
                var phys = new Uint8Array(21);
                // Length = 9
                phys[0] = 0; phys[1] = 0; phys[2] = 0; phys[3] = 9;
                // Type: pHYs
                phys[4] = 0x70; phys[5] = 0x48; phys[6] = 0x59; phys[7] = 0x73;
                // X pixels per unit (big-endian)
                phys[8]  = (ppm >> 24) & 0xff; phys[9]  = (ppm >> 16) & 0xff;
                phys[10] = (ppm >> 8) & 0xff;  phys[11] = ppm & 0xff;
                // Y pixels per unit
                phys[12] = (ppm >> 24) & 0xff; phys[13] = (ppm >> 16) & 0xff;
                phys[14] = (ppm >> 8) & 0xff;  phys[15] = ppm & 0xff;
                // Unit type: 1 = meter
                phys[16] = 1;
                // CRC over type+data
                var crc = crc32(phys.subarray(4, 17));
                phys[17] = (crc >> 24) & 0xff; phys[18] = (crc >> 16) & 0xff;
                phys[19] = (crc >> 8) & 0xff; phys[20] = crc & 0xff;
                // Splice: before IDAT
                var result = new Uint8Array(buf.length + 21);
                result.set(buf.subarray(0, pos), 0);
                result.set(phys, pos);
                result.set(buf.subarray(pos), pos + 21);
                callback(new Blob([result], { type: 'image/png' }));
                return;
            }
            pos += 12 + len; // 4 len + 4 type + data + 4 crc
        }
        // Fallback: return original blob
        callback(blob);
    };
    reader.readAsArrayBuffer(blob);
}

// CRC32 for PNG chunk validation
var _crc32Table = null;
function crc32(data) {
    if (!_crc32Table) {
        _crc32Table = new Uint32Array(256);
        for (var n = 0; n < 256; n++) {
            var c = n;
            for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            _crc32Table[n] = c;
        }
    }
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < data.length; i++) crc = _crc32Table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Postcard-quality image export
function renderPostcardPNG(name, note, noteScreenPos, sizeKey, callback) {
    var allPolys = [];
    fills.forEach(function(f) {
        if (f.dissolved) return;
        var poly = expandFillToPolygon(f);
        if (poly.length >= 3) allPolys.push({ poly: poly, fill: f });
    });
    var leadLines = collectLeadLines();
    // No toast-block (acceptance: absent means absent, nothing toast-blocked):
    // a construction with no glass renders an honest empty parchment — the
    // preview shows the child exactly what she would get, and she decides.

    // Bounding box: fills + lead endpoints
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    allPolys.forEach(function(item) {
        item.poly.forEach(function(p) {
            minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
        });
    });
    leadLines.forEach(function(l) {
        if (l.type === 'seg') {
            minX = Math.min(minX, l.x1, l.x2); minY = Math.min(minY, l.y1, l.y2);
            maxX = Math.max(maxX, l.x1, l.x2); maxY = Math.max(maxY, l.y1, l.y2);
        } else {
            minX = Math.min(minX, l.cx - l.r); minY = Math.min(minY, l.cy - l.r);
            maxX = Math.max(maxX, l.cx + l.r); maxY = Math.max(maxY, l.cy + l.r);
        }
    });
    if (!isFinite(minX)) { minX = -100; minY = -100; maxX = 100; maxY = 100; }

    // 15% padding around bounding box
    var contentW = maxX - minX, contentH = maxY - minY;
    var padFrac = 0.15;
    var padX = contentW * padFrac, padY = contentH * padFrac;
    minX -= padX; minY -= padY; maxX += padX; maxY += padY;
    var ww = maxX - minX, wh = maxY - minY;

    // Two renders, two purposes (ledger §12): the postcard is the sent
    // version — screen-sized, doubled for retina, a few hundred KB — because
    // screens ignore the DPI tag and paint raw pixels; the full sheet keeps
    // the 300dpi render she prints. (The build brief's note said the full
    // sheet was 1800×1200; in code it has been 3000×2400 since March —
    // "keeps" means unchanged, reported at review.) The mat and note scale
    // with the postcard so it keeps its look at the new size.
    var sizes = { postcard: { w: 1200, h: 800,  mat: 40, noteFont: 25, leadMin: 1.3, leadMax: 11.3, dpi: null },
                  fullsheet:{ w: 3000, h: 2400, mat: 60, noteFont: 38, leadMin: 2,   leadMax: 17,   dpi: 300 } };
    var sz = sizes[sizeKey] || sizes.postcard;

    var matPx = sz.mat;
    var artW = sz.w - matPx * 2, artH = sz.h - matPx * 2;

    // Scale artwork to fit within art area, centered
    var s = Math.min(artW / ww, artH / wh);
    var offX = (artW - ww * s) / 2; // centering offset within art area
    var offY = (artH - wh * s) / 2;
    var pw = sz.w, ph = sz.h;

    // Lead thickness: scale proportionally, clamped per render size (the
    // full sheet keeps its 0.5pt–4pt-at-300dpi clamp; the postcard's is the
    // same clamp scaled to its width, so lead reads the weight it always has).
    var leadW = Math.max(sz.leadMin, Math.min(sz.leadMax, LEAD_WIDTH * s));

    var off = document.createElement('canvas'); off.width = pw; off.height = ph;
    var oc = off.getContext('2d');
    // World y is up; canvas y is down — flip so the export matches the screen
    function wp(wx, wy) { return { x: (wx - minX) * s + matPx + offX, y: (maxY - wy) * s + matPx + offY }; }

    // Dark border mat
    oc.fillStyle = '#2a2620'; oc.fillRect(0, 0, pw, ph);
    // Inner border line
    oc.strokeStyle = '#c8b89a'; oc.lineWidth = 2;
    oc.strokeRect(matPx - 1, matPx - 1, artW + 2, artH + 2);

    // Parchment background
    oc.fillStyle = COLORS.background;
    oc.fillRect(matPx, matPx, artW, artH);

    // Subtle vignette
    var vgr = oc.createRadialGradient(pw / 2, ph / 2, Math.min(artW, artH) * 0.3, pw / 2, ph / 2, Math.max(pw, ph) * 0.7);
    vgr.addColorStop(0, 'rgba(0,0,0,0)');
    vgr.addColorStop(1, 'rgba(0,0,0,0.12)');
    oc.fillStyle = vgr;
    oc.fillRect(matPx, matPx, artW, artH);

    // Glass fills (sorted largest first)
    var sorted = allPolys.slice().sort(function(a, b) { return shoelaceArea(b.poly) - shoelaceArea(a.poly); });
    sorted.forEach(function(item) {
        var f = item.fill;
        var mapped = item.poly.map(function(p) { return wp(p.x, p.y); });
        oc.beginPath(); oc.moveTo(mapped[0].x, mapped[0].y);
        for (var i = 1; i < mapped.length; i++) oc.lineTo(mapped[i].x, mapped[i].y);
        oc.closePath();
        // Base color fill
        oc.fillStyle = f.color; oc.globalAlpha = f.opacity; oc.fill('evenodd');
        // Subtle glass gradient (lighter center, darker edges ~5%)
        oc.save(); oc.clip();
        var bb = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
        mapped.forEach(function(p) { bb.x1 = Math.min(bb.x1, p.x); bb.y1 = Math.min(bb.y1, p.y); bb.x2 = Math.max(bb.x2, p.x); bb.y2 = Math.max(bb.y2, p.y); });
        var gcx = (bb.x1 + bb.x2) / 2, gcy = (bb.y1 + bb.y2) / 2;
        var gr = Math.max(bb.x2 - bb.x1, bb.y2 - bb.y1) / 2;
        var gg = oc.createRadialGradient(gcx, gcy, 0, gcx, gcy, gr);
        gg.addColorStop(0, 'rgba(255,255,255,0.05)');
        gg.addColorStop(1, 'rgba(0,0,0,0.05)');
        oc.fillStyle = gg; oc.globalAlpha = 1; oc.fill('evenodd');
        oc.restore();
        // Glass noise texture
        oc.globalAlpha = 1;
        for (var n = 0; n < 300; n++) {
            var rx = mapped[Math.floor(Math.random() * mapped.length)];
            var nx = rx.x + (Math.random() - 0.5) * 80;
            var ny = rx.y + (Math.random() - 0.5) * 80;
            oc.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)';
            oc.fillRect(nx, ny, 2, 2);
        }
    });

    // Warm light overlay across all glass
    sorted.forEach(function(item) {
        var mapped = item.poly.map(function(p) { return wp(p.x, p.y); });
        oc.beginPath(); oc.moveTo(mapped[0].x, mapped[0].y);
        for (var i = 1; i < mapped.length; i++) oc.lineTo(mapped[i].x, mapped[i].y);
        oc.closePath();
        oc.fillStyle = 'rgba(255,248,230,0.03)'; oc.globalAlpha = 1; oc.fill('evenodd');
    });

    // Lead lines — helper
    function drawLeadLine(l) {
        if (l.type === 'seg') {
            var p1 = wp(l.x1, l.y1), p2 = wp(l.x2, l.y2);
            oc.beginPath(); oc.moveTo(p1.x, p1.y); oc.lineTo(p2.x, p2.y); oc.stroke();
        } else {
            var c = wp(l.cx, l.cy);
            oc.beginPath(); oc.arc(c.x, c.y, l.r * s, -l.aA, -l.aB, true); oc.stroke(); // y-up flip
        }
    }
    function drawFillBoundary(item) {
        var mapped = item.poly.map(function(p) { return wp(p.x, p.y); });
        oc.beginPath(); oc.moveTo(mapped[0].x, mapped[0].y);
        for (var i = 1; i < mapped.length; i++) oc.lineTo(mapped[i].x, mapped[i].y);
        oc.closePath(); oc.stroke();
    }
    // Round joints for all lead
    oc.lineJoin = 'round'; oc.lineCap = 'round';
    // Shadow pass (all lead)
    oc.save(); oc.translate(2, 2);
    oc.strokeStyle = 'rgba(0,0,0,0.2)'; oc.lineWidth = leadW;
    sorted.forEach(drawFillBoundary);
    leadLines.forEach(drawLeadLine);
    oc.restore();
    // Highlight pass (top-left edge)
    oc.save(); oc.translate(-1, -1);
    oc.strokeStyle = 'rgba(255,255,255,0.15)'; oc.lineWidth = Math.max(1, leadW * 0.4);
    sorted.forEach(drawFillBoundary);
    leadLines.forEach(drawLeadLine);
    oc.restore();
    // Main lead pass
    oc.strokeStyle = LEAD_BORDER_COLOR; oc.lineWidth = leadW; oc.globalAlpha = 1;
    sorted.forEach(drawFillBoundary);
    leadLines.forEach(drawLeadLine);

    // Note text at the position the child placed it
    // 9pt at 300 DPI ≈ 38px, line-height 1.5 (matches textarea CSS)
    var noteText = (note || '').trim();
    var noteName = (name || '').trim();
    if (noteText || noteName) {
        var noteFontPx = sz.noteFont, noteLineH = noteFontPx * 1.5;
        var titleFontPx = Math.round(noteFontPx * 1.15); // ~10.3pt, slightly larger
        oc.fillStyle = '#546A80';
        oc.textBaseline = 'top';
        // Determine wrap width from captured box width fraction, or fallback
        var wrapWidthPx = (noteScreenPos && noteScreenPos.fw !== undefined)
            ? noteScreenPos.fw * pw
            : pw * 0.4;
        // Position from preview fractional coordinates or screen coords
        var tx, ty;
        if (noteScreenPos && noteScreenPos.fx !== undefined) {
            tx = noteScreenPos.fx * pw;
            ty = noteScreenPos.fy * ph;
        } else {
            var nbLeft = noteScreenPos ? noteScreenPos.left : 100;
            var nbTop = noteScreenPos ? noteScreenPos.top : 100;
            var noteWorld = s2w(nbLeft, nbTop);
            var nPos = wp(noteWorld.x, noteWorld.y);
            tx = nPos.x; ty = nPos.y;
        }
        // Render name as title (slightly larger, not italic)
        if (noteName) {
            oc.font = titleFontPx + 'px Georgia, serif';
            oc.fillText(noteName, tx, ty);
            ty += titleFontPx * 1.5;
        }
        // Render note body (italic, word-wrapped)
        if (noteText) {
            oc.font = 'italic ' + noteFontPx + 'px Georgia, serif';
            var rawLines = noteText.split('\n');
            rawLines.forEach(function(rl) {
                if (rl.trim() === '') { ty += noteLineH * 0.5; return; }
                var words = rl.split(' '), cur = '';
                words.forEach(function(w) {
                    var test = cur ? cur + ' ' + w : w;
                    if (oc.measureText(test).width > wrapWidthPx && cur) {
                        oc.fillText(cur, tx, ty); ty += noteLineH; cur = w;
                    } else { cur = test; }
                });
                if (cur) { oc.fillText(cur, tx, ty); ty += noteLineH; }
            });
        }
    }
    oc.globalAlpha = 1;

    // Render open canvas notes into the export
    var cNoteFontPx = sz.noteFont, cNoteLineH = cNoteFontPx * 1.5;
    canvasNotes.forEach(function(cn) {
        if (!cn.open || !cn.text) return;
        var nPos = wp(cn.x, cn.y);
        // widthW is world units, so the export no longer depends on whatever
        // zoom the child happened to be at when saving
        var nWrapW = cn.widthW * s;
        oc.fillStyle = '#546A80';
        oc.font = 'italic ' + cNoteFontPx + 'px Georgia, serif';
        oc.textBaseline = 'top';
        var nLines = cn.text.split('\n');
        var ty = nPos.y;
        nLines.forEach(function(rl) {
            if (rl.trim() === '') { ty += cNoteLineH * 0.5; return; }
            var words = rl.split(' '), cur = '';
            words.forEach(function(w) {
                var test = cur ? cur + ' ' + w : w;
                if (oc.measureText(test).width > nWrapW && cur) {
                    oc.fillText(cur, nPos.x, ty); ty += cNoteLineH; cur = w;
                } else { cur = test; }
            });
            if (cur) { oc.fillText(cur, nPos.x, ty); ty += cNoteLineH; }
        });
    });

    // Convert to blob; only the print render carries a DPI tag — screens
    // ignore it, and tagging the postcard 300dpi would print it tiny.
    off.toBlob(function(blob) {
        if (sz.dpi) patchPngDpi(blob, sz.dpi, callback);
        else callback(blob);
    }, 'image/png');
}

function cxGetStorageIndex() {
    try { return JSON.parse(localStorage.getItem('cw-cx-index')||'[]'); } catch(e) { return []; }
}
function cxGetAllEntries() {
    return cxGetStorageIndex().map(function(ref) {
        try { return JSON.parse(localStorage.getItem(ref.key)); } catch(e) { return null; }
    }).filter(Boolean);
}
function _loadFromFile(file) {
    var r = new FileReader();
    r.onload = function(ev) {
        try {
            var d = JSON.parse(ev.target.result);
            if (d.version===1 && Array.isArray(d.operations)) {
                if (typeof d.speed === 'number' && isFinite(d.speed)) setReplayDuration(d.speed, false);
                operationLog = d.operations;
                replayLog(false);
                // Ensure canvas dimensions are current before fitting view.
                resizeCanvas();
                fitViewToConstruction();
            }
        } catch(e) { console.error(e); }
    };
    r.readAsText(file);
}

function fitViewToConstruction() {
    if (points.size === 0) return;
    var minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
    points.forEach(function(pt) {
        minX=Math.min(minX,pt.x); minY=Math.min(minY,pt.y);
        maxX=Math.max(maxX,pt.x); maxY=Math.max(maxY,pt.y);
    });
    circles.forEach(function(ci) {
        var ce=points.get(ci.centerId); if (!ce) return;
        minX=Math.min(minX,ce.x-ci.radius); maxX=Math.max(maxX,ce.x+ci.radius);
        minY=Math.min(minY,ce.y-ci.radius); maxY=Math.max(maxY,ce.y+ci.radius);
    });
    var padX = 120, padY = 100;
    var cw = plane.viewportWidth(), ch = plane.viewportHeight();
    var contentW = maxX - minX, contentH = maxY - minY;
    if (contentW < 1) contentW = 200;
    if (contentH < 1) contentH = 200;
    var scaleX = (cw - padX*2) / contentW;
    var scaleY = (ch - padY*2) / contentH;
    plane.setZoom(Math.min(scaleX, scaleY)); // the plane's single clamp applies
    // Centre the view on the bounding box — the pan point maps to screen centre by definition.
    plane.setPan((minX + maxX) / 2, (minY + maxY) / 2);
}
root.addEventListener('keydown', function(e) {
    if ((e.metaKey||e.ctrlKey) && e.key==='s') { e.preventDefault(); openSavePanel(); }
    if ((e.metaKey||e.ctrlKey) && e.key==='o') { e.preventDefault(); checkWipThen(function() { openPickerWindow('constructions'); }); }
});

// ============================================================
// GEOMETRY HELPERS
// What:    Pure math — distance, point-on-line/circle tests, angle
//          normalization, line-line / line-circle / circle-circle
//          intersection, and sort/update helpers for segments and arcs.
//          No DOM, no state, no side effects.
// Depends: points, lines, circles, logicalSegments, logicalArcs,
//          operationLog (emphMap reads it)
// Exposes: dist(), ptOnLine(), ptOnCircle(), getAngle(), normA(),
//          angleBetween(), llX(), lcX(), ccX(),
//          sortLine(), updateSegs(), sortCirc(), updateArcs(), emphMap()
// ============================================================

function dist(x1,y1,x2,y2) { return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); }
function ptOnLine(px,py,p1,p2,tol) { tol=tol||0.1; var dx=p2.x-p1.x,dy=p2.y-p1.y,len=Math.sqrt(dx*dx+dy*dy); return len>0 && Math.abs((dy*(px-p1.x)-dx*(py-p1.y))/len)<tol; }
function ptOnCircle(px,py,c,r,tol) { tol=tol||0.5; return Math.abs(dist(px,py,c.x,c.y)-r)<tol; }
function getAngle(px,py,c) { return Math.atan2(py-c.y,px-c.x); }
function normA(a) { return ((a%(2*Math.PI))+(2*Math.PI))%(2*Math.PI); }
function angleBetween(t,a,b) { return normA(t-a) <= normA(b-a); }
function llX(p1,p2,p3,p4) {
    var d=(p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x);
    if (Math.abs(d)<1e-10) return null;
    var tv=((p1.x-p3.x)*(p3.y-p4.y)-(p1.y-p3.y)*(p3.x-p4.x))/d;
    return { x:p1.x+tv*(p2.x-p1.x), y:p1.y+tv*(p2.y-p1.y) };
}
function lcX(p1,p2,c,r) {
    var dx=p2.x-p1.x,dy=p2.y-p1.y,len=Math.sqrt(dx*dx+dy*dy); if (!len) return [];
    var nx=dx/len,ny=dy/len,tv=(c.x-p1.x)*nx+(c.y-p1.y)*ny;
    var cx=p1.x+tv*nx,cy=p1.y+tv*ny,dSq=(c.x-cx)*(c.x-cx)+(c.y-cy)*(c.y-cy);
    if (dSq>r*r) return [];
    var off=Math.sqrt(Math.max(0,r*r-dSq));
    var pts = [{ x:cx-off*nx, y:cy-off*ny }];
    if (off>1e-6) pts.push({ x:cx+off*nx, y:cy+off*ny });
    return pts;
}
function ccX(c1,r1,c2,r2) {
    var d=dist(c1.x,c1.y,c2.x,c2.y);
    if (d>r1+r2||d<Math.abs(r1-r2)||d<1e-10) return [];
    var a=(r1*r1-r2*r2+d*d)/(2*d), h=Math.sqrt(Math.max(0,r1*r1-a*a));
    var px=c1.x+a*(c2.x-c1.x)/d, py=c1.y+a*(c2.y-c1.y)/d;
    if (h<1e-6) return [{ x:px, y:py }];
    return [{ x:px+h*(c2.y-c1.y)/d, y:py-h*(c2.x-c1.x)/d }, { x:px-h*(c2.y-c1.y)/d, y:py+h*(c2.x-c1.x)/d }];
}

function sortLine(line) {
    var p1=points.get(line.p1Id),p2=points.get(line.p2Id); if (!p1||!p2) return;
    var dx=p2.x-p1.x,dy=p2.y-p1.y;
    line.pointsOnLine.sort(function(a,b) {
        var pa=points.get(a),pb=points.get(b); if (!pa||!pb) return 0;
        return ((pa.x-p1.x)*dx+(pa.y-p1.y)*dy) - ((pb.x-p1.x)*dx+(pb.y-p1.y)*dy);
    });
}
function updateSegs(line, li) {
    logicalSegments.forEach(function(v,k) { if (v.lineIdx===li) logicalSegments.delete(k); });
    var em = emphMap(li);
    for (var i=0; i<line.pointsOnLine.length-1; i++) {
        var a=line.pointsOnLine[i],b=line.pointsOnLine[i+1],k=li+':'+a+':'+b;
        logicalSegments.set(k, { lineIdx:li, pointAId:a, pointBId:b, isEmphasized:!!em.get(k) });
    }
}
function sortCirc(circ) {
    var ce=points.get(circ.centerId); if (!ce) return;
    circ.pointsOnCircle.sort(function(a,b) {
        var pa=points.get(a),pb=points.get(b); if (!pa||!pb) return 0;
        return getAngle(pa.x,pa.y,ce)-getAngle(pb.x,pb.y,ce);
    });
}
function updateArcs(circ, ci) {
    logicalArcs.forEach(function(v,k) { if (v.circIdx===ci) logicalArcs.delete(k); });
    var pts=circ.pointsOnCircle; if (pts.length<2) return;
    var em=emphMap(ci);
    for (var i=0; i<pts.length; i++) {
        var a=pts[i],b=pts[(i+1)%pts.length],k=ci+':'+a+':'+b;
        logicalArcs.set(k, { circIdx:ci, pointAId:a, pointBId:b, isEmphasized:!!em.get(k) });
    }
}
function emphMap(idx) {
    var m = new Map();
    for (var i=0; i<operationLog.length; i++) {
        var op=operationLog[i];
        if (op.op==='emphasize'   && op.key.indexOf(idx+':')===0) m.set(op.key,true);
        if (op.op==='deemphasize' && op.key.indexOf(idx+':')===0) m.set(op.key,false);
    }
    return m;
}

// ============================================================
// ACTION LAYER
// What:    Thin semantic wrappers that translate UI intents
//          (fill, recolor, dissolve) into appendOp() calls.
//          Also holds getActiveColor() for reading palette state.
// Depends: appendOp(), state.palette, FOREST_GLASS
// Exposes: getActiveColor(), fillRegion(), recolorRegion(),
//          dissolveRegion()
// ============================================================

function getActiveColor() { return state.palette.selected; }

function fillRegion(fillId, vertices, edges) {
    // Use the last selected palette color as default; fall back to clear glass.
    var defaultColor = state.palette.selected || FOREST_GLASS;
    appendOp({ op:'fill', fillId:fillId, vertices:vertices, edges:edges, color:defaultColor, opacity:1.0 });
}
function recolorRegion(fillId, colorHex, opacity) {
    appendOp({ op:'repaint_fill', fillId:fillId, color:colorHex, opacity:(opacity !== undefined ? opacity : 1.0) });
}
function dissolveRegion(fillId) {
    appendOp({ op:'dissolve_fill', fillId:fillId });
}

// ============================================================
// FILL POLYGON + HIT TEST
// What:    Expands a fill record to a screen polygon (handling both
//          straight-edge and arc-edge fills), then provides a
//          point-in-polygon hit test used for color/dissolve actions.
// Depends: fills, points, circles, getAngle()
// Exposes: expandFillToPolygon(fill), pip(px,py,vertices),
//          hitFilledRegion(wx,wy)
// ============================================================

function expandFillToPolygon(fill) {
    if (fill.edges) {
        var poly = [];
        fill.edges.forEach(function(edge) {
            if (edge.type === 'seg') {
                var p = points.get(edge.a); if (p) poly.push({ x:p.x, y:p.y });
            } else {
                var ci = circles.get(edge.circIdx); if (!ci) return;
                var ce = points.get(ci.centerId); if (!ce) return;
                var r = ci.radius, aA = edge.angleA, sweep = edge.sweep;
                var n = Math.max(4, Math.ceil(Math.abs(sweep)*r/2));
                for (var i=0; i<n; i++) {
                    var tv = i/n, ang = aA + sweep*tv;
                    poly.push({ x:ce.x+Math.cos(ang)*r, y:ce.y+Math.sin(ang)*r });
                }
            }
        });
        return poly;
    }
    return fill.vertices.map(function(id) { return points.get(id); }).filter(Boolean);
}

function shoelaceArea(poly) {
    var a = 0;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        a += (poly[j].x + poly[i].x) * (poly[j].y - poly[i].y);
    }
    return Math.abs(a) / 2;
}

function pip(px,py,v) {
    var inside=false;
    for (var i=0,j=v.length-1; i<v.length; j=i++) {
        var xi=v[i].x,yi=v[i].y,xj=v[j].x,yj=v[j].y;
        if (((yi>py)!==(yj>py)) && px<(xj-xi)*(py-yi)/(yj-yi)+xi) inside=!inside;
    }
    return inside;
}

function hitFilledRegion(wx,wy) {
    var arr = [];
    fills.forEach(function(f) { if (!f.dissolved) arr.push(f); });
    // Sort by area ascending so smallest (topmost) fill is tested first
    arr.sort(function(a, b) {
        return shoelaceArea(expandFillToPolygon(a)) - shoelaceArea(expandFillToPolygon(b));
    });
    for (var i=0; i<arr.length; i++) {
        var v = expandFillToPolygon(arr[i]);
        if (v.length>=3 && pip(wx,wy,v)) return arr[i];
    }
    return null;
}

// ============================================================
// REGION DETECTION + FILL
// What:    Walks emphasized segments and arcs to detect a closed
//          region (every vertex must have exactly 2 emphasized edges).
//          On success, fires fillRegion() and clears emphasis.
//          checkAndDissolve() removes a fill whose border is tapped.
//          On first fill, auto-opens the color tool after a delay.
// Depends: logicalSegments, logicalArcs, circles, points, fills,
//          appendOp(), fillRegion(), dissolveRegion(),
//          playSound(), openColorTool() [cross-cut to UI],
//          getAngle(), normA()
// Exposes: findClosedRegionEdges(), checkAndFill(),
//          checkAndDissolve(segKey)
// ============================================================

function findClosedRegionEdges() {
    var adj = new Map();
    function addEdge(a,b,edge) {
        if (!adj.has(a)) adj.set(a,[]);
        if (!adj.has(b)) adj.set(b,[]);
        adj.get(a).push({ nb:b, edge:edge });
        adj.get(b).push({ nb:a, edge:edge });
    }
    logicalSegments.forEach(function(seg) {
        if (!seg.isEmphasized) return;
        addEdge(seg.pointAId, seg.pointBId, { type:'seg', a:seg.pointAId, b:seg.pointBId });
    });
    logicalArcs.forEach(function(arc) {
        if (!arc.isEmphasized) return;
        var ci=circles.get(arc.circIdx), ce=points.get(ci&&ci.centerId);
        if (!ci||!ce) return;
        var pA=points.get(arc.pointAId),pB=points.get(arc.pointBId);
        if (!pA||!pB) return;
        var aA=getAngle(pA.x,pA.y,ce), aB=getAngle(pB.x,pB.y,ce), sweep=normA(aB-aA);
        addEdge(arc.pointAId, arc.pointBId, { type:'arc', a:arc.pointAId, b:arc.pointBId, circIdx:arc.circIdx, angleA:aA, angleB:aB, sweep:sweep });
    });
    if (adj.size < 2) return null;
    // Prune orphan edges: iteratively remove degree-1 vertices (leaves)
    // until all remaining vertices have degree 2 (a clean cycle).
    var changed = true;
    while (changed) {
        changed = false;
        adj.forEach(function(nbs, v) {
            if (nbs.length === 1) {
                // Remove this vertex and its edge from the neighbor
                var nb = nbs[0].nb;
                var otherNbs = adj.get(nb);
                if (otherNbs) {
                    adj.set(nb, otherNbs.filter(function(c) { return c.nb !== v; }));
                }
                adj.delete(v);
                changed = true;
            } else if (nbs.length === 0) {
                adj.delete(v);
                changed = true;
            }
        });
    }
    if (adj.size < 2) return null;
    var ok = true;
    adj.forEach(function(nb) { if (nb.length !== 2) ok = false; });
    if (!ok) return null;
    var start = adj.keys().next().value;
    var orderedEdges = [], prevPt = null, curPt = start;
    while (true) {
        var conns = adj.get(curPt);
        var nextConn = (conns[0].nb === prevPt) ? conns[1] : conns[0];
        var edge = nextConn.edge;
        var directedEdge = { type:edge.type, a:curPt, b:nextConn.nb, circIdx:edge.circIdx, angleA:edge.angleA, angleB:edge.angleB, sweep:edge.sweep };
        if (directedEdge.type==='arc' && edge.a!==curPt) {
            directedEdge.angleA = edge.angleB;
            directedEdge.sweep  = -edge.sweep;
        }
        orderedEdges.push(directedEdge);
        if (nextConn.nb === start) break;
        if (orderedEdges.length > adj.size) return null;
        prevPt = curPt; curPt = nextConn.nb;
    }
    return orderedEdges.length === adj.size ? orderedEdges : null;
}

// ── The shape under a tap (2 Oct 2026, tap to fill at Glass 1: Circles) ──────────────
// The module has no notion of a face: findClosedRegionEdges only checks that the edges
// already leaded form one cycle. This finds the enclosed shape around a world point from
// the arrangement itself. The half-edges are every logical arc both ways and every logical
// segment both ways; vertices are point ids. From the point, go to the nearest edge; walk
// the boundary keeping the shape on the left (an arc anticlockwise when the point is
// inside its circle, clockwise when outside; a segment with the point on its left), and
// at every vertex take the next half-edge clockwise from the one we arrived by — the
// edges at a vertex ordered by their tangent direction there, two with the same tangent
// (circles touching at the vertex) ordered by curvature. A walk that closes with the
// shape on its left has a positive signed area and holds the point; one that traced the
// outside of something has a negative area and is abandoned for the next-nearest edge.
// A circle nothing crosses has no arcs in the graph; it is a candidate on its own, one
// arc of sweep 2π. Of every candidate that holds the point, the smallest wins, so a
// circle inside a shape fills itself and not the shape round it. Two circles that do not
// cross leave a ring: the walk finds the outer boundary and the fill covers the inner
// disc; the smallest-on-top order hides that, as it hides overlapping fills today — the
// same temporary fix, not region subtraction. The record it returns is exactly what
// checkAndFill writes, so nothing downstream knows the difference.
function findFaceAround(wx, wy) {
    var TAU = 2 * Math.PI;
    var E = [];
    logicalArcs.forEach(function(arc, key) {
        var ci = circles.get(arc.circIdx), ce = ci && points.get(ci.centerId); if (!ci || !ce) return;
        var pA = points.get(arc.pointAId), pB = points.get(arc.pointBId); if (!pA || !pB) return;
        var aA = getAngle(pA.x, pA.y, ce), aB = getAngle(pB.x, pB.y, ce), sweep = normA(aB - aA);
        if (sweep < 1e-9) sweep = TAU;
        E.push({ type:'arc', key:key, a:arc.pointAId, b:arc.pointBId, circIdx:arc.circIdx, ce:ce, r:ci.radius, aA:aA, aB:aB, sweep:sweep, pA:pA, pB:pB });
    });
    logicalSegments.forEach(function(seg, key) {
        var A = points.get(seg.pointAId), B = points.get(seg.pointBId); if (!A || !B) return;
        E.push({ type:'seg', key:key, a:seg.pointAId, b:seg.pointBId, pA:A, pB:B });
    });
    // distance from the point to the piece of edge, and which side of it the point is
    function edgeDist(e) {
        if (e.type === 'arc') {
            var t = getAngle(wx, wy, e.ce);
            if (e.sweep >= TAU - 1e-9 || angleBetween(t, e.aA, e.aB)) return Math.abs(dist(wx, wy, e.ce.x, e.ce.y) - e.r);
            return Math.min(dist(wx, wy, e.pA.x, e.pA.y), dist(wx, wy, e.pB.x, e.pB.y));
        }
        var cx = e.pB.x - e.pA.x, cy = e.pB.y - e.pA.y, lq = cx*cx + cy*cy; if (!lq) return Infinity;
        var tv = Math.max(0, Math.min(1, ((wx - e.pA.x)*cx + (wy - e.pA.y)*cy) / lq));
        return dist(wx, wy, e.pA.x + tv*cx, e.pA.y + tv*cy);
    }
    // the direction a half-edge leaves its start, and its curvature there (+ turning left)
    function start(h) { return h.dir > 0 ? h.e.a : h.e.b; }
    function end(h)   { return h.dir > 0 ? h.e.b : h.e.a; }
    function leaving(h) {
        var e = h.e;
        if (e.type === 'seg') { var P = h.dir > 0 ? e.pA : e.pB, Q = h.dir > 0 ? e.pB : e.pA; return { ang: Math.atan2(Q.y - P.y, Q.x - P.x), k: 0 }; }
        if (h.dir > 0) return { ang: e.aA + Math.PI / 2, k: 1 / e.r };
        return { ang: e.aB - Math.PI / 2, k: -1 / e.r };
    }
    function arriving(h) {   // the direction of travel on reaching the end
        var e = h.e;
        if (e.type === 'seg') return leaving(h).ang;
        return h.dir > 0 ? e.aB + Math.PI / 2 : e.aA - Math.PI / 2;
    }
    // every half-edge, indexed by its start vertex
    var H = [], at = {};
    E.forEach(function(e) {
        [1, -1].forEach(function(dir) { var h = { e:e, dir:dir }; H.push(h); var v = start(h); (at[v] = at[v] || []).push(h); });
    });
    function sameHalf(h, g) { return h.e === g.e && h.dir === g.dir; }
    // at a vertex: the half-edges in anticlockwise order, same tangent ordered by curvature
    function ordered(v) {
        var list = (at[v] || []).map(function(h) { var l = leaving(h); return { h:h, ang:normA(l.ang), k:l.k }; });
        list.sort(function(p, q) {
            var d = p.ang - q.ang;
            if (Math.abs(d) < 1e-6 || Math.abs(Math.abs(d) - TAU) < 1e-6) return p.k - q.k;
            return d;
        });
        return list;
    }
    function nextAfter(h) {
        var v = end(h), list = ordered(v);
        var twinIdx = -1;
        for (var i = 0; i < list.length; i++) if (list[i].h.e === h.e && list[i].h.dir === -h.dir) { twinIdx = i; break; }
        if (twinIdx < 0) return null;
        if (list.length === 1) return list[0].h;             // a dead end: turn back
        return list[(twinIdx - 1 + list.length) % list.length].h;
    }
    function walk(h0) {
        var cycle = [h0], h = h0, guard = H.length + 2;
        while (guard-- > 0) {
            var n = nextAfter(h); if (!n) return null;
            if (sameHalf(n, h0)) return cycle;
            cycle.push(n); h = n;
        }
        return null;
    }
    function record(cycle) {
        var edges = cycle.map(function(h) {
            var e = h.e;
            if (e.type === 'seg') return { type:'seg', a:start(h), b:end(h) };
            return h.dir > 0 ? { type:'arc', a:e.a, b:e.b, circIdx:e.circIdx, angleA:e.aA, angleB:e.aB, sweep:e.sweep }
                             : { type:'arc', a:e.b, b:e.a, circIdx:e.circIdx, angleA:e.aB, angleB:e.aA, sweep:-e.sweep };
        });
        var poly = expandFillToPolygon({ edges: edges });
        if (poly.length < 3) return null;
        var signed = 0;
        for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) signed += (poly[j].x + poly[i].x) * (poly[j].y - poly[i].y);
        signed = -signed / 2;   // positive when the boundary runs anticlockwise in world coordinates
        if (signed <= 0 || !pip(wx, wy, poly)) return null;
        return { edges: edges, vertices: edges.map(function(d) { return d.a; }), area: signed };
    }
    var best = null;
    // the arrangement: nearest edges first, each walked once with the shape on the left
    var byDist = E.map(function(e) { return { e:e, d:edgeDist(e) }; }).sort(function(p, q) { return p.d - q.d; });
    var tried = {};
    for (var i = 0; i < byDist.length && i < 24; i++) {
        var e = byDist[i].e, dir;
        if (e.type === 'arc') dir = dist(wx, wy, e.ce.x, e.ce.y) < e.r ? 1 : -1;
        else dir = ((e.pB.x - e.pA.x) * (wy - e.pA.y) - (e.pB.y - e.pA.y) * (wx - e.pA.x)) > 0 ? 1 : -1;
        var h0 = { e:e, dir:dir }, k = e.key + ':' + dir; if (tried[k]) continue; tried[k] = true;
        var cycle = walk(h0); if (!cycle) continue;
        cycle.forEach(function(h) { tried[h.e.key + ':' + h.dir] = true; });
        var face = record(cycle);
        if (face) { best = face; break; }
    }
    // circles nothing crosses: one arc, the whole way round
    circles.forEach(function(ci, idx) {
        if (ci.pointsOnCircle.length >= 2) return;
        var ce = points.get(ci.centerId); if (!ce) return;
        if (dist(wx, wy, ce.x, ce.y) >= ci.radius) return;
        var area = Math.PI * ci.radius * ci.radius;
        if (best && best.area <= area) return;
        var pid = ci.pointsOnCircle[0] || ci.edgeId, pt = points.get(pid);
        var a0 = pt ? getAngle(pt.x, pt.y, ce) : 0;
        best = { edges: [{ type:'arc', a:pid, b:pid, circIdx:idx, angleA:a0, angleB:a0, sweep:TAU }], vertices: [pid], area: area };
    });
    return best;
}

// Tap to fill: the shape under the tap takes the chosen colour, lead round it, as one
// fill op in the record checkAndFill writes. No lead is laid and nothing is lifted.
function fillFaceAt(wx, wy) {
    var face = findFaceAround(wx, wy); if (!face) return false;
    appendOp({ op:'fill', fillId:'fill:'+Date.now(), vertices:face.vertices, edges:face.edges, color:(state.palette.selected || FOREST_GLASS), opacity:1.0 });
    playSound('fill');
    return true;
}

function checkAndFill() {
    var edges = findClosedRegionEdges(); if (!edges) return;
    var fillId = 'fill:'+Date.now();
    var vertices = edges.map(function(e) { return e.a; });
    fillRegion(fillId, vertices, edges);
    var deKeys = [];
    logicalSegments.forEach(function(seg,k) { if (seg.isEmphasized) deKeys.push(k); });
    logicalArcs.forEach(function(arc,k)     { if (arc.isEmphasized) deKeys.push(k); });
    deKeys.forEach(function(k) { appendOp({ op:'deemphasize', key:k }); });
    playSound('fill');
}

function checkAndDissolve(segKey) {
    var seg = logicalSegments.get(segKey); if (!seg) return;
    fills.forEach(function(fill) {
        if (fill.dissolved) return;
        var v = fill.vertices;
        for (var i=0; i<v.length; i++) {
            var a=v[i],b=v[(i+1)%v.length];
            if ((a===seg.pointAId&&b===seg.pointBId)||(a===seg.pointBId&&b===seg.pointAId)) { dissolveRegion(fill.fillId); break; }
        }
    });
}

// ============================================================
// THE PLANE (shared)
// What:    The coordinate space both labs stand on. Since Phase 4 it
//          lives in ../js/plane.js — one file, two consumers, so the
//          labs cannot drift apart. This lab instantiates it with the
//          default view policy (origin-centred, zoom keyed to screen
//          size) and declares its unit frame at init replay.
// Depends: ../js/plane.js (CW.createPlane, CW.snap)
// Exposes: plane, canvas, ctx, resizeCanvas(), snap(v),
//          w2s(wx,wy), s2w(sx,sy) (aliases into the plane)
// ============================================================

var plane = CW.createPlane();

var canvas = $('canvas');
var ctx    = canvas.getContext('2d');

function resizeCanvas() {
    var dpr = window.devicePixelRatio || 1;
    var w = hostW();
    var h = hostH();
    // Embedded contexts can report a 0×0 window at load and deliver real
    // dimensions later without a resize event. Retry until they exist.
    if (!w || !h) { requestAnimationFrame(resizeCanvas); return; }
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    // Pin the CSS layout size to CSS pixels so canvas.clientWidth === hostW()
    // on all screens including Retina/HiDPI. Without this the layout box grows to
    // physical pixel dimensions and all coordinate math breaks on dpr > 1.
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    // Reset transform before scaling — prevents compounding on repeated calls
    // and ensures correct rendering on any DPI (Retina, 4K, standard).
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    plane.setViewport(w, h);
    // If the view was initialized while the viewport had no size, its zoom
    // is 0 (unusable); give it its first real default now.
    if (plane.zoom() === 0) plane.resetView();
}
onWin('resize', resizeCanvas);
resizeCanvas();

function snap(v) { return CW.snap(v); }
function w2s(wx,wy) { return plane.worldToScreen(wx,wy); }
function s2w(sx,sy) { return plane.screenToWorld(sx,sy); }

// ============================================================
// RENDER
// What:    Single rAF loop that clears and redraws every frame:
//          fills → construction lines/circles → emphasized segments/arcs
//          (with glow) → ghost previews → snap indicator → points.
//          Lead border is always rendered on fills.
// Depends: canvas, ctx, COLORS, PARAMS, GLOW, LEAD_BORDER_COLOR,
//          LEAD_WIDTH, fills, lines, circles, logicalSegments,
//          logicalArcs, points, pointAnimations,
//          showLines, showGlass, plane (zoom, transforms),
//          w2s(), s2w(), snap(), extLine(), expandFillToPolygon(),
//          ghostLineEnd, ghostCircle, snapTarget, firstTapPoint
// Exposes: render(), animate() — animate() self-schedules via rAF
// ============================================================

// ============================================================
// ERASER CURSOR
// What:    Draws the rounded-rectangle eraser shape at screen
//          position (x,y), rotated to follow drag direction.
//          Payne's gray fill, white outer border — from prototype.
// Depends: ctx, COLORS
// Exposes: drawEraserCursor(x, y, angle)
// ============================================================

function drawEraserCursor(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.92;
    // White outer border
    ctx.beginPath();
    ctx.roundRect(-10, -5.5, 20, 11, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fill();
    // Payne's gray inner fill
    ctx.beginPath();
    ctx.roundRect(-9, -4.5, 18, 9, 1.5);
    ctx.fillStyle = COLORS.border; // Payne's gray #546A80
    ctx.fill();
    ctx.restore();
}

function ptScale(id) {
    var a = pointAnimations.get(id); if (!a) return 1;
    var elapsed = Date.now()-a.startTime;
    if (elapsed >= a.duration) { pointAnimations.delete(id); return 1; }
    var tt = elapsed/a.duration;
    return PARAMS.birthScale - (PARAMS.birthScale-1)*(1-Math.pow(1-tt,3));
}

function extLine(p1,p2) {
    var dx=p2.x-p1.x,dy=p2.y-p1.y,len=Math.sqrt(dx*dx+dy*dy); if (!len) return null;
    var nx=dx/len,ny=dy/len,tl=s2w(0,0),br=s2w(canvas.clientWidth,canvas.clientHeight);
    var m=Math.max(Math.abs(br.x-tl.x),Math.abs(br.y-tl.y));
    return { x1:p1.x-nx*m,y1:p1.y-ny*m, x2:p1.x+nx*m,y2:p1.y+ny*m };
}

// Draw an emphasized segment or arc with a soft glow halo, then a crisp line on top.
function drawEmphasisPath(drawFn) {
    // Render as lead came — same visual as completed glass boundaries
    ctx.strokeStyle = LEAD_BORDER_COLOR;
    ctx.lineWidth   = LEAD_WIDTH;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.globalAlpha = 1;
    ctx.beginPath(); drawFn(); ctx.stroke();
}

function render() {
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

    // The drawing area's box (window profile), under everything the child has made
    if (APP) {
        var bx = drawingBox();
        ctx.strokeStyle = '#c8b89a'; ctx.lineWidth = 1; ctx.globalAlpha = 0.9;
        ctx.strokeRect(snap(bx.x) + 0.5, snap(bx.y) + 0.5, Math.round(bx.w), Math.round(bx.h));
        ctx.globalAlpha = 1;
    }

    // The ambient lattice, under everything the child has made
    if (mapShown && !showGlass) plane.drawLattice(ctx);

    // Sort fills by area descending (largest first, smallest on top)
    var sortedFills = [];
    fills.forEach(function(f) { if (!f.dissolved) sortedFills.push(f); });
    sortedFills.sort(function(a, b) {
        var polyA = expandFillToPolygon(a), polyB = expandFillToPolygon(b);
        return shoelaceArea(polyB) - shoelaceArea(polyA);
    });
    sortedFills.forEach(function(f) {
        var poly = expandFillToPolygon(f);
        var v = poly.map(function(p) { return w2s(p.x,p.y); });
        if (v.length < 3) return;
        ctx.beginPath(); ctx.moveTo(v[0].x,v[0].y);
        for (var i=1; i<v.length; i++) ctx.lineTo(v[i].x,v[i].y);
        ctx.closePath();
        ctx.fillStyle = f.color; ctx.globalAlpha = f.opacity; ctx.fill('evenodd');
        ctx.strokeStyle = LEAD_BORDER_COLOR; ctx.lineWidth = LEAD_WIDTH;
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.globalAlpha = 1; ctx.stroke();
        ctx.globalAlpha = 1;
    });

    if (showLines && !showGlass) {
        lines.forEach(function(l) {
            var p1=points.get(l.p1Id),p2=points.get(l.p2Id);
            var ext=extLine(p1,p2); if (!ext) return;
            var s1=w2s(ext.x1,ext.y1),s2=w2s(ext.x2,ext.y2);
            ctx.strokeStyle=COLORS.border; ctx.lineWidth=PARAMS.lineWidth;
            ctx.globalAlpha=l.isScaffold?PARAMS.scaffoldOpacity:1;
            ctx.beginPath(); ctx.moveTo(snap(s1.x),snap(s1.y)); ctx.lineTo(snap(s2.x),snap(s2.y)); ctx.stroke();
            ctx.globalAlpha=1;
        });
        circles.forEach(function(ci) {
            var ce=points.get(ci.centerId),sc=w2s(ce.x,ce.y),sr=ci.radius*plane.zoom();
            ctx.strokeStyle=COLORS.border; ctx.lineWidth=PARAMS.circleWidth;
            ctx.globalAlpha=ci.isScaffold?PARAMS.scaffoldOpacity:1;
            ctx.beginPath(); ctx.arc(sc.x,sc.y,sr,0,Math.PI*2); ctx.stroke();
            ctx.globalAlpha=1;
        });
    }

    // Connected-segment hover highlight
    // When a segment or arc was just tapped (is lastTapTarget), nearby segments
    // and arcs that share one of its endpoints glow in warm copper-amber —
    // showing what could be tapped next to continue building.
    if (lastTapTarget && (lastTapTarget.type === 'segment' || lastTapTarget.type === 'arc')) {
        var selObj = lastTapTarget.obj;
        var selPtA = selObj.pointAId, selPtB = selObj.pointBId;
        var sT2 = THRESHOLDS.lineHitRadius / plane.zoom();
        var cT2 = THRESHOLDS.circleHitRadius / plane.zoom();
        var worldMouse = s2w(mouseScreenPos.x, mouseScreenPos.y);

        // Highlight connected straight segments
        logicalSegments.forEach(function(seg) {
            var sharesEndpoint = (seg.pointAId===selPtA || seg.pointBId===selPtA ||
                                  seg.pointAId===selPtB || seg.pointBId===selPtB);
            var isSelf = lastTapTarget.type==='segment' &&
                         ((seg.pointAId===selPtA && seg.pointBId===selPtB) ||
                          (seg.pointAId===selPtB && seg.pointBId===selPtA));
            if (!sharesEndpoint || isSelf) return;
            if (seg.isEmphasized) return; // already selected — no hint needed
            var A2=points.get(seg.pointAId), B2=points.get(seg.pointBId); if (!A2||!B2) return;
            var cx3=B2.x-A2.x, cy3=B2.y-A2.y, lq3=cx3*cx3+cy3*cy3; if (!lq3) return;
            var pv3=Math.max(0,Math.min(1,((worldMouse.x-A2.x)*cx3+(worldMouse.y-A2.y)*cy3)/lq3));
            var d3=dist(worldMouse.x,worldMouse.y,A2.x+pv3*cx3,A2.y+pv3*cy3);
            if (d3 > sT2) return;
            var s1c=w2s(A2.x,A2.y), s2c=w2s(B2.x,B2.y);
            ctx.save();
            ctx.strokeStyle = '#c87d3a';
            ctx.lineWidth = 2.0;
            ctx.globalAlpha = 0.85;
            ctx.beginPath(); ctx.moveTo(snap(s1c.x),snap(s1c.y)); ctx.lineTo(snap(s2c.x),snap(s2c.y)); ctx.stroke();
            ctx.restore();
        });

        // Highlight connected arcs
        logicalArcs.forEach(function(arc) {
            var sharesEndpoint = (arc.pointAId===selPtA || arc.pointBId===selPtA ||
                                  arc.pointAId===selPtB || arc.pointBId===selPtB);
            var isSelf = lastTapTarget.type==='arc' &&
                         ((arc.pointAId===selPtA && arc.pointBId===selPtB) ||
                          (arc.pointAId===selPtB && arc.pointBId===selPtA));
            if (!sharesEndpoint || isSelf) return;
            if (arc.isEmphasized) return; // already selected — no hint needed
            var ci=circles.get(arc.circIdx); if (!ci) return;
            var ce=points.get(ci.centerId); if (!ce) return;
            var pA=points.get(arc.pointAId), pB=points.get(arc.pointBId); if (!pA||!pB) return;
            // Arc proximity: radial distance + angle between arc endpoints
            var d3=Math.abs(dist(worldMouse.x,worldMouse.y,ce.x,ce.y)-ci.radius);
            if (d3 > cT2) return;
            if (!angleBetween(getAngle(worldMouse.x,worldMouse.y,ce),getAngle(pA.x,pA.y,ce),getAngle(pB.x,pB.y,ce))) return;
            var sc2=w2s(ce.x,ce.y), sr2=ci.radius*plane.zoom();
            var aA=getAngle(pA.x,pA.y,ce), aB=getAngle(pB.x,pB.y,ce);
            ctx.save();
            ctx.strokeStyle = '#c87d3a';
            ctx.lineWidth = 2.0;
            ctx.globalAlpha = 0.85;
            // World y is up: world angle θ lands at screen angle −θ, and an
            // increasing world sweep runs anticlockwise on the canvas.
            ctx.beginPath(); ctx.arc(sc2.x,sc2.y,sr2,-aA,-aB,true); ctx.stroke();
            ctx.restore();
        });
    }

    // Emphasized segments — glow + crisp
    logicalSegments.forEach(function(seg) {
        if (!seg.isEmphasized) return;
        var A=points.get(seg.pointAId),B=points.get(seg.pointBId);
        var s1=w2s(A.x,A.y),s2=w2s(B.x,B.y);
        drawEmphasisPath(function() {
            ctx.moveTo(snap(s1.x),snap(s1.y)); ctx.lineTo(snap(s2.x),snap(s2.y));
        });
    });

    // Emphasized arcs — glow + crisp
    logicalArcs.forEach(function(arc) {
        if (!arc.isEmphasized) return;
        var ci=circles.get(arc.circIdx),ce=points.get(ci.centerId);
        var sc=w2s(ce.x,ce.y),sr=ci.radius*plane.zoom();
        var pA=points.get(arc.pointAId),pB=points.get(arc.pointBId);
        var aA=getAngle(pA.x,pA.y,ce),aB=getAngle(pB.x,pB.y,ce);
        drawEmphasisPath(function() {
            // y-up: world angles negate on screen, sweep runs anticlockwise
            ctx.arc(sc.x,sc.y,sr,-aA,-aB,true);
        });
    });

    if (ghostLineEnd && firstTapPoint) {
        var gw=s2w(ghostLineEnd.x,ghostLineEnd.y),ext=extLine(firstTapPoint,gw);
        if (ext) {
            var s1=w2s(ext.x1,ext.y1),s2=w2s(ext.x2,ext.y2);
            ctx.strokeStyle=COLORS.border; ctx.globalAlpha=0.4; ctx.lineWidth=PARAMS.lineWidth;
            ctx.beginPath(); ctx.moveTo(snap(s1.x),snap(s1.y)); ctx.lineTo(snap(s2.x),snap(s2.y)); ctx.stroke(); ctx.globalAlpha=1;
        }
    }
    if (ghostCircle) {
        var sc=w2s(ghostCircle.center.x,ghostCircle.center.y);
        ctx.strokeStyle=COLORS.border; ctx.globalAlpha=0.4; ctx.lineWidth=PARAMS.circleWidth;
        ctx.beginPath(); ctx.arc(sc.x,sc.y,ghostCircle.radius*plane.zoom(),0,Math.PI*2); ctx.stroke(); ctx.globalAlpha=1;
        if (MEASURE) drawMeasure(ghostCircle, sc);
    }
    if (snapTarget) {
        var s=w2s(snapTarget.x,snapTarget.y),pulse=0.7+0.3*Math.sin(Date.now()/200);
        ctx.strokeStyle=COLORS.active; ctx.lineWidth=3; ctx.globalAlpha=pulse;
        ctx.beginPath(); ctx.arc(s.x,s.y,8,0,Math.PI*2); ctx.stroke(); ctx.globalAlpha=1;
    }

    // Draw eraser cursor when active or briefly flashing after release
    var showEraserFlash = eraserFlash && (Date.now() - eraserFlashTime) < 350;
    if (showEraserFlash && !eraserFlash) eraserFlash = false; // auto-clear after flash
    if (eraserActive || showEraserFlash) {
        canvas.style.cursor = 'none';
        drawEraserCursor(mouseScreenPos.x, mouseScreenPos.y, eraserAngle);
    } else {
        // (state is declared below the render loop's first frame; hence the guard)
        canvas.style.cursor = (FILL_MODE === 'tap' && typeof state === 'object' && state && state.workspaceTools['palette'] && state.palette.selected !== null) ? RING_CURSOR : '';
    }

    // Just the glass (ledger §9): the finished window shows glass, lead and
    // notes — no points, no construction lines, no lattice.
    if (!showGlass) points.forEach(function(pt) {
        var s=w2s(pt.x,pt.y),sc=ptScale(pt.id),sm=(pt.type==='seed'?1.4:1.0);
        var ap = false;
        if (ghostCircle && snapTarget && snapTarget.id===pt.id) ap=true;
        if (!ap && ghostLineEnd && firstTapPoint) {
            var gw2=s2w(ghostLineEnd.x,ghostLineEnd.y);
            if (dist(pt.x,pt.y,gw2.x,gw2.y) < THRESHOLDS.pointHitRadius/plane.zoom()) ap=true;
        }
        // Cursor proximity hover: grow point when cursor is within POINT_HOVER_SCREEN px
        var screenDist = dist(mouseScreenPos.x, mouseScreenPos.y, s.x, s.y);
        var hovered = !eraserActive && screenDist < POINT_HOVER_SCREEN;
        // Base radius: 2px normal, 4px when hovered (ignoring seed multiplier for hover)
        var r = PARAMS.pointSize * sm * sc;
        if (hovered) r = Math.max(r, 4 * sm * sc);
        else if (ap) r = r * 1.33;
        ctx.fillStyle = COLORS.point;
        ctx.globalAlpha = pt.isScaffold ? PARAMS.scaffoldOpacity : 1;
        ctx.beginPath(); ctx.arc(s.x,s.y,r,0,Math.PI*2); ctx.fill();
        if (ap && !hovered) {
            ctx.globalAlpha = (pt.isScaffold ? PARAMS.scaffoldOpacity : 1) * 0.3;
            ctx.beginPath(); ctx.arc(s.x,s.y,r*2,0,Math.PI*2); ctx.fill();
        }
        ctx.globalAlpha = 1;
    });

    // Draw callout lines from canvas notes to their anchor points
    canvasNotes.forEach(function(cn) {
        if (!cn.open) return;
        var noteEl = root.querySelector('.canvas-note[data-note-id="' + cn.noteId + '"]');
        var noteS = w2s(cn.x, cn.y);
        var boxW = (cn.widthW ? cn.widthW * plane.zoom() : 200), boxH = (noteEl ? noteEl.offsetHeight : 60);
        var bx1 = noteS.x, by1 = noteS.y, bx2 = noteS.x + boxW, by2 = noteS.y + boxH;
        var bCx = (bx1 + bx2) / 2, bCy = (by1 + by2) / 2;

        function drawCallout(ax, ay) {
            var dx = ax - bCx, dy = ay - bCy;
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
            var scaleX = Math.abs(dx) > 0 ? ((boxW / 2) / Math.abs(dx)) : Infinity;
            var scaleY = Math.abs(dy) > 0 ? ((boxH / 2) / Math.abs(dy)) : Infinity;
            var sc = Math.min(scaleX, scaleY);
            var ex = bCx + dx * sc, ey = bCy + dy * sc;
            ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ax, ay); ctx.stroke();
            var angle = Math.atan2(ay - ey, ax - ex), aLen = 8;
            ctx.beginPath(); ctx.moveTo(ax, ay);
            ctx.lineTo(ax - aLen * Math.cos(angle - 0.4), ay - aLen * Math.sin(angle - 0.4));
            ctx.lineTo(ax - aLen * Math.cos(angle + 0.4), ay - aLen * Math.sin(angle + 0.4));
            ctx.closePath(); ctx.fill();
        }

        ctx.save();
        ctx.strokeStyle = '#546A80'; ctx.fillStyle = '#546A80'; ctx.globalAlpha = 0.8; ctx.lineWidth = 1;

        // Draw all anchors
        if (cn.anchors && cn.anchors.length) {
            cn.anchors.forEach(function(a) { var as = w2s(a.x, a.y); drawCallout(as.x, as.y); });
        }
        // Draw drag-in-progress line
        if (cn._anchorDragScreen) {
            drawCallout(cn._anchorDragScreen.x, cn._anchorDragScreen.y);
        }
        ctx.restore();
    });

    drawAxisLabels();

    // The pixel floor, part of the map's furniture
    if (mapShown && !showGlass) drawPixelFloorReadout();
}

// ============================================================
// AXIS LABELS
// What:    Detects the x-axis (the line through seed:0 and seed:1)
//          and optionally the y-axis (a line through seed:0 that is
//          perpendicular to the x-axis). For each axis, finds points
//          whose distance from seed:0 is a near-integer multiple of
//          the seed unit distance and returns label descriptors.
//          All integers are positive (map convention — no negatives).
//          Shown only in 'points' numbers mode — the ambient lattice
//          turned down reveals this — and never in glass mode/export.
// Depends: points, lines, mapShown, showGlass, w2s(), dist(),
//          plane (unitLength — declared by the lab at init replay)
// Exposes: getAxisLabels()
// ============================================================

function getAxisLabels() {
    // Emergent numbering shows in 'points' mode only: in 'map' mode the
    // lattice carries the numbers, and turning the map down reveals these.
    // Earned numbers render whenever the map is hidden (ledger §10).
    if (mapShown || showGlass) return [];
    var s0 = points.get('seed:0'), s1 = points.get('seed:1');
    if (!s0 || !s1) return [];
    // The unit interval is not measured from the model here: the lab declared
    // it to the plane when the init op replayed (decision 4). The seeds are
    // still read — deciding where labels go is this lab's own geometry work.
    var unit = plane.unitLength();
    if (unit < 1) return [];
    var tol = unit * 0.012; // 1.2% tolerance for float imprecision
    var labels = [];
    // Always label the seeds
    var sc0 = w2s(s0.x, s0.y);
    var sc1 = w2s(s1.x, s1.y);
    labels.push({ x: sc0.x, y: sc0.y, text: '0' });
    labels.push({ x: sc1.x, y: sc1.y, text: '1' });
    // X-axis direction vector (seed:0 → seed:1)
    var axDx = (s1.x - s0.x) / unit, axDy = (s1.y - s0.y) / unit;
    // Detect y-axis: a line that passes through seed:0 AND whose direction
    // is perpendicular to the x-axis (dot product ≈ 0). The line does NOT
    // need to be exactly vertical in screen space — perpendicular to the
    // seed line is the right definition.
    var yAxisLine = null;
    lines.forEach(function(l) {
        var p1 = points.get(l.p1Id), p2 = points.get(l.p2Id);
        if (!p1 || !p2) return;
        // Must pass through seed:0
        var passesThrough = false;
        if (l.p1Id === 'seed:0' || l.p2Id === 'seed:0') {
            passesThrough = true;
        } else {
            var ldx0 = p2.x-p1.x, ldy0 = p2.y-p1.y, llen0 = Math.sqrt(ldx0*ldx0+ldy0*ldy0);
            if (llen0 > 0 && Math.abs((ldy0*(s0.x-p1.x)-ldx0*(s0.y-p1.y))/llen0) < tol) passesThrough = true;
        }
        if (!passesThrough) return;
        // Must be perpendicular to x-axis
        var ldx = p2.x-p1.x, ldy = p2.y-p1.y, llen = Math.sqrt(ldx*ldx+ldy*ldy);
        if (!llen) return;
        var dot = Math.abs((ldx/llen)*axDx + (ldy/llen)*axDy);
        if (dot < 0.05) yAxisLine = l; // nearly perpendicular
    });
    // For each axis, walk all points and label near-integers
    function labelAxis(axisDx, axisDy, axisLine) {
        if (!axisLine) return;
        // Walk every known point and check if it lies on this axis line,
        // not just the ones already in pointsOnLine (which may lag for
        // intersection points on recently extended lines).
        points.forEach(function(pt) {
            var pid = pt.id;
            if (pid === 'seed:0') return; // 0 already labeled
            // Check if point lies on the axis line
            var lp1 = points.get(axisLine.p1Id), lp2 = points.get(axisLine.p2Id);
            if (!lp1 || !lp2) return;
            if (!ptOnLine(pt.x, pt.y, lp1, lp2)) return;
            // Projection along axis direction from seed:0
            var proj = (pt.x - s0.x)*axisDx + (pt.y - s0.y)*axisDy;
            var n = proj / unit;
            var nearest = Math.round(Math.abs(n)); // map convention: always positive
            if (nearest === 0) return;
            // Skip seed:1 (already labeled as 1)
            if (pid === 'seed:1') return;
            if (Math.abs(Math.abs(n) - nearest) < tol / unit) {
                var sc = w2s(pt.x, pt.y);
                labels.push({ x: sc.x, y: sc.y, text: String(nearest) });
            }
        });
    }
    // X-axis: always use the seed line itself as the axis
    // Find the line that contains both seeds
    var xAxisLine = null;
    lines.forEach(function(l) {
        if ((l.p1Id==='seed:0'||l.p2Id==='seed:0') && (l.p1Id==='seed:1'||l.p2Id==='seed:1')) xAxisLine = l;
        if (!xAxisLine && l.pointsOnLine.includes('seed:0') && l.pointsOnLine.includes('seed:1')) xAxisLine = l;
    });
    labelAxis(axDx, axDy, xAxisLine);
    // Y-axis: perpendicular through seed:0
    if (yAxisLine) {
        var p1y = points.get(yAxisLine.p1Id), p2y = points.get(yAxisLine.p2Id);
        var yldx = p2y.x-p1y.x, yldy = p2y.y-p1y.y, yllen = Math.sqrt(yldx*yldx+yldy*yldy);
        labelAxis(yldx/yllen, yldy/yllen, yAxisLine);
    }
    return labels;
}

function drawAxisLabels() {
    var labels = getAxisLabels();
    if (!labels.length) return;
    ctx.save();
    ctx.font = '10px Georgia, serif';
    ctx.fillStyle = '#546A80';
    ctx.globalAlpha = 0.72;
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';
    labels.forEach(function(lb) {
        ctx.fillText(lb.text, lb.x + 5, lb.y - 3);
    });
    ctx.restore();
}

var alive = true, rafId = 0;
// The circle measured as it is drawn (2 Oct 2026, measure: true): a thin radius from
// the centre to the point on the ghost in the direction of the hand — the cursor while
// free, the snap point once snapped — with its length beside it, and the area inside
// the circle near its bottom. Units are the plane's, where 0 to 1 is one. A render hint
// like the ghost itself: not in the log, not in replay, gone on release. The only
// rounding is at the ≈, two places; a whole number of units reads as one.
function measureText(word, v) {
    var n = Math.round(v);
    if (Math.abs(v - n) < 1e-9) return word + ': ' + CW.num.count(n);
    return word + ' ≈ ' + CW.num.decimal(Math.round(v * 100), 2);
}
function drawMeasure(g, sc) {
    var unit = plane.unitLength(); if (!(unit > 0)) return;
    var hand = snapTarget ? { x: snapTarget.x, y: snapTarget.y } : s2w(mouseScreenPos.x, mouseScreenPos.y);
    var dx = hand.x - g.center.x, dy = hand.y - g.center.y, len = Math.sqrt(dx*dx + dy*dy); if (!len) return;
    var ex = g.center.x + dx / len * g.radius, ey = g.center.y + dy / len * g.radius;
    var se = w2s(ex, ey);
    ctx.save();
    ctx.strokeStyle = COLORS.border; ctx.lineWidth = PARAMS.lineWidth; ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.moveTo(snap(sc.x), snap(sc.y)); ctx.lineTo(snap(se.x), snap(se.y)); ctx.stroke();
    ctx.font = '11px Georgia, serif'; ctx.fillStyle = '#546A80'; ctx.globalAlpha = 0.85;
    // the radius label off the line, on the side away from the hand: beside the line's
    // nearer half, offset to whichever perpendicular points up the screen
    var vx = se.x - sc.x, vy = se.y - sc.y, vl = Math.sqrt(vx*vx + vy*vy) || 1;
    var px = -vy / vl, py = vx / vl; if (py > 0) { px = -px; py = -py; }
    var lx = sc.x + vx * 0.4 + px * 12, ly = sc.y + vy * 0.4 + py * 12;
    ctx.textAlign = (px < 0) ? 'right' : 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(measureText('radius', g.radius / unit), lx, ly);
    // the area near the bottom of the circle, centred, only where there is room for it
    var sr = g.radius * plane.zoom(), ay = sc.y + sr - 16;
    if (sr > 48 && ay > 12 && ay < canvas.clientHeight - 6 && sc.x > 40 && sc.x < canvas.clientWidth - 40) {
        var ru = g.radius / unit;
        ctx.textAlign = 'center';
        ctx.fillText(measureText('area', Math.PI * ru * ru), sc.x, ay);
    }
    ctx.restore();
}

// Reset view (window profile) is present only while the view is away from its home.
var resetShown = false;
function watchView() {
    if (!APP) return;
    var v = plane.view(), home = Math.min(canvas.clientWidth, canvas.clientHeight) / 900;
    var away = Math.abs(v.x) > 0.5 || Math.abs(v.y) > 0.5 || Math.abs(v.zoom - home) > 1e-6;
    if (away !== resetShown) { resetShown = away; setWordPresent($('reset-view'), away); }
}
function animate() { if (!alive) return; render(); watchView(); rafId = requestAnimationFrame(animate); }
animate();

// ============================================================
// HIT TESTING
// What:    Screen-space hit detection for points, logical segments,
//          logical arcs, bare circles, and any underlying line.
//          Also findSnap() for circle-drag radius snapping.
//          All radii are converted from screen px to world units
//          using plane.zoom() so they stay consistent at any zoom.
// Depends: THRESHOLDS, points, lines, circles,
//          logicalSegments, logicalArcs, plane,
//          dist(), ptOnLine(), getAngle(), angleBetween()
// Exposes: hitPt(wx,wy), hitLC(wx,wy), hitAnyLine(wx,wy),
//          findSnap(centerPt, radius)
// ============================================================

function hitPt(wx,wy) {
    var t=THRESHOLDS.pointHitRadius/plane.zoom(), tFade=t*0.5, found=null;
    points.forEach(function(p) {
        var r = p.isScaffold ? tFade : t;
        if (dist(wx,wy,p.x,p.y)<r) found=p;
    });
    return found;
}

function hitLC(wx,wy) {
    var cT=THRESHOLDS.circleHitRadius/plane.zoom(), sT=THRESHOLDS.lineHitRadius/plane.zoom();
    var cTf=cT*0.5, sTf=sT*0.5; // halved thresholds for faded (scaffold) elements
    var bA=null, bAd=Infinity;
    logicalArcs.forEach(function(arc) {
        var ci=circles.get(arc.circIdx),ce=points.get(ci.centerId);
        var thresh = ci.isScaffold ? cTf : cT;
        var d=Math.abs(dist(wx,wy,ce.x,ce.y)-ci.radius);
        if (d>=thresh||d>=bAd) return;
        var pA=points.get(arc.pointAId),pB=points.get(arc.pointBId);
        if (angleBetween(getAngle(wx,wy,ce),getAngle(pA.x,pA.y,ce),getAngle(pB.x,pB.y,ce))) { bA=arc; bAd=d; }
    });
    if (bA) return { type:'arc', obj:bA };
    var bC=null, bCd=Infinity;
    circles.forEach(function(ci) {
        if (ci.pointsOnCircle.length>=2) return;
        var ce=points.get(ci.centerId);
        var thresh = ci.isScaffold ? cTf : cT;
        var d=Math.abs(dist(wx,wy,ce.x,ce.y)-ci.radius);
        if (d<thresh&&d<bCd) { bC=ci; bCd=d; }
    });
    if (bC) return { type:'circle', obj:bC };
    var bS=null, bSd=Infinity;
    logicalSegments.forEach(function(seg) {
        var parentLine = lines.get(seg.lineIdx);
        var thresh = (parentLine && parentLine.isScaffold) ? sTf : sT;
        var A=points.get(seg.pointAId),B=points.get(seg.pointBId);
        var cx=B.x-A.x,cy=B.y-A.y,lq=cx*cx+cy*cy; if (!lq) return;
        var pv=Math.max(0,Math.min(1,((wx-A.x)*cx+(wy-A.y)*cy)/lq));
        var d=dist(wx,wy,A.x+pv*cx,A.y+pv*cy);
        if (d<thresh&&d<bSd) { bS=seg; bSd=d; }
    });
    if (bS) return { type:'segment', obj:bS };
    return null;
}

function hitAnyLine(wx,wy) {
    var t=THRESHOLDS.lineHitRadius/plane.zoom(), tFade=t*0.5, found=false;
    lines.forEach(function(l) {
        var thresh = l.isScaffold ? tFade : t;
        var p1=points.get(l.p1Id),p2=points.get(l.p2Id);
        var dx=p2.x-p1.x,dy=p2.y-p1.y,lq=dx*dx+dy*dy; if (!lq) return;
        var tv=((wx-p1.x)*dx+(wy-p1.y)*dy)/lq;
        if (dist(wx,wy,p1.x+tv*dx,p1.y+tv*dy)<thresh) found=true;
    });
    return found;
}

function findSnap(cp,cr) {
    var t=THRESHOLDS.snapDistance/plane.zoom();
    // Collect all candidate snap points (within threshold of the circle arc)
    var candidates = [];
    points.forEach(function(p) {
        if (p.id===cp.id) return;
        var d=Math.abs(dist(cp.x,cp.y,p.x,p.y)-cr);
        if (d<t) candidates.push(p);
    });
    if (candidates.length === 0) return null;
    // Return only the candidate nearest to the current cursor position
    var cursorWorld = s2w(mouseScreenPos.x, mouseScreenPos.y);
    var best = null, bestDist = Infinity;
    candidates.forEach(function(p) {
        var d = dist(p.x, p.y, cursorWorld.x, cursorWorld.y);
        if (d < bestDist) { best = p; bestDist = d; }
    });
    return best;
}

// ============================================================
// SEGMENT AUTO-COMPLETE
// What:    When a clicked segment is not adjacent to any emphasized
//          segment, BFS for the unique shortest path (≤6 segments)
//          from the most recently emphasized segment. Returns array
//          of keys to emphasize (including clicked), or null.
// ============================================================

function _segEndpoints(key) {
    var seg = logicalSegments.get(key);
    if (seg) return [seg.pointAId, seg.pointBId];
    var arc = logicalArcs.get(key);
    if (arc) return [arc.pointAId, arc.pointBId];
    return null;
}

function _segIsEmphasized(key) {
    var seg = logicalSegments.get(key);
    if (seg) return seg.isEmphasized;
    var arc = logicalArcs.get(key);
    if (arc) return arc.isEmphasized;
    return false;
}

function tryAutoComplete(clickedKey) {
    var clickedPts = _segEndpoints(clickedKey);
    if (!clickedPts) return null;

    // Check if clicked segment is adjacent to any emphasized segment
    var anyAdjacent = false;
    var lastEmphasizedKey = null;
    // Walk log backwards to find the most recently emphasized segment
    for (var i = operationLog.length - 1; i >= 0; i--) {
        var op = operationLog[i];
        if (op.op === 'emphasize') {
            if (_segIsEmphasized(op.key)) {
                if (!lastEmphasizedKey) lastEmphasizedKey = op.key;
                var pts = _segEndpoints(op.key);
                if (pts && (pts.includes(clickedPts[0]) || pts.includes(clickedPts[1]))) {
                    anyAdjacent = true;
                    break;
                }
            }
        }
    }
    if (anyAdjacent || !lastEmphasizedKey) return null;

    // Build adjacency: for each segment/arc key, list of neighbor keys sharing an endpoint
    var allKeys = [];
    var ptToKeys = {}; // pointId → [key, ...]
    logicalSegments.forEach(function(seg, k) {
        allKeys.push(k);
        [seg.pointAId, seg.pointBId].forEach(function(pid) {
            if (!ptToKeys[pid]) ptToKeys[pid] = [];
            ptToKeys[pid].push(k);
        });
    });
    logicalArcs.forEach(function(arc, k) {
        allKeys.push(k);
        [arc.pointAId, arc.pointBId].forEach(function(pid) {
            if (!ptToKeys[pid]) ptToKeys[pid] = [];
            ptToKeys[pid].push(k);
        });
    });

    function neighbors(key) {
        var pts = _segEndpoints(key);
        if (!pts) return [];
        var nb = {};
        pts.forEach(function(pid) {
            (ptToKeys[pid] || []).forEach(function(k) { if (k !== key) nb[k] = true; });
        });
        return Object.keys(nb);
    }

    // BFS from lastEmphasizedKey to clickedKey, max 6 hops.
    // Track visited-at-depth to allow multiple paths at the same depth (for ambiguity detection).
    var MAX_LEN = 6;
    var queue = [[lastEmphasizedKey]];
    var visitedAtDepth = {}; visitedAtDepth[lastEmphasizedKey] = 1;
    var foundPaths = [];
    var foundLen = Infinity;

    while (queue.length > 0) {
        var path = queue.shift();
        if (path.length > MAX_LEN || path.length > foundLen) break;

        var last = path[path.length - 1];
        var nbs = neighbors(last);
        for (var n = 0; n < nbs.length; n++) {
            var nb = nbs[n];
            var newLen = path.length + 1;
            if (nb === clickedKey) {
                if (newLen <= MAX_LEN) {
                    if (foundPaths.length === 0) foundLen = newLen;
                    if (newLen === foundLen) foundPaths.push(path.concat([nb]));
                    if (foundPaths.length > 1) return null; // ambiguous
                }
                continue;
            }
            // Allow visiting at same depth (to find multiple paths), but not at greater depth
            if (visitedAtDepth[nb] !== undefined && visitedAtDepth[nb] <= newLen) continue;
            if (newLen >= foundLen) continue;
            visitedAtDepth[nb] = newLen;
            queue.push(path.concat([nb]));
        }
    }

    if (foundPaths.length !== 1) return null;

    // Return intermediate + clicked keys to emphasize (skip lastEmphasizedKey which is already emphasized)
    var result = foundPaths[0].slice(1); // remove the start (already emphasized)
    // Filter out already-emphasized segments
    return result.filter(function(k) { return !_segIsEmphasized(k); });
}

// ============================================================
// PALETTE ACTION HELPER
// What:    Single entry point for pointer-up on a filled region.
//          Dispatches to dissolve (empty swatch active) or recolor
//          (color swatch active). Returns true if action was taken
//          so the interaction state machine can short-circuit.
// Depends: hitFilledRegion(), dissolveRegion(), recolorRegion(),
//          playSound(), state.palette
// Exposes: tryPaletteAction(wx, wy) → boolean
// ============================================================

// The window profile's tap (Michael, 8 Oct 2026): colour always goes to the smallest shape enclosing
// the tap, whatever was coloured before — a circle drawn across a coloured pane changes the pane's
// shape. Remove takes glass away the same way, to the edges of the shape. A shape that already has
// its own glass is repainted or dissolved; a shape inside older glass gets glass of its own, or,
// for Remove, a pane of the board's own colour so the glass under it is gone to the shape's edges.
function fillWithFace(face) {
    var want = face.vertices.slice().sort().join(','), found = null;
    fills.forEach(function(f) {
        if (found || f.dissolved) return;
        if (f.vertices.slice().sort().join(',') !== want) return;
        var a = shoelaceArea(expandFillToPolygon(f));
        if (Math.abs(a - face.area) <= 1e-6 * Math.max(1, face.area)) found = f;
    });
    return found;
}
function windowTap(wx, wy) {
    var face = findFaceAround(wx, wy); if (!face) return false;
    var own = fillWithFace(face);
    if (state.palette.selected === REMOVE) {
        if (!own && !hitFilledRegion(wx, wy)) return false;   // nothing under the tap to take away
        if (isStepThroughActive()) forkStepThrough();
        if (own) dissolveRegion(own.fillId);
        else appendOp({ op:'fill', fillId:'fill:'+Date.now(), vertices:face.vertices, edges:face.edges, color:COLORS.background, opacity:1.0 });
        playSound('repaint'); return true;
    }
    if (isStepThroughActive()) forkStepThrough();             // her first mark ends the demo there
    var colour = state.palette.selected || FOREST_GLASS;
    if (own) { recolorRegion(own.fillId, colour, 1.0); playSound('repaint'); return true; }
    appendOp({ op:'fill', fillId:'fill:'+Date.now(), vertices:face.vertices, edges:face.edges, color:colour, opacity:1.0 });
    playSound('fill'); return true;
}

function tryPaletteAction(wx, wy) {
    var hf = hitFilledRegion(wx, wy);
    if (!hf) return false;
    if (state.palette.selected !== null) {
        recolorRegion(hf.fillId, state.palette.selected, 1.0); playSound('repaint'); return true;
    }
    return false;
}

// ============================================================
// INTERACTION STATE MACHINE
// What:    Unified pointer/touch/mouse handler with states:
//          IDLE → POINT_PRESSED → AWAITING_SECOND_TAP (line drawing)
//                              → DRAGGING_CIRCLE (circle drawing)
//          Double-tap empty = new construction confirm.
//          Single tap empty = undo. Drag canvas = pan.
//          Wheel = zoom. Drop file = load construction.
//          Delegates color/dissolve actions to tryPaletteAction().
// Depends: canvas, THRESHOLDS, s2w(), dist(),
//          hitPt(), hitLC(), hitAnyLine(), hitFilledRegion(),
//          tryPaletteAction(), findSnap(),
//          appendOp(), undoOp(), newConstruction(), _loadFromFile(),
//          playSound(), unlockAudio(),
//          checkAndFill(), checkAndDissolve(),
//          plane (pan/zoom via API),
//          ghostLineEnd, ghostCircle, snapTarget (mutable render hints)
// Exposes: interactionState, ghostLineEnd, ghostCircle, snapTarget
//          (all read by RENDER)
// ============================================================

var interactionState='IDLE', selectedPoint=null, firstTapPoint=null;
var ghostLineEnd=null, ghostCircle=null, snapTarget=null;
var pointerStart=null, lastTapTime=0, lastTapTarget=null;
var isPanning=false, panStart=null;

// ── Eraser state ─────────────────────────────────────────────────────────────
var eraserActive    = false; // true while sweep drag is in progress
var eraserAngle     = -0.45; // rotation of eraser rect, follows drag direction
var eraserSweepMode = null;  // 'fade' | 'restore', locked at sweep start
var eraserTouched   = new Set(); // lineIdx values already handled this sweep
var eraserFlash     = false; // brief cursor flash after double-click or sweep release
var eraserFlashTime = 0;
// eraserCandidate: set in onDown when a double-click-on-same-segment is detected.
// Stores { lineIdx } to identify the seed line. Sweep activates in onMove if drag occurs.
var eraserCandidate = null;

// ── Mouse position (screen px) for eraser cursor rendering and point hover ──────
var mouseScreenPos = { x: 0, y: 0 };

// Points grow from 2px to 4px when cursor is within this many screen pixels.
var POINT_HOVER_SCREEN = 12;

var activeTouches = new Map(); // track multi-touch for pinch-to-zoom
var pinchBaseDist = null, pinchBaseScale = null;

function getPos(e) {
    var r=canvas.getBoundingClientRect();
    return { x:e.clientX-r.left, y:e.clientY-r.top };
}

function onDown(e) {
    if (e.target !== canvas) return;
    if (!inDrawingBox(getPos(e))) return;   // outside the drawing area nothing starts (window profile)
    e.preventDefault(); unlockAudio();
    if (document.activeElement !== root && !root.contains(document.activeElement)) { try { root.focus({ preventScroll: true }); } catch (err) { root.focus(); } }
    // A tap during play skips to the end and closes the panel (ledger §15)
    // — consumed entirely; it draws nothing.
    if (replayPlaying) { skipReplayToEnd(); return; }
    canvas.setPointerCapture(e.pointerId);
    activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Pinch-to-zoom: if two pointers are down, start pinch mode
    if (activeTouches.size === 2) {
        var pts = Array.from(activeTouches.values());
        pinchBaseDist = dist(pts[0].x, pts[0].y, pts[1].x, pts[1].y);
        pinchBaseScale = plane.zoom();
        return;
    }
    if (activeTouches.size > 2) return; // ignore 3+ fingers

    var pos=getPos(e), world=s2w(pos.x,pos.y), now=Date.now();
    pointerStart=pos;
    mouseScreenPos.x = pos.x; mouseScreenPos.y = pos.y;
    eraserCandidate = null; // clear any leftover candidate

    // ── 0. Just the glass: the finished window. A tap colours glass or pans; it
    //      never starts a line, lays lead, places a note undoes, or forks a replay (Michael, 2 Oct 2026).
    if (showGlass) {
        if (interactionState==='AWAITING_SECOND_TAP') { ghostLineEnd=null; firstTapPoint=null; interactionState='IDLE'; selectedPoint=null; }
        isPanning=true; panStart={ pan:plane.pan(), sx:pos.x, sy:pos.y };
        return;
    }

    // ── Fork step-through if child interacts ──────────────────────────────────
    if (isStepThroughActive()) {
        var hp0 = hitPt(world.x, world.y);
        var hl0 = hitLC(world.x, world.y);
        if (hp0 || hl0) { forkStepThrough(); }
    }

    // ── 1. Point hit ─────────────────────────────────────────────────────────────
    var hp=hitPt(world.x,world.y);
    if (hp) {
        selectedPoint=hp;
        interactionState=(interactionState==='AWAITING_SECOND_TAP')?'AWAITING_SECOND_TAP':'POINT_PRESSED';
        return;
    }

    // ── 2. Logical segment / arc hit (bounded by two construction points) ─────────
    // These are selectable (single click) and fadeable (double click).
    var hl=hitLC(world.x,world.y);
    if (hl && (hl.type==='segment' || hl.type==='arc')) {
        // Tap to fill (2 Oct 2026): an edge belongs to two shapes, so a tap on it lays no
        // lead and starts nothing; the shape is tapped inside.
        if (FILL_MODE === 'tap') { lastTapTarget=null; return; }
        // Check for double-click on the same segment — could be fade or sweep start
        var isSameAsLast = false;
        if (lastTapTarget && lastTapTarget.type===hl.type && now-lastTapTime<THRESHOLDS.doubleClickTime) {
            if (hl.type==='segment') isSameAsLast=(hl.obj.pointAId===lastTapTarget.obj.pointAId&&hl.obj.pointBId===lastTapTarget.obj.pointBId);
            if (hl.type==='arc')     isSameAsLast=(hl.obj.pointAId===lastTapTarget.obj.pointAId&&hl.obj.pointBId===lastTapTarget.obj.pointBId);
        }
        if (isSameAsLast) {
            // Potential double-click. Clear all emphasis immediately so the glow
            // disappears on the second mousedown rather than waiting for release.
            var dcDeKeys = [];
            logicalSegments.forEach(function(seg,k) { if (seg.isEmphasized) dcDeKeys.push(k); });
            logicalArcs.forEach(function(arc,k)     { if (arc.isEmphasized) dcDeKeys.push(k); });
            dcDeKeys.forEach(function(k) { appendOp({ op:'deemphasize', key:k }); });
            // Record enough info for onUp (fade) or onMove (sweep).
            // lineIdx = the underlying line/circle index; isCircle distinguishes them.
            eraserCandidate = {
                lineIdx: hl.type==='segment' ? hl.obj.lineIdx : hl.obj.circIdx,
                isCircle: hl.type==='arc',
                hit: hl
            };
            eraserFlash = true; eraserFlashTime = Date.now();
        } else {
            lastTapTarget = hl; lastTapTime = now;
        }
        return;
    }

    // ── 3. Bare line hit (no construction points yet, not in logicalSegments) ──────
    // Not selectable. Double-click fades/restores; double-click+drag sweeps.
    var bareHit = hitForEraser(world.x, world.y);
    var bareIdx = (bareHit && !bareHit.isCircle) ? bareHit.idx : -1;
    if (bareIdx >= 0) {
        if (FILL_MODE === 'tap') { lastTapTarget=null; return; }
        var bareLast = lastTapTarget && lastTapTarget.type==='bare' && lastTapTarget.obj===bareIdx;
        if (bareLast && now-lastTapTime<THRESHOLDS.doubleClickTime) {
            eraserCandidate = { lineIdx: bareIdx, hit: null };
            eraserFlash = true; eraserFlashTime = Date.now();
        } else {
            lastTapTarget = { type:'bare', obj: bareIdx }; lastTapTime = now;
        }
        return;
    }

    // ── 4. Palette action on fills ───────────────────────────────────────────
    var paletteActive = state.palette.selected !== null;
    if (paletteActive && hitFilledRegion(world.x, world.y)) {
        if (interactionState==='AWAITING_SECOND_TAP') { ghostLineEnd=null; firstTapPoint=null; interactionState='IDLE'; selectedPoint=null; }
        isPanning=true; panStart={ pan:plane.pan(), sx:pos.x, sy:pos.y };
        return;
    }

    // ── 5. Empty space ────────────────────────────────────────────────────────
    if (interactionState==='AWAITING_SECOND_TAP') { ghostLineEnd=null; firstTapPoint=null; interactionState='IDLE'; selectedPoint=null; return; }
    isPanning=true; panStart={ pan:plane.pan(), sx:pos.x, sy:pos.y };
}

function onMove(e) {
    e.preventDefault();
    if (activeTouches.has(e.pointerId)) {
        activeTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // Pinch-to-zoom: update scale when two pointers are active
    if (activeTouches.size === 2 && pinchBaseDist) {
        var pts = Array.from(activeTouches.values());
        var curDist = dist(pts[0].x, pts[0].y, pts[1].x, pts[1].y);
        plane.setZoom(pinchBaseScale * (curDist / pinchBaseDist));
        syncCanvasNoteDOMs();
        return;
    }

    var pos=getPos(e), world=s2w(pos.x,pos.y);
    mouseScreenPos.x = pos.x; mouseScreenPos.y = pos.y;

    // ── Eraser candidate: activate sweep if drag exceeds threshold ───────────────
    if (eraserCandidate && !eraserActive) {
        if (dist(pointerStart.x, pointerStart.y, pos.x, pos.y) > THRESHOLDS.tapMovement) {
            var seedObj = eraserCandidate.isCircle
                ? circles.get(eraserCandidate.lineIdx)
                : lines.get(eraserCandidate.lineIdx);
            if (seedObj) {
                eraserActive    = true;
                eraserSweepMode = seedObj.isScaffold ? 'restore' : 'fade';
                eraserTouched   = new Set();
                lastTapTime     = 0;
                // Clear all emphasis — entering sweep mode exits loop-building
                var sweepDeKeys = [];
                logicalSegments.forEach(function(seg,k) { if (seg.isEmphasized) sweepDeKeys.push(k); });
                logicalArcs.forEach(function(arc,k)     { if (arc.isEmphasized) sweepDeKeys.push(k); });
                sweepDeKeys.forEach(function(k) { appendOp({ op:'deemphasize', key:k }); });
                eraserSweepHit(eraserCandidate.lineIdx, eraserCandidate.isCircle);
            }
            eraserCandidate = null;
        }
    }

    // ── Eraser active sweep ────────────────────────────────────────────────────────
    if (eraserActive) {
        // Track angle from movement delta for eraser cursor rotation
        var prevX = mouseScreenPos.x - (e.movementX||0);
        var prevY = mouseScreenPos.y - (e.movementY||0);
        var dex = pos.x - prevX, dey = pos.y - prevY;
        if (Math.sqrt(dex*dex+dey*dey) > 1.5) eraserAngle = Math.atan2(dey, dex) + Math.PI / 2;
        // Apply fade/restore to any line under the cursor
        var sweepHit = hitForEraser(world.x, world.y);
        if (sweepHit) eraserSweepHit(sweepHit.idx, sweepHit.isCircle);
        return;
    }

    if (isPanning && panStart) {
        // y-up: screen-down drag carries the pan point up in world terms
        plane.setPan(panStart.pan.x - (pos.x-panStart.sx)/plane.zoom(),
                     panStart.pan.y + (pos.y-panStart.sy)/plane.zoom());
        syncCanvasNoteDOMs();
        return;
    }
    if (interactionState==='POINT_PRESSED' && dist(pointerStart.x,pointerStart.y,pos.x,pos.y)>THRESHOLDS.tapMovement) interactionState='DRAGGING_CIRCLE';
    if (interactionState==='DRAGGING_CIRCLE' && selectedPoint) {
        var r=dist(selectedPoint.x,selectedPoint.y,world.x,world.y);
        ghostCircle={ center:selectedPoint,radius:r };
        var prev=snapTarget; snapTarget=findSnap(selectedPoint,r);
        if (snapTarget) { ghostCircle.radius=dist(selectedPoint.x,selectedPoint.y,snapTarget.x,snapTarget.y); if (!prev||prev.id!==snapTarget.id) playSound('snap'); }
    }
    if (interactionState==='AWAITING_SECOND_TAP' && firstTapPoint) ghostLineEnd=pos;
}

// When fading a line, also fade its points — unless the point is on a labeled
// axis or is shared with another non-faded line/circle.
// When restoring, do NOT cascade to points.
function fadePointsForLine(lineIdx) {
    var l = lines.get(lineIdx); if (!l) return;
    var axisPointIds = getAxisPointIds();
    l.pointsOnLine.forEach(function(ptId) {
        var pt = points.get(ptId); if (!pt || pt.isScaffold) return;
        if (axisPointIds.has(ptId)) return; // axis point — don't fade
        // Check if point is on any other non-scaffolded line
        var shared = false;
        lines.forEach(function(other, otherIdx) {
            if (otherIdx === lineIdx || other.isScaffold) return;
            if (other.pointsOnLine.includes(ptId)) shared = true;
        });
        if (shared) return;
        // Check if point is on any non-scaffolded circle
        circles.forEach(function(c) {
            if (c.isScaffold) return;
            if (c.pointsOnCircle.includes(ptId)) shared = true;
        });
        if (shared) return;
        appendOp({ op:'scaffold', target:'point', idx:ptId, value:true });
    });
}

function fadePointsForCircle(circIdx) {
    var c = circles.get(circIdx); if (!c) return;
    var axisPointIds = getAxisPointIds();
    c.pointsOnCircle.forEach(function(ptId) {
        var pt = points.get(ptId); if (!pt || pt.isScaffold) return;
        if (axisPointIds.has(ptId)) return;
        var shared = false;
        lines.forEach(function(other) {
            if (other.isScaffold) return;
            if (other.pointsOnLine.includes(ptId)) shared = true;
        });
        if (shared) return;
        circles.forEach(function(otherC, otherIdx) {
            if (otherIdx === circIdx || otherC.isScaffold) return;
            if (otherC.pointsOnCircle.includes(ptId)) shared = true;
        });
        if (shared) return;
        appendOp({ op:'scaffold', target:'point', idx:ptId, value:true });
    });
}

// Returns a Set of point IDs that lie on labeled axes (should not be faded).
function getAxisPointIds() {
    var ids = new Set();
    var s0 = points.get('seed:0'), s1 = points.get('seed:1');
    if (!s0 || !s1) return ids;
    // Find x-axis line (through both seeds)
    var xAxisLine = null;
    lines.forEach(function(l) {
        if ((l.p1Id==='seed:0'||l.p2Id==='seed:0') && (l.p1Id==='seed:1'||l.p2Id==='seed:1')) xAxisLine = l;
        if (!xAxisLine && l.pointsOnLine.includes('seed:0') && l.pointsOnLine.includes('seed:1')) xAxisLine = l;
    });
    if (xAxisLine) xAxisLine.pointsOnLine.forEach(function(id) { ids.add(id); });
    // Find y-axis line (perpendicular through seed:0); unit from the plane
    var unit = plane.unitLength(); if (!unit) return ids;
    var axDx = (s1.x - s0.x) / unit, axDy = (s1.y - s0.y) / unit;
    lines.forEach(function(l) {
        var p1 = points.get(l.p1Id), p2 = points.get(l.p2Id); if (!p1 || !p2) return;
        var onOrigin = l.p1Id === 'seed:0' || l.p2Id === 'seed:0';
        if (!onOrigin) {
            var ldx0 = p2.x-p1.x, ldy0 = p2.y-p1.y, llen0 = Math.sqrt(ldx0*ldx0+ldy0*ldy0);
            if (llen0 > 0 && Math.abs((ldy0*(s0.x-p1.x)-ldx0*(s0.y-p1.y))/llen0) < 1e-6) onOrigin = true;
        }
        if (!onOrigin) return;
        var ldx = p2.x-p1.x, ldy = p2.y-p1.y, llen = Math.sqrt(ldx*ldx+ldy*ldy); if (!llen) return;
        if (Math.abs((ldx/llen)*axDx + (ldy/llen)*axDy) < 0.05) {
            l.pointsOnLine.forEach(function(id) { ids.add(id); });
        }
    });
    return ids;
}

// Toggle fade state on a line or circle index. Mode locked at eraser start:
// 'fade' → makes normal lines/circles recessive; 'restore' → restores faded ones.
// isCircle=true handles circle scaffolding; false handles lines (including bare).
function eraserSweepHit(idx, isCircle) {
    var key = (isCircle ? 'c:' : 'l:') + idx;
    if (eraserTouched.has(key)) return;
    eraserTouched.add(key);
    if (isCircle) {
        var c = circles.get(idx); if (!c) return;
        if (eraserSweepMode === 'fade' && !c.isScaffold) {
            appendOp({ op:'scaffold', target:'circle', idx:idx, value:true });
            fadePointsForCircle(idx);
            playSound('scaffold_fade');
        } else if (eraserSweepMode === 'restore' && c.isScaffold) {
            appendOp({ op:'scaffold', target:'circle', idx:idx, value:false });
            playSound('scaffold_restore');
        }
    } else {
        var l = lines.get(idx); if (!l) return;
        if (eraserSweepMode === 'fade' && !l.isScaffold) {
            appendOp({ op:'scaffold', target:'line', idx:idx, value:true });
            fadePointsForLine(idx);
            playSound('scaffold_fade');
        } else if (eraserSweepMode === 'restore' && l.isScaffold) {
            appendOp({ op:'scaffold', target:'line', idx:idx, value:false });
            playSound('scaffold_restore');
        }
    }
}

// Hit-test all lines and circles near world point for the eraser.
// Returns {idx, isCircle} for the nearest hit within threshold, or null.
// Nearest lattice intersection within snap range, in unit coordinates —
// only these may mint (decision 5: the ambient lattice is generated and
// never stored; a click turns one intersection into history). Returns null
// off-intersection or where a recorded point already sits.
function latticeMintTarget(wx, wy) {
    var step = plane.latticeStep(), len = plane.unitLength(), o = plane.unitOrigin();
    var u = Math.round(((wx - o.x) / len) / step) * step;
    var v = Math.round(((wy - o.y) / len) / step) * step;
    u = Math.round(u * 1e6) / 1e6; v = Math.round(v * 1e6) / 1e6;
    var px = o.x + u * len, py = o.y + v * len;
    var si = w2s(px, py), st = w2s(wx, wy);
    if (dist(si.x, si.y, st.x, st.y) > THRESHOLDS.snapDistance) return null;
    var exists = false;
    points.forEach(function(ex) { if (dist(px, py, ex.x, ex.y) < _dupEpsilon) exists = true; });
    return exists ? null : { u: u, v: v };
}

function hitForEraser(wx, wy) {
    var tL = THRESHOLDS.lineHitRadius / plane.zoom();
    var tC = THRESHOLDS.circleHitRadius / plane.zoom();
    var bestIdx = -1, bestD = Infinity, bestIsCircle = false;
    lines.forEach(function(l, idx) {
        var p1=points.get(l.p1Id), p2=points.get(l.p2Id); if (!p1||!p2) return;
        var ext = extLine(p1, p2); if (!ext) return;
        var dx=ext.x2-ext.x1, dy=ext.y2-ext.y1, lq=dx*dx+dy*dy; if (!lq) return;
        var tv=((wx-ext.x1)*dx+(wy-ext.y1)*dy)/lq;
        var d=dist(wx,wy,ext.x1+tv*dx,ext.y1+tv*dy);
        if (d < tL && d < bestD) { bestD=d; bestIdx=idx; bestIsCircle=false; }
    });
    circles.forEach(function(ci, idx) {
        var ce=points.get(ci.centerId); if (!ce) return;
        var d=Math.abs(dist(wx,wy,ce.x,ce.y)-ci.radius);
        if (d < tC && d < bestD) { bestD=d; bestIdx=idx; bestIsCircle=true; }
    });
    return bestIdx >= 0 ? { idx:bestIdx, isCircle:bestIsCircle } : null;
}

function onUp(e) {
    e.preventDefault(); unlockAudio();
    activeTouches.delete(e.pointerId);

    // If we were pinching and one finger lifts, reset pinch state
    if (pinchBaseDist && activeTouches.size < 2) {
        pinchBaseDist = null; pinchBaseScale = null;
        return;
    }
    if (activeTouches.size > 0) return; // still touches active

    var pos=getPos(e), world=s2w(pos.x,pos.y), now=Date.now();
    mouseScreenPos.x = pos.x; mouseScreenPos.y = pos.y;
    var moved = pointerStart ? dist(pointerStart.x, pointerStart.y, pos.x, pos.y) : 0;
    var isTap = moved < THRESHOLDS.tapMovement;

    // ── Eraser sweep end ──────────────────────────────────────────────────────
    if (eraserActive) {
        eraserFlash = true; eraserFlashTime = Date.now();
        eraserActive = false; eraserSweepMode = null;
        eraserTouched = new Set(); eraserCandidate = null;
        return;
    }

    // ── Double-click tap resolved: candidate set in onDown, no drag happened ──────
    // This is a quick release on the same segment/line — execute fade/restore.
    if (eraserCandidate && isTap) {
        eraserFlash = true; eraserFlashTime = Date.now();
        // Clear ALL emphasis — the eraser is an exit from loop-building mode,
        // so any partially-built loop must be cleared or it corrupts future fills.
        var eraseDeKeys = [];
        logicalSegments.forEach(function(seg,k) { if (seg.isEmphasized) eraseDeKeys.push(k); });
        logicalArcs.forEach(function(arc,k)     { if (arc.isEmphasized) eraseDeKeys.push(k); });
        eraseDeKeys.forEach(function(k) { appendOp({ op:'deemphasize', key:k }); });
        if (eraserCandidate.isCircle) {
            var fadeCirc = circles.get(eraserCandidate.lineIdx);
            if (fadeCirc) {
                var wasFaded = fadeCirc.isScaffold;
                appendOp({ op:'scaffold', target:'circle', idx:eraserCandidate.lineIdx, value:!wasFaded });
                if (!wasFaded) fadePointsForCircle(eraserCandidate.lineIdx);
                playSound(wasFaded ? 'scaffold_restore' : 'scaffold_fade');
            }
        } else {
            var fadeLine = lines.get(eraserCandidate.lineIdx);
            if (fadeLine) {
                var wasFaded = fadeLine.isScaffold;
                appendOp({ op:'scaffold', target:'line', idx:eraserCandidate.lineIdx, value:!wasFaded });
                if (!wasFaded) fadePointsForLine(eraserCandidate.lineIdx);
                playSound(wasFaded ? 'scaffold_restore' : 'scaffold_fade');
            }
        }
        eraserCandidate = null;
        lastTapTarget = null; lastTapTime = 0;
        return;
    }
    eraserCandidate = null;

    // ── Panning / fill tap ────────────────────────────────────────────────────
    if (isPanning) {
        isPanning=false; panStart=null;
        if (isTap) {
            if (APP) {
                // The window profile: the shape under the tap takes the colour, or loses its
                // glass; in open ground a tap undoes, as the Circles words say.
                if (windowTap(world.x, world.y)) return;
                if (showGlass || state.palette.selected === REMOVE) return;   // nothing to take away: nothing happens
            } else {
                if (showGlass) { tryPaletteAction(world.x, world.y); return; }   // the finished window: colour, or nothing
                if (tryPaletteAction(world.x, world.y)) return;
                if (hitAnyLine(world.x,world.y)) return;
                // Tap to fill (2 Oct 2026): with a colour chosen, a tap inside a closed shape
                // colours it; in open ground it falls through to what a tap does today — undo.
                if (FILL_MODE === 'tap' && state.palette.selected !== null && fillFaceAt(world.x, world.y)) return;
            }
            // Rule and record meet at the click (decision 5): with the map
            // showing, a tap on a lattice intersection creates a recorded
            // point — the moment possibility becomes history. Inside the
            // snap radius this outranks undo; everywhere else taps behave
            // exactly as before.
            if (mapShown) {
                var mint = latticeMintTarget(world.x, world.y);
                if (mint) {
                    appendOp({ op:'lattice_point', u:mint.u, v:mint.v });
                    playSound('point');
                    return;
                }
            }
            if (now-lastTapTime < THRESHOLDS.doubleClickTime) {
                // Double-click empty space: place a note
                if (_undoTimer) { clearTimeout(_undoTimer); _undoTimer = null; }
                if (isStepThroughActive()) forkStepThrough();
                placeCanvasNote(pos.x, pos.y);
                lastTapTime=0;
            } else {
                // Single click: delay undo to distinguish from double-click
                lastTapTime=now;
                var savedPos = { x: pos.x, y: pos.y };
                _undoTimer = setTimeout(function() { _undoTimer = null; undoOp(); }, 310);
            }
        }
        return;
    }

    // ── Segment / arc tap: single = emphasize, none needed here (double handled above) ─
    // At tap-to-fill an edge belongs to two shapes and a tap on it does nothing (2 Oct; the
    // release still laid lead here until 8 Oct, Michael's "segments should not respond").
    if (FILL_MODE !== 'tap' && isTap && interactionState==='IDLE' && !hitPt(world.x,world.y)) {
        // Palette action on fills — only if no segment nearby
        if (!hitLC(world.x,world.y) && tryPaletteAction(world.x, world.y)) return;

        var hit=hitLC(world.x,world.y);
        if (hit && (hit.type==='segment' || hit.type==='arc')) {
            var key=null;
            if (hit.type==='segment') key=hit.obj.lineIdx+':'+hit.obj.pointAId+':'+hit.obj.pointBId;
            if (hit.type==='arc')     key=hit.obj.circIdx+':'+hit.obj.pointAId+':'+hit.obj.pointBId;
            if (key) {
                var was=hit.obj.isEmphasized;
                if (!was) {
                    // Try auto-complete: if clicked segment is not adjacent to any emphasized,
                    // and there's a unique shortest path from the last emphasized segment, fill it
                    var autoPath = tryAutoComplete(key);
                    if (autoPath) {
                        for (var ai = 0; ai < autoPath.length; ai++) appendOp({ op:'emphasize', key:autoPath[ai] });
                        var fb=fills.size; checkAndFill(); playSound(fills.size>fb?'fill':'emphasis_on');
                        lastTapTarget=hit; lastTapTime=now;
                        return;
                    }
                }
                appendOp({ op:was?'deemphasize':'emphasize', key:key });
                if (was) { checkAndDissolve(key); playSound('emphasis_off'); }
                else { var fb=fills.size; checkAndFill(); playSound(fills.size>fb?'fill':'emphasis_on'); }
            }
            lastTapTarget=hit; lastTapTime=now;
            return;
        }
    }

    if (interactionState==='POINT_PRESSED' && isTap && selectedPoint) {
        if (!POWERS.line) { interactionState='IDLE'; selectedPoint=null; firstTapPoint=null; ghostLineEnd=null; return; }
        firstTapPoint=selectedPoint; interactionState='AWAITING_SECOND_TAP'; selectedPoint=null; lastTapTarget=null; return;
    }
    if (interactionState==='AWAITING_SECOND_TAP' && isTap) {
        var hp2=hitPt(world.x,world.y);
        if (hp2 && hp2.id!==firstTapPoint.id) { appendOp({ op:'line',p1Id:firstTapPoint.id,p2Id:hp2.id }); playSound('line'); }
        ghostLineEnd=null; firstTapPoint=null; interactionState='IDLE'; selectedPoint=null; return;
    }
    if (interactionState==='DRAGGING_CIRCLE') {
        if (snapTarget && selectedPoint) {
            var dup=false;
            circles.forEach(function(c) { if (c.centerId===selectedPoint.id&&c.edgeId===snapTarget.id) dup=true; });
            if (!dup) { appendOp({ op:'circle',centerId:selectedPoint.id,edgeId:snapTarget.id }); playSound('circle'); }
        }
        ghostCircle=null; snapTarget=null; selectedPoint=null; interactionState='IDLE'; return;
    }
    interactionState='IDLE'; selectedPoint=null; firstTapPoint=null; ghostLineEnd=null; ghostCircle=null; snapTarget=null;
}

canvas.addEventListener('contextmenu', function(e) { e.preventDefault(); });
canvas.addEventListener('pointerdown',  onDown);
canvas.addEventListener('pointermove',  onMove);
canvas.addEventListener('pointerup',    onUp);
canvas.addEventListener('pointercancel', onUp);
// A trackpad pinch in Safari is its own gesture event, and a page that does not claim it
// gets zoomed whole, plane and window together (Michael, 3 Oct 2026). Claimed here and
// turned into the plane's zoom by the gesture's scale, as the sampler does for a painting;
// the wheel events Safari sends alongside it are ignored while the gesture lasts.
var gestureBase = null;
canvas.addEventListener('gesturestart', function(e) { e.preventDefault(); gestureBase = plane.zoom(); }, { passive:false });
canvas.addEventListener('gesturechange', function(e) {
    e.preventDefault();
    if (gestureBase === null) gestureBase = plane.zoom();
    plane.setZoom(gestureBase * e.scale);
    syncCanvasNoteDOMs();
}, { passive:false });
canvas.addEventListener('gestureend', function(e) { e.preventDefault(); gestureBase = null; }, { passive:false });
canvas.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (gestureBase !== null) return;
    plane.setZoom(plane.zoom()*(e.deltaY>0?0.9:1.1));
    syncCanvasNoteDOMs();
}, { passive:false });
canvas.addEventListener('dragover', function(e) { e.preventDefault(); e.dataTransfer.dropEffect='copy'; });
// The drop goes through the same WIP guard as New and Open (ledger §5) —
// it used to silently replace unsaved work (Phase 2 gap).
canvas.addEventListener('drop', function(e) {
    e.preventDefault();
    var f = e.dataTransfer.files[0];
    if (f) checkWipThen(function() { _loadFromFile(f); });
});

// ============================================================
// PALETTE DATA
// What:    Loads art/palette/palettes.json at startup and stores palette
//          definitions in PALETTES_DATA keyed by id. Provides
//          fallback inline data if the fetch fails (Chartres, Gaudi).
//          CRAFT_SWATCHES holds the special-material row (empty,
//          clear glass, lead).
// Depends: fetch() for art/palette/palettes.json
// Exposes: PALETTES_DATA (object), CRAFT_SWATCHES (array),
//          CRAFT_FALLBACK (array), loadPalettesJSON()
// ============================================================

var PALETTES_DATA = {};
var CRAFT_FALLBACK = [
    { hex:null,       label:'empty', recipe:'no glass',                uncertain:false },
    { hex:'#c2d4bc',  label:'clear', recipe:'iron in sand, unrefined', uncertain:false },
    { hex:null,       label:'lead',  recipe:'lead, antimony',           uncertain:false },
];
var CRAFT_SWATCHES = CRAFT_FALLBACK;

// External text content (loaded from text/geometry-v1.json, with hardcoded fallback)
var CONTENT = null;

function loadContentJSON() {
    fetch(BASE + 'text/geometry-v1.json', { cache: 'no-cache' })
        .then(function(resp) { return resp.json(); })
        .then(function(json) {
            CONTENT = json;
            // Update HTW_STAGES content from loaded JSON
            HTW_STAGES.forEach(function(stage) {
                if (CONTENT.htw && CONTENT.htw[stage.id] && CONTENT.htw[stage.id].body) {
                    stage.content = CONTENT.htw[stage.id].body.map(function(line) { return { text: line }; });
                }
            });
            if (typeof applyTipWords === 'function') applyTipWords();
        })
        .catch(function() { /* fallback to hardcoded defaults */ });
}

function loadPalettesJSON() {
    fetch(BASE + 'art/palette/palettes.json', { cache: 'no-cache' })
        .then(function(resp) { return resp.json(); })
        .then(function(json) {
            json.palettes.forEach(function(p) { PALETTES_DATA[p.id]=p; });
            if (json.craft_swatches) CRAFT_SWATCHES=json.craft_swatches.colors;
            initColorPanel();
        })
        .catch(function(e) {
            console.warn('palettes.json not loaded, using fallback:', e);
            PALETTES_DATA['chartres_glass']={ id:'chartres_glass',name:'Chartres',colors:[
                {hex:'#1a3a8c',recipe:'cobalt oxide',uncertain:false},
                {hex:'#8b1a1a',recipe:'gold, colloidal',uncertain:false},
                {hex:'#c8780a',recipe:'iron, sulfur',uncertain:false},
                {hex:'#4a1a8c',recipe:'cobalt, manganese',uncertain:false},
                {hex:'#1a6a2a',recipe:'copper oxide',uncertain:false},
                {hex:'#8a8a7a',recipe:'iron, unrefined',uncertain:true},
                {hex:'#d4a878',recipe:'iron oxide, lead',uncertain:true},
                {hex:'#c8c0a8',recipe:'tin oxide',uncertain:false},
                {hex:'#c84878',recipe:'gold, manganese',uncertain:true},
            ]};
            PALETTES_DATA['gaudi_glass']={ id:'gaudi_glass',name:'Gaudi',colors:[
                {hex:'#c8a800',recipe:'silver stain',uncertain:false},
                {hex:'#c86820',recipe:'iron, sulfur',uncertain:false},
                {hex:'#4a8a30',recipe:'copper oxide',uncertain:false},
                {hex:'#1a4a9a',recipe:'cobalt oxide',uncertain:false},
                {hex:'#f0e8c8',recipe:'tin oxide',uncertain:false},
                {hex:'#a83018',recipe:'gold, colloidal',uncertain:false},
                {hex:'#2a8a8a',recipe:'copper oxide',uncertain:true},
                {hex:'#c8b878',recipe:'iron, silver stain',uncertain:true},
            ]};
            initColorPanel();
        });
}

function initColorPanel() {
    // Data is loaded — if the color panel should already be open, open it now.
    // On return visits initHowThisWorks() will have called openColorTool(),
    // but PALETTES_DATA was empty at that point. Re-call it now that data exists.
    if (state.palette.pendingOpen) {
        state.palette.pendingOpen = false;
        openColorTool();
    }
}

// ============================================================
// MODEL DATA
// What:    Static catalog of overlay SVG models (geometric guides)
//          and an inline SVG string cache so thumbnails and the
//          overlay render instantly without network round-trips.
//          MODEL_NAME_OVERRIDES allows friendly display-name overrides.
// Depends: nothing
// Exposes: MODEL_FILES, MODELS (array of {file,name,path}),
//          SVG_CACHE (object of filename → SVG string),
//          MODEL_NAME_OVERRIDES
// ============================================================

var MODEL_NAME_OVERRIDES = { 'ratio_golden_5.svg':'Golden Rectangle' };
function modelDisplayName(f) {
    if (MODEL_NAME_OVERRIDES[f]) return MODEL_NAME_OVERRIDES[f];
    return f.replace(/\.svg$/,'').replace(/^[^_]+_/,'').replace(/_/g,' ').replace(/\b\w/g,function(c){ return c.toUpperCase(); });
}
var MODEL_FILES = ['geo_squares_nested.svg','geo_nested_triangle.svg','geo_hexagon_triangle.svg','geo_pentagon_pentagram.svg','ratio_golden_5.svg'];
var MODELS = MODEL_FILES.map(function(f) { return { file:f, name:modelDisplayName(f), path:BASE+'models/'+f }; });

var SVG_CACHE = {
    'geo_squares_nested.svg':    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect x="40" y="40" width="720" height="720" fill="none" stroke="#555" stroke-width="6"/><polygon points="400,40 760,400 400,760 40,400" fill="none" stroke="#555" stroke-width="6"/></svg>',
    'geo_nested_triangle.svg':   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><polygon points="400,40 711.769,580 88.231,580" fill="none" stroke="#555" stroke-width="6"/><polygon points="555.885,310 400,580 244.115,310" fill="none" stroke="#555" stroke-width="6"/></svg>',
    'geo_hexagon_triangle.svg':  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><polygon points="400,40 711.769,220 711.769,580 400,760 88.231,580 88.231,220" fill="none" stroke="#555" stroke-width="6"/><polygon points="400,40 711.769,580 88.231,580" fill="none" stroke="#555" stroke-width="6"/></svg>',
    'geo_pentagon_pentagram.svg':'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><polygon points="400,40 742.422,288.537 611.696,691.463 188.304,691.463 57.578,288.537" fill="none" stroke="#555" stroke-width="6"/><polygon points="400,40 611.696,691.463 57.578,288.537 742.422,288.537 188.304,691.463" fill="none" stroke="#555" stroke-width="6"/></svg>',
    'ratio_golden_5.svg':        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><rect x="101" y="215" width="599" height="370" fill="none" stroke="#555" stroke-width="6"/><line x1="471" y1="215" x2="471" y2="585" stroke="#555" stroke-width="6"/></svg>',
};

// ============================================================
// LAYOUT + UI STATE
// What:    Central mutable `state` object plus DOM element references
//          used throughout the UI. Holds menu open/close timers,
//          panel tool stack (max 2), pinned workspace tool map,
//          and the palette/model sub-states.
// Depends: DOM (getElementById)
// Exposes: state {panelTools[], workspaceTools{},
//                 rememberManual, palette{…}, model{…}},
//          leftPanel, remember, dragHint,
//          toolPalette, toolModel, modelLayer, modelImg
// ============================================================

var TOOLS_TOP = 20, TOOLS_PANEL_GAP = 20, PANEL_TOOL_GAP = 14, REMEMBER_GAP = 24;
// 160 since 1 Oct 2026 (Michael: the column was larger than it needed to be once the
// palette left it); 220 when the model tool stacks there, since that tool is 188 wide.
var PANEL_BASE_WIDTH = 160, PANEL_WIDE_WIDTH = 220;

var state = {
    panelTools:[], workspaceTools:{}, rememberManual:false,
    palette: { current:'chartres_glass', selected:null },
    model:   { current:null, visible:false, scale:0.25, opacity:0.35, x:0, y:0 },
};

var leftPanel   = $('left-panel');
// One choice panel serves every occasional act (Save, the WIP guard, replay
// Cancel): it opens, takes one choice, and fades (ledger §1).
var choicePanel = adoptPanel(CW.createChoicePanel(), true);
var remember    = $('remember');
// Without Maya there is nobody to work out what she meant, so the inscription is not
// yet summoned (Rulings-Sept-2026, the Maya flag; Michael, 1 Oct 2026). The flag decides.
if (!(window.CW && CW.flags && CW.flags.maya)) { remember.style.display = 'none'; $('drag-hint').style.display = 'none'; }
var dragHint    = $('drag-hint');
var toolPalette = $('tool-palette');
var toolModel   = $('tool-model');
var modelLayer  = $('model-layer');
var modelImg    = $('model-img');

// ============================================================
// TOOL ACTIONS
// What:    Actions formerly in the Tools dropdown, now called directly
//          from the "How this works" panel or other UI.
// Exposes: toggleLines(), exportImage()
// ============================================================

function toggleLines() {
    showLines = !showLines;
}
// toggleGlass removed — lead is always on

function exportImage() {
    if (points.size===0) { alert('Nothing to export.'); return; }
    // Bounding box must include full circle extents, not just intersection points
    var minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    points.forEach(function(pt) { minX=Math.min(minX,pt.x);minY=Math.min(minY,pt.y);maxX=Math.max(maxX,pt.x);maxY=Math.max(maxY,pt.y); });
    circles.forEach(function(ci) {
        var ce=points.get(ci.centerId); if (!ce) return;
        minX=Math.min(minX,ce.x-ci.radius); maxX=Math.max(maxX,ce.x+ci.radius);
        minY=Math.min(minY,ce.y-ci.radius); maxY=Math.max(maxY,ce.y+ci.radius);
    });
    var pad=60,ww=maxX-minX+pad*2,wh=maxY-minY+pad*2;
    var sc=Math.min(1200/ww,900/wh,3), pw=Math.round(ww*sc), ph=Math.round(wh*sc);
    var off=document.createElement('canvas'); off.width=pw; off.height=ph;
    var oc=off.getContext('2d'); oc.fillStyle=COLORS.background; oc.fillRect(0,0,pw,ph);
    // World y is up; canvas y is down — flip so the export matches the screen
    function wp(wx,wy) { return { x:(wx-minX+pad)*sc, y:(maxY-wy+pad)*sc }; }
    fills.forEach(function(f) {
        if (f.dissolved) return;
        var poly=expandFillToPolygon(f).map(function(p) { return wp(p.x,p.y); });
        if (poly.length<3) return;
        oc.beginPath(); oc.moveTo(poly[0].x,poly[0].y);
        for (var i=1;i<poly.length;i++) oc.lineTo(poly[i].x,poly[i].y);
        oc.closePath(); oc.fillStyle=f.color; oc.globalAlpha=f.opacity; oc.fill('evenodd');
        oc.strokeStyle=LEAD_BORDER_COLOR; oc.lineWidth=LEAD_WIDTH*sc;
        oc.lineJoin='round'; oc.lineCap='round';
        oc.globalAlpha=1; oc.stroke();
        oc.globalAlpha=1;
    });
    off.toBlob(function(blob) {
        var url=URL.createObjectURL(blob),a=document.createElement('a');
        a.href=url; a.download='construction.png'; a.click(); URL.revokeObjectURL(url);
    },'image/png');
}

// ============================================================
// PANEL TOOL SYSTEM
// What:    Manages the left-panel tool stack (max 2 open at once;
//          since 1 Oct 2026 only the model tool lives here — the
//          palette is a workspace window, see PALETTE TOOL).
//          openPanelTool() shows a tool, closePanelTool() fades it out.
//          layoutPanelTools() repositions all open tools below the
//          menu and pushes Remember down to avoid overlap.
//          Drag-past-threshold on a panel tool header pins it as a
//          free-floating workspace tool (pinToWorkspace).
// Depends: state.panelTools, state.workspaceTools, state.rememberManual,
//          leftPanel, remember, toolModel,
//          PANEL_BASE_WIDTH, PANEL_WIDE_WIDTH, TOOLS_PANEL_GAP, etc.
// Exposes: openPanelTool(id), closePanelTool(id),
//          layoutPanelTools(), getPanelToolEl(id),
//          pinToWorkspace(id, x, y), pulseWorkspaceTool(id)
// ============================================================

function layoutPanelTools() {
    var htwPanel = $('htw-panel');
    var cursor = TOOLS_TOP;
    if (htwPanel && htwPanel.style.display !== 'none') {
        cursor += htwPanel.offsetHeight + PANEL_TOOL_GAP;
    }
    state.panelTools.forEach(function(id) {
        var el = getPanelToolEl(id);
        if (!el || el.style.display==='none') return;
        el.style.top = cursor+'px'; cursor += el.offsetHeight + PANEL_TOOL_GAP;
    });
    if (!state.rememberManual) {
        if (state.panelTools.length > 0) {
            var targetTop = cursor + REMEMBER_GAP;
            var remRect = remember.getBoundingClientRect();
            // Only push Remember down if it would overlap the panel tools.
            // Never move it upward — its natural position is always acceptable.
            if (remRect.top - hostRect().top < targetTop) {
                remember.style.transform = 'none';
                remember.style.top = targetTop + 'px';
            }
        } else {
            remember.style.top = '65%';
            remember.style.transform = 'translateY(-50%)';
        }
    }
}

function getPanelToolEl(id) {
    if (id==='model')         return toolModel;
    return null;
}

function openPanelTool(id) {
    if (state.workspaceTools[id]) { pulseWorkspaceTool(id); return; }
    if (state.panelTools.includes(id)) return;
    if (state.panelTools.length >= 2) closePanelTool(state.panelTools[0]);
    state.panelTools.push(id);
    var el = getPanelToolEl(id); if (!el) return;
    leftPanel.style.width = PANEL_WIDE_WIDTH+'px'; leftPanel.style.minWidth = PANEL_WIDE_WIDTH+'px';
    el.style.display='block'; el.classList.remove('visible');
    // Double rAF so offsetHeight is valid when we read it.
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            // Pin Remember to its current rendered pixel position before layout moves it.
            // Without this, the CSS transition animates from 50% (center) through the
            // panel tool to the final position, which looks like it slides up behind it.
            if (!state.rememberManual) {
                var remRect = remember.getBoundingClientRect();
                remember.style.top = (remRect.top - hostRect().top) + 'px';
                remember.style.transform = 'none';
            }
            layoutPanelTools();
            setTimeout(function() { layoutPanelTools(); el.classList.add('visible'); }, 380);
        });
    });
    enablePanelToolDrag(el, id);
}

function closePanelTool(id) {
    var idx = state.panelTools.indexOf(id); if (idx===-1) return;
    state.panelTools.splice(idx,1);
    var el = getPanelToolEl(id); if (!el) return;
    el.classList.remove('visible');
    setTimeout(function() {
        el.style.display='none'; layoutPanelTools();
        if (state.panelTools.length===0) { leftPanel.style.width=PANEL_BASE_WIDTH+'px'; leftPanel.style.minWidth=PANEL_BASE_WIDTH+'px'; }
    }, 220);
}

function enablePanelToolDrag(el, id) {
    var handle = el.querySelector('.panel-tool-header');
    if (!handle || handle._dragBound) return; handle._dragBound=true;
    var dragging=false, sx, sy;
    handle.addEventListener('mousedown', function(e) { if (e.target.classList.contains('panel-tool-close')) return; e.preventDefault(); dragging=true; sx=e.clientX; sy=e.clientY; });
    onDoc('mousemove', function(e) {
        if (!dragging) return;
        if (Math.abs(e.clientX-sx)>30 || Math.abs(e.clientY-sy)>20) { dragging=false; pinToWorkspace(id,e.clientX,e.clientY); }
    });
    onDoc('mouseup', function() { dragging=false; });
}

function pinToWorkspace(id, dropX, dropY) {
    closePanelTool(id);
    var el = buildWorkspaceTool(id); if (!el) return;
    var lp = toLocal(dropX, dropY);
    el.style.left = Math.max(lp.x-100,230)+'px'; el.style.top = Math.max(lp.y-20,20)+'px';
    root.appendChild(el); state.workspaceTools[id]=el; makeWorkspaceDraggable(el,id);
}

function makeWorkspaceDraggable(el, id) {
    var header = el.querySelector('.workspace-tool-header'); if (!header || header._dragBound) return; header._dragBound=true;
    // Pointer events with capture, as the tip window and the shared info panel
    // drag (1 Oct 2026): a mouse or a finger on an iPad moves it alike.
    var dragging=false,sx,sy,ox,oy;
    header.addEventListener('pointerdown', function(e) { if (e.target.classList.contains('workspace-tool-close')) return; e.preventDefault(); dragging=true; sx=e.clientX; sy=e.clientY; ox=parseInt(el.style.left)||0; oy=parseInt(el.style.top)||0; header.setPointerCapture(e.pointerId); });
    header.addEventListener('pointermove', function(e) { if (!dragging) return; el.style.left=(ox+e.clientX-sx)+'px'; el.style.top=(oy+e.clientY-sy)+'px'; });
    header.addEventListener('pointerup', function() { dragging=false; });
    header.addEventListener('pointercancel', function() { dragging=false; });
}

function buildWorkspaceTool(id) {
    if (id==='model')   return buildWorkspaceModel();
    return null;
}

function pulseWorkspaceTool(id) {
    var el = state.workspaceTools[id]; if (!el) return;
    el.style.transition='box-shadow 150ms ease-out';
    el.style.boxShadow='0 0 0 2px #546A80, 0 2px 16px rgba(42,38,32,0.15)';
    setTimeout(function() { el.style.boxShadow='0 2px 12px rgba(42,38,32,0.08)'; setTimeout(function() { el.style.transition=''; },300); },300);
}

// ============================================================
// PALETTE TOOL
// What:    Builds and manages the color-swatch panel:
//          palette switcher (short-list + picker),
//          color swatches (from PALETTES_DATA),
//          craft row (empty / clear glass / lead),
//          recipe tooltip on hover.
//          State lives in state.palette {current, selected}.
//          Since 1 Oct 2026 the palette is a workspace window
//          (#tool-palette, class workspace-tool): it opens over
//          the workspace outside the column, is dragged by its
//          header, closed by its close word, and reopens where
//          the child last left it. It never sits in the column
//          stack; the dragged-off clone is gone.
// Depends: PALETTES_DATA, CRAFT_SWATCHES, state.palette,
//          state.workspaceTools, makeWorkspaceDraggable(),
//          pulseWorkspaceTool(), openPickerWindow(),
//          DOM: #tool-palette, #palette-grid, #craft-row, etc.
// Exposes: openColorTool(), openPaletteTool(paletteId),
//          closePaletteTool(), buildPaletteSwatches(paletteId, gridEl),
//          buildCraftRow(rowEl)
// ============================================================

function openColorTool() {
    var id = state.palette.current || 'chartres_glass';
    if (!PALETTES_DATA[id]) {
        // Palette data not loaded yet — defer until initColorPanel runs
        state.palette.pendingOpen = true;
        return;
    }
    openPaletteTool(id);
}

var paletteLastPos = null;   // where the child left it this session, as the tip window remembers

function openPaletteTool(paletteId) {
    state.palette.current = paletteId;
    var pal = PALETTES_DATA[paletteId];
    if (!pal) { console.warn('Palette not found:',paletteId); return; }
    var nameBtn = $('palette-name-btn');
    if (nameBtn) nameBtn.textContent = pal.name;
    buildPaletteSwatches(paletteId,$('palette-grid'));
    buildCraftRow($('craft-row'));
    if (state.workspaceTools['palette']) { pulseWorkspaceTool('palette'); return; }
    // Open over the workspace at its top right, or where the child last left it.
    // The right side because the Color tip window hangs to the left of the
    // construction, and on an iPad in landscape the two would otherwise overlap.
    toolPalette.style.display = 'block';
    if (paletteLastPos) { toolPalette.style.left = paletteLastPos.left; toolPalette.style.top = paletteLastPos.top; }
    else {
        toolPalette.style.left = Math.max(hostW() - toolPalette.offsetWidth - TOOLS_PANEL_GAP, PANEL_BASE_WIDTH + TOOLS_PANEL_GAP) + 'px';
        toolPalette.style.top  = TOOLS_TOP + 'px';
    }
    state.workspaceTools['palette'] = toolPalette;
    makeWorkspaceDraggable(toolPalette, 'palette');
    requestAnimationFrame(function() { toolPalette.classList.add('visible'); });
}

function closePaletteTool() {
    if (!state.workspaceTools['palette']) return;
    delete state.workspaceTools['palette'];
    paletteLastPos = { left: toolPalette.style.left, top: toolPalette.style.top };
    toolPalette.classList.remove('visible');
    setTimeout(function() { if (!state.workspaceTools['palette']) toolPalette.style.display = 'none'; }, 220);
}

// The palette title is a fact — the name of what is loaded (ledger §13).
// "Choose new colors" is the one way to the picker. The panel is a tool
// panel: summoned by Color, closed by the child, never fading (§3).
$('palette-close').addEventListener('click', closePaletteTool);

function setRecipe(text) { var el=$('palette-recipe'); if (el) el.textContent=text||'\u00a0'; }

function buildPaletteSwatches(paletteId, grid) {
    var pal=PALETTES_DATA[paletteId]; if (!pal||!grid) return;
    grid.innerHTML=''; grid.classList.toggle('wide',pal.colors.length>12);
    pal.colors.forEach(function(c) {
        var sw=document.createElement('div'); sw.className='palette-swatch'; sw.style.background=c.hex;
        var recipe=c.uncertain?c.recipe+'?':c.recipe;
        sw.addEventListener('mouseenter', function() { setRecipe(recipe); });
        sw.addEventListener('mouseleave', function() { setRecipe(''); });
        sw.addEventListener('click', function() {
            state.palette.selected=c.hex;
            root.querySelectorAll('.g-palette-grid .palette-swatch, .g-craft-row .palette-swatch').forEach(function(s) { s.classList.remove('selected'); });
            sw.classList.add('selected'); setRecipe(recipe);
        });
        if (state.palette.selected===c.hex) sw.classList.add('selected');
        grid.appendChild(sw);
    });
}

function buildCraftRow(row) {
    if (!row) return; row.innerHTML='';
    var universalChips = [
        { hex: COLORS.background, recipe: 'remove color', border: true },
        { hex: FOREST_GLASS, recipe: 'clear glass' }
    ];
    universalChips.forEach(function(c) {
        var sw=document.createElement('div'); sw.className='palette-swatch';
        sw.style.background=c.hex;
        if (c.border) sw.style.border='1.5px solid #c8b89a';
        sw.addEventListener('mouseenter', function() { setRecipe(c.recipe); });
        sw.addEventListener('mouseleave', function() { setRecipe(''); });
        sw.addEventListener('click', function() {
            // In the window profile the first chip takes a pane's colour away, lead and all.
            state.palette.selected=(APP && c.border) ? REMOVE : c.hex;
            root.querySelectorAll('.g-palette-grid .palette-swatch, .g-craft-row .palette-swatch').forEach(function(s) { s.classList.remove('selected'); });
            sw.classList.add('selected'); setRecipe(c.recipe);
        });
        if (state.palette.selected===c.hex || (APP && c.border && state.palette.selected===REMOVE)) sw.classList.add('selected');
        row.appendChild(sw);
    });
}

// "Choose new colors" opens palette picker
$('palette-choose').addEventListener('click', function() { openPickerWindow('palettes'); });

// Lead thickness slider — track thickness matches the current setting
var leadSlider = $('lead-slider');
var leadTrack  = $('lead-slider-track');
function updateLeadSlider() {
    LEAD_WIDTH = leadSlider.value / 10;
    leadTrack.style.height = Math.max(1, LEAD_WIDTH) + 'px';
}
leadSlider.addEventListener('input', updateLeadSlider);
updateLeadSlider();

// ============================================================
// CONSTRUCTIONS
// What:    Built-in construction catalog (CX_BUILTINS), background
//          preview-PNG generation for the picker, and the dialog
//          wiring shared by save, replay, and work-in-progress flows
//          (initConstructions). The old left-panel Constructions tool
//          and its preview card were removed 7 Aug 2026 — they had no
//          caller; the picker is the one entry to opening work, and
//          the Numbers control re-homes with the lattice labels.
// Depends: SVG_CACHE, operationLog, replayLog(), appendOp(),
//          captureConstructionPNG(), openPickerWindow(), plane,
//          DOM: dialogs, step controls, save-note box, #ghost-layer
// Exposes: initConstructions(), cxState,
//          startStepThrough(), exitStepThrough()
// ============================================================

// Built-in starter constructions (thumbnails use SVG_CACHE inline renders)
// The library is content-only (ledger §15, amended brief §4): the built-in
// constructions live in ../models/constructions.json, read at load. Library
// growth is a log file plus a manifest line — no code.
var CX_BUILTINS = [];
function loadConstructionsManifest() {
    fetch(BASE + 'models/constructions.json', { cache: 'no-cache' })
        .then(function(r) { if (!r.ok) throw new Error(); return r.json(); })
        .then(function(data) {
            if (!data || !Array.isArray(data.constructions)) return;
            CX_BUILTINS = data.constructions;
            cxGenerateBuiltinPreviews();
        })
        .catch(function() { console.warn('construction library manifest failed to load'); });
}

var cxState = {
    ghostActive: false,
    ghostFile:   null,
};

function initConstructions() {
    // The library manifest loads the built-ins and generates their previews.
    loadConstructionsManifest();

    // The replay panel (ledger §15) — built once on the shared component,
    // shown whenever a construction replays.
    buildReplayPanel();

    // The WIP guard and the Save panel are choice panels now — see
    // checkWipThen() and openSavePanel(); the old dialog chain is gone.

    // Save note box OK and Cancel
    $('save-note-ok').addEventListener('click', executeSave);
    $('save-note-cancel').addEventListener('click', function() {
        dismissSaveNoteBox();
        _pendingSaveLog = null; // cancelled — drop any snapshot so a later save uses the live log
    });

    // Save note box drag
    (function() {
        var box = $('save-note-box');
        var handle = $('save-note-drag');
        var dragging = false, sx, sy, ox, oy;
        handle.addEventListener('pointerdown', function(e) {
            if (e.target.tagName === 'INPUT') return; // let input focus work
            e.preventDefault();
            dragging = true; sx = e.clientX; sy = e.clientY;
            ox = parseInt(box.style.left) || 0; oy = parseInt(box.style.top) || 0;
            handle.setPointerCapture(e.pointerId);
        });
        handle.addEventListener('pointermove', function(e) {
            if (!dragging) return;
            box.style.left = (ox + e.clientX - sx) + 'px';
            box.style.top = (oy + e.clientY - sy) + 'px';
        });
        handle.addEventListener('pointerup', function() { dragging = false; });
    })();
}

// Generate PNG previews for built-in logs in the background
function cxGenerateBuiltinPreviews() {
    CX_BUILTINS.forEach(function(cx) {
        if (cx.png) return; // already have inline PNG
        // The log is fetched first (revalidated), and the cached preview is keyed by
        // the log's length as well as its name, so a rewritten log draws itself afresh
        // (2 Oct 2026: four previews stayed blank for Michael because a stale log was
        // drawn and cached under the name alone). v2 was the y-up flip; v3 the glass.
        fetch(resolveUrl(cx.logFile), { cache: 'no-cache' })
            .then(function(r){ return r.json(); })
            .then(function(data) {
                if (!data.operations) return;
                // What the log draws with, so a level can offer only what it can make (2 Oct).
                cx.usesLines = data.operations.some(function(o) { return o.op === 'line'; });
                if (APP) buildDemoList();
                var previewKey = 'cw-cx-builtin-png-v3-'+cx.key+'-'+data.operations.length;
                var cached = null;
                try { cached = localStorage.getItem(previewKey); } catch(e) {}
                if (cached) { cx.png = cached; return; }
                // Save current state
                var savedLog = operationLog.slice();
                var savedView = plane.view();
                operationLog = data.operations.slice();
                replayLog(false);
                captureConstructionPNG('', function(pngDataUrl) {
                    cx.png = pngDataUrl;
                    try { localStorage.setItem(previewKey, pngDataUrl); } catch(e) {}
                    // Restore state
                    operationLog = savedLog;
                    replayLog(false);
                    plane.setView(savedView);
                });
            })
            .catch(function(){});
    });
}

// ============================================================
// STEP-THROUGH REPLAY
// What:    Manual step-through of a construction. Child clicks → to
//          advance, ← to go back, Cancel to exit. Operations are
//          grouped into visible steps. Forking (child draws during
//          replay) discards remaining steps.
// Depends: operationLog, replayLog, appendOp, newConstruction,
//          showSaveNoteBox, fitViewToConstruction, layoutPanelTools
// Exposes: startStepThrough(ops), exitStepThrough(),
//          stepForward(), stepBack(), isStepThroughActive()
// ============================================================

var stepState = {
    active: false,
    ops: null,           // full operation array being stepped through
    stepBounds: [],      // array of op indices where each step begins
    currentStep: 0,      // index into stepBounds (0 = init only)
    pendingOps: null,    // ops to load after WIP dialog resolves
    pendingCallback: null // unused since the WIP guard became a choice panel; kept for shape
};

function isStepThroughActive() { return stepState.active; }

// Group operations into user-visible steps.
// Returns array of { start, end } index pairs (end is exclusive).
function computeStepGroups(ops) {
    var raw = [];
    // Step 0: init (index 0)
    if (ops.length > 0) raw.push({ start: 0, end: 1 });
    var i = 1;
    while (i < ops.length) {
        var op = ops[i];
        if (op.op === 'emphasize' || op.op === 'deemphasize') {
            // Group emphasis/deemphasis ops, consuming up to the next fill/repaint_fill
            var end = i + 1;
            while (end < ops.length) {
                var next = ops[end].op;
                if (next === 'fill' || next === 'repaint_fill') { end++; break; }
                if (next === 'emphasize' || next === 'deemphasize') { end++; continue; }
                break;
            }
            raw.push({ start: i, end: end });
            i = end;
        } else if (op.op === 'repaint_fill') {
            // Batch repaint_fill with any preceding emphasis/deemphasis already consumed,
            // or as its own step if standalone
            raw.push({ start: i, end: i + 1 });
            i++;
        } else if (op.op === 'scaffold') {
            var end = i + 1;
            while (end < ops.length && ops[end].op === 'scaffold') end++;
            raw.push({ start: i, end: end });
            i = end;
        } else {
            raw.push({ start: i, end: i + 1 });
            i++;
        }
    }

    // Merge empty steps into the next visible step.
    // Track cumulative emphasis state to detect groups with no net visual change.
    var emphState = {}; // current emphasis state across all groups
    var merged = [];
    var pending = null; // accumulated empty group to merge forward

    for (var g = 0; g < raw.length; g++) {
        var grp = raw[g];
        if (grp.start === 0) { merged.push(grp); continue; } // always keep init

        // Classify this group
        var hasFill = false, hasGeometry = false, hasScaffold = false, hasNote = false;
        var emphBefore = JSON.parse(JSON.stringify(emphState));
        for (var j = grp.start; j < grp.end; j++) {
            var o = ops[j];
            if (o.op === 'fill' || o.op === 'repaint_fill' || o.op === 'dissolve_fill') hasFill = true;
            else if (o.op === 'line' || o.op === 'circle' || o.op === 'numbers') hasGeometry = true;
            else if (o.op === 'scaffold') hasScaffold = true;
            else if (o.op === 'note_open' || o.op === 'note_close') hasNote = true;
            else if (o.op === 'emphasize') emphState[o.key] = true;
            else if (o.op === 'deemphasize') delete emphState[o.key];
        }

        var hasVisible = hasFill || hasGeometry || hasScaffold || hasNote;
        // Check if emphasis state actually changed
        if (!hasVisible) {
            var emphChanged = false;
            var allKeys = {};
            for (var k in emphBefore) allKeys[k] = true;
            for (var k in emphState) allKeys[k] = true;
            for (var k in allKeys) {
                if (!!emphBefore[k] !== !!emphState[k]) { emphChanged = true; break; }
            }
            if (!emphChanged) {
                // Empty step — merge into next by extending pending range
                if (pending) { pending.end = grp.end; }
                else { pending = { start: grp.start, end: grp.end }; }
                continue;
            }
        }

        // This group has visible changes — absorb any pending empty ops
        if (pending) {
            merged.push({ start: pending.start, end: grp.end });
            pending = null;
        } else {
            merged.push(grp);
        }
    }
    // If trailing pending ops remain, merge into the last group
    if (pending && merged.length > 0) {
        merged[merged.length - 1].end = pending.end;
    }

    return merged;
}

// ---- The replay panel (ledger §15; amended brief §4) ----------------------
// One panel, appearing with the act: close at the top (closing IS the
// deliberate fork — she is now working on the new construction), the step
// arrows, Play with a duration control (0–15s; 0 is instant), Start over,
// and the quiet fact that a tap during play skips ahead. The chosen
// duration saves with the construction; her last-used duration persists
// locally as the default. Zoom is not here — she has already set it.
var replayPanel = null;
var replayPlaying = false;
var replayPlayTimer = null;
var replayDuration = (function() {
    var v = parseFloat(localStorage.getItem('cw-replay-duration'));
    return (isNaN(v) || v < 0 || v > 15) ? 5 : v;
})();
var _replayDurationLabel = null;

function replayDurationText() { return replayDuration === 0 ? 'instant' : (replayDuration + 's'); }

function setReplayDuration(v, fromChild) {
    replayDuration = Math.max(0, Math.min(15, v));
    if (_replayDurationLabel) _replayDurationLabel.textContent = replayDurationText();
    var slider = $('replay-duration');
    if (slider && parseFloat(slider.value) !== replayDuration) slider.value = replayDuration;
    // Only the child's own touch of the slider becomes the local default —
    // a construction opening at its saved speed does not.
    if (fromChild) { try { localStorage.setItem('cw-replay-duration', String(replayDuration)); } catch (e) {} }
    if (replayPlaying) { stopReplayPlay(); startReplayPlay(); }
}

function buildReplayPanel() {
    replayPanel = CW.createInfoPanel({ width: 200, onClose: function() {
        // Close is the deliberate fork: keep what is on the canvas as her
        // copy and stop replaying. Originals are untouched — every
        // construction opens as a copy.
        stopReplayPlay();
        stepState.active = false;
        stepState.ops = null;
        stepState.stepBounds = [];
        stepState.currentStep = 0;
        dismissLoadedNote();
    } });
    adoptPanel(replayPanel, false);
    var b = replayPanel.body;

    var arrows = document.createElement('div');
    arrows.className = 'cx-step-arrows';
    [['|←', stepFirst], ['←', stepBack], ['→', stepForward], ['→|', stepLast]].forEach(function(pair) {
        var a = document.createElement('span');
        a.className = 'cx-step-arrow';
        a.textContent = pair[0];
        a.addEventListener('click', function() { stopReplayPlay(); pair[1](); });
        arrows.appendChild(a);
    });
    b.appendChild(arrows);

    var playRow = document.createElement('div');
    playRow.style.cssText = 'margin:0 0 2px;';
    var playWord = document.createElement('span');
    playWord.textContent = 'Play';
    playWord.style.cssText = 'font:13px Georgia,serif;color:#546A80;cursor:default;transition:color 80ms;';
    playWord.addEventListener('mouseenter', function() { playWord.style.color = '#3D3D3A'; });
    playWord.addEventListener('mouseleave', function() { playWord.style.color = '#546A80'; });
    playWord.addEventListener('click', function() { startReplayPlay(); });
    playRow.appendChild(playWord);
    b.appendChild(playRow);

    var durRow = document.createElement('div');
    durRow.style.cssText = 'margin:2px 0 8px;';
    var durLabel = document.createElement('span');
    durLabel.textContent = 'duration · ';
    durLabel.style.cssText = 'font:italic 11px Georgia,serif;color:#546A80;opacity:0.75;';
    _replayDurationLabel = document.createElement('span');
    _replayDurationLabel.textContent = replayDurationText();
    _replayDurationLabel.style.cssText = 'font:italic 11px Georgia,serif;color:#546A80;opacity:0.9;';
    var slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'cw-slider g-replay-duration';
    slider.min = '0'; slider.max = '15'; slider.step = '0.5'; slider.value = replayDuration;
    slider.style.cssText = 'width:100%;margin-top:2px;';
    slider.addEventListener('input', function() { setReplayDuration(parseFloat(slider.value), true); });
    durRow.appendChild(durLabel);
    durRow.appendChild(_replayDurationLabel);
    durRow.appendChild(slider);
    b.appendChild(durRow);

    var startOver = document.createElement('div');
    startOver.style.cssText = 'margin:0 0 6px;cursor:default;';
    var soWord = document.createElement('span');
    soWord.textContent = 'Start over';
    soWord.style.cssText = 'font:13px Georgia,serif;color:#546A80;transition:color 80ms;';
    var soLine = document.createElement('span');
    soLine.textContent = ' — a blank window';
    soLine.style.cssText = 'font:italic 11px Georgia,serif;color:#546A80;opacity:0.65;';
    startOver.appendChild(soWord);
    startOver.appendChild(soLine);
    startOver.addEventListener('mouseenter', function() { soWord.style.color = '#3D3D3A'; });
    startOver.addEventListener('mouseleave', function() { soWord.style.color = '#546A80'; });
    startOver.addEventListener('click', function() {
        stopReplayPlay();
        exitStepThrough();
        newConstruction();
    });
    b.appendChild(startOver);

    var skipLine = document.createElement('div');
    skipLine.textContent = 'tap skips ahead';
    skipLine.style.cssText = 'font:italic 11px Georgia,serif;color:#546A80;opacity:0.6;';
    b.appendChild(skipLine);
}

function showReplayPanel() {
    if (!replayPanel) return;
    if (!replayPanel.userMoved()) {
        var panelW = parseInt(leftPanel.style.width) || PANEL_BASE_WIDTH;
        replayPanel.setPosition(panelW + 16, 20);
    }
    replayPanel.show();
}

// Play: every logged step plays — content is never compressed, only time.
// The duration divides across the whole construction so tempo scales; at 0
// the whole thing is instant.
function replayStepDelay() {
    var steps = Math.max(1, stepState.stepBounds.length - 1);
    return (replayDuration * 1000) / steps;
}
function startReplayPlay() {
    if (!stepState.active) return;
    stopReplayPlay();
    if (replayDuration === 0) { stepLast(); return; }
    if (stepState.currentStep >= stepState.stepBounds.length - 1) stepFirst(); // at the end, play begins again
    replayPlaying = true;
    replayPlayTimer = setInterval(function() {
        if (!stepState.active) { stopReplayPlay(); return; }
        stepForward();
        if (stepState.currentStep >= stepState.stepBounds.length - 1) stopReplayPlay();
    }, replayStepDelay());
}
function stopReplayPlay() {
    replayPlaying = false;
    if (replayPlayTimer) { clearInterval(replayPlayTimer); replayPlayTimer = null; }
}
// A tap during play jumps to the end and closes the panel — the same fork
// as closing it (ledger §15).
function skipReplayToEnd() {
    stopReplayPlay();
    stepLast();
    if (replayPanel) replayPanel.hide();
    stepState.active = false;
    stepState.ops = null;
    stepState.stepBounds = [];
    stepState.currentStep = 0;
    dismissLoadedNote();
}

function startStepThrough(ops) {
    if (stepState.active) exitStepThrough();

    stepState.active = true;
    stepState.ops = ops;
    stepState.stepBounds = computeStepGroups(ops);
    stepState.currentStep = 0;

    // Reset canvas to init op only
    operationLog = [ops[0]];
    replayLog(false);

    // Always use default viewport — do not restore saved zoom
    plane.resetView();

    // Show the first step immediately (don't start with blank canvas)
    if (stepState.stepBounds.length > 1) {
        var group = stepState.stepBounds[1];
        for (var i = group.start; i < group.end; i++) operationLog.push(ops[i]);
        replayLog(false);
        stepState.currentStep = 1;
    }

    // The panel appears with the act — it is part of what she started,
    // not an interruption (the step-controls precedent, ledger §15).
    showReplayPanel();
}

function stepForward() {
    if (!stepState.active) return;
    var nextStep = stepState.currentStep + 1;
    if (nextStep >= stepState.stepBounds.length) return;

    var group = stepState.stepBounds[nextStep];
    var ops = stepState.ops;
    // Push all ops in the group to the log, then replay once (no per-op animation flicker)
    for (var i = group.start; i < group.end; i++) operationLog.push(ops[i]);
    replayLog(false);
    stepState.currentStep = nextStep;
}

function stepFirst() {
    if (!stepState.active) return;
    // Jump to first step (init + first geometry)
    stepState.currentStep = Math.min(1, stepState.stepBounds.length - 1);
    var group = stepState.stepBounds[stepState.currentStep];
    operationLog = stepState.ops.slice(0, group.end);
    replayLog(false);
}

function stepLast() {
    if (!stepState.active) return;
    // Jump to completed construction — apply all ops
    operationLog = stepState.ops.slice();
    replayLog(false);
    stepState.currentStep = stepState.stepBounds.length - 1;
}

function stepBack() {
    if (!stepState.active || stepState.currentStep <= 0) return;
    stepState.currentStep--;
    // Replay the log up to the end of the current step
    var group = stepState.stepBounds[stepState.currentStep];
    operationLog = stepState.ops.slice(0, group.end);
    replayLog(false);
}

function exitStepThrough() {
    stopReplayPlay();
    stepState.active = false;
    stepState.ops = null;
    stepState.stepBounds = [];
    stepState.currentStep = 0;
    if (replayPanel) replayPanel.hide();
    dismissLoadedNote();
}

// Fork: child takes over during replay
function forkStepThrough() {
    if (!stepState.active) return;
    // The silent fork (drawing during replay), unchanged: discard the
    // remaining unplayed steps, keep current geometry.
    stopReplayPlay();
    stepState.active = false;
    stepState.ops = null;
    stepState.stepBounds = [];
    if (replayPanel) replayPanel.hide();
    dismissLoadedNote();
}

// The work-in-progress guard (ledger §5), one choice panel in Michael's
// words. It fronts New, Open, and the .json drop alike — the drop used to
// slip past it (Phase 2 gap, closed here). Keep working is the quiet no.
function checkWipThen(callback) {
    if (!logHasMarks()) {
        callback();
        return;
    }
    choicePanel.open({ choices: [
        { word: 'Save this first', line: 'then start a new construction', action: function() {
            if (operationLog.length > 1) {
                // Snapshot now: the continuation below may clear the canvas
                // while the child is still naming the construction.
                _pendingSaveLog = operationLog.slice();
                showSaveNoteBox('construction');
            }
            setTimeout(callback, 300);
        } },
        { word: 'Start a new construction', line: 'and forget this one', action: callback },
        { word: 'Keep working', line: 'on this one' }
    ] });
}

// Load a construction entry into step-through, checking WIP first
function showLoadedNote(entry) {
    if (!entry.note) return;
    dismissLoadedNote(); // remove any previous loaded note
    var el = document.createElement('div');
    el.className = 'g-loaded-note';
    el.style.cssText = 'position:absolute;z-index:550;pointer-events:all;min-width:140px;max-width:300px;' +
        'background:rgba(244,241,232,0.75);border:0.5px solid #c8b89a;border-radius:6px;' +
        'padding:8px 12px 6px;font:13px Georgia,serif;color:#546A80;user-select:none;touch-action:none;cursor:grab;';
    // Title
    if (entry.name) {
        var h = document.createElement('div');
        h.style.cssText = 'font-style:normal;color:#3D3D3A;margin-bottom:4px;';
        h.textContent = entry.name;
        el.appendChild(h);
    }
    // Note body
    var body = document.createElement('div');
    body.style.cssText = 'font-style:italic;white-space:pre-wrap;line-height:1.5;';
    body.textContent = entry.note;
    el.appendChild(body);
    // Close button
    var close = document.createElement('span');
    close.textContent = '\u00d7';
    close.style.cssText = 'position:absolute;top:3px;right:6px;cursor:default;font-size:14px;color:#546A80;';
    close.addEventListener('click', function(e) { e.stopPropagation(); dismissLoadedNote(); });
    el.appendChild(close);
    // Position
    if (entry.notePos) {
        el.style.left = entry.notePos.left + 'px'; el.style.top = entry.notePos.top + 'px';
    } else {
        el.style.left = (hostW() - 320) + 'px'; el.style.top = '60px';
    }
    // Draggable
    var dragging = false, sx, sy, ox, oy;
    el.addEventListener('pointerdown', function(e) {
        if (e.target === close) return;
        e.preventDefault(); dragging = true; sx = e.clientX; sy = e.clientY;
        ox = parseInt(el.style.left) || 0; oy = parseInt(el.style.top) || 0;
        el.style.cursor = 'grabbing'; el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function(e) {
        if (!dragging) return;
        el.style.left = (ox + e.clientX - sx) + 'px'; el.style.top = (oy + e.clientY - sy) + 'px';
    });
    el.addEventListener('pointerup', function() { dragging = false; el.style.cursor = 'grab'; });
    root.appendChild(el);
    // Fade in
    el.style.opacity = '0';
    requestAnimationFrame(function() {
        el.style.transition = 'opacity 200ms ease-in'; el.style.opacity = '1';
        setTimeout(function() { el.style.transition = ''; }, 220);
    });
}

function dismissLoadedNote() {
    var el = $('loaded-note');
    if (el) el.remove();
}

function loadConstructionEntry(entry, then) {
    function doLoad(ops, speed) {
        // No WIP check here — the Open flow already handled it before showing the picker
        newConstruction();
        // Hers, or a demo: Save overwrites the one and asks a new name for the other.
        currentKey = (entry.key && entry.key.indexOf('_builtin_') !== 0) ? entry.key : null;
        fromDemo = !currentKey;
        // A construction saved with a speed reopens at that speed; the
        // child's own last-used duration stays the local default.
        if (typeof speed === 'number' && isFinite(speed)) setReplayDuration(speed, false);
        startStepThrough(ops);
        if (entry.note) showLoadedNote(entry);
        if (then) then();
    }
    if (entry.operations) {
        doLoad(entry.operations.slice(), entry.speed);
        return;
    }
    if (entry.logFile) {
        fetch(resolveUrl(entry.logFile), { cache: 'no-cache' })
            .then(function(resp) { if (!resp.ok) throw new Error(); return resp.json(); })
            .then(function(data) {
                if (!data.operations || data.operations.length === 0) throw new Error();
                doLoad(data.operations.slice(), (typeof data.speed === 'number') ? data.speed : entry.speed);
            })
            .catch(function() { toast('could not load construction'); });
    }
}

// --- Ghost overlay (still used for future try-it or reference) ---
function clearGhost() {
    $('ghost-layer').style.display = 'none';
    $('ghost-img').src = '';
    cxState.ghostActive = false;
    cxState.ghostFile = null;
}

// ============================================================
// DRAWING GUIDE TOOL  (a.k.a. Model / Overlay)
// What:    Floating SVG overlay used as a tracing guide.
//          Loaded from SVG_CACHE or models/ directory.
//          Scale and opacity controlled by sliders; position by drag.
//          The model name in the panel header is also a "Choose..."
//          entry point to the picker window.
// Depends: SVG_CACHE, MODELS, state.model,
//          modelLayer, modelImg,
//          openPanelTool(), closePanelTool(), openPickerWindow(),
//          DOM: #tool-model, #model-scale, #model-opacity, etc.
// Exposes: openDrawingGuide(), loadModel(modelObj), clearModel(),
//          applyModelTransform(), buildWorkspaceModel()
// ============================================================

function openDrawingGuide() { if (!state.model.current) loadModel(MODELS[0]); openPanelTool('model'); }

function loadModel(modelObj) {
    state.model.current = modelObj;
    var svgStr = SVG_CACHE[modelObj.file];
    if (svgStr) {
        var blob = new Blob([svgStr],{type:'image/svg+xml'}), url=URL.createObjectURL(blob);
        modelImg.onload = function() { URL.revokeObjectURL(url); state.model.visible=true; modelLayer.style.display='block'; applyModelTransform(); setModelNameBtn(modelObj.name); };
        modelImg.src = url;
    } else {
        modelImg.onload = function() { state.model.visible=true; modelLayer.style.display='block'; applyModelTransform(); setModelNameBtn(modelObj.name); };
        modelImg.src = modelObj.path;
    }
}

function clearModel() { state.model.current=null; state.model.visible=false; modelLayer.style.display='none'; closePanelTool('model'); }
function applyModelTransform() { modelImg.style.transform='translate(calc(-50% + '+state.model.x+'px), calc(-50% + '+state.model.y+'px)) scale('+state.model.scale+')'; modelImg.style.opacity=state.model.opacity; }

// The model title is a fact, not a control (ledger §13): it names what is
// loaded. "Choose new model" is the way to the picker — the same word
// pattern the palette uses.
function setModelNameBtn(name) { var b=$('model-name-btn'); if (b) { b.textContent=name; } }

$('model-choose').addEventListener('click', function() { openPickerWindow('models'); });
$('model-close').addEventListener('click', function() { closePanelTool('model'); });
$('model-opacity').addEventListener('input', function(e) { state.model.opacity=e.target.value/100; applyModelTransform(); });
$('model-scale').addEventListener('input', function(e) { state.model.scale=e.target.value/100; applyModelTransform(); });

var mdDragging=false,mdSX,mdSY,mdOX,mdOY;
modelImg.addEventListener('mousedown', function(e) { e.preventDefault(); mdDragging=true; mdSX=e.clientX; mdSY=e.clientY; mdOX=state.model.x; mdOY=state.model.y; modelImg.style.cursor='grabbing'; });
onDoc('mousemove', function(e) { if (!mdDragging) return; state.model.x=mdOX+(e.clientX-mdSX); state.model.y=mdOY+(e.clientY-mdSY); applyModelTransform(); });
onDoc('mouseup', function() { if (!mdDragging) return; mdDragging=false; modelImg.style.cursor='move'; });
modelImg.addEventListener('wheel', function(e) { e.preventDefault(); state.model.scale=Math.max(0.1,Math.min(4,state.model.scale-e.deltaY*0.001)); var sl=$('model-scale'); if (sl) sl.value=Math.round(state.model.scale*100); applyModelTransform(); }, {passive:false});

function buildWorkspaceModel() {
    var el=document.createElement('div'); el.className='workspace-tool';
    var m=state.model.current;
    el.innerHTML='<div class="workspace-tool-header"><span class="workspace-tool-title ws-model-name" style="cursor:default;">'+(m?m.name:'--')+'</span><span class="workspace-tool-close">close</span></div><span style="font:italic 11px Georgia;color:#9a8e80;display:block;margin-bottom:10px;">click and drag to reposition</span><div class="cw-slider-row"><span class="cw-slider-label">scale</span><input type="range" class="cw-slider" min="5" max="150" value="'+Math.round(state.model.scale*100)+'" step="1"></div><div class="cw-slider-row"><span class="cw-slider-label">opacity</span><input type="range" class="cw-slider" min="5" max="100" value="'+Math.round(state.model.opacity*100)+'" step="1"></div>';
    var sliders=el.querySelectorAll('input.cw-slider');
    sliders[0].addEventListener('input', function(e) { state.model.scale=e.target.value/100; var ps=$('model-scale'); if (ps) ps.value=e.target.value; applyModelTransform(); });
    sliders[1].addEventListener('input', function(e) { state.model.opacity=e.target.value/100; var ps=$('model-opacity'); if (ps) ps.value=e.target.value; applyModelTransform(); });
    el.querySelector('.workspace-tool-close').addEventListener('click', function() { el.remove(); delete state.workspaceTools['model']; });
    return el;
}

// ============================================================
// PICKER WINDOW
// What:    Full-canvas modal grid picker used for both model
//          selection (thumbnails from SVG_CACHE) and palette
//          selection (source images from art/). Draggable by its
//          handle bar. Two modes: 'models' | 'palettes'.
// Depends: MODELS, PALETTES_DATA, state.model, state.palette,
//          SVG_CACHE, loadModel(), openPaletteTool(),
//          leftPanel (for centering),
//          DOM: #picker-backdrop, #picker-window, #picker-grid
// Exposes: openPickerWindow(mode), closePicker()
// ============================================================

var pickerBackdrop = $('picker-backdrop');
var pickerWindow   = $('picker-window');
var pickerGrid     = $('picker-grid');
var pickerMode = 'models';

function openPickerWindow(mode) {
    pickerMode = mode||'models';
    if (pickerMode==='palettes')       buildPickerPalettes();
    else if (pickerMode==='constructions') buildPickerConstructions();
    else                                buildPickerModels();
    positionPicker();
    pickerBackdrop.classList.add('visible');
    requestAnimationFrame(function() { requestAnimationFrame(function() { pickerWindow.classList.add('visible'); }); });
}

function closePicker() {
    pickerWindow.classList.remove('visible');
    setTimeout(function() { pickerBackdrop.classList.remove('visible'); },200);
}

function buildPickerConstructions() {
    pickerGrid.innerHTML = '';
    pickerGrid.style.gridTemplateColumns = 'repeat(3,200px)'; pickerGrid.style.gap = '';
    // Two sets (Michael, 2 Oct 2026): hers first under one heading, then the standard
    // set under another — the built-ins, which cannot be deleted or replaced. A heading
    // is present only when its set has something in it.
    var mine = cxGetAllEntries();
    // The standard set shows only what this level can make (Michael, 2 Oct 2026): at
    // circles, a construction drawn with lines is not offered, so no replay draws a line
    // before a story has given her lines. Her own constructions are hers whatever they hold.
    var standard = APP ? [] : CX_BUILTINS.filter(function(cx) {
        if (mine.some(function(e) { return e.key === cx.key; })) return false;
        if (!POWERS.line && cx.usesLines) return false;
        return true;
    });
    function heading(text) {
        var h = document.createElement('div'); h.className = 'picker-heading'; h.textContent = text;
        pickerGrid.appendChild(h);
    }
    var entries = [];
    if (mine.length) { heading('My constructions'); entries = entries.concat(mine); }
    if (standard.length) entries.push({ heading: 'Standard constructions' }); entries = entries.concat(standard);
    entries.forEach(function(entry) {
        if (entry.heading) { heading(entry.heading); return; }
        var item  = document.createElement('div'); item.className='picker-item';
        var thumb = document.createElement('div'); thumb.className='picker-thumb';
        var img = new Image(); img.width=184; img.height=184; img.draggable=false;
        img.style.cssText='width:184px;height:184px;object-fit:contain;pointer-events:none;';
        if (entry.png) {
            img.src = entry.png;
        } else if (entry.svgFile && SVG_CACHE[entry.svgFile]) {
            var svgStr = SVG_CACHE[entry.svgFile];
            var blob = new Blob([svgStr],{type:'image/svg+xml'});
            var url = URL.createObjectURL(blob);
            img.onload = function(){ URL.revokeObjectURL(url); };
            img.src = url;
        }
        thumb.appendChild(img);
        // Delete button for saved (non-canonical) constructions
        var isBuiltin = entry.key && entry.key.indexOf('_builtin_') === 0;
        if (!isBuiltin) {
            var del = document.createElement('span');
            del.className = 'picker-delete';
            del.textContent = '\u00d7';
            del.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!confirm('Delete this?')) return;
                try {
                    localStorage.removeItem(entry.key);
                    var index = cxGetStorageIndex().filter(function(ref) { return ref.key !== entry.key; });
                    localStorage.setItem('cw-cx-index', JSON.stringify(index));
                } catch (ex) {}
                item.remove();
            });
            thumb.appendChild(del);
        }
        var label = document.createElement('div'); label.className='picker-item-name';
        label.textContent = entry.name || 'untitled';
        item.appendChild(thumb); item.appendChild(label);
        thumb.addEventListener('click', function() {
            pickerWindow.classList.remove('visible');
            setTimeout(function(){ pickerBackdrop.classList.remove('visible'); }, 200);
            loadConstructionEntry(entry);
        });
        pickerGrid.appendChild(item);
    });
}

pickerBackdrop.addEventListener('click', closePicker);
$('picker-close-btn').addEventListener('click', function(e) { e.stopPropagation(); closePicker(); });

(function() {
    var handle=$('picker-drag-handle'), dragging=false, sx,sy,ox,oy;
    handle.addEventListener('mousedown', function(e) { e.preventDefault(); e.stopPropagation(); dragging=true; sx=e.clientX; sy=e.clientY; ox=parseInt(pickerWindow.style.left)||(pickerWindow.getBoundingClientRect().left-hostRect().left); oy=parseInt(pickerWindow.style.top)||(pickerWindow.getBoundingClientRect().top-hostRect().top); });
    onDoc('mousemove', function(e) { if (!dragging) return; pickerWindow.style.left=(ox+e.clientX-sx)+'px'; pickerWindow.style.top=(oy+e.clientY-sy)+'px'; });
    onDoc('mouseup', function() { dragging=false; });
})();

function positionPicker() {
    var panelW=parseInt(leftPanel.style.width)||PANEL_BASE_WIDTH;
    var canvasW=hostW()-panelW, canvasH=hostH();
    // Measured, not assumed: the palettes grid is half the size of the constructions grid
    // (1 Oct 2026), so the window is sized by what it holds.
    var w=pickerWindow.offsetWidth||660, h=Math.min(pickerWindow.offsetHeight||300, canvasH*0.85);
    pickerWindow.style.left=Math.max(panelW+10, panelW+(canvasW-w)/2)+'px';
    pickerWindow.style.top=Math.max(10, (canvasH-h)/2)+'px';
}

function buildPickerModels() {
    pickerGrid.innerHTML=''; pickerGrid.style.gridTemplateColumns=''; pickerGrid.style.gap='';
    var noneItem=document.createElement('div'); noneItem.className='picker-item';
    var noneThumb=document.createElement('div'); noneThumb.className='picker-thumb';
    if (!state.model.current) noneThumb.classList.add('selected');
    noneThumb.style.background='rgba(200,184,154,0.12)';
    var noneLabel=document.createElement('div'); noneLabel.className='picker-item-name'; noneLabel.textContent='None';
    noneItem.appendChild(noneThumb); noneItem.appendChild(noneLabel);
    noneThumb.addEventListener('click', function() { pickerWindow.classList.remove('visible'); setTimeout(function(){pickerBackdrop.classList.remove('visible');},200); clearModel(); });
    pickerGrid.appendChild(noneItem);
    MODELS.forEach(function(m) {
        var item=document.createElement('div'); item.className='picker-item';
        var thumb=document.createElement('div'); thumb.className='picker-thumb';
        if (state.model.current&&state.model.current.file===m.file) thumb.classList.add('selected');
        var svgStr=SVG_CACHE[m.file];
        if (svgStr) {
            var parser=new DOMParser(),doc=parser.parseFromString(svgStr,'image/svg+xml'),svg=doc.querySelector('svg');
            if (svg) { svg.removeAttribute('width'); svg.removeAttribute('height'); svg.style.width='184px'; svg.style.height='184px'; svg.querySelectorAll('[stroke]').forEach(function(el){el.setAttribute('stroke-width','8');}); thumb.appendChild(svg); }
        }
        var label=document.createElement('div'); label.className='picker-item-name'; label.textContent=m.name;
        item.appendChild(thumb); item.appendChild(label);
        thumb.addEventListener('click', function() { loadModel(m); openPanelTool('model'); pickerWindow.classList.remove('visible'); setTimeout(function(){pickerBackdrop.classList.remove('visible');},200); });
        pickerGrid.appendChild(item);
    });
}

// The palettes at half the constructions' size, both ways (Michael, 1 Oct 2026): a
// 100 px thumb in a 3 × 100 grid with a 10 px gap, the window sized to it.
var PALETTE_THUMB = 100;
function buildPickerPalettes() {
    pickerGrid.innerHTML=''; pickerGrid.style.gridTemplateColumns='repeat(3,'+PALETTE_THUMB+'px)'; pickerGrid.style.gap='10px';
    var inner = PALETTE_THUMB - 8;
    Object.keys(PALETTES_DATA).forEach(function(id) {
        var pal=PALETTES_DATA[id];
        var item=document.createElement('div'); item.className='picker-item';
        var thumb=document.createElement('div'); thumb.className='picker-thumb';
        thumb.style.width=PALETTE_THUMB+'px'; thumb.style.height=PALETTE_THUMB+'px';
        if (pal.id===state.palette.current) thumb.classList.add('selected');
        if (pal.source) {
            var img=document.createElement('img');
            img.src=BASE+'art/palette/'+encodeURIComponent(pal.source); img.alt=pal.name;
            img.style.cssText='width:'+inner+'px;height:'+inner+'px;object-fit:contain;pointer-events:none;border-radius:2px;';
            img.onerror=function(){ buildSwatchFallback(thumb, pal, inner); };
            thumb.appendChild(img);
        } else {
            buildSwatchFallback(thumb, pal, inner);
        }
        var label=document.createElement('div'); label.className='picker-item-name'; label.textContent=pal.name; label.style.width=PALETTE_THUMB+'px';
        item.appendChild(thumb); item.appendChild(label);
        thumb.addEventListener('click', function() { openPaletteTool(pal.id); pickerGrid.querySelectorAll('.picker-thumb').forEach(function(t){t.classList.remove('selected');}); thumb.classList.add('selected'); });
        pickerGrid.appendChild(item);
    });
}

function buildSwatchFallback(thumb, pal, size) {
    size = size || 184;
    thumb.innerHTML = '';
    var grid = document.createElement('div');
    grid.style.cssText = 'width:'+size+'px;height:'+size+'px;display:flex;flex-wrap:wrap;border-radius:2px;overflow:hidden;';
    var colors = pal.colors || [];
    var count = colors.length || 1;
    var cols = Math.ceil(Math.sqrt(count));
    var rows = Math.ceil(count / cols);
    var cellW = size / cols, cellH = size / rows;
    colors.forEach(function(c) {
        var hex = (typeof c === 'string') ? c : c.hex;
        var swatch = document.createElement('div');
        swatch.style.cssText = 'width:' + cellW + 'px;height:' + cellH + 'px;background:' + hex + ';';
        grid.appendChild(swatch);
    });
    thumb.appendChild(grid);
}

// ============================================================
// REMEMBER INSCRIPTION
// What:    Draggable "I want to Remember this" text in the left panel.
//          Once dragged manually, it detaches from the auto-layout
//          system (state.rememberManual = true) and stays wherever
//          placed. The "drag to position" hint fades after 4 seconds.
// Depends: state.rememberManual, remember, dragHint (DOM refs)
// Exposes: nothing (self-contained event setup)
// ============================================================

var remDragging=false, remSX, remSY, remOX, remOY;

remember.addEventListener('mousedown', function(e) {
    e.preventDefault();
    if (!state.rememberManual) { var rect=remember.getBoundingClientRect(); remember.style.top=(rect.top-hostRect().top)+'px'; remember.style.transform='none'; }
    remDragging=true; state.rememberManual=true;
    remSX=e.clientX; remSY=e.clientY;
    remOX=parseInt(remember.style.left)||16; remOY=parseInt(remember.style.top)||(remember.getBoundingClientRect().top-hostRect().top);
    remember.classList.add('dragging'); dragHint.classList.add('faded');
});
onDoc('mousemove', function(e) { if (!remDragging) return; remember.style.left=(remOX+e.clientX-remSX)+'px'; remember.style.top=(remOY+e.clientY-remSY)+'px'; });
onDoc('mouseup', function() { if (!remDragging) return; remDragging=false; remember.classList.remove('dragging'); });

setTimeout(function() {
    var rect=remember.getBoundingClientRect();
    dragHint.style.left='16px'; dragHint.style.top=(rect.bottom-hostRect().top+6)+'px';
}, 200);
setTimeout(function() { dragHint.classList.add('faded'); }, 4000);



// ============================================================
// LAYOUT ENGINE
// What:    Runs layoutPanelTools() on resize and at startup.
// Depends: layoutPanelTools()
// Exposes: nothing
// ============================================================

onWin('resize', layoutPanelTools);
setTimeout(layoutPanelTools, 50);

// ============================================================
// UTILITY
// What:    Small helpers that don't belong elsewhere.
//          toast(msg) — transient bottom-center notification.
// Depends: DOM (document.body)
// Exposes: toast(msg)
// ============================================================

function toast(msg) {
    var t=document.createElement('div');
    t.style.cssText='position:absolute;bottom:70px;left:50%;transform:translateX(-50%);background:#546A80;color:#f4f1e8;padding:6px 18px;border-radius:20px;font:12px Georgia;z-index:10003;pointer-events:none;';
    t.textContent=msg; root.appendChild(t); setTimeout(function(){t.remove();},2200);
}

// ============================================================
// HOW-THIS-WORKS TIP WINDOW
// What:    Context-sensitive guide. Appears on first visit as a draggable
//          canvas window (no title bar — entire surface is drag handle).
//          Each stage fires once; closing adds a bullet to the tool area
//          index under "How this works". Clicking a bullet reopens that
//          stage's canvas window.
//          HTW_STAGES keeps content separate from mechanism.
// Depends: localStorage, points (Map), w2s()
// Exposes: initHowThisWorks(), checkHtwTriggers()
// ============================================================

var HTW_KEY = 'cw-htw-geometry-v1';  // base key; per-stage: HTW_KEY + '-' + stage.id
var HTW_DEBUG_RESET = false;

var HTW_STAGES = [
    {
        // The circles level's one making item (1 Oct 2026): the construction stage's
        // words with the lines taken out, nothing added. Its own id, so the text file's
        // 'construction' copy does not overwrite it and its seen-flag is its own.
        id: 'circles',
        label: 'Circles',
        trigger: function() { return true; },
        suppress: function() { return false; },
        content: [
            { text: 'All your beautiful patterns begin with circles and two points.' },
            { text: '' },
            { text: 'To make a circle, tap a point, then drag to another.' },
            { text: 'Where circles intersect, new points appear.' },
            { text: 'Use those to make more circles.' },
            { text: '' },
            { text: 'Tap any empty space to undo.' }
        ]
    },
    {
        id: 'construction',
        label: 'Lines and Circles',
        trigger: function() { return true; },
        suppress: function() { return false; },
        content: [
            { text: 'All your beautiful patterns begin with circles, lines, and two points.' },
            { text: '' },
            { text: 'To make a line, tap a point, then tap another.' },
            { text: 'To make a circle, tap a point, then drag to another.' },
            { text: 'Where lines and circles intersect, new points appear.' },
            { text: 'Use those to make more lines and circles.' },
            { text: '' },
            { text: 'Tap any empty space to undo.' }
        ]
    },
    {
        id: 'shapes',
        label: 'Cutting Shapes',
        trigger: function() { return points.size >= 15; },
        suppress: function() {
            var hasEmph = false;
            for (var i = 0; i < operationLog.length; i++) { if (operationLog[i].op === 'emphasize') { hasEmph = true; break; } }
            return hasEmph || fills.size > 0;
        },
        content: [
            { text: 'To cut your glass, tap a line. It will fill with lead.' },
            { text: 'Then tap connected lines.' },
            { text: '' },
            { text: 'When you enclose a shape it will turn to glass.' }
        ]
    },
    {
        id: 'color',
        label: 'Color',
        trigger: function() {
            var count = 0;
            fills.forEach(function(f) { if (!f.dissolved) count++; });
            return count >= 4;
        },
        suppress: function() {
            // Suppress if child has already used the color palette
            for (var i = 0; i < operationLog.length; i++) { if (operationLog[i].op === 'repaint_fill') return true; }
            return false;
        },
        content: [
            { text: 'To color glass, tap a color, then tap the glass.' },
            { text: '' },
            { text: 'To choose a different set of colors, tap [Choose new colors].' },
            { text: 'Use the slider to change lead thickness.' }
        ]
    },
    {
        id: 'eraser',
        label: 'Hiding Lines',
        trigger: function() { return points.size >= 30; },
        suppress: function() {
            for (var i = 0; i < operationLog.length; i++) { if (operationLog[i].op === 'scaffold') return true; }
            return false;
        },
        content: [
            { text: 'Double click a line to make it fade or to make a faded line reappear.' },
            { text: '' },
            { text: 'Double click a line and hold the mouse down to change more than one line.' }
        ]
    },
    // save and newopen are direct action words in the panel, not tip window stages
];
// The level decides which stages exist; the rest are simply absent, triggers included.
HTW_STAGES = HTW_STAGES.filter(function(s) { return POWERS.htw.indexOf(s.id) >= 0; });
// At tap-to-fill the two tips say so (2 Oct 2026; candidate words, for the voice pass).
// Applied here and again when text/geometry-v1.json arrives, which rewrites the color tip.
function applyTipWords() {
    if (FILL_MODE !== 'tap') return;
    HTW_STAGES.forEach(function(st) {
        if (st.id === 'circles' && !st.content.some(function(c) { return /colour a shape/.test(c.text); })) {
            var i = st.content.findIndex(function(c) { return /more circles/.test(c.text); });
            st.content.splice(i < 0 ? st.content.length : i + 1, 0, { text: 'To colour a shape, tap Color, choose a colour, then tap inside the shape.' });
        }
        if (st.id === 'color') st.content[0] = { text: 'To colour a shape, tap a colour, then tap inside it.' };
    });
}
applyTipWords();

// Map from htw-item data-stage to actions
var HTW_ACTIONS = {
    circles:      function() { openHtwOnCanvas('circles'); },
    construction: function() { openHtwOnCanvas('construction'); },
    shapes:       function() { openHtwOnCanvas('shapes'); },
    color:        function() { openColorTool(); openHtwOnCanvas('color'); },
    eraser:       function() { openHtwOnCanvas('eraser'); },
    // save and newopen are now direct action words in the panel, not tip window stages
};

var htwActiveStageIdx = -1;  // index of stage currently shown on canvas
var htwLastPos = null;        // { left, top } — last dragged position of canvas window

function htwStageSeen(stage) {
    if (stage.id === 'construction') return localStorage.getItem(HTW_KEY) || localStorage.getItem(HTW_KEY + '-construction');
    return localStorage.getItem(HTW_KEY + '-' + stage.id);
}

function htwMarkStageSeen(stage) {
    localStorage.setItem(HTW_KEY + '-' + stage.id, '1');
    if (stage.id === 'construction') localStorage.setItem(HTW_KEY, '1');  // backward compat
}

var HTW_TIP_ACTIONS = {
    'New': function() { closeHtwCanvas(); checkWipThen(function() { newConstruction(); }); },
    'Open': function() { closeHtwCanvas(); openPickerWindow('constructions'); },
    'Save': function() { closeHtwCanvas(); openSavePanel(); },
    'Share': function() { closeHtwCanvas(); sharePostcard(); },
    'Choose new colors': function() { openPickerWindow('palettes'); }
};

function htwBuildBody(stageIdx) {
    var stage = HTW_STAGES[stageIdx];
    var bodyEl = $('htw-canvas-body');
    bodyEl.innerHTML = '';
    stage.content.forEach(function(item) {
        if (item.text === '') { bodyEl.appendChild(document.createElement('br')); return; }
        var p = document.createElement('p');
        p.className = 'htw-para';
        // Parse markers: {keyword} = highlighted, [keyword] = tappable action
        var text = item.text;
        // First split on [action] markers
        var parts = text.split(/(\[[^\]]+\]|\{[^}]+\})/);
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part.charAt(0) === '[' && part.charAt(part.length - 1) === ']') {
                var word = part.slice(1, -1);
                var span = document.createElement('span');
                span.className = 'htw-action';
                span.textContent = word;
                if (HTW_TIP_ACTIONS[word]) {
                    span.addEventListener('click', (function(w) { return function() { HTW_TIP_ACTIONS[w](); }; })(word));
                }
                p.appendChild(span);
            } else if (part.charAt(0) === '{' && part.charAt(part.length - 1) === '}') {
                var word = part.slice(1, -1);
                var kw = document.createElement('span');
                kw.className = 'htw-keyword';
                kw.textContent = word;
                p.appendChild(kw);
            } else {
                p.appendChild(document.createTextNode(part));
            }
        }
        bodyEl.appendChild(p);
    });
}

function toggleHtwPanel() {
    var list = $('htw-panel-list');
    if (!list) return;
    list.classList.toggle('revealed');
    // The list's max-height transition runs up to 320ms; relayout the panel
    // tools once it has settled so they sit below the new height.
    setTimeout(layoutPanelTools, 360);
}

function openHtwOnCanvas(stageId) {
    var stageIdx = -1;
    for (var i = 0; i < HTW_STAGES.length; i++) { if (HTW_STAGES[i].id === stageId) { stageIdx = i; break; } }
    if (stageIdx < 0) return;
    htwActiveStageIdx = stageIdx;
    htwBuildBody(stageIdx);
    var el = $('htw-canvas');
    if (htwLastPos) {
        el.style.left = htwLastPos.left; el.style.top = htwLastPos.top;
    } else {
        var s0 = w2s(-100, 0);
        var winW = 248, winH = 260;
        el.style.left = Math.max(s0.x - winW - 20, 10) + 'px';
        el.style.top  = Math.max(Math.round(s0.y - winH / 2), 20) + 'px';
    }
    el.style.opacity = '0'; el.style.display = '';
    requestAnimationFrame(function() {
        el.style.transition = 'opacity 200ms ease-in'; el.style.opacity = '1';
        setTimeout(function() { el.style.transition = ''; }, 220);
    });
}

function closeHtwCanvas() {
    var stageIdx = htwActiveStageIdx;
    var stage = stageIdx >= 0 ? HTW_STAGES[stageIdx] : null;
    var el = $('htw-canvas');
    htwActiveStageIdx = -1;
    el.classList.add('closing');
    el.addEventListener('transitionend', function onDone() {
        el.removeEventListener('transitionend', onDone);
        el.classList.remove('closing');
        el.style.display = 'none';
        el.style.transform = ''; el.style.opacity = '';
        if (stage) { htwMarkStageSeen(stage); }
    }, { once: true });
}

function checkHtwTriggers() {
    var el = $('htw-canvas');
    if (el && el.style.display !== 'none') return;  // canvas window already showing
    for (var i = 1; i < HTW_STAGES.length; i++) {
        var s = HTW_STAGES[i];
        if (!s.trigger || htwStageSeen(s)) continue;
        // Smart suppression: skip if child is already doing this action
        if (s.suppress && s.suppress()) { htwMarkStageSeen(s); continue; }
        if (s.trigger()) {
            if (s.id === 'color') openColorTool();
            openHtwOnCanvas(s.id); break;
        }
    }
}

// Competence thresholds: auto-fade tip window when child demonstrates understanding
var _tipFadeFired = {};

function checkTipFadeThresholds() {
    if (htwActiveStageIdx < 0) return; // no tip window open
    var stageId = HTW_STAGES[htwActiveStageIdx].id;
    if (_tipFadeFired[stageId]) return;

    var shouldFade = false;
    if (stageId === 'circles') {
        shouldFade = circles.size >= 2;
    } else if (stageId === 'construction') {
        shouldFade = lines.size >= 2 && circles.size >= 2;
    } else if (stageId === 'shapes') {
        var fillCount = 0; fills.forEach(function(f) { if (!f.dissolved) fillCount++; });
        shouldFade = fillCount >= 1;
    } else if (stageId === 'color') {
        var repaints = 0;
        for (var i = 0; i < operationLog.length; i++) { if (operationLog[i].op === 'repaint_fill') repaints++; }
        shouldFade = repaints >= 2;
    } else if (stageId === 'eraser') {
        var hasScaffold = false;
        for (var i = 0; i < operationLog.length; i++) { if (operationLog[i].op === 'scaffold') { hasScaffold = true; break; } }
        shouldFade = hasScaffold;
    }

    if (!shouldFade) return;
    _tipFadeFired[stageId] = true;

    // Fade out the tip window
    var el = $('htw-canvas');
    if (!el || el.style.display === 'none') {
        // Window already closed — just pulse the bullet
        pulsePanelBullet(stageId);
        return;
    }
    el.style.transition = 'opacity 2.5s ease-out';
    el.style.opacity = '0';
    pulsePanelBullet(stageId);
    setTimeout(function() {
        el.style.display = 'none';
        el.style.transition = ''; el.style.opacity = '';
        htwActiveStageIdx = -1;
        var stage = HTW_STAGES.find(function(s) { return s.id === stageId; });
        if (stage) htwMarkStageSeen(stage);
    }, 2600);
}

function pulsePanelBullet(stageId) {
    var item = root.querySelector('.htw-item[data-stage="' + stageId + '"]');
    if (!item) return;
    item.classList.add('htw-pulse');
    setTimeout(function() { item.classList.remove('htw-pulse'); }, 2500);
}

// The Demo list (window profile): the standard set this level can make, up to eight, two
// columns. A tap loads the construction and plays it; the same name again plays it from the
// start. Her first mark during a demo ends the demo there (the fork), and what has played is hers.
function buildDemoList() {
    var box = $('demo-list'); if (!box) return;
    box.innerHTML = '';
    CX_BUILTINS.filter(function(cx) { return cx.usesLines === false; }).slice(0, 8).forEach(function(cx) {
        var w = document.createElement('span'); w.className = 'htw-action-word'; w.textContent = cx.name;
        w.addEventListener('click', function() {
            if (currentDemo === cx && isStepThroughActive()) { stopReplayPlay(); stepFirst(); startReplayPlay(); return; }
            checkWipThen(function() { loadConstructionEntry(cx, function() { currentDemo = cx; startReplayPlay(); }); });
        });
        box.appendChild(w);
    });
}

function initHowThisWorks() {
    if (HTW_DEBUG_RESET) { localStorage.removeItem(HTW_KEY); HTW_STAGES.forEach(function(s) { localStorage.removeItem(HTW_KEY + '-' + s.id); }); }

    // Wire close button
    $('htw-close').addEventListener('click', closeHtwCanvas);

    // Wire panel heading to collapse/expand
    $('htw-panel-heading').addEventListener('click', toggleHtwPanel);

    // The column lists the stages this level serves, in their order (1 Oct 2026): the
    // markup's items are the fullest level's and are rebuilt here from HTW_STAGES.
    (function() {
        var list = $('htw-panel-list'), first = list.querySelector('.htw-action-row');
        root.querySelectorAll('.htw-item').forEach(function(el) { el.remove(); });
        HTW_STAGES.forEach(function(stage) {
            var li = document.createElement('li');
            li.className = 'htw-item'; li.dataset.stage = stage.id; li.textContent = stage.label;
            list.insertBefore(li, first);
        });
        if (!POWERS.map) { var mw = $('map-toggle'); if (mw && mw.parentNode) mw.parentNode.remove(); }
    })();

    // The window profile's column (7 Oct 2026): Glass only · Undo, then New Open Save, then
    // Share, then a small right-set Reset view with its space always reserved, then Demo.
    if (APP) {
        var strip = document.createElement('div'); strip.className = 'g-scroll-margin'; strip.style.width = BOX_MARGIN_RIGHT + 'px';
        root.appendChild(strip);
        var list2 = $('htw-panel-list');
        list2.style.maxHeight = '640px';
        var rowAct = $('htw-action-new').parentNode, rowGlass = $('glass-toggle').parentNode;
        var undo = document.createElement('span'); undo.className = 'htw-action-word g-undo'; undo.textContent = 'Undo';
        undo.addEventListener('click', function() { if (isStepThroughActive()) forkStepThrough(); undoOp(); });
        rowGlass.appendChild(undo); rowGlass.style.marginTop = '12px';
        list2.insertBefore(rowGlass, rowAct);
        var rowReset = document.createElement('li'); rowReset.className = 'htw-action-row';
        rowReset.style.cssText = 'justify-content:flex-end;min-height:16px;margin-top:20px;padding-right:4px;';
        var reset = document.createElement('span'); reset.className = 'htw-action-word g-reset-view absent'; reset.textContent = 'Reset view';
        reset.style.cssText = 'font-size:11px;opacity:0.7;display:none;';
        reset.addEventListener('click', function() { plane.resetView(); syncCanvasNoteDOMs(); });
        rowReset.appendChild(reset); list2.appendChild(rowReset);
        var rowDemo = document.createElement('li'); rowDemo.className = 'htw-action-row'; rowDemo.style.cssText = 'margin-top:14px;padding-left:0;';
        var dh = document.createElement('span'); dh.className = 'g-demo-heading'; dh.textContent = 'Demo';
        dh.style.cssText = 'font-family:Georgia,serif;font-size:14px;color:#546A80;line-height:1;cursor:default;';
        rowDemo.appendChild(dh); list2.appendChild(rowDemo);
        var demos = document.createElement('li'); demos.className = 'g-demo-list';
        demos.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;margin-top:8px;padding-left:12px;';
        list2.appendChild(demos);
        buildDemoList();
        updateViewingWords();   // the words just made take their presence from the board as it is
    }

    // Wire each htw-item to its action
    root.querySelectorAll('.htw-item').forEach(function(el) {
        var stage = el.dataset.stage;
        if (HTW_ACTIONS[stage]) {
            el.addEventListener('click', function() { HTW_ACTIONS[stage](); });
        }
    });

    // Wire action row words (direct actions, no tip windows)
    $('htw-action-new').addEventListener('click', function() {
        checkWipThen(function() { newConstruction(); });
    });
    $('htw-action-open').addEventListener('click', function() {
        checkWipThen(function() { openPickerWindow('constructions'); });
    });
    $('htw-action-save').addEventListener('click', function() {
        openSavePanel();
    });

    // Pointer-based drag on canvas tip window — entire window is the drag surface
    var el = $('htw-canvas');
    var dragging = false, sx, sy, ox, oy;
    el.addEventListener('pointerdown', function(e) {
        if (e.target.classList.contains('g-htw-close')) return;
        if (e.target.classList.contains('htw-action')) return;
        e.preventDefault();
        dragging = true; sx = e.clientX; sy = e.clientY;
        ox = parseInt(el.style.left) || 0; oy = parseInt(el.style.top) || 0;
        el.classList.add('dragging'); el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function(e) {
        if (!dragging) return;
        el.style.left = (ox + e.clientX - sx) + 'px';
        el.style.top  = (oy + e.clientY - sy) + 'px';
        htwLastPos = { left: el.style.left, top: el.style.top };
    });
    el.addEventListener('pointerup', function() { dragging = false; el.classList.remove('dragging'); });

    // First visit: open stage 0 on canvas
    if (HTW_STAGES.length && !htwStageSeen(HTW_STAGES[0])) openHtwOnCanvas(HTW_STAGES[0].id);

    // Return visits: the color panel no longer opens itself (ledger §3) —
    // the child summons it with Color. Its one uninvited opening remains
    // the first-visit teaching moment, via checkHtwTriggers.
}

// ============================================================
// VIEWING WORDS
// What:    Show map ↔ Hide map (the three-state Numbers cycle
//          dissolved, ledger §10) and Just the glass ↔ Show the
//          making (§9). Both are destination-named toggles; both are
//          recorded as viewing ops (replay reproduces them, undo
//          skips them). The lattice tie has no control here — the
//          grid keeps its step, always (§11). Also owns the
//          conditional action row (§14) and the pixel-floor readout.
// Depends: mapShown, showGlass, appendOp(), plane, ctx, canvas
// Exposes: updateViewingWords() (called from replayLog),
//          drawPixelFloorReadout() (called from render)
// ============================================================

// A word is present only when tapping it would do something; it fades in
// and out (Marauder's Map), and once faded it releases its space.
function setWordPresent(el, present) {
    // Shared with Wordplay since 29 Sep 2026: the body is CW.setWordPresent in ../js/cw-panel.js.
    CW.setWordPresent(el, present);
}

function updateViewingWords() {
    var mapWord = $('map-toggle');
    if (mapWord) mapWord.textContent = mapShown ? 'Hide map' : 'Show map';
    var glassWord = $('glass-toggle');
    if (glassWord) glassWord.textContent = showGlass ? (APP ? 'Show circles' : POWERS.madeWord) : (APP ? 'Glass only' : 'Just the glass');
    // Conditional presence (ledger §14): an empty canvas shows only Open —
    // New is irrelevant and Save has nothing to save. Marks count; viewing
    // changes alone do not.
    var hasWork = logHasMarks();
    setWordPresent($('htw-action-new'), hasWork);
    setWordPresent($('htw-action-save'), hasWork);
    setWordPresent($('share'), hasWork);
    if (APP) { setWordPresent($('undo'), hasWork); setWordPresent($('htw-action-open'), cxGetStorageIndex().length > 0); }
    layoutPanelTools();
}

$('map-toggle').addEventListener('click', function() {
    appendOp({ op: 'numbers', value: mapShown ? 'hidden' : 'shown' });
});

$('glass-toggle').addEventListener('click', function() {
    appendOp({ op: 'show_glass', value: !showGlass });
});
$('share').addEventListener('click', sharePostcard);

// The screen's limit, spoken at the declared unit's natural scale
// (settled at the Phase 3 review): a viewing that names its unit reads
// like "about 4 mm"; Geometry has not named one, so it speaks the scale
// in words — "about 4 thousandths of a unit" — never raw decimals.
// This one line is settled copy; the rest awaits Michael's voice pass.
function drawPixelFloorReadout() {
    var v = 1 / (plane.zoom() * plane.unitLength()); // units per pixel
    function sig(x) { return parseFloat(x.toPrecision(1)); }
    var n, txt;
    if (v >= 1) {
        n = sig(v);
        txt = 'about ' + n + (n === 1 ? ' unit' : ' units');
    } else if (v >= 0.1) {
        n = sig(v * 10);
        txt = 'about ' + n + (n === 1 ? ' tenth' : ' tenths') + ' of a unit';
    } else if (v >= 0.01) {
        n = sig(v * 100);
        txt = 'about ' + n + (n === 1 ? ' hundredth' : ' hundredths') + ' of a unit';
    } else if (v >= 0.001) {
        n = sig(v * 1000);
        txt = 'about ' + n + (n === 1 ? ' thousandth' : ' thousandths') + ' of a unit';
    } else {
        n = sig(v * 1e6);
        txt = 'about ' + n + (n === 1 ? ' millionth' : ' millionths') + ' of a unit';
    }
    ctx.save();
    ctx.font = '10px Georgia, serif';
    ctx.fillStyle = '#546A80';
    ctx.globalAlpha = 0.45;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('one pixel is ' + txt, canvas.clientWidth - 10, canvas.clientHeight - 8);
    ctx.restore();
}

// ============================================================
// STARTUP
// What:    Three sequential init calls that wire up the application:
//          1. loadPalettesJSON() — async fetch, populates PALETTES_DATA
//          2. initLog()          — seeds the operation log and renders
//          3. initConstructions() — builds construction cards, wires
//                                   close/stop handlers
// Depends: everything above
// Exposes: nothing
// ============================================================

loadContentJSON();
loadPalettesJSON();
initLog();
// Geometry's grid keeps its step, always — no toggle (ledger §11): a tied
// grid quietly mints finer lines nobody constructed at every decade
// crossing. Frozen at the default view's step; zoom in and its lines
// spread like any drawn thing seen closer.
plane.setLatticeTied(false);
initConstructions();
initHowThisWorks();


// ============================================================
// THE MOUNT (1 Oct 2026)
// What:    What the page asked for — the palette, the construction
//          to have ready — and the small API the shelves all return.
// ============================================================

// The host's own size, watched where the browser can; the window's
// resize is still listened to above for the rest.
var ro = null;
if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(function () { resizeCanvas(); layoutPanelTools(); });
    ro.observe(root);
}

// The palette asked for, by id or by name, once the palettes have arrived.
if (opts.palette) {
    var want = String(opts.palette).toLowerCase();
    var tries = 0;
    (function pick() {
        var ids = Object.keys(PALETTES_DATA);
        if (!ids.length) { if (++tries < 100) setTimeout(pick, 100); return; }
        var found = null;
        ids.forEach(function (id) {
            var p = PALETTES_DATA[id];
            if (id.toLowerCase() === want || id.toLowerCase() === want + '_glass' || (p.name && p.name.toLowerCase() === want)) found = id;
        });
        if (found) state.palette.current = found;
        else console.warn('glass: no palette named "' + opts.palette + '"');
    })();
}

// The construction to have ready: found in the library once the manifest has arrived.
function findReady(name) {
    var want = String(name).toLowerCase();
    for (var i = 0; i < CX_BUILTINS.length; i++) {
        var cx = CX_BUILTINS[i], key = (cx.key || '').toLowerCase();
        if (key === want || key === '_builtin_' + want || (cx.name || '').toLowerCase() === want) return cx;
    }
    return null;
}
function whenLibrary(fn) {
    var tries = 0;
    (function wait() {
        if (CX_BUILTINS.length) { fn(); return; }
        if (++tries < 100) setTimeout(wait, 100); else fn();
    })();
}

var destroyed = false;
function destroy() {
    if (destroyed) return; destroyed = true;
    alive = false; if (rafId) cancelAnimationFrame(rafId);
    stopReplayPlay();
    if (_undoTimer) { clearTimeout(_undoTimer); _undoTimer = null; }
    docListeners.forEach(function (l) { document.removeEventListener(l[0], l[1], l[2]); });
    winListeners.forEach(function (l) { window.removeEventListener(l[0], l[1], l[2]); });
    docListeners = []; winListeners = [];
    if (ro) { ro.disconnect(); ro = null; }
    if (audioCtx) { try { audioCtx.close(); } catch (e) {} audioCtx = null; }
    root.innerHTML = '';
    root.classList.remove('cw-glass');
}

return {
    el: root,
    level: levelName,
    // Plays the construction named by opts.open — the story's own word ("again").
    // It goes through the same guard as Open, so her unsaved work is never silently lost.
    replay: function () {
        if (destroyed || !opts.open) return;
        whenLibrary(function () {
            var entry = findReady(opts.open);
            if (!entry) { console.warn('glass: no construction named "' + opts.open + '" in the library'); return; }
            checkWipThen(function () { loadConstructionEntry(entry); });
        });
    },
    focus: function () { if (!destroyed) root.focus({ preventScroll: true }); },
    resize: function () { if (!destroyed) { resizeCanvas(); layoutPanelTools(); } },
    destroy: destroy
};
}

  window.cwGlass = cwGlass;
})();
