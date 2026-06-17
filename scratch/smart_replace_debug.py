import re

def is_seo_line(line):
    line_stripped = line.strip()
    if '<title>' in line: return True
    if 'name="description"' in line: return True
    if line_stripped.startswith('title:'): return True
    if line_stripped.startswith('desc:'): return True
    if line_stripped.startswith('h1:'): return True
    if '"name":' in line: return True
    if '"description":' in line: return True
    if '"text":' in line: return True
    if '"acceptedAnswer":' in line: return True
    return False

def smart_replace_line(line):
    if is_seo_line(line):
        return line
    
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

for filepath in files_to_update:
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    new_lines = []
    for i, line in enumerate(lines):
        new_line = smart_replace_line(line)
        if new_line != line:
            print(f"[{filepath}:{i+1}] Replaced")
        new_lines.append(new_line)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
