from PIL import Image
import os

# 1. Convert image to WebP
og_image_path = '/Users/batman/Desktop/techfittech/public/og/og-mma.jpg'
hero_webp_path = '/Users/batman/Desktop/techfittech/public/assets/images/hero-mma.webp'

if os.path.exists(og_image_path):
    img = Image.open(og_image_path)
    img.save(hero_webp_path, "webp", quality=85)
    print(f"Created {hero_webp_path}")

# 2. Update app.js Hero section
app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# Replace the old hero with the new one
old_hero_start = '<section class="hero">'
old_hero_end = '    <div class="client-grid">'

new_hero = """<section class="hero" style="position:relative; overflow:hidden; min-height:80vh; display:flex; align-items:center; background:#000;">
  <!-- LCP Optimized WebP Hero Image -->
  <picture style="position:absolute; inset:0; width:100%; height:100%; z-index:0;">
    <source type="image/webp" srcset="/assets/images/hero-mma.webp">
    <img src="/og/og-mma.jpg" fetchpriority="high" decoding="sync" alt="Matrix Fight Night Professional MMA Cage by TechFit India" style="width:100%; height:100%; object-fit:cover; filter:brightness(0.5) contrast(1.1);">
  </picture>
  
  <div class="hero-glow" style="z-index:1; position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, #000, transparent);"></div>
  
  <div class="hero-in" style="z-index:2; position:relative; text-align:center; padding:0 2rem;">
    <h1 class="hero-title" style="color:#fff; font-size:clamp(2.5rem, 6vw, 4.5rem); font-weight:900; line-height:1.1; margin-bottom:1.5rem; text-shadow: 0 4px 12px rgba(0,0,0,0.5);">
      <span style="color:var(--red);">India's Premier</span><br>Gym & Combat Sports<br>Infrastructure
    </h1>
    <p class="hero-sub" style="color:rgba(255,255,255,0.9); font-size:1.2rem; max-width:800px; margin:0 auto 2rem;">
      800+ installations delivered. Commercial gym setup, functional rigs, and professional MMA cages. Reseller for BH Fitness, Tunturi, and Alteon Wellness.
    </p>
    <div class="hero-btns" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
      <button class="btn-red" onclick="go('contact')">Get a Custom B2B Quote</button>
      <button class="btn" style="background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2);" onclick="go('for-gyms')">Commercial Gym Setup →</button>
    </div>
  </div>
</section>

<section class="sec" style="background:#000; padding:2rem 0; border-bottom:1px solid rgba(255,255,255,0.05);">
  <section class="sec-in" style="max-width:1200px; margin:0 auto;">
    <p style="text-align:center; color:rgba(255,255,255,0.5); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1.5rem;">Trusted by India's Top Brands</p>
    <div class="client-grid">"""

if old_hero_start in app_js and old_hero_end in app_js:
    # Find the chunk to replace
    start_idx = app_js.find(old_hero_start)
    end_idx = app_js.find(old_hero_end, start_idx) + len('    <div class="client-grid">')
    
    app_js = app_js[:start_idx] + new_hero + app_js[end_idx:]
    
with open(app_js_path, 'w') as f:
    f.write(app_js)

# 3. Add Preload to index.html
index_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_path, 'r') as f:
    index_html = f.read()

preload_tag = '<link rel="preload" as="image" href="/assets/images/hero-mma.webp" type="image/webp" fetchpriority="high">\n'
if preload_tag not in index_html:
    index_html = index_html.replace('</head>', preload_tag + '</head>')
    
# Update og:image to hero-mma.webp (Wait, og:image should be jpg/png. I will leave it as og-mma.jpg)
# But I will ensure it's set in generate-seo-pages.mjs for home
with open(index_path, 'w') as f:
    f.write(index_html)

print("Hero section redesigned and optimized successfully.")
