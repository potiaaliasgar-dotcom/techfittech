# Implementation Plan — Session 5: Performance, Conversion, and Accessibility

This session ships five high-leverage items: a sitewide image optimization pass (WebP/AVIF + lazy loading + responsive srcset + CLS fix), category-page quote forms, Google Ads conversion tracking, exit-intent modal with lead-magnet PDF, and an accessibility quick pass. None of these require Ali to review prose — they are code-and-config work Antigravity can execute end-to-end.

---

## User Review Required

### IMPORTANT — Google Ads conversion labels (parallel task for Ali)

Item 3 (Google Ads conversion tracking) requires conversion-action labels created in the Google Ads UI before Antigravity can wire them. Ali — please create three Conversion Actions in **Google Ads → Goals → Conversions → New conversion action → Website**:

1. **Quote form submission** (Category: Submit lead form, Value: Use the same value for each conversion = INR 5,000, Count: One, Click-through window: 30 days)
2. **Phone-link click** (Category: Phone call, Value: Use the same value = INR 3,000, Count: One)
3. **WhatsApp-link click** (Category: Submit lead form, Value: INR 3,000, Count: One)

After creating each, Google gives you a conversion ID + label in the format `AW-17959203178/abc123XYZ`. Send those three label strings to Antigravity. Antigravity will wire them in step 3 below. If labels are not yet available, Antigravity should add placeholder constants at the top of `app.js` (`const GAW_CONVERSION_FORM = "REPLACE_ME"`) so the wiring is in place and only the strings need swapping when labels arrive.

### IMPORTANT — Image optimization safety

Item 1 will modify image references across `index.html`, `public/assets/app.js`, and `scripts/generate-seo-pages.mjs` (the noscript blocks). Antigravity must use git diff to verify no broken image links before declaring success. The build script must continue to succeed and Lighthouse mobile score should not drop after the conversion. If any image fails to convert or any reference is missed, restore that image to its original format rather than ship broken references.

### Open Questions

- **Form submission endpoint:** The existing `/get-a-quote` page has a working form. Antigravity should reuse the same submission endpoint and `gtag` event for the embedded category-page forms — do not create a new endpoint. If unclear which endpoint it posts to, inspect `app.js` for the existing handler and reuse.
- **Lead-magnet PDF content source:** Antigravity should generate the PDF from existing site content only — no new facts. Pull from comparison LPs and product pages. See item 4.

---

## Proposed Changes

### 1. Image Optimization Pass (Sitewide Performance Win)

**Goal:** Reduce LCP, CLS, and total page weight across the entire site. Target: every image under 100 KB on mobile, every below-fold image lazy-loaded, zero layout shift.

[NEW] `scripts/optimize-images.mjs`

Build-time script that walks `public/assets/images/` (currently 704 JPG/PNG files), and for each one:
- Generates a `.webp` and a `.avif` sibling at the same path (e.g., `hero-mma.jpg` → `hero-mma.webp` + `hero-mma.avif`).
- Generates three responsive widths (400, 800, 1600 px) for each format, named with width suffix (e.g., `hero-mma-800.webp`).
- Skips images already under 50 KB.
- Reports a summary at the end (total size before vs after, count of files processed).

Use the `sharp` library already in `package.json`. Run with `sharp({ failOnError: false })` and `.toFormat('webp', { quality: 82 })` / `.toFormat('avif', { quality: 60 })`. Concurrency 4 to avoid OOM on large image sets.

[MODIFY] `package.json`

Add to `scripts`:
```json
"optimize-images": "node scripts/optimize-images.mjs",
"build": "npm run optimize-images && rm -rf dist && vite build"
```

So image optimization runs as part of every build.

[MODIFY] `index.html`, `public/assets/app.js`, `scripts/generate-seo-pages.mjs` (the NOSCRIPT_FALLBACKS region)

For every `<img src="...">` reference, convert to a `<picture>` element with `<source srcset>` fallbacks. Pattern:
```html
<picture>
  <source type="image/avif" srcset="path/hero-mma-400.avif 400w, path/hero-mma-800.avif 800w, path/hero-mma-1600.avif 1600w" sizes="(max-width: 768px) 100vw, 800px">
  <source type="image/webp" srcset="path/hero-mma-400.webp 400w, path/hero-mma-800.webp 800w, path/hero-mma-1600.webp 1600w" sizes="(max-width: 768px) 100vw, 800px">
  <img src="path/hero-mma.jpg" alt="..." width="800" height="450" loading="lazy" decoding="async">
</picture>
```

Rules for the `<img>` tag inside:
- Always include explicit `width` and `height` attributes matching the source image's aspect ratio. Prevents CLS.
- `loading="lazy"` on every image **except** the LCP image (hero on the visible homepage and category pages). LCP image gets `loading="eager"` and `fetchpriority="high"`.
- `decoding="async"` on all images.
- The fallback `<img src>` keeps the original JPG/PNG so older browsers still work.

