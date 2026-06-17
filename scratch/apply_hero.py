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

    .hero-in {
      position: relative;
      z-index: 2;
      max-width: 860px;
      margin: 0 auto;
      text-align: center;
    }
    
    .sec-in {
      position: relative;
      z-index: 2;
    }
"""

# Replace existing hero blocks
css = re.sub(r'\.hero \{[^}]*\}\s*\.hero-bg \{[^}]*\}\s*\.hero-glow \{[^}]*\}\s*\.hero-in \{[^}]*\}', hero_css, css)

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(css)

with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

render_header_func = """
function renderPageHeader(h1, badge = '', desc = '', extraHtml = '') {
  return `
    <section class="page-hero">
      <div class="hero-bg"></div>
      <div class="hero-glow"></div>
      <div class="hero-vignette"></div>
      <div class="sec-in" style="max-width:900px;margin:0 auto">
        ${extraHtml}
        ${badge ? `<div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem;margin-bottom:1.5rem">${badge}</div>` : ''}
        <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0 1rem;line-height:1.15;font-weight:800">${h1}</h1>
        ${desc ? `<p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px;margin-bottom:1.5rem">${desc}</p>` : ''}
      </div>
    </section>
  `;
}
"""

# We'll inject renderPageHeader near the top
app_js = app_js.replace("function renderQuoteFormHtml(projectType) {", render_header_func + "\nfunction renderQuoteFormHtml(projectType) {")

# Instead of blindly replacing all views, let's just use string replacement or regex
# for the specific blocks. This is safer.

def replace_block(content, start_marker, end_marker, replacement):
    start = content.find(start_marker)
    if start == -1: return content
    end = content.find(end_marker, start)
    if end == -1: return content
    end += len(end_marker)
    return content[:start] + replacement + content[end:]

# 1. renderHome
home_start = """<section class="hero">"""
home_end = """<div class="hero-badge">Turnkey B2B Fitness Solutions</div>"""
home_replacement = """<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-vignette"></div>
  <svg class="hero-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" stroke="white" stroke-width="0.5" fill="none"/></svg>
  <div class="hero-in">
    <div class="hero-badge">Turnkey B2B Fitness Solutions</div>"""
app_js = app_js.replace(home_start + "\\n    <div class="hero-bg"></div>\\n    <div class="hero-glow"></div>\\n    <div class="hero-in">\\n      <div class="hero-badge">Turnkey B2B Fitness Solutions</div>", home_replacement)
app_js = app_js.replace(home_start + "\n    <div class=\"hero-bg\"></div>\n    <div class=\"hero-glow\"></div>\n    <div class=\"hero-in\">\n      <div class=\"hero-badge\">Turnkey B2B Fitness Solutions</div>", home_replacement)


# 2. renderGuide
guide_block_pattern = r'<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba\(255,255,255,0\.05\)">\s*<div class="sec-in">\s*<div class="phero-label" style="[^"]*">\${g\.badge}</div>\s*<h1 style="[^"]*">\${g\.h1}</h1>\s*<p class="phero-sub" style="[^"]*">\${g\.desc}</p>\s*(.*?)\s*</div>\s*</section>'
guide_replacement = r'${renderPageHeader(g.h1, g.badge, g.desc, \1)}'
app_js = re.sub(guide_block_pattern, guide_replacement, app_js, flags=re.DOTALL)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Script execution complete")
