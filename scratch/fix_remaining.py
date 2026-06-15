import re

# Fix app.js labels (P1-1)
app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

app_content = app_content.replace("'REPLACE_WITH_PHONE_LABEL'", "'ou7UCNq77bscEOrizvNC'")
app_content = app_content.replace("'REPLACE_WITH_WHATSAPP_LABEL'", "'bIN4CNS77bscEOrizvNC'")
app_content = app_content.replace("'<EMAIL_LABEL>'", "'T_tdCNe77bscEOrizvNC'")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

# Fix generate-seo-pages.mjs h1 in noscript (P1-8)
seo_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_path, 'r', encoding='utf-8') as f:
    seo_content = f.read()

# Replace <h2>${escapeHtml(g.h1)}</h2> with <h1>
seo_content = seo_content.replace('<h2>${escapeHtml(g.h1)}</h2>', '<h1>${escapeHtml(g.h1)}</h1>')

with open(seo_path, 'w', encoding='utf-8') as f:
    f.write(seo_content)

print("Labels and SEO H1 fixed!")
