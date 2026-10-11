#!/usr/bin/env python3
"""periods-from-vault.py — the period words, from the vault to the site (Prompt-Build-Timeline-Stack.md, part 1;
the amendment of 10 Oct 2026: the period words live in a store of their own).

Reads CWVault/claude/Periods-Deep-NN.md (written to Prompt-Deep-Time-Periods.md) and writes
cw-deploys/stories/deep-time-periods.json: one record per period, keyed by the period's name as the tree
stories/deep-time.json has it. The markdown is the source; the JSON is generated and never edited by hand.
A section whose Kind is not 'period' (the batches also carry new events in the event form) is skipped and
named in the report. A period in the tree with no record shows its name and span and says nothing.

    python3 tools/periods-from-vault.py            writes the file and reports
    python3 tools/periods-from-vault.py --check    parses and reports, writes nothing
    python3 tools/periods-from-vault.py --links    also lists, period by period, every name in italics (summary, More,
                                                   Inside it) that is not an event's label, heading or id in
                                                   stories/deep-time-events.json, a plot of Plots-Deep-01.md, or a
                                                   period; the page does not yet make italics open anything (11 Oct
                                                   2026), so this is the list of links the page would need to resolve

What each record holds: label; span (from, to, in ma, from the Span line's first numbers; 'now' is 0) and the
Span line's note; length (as written); officialName; knownFrom; opensTo; insideIt; index; picturesWanted;
the summary without its trailing More; the More as paragraphs with its span line (the code block) as text;
the references; checked (the Checked line's words). Notes for us never enter the file.
"""
import glob, json, os, re, sys, time
sys.path.insert(0, os.path.dirname(__file__))
from importlib import import_module
base = import_module('events-from-vault')
split_events, slug = base.split_events, base.slug
ROOT = base.ROOT
OUT = 'cw-deploys/stories/deep-time-periods.json'
TREE = 'cw-deploys/stories/deep-time.json'

class ParseError(Exception):
    pass

def field(lines, name, required=True, where=''):
    for ln in lines:
        if ln.startswith('**%s:**' % name):
            return re.sub(r'^\*\*%s:\*\*\s*' % re.escape(name), '', ln).strip()
    if required:
        raise ParseError('%s: no %s line' % (where, name))
    return None

def num(s):
    return float(s.replace(',', ''))

def parse_span(text, where):
    # '4,600 to 4,000 Ma', '5.3 Ma to now', and batch 3's '130,000 to 115,000 years ago', '11,700 years ago to now':
    # a span written in years ago is divided down to Ma, which is what the tree and the page count in
    t = text.replace('−', '-')
    m = re.match(r'([\d.,]+)\s*(Ma|years ago)?\s*to\s*(now|[\d.,]+)\s*(Ma|years ago)?\s*(?:·\s*(.*))?$', t)
    if not m:
        raise ParseError('%s: the Span line does not parse: %r' % (where, text))
    unit = m.group(2) or m.group(4) or 'Ma'
    k = 1e-6 if unit == 'years ago' else 1.0
    a = num(m.group(1)) * k; b = 0.0 if m.group(3) == 'now' else num(m.group(3)) * k
    if k != 1.0: a, b = round(a, 9), round(b, 9)
    return {'from': a, 'to': b, 'note': (m.group(5) or '').strip()}

