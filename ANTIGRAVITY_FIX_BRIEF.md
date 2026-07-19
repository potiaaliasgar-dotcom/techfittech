# TechFit — Fix Soft 404s Across the Site (brief for Antigravity)

_Prepared 19 Jul 2026. Goal: stop Google Search Console from marking pages "Soft 404" so they can be indexed._

---
## ⚠️ UPDATE after first deploy — one more build+deploy needed

The first deploy worked for the 23 city + 3 comparison pages — verified live, `/commercial-gym-setup-chennai` now renders full content. **But `/hyrox` was still 404 after that deploy**, and I found why:

The static pre-rendered file for `/hyrox` is correct (raw HTML is fine), but **`'hyrox'` was missing from the `validPages` array in `parseUrl()`**. So when app.js hydrates, `parseUrl()` sets `page='404'` before the `page === 'hyrox'` render branch can ever run — the branch was dead code. Google renders the JS, gets the 404, → Soft 404. Same root cause as the city pages, one level higher (in `validPages`, not `guideSlugs`).

Auditing sitemap-vs-validPages found **3 pages missing from `validPages`**: `hyrox`, `alternatives` (the hub), and `get-a-quote`. All three have working renderers (`renderHyrox`, `renderAlternativesHub`, and I aliased `get-a-quote` → `renderContact`). **I've applied these fixes to `public/assets/app.js`.**

Verified at source: every sitemap page now maps to `validPages`, and every `validPages` entry has a renderer (0 orphans, 0 renderer-less routes). `node --check` passes.

**Action: run `npm run build` and deploy to Vercel production again** (same steps as below). After it lands, `/hyrox` should render its real content with the title "Official HYROX Equipment India | TechFit".

---

## TL;DR — two problems, and most of it is one deploy

1. **Production is stale.** The repo `main` branch is ahead of what's live. Live `https://www.techfittech.com/hyrox` still serves the old single-page-app homepage shell and then client-renders a **404 – Page Not Found** (its `<title>` is the generic homepage title, not the HYROX title). Google renders the JS, sees a 404, and files it as **Soft 404**. The fix already exists in the repo — commit `975fba6` removed the stale `/hyrox` (and `/alteon`) rewrite and the pre-rendered `dist/hyrox/index.html` is correct — but it has **not been deployed**.

2. **26 routes had no client-side renderer.** They were listed in `validPages` (in `public/assets/app.js`) and in the sitemap, but were missing from the router, so `render()` fell through to `render404()` → Soft 404. This is the same bug class as #1. **These are now fixed in `public/assets/app.js`** (see "What I changed" below). They need a build + deploy to go live.

Live `/alteon` renders perfectly, which proves the site and Google's JS rendering work fine — the issue is specifically pages the router can't render, plus the un-deployed hyrox fix.

## What to do (order matters)

1. **Pull latest `main`** — my change is already saved to `public/assets/app.js` on disk.
2. **Build locally:** `npm run build`  (builds fine on macOS; the `sharp` image step only fails inside a Linux sandbox, not on the Mac.)
3. **Deploy the fresh `dist/` to Vercel _production_** (a full production deploy, not just a preview).
4. **Confirm `vercel.json` on production** matches the repo — it should have **no** `/hyrox` or `/alteon` rewrite. The repo is already correct: the only rewrite left is `/pilates → /pilates.html`. If production still has the old hyrox/alteon rewrites, this deploy replaces them.

## What I changed in `public/assets/app.js` (already applied)

Wired **26 previously-orphaned routes** into the client router by adding each slug to the `guideSlugs` array and adding a `GUIDES_DATA` entry (unique `htmlContent` + FAQs, TechFit voice). Also added the city pages to the `commercialPages` quote-form map. No other files touched.

- 8 commercial: `commercial-gym-setup-{chennai,kolkata,ahmedabad,jaipur,goa,chandigarh,surat,kochi}`
- 15 hotel/society/corporate: `{hotel,society,corporate}-gym-setup-{mumbai,pune,bangalore,delhi-ncr,hyderabad}`
- 3 comparison: `cosco-vs-bh-fitness`, `viva-vs-tunturi`, `decathlon-domyos-vs-commercial-gym-equipment`

Verification already done at source: an orphan scan of `validPages` vs the router now returns **0** remaining Soft-404 routes. `node --check` passes. (Patch scripts are in `scratch/add-city-guides.cjs` and `scratch/add-comparison-guides.cjs` if you want to review the exact edits.)

## Prevent this from recurring

Add a build-time guard: every entry in `validPages` must resolve to non-404 content — i.e. be in `guideSlugs` + `GUIDES_DATA`, OR have a dedicated `render()` branch (`hyrox`, `alteon`), OR be pre-rendered via `buildSSGRoute`. Fail the build if any `validPages` slug would hit `render404()`. This is what let 26 pages ship broken.

## Post-deploy verification checklist

Open each and confirm it shows **real content**, not "404 – Page Not Found":

- `/hyrox` — title must read **"Official HYROX Equipment India | TechFit"** (not the generic homepage title)
- The 8 commercial city pages, the 15 hotel/society/corporate pages, and the 3 comparison pages above
- Spot-check `/pilates` and a few `/alteon/<category>/<product>` pages (these already render — confirm the deploy didn't regress them)

Quick way to check any page: it's broken if the visible body says "Page Not Found" or the `<title>` is the generic "TechFit | Gym, Wellness & Sports Infrastructure" homepage title.

## After deploy — indexing

Right now the daily GSC indexing task **cannot** push these pages through: clicking "Request Indexing" runs a live fetch that returns **Soft 404**, so the request is rejected (confirmed today on `/hyrox` and `/commercial-gym-setup-chennai`). Once the deploy lands and the pages render real content, requests will succeed. Priority order for indexing, per Ali: **hyrox, pilates, alteon category + product pages, then the city pages.**
