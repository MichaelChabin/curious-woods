#!/usr/bin/env python3
"""events-from-vault.py — the timeline events, from the vault to the site.

Reads the event batches written to Timeline-Stories.md (CWVault/claude/Events-Batch-01.md to -07.md
and the two worked samples in Timeline-Samples.md) and writes cw-deploys/stories/timeline-events.json
for the Time Machine (active/time-machine.html). tools/deep-events-from-vault.py imports this file's
parser and folds the same records into stories/deep-time-events.json, the one store of Deep Time
(9 Oct 2026). The markdown is the source; the JSON
is generated and never edited by hand.

    python3 tools/events-from-vault.py            writes the file and reports
    python3 tools/events-from-vault.py --check    parses and reports, writes nothing

What each record holds (Timeline-Stories.md, "What an event record holds"): an id; the year
(astronomers' year) and its precision; the place, with name and latitude and longitude; the
kind; the label; the summary (without its trailing More); the More, as paragraphs, with its
date line stored as its parts (the after-the-ice count, the ordinary date, years ago, and whether
each is "about"), not as one string; its references; and the "Pictures wanted" line kept as data.
"Notes for us" never enters the file. A proposed weight (1 to 3) is added to each, marked as
proposed: weights are editorial and Michael's to change (Spec-Maps, "Zoom is a tool").

A record that fails to parse is reported, with why, and the run stops: nothing is guessed.
"""
import json
import os
import re
import sys
import unicodedata

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SOURCES = [
    ('CWVault/claude/Events-Batch-01.md', 'batch-01'),
    ('CWVault/claude/Events-Batch-02.md', 'batch-02'),
    ('CWVault/claude/Events-Batch-03.md', 'batch-03'),
    ('CWVault/claude/Events-Batch-04.md', 'batch-04'),
    ('CWVault/claude/Events-Batch-05.md', 'batch-05'),
    ('CWVault/claude/Events-Batch-06.md', 'batch-06'),
    ('CWVault/claude/Events-Batch-07.md', 'batch-07'),
    ('CWVault/claude/Timeline-Samples.md', 'samples'),
]
OUT = 'cw-deploys/stories/timeline-events.json'

# The closed list of kinds (Spec-Maps, After the Ice: "Kind"); the batch writes them in words.
KINDS = {
    'sky event': 'sky', 'sky': 'sky',
    'earth event': 'earth', 'earth': 'earth',
    'crop or animal': 'crop', 'crop': 'crop',
    'craft or invention': 'craft', 'craft': 'craft',
    'object': 'object', 'place': 'place', 'person': 'person',
    'text': 'text', 'text (music)': 'text',
    'life': 'life', 'living thing': 'life',   # 7 Oct 2026, Michael: a kind for living things that are neither crop nor animal
}
PRECISIONS = {'exact', 'year', 'decade', 'century', 'millennium'}

