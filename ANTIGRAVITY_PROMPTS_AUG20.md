# Antigravity prompts — techfittech.com (20 Aug 2026 audit)

Goal of this cycle: make TechFit surface as the best manufacturer/supplier for EVERY product line, hyperbaric chambers first. Run one at a time, in order. Build + deploy + verify after prompts 1–3 before continuing. Every claim below was verified against the repo (commit e79a876) and the live site on 20 Aug 2026.

---

## Prompt 1 — CRITICAL: give the site real, crawlable internal links (there are currently none)

```
The repo is the techfittech.com site (Vite + vanilla JS SPA, router in public/assets/app.js, prerender in scripts/generate-seo-pages.mjs, deployed to Vercel).

Verified fact: the prerendered HTML of every page (checked /, /alteon/hyperbaric-oxygen-chambers, /alternatives/sechrist-hyperbaric-india) contains ZERO internal <a href> links. The only hrefs are wa.me, tel:, mailto:, #app and techfitactive.com. All internal navigation (header menu, footer, product cards, category cards, breadcrumbs, guide cross-references) uses <a onclick="go('...')"> or clickable divs with NO href, in both the prerendered HTML and the hydrated DOM. Google follows hrefs only, so the site has no internal link graph: no PageRank flow, no anchor text, sitemap-only discovery. This is the root cause of the weak indexing of /alteon/* and the historical Soft 404s.

Do this:
1. In app.js, convert EVERY internal navigation element to a real anchor: <a href="/alteon/hyperbaric-oxygen-chambers" onclick="...">. Cleanest approach: give every internal link a proper href and add ONE delegated click listener on document that intercepts clicks on internal anchors (same-origin, no modifier keys), calls preventDefault() and routes via go(). Then remove the per-element inline onclick handlers where practical. Header nav, mobile nav, footer, breadcrumbs, all product cards, all category tiles, blog cards, guide cross-links, CTA buttons that point to internal routes like /get-a-quote.
2. Descriptive anchor text where the element is text-based (product name, category name). Cards can wrap the whole card in the anchor.
3. Make sure scripts/generate-seo-pages.mjs prerenders these same hrefs into the static HTML (it copies rendered markup from the same render functions, so fixing app.js should flow through; verify it does).
4. Add a footer link block (rendered on every page, prerendered too) with links to: all 5 brand pages, /alteon plus its top 6 categories (hyperbaric, cryotherapy, cold plunge, red light, saunas, IHHT), /mma-cages, /crossfit-rigs, /free-weights, /pilates, /gym-flooring, /hyrox, /wellness-solutions, /get-a-quote.
5. Verify: build, then grep dist/index.html and dist/alteon/hyperbaric-oxygen-chambers/index.html for '<a href="/' — expect dozens of matches on each. Click-test in a served dist that SPA navigation still works without full page reloads, browser back/forward still works, and middle-click/cmd-click opens in a new tab (that is the point of real hrefs). node --check public/assets/app.js must pass.

Do not touch vercel.json or the sitemap in this prompt.
```

---

## Prompt 2 — Prerender Product + FAQPage schema on all wellness pages, fix broken og:image

