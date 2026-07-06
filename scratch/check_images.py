import json, os, re

data_file = 'public/assets/alteon-data.js'
with open(data_file, 'r') as f:
    content = f.read()

# Extract the JSON object
match = re.search(r'window\.ALTEON_DATA\s*=\s*({.*});?', content, re.DOTALL)
if not match:
    print("Could not find ALTEON_DATA")
    exit(1)

data_str = match.group(1)
# Handle potential JS specifics, but it's mostly JSON.
try:
    # simple fix if there are missing quotes etc.
    import ast
    # The JS object has unquoted keys maybe? Actually looking at it, it's valid JSON.
    data = json.loads(data_str)
except Exception as e:
    # try demjson or ast
    print("Failed to parse JSON directly:", e)
    
# Let's just regex all image paths ending in webp, jpg, png, etc.
images = set(re.findall(r'[\'"]([^\'"]+\.(?:webp|jpg|png|jpeg))[\'"]', content))

missing = []
for img in images:
    path = os.path.join('public', img)
    if not os.path.exists(path):
        missing.append(img)

print(f"Total unique images found in alteon-data.js: {len(images)}")
print(f"Missing images: {len(missing)}")
for m in missing:
    print("  " + m)
