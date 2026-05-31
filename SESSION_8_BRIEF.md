# Implementation Plan — Session 8: Backend SEO Hardening (No Visible Changes)

This session is **entirely backend** — schema, metadata, technical SEO, headers, and structured-data hygiene. Nothing about the rendered site changes. No new pages, no new sections, no new visible content. The objective is to maximize Google's and AI crawlers' ability to understand, classify, and surface the existing pages, without expanding the surface area.

Scope explicitly excluded from this session by user direction:
- No newsletter signup
- No city landing pages
- No Google Maps embed (visible change)
- No additional content pages

---

## User Review Required

### IMPORTANT — Org schema enrichment

Item 3 below adds `foundingDate`, `foundingLocation`, `numberOfEmployees`, and `alternateName` to the LocalBusiness/Organization schema. Ali — please confirm or provide:

1. **Founding year** of Techfit Health Fitness Private Limited (year of MCA incorporation)
2. **Founding location** (city only — likely Mumbai, but confirm)
3. **Employee headcount band** — Schema.org accepts ranges. Pick one: "1–10", "11–50", "51–200", "201–500", "500+". If you'd rather not disclose, omit this field — it's optional.
4. **Alternate names** that Google might match to TechFit — e.g., "TechFit Active," "Techfit Health Fitness Private Limited," "TechFit India"

Defaults if unanswered: founding year as inferable from MCA21 public records, founding location "Mumbai", `numberOfEmployees` omitted, `alternateName` includes "TechFit Active" and "Techfit Health Fitness Private Limited."

### IMPORTANT — Do not break what's working

Antigravity must not regress anything Sessions 1–7 shipped. Specifically:
- Existing schemas already in place (LocalBusiness, Service for segment pages, BlogPosting for blogs, FAQ on comparison LPs, BreadcrumbList everywhere, Person, WebSite+SearchAction) — must remain intact and validate after changes.
- `dist/sitemap.xml` URL count must stay at ≥35.
- `npm run build && node scripts/generate-seo-pages.mjs` must continue to exit 0.

---

## Proposed Changes

### 1. Service Schema for Product Pages

**Current state:** Service schema is on the 5 segment routes (`/services`, `/for-gyms`, `/for-developers`, `/for-schools`, `/for-hotels`) only. Product/category pages have WebPage + Product schemas but no Service schema.

**Why this matters:** "Service" is the schema entity Google uses to surface a business as a provider of a specific service in a geography. Adding `Service` to the product pages lets the page rank as both a product page AND a service provider for that product category.

[MODIFY] `scripts/generate-seo-pages.mjs` — `SCHEMAS` map

Add a `Service` entity to the `@graph` of each of these routes' schemas:

- `mma-cages` — Service: "MMA Cage and Boxing Ring Manufacturing and Installation"
- `crossfit-rigs` — Service: "CrossFit Rig and Functional Training Structure Manufacturing"
- `free-weights` — Service: "Commercial Free Weights and Strength Equipment Manufacturing"
- `padel-pickleball` — Service: "Padel and Pickleball Court Design, Construction, and Installation"
- `aqua` — Service: "Aqua Fitness Equipment Supply and Installation"
- `gym-flooring` — Service: "Commercial Gym Flooring Supply and Installation"
- `wellness-solutions` — Service: "Wellness, Recovery, and Longevity Suite Design and Installation"
- `bh-fitness`, `tunturi`, `california-fitness`, `alteon` — Service: "Authorised Distribution, Installation, and AMC for [Brand] in India"

Each Service entity follows this pattern:
```json
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/mma-cages#service",
  "name": "MMA Cage and Boxing Ring Manufacturing and Installation",
  "serviceType": "Combat Sports Infrastructure Manufacturing",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "[Same description as the existing WebPage description, or a slightly expanded one]",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  }
}
```

### 2. Geo / Place Schema on `/contact`

