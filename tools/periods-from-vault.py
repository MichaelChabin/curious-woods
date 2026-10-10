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
    t = text.replace('−', '-')
    m = re.match(r'([\d.,]+)\s*(?:Ma)?\s*to\s*(now|[\d.,]+)\s*(?:Ma)?\s*(?:·\s*(.*))?$', t)
    if not m:
        raise ParseError('%s: the Span line does not parse: %r' % (where, text))
    a = num(m.group(1)); b = 0.0 if m.group(2) == 'now' else num(m.group(2))
    return {'from': a, 'to': b, 'note': (m.group(3) or '').strip()}

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
    rec['checked'] = field(lines, 'Checked', required=False, where=where)
    return rec, None

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
    if check: print('check only; nothing written'); return
    out = {'_about': 'GENERATED by tools/periods-from-vault.py from CWVault/claude/Periods-Deep-*.md — do not edit by hand; edit the markdown and run the tool. The words of the periods of stories/deep-time.json, keyed by name: the summary (its trailing More removed; the page adds the word), the More as paragraphs with its span line, the official name, known from, what opens and what is inside, the references, the Pictures wanted line as data, and the Checked line. The tree carries the period\'s edges and colour; where the words\' Span differs the tree wins on the page. Read by active/time-machine.html.',
           'version': time.strftime('%Y-%m-%d'), 'sources': [os.path.relpath(f, ROOT) for f in files], 'count': len(recs), 'periods': recs}
    with open(os.path.join(ROOT, OUT), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1); f.write('\n')
    print('wrote %s: %d periods, %.0f kB' % (OUT, len(recs), os.path.getsize(os.path.join(ROOT, OUT)) / 1000))

if __name__ == '__main__':
    main()
