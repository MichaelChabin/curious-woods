#!/usr/bin/env python3
"""
curves-deep-time.py — the curves under the deep-time bar, each with a band (Plan-Deep-Time, Stage 5).

Writes to cw-deploys/stories/curves/:
  sea-level-ice-ages.json   global sea level, metres against today, 0 to 3 million years, from two
                            published reconstructions (Spratt & Lisiecki 2016 to 798 ka with their 95 %
                            bounds; Bintanja & van de Wal 2008 from there to 3 Ma, modelled, no bounds in
                            the file, so the band is a stated judgment); its last 20,000 years are the
                            Lambeck curve's, so the map's sea agrees with the plot and reads 0 today
  sea-level.json            the last 21,000 years (Lambeck and others 2014), with a band that is our judgment
  sea-level-deep.json       540 to 3 million years ago: a guess, a middle line through the published curves.
                            Built 22 Nov 2026; read by the Time Machine since that day, on Michael's word
  people.json               the world's people, 10,000 BCE to now (Our World in Data), as After the ice draws it
  people-deep.json          the same series with a band, a log scale and a guessed stretch from 315,000 to
                            15,000 years ago. Built 22 Nov 2026; read by the Time Machine since that day, on Michael's word
  oxygen.json               oxygen in the air as a fraction of today's, 4 billion years to now — the
                            envelope of Lyons, Reinhard & Planavsky 2014, figure 1, read off the figure
  day-length.json           hours in a day, from the moon's formation to now
  minerals.json             kinds of mineral on Earth, Hazen et al. 2008's stages
  sun-and-inside.json       two series on one axis, watts per square metre of surface: what the sun
                            delivers (Gough 1981's brightening) and what comes up from inside (a sketch
                            from the thermal models), so the crossing in the Hadean can be seen
  crust-and-land.json       how much continent there was, and how much of it stood above the sea
Each file: { _about, source, licence, howSure, unit, scale ('linear' | 'log'), say, points: [[year,
value, low, high], ...] } — year is the store's astronomer's year (this year minus the age), value the
best estimate, low and high the band. A reader that wants only [year, value] takes the first two.
Since 22 Nov 2026 a file may also carry `today` (the value now, for the faint dashed line), `fade` (the
store year before which the plot is not drawn) and `sayToday` (the words at the marker when it stands at
today); a second series carries its own.

The numbers were checked on 9 Oct 2026 (CWVault/claude/Plots-Deep-01.md, each plot's Data section) and
the changes that section lists were applied here on 22 Nov 2026 (Editor-Pass-10.md). Each change there
names a store year and the age it stands for; CHECKS below holds every pair, and the script stops if a
pair does not agree.

Usage: python3 tools/curves-deep-time.py --data tools/data/noaa-sea-level
The folder holds spratt2016.txt and bintanja2008.txt, from NOAA's paleoclimate archive
(ncei.noaa.gov/pub/data/paleo/contributions_by_author/), fetched again on 22 Nov 2026 and kept in the repo since:
the copies of 6 Oct had not been kept, and without them the ice-ages file could not be made again.
"""
import argparse, json, math, os, time
THIS_YEAR = time.localtime().tm_year
OUT = 'cw-deploys/stories/curves'
def yr(ma): return int(round(THIS_YEAR - ma * 1e6))
def yr_ka(ka): return int(round(THIS_YEAR - ka * 1e3))

RANGE_NOTE = ("from and to are the store years (astronomer's years) the curve is meaningful between — its first and last "
              "points; minPoints is the fewest points a period must hold for the curve to be offered "
              "(Prompt-Build-Timeline-Stack.md, part 6, 10 Oct 2026)")

# Every store year named under "Changes for Claude Code" and "New data" in Plots-Deep-01.md, with the age it
# stands for in millions of years, on the batch's base year of 2026. Checked before anything is written.
CHECKS = {
    'oxygen': [(2450, -2449997974), (2430, -2429997974), (2400, -2399997974), (2300, -2299997974), (2220, -2219997974),
               (300, -299997974), (252, -251997974), (230, -229997974)],
    'day length': [(2460, -2459997974), (390, -389997974), (300, -299997974), (70, -69997974), (4510, -4509997974)],
    'minerals': [(4000, -3999997974), (3500, -3499997974), (4400, -4399997974), (1900, -1899997974), (1000, -999997974), (540, -539997974)],
    'inside': [(4510, -4509997974), (4508, -4507997974), (4450, -4449997974), (4400, -4399997974), (4000, -3999997974),
               (3500, -3499997974), (3000, -2999997974), (2500, -2499997974), (2000, -1999997974), (1000, -999997974)],
    'continents': [(3000, -2999997974), (4000, -3999997974), (3500, -3499997974), (2500, -2499997974)],
    'sea, ice ages': [(0.126, -123974), (0.124, -121974), (0.122, -119974), (0.120, -117974), (0.118, -115974), (0.410, -407974), (0.400, -397974), (0.020, -17974)],
    'sea, Lambeck': [(0.021, -18974), (0.0065, -4474), (0.006, -3974), (0.005, -2974), (0.004, -1974)],
    'sea, deep': [(540, -539997974), (520, -519997974), (500, -499997974), (480, -479997974), (455, -454997974), (445, -444997974),
                  (430, -429997974), (410, -409997974), (385, -384997974), (338, -337997974), (300, -299997974), (265, -264997974),
                  (250, -249997974), (230, -229997974), (200, -199997974), (180, -179997974), (155, -154997974), (140, -139997974),
                  (117, -116997974), (90, -89997974), (70, -69997974), (60, -59997974), (50, -49997974), (40, -39997974),
                  (35, -34997974), (33.5, -33497974), (30, -29997974), (20, -19997974), (15, -14997974), (10, -9997974),
                  (5, -4997974), (4, -3997974), (3, -2997974)],
    'people': [(0.315, -312974), (0.2, -197974), (0.1, -97974), (0.07, -67974), (0.05, -47974), (0.03, -27974), (0.02, -17974), (0.015, -12974)],
}
def check_store_years():
    bad = [(k, ma, store) for k, pairs in CHECKS.items() for ma, store in pairs if int(round(2026 - ma * 1e6)) != store]
    if bad:
        for k, ma, store in bad: print(f'  STORE YEAR AND AGE DISAGREE — {k}: {ma} Ma is {int(round(2026 - ma * 1e6))}, the batch says {store}')
        raise SystemExit('stopped: a store year and its age do not agree')
    print(f'store years against ages: {sum(len(v) for v in CHECKS.values())} pairs agree')

