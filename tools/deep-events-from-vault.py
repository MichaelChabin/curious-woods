#!/usr/bin/env python3
"""deep-events-from-vault.py — the deep-time events, from the vault to the site (Plan-Deep-Time, Stage 6).

Reads CWVault/claude/Events-Deep-NN.md (written to Prompt-Deep-Time-Events.md) and writes
cw-deploys/stories/deep-time-events.json: the same record shape as stories/timeline-events.json
with the fields deep time adds. The markdown is the source; the JSON is generated and never
edited by hand. A store of its own for now: the shipping Time Machine page draws a speck for
every event it loads, and these would land off its line; Stage 7 merges them.

    python3 tools/deep-events-from-vault.py            writes the file and reports
    python3 tools/deep-events-from-vault.py --check    parses and reports, writes nothing

The deep fields, as the batches write them:
  **Age:**        '4404 Ma · ± 8 Ma · radiometric (uranium–lead) on the crystal itself'
                  also '4510 Ma · argued, 4510 to 4350 Ma · …', '8 Ma to 6 Ma · a span …',
                  '0.142 Ma · + 0.029 / − 0.022 Ma · …', '0.0678 Ma · minimum · …', '22 Ma · at least 21.9 Ma …'
                  → ma (the first number), year (this year − ma·10⁶), uncertaintyMa (± n; half a range; the
                  larger of +/−; null when the line gives none), precisionYears, ageHow (the rest), ageText
  **Tail:**       'none — a dated moment' | '4500 Ma — the reason' → tail: null | { ma, year, reason }
                  and evidence: 'dated' | 'earliest'
  **Known from:** one line → knownFrom
  **Place now:**  'none' | 'Erawondoo Hill, Jack Hills, … (26.18 S, 116.93 E)' → placeNow: null | { name, short, lat, lon }
  **Kind:**       a word from the closed list
  **Replaces:**   'sketch *Blue Earth*' | 'a new mark (Michael, 7 Oct)' | "the sketch *X*'s …" → replacesSketch: [labels] | []
  the date line:  one or two lines in a code block, 'About 4.4 billion years ago' / 'and probably begun by …'
                  → more.dateLine: { ago: text, tail: text | null, sure?: text }  (deep lines count ago only; the ruling of 6 Oct;
                  'and certainly here by …' is a third line one writer added, kept as sure)
Weights are proposed by rule, marked proposed: 3 for an event that replaces one of the tree's own
marks, 2 otherwise; Michael's to change. Each record also carries `chunk`: the deepest chunk of
stories/deep-time.json whose span holds its age, so the bar can find it.
"""
import glob, json, os, re, sys, time
sys.path.insert(0, os.path.dirname(__file__))
from importlib import import_module
base = import_module('events-from-vault')   # slug, num, parse_place, split_events, KINDS
slug, num, parse_place, split_events, KINDS = base.slug, base.num, base.parse_place, base.split_events, base.KINDS

ROOT = base.ROOT
OUT = 'cw-deploys/stories/deep-time-events.json'
TREE = 'cw-deploys/stories/deep-time.json'
THIS_YEAR = time.localtime().tm_year

class ParseError(Exception):
    pass

def field(lines, name, where, required=True):
    for ln in lines:
        if ln.startswith('**%s:**' % name):
            return re.sub(r'^\*\*%s:\*\*\s*' % re.escape(name), '', ln).strip()
    if required:
        raise ParseError('%s: no %s line' % (where, name))
    return None

