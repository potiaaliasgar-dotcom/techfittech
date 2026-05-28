#!/usr/bin/env node
/**
 * generate-seo-pages.mjs
 * 
 * Reads the root index.html and generates route-specific copies
 * with correct <title>, meta description, canonical, OG and Twitter tags.
 * 
 * Also statically injects route-specific JSON-LD schemas directly into the <head>
 * at build-time to ensure search engines receive complete schemas without executing JS.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'index.html');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

const BASE = 'https://www.techfittech.com';
const DEFAULT_OG_IMG = BASE + '/og-image.jpg';

const SEO_MAP = {
  'alteon': {
    title: 'Alteon Wellness & Recovery | Hyperbaric, Cryotherapy, Red-Light Therapy India',
    desc: 'Alteon by TechFit — premium wellness and recovery technology. Hyperbaric oxygen chambers, cryotherapy, red-light therapy, dry-float, IHHT and more for clinics, hotels and gyms.',
    h1: 'Alteon Wellness & Recovery Technology India',
    lastmod: '2026-05-24',
    img: DEFAULT_OG_IMG
  },
  'bh-fitness': {
    title: 'BH Fitness India | Authorised Distributor — Treadmills, Bikes, Ellipticals',
    desc: 'TechFit is the authorised distributor of BH Fitness commercial gym equipment in India. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',
    h1: 'BH Fitness India | Authorised Distributor — Treadmills, Bikes, Ellipticals',
    lastmod: '2026-05-25',
    img: DEFAULT_OG_IMG
  },
  'tunturi': {
    title: 'Tunturi India | Authorised Distributor — Nordic Fitness Equipment',
    desc: 'TechFit is the authorised distributor of Tunturi fitness equipment in India. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',
    h1: 'Tunturi India | Authorised Distributor — Nordic Fitness Equipment',
    lastmod: '2026-05-22',
    img: DEFAULT_OG_IMG
  },
  'california-fitness': {
    title: 'California Fitness India | Authorised Distributor — Commercial Gym Equipment',
    desc: 'TechFit is the authorised distributor of California Fitness in India. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',
    h1: 'California Fitness India | Authorised Distributor — Gym Equipment',
    lastmod: '2026-05-20',
    img: DEFAULT_OG_IMG
  },
  'techfit': {
    title: 'TechFit Active | In-House Gym & Sports Equipment Manufacturer India',
    desc: "TechFit Active — India's in-house manufacturer of MMA cages, boxing rings, CrossFit rigs, free weights, padel courts and aqua fitness equipment. Factory in Mumbai.",
    h1: 'TechFit Active | Gym & Sports Equipment Manufacturer India',
    lastmod: '2026-05-26',
    img: DEFAULT_OG_IMG
  },
  'mma-cages': {
    title: 'MMA Cages & Boxing Rings India | TechFit — Manufacturer & Supplier',
    desc: 'Competition and training MMA octagons, floor cages, podium cages and boxing rings by TechFit. Trusted by Matrix Fight Night, Super Fight League and Kumite 1.',
    h1: 'MMA Cages & Boxing Rings India | TechFit Manufacturer',
    lastmod: '2026-05-27',
    img: DEFAULT_OG_IMG
  },
  'crossfit-rigs': {
    title: 'CrossFit Rigs & Functional Training India | TechFit Manufacturer',
    desc: 'Custom CrossFit rigs, wall-mounted pull-up systems, calisthenics structures and modular functional-training rigs. Designed and manufactured by TechFit in Mumbai.',
    h1: 'CrossFit Rigs & Functional Training India | TechFit Manufacturer',
    lastmod: '2026-05-26',
    img: DEFAULT_OG_IMG
  },
  'free-weights': {
    title: 'Free Weights & Strength Equipment India | TechFit Manufacturer',
    desc: 'Olympic barbells, rubber-coated dumbbells, bumper plates, power racks, squat stands and deadlift platforms. Manufactured in India by TechFit.',
    h1: 'Free Weights & Strength Equipment India | TechFit Manufacturer',
    lastmod: '2026-05-25',
    img: DEFAULT_OG_IMG
  },
  'padel-pickleball': {
    title: 'Padel & Pickleball Courts India | TechFit — Design, Build & Install',
    desc: 'End-to-end padel and pickleball court construction in India. Design, fabrication and installation for clubs, resorts, housing societies and corporate campuses.',
    h1: 'Padel & Pickleball Court Construction India | TechFit',
    lastmod: '2026-05-24',
    img: DEFAULT_OG_IMG
  },
  'aqua': {
    title: 'Aqua Fitness & Underwater Treadmills India | TechFit',
    desc: 'Underwater treadmills, aqua therapy pools and aqua fitness equipment by TechFit. Designed for physiotherapy clinics, hotels, wellness centres and rehabilitation facilities.',
    h1: 'Aqua Fitness & Underwater Treadmills India | TechFit',
    lastmod: '2026-05-23',
    img: DEFAULT_OG_IMG
  },
  'wellness-solutions': {
    title: 'Wellness Solutions India | TechFit — Recovery, Longevity & Spa Equipment',
    desc: 'Complete wellness solutions by TechFit — from hyperbaric chambers and cryotherapy to infrared saunas and float pods. Turnkey wellness infrastructure for hotels, clinics and gyms.',
    h1: 'Wellness Solutions India | TechFit Recovery & Longevity',
    lastmod: '2026-05-27',
    img: DEFAULT_OG_IMG
  },
  'services': {
    title: 'Gym & Wellness Services India | TechFit — Design, Install, AMC',
    desc: 'TechFit services — gym design consultation, equipment supply, installation, flooring, AMC and after-sales support. Full turnkey solutions across India.',
    h1: 'Gym & Wellness Setup Services India | TechFit',
    lastmod: '2026-05-27',
    img: DEFAULT_OG_IMG
  },
  'about': {
    title: "About TechFit | India's Premier Gym & Sports Infrastructure Company",
    desc: "Founded in Mumbai, TechFit is India's leading gym, wellness and sports infrastructure company. Learn about our story, leadership, manufacturing facility and vision.",
    h1: "About TechFit | India's Premier Gym & Sports Infrastructure Company",
    lastmod: '2026-05-20',
    img: DEFAULT_OG_IMG
  },
  'contact': {
    title: 'Contact TechFit | Get a Free Gym & Wellness Consultation',
    desc: 'Get in touch with TechFit for a free gym setup consultation. Call +91 98201 66910 or visit us at 309 Boat Hard Rd, Darukhana, Byculla, Mumbai 400010.',
    h1: 'Contact TechFit | Get a Free Gym & Wellness Consultation',
    lastmod: '2026-05-28',
    img: DEFAULT_OG_IMG
  },
  'for-gyms': {
    title: 'Gym & Studio Setup India | TechFit — Equipment, Design & Installation',
    desc: 'Complete gym and studio setup solutions by TechFit. From equipment selection to layout design, flooring and installation — get your gym running fast.',
    h1: 'Gym & Studio Setup India | TechFit Turnkey Solutions',
    lastmod: '2026-05-24',
    img: DEFAULT_OG_IMG
  },
  'for-developers': {
    title: 'Real-Estate Developer Gym Amenities India | TechFit',
    desc: "Premium gym and wellness amenities for residential and commercial real-estate developers. TechFit partners with India's top builders for world-class fitness infrastructure.",
    h1: 'Real-Estate Developer Gym Amenities India | TechFit',
    lastmod: '2026-05-24',
    img: DEFAULT_OG_IMG
  },
  'for-schools': {
    title: 'School & Institution Fitness Setup India | TechFit',
    desc: 'Safe, age-appropriate fitness equipment and sports infrastructure for schools, colleges and institutions. Designed and supplied by TechFit across India.',
    h1: 'School & Institution Fitness Setup India | TechFit',
    lastmod: '2026-05-22',
    img: DEFAULT_OG_IMG
  },
  'for-hotels': {
    title: 'Hotel Gym & Wellness Setup India | TechFit',
    desc: 'Turnkey hotel gym and wellness solutions. Premium equipment from BH Fitness, Tunturi and California Fitness — plus spa, recovery and Alteon wellness technology.',
    h1: 'Hotel Gym & Wellness Setup India | TechFit',
    lastmod: '2026-05-24',
    img: DEFAULT_OG_IMG
  },
  'blogs': {
    title: 'TechFit Blog | Gym, Wellness & Sports Industry Insights India',
    desc: "Industry insights, case studies and news from TechFit — India's leading gym, wellness and sports infrastructure company.",
    h1: 'TechFit Blog | Gym, Wellness & Sports Industry Insights India',
    lastmod: '2026-05-28',
    img: DEFAULT_OG_IMG
  },
  'blog-mfn': {
    title: 'Matrix Fight Night — MMA Cage by TechFit | Case Study',
    desc: "How TechFit designed and built the competition-grade MMA octagon for Matrix Fight Night — India's premier mixed martial arts promotion.",
    h1: 'Matrix Fight Night — MMA Cage by TechFit | Case Study',
    lastmod: '2026-02-10',
    img: DEFAULT_OG_IMG
  },
  'blog-sfl': {
    title: 'Super Fight League — MMA Cage by TechFit | Case Study',
    desc: "TechFit manufactured the professional MMA cage for Super Fight League, one of India's biggest combat sports events.",
    h1: 'Super Fight League — MMA Cage by TechFit | Case Study',
    lastmod: '2026-03-01',
    img: DEFAULT_OG_IMG
  },
  'blog-kumite': {
    title: "Kumite 1 League — Boxing Ring by TechFit | Case Study",
    desc: "TechFit built the competition boxing ring for Kumite 1 League, India's high-profile combat sports league.",
    h1: 'Kumite 1 League — Boxing Ring by TechFit | Case Study',
    lastmod: '2026-03-15',
    img: DEFAULT_OG_IMG
  },
  'blog-mma-matrix': {
    title: "MMA Matrix — Tiger Shroff's Gym by TechFit | Case Study",
    desc: "TechFit designed and equipped MMA Matrix — Bollywood actor Tiger Shroff's signature mixed martial arts training gym.",
    h1: "MMA Matrix — Tiger Shroff's Gym by TechFit | Case Study",
    lastmod: '2026-04-05',
    img: DEFAULT_OG_IMG
  },
  'blog-one-stop': {
    title: 'One-Stop Gym Infrastructure — TechFit Advantage | Blog',
    desc: 'Why TechFit is the one-stop solution for all gym infrastructure needs — from equipment and flooring to design, installation and maintenance.',
    h1: 'One-Stop Gym Infrastructure — TechFit Advantage',
    lastmod: '2026-05-01',
    img: DEFAULT_OG_IMG
  },
  'blog-wellness-boom': {
    title: "India's Wellness Boom — Alteon & Recovery Tech | Blog",
    desc: "Exploring India's growing wellness and longevity market, and how Alteon recovery technology is leading the charge.",
    h1: "India's Wellness Boom — Alteon & Recovery Tech",
    lastmod: '2026-05-15',
    img: DEFAULT_OG_IMG
  },
  'gym-flooring': {
    title: 'Gym Flooring India | TechFit — Rubber, Turf & Interlocking Tiles',
    desc: 'Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf and shock-absorbent mats. Supplied and installed by TechFit across India.',
    h1: 'Gym Flooring India | TechFit Rubber & Turf Solutions',
    lastmod: '2026-05-25',
    img: DEFAULT_OG_IMG
  },
  'flooring': {
    title: 'Gym Flooring India | TechFit — Rubber, Turf & Interlocking Tiles',
    desc: 'Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf and shock-absorbent mats. Supplied and installed by TechFit across India.',
    h1: 'Gym Flooring India | TechFit Rubber & Turf Solutions',
    lastmod: '2026-05-25',
    img: DEFAULT_OG_IMG
  },
  'get-a-quote': {
    title: 'Get a Free Gym & Wellness Consultation | TechFit India',
    desc: 'Get in touch with TechFit for a free gym setup consultation. Call +91 98201 66910 or visit us at 309 Boat Hard Rd, Darukhana, Byculla, Mumbai 400010.',
    h1: 'Get a Free Gym & Wellness Consultation | TechFit India',
    lastmod: '2026-05-28',
    img: DEFAULT_OG_IMG
  },
  'thank-you': {
    title: 'Thank You for Your Enquiry | TechFit India',
    desc: 'Thank you for contacting TechFit. We have received your inquiry and our team will get in touch with you shortly.',
    h1: 'Thank You for Your Enquiry | TechFit India',
    lastmod: '2026-05-28',
    img: DEFAULT_OG_IMG,
    noindex: true
  },
  'privacy-policy': {
    title: 'Privacy Policy | TechFit India',
    desc: 'Read the privacy policy of Techfit Health Fitness Private Limited. Learn how we collect, use, and protect your information.',
    h1: 'Privacy Policy | TechFit India',
    lastmod: '2026-05-28',
    img: DEFAULT_OG_IMG,
    noindex: true
  },
  'terms-of-service': {
    title: 'Terms of Service | TechFit India',
    desc: 'Read the terms of service governing TechFit supply, custom fabrication, and equipment installation in India.',
    h1: 'Terms of Service | TechFit India',
    lastmod: '2026-05-28',
    img: DEFAULT_OG_IMG,
    noindex: true
  }
};

// ==========================================
// STATICALLY PRE-RENDERED JSON-LD SCHEMAS
// ==========================================
const SCHEMAS = {
  'mma-cages': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/mma-cages#webpage",
        "url": "https://www.techfittech.com/mma-cages",
        "name": "MMA Cages & Boxing Rings — TechFit India",
        "description": "India's leading manufacturer of professional MMA cages, UFC-style octagons, floor cages, podium cages, and competition boxing rings. Custom sizes 16ft–30ft. Official supplier to Matrix Fight Night, Super Fight League, and Kumite 1 League."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Who manufactures MMA cages in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit is India's leading manufacturer of professional MMA cages, UFC-style octagons, and boxing rings, based in Mumbai. They supply MMA cages to gyms, academies, and professional fight promotions across India." } },
          { "@type": "Question", "name": "Who are the best MMA cage manufacturers in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit (Techfit Health Fitness Private Limited), based in Mumbai, is widely regarded as one of India's best MMA cage manufacturers. They are the official cage supplier for Matrix Fight Night (MFN), Super Fight League (SFL), and Kumite 1 League, India's top MMA promotions." } },
          { "@type": "Question", "name": "Who supplies UFC-style octagons in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit manufactures and supplies UFC-style octagon cages in India, including floor-mounted and elevated podium configurations. They build to custom sizes from 16ft to 30ft for training academies and professional events." } },
          { "@type": "Question", "name": "Who makes boxing rings in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit manufactures professional boxing rings in India — both training-grade rings for academies and competition-grade rings for tournaments and events. Based in Mumbai with pan-India delivery." } }
        ]
      },
      {
        "@type": "Product",
        "name": "TechFit MMA Cage — Professional Series",
        "description": "Custom-manufactured MMA cages and boxing rings for training academies and professional events. Floor-mount, podium/elevated, and hexagon configurations. Sizes from 16ft to 30ft. 4mm+ heavy-gauge steel, anti-slip canvas, high-density foam padding.",
        "brand": { "@type": "Brand", "name": "TechFit" },
        "offers": { "@type": "Offer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.techfittech.com/get-a-quote", "seller": { "@type": "Organization", "name": "TechFit" } }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "MMA Cages", "item": "https://www.techfittech.com/mma-cages" }
        ]
      }
    ]
  },
  'crossfit-rigs': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/crossfit-rigs#webpage",
        "url": "https://www.techfittech.com/crossfit-rigs",
        "name": "Modular CrossFit Rigs & Racks Manufacturer India — TechFit",
        "description": "India's premier manufacturer of commercial-grade modular CrossFit rigs, wall-mounted rigs, freestanding functional training systems, calisthenics rigs, and power racks. 11-gauge structural steel."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Who manufactures CrossFit rigs in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit manufactures heavy-duty modular CrossFit rigs and racks in India, based in Mumbai. They use 11-gauge structural steel and provide custom solutions with pan-India delivery." } },
          { "@type": "Question", "name": "CrossFit rig manufacturer India", "acceptedAnswer": { "@type": "Answer", "text": "TechFit is the top CrossFit rig manufacturer in India, supplying modular functional training rigs for commercial gyms, CrossFit boxes, hotels, and sports academies." } }
        ]
      },
      {
        "@type": "Product",
        "name": "TechFit Modular CrossFit Rig — Commercial Series",
        "description": "Heavy-duty modular CrossFit rigs constructed from 11-gauge structural steel. Compatible with J-Cups, spotter arms, dip bars, landmines, and wall ball targets.",
        "brand": { "@type": "Brand", "name": "TechFit" },
        "offers": { "@type": "Offer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.techfittech.com/get-a-quote", "seller": { "@type": "Organization", "name": "TechFit" } }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "CrossFit Rigs", "item": "https://www.techfittech.com/crossfit-rigs" }
        ]
      }
    ]
  },
  'free-weights': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/free-weights#webpage",
        "url": "https://www.techfittech.com/free-weights",
        "name": "Commercial Free Weights & Dumbbells Manufacturer India — TechFit",
        "description": "TechFit manufactures professional-grade commercial free weights in India: rubber hex dumbbells, Olympic bumper plates, Olympic barbells, power cages, and deadlift platforms."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Who manufactures dumbbells in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit manufactures commercial-grade rubber hex dumbbells in India (sizes 2.5kg to 50kg), featuring drop-forged handles and premium knurling for ultimate durability." } },
          { "@type": "Question", "name": "Olympic barbell manufacturer India", "acceptedAnswer": { "@type": "Answer", "text": "TechFit manufactures commercial Olympic barbells in India, including 20kg men's and 15kg women's bars rated to 700kg+ with needle bearings and hard chrome finishes." } }
        ]
      },
      {
        "@type": "Product",
        "name": "TechFit Commercial Free Weights Package",
        "description": "High-durability commercial free weight packages including knurled Olympic barbells, high-impact virgin rubber bumper plates, custom rubber hex dumbbells, power racks, and platforms.",
        "brand": { "@type": "Brand", "name": "TechFit" },
        "offers": { "@type": "Offer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.techfittech.com/get-a-quote", "seller": { "@type": "Organization", "name": "TechFit" } }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Free Weights", "item": "https://www.techfittech.com/free-weights" }
        ]
      }
    ]
  },
  'padel-pickleball': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/padel-pickleball#webpage",
        "url": "https://www.techfittech.com/padel-pickleball",
        "name": "Turnkey Padel Court Builder & Construction India — TechFit",
        "description": "TechFit designs and constructs professional, ITF-compliant panoramic padel courts and pickleball courts across India. High-wind structural framing, panoramic glass, and turf."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Best padel court builder India", "acceptedAnswer": { "@type": "Answer", "text": "TechFit is India's leading padel court builder, providing complete turnkey construction from site assessment, civil works, steel framing, panoramic glass installation, turf, and LED lighting." } },
          { "@type": "Question", "name": "Pickleball court construction India", "acceptedAnswer": { "@type": "Answer", "text": "TechFit builds indoor and outdoor pickleball courts in India, including surface coating, net installation, and fencing." } }
        ]
      },
      {
        "@type": "Product",
        "name": "TechFit Turnkey Padel Court Installation",
        "description": "ITF-compliant panoramic padel court construction featuring structural high-gauge steel columns, tempered safety glass, monofilament padel turf, and LED lighting.",
        "brand": { "@type": "Brand", "name": "TechFit" },
        "offers": { "@type": "Offer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.techfittech.com/get-a-quote", "seller": { "@type": "Organization", "name": "TechFit" } }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Padel & Pickleball", "item": "https://www.techfittech.com/padel-pickleball" }
        ]
      }
    ]
  },
  'aqua': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/aqua#webpage",
        "url": "https://www.techfittech.com/aqua",
        "name": "SS316 Underwater Treadmills & Aqua Fitness Equipment India — TechFit",
        "description": "TechFit is India's premier supplier of SS316 marine-grade aqua fitness equipment: underwater treadmills, aqua bikes, and aqua moon walkers for hydrotherapy, sports rehabilitation, and hotels."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Underwater treadmill supplier India", "acceptedAnswer": { "@type": "Answer", "text": "TechFit supplies premium SS316 marine-grade underwater treadmills in India for hotel pools, rehabilitation centres, physiotherapy clinics, and home pools." } },
          { "@type": "Question", "name": "Aqua fitness equipment India", "acceptedAnswer": { "@type": "Answer", "text": "TechFit's Aqua Series includes marine-grade underwater treadmills, underwater spin exercise bikes, and aqua moon walkers." } }
        ]
      },
      {
        "@type": "Product",
        "name": "TechFit Aqua Treadmill — SS316 Series",
        "description": "SS316 marine-grade rust-resistant underwater treadmill with manual belt operation, shock-absorbing belt design, and 160kg user capacity.",
        "brand": { "@type": "Brand", "name": "TechFit" },
        "offers": { "@type": "Offer", "priceCurrency": "INR", "availability": "https://schema.org/InStock", "url": "https://www.techfittech.com/get-a-quote", "seller": { "@type": "Organization", "name": "TechFit" } }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Aqua Fitness", "item": "https://www.techfittech.com/aqua" }
        ]
      }
    ]
  },
  'gym-flooring': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/gym-flooring#webpage",
        "url": "https://www.techfittech.com/gym-flooring",
        "name": "Gym Flooring India | TechFit",
        "description": "Professional rubber tiles, interlocking flooring, synthetic turf, and shock-absorbing rubber rolls for commercial gym fitouts and weight rooms in India."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Gym Flooring", "item": "https://www.techfittech.com/gym-flooring" }
        ]
      }
    ]
  },
  'flooring': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/flooring#webpage",
        "url": "https://www.techfittech.com/flooring",
        "name": "Gym Flooring India | TechFit",
        "description": "Professional rubber tiles, interlocking flooring, synthetic turf, and shock-absorbing rubber rolls for commercial gym fitouts and weight rooms in India."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Gym Flooring", "item": "https://www.techfittech.com/flooring" }
        ]
      }
    ]
  },
  'bh-fitness': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/bh-fitness#webpage",
        "url": "https://www.techfittech.com/bh-fitness",
        "name": "BH Fitness India | Authorised Distributor — TechFit",
        "description": "Authorized India distributor of BH Fitness commercial gym equipment. Treadmills, exercise spin bikes, ellipticals, and strength machines."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "BH Fitness", "item": "https://www.techfittech.com/bh-fitness" }
        ]
      }
    ]
  },
  'tunturi': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/tunturi#webpage",
        "url": "https://www.techfittech.com/tunturi",
        "name": "Tunturi India | Authorised Distributor — TechFit",
        "description": "Authorized India distributor of Tunturi Finnish fitness equipment. Cardio, strength and functional training gears for commercial gym setups."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Tunturi", "item": "https://www.techfittech.com/tunturi" }
        ]
      }
    ]
  },
  'california-fitness': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/california-fitness#webpage",
        "url": "https://www.techfittech.com/california-fitness",
        "name": "California Fitness India | Authorised Distributor — TechFit",
        "description": "Authorized India distributor of California Fitness commercial gym equipment. Heavy-duty cardio, strength platforms, and functional accessories."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "California Fitness", "item": "https://www.techfittech.com/california-fitness" }
        ]
      }
    ]
  },
  'alteon': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/alteon#webpage",
        "url": "https://www.techfittech.com/alteon",
        "name": "Alteon Wellness & Recovery Technology India — TechFit",
        "description": "Authorized supplier of Alteon Wellness biohacking and longevity technology: Cryotherapy, hyperbaric oxygen chambers, red light therapy, IHHT and float pods."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Alteon Wellness", "item": "https://www.techfittech.com/alteon" }
        ]
      }
    ]
  },
  'wellness-solutions': {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.techfittech.com/wellness-solutions#webpage",
        "url": "https://www.techfittech.com/wellness-solutions",
        "name": "Wellness Solutions India | TechFit",
        "description": "End-to-end luxury wellness, spa, and recovery suite design and fitout solutions. Authorised supplier for Alteon Wellness chambers."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Wellness Solutions", "item": "https://www.techfittech.com/wellness-solutions" }
        ]
      }
    ]
  },
  'blog-mfn': {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.techfittech.com/blog-mfn"
    },
    "headline": "Matrix Fight Night — MMA Cage by TechFit | Case Study",
    "description": "How TechFit designed and built the competition-grade MMA octagon for Matrix Fight Night — India's premier mixed martial arts promotion.",
    "image": "https://www.techfittech.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" },
    "publisher": {
      "@type": "Organization",
      "name": "TechFit",
      "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
    },
    "datePublished": "2025-06-15",
    "dateModified": "2026-02-10"
  },
  'blog-sfl': {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.techfittech.com/blog-sfl"
    },
    "headline": "Super Fight League — MMA Cage by TechFit | Case Study",
    "description": "TechFit manufactured the professional MMA cage for Super Fight League, one of India's biggest combat sports events.",
    "image": "https://www.techfittech.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" },
    "publisher": {
      "@type": "Organization",
      "name": "TechFit",
      "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
    },
    "datePublished": "2025-08-22",
    "dateModified": "2026-03-01"
  },
  'blog-kumite': {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.techfittech.com/blog-kumite"
    },
    "headline": "Kumite 1 League — Boxing Ring by TechFit | Case Study",
    "description": "TechFit built the competition boxing ring for Kumite 1 League, India's high-profile combat sports league.",
    "image": "https://www.techfittech.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" },
    "publisher": {
      "@type": "Organization",
      "name": "TechFit",
      "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
    },
    "datePublished": "2025-10-05",
    "dateModified": "2026-03-15"
  },
  'blog-mma-matrix': {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.techfittech.com/blog-mma-matrix"
    },
    "headline": "MMA Matrix — Tiger Shroff's Gym by TechFit | Case Study",
    "description": "TechFit designed and equipped MMA Matrix — Bollywood actor Tiger Shroff's signature mixed martial arts training gym.",
    "image": "https://www.techfittech.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" },
    "publisher": {
      "@type": "Organization",
      "name": "TechFit",
      "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
    },
    "datePublished": "2025-12-10",
    "dateModified": "2026-04-05"
  },
  'blog-one-stop': {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.techfittech.com/blog-one-stop"
    },
    "headline": "One-Stop Gym Infrastructure — TechFit Advantage | Blog",
    "description": "Why TechFit is the one-stop solution for all gym infrastructure needs — from equipment and flooring to design, installation and maintenance.",
    "image": "https://www.techfittech.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" },
    "publisher": {
      "@type": "Organization",
      "name": "TechFit",
      "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
    },
    "datePublished": "2026-01-20",
    "dateModified": "2026-05-01"
  },
  'blog-wellness-boom': {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.techfittech.com/blog-wellness-boom"
    },
    "headline": "India's Wellness Boom — Alteon & Recovery Tech | Blog",
    "description": "Exploring India's growing wellness and longevity market, and how Alteon recovery technology is leading the charge.",
    "image": "https://www.techfittech.com/og-image.jpg",
    "author": { "@type": "Organization", "name": "TechFit", "url": "https://www.techfittech.com/" },
    "publisher": {
      "@type": "Organization",
      "name": "TechFit",
      "logo": { "@type": "ImageObject", "url": "https://www.techfittech.com/logo.png" }
    },
    "datePublished": "2026-03-15",
    "dateModified": "2026-05-15"
  }
};

const NOSCRIPT_FALLBACKS = {
  'alteon': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Alteon Wellness &amp; Recovery Equipment India | Authorized Partner</h2>
      <p>TechFit is the official authorized exclusive distributor and partner for <strong>Alteon Wellness (alteontech.com)</strong> in India. We supply professional clinical and commercial-grade longevity, recovery, and biohacking technology to health clubs, hotels, residential developments, longevity clinics, and physical therapy centers.</p>
      
      <h3>Alteon Recovery Product Portfolio:</h3>
      <ul>
        <li><strong>Elysion Hyperbaric Chambers (HBOT):</strong> Clinical hard-shell monoplace oxygen chambers operating at 1.5 ATA to 2.0 ATA with luxury modular cabin space. Built for clinical safety and structural longevity, delivering high-purity oxygen to tissues.</li>
        <li><strong>Cryoblast Pro Whole-Body Cryotherapy:</strong> High-performance electric whole-body cryo chambers running on pure dry air (nitrogen-free). Safe, ultra-low operating cost compared to traditional liquid nitrogen cryo cabins.</li>
        <li><strong>Alteon ReVITAL Infrared Saunas:</strong> Premium far-infrared saunas and wellness chambers, offering commercial-grade longevity therapy with integrated controls and luxury hemlock/cedar wood specs.</li>
        <li><strong>Alteon PBM Neo Clinical Red Light Therapy:</strong> Medical-grade photobiomodulation (PBM) full-body panels and pads, delivering precise therapeutic wavelengths (680/850 nm) for cellular energy and recovery.</li>
        <li><strong>Alteon Biopod Dry Floatation Beds:</strong> Zero-gravity waterless floatation systems for spinal decompression, mental relaxation, and rapid muscle recovery.</li>
        <li><strong>Alteon Cell Trainer (IHHT):</strong> Interval Hypoxic-Hyperoxic Training systems for active cellular rejuvenation, athletic performance, and cardiovascular stamina.</li>
        <li><strong>Alteon Compression Therapy:</strong> Multi-chamber pneumatic compression systems for lymphatic drainage and rapid metabolic clearance.</li>
      </ul>

      <h3>Turnkey Sourcing &amp; Engineering:</h3>
      <p>TechFit provides full boots-on-the-ground engineering support, certified professional installation, immediate spare parts inventory, and robust annual maintenance contracts (AMC) throughout India, including Mumbai, Pune, Bangalore, Delhi, Gurgaon, Noida, Chennai, and Hyderabad, ensuring 100% operational uptime.</p>
      
      <p><strong>Contact TechFit for Alteon India Inquiries:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Address: 309, Boat Hard Rd, Darukhana, Byculla, Mumbai 400010<br>
        Website: <a href="https://www.techfittech.com/alteon">techfittech.com/alteon</a>
      </p>
    </div>
  </noscript>`,
  'bh-fitness': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>BH Fitness India | Official Authorized Distributor</h2>
      <p>TechFit is the official authorized distributor for <strong>BH Fitness</strong> commercial gym equipment in India. Headquartered in Spain, BH Fitness is a leading global commercial fitness brand, delivering world-class biomechanics, structural durability, and cloud-connected display consoles.</p>
      
      <h3>Product Lines:</h3>
      <ul>
        <li><strong>Commercial Cardio (LK &amp; Move Series):</strong> Heavy-duty commercial treadmills, upright exercise bikes, recumbent bikes, ellipticals, and HIIT rowers/air-bikes featuring interactive touchscreen consoles and virtual active training.</li>
        <li><strong>Commercial Strength (TR &amp; PL Series):</strong> Premium plate-loaded strength stations, selectorized weight-stack machine lines, dual-pulley functional trainers, cable crossovers, and heavy-duty adjustable benches.</li>
      </ul>

      <h3>Authorised Sourcing &amp; Local AMC Support:</h3>
      <p>TechFit provides the commercial fitness industry with direct-import pricing options, full spatial planning, and comprehensive Annual Maintenance Contracts (AMC) serviced by local engineers. By sourcing directly, club owners, premium real estate developers, and five-star hospitality sites can optimize capital expenditures (CapEx) while delivering an elite biomechanical experience and long-term service reliability.</p>
      
      <p><strong>Contact TechFit for BH Fitness India:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/bh-fitness">techfittech.com/bh-fitness</a>
      </p>
    </div>
  </noscript>`,
  'tunturi': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Tunturi Fitness India | Authorized Distributor</h2>
      <p>TechFit is the official authorized distributor of <strong>Tunturi</strong> fitness equipment in India. From Finland, Tunturi is a pioneer in Nordic fitness innovation, designing high-quality cardio, strength, and functional training gear for commercial fitness studios, corporate gyms, residential amenities, and premium home setups since 1922.</p>
      
      <h3>Tunturi Product Highlights:</h3>
      <ul>
        <li><strong>Cardio Trainers:</strong> Professional-grade home and light-commercial treadmills, elliptical cross trainers, rowing machines, and indoor cycling bikes with clean Scandinavian design.</li>
        <li><strong>Strength &amp; Functional:</strong> Premium power towers, multi-gym stations, utility benches, dumbbells, kettlebells, and functional training accessories.</li>
      </ul>
      <p><strong>Contact TechFit for Tunturi India:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/tunturi">techfittech.com/tunturi</a>
      </p>
    </div>
  </noscript>`,
  'california-fitness': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>California Fitness India | Commercial Strength &amp; Cardio Sourcing</h2>
      <p>TechFit is the official authorized distributor of <strong>California Fitness</strong> equipment in India, delivering heavy-duty commercial cardio, selectorized strength stacks, plate-loaded machines, and free-weight benches designed specifically for commercial health clubs, high-traffic corporate fitness facilities, and personal training studios.</p>
      <p>California Fitness is built for high durability, smooth movement paths, and ease of serviceability. It provides gym owners with a highly reliable, heavy-use alternative for commercial fitness facilities, backed by TechFit's direct installation, layout planning, and pan-India AMC service framework.</p>
      <p><strong>Contact TechFit for California Fitness India:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/california-fitness">techfittech.com/california-fitness</a>
      </p>
    </div>
  </noscript>`,
  'mma-cages': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>MMA Cages &amp; Boxing Rings Manufacturer India | TechFit</h2>
      <p>TechFit is the undisputed market leader in professional combat sports infrastructure in India. We design, custom-fabricate, and install competition-grade MMA cages (octagons, hexagons, floor cages, and elevated podium cages) and professional boxing rings at our heavy manufacturing facility in Mumbai.</p>
      
      <h3>Combat Sports Infrastructure Highlights:</h3>
      <ul>
        <li><strong>Official Cage Supplier:</strong> TechFit is the official cage and ring supplier to India's top professional fight promotions, including <strong>Matrix Fight Night (MFN)</strong>, <strong>Super Fight League (SFL)</strong>, and <strong>Kumite 1 League</strong>.</li>
        <li><strong>Elite Client Choice:</strong> Chosen by elite combat training clubs such as Bollywood actor Tiger Shroff's signature gym, <strong>MMA Matrix</strong>.</li>
        <li><strong>Custom Build Specifications:</strong> Built to international competition safety standards using 4mm+ heavy-gauge structural steel frames, high-density impact safety padding, heavy-gauge vinyl fencing, and custom anti-slip canvases.</li>
      </ul>

      <h3>Bespoke Custom Fabrications:</h3>
      <p>TechFit customizes every combat structure to the precise dimensions, color scheme, and branding requirements of your facility. We offer a world-class, locally manufactured alternative that eliminates high ocean freight shipping costs and logistical import delays, backed by local structural engineering certs and boots-on-the-ground support.</p>
      
      <p><strong>Contact TechFit for Custom MMA Cages &amp; Rings:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/mma-cages">techfittech.com/mma-cages</a>
      </p>
    </div>
  </noscript>`,
  'crossfit-rigs': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>CrossFit Rigs &amp; Functional Training Structures India | TechFit</h2>
      <p>TechFit designs, custom-engineers, and manufactures heavy-duty commercial CrossFit rigs, functional training zones, and calisthenics structures. Fabricated at our Mumbai facility using laser-cut 11-gauge structural steel, precision robotic welding, and premium textured powder coating, TechFit functional structures are built for the most intense commercial athletic training.</p>
      
      <h3>Structural Options:</h3>
      <ul>
        <li><strong>Freestanding Centres:</strong> Multi-station freestanding island rigs with integrated pull-up bars, target boards, safety spotters, and heavy storage shelves.</li>
        <li><strong>Wall-Mounted Space Savers:</strong> Compact wall-mounted pull-up structures and dynamic boxing bag tracks.</li>
        <li><strong>Bespoke Custom Layouts:</strong> Custom color finishes, laser-cut logo numbering, and bespoke configurations.</li>
      </ul>

      <h3>Premium Structural Integrity:</h3>
      <p>TechFit CrossFit structures deliver outstanding structural thickness, load capacity, and modular compatibility for premium health clubs, athletic spaces, and functional boxes in India, bypassing high shipping costs, import duties, and months of logistical delay with direct delivery and custom layout designs.</p>
      
      <p><strong>Contact TechFit for Custom Rigs &amp; Frames:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/crossfit-rigs">techfittech.com/crossfit-rigs</a>
      </p>
    </div>
  </noscript>`,
  'free-weights': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Free Weights &amp; Strength Gym Equipment India | TechFit</h2>
      <p>TechFit is a direct manufacturer and supplier of premium commercial strength training free weights and athletic training gear in India. Fabricated to strict tolerance limits, our free weights are engineered for maximum durability in high-traffic health clubs, weightlifting studios, and functional gyms.</p>
      
      <h3>Product Catalog:</h3>
      <ul>
        <li><strong>Olympic Barbells &amp; Rods:</strong> Professional-grade 20kg and 15kg Olympic bars with high tensile strength, precise knurling, and smooth needle-bearing rotation.</li>
        <li><strong>Commercial Dumbbells &amp; Barbells:</strong> Heavy-duty solid steel CPU and rubber-encased dumbbells, fixed barbells, and custom hex weights.</li>
        <li><strong>Bumper Plates &amp; Olympic Discs:</strong> Premium virgin rubber bumper plates, competition colored discs, and tri-grip rubber-coated iron plates.</li>
        <li><strong>Power Racks &amp; Platforms:</strong> Professional half-racks, full cages, squat stands, and multi-layer shock-absorption deadlift platforms.</li>
      </ul>
      <p>TechFit strength free weights provide direct, local, high-durability fitness gear fabricated directly in Mumbai, saving gym developers high shipping rates while ensuring strict compliance with commercial load ratings.</p>
      <p><strong>Contact TechFit for Strength Free Weights:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/free-weights">techfittech.com/free-weights</a>
      </p>
    </div>
  </noscript>`,
  'padel-pickleball': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Padel Court Builders &amp; Pickleball Court Builders India | TechFit</h2>
      <p>TechFit is India's premier turnkey sports infrastructure company, specializing in the complete design, structural engineering, custom fabrication, and professional installation of ITF-compliant <strong>Padel Courts</strong> and <strong>Pickleball Courts</strong>.</p>
      
      <h3>Padel &amp; Pickleball Turnkey Services:</h3>
      <ul>
        <li><strong>Complete Padel Courts:</strong> Structural steel panorama frame profiles, heavy-duty 12mm tempered safety glass panels, premium textured monofilament artificial turf, and professional-grade LED lighting fixtures.</li>
        <li><strong>Pickleball Courts:</strong> Professional multi-layer acrylic sports surfacing, line marking, net systems, and perimeter fencing.</li>
        <li><strong>Turnkey Sub-Base Construction:</strong> Land grading, concrete slab pouring, drainage system installation, and custom club amenities.</li>
      </ul>
      <p>We serve real estate developers, luxury residential towers, corporate parks, resorts, and premium sports clubs across India, including Mumbai, Pune, Bangalore, Hyderabad, Chennai, and Delhi. TechFit offers full local structural fabrication, structural engineering certs, and boots-on-the-ground support, bypassing high ocean freight shipping costs and imported logistics.</p>
      <p><strong>Contact TechFit for Sports Courts Setup:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/padel-pickleball">techfittech.com/padel-pickleball</a>
      </p>
    </div>
  </noscript>`,
  'aqua': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Aqua Fitness Pools &amp; Underwater Treadmills India | TechFit</h2>
      <p>TechFit custom-designs and manufactures premium marine-grade SS316 stainless steel aqua fitness pools, underwater treadmills, and aquatic rehabilitation equipment. Perfect for physical therapy clinics, longevity centers, elite sports teams, senior living facilities, and luxury hotels across India.</p>
      
      <h3>Aqua Fitness Products:</h3>
      <ul>
        <li><strong>Underwater Treadmills:</strong> Manual and electric SS316 marine-grade underwater running systems with adjustable resistance.</li>
        <li><strong>Aqua Bikes &amp; Ellipticals:</strong> Heavy-duty aquatic exercise bikes and elliptical trainers for low-impact cardio.</li>
        <li><strong>Aqua Therapy Pools:</strong> Custom modular therapy pools with integrated water currents, grab bars, and accessibility ramps.</li>
      </ul>
      <p>TechFit aqua equipment offers custom localized stainless steel engineering, high-durability marine-grade design, and complete after-sales servicing with local AMC coverage, bypassing complex import logistics and third-party repair networks.</p>
      <p><strong>Contact TechFit for Aqua Equipment:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/aqua">techfittech.com/aqua</a>
      </p>
    </div>
  </noscript>`,
  'wellness-solutions': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Wellness Solutions &amp; Longevity Recovery Equipment India | TechFit</h2>
      <p>TechFit is India's leading turnkey longevity and wellness solutions infrastructure provider. We design, supply, install, and service state-of-the-art biological recovery and spa technology from the premium <strong>Alteon Wellness</strong> collection, catering to commercial longevity centers, professional sports clubs, wellness resorts, residential complexes, and luxury private estates.</p>
      
      <h3>Turnkey Recovery Portfolio:</h3>
      <ul>
        <li><strong>Hyperbaric Oxygen Chambers (HBOT):</strong> Clinical hard-shell chambers operating at elevated atmospheric pressures (1.5–2.0 ATA). Built for clinical safety and certified structural integrity.</li>
        <li><strong>Nitrogen-Free Whole-Body Cryotherapy:</strong> Dry electric whole-body cryotherapy chambers running on clean electrical energy at -110°C to -140°C, delivering safe, chemical-free cold exposure.</li>
        <li><strong>Medical-Grade Red Light Therapy (PBM):</strong> Clinical full-body photobiomodulation panels and chambers offering precise therapeutic wavelengths (680/850 nm) to boost energy and recovery.</li>
        <li><strong>Biopod Zero-Gravity Dry Floatation:</strong> Waterless floatation beds providing instant stress reduction, spine decompression, and muscular relief.</li>
        <li><strong>IHHT Cellular Air Trainers:</strong> Passive altitude interval training systems for rapid cellular rejuvenation and cellular performance.</li>
      </ul>
      <p>TechFit provides end-to-end layouts, certified plumbing and electrical engineering preparation, and localized AMC maintenance contracts. This ensures 100% operational uptime, backed by a dedicated local engineer dispatch network.</p>
      <p><strong>Contact TechFit for Wellness &amp; Recovery Solutions:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/wellness-solutions">techfittech.com/wellness-solutions</a>
      </p>
    </div>
  </noscript>`,
  'services': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Gym Setup Services, Consulting &amp; AMC Mumbai India | TechFit</h2>
      <p>TechFit (Techfit Health Fitness Private Limited) is the premier 360-degree gym design, supply, installation, and facility maintenance partner in India. We offer complete turnkey setup services under a single contract for commercial health clubs, luxury real-estate amenities, five-star hotel gyms, corporate fitness centers, and institutional facilities.</p>
      
      <h3>Our Services Include:</h3>
      <ul>
        <li><strong>Gym Setup Consulting &amp; Layout Design:</strong> Custom 2D layouts, 3D space renders, architectural equipment allocation, floor load engineering, and member movement planning.</li>
        <li><strong>Premium Equipment Supply:</strong> Direct factory authorized supply of world-class European cardio (BH Fitness, Tunturi), commercial strength lines (California Fitness), and custom structural fitness fabrications.</li>
        <li><strong>Custom Combat &amp; Rig Fabrication:</strong> Heavy industrial manufacturing of competition MMA octagons, floor cages, dynamic boxing rings, CrossFit functional rigs, and steel free weights.</li>
        <li><strong>Professional Gym Flooring &amp; Sports Infrastructure:</strong> Premium sound-insulating rubber flooring rolls, interlocking tiles, custom turf tracks, and complete ITF-compliant padel and pickleball court builds.</li>
      </ul>
      <p>Backed by over 300 successful turnkeys across India, TechFit represents the premier single-contract partner for premium commercial amenities, coordinating the entire planning, delivery, and pan-India AMC after-sales service from our Mumbai center.</p>
      <p><strong>Contact TechFit Gym Services:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Website: <a href="https://www.techfittech.com/services">techfittech.com/services</a>
      </p>
    </div>
  </noscript>`
};


function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function minifyHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .replace(/[ \t]{2,}/g, ' ') // Collapse multiple horizontal spaces only
    .trim();
}

function generatePage(html, route, seo) {
  const fullUrl = BASE + '/' + route;
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
  out = out.replace(/(<meta\s+name="description"\s+id="meta-description"\s+content=")[^"]*(")/, `$1${escapeHtml(seo.desc)}$2`);
  out = out.replace(/(<link\s+rel="canonical"\s+id="canonical-link"\s+href=")[^"]*(")/, `$1${fullUrl}$2`);
  out = out.replace(/(<meta\s+property="og:url"\s+content=")[^"]*("\s+id="og-url")/, `$1${fullUrl}$2`);
  out = out.replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s+id="og-title")/, `$1${escapeHtml(seo.title)}$2`);
  out = out.replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s+id="og-description")/s, `$1${escapeHtml(seo.desc)}$2`);
  out = out.replace(/(<meta\s+property="og:image"\s+content=")[^"]*("\s+id="og-image")/, `$1${seo.img}$2`);
  out = out.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*("\s+id="tw-title")/, `$1${escapeHtml(seo.title)}$2`);
  out = out.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*("\s+id="tw-description")/s, `$1${escapeHtml(seo.desc)}$2`);
  out = out.replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*("\s+id="tw-image")/, `$1${seo.img}$2`);

  // Replace the default H1 with route-specific H1
  if (seo.h1) {
    const h1Block = `<h1 class="sr-h1" style="position:absolute;left:-9999px" id="main-h1">${escapeHtml(seo.h1)}</h1>`;
    out = out.replace(/<h1 class="sr-h1" style="position:absolute;left:-9999px" id="main-h1">.*?<\/h1>/, h1Block);
  }

  // Inject the static JSON-LD schema into the <head> of this route copy!
  if (SCHEMAS[route]) {
    const schemaBlock = `\n  <script type="application/ld+json">\n${JSON.stringify(SCHEMAS[route], null, 2)}\n  </script>`;
    out = out.replace('</head>', `${schemaBlock}\n</head>`);
  }

  // Inject route-specific <noscript> fallback block
  const noscriptBlock = NOSCRIPT_FALLBACKS[route] || `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>TechFit | Gym Setup, Equipment &amp; Wellness Solutions Mumbai</h2>
      <p>India's gym, wellness &amp; sports infrastructure partner with 300+ gyms delivered. Distributor for BH Fitness,
        Tunturi, California, and Alteon Wellness. Based in Mumbai.</p>
      <p><strong>Services:</strong> Gym design &amp; layout, commercial equipment supply, custom fabrication of
        combat-sports equipment and CrossFit rigs, padel and pickleball courts, wellness and recovery technology from
        Alteon, installation, after-sales and AMC. Sister concern TechFit Active provides managed gym operations.</p>
      <p><strong>Segments served:</strong> Commercial gyms and studios, real estate developers (residential towers,
        co-living, IT parks), hotels and resorts, schools and institutions, fight leagues (Matrix Fight Night, Super
        Fight League, Kumite 1) and corporate wellness.</p>
      <p><strong>Contact:</strong><br>
        Email: info@techfitactive.com<br>
        Phone: +91 98201 66910<br>
        Address: 309, Boat Hard Rd, Darukhana, Byculla, Mumbai 400010<br>
        Sister site: <a href="https://www.techfitactive.com/">techfitactive.com</a></p>
      <p>This site requires JavaScript for the product catalogue and interactive pages. Please enable JavaScript for the
        full experience.</p>
    </div>
  </noscript>`;
  out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, noscriptBlock);

  // Noindex for conversion/utility pages
  if (seo.noindex) {
    out = out.replace(
      /(<meta\s+name="robots"\s+content=")[^"]*(")/,
      '$1noindex, nofollow$2'
    );
  }

  return minifyHtml(out);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// ── MAIN ──
console.log('🚀 Starting Static Site SEO Prerendering...\n');

// 1. Check if DIST folder exists (must be compiled first)
if (!fs.existsSync(DIST)) {
  console.error('❌ Error: dist/ directory not found! Please run the compilation build command first (e.g., npm run build).');
  process.exit(1);
}

const compiledIndexHtmlPath = path.join(DIST, 'index.html');
if (!fs.existsSync(compiledIndexHtmlPath)) {
  console.error('❌ Error: dist/index.html not found! Please compile the app first.');
  process.exit(1);
}

// 2. Read compiled index.html as sourceHtml
const sourceHtml = fs.readFileSync(compiledIndexHtmlPath, 'utf8');
let count = 0;

// 3. Generate SEO sub-pages
for (const [route, seo] of Object.entries(SEO_MAP)) {
  const outDir = path.join(DIST, route);
  const outFile = path.join(outDir, 'index.html');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const html = generatePage(sourceHtml, route, seo);
  fs.writeFileSync(outFile, html, 'utf8');
  count++;
}

console.log(`\n🎉 SEO Prerendering complete! Generated ${count} route-specific pages in 'dist/'.`);

// 4. Generate dynamic sitemap.xml
function generateSitemap(seoMap) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage first
  xml += `    <url><loc>https://www.techfittech.com/</loc><lastmod>2026-05-28</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n`;
  
  for (const [route, seo] of Object.entries(seoMap)) {
    if (seo.noindex) continue;
    
    const priority = route.startsWith('blog-') ? '0.6' : (route === 'get-a-quote' ? '0.9' : '0.8');
    const changefreq = route.startsWith('blog-') ? 'monthly' : 'weekly';
    const lastmod = seo.lastmod || '2026-05-28';
    
    xml += `    <url><loc>https://www.techfittech.com/${route}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  }
  
  xml += '</urlset>\n';
  
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC, 'sitemap.xml'), xml, 'utf8');
  console.log('✔ Dynamic sitemap.xml successfully generated in public/ and dist/');
}

generateSitemap(SEO_MAP);