# Proposed weights, 1 to 3, by record id. Editorial, marked proposed in the file. The reasoning:
# 3 for a thing she will meet again all over Curious Woods (maize, writing, Pompeii, Homer,
# Eratosthenes, Göbekli Tepe); 2 for a strong single story; 1 for a fine thing that is local
# or small on the map.
WEIGHTS = {
    'maize': 3, 'storegga-slide': 2, 'writing-at-uruk': 3, 'otzi': 2, 'drains-of-mohenjo-daro': 2,
    'campo-del-cielo': 1, 'thera-erupts': 2, 'oldest-written-song': 2, 'rhind-papyrus': 2,
    'lapita-voyagers': 2, 'nok-heads': 1, 'homer-written-down': 3, 'kalinga-war': 2,
    'eratosthenes-measures-the-earth': 3, 'antikythera-mechanism': 2, 'vesuvius-buries-pompeii': 3,
    'zhang-hengs-earthquake-jar': 1, 'diamond-sutra': 2, 'a-new-star': 2, 'great-zimbabwe': 2,
    'stone-pillars-at-gobekli-tepe': 3, 'eclipse-stops-a-battle': 2,
    # batch 2 (1500 to now, outside Europe)
    'chillies-reach-asia': 2, 'timbuktus-books': 2, 'the-silver-mountain-at-potosi': 2, 'florentine-codex': 2,
    'huaynaputina-erupts': 1, 'taj-mahal': 3, 'the-last-dodo': 2, 'sangaku': 2, 'jantar-mantar': 2,
    'tupaias-map': 2, 'haiti-becomes-free': 3, 'suez-canal': 2, 'krakatoa': 3, 'tunguska': 2,
    'ramanujans-letter': 2, 'leavitts-rule': 2, 'andromeda-is-another-galaxy': 3, 'the-biggest-earthquake': 2,
    'footprints-on-the-moon': 3, 'the-last-case-of-smallpox': 3, 'the-green-belt': 2,
    # batch 3 (the ice to the Great Pyramid, upgraded from the September records)
    'the-ice-lets-go': 3, 'figs-at-gilgal': 1, 'the-tower-of-jericho': 2, 'squash-in-a-mexican-cave': 1,
    'rice-on-the-yangtze': 2, 'catalhoyuk': 2, 'a-lake-drains-the-world-cools': 2, 'mount-mazama-becomes-crater-lake': 1,
    'cattle-in-a-green-sahara': 2, 'copper-from-stone': 2, 'silk-unwound': 2, 'a-wagon-on-a-pot': 2,
    'the-uluburun-ship': 2, 'caral': 2, 'the-great-pyramid': 3,
    # batch 4 (Stonehenge to Aeschylus, upgraded from the September records)
    'stonehenge': 3, 'enheduanna': 2, 'first-alphabet': 3, 'oracle-bones': 2, 'iron': 2, 'olmec-heads': 2,
    'greek-alphabet': 2, 'assyrian-eclipse': 1, 'jerwan-aqueduct': 1, 'ninevehs-library': 2, 'first-coins': 2,
    'pythagoras': 3, 'athens-votes': 3, 'confucius': 3, 'aeschylus': 2,
    # batch 5 (Anaxagoras to Gutenberg, upgraded from the September records; 8 Oct)
    'anaxagoras': 2, 'socrates': 3, 'paper': 3, 'teotihuacan': 2, 'zero': 3, 'algebra': 2, 'hawaii': 2,
    'ibn-al-haytham': 2, 'compass': 2, 'chartres-blue': 2, 'fibonacci': 2, 'aotearoa': 2, 'gutenberg': 3,
    # batch 6 (Galileo to Darwin; 8 Oct)
    'galileos-telescope': 3, 'decimal-fractions': 2, 'franklins-kite': 2, 'galvanis-frogs': 2, 'laki': 2,
    'voltas-pile': 2, 'tambora': 3, 'frankenstein': 3, 'first-photograph': 2, 'faradays-ring': 2, 'darwins-tree': 3,
    # batch 7 (Issun-bōshi to the first web page; 8 Oct)
    'issun-boshi': 1, 'daguerreotype': 2, 'paint-tubes': 1, 'japanese-prints': 2, 'impression-sunrise': 2,
    'galloping-horse': 2, 'van-gogh-in-arles': 2, 'eiffel-tower': 2, 'montparnasse-train': 2, 'lumiere-show': 2,
    'radium': 2, 'first-web-page': 3,
}


class ParseError(Exception):
    pass


def slug(text):
    t = unicodedata.normalize('NFKD', text)
    t = ''.join(c for c in t if not unicodedata.combining(c))
    t = t.lower().replace('’', '').replace("'", '').replace('ʻ', '')   # the ʻokina of Hawaiʻi: the id is hawaii
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t


def num(s):
    """'3,000' -> 3000; '−584.6' -> -584.6 (the batch writes a true minus sign)."""
    s = s.replace(',', '').replace('−', '-').strip()
    return float(s) if '.' in s else int(s)


