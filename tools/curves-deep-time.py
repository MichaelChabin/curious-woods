#!/usr/bin/env python3
"""
curves-deep-time.py — the curves under the deep-time bar, each with a band (Plan-Deep-Time, Stage 5).

Writes to cw-deploys/stories/curves/:
  sea-level-ice-ages.json   global sea level, metres against today, 0 to 3 million years, from two
                            published reconstructions (Spratt & Lisiecki 2016 to 798 ka with their 95 %
                            bounds; Bintanja & van de Wal 2008 from there to 3 Ma, modelled, no bounds in
                            the file, so the band is a stated judgment)
  oxygen.json               oxygen in the air as a fraction of today's, 4 billion years to now — the
                            envelope of Lyons, Reinhard & Planavsky 2014, figure 1, read off the figure
  day-length.json           hours in a day, from the moon's formation to now
  minerals.json             kinds of mineral on Earth, Hazen et al. 2008's stages
  sun-and-inside.json       two series on one axis, watts per square metre of surface: what the sun
                            delivers (Gough 1981's brightening) and what comes up from inside (a sketch
                            from the thermal models), so the crossing in the Hadean can be seen
Each file: { _about, source, licence, howSure, unit, scale ('linear' | 'log'), say, points: [[year,
value, low, high], ...] } — year is the store's astronomer's year (this year minus the age), value the
best estimate, low and high the band. A reader that wants only [year, value] takes the first two.

Usage: python3 tools/curves-deep-time.py --data <dir with spratt2016.txt and bintanja2008.txt>
The two files come from NOAA's paleoclimate archive (ncei.noaa.gov/pub/data/paleo/contributions_by_author/).
"""
import argparse, json, math, os, time
THIS_YEAR = time.localtime().tm_year
OUT = 'cw-deploys/stories/curves'
def yr(ma): return int(round(THIS_YEAR - ma * 1e6))
def yr_ka(ka): return int(round(THIS_YEAR - ka * 1e3))

def write(name, obj):
    path = os.path.join(OUT, name)
    with open(path, 'w') as fh: json.dump(obj, fh, separators=(',', ':'))
    print(f'wrote {path}: {len(obj["points"])} points' + (f' + {len(obj["second"]["points"])} in the second series' if 'second' in obj else '') + f', {os.path.getsize(path)/1000:.1f} kB')

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
    write('sea-level-ice-ages.json', {
        '_about': 'Global sea level, metres against today, 0 to 3 million years ago, by the store\'s year, for the deep-time bar and the map\'s sea past the Lambeck curve (stories/curves/sea-level.json, 20,000 years, stays the one for After the Ice). Each point [year, metres, low, high]. Made by tools/curves-deep-time.py.',
        'source': [
            {'span': '0 to 798,000 years', 'citation': 'Spratt, R.M. & Lisiecki, L.E. (2016), A Late Pleistocene sea level stack, Climate of the Past 12, 1079–1092; the long stack (five reconstructions) with its 95 % bootstrap bounds', 'url': 'https://www.ncei.noaa.gov/access/paleo-search/study/19982', 'licence': 'NOAA paleoclimate archive, public'},
            {'span': '800,000 to 3,000,000 years', 'citation': 'Bintanja, R. & van de Wal, R.S.W. (2008), North American ice-sheet dynamics and the onset of 100,000-year glacial cycles, Nature 454, 869–872; the modelled global sea level', 'url': 'https://www.ncei.noaa.gov/access/paleo-search/study/11933', 'licence': 'NOAA paleoclimate archive, public'}],
        'howSure': 'Good to 800,000 years: a stack of five reconstructions with its own 95 % bounds, drawn as the band. Beyond that a model inverted from the deep-sea oxygen record; the file carries no bounds, so the band there is ±20 m, a judgment from the paper\'s figures. Before 3 million years the file ends and the map should say nothing.',
        'unit': 'm', 'scale': 'linear', 'say': 'the sea about {v} m {dir} today',
        'points': [[yr_ka(ka), round(v, 1), round(lo, 1), round(hi, 1)] for ka, v, lo, hi in pts]})

