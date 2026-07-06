import re

html_file = "/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/hyrox/website/hyrox.html"
app_file = "public/assets/app.js"

with open(html_file, 'r') as f:
    content = f.read()

# Extract <style> block and everything inside <body>
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
style_content = style_match.group(1) if style_match else ""

body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
body_content = body_match.group(1) if body_match else content

# Fix image paths
body_content = re.sub(r'src="images/([^"]+)"', r'src="/assets/images/hyrox/\1"', body_content)

# We should make renderHyrox return this.
with open(app_file, 'r') as f:
    app_js = f.read()

new_function = f"""function renderHyrox() {{
    let html = `
<style>
{style_content}
</style>
{body_content}
    `;
    
    setSchema([
        {{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {{ "@type": "ListItem", "position": 1, "name": "HYROX", "item": "https://www.techfittech.com/hyrox" }}
            ]
        }}
    ]);

    // Attach global pick function for gallery if not exists
    if (typeof window !== 'undefined' && !window.hyroxPick) {{
        window.hyroxPick = function(el, src) {{
            const productDiv = el.closest('.hx-product');
            if(productDiv) {{
                const mainImg = productDiv.querySelector('.hx-gal-main img');
                if(mainImg) mainImg.src = src;
                productDiv.querySelectorAll('.hx-gal-thumbs img').forEach(i => i.classList.remove('active'));
                el.classList.add('active');
            }}
        }};
    }}

    // Convert anchor links to JS scrolling
    html = html.replace(/href="#([^"]+)"/g, "onclick=\\"document.getElementById('$1').scrollIntoView({{behavior:'smooth'}})\\" style=\\"cursor:pointer\\"");

    return html;
}}"""

# We need to replace the old renderHyroxStyle and renderHyrox
# Find the start of function renderHyroxStyle
start_idx = app_js.find("function renderHyroxStyle")
if start_idx == -1:
    start_idx = app_js.find("function renderHyrox")

# Find the end: right before `if (typeof module !== 'undefined'`
end_idx = app_js.find("if (typeof module !== 'undefined'", start_idx)

if start_idx != -1 and end_idx != -1:
    new_app_js = app_js[:start_idx] + new_function + "\n\n" + app_js[end_idx:]
    with open(app_file, 'w') as f:
        f.write(new_app_js)
    print("Replaced renderHyrox in app.js successfully.")
else:
    print("Could not find boundaries for replacement.")
