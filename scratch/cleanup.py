with open('public/assets/app.js', 'r') as f:
    app_js = f.read()

dup = """
.alteon-page .gallery-section { margin-top: 40px; }
.alteon-page .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 24px; }
.alteon-page .gallery-grid img { width: 100%; height: 100%; object-fit: cover; border-radius: 16px; border: 1px solid rgba(255,255,255,.09); aspect-ratio: 4/3; }
@media(max-width: 860px) { .alteon-page .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
@media(max-width: 620px) { .alteon-page .gallery-grid { grid-template-columns: 1fr; } }
"""

app_js = app_js.replace(dup.strip(), "")
with open('public/assets/app.js', 'w') as f:
    f.write(app_js)