MA = r'([\d.,]+)\s*Ma'
def parse_age(text, where):
    t = text.replace('−', '-').replace('–', '-')
    m = re.match(MA, t)
    if not m:
        raise ParseError('%s: the Age line does not start with a number of Ma: %r' % (where, text))
    ma = float(m.group(1).replace(',', ''))
    rest = t[m.end():].strip(' ·')
    unc = None; note = None
    # a span 'X Ma to Y Ma'
    m2 = re.match(r'to\s*' + MA, rest)
    if m2:
        other = float(m2.group(1).replace(',', '')); unc = abs(ma - other) / 2; ma_mid = (ma + other) / 2
        note = 'a span'; rest = rest[m2.end():].strip(' ·')
    else:
        ma_mid = None
    m3 = re.match(r'±\s*' + MA, rest)
    m4 = re.match(r'\+\s*' + MA + r'\s*/\s*-\s*' + MA, rest)
    m5 = re.search(r'(?:argued,|between|from)?\s*' + MA + r'\s*(?:to|and)\s*' + MA, rest)
    if m3:
        unc = float(m3.group(1).replace(',', '')); rest = rest[m3.end():].strip(' ·')
    elif m4:
        unc = max(float(m4.group(1)), float(m4.group(2))); rest = rest[m4.end():].strip(' ·')
    elif rest.startswith('minimum'):
        note = 'a minimum'
    elif rest.startswith('at least'):
        note = 'at least'
    elif m5 and unc is None:
        a, b = float(m5.group(1).replace(',', '')), float(m5.group(2).replace(',', '')); unc = abs(a - b) / 2; note = 'a range'
    rec = {'ma': ma, 'ageText': text, 'ageHow': rest, 'uncertaintyMa': unc, 'ageNote': note}
    if ma_mid is not None:
        rec['maSpanTo'] = other
    rec['year'] = int(round(THIS_YEAR - ma * 1e6))
    rec['precisionYears'] = int(round(unc * 1e6)) if unc is not None else None
    return rec

def parse_tail(text, where):
    t = text.replace('−', '-')
    if t.lower().startswith('none'):
        return None
    m = re.match(MA + r'\s*[-—–]\s*(.*)$', t)
    if not m:
        raise ParseError('%s: the Tail line is neither none nor "N Ma — reason": %r' % (where, text))
    ma = float(m.group(1).replace(',', ''))
    return {'ma': ma, 'year': int(round(THIS_YEAR - ma * 1e6)), 'reason': m.group(2).strip()}

def parse_place_now(text):
    if text.lower().startswith('none'):
        return None
    p = parse_place('**Place:** ' + text, 'place now')
    return {'name': p['name'], 'short': p['short'], 'lat': p['lat'], 'lon': p['lon'], 'note': p.get('note')}

def parse_replaces(text):
    labels = re.findall(r'\*([^*]+)\*', text)
    if text.lower().startswith('a new mark') or not labels:
        return []
    return labels

def parse_date_line(lines, where):
    ago, tail, sure = None, None, None
    for raw in lines:
        s = raw.strip().rstrip('.').rstrip(',').strip()
        if not s: continue
        low = s.lower()
        if low.startswith('and certainly') or low.startswith('and surely'):
            sure = s           # a third line a writer added: the age by which the thing was certainly here
        elif 'begun by' in low or 'began by' in low or low.startswith('and probably'):
            tail = s
        elif 'ago' in low:
            if ago is not None:
                raise ParseError('%s: two "ago" lines in the date line: %r' % (where, lines))
            ago = s
        else:
            raise ParseError('%s: a date line that is neither ago nor a tail: %r (deep lines count ago only)' % (where, raw))
    if ago is None:
        raise ParseError('%s: no "ago" line in the date line: %r' % (where, lines))
    d = {'ago': ago, 'tail': tail}
    if sure: d['sure'] = sure
    return d