**Why:** `/contact` is where local-intent traffic lands. Enriching it with `Place` schema (geo coordinates, opening hours, address) gives Google precise local-pack signal without requiring a Maps embed.

[MODIFY] `scripts/generate-seo-pages.mjs` — `SCHEMAS['contact']`

Add a `Place` entity with full geo:
```json
{
  "@type": "Place",
  "@id": "https://www.techfittech.com/contact#place",
  "name": "TechFit Factory and HQ",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "309, Boat Hard Rd, Darukhana",
    "addressLocality": "Byculla",
    "addressRegion": "Maharashtra",
    "postalCode": "400010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.977,
    "longitude": 72.844
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "telephone": "+91-98201-66910",
  "hasMap": "https://maps.google.com/?q=18.977,72.844"
}
```

The `hasMap` URL link is metadata only — it doesn't render a visible Maps embed.

### 3. Organization Schema Enrichment

[MODIFY] `index.html` — the inline LocalBusiness JSON-LD

Add fields to the existing `LocalBusiness` block:
```json
"foundingDate": "YYYY",  // from Ali / MCA21
"foundingLocation": {
  "@type": "Place",
  "name": "Mumbai, Maharashtra, India"
},
"alternateName": ["TechFit Active", "Techfit Health Fitness Private Limited", "TechFit India"],
"slogan": "India's Gym, Wellness & Sports Infrastructure Partner",
"award": "Official Cage Supplier — Matrix Fight Night (MFN 1–15)",
"knowsLanguage": ["en", "hi", "mr"]
```

If Ali provides `numberOfEmployees`, add:
```json
"numberOfEmployees": {
  "@type": "QuantitativeValue",
  "minValue": 11,
  "maxValue": 50
}
```

Also verify and reinforce existing fields:
- `name`, `legalName`, `url`, `email`, `telephone` — confirm
- `address` — confirm matches `/contact` Place
- `sameAs` — array of LinkedIn, Instagram, Facebook, YouTube, IndiaMART, Justdial profiles (use only verified URLs; Ali to provide if any are missing)

### 4. Author Person Schema on Blog Posts

**Why:** Connects the leadership Person entities (Ali, Pranav) to the case-study content. Strengthens E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) — a Google ranking signal that's especially weighted for industry content.

[MODIFY] `scripts/generate-seo-pages.mjs` — `SCHEMAS` for each `blog-*` route

In each BlogPosting schema, replace the current `author` (which is the Organization) with both an Organization author and a Person author:
```json
"author": [
  { "@id": "https://www.techfittech.com/about#aliasgarpotia" },
  { "@id": "https://www.techfittech.com/#organization" }
]
```

This requires the BlogPosting `@graph` to also include a slim Person reference. Add this Person entity to the `@graph` of each blog post:
```json
{
  "@type": "Person",
  "@id": "https://www.techfittech.com/about#aliasgarpotia"
}
```

