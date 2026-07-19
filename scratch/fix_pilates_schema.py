import json
import re

file_path = 'public/pilates.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Find the ItemList JSON-LD block
match = re.search(r'<script type="application/ld\+json">({"@context":\s*"https://schema.org",\s*"@type":\s*"ItemList".*?})</script>', html, re.DOTALL)

if match:
    json_str = match.group(1)
    data = json.loads(json_str)
    
    # Add offers to each product
    for list_item in data.get('itemListElement', []):
        item = list_item.get('item', {})
        if item.get('@type') == 'Product' and 'offers' not in item:
            item['offers'] = {
                "@type": "Offer",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "url": "https://www.techfittech.com/pilates",
                "seller": {
                    "@type": "Organization",
                    "name": "TechFit",
                    "url": "https://www.techfittech.com/"
                }
            }
            
    # Replace the block
    new_json_str = json.dumps(data, separators=(',', ':'))
    new_html = html[:match.start(1)] + new_json_str + html[match.end(1):]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Fixed public/pilates.html")
else:
    print("Could not find the ItemList JSON-LD block in public/pilates.html")
