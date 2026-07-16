import re

file_path = "/Users/batman/Desktop/techfittech/public/assets/app.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace onclick="pick(this)" with onclick="window.hyroxPick(this, this.src)"
content = content.replace('onclick="pick(this)"', 'onclick="window.hyroxPick(this, this.src)"')

# 2. Fix the hx-active bug in window.hyroxPick
content = content.replace(".classList.remove('active')", ".classList.remove('hx-active')")
content = content.replace(".classList.add('active')", ".classList.add('hx-active')")

# 3. Add window.hyroxNav function
nav_script = """
    // Attach global pick function for gallery if not exists
    if (typeof window !== 'undefined' && !window.hyroxPick) {
        window.hyroxPick = function(el, src) {
            const productDiv = el.closest('.hx-product');
            if(productDiv) {
                const mainImg = productDiv.querySelector('.hx-gal-main img');
                if(mainImg) mainImg.src = src;
                productDiv.querySelectorAll('.hx-gal-thumbs img').forEach(i => i.classList.remove('hx-active'));
                el.classList.add('hx-active');
            }
        };
        window.hyroxNav = function(btn, dir) {
            const productDiv = btn.closest('.hx-product');
            if(productDiv) {
                const thumbs = Array.from(productDiv.querySelectorAll('.hx-gal-thumbs img'));
                const activeIdx = thumbs.findIndex(t => t.classList.contains('hx-active'));
                if (activeIdx !== -1) {
                    let nextIdx = activeIdx + dir;
                    if (nextIdx < 0) nextIdx = thumbs.length - 1;
                    if (nextIdx >= thumbs.length) nextIdx = 0;
                    window.hyroxPick(thumbs[nextIdx], thumbs[nextIdx].src);
                }
            }
        };
    }
"""

# Replace the old window.hyroxPick definition
old_pick_def = """    // Attach global pick function for gallery if not exists
    if (typeof window !== 'undefined' && !window.hyroxPick) {
        window.hyroxPick = function(el, src) {
            const productDiv = el.closest('.hx-product');
            if(productDiv) {
                const mainImg = productDiv.querySelector('.hx-gal-main img');
                if(mainImg) mainImg.src = src;
                productDiv.querySelectorAll('.hx-gal-thumbs img').forEach(i => i.classList.remove('hx-active'));
                el.classList.add('hx-active');
            }
        };
    }"""

# wait, I already did .replace('active', 'hx-active') so the old code in content now looks like old_pick_def above!
if old_pick_def in content:
    content = content.replace(old_pick_def, nav_script)
else:
    print("Could not find old window.hyroxPick definition!")
    
# 4. Add the buttons to <div class="hx-gal-main">
# We want to change: <div class="hx-gal-main"><img src="..." alt="..."></div>
# to:
# <div class="hx-gal-main" style="position:relative;">
#   <button onclick="window.hyroxNav(this, -1)" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;font-size:18px;">&#10094;</button>
#   <img src="..." alt="...">
#   <button onclick="window.hyroxNav(this, 1)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;font-size:18px;">&#10095;</button>
# </div>

# Using regex to find all <div class="hx-gal-main"><img ...></div>
# Note: some lines might be like: <div class="hx-gal-main"><img src="/assets/images/hyrox/perform-tread-1.jpg" alt="Centr x HYROX Perform Tread"></div>
def replacer(match):
    img_tag = match.group(1)
    return (f'<div class="hx-gal-main" style="position:relative;">'
            f'<button onclick="window.hyroxNav(this, -1)" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;font-size:14px;padding-right:2px;">&#10094;</button>'
            f'{img_tag}'
            f'<button onclick="window.hyroxNav(this, 1)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;font-size:14px;padding-left:2px;">&#10095;</button>'
            f'</div>')

content = re.sub(r'<div class="hx-gal-main">\s*(<img[^>]+>)\s*</div>', replacer, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Gallery fixed!")
