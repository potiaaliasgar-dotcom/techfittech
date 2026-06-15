import re

# 1. index.html modification
index_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

breadcrumb_script = '''
  <!-- Dynamic BreadcrumbList JSON-LD -->
  <script>
    (function () {
      var BASE = "https://www.techfittech.com";
      var NAMES = {
        "for-gyms": "For Gyms & Studios", "for-developers": "For Developers & Builders",
        "for-schools": "For Schools & Institutions", "for-hotels": "For Hotels & Corporates",
        "bh-fitness": "BH Fitness", "tunturi": "Tunturi", "california-fitness": "California Fitness",
        "alteon": "Alteon Wellness & Recovery", "mma-cages": "MMA Cages & Boxing Rings",
        "crossfit-rigs": "CrossFit Rigs", "free-weights": "Free Weights",
        "padel-pickleball": "Padel & Pickleball Courts", "aqua": "Aqua Fitness",
        "gym-flooring": "Gym Flooring", "wellness-solutions": "Wellness & Recovery",
        "get-a-quote": "Get a Quote", "blogs": "Blog", "techfit": "TechFit Custom Fabrication"
      };
      function titleize(s){ return s.replace(/-/g," ").replace(/\\b\\w/g,function(c){return c.toUpperCase();}); }
      var path = window.location.pathname.replace(/\\/+$/,"");
      if (!path) return; // homepage needs no breadcrumb
      var seg = path.split("/").filter(Boolean).pop();
      var items = [
        { "@type":"ListItem", "position":1, "name":"Home", "item": BASE + "/" },
        { "@type":"ListItem", "position":2, "name": NAMES[seg] || titleize(seg), "item": BASE + path }
      ];
      var el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify({ "@context":"https://schema.org", "@type":"BreadcrumbList", "itemListElement": items });
      document.head.appendChild(el);
    })();
  </script>
'''

# Find the end of the pageSchemas block which is `    })();\n  </script>` followed by `<link rel="stylesheet"`
# Let's just insert it before `<link rel="stylesheet" href="/assets/style.css">`
content = content.replace('<link rel="stylesheet" href="/assets/style.css">', breadcrumb_script + '\n  <link rel="stylesheet" href="/assets/style.css">')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)


# 2. generate-seo-pages.mjs modification
seo_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_path, 'r', encoding='utf-8') as f:
    seo_content = f.read()

static_breadcrumb = '''
  // Inject the static JSON-LD schema into the <head> of this route copy!
  if (SCHEMAS[route]) {
    const enriched = enrichSchema(route, SCHEMAS[route]);
    const schemaBlock = `\\n  <script type="application/ld+json">\\n${JSON.stringify(enriched, null, 2)}\\n  </script>`;
    out = out.replace(/<\\/head>/i, `${schemaBlock}\\n</head>`);
  }

  // Inject Static BreadcrumbList
  if (route !== 'home' && route !== '' && route !== '/') {
    // Basic title extraction (before any '—' separator)
    const routeTitle = seo.title.split('—')[0].trim();
    const breadcrumbJson = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
        { "@type": "ListItem", "position": 2, "name": routeTitle, "item": BASE + "/" + route }
      ]
    };
    const breadcrumbBlock = `\\n  <script type="application/ld+json">\\n${JSON.stringify(breadcrumbJson, null, 2)}\\n  </script>`;
    out = out.replace(/<\\/head>/i, `${breadcrumbBlock}\\n</head>`);
  }
'''

# Replace the existing SCHEMA block
old_schema_block = '''  // Inject the static JSON-LD schema into the <head> of this route copy!
  if (SCHEMAS[route]) {
    const enriched = enrichSchema(route, SCHEMAS[route]);
    const schemaBlock = `\\n  <script type="application/ld+json">\\n${JSON.stringify(enriched, null, 2)}\\n  </script>`;
    out = out.replace(/<\\/head>/i, `${schemaBlock}\\n</head>`);
  }'''

seo_content = seo_content.replace(old_schema_block, static_breadcrumb)

with open(seo_path, 'w', encoding='utf-8') as f:
    f.write(seo_content)

print("Breadcrumbs added!")
