# TechFit SEO Action Plan
_Prepared 9 July 2026 · techfittech.com_

## The honest diagnosis

Your **on-page SEO is already strong** — 200+ pages, keyword-targeted titles, dedicated product pages (MMA cages, rigs, free weights, padel), a deep Alteon catalog, JSON-LD schema, sitemaps, and programmatic city/comparison pages. This is better than almost every competitor ranking above you.

So the reason you aren't ranking is **NOT** missing pages. It's three off-page/technical factors:

1. **The domain is new (~2 months) with almost no authority.** Google hasn't learned to trust it yet.
2. **Most of your 200+ pages aren't indexed.** A `site:techfittech.com` check shows Google has crawled only a handful. Pages Google hasn't indexed cannot rank.
3. **Almost no backlinks, and no Google Business Profile / directory listings** — so you're invisible in the Maps pack and "near me" searches.

Realistic timeline: local + long-tail terms can improve in **2–6 weeks**; competitive head terms ("mma cage supplier india", "commercial gym equipment") take **3–6 months** of authority-building. There is no shortcut, but the steps below are the fastest legitimate path.

---

## Code fixes already made (this session)

Two real bugs were fixed in the source. **Rebuild + deploy from Antigravity to make them live.**

- **42 truncated `<title>` tags fixed.** The build generator (`scripts/generate-seo-pages.mjs`) was emitting titles that ended in "…" (e.g. raw MMA page title was *"…TechFit — Manufacturer &…"*). These now match the full titles already in `app.js`.
- **12 missing H1s fixed.** Your main pages (MMA cages, CrossFit rigs, free weights, padel, aqua, flooring, services, wellness, about, blogs, etc.) used `<h2>` for their hero heading, so they had **no `<h1>` at all**. Each hero is now a proper `<h1>` and picks up the intended `.phero h1` styling.

Backups saved (outputs folder): `generate-seo-pages.BACKUP.mjs`, `app.js.BACKUP`.

**Deploy:** run your normal `npm run build` in Antigravity, watch that `validate-schemas.mjs` passes, then push/deploy to Vercel as usual. After deploy, spot-check `techfittech.com/mma-cages` — it should now show a visible H1.

---

## Priority 1 — Get indexed (this week, free, biggest lever)

- [ ] **Verify the domain in Google Search Console** (search.google.com/search-console). Without this you're flying blind.
- [ ] **Submit all three sitemaps** in GSC: `sitemap.xml`, `sitemap-pages.xml`, `sitemap-images.xml`.
- [ ] In GSC → **Pages** report, read the "Why pages aren't indexed" reasons (esp. *"Discovered – currently not indexed"* and *"Crawled – currently not indexed"* — both common on new sites).
- [ ] Use **URL Inspection → Request Indexing** on your ~15 money pages first: home, `/mma-cages`, `/crossfit-rigs`, `/free-weights`, `/techfit`, `/alteon`, `/bh-fitness`, `/tunturi`, `/california-fitness`, `/commercial-gym-setup-mumbai`, `/for-hotels`, `/for-developers`, `/gym-flooring`, `/padel-pickleball`, `/services`.
- [ ] Also verify in **Bing Webmaster Tools** (fast, and feeds ChatGPT/Copilot search).

## Priority 2 — Google Business Profile + directories (this week, fastest visibility win)

This is what puts you in the Maps pack and "near me" results, where competitors currently beat you.

- [ ] **Create/claim a Google Business Profile** (business.google.com). Category: *Sports equipment manufacturer* (add *Gym equipment supplier*). Use the Reay Road, Darukhana address + `+91 98201 66910` + website. Add 10+ real photos of cages/rigs/installs, list services, and post updates.
- [ ] List on the directories that rank for your exact terms (each is also a citation + backlink):
  - [ ] **Justdial** (competitors rank here for "mma cage manufacturer mumbai")
  - [ ] **IndiaMART** (huge for "commercial gym equipment supplier")
  - [ ] **TradeIndia**
  - [ ] **Sulekha**
  - [ ] **Fundoodata / Aajjo** (B2B)
- [ ] Keep **NAP (Name, Address, Phone) identical** everywhere — inconsistency dilutes local ranking.

## Priority 3 — Backlinks & authority (ongoing, the real long-term fix)

You have a genuine edge here that competitors can't fake: real marquee relationships. Turn each into a link.

- [ ] **Official cage/ring builder credits** — ask Matrix Fight Night, Super Fight League, Kumite 1 to credit + link techfittech.com on their event/partner pages.
- [ ] **Client links** — MMA Matrix (Tiger Shroff), Cloud 9 Gyms, S Raheja Group: ask for a "gym by TechFit" link/logo on their sites.
- [ ] **Brand distributor pages** — ask BH Fitness, Tunturi, California Fitness, Alteon to list TechFit as their India distributor/reseller **with a link** (authoritative, topically relevant).
- [ ] **PR / press** — pitch the "official cage builder for India's biggest MMA promotions" angle to sports/fitness media; each article with a link compounds.
- [ ] **Celebrity/venue angle** — Google offices, Tiger Shroff gym, fight nights are all newsworthy hooks.

## Priority 4 — On-page polish (optional; smaller impact)

- [ ] **Add money pages to the main Products nav.** Right now the top nav's Products menu links only the reseller brands; MMA cages, rigs, free weights, padel and aqua are reachable only via the homepage/`/techfit`. Adding them to the nav strengthens internal linking + crawl priority. _(Left as a recommendation — nav layout edits carry visual risk, so best done deliberately.)_
- [ ] **Keep publishing case studies** (the MFN/SFL/Kumite/MMA-Matrix blogs are excellent — do more, and interlink them to the relevant product pages).

## What to track

Check **GSC → Performance** weekly. Success first shows as **rising impressions and average position** (e.g. position 40 → 25 → 12) before you see clicks. That upward drift is the signal the strategy is working — well before you hit page one.
