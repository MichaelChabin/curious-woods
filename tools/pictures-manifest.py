"""tools/pictures-manifest.py: write cw-deploys/art/stories/deep/manifest.json and copy the files from
prototypes/pictures-batch-01/chosen/ (the working copies, not in git), from the checked entries of
CWVault/claude/Pictures-Deep-01.md (round 4, 12 Oct 2026; Michael's answers, 13 Oct). Run from _CW with python3 -I."""
import json, shutil, os
SRC = 'prototypes/pictures-batch-01/chosen/'; DST = 'cw-deploys/art/stories/deep/'
C = 'https://commons.wikimedia.org/wiki/File:'
def pic(file, source, licence, author, caption, credit, held=None, note=None):
    r = {'file': file, 'source': source, 'licence': licence, 'author': author, 'caption': caption, 'credit': credit}
    if held: r['held'] = held
    if note: r['note'] = note
    return r
lucy = pic('lucy-skeleton.jpg', C + 'Restos_de_Lucy_(Australopithecus_afarensis),_museo_nacional_de_Etiopía,_Adís_Abeba,_Etiopía,_2024-01-19,_DD_23.jpg',
           'CC BY-SA 4.0', 'Diego Delso', "A copy of Lucy's bones, laid out in a case in the National Museum of Ethiopia, in Addis Ababa.",
           'Photo: Diego Delso, CC BY-SA 4.0, via Wikimedia Commons')
