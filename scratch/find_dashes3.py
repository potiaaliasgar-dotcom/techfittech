import re

file_path = "/Users/batman/Desktop/techfittech/public/assets/app.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

start = content.find("function renderHyrox() {")
end = content.find("\n}\n", start)
hyrox_code = content[start:end]

lines = hyrox_code.split('\n')
for i, line in enumerate(lines):
    # remove tags
    text = re.sub(r'<[^>]+>', '', line)
    # look for dash
    if '-' in text or '—' in text:
        print(f"Line {i}: {text.strip()}")
        print(f"RAW: {line.strip()}")
