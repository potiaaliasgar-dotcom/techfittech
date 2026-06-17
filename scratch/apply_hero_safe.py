import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

# Add the renderPageHeader function at the top
render_header_func = """
function renderPageHeader(h1, badge = '', desc = '', extraHtml = '') {
  return `
    <section class="page-hero">
      <div class="hero-bg"></div>
      <div class="hero-glow"></div>
      <div class="hero-vignette"></div>
      <div class="sec-in" style="max-width:1000px;margin:0 auto;text-align:left;position:relative;z-index:2;">
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


# 1. renderHome
# It doesn't use renderPageHeader because it has SVG and different layout
home_start = """<section class="hero">"""
home_replacement = """<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-vignette"></div>
  <svg class="hero-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" stroke="white" stroke-width="0.5" fill="none"/></svg>
  <div class="hero-in">"""

if "<div class=\"hero-vignette\"></div>" not in app_js:
    app_js = re.sub(r'<section class="hero">\s*<div class="hero-bg"></div>\s*<div class="hero-glow"></div>\s*<div class="hero-in">', home_replacement, app_js)


# 2. renderGuide
guide_old = """      return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <div class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">${g.badge}</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">${g.h1}</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">${g.desc}</p>
    <div style="display:flex;gap:1.5rem;align-items:center;margin-top:1.5rem;color:rgba(255,255,255,0.55);font-size:0.88rem">
      <span>By <strong>${g.author}</strong></span>
      <span>Published <strong>${g.publishedDate}</strong></span>
    </div>
  </div>
</section>"""
guide_new = """      return renderPageHeader(g.h1, g.badge, g.desc, `
    <div style="display:flex;gap:1.5rem;align-items:center;margin-bottom:1.5rem;color:rgba(255,255,255,0.55);font-size:0.88rem">
      <span>By <strong>${g.author}</strong></span>
      <span>Published <strong>${g.publishedDate}</strong></span>
    </div>
`) + `"""
app_js = app_js.replace(guide_old, guide_new)

# 3. renderBrand
brand_old = """      return `
<div class="phero">
  <div class="sec-in">
    ${meta.logo ? `<div style="margin-bottom:1.5rem;text-align:center"><img src="${meta.logo}" alt="${brandName} logo" style="max-height:110px;max-width:380px;width:auto;height:auto;display:inline-block;object-fit:contain;filter:brightness(0) invert(1)" loading="lazy"></div>` : ''}
    <div class="phero-label" style="text-align:center">${meta.badge || brandName}</div>
    <h1 style="text-align:center">${brandName.toUpperCase()}</h1>
    <p class="phero-sub" style="text-align:center;max-width:900px;margin-left:auto;margin-right:auto">${meta.desc || ''}</p>
  </div>
</div>"""
brand_new = """      return renderPageHeader(brandName.toUpperCase(), meta.badge || brandName, meta.desc || '', meta.logo ? `<div style="margin-bottom:1.5rem;text-align:center"><img src="${meta.logo}" alt="${brandName} logo" style="max-height:110px;max-width:380px;width:auto;height:auto;display:inline-block;object-fit:contain;filter:brightness(0) invert(1)" loading="lazy"></div>` : '') + `"""
app_js = app_js.replace(brand_old, brand_new)

# 4. renderSegment
seg_old = """      return `
<section class="phero" style="background:linear-gradient(135deg,#09090b 60%,#1a0a00)">
  <div class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">${d.badge}</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">${d.h1}</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">${d.desc}</p>
  </div>
</section>"""
seg_new = """      return renderPageHeader(d.h1, d.badge, d.desc) + `"""
app_js = app_js.replace(seg_old, seg_new)

# 5. renderTechFit
tf_old = """    return `
<section class="phero" style="position:relative;overflow:hidden;min-height:72vh;display:flex;align-items:center;background:#000">
  <div class="sec-in" style="position:relative;z-index:2;max-width:800px;margin:0 auto;text-align:center">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">TechFit Originals</div>
    <h1 style="color:#fff;font-size:clamp(2.5rem,6vw,4.5rem);margin:0.5rem 0;line-height:1.15;font-weight:900;text-transform:uppercase;letter-spacing:-.03em">Custom Fabricated<br><em style="color:var(--red);font-style:normal">Commercial Rigs</em></h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:640px;margin:1rem auto 2.5rem">Engineered and fabricated in our Mumbai facility. We build massive structural steel rigs, MMA combat systems, and custom 11-gauge plate-loaded stations tailored exactly to your brand and space.</p>
    <button class="btn btn-red" onclick="go('get-a-quote')">Get Custom Pricing</button>
  </div>
