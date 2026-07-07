import re

with open('/Users/batman/Desktop/techfittech/public/assets/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if 'function renderHyrox()' in line:
        start_idx = i
    elif start_idx != -1 and line.startswith('}'):
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    hyrox_lines = lines[start_idx:end_idx+1]
    
    for i, line in enumerate(hyrox_lines):
        # We only care about visible text. We will just look at the line and see if there are em dashes.
        if '—' in line:
            print(f"Em-dash at {start_idx + i + 1}: {line.strip()}")
        if ' - ' in line:
            print(f"Space-dash at {start_idx + i + 1}: {line.strip()}")
