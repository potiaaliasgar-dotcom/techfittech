import re
import os

keywords = ['dealer', 'distributor', 'authorised', 'authorized']
files = [
    'scripts/generate-seo-pages.mjs',
    'public/assets/app.js',
    'index.html'
]

for filename in files:
    path = os.path.join('/Users/batman/Desktop/techfittech', filename)
    if not os.path.exists(path):
        print(f"File not found: {filename}")
        continue
    print(f"\n=== Occurrences in {filename} ===")
    lines = open(path, 'r', encoding='utf-8').readlines()
    for idx, line in enumerate(lines):
        line_num = idx + 1
        matched = []
        for kw in keywords:
            if kw in line.lower():
                matched.append(kw)
        if matched:
            # check if it relates to California, Tunturi, BH, Alteon, Bendis, Jordan, or general
            print(f"Line {line_num}: {line.strip()}")