def parse_year(line, where):
    m = re.match(r"\*\*Year:\*\*\s*(about\s+)?([−\-]?[\d.,]+)\s*(?:\(([^)]*)\))?\s*·\s*precision:\s*(\w+)\s*(?:\(([^)]*)\))?\s*·\s*kind:\s*(.+?)\s*$", line)
    if not m:
        raise ParseError('%s: the Year line does not parse: %r' % (where, line))
    about, year, year_note, precision, prec_note, kind_raw = m.groups()
    if precision not in PRECISIONS:
        raise ParseError('%s: precision %r is not one of %s' % (where, precision, sorted(PRECISIONS)))
    rec = {'year': num(year), 'yearAbout': bool(about), 'precision': precision, 'kindRaw': kind_raw.strip()}
    # a note in brackets after the year ("−398 (399 BCE)") or after the precision word ("exact (19 August
    # 1839)", "decade (the Kanbun era, 1661–1673)", "year (January to March)"): the word before the bracket
    # is the precision; the note is for us. An exact precision's note is the date itself (exactDate);
    # any other note is kept as precisionNote, and the year's as yearNote. Nothing on the page reads them.
    if year_note:
        rec['yearNote'] = year_note.strip()
    if prec_note:
        note = prec_note.strip()
        if precision == 'exact' and re.search(r'\d', note):
            rec['exactDate'] = note
        else:
            rec['precisionNote'] = note
    k = kind_raw.strip().lower()
    if k in KINDS:
        rec['kind'] = KINDS[k]
    else:
        rec['kind'] = k
        rec['kindNote'] = 'not in the closed list (sky, earth, crop, craft, object, place, person, text); kept as written'
    return rec


def parse_place(line, where):
    text = re.sub(r'^\*\*Place:\*\*\s*', '', line).strip()
    # "(37.22 N, 38.92 E)", or "(38.0 N, 23.7 E marks Athens, where ...)" — words after the
    # coordinates inside the bracket are a note about them, kept as place.note
    m = re.search(r'\((\d+(?:\.\d+)?)\s*([NS]),\s*(\d+(?:\.\d+)?)\s*([EW])([^)]*)\)', text)
    place = {'name': text}
    if m:
        lat = float(m.group(1)) * (1 if m.group(2) == 'N' else -1)
        lon = float(m.group(3)) * (1 if m.group(4) == 'E' else -1)
        place['lat'] = lat
        place['lon'] = lon
        if m.group(5).strip(' ,;'):
            place['note'] = m.group(5).strip(' ,;')          # e.g. 'marks Athens, where a written version is later reported'
        before = text[:m.start()].strip().rstrip(',;')
    else:
        place['lat'] = None
        place['lon'] = None
        place['note'] = 'no coordinates in the source'
        before = text
    # a short name for the map: the first comma-separated part, without "found in"/"recorded at";
    # where the source names a stand-in after a colon ("On the map, the launch site stands in
    # for it: Kennedy Space Center, Florida"), the stand-in is the name
    if ':' in before:
        before = before.split(':')[-1]
    short = before.split(',')[0].split(';')[0].strip()
    short = re.sub(r'^(found in|recorded at|near)\s+', '', short)
    short = re.sub(r'\s*\([^)]*\)', '', short).strip()
    short = re.sub(r'\.$', '', short)
    place['short'] = short
    return place


def parse_date_line(lines, where):
    parts = {}
    for raw in lines:
        s = raw.strip().rstrip('.').rstrip(',').strip()
        if not s:
            continue
        low = s.lower()
        if 'after the ice' in low:
            # "About 3,000 years after the ice", or batch 3's "Year 0 after the ice" for the ice itself
            m = re.match(r'(about\s+)?(?:year\s+)?([\d,]+)\s+(?:years\s+)?after the ice', low)
            if not m:
                raise ParseError('%s: date line %r does not parse (after the ice)' % (where, raw))
            parts['count'] = {'value': num(m.group(2)), 'about': bool(m.group(1))}
        elif low.endswith('years ago'):
            m = re.match(r'(?:or\s+)?(about\s+)?([\d,]+)\s+years ago', low)
            if not m:
                raise ParseError('%s: date line %r does not parse (years ago)' % (where, raw))
            parts['ago'] = {'value': num(m.group(2)), 'about': bool(m.group(1))}
        else:
            m = re.match(r'(?:or\s+)?(about\s+)?(.+)$', s, re.I)
            if not m:
                raise ParseError('%s: date line %r does not parse (ordinary date)' % (where, raw))
            parts['ordinary'] = {'text': m.group(2).strip(), 'about': bool(m.group(1))}
    if 'count' not in parts or 'ordinary' not in parts:
        raise ParseError('%s: the date line lacks the count or the ordinary date: %r' % (where, lines))
    return parts


