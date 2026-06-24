import json
import os

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
seo_mjs_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
faqs_json_path = '/Users/batman/Desktop/techfittech/scratch/faqs.json'

with open(faqs_json_path, 'r') as f:
    faqs_data = f.read()

# 1. Update app.js
with open(app_js_path, 'r') as f:
    app_js = f.read()

# Inject const ROUTE_FAQS = { ... } right after the first line or at the top of the IIFE
route_faqs_injection = f"const ROUTE_FAQS = {faqs_data};\n"
if "const ROUTE_FAQS" not in app_js:
    app_js = app_js.replace("'use strict';", "'use strict';\n" + route_faqs_injection)

# Modify render() function to inject FAQs before footer
render_func_replacement = """      if (guideSlugs.includes(page) || (typeof GUIDES_DATA !== 'undefined' && GUIDES_DATA[page])) {
        app.innerHTML = renderGuide(page);
      } else {
        app.innerHTML = (views[page] || render404)();
      }

      // INJECT FAQ IF APPLICABLE
      if (typeof ROUTE_FAQS !== 'undefined' && ROUTE_FAQS[page]) {
        let faqHtml = '<section class="sec faq-sec"><section class="sec-in"><h2 class="sec-title">Frequently Asked Questions</h2><div class="faq">';
        for (const f of ROUTE_FAQS[page]) {
           faqHtml += faqItem(f.q, f.a);
        }
        faqHtml += '</div></section></section>';
        
        if (app.innerHTML.includes('<footer')) {
           app.innerHTML = app.innerHTML.replace('<footer', faqHtml + '<footer');
        } else {
           app.innerHTML += faqHtml;
        }
      }"""

original_render_block = """      if (guideSlugs.includes(page) || (typeof GUIDES_DATA !== 'undefined' && GUIDES_DATA[page])) {
        app.innerHTML = renderGuide(page);
      } else {
        app.innerHTML = (views[page] || render404)();
      }"""

if "INJECT FAQ IF APPLICABLE" not in app_js:
    app_js = app_js.replace(original_render_block, render_func_replacement)

with open(app_js_path, 'w') as f:
    f.write(app_js)

# 2. Update generate-seo-pages.mjs
with open(seo_mjs_path, 'r') as f:
    seo_mjs = f.read()

original_fallback = """  const fallbackText = `<p style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #ddd;font-weight:bold;color:#DC2626">Ready to get started? Email <a href="mailto:info@techfitactive.com">info@techfitactive.com</a> or call/WhatsApp <a href="tel:+919820166910">+91 98201 66910</a> for a free customized B2B quote on your ${projectCategory} project.</p>`;"""

new_fallback = """  let fallbackText = `<p style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #ddd;font-weight:bold;color:#DC2626">Ready to get started? Email <a href="mailto:info@techfitactive.com">info@techfitactive.com</a> or call/WhatsApp <a href="tel:+919820166910">+91 98201 66910</a> for a free customized B2B quote on your ${projectCategory} project.</p>`;

  // INJECT FAQS INTO NOSCRIPT FALLBACK
  const schema = SCHEMAS[route];
  if (schema && schema['@graph']) {
    for (const entity of schema['@graph']) {
      if (entity['@type'] === 'FAQPage' && entity.mainEntity) {
        fallbackText += `<h2>Frequently Asked Questions</h2><ul>`;
        for (const item of entity.mainEntity) {
          if (item['@type'] === 'Question' && item.acceptedAnswer) {
            fallbackText += `<li><strong>${item.name}</strong><br>${item.acceptedAnswer.text}</li>`;
          }
        }
        fallbackText += `</ul>`;
      }
    }
  }"""

if "INJECT FAQS INTO NOSCRIPT FALLBACK" not in seo_mjs:
    seo_mjs = seo_mjs.replace(original_fallback, new_fallback)

with open(seo_mjs_path, 'w') as f:
    f.write(seo_mjs)

print("Injected dynamic FAQs successfully.")
