import re

seo_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target sections have single quotes for keys
# Let's remove lines containing 'bendis-pilates' or 'jordan-fitness' if they are within known sections.

# Actually, the python regex `\s*'jordan-fitness': \{[\s\S]*?h1: 'Jordan Fitness Premium Gym Accessories India',\n  \},`
# might have failed because the `h1` line had no comma at the end, or whitespace was different.

# Let's just remove specific known strings without strict whitespace.
to_replace = [
    "'tunturi', 'california-fitness', 'bendis-pilates', 'jordan-fitness', 'techfit'",
    "'bendis-pilates': { brand: 'Bendis Pilates', name: 'Bendis Pilates Premium Studio Equipment' },",
    "'jordan-fitness': { brand: 'Jordan Fitness', name: 'Jordan Fitness Premium Gym Accessories' },"
]

for item in to_replace:
    if item == "'tunturi', 'california-fitness', 'bendis-pilates', 'jordan-fitness', 'techfit'":
        content = content.replace(item, "'tunturi', 'california-fitness', 'techfit'")
    else:
        content = content.replace(item, "")

# For the large dictionary blocks, let's use a non-greedy match that stops at a specific unique end string
jordan_page_regex = r"\s*'jordan-fitness': \{[\s\S]*?Jordan Fitness Premium Gym Accessories India'[^}]*\},"
content = re.sub(jordan_page_regex, '', content)

bendis_page_regex = r"\s*'bendis-pilates': \{[\s\S]*?Bendis Pilates Premium Studio Equipment India'[^}]*\},"
content = re.sub(bendis_page_regex, '', content)

# For the schemas, they end with "serviceType": "Fitness Equipment Distribution"\n      }\n      ]\n    }\n  },
jordan_schema_regex = r"\s*'jordan-fitness': \{[\s\S]*?\"serviceType\": \"Fitness Equipment Distribution\"\n\s*\}\n\s*\]\n\s*\}\n\s*\},"
content = re.sub(jordan_schema_regex, '', content)

bendis_schema_regex = r"\s*'bendis-pilates': \{[\s\S]*?\"serviceType\": \"Fitness Equipment Distribution\"\n\s*\}\n\s*\]\n\s*\}\n\s*\},"
content = re.sub(bendis_schema_regex, '', content)

with open(seo_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up generate-seo-pages.mjs")
