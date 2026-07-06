import os
import re

ROOT = "/Users/batman/Desktop/techfittech"
PUBLIC = os.path.join(ROOT, "public")

files_to_scan = [
    "public/assets/app.js",
    "public/assets/alteon-data.js",
    "index.html",
    "public/assets/style.css",
    "scripts/generate-seo-pages.mjs"
]

missing_images = set()
valid_routes = set()
broken_links = set()

# First, extract what we consider valid routes from app.js (the router block)
app_js_path = os.path.join(ROOT, "public/assets/app.js")
if os.path.exists(app_js_path):
    with open(app_js_path, "r", encoding="utf-8") as f:
        content = f.read()
        # Find all views map keys
        # 'about': renderAbout,
        routes = re.findall(r"'([\w-]+(?:/[\w-]+)*)':\s*(?:render\w+|\(\)\s*=>)", content)
        for r in routes:
            valid_routes.add(r)
        
        # Add static known ones
        valid_routes.update(["", "/", "alteon", "hyrox", "alternatives"])

print(f"Detected {len(valid_routes)} base routes in app.js router.")

# Now scan for images and go() links
for rel_path in files_to_scan:
    full_path = os.path.join(ROOT, rel_path)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()
        
        # Scan for images
        # Match anything like assets/images/...png
        images = re.findall(r'assets/images/[^"\',)\s]+\.(?:jpg|jpeg|png|webp|avif|svg)', content)
        for img in images:
            img_path = os.path.join(PUBLIC, img)
            if not os.path.exists(img_path):
                missing_images.add(f"{img} (found in {rel_path})")
                
        # Scan for go('...') calls
        links = re.findall(r"go\('([^']+)'\)", content)
        for link in links:
            base = link.split('/')[0]
            if base not in valid_routes and base not in ["alteon", "hyrox"]:
                broken_links.add(f"go('{link}') (found in {rel_path})")

print("\n=== MISSING IMAGES ===")
if missing_images:
    for m in sorted(missing_images):
        print(f"❌ {m}")
else:
    print("✅ No missing images found in code references!")

print("\n=== POTENTIALLY BROKEN go() LINKS ===")
if broken_links:
    for b in sorted(broken_links):
        print(f"⚠️ {b}")
else:
    print("✅ All go() links seem valid!")