For inline JS in `app.js` that constructs `<img>` strings via template literals, refactor to construct the full `<picture>` element. If a single image is constructed in many places, extract a `pictureTag(basename, alt, width, height, lazy=true)` helper.

[MODIFY] `index.html` (head)

Add LCP preload:
```html
<link rel="preload" as="image" href="/assets/images/hero/hero-home-1600.webp" type="image/webp" fetchpriority="high">
```

Replace the existing single preload with one per category page's LCP image (the prerender script can inject the right one per route based on `seo.lcp_image` — add an `lcp_image` field to each `SEO_MAP` entry).

[MODIFY] `vercel.json`

Add long-cache headers for static assets to help Quality Score on repeat visits:
```json
"headers": [
  {
    "source": "/assets/(.*)\\.(webp|avif|jpg|jpeg|png|svg|woff2)",
    "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
  }
]
```

---

### 2. Quote Form on Every Category Page

**Goal:** Cut friction. Users on `/mma-cages` shouldn't have to click to a separate page to get a quote — the form should be right where they decided.

[MODIFY] `public/assets/app.js`

Add a `renderQuoteForm(projectType)` helper that returns a 4-field HTML form:
- **Name** (text, required)
- **Phone** (tel, required, pattern validates Indian +91 / 10-digit)
- **Project type** (select, pre-filled with `projectType`, options: MMA Cage, Boxing Ring, CrossFit Rig, Free Weights, Padel Court, Aqua Fitness, Wellness/Recovery, Gym Setup, Other)
- **Message** (textarea, optional, placeholder: "Tell us about your project — venue, timeline, budget range...")

Submit goes to the same endpoint the existing `/get-a-quote` form uses. After successful submit:
- Fire the `gtag` conversion event (see item 3)
- Redirect to `/thank-you`

Add `<div id="page-quote-form"></div>` placeholder near the bottom of each category page's rendered content. The router's per-route render function calls `document.getElementById('page-quote-form').innerHTML = renderQuoteForm('MMA Cage')` (or whichever project type matches the route).

Routes to add the form to:
- `/mma-cages` → MMA Cage
- `/crossfit-rigs` → CrossFit Rig
- `/free-weights` → Free Weights
- `/padel-pickleball` → Padel Court
- `/aqua` → Aqua Fitness
- `/wellness-solutions` → Wellness/Recovery
- `/bh-fitness` → Gym Setup
- `/tunturi` → Gym Setup
- `/california-fitness` → Gym Setup
- `/alteon` → Wellness/Recovery
- `/gym-flooring` → Gym Setup
- `/techfit` → Gym Setup
- `/for-gyms`, `/for-developers`, `/for-schools`, `/for-hotels` → Gym Setup
- All `/alternatives/*` pages → matching project type

[MODIFY] `public/assets/style.css`

Add styling for the embedded form that fits the dark/red theme. Reuse the existing form styles from `/get-a-quote` if possible — search for `.quote-form` or equivalent selector and ensure the new instances inherit.

[MODIFY] `scripts/generate-seo-pages.mjs`

In `NOSCRIPT_FALLBACKS` for each category route, add a non-JavaScript text fallback at the bottom:
> Ready to get started? Email info@techfitactive.com or call +91 98201 66910 for a free quote on your [project type] project.

So users without JS still have a clear conversion path.

---

### 3. Google Ads Conversion Tracking

**Goal:** Measure cost-per-conversion so Ali can optimize Google Ads spend instead of running blind.

[MODIFY] `public/assets/app.js`

Add three conversion event functions at the top of the file:

```js
const GAW_ID = 'AW-17959203178';
const GAW_FORM_LABEL = '__REPLACE_WITH_FORM_LABEL__';
const GAW_PHONE_LABEL = '__REPLACE_WITH_PHONE_LABEL__';
const GAW_WHATSAPP_LABEL = '__REPLACE_WITH_WHATSAPP_LABEL__';

function fireConversion(label, projectType = '') {
  if (typeof gtag !== 'function') return;
  gtag('event', 'conversion', {
    send_to: `${GAW_ID}/${label}`,
    transaction_id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    project_type: projectType
  });
}
```

Wire the calls:
- **Form submit handler** (both the existing `/get-a-quote` form and the new category-page forms): on successful submission, call `fireConversion(GAW_FORM_LABEL, projectType)` before redirecting to `/thank-you`.
- **Phone-link clicks**: add a sitewide listener for `click` events on any `<a href^="tel:">` and call `fireConversion(GAW_PHONE_LABEL)`. Includes the sticky-CTA call button.
- **WhatsApp-link clicks**: same pattern for `<a href*="wa.me">` clicks. Include the sticky-CTA WhatsApp button and the floating WhatsApp button.

