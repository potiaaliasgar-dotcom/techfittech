import os
import re

style_path = '/Users/batman/Desktop/techfittech/public/assets/style.css'
app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(style_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Refactor hero background in CSS
hero_css = """
    /* ─── HERO & PAGE HEADER BACKGROUNDS ─── */
    .hero, .page-hero {
      position: relative;
      background: var(--black);
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .hero {
      min-height: calc(100svh - var(--nav));
      padding: 15vh 1.5rem 5rem;
    }

    .page-hero {
      padding: 8rem 1.5rem 4rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, .04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, .04) 1px, transparent 1px);
      background-size: 60px 60px;
      -webkit-mask-image: radial-gradient(circle at 50% 50%, black 10%, transparent 80%);
      mask-image: radial-gradient(circle at 50% 50%, black 10%, transparent 80%);
    }

    .hero-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 50% at 80% 0%, rgba(220, 38, 38, 0.25) 0%, transparent 60%);
      opacity: 0.8;
    }

    @media (prefers-reduced-motion: no-preference) {
      .hero-glow {
        animation: pulse-glow 8s infinite alternate ease-in-out;
      }
    }

    @keyframes pulse-glow {
      0% { opacity: 0.5; transform: scale(0.95); }
      100% { opacity: 0.9; transform: scale(1.05); }
    }

    .hero-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, transparent 30%, rgba(9, 9, 11, 0.95) 100%);
    }

    .hero-svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120%;
      height: 120%;
      opacity: 0.03;
      pointer-events: none;
    }

    .hero-in, .page-hero .sec-in {
      position: relative;
      z-index: 2;
    }
    
    .hero-in {
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }
"""

# Find the existing .hero section in CSS to replace
css = re.sub(r'\.hero\s*\{.*?\}\s*\.hero-bg\s*\{.*?\}\s*\.hero-glow\s*\{.*?\}\s*\.hero-in\s*\{.*?\}', hero_css, css, flags=re.DOTALL)
# It's possible the original block was already removed or didn't match. 
# Let's use a safer approach: Just append it or replace a specific comment block if we can't find it.
if 'pulse-glow' not in css:
    css = css.replace("/* ─── HERO ─── */", "/* ─── HERO ─── */\n" + hero_css)
    # Also clean up the old hero rules
    css = re.sub(r'\.hero\s*\{[^}]*\}\s*\.hero-bg\s*\{[^}]*\}\s*\.hero-glow\s*\{[^}]*\}\s*\.hero-in\s*\{[^}]*\}', '', css)

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(css)


with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

# We want to intercept ALL functions returning a string that starts with <section class="phero"...
# Or better, just define `window.renderPageHeader` and use it.

render_header_func = """
function renderPageHeader(h1, badge = '', desc = '', extraHtml = '') {
  return `
    <section class="page-hero">
      <div class="hero-bg"></div>
      <div class="hero-glow"></div>
      <div class="hero-vignette"></div>
      <div class="sec-in" style="max-width:1000px;margin:0 auto;text-align:left;">
        ${extraHtml}
        ${badge ? `<div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem;margin-bottom:1.5rem">${badge}</div>` : ''}
        <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0 1rem;line-height:1.15;font-weight:800">${h1}</h1>
        ${desc ? `<p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px;margin-bottom:1.5rem">${desc}</p>` : ''}
      </div>
    </section>
  `;
}
"""

if "function renderPageHeader" not in app_js:
    app_js = app_js.replace("function renderQuoteFormHtml(projectType) {", render_header_func + "\nfunction renderQuoteFormHtml(projectType) {")


# 1. Update Home
home_start = """<section class="hero">"""
home_replacement = """<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-vignette"></div>
  <svg class="hero-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" stroke="white" stroke-width="0.5" fill="none"/></svg>
  <div class="hero-in">"""

if "<div class=\"hero-vignette\"></div>" not in app_js:
    app_js = re.sub(r'<section class="hero">\s*<div class="hero-bg"></div>\s*<div class="hero-glow"></div>\s*<div class="hero-in">', home_replacement, app_js)


# 2. Update renderGuide
guide_block_pattern = r'<section class="phero"[^>]*>\s*<div class="sec-in">\s*<div class="phero-label"[^>]*>\${g\.badge}</div>\s*<h1[^>]*>\${g\.h1}</h1>\s*<p class="phero-sub"[^>]*>\${g\.desc}</p>(.*?)</div>\s*</section>'
app_js = re.sub(guide_block_pattern, r'${renderPageHeader(g.h1, g.badge, g.desc, `\1`)}', app_js, flags=re.DOTALL)

# 3. Update renderBrand
brand_block_pattern = r'<div class="phero">\s*<div class="sec-in">(.*?)<div class="phero-label"[^>]*>(.*?)</div>\s*<h1[^>]*>(.*?)</h1>\s*<p class="phero-sub"[^>]*>(.*?)</p>\s*</div>\s*</div>'
app_js = re.sub(brand_block_pattern, r'${renderPageHeader(\3, \2, \4, `\1`)}', app_js, flags=re.DOTALL)

# 4. Update renderSegment
seg_pattern = r'<section class="phero"[^>]*>\s*<div class="sec-in">\s*<div class="phero-label"[^>]*>\${d\.badge}</div>\s*<h1[^>]*>\${d\.h1}</h1>\s*<p class="phero-sub"[^>]*>\${d\.desc}</p>\s*</div>\s*</section>'
app_js = re.sub(seg_pattern, r'${renderPageHeader(d.h1, d.badge, d.desc)}', app_js, flags=re.DOTALL)

# 5. General generic replacements for other pages (like contact, about, services, alteon)
def replace_generic_phero(match):
    html_block = match.group(0)
    # Extract h1
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html_block)
    h1 = h1_match.group(1) if h1_match else ""
    # Extract label/badge
    badge_match = re.search(r'<div class="phero-label"[^>]*>(.*?)</div>', html_block)
    badge = badge_match.group(1) if badge_match else ""
    # Extract desc/sub
    desc_match = re.search(r'<p class="phero-sub"[^>]*>(.*?)</p>', html_block)
    desc = desc_match.group(1) if desc_match else ""
    
    # Check if there is extra html we are missing? Most basic pages don't have extra.
    # If it's standard, replace it!
    if h1:
        return f"${{renderPageHeader(`{h1}`, `{badge}`, `{desc}`)}}"
    return html_block

# Find all remaining `<section class="phero"...>` blocks up to `</section>`
# Only replace if it contains an H1
generic_pattern = r'<section class="phero"[^>]*>\s*<div class="sec-in">.*?</div>\s*</section>'
app_js = re.sub(generic_pattern, replace_generic_phero, app_js, flags=re.DOTALL)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Script execution complete")
