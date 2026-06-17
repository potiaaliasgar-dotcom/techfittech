import os
import re

def is_seo_line(line):
    # Check if the line is part of SEO metadata
    # SEO lines include title, desc, h1, schema properties, meta tags
    line_stripped = line.strip()
    if line_stripped.startswith('title:'): return True
    if line_stripped.startswith('desc:'): return True
    if line_stripped.startswith('h1:'): return True
    if line_stripped.startswith('"title":'): return True
    if line_stripped.startswith('"desc":'): return True
    if line_stripped.startswith('"h1":'): return True
    if '<title>' in line: return True
    if 'name="description"' in line: return True
    if 'name="keywords"' in line: return True
    if '"@type"' in line: return True
    if '"description":' in line: return True
    if '"name":' in line and '"@type": "Brand"' not in line: return True # Schema names
    if '"acceptedAnswer":' in line: return True # FAQ schema
    if '"text":' in line and '"@type": "Answer"' in line: return True # FAQ schema
    if '<noscript>' in line or '</noscript>' in line: return False # We'll keep noscript SEO friendly by treating it as SEO? User said frontend visible only. Noscript is SEO fallback, let's keep it as distributor for SEO.
    
    # Wait, in generate-seo-pages.mjs, schema is sometimes multi-line
    return False

def smart_replace_line(line):
    if is_seo_line(line):
        return line
    
    # Otherwise replace distributor with dealer
    old_line = line
    
    line = re.sub(r'\bDistributorships\b', 'Dealerships', line)
    line = re.sub(r'\bdistributorships\b', 'dealerships', line)
    line = re.sub(r'\bDistributorship\b', 'Dealership', line)
    line = re.sub(r'\bdistributorship\b', 'dealership', line)
    
    line = re.sub(r'\bDistributors\b', 'Dealers', line)
    line = re.sub(r'\bdistributors\b', 'dealers', line)
    line = re.sub(r'\bDISTRIBUTORS\b', 'DEALERS', line)
    
    line = re.sub(r'\bDistributor\b', 'Dealer', line)
    line = re.sub(r'\bdistributor\b', 'dealer', line)
    line = re.sub(r'\bDISTRIBUTOR\b', 'DEALER', line)
    
    return line

files_to_update = [
    "index.html",
    "public/assets/app.js",
    "scripts/generate-seo-pages.mjs",
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    new_lines = []
    in_schema_block = False
    
    for line in lines:
        # Some heuristic to detect if we are inside a JSON schema array in generate-seo-pages.mjs
        if '{ "@type":' in line or '"@type":' in line:
            in_schema_block = True
            
        if is_seo_line(line) or in_schema_block:
            new_lines.append(line)
        else:
            new_lines.append(smart_replace_line(line))
            
        if in_schema_block and ('}' in line and line.strip().endswith('},') or line.strip().endswith('} ]') or line.strip().endswith('} },')):
            # It's a single line schema usually in generate-seo-pages.mjs, or we can just be safe
            if '{ "@type":' in line and line.strip().endswith('},'):
                in_schema_block = False
                
        # For index.html, schema is inside <script type="application/ld+json">
        if '<script type="application/ld+json">' in line:
            in_schema_block = True
        if '</script>' in line and in_schema_block:
            in_schema_block = False
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
        
for f in files_to_update:
    process_file(f)
    
print("Smart replacement done.")