def write(name, obj, ranged=True):
    """One format for every file: indented by one, a newline at the end, as the files have stood since 10 Oct 2026;
    from, to, minPoints and the note on them follow the points."""
    if ranged:
        obj['from'] = obj['points'][0][0]; obj['to'] = obj['points'][-1][0]; obj['minPoints'] = 3; obj['_range'] = RANGE_NOTE
    path = os.path.join(OUT, name)
    with open(path, 'w') as fh: fh.write(json.dumps(obj, indent=1, ensure_ascii=False) + '\n')
    print(f'wrote {path}: {len(obj["points"])} points' + (f' + {len(obj["second"]["points"])} in the second series' if 'second' in obj else '') + f', {os.path.getsize(path)/1000:.1f} kB')

# ---------------------------------------------------------------- the sea, the last 21,000 years (Lambeck)
# [years ago, metres]: the readings of 30 Sep 2026 from Lambeck and others' global curve, with the changes of
# Plots-Deep-01.md (9 Oct 2026): a point at 21,000 years (about -134 m between 29,000 and 21,000, the abstract),
# and the last 6,500 years redrawn from "about 4 m since 6.7 thousand years, 3 m of it by 4.2" (interpolated; to
# be checked against the paper's table when it can be opened).
LAMBECK = [(21000, -134), (20000, -130), (18000, -125), (16500, -118), (15000, -105), (14600, -100), (14300, -82), (13500, -75),
           (13000, -70), (12500, -64), (12000, -60), (11500, -56), (11000, -49), (10500, -44), (10000, -38), (9500, -32),
           (9000, -26), (8500, -18), (8000, -13), (7500, -8), (7000, -5), (6500, -3.8), (6000, -3.2), (5000, -2.0), (4000, -0.9), (0, 0)]
def lambeck_band(ago):
    """Our judgment, spanning Lambeck 2014 and Fairbanks 1989 (-121 +/- 5 m at the glacial maximum): +/-6 m from
    21,000 to 18,000 years; +/-5 from 16,500 to 11,000; +/-3 from 10,000 to 8,000 (the point at 10,500 with them);
    +/-1.5 from 7,500 to 4,000; 0 at today."""
    if ago >= 18000: return 6
    if ago >= 11000: return 5
    if ago >= 8000: return 3
    if ago >= 4000: return 1.5
    return 0 if ago == 0 else 0.5
def lambeck_points():
    num = lambda x: int(x) if float(x).is_integer() else round(x, 1)
    return [[THIS_YEAR - ago, v, num(v - lambeck_band(ago)), num(v + lambeck_band(ago))] for ago, v in LAMBECK]

def sea_level_lambeck():
    write('sea-level.json', {
        '_about': "Global sea level, metres against today's, by astronomers' year, for the Sea level curve of the Time Machine (active/time-machine.html). The same readings as stories/sea-level.json (which the map's own sea-level painting reads, by years ago), converted to the store's year (years ago subtracted from this year) so a timeline can draw it along its span. Each point [year, metres, low, high]. Between points, interpolate linearly. HOW SURE: approximate. The points are read from the global ice-volume-equivalent curve of Lambeck and others (2014) and rounded to a few metres; the paper's own uncertainty is a few metres for most of the last twelve thousand years and larger before. It is one global figure: where the ice left, the land itself rose, most in Scandinavia and around Hudson Bay, and the local shore there followed the land, not this curve. Nothing a child does on the line makes the difference show, but no story should lean on a single number from here without checking the paper's table. Made by tools/curves-deep-time.py.",
        'source': 'Lambeck, Rouby, Purcell, Sun and Sambridge, “Sea level and global ice volumes from the Last Glacial Maximum to the Holocene”, PNAS 111 (43): 15296–15303 (2014), doi:10.1073/pnas.1411762111; the global curve, read from the figure and rounded. The point at 21,000 years (about 134 m below today\'s) and the last 6,500 years (about 4 m of rise since 6,700 years, 3 m of it by 4,200) are from the paper\'s abstract, interpolated, and wait to be checked against its table. The band is not the paper\'s: for the glacial maximum it spans Lambeck 2014 and Fairbanks (1989), 121 ± 5 m below today\'s.',
        'licence': "The paper is © the authors and the National Academy of Sciences and is open to read; the numbers here are our approximate readings of its published curve, cited, not the paper's own table.",
        'howSure': 'Approximate: readings of a published curve, rounded. The band is our judgment of its uncertainty: 6 m either way from 21,000 to 18,000 years ago, 5 m to 11,000, 3 m to 8,000, 1.5 m to 4,000, and nothing today.',
        'unit': "metres against today's sea level", 'scale': 'linear', 'say': 'the sea about {v} m {dir} today',
        'version': '2026-11-22', 'today': 0, 'fade': THIS_YEAR - LAMBECK[0][0],   # not drawn before its first point
        'points': lambeck_points()})

