#!/usr/bin/env node
/* glass-wright-constructions.js — the Wright window's demos (Geo 2: Glass Wright Window, 19 Oct 2026),
   written as gestures through glass-log.js on the board's own model (create({ wright: true })) and
   saved to cw-deploys/models/logs/. The brief: claude/Prompt-Build-Geo-2-Glass-Wright-Window.md, "Demo".

   Wright: the 10 by 10 kept; ten lines that divide the window the way Wright's do, a few large panes,
   some narrow strips and small squares, every line stopping at the lines around it; then five of the
   small panes in three colours, the rest clear; then Glass only.
   Run: node tools/glass-wright-constructions.js */
'use strict';
const G = require('./glass-log.js');
const g = G.create({ wright: true });
// The frame opens at left −5, bottom −5, 10 by 10: x from −5 to 5, y from −5 to 5. A point names the
// pane it is in; a cut names where the line settles, in the frame's units.
g.cut(0, 0, 'h', 3);           // a level line 2 below the top: a 10 by 2 strip above, 10 by 8 below
g.cut(0, 0, 'v', -3);          // an upright 2 in from the left, through the big pane: a 2 by 8 strip, an 8 by 8
g.cut(0, 4, 'v', -3);          // the same upright through the top strip: a 2 by 2 square in the corner, an 8 by 2
g.cut(0, 4, 'h', 4);           // the 8 by 2 halved into two 8 by 1 strips
g.cut(0, 4.5, 'v', -2);        // a 1 by 1 square at the left end of the upper strip
g.cut(0, 4.5, 'v', -1);        // and a second beside it
g.cut(-4, 0, 'h', 1);          // the left strip: a 2 by 2 square at its top
g.cut(-4, -3, 'h', -4);        // and a 2 by 1 at its foot, a 2 by 5 between
g.cut(1, -1, 'h', -4);         // the big pane: a 8 by 1 strip along the bottom, 8 by 7 above
g.cut(1, 0, 'v', 4);           // an upright 1 in from the right: a 1 by 7 strip, a 7 by 7 pane
const AMBER = '#c8780a', RED = '#8b1a1a', BLUE = '#1a3a8c';   // Chartres
g.wrPane(-4, 4, AMBER);        // the corner square
g.wrPane(-2.5, 4.5, RED);      // the two small squares
g.wrPane(-1.5, 4.5, RED);
g.wrPane(-4, 2, AMBER);        // the square at the top of the left strip
g.wrPane(4.5, 0, BLUE);        // the narrow upright strip
g.glassOnly();

const panes = g.lab.wr().panes, cuts = g.lab.wr().cuts;
const area = panes.reduce((s, p) => s + (p.x1 - p.x0) * (p.y1 - p.y0), 0);
if (area !== 100) throw new Error('the panes add up to ' + area + ', not 100');
g.write('cw-deploys/models/logs/geo_wright.json', 'Wright',
  'The Wright window\'s demo: the 10 by 10 kept, ten lines pulled off the sides and off each other that divide it the way Wright\'s windows are divided, a few large panes with narrow strips and small squares along two edges, every line stopping at the lines around it; then two squares in amber, two in red and one strip in cobalt, the rest left clear; then the window alone.',
  { level: 'wright' });
console.log('Wright: ' + g.ops().length + ' ops, ' + cuts.length + ' lines, ' + panes.length + ' panes (' + panes.map(p => (p.x1 - p.x0) + '×' + (p.y1 - p.y0)).join(', ') + '), area ' + area);