```
In the techfittech.com repo. Two verified problems on the Alteon wellness pages:

(a) Schema: the prerendered <head> of every /alteon/* page contains only LocalBusiness + WebSite + ItemList + BreadcrumbList. Product schema exists ONLY client-side (setSchema(...) around line 860 of public/assets/app.js) and is thin: no offers, no seller, brand only "Alteon". FAQ content is also client-side only — a non-JS fetch of the live /alteon/hyperbaric-oxygen-chambers shows NO FAQ section. So Google gets no Product rich data server-side for 60+ product URLs and AI crawlers (which don't run JS) see no product facts or FAQs at all.

(b) og:image: all 16 /alteon category pages ship og:image="og-image.jpg" (relative → resolves to /alteon/<cat>/og-image.jpg → 404). Product pages ship relative "assets/images/alteon/<x>.webp". Every social/WhatsApp share of a wellness page has a broken preview.

Do this in scripts/generate-seo-pages.mjs (data source: the ALTEON data in public/assets/alteon-data.js):
1. For every /alteon/<category>/<product> page, inject at build time a complete Product JSON-LD: name, absolute image URL, description (overview), category, brand {Brand: Alteon}, seller/offeredBy referencing the TechFit LocalBusiness @id, and offers: {"@type":"Offer","priceCurrency":"INR","availability":"https://schema.org/InStock","areaServed":"IN","seller":{TechFit}} — if no numeric price is published use priceSpecification-free offer or AggregateOffer without price rather than omitting offers entirely.
2. For every product page that has FAQ data, inject FAQPage JSON-LD AND render the FAQ questions+answers as static HTML in the prerendered body (crawlers must see the text without JS). Same for category-level FAQs: add 5-6 category FAQs for each of the 16 categories (price range, space/power needed, wellness vs clinical use, installation time, AMC) into the data and prerender them.
3. Category pages: upgrade ItemList so each ListItem nests the Product (name, image, url).
4. Fix og:image site-wide rule: every og:image and twitter:image must be an absolute https://www.techfittech.com/... URL. Product pages use the product's own image; category pages use /og/og-wellness.jpg or per-category images if present.
5. Keep the client-side setSchema in sync (or make it a no-op when a prerendered schema for the same route exists, so hydration never downgrades the head — same principle as the updateSEO() fallback fix from 12 Aug).
6. Verify: build, then in dist/alteon/hyperbaric-oxygen-chambers/hbot-1-seater-39/index.html confirm a Product schema with offers and a FAQPage schema exist in the RAW HTML, and og:image is absolute. Run node scripts/validate-schemas.mjs and paste the totals. Spot-check 3 more products across different categories.
```

---

## Prompt 3 — Sitemap repair: 70 duplicates, redirecting URLs, missing /pilates, stale lastmod

```
In the techfittech.com repo, public/sitemap-pages.xml (and the dist copy) has, verified on 20 Aug 2026:
- 235 <loc> entries of which 70 are DUPLICATES: the entire /alteon/* block appears twice (once priority 0.8, again 0.7). Live file has the same duplication.
- URLs that 301-redirect per vercel.json and must not be in a sitemap: /flooring, /matrix-fitness-alternative-india, /cybex-alternative-india, /hammer-strength-alternative-india, /nautilus-alternative-india.
- /pilates is MISSING (it is a real page: public/pilates.html, rewrite in vercel.json, canonical https://www.techfittech.com/pilates).
- lastmod values are Feb–Jun 2026 even for pages whose content changed 19 Aug.

Do this:
1. Find what appends the alteon URLs to the sitemap (likely a step in scripts/generate-seo-pages.mjs or a past manual append) and make sitemap generation fully programmatic and idempotent: one entry per canonical URL, built from the same route list that drives prerendering.
2. Remove the 5 redirecting URLs. Add /pilates. Keep priorities simple (homepage 1.0, categories/money pages 0.8, products 0.6).
3. Set lastmod per URL from the git last-commit date of the content that drives it, falling back to build date. Do not stamp every URL with today's date on every build — that destroys lastmod credibility.
4. Add a guard to the build (like guard-valid-pages.mjs): fail the build if the sitemap contains a duplicate loc, a URL that matches a redirect source in vercel.json, or a URL not in validPages (and warn on validPages entries missing from the sitemap).
5. Verify: build, then: grep -c "<loc>" dist/sitemap-pages.xml (expect ~166: 235 - 70 dupes + /pilates - 5 redirects + the new pages when prompt 5 lands), and grep -o "<loc>[^<]*" | sort | uniq -d returns nothing.
```

---

## Prompt 4 — Titles, headings and "Reseller" wording: sell the position we want to own

