import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add view_item gtag to openModal
open_modal_regex = r"function openModal\(slug,\s*brandName\)\s*\{\s*const p = PRODUCTS\.find\(x => x\.s === slug && x\.b === brandName\);\s*if \(\!p\) return;\s*document\.getElementById\('m-title'\)\.textContent = p\.n;"

replacement = """function openModal(slug, brandName) {
      const p = PRODUCTS.find(x => x.s === slug && x.b === brandName);
      if (!p) return;
      if (typeof gtag === 'function') {
        gtag('event', 'view_item', {
          items: [{ item_name: p.n, item_brand: p.b, item_category: p.c }]
        });
      }
      document.getElementById('m-title').textContent = p.n;"""

content = re.sub(open_modal_regex, replacement, content)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added view_item tracking to app.js")
