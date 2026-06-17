import re

lines = [
"      <p>TechFit is the official authorized exclusive distributor and partner for <strong>Alteon Wellness (alteontech.com)</strong> in India. We supply professional clinical and commercial-grade longevity, recovery, and biohacking technology to health clubs, hotels, residential developments, longevity clinics, and physical therapy centers.</p>"
]

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

for line in lines:
    print(f"Is SEO? {is_seo_line(line)}")
    line = re.sub(r'\bdistributor\b', 'dealer', line)
    print(line)