[MODIFY] `dist/thank-you/index.html` (and the generator)

Add a backup conversion fire on the thank-you page itself so we capture conversions even if the in-page event missed. Inside `<head>`:
```html
<script>
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', { send_to: 'AW-17959203178/__REPLACE_WITH_FORM_LABEL__' });
  }
</script>
```

This belt-and-braces approach is standard for Google Ads. The dedup via `transaction_id` is handled by Google's side.

[NEW] Document the wiring in `SESSION_5_NOTES.md` (handoff doc)

When Ali provides the three conversion labels, Antigravity does a global find-and-replace on `__REPLACE_WITH_FORM_LABEL__`, `__REPLACE_WITH_PHONE_LABEL__`, `__REPLACE_WITH_WHATSAPP_LABEL__` with the real values. Rebuild. Done.

---

### 4. Exit-Intent Modal + Lead-Magnet PDF

**Goal:** Capture leads from users about to bounce. Industry-standard lead-magnet pattern.

[NEW] `public/lead-magnets/TechFit-Commercial-Gym-Setup-Cost-Guide-India-2026.pdf`

Generate from existing site content only — no new facts. Use `pdfkit` or `puppeteer`. Structure (8–12 pages):
1. **Cover** — TechFit logo, title, "2026 Edition"
2. **Why local-Indian gym setup wins** (200 words pulled from comparison LPs)
3. **Equipment categories and cost bands** — table pulling cost ranges from the existing comparison LPs (lead times, AMC inclusions). Be explicit these are "indicative" not quoted.
4. **Setup phases** — design, supply, install, AMC, with timeline ranges from existing service descriptions
5. **Case-study one-pagers** — short summaries of MFN, SFL, Tiger Shroff's gym (single para each, pulled from existing blog stubs)
6. **Brand portfolio** — BH Fitness, Tunturi, California, Alteon (pulled from existing distributor pages)
7. **Contact page** — phone, WhatsApp, email, factory address, QR code linking to `/get-a-quote`

Generate the PDF as part of build. Output to `dist/lead-magnets/` and `public/lead-magnets/` so it's deployed.

[NEW] `public/assets/exit-intent.js`

Standalone exit-intent detection module loaded with `defer`:

Desktop: detect `mouseleave` event where `e.clientY < 10` (cursor moving toward browser tabs).
Mobile: detect `scrollY` decreasing rapidly within 30 seconds of page load (user scrolling back up after engaging).

When triggered:
- Check `sessionStorage.getItem('exitIntentShown')` — if true, do nothing
- Set `sessionStorage.setItem('exitIntentShown', 'true')` — show only once per session
- Show modal with:
  - Headline: "Wait — Get the 2026 Commercial Gym Setup Cost Guide"
  - 2-field form: Name, Email
  - CTA: "Send me the guide"
  - Subtle "No thanks, continue browsing" close link

On submit: fire `fireConversion(GAW_FORM_LABEL, 'lead_magnet')`, post the lead to the same endpoint as the quote form (with a `source: 'exit_intent'` field), and trigger PDF download via `<a href="/lead-magnets/TechFit-...-2026.pdf" download>`.

[MODIFY] `index.html`

Add the modal markup (hidden by default) and `<script src="/assets/exit-intent.js" defer></script>`. Style with the same charcoal/red glassmorphism aesthetic as the sticky CTA. Modal styling in `public/assets/style.css`.

---

### 5. Accessibility Quick Pass

**Goal:** Bring the site to WCAG AA, which is a Google Ads landing-page review factor and a small organic ranking factor.

[MODIFY] `index.html`

- Add as the first focusable element inside `<body>`:
```html
<a href="#main-content" class="skip-to-content">Skip to main content</a>
```
- Add `id="main-content"` to the main content wrapper (or to whichever element wraps the per-route rendered content).
- Verify `<html lang="en-IN">` is set (it currently is — confirm).

[MODIFY] `public/assets/style.css`

```css
.skip-to-content {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--red, #dc2626);
  color: #fff;
  padding: 0.75rem 1.25rem;
  z-index: 10000;
  text-decoration: none;
  font-weight: 600;
}
.skip-to-content:focus {
  left: 1rem;
  top: 1rem;
}
```

[MODIFY] Sticky CTA bar (index.html, around line 992 onwards)

Audit ARIA labels on every button — Call, WhatsApp, Quote. They mostly exist; verify each has `aria-label="<verb> + <object>"` (e.g., `aria-label="Call TechFit sales on +91 98201 66910"`).

[MODIFY] All `<button>` and `<a>` elements without visible text (icon-only)

