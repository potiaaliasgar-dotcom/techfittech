import re

filepath = '/Users/batman/Desktop/techfittech/scratch/generate_seo_content.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace re.sub with str.replace for app_content
content = content.replace('app_content = re.sub(r"\\n\\};\\n\\n    const PRODUCTS_DATA =", guides_insert, app_content)', 'app_content = app_content.replace("\\n};\\n\\n    const PRODUCTS_DATA =", guides_insert)')

# Replace re.sub with str.replace for seo_content
content = content.replace('seo_content = re.sub(r"\\n\\};\\n\\n// Add dynamic routes", seo_insert, seo_content)', 'seo_content = seo_content.replace("\\n};\\n\\n// Add dynamic routes", seo_insert)')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
