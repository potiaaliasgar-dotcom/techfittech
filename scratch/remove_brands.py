import json
import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove from SEO_MAP
seo_map_pattern_jordan = r"\s*'jordan-fitness': \{[\s\S]*?\},"
content = re.sub(seo_map_pattern_jordan, '', content)
seo_map_pattern_bendis = r"\s*'bendis-pilates': \{[\s\S]*?\},"
content = re.sub(seo_map_pattern_bendis, '', content)

# 2. Remove from ROUTE_MAP
route_map_jordan = r"\s*'jordan-fitness': \(\) => renderBrand\('Jordan Fitness'\),"
content = re.sub(route_map_jordan, '', content)
route_map_bendis = r"\s*'bendis-pilates': \(\) => renderBrand\('Bendis Pilates'\),"
content = re.sub(route_map_bendis, '', content)

# 3. Remove from navMap
content = content.replace(", 'bendis-pilates': 'nl-products', 'jordan-fitness': 'nl-products'", "")

# 4. Remove buttons
content = re.sub(r'\s*<button onclick="go\(\'(jordan-fitness|bendis-pilates)\'\)">[^<]+</button>', '', content)

# 5. Remove from BRANDS dictionary
brand_jordan = r"\s*'Jordan Fitness': \{[\s\S]*?\},"
content = re.sub(brand_jordan, '', content)
brand_bendis = r"\s*'Bendis Pilates': \{[\s\S]*?\},"
content = re.sub(brand_bendis, '', content)

# 6. Remove from validPages
content = content.replace(", 'bendis-pilates', 'jordan-fitness'", "")
# Also maybe they are in the sitemap array at the bottom? Let's be safe:
content = content.replace("'bendis-pilates', ", "")
content = content.replace("'jordan-fitness', ", "")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

# 7. Remove from products.json
products_path = '/Users/batman/Desktop/techfittech/public/assets/products.json'
with open(products_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

new_products = [p for p in products if p.get('b') not in ('Jordan Fitness', 'Bendis Pilates')]

with open(products_path, 'w', encoding='utf-8') as f:
    json.dump(new_products, f, separators=(',', ':'))

print(f"Removed brands. Remaining products: {len(new_products)}")
