import re
import os
import glob

print("Starting Site Audit...\n")

# 1. Check JS Syntax
print("1. Checking JS Syntax...")
exit_code1 = os.system("node -c public/assets/app.js")
exit_code2 = os.system("node -c public/assets/alteon-data.js")
if exit_code1 == 0 and exit_code2 == 0:
    print("JS Syntax: OK\n")
else:
    print("JS Syntax: FAILED\n")

# 2. Extract all image paths and check existence
print("2. Checking Images...")
files_to_scan = [
    "index.html",
    "public/assets/app.js",
    "public/assets/alteon-data.js",
    "scripts/generate-seo-pages.mjs"
]

all_content = ""
for f in files_to_scan:
    if os.path.exists(f):
        with open(f, 'r') as file:
            all_content += file.read() + "\n"

# Regex to find anything ending in image extensions
image_pattern = re.compile(r'([\w\-\./]+\.(?:webp|jpg|jpeg|png|svg|avif))', re.IGNORECASE)
found_images = set(image_pattern.findall(all_content))

missing_images = []
for img in found_images:
    if img.startswith('http') or img.startswith('//'):
        continue # skip external
    
    # Clean up the path
    clean_img = img.lstrip('/')
    
    # Sometimes paths in JS are relative to public, sometimes just assets/
    if clean_img.startswith('assets/'):
        target_path = os.path.join('public', clean_img)
    elif clean_img.startswith('public/'):
        target_path = clean_img
    else:
        # Check if it's directly in public or root
        if os.path.exists(os.path.join('public', clean_img)):
            target_path = os.path.join('public', clean_img)
        else:
            target_path = clean_img
            
    if not os.path.exists(target_path):
        missing_images.append(img)

if not missing_images:
    print("Images: OK (All referenced local images exist)\n")
else:
    print(f"Images: FAILED ({len(missing_images)} missing images)")
    for m in missing_images:
        print(f" - {m}")
    print("\n")

# 3. Check Routes
print("3. Checking Routes...")
go_calls = set(re.findall(r"go\(['\"]([^'\"]+)['\"]\)", all_content))
with open('public/assets/app.js', 'r') as f:
    app_js = f.read()

# Very basic check: does the route string appear in app.js as a key or condition?
missing_routes = []
for route in go_calls:
    # A route could be in views dict: 'route': ...
    # or in an if statement: if (page === 'route')
    # or handle prefix like alteon/
    if f"'{route}':" not in app_js and f'"{route}":' not in app_js and f"page === '{route}'" not in app_js and f"page === \"{route}\"" not in app_js:
        if not route.startswith('alteon') and route != "home" and route != "blogs":
            # home and blogs might have special logic
            missing_routes.append(route)

if not missing_routes:
    print("Routes: OK (All routes seem to be handled)\n")
else:
    print(f"Routes: POTENTIAL ISSUES ({len(missing_routes)} routes might not be handled)")
    for r in missing_routes:
        print(f" - {r}")
    print("\n")

print("Audit Complete.")