Add `aria-label` to every icon-only button or link. Search `app.js` and `index.html` for `<button` and `<a ` patterns and audit.

[MODIFY] Color contrast audit

Verify the charcoal background + red accent + white text combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large text). If any combination falls short, adjust the red accent shade slightly. Run a quick check with a CSS-color-contrast linter or Chrome DevTools' Lighthouse accessibility audit.

[MODIFY] Form labels

Every form `<input>` must have an associated `<label>` (either wrapping or via `for=`). Placeholder text alone is not accessible. Audit `/get-a-quote` and the new category-page forms.

---

## Verification Plan

### Automated

1. **Build success:** `npm run build && node scripts/generate-seo-pages.mjs` exits 0.
2. **Image optimization summary:** the `optimize-images.mjs` script prints "Processed N files, total size before X MB, after Y MB" — verify Y is materially smaller than X (target: 40%+ reduction).
3. **Image references:** `grep -r "<img " dist/ | wc -l` count before and after — should be roughly equal (all `<img>` tags retained, just inside `<picture>` now). Run `grep -r "<picture>" dist/` to confirm `<picture>` tags are present.
4. **WebP/AVIF count:** `find public/assets/images -name "*.webp" | wc -l` should equal the count of JPG/PNG files (minus any skipped because under 50 KB).
5. **Lazy-loading:** `grep -r 'loading="lazy"' dist/ | wc -l` should be at least 50 (was 2).
6. **Sitemap unchanged:** `dist/sitemap.xml` should still have the 35 URLs we currently have — no regressions.
7. **Conversion gtag wiring:** `grep "fireConversion\|gtag.*conversion" public/assets/app.js` should show 4+ hits (form submit, phone, whatsapp, exit-intent).
8. **Skip-to-content:** `grep "skip-to-content" dist/index.html dist/about/index.html dist/bh-fitness/index.html` should match in all three.
9. **PDF generated:** `ls -la dist/lead-magnets/TechFit-Commercial-Gym-Setup-Cost-Guide-India-2026.pdf` exists and is non-trivial (≥ 200 KB).

### Manual (Antigravity — local preview)

1. Run `npm run preview` and open `http://localhost:4173/`.
2. Open Chrome DevTools → Lighthouse → Mobile, Performance + Accessibility + Best Practices + SEO. Run on `/`, `/mma-cages`, `/alternatives/technogym-india`. Target scores: Performance ≥ 85 mobile, Accessibility ≥ 95, SEO ≥ 95.
3. Verify exit-intent modal triggers when moving cursor toward browser tabs on desktop, and only fires once per session (reload to confirm `sessionStorage` blocks re-show).
4. Submit the category quote form on `/mma-cages` — confirm it redirects to `/thank-you` and the network tab shows the form POST hitting the existing endpoint.
5. Click the phone link in the sticky CTA — confirm `gtag` fires (visible in Network tab as a `google-analytics.com` request with the conversion label).
6. Tab through `/` from the URL bar — the first Tab key press should focus the "Skip to main content" link, and pressing Enter should jump focus to the main content.

### Manual (Ali — after Antigravity hands off)

1. Confirm Google Ads conversions are recording inside the Ads UI (Conversions → Recent activity, should show test conversions within an hour).
2. Spot-check 3 product pages on a real mobile device for image clarity and form usability.
3. Download the lead-magnet PDF and verify it reads professionally end-to-end.

---

## What Antigravity should NOT do this session

- Do not expand the blog case studies (paused; Ali is handling intake briefs)
- Do not build new comparison LPs beyond the 6 live
- Do not build `/guides/` or `/faq/` pages (next session)
- Do not build city landing pages (next session)
- Do not touch the Person schema for leadership (just shipped, verified)
- Do not delete any files outside `public/assets/images/` without checking `git ls-files` first
- Do not add tracking pixels for any platform other than Google Ads (no Meta Pixel, no LinkedIn Insight, no TikTok Pixel — Ali has not authorized those)

---

## Estimated effort

- Item 1 (image optimization): half-day, mostly automatable
- Item 2 (category quote forms): 2-3 hours
- Item 3 (conversion tracking): 1 hour (plus Ali's 5-min Ads UI work)
- Item 4 (exit-intent + PDF): 3-4 hours
- Item 5 (accessibility): 1-2 hours

Total: roughly one full working day. Single session feasible. Ali can run in parallel on the Ads UI conversion labels and respond when Antigravity hits that step.

---

## Handoff format

When complete, Antigravity should report back in the same format as previous sessions:
- One section per item, listing what was modified and verified
- File-size and Lighthouse delta numbers (before vs after)
- Three conversion label strings highlighted as `[REPLACE_WHEN_LABELS_AVAILABLE]` if Ali hasn't provided them yet
- Any decisions deferred or items not completed, with reason
