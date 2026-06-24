import re
import os

files_to_edit = [
    'scripts/generate-seo-pages.mjs',
    'public/assets/app.js',
    'index.html'
]

# Patterns to match in lines containing California, Tunturi, BH, Alteon, Bendis, Jordan
# Note: we want to replace:
# - authorized/authorised dealer/distributor/supplier/partner in India/Mumbai/Maharashtra -> reseller
# - authorized/authorised dealer/distributor/supplier/partner -> reseller
# - dealer/distributor -> reseller
# - in India / in Mumbai / pan-India / Mumbai-based / India-based (when in context of these brands)
# Let's inspect specific lines to do precise replacements or regex replacements.

# Let's define a script that runs and prints exactly what line changes will happen.
def clean_line(line):
    orig = line
    # We want to change the line if it has any of our brands:
    brands = ['bh fitness', 'tunturi', 'california fitness', 'alteon', 'bendis', 'jordan']
    has_brand = any(b in line.lower() for b in brands)
    
    # We also have brand-specific terms in the general sections like "Authorised Dealer for BH Fitness..."
    if not has_brand and 'authorised dealer' not in line.lower() and 'authorised distributor' not in line.lower():
        return line, False

    # Let's do replacements
    # 1. Authorised/Authorized Dealer/Distributor/Supplier/Partner/Exclusive Dealer
    # Let's handle various combinations case-insensitively
    new_line = line
    
    # "authorised/authorized exclusive distributor/dealer/supplier/partner of/for [brand] in India/Mumbai"
    # E.g. "authorised dealer of BH Fitness commercial gym equipment in India" -> "reseller of BH Fitness commercial gym equipment"
    # "authorised distributor of BH Fitness in India" -> "reseller of BH Fitness"
    
    # Let's do regex replacements:
    # Match: (authorised|authorized|official|exclusive)* (dealer|distributor|distribution|supplier|partner) (of|for)* [brand] (in India|in Mumbai|across India|pan-India|Mumbai-based|India-based)*
    # Instead of a single complex regex, let's replace common patterns:
    
    # First, let's remove territory phrases that appear next to dealer/distributor/reseller phrases or in brand description
    # "in India", "in Mumbai", "across India", "pan-India", "pan India", "Mumbai-based", "India-based", "India |", "India -", "India —", "Mumbai, Maharashtra"
    
    # Let's replace "authorised/authorized exclusive/official dealer/distributor/supplier/partner/distribution/exclusive distributor" with "reseller" or "reselling"
    patterns = [
        (r'(?i)\b(?:authorised|authorized|official|exclusive)\s+(?:dealer|distributor|supplier|partner|seller)\b', 'reseller'),
        (r'(?i)\b(?:authorised|authorized)\s+(?:distribution)\b', 'reselling'),
        (r'(?i)\b(?:dealer|distributor|supplier)\b', 'reseller'),
        (r'(?i)\b(?:distribution)\b', 'reselling'),
    ]
    
    for pat, rep in patterns:
        new_line = re.sub(pat, rep, new_line)
        
    # Now let's remove territory definitions associated with the brands.
    # We don't want to remove "India" from everything (like "India's wellness boom" or general pages), but for the reseller context, we should remove "in India", "India |", "India —", "in Mumbai", "pan-India", etc.
    # E.g. "BH Fitness India | Reseller" -> "BH Fitness | Reseller"
    # "Reseller of BH Fitness in India" -> "Reseller of BH Fitness"
    # "reseller in India/Mumbai/Maharashtra" -> "reseller"
    # "pan-India AMC" -> "AMC" or "comprehensive AMC"
    # "Mumbai, Maharashtra, is the reseller" -> "is the reseller"
    
    # Let's define specific regexes:
    territory_patterns = [
        (r'(?i)\b(?:in|across|for|of)\s+India\b', ''),
        (r'(?i)\b(?:in|across|for|of)\s+Mumbai\b', ''),
        (r'(?i)\b(?:in|across|for|of)\s+Maharashtra\b', ''),
        (r'(?i)\bpan-India\b', 'comprehensive'),
        (r'(?i)\bpan India\b', 'comprehensive'),
        (r'(?i)\bMumbai-based\b', ''),
        (r'(?i)\bIndia-based\b', ''),
        (r'(?i)\bBH Fitness India\b', 'BH Fitness'),
        (r'(?i)\bTunturi India\b', 'Tunturi'),
        (r'(?i)\bCalifornia Fitness India\b', 'California Fitness'),
        (r'(?i)\bAlteon India\b', 'Alteon'),
        (r'(?i)\bAlteon Wellness India\b', 'Alteon Wellness'),
        (r'(?i)\bBendis Pilates India\b', 'Bendis Pilates'),
        (r'(?i)\bJordan Fitness India\b', 'Jordan Fitness'),
        (r'(?i)\bIndia\b\s*\|\s*', ''),
        (r'(?i)\bIndia\b\s*—\s*', ''),
        (r'(?i)\bIndia\b\s*-\s*', ''),
    ]
    
    for pat, rep in territory_patterns:
        new_line = re.sub(pat, rep, new_line)
        
    # Clean up multiple spaces or clean trailing spaces/punctuation
    new_line = re.sub(r'\s+', ' ', new_line).strip()
    # E.g. if the original line had quotes or commas, preserve the structure
    # Wait, simple line replacements might mess up formatting, so we'll do this in a smart script.
    
    return new_line, new_line != line

# Let's test on a few lines to see how it performs
test_lines = [
    "title: 'BH Fitness India | Authorised Dealer — Treadmills, Bikes, Ellipticals',",
    "desc: 'TechFit is the authorised dealer of BH Fitness commercial gym equipment in India. Treadmills, exercise bikes...'",
    "\"name\": \"BH Fitness Authorised Distribution, Installation and AMC in India\",",
    "\"description\": \"Authorised India dealer for BH Fitness commercial gym equipment — Spanish-engineered treadmills, exercise bikes, ellipticals and strength machines. Direct-import supply, on-site installation and pan-India AMC.\",",
    "\"name\": \"Who is the authorised distributor of BH Fitness in India?\",",
    "\"text\": \"TechFit (Techfit Health Fitness Private Limited) is the authorised distributor of BH Fitness in India, based in Mumbai, Maharashtra.\"",
]

print("--- Testing Clean Line ---")
for tl in test_lines:
    nl, changed = clean_line(tl)
    print(f"Original: {tl}")
    print(f"New:      {nl}\n")
