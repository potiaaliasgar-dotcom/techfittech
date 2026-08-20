# techfittech.com — Full Audit, 20 Aug 2026

Scope: SEO + AI engine search (GEO/AEO) with priority on hyperbaric chambers, then every wellness product line, then all other products, plus general site health (performance, UX, conversion, ops). Audited against the live site AND the repo at ~/Desktop/techfittech (last commit e79a876, 19 Aug 2026, pushed and deployed).

Verdict in one line: the content and schema work done so far is good, but the site currently has ZERO crawlable internal links, no prerendered Product/FAQ schema on any wellness page, a duplicated sitemap, and no transactional "price/manufacturer" pages for wellness. Fixing those four things is what gets you shown as the best hyperbaric/cryo/cold plunge supplier. Everything below is verified, not guessed.

---

## PART A — CRITICAL (these cap everything else)

### A1. The entire site has no crawlable internal links (biggest issue on the site)

Verified in the prerendered HTML of the homepage, /alteon/hyperbaric-oxygen-chambers, and /alternatives/sechrist-hyperbaric-india: the only `<a href>` links are WhatsApp, tel:, mailto:, #app and techfitactive.com. Every internal navigation (header menu, product cards, breadcrumbs, footer) is `onclick="go(...)"` with NO href, both in prerendered HTML and in the JS-rendered DOM.

Consequences: Google does not click, it only follows hrefs, so it sees a site of 165 pages with no internal link graph at all. Discovery is 100% sitemap-driven, no PageRank flows from the homepage to the hyperbaric page, no anchor text signals ("hyperbaric oxygen chamber" as link text) exist anywhere. This is almost certainly the root cause of the historical Soft 404s and why /alteon/hyperbaric-oxygen-chambers does not surface even for a branded query like "techfittech hyperbaric" (verified 20 Aug: Google returns /alteon and /corporate-gym-setup-mumbai instead). AI crawlers (no JS) see even less.

Fix: convert every internal navigation element to a real `<a href="/path">` and intercept the click in JS for SPA behaviour (one router listener, preventDefault, then go()). Header nav, footer, all product/category cards, breadcrumbs, guide cross-links. Then add "Related" link blocks (see A4/B3). This one change is the single biggest lever for every "best supplier/manufacturer" ranking you want.

### A2. No Product schema and no FAQPage schema is prerendered on any wellness page