def parse_event(block, source, where):
    lines = block.split('\n')
    m = re.match(r'##\s*(?:\d+\.\s*)?(.+?)\s*$', lines[0])
    if not m:
        raise ParseError('%s: no heading' % where)
    name = re.sub(r'\s*\((revised|revision)\)\s*$', '', m.group(1), flags=re.I)   # batch 7's 'Archaeopteryx (revised)' is the same event, revised
    rec = {'id': slug(name), 'source': {'file': source, 'section': lines[0].lstrip('# ').strip()}}
    rec['label'] = field(lines, 'Label', where)
    rec.update(parse_age(field(lines, 'Age', where), where))
    rec['tail'] = parse_tail(field(lines, 'Tail', where), where)
    rec['evidence'] = 'earliest' if rec['tail'] else 'dated'
    rec['knownFrom'] = field(lines, 'Known from', where)
    rec['placeNow'] = parse_place_now(field(lines, 'Place now', where))
    kind = field(lines, 'Kind', where); k = re.sub(r'\s*\(.*\)\s*$', '', kind.strip().lower())   # 'crop or animal (a living thing; …)' → the word
    if 'living thing' in kind.lower(): k = 'life'   # Michael, 7 Oct: *life* is a kind; the batches reached for it before it existed
    rec['kindRaw'] = kind; rec['kind'] = KINDS.get(k, k)
    if k not in KINDS:
        rec['kindNote'] = 'not in the closed list; kept as written'
    rec['replacesSketch'] = parse_replaces(field(lines, 'Replaces', where, required=False) or 'a new mark')

    # the summary
    for i, ln in enumerate(lines):
        if ln.startswith('**Summary'):
            j = i + 1
            while j < len(lines) and not lines[j].strip(): j += 1
            summary = lines[j].strip(); break
    else:
        raise ParseError('%s: no Summary' % where)
    m = re.match(r'^(.*?)\s*\*More\*\s*$', summary)
    if not m:
        raise ParseError('%s: the summary does not end with *More*: %r' % (where, summary[-40:]))
    rec['summary'] = m.group(1).strip()

    # the More: a code block holding the date line, then paragraphs until Pictures wanted
    try:
        mi = next(i for i, ln in enumerate(lines) if ln.startswith('**More'))
    except StopIteration:
        raise ParseError('%s: no More' % where)
    mw = re.search(r'\((\d+) words', lines[mi])
    j = mi + 1
    while j < len(lines) and lines[j].strip() != '```':
        if lines[j].strip():
            raise ParseError('%s: expected the date line code block after More, found %r' % (where, lines[j]))
        j += 1
    j += 1
    date_lines = []
    while j < len(lines) and lines[j].strip() != '```':
        date_lines.append(lines[j]); j += 1
    j += 1
    paras, cur, quoting = [], [], False
    def flush():
        if cur:
            text = ' '.join(cur); paras.append({'quote': text} if quoting else text)
    while j < len(lines) and not lines[j].startswith('**Pictures wanted'):
        ln = lines[j].strip()
        if ln.startswith('>'):
            if cur and not quoting: flush(); cur = []
            quoting = True; cur.append(ln.lstrip('>').strip())
        elif ln:
            if cur and quoting: flush(); cur = []; quoting = False
            cur.append(ln)
        elif cur:
            flush(); cur = []; quoting = False
        j += 1
    flush()
    if j >= len(lines):
        raise ParseError('%s: no Pictures wanted line after the More' % where)
    rec['more'] = {'dateLine': parse_date_line(date_lines, where), 'paragraphs': paras, 'words': int(mw.group(1)) if mw else None}
    rec['picturesWanted'] = re.sub(r'^\*\*Pictures wanted:\*\*\s*', '', lines[j]).strip()

    try:
        ri = next(i for i, ln in enumerate(lines) if ln.startswith('**References'))
    except StopIteration:
        raise ParseError('%s: no References' % where)
    refs = []; k2 = ri + 1
    while k2 < len(lines) and not lines[k2].startswith('**Notes for us'):
        s = lines[k2].strip()
        if s.startswith('- '): refs.append(s[2:].strip())
        elif s and refs: refs[-1] += ' ' + s
        k2 += 1
    if not refs:
        raise ParseError('%s: the References list is empty' % where)
    rec['references'] = refs
    if not any(ln.startswith('**Notes for us') for ln in lines):
        raise ParseError('%s: no Notes for us (the checks are missing)' % where)
    rec['checked'] = any(ln.startswith('**Checked') for ln in lines)
    rec['weight'] = 3 if rec['replacesSketch'] else 2
    rec['weightStatus'] = 'proposed'
    return rec

def chunk_of(tree, ma):
    """The deepest chunk whose span holds the age; a chunk's own span is [to, from]."""
    best = None
    def walk(node, path):
        nonlocal best
        if ma <= node['from'] and ma >= node['to']:
            best = (path + [node['name']], node)
            for c in node.get('chunks', []): walk(c, path + [node['name']])
    walk(tree, [])
    return best[0][1:] if best else []

