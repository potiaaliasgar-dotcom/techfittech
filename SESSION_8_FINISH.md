# Session 8 — Final Two Items (Literal Code Drop-In)

The two items below have been missed twice. This brief gives the exact code to paste, in the exact files, with zero ambiguity. After applying, run `npm run build` and confirm the verification checks at the bottom pass.

**Apply Task 1 first, then Task 2, then verify. No other changes this session.**

---

## Task 1 — Add Service schema to 11 product routes

**File:** `scripts/generate-seo-pages.mjs`
**Location:** Inside the `const SCHEMAS = { ... }` object
**Pattern:** Each product route currently has a `@graph` array containing entities like `WebPage`, `FAQPage`, `Product`, `BreadcrumbList`. Add ONE more entity — a `Service` entity — to the `@graph` array of each route below. Insert it after the WebPage entity and before the FAQPage (where present).

### 1.1 — `SCHEMAS['mma-cages']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/mma-cages#service",
  "name": "MMA Cage, Octagon and Boxing Ring Manufacturing and Installation in India",
  "serviceType": "Combat Sports Infrastructure Manufacturing",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Custom-engineered competition MMA cages (hexagonal and octagonal), boxing rings, floor cages and podium cages. Manufactured at TechFit's Mumbai facility, installed nationwide and internationally. Broadcast-grade specifications, 45-day standard manufacturing, 9-hour install.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.2 — `SCHEMAS['crossfit-rigs']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/crossfit-rigs#service",
  "name": "CrossFit Rig and Functional Training Structure Manufacturing in India",
  "serviceType": "Functional Training Infrastructure Manufacturing",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Modular CrossFit rigs, freestanding functional training systems, wall-mounted pull-up structures, calisthenics rigs and power racks. Built from 11-gauge structural steel at TechFit's Mumbai facility. Custom layouts, branded finishes, install nationwide.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.3 — `SCHEMAS['free-weights']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/free-weights#service",
  "name": "Commercial Free Weights and Strength Equipment Manufacturing in India",
  "serviceType": "Strength Training Equipment Manufacturing",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Olympic barbells, rubber hex dumbbells, bumper plates, tri-grip iron plates, power racks, squat stands and deadlift platforms. Manufactured to commercial-grade specifications at TechFit's Mumbai facility for gyms, studios and fitness chains across India.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.4 — `SCHEMAS['padel-pickleball']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/padel-pickleball#service",
  "name": "Padel and Pickleball Court Design, Construction and Installation in India",
  "serviceType": "Sports Court Construction",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Turnkey ITF-compliant panoramic padel court construction and professional pickleball court installation. Structural steel framing, tempered safety glass, monofilament turf, LED lighting. Full sub-base civil works and project management across India.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.5 — `SCHEMAS['aqua']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/aqua#service",
  "name": "Aqua Fitness Equipment Supply and Installation in India",
  "serviceType": "Aquatic Fitness Equipment Manufacturing and Supply",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "SS316 marine-grade underwater treadmills, aqua exercise bikes, moon walkers and aquatic therapy pools. Designed for physiotherapy clinics, hotels, sports rehabilitation centres and luxury residences across India.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.6 — `SCHEMAS['gym-flooring']` and `SCHEMAS['flooring']`

Add the same Service entity to both routes (the URL changes per route). For `gym-flooring`:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/gym-flooring#service",
  "name": "Commercial Gym Flooring Supply and Installation in India",
  "serviceType": "Gym Flooring Manufacturing and Installation",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf, shock-absorbent mats and weightlifting platforms. Supplied and installed by TechFit across India.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

For `flooring`, duplicate the above with `@id` changed to `https://www.techfittech.com/flooring#service`.

