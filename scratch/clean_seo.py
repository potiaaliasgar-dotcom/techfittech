import re
import json

seo_mjs_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_mjs_path, 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'title: ' in line or 'description: ' in line or 'metaDesc: ' in line:
        # Find the value
        match = re.search(r"(title|description|metaDesc):\s*(['\"])(.*?)\2", line)
        # Wait, \2 will match the same quote character. If there is an apostrophe inside double quotes, it won't break!
        # What if it's single quotes with an escaped apostrophe inside? JS allows `\'`.
        # Let's just do a simple replacement for length.
        if match:
            key = match.group(1)
            quote = match.group(2)
            val = match.group(3)
            
            # Trim
            if key == 'title' and len(val) > 60:
                val = val[:57].strip() + "..."
            elif key in ['description', 'metaDesc'] and len(val) > 155:
                val = val[:152].strip() + "..."
                
            # Reconstruct safely. Since we captured the quote type, we can reuse it, 
            # as long as we don't introduce unescaped quotes.
            lines[i] = re.sub(r"(title|description|metaDesc):\s*(['\"])(.*?)\2", f"{key}: {quote}{val}{quote}", line)

# Reconcile 800+
for i, line in enumerate(lines):
    lines[i] = re.sub(r'300\+\s*(facilities|projects|gyms)', r'800+ installations', lines[i], flags=re.IGNORECASE)

# Deprecate duplicates
seo_mjs = "".join(lines)
duplicates = [
    'cybex-alternative-india',
    'hammer-strength-alternative-india',
    'matrix-fitness-alternative-india',
    'nautilus-alternative-india',
    'flooring'
]
for dup in duplicates:
    seo_mjs = re.sub(rf"'{dup}',\s*", "", seo_mjs)

# Unique meta descriptions
alts = ['cybex-india', 'hammer-strength-india', 'nautilus-india', 'matrix-fitness-india']
for a in alts:
    brand = a.split('-')[0].capitalize()
    # It might be in single or double quotes
    seo_mjs = re.sub(rf"'{a}': \{{[^}}]*?title:\s*(['\"])([^\"]*?)\1,[^\}}]*?description:\s*(['\"]).*?\3", rf"'{a}': {{\n    title: \1\2\1,\n    description: \3Compare {brand} commercial gym equipment prices in India. See why TechFit is the best alternative for CapEx ROI.\3", seo_mjs)

with open(seo_mjs_path, 'w') as f:
    f.write(seo_mjs)

print("SEO mjs fixed successfully!")
