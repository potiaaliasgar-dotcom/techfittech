import os
import re
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

font_url = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

req = urllib.request.Request(font_url, headers=headers)
with urllib.request.urlopen(req) as response:
    css_content = response.read().decode('utf-8')

fonts_dir = '/Users/batman/Desktop/techfittech/public/assets/fonts'
os.makedirs(fonts_dir, exist_ok=True)

urls = re.findall(r'url\((https://[^)]+\.woff2)\)', css_content)
urls = list(set(urls))

local_css = css_content

preload_tags = ""

for i, url in enumerate(urls):
    font_filename = f"outfit-{i}.woff2"
    font_path = os.path.join(fonts_dir, font_filename)
    
    with urllib.request.urlopen(url) as response, open(font_path, 'wb') as out_file:
        out_file.write(response.read())
        
    local_css = local_css.replace(url, f"/assets/fonts/{font_filename}")
    
    if i < 2:
        preload_tags += f'<link rel="preload" href="/assets/fonts/{font_filename}" as="font" type="font/woff2" crossorigin>\n'

with open(os.path.join(fonts_dir, 'outfit.css'), 'w') as f:
    f.write(local_css)

index_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_path, 'r') as f:
    html = f.read()

html = re.sub(r'<link rel="preconnect" href="https://fonts.googleapis.com">\s*<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\s*<link href="https://fonts.googleapis.com[^>]+>', '', html)
html = html.replace('<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">', '')
html = html.replace('<link rel="preconnect" href="https://fonts.googleapis.com">', '')
html = html.replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>', '')

new_fonts_link = preload_tags + '<link rel="stylesheet" href="/assets/fonts/outfit.css">\n'

html = html.replace('</title>', '</title>\n  ' + new_fonts_link)

html = html.replace('<script src="/assets/app.js"></script>', '<script src="/assets/app.js" defer></script>')

with open(index_path, 'w') as f:
    f.write(html)

print("Self-hosted fonts and deferred JS successfully.")