def parse_event(block, source, where):
    lines = block.split('\n')
    heading = lines[0]
    m = re.match(r'##\s*(?:\d+\.\s*)?(.+?)\s*$', heading)
    if not m:
        raise ParseError('%s: no heading' % where)
    rec = {'id': slug(m.group(1)), 'source': {'file': source, 'section': heading.lstrip('# ').strip()}}

    def one(field):
        for ln in lines:
            if ln.startswith('**%s' % field):
                return ln
        raise ParseError('%s: no %s line' % (where, field))

    rec['label'] = re.sub(r'^\*\*Label:\*\*\s*', '', one('Label:')).strip()
    rec.update(parse_year(one('Year:'), where))
    rec['place'] = parse_place(one('Place:'), where)
    for ln in lines:
        if ln.startswith('**Replaces:**'):
            # ids in backticks, one or several ("`tambora`, `lead-frank-4`"; "`x` and `y`"); or the word
            # none ("none (new record)", batch 7's Issun-bōshi), which names no id
            rest = re.sub(r'^\*\*Replaces:\*\*', '', ln).strip()
            ids = re.findall(r'`([^`]+)`', ln)
            if not ids and rest.lower().startswith('none'):
                ids = []
            elif not ids:
                ids = [t.strip() for t in re.split(r',|\band\b', rest) if t.strip()]
            if not ids and not rest.lower().startswith('none'):
                raise ParseError('%s: the Replaces line names no id: %r' % (where, ln))
            if ids:
                rec['replaces'] = ids

    # the summary: the line after the Summary header, its trailing *More* removed
    for i, ln in enumerate(lines):
        if ln.startswith('**Summary'):
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            summary = lines[j].strip()
            break
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
        date_lines.append(lines[j])
        j += 1
    j += 1
    paras, cur, quoting = [], [], False
    def flush():
        if cur:
            text = ' '.join(cur)
            paras.append({'quote': text} if quoting else text)
    while j < len(lines) and not lines[j].startswith('**Pictures wanted'):
        ln = lines[j].strip()
        if ln.startswith('>'):                      # a set-apart quotation (blockquote in css/story.css)
            if cur and not quoting:
                flush(); cur = []
            quoting = True
            cur.append(ln.lstrip('>').strip())
        elif ln:
            if cur and quoting:
                flush(); cur = []; quoting = False
            cur.append(ln)
        elif cur:
            flush(); cur = []; quoting = False
        j += 1
    flush()
    if j >= len(lines):
        raise ParseError('%s: no Pictures wanted line after the More' % where)
    rec['more'] = {'dateLine': parse_date_line(date_lines, where), 'paragraphs': paras,
                   'words': int(mw.group(1)) if mw else None}
    rec['picturesWanted'] = re.sub(r'^\*\*Pictures wanted:\*\*\s*', '', lines[j]).strip()

    # references: the list items after the References header
    try:
        ri = next(i for i, ln in enumerate(lines) if ln.startswith('**References'))
    except StopIteration:
        raise ParseError('%s: no References' % where)
    refs = []
    k = ri + 1
    while k < len(lines) and not lines[k].startswith('**'):      # the list ends at the next header: Notes for us, or Checked
        s = lines[k].strip()
        if s.startswith('- '):
            refs.append(s[2:].strip())
        elif s and refs:
            refs[-1] += ' ' + s
        k += 1
    if not refs:
        raise ParseError('%s: the References list is empty' % where)
    rec['references'] = refs
    # Notes for us: read only to be sure it exists, never copied
    if not any(ln.startswith('**Notes for us') for ln in lines):
        raise ParseError('%s: no Notes for us (the checks are missing)' % where)

    # the proposed weight
    if rec['id'] not in WEIGHTS:
        raise ParseError('%s: no proposed weight in WEIGHTS for id %r; add one' % (where, rec['id']))
    rec['weight'] = WEIGHTS[rec['id']]
    rec['weightStatus'] = 'proposed'

    # the after-the-ice count must agree with the year (the standard: the store's year + 10 000)
    count = rec['more']['dateLine']['count']['value']
    expect = rec['year'] + 10000
    if abs(count - expect) > (500 if rec['precision'] == 'millennium' else 60 if rec['precision'] == 'century' else 6):
        raise ParseError('%s: the date line says %s after the ice but the year %s gives %s' % (where, count, rec['year'], expect))
    return rec


