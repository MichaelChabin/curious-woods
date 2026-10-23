// node compare.js before.json after.json — two runs of glass-states.html, state by state; identical means every
// visible hash matched (24 Oct 2026).
const fs = require('fs');
const [a, b] = process.argv.slice(2).map(f => JSON.parse(fs.readFileSync(f, 'utf8')));
let diffs = 0;
for (const st of Object.keys(a)) {
  if (st === 'errors' || st === 'saved') { if (st === 'errors' && JSON.stringify(a[st]) !== JSON.stringify(b[st])) { diffs++; console.log('errors differ:\n  before ' + JSON.stringify(a[st]) + '\n  after  ' + JSON.stringify(b[st])); } continue; }
  for (const k of Object.keys(a[st])) if (JSON.stringify(a[st][k]) !== JSON.stringify((b[st] || {})[k])) { diffs++; console.log(st + ' / ' + k + ': ' + JSON.stringify(a[st][k]) + ' -> ' + JSON.stringify((b[st] || {})[k])); }
}
console.log(diffs ? diffs + ' difference(s)' : 'identical in every state');