The prerendered head of every /alteon/* page (checked hyperbaric category, HBOT 1 Seater, CryoOnyx Pro) contains only LocalBusiness + WebSite + ItemList + BreadcrumbList. The Product schema exists ONLY client-side (setSchema in app.js) and is thin: no offers, no aggregateRating, brand "Alteon" only, no seller. FAQ content on product pages is also injected client-side only; the live category page shows NO FAQ section to a non-JS crawler (verified via fetch of the live hyperbaric page).

Consequences: no Product rich results for the entire wellness catalogue (60+ product URLs), and AI engines that don't execute JS never see the product facts or FAQs. Note ee39eb6 "Fix Product snippets schema missing offers" only covered the client-side path.

Fix in generate-seo-pages.mjs: prerender into each alteon product page a full Product schema (name, image absolute URL, description, brand Alteon, seller = TechFit Organization, category, offers with priceCurrency INR + availability + areaServed India, aggregateRating where legitimate) and a FAQPage schema, plus the FAQ text as static HTML in the body. Category pages should get ItemList of Products + a category FAQPage.

### A3. sitemap-pages.xml is duplicated, contains redirecting URLs, misses /pilates, and lastmod is stale

Verified in public/ AND dist/ AND live: 235 loc entries of which 70 are duplicates (the entire /alteon/* block appears twice with priorities 0.8 and 0.7). The sitemap also lists URLs that 301 elsewhere per vercel.json (/flooring, /matrix-fitness-alternative-india, /cybex-alternative-india, /hammer-strength-alternative-india, /nautilus-alternative-india). /pilates (a real, canonicalised page) is NOT in the sitemap at all. lastmod dates say Feb–Jun 2026 even for pages changed 19 Aug. Duplicates and redirect URLs erode crawler trust in the sitemap exactly where you need Google to trust it (the wellness URLs it hasn't fully indexed).

Fix: dedupe, remove the 5 redirecting URLs, add /pilates, set lastmod from git/file mtime at build, and add a build guard that fails on duplicate locs (this class of bug shipped silently, same as the validPages one).

### A4. og:image is broken on all 16 wellness category pages and relative on all wellness product pages

All 16 /alteon and /alteon/<category> pages ship `og:image` content="og-image.jpg" (relative, resolves to /alteon/<cat>/og-image.jpg = 404). Product pages ship relative "assets/images/alteon/x.webp". Every WhatsApp/LinkedIn share of a wellness page shows a broken or missing preview, and OG images feed image results and AI answer cards. Fix: absolute URLs everywhere; use the product's own image for products and og-wellness.jpg (or per-category renders) for categories.

---

## PART B — HIGH: winning "best hyperbaric chamber supplier" (and every other wellness category)

### B1. Where you actually stand in search today (checked 20 Aug)

"hyperbaric oxygen chamber supplier India", "HBOT chamber price India", "whole body cryotherapy chamber supplier India price": techfittech.com appears NOWHERE. Winners are IndiaMART / TradeIndia / ExportersIndia category pages, meditechindia.org, oxygen-ark.com's "Top 9 Hyperbaric Chamber Manufacturers in India" listicle, livfitsports.com (cryo). Even "techfittech hyperbaric" doesn't surface the HBOT category page. Two lessons: (1) the pages that rank are PRICE and MANUFACTURER-LIST pages, which you don't have for wellness; (2) directories dominate, and you already have IndiaMART/Justdial presence to exploit.

### B2. You have zero transactional/money pages for wellness

The gym side has a full playbook (commercial-gym-setup-cost-india, city pages, brand-vs-brand, alternatives). The wellness side has only brand catalogue pages under /alteon plus 2 alternatives pages. Nothing targets what buyers type. Build these (same GUIDES_DATA + prerender machinery you already have):

- /hyperbaric-chamber-price-india — monoplace vs multiplace, 1.5 vs 2.0 ATA, hard vs soft shell, indicative price bands in INR, running cost, room/power requirements, AMC. Pages with concrete price ranges are exactly what Google AND ChatGPT/Perplexity cite.
- /hyperbaric-chamber-manufacturers-india — a "top suppliers compared" listicle where TechFit+Alteon leads (oxygen-ark ranks with this exact format).
- /cryotherapy-chamber-price-india (electric vs nitrogen is your strongest differentiator content)
- /commercial-ice-bath-cold-plunge-price-india
- /red-light-therapy-bed-price-india
- /hbot-chamber-for-clinics-vs-wellness-centres (clinical vs wellness positioning, compliance angle)
- City variants for the two biggest lines only: hyperbaric-chamber-mumbai/delhi/bangalore (mirror the gym city pages).

Each needs: FAQPage schema, Article schema, real internal links to/from the /alteon category + product pages and the sechrist/mecotec alternatives pages, and entries in llms.txt.

### B3. Hub-and-spoke cross-linking is missing entirely

Verified: /alteon/hyperbaric-oxygen-chambers contains zero references to /alternatives/sechrist-hyperbaric-india and vice versa. Same for cryo/mecotec. Once A1 gives you real links, wire every wellness category page to its alternatives page, its future price page, and 3–4 sibling categories ("Pairs well with cold plunge + sauna for a contrast suite"), and link the wellness cluster from the homepage and /wellness-solutions.

### B4. Titles and headings undersell you, and heading structure is broken

- /tunturi "Tunturi | Reseller — Nordic Fitness Equipment", /california-fitness "California Fitness | Reseller — Commercial Gym Equipment", /bh-fitness "BH Fitness | Reseller — ...". "Reseller" is the weakest possible word and California's title doesn't even say India. Use "Authorised Distributor India" / "Official India Partner".
- /alteon title is just "Alteon Wellness & Recovery India" (no TechFit, no supplier/distributor keyword).
- Wellness product titles are "HBOT 1 Seater India | Alteon" — no TechFit, no "Hyperbaric Chamber" phrase. Pattern should be "HBOT 1 Seater Monoplace Hyperbaric Chamber India | TechFit (Alteon)".
- Heading semantics on category pages are broken (verified on hyperbaric): two H2s appear BEFORE the H1, and the five product cards each emit an identical H2 "OXYGEN THERAPY" (the eyebrow label is marked up as h2). Product card headings should be H3s with the product name; eyebrows should be spans.

### B5. E-E-A-T / trust content for the wellness cluster

Hyperbaric queries are health-adjacent, so Google is choosier. Add to the HBOT pages: safety and build specs (Q345R steel, valves, certifications like CE), an explicit wellness vs clinical use statement, installation requirements, named installs/case studies, and a "reviewed by / about TechFit" block. Also: your only review/rating signal is the sitewide LocalBusiness 5.0/51. Keep collecting GBP reviews mentioning "hyperbaric", "cryotherapy", "cold plunge" by name; those words in review text influence local and AI results.

### B6. Off-site: the directories that outrank you are also your fastest wins

IndiaMART, TradeIndia and ExportersIndia hold most page-1 slots for every wellness money query. You already have an IndiaMART storefront (it's in your sameAs). List every Alteon SKU there with real price ranges and photos, same on TradeIndia and Justdial; those listings can rank in weeks and feed AI answers (Perplexity cites IndiaMART constantly). Also pitch to get TechFit/Alteon into the existing "top manufacturers in India" listicles (oxygen-ark et al.) and publish 1–2 install case studies with client names you can disclose, which earn the citations LLMs lean on.

---

## PART C — AI engine specifics (GEO)

- llms.txt and llms-full.txt are strong and well structured, BUT both still say "Last updated: 2026-05-28" despite being edited 19 Aug. Stale dates reduce trust for date-aware agents; bump on every edit (automate in build).
- llms.txt wellness sections should add indicative INR price bands per category ("HBOT monoplace typically ₹X–Y lakh installed") — price questions are the #1 wellness query pattern, and an agent that finds no numbers on your domain answers from IndiaMART instead.
- Add a short quotable answer block near the top of each category page ("TechFit is the authorised India distributor for Alteon hyperbaric oxygen chambers, supplying monoplace and multiplace hard-shell HBOT chambers at 1.5–2.0 ATA with turnkey installation and AMC across India."), prerendered, not JS-injected. LLMs lift these verbatim.
- robots.txt AI-crawler section is excellent (GPTBot, ClaudeBot, PerplexityBot etc. all allowed). Keep the Vercel firewall exception working; the prior audit flagged system DDoS mitigation challenging meta-externalagent and Googlebot-Image (needs re-check in Vercel dashboard, and true bypass needs Pro).
- The FAQ/product facts problem (A2) is doubly important for GEO since most AI crawlers don't run JS. Right now they see catalogue pages with no FAQs, no specs table, no prices.

---

## PART D — Everything else (non-SEO)

### D1. Performance
- /assets/alteon-data.js (284 KB) is loaded WITHOUT defer on every page of the site, render-blocking, even on pages that never use it. app.js is 718 KB even minified, products.json is 343 KB. Split the alteon data per category or lazy-load it on /alteon routes only; defer at minimum.
- index.html preloads BOTH hero images on every page (other/img-7edcc2df.webp AND hero-mma.webp, both fetchpriority=high); every page downloads a hero it doesn't show. Preload one per route at prerender time.
- dist images total 602 MB. Deploy works, but audit the biggest files and cap originals; check srcset coverage.

### D2. Conversion and UX
- The lead form posts to formsubmit.co/ajax → techfitpa@gmail.com. Single point of failure, no fallback record. Add a parallel write (Google Sheet webhook or CRM) and confirm the gtag (AW-17959203178) conversion event fires on submit.
- No custom 404 page in dist; unknown URLs get the plain Vercel 404 with no nav back. Add one with links to top categories.
- The static pages still tell non-JS users "This site requires JavaScript for the product catalogue" — after A1/A2, tone that down since content will be genuinely visible.

### D3. Content ops
- Blog is stale: newest post April 2026, and all guide pages carry datePublished/dateModified 2026-05-28 hardcoded. Freshness is a real ranking + citation factor. Publish the wellness case studies (Aujla recovery collection, Dr. Kanakia longevity centre when possible, any HBOT/cryo install) and set dateModified from build.
- /wellness-solutions vs /alteon partially target the same terms. Differentiate: /wellness-solutions = turnkey design/install service page; /alteon = the equipment catalogue; cross-link them with distinct anchor text.
- Gym equipment products (the 343 KB products.json catalogue) have NO individual URLs at all, so no BH/Tunturi/California product can rank or be cited product-by-product. Medium-term: prerender static pages for the top 50–100 SKUs with Product schema. That is the path to "best supplier" for each gym product, same as the wellness fix.

### D4. Housekeeping / ops
- Repo clutter: "dist 2"–"dist 6" folders, plus empty "alteon 2" and "assets 2" INSIDE dist. Harmless today but they've caused confusion before; delete and add a build check.
- Vercel account still has no 2FA (flagged 12 Aug, still open as far as records show).
- GSC follow-ups now due: confirm the ~15 remaining alternatives pages got indexed, Soft 404 stays 0, and request indexing for /alteon/hyperbaric-oxygen-chambers + the other 15 wellness category pages (they were NOT in the 12 Aug request round) once A1–A3 are deployed.

---

## Priority order (do in this sequence)

1. A1 real hrefs (unlocks everything)
2. A2 prerendered Product+FAQ schema, A4 og:image — same script, same deploy
3. A3 sitemap fixes, then a GSC reindex round for all 16 wellness pages
4. B4 titles/headings, B3 cross-links
5. B2 wellness money pages (hyperbaric first, then cryo, cold plunge, red light)
6. C llms.txt refresh + answer blocks + price bands
7. D1 performance, D2 404/form, D3 case studies, B6 directory push (parallel, non-dev)

Companion file: ANTIGRAVITY_PROMPTS_AUG20.md has all of this as ready-to-run prompts in build order.