### 1.7 — `SCHEMAS['wellness-solutions']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/wellness-solutions#service",
  "name": "Wellness, Recovery and Longevity Suite Design and Installation in India",
  "serviceType": "Wellness Infrastructure Design and Installation",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Turnkey wellness, recovery and longevity infrastructure — hyperbaric oxygen chambers, whole-body cryotherapy, red light therapy, IHHT cell trainers, dry float pods and infrared saunas. Design, supply, install and AMC across India.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.8 — `SCHEMAS['bh-fitness']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/bh-fitness#service",
  "name": "BH Fitness Authorised Distribution, Installation and AMC in India",
  "serviceType": "Commercial Gym Equipment Distribution and Service",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Authorised India distributor for BH Fitness commercial gym equipment — Spanish-engineered treadmills, exercise bikes, ellipticals and strength machines. Direct-import supply, on-site installation and pan-India AMC.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.9 — `SCHEMAS['tunturi']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/tunturi#service",
  "name": "Tunturi Authorised Distribution, Installation and AMC in India",
  "serviceType": "Commercial Gym Equipment Distribution and Service",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Authorised India distributor for Tunturi fitness equipment — Finnish-engineered cardio, strength and functional training gear for commercial gyms, studios and premium homes. Direct supply, installation and AMC.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.10 — `SCHEMAS['california-fitness']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/california-fitness#service",
  "name": "California Fitness Authorised Distribution, Installation and AMC in India",
  "serviceType": "Commercial Gym Equipment Distribution and Service",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Authorised India distributor for California Fitness commercial gym equipment. Heavy-duty cardio, selectorized strength stacks and plate-loaded machines for high-traffic health clubs and corporate facilities. Direct supply, install and AMC.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

### 1.11 — `SCHEMAS['alteon']`

Add to its `@graph` array:

```js
{
  "@type": "Service",
  "@id": "https://www.techfittech.com/alteon#service",
  "name": "Alteon Wellness Authorised Distribution, Installation and AMC in India",
  "serviceType": "Recovery and Longevity Equipment Distribution and Service",
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "AdministrativeArea", "name": "Maharashtra" },
    { "@type": "City", "name": "Mumbai" }
  ],
  "provider": { "@id": "https://www.techfittech.com/#organization" },
  "description": "Authorised India partner for Alteon Wellness recovery and longevity technology — hyperbaric oxygen chambers, whole-body cryotherapy, red light therapy panels, dry float pods, IHHT cell trainers and compression therapy. Supply, install, certification, AMC.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": "https://www.techfittech.com/get-a-quote"
  },
  "inLanguage": "en-IN"
}
```

**That's all 12 product routes (including both gym-flooring and flooring).** Twelve copy-paste insertions into the existing `@graph` arrays.

---

## Task 2 — Add Author Person schema to 6 blog posts

**File:** `scripts/generate-seo-pages.mjs`
**Location:** Inside `SCHEMAS` for each of the 6 blog routes
**Two changes per route:** (a) replace the existing `author` value, (b) add a slim Person entity to the `@graph`.

### Change Pattern A — replace the `author` field

For each blog route, locate the existing `"author"` line inside the BlogPosting entity. It currently looks like:

```js
"author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" }
```

Replace with:

```js
"author": [
  { "@id": "https://www.techfittech.com/about#aliasgarpotia" },
  { "@id": "https://www.techfittech.com/#organization" }
]
```

### Change Pattern B — add a slim Person entity to the `@graph`

Inside the same blog's `@graph` array (the array that already contains the BlogPosting and BreadcrumbList entities), add this new entity:

```js
{
  "@type": "Person",
  "@id": "https://www.techfittech.com/about#aliasgarpotia"
}
```

This is a slim reference — Google resolves the `@id` against the full Person definition that already exists on `/about`.

### Routes to apply both changes to

Apply Pattern A + Pattern B to every one of these:

- `SCHEMAS['blog-mfn']`
- `SCHEMAS['blog-sfl']`
- `SCHEMAS['blog-kumite']`
- `SCHEMAS['blog-mma-matrix']`
- `SCHEMAS['blog-one-stop']`
- `SCHEMAS['blog-wellness-boom']`

All six get the same `@id` (`#aliasgarpotia`) because Ali is the named author for all the case studies.

---

## Verification (run after applying)

```bash
npm run build
```

The build must succeed. Then run this verification script — every line should print `True` or a positive count:

```bash
python3 << 'EOF'
import re
gen = open('scripts/generate-seo-pages.mjs').read()
schemas = gen[gen.find('const SCHEMAS'):gen.find('const NOSCRIPT_FALLBACKS')]

# Task 1 — Service schema on 12 product routes
print("=== Task 1 — Service schema ===")
for r in ['mma-cages','crossfit-rigs','free-weights','padel-pickleball','aqua','gym-flooring','flooring','wellness-solutions','bh-fitness','tunturi','california-fitness','alteon']:
    s = schemas.find(f"'{r}'")
    depth=0; bs=None; be=None
    for j,ch in enumerate(schemas[s:s+10000]):
        if ch=='{':
            if depth==0: bs=s+j
            depth+=1
        elif ch=='}':
            depth-=1
            if depth==0: be=s+j+1; break
    block = schemas[bs:be]
    has_svc = '"Service"' in block
    has_area = 'areaServed' in block
    has_prov = '#organization' in block
    status = 'PASS' if (has_svc and has_area and has_prov) else 'FAIL'
    print(f"  /{r}: {status}")

# Task 2 — Author Person on 6 blogs
print("=== Task 2 — Author Person ===")
for b in ['blog-mfn','blog-sfl','blog-kumite','blog-mma-matrix','blog-one-stop','blog-wellness-boom']:
    s = schemas.find(f"'{b}'")
    depth=0; bs=None; be=None
    for j,ch in enumerate(schemas[s:s+10000]):
        if ch=='{':
            if depth==0: bs=s+j
            depth+=1
        elif ch=='}':
            depth-=1
            if depth==0: be=s+j+1; break
    block = schemas[bs:be]
    has_id = '#aliasgarpotia' in block
    print(f"  /{b}: {'PASS' if has_id else 'FAIL'}")
EOF
```

**All 12 product routes must print PASS for Task 1. All 6 blog routes must print PASS for Task 2.**

Do not declare done until every line above prints PASS. If any prints FAIL, the corresponding insertion was missed — fix it.

---

## What NOT to change this session

- Do not modify any other schema entity, file, or behavior
- Do not touch the aggregateRating placeholder (it's correctly commented out — leave it)
- Do not touch the sitemap, OG images, security headers, or anything else from Sessions 1–7
- Do not deploy — Ali deploys when ready

That's the entire session: 12 Service insertions, 6 author replacements + 6 Person entity additions. ~30 minutes of focused work.
