import base64, sys, pathlib
SP = pathlib.Path('/tmp/claude-0/-home-claude/9bbe6956-42a5-5471-b334-7490117a5d34/scratchpad')
out = base64.b64encode(open('brain-outside.jpg','rb').read()).decode()
inn = base64.b64encode(open('brain-inside.png','rb').read()).decode()
for tpl, name in [('hm-page.template.html','the-man-who-learned.html'), ('atlas.template.html','brain-atlas.html')]:
    s = open(tpl).read().replace('__OUT__', out).replace('__IN__', inn)
    (SP/name).write_text(s); print(name, len(s))
