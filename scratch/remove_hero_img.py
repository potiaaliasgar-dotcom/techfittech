import os
import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# Define the old block to replace
old_hero = """<section class="hero" style="position:relative; overflow:hidden; min-height:80vh; display:flex; align-items:center; background:#000;">
  <!-- LCP Optimized WebP Hero Image -->
  <picture style="position:absolute; inset:0; width:100%; height:100%; z-index:0;">
    <source type="image/webp" srcset="/assets/images/hero-mma.webp">
    <img src="/og/og-mma.jpg" fetchpriority="high" decoding="sync" alt="Matrix Fight Night Professional MMA Cage by TechFit India" style="width:100%; height:100%; object-fit:cover; filter:brightness(0.5) contrast(1.1);">
  </picture>
  
  <div class="hero-glow" style="z-index:1; position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, #000, transparent);"></div>"""

# Ensure the exact old_hero exists
if old_hero in app_js:
    # Replace with the new hero block
    new_hero = """<section class="hero" style="position:relative; overflow:hidden; min-height:80vh; display:flex; align-items:center; background:#000;">
  <div class="hero-bg"></div>
  <div class="hero-glow" style="z-index:1; position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, #000, transparent);"></div>"""
    app_js = app_js.replace(old_hero, new_hero)
    print("Replaced successfully via string literal match.")
else:
    # Fallback to regex if exact spacing/indentation is slightly off
    pattern = re.compile(r'<section class="hero" style="position:relative; overflow:hidden; min-height:80vh; display:flex; align-items:center; background:#000;">\s*<!-- LCP Optimized WebP Hero Image -->\s*<picture.*?</picture>\s*<div class="hero-glow"[^>]*></div>', re.DOTALL)
    
    new_hero = """<section class="hero" style="position:relative; overflow:hidden; min-height:80vh; display:flex; align-items:center; background:#000;">
  <div class="hero-bg"></div>
  <div class="hero-glow" style="z-index:1; position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, #000, transparent);"></div>"""
    
    app_js, count = pattern.subn(new_hero, app_js)
    if count > 0:
        print("Replaced successfully via regex match.")
    else:
        print("Could not find the hero section to replace!")

with open(app_js_path, 'w') as f:
    f.write(app_js)