P = {
 'period-recovery': [pic('recovery-titanoboa-vertebra.jpg', C + 'Titanoboa_paratype_precloacal_vertebra_UF-IGM_2.jpg', 'CC0', 'Anfecaro',
    'A copy of one bone from the backbone of <i>Titanoboa</i>, whose bones were found in the coal mine at Cerrejón, in the Museo Geológico Nacional José Royo y Gómez in Bogotá.',
    'Photo: Anfecaro, CC0, via Wikimedia Commons')],
 'period-heat': [pic('heat-strathcona-fiord-stumps.jpg', 'https://doi.org/10.1371/journal.pone.0239073', 'CC BY 4.0', 'Jaelyn Eberle, Wighart von Koenigswald and David Eberth',
    'Stumps of the swamp forest, turned to stone, on a hillside at Strathcona Fiord on Ellesmere Island.',
    'Photos: Eberle, von Koenigswald and Eberth, <i>PLOS ONE</i>, 2020, CC BY 4.0'),
   pic('heat-dawn-redwood.jpg', C + 'Dawn_redwood_grove_in_Kell_Park_1.jpg', 'CC BY 4.0', 'Bjankuloski06',
    'Dawn redwoods, the tree most of that forest was made of, planted in a park in Auckland, New Zealand.',
    'Photo: Bjankuloski06, CC BY 4.0, via Wikimedia Commons')],
 'period-cooling': [pic('cooling-badlands.jpg', C + 'Badlands_National_Park_-_Yellow_Mounds_1.jpg', 'CC0', 'Eekim',
    'Striped hills in the Badlands of South Dakota.', 'Photo: Eekim, CC0, via Wikimedia Commons'),
   pic('cooling-mesohippus.jpg', C + 'Mesohippus_bairdi_(fossil_horse)_(Middle_Oligocene;_Badland_Creek,_Nebraska,_USA)_1_(32356331322).jpg', 'CC BY 2.0', 'James St. John',
    'A skeleton of <i>Mesohippus</i> from Nebraska, with three toes on each foot, in the Carnegie Museum of Natural History in Pittsburgh.',
    'Photo: James St. John, CC BY 2.0, via Wikimedia Commons')],
 'period-grass': [pic('grass-ashfall-rhinos.jpg', C + 'Ashfall_Fossil_Beds_-_Teleoceras_female_and_calf.jpg', 'CC0', 'Ammodramus',
    'A rhino and a calf that was probably hers, lying where they died in the ash, under the barn near Royal, in Nebraska.',
    'Photo: Ammodramus, CC0, via Wikimedia Commons'),
   pic('grass-deinotherium-skull.jpg', C + 'Deinotherium_giganteum_skull_789.jpg', 'CC BY-SA 4.0', 'Ghedo',
    'The skull of a <i>Deinotherium</i>, with tusks that curve down from its lower jaw, in the Gallery of Palaeontology in Paris.',
    'Photo: Ghedo, CC BY-SA 4.0, via Wikimedia Commons')],
 'period-ice': [pic('ice-kap-kobenhavn.jpg', 'https://www.nature.com/articles/s41586-022-05453-y/figures/6', 'CC BY 4.0', 'Kurt Kjær and others',
    'The slopes of Kap København, at the top of Greenland, where the old genes were found in the mud.',
    'Photos: Kjær and others, <i>Nature</i>, 2022, CC BY 4.0, cropped', note='Extended Data Fig. 1, panels a to d, cropped.')],
 'period-lucy': [lucy,
   pic('lucy-laetoli-footprints.jpg', C + 'Laetoli_footprints_replica.jpg', 'CC BY-SA 3.0', 'Momotarou2012',
    'A cast of footprints from Laetoli, in the National Museum of Nature and Science in Tokyo.',
    'Photo: Momotarou2012, CC BY-SA 3.0, via Wikimedia Commons')],
 'event-lucy': [lucy],
 'period-hand-axes': [pic('hand-axes-olduvai-hand-axe.jpg', C + 'GLAM_Ice_Age_050.jpg', 'CC BY-SA 3.0', 'Discott',
    'A hand axe of the same kind, from Olduvai Gorge in Tanzania, between about 850,000 and 400,000 years old.',
    'Photo: Discott, CC BY-SA 3.0, via Wikimedia Commons', note='British Museum 1934,1214.59; the age is the museum\'s for a cleaver from the same find (HK Bed IV).'),
   pic('hand-axes-nariokotome.jpg', C + 'Niño_de_Turkana_-_Museo_Nacional_de_Nairobi.jpg', 'CC BY-SA 4.0', 'ProtoplasmaKid',
    'A cast of the skeleton of the boy from Nariokotome, as it is shown in the Nairobi National Museum, in Kenya.',
    'Photo: ProtoplasmaKid, CC BY-SA 4.0, via Wikimedia Commons')],
 'period-mammoths': [],
 'period-the-last-ice-age': [pic('the-last-ice-age-neem-bottom-core.jpg', C + 'Defense.gov_photo_essay_100728-D-1852B-576.jpg', 'Public domain', 'Fred W. Baker III, US Department of Defense',
    'The bottom of the ice core at NEEM, with grit from the rock beneath the ice sheet, in July 2010.',
    'Photo: US Department of Defense', note='Michael ruled none unless a real NEEM photograph was free; this one is, and he said yes on 13 Oct.')],
 'period-hippos-in-london': [pic('hippos-in-london-canine.jpg', 'https://data.nhm.ac.uk/object/89e724b1-2d78-4c13-8b28-9224be29e37b', 'CC BY 4.0', 'Kevin Webb, The Trustees of the Natural History Museum, London',
    'A hippo\'s tooth, dug from the gravel under Trafalgar Square, kept in the Natural History Museum in London.',
    'Photo: Kevin Webb, Natural History Museum, London, CC BY 4.0', note='NHMUK PV M 26795.')],
 'period-ice-sheets': [pic('ice-sheets-map-20000.jpg', 'prototypes/map-20k.html?sea=-130&ice=1 (js/map.js, world pyramid, stories/ice-outlines.json at 20,000 years)', 'Curious Woods; ground from NOAA ETOPO 2022 (public domain); ice from ICE-6G_C via PMIP4', 'Curious Woods',
    'A map drawn for Curious Woods: the North Sea about 20,000 years ago, with the sea lowered and ice over Ireland, the north of Britain, Scandinavia and the northern North Sea.',
    "Map: Curious Woods, from NOAA's ETOPO 2022 and ICE-6G_C (Peltier and others, via PMIP4)")],
 'period-after-the-ice': [pic('after-the-ice-gobero-burial.jpg', 'https://doi.org/10.1371/journal.pone.0002995.g005', 'CC BY', 'Mike Hettwer, in Sereno and others 2008',
    'The grave of a man at Gobero, in Niger, lifted from the sand in one block: seen from above, from below with a turtle shell, and his skull.',
    'Photos: Mike Hettwer, in Sereno and others, <i>PLOS ONE</i>, 2008, CC BY, cropped', note='Figure 5, panels A to C (burial G1B11, about 4645 BCE); the rest of the figure left out on Michael\'s word, 13 Oct.'),
   pic('after-the-ice-tassili-cattle.jpg', C + 'Daily_scene_with_cattle.jpg', 'CC BY-SA 4.0', 'IssamBarhoumi',
    'Cattle and people, painted on a rock in Tassili n\'Ajjer, in Algeria.', 'Photo: IssamBarhoumi, CC BY-SA 4.0, via Wikimedia Commons')],
}
os.makedirs(DST, exist_ok=True)
files = sorted({p['file'] for v in P.values() for p in v})
for f in files: shutil.copy2(SRC + f, DST + f)
out = {'_about': 'Pictures for the deep-time periods and events, keyed period-<id> and event-<id>; each key a list in the order the More shows them, an empty list where the answer is none. A picture with "held" waits on Michael and is not shown (none at present). Captions may hold <i> for names in italics. Written by Claude from claude/Pictures-Deep-01.md (checked 12 Oct 2026, read by Michael 13 Oct); edit the batch file, not this.',
       'version': '2026-10-13', 'batches': ['Pictures-Deep-01'], 'pictures': P}
json.dump(out, open(DST + 'manifest.json', 'w'), indent=1, ensure_ascii=False)
print(len(files), 'files;', sum(len(v) for v in P.values()), 'entries;', sum(1 for v in P.values() for p in v if p.get('held')), 'held')
