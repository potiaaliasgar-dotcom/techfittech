import re

with open('/Users/batman/Desktop/techfittech/public/assets/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The function renderHyrox is from line 6381 to 7281 roughly
hyrox_lines = lines[6380:7300]
in_hyrox = False
for i, line in enumerate(hyrox_lines):
    if 'function renderHyrox()' in line:
        in_hyrox = True
    if in_hyrox:
        # Ignore CSS lines
        if '{' in line and '}' in line and 'var(' in line:
            continue
        # Check text content
        text = re.sub(r'<[^>]+>', '', line)
        # Check for dashes
        # we care about — (em dash) or - (hyphen) when it's surrounded by spaces, or used as punctuation.
        if '—' in text or ' - ' in text:
            print(f"Line {6380 + i + 1}: {line.strip()}")
        if in_hyrox and line.startswith('}'): # end of function? No, could be end of block.
            pass
