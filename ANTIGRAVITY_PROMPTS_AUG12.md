# Antigravity prompts — techfittech.com fixes (12 Aug 2026 audit)

Run these one at a time, in order. Each is self-contained. After prompts 1 to 3, do one build + deploy and verify before moving on.

---

## Prompt 1 — CRITICAL: repair the blank /alternatives/* pages + add a build guard

```
The repo is the techfittech.com site (Vite + vanilla JS SPA, router in public/assets/app.js, deployed dist/ to Vercel). The deployed app.js is identical to the local copy (hash 16779111), so this is a live bug in current code.

Bug: every /alternatives/<slug> page renders a BLANK page in the browser. The header and floating buttons paint, but the app container stays empty (main has 0 children). The pre-rendered SEO text in the HTML source is fine. Verified live on /alternatives/technogym-india and /alternatives/life-fitness-india on 12 Aug 2026. Google renders JS, so all ~20 of these pages are Soft 404s in GSC.

What I know from reading app.js:
- parseUrl() is fine: all 20 alternatives/<slug> paths are in validPages, so page is set correctly.
- The routes map (around line 987) maps only 6 slugs to renderers: technogym-india, life-fitness-india, sechrist-hyperbaric-india, precor-india, mecotec-cryotherapy-india, usi-cosco-techfit-cages. Even these paint nothing live, which suggests the dispatch never reaches routes[page] for slugs containing "/", or a renderer throws mid-render and leaves the container empty.
- The other 14 slugs (cybex-india, hammer-strength-india, nautilus-india, star-trac-india, body-solid-india, hoist-fitness-india, freemotion-india, true-fitness-india, american-fitness-india, atlantis-strength-india, fitline-india, matrix-fitness-india, jerai-fitness-india, being-strong-india) are in validPages but have NO renderer and no GUIDES_DATA entry.

Do this:
1. Reproduce locally: npm run build, serve dist/, open /alternatives/technogym-india with the browser console open. Find the actual failure (dispatch order for slugs with "/", or a thrown error in renderTechnogymAlternative).
2. Fix the dispatch so every alternatives/<slug> in validPages renders real content. For the 14 renderer-less slugs, add GUIDES_DATA entries (unique htmlContent + FAQs in TechFit voice, consistent with the existing 6 dedicated pages) or route them through renderGuide.
3. Make sure each of these pages also gets its unique <title>, meta description and canonical set on render (see the updateSEO() bug — prompt 2 — and fix both together if the root cause is shared).
4. Add a build-time guard script (wire into the npm build pipeline like guard-valid-pages.mjs): for every entry in validPages, assert it resolves to a renderer, a GUIDES_DATA entry, or a dedicated render branch, and FAIL the build listing any slug that would fall through to render404 or an empty container. This exact bug class has now shipped twice.
5. Verify: after build, serve dist and check /alternatives/technogym-india, /alternatives/cybex-india, /alternatives/being-strong-india all show real visible content with correct titles and zero console errors. Run node --check public/assets/app.js.

Do not touch vercel.json, the prerender output for other routes, or anything else.
```

---

## Prompt 2 — Titles/meta revert to the generic homepage title after hydration

```
In the techfittech.com repo (public/assets/app.js): the pre-rendered HTML for /hyrox has the correct title "Official HYROX Equipment India | TechFit" and /get-a-quote has "Get a Free Gym & Wellness Consultation | TechFit India". But once app.js hydrates, document.title reverts to the generic "TechFit | Gym, Wellness & Sports Infrastructure" on both pages (verified live 12 Aug 2026). Google indexes the rendered state, so the unique titles are lost.

Find updateSEO() in app.js. It clearly has per-route title/description/canonical entries for older routes but is missing entries for newer ones (hyrox, get-a-quote, and likely the alternatives/* slugs, city guides and comparison pages).

Do this:
1. Audit EVERY slug in validPages against updateSEO(). List all routes where hydration would overwrite the pre-rendered title or meta description with the generic default.
2. Fix updateSEO() so every route keeps (or re-sets) its unique title, meta description, canonical, and og/twitter tags. The source of truth for what each title should be is scripts/generate-seo-pages.mjs, which already builds the correct per-route values at build time. Best fix: have updateSEO() fall back to LEAVING the existing document head values alone when it has no entry for a route, instead of applying the homepage defaults. That makes the prerendered values win by default and prevents this class of bug permanently.
3. Verify: build, serve dist, open /hyrox, /get-a-quote, /alternatives/technogym-india, /commercial-gym-setup-chennai and confirm the tab title stays the unique one after JS loads. node --check must pass.
```

