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
    img: DEFAULT_OG_IMG
  },
  'bh-fitness': {
    title: 'BH Fitness India | Authorised Distributor — Treadmills, Bikes, Ellipticals',
    desc: 'TechFit is the authorised distributor of BH Fitness commercial gym equipment in India. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',
    img: DEFAULT_OG_IMG
  },
  'tunturi': {
    title: 'Tunturi India | Authorised Distributor — Nordic Fitness Equipment',
    desc: 'TechFit is the authorised distributor of Tunturi fitness equipment in India. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',
    img: DEFAULT_OG_IMG
  },
  'california-fitness': {
    title: 'California Fitness India | Authorised Distributor — Commercial Gym Equipment',
    desc: 'TechFit is the authorised distributor of California Fitness in India. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',
    img: DEFAULT_OG_IMG
  },
  'techfit': {
    title: 'TechFit Active | In-House Gym & Sports Equipment Manufacturer India',
    desc: "TechFit Active — India's in-house manufacturer of MMA cages, boxing rings, CrossFit rigs, free weights, padel courts and aqua fitness equipment. Factory in Mumbai.",
    img: DEFAULT_OG_IMG
  },
  'mma-cages': {
    title: 'MMA Cages & Boxing Rings India | TechFit — Manufacturer & Supplier',
    desc: 'Competition and training MMA octagons, floor cages, podium cages and boxing rings by TechFit. Trusted by Matrix Fight Night, Super Fight League and Kumite 1.',
    img: DEFAULT_OG_IMG
  },
  'crossfit-rigs': {
    title: 'CrossFit Rigs & Functional Training India | TechFit Manufacturer',
    desc: 'Custom CrossFit rigs, wall-mounted pull-up systems, calisthenics structures and modular functional-training rigs. Designed and manufactured by TechFit in Mumbai.',
    img: DEFAULT_OG_IMG
  },
  'free-weights': {
    title: 'Free Weights & Strength Equipment India | TechFit Manufacturer',
    desc: 'Olympic barbells, rubber-coated dumbbells, bumper plates, power racks, squat stands and deadlift platforms. Manufactured in India by TechFit.',
    img: DEFAULT_OG_IMG
  },
  'padel-pickleball': {
    title: 'Padel & Pickleball Courts India | TechFit — Design, Build & Install',
    desc: 'End-to-end padel and pickleball court construction in India. Design, fabrication and installation for clubs, resorts, housing societies and corporate campuses.',
    img: DEFAULT_OG_IMG
  },
  'aqua': {
    title: 'Aqua Fitness & Underwater Treadmills India | TechFit',
    desc: 'Underwater treadmills, aqua therapy pools and aqua fitness equipment by TechFit. Designed for physiotherapy clinics, hotels, wellness centres and rehabilitation facilities.',
    img: DEFAULT_OG_IMG
  },
  'wellness-solutions': {
    title: 'Wellness Solutions India | TechFit — Recovery, Longevity & Spa Equipment',
    desc: 'Complete wellness solutions by TechFit — from hyperbaric chambers and cryotherapy to infrared saunas and float pods. Turnkey wellness infrastructure for hotels, clinics and gyms.',
    img: DEFAULT_OG_IMG
  },
  'services': {
    title: 'Gym & Wellness Services India | TechFit — Design, Install, AMC',
    desc: 'TechFit services — gym design consultation, equipment supply, installation, flooring, AMC and after-sales support. Full turnkey solutions across India.',
    img: DEFAULT_OG_IMG
  },
  'about': {
    title: "About TechFit | India's Premier Gym & Sports Infrastructure Company",
    desc: "Founded in Mumbai, TechFit is India's leading gym, wellness and sports infrastructure company. Learn about our story, leadership, manufacturing facility and vision.",
    img: DEFAULT_OG_IMG
  },
  'contact': {
    title: 'Contact TechFit | Get a Free Gym & Wellness Consultation',
    desc: 'Get in touch with TechFit for a free gym setup consultation. Call +91 98201 66910 or visit us at 309 Boat Hard Rd, Darukhana, Byculla, Mumbai 400010.',
    img: DEFAULT_OG_IMG
  },
  'for-gyms': {
    title: 'Gym & Studio Setup India | TechFit — Equipment, Design & Installation',
    desc: 'Complete gym and studio setup solutions by TechFit. From equipment selection to layout design, flooring and installation — get your gym running fast.',
    img: DEFAULT_OG_IMG
  },
  'for-developers': {
    title: 'Real-Estate Developer Gym Amenities India | TechFit',
    desc: "Premium gym and wellness amenities for residential and commercial real-estate developers. TechFit partners with India's top builders for world-class fitness infrastructure.",
    img: DEFAULT_OG_IMG
  },
  'for-schools': {
    title: 'School & Institution Fitness Setup India | TechFit',
    desc: 'Safe, age-appropriate fitness equipment and sports infrastructure for schools, colleges and institutions. Designed and supplied by TechFit across India.',
    img: DEFAULT_OG_IMG
  },
  'for-hotels': {
    title: 'Hotel Gym & Wellness Setup India | TechFit',
    desc: 'Turnkey hotel gym and wellness solutions. Premium equipment from BH Fitness, Tunturi and California Fitness — plus spa, recovery and Alteon wellness technology.',
    img: DEFAULT_OG_IMG
  },
  'blogs': {
    title: 'TechFit Blog | Gym, Wellness & Sports Industry Insights India',
    desc: "Industry insights, case studies and news from TechFit — India's leading gym, wellness and sports infrastructure company.",
    img: DEFAULT_OG_IMG
  },
  'blog-mfn': {
    title: 'Matrix Fight Night — MMA Cage by TechFit | Case Study',
    desc: "How TechFit designed and built the competition-grade MMA octagon for Matrix Fight Night — India's premier mixed martial arts promotion.",
    img: DEFAULT_OG_IMG
  },
  'blog-sfl': {
    title: 'Super Fight League — MMA Cage by TechFit | Case Study',
    desc: "TechFit manufactured the professional MMA cage for Super Fight League, one of India's biggest combat sports events.",
    img: DEFAULT_OG_IMG
  },
  'blog-kumite': {
    title: "Kumite 1 League — Boxing Ring by TechFit | Case Study",
    desc: "TechFit built the competition boxing ring for Kumite 1 League, India's high-profile combat sports league.",
    img: DEFAULT_OG_IMG
  },
  'blog-mma-matrix': {
    title: "MMA Matrix — Tiger Shroff's Gym by TechFit | Case Study",
    desc: "TechFit designed and equipped MMA Matrix — Bollywood actor Tiger Shroff's signature mixed martial arts training gym.",
    img: DEFAULT_OG_IMG
  },
  'blog-one-stop': {
    title: 'One-Stop Gym Infrastructure — TechFit Advantage | Blog',
    desc: 'Why TechFit is the one-stop solution for all gym infrastructure needs — from equipment and flooring to design, installation and maintenance.',
    img: DEFAULT_OG_IMG
  },
  'blog-wellness-boom': {
    title: "India's Wellness Boom — Alteon & Recovery Tech | Blog",
    desc: "Exploring India's growing wellness and longevity market, and how Alteon recovery technology is leading the charge.",
    img: DEFAULT_OG_IMG
  },
  'gym-flooring': {
    title: 'Gym Flooring India | TechFit — Rubber, Turf & Interlocking Tiles',
    desc: 'Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf and shock-absorbent mats. Supplied and installed by TechFit across India.',
    img: DEFAULT_OG_IMG
  },
  'flooring': {
    title: 'Gym Flooring India | TechFit — Rubber, Turf & Interlocking Tiles',
    desc: 'Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf and shock-absorbent mats. Supplied and installed by TechFit across India.',
    img: DEFAULT_OG_IMG
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
          { "@type": "Question", "name": "Who are the best MMA cage manufacturers in India?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit (Techfit Health Fitness), based in Mumbai, is widely regarded as one of India's best MMA cage manufacturers. They are the official cage supplier for Matrix Fight Night (MFN), Super Fight League (SFL), and Kumite 1 League, India's top MMA promotions." } },
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
      }
    ]
  }
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

  // Inject the static JSON-LD schema into the <head> of this route copy!
  if (SCHEMAS[route]) {
    const schemaBlock = `\n  <script type="application/ld+json">\n${JSON.stringify(SCHEMAS[route], null, 2)}\n  </script>`;
    out = out.replace('</head>', `${schemaBlock}\n</head>`);
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