```
In the techfittech.com repo (title source of truth: scripts/generate-seo-pages.mjs + updateSEO() in app.js — change BOTH so hydration matches prerender).

Verified problems:
- /tunturi title: "Tunturi | Reseller — Nordic Fitness Equipment"; /california-fitness: "California Fitness | Reseller — Commercial Gym Equipment" (doesn't even say India); /bh-fitness: "BH Fitness | Reseller — Treadmills, Bikes, Ellipticals". "Reseller" is the weakest possible framing.
- /alteon title: "Alteon Wellness & Recovery India" — no TechFit, no distributor/supplier keyword.
- Alteon product titles: "HBOT 1 Seater India | Alteon" — no TechFit, missing the actual head term ("Hyperbaric Chamber").
- Heading structure (verified on /alteon/hyperbaric-oxygen-chambers): two H2s render BEFORE the H1, and each of the 5 product cards emits an IDENTICAL H2 "OXYGEN THERAPY" (the card eyebrow label is marked up as h2).

Do this:
1. New titles (meta descriptions to match, 150-160 chars, include "authorised distributor", "price", "India"):
   - /bh-fitness → "BH Fitness India | Authorised Distributor — Treadmills, Bikes, Strength | TechFit"
   - /tunturi → "Tunturi India | Authorised Distributor — Cardio & Strength Equipment | TechFit"
   - /california-fitness → "California Fitness India | Authorised Distributor — Commercial Gym Equipment | TechFit"
   - /alteon → "Alteon Wellness India | HBOT, Cryotherapy, Cold Plunge & Red Light — Official Distributor TechFit"
   - Alteon products → "<Product Name> — <Category head term> India | TechFit (Alteon)" e.g. "HBOT 1 Seater — Monoplace Hyperbaric Oxygen Chamber India | TechFit (Alteon)". Generate from data, don't hand-write 60 titles.
2. Also update the visible on-page wording wherever "Reseller" appears for BH/Tunturi/California to "Authorised Distributor (India)" — but do NOT change Merrithew, which must stay "Sales Partner" (compliance decision from commit 148960d).
3. Heading semantics on all category + product pages: exactly one H1 per page, first heading in DOM order; card eyebrow labels become <span class="eyebrow">, card product names become H3; the hidden/SEO H2 duplicating the title should become non-heading text or be removed.
4. Verify: build; check dist HTML for /tunturi, /alteon, one HBOT product: title correct in raw HTML AND after hydration (serve dist, check document.title after JS). Check /alteon/hyperbaric-oxygen-chambers has one H1 and no repeated "OXYGEN THERAPY" H2s. node --check passes.
```

---

## Prompt 5 — NEW wellness money pages: price guides + manufacturer comparisons (the pages that actually rank)