---

## Prompt 3 — Raw markdown asterisks showing on guide/city pages

```
In the techfittech.com repo: the visible page text on /commercial-gym-setup-mumbai contains literal double asterisks, e.g. "TechFit applies **specialized dual powder-coating protection** to all custom fabricated functional structures". The guide content in GUIDES_DATA (inside public/assets/app.js) was written with markdown emphasis but is injected as plain text/HTML without a markdown pass.

Do this:
1. Scan ALL GUIDES_DATA htmlContent strings (and any other content blobs in app.js) for markdown artifacts: **bold**, *italics*, markdown links [text](url), stray # headings, and backticks.
2. Convert them to proper HTML (**text** to <strong>text</strong>, etc.) directly in the source strings. Do not add a markdown library to the client.
3. Also check the prerendered output in scripts/generate-seo-pages.mjs uses the same cleaned content, so the crawler-visible text matches.
4. Report how many pages were affected and list them. Verify /commercial-gym-setup-mumbai and two other city pages render with no visible asterisks, then node --check.
```

---

## Prompt 4 — Blank white cards while images lazy-load + huge empty block on /mma-cages

```
techfittech.com repo, front-end polish for perceived speed:

Problem A: on brand catalogue pages (e.g. /bh-fitness), product images lazy-load with no placeholder, so on first visit whole rows of cards sit as blank white boxes for 1 to 2 seconds while scrolling. 
Problem B: on /mma-cages there is a roughly two-screen-tall blank white region between the hero and the FAQ while a gallery/section lazy-loads. It reads as a broken page.

Do this:
1. Give every product card <img> explicit width and height attributes (or aspect-ratio CSS) plus a light grey background placeholder on the card image container, so layout is stable and cards never look empty-white.
2. Eager-load (loading="eager", fetchpriority="high") the first two rows of the product grid; keep lazy for the rest.
3. On /mma-cages, find the section that reserves that tall empty space before its content loads. Give it a placeholder background or reserve less height until content is ready. There is also one <img> with an empty src on every page (it resolves to the page URL and 404s) — find and remove or fix it.
4. Fix the homepage H1: it renders as "India's PremierFitness & WellnessInfrastructure Partner" because the spans have no spaces between them. Crawlers see the concatenated string. Add the spaces without changing the visual line breaks.
5. Verify on a throttled connection (DevTools Fast 3G): /bh-fitness first scroll shows placeholders not white voids, /mma-cages has no giant blank region, homepage H1 innerText has correct spacing. node --check.
```

---

## Prompt 5 — Consolidate floating CTAs and fix footer overlap

```
techfittech.com repo: the site shows three floating elements on every page — a red "INQUIRE NOW" pill bottom-left, a green "Chat with us" pill bottom-right, and a small circular PDF icon that floats along the right edge. Problems: the PDF icon frequently collides with the chat pill; in the footer the copyright line is hidden behind INQUIRE NOW and the bottom-right text is hidden behind the chat pill; the header already has a "FREE CONSULTATION" button competing with INQUIRE NOW.

Do this:
1. Remove the floating INQUIRE NOW pill (the header FREE CONSULTATION button and per-page CTAs already cover that intent).
2. Keep a single floating action: the WhatsApp chat pill, bottom-right. Restyle it from bright green to match the brand palette (red #-value used by the site buttons, or white with red text), keeping the WhatsApp icon recognisable.
3. Move the floating PDF catalogue icon into a labelled inline element instead (e.g. a "Download brochure (PDF)" link in the page hero or section where it is relevant), so it is discoverable and never overlaps.
4. Add enough bottom padding to the footer so no text is ever covered by the remaining floating pill, on desktop and mobile widths.
5. Check all page types: home, /services, /bh-fitness, /mma-cages, /alteon, /pilates, /get-a-quote, a city page, a blog page. Screenshot before/after at 1440px and 390px.
```

