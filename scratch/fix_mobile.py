import re

app_js_path = 'public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# I want to append mobile overrides right before `\n        `;\n        document.head.appendChild(style);`
target_marker = "        `;"
if target_marker in app_js:
    mobile_css = """
@media(max-width: 768px) {
  .alteon-page .wrap { padding: 0 16px; }
  .alteon-page section { padding: 48px 0; }
  .alteon-page .hero-grid { padding: 32px 0; gap: 24px; }
  .alteon-page .hero h1 { font-size: clamp(38px, 10vw, 46px); }
  .alteon-page .cat-hero h1 { font-size: clamp(32px, 8vw, 40px); }
  .alteon-page .pdp h1 { font-size: clamp(28px, 8vw, 36px); }
  .alteon-page .cta-band { padding: 32px 16px; margin: 20px 0; border-radius: 16px; }
  .alteon-page .cta-band h2 { font-size: 26px; }
  .alteon-page .m-img { padding: 12px; }
  .alteon-page .pdp-img { padding: 16px; position: static; }
  .alteon-page .spectbl td { font-size: 12px; }
  .alteon-page .hero p, .alteon-page .cat-hero p, .alteon-page .pdp .lead { font-size: 15px; margin: 14px 0 20px; }
}
"""
    # ensure we only replace the FIRST occurrence after our style definition, 
    # but there should only be one `        `;` at this indentation in the style block.
    # Actually, let's look for `@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`
    anchor = "@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}"
    if anchor in app_js:
        app_js = app_js.replace(anchor, anchor + "\n" + mobile_css)
        with open(app_js_path, 'w') as f:
            f.write(app_js)
        print("Mobile overrides added.")
    else:
        print("Anchor not found.")
else:
    print("Target marker not found.")