# ---------------------------------------------------------------- the sea, 3 million years (the ice ages)
def sea_level(data):
    pts = []
    # Spratt & Lisiecki 2016: the long stack (0–798 ka), every 2 ka, with the 95 % bounds
    with open(os.path.join(data, 'spratt2016.txt')) as fh:
        for ln in fh:
            if ln.startswith('#') or ln.startswith('age'): continue
            c = ln.split('\t')
            try: ka = float(c[0]); v = float(c[5]); lo = float(c[7]); hi = float(c[8])
            except (ValueError, IndexError): continue
            if math.isnan(v): continue
            if int(ka) % 2 == 0: pts.append((ka, v, lo, hi))
    last = max(p[0] for p in pts)
    # Bintanja & van de Wal 2008: 3 Ma, every 100 years in the file; take every 5 ka past the stack's end
    rows = []
    with open(os.path.join(data, 'bintanja2008.txt')) as fh:
        for ln in fh:
            c = ln.split()
            if len(c) != 9: continue
            try: rows.append((float(c[0]), float(c[8])))
            except ValueError: continue
    rows.sort()
    print(f'  Bintanja: {len(rows)} rows, {rows[0][0]} to {rows[-1][0]} ka')
    BAND = 20.0   # the model's own uncertainty is not in the file; this is a judgment (the paper's figures show ±15–20 m)
    # the file's column is the drop in sea level, positive when the sea was lower (123 m at the last
    # glacial maximum), so the sea's height against today is its negative
    for ka, drop in rows:
        v = -drop
        if ka > last and round(ka * 10) % 50 == 0: pts.append((ka, v, v - BAND, v + BAND))
    pts.sort(reverse=True)   # oldest first: every curve file runs by ascending year, and the readers assume it
    write('sea-level-ice-ages.json', sea_level_ice_ages_object(ice_age_changes([(ka, round(v, 1), round(lo, 1), round(hi, 1)) for ka, v, lo, hi in pts])))

def ice_age_changes(pts):
    """The changes of Plots-Deep-01.md, *Sea level*, to the points [(ka, value, low, high)], oldest first."""
    out = []
    warm = {126: (6.0, 0.0, 9.0), 124: (7.0, 5.0, 9.0), 122: (7.0, 5.0, 9.0), 120: (7.0, 5.0, 9.0), 118: (2.0, -10.0, 9.0)}   # the last warm spell, +6 to +9 m (Dutton and others 2015), a judgment
    for ka, v, lo, hi in pts:
        if ka < 20: continue   # younger than 20,000 years: Lambeck's, below (the stack is pinned at 0 m at 5,000 years and -130 m at 24,000; younger values are scaling noise)
        if ka in warm: v, lo, hi = warm[ka]
        elif 400 <= ka <= 410 and v < 9: v, lo, hi = 9.0, 6.0, 13.0   # the warm spell about 400,000 years ago, +6 to +13 m (Dutton and others 2015)
        elif 2600 <= ka <= 3000: lo, hi = min(lo, -20.0), max(hi, 25.0)   # the warm peaks of 3.0 to 2.6 Ma, about +16 to +20 m (Dumitru 2019, Grant 2019): the band reaches at least -20 and +25, and never leaves the line outside it
        out.append([yr_ka(ka), v, lo, hi])
    for p in lambeck_points():
        if p[0] > yr_ka(20): out.append([p[0], float(p[1]), float(p[2]), float(p[3])])
    return out

def sea_level_ice_ages_object(points):
    return {
        '_about': 'Global sea level, metres against today, 0 to 3 million years ago, by the store\'s year, for the deep-time bar and the map\'s sea past the Lambeck curve (stories/curves/sea-level.json, 21,000 years, stays the one for After the Ice). Each point [year, metres, low, high]. Since 22 Nov 2026 the points younger than 20,000 years are the Lambeck curve\'s, so the map\'s sea agrees with the plot and reads 0 today. Made by tools/curves-deep-time.py.',
        'source': [
            {'span': '20,000 to 798,000 years', 'citation': 'Spratt, R.M. & Lisiecki, L.E. (2016), A Late Pleistocene sea level stack, Climate of the Past 12, 1079–1092; the long stack (five reconstructions) with its 95 % bootstrap bounds', 'url': 'https://www.ncei.noaa.gov/access/paleo-search/study/19982', 'licence': 'NOAA paleoclimate archive, public'},
            {'span': '800,000 to 3,000,000 years', 'citation': 'Bintanja, R. & van de Wal, R.S.W. (2008), North American ice-sheet dynamics and the onset of 100,000-year glacial cycles, Nature 454, 869–872; the modelled global sea level', 'url': 'https://www.ncei.noaa.gov/access/paleo-search/study/11933', 'licence': 'NOAA paleoclimate archive, public'},
            {'span': 'the last 20,000 years', 'citation': 'Lambeck, K., Rouby, H., Purcell, A., Sun, Y. & Sambridge, M. (2014), Sea level and global ice volumes from the Last Glacial Maximum to the Holocene, PNAS 111, 15296–15303; the points of stories/curves/sea-level.json, with its band. The stack is pinned at 0 m at 5,000 years and −130 m at 24,000, and its younger values are scaling noise (it read 9 m above today\'s sea at today)'},
            {'span': 'the two warm spells', 'citation': 'Dutton and others (2015): the sea 6 to 9 m above today\'s about 125,000 years ago (the points from 126,000 to 118,000 years) and 6 to 13 m above about 400,000 years ago (the point at 410,000 years); the values set here are a judgment from those ranges'},
            {'span': '3.0 to 2.6 million years', 'citation': 'Dumitru and others (2019) and Grant and others (2019): warm peaks about 16 to 20 m above today\'s; the band there reaches at least −20 and +25 m'}],
        'howSure': 'Good to 800,000 years: a stack of five reconstructions with its own 95 % bounds, drawn as the band. Beyond that a model inverted from the deep-sea oxygen record; the file carries no bounds, so the band there is ±20 m, a judgment from the paper\'s figures, widened to +25 m from 3.0 to 2.6 million years for the warm peaks. The two warm spells (about 125,000 and 400,000 years ago) are set from Dutton and others 2015, a judgment. The last 20,000 years are the Lambeck curve with our band. The store years count back from this year and the stack from 1950; the 76 years do not show at this scale. Before 3 million years the file ends and the map should say nothing.',
        'unit': 'm', 'scale': 'linear', 'say': 'the sea about {v} m {dir} today',
        'points': points}