def table(name, about, source, how, unit, scale, say, rows, second=None):
    obj = {'_about': about + ' Each point [year, value, low, high]; year is the store\'s astronomer\'s year. Made by tools/curves-deep-time.py.',
           'source': source, 'howSure': how, 'unit': unit, 'scale': scale, 'say': say,
           'points': [[yr(ma), v, lo, hi] for ma, v, lo, hi in rows]}
    if second: obj['second'] = {'name': second[0], 'say': second[1], 'points': [[yr(ma), v, lo, hi] for ma, v, lo, hi in second[2]]}
    write(name, obj)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--data', required=True); a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    sea_level(a.data)

    table('oxygen.json',
        'Oxygen in the air as a fraction of today\'s (1 = 21 %), 4 billion years to now: the envelope of the published reconstruction, read off the figure, the band being the point.',
        {'citation': 'Lyons, T.W., Reinhard, C.T. & Planavsky, N.J. (2014), The rise of oxygen in Earth\'s early ocean and atmosphere, Nature 506, 307–315, figure 1; the Phanerozoic after Berner\'s GEOCARBSULF', 'note': 'values read from the figure\'s envelope, not from a table; the figure is drawn on a log axis and so is this'},
        'A sketch of a published envelope. Before 2.4 billion years the air had almost none; the band across the Boring Billion is two orders of magnitude wide because that is how little is known; the Carboniferous high is the best-known point. Treat the line as the middle of the band, never as a reading.',
        'times today\'s', 'log', 'about {v} of today\'s oxygen',
        [[4000, 1e-6, 1e-7, 1e-5], [3000, 1e-6, 1e-7, 1e-5], [2600, 3e-6, 3e-7, 1e-4], [2450, 1e-4, 1e-5, 1e-3], [2400, 1e-3, 1e-4, 1e-2], [2300, 1e-2, 1e-3, 1e-1], [2150, 1e-1, 1e-2, 5e-1], [2000, 1e-2, 1e-3, 1e-1],
         [1800, 1e-2, 1e-3, 1e-1], [1400, 1e-2, 1e-3, 1e-1], [1000, 1e-2, 1e-3, 1e-1], [800, 1e-2, 1e-3, 1e-1], [700, 3e-2, 2e-3, 2e-1], [630, 6e-2, 5e-3, 3e-1], [580, 1e-1, 1e-2, 5e-1], [540, 2e-1, 5e-2, 7e-1],
         [450, 5e-1, 2e-1, 1.0], [400, 7e-1, 3e-1, 1.2], [330, 1.3, 1.0, 1.6], [300, 1.5, 1.2, 1.7], [260, 1.0, 0.7, 1.3], [230, 0.7, 0.5, 1.0], [180, 0.8, 0.6, 1.1], [100, 1.0, 0.8, 1.3], [50, 1.0, 0.9, 1.2], [5, 1.0, 0.95, 1.05], [0.8, 1.0, 0.99, 1.01], [0, 1.0, 1.0, 1.0]])   # the last million years from ice cores: within a percent

    table('day-length.json',
        'The length of a day in hours, from the moon\'s formation to now. The moon raises tides, the tides slow the spin, and the day lengthens; the moon backs away as it does.',
        [{'citation': 'Williams, G.E. (2000), Geological constraints on the Precambrian history of Earth\'s rotation and the Moon\'s orbit, Reviews of Geophysics 38, 37–59 (tidal rhythmites: about 21.9 h at 620 million years)'},
         {'citation': 'Meyers, S.R. & Malinverno, A. (2018), Proterozoic Milankovitch cycles and the history of the solar system, PNAS 115, 6363–6368 (18.7 h at 1.4 billion years)'},
         {'citation': 'Bartlett, B.C. & Stevenson, D.J. (2016), Analysis of a Precambrian resonance-stabilized day length, Geophysical Research Letters 43, 5716–5724 (a day held near 19 h for a billion years)'},
         {'citation': 'the first point from the moon-forming impact models, a day of five or six hours'}],
        'Firm at the few dated points (620 million years, 1.4 billion); between them a judgment, with the band saying how much; before 2.5 billion years a model, not a measurement, and the band is wide.',
        'hours', 'linear', 'a day of about {v} hours',
        [[4500, 5.5, 4, 7], [4000, 10, 8, 13], [3500, 13, 11, 15], [3000, 15, 13, 17], [2500, 17, 16, 18.5], [2000, 18.5, 17.5, 19.5], [1400, 18.7, 18.3, 19.2], [1000, 19, 18.5, 20], [620, 21.9, 21.5, 22.3], [400, 22, 21.7, 22.4], [300, 22.4, 22.1, 22.7], [65, 23.5, 23.3, 23.7], [5, 23.95, 23.9, 24], [0, 24, 24, 24]])

    table('minerals.json',
        'How many kinds of mineral there were on Earth, by stage: Hazen\'s mineral evolution. Minerals set what can be made; the count jumps when the air gets oxygen.',
        {'citation': 'Hazen, R.M. et al. (2008), Mineral evolution, American Mineralogist 93, 1693–1720, the ten stages and their counts; Hazen, R.M. (2012), The Story of Earth', 'note': 'the counts are Hazen\'s of 2008 (about 4,400 kinds then known); the catalogue has grown to about 6,000 since by finding, not by Earth changing, so the curve keeps the 2008 scale throughout'},
        'The stages are well argued; the counts within them are estimates, and the band says so. The jump at 2.4 billion years is the one firm thing.',
        'kinds', 'linear', 'about {v} kinds of mineral',
        [[4567, 12, 10, 20], [4560, 60, 50, 70], [4550, 250, 200, 300], [4400, 420, 350, 500], [4000, 1000, 800, 1200], [3000, 1500, 1200, 1700], [2500, 1500, 1300, 1800], [2300, 2500, 2000, 3200], [2000, 4000, 3500, 4300], [1000, 4100, 3800, 4400], [540, 4300, 4000, 4500], [400, 4400, 4200, 4600], [0, 4400, 4300, 4500]])

    # the sun, absorbed by the earth: Gough's brightening, 1361 W/m² today, a quarter of it per unit of surface, 30 % reflected
    sun = []
    for ma in [4567, 4500, 4400, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 0]:
        L = 1 / (1 + 0.4 * (ma / 4567))
        v = 1361 / 4 * 0.7 * L
        sun.append([ma, round(v, 1), round(v * 0.97, 1), round(v * 1.03, 1)])
    inside = [[4567, 1e5, 1e4, 1e6], [4540, 1e4, 1e3, 1e5], [4500, 3e4, 1e3, 1e5], [4480, 150, 50, 500], [4450, 20, 5, 100], [4400, 2, 0.5, 10], [4000, 0.4, 0.25, 0.7], [3500, 0.3, 0.2, 0.5], [3000, 0.25, 0.15, 0.4], [2500, 0.2, 0.13, 0.3], [2000, 0.16, 0.11, 0.22], [1000, 0.12, 0.1, 0.15], [500, 0.1, 0.09, 0.12], [0, 0.092, 0.087, 0.096]]
    table('sun-and-inside.json',
        'Two series on one axis, watts per square metre of Earth\'s surface: what the sun delivers (after the 30 % reflected) and what comes up from inside. They cross only in the first stretch, while the magma ocean cooled; ever since, the sun has run the surface by a thousand to one, which is why the snowballs are chemistry, not the planet cooling.',
        [{'citation': 'the sun: Gough, D.O. (1981), Solar interior structure and luminosity variations, Solar Physics 74, 21–34 — L(t) = L_now / (1 + 0.4 (1 − t/t_now)); 1361 W/m² today at the top of the air, a quarter per unit of surface, 0.7 absorbed'},
         {'citation': 'the inside: today 47 ± 2 TW over 5.1 × 10¹⁴ m² (Davies, J.H. & Davies, D.R. (2010), Earth\'s surface heat flux, Solid Earth 1, 5–24); the past from the thermal-history models in Korenaga, J. (2008), Urey ratio and the structure and evolution of Earth\'s mantle, Reviews of Geophysics 46; the Hadean from Zahnle, K. et al. (2007), Emergence of a habitable planet, Space Science Reviews 129, 35–78'}],
        'The sun\'s curve is as sure as physics gets, within a few percent. The inside is a sketch: today\'s number is measured; back to 3 billion years the models disagree by a factor of two, and the band says so; the Hadean values are the models\' orders of magnitude only. Drawn on a log axis, because the two differ by a thousand.',
        'W/m²', 'log', 'the sun at about {v} W/m²',
        sun, second=('from inside', 'the inside at about {v} W/m²', inside))

    # the amount of continent, two series on one axis, both as fractions of the earth's surface: the crust
    # that existed (today about 0.40 of the surface, counting the shelves) and the land that stood above the
    # sea (today 0.29). The gap is the drowned continents. The guesses on the globe take their area from the
    # first series past the model's reach. A sketch from the reviews; the bands are the argument.
    crust = [[4567, 0, 0, 0.002], [4500, 0.004, 0, 0.02], [4400, 0.012, 0, 0.04], [4000, 0.05, 0.012, 0.14], [3500, 0.12, 0.04, 0.24], [3000, 0.2, 0.08, 0.32],
             [2500, 0.28, 0.18, 0.36], [2000, 0.32, 0.24, 0.38], [1000, 0.36, 0.32, 0.4], [540, 0.38, 0.35, 0.4], [0, 0.4, 0.4, 0.4]]
    land = [[4567, 0, 0, 0], [4400, 0.002, 0, 0.01], [4000, 0.005, 0, 0.02], [3500, 0.01, 0.003, 0.04], [3000, 0.03, 0.01, 0.08], [2500, 0.08, 0.03, 0.15],
            [2000, 0.15, 0.08, 0.22], [1000, 0.22, 0.15, 0.28], [540, 0.25, 0.2, 0.29], [0, 0.29, 0.29, 0.29]]
    table('crust-and-land.json',
        'How much continent there was, as a fraction of the earth\'s surface: the crust that existed, and the land that stood above the sea. The gap between the lines is the drowned continents, wide for two billion years. The guesses on the globe past the model\'s reach take their amount from the crust series.',
        [{'citation': 'Hawkesworth, C.J., Cawood, P.A. & Dhuime, B. (2020), The evolution of the continental crust and the onset of plate tectonics, Frontiers in Earth Science 8, 326 — the growth curves compared'},
         {'citation': 'Dhuime, B., Hawkesworth, C.J., Cawood, P.A. & Storey, C.D. (2012), A change in the geodynamics of continental growth 3 billion years ago, Science 335, 1334–1336 — about two thirds of the crust by 3 billion years, one of the fast curves'},
         {'citation': 'Flament, N., Coltice, N. & Rey, P.F. (2008), A case for late-Archaean continental emergence from thermal evolution models and hypsometry, Earth and Planetary Science Letters 275, 326–336 — little land above the sea before 2.5 billion years'},
         {'citation': 'Bindeman, I.N. et al. (2018), Rapid emergence of subaerial landmasses and onset of a modern hydrologic cycle 2.5 billion years ago, Nature 557, 545–548'},
         {'citation': 'Korenaga, J., Planavsky, N.J. & Evans, D.A.D. (2017), Global water cycle and the coevolution of the Earth\'s interior and surface environment, Philosophical Transactions of the Royal Society A 375, 20150393'}],
        'A sketch, to be checked. The crust curves disagree by a factor of three or four at 3 billion years, and that disagreement is the band. How much stood above the sea is argued more: a few percent of the surface in the Archean by most estimates, rising around 2.5 billion years. Today\'s two numbers are measured.',
        'of the surface', 'linear', 'continent over about {v} of the surface',
        crust, second=('land above the sea', 'land over about {v} of the surface', land))

if __name__ == '__main__':
    main()
