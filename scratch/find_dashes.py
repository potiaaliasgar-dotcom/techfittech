import re

with open('/Users/batman/Desktop/techfittech/public/assets/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if line.startswith('function renderHyrox() {'):
        start_idx = i
    elif start_idx != -1 and line.startswith('}'):
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    hyrox_lines = lines[start_idx:end_idx+1]
    
    # Let's find any dashes that are not in HTML attributes/tags.
    # A simple way to see all lines with dashes is to just print them.
    for i, line in enumerate(hyrox_lines):
        if '-' in line or '—' in line:
            # remove html tags to check if dash is in text
            text_only = re.sub(r'<[^>]+>', '', line)
            if '-' in text_only or '—' in text_only:
                print(f"Line {start_idx + i + 1}: {text_only.strip()}")
