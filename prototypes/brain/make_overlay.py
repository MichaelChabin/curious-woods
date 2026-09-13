"""Build brain-views.svg: Michael's two watercolours with ten soft region overlays.
Region ids match Spec-Brain-Bench.md. Coordinates are in each image's pixel space.
Edit the REGIONS tables and re-run; render.py makes a check image."""
import base64, pathlib

COPPER = "#b87333"

# (id, label, cx, cy, rx, ry, rotate_deg, deep)  deep = lies beneath the surface on this view
OUTSIDE = [
    ("prefrontal",   "prefrontal cortex",        165, 300, 115, 150,   0, False),
    ("motor",        "motor cortex",             400, 200,  40, 145, -12, False),
    ("somatosensory","somatosensory cortex",     470, 205,  40, 145, -14, False),
    ("ips",          "intraparietal sulcus",     620, 235,  95,  60, -10, False),
    ("v1",           "V1 (where seeing starts)", 800, 430,  55,  95,   0, False),
    ("auditory",     "auditory cortex",          430, 440, 120,  38, -18, False),
    ("letterbox",    "the letterbox",            600, 505,  60,  30,   0, False),
    ("cerebellum",   "cerebellum",               610, 650, 160, 100,   0, False),
    ("hippocampus",  "hippocampus",              430, 520,  85,  35,  -8, True),
    ("basal-ganglia","basal ganglia",            420, 385,  70,  55,   0, True),
]
INSIDE = [
    ("prefrontal",   "prefrontal cortex",        230, 420, 150, 200,   0, False),
    ("motor",        "motor cortex",             555, 170,  60,  95,   0, False),
    ("somatosensory","somatosensory cortex",     690, 175,  60,  95,   0, False),
    ("v1",           "V1 (where seeing starts)",1070, 560,  90, 120,   0, False),
    ("cerebellum",   "cerebellum",               950, 880, 190, 175,   0, False),
    ("hippocampus",  "hippocampus",              480, 745, 110,  40,  10, True),
    ("basal-ganglia","basal ganglia",            520, 500, 110,  75,   0, True),
]

def data_uri(p):
    b = pathlib.Path(p).read_bytes()
    mime = "image/png" if p.endswith(".png") else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(b).decode()}"

def view(name, img, size, regions, show_all):
    out = [f'<g id="view-{name}" class="view" data-size="{size}">',
           f'  <image href="{data_uri(img)}" width="{size}" height="{size}"/>',
           '  <g class="regions">']
    for rid, label, cx, cy, rx, ry, rot, deep in regions:
        cls = "region deep" if deep else "region"
        style = ' style="fill-opacity:.35;stroke-opacity:.9"' if show_all else ""
        out.append(f'    <ellipse id="{name}-{rid}" class="{cls}" data-region="{rid}" data-label="{label}" '
                   f'cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" transform="rotate({rot} {cx} {cy})"{style}>'
                   f'<title>{label}</title></ellipse>')
    out += ['  </g>', '</g>']
    return "\n".join(out)

def build(show_all=False):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1254 1254" id="cw-brain-views">
<!-- Curious Woods Brain bench: two views, ten regions. Region ids match Spec-Brain-Bench.md.
     Outside view is 886px square, inside view 1254px square; each is its own <g>. Show one at a time.
     .region: hidden until earned or shown; .deep: the region lies beneath the surface on this view (dashed).
     Glow: raise fill-opacity to .35 and stroke-opacity to .9 over 300ms. -->
<defs>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
<style>
  .region {{ fill:{COPPER}; fill-opacity:0; stroke:{COPPER}; stroke-width:3; stroke-opacity:0; filter:url(#soft);
             transition: fill-opacity 300ms ease-in, stroke-opacity 300ms ease-in; }}
  .region.deep {{ stroke-dasharray: 10 8; }}
  .region.lit, .region.earned {{ fill-opacity:.35; stroke-opacity:.9; }}
  .region.lit {{ fill-opacity:.5; }}
</style>
{view("outside", "brain-outside.jpg", 886, OUTSIDE, show_all)}
{view("inside", "brain-inside.png", 1254, INSIDE, show_all)}
</svg>'''

if __name__ == "__main__":
    pathlib.Path("brain-views.svg").write_text(build(False))
    pathlib.Path("brain-views-check.svg").write_text(build(True))
    print("ok")
