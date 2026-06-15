import re

seo_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove from PAGES dictionary
pages_jordan = r"\s*'jordan-fitness': \{[\s\S]*?h1: 'Jordan Fitness Premium Gym Accessories India',\n  \},"
content = re.sub(pages_jordan, '', content)
pages_bendis = r"\s*'bendis-pilates': \{[\s\S]*?h1: 'Bendis Pilates Premium Studio Equipment India',\n  \},"
content = re.sub(pages_bendis, '', content)

# Remove from SCHEMAS dictionary
schemas_jordan = r"\s*'jordan-fitness': \{[\s\S]*?\}\s*\}\s*\}\s*\},"
content = re.sub(schemas_jordan, '', content)
schemas_bendis = r"\s*'bendis-pilates': \{[\s\S]*?\}\s*\}\s*\}\s*\},"
content = re.sub(schemas_bendis, '', content)

# Remove from BRANDS_WITH_CATEGORIES array
content = content.replace(", 'bendis-pilates', 'jordan-fitness'", "")

# Remove from DYNAMIC_BRAND_PAGES dictionary
dyn_bendis = r"\s*'bendis-pilates': \{ brand: 'Bendis Pilates', name: 'Bendis Pilates Premium Studio Equipment' \},"
content = re.sub(dyn_bendis, '', content)
dyn_jordan = r"\s*'jordan-fitness': \{ brand: 'Jordan Fitness', name: 'Jordan Fitness Premium Gym Accessories' \},"
content = re.sub(dyn_jordan, '', content)

with open(seo_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up generate-seo-pages.mjs")
