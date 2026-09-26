#!/usr/bin/env python3
"""Reorganise cw-deploys/art/ from one flat folder into folders by kind and by story.

    python3 tools/reorganise-art.py            # print the plan, change nothing
    python3 tools/reorganise-art.py --apply    # move the files and rewrite every reference

Run from anywhere; paths are taken from this file's location. Nothing is deleted.
Safe to run twice: a second run finds nothing left to move and no old paths to rewrite.

The shape (26 Sept 2026, CWVault/claude/Prompt-Reorganise-Art.md):

    art/icons/            every *-icon-256.png and *-icon-256.svg
    art/gallery/          every *-gallery.jpg and *-gallery.png
    art/maps/             untouched
    art/palette/          the sixteen March paintings palettes.json was made from, and palettes.json
    art/stories/<slug>/   everything else, by the one story page that names it
    art/shared/           a picture named by more than one story page

Which story a picture belongs to is decided by which active/ page names it, not by its name.
A picture named by no story page is reported and left where it is.
"""
import os, re, subprocess, sys
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEPLOY = os.path.join(ROOT, 'cw-deploys')
ART = os.path.join(DEPLOY, 'art')
VAULT_STORIES = os.path.join(ROOT, 'CWVault', 'claude')
APPLY = '--apply' in sys.argv

# A story page's slug, short and plain.
SLUGS = {
    'active/vermeer-girl-with-a-pearl-earring.html': 'vermeer',
    'active/hokusai-the-great-wave.html': 'hokusai',
    'active/van-gogh-starry-night.html': 'van-gogh',
    'active/professor-neckers-drawing.html': 'necker',
    'active/three-at-a-glance.html': 'three-at-a-glance',
    'active/about-your-brain.html': 'brain',
    'active/the-man-who-learned-without-knowing.html': 'man-who-learned',
    'active/glass-geometry.html': 'glass-geometry',
}

# The sixteen palette paintings of March, with plain names: lowercase, hyphens, spelling fixed, .jpg.
PALETTE = {
    'Alahambra.jpg': 'alhambra.jpg',
    'Chinese Porcelan.jpeg': 'chinese-porcelain.jpg',
    'Degas Guitarist.jpeg': 'degas-the-guitarist.jpg',
    'Earth.jpeg': 'earth.jpg',
    'Glass Chartres.jpg': 'glass-chartres.jpg',
    'Glass Gaudi.jpg': 'glass-gaudi.jpg',
    'Hiroshige Rain on Bridge.jpg': 'hiroshige-rain-on-bridge.jpg',
    'Hokusai Great Wave.jpg': 'hokusai-great-wave.jpg',
    'Manet The Piper.jpeg': 'manet-the-piper.jpg',
    'Matisse The Red Room.jpg': 'matisse-the-red-room.jpg',
    'Sargent 4 Girls.jpeg': 'sargent-four-girls.jpg',
    'Sargent Lilly and Rose.jpeg': 'sargent-carnation-lily-lily-rose.jpg',
    'Sun surface closup.jpg': 'sun-surface-close-up.jpg',
    'Van Gogh Cafe Terrace.jpeg': 'van-gogh-cafe-terrace.jpg',
    'Van Gogh Stary Night.jpg': 'van-gogh-starry-night.jpg',
    'Vermeer Girl with Perl Earring.jpeg': 'vermeer-girl-with-a-pearl-earring.jpg',
}

# The Frankenstein pictures have no page yet; they go by the story's frontmatter
# (CWVault/claude/Story-Have-You-Thought-of-a-Story.md).
FRANKENSTEIN = {'frankenstein-draft-21r.jpg', 'frankenstein-1818-title-page.jpg',
                'aldini-1804-plate.jpg', 'galvani-1791-frogs.jpg', 'villa-diodati-finden.jpg'}

# Names the vault uses for files that do not exist under that name.
VAULT_ONLY = {'aldini-1804-plate-4.jpg': 'stories/frankenstein/aldini-1804-plate.jpg'}

ICON = re.compile(r'-icon-256\.(png|svg)$')
GALLERY = re.compile(r'-gallery\.(jpg|png)$')
CODE = ('.html', '.js', '.json', '.css')
TEXT = CODE + ('.md',)


def deploy_files(exts):
    for root, dirs, files in os.walk(DEPLOY):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for f in files:
            if f.endswith(exts):
                yield os.path.relpath(os.path.join(root, f), DEPLOY)


def read(path):
    with open(path, encoding='utf-8') as fh:
        return fh.read()


def forms(name):
    """The ways a file name can be written after art/: as is, and URL-encoded."""
    out = [name]
    q = quote(name)
    if q != name:
        out.append(q)
    return out


def names(text, name):
    return any('art/' + n in text for n in forms(name))


# --- decide -------------------------------------------------------------------------------
loose = sorted(f for f in os.listdir(ART) if os.path.isfile(os.path.join(ART, f)) and f != '.DS_Store')
code = {p: read(os.path.join(DEPLOY, p)) for p in deploy_files(CODE)}