(Just the `@id` reference is enough — Google's resolver follows the `@id` to the full Person definition on `/about`.)

Alternative attribution per post (Ali — confirm):
- MMA case studies (MFN, SFL, Kumite, MMA Matrix): Ali Asgar Potia
- Wellness/Alteon case studies (Wellness Boom): Ali Asgar Potia
- General industry posts (One-Stop): can be either Ali or Pranav

### 5. Image Sitemap

**Why:** Google has a separate index for images. An image sitemap surfaces every product/case-study image, with captions and titles, into Google Images — a separate traffic surface.

[MODIFY] `scripts/generate-seo-pages.mjs`

Generate `dist/sitemap-images.xml` alongside the regular sitemap. For each route in `SEO_MAP`, list the images that page references (hero, OG image, key gallery shots). Use the format:
```xml
<url>
  <loc>https://www.techfittech.com/mma-cages</loc>
  <image:image>
    <image:loc>https://www.techfittech.com/og/og-mma.jpg</image:loc>
    <image:title>MMA Cage Manufacturer India — TechFit</image:title>
    <image:caption>Hexagonal MMA cage with podium mount, manufactured by TechFit Mumbai</image:caption>
  </image:image>
</url>
```

Add a reference to the main `sitemap.xml`:
```xml
<sitemap>
  <loc>https://www.techfittech.com/sitemap-images.xml</loc>
</sitemap>
```

(Convert the existing single sitemap to a sitemap index that references both `sitemap.xml` and `sitemap-images.xml`.)

[MODIFY] `public/robots.txt`

Add the image sitemap line:
```
Sitemap: https://www.techfittech.com/sitemap-images.xml
```

### 6. `og:image:alt` and Open Graph Hardening

**Why:** Open Graph image alt text improves accessibility for assistive tech reading shared previews, and is a Twitter/LinkedIn ranking factor for shared posts.

[MODIFY] `scripts/generate-seo-pages.mjs` — `generatePage()` function

For each route, inject:
```html
<meta property="og:image:alt" content="[route-specific alt — e.g., 'TechFit MMA Cage — hexagonal, podium-mounted, manufactured in Mumbai']">
<meta name="twitter:image:alt" content="[same text]">
```

Add an `imgAlt` field to each `SEO_MAP` entry to drive this.

Also verify on every page:
- `og:image:width` = 1200
- `og:image:height` = 630
- `og:image:type` = `image/jpeg`

### 7. `inLanguage` Across Schemas

[MODIFY] `scripts/generate-seo-pages.mjs`

Add `"inLanguage": "en-IN"` to every WebPage, BlogPosting, Service, and FAQPage schema entity. This is a small but real geo-language signal for Google India.

### 8. AggregateRating Placeholder (Future-Proofing)

**Why:** Once Google reviews start coming in (after Ali's GBP push), you'll want star ratings in search results immediately. Wire the schema now with a flag so flipping it on later is one config change.

[MODIFY] `scripts/generate-seo-pages.mjs`

Add to the LocalBusiness in `index.html` (commented out, ready to enable):
```json
// "aggregateRating": {
//   "@type": "AggregateRating",
//   "ratingValue": "4.X",     // populate from GBP
//   "reviewCount": "XX",      // populate from GBP
//   "bestRating": "5",
//   "worstRating": "1"
// }
```

Add a build-script constant `ENABLE_AGGREGATE_RATING = false` so flipping it to `true` at any point auto-injects the block. When Ali has 25+ Google reviews with a healthy rating, switch it on and rebuild.

### 9. Technical SEO Cleanup

[MODIFY] `index.html`

Remove the empty `<meta name="prerender-token" content="">` tag — you're not using Prerender.io.

[MODIFY] `vercel.json`

Add security headers (improves Google Ads Quality Score's "site reputation" component, and a small organic-ranking factor):
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
    ]
  }
]
```

Combine with the existing image cache headers from Session 5.

### 10. Schema Validation Pass

[NEW] `scripts/validate-schemas.mjs`

A build-time validation script that:
1. Walks every file in `dist/*.html` and `dist/*/index.html`
2. Extracts every `<script type="application/ld+json">` block
3. Parses each as JSON — fails build if any block has a JSON parse error
4. Checks each entity has a valid `@type` and `@context`
5. Reports total schema entities count per page

Add to `package.json` build chain:
```json
"build": "npm run optimize-images && rm -rf dist && vite build && node scripts/generate-seo-pages.mjs && node scripts/validate-schemas.mjs"
```

So a broken schema breaks the build, not silently ships to production.

### 11. Speakable Schema on Key Pages

**Why:** Voice search (Google Assistant, Siri, Alexa) uses the `SpeakableSpecification` schema to identify content that can be read aloud as a query response.

[MODIFY] `scripts/generate-seo-pages.mjs` — add to WebPage schema for key product pages

```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", ".lead-paragraph", "[itemprop='description']"]
}
```

For the comparison LPs and case studies, the FAQ blocks are already speakable-ready via the FAQPage type.

### 12. Canonical URL Audit

[MODIFY] `scripts/generate-seo-pages.mjs`

Sanity-check every prerendered page has a canonical URL that:
- Uses `https://www.techfittech.com/` (not non-www)
- Matches the route exactly (no trailing slash inconsistencies)
- Has no query parameters or anchors
- Is identical to the URL in the sitemap

