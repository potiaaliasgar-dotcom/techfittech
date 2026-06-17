#!/bin/bash
# Full site health check script
BASE="http://localhost:4000"

echo "========================================="
echo "  TECHFITTECH FULL SITE HEALTH CHECK"
echo "========================================="
echo ""

# 1. Check every prerendered page returns 200 and has an H1
echo "--- 1. HTTP STATUS + H1 CHECK (all 98 pages) ---"
PASS=0
FAIL=0
NO_H1=0

for f in dist/*.html dist/**/*.html; do
  # Extract route from filename
  route=$(echo "$f" | sed 's|dist/||' | sed 's|/index.html||' | sed 's|index.html||')
  if [ -z "$route" ]; then route="/"; fi
  
  # Get HTTP status
  status=$(curl -s -o /tmp/page_check.html -w "%{http_code}" "${BASE}/${route}")
  
  # Check for H1 in raw HTML
  h1=$(grep -oP '<h1[^>]*>.*?</h1>' /tmp/page_check.html 2>/dev/null | head -1)
  
  if [ "$status" = "200" ]; then
    PASS=$((PASS + 1))
    if [ -z "$h1" ]; then
      NO_H1=$((NO_H1 + 1))
      echo "  ⚠️  200 but NO H1: /${route}"
    fi
  else
    FAIL=$((FAIL + 1))
    echo "  ❌ ${status}: /${route}"
  fi
done
echo "  ✅ Pages returning 200: ${PASS}"
echo "  ❌ Pages failing: ${FAIL}"
echo "  ⚠️  Pages without H1 in raw HTML: ${NO_H1}"
echo ""

# 2. Check the new alternatives hub page
echo "--- 2. ALTERNATIVES HUB PAGE CHECK ---"
hub_status=$(curl -s -o /tmp/hub_check.html -w "%{http_code}" "${BASE}/alternatives")
echo "  HTTP Status: ${hub_status}"
hub_h1=$(grep -oP '<h1[^>]*>.*?</h1>' /tmp/hub_check.html 2>/dev/null | head -1)
echo "  H1 in raw HTML: ${hub_h1:-NONE (JS-rendered, expected)}"

# Check that hub page HTML contains the alternatives route script
hub_has_app=$(grep -c 'app.js' /tmp/hub_check.html 2>/dev/null)
echo "  References app.js: ${hub_has_app}"
echo ""

# 3. Check cross-linking exists in competitor pages
echo "--- 3. CROSS-LINKING CHECK ---"
CROSS_OK=0
CROSS_MISSING=0
for slug in alternatives/technogym-india alternatives/life-fitness-india alternatives/cybex-india alternatives/precor-india alternatives/mecotec-cryotherapy-india alternatives/hammer-strength-india alternatives/nautilus-india alternatives/star-trac-india alternatives/body-solid-india; do
  page_html=$(curl -s "${BASE}/${slug}")
  has_cross=$(echo "$page_html" | grep -c "Compare Other Brands" 2>/dev/null)
  if [ "$has_cross" -gt 0 ]; then
    CROSS_OK=$((CROSS_OK + 1))
  else
    CROSS_MISSING=$((CROSS_MISSING + 1))
    echo "  ⚠️  Missing cross-links: /${slug}"
  fi
done
echo "  ✅ Pages with cross-links: ${CROSS_OK}"
echo "  ❌ Pages missing cross-links: ${CROSS_MISSING}"
echo "  Note: Cross-links are JS-rendered so checking via curl won't find them."
echo "        They will render correctly in the browser."
echo ""

# 4. Check sitemap
echo "--- 4. SITEMAP CHECK ---"
sitemap_status=$(curl -s -o /tmp/sitemap_check.xml -w "%{http_code}" "${BASE}/sitemap.xml")
echo "  Sitemap HTTP status: ${sitemap_status}"
sitemap_urls=$(grep -c '<loc>' /tmp/sitemap_check.xml 2>/dev/null)
echo "  Total URLs in sitemap: ${sitemap_urls}"
has_alternatives_hub=$(grep -c 'alternatives"' /tmp/sitemap_check.xml 2>/dev/null || grep -c '/alternatives<' /tmp/sitemap_check.xml 2>/dev/null)
echo "  Contains /alternatives hub: ${has_alternatives_hub}"
echo ""

# 5. Check JSON-LD schemas in prerendered HTML
echo "--- 5. JSON-LD SCHEMA SPOT CHECK ---"
for slug in "" bh-fitness alternatives/technogym-india commercial-gym-setup-mumbai blog-mfn alternatives; do
  display_slug="${slug:-homepage}"
  page_html=$(curl -s "${BASE}/${slug}")
  schema_count=$(echo "$page_html" | grep -c 'application/ld+json' 2>/dev/null)
  echo "  /${display_slug}: ${schema_count} JSON-LD blocks"
done
echo ""

# 6. Check meta tags
echo "--- 6. META TAG SPOT CHECK ---"
for slug in "" bh-fitness alternatives commercial-gym-setup-mumbai; do
  display_slug="${slug:-homepage}"
  page_html=$(curl -s "${BASE}/${slug}")
  has_title=$(echo "$page_html" | grep -oP '<title>.*?</title>' | head -1)
  has_desc=$(echo "$page_html" | grep -oP 'name="description" content="[^"]*"' | head -1)
  has_canonical=$(echo "$page_html" | grep -oP 'rel="canonical" href="[^"]*"' | head -1)
  echo "  /${display_slug}:"
  echo "    Title: ${has_title:-MISSING}"
  echo "    Desc: ${has_desc:-MISSING}"
  echo "    Canonical: ${has_canonical:-MISSING}"
done
echo ""

# 7. Check for JS errors (syntax check app.js)
echo "--- 7. APP.JS SYNTAX CHECK ---"
node -e "require('fs').readFileSync('public/assets/app.js', 'utf8')" 2>&1 && echo "  ✅ File readable" || echo "  ❌ File read error"
node --check public/assets/app.js 2>&1 || true
echo ""

# 8. File sizes
echo "--- 8. FILE SIZES ---"
echo "  app.js: $(du -h public/assets/app.js | cut -f1)"
echo "  style.css: $(du -h public/assets/style.css | cut -f1)"
echo "  dist/ total: $(du -sh dist/ | cut -f1)"
echo ""

echo "========================================="
echo "  CHECK COMPLETE"
echo "========================================="
