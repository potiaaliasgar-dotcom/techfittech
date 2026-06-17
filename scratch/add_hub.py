import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

# 1. Add renderAlternativesHub function
hub_func = """
function renderAlternativesHub() {
  const alts = Object.keys(commercialPages).filter(k => k.startsWith('alternatives/') || k.includes('-alternative-') || k.includes('-vs-'));
  
  let gridHtml = '<div class="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;margin-top:2rem;">';
  for (const slug of alts) {
    gridHtml += `
      <div class="card" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);padding:1.5rem;border-radius:8px;">
        <h3 style="color:#fff;font-size:1.2rem;margin-bottom:1rem;line-height:1.4">${commercialPages[slug]}</h3>
        <button class="btn btn-ghost" onclick="go('${slug}')" style="width:100%;text-align:center">Read Comparison</button>
      </div>
    `;
  }
  gridHtml += '</div>';

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <div class="sec-in" style="max-width:1000px;margin:0 auto;text-align:center">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Brand Comparisons</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0 1.5rem;line-height:1.15;font-weight:800">Compare Commercial Gym Equipment Brands</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px;margin:0 auto">Comprehensive, factual CapEx and sourcing comparisons between major global fitness brands and TechFit's direct-supply commercial infrastructure.</p>
  </div>
</section>
<section class="sec" style="background:#000;padding:4rem 2rem">
  <div class="sec-in" style="max-width:1200px;margin:0 auto">
    ${gridHtml}
  </div>
</section>
${footer()}
  `;
}
"""

if "renderAlternativesHub" not in app_js:
    app_js = app_js.replace("function render404() {", hub_func + "\nfunction render404() {")

# 2. Add to views
if "'alternatives': renderAlternativesHub" not in app_js:
    app_js = app_js.replace("'404': render404", "'alternatives': renderAlternativesHub,\n        '404': render404")

# 3. Add to validPages
if "'alternatives'" not in app_js:
    app_js = app_js.replace("const validPages = ['home', ", "const validPages = ['home', 'alternatives', ")

# 4. Fix routing to correctly use GUIDES_DATA
# Original: if (guideSlugs.includes(page)) {
# New: if (guideSlugs.includes(page) || (typeof GUIDES_DATA !== 'undefined' && GUIDES_DATA[page])) {
app_js = app_js.replace("if (guideSlugs.includes(page)) {", "if (guideSlugs.includes(page) || (typeof GUIDES_DATA !== 'undefined' && GUIDES_DATA[page])) {")


# 5. Add cross linking to renderGuide (and the specific competitor views if needed)
# In renderGuide:
cross_link_html = """
  // Add cross linking for alternatives
  let crossLinkSection = '';
  if (slug.startsWith('alternatives/') || slug.includes('-alternative-') || slug.includes('-vs-')) {
    const alts = Object.keys(commercialPages).filter(k => (k.startsWith('alternatives/') || k.includes('-alternative-') || k.includes('-vs-')) && k !== slug).sort(() => 0.5 - Math.random()).slice(0, 3);
    if (alts.length > 0) {
      crossLinkSection = `
        <div style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1.5rem;">Compare Other Brands</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:1.5rem;">
            ${alts.map(a => `
              <div style="background:rgba(255,255,255,0.03);padding:1.5rem;border-radius:6px;border:1px solid rgba(255,255,255,0.05)">
                <h4 style="color:#fff;font-size:1.1rem;margin-bottom:1rem;line-height:1.4">${commercialPages[a]}</h4>
                <button class="btn btn-ghost" onclick="go('${a}')" style="width:100%">Read Guide</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
"""

old_render_guide_return = """  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">"""

new_render_guide_return = """
  // Add cross linking for alternatives
  let crossLinkSection = '';
  if (slug.startsWith('alternatives/') || slug.includes('-alternative-') || slug.includes('-vs-')) {
    const alts = Object.keys(commercialPages).filter(k => (k.startsWith('alternatives/') || k.includes('-alternative-') || k.includes('-vs-')) && k !== slug).sort(() => 0.5 - Math.random()).slice(0, 3);
    if (alts.length > 0) {
      crossLinkSection = `
        <div style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1.5rem;">Compare Other Brands</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:1.5rem;">
            ${alts.map(a => `
              <div style="background:rgba(255,255,255,0.03);padding:1.5rem;border-radius:6px;border:1px solid rgba(255,255,255,0.05)">
                <h4 style="color:#fff;font-size:1.1rem;margin-bottom:1rem;line-height:1.4">${commercialPages[a] || 'Read Comparison'}</h4>
                <button class="btn btn-ghost" onclick="go('${a}')" style="width:100%;text-align:center">Read Guide</button>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:2rem;text-align:center">
             <button class="btn btn-ghost" onclick="go('alternatives')">View All Brand Comparisons</button>
          </div>
        </div>
      `;
    }
  }

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">"""

if "let crossLinkSection = '';" not in app_js:
    app_js = app_js.replace(old_render_guide_return, new_render_guide_return)

# Inject crossLinkSection at the end of the guide body
old_guide_footer = """
    </div>
  </div>
</section>
${renderQuoteFormHtml('gym')}
${footer()}
`;
}"""

new_guide_footer = """
      ${crossLinkSection}
    </div>
  </div>
</section>
${renderQuoteFormHtml('gym')}
${footer()}
`;
}"""
if "${crossLinkSection}" not in app_js:
    app_js = app_js.replace(old_guide_footer, new_guide_footer)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Updated app.js")