def parse(block, source, where):
    lines = block.split('\n')
    m = re.match(r'##\s*(?:\d+\.\s*)?(.+?)\s*$', lines[0])
    if not m:
        raise ParseError('%s: no heading' % where)
    name = m.group(1).strip()
    kind = (field(lines, 'Kind', required=False, where=where) or '').strip().lower()
    if kind != 'period':
        return None, '%s: kind %r, not a period; skipped' % (where, kind or 'none')
    rec = {'name': field(lines, 'Label', where=where), 'id': slug(name), 'source': {'file': source, 'section': lines[0].lstrip('# ').strip()}}
    sp = parse_span(field(lines, 'Span', where=where), where)
    rec['from'] = sp['from']; rec['to'] = sp['to']; rec['spanNote'] = sp['note']
    for key, fname in (('length', 'Length'), ('officialName', 'Official name'), ('knownFrom', 'Known from'), ('opensTo', 'Opens to'), ('insideIt', 'Inside it'), ('index', 'Index'), ('picturesWanted', 'Pictures wanted')):
        rec[key] = field(lines, fname, required=False, where=where)
    # the summary
    for i, ln in enumerate(lines):
        if ln.startswith('**Summary'):
            j = i + 1
            while j < len(lines) and not lines[j].strip(): j += 1
            summary = lines[j].strip(); break
    else:
        raise ParseError('%s: no Summary' % where)
    m2 = re.match(r'^(.*?)\s*\*More\*\s*$', summary)
    if not m2:
        raise ParseError('%s: the summary does not end with *More*: %r' % (where, summary[-40:]))
    rec['summary'] = m2.group(1).strip()
    # the More: a code block with the span line, then paragraphs until Pictures wanted / References / Notes
    try:
        mi = next(i for i, ln in enumerate(lines) if ln.startswith('**More'))
    except StopIteration:
        raise ParseError('%s: no More' % where)
    mw = re.search(r'\((\d+) words', lines[mi])
    j = mi + 1
    while j < len(lines) and lines[j].strip() != '```':
        if lines[j].strip(): raise ParseError('%s: expected the span line code block after More, found %r' % (where, lines[j]))
        j += 1
    j += 1
    span_lines = []
    while j < len(lines) and lines[j].strip() != '```':
        span_lines.append(lines[j].strip()); j += 1
    j += 1
    paras, cur, quoting = [], [], False
    def flush():
        if cur:
            text = ' '.join(cur); paras.append({'quote': text} if quoting else text)
    while j < len(lines) and not re.match(r'\*\*(Pictures wanted|References|Notes for us|Checked)', lines[j]):
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
    rec['more'] = {'spanLine': ' '.join(l for l in span_lines if l), 'paragraphs': paras, 'words': int(mw.group(1)) if mw else None}
    try:
        ri = next(i for i, ln in enumerate(lines) if ln.startswith('**References'))
    except StopIteration:
        raise ParseError('%s: no References' % where)
    refs = []; k = ri + 1
    while k < len(lines) and not lines[k].startswith('**'):
        s = lines[k].strip()
        if s.startswith('- '): refs.append(s[2:].strip())
        elif s and refs: refs[-1] += ' ' + s
        k += 1
    rec['references'] = refs
    # the Checked line as the batches write it: '**Checked (10 Oct 2026, three independent checkers and one for numbers).** Changed: …';
    # the record keeps the words in the brackets — when and by whom — and not the paragraph
    rec['checked'] = None
    for ln in lines:
        mc = re.match(r'\*\*Checked\s*\(([^)]*)\)', ln)
        if mc: rec['checked'] = mc.group(1).strip(); break
        if ln.startswith('**Checked:**'): rec['checked'] = ln[len('**Checked:**'):].strip(); break
    return rec, None

EVENTS = 'cw-deploys/stories/deep-time-events.json'
PLOTS = 'CWVault/claude/Plots-Deep-01.md'

def italics(text):
    return re.findall(r'\*([^*\n]+?)\*', text or '')

def link_targets():
    """Every name an italic could stand for: an event's label, its heading in the batch file, its id (and the
    aliases that reach it), a plot's heading, a period's name. Labels and headings differ where Michael renamed an
    event after it was written (Animals, kept → Animals, fossils), so both count."""
    ev = json.load(open(os.path.join(ROOT, EVENTS), encoding='utf-8'))
    names = {}
    for e in ev['events']:
        names[e['label']] = 'event ' + e['id']
        sec = re.sub(r'^\d+\.\s*', '', (e.get('source') or {}).get('section', ''))
        sec = re.sub(r'\s*\((revised|revision)\)\s*$', '', sec, flags=re.I)
        if sec: names.setdefault(sec, 'event ' + e['id'] + ' (its heading)')
    ids = {e['id'] for e in ev['events']}; ids.update(ev.get('aliases', {}).keys())
    plots = set()
    for ln in open(os.path.join(ROOT, PLOTS), encoding='utf-8'):
        m = re.match(r'##\s*(?:\d+\.\s*)?(.+?)\s*$', ln)
        if m: plots.add(m.group(1).strip())
    return names, ids, plots

def link_report(recs, tree_names_, extra_blocks=()):
    names, ids, plots = link_targets()
    def resolve(n):
        if n in names: return names[n]
        if slug(n) in ids: return 'event ' + slug(n) + ' (by id)'
        if n in plots: return 'plot'
        if n in tree_names_: return 'period'
        return None
    print('links: every name in italics in the periods (summary, More, Inside it)%s, and what it resolves to; the page does not yet make italics open anything' % (' and the new events' if extra_blocks else ''))
    for name, rec in recs.items():
        found = []
        for t in [rec['summary'], rec.get('insideIt') or ''] + [p if isinstance(p, str) else p['quote'] for p in rec['more']['paragraphs']]:
            found += italics(t)
        seen, bad = [], []
        for n in found:
            if n in seen: continue
            seen.append(n)
            if resolve(n) is None: bad.append(n)
        print('  %-20s %2d italic name(s); unresolved: %s' % (name, len(seen), ', '.join(bad) or 'none'))
    for label, text in extra_blocks:
        seen, bad = [], []
        for n in italics(text):
            if n in seen: continue
            seen.append(n)
            if resolve(n) is None: bad.append(n)
        print('  %-20s %2d italic name(s); unresolved: %s' % ('(event) ' + label, len(seen), ', '.join(bad) or 'none'))

