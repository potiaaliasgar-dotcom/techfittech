import os
import re
import json

base = '/Users/batman/Desktop/techfittech'

# Task 1: Reconcile 300+ to 800+ in LLM files
llms_files = ['public/llms.txt', 'public/llms-full.txt']
for f_name in llms_files:
    f_path = os.path.join(base, f_name)
    with open(f_path, 'r') as f:
        content = f.read()
    
    # Replace 300+
    content = re.sub(r'300\+\s*(facilities|projects|gyms)', r'800+ installations', content, flags=re.IGNORECASE)
    content = re.sub(r'300\+', r'800+', content) # catch any lingering "300+" alone
    
    with open(f_path, 'w') as f:
        f.write(content)

# Task 2: Package.json
pkg_path = os.path.join(base, 'package.json')
with open(pkg_path, 'r') as f:
    pkg = json.load(f)

# old: "npm run optimize-images && node scripts/generate-pdf-guide.js && rm -rf dist && vite build && node scripts/generate-seo-pages.mjs && node scripts/validate-schemas.mjs"
# new: "node --check public/assets/app.js && npm run optimize-images && node scripts/generate-pdf-guide.js && rm -rf dist && vite build && node scripts/generate-seo-pages.mjs && node scripts/hash-assets.mjs && node scripts/validate-schemas.mjs"
build_str = pkg['scripts']['build']
if 'node --check public/assets/app.js' not in build_str:
    build_str = 'node --check public/assets/app.js && ' + build_str

if 'node scripts/hash-assets.mjs' not in build_str:
    build_str = build_str.replace('node scripts/validate-schemas.mjs', 'node scripts/hash-assets.mjs && node scripts/validate-schemas.mjs')

pkg['scripts']['build'] = build_str

with open(pkg_path, 'w') as f:
    json.dump(pkg, f, indent=2)

# Task 3: Clean cache busters in index.html and generate-seo-pages.mjs
files_to_clean = ['index.html', 'scripts/generate-seo-pages.mjs']
for f_name in files_to_clean:
    f_path = os.path.join(base, f_name)
    with open(f_path, 'r') as f:
        content = f.read()
    content = re.sub(r'/assets/app\.js\?v=\d+', '/assets/app.js', content)
    with open(f_path, 'w') as f:
        f.write(content)

# Task 4: Mobile Touch Targets in style.css
css_path = os.path.join(base, 'public/assets/style.css')
with open(css_path, 'a') as f:
    f.write('''\n
/* Mobile Touch Targets padding enhancement */
@media(max-width: 700px) {
  .nav-links a, 
  .footer-links a, 
  .footer-col a,
  .footer-brand p a,
  .nav-cta,
  .nav-ham {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    display: inline-block;
    min-height: 48px;
  }
}
''')

print("Applied P1 and P2 tasks.")
