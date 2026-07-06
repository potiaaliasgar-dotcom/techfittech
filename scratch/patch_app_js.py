import re

app_file = 'public/assets/app.js'
with open(app_file, 'r') as f:
    content = f.read()

# 1. Update CSS for .pdp-img to remove position:sticky
# Original: .alteon-page .pdp-img{... position:sticky;top:96px; ...}
content = re.sub(r'position:sticky;top:96px;', '', content)

# 2. Update the HTML in renderAlteonProduct
original_pdp_html = """            <div class="pdp">
                <div class="pdp-img" style="background:${p.tileColor}">
                    <img src="/${p.image}" alt="${esc(p.name)}" loading="lazy">
                </div>
                <div>"""

new_pdp_html = """            <div class="pdp">
                <div class="pdp-left" style="display:flex;flex-direction:column;gap:30px">
                    <div class="pdp-img" style="background:${p.tileColor}">
                        <img src="/${p.image}" alt="${esc(p.name)}" loading="lazy">
                    </div>
                    ${p.gallery && p.gallery.length ? p.gallery.map((img, i) => `
                    <div class="pdp-img fade" style="background:${p.tileColor || 'radial-gradient(120% 120% at 50% 12%,#212125,#0d0d0f)'};animation-delay:${(i%10)*0.05}s">
                        <img src="/${img}" loading="lazy" alt="${esc(p.name)} Gallery ${i+1}">
                    </div>`).join('') : ''}
                </div>
                <div>"""

content = content.replace(original_pdp_html, new_pdp_html)

# 3. Remove the old gallery section
old_gallery = """            ${p.gallery && p.gallery.length ? `
            <div class="blk gallery-section">
                <h4>Product Gallery</h4>
                <div class="gallery-grid">
                    ${p.gallery.map((img, i) => `<img src="/${img}" loading="lazy" class="fade gallery-img" style="animation-delay:${(i%10) * 0.05}s">`).join('')}
                </div>
            </div>
            ` : ''}"""

content = content.replace(old_gallery, "")

with open(app_file, 'w') as f:
    f.write(content)

print("app.js layout updated.")