def new_event_blocks(files):
    """The new events the period batches carry (Kind not period): their summary and More, for the link check."""
    out = []
    for path in files:
        for block in split_events(open(path, encoding='utf-8').read()):
            lines = block.split('\n')
            if (field(lines, 'Kind', required=False) or '').strip().lower() == 'period': continue
            label = field(lines, 'Label', required=False)
            if not label: continue
            try:
                mi = next(i for i, ln in enumerate(lines) if ln.startswith('**More'))
                pi = next(i for i, ln in enumerate(lines) if ln.startswith('**Pictures wanted'))
                si = next(i for i, ln in enumerate(lines) if ln.startswith('**Summary'))
            except StopIteration:
                continue
            body = [ln for ln in lines[si:pi] if not ln.startswith('**')]   # the summary and the More's paragraphs, not the bold field lines
            out.append((label, '\n'.join(body).replace('*More*', '')))
    return out

def tree_names(node, out):
    out[node['name']] = node
    for c in node.get('chunks', []): tree_names(c, out)
    return out

def main():
    check = '--check' in sys.argv
    files = sorted(glob.glob(os.path.join(ROOT, 'CWVault/claude/Periods-Deep-[0-9]*.md')))
    tree = json.load(open(os.path.join(ROOT, TREE), encoding='utf-8'))
    names = tree_names(tree, {})
    recs, problems, notes = {}, [], []
    for path in files:
        rel = os.path.relpath(path, ROOT)
        for block in split_events(open(path, encoding='utf-8').read()):
            where = '%s § %s' % (rel, block.split('\n')[0].lstrip('# '))
            try:
                rec, note = parse(block, rel, where)
            except ParseError as e:
                problems.append(str(e)); continue
            if note: notes.append(note); continue
            if rec['name'] in recs: notes.append('%s revises %s' % (where, recs[rec['name']]['source']['section']))
            recs[rec['name']] = rec
    for p in problems: print('FAILED', p, file=sys.stderr)
    if problems:
        print('%d section(s) failed to parse; nothing written.' % len(problems), file=sys.stderr); sys.exit(1)
    for n in notes: print('note:', n)
    missing = [n for n in names if n not in recs and names[n] is not tree]
    extra = [n for n in recs if n not in names]
    off = [(n, recs[n]['from'], recs[n]['to'], names[n]['from'], names[n]['to']) for n in recs if n in names and (recs[n]['from'] != names[n]['from'] or recs[n]['to'] != names[n]['to'])]
    print('%d periods from %d files; %d of the tree\'s %d have words; without words: %s' % (len(recs), len(files), len(recs) - len(extra), len(names) - 1, ', '.join(missing) or 'none'))
    if extra: print('words for periods not in the tree:', extra)
    if off: print('dates that differ from the tree (the tree wins on the page):', off)
    unchecked = [n for n in recs if not recs[n]['checked'] or recs[n]['checked'].lower().startswith('not yet')]
    if unchecked: print('not yet checked: %d of %d' % (len(unchecked), len(recs)))
    if '--links' in sys.argv: link_report(recs, names, new_event_blocks(files))
    if check: print('check only; nothing written'); return
    out = {'_about': 'GENERATED by tools/periods-from-vault.py from CWVault/claude/Periods-Deep-*.md — do not edit by hand; edit the markdown and run the tool. The words of the periods of stories/deep-time.json, keyed by name: the summary (its trailing More removed; the page adds the word), the More as paragraphs with its span line, the official name, known from, what opens and what is inside, the references, the Pictures wanted line as data, and the Checked line. The tree carries the period\'s edges and colour; where the words\' Span differs the tree wins on the page. Read by active/time-machine.html.',
           'version': time.strftime('%Y-%m-%d'), 'sources': [os.path.relpath(f, ROOT) for f in files], 'count': len(recs), 'periods': recs}
    with open(os.path.join(ROOT, OUT), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1); f.write('\n')
    print('wrote %s: %d periods, %.0f kB' % (OUT, len(recs), os.path.getsize(os.path.join(ROOT, OUT)) / 1000))

if __name__ == '__main__':
    main()
