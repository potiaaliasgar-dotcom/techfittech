import re
import json

seo_mjs_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_mjs_path, 'r') as f:
    seo_mjs = f.read()

# 4. Reconcile "800+ Installations"
seo_mjs = re.sub(r'300\+\s*(facilities|projects|gyms)', r'800+ installations', seo_mjs, flags=re.IGNORECASE)

# 5. Deprecate duplicates
duplicates = [
    'cybex-alternative-india',
    'hammer-strength-alternative-india',
    'matrix-fitness-alternative-india',
    'nautilus-alternative-india',
    'flooring'
]
for dup in duplicates:
    seo_mjs = re.sub(rf"'{dup}',\s*", "", seo_mjs)

# 6. Trim <title> and Meta Descriptions safely
def trim_seo(match):
    key = match.group(1)
    val = match.group(2)
    if key == 'title' and len(val) > 60:
        val = val[:57].strip() + "..."
    elif key in ['description', 'metaDesc'] and len(val) > 155:
        val = val[:152].strip() + "..."
    
    # Use json.dumps to safely encode as a JS string
    safe_val = json.dumps(val)
    return f"{key}: {safe_val}"

seo_mjs = re.sub(r"(title|description|metaDesc):\s*['\"](.*?)['\"]", trim_seo, seo_mjs)

# Add unique meta descriptions for alternatives
alts = ['cybex-india', 'hammer-strength-india', 'nautilus-india', 'matrix-fitness-india']
for a in alts:
    brand = a.split('-')[0].capitalize()
    seo_mjs = re.sub(rf"'{a}': \{{[^}}]*?title:\s*\"([^\"]*?)\",[^\}}]*?description:\s*\".*?\"", rf"'{a}': {{\n    title: \"\1\",\n    description: \"Compare {brand} commercial gym equipment prices in India. See why TechFit is the best alternative for CapEx ROI.\"", seo_mjs)

with open(seo_mjs_path, 'w') as f:
    f.write(seo_mjs)

print("SEO mjs fixed successfully!")
