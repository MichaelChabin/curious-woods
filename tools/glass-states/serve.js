// node serve.js <dir> <port> — static files with CORS and no caching, for glass-states.html (24 Oct 2026); a POST to
// /save?name=X writes results/X.json under <dir>, which is how the harness page saves a run.
const http = require('http'), fs = require('fs'), path = require('path');
const [dir, port] = [process.argv[2], parseInt(process.argv[3], 10)];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.startsWith('/save')) {
    const name = new URL('http://x' + req.url).searchParams.get('name') || 'result';
    let body = ''; req.on('data', d => body += d); req.on('end', () => { fs.mkdirSync(path.join(dir, 'results'), { recursive: true }); fs.writeFileSync(path.join(dir, 'results', name.replace(/[^a-z0-9_-]/gi, '_') + '.json'), body); res.writeHead(200, { 'Access-Control-Allow-Origin': '*' }); res.end('saved'); });
    return;
  }
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET', 'Access-Control-Allow-Headers': '*' }); res.end(); return; }
  const p = path.join(dir, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404, { 'Access-Control-Allow-Origin': '*' }); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log('serving ' + dir + ' on ' + port));
