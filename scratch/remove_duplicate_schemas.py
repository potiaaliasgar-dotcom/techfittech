import re
import os

index_path = '/Users/batman/Desktop/techfittech/index.html'

with open(index_path, 'r') as f:
    html = f.read()

# Regular expression to match <script type="application/ld+json">...</script>
script_pattern = re.compile(r'<script\s+type="application/ld\+json">([\s\S]*?)</script>', re.IGNORECASE)

new_html = html
matches = list(script_pattern.finditer(html))

# We want to remove any script block that contains "FAQPage" or "BreadcrumbList"
# We only want to keep the main Website and LocalBusiness/Organization block (which has "WebSite" or "Organization")

for match in matches:
    content = match.group(1)
    if '"@type": "FAQPage"' in content or '"@type":"FAQPage"' in content or \
       '"@type": "BreadcrumbList"' in content or '"@type":"BreadcrumbList"' in content:
        # Replace the whole matched script block with an empty string
        new_html = new_html.replace(match.group(0), "")

with open(index_path, 'w') as f:
    f.write(new_html)

print("Removed hardcoded FAQPage and BreadcrumbList schemas from index.html.")
