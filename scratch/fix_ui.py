import re

with open('public/assets/app.js', 'r') as f:
    app_js = f.read()

css_anchor = "@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"
css_to_add = """
.alteon-page .gallery-section { margin-top: 40px; }
.alteon-page .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 24px; }
.alteon-page .gallery-grid img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; border: 1px solid rgba(255,255,255,.09); aspect-ratio: 4/3; }
@media(max-width: 860px) { .alteon-page .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
@media(max-width: 620px) { .alteon-page .gallery-grid { grid-template-columns: 1fr; } }
"""

if css_anchor in app_js:
    app_js = app_js.replace(css_anchor, css_anchor + css_to_add)
else:
    print("CSS anchor not found.")

html_target = "${alteonCtaBand()}"
html_to_add = """
                    ${p.gallery && p.gallery.length ? `<div class="blk gallery-section"><h4>Product Gallery</h4><div class="gallery-grid">${p.gallery.map((img, i) => `<img src="/${img}" loading="lazy" class="fade" style="animation-delay:${i * 0.1}s">`).join('')}</div></div>` : ''}
                    ${alteonCtaBand()}
"""

if html_target in app_js:
    # replace first occurrence only? Actually replace all occurrences of `${alteonCtaBand()}` inside renderAlteonProduct?
    # Actually there is only one in renderAlteonProduct, but maybe others in Hub/Category?
    # Let's replace precisely by splitting the file around `function renderAlteonProduct(productId) {`
    parts = app_js.split("function renderAlteonProduct(categoryId, productId) {")
    if len(parts) == 2:
        parts[1] = parts[1].replace("${alteonCtaBand()}", html_to_add.strip(), 1)
        app_js = parts[0] + "function renderAlteonProduct(categoryId, productId) {" + parts[1]
    else:
        print("Function renderAlteonProduct not found as expected.")
else:
    print("HTML target not found.")

with open('public/assets/app.js', 'w') as f:
    f.write(app_js)

print("UI logic injected.")
