import re

index_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Bendis from JSON-LD ItemList
content = re.sub(r',\s*\{\s*"@type": "ListItem",\s*"position": 5,\s*"item": \{\s*"@id": "https://www.techfittech.com/bendis-pilates",\s*"name": "Bendis Pilates Studio Equipment",\s*"url": "https://www.techfittech.com/bendis-pilates"\s*\}\s*\}', '', content)

# Remove Jordan from JSON-LD ItemList
content = re.sub(r',\s*\{\s*"@type": "ListItem",\s*"position": 6,\s*"item": \{\s*"@id": "https://www.techfittech.com/jordan-fitness",\s*"name": "Jordan Fitness Premium Accessories",\s*"url": "https://www.techfittech.com/jordan-fitness"\s*\}\s*\}', '', content)

# Remove schema blocks
bendis_schema = r"\s*'/bendis-pilates': \{[\s\S]*?\"serviceType\": \"Fitness Equipment Distribution\"\n\s*\}\n\s*\]\n\s*\}\n\s*\},"
content = re.sub(bendis_schema, '', content)

jordan_schema = r"\s*'/jordan-fitness': \{[\s\S]*?\"serviceType\": \"Fitness Equipment Distribution\"\n\s*\}\n\s*\]\n\s*\}\n\s*\},"
content = re.sub(jordan_schema, '', content)

# Remove dropdown buttons
content = re.sub(r'\s*<button class="nd-item" onclick="go\(\'jordan-fitness\'\)">Jordan Fitness</button>', '', content)
content = re.sub(r'\s*<button class="nd-item" onclick="go\(\'bendis-pilates\'\)">Bendis Pilates</button>', '', content)

content = re.sub(r'\s*<button class="mob-sub" onclick="go\(\'jordan-fitness\'\)">Jordan Fitness</button>', '', content)
content = re.sub(r'\s*<button class="mob-sub" onclick="go\(\'bendis-pilates\'\)">Bendis Pilates</button>', '', content)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)