```
In the techfittech.com repo. Context verified 20 Aug 2026: techfittech.com appears NOWHERE for "hyperbaric oxygen chamber supplier India", "HBOT chamber price India", "whole body cryotherapy chamber supplier India price". Page 1 is IndiaMART/TradeIndia/ExportersIndia category pages, meditechindia.org, and oxygen-ark.com's "Top 9 Hyperbaric Chamber Manufacturers in India" listicle. The pattern that ranks (and that ChatGPT/Perplexity cite) is PRICE pages and MANUFACTURER-LIST pages. The site has this playbook for gyms (commercial-gym-setup-cost-india etc.) but NOTHING for wellness.

Create these 7 pages using the existing GUIDES_DATA + prerender machinery (same as the city/cost guides, with Article + FAQPage schema and unique title/meta/canonical):
1. /hyperbaric-chamber-price-india — monoplace vs multiplace, hard vs soft shell, 1.5 vs 2.0 ATA, indicative INR price bands per configuration, what drives cost, room/power/AC requirements, running costs, AMC, financing, why hard-shell Alteon vs cheap soft-shell imports. FAQs: "How much does a hyperbaric chamber cost in India?", "monoplace vs multiplace?", "Is HBOT legal for wellness centres?", "What space do I need?", "Which is the best hyperbaric chamber supplier in India?".
2. /hyperbaric-chamber-manufacturers-india — "Hyperbaric Chamber Manufacturers & Suppliers in India (2026): Compared" listicle. TechFit (Alteon) first with honest strengths (hard-shell clinical-grade, turnkey install, pan-India AMC), then genuinely compare 4-6 others (Sechrist importers, soft-shell importers, IndiaMART traders) on shell type, ATA, service, spares. Honest comparison = citable comparison.
3. /cryotherapy-chamber-price-india — electric nitrogen-free vs liquid nitrogen as the core comparison (our strongest differentiator), price bands, running cost per session, install requirements.
4. /commercial-ice-bath-cold-plunge-price-india — chiller sizing, SS vs fibreglass, sanitation (UV/ozone), price bands, hotel/gym/clinic use cases.
5. /red-light-therapy-bed-price-india — beds vs panels, wavelengths, irradiance, price bands.
6. /infrared-sauna-price-india — full-spectrum vs far-infrared, commercial vs home, price bands.
7. /wellness-centre-setup-cost-india — the umbrella page: what a full longevity/recovery suite costs (HBOT + cryo + plunge + sauna + red light), 3 example configurations, links to all 6 pages above.

Rules:
- Real INR price bands are REQUIRED on every page (ranges are fine, "price on request" is not — get bands from Ali/alteon-data; leave TODO markers if a band is unknown and list them at the end).
- Every page cross-links (real hrefs, Prompt 1 style) to: the matching /alteon category page, matching product pages, the sechrist/mecotec alternatives pages where relevant, /wellness-solutions and /get-a-quote. And ADD reciprocal links FROM those alteon category pages ("Hyperbaric chamber price guide →"). Verified today: /alteon/hyperbaric-oxygen-chambers and /alternatives/sechrist-hyperbaric-india contain zero links to each other.
- Add each new page to validPages, updateSEO(), the sitemap, and a "Buying guides" block in the footer.
- Dash rule: write all client-visible copy without em/en dashes (use "one time", "45 to 60 days" style).
- Each page needs a quotable 2-3 sentence answer block at the top ("TechFit is the authorised India distributor for Alteon hyperbaric oxygen chambers...") in the prerendered HTML — AI engines lift these verbatim.
- Verify: build; guard scripts pass; each new page in dist has unique title, Article + FAQPage schema, visible price bands, and 8+ internal hrefs. List any TODO price bands for Ali.
```

---

## Prompt 6 — llms.txt / llms-full.txt refresh + AI answer blocks

```
In the techfittech.com repo, public/llms.txt and public/llms-full.txt.

Problems: both files still say "# Last updated: 2026-05-28" although they were edited 19 Aug 2026 (stale dates hurt trust with date-aware AI agents). They also contain no INR price guidance for wellness categories, so an AI agent asked "how much does a hyperbaric chamber cost in India" finds nothing on our domain and answers from IndiaMART instead.

Do this:
1. Automate the "Last updated" line: a small build step stamps today's date into both files at build time (and keep the source files' dates current when hand-edited).
2. Add to each wellness category section in BOTH files: indicative INR price bands (same bands as the Prompt 5 pages — single source of truth in one data file so they never drift), the top 3 FAQ answers, and the URL of the matching new price-guide page.
3. Add a "Buying guides" section to llms.txt listing the 7 new money pages with one-line descriptions.
4. Confirm the llms files also cover: pilates (/pilates), gym flooring, hyrox — and that every URL mentioned in llms.txt returns 200 (write a tiny checker script into the build that validates llms.txt URLs against validPages + static routes).
5. Verify: build, then grep both dist files for "Last updated: 2026-08" and for "₹" in the wellness sections.
```

---

## Prompt 7 — Performance: stop shipping 284 KB render-blocking wellness data to every page

