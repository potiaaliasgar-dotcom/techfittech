import json

# 1. Update vercel.json
with open('vercel.json', 'r') as f:
    v = json.load(f)

has_hyrox = any(r.get('source') == '/hyrox' for r in v.get('rewrites', []))
if not has_hyrox:
    v['rewrites'].append({
        "source": "/hyrox",
        "destination": "/index.html"
    })
    with open('vercel.json', 'w') as f:
        json.dump(v, f, indent=2)

# 2. Update generate-seo-pages.mjs
with open('scripts/generate-seo-pages.mjs', 'r') as f:
    content = f.read()

if "'hyrox': {" not in content:
    hyrox_seo = """
  'hyrox': {
    title: 'Official HYROX Equipment India | Centr x HYROX Reseller — TechFit',
    desc: 'TechFit is an authorised reseller of official Centr x HYROX competition and performance equipment in India — Perform Tread, Power Sled, Octo Kettlebells, Wall Balls, Sandbags, rigs, turf and more.',
    h1: 'Official HYROX Equipment India',
    lastmod: '2026-07-06',
    img: OG_CARDIO
  },"""
    content = content.replace("const SEO_MAP = {", "const SEO_MAP = {" + hyrox_seo)
    with open('scripts/generate-seo-pages.mjs', 'w') as f:
        f.write(content)

print("Added routing and SEO configuration.")
