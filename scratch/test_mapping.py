import json
import os
import re

json_path = '/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/Alteon Site Build/data/products.json'
with open(json_path, 'r') as f:
    alteon_data = json.load(f)

products = alteon_data['products']

extras_dir = '/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/Alteon Site Build/assets/brochure-extras'
extra_files = os.listdir(extras_dir)

mapped = {}
unmapped = []

for file in extra_files:
    if file.startswith('.'): continue
    parts = file.split('__')
    if len(parts) > 1:
        prefix = parts[0].strip().lower()
        # Some prefixes might have slight typos
        best_match = None
        for p in products:
            p_name = p['name'].lower().strip()
            # Normalize spaces and dashes
            norm_prefix = re.sub(r'[^a-z0-9]', '', prefix)
            norm_name = re.sub(r'[^a-z0-9]', '', p_name)
            
            if norm_prefix in norm_name or norm_name in norm_prefix:
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