plan, left, why = {}, [], {}
for f in loose:
    if f in PALETTE:
        plan[f] = 'palette/' + PALETTE[f]; why[f] = 'palette painting'
    elif f == 'palettes.json':
        plan[f] = 'palette/palettes.json'; why[f] = 'palette'
    elif ICON.search(f):
        plan[f] = 'icons/' + f; why[f] = 'icon'
    elif GALLERY.search(f):
        plan[f] = 'gallery/' + f; why[f] = 'gallery picture'
    else:
        slugs = sorted({SLUGS[p] for p, t in code.items() if p in SLUGS and names(t, f)})
        others = sorted(p for p, t in code.items() if p not in SLUGS and names(t, f))
        if len(slugs) == 1:
            plan[f] = f'stories/{slugs[0]}/{f}'; why[f] = 'named by ' + slugs[0]
        elif len(slugs) > 1:
            plan[f] = 'shared/' + f; why[f] = 'named by ' + ', '.join(slugs)
        elif f in FRANKENSTEIN:
            plan[f] = 'stories/frankenstein/' + f; why[f] = 'Frankenstein frontmatter (no page yet)'
        else:
            left.append((f, others))

# --- rewrite ------------------------------------------------------------------------------
# Old flat paths are rewritten to where each file is now, whether it moves on this run or
# moved on an earlier one, so a second run repairs a reference an editor saved back.
settled = {}
for root, dirs, files in os.walk(ART):
    rel = os.path.relpath(root, ART)
    if rel == '.' or rel.split(os.sep)[0] in ('maps', 'palette', '_incoming'):
        continue
    for f in files:
        if f != '.DS_Store':
            settled[f] = settled.get(f, []) + [os.path.join(rel, f).replace(os.sep, '/')]
settled = {f: paths[0] for f, paths in settled.items() if len(paths) == 1 and f not in loose}
for old, plain in PALETTE.items():
    if os.path.exists(os.path.join(ART, 'palette', plain)):
        settled[old] = 'palette/' + plain
if os.path.exists(os.path.join(ART, 'palette', 'palettes.json')):
    settled['palettes.json'] = 'palette/palettes.json'

subs = []   # (compiled pattern, replacement)
for old, new in list(plan.items()) + list(settled.items()):
    for form in forms(old):
        subs.append((re.compile(r'(?<=art/)' + re.escape(form) + r'(?![A-Za-z0-9_.%-])'), new))


def rewrite(text, extra=()):
    n = 0
    for pat, new in list(subs) + list(extra):
        text, k = pat.subn(new, text)
        n += k
    return text, n


def vault_extra(text):
    """Vault frontmatter may name files that are not built yet: an icon or gallery picture
    goes by its kind, and a misnamed Frankenstein plate is pointed at the file that exists."""
    extra = []
    for m in set(re.findall(r'(?<=art/)([A-Za-z0-9_.-]+\.(?:png|svg|jpg|jpeg))', text)):
        if m in plan or m in settled or os.path.exists(os.path.join(ART, m)):
            continue
        if m in VAULT_ONLY:
            new = VAULT_ONLY[m]
        elif ICON.search(m):
            new = 'icons/' + m
        elif GALLERY.search(m):
            new = 'gallery/' + m
        else:
            continue
        extra.append((re.compile(r'(?<=art/)' + re.escape(m) + r'(?![A-Za-z0-9_.-])'), new))
    return extra


changes = {}   # path -> (new text, count)
for p in deploy_files(TEXT):
    full = os.path.join(DEPLOY, p)
    t = read(full)
    new, n = rewrite(t)
    if p in ('art/palettes.json', 'art/palette/palettes.json'):
        # The palette entries name their painting without art/.
        for old, plain in PALETTE.items():
            new, k = re.subn(r'"source":\s*"' + re.escape(old) + '"', f'"source": "{plain}"', new)
            n += k
    if p == 'active/glass-geometry.html':
        # The palette picker builds the path from the entry's source.
        new, k = re.subn(r"'\.\./art/'\+encodeURIComponent\(pal\.source\)",
                         "'../art/palette/'+encodeURIComponent(pal.source)", new)
        n += k
    if n:
        changes['cw-deploys/' + p] = (new, n)

for f in sorted(os.listdir(VAULT_STORIES)):
    if f.startswith('Story-') and f.endswith('.md'):
        full = os.path.join(VAULT_STORIES, f)
        t = read(full)
        new, n = rewrite(t, vault_extra(t))
        if n:
            changes['CWVault/claude/' + f] = (new, n)

# --- report -------------------------------------------------------------------------------
print('MOVES' + ('' if APPLY else ' (plan only; --apply to do it)'))
for f in sorted(plan, key=lambda f: plan[f]):
    print(f'  art/{f:44s} -> art/{plan[f]:60s} {why[f]}')
print('\nLEFT IN PLACE, named by no story page')
for f, others in left:
    print(f'  art/{f}' + (f'   (named only by {", ".join(others)})' if others else ''))
print('\nREWRITES')
for p, (_, n) in sorted(changes.items()):
    print(f'  {n:4d}  {p}')
print(f'  {sum(n for _, n in changes.values())} references in {len(changes)} files')

if not APPLY:
    sys.exit(0)

# --- apply --------------------------------------------------------------------------------
tracked = set(subprocess.run(['git', 'ls-files', 'cw-deploys/art'], cwd=ROOT,
                             capture_output=True, text=True).stdout.split('\n'))
for f, dest in plan.items():
    src, dst = os.path.join(ART, f), os.path.join(ART, dest)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    rel = os.path.relpath(src, ROOT)
    if rel in tracked:
        subprocess.run(['git', 'mv', rel, os.path.relpath(dst, ROOT)], cwd=ROOT, check=True)
    else:
        os.rename(src, dst)

for p, (text, _) in changes.items():
    p = p.replace('cw-deploys/art/palettes.json', 'cw-deploys/art/palette/palettes.json')
    with open(os.path.join(ROOT, p), 'w', encoding='utf-8') as fh:
        fh.write(text)
print('\napplied.')