def split_events(text):
    """The '## N. Name' sections; the samples file uses '## 1. Name' too."""
    blocks, cur = [], None
    for ln in text.split('\n'):
        if ln.startswith('## '):
            if cur:
                blocks.append('\n'.join(cur))
            cur = [ln]
        elif cur is not None:
            cur.append(ln)
    if cur:
        blocks.append('\n'.join(cur))
    return blocks


def main():
    check = '--check' in sys.argv
    events, seen, problems = [], {}, []
    for rel, short in SOURCES:
        path = os.path.join(ROOT, rel)
        with open(path, encoding='utf-8') as f:
            text = f.read()
        for block in split_events(text):
            where = '%s § %s' % (rel, block.split('\n')[0].lstrip('# '))
            try:
                rec = parse_event(block, rel, where)
            except ParseError as e:
                problems.append(str(e))
                continue
            if rec['id'] in seen:
                problems.append('%s: id %r already used by %s' % (where, rec['id'], seen[rec['id']]))
                continue
            seen[rec['id']] = where
            events.append(rec)
    for p in problems:
        print('FAILED', p, file=sys.stderr)
    if problems:
        print('%d record(s) failed to parse; nothing written.' % len(problems), file=sys.stderr)
        sys.exit(1)
    events.sort(key=lambda e: e['year'])
    out = {
        '_about': 'GENERATED by tools/events-from-vault.py from ' + ' and '.join(r for r, _ in SOURCES) +
                  ' — do not edit by hand; edit the markdown and run the tool. The timeline events '
                  'written to Timeline-Stories.md: label, summary (its trailing More removed; the page adds the word), '
                  'the More as paragraphs with its date line as parts (count after the ice, the ordinary date, years ago, '
                  'each with whether it is "about"; a paragraph that is a set-apart quotation is {"quote": text}), '
                  'references, and the Pictures wanted line as data. YEAR is the '
                  'astronomer\'s year (negative for BC), PRECISION one of exact, year, decade, century, millennium. '
                  'KIND is the closed list (sky, earth, crop, craft, object, place, person, text); a kind outside it is '
                  'kept as written and marked with kindNote. WEIGHT (1 to 3) is proposed by the tool and marked '
                  'proposed: editorial, Michael\'s to change. place.short is derived for the map label; place.name is '
                  'the source\'s words. REPLACES (batch 3 onward) names the September ids in '
                  'stories/after-the-ice-events.json that this record retires; the page drops those and keeps their '
                  'ids as aliases, so her line still finds them (since 9 Oct 2026 batches 1 and 2 carry Replaces lines too, '
                  'for the pairs the page once held in SAME). Notes for us and the Checked paragraph never enter this file. Read by '
                  'active/time-machine.html; folded into stories/deep-time-events.json by tools/deep-events-from-vault.py.',
        'version': '2026-10-09',
        'sources': [r for r, _ in SOURCES],
        'count': len(events),
        'events': events,
    }
    for e in events:
        flags = []
        if e['place']['lat'] is None:
            flags.append('no coordinates')
        if 'kindNote' in e:
            flags.append('kind %r outside the closed list' % e['kind'])
        if e.get('replaces'):
            flags.append('replaces ' + ', '.join(e['replaces']))
        if any(isinstance(q, dict) for q in e['more']['paragraphs']):
            flags.append('%d quotation(s)' % sum(1 for q in e['more']['paragraphs'] if isinstance(q, dict)))
        print('%-34s %9s %-10s %-7s w%d  %s%s' % (e['id'], e['year'], e['precision'], e['kind'], e['weight'],
                                                 e['place']['short'], ('  [' + '; '.join(flags) + ']') if flags else ''))
    if check:
        print('%d events parsed; --check, nothing written.' % len(events))
        return
    outp = os.path.join(ROOT, OUT)
    with open(outp, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write('\n')
    print('%d events written to %s (%d KB)' % (len(events), OUT, os.path.getsize(outp) // 1024))


if __name__ == '__main__':
    main()