# ---------------------------------------------------------------- the sea, 540 to 3 million years ago (a guess)
SEA_DEEP = [[540, 0, -50, 80], [520, 30, -30, 120], [500, 60, -25, 150], [480, 100, -25, 200], [455, 150, 0, 250], [445, 40, -50, 150],
            [430, 100, 0, 200], [410, 60, 0, 150], [385, 100, 20, 150], [338, 80, 0, 130], [300, 0, -60, 80], [265, 80, 0, 160],
            [250, 20, -40, 100], [230, 25, -30, 120], [200, 50, -25, 150], [180, 80, 0, 170], [155, 130, 40, 200], [140, 120, 40, 200],
            [117, 150, 50, 250], [90, 160, 50, 250], [70, 100, 50, 210], [60, 75, 25, 190], [50, 100, 60, 210], [40, 70, 50, 170],
            [35, 60, 40, 150], [33.5, 0, -20, 80], [30, 15, -10, 90], [20, 15, -5, 70], [15, 25, 0, 60], [10, 5, -15, 40],
            [5, 10, -10, 30], [4, 5, -15, 25], [3, -1.5, -20, 25]]
def sea_level_deep():
    write('sea-level-deep.json', {
        '_about': 'Global sea level, metres against today\'s, 540 to 3 million years ago: a guess made for Curious Woods, a middle line through the published curves, with a band that spans them (CWVault/claude/Plots-Deep-01.md, Sea level, New data, 9 Oct 2026). At this spacing the line is an average and hides the ice-age swings within it, of up to about a hundred metres, wherever there was ice (the late Carboniferous, the end of the Ordovician, the last 34 million years). Its last point is the ice-ages file\'s first, so the two join. Built 22 Nov 2026 and read by the Time Machine (active/time-machine.html). Each point [year, metres, low, high]; year is the store\'s astronomer\'s year. Made by tools/curves-deep-time.py.',
        'source': [
            {'citation': 'Miller, K.G. and others (2005), The Phanerozoic record of global sea-level change, Science; cited for its published values'},
            {'citation': 'Miller and others (2020); the curve at PANGAEA, doi:10.1594/PANGAEA.923139', 'licence': 'CC BY 4.0'},
            {'citation': 'Müller and others (2008); cited for its published values'},
            {'citation': 'Haq & Schutter (2008); the shape only'},
            {'citation': 'van der Meer, D.G. and others (2022), Long-term Phanerozoic global mean sea level: insights from strontium isotope variations and estimates of continental glaciation, Gondwana Research', 'licence': 'CC BY 4.0'}],
        'licence': 'Our judgment on cited published curves; Miller 2020 and van der Meer 2022 are CC BY 4.0.',
        'howSure': 'A guess. The published curves disagree by up to about 200 metres in the Cretaceous and in the early Paleozoic; the band is that disagreement, not a measurement.',
        'unit': 'm', 'scale': 'linear', 'say': 'the sea about {v} m {dir} today', 'today': 0, 'fade': yr(540),
        'points': [[yr(ma), v, lo, hi] for ma, v, lo, hi in SEA_DEEP]})

# ---------------------------------------------------------------- people
# Our World in Data's long-run series, fetched 30 Sep 2026 and thinned: every thousand years to year 0, every
# century to 1700, every decade to 1900, every five years after. [astronomer's year, people].
PEOPLE = [[-10000, 4501152], [-9000, 5687125], [-8000, 7314623], [-7000, 9651703], [-6000, 13278309], [-5000, 19155698], [-4000, 28859174], [-3000, 44577880], [-2000, 72685064], [-1000, 110530464],
          [0, 232268832], [100, 237052192], [200, 240762160], [300, 227702848], [400, 241697008], [500, 253395808], [600, 271638944], [700, 278346080], [800, 285870176], [900, 311142688],
          [1000, 323462624], [1100, 397889888], [1200, 444653984], [1300, 456248096], [1400, 442309216], [1500, 503051104], [1600, 516147616], [1700, 595456896], [1710, 617975872], [1720, 648184768],
          [1730, 670899968], [1740, 702227776], [1750, 753279296], [1760, 788254976], [1770, 827951488], [1780, 900945152], [1790, 942261696], [1800, 983104755], [1810, 1020150076], [1820, 1089507052],
          [1830, 1162497339], [1840, 1219617217], [1850, 1275602897], [1860, 1298027373], [1870, 1340168478], [1880, 1414583216], [1890, 1520891633], [1900, 1627273655], [1905, 1695427510], [1910, 1767417985],
          [1915, 1829102909], [1920, 1895426673], [1925, 1979027667], [1930, 2071786711], [1935, 2179140887], [1940, 2291979566], [1945, 2384671779], [1950, 2493092852], [1955, 2740213796], [1960, 3015470889],
          [1965, 3334533710], [1970, 3694683794], [1975, 4070735279], [1980, 4447606240], [1985, 4868943457], [1990, 5327803106], [1995, 5758878977], [2000, 6171702992], [2005, 6586970132], [2010, 7021732143],
          [2015, 7470491876], [2020, 7887001289], [2023, 8091734933]]