---

## Prompt 6 — Minify app.js and stop shipping originals

```
techfittech.com repo, performance:

1. app.js ships as 745 KB of UNMINIFIED source from public/assets/app.js (it bypasses Vite bundling; the build only appends a ?v=<hash> query). Add a minification step to the build pipeline: after vite build copies it to dist/assets/app.js, run esbuild --minify on the dist copy (do NOT minify the source file in public/). Keep the existing hash-assets.mjs cache-busting working (hash the minified output). Confirm node --check passes on the dist output and the site works from a local serve of dist.
2. The largest homepage image is a 468 KB PNG (img-baf798fbd9.png). The sharp pipeline (scripts/optimize-images.mjs) generates webp/avif variants, but this page references the original PNG. Audit all pages for <img> tags referencing original .png/.jpg files where a generated -800.webp/-1600.webp variant exists, and switch them to <picture> or srcset with the variants. Report total bytes saved on the homepage.
3. Optional if low-risk: dist currently deploys 602 MB of images because originals AND every generated variant ship. Propose (do not implement yet) a way to exclude unreferenced originals from dist.
```

---

## Prompt 7 — Pilates page: missing navigation + brand drift

```
techfittech.com repo: /pilates is a separate standalone file (public/pilates.html, rewritten from /pilates in vercel.json). Two problems verified live 12 Aug 2026:
1. The top navigation menu is missing — only the logo and the FREE CONSULTATION button render, so visitors cannot navigate anywhere. Restore the full site header (HOME / SOLUTIONS & SERVICES / PRODUCTS / BLOG / ABOUT / CONTACT + Free Consultation), matching the main site's markup and behaviour, including the dropdowns.
2. The logo on this page is a cyan/teal variant while every other page uses the red TechFit logo. Switch to the standard red logo asset.
Also reduce the scroll-triggered fade-in delay on this page — whole sections stay invisible until scrolling stops. Lower the animation duration/threshold so content is visible as it enters the viewport.
Keep the page's premium styling otherwise. Verify the header links actually navigate, at desktop and mobile widths.
```

---

## Prompt 8 — Remove public Byculla mentions

```
techfittech.com repo: company policy is that the Byculla facility must NOT be named publicly. The site currently says things like "fabricated in-house at our Byculla facility" (/mma-cages "WHAT WE BUILD" section) and "located in Byculla" (/get-a-quote "VISIT OUR MUMBAI HEADQUARTERS" section), and possibly more.

Search the entire repo (app.js content strings, pilates.html, prerendered content in scripts/generate-seo-pages.mjs, llms.txt, llms-full.txt, blog content) for "Byculla" and replace with "Mumbai" / "our Mumbai facility" as reads naturally. The official public address stays the Darukhana one already in the footer: Plot No 309, Coal Bunder Road E, Reay Road, Darukhana, Mumbai 400010. Report every file and line you changed.
```

---

## Not Antigravity tasks (do these in dashboards)

- **Vercel Firewall**: check Firewall/Bot-protection logs for blocked or challenged requests from GPTBot, ClaudeBot/Claude-User, PerplexityBot, Google-Extended user agents, and from datacenter IPs generally. A cloud browser was connection-reset on 12 Aug 2026 while residential traffic was fine. Whitelist verified AI crawlers if any are being blocked.
- **Google reviews**: collect 15 to 20 reviews from past installs, then flip ENABLE_AGGREGATE_RATING to true in scripts/generate-seo-pages.mjs (that one IS a one-line Antigravity task once reviews exist).
- **After each deploy**: GSC → request indexing for the fixed alternatives pages, /hyrox, /get-a-quote, and spot-check with the URL Inspection live test that they no longer come back Soft 404.