def main():
    check = '--check' in sys.argv
    files = sorted(glob.glob(os.path.join(ROOT, 'CWVault/claude/Events-Deep-*.md')))
    tree = json.load(open(os.path.join(ROOT, TREE), encoding='utf-8'))
    events, seen, problems, replaced = [], {}, [], []
    for path in files:
        rel = os.path.relpath(path, ROOT)
        text = open(path, encoding='utf-8').read()
        for block in split_events(text):
            where = '%s § %s' % (rel, block.split('\n')[0].lstrip('# '))
            try:
                rec = parse_event(block, rel, where)
            except ParseError as e:
                problems.append(str(e)); continue
            rec['chunk'] = chunk_of(tree, rec['ma'])
            if rec['id'] in seen:
                # a later batch may revise an earlier event (batch 7's Archaeopteryx): the later file wins
                replaced.append('%s revises %s' % (where, seen[rec['id']]))
                events = [e for e in events if e['id'] != rec['id']]
            seen[rec['id']] = where
            events.append(rec)
    for p in problems:
        print('FAILED', p, file=sys.stderr)
    if problems:
        print('%d record(s) failed to parse; nothing written.' % len(problems), file=sys.stderr); sys.exit(1)
    events.sort(key=lambda e: -e['ma'])
    for r in replaced: print('note:', r)
    print('%d events from %d files' % (len(events), len(files)))
    sketches = sorted(set(l for e in events for l in e['replacesSketch']))
    tree_marks = [mk['label'] for c in tree['chunks'] for mk in walk_marks(c)]
    missing = [l for l in sketches if l not in tree_marks]
    unreplaced = [l for l in tree_marks if l not in sketches]
    print('sketches replaced: %d of the tree\'s %d; named but not in the tree: %s; tree marks not replaced: %s' % (len(sketches), len(tree_marks), missing or 'none', unreplaced or 'none'))
    for e in events:
        flags = []
        if e['uncertaintyMa'] is None: flags.append('no uncertainty on the Age line (%s)' % (e['ageNote'] or 'none stated'))
        if e['placeNow'] is None: flags.append('no place now')
        if 'kindNote' in e: flags.append('kind %r outside the list' % e['kindRaw'])
        if not e['checked']: flags.append('no Checked section')
        if e['more']['words'] and not (240 <= e['more']['words'] <= 360): flags.append('More %d words' % e['more']['words'])
        if flags: print('  %-28s %s' % (e['id'], '; '.join(flags)))
    if check:
        print('check only; nothing written'); return
    out = {
        '_about': 'GENERATED by tools/deep-events-from-vault.py from CWVault/claude/Events-Deep-*.md — do not edit by hand; edit the markdown and run the tool. '
                  'The deep-time events (Prompt-Deep-Time-Events.md), the same record shape as timeline-events.json plus the deep fields: '
                  'ma (millions of years ago), year (the store\'s astronomer\'s year), uncertaintyMa and precisionYears (null when the Age line gives none), '
                  'ageHow (the method, as written), tail ({ ma, year, reason } or null) with evidence "earliest" or "dated", knownFrom, placeNow '
                  '({ name, short, lat, lon } or null: where the evidence is today), replacesSketch (the labels of the marks in deep-time.json this '
                  'record replaces), chunk (the path of chunk names holding its age), more.dateLine as { ago, tail } (deep lines count ago only), '
                  'weight proposed by rule (3 replaces a tree mark, 2 otherwise). Notes for us never enter this file. Read by js/deep-time.js.',
        'version': time.strftime('%Y-%m-%d'), 'sources': [os.path.relpath(f, ROOT) for f in files], 'count': len(events), 'events': events,
    }
    with open(os.path.join(ROOT, OUT), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print('wrote %s: %d events, %.0f kB' % (OUT, len(events), os.path.getsize(os.path.join(ROOT, OUT)) / 1000))

def walk_marks(node):
    for mk in node.get('marks', []): yield mk
    for c in node.get('chunks', []): yield from walk_marks(c)

if __name__ == '__main__':
    main()