</section>"""
tf_new = """    return renderPageHeader(`Custom Fabricated<br><em style="color:var(--red);font-style:normal">Commercial Rigs</em>`, 'TechFit Originals', 'Engineered and fabricated in our Mumbai facility. We build massive structural steel rigs, MMA combat systems, and custom 11-gauge plate-loaded stations tailored exactly to your brand and space.', `<button class="btn btn-red" onclick="go('get-a-quote')">Get Custom Pricing</button>`) + `"""
app_js = app_js.replace(tf_old, tf_new)

# Wait, `renderTechFit` is a bit complex, and has a button inside the header! I passed the button in `extraHtml`. The issue is my `renderPageHeader` places `extraHtml` at the top!
# I need to modify `renderPageHeader` to support `extraBottomHtml`.

render_header_func_v2 = """
function renderPageHeader(h1, badge = '', desc = '', extraTopHtml = '', extraBottomHtml = '') {
  return `
    <section class="page-hero">
      <div class="hero-bg"></div>
      <div class="hero-glow"></div>
      <div class="hero-vignette"></div>
      <div class="sec-in" style="max-width:1000px;margin:0 auto;text-align:left;position:relative;z-index:2;">
        ${extraTopHtml}
        ${badge ? `<div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem;margin-bottom:1.5rem">${badge}</div>` : ''}
        <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0 1rem;line-height:1.15;font-weight:800">${h1}</h1>
        ${desc ? `<p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px;margin-bottom:1.5rem">${desc}</p>` : ''}
        ${extraBottomHtml}
      </div>
    </section>
  `;
}
"""
app_js = app_js.replace(render_header_func, render_header_func_v2)

# Re-fix TechFit
tf_new = """    return renderPageHeader(`Custom Fabricated<br><em style="color:var(--red);font-style:normal">Commercial Rigs</em>`, 'TechFit Originals', 'Engineered and fabricated in our Mumbai facility. We build massive structural steel rigs, MMA combat systems, and custom 11-gauge plate-loaded stations tailored exactly to your brand and space.', '', `<button class="btn btn-red" style="margin-top:1rem;" onclick="go('get-a-quote')">Get Custom Pricing</button>`) + `"""
app_js = app_js.replace(tf_old, tf_new)

# Let's fix About
about_old = """    return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem">
  <div class="sec-in" style="max-width:800px;margin:0 auto;text-align:center">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Our Story</div>
    <h1 style="color:#fff;font-size:clamp(2.5rem,6vw,4rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Building India's<br>Fitness Infrastructure.</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);margin-top:1rem;font-size:1.1rem;line-height:1.8">TechFit was founded with a singular mission: to eliminate the friction in commercial gym sourcing. By collapsing the supply chain and building a massive localized inventory in Mumbai, we give facility owners direct access to elite European biomechanics alongside hyper-durable custom Indian steel.</p>
  </div>
</section>"""
about_new = """    return renderPageHeader(`Building India's<br>Fitness Infrastructure.`, 'Our Story', `TechFit was founded with a singular mission: to eliminate the friction in commercial gym sourcing. By collapsing the supply chain and building a massive localized inventory in Mumbai, we give facility owners direct access to elite European biomechanics alongside hyper-durable custom Indian steel.`) + `"""
app_js = app_js.replace(about_old, about_new)

# Let's fix Contact
contact_old = """    return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem">
  <div class="sec-in" style="max-width:800px;margin:0 auto;text-align:center">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Get In Touch</div>
    <h1 style="color:#fff;font-size:clamp(2.5rem,6vw,4rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Ready to build<br>your facility?</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);margin-top:1rem;font-size:1.1rem">Whether you need a 3D layout, a rapid CapEx comparison, or a full turnkey installation, our B2B team is ready to deploy.</p>
  </div>
</section>"""
contact_new = """    return renderPageHeader(`Ready to build<br>your facility?`, 'Get In Touch', 'Whether you need a 3D layout, a rapid CapEx comparison, or a full turnkey installation, our B2B team is ready to deploy.') + `"""
app_js = app_js.replace(contact_old, contact_new)


# Let's fix Blog
blog_old = """    return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <div class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">${b.badge}</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">${b.h1}</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">${b.desc}</p>
    <div style="display:flex;gap:1.5rem;align-items:center;margin-top:1.5rem;color:rgba(255,255,255,0.55);font-size:0.88rem">
      <span>By <strong>${b.author}</strong></span>
      <span>Published <strong>${b.publishedDate}</strong></span>
    </div>
  </div>
</section>"""
blog_new = """    return renderPageHeader(b.h1, b.badge, b.desc, '', `
    <div style="display:flex;gap:1.5rem;align-items:center;margin-bottom:1.5rem;color:rgba(255,255,255,0.55);font-size:0.88rem">
      <span>By <strong>${b.author}</strong></span>
      <span>Published <strong>${b.publishedDate}</strong></span>
    </div>
`) + `"""
app_js = app_js.replace(blog_old, blog_new)


with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_js)
print("Updated app.js safely")
