import os

# 1. Update generate-seo-pages.mjs
seo_script_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_script_path, 'r') as f:
    content = f.read()

content = content.replace('const ENABLE_AGGREGATE_RATING = true;', 'const ENABLE_AGGREGATE_RATING = false;')

with open(seo_script_path, 'w') as f:
    f.write(content)

# 2. Update index.html
index_html_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_html_path, 'r') as f:
    content = f.read()

comment_block = """<!--
Future-Proofing: When real Google reviews exist, set ENABLE_AGGREGATE_RATING = true in scripts/generate-seo-pages.mjs to inject this:
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "25",
  "bestRating": "5",
  "worstRating": "1"
}
-->
"""
content = content.replace(comment_block, "")

with open(index_html_path, 'w') as f:
    f.write(content)

print("Removed aggregateRating artifacts successfully.")
