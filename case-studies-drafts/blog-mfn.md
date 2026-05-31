# Matrix Fight Night — Building India's Premier MMA Cage, From MFN 1 to MFN 15

**Word count: ~2,150 (target was 1,500–2,500)**
**Status: Draft v2 — facts verified against MFN official site, Wikipedia, Tapology, Sherdog, and trade press. Awaiting client quote approval from Ayesha Shroff (or Krishna Shroff — your call).**

---

## Sources used to verify facts

- [Matrix Fight Night — Wikipedia](https://en.wikipedia.org/wiki/Matrix_Fight_Night)
- [About — MFN Official site](https://www.mfnofficial.com/about/)
- [MFN 1 official event page](https://www.mfnofficial.com/mfn-1/)
- [MFN 1 — Sherdog](https://www.sherdog.com/events/MFN-1-Matrix-Fight-Night-1-88089)
- [MFN 1 — Tapology](https://www.tapology.com/fightcenter/events/59364-matrix-fight-night)
- [Ayesha & Krishna Shroff on MFN's origin — Morung Express](https://morungexpress.com/ayesha-shroff-krishna-shroff-reveal-story-behind-birth-of-matrix-fight-night-never-a-vanity-project-for-us)
- [Krishna & Ayesha Shroff, founders, MFN — Entrepreneur India](https://www.entrepreneur.com/en-in/entrepreneurs/the-fighter-duo-krishna-shroff-and-ayesha-shroff/471214)
- [MFN-Disney+Hotstar broadcast deal — LockerRoom](https://lockerroom.in/blog/view/matrix-fight-night-disney-hotstar-plus/)
- [DOME@NSCI hosts Matrix Fight Night — MediaNews4U](https://www.medianews4u.com/domensci-hosts-an-action-packed-matrix-fight-night-with-tiger-shroff-for-mma-fighters/)

---

## Integration notes for Antigravity

1. **Noscript block:** Replace `NOSCRIPT_FALLBACKS['blog-mfn']` in `scripts/generate-seo-pages.mjs` with the prose section below, wrapped in the same `<noscript>...</noscript>` / `<div style="...">` envelope as other blog noscripts.
2. **Visible blog page:** Replace the placeholder `blog-mfn` content in the SPA router (`public/assets/app.js`) with the same long-form HTML — proper `<h2>`/`<h3>`/`<p>`/`<ul>` markup. Use existing TechFit blog styling. Image slots are marked `<!-- IMAGE: ... -->`.
3. **Schema:** Replace `SCHEMAS['blog-mfn']` with the upgraded block at the end of this file (BlogPosting + FAQPage + BreadcrumbList + `about` entity references).
4. **Image fallback:** Until Ali provides photos, use `/og/og-mma.jpg` as the lead image.

---

## Article begins below

# Matrix Fight Night × TechFit: 15 Events, 3 Cages, and the Hexagon That Built India's Pathway to the UFC

When Matrix Fight Night staged its debut event at the **NSCI Dome in Mumbai on 12 March 2019**, India's MMA scene had fighters, fans, and an appetite for elite competition. What it didn't yet have was a homegrown promotion with infrastructure built to international standards, or a cage manufacturer who could build one without a 90-day ocean shipment from the United States.

Seven years later, MFN has run 17 events, sealed a broadcast partnership with Disney+Hotstar, and produced two fighters — **Anshul Jubli and Puja Tomar** — who have gone on to sign with the UFC, the global apex of mixed martial arts. TechFit was the official cage supplier for MFN 1 through MFN 15 — fifteen consecutive events, three full cage production cycles, two UFC signings, one continuous relationship.

This is the build, the design decisions, and what they tell you about commissioning a broadcast-grade MMA cage in India.

<!-- IMAGE: Hero shot of MFN cage in event-night lighting — Ali to provide -->

## The brief: a broadcast-grade Indian cage, in 45 days, ready for a sold-out NSCI Dome

MFN was founded in 2019 by **Ayesha Shroff, Krishna Shroff, and Tiger Shroff** — the three of them — after the family attended a live MMA event in 2017 and saw how badly India needed a premium promotion of its own. As Ayesha and Krishna have said in interviews, MFN was "never a vanity project." It was infrastructure to lift Indian MMA into the global conversation.

To do that, they needed a cage built to international competition standards, but built in India, on a 45-day timeline, to a budget that made the economics of a debut promotion work.

The brief they brought to TechFit was specific:
- A 30-foot fighting surface, the same nominal size as cages used at top global promotions
- Podium-mounted to elevate the action for both the live audience and camera operators
- A hexagonal layout, not octagonal — a deliberate brand and design choice that gives MFN its own broadcast silhouette
- Custom-printed canvas with MFN's logos, finished to a standard that holds up under HD broadcast cameras
- Fully portable — MFN events were planned to move between cities, so the cage had to break down, ship by road, and reinstall inside a working day
- Delivered in 45 days, with the broadcast slot already locked

That's a punishing brief for a first-time MMA cage build. For an in-country supplier with no comparable Indian precedent to lean on, it was the kind of brief that defines the next decade of your business or breaks it.

## Why a hexagon, not an octagon

Most people equate MMA cage with octagon. That's because the UFC built its brand around an eight-sided cage and trademarked the name *The Octagon*. For an India-launched promotion building its own identity, a hexagon was a deliberate decision.

A hexagonal cage is its own visual signature on broadcast — instantly distinguishable from UFC footage and from imitation circuits, which matters when you're building a brand from scratch on Disney+Hotstar and on the social feeds of every fight fan in India.

From a fight-dynamics perspective, six sides at a 30-foot diameter give fighters fewer but wider corners than an octagon at the same diameter. We engineered the hexagonal frame to the same load tolerances and impact specs as a top-level competition octagon — fence-height clearance, gauge thickness on the vinyl fencing, padding density on the post sleeves, anti-slip canvas tension. Different shape, same competition-grade structural rigor.

## The build: 45 days from steel to canvas

Production for MFN 1 ran 45 days at our Mumbai facility. Four parallel workstreams:

**Steel frame and podium substructure.** Heavy-gauge structural steel for the six corner posts and the elevated platform. The podium adds about four feet of elevation under the fighting platform, which gives camera operators clean sightlines up to the fence without spectators in the foreground. Podium-mounted cages put a larger moment load on every structural joint than a floor cage — the underframe engineering is meaningfully different — and we built the joinery accordingly.

**Vinyl fencing.** Heavy-gauge fencing tensioned across six panels at competition-spec dimensions. The fence has to be taut enough to take repeated impact, soft enough not to abrade fighters, and structurally sound across the slightly wider panel widths a hexagonal cage creates at any given diameter.

**High-density padding.** Foam padding sleeves on every post and multi-layer floor padding under the canvas. Densities matched to international competition standards — soft enough to protect fighters who land against the post, dense enough not to deform after one heavy strike.

**The canvas — the technical hurdle.** This was the hardest single element of the MFN 1 build. The brief wasn't just "print logos on a mat." It was: high-resolution, multi-color brand graphics on a competition canvas that has to remain anti-slip, manage blood and sweat without becoming hazardous, and read crisply under sports broadcast lighting. We ran multiple sample prints through MFN's brand team before locking the canvas spec. The process we settled on holds visual fidelity across multiple events, takes anti-slip surface treatments cleanly, and is broadcast-graded to the colour profile MFN's production team works with.

<!-- IMAGE: Build-in-progress at TechFit Mumbai factory — Ali to provide -->

## MFN 1: NSCI Dome, Mumbai, 9 hours to fight-ready

The MFN 1 cage installed at the **National Sports Club of India (DOME@NSCI)**, Worli, Mumbai — a venue that has hosted everything from Davis Cup tennis to UFC Fight Pass content. Seven professional fights were on the card on 12 March 2019.

Our team handled the install. That's our standard model on cages: we do not sub-contract installation, because the safety stakes are too high and the engineers who built the cage know its tolerances best.

The install ran 9 hours from venue arrival to a competition-ready cage. That includes:
- Trucking the disassembled cage into the venue
- Laying the substructure and aligning the podium platform
- Erecting the six posts and tensioning every fencing panel
- Fitting all padding sleeves and the floor padding stack
- Stretching the broadcast-graded branded canvas
- Final QA — every fence connection, every post fitting, every padding seam, signed off

Nothing went wrong on the MFN 1 install. Nothing has gone wrong on any of the 15 MFN installs since. That zero-incident track record matters more in cage construction than in almost any other equipment category — a structural failure during a televised fight is not "the next batch will be better." It is a fighter-safety incident in front of an audience.

<!-- IMAGE: Install shot — TechFit team raising the hexagonal frame at the venue — Ali to provide -->

## From social-stream to Disney+Hotstar — the broadcast bar moved during TechFit's tenure

When MFN 1 went live in 2019, the promotion streamed on its own social channels. By **MFN 7 in December 2021** — staged at the breathtaking **Taj Falaknuma Palace in Hyderabad** — MFN had signed a broadcast deal with Disney+Hotstar. Every subsequent event in TechFit's tenure ran on the OTT platform, with the broadcast and production-spec bar rising at each cycle.

For a cage manufacturer, that's a meaningful thing to live through with a client. The same cage architecture — and then its successors — had to look right under the lighting MFN's own production crew rigged for socials, and then under the lighting that an OTT-grade production team rigged for Disney+Hotstar. The canvas printing, the fence gauge, the padding finishes all had to keep up as broadcast quality demands climbed.

Across that arc, two MFN fighters made the leap most Indian MMA athletes only dream about: **Anshul Jubli** and **Puja Tomar** signed with the UFC. The TechFit-built MFN cage was the elite competitive surface that tested them on the way up.

## Three cages, 15 events: what broadcast-grade durability actually looks like

A broadcast MMA cage is a high-cycle product. It sees impact, sweat, blood, repeated assembly and disassembly, road transport between cities, and rough handling at every venue. We engineered the MFN cage for high cycles, and the operational data backs the engineering: each cage cycle handled seven MFN events before we built and shipped a fresh one.

That means across MFN 1 to MFN 15, we supplied **three cages** — not because the previous ones failed structurally, but because seven broadcast events is the point at which we recommend a fresh build to keep the cage visually and structurally pristine for TV. Retired cages don't go to scrap; they go on to second lives at academies and training facilities.

For a client commissioning their first MMA cage, this is the durability number that matters: a properly built, professionally installed, properly maintained TechFit competition cage will give you seven major broadcast events before refurbishment is worth considering. For training cages with non-broadcast use, the service life is materially longer.

## 15 events, one continuous relationship

The "three cages over fifteen events" stat is a credibility marker. The bigger story behind it is the relationship. MFN didn't shop the second build. They didn't shop the third. From MFN 1 through MFN 15, TechFit has been on speed-dial — and across every iteration the brief evolved. Venue requirements changed, broadcast specs tightened with the Hotstar deal, branding updated. Each cage incorporated lessons from the previous one.

That kind of long, iterative relationship between a fight promotion and its cage maker is rare anywhere in the world. In India, where the MMA industry is still building its institutional spine, it's how the infrastructure becomes elite — fast iteration, embedded learnings, the same engineers on the second cage and the third.

<!-- IMAGE: Event-night shot showing MFN cage with crowd and lighting — Ali to provide -->

## What this means if you're commissioning a cage

Two kinds of buyers read this case study, and TechFit serves both.

**If you're a fight promotion or event organizer**, MFN is your reference for what broadcast-grade looks like out of India. You don't need to import. You don't need to wait 90+ days for a cage to come off a ship from the United States. You don't need to manage foreign-currency invoicing and after-sales support across time zones. We built the cage that hosted India's pathway to the UFC, on a 45-day domestic timeline, with our own install team and our own structural engineers on call. The same factory and the same team is available for your event.

**If you're a club, academy, or training facility**, the MFN cage is the standard the training cages are built down from — not up to. Every cage we build, training-spec or competition-spec, uses the same structural steel grades, the same vinyl spec, the same padding densities. We adjust dimensions, finishes, and canvas printing for your budget and use case, but the underlying build is the floor of what TechFit ships, not the ceiling.

## Specifications — MFN-style cage

- **Shape:** Hexagonal (6 sides)
- **Diameter:** 30 feet (custom sizing 16 ft to 30 ft available)
- **Mount:** Podium-mounted with structural steel substructure (floor-mount available)
- **Frame:** Heavy-gauge structural steel; six corner posts with high-density foam padding sleeves
- **Fencing:** Competition-spec vinyl, tensioned across six panels
- **Padding:** High-density foam on all posts; multi-layer floor padding to international competition standards
- **Canvas:** Anti-slip competition canvas with full-area custom logo printing, broadcast-graded for TV/OTT-spec lighting
- **Manufacture time:** 45 days standard
- **Install time:** 9 hours typical, on-site by TechFit team
- **Service life:** 7+ broadcast events between cage cycles for high-frequency televised promotions; significantly longer for training use

## Client perspective

> [DRAFT QUOTE — to be approved or rewritten by Ayesha Shroff (or, equally good, Krishna Shroff) before publishing]
>
> "We have worked with TechFit from MFN 1 through MFN 15. Across fifteen events, the cage has done exactly what we needed it to — hold up to broadcast scrutiny, look right on camera, install on time, keep our fighters safe. The team at TechFit knows our brief inside out, and the build has got better with every cycle. They have been more than a vendor. They've been part of how MFN has grown."
>
> — Ayesha Shroff, Co-founder, Matrix Fight Night

**Action required before publish:** Send this quote to Ayesha Shroff (and offer Krishna Shroff the same option). Either approval, edits, or a quote in her own words. Do not publish without written confirmation — an email reply that says "approved" is enough.

## Frequently asked questions

**Who builds the MMA cages for Matrix Fight Night?**
TechFit (Techfit Health Fitness Private Limited), based in Mumbai, has been the official cage supplier for Matrix Fight Night from MFN 1 through MFN 15. Across that span, TechFit has supplied three full cage production cycles to the promotion.

**What size cage does Matrix Fight Night use?**
MFN uses a 30-foot hexagonal cage, podium-mounted, custom-built by TechFit with broadcast-grade canvas branding for Disney+Hotstar OTT broadcast.

**Why does MFN use a hexagon instead of an octagon?**
A hexagonal cage gives MFN a distinct visual identity on broadcast, separating it from UFC footage. At a 30-foot diameter the fighting surface is competition-standard size with slightly wider corner panels than an octagon. It is a deliberate brand and design choice rather than a structural shortcut.

**Where was the first MFN event held?**
MFN 1 took place at the DOME@NSCI (National Sports Club of India), Worli, Mumbai, on 12 March 2019. Seven professional fights were on the card.

**How long does it take to build a competition MMA cage in India?**
A TechFit competition cage built to MFN specification takes 45 days from brief to delivery, plus 9 hours for on-site install by the TechFit team. Smaller training-spec cages can ship faster.

**How long does a competition MMA cage last?**
A broadcast-use cage handles seven or more televised events per cycle before TechFit recommends a fresh build to keep the cage visually and structurally pristine. Training-use cages have a materially longer service life. Refurbishment is also an option for promotions extending a cage's life.

**Have any MFN fighters made it to the UFC?**
Yes. Two fighters — Anshul Jubli and Puja Tomar — have gone from competing on MFN's TechFit-built cage to UFC contracts.

---

## CTA

Commissioning a competition or training cage, or planning a fight event in India? **[Get a quote from TechFit →](/get-a-quote)** — design consult, dimensions, branding, install timeline, and AMC all in one conversation.

Related: [MMA Cages and Boxing Rings — TechFit India](/mma-cages) · [Why TechFit vs USI/Cosco for combat-sports infrastructure](/alternatives/usi-cosco-techfit-cages) · [Super Fight League case study](/blog-sfl) · [Kumite 1 League case study](/blog-kumite) · [MMA Matrix gym network case study](/blog-mma-matrix)

---

## Updated BlogPosting schema (replace existing in `SCHEMAS['blog-mfn']`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://www.techfittech.com/blog-mfn#article",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.techfittech.com/blog-mfn" },
      "headline": "Matrix Fight Night × TechFit: 15 Events, 3 Cages, and the Hexagon That Built India's Pathway to the UFC",
      "description": "How TechFit became the official cage supplier for Matrix Fight Night from MFN 1 (NSCI Dome, Mumbai, 12 March 2019) through MFN 15 — building broadcast-grade hexagonal MMA cages, podium-mounted, 30-ft, in 45 days, installed in 9 hours, from a Mumbai factory.",
      "image": "https://www.techfittech.com/og/og-mma.jpg",
      "datePublished": "2025-06-15",
      "dateModified": "2026-05-28",
      "wordCount": 2150,
      "keywords": "Matrix Fight Night cage, MFN cage manufacturer, hexagonal MMA cage India, broadcast MMA cage, MFN Disney Hotstar cage, MFN NSCI Mumbai, competition cage Mumbai, podium MMA cage India, Anshul Jubli UFC, Puja Tomar UFC, MFN supplier TechFit",
      "author": { "@type": "Organization", "@id": "https://www.techfittech.com/#organization" },
      "publisher": {
        "@type": "Organization",
        "name": "TechFit",
        "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
      },
      "about": [
        { "@type": "Organization", "name": "Matrix Fight Night", "sameAs": "https://www.mfnofficial.com/" },
        { "@type": "Thing", "name": "MMA cage construction India" },
        { "@type": "Thing", "name": "Broadcast combat sports infrastructure" },
        { "@type": "Person", "name": "Ayesha Shroff" },
        { "@type": "Person", "name": "Krishna Shroff" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Who builds the MMA cages for Matrix Fight Night?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit (Techfit Health Fitness Private Limited), based in Mumbai, has been the official cage supplier for Matrix Fight Night from MFN 1 through MFN 15. Across that span, TechFit has supplied three full cage production cycles to the promotion." } },
        { "@type": "Question", "name": "What size cage does Matrix Fight Night use?", "acceptedAnswer": { "@type": "Answer", "text": "MFN uses a 30-foot hexagonal cage, podium-mounted, custom-built by TechFit with broadcast-grade canvas branding for Disney+Hotstar OTT broadcast." } },
        { "@type": "Question", "name": "Why does MFN use a hexagon instead of an octagon?", "acceptedAnswer": { "@type": "Answer", "text": "A hexagonal cage gives MFN a distinct visual identity on broadcast, separating it from UFC footage. At a 30-foot diameter the fighting surface is competition-standard size with slightly wider corner panels than an octagon. It is a deliberate brand and design choice." } },
        { "@type": "Question", "name": "Where was the first MFN event held?", "acceptedAnswer": { "@type": "Answer", "text": "MFN 1 took place at the DOME@NSCI (National Sports Club of India), Worli, Mumbai, on 12 March 2019, with seven professional fights on the card." } },
        { "@type": "Question", "name": "How long does it take to build a competition MMA cage in India?", "acceptedAnswer": { "@type": "Answer", "text": "A TechFit competition cage built to MFN specification takes 45 days from brief to delivery, plus 9 hours for on-site install by the TechFit team." } },
        { "@type": "Question", "name": "How long does a competition MMA cage last?", "acceptedAnswer": { "@type": "Answer", "text": "A broadcast-use cage handles seven or more televised events per cycle before TechFit recommends a fresh build. Training-use cages have a materially longer service life." } },
        { "@type": "Question", "name": "Have any MFN fighters made it to the UFC?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Anshul Jubli and Puja Tomar have both gone from competing on MFN's TechFit-built cage to UFC contracts." } }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.techfittech.com/blogs" },
        { "@type": "ListItem", "position": 3, "name": "Matrix Fight Night Case Study", "item": "https://www.techfittech.com/blog-mfn" }
      ]
    }
  ]
}
```

---

## Pre-publish checklist (for Ali)

- [ ] Confirm the **15-event tenure** is the right framing (i.e., your relationship with MFN concluded at MFN 15, or is ongoing and MFN 16 & 17 used a different supplier — this changes one or two phrasings).
- [ ] Confirm we can name **Anshul Jubli** and **Puja Tomar** as UFC-signed alumni in connection with MFN — both are publicly documented but worth a sanity check.
- [ ] Send the **draft Ayesha Shroff quote** to Ayesha (and offer Krishna). Get written approval / replacement quote / edits before publishing. Even a "yes, approved" email is enough.
- [ ] Provide **5 photos**: hero, build-in-progress, install at venue, two event-night shots. Use only your own photos or photos MFN's marketing team gives you in writing. Do **not** lift from Disney+Hotstar broadcasts or social posts — that footage is copyright Hotstar/MFN.
- [ ] Sanity-check the **broadcast progression narrative** (own socials early → Disney+Hotstar from MFN 7). If you know MFN ran on any other platform between MFN 1 and MFN 7 (e.g., a regional sports channel), tell me and I'll update.
- [ ] If you have a verified MFN viewership stat (Disney+Hotstar concurrent viewers, total reach), drop it into the intro for one more credibility hook.

---

## Sources

- [Matrix Fight Night — Wikipedia](https://en.wikipedia.org/wiki/Matrix_Fight_Night)
- [About — MFN Official](https://www.mfnofficial.com/about/)
- [MFN 1 — MFN Official](https://www.mfnofficial.com/mfn-1/)
- [MFN 1 — Sherdog](https://www.sherdog.com/events/MFN-1-Matrix-Fight-Night-1-88089)
- [MFN 1 — Tapology](https://www.tapology.com/fightcenter/events/59364-matrix-fight-night)
- [Ayesha & Krishna Shroff on MFN's origin — Morung Express](https://morungexpress.com/ayesha-shroff-krishna-shroff-reveal-story-behind-birth-of-matrix-fight-night-never-a-vanity-project-for-us)
- [The Fighter Duo: Krishna and Ayesha Shroff — Entrepreneur India](https://www.entrepreneur.com/en-in/entrepreneurs/the-fighter-duo-krishna-shroff-and-ayesha-shroff/471214)
- [MFN ↔ Disney+Hotstar broadcast deal — LockerRoom](https://lockerroom.in/blog/view/matrix-fight-night-disney-hotstar-plus/)
- [DOME@NSCI hosts MFN — MediaNews4U](https://www.medianews4u.com/domensci-hosts-an-action-packed-matrix-fight-night-with-tiger-shroff-for-mma-fighters/)
