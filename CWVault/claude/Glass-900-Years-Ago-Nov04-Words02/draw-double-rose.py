import math
r = 100.0
cx, cy = 150.0, 150.0
def pt(a_deg, k=1.0):
    a = math.radians(a_deg)
    return (cx + k*r*math.cos(a), cy - k*r*math.sin(a))
def f(x): return ('%.2f' % x).rstrip('0').rstrip('.')
out = []
out.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="900" height="900" role="img" aria-labelledby="t d">')
out.append('<title id="t">The double rose and hexagon</title>')
out.append('<desc id="d">A design drawn in lead on a chalked board: twelve petals meeting at a centre, six of them reaching the corners of a hexagon drawn around them. The circles that made the petals are drawn faintly.</desc>')
out.append('<rect width="300" height="300" fill="#f6f2e8"/>')
# faint construction circles: the centre circle and the twelve on it
out.append('<g fill="none" stroke="#9a948a" stroke-width="0.45" opacity="0.55">')
out.append('<circle cx="%s" cy="%s" r="%s"/>' % (f(cx), f(cy), f(r)))
for k in range(12):
    x, y = pt(30*k)
    out.append('<circle cx="%s" cy="%s" r="%s"/>' % (f(x), f(y), f(r)))
out.append('</g>')
# the twelve petals: vesicas from the centre to each point of the twelve
out.append('<g fill="none" stroke="#4a463f" stroke-width="1.3" stroke-linejoin="round">')
for k in range(12):
    x, y = pt(30*k)
    out.append('<path d="M%s %s A%s %s 0 0 1 %s %s A%s %s 0 0 1 %s %s Z"/>' % (f(cx), f(cy), f(r), f(r), f(x), f(y), f(r), f(r), f(cx), f(cy)))
out.append('</g>')
# the hexagon through the six points of the first rose
hexpts = ' '.join('%s,%s' % (f(x), f(y)) for x, y in (pt(60*k) for k in range(6)))
out.append('<polygon points="%s" fill="none" stroke="#4a463f" stroke-width="1.5" stroke-linejoin="round"/>' % hexpts)
# the centre point and the twelve points, as a lead point would mark them
out.append('<g fill="#4a463f">')
out.append('<circle cx="%s" cy="%s" r="1.1"/>' % (f(cx), f(cy)))
for k in range(12):
    x, y = pt(30*k)
    out.append('<circle cx="%s" cy="%s" r="1.1"/>' % (f(x), f(y)))
out.append('</g>')
out.append('</svg>')
open('cw-deploys/art/stories/geo-1-glass-circles/double-rose-and-hexagon.svg', 'w').write('\n'.join(out) + '\n')
print(open('cw-deploys/art/stories/geo-1-glass-circles/double-rose-and-hexagon.svg').read()[:600])
