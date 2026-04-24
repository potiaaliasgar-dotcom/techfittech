#!/usr/bin/env node
/**
 * generate-seo-pages.mjs
 * 
 * Reads the root index.html and generates route-specific copies
 * with correct <title>, meta description, canonical, OG and Twitter tags.
 * 
 * This script now acts as a build command that outputs to a 'dist' directory,
 * satisfying Vercel's requirements while keeping the project root clean.
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

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
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

  return out;
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
console.log('🚀 Starting Static Site Build...\n');

// 1. Prepare DIST folder
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
fs.mkdirSync(DIST, { recursive: true });

// 2. Copy main index.html
fs.copyFileSync(SOURCE, path.join(DIST, 'index.html'));
console.log('  📄 Copied index.html');

// 3. Copy public folder contents
if (fs.existsSync(PUBLIC)) {
  copyRecursiveSync(PUBLIC, DIST);
  console.log('  📁 Copied public/ assets');
}

// 4. Generate SEO sub-pages
const sourceHtml = fs.readFileSync(SOURCE, 'utf8');
let count = 0;

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

console.log(`\n🎉 Build complete! Generated ${count} route-specific pages in 'dist/'.`);