Print a report at the end of `generate-seo-pages.mjs`:
```
✓ 35/35 canonical URLs match sitemap
```

If any mismatch, fail the build.

---

## Verification Plan

### Automated

1. **Build succeeds:** `npm run build` exits 0 with the new validation step.
2. **Schema validation report:** `node scripts/validate-schemas.mjs` prints per-page entity count. Spot-check: `/mma-cages` should now show ≥5 entities (WebPage, Service, Product, BreadcrumbList, FAQPage).
3. **Sitemap index:** `dist/sitemap.xml` is now a sitemap index referencing `sitemap.xml` and `sitemap-images.xml`. Both files exist in `dist/`.
4. **Image sitemap:** `dist/sitemap-images.xml` lists ≥30 image entries with titles and captions.
5. **Schema validation external:** Run [Schema.org validator](https://validator.schema.org/) against `https://www.techfittech.com/` (after deploy) — zero errors, zero warnings on critical types.
6. **Rich Results test:** Run Google's [Rich Results Test](https://search.google.com/test/rich-results) on `/mma-cages`, `/alternatives/technogym-india`, and `/blog-mfn`. Each should show eligible structured-data types.
7. **Security headers:** After deploy, run `curl -I https://www.techfittech.com/` — verify HSTS, X-Frame-Options, Referrer-Policy, X-Content-Type-Options all present.

### Manual

1. View source on `/contact` after build — confirm `Place` schema with full geo and opening hours is present.
2. View source on `/blog-mfn` — confirm `author` array now includes the Person `@id` reference plus Organization.
3. View source on `/mma-cages` — confirm `Service` entity is in the `@graph`.
4. Confirm no visible changes to any rendered page (this is the test that this session was correctly scoped as backend-only).

---

## What Antigravity should NOT do this session

- Do not change any visible rendered content — no new sections, no copy edits, no styling changes
- Do not modify `app.js` rendering logic (this session does not touch the SPA router)
- Do not add Google Maps embed (Ali skipped)
- Do not add newsletter signup (Ali skipped)
- Do not add city landing pages (Ali skipped)
- Do not deploy — Ali deploys via Vercel push when ready
- Do not enable `aggregateRating` (placeholder only — flipped on later)

---

## Estimated effort

- Item 1 (Service schemas for product pages): 1 hour
- Item 2 (Place schema on /contact): 30 minutes
- Item 3 (Organization enrichment): 30 minutes (plus Ali's input)
- Item 4 (Author Person schema on blogs): 1 hour
- Item 5 (Image sitemap): 1.5 hours
- Item 6 (og:image:alt): 30 minutes
- Item 7 (inLanguage): 15 minutes
- Item 8 (AggregateRating placeholder): 15 minutes
- Item 9 (Technical SEO cleanup, security headers): 30 minutes
- Item 10 (Schema validation script): 1 hour
- Item 11 (Speakable schema): 30 minutes
- Item 12 (Canonical audit): 30 minutes

Total: roughly 8 hours. Single focused session feasible.

---

## After this session — the website work is effectively complete

Sessions 1–8 together cover:
- All on-page SEO (hygiene + schema + content depth)
- Performance + Core Web Vitals
- Conversion + tracking
- Accessibility
- Local SEO via schema (without local pages)
- Technical SEO + security headers

What remains is **operational and off-site** — none of which lives in the codebase:
- Google Business Profile setup + review push
- Google Ads campaign management
- Directory listings
- PR and trade press
- YouTube content
- Direct outreach to fight promoters, hotel chains, real-estate CXOs

And **content cadence** — adding one new case study, one new buying guide, or one new comparison LP per month, indefinitely. That's the long game.