PEOPLE_ABOUT = "World population, people by astronomers' year, for the People curve of the Time Machine (active/time-machine.html) and any timeline that wants it. Read from Our World in Data's long-run population series (which joins HYDE 3.3 before 1800, Gapminder to 1950 and the UN's World Population Prospects after) and thinned: every thousand years to year 0, every century to 1700, every decade to 1900, every five years after. Between points, interpolate linearly. HOW SURE: before 1800 these are reconstructions, not counts, and the HYDE authors give wide ranges; the deep past is uncertain by a factor of two or more. After 1950 the figures are censuses and registers and are good to a few percent. A curve drawn from this is a shape, and the number at any one year is 'about'."
PEOPLE_SOURCE = 'Our World in Data, “Population – HYDE, Gapminder, UN – Long-run data” [dataset], fetched 30 Sep 2026 from ourworldindata.org/grapher/population (World). Underlying: PBL Netherlands Environmental Assessment Agency, HYDE 3.3 (2023); Gapminder, Population v7 (2022); United Nations, World Population Prospects (2024).'
PEOPLE_LICENCE = "Our World in Data publishes its processed data under Creative Commons BY 4.0; HYDE 3.3 and Gapminder are CC BY; the UN's World Population Prospects is CC BY 3.0 IGO. Credit: Our World in Data, with the sources above."
def people():
    """As After the ice draws it: the series as fetched, no band, a linear scale. The points are as they were; on
    22 Nov 2026 the file came under this script (nothing had made it but a hand, on 30 Sep) and gained `today` and
    `fade` (not drawn before its first point)."""
    write('people.json', {'_about': PEOPLE_ABOUT + ' Made by tools/curves-deep-time.py.', 'source': PEOPLE_SOURCE, 'licence': PEOPLE_LICENCE, 'unit': 'people',
                          'version': '2026-09-30', 'firstYearAtOneBillion': 1805, 'today': 8300000000, 'fade': PEOPLE[0][0], 'points': PEOPLE})

# 315,000 to 15,000 years ago: people alive, not breeding ancestors; a guess (Plots-Deep-01.md, People, New data)
PEOPLE_DEEP = [[315000, 150000, 30000, 800000], [200000, 200000, 50000, 800000], [100000, 200000, 50000, 600000], [70000, 250000, 20000, 1000000],
               [50000, 500000, 50000, 1500000], [30000, 1500000, 500000, 3500000], [20000, 1500000, 500000, 4000000], [15000, 3000000, 1000000, 8000000]]
# the US Census Bureau's low and high summaries (Historical Estimates of World Population): [year, low, high]
CENSUS = [[-10000, 1e6, 10e6], [-5000, 5e6, 20e6], [1, 170e6, 400e6], [1000, 254e6, 345e6], [1500, 425e6, 540e6], [1800, 813e6, 1125e6]]
def people_band(year, v):
    """Low and high for a point of the fetched series: the Census Bureau's summaries interpolated in log between
    their years; from 1800 the band narrows evenly (in log) to 2 percent either way at 1950, and stays there. Where
    the fetched value itself lies outside the interpolated band, the band is opened to hold it."""
    if year >= 1950: lo, hi = v * 0.98, v * 1.02
    elif year > 1800:
        f = (year - 1800) / 150.0; v0 = 983104755
        lo = v * math.exp(math.log(813e6 / v0) * (1 - f) + math.log(0.98) * f); hi = v * math.exp(math.log(1125e6 / v0) * (1 - f) + math.log(1.02) * f)
    else:
        for a, b in zip(CENSUS, CENSUS[1:]):
            if a[0] <= year <= b[0]:
                f = (year - a[0]) / float(b[0] - a[0])
                lo = math.exp(math.log(a[1]) + f * (math.log(b[1]) - math.log(a[1]))); hi = math.exp(math.log(a[2]) + f * (math.log(b[2]) - math.log(a[2])))
                break
    return min(lo, v), max(hi, v)
def round3(x):
    if x == 0: return 0
    k = 10 ** (int(math.floor(math.log10(abs(x)))) - 2); return int(round(x / k) * k)
def people_deep():
    pts = [[THIS_YEAR - ago, v, lo, hi] for ago, v, lo, hi in PEOPLE_DEEP]
    opened = []
    for year, v in PEOPLE:
        lo, hi = people_band(year, v)
        if lo == v or hi == v: opened.append(year)
        pts.append([year, v, round3(lo), round3(hi)])
    pts.append([2026, 8300000000, 8200000000, 8400000000])   # the UN's medium projection for 2026 (World Population Prospects 2024), as the batch's checker read it from a copy of the UN table
    print(f'  people-deep: the band opened to hold the fetched value at {opened}')
    write('people-deep.json', {
        '_about': 'How many people were alive, from the oldest bones of our kind, about 315,000 years ago, to now, with a band and a log scale (CWVault/claude/Plots-Deep-01.md, People, 9 Oct 2026). From 10,000 BCE the values are those of stories/curves/people.json (Our World in Data); before that, eight points that are a guess made for Curious Woods: people alive, not breeding ancestors, and where a genetic number is used it is multiplied by 3 to 10. Built 22 Nov 2026 and read by the Time Machine (active/time-machine.html). Each point [year, people, low, high]; year is the store\'s astronomer\'s year. Made by tools/curves-deep-time.py.',
        'source': [
            {'span': '10,000 BCE to 2023', 'citation': PEOPLE_SOURCE, 'licence': PEOPLE_LICENCE},
            {'span': '2026', 'citation': 'United Nations, World Population Prospects 2024, medium projection: about 8.3 billion (low and high here 8.2 and 8.4 billion)'},
            {'span': 'the band, 10,000 BCE to 1950', 'citation': 'US Census Bureau, Historical Estimates of World Population, the low and high summaries: 10,000 BCE 1 to 10 million; 5000 BCE 5 to 20 million; 1 CE 170 to 400 million; 1000 CE 254 to 345 million; 1500 CE 425 to 540 million; 1800 CE 813 to 1,125 million; interpolated in log between them, narrowing to 2 percent either way at 1950 and after; opened where the fetched value lies outside it'},
            {'span': '315,000 to 15,000 years ago', 'citation': 'Biraben, J.-N. (2003), L\'évolution du nombre des hommes, Population & Sociétés 394 (perhaps 800,000 at 300,000 to 200,000 years; past a million between 40,000 and 30,000); Deevey (1960) as tabled by Kremer (1993) (1 million at 300,000 BCE, all humans, not our kind only; 3.34 million at 25,000 BCE); Li, H. & Durbin, R. (2011), Inference of human population history from individual whole-genome sequences, Nature (breeding numbers about 16,000 at 100,000 to 150,000 years; about 5,700 at 50,000, African ancestry); Tallavaara and others (2015) (Europe alone, about 330,000 at 30,000 years, about 130,000 at the glacial maximum); Smith and others (2018), against a bottleneck at the Toba eruption, 74,000 years ago; Frankham (1995): in wild animals, breeding numbers are about a tenth of all numbers', 'licence': 'our judgment on cited published figures'}],
        'licence': PEOPLE_LICENCE + ' The stretch before 10,000 BCE is our judgment on cited published figures.',
        'howSure': 'Shaky before farming: the range is a factor of ten to thirty before 50,000 years ago and about ten after, the spread between guesses from archaeology and estimates from genes. From 10,000 BCE reconstructions with wide ranges; after 1950 censuses, good to a few percent.',
        'unit': 'people', 'scale': 'log', 'say': 'about {v} people', 'today': 8300000000, 'fade': THIS_YEAR - 315000,
        'points': pts})