```
In the techfittech.com repo, verified in index.html:
- <script src="/assets/alteon-data.js?v=2"> loads 284 KB WITHOUT defer on every page of the site (render-blocking even on /mma-cages or city guides that never use it).
- TWO hero images are preloaded with fetchpriority=high on every page (other/img-7edcc2dfb4.webp AND hero-mma.webp) — every page downloads a hero it doesn't display.
- app.js is 718 KB minified; products.json is 343 KB.

Do this:
1. alteon-data.js: at minimum add defer; better, load it dynamically only on /alteon* routes (dynamic script insert or fetch-on-demand before rendering an alteon route, with prerendered HTML unaffected).
2. Hero preloads: make generate-seo-pages.mjs emit only the ONE preload matching each route's actual hero; homepage keeps its own.
3. products.json: load on demand only for routes that render the gym catalogue (brand pages, catalogue views), not globally.
4. Do NOT restructure app.js into modules in this prompt (too risky); just report its top 5 largest embedded data blobs so we can plan extraction later.
5. Verify: build; serve dist; on /commercial-gym-setup-mumbai confirm via the network panel that alteon-data.js and products.json are NOT fetched and only one hero image preloads. Confirm /alteon/hyperbaric-oxygen-chambers still renders its catalogue correctly after hydration. node --check passes.
```

---

## Prompt 8 — Custom 404, form resilience, repo hygiene

```
In the techfittech.com repo:

1. 404 page: dist has no 404.html, so unknown URLs show Vercel's default 404. Create a branded 404.html (prerendered, static, no JS required) with links to /, /alteon, the 5 brand pages, /get-a-quote, and the WhatsApp CTA. Ensure Vercel picks it up (dist/404.html is the convention).
2. Lead form: submissions go only to formsubmit.co/ajax/techfitpa@gmail.com — single point of failure with no stored record. Add a parallel capture: also POST the same payload to a Google Apps Script webhook writing to a Google Sheet (create the endpoint stub and a README note for Ali to deploy it and paste the URL into a config constant). Keep formsubmit as-is. Confirm the gtag conversion event (AW-17959203178) fires on successful submit; add it if missing.
3. Repo hygiene: delete "dist 2" through "dist 6" at the repo root and the empty "alteon 2" and "assets 2" folders inside dist generation; find what creates the " 2" copies (macOS duplication during builds?) and add an rm/guard step to the build so they never come back.
4. Verify: build; dist/404.html exists and renders standalone; form still submits successfully on a test; repo root has exactly one dist.
```

---

## Prompt 9 — Freshness: wellness case studies + real dateModified

```
In the techfittech.com repo. The blog's newest post is April 2026 and every guide page hardcodes datePublished/dateModified 2026-05-28. Freshness affects both rankings and AI citations.

Do this:
1. Add two new blog posts (same blog machinery, Article schema, prerendered):
   a. "Inside a Commercial Recovery Suite: HBOT, Cryotherapy and Cold Plunge Under One Roof" — anonymised walkthrough of a real TechFit wellness install (equipment list, spatial/electrical requirements, timeline). No client names unless approved.
   b. "Electric vs Nitrogen Cryotherapy Chambers: What Indian Wellness Centres Should Buy in 2026".
   Write dash-free client-facing copy. Link both into the wellness cluster (category pages + money pages).
2. dateModified: stop hardcoding. Derive each guide/blog page's dateModified from the last git commit touching its content, at build time. Keep datePublished as the true original date.
3. Update /blogs listing and blogs.json, add both posts to the sitemap with correct lastmod.
4. Verify: build; both posts render from raw HTML with Article schema and current dates; sitemap includes them; guard scripts pass.
```

---

## Not for Antigravity — Ali / manual checklist

1. GSC (after prompts 1-3 deploy): request indexing for all 16 /alteon wellness pages (they were NOT in the 12 Aug round) + the 7 new money pages when live. Check Soft 404 = 0 and the remaining alternatives pages got picked up.
2. IndiaMART/TradeIndia/Justdial: create listings for every Alteon SKU with real price ranges and photos. These directories own page 1 for every wellness money query today and feed Perplexity/ChatGPT answers directly.
3. Pitch inclusion in existing "Top hyperbaric chamber manufacturers India" listicles (e.g. oxygen-ark.com's) and industry press.
4. GBP: keep collecting reviews that name the product ("hyperbaric", "cryotherapy", "cold plunge").
5. Vercel: enable 2FA (still open from 12 Aug); re-check firewall isn't challenging AI/search crawlers; Pro plan if system mitigation keeps overriding the bypass rule.
6. Supply real INR price bands for each wellness category to fill any TODOs from Prompt 5.
