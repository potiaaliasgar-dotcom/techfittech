import json
import os
import re

json_path = '/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/Alteon Site Build/data/products.json'
with open(json_path, 'r') as f:
    alteon_data = json.load(f)

products = []
for cat in alteon_data['categories']:
    products.extend(cat['products'])

product_names = [p['name'].lower().strip() for p in products]

extras_dir = '/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/Alteon Site Build/assets/brochure-extras'
extra_files = os.listdir(extras_dir)

mapped = {}
unmapped = []

for file in extra_files:
    if file.startswith('.'): continue
    # Extract the prefix before "__"
    parts = file.split('__')
    if len(parts) > 1:
        prefix = parts[0].strip().lower()
        # Find best match
        best_match = None
        for p in products:
            p_name = p['name'].lower().strip()
            if prefix == p_name or prefix in p_name or p_name in prefix:
                best_match = p['id']
                break
        if best_match:
            if best_match not in mapped:
                mapped[best_match] = []
            mapped[best_match].append(file)
        else:
            unmapped.append(file)
    else:
        unmapped.append(file)

print(f"Mapped {sum(len(v) for v in mapped.values())} files to {len(mapped)} products.")
if unmapped:
    print(f"Unmapped files: {unmapped}")