# ---------------------------------------------------------------- the tables
def table(name, about, source, how, unit, scale, say, rows, second=None, today=None, fade=None, say_today=None, ranged=True):
    obj = {'_about': about + ' Each point [year, value, low, high]; year is the store\'s astronomer\'s year. Made by tools/curves-deep-time.py.',
           'source': source, 'howSure': how, 'unit': unit, 'scale': scale, 'say': say}
    if today is not None: obj['today'] = today
    if fade is not None: obj['fade'] = yr(fade)
    if say_today: obj['sayToday'] = say_today
    obj['points'] = [[yr(ma), v, lo, hi] for ma, v, lo, hi in rows]
    if second:
        obj['second'] = {'name': second[0], 'say': second[1]}
        obj['second'].update(second[3] if len(second) > 3 else {})
        obj['second']['points'] = [[yr(ma), v, lo, hi] for ma, v, lo, hi in second[2]]
    write(name, obj, ranged)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--data', required=True); a = ap.parse_args()
    check_store_years()
    os.makedirs(OUT, exist_ok=True)
    sea_level_lambeck()
    sea_level(a.data)
    sea_level_deep()
    people()
    people_deep()

    table('oxygen.json',
        'Oxygen in the air as a fraction of today\'s (1 = 21 %), 4 billion years to now: the envelope of the published reconstruction, read off the figure, the band being the point.',
        {'citation': 'Lyons, T.W., Reinhard, C.T. & Planavsky, N.J. (2014), The rise of oxygen in Earth\'s early ocean and atmosphere, Nature 506, 307–315, figure 1; the Phanerozoic after Berner\'s GEOCARBSULF',
         'note': 'values read from the figure\'s envelope, not from a table; the figure is drawn on a log axis and so is this. The points changed on the checkers\' reading of 9 Oct 2026 (Plots-Deep-01.md): the rise across a hundred-thousandth of today\'s at 2,430 million years after Gumsley and others 2017; the coming and going until about 2,220 million years after Poulton and others 2021, drawn as a band that widens down to a millionth; the low edge from 2,000 to 800 million years after Planavsky and others 2014 (under 0.1 percent of today\'s); 300 million years (1.35, about 28 percent of the air) after Glasspool & Scott 2010 and Krause and others 2018; the step down at 252 million years, its size argued, after Berner 2006 and Krause and others 2018'},
        'A sketch of a published envelope. Before 2.4 billion years the air had almost none; the band across the Boring Billion is three orders of magnitude wide because that is how little is known; the Carboniferous high is the best-known point. Treat the line as the middle of the band, never as a reading.',
        'times today\'s', 'log', 'about {v} of today\'s oxygen',
        [[4000, 1e-6, 1e-7, 1e-5], [3000, 1e-6, 1e-7, 1e-5], [2600, 3e-6, 3e-7, 1e-4], [2450, 1e-6, 1e-7, 1e-5], [2430, 1e-5, 1e-6, 1e-4], [2400, 1e-3, 1e-6, 1e-2], [2300, 0.003, 1e-6, 1e-1], [2220, 0.03, 0.003, 0.3], [2150, 1e-1, 1e-2, 5e-1], [2000, 1e-2, 1e-4, 1e-1],
         [1800, 1e-2, 1e-4, 1e-1], [1400, 1e-2, 1e-4, 1e-1], [1000, 1e-2, 1e-4, 1e-1], [800, 1e-2, 1e-4, 1e-1], [700, 3e-2, 2e-3, 2e-1], [630, 6e-2, 5e-3, 3e-1], [580, 1e-1, 1e-2, 5e-1], [540, 2e-1, 5e-2, 7e-1],
         [450, 5e-1, 2e-1, 1.0], [400, 7e-1, 3e-1, 1.2], [330, 1.3, 1.0, 1.6], [300, 1.35, 1.2, 1.5], [252, 0.9, 0.7, 1.4], [230, 0.85, 0.7, 1.4], [180, 0.8, 0.6, 1.1], [100, 1.0, 0.8, 1.3], [50, 1.0, 0.9, 1.2], [5, 1.0, 0.95, 1.05], [0.8, 1.0, 0.99, 1.01], [0, 1.0, 1.0, 1.0]],   # the last million years from ice cores: within a percent
        today=1.0, fade=4000)

    table('day-length.json',
        'The length of a day in hours, from the moon\'s formation to now. The moon raises tides, the tides slow the spin, and the day lengthens; the moon backs away as it does.',
        [{'citation': 'Williams, G.E. (2000), Geological constraints on the Precambrian history of Earth\'s rotation and the Moon\'s orbit, Reviews of Geophysics 38, 37–59 (tidal rhythmites: about 21.9 h at 620 million years)'},
         {'citation': 'Meyers, S.R. & Malinverno, A. (2018), Proterozoic Milankovitch cycles and the history of the solar system, PNAS 115, 6363–6368 (18.7 h at 1.4 billion years)'},
         {'citation': 'Lantink, M.L., Davies, J.H.F.L., Ovtcharova, M. & Hilgen, F.J. (2022), Milankovitch cycles in banded iron formations constrain the Earth–Moon system 2.46 billion years ago, PNAS (16.9 ± 0.2 h at 2,460 million years)'},
         {'citation': 'Mitchell, R.N. & Kirscher, U. (2023), Mid-Proterozoic day length stalled by tidal resonance, Nature Geoscience 16, 567–569 (a day held near 19 h from about 2 to 1 billion years); disputed by Farhat, M. and others (2024), Astronomy & Astrophysics 684, A49'},
         {'citation': 'Wells, J.W. (1963), Coral growth and geochronometry, Nature (about 400 daily ridges a year in Middle Devonian corals, about 390 million years, range 385 to 410: 21.9 h; 385 and 390 in Pennsylvanian corals, about 300 million years: 22.6 h)'},
         {'citation': 'de Winter, N.J. and others (2020), a rudist shell from Oman, about 70 million years old, with 372 daily layers a year: 23.5 h'},
         {'citation': 'the first point, at the Moon-making impact 4,510 million years ago: models of the Moon-making impact, a day of about five hours'},
         {'citation': '4,000, 3,500 and 3,000 million years: model, not measurement'}],
        'Firm at the few dated points (2,460 million years, 1,400 million, 620 million, about 390 million and about 70 million); between them a judgment, with the band saying how much; before 2,500 million years a model, not a measurement, and the band is wide.',
        'hours', 'linear', 'a day of about {v} hours',
        [[4510, 5, 4, 7], [4000, 10, 8, 13], [3500, 13, 11, 15], [3000, 15, 13, 17], [2500, 17, 16, 18.5], [2460, 16.9, 16.7, 17.1], [2000, 18.5, 17.5, 19.5], [1400, 18.7, 18.3, 19.2], [1000, 19, 18.5, 20], [620, 21.9, 21.5, 22.3], [390, 21.9, 21.4, 22.8], [300, 22.6, 22.4, 22.8], [70, 23.5, 23.4, 23.6], [5, 23.95, 23.9, 24], [0, 24, 24, 24]],
        today=24, fade=4510)

    table('minerals.json',
        'How many kinds of mineral there were on Earth, by stage: Hazen\'s mineral evolution. Minerals set what can be made; the count jumps when the air gets oxygen.',
        {'citation': 'Hazen, R.M. et al. (2008), Mineral evolution, American Mineralogist 93, 1693–1720, the ten stages and their counts; Hazen, R.M. (2012), The Story of Earth',
         'note': 'the counts are Hazen\'s of 2008: 4,300 kinds known in 2008 (4,259 approved, 1 March 2008); the catalogue has grown to more than 6,000 since by finding, not by Earth changing, so the curve keeps the 2008 scale throughout. The 12 at the start is from Hazen, R.M. & Ferry, J.M. (2010), Mineral evolution: mineralogy in the fourth dimension, Elements 6, 9–12; the 4,400 million year point from Hazen, R.M. (2013), American Journal of Science 313, 807–843 ("no more than about 420", an upper bound; its high edge rests on Hazen & Morrison 2022 alone); the 2,300 million year point is an interpolation, not Hazen\'s'},
        'The stages are well argued; the counts within them are estimates, and the band says so. The jump at 2.4 billion years is the one firm thing.',
        'kinds', 'linear', 'about {v} kinds of mineral',
        [[4567, 12, 10, 20], [4560, 60, 50, 70], [4550, 250, 200, 300], [4400, 400, 350, 750], [4000, 500, 350, 750], [3500, 1000, 800, 1200], [3000, 1500, 1200, 1700], [2500, 1500, 1300, 1800], [2300, 2500, 2000, 3200], [1900, 4000, 3500, 4300], [1000, 4000, 3800, 4300], [540, 4050, 3900, 4300], [0, 4300, 4250, 4400]],
        today=4300, fade=4567, say_today='about 4,300 kinds known in 2008')

    # the sun, absorbed by the earth: Gough's brightening, 1361 W/m² today, a quarter of it per unit of surface, 30 % reflected
    sun = []
    for ma in [4567, 4500, 4400, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 0]:
        L = 1 / (1 + 0.4 * (ma / 4567))
        v = 1361 / 4 * 0.7 * L
        sun.append([ma, round(v, 1), round(v * 0.97, 1), round(v * 1.03, 1)])
    # the inside begins at the Moon-making impact (4,510 Ma): no source gives a number before it, while the Earth was still being assembled
    inside = [[4510, 1e4, 140, 1e5], [4508, 140, 50, 500], [4450, 2, 0.5, 10], [4400, 0.5, 0.3, 1], [4000, 0.3, 0.2, 0.5], [3500, 0.3, 0.09, 0.5], [3000, 0.25, 0.09, 0.4], [2500, 0.2, 0.09, 0.3], [2000, 0.16, 0.09, 0.22], [1000, 0.12, 0.09, 0.15], [500, 0.1, 0.09, 0.12], [0, 0.092, 0.087, 0.096]]
    table('sun-and-inside.json',
        'Two series on one axis, watts per square metre of Earth\'s surface: what the sun delivers (after the 30 % reflected) and what comes up from inside. They cross only in the first stretch, while the magma ocean cooled; ever since, the sun has run the surface by a thousand to one, which is why the snowballs are chemistry, not the planet cooling.',
        [{'citation': 'the sun: Gough, D.O. (1981), Solar interior structure and luminosity variations, Solar Physics 74, 21–34 — L(t) = L_now / (1 + 0.4 (1 − t/t_now)); 1361 W/m² today at the top of the air, a quarter per unit of surface, 0.7 absorbed'},
         {'citation': 'the inside: today 47 ± 2 TW over 5.1 × 10¹⁴ m² (Davies, J.H. & Davies, D.R. (2010), Earth\'s surface heat flux, Solid Earth 1, 5–24); the past from the thermal-history models in Korenaga, J. (2008), Urey ratio and the structure and evolution of Earth\'s mantle, Reviews of Geophysics 46; the magma ocean just after the Moon-making impact (about 140 W/m² for about 2 million years) and the 0.5 W/m² at 4,400 million years from Zahnle, K. et al. (2007), Emergence of a habitable planet, Space Science Reviews 129, 35–78; the first point, at the impact, is an order of magnitude only; the low edge of the band back to 3,500 million years (heat lost at about today\'s rate) from Korenaga, J. (2011), Journal of Geophysical Research 116, B12403; nearly half of today\'s heat from uranium and thorium, Gando, A. and others (2011), Partial radiogenic heat model for Earth revealed by geoneutrino measurements, Nature Geoscience'}],
        'The sun\'s curve is as sure as physics gets, within a few percent. The inside is a sketch: today\'s number is measured; back to 3.5 billion years the models disagree by a factor of two to five, and the band says so; the Hadean values are the models\' orders of magnitude only. Drawn on a log axis, because the two differ by a thousand.',
        'W/m²', 'log', 'the sun at about {v} W/m²',
        sun, second=('from inside', 'the inside at about {v} W/m²', inside, {'today': 0.092, 'fade': yr(4510)}), today=238.2, fade=4567)

    # the amount of continent, two series on one axis, both as fractions of the earth's surface: the crust
    # that existed (today about 0.40 of the surface, counting the shelves) and the land that stood above the
    # sea (today 0.29). The gap is the drowned continents. The guesses on the globe take their area from the
    # first series past the model's reach. A sketch from the reviews; the bands are the argument.
    crust = [[4567, 0, 0, 0.002], [4500, 0.004, 0, 0.02], [4400, 0.012, 0, 0.04], [4000, 0.05, 0.012, 0.35], [3500, 0.12, 0.04, 0.36], [3000, 0.26, 0.08, 0.36],
             [2500, 0.28, 0.18, 0.36], [2000, 0.32, 0.24, 0.38], [1000, 0.36, 0.32, 0.4], [540, 0.38, 0.35, 0.4], [0, 0.4, 0.4, 0.4]]
    land = [[4567, 0, 0, 0], [4400, 0.002, 0, 0.01], [4000, 0.005, 0, 0.02], [3500, 0.01, 0.003, 0.04], [3000, 0.03, 0.01, 0.08], [2500, 0.08, 0.02, 0.20],
            [2000, 0.15, 0.08, 0.22], [1000, 0.22, 0.15, 0.28], [540, 0.25, 0.2, 0.29], [0, 0.29, 0.29, 0.29]]
    table('crust-and-land.json',
        'How much continent there was, as a fraction of the earth\'s surface: the crust that existed, and the land that stood above the sea. The gap between the lines is the drowned continents, wide for two billion years. The guesses on the globe past the model\'s reach take their amount from the crust series.',
        [{'citation': 'Hawkesworth, C.J., Cawood, P.A. & Dhuime, B. (2020), The evolution of the continental crust and the onset of plate tectonics, Frontiers in Earth Science 8, 326 — the growth curves compared'},
         {'citation': 'Dhuime, B., Hawkesworth, C.J., Cawood, P.A. & Storey, C.D. (2012), A change in the geodynamics of continental growth 3 billion years ago, Science 335, 1334–1336 — about two thirds of the crust by 3 billion years (0.26 of the surface), one of the fast curves'},
         {'citation': 'Guo, M. & Korenaga, J. (2020), Argon constraints on the early growth of felsic continental crust, Science Advances 6, eaaz6234 — most of the crust early (more than 80 percent in the early Archean): the high edge of the crust band at 4,000 and 3,500 million years'},
         {'citation': 'Flament, N., Coltice, N. & Rey, P.F. (2008), A case for late-Archaean continental emergence from thermal evolution models and hypsometry, Earth and Planetary Science Letters 275, 326–336 — little land above the sea before 2.5 billion years (0.02 to 0.03 of the surface): the low edge of the land band at 2,500 million years'},
         {'citation': 'Bindeman, I.N. et al. (2018), Rapid emergence of subaerial landmasses and onset of a modern hydrologic cycle 2.5 billion years ago, Nature 557, 545–548 — the high edge of the land band at 2,500 million years'},
         {'citation': 'for the land series, how high the continents stood: Korenaga, J., Planavsky, N.J. & Evans, D.A.D. (2017), Global water cycle and the coevolution of the Earth\'s interior and surface environment, Philosophical Transactions of the Royal Society A 375, 20150393'}],
        'A sketch, to be checked. The crust curves disagree by a factor of three or four at 3 billion years, and that disagreement is the band. How much stood above the sea is argued more: a few percent of the surface in the Archean by most estimates, rising around 2.5 billion years. Today\'s two numbers are measured. The file treats the volume of crust as an area of surface, an assumption that the thickness of the crust has not changed much.',
        'of the surface', 'linear', 'continent over about {v} of the surface',
        crust, second=('land above the sea', 'land over about {v} of the surface', land, {'today': 0.29, 'fade': yr(4567)}), today=0.4, fade=4567, ranged=False)

if __name__ == '__main__':
    main()
