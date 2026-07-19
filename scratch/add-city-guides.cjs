#!/usr/bin/env node
/*
 * add-city-guides.cjs
 * Patches public/assets/app.js to fix the Soft 404 on 23 half-built city pages.
 * These pages were in validPages + sitemap + SEO head config, but had NO body
 * content wired into the client router, so render() fell through to render404().
 *
 * This script:
 *   1. Inserts 23 unique GUIDES_DATA entries (before the GUIDES_DATA closing `};`)
 *   2. Adds all 23 slugs to the guideSlugs array in render()
 *   3. Adds all 23 slugs to the commercialPages map (quote-form CTA)
 * Idempotent: skips insertion if a slug is already present in GUIDES_DATA.
 */
const fs = require('fs');
const path = require('path');
const APP = path.resolve(__dirname, '..', 'public/assets/app.js');

const AUTHOR = 'Ali Asgar Potia';
const DATE = '2026-06-15';
const REL = '[{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"}]';

// tl = tagged helper not needed; we build plain strings and wrap in backticks.
function esc(s) { return s.replace(/`/g, "'").replace(/\$\{/g, '(') ; }

// Each page: [slug, badge, title, h1, desc, htmlContent, faqs[]]
const PAGES = [
  // ---------- COMMERCIAL GYM SETUP (8) ----------
  ['commercial-gym-setup-chennai', 'Chennai Local Setup',
   'Commercial Gym Setup in Chennai | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Chennai',
   'Turnkey commercial gym setup in Chennai — 3D layout, imported and Indian-built equipment, and pan-India AMC. Serving OMR, Anna Nagar, T. Nagar and Adyar.',
   "<h2>Turnkey Commercial Gyms Built for Chennai's IT & Coastal Belt</h2> <p>From the OMR IT corridor and Anna Nagar to T. Nagar, Adyar and the ECR hospitality strip, Chennai's operators are equipping premium boutique studios, apartment clubhouses and hotel fitness centres for a health-conscious professional base. TechFit delivers the full turnkey scope — space planning, 3D layout, equipment supply and installation — matched to each site's footprint and budget.</p> <h2>Corrosion-Ready Equipment, Local Installation & AMC</h2> <p>Chennai's coastal humidity is hard on cheap machines, so we specify commercial-grade cardio and strength lines (BH Fitness, Tunturi and California Fitness) with protected finishes, plus custom functional rigs fabricated in-house. Every project ships from our Mumbai facility with certified installation and an Annual Maintenance Contract backed by service engineers, and can be paired with Alteon recovery suites for a premium edge.</p>",
   [['Do you deliver and install commercial gym equipment across Chennai?','Yes. We handle logistics from our Mumbai factory to any Chennai location — OMR, Anna Nagar, T. Nagar, Adyar or the ECR belt — with certified installation and a maintenance contract with local service support.'],
    ['Which equipment suits Chennai\'s humid climate?','We specify commercial cardio and strength lines with corrosion-resistant finishes and sealed consoles, and advise on placement and ventilation so machines last in coastal conditions.']]],

  ['commercial-gym-setup-kolkata', 'Kolkata Local Setup',
   'Commercial Gym Setup in Kolkata | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Kolkata',
   'Turnkey commercial gym setup in Kolkata — 3D layout, premium equipment supply and pan-India AMC. Serving Salt Lake, New Town, Park Street and Ballygunge.',
   "<h2>Commercial Gym Setup Across Kolkata & the Eastern Hub</h2> <p>Kolkata blends heritage members' clubs with a fast-growing residential belt in Salt Lake Sector V, New Town Rajarhat, Park Street and Ballygunge. As eastern India's commercial anchor, the city's hotels, townships and studios need dependable, certified equipment and layouts that make the most of older buildings as well as new towers. TechFit provides turnkey design, supply and installation across all of them.</p> <h2>Equipment Mix, Logistics & Maintenance</h2> <p>We pair imported cardio and strength stacks (BH Fitness, Tunturi) with in-house functional rigs and free-weight setups, engineered for high footfall. Projects are delivered from our Mumbai factory with professional installation and an Annual Maintenance Contract, so a clubhouse in New Town or a boutique studio off Park Street runs reliably year-round.</p>",
   [['Can you set up a society clubhouse gym in New Town or Salt Lake?','Yes. We design and equip residential clubhouse gyms across Kolkata, choosing durable, low-maintenance machines suited to shared, high-traffic use, with installation and AMC included.'],
    ['What is the typical timeline for a Kolkata gym setup?','After the layout is approved, most commercial setups are delivered and installed within a few weeks, depending on equipment selection and site readiness.']]],

  ['commercial-gym-setup-ahmedabad', 'Ahmedabad Local Setup',
   'Commercial Gym Setup in Ahmedabad | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Ahmedabad',
   'Turnkey commercial gym setup in Ahmedabad — 3D layout, premium equipment and pan-India AMC. Serving SG Highway, Prahlad Nagar, Bodakdev and GIFT City.',
   "<h2>Premium Gym & Wellness Setups for Ahmedabad's Business Corridors</h2> <p>Ahmedabad's entrepreneurial wealth — concentrated along SG Highway, Prahlad Nagar, Bodakdev and the emerging GIFT City — is fuelling demand for high-specification corporate gyms, luxury residential clubhouses and boutique studios. TechFit is the turnkey partner for Gujarat operators who want imported-grade equipment and clean, efficient layouts without the overheads of dealing with multiple vendors.</p> <h2>Sourcing, Installation & Long-Term Service</h2> <p>We supply commercial cardio and strength lines (BH Fitness, Tunturi, California Fitness) alongside custom functional rigs, and can integrate Alteon recovery and longevity suites for premium clients. Each Ahmedabad project is delivered from our Mumbai facility with certified installation and an Annual Maintenance Contract, giving operators a single accountable point of contact.</p>",
   [['Do you equip corporate gyms for offices in GIFT City or SG Highway?','Yes. We design compact, high-impact corporate wellness rooms and full office gyms across Ahmedabad, including GIFT City and the SG Highway corridor, with installation and maintenance support.'],
    ['Can you supply both imported and Indian-made equipment?','We offer a mix — imported commercial lines for flagship sites and value-engineered Indian-built and in-house fabricated equipment where budgets are tighter, all commercial-grade.']]],

  ['commercial-gym-setup-jaipur', 'Jaipur Local Setup',
   'Commercial Gym Setup in Jaipur | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Jaipur',
   'Turnkey commercial gym setup in Jaipur — 3D layout, hospitality-grade equipment and pan-India AMC. Serving C-Scheme, Malviya Nagar, Vaishali Nagar and Tonk Road.',
   "<h2>Hospitality-Grade Gym Setups for Jaipur</h2> <p>Jaipur's palace hotels, heritage resorts and a rising residential market in C-Scheme, Malviya Nagar, Vaishali Nagar and along Tonk Road create strong demand for guest-ready fitness centres and clubhouse gyms. Tourism sets a high bar for finish and reliability, and TechFit delivers turnkey design, supply and installation that meets it — from compact hotel gyms to full residential facilities.</p> <h2>Equipment, Delivery & Maintenance in the Pink City</h2> <p>We specify premium cardio and strength equipment (BH Fitness, Tunturi) with the aesthetics hospitality clients expect, plus custom rigs for functional zones. Projects ship from our Mumbai factory with certified installation and an Annual Maintenance Contract, so a resort gym in Jaipur stays presentable and fully operational through peak tourist seasons.</p>",
   [['Can you fit out a hotel or resort gym in Jaipur?','Yes. We specialise in compact, premium hotel and resort gyms, selecting space-efficient cardio and multi-station equipment that elevates the guest wellness experience, with installation and AMC.'],
    ['Do you provide layout design before purchase?','Every project begins with a space assessment and 3D layout so you can see the equipment mix and flow before committing, tailored to your room size and footfall.']]],

  ['commercial-gym-setup-goa', 'Goa Local Setup',
   'Commercial Gym Setup in Goa | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Goa',
   'Turnkey commercial gym setup in Goa — resort and villa gyms, corrosion-ready equipment and pan-India AMC. Serving Panjim, Calangute, Candolim and Margao.',
   "<h2>Resort & Villa Gym Setups Built for Goa's Coast</h2> <p>Goa's economy runs on hospitality, and its resorts, boutique hotels and luxury villas along the Panjim–Calangute–Candolim belt and around Margao need fitness facilities that look premium and survive a salt-air climate. TechFit provides turnkey resort and clubhouse gym setups — layout, supply and installation — designed for coastal durability and guest appeal.</p> <h2>Corrosion Protection, Installation & Service</h2> <p>We specify commercial cardio and strength lines with corrosion-resistant finishes and advise on ventilation and placement to counter humidity and sea air. Every Goa project is delivered from our Mumbai facility with certified installation and an Annual Maintenance Contract, plus optional Alteon recovery suites for wellness-focused resorts.</p>",
   [['How do you protect gym equipment from Goa\'s coastal corrosion?','We select machines with protected finishes and sealed electronics, then advise on room placement, ventilation and a maintenance schedule that keeps equipment reliable in humid, salty conditions.'],
    ['Can you set up a small villa or boutique-resort gym?','Yes. We handle compact villa and boutique-resort gyms as readily as large facilities, choosing space-efficient equipment matched to the footprint and guest profile.']]],

  ['commercial-gym-setup-chandigarh', 'Chandigarh Local Setup',
   'Commercial Gym Setup in Chandigarh | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Chandigarh',
   'Turnkey commercial gym setup across the Chandigarh tricity — 3D layout, premium equipment and pan-India AMC. Serving Sector 17/35, Mohali and Panchkula.',
   "<h2>Commercial Gym Setup Across the Chandigarh Tricity</h2> <p>Chandigarh's planned-city affluence and strong sports culture, extending through Mohali and Panchkula, drive demand for premium studios, township clubhouses and corporate facilities. Operators here expect clean layouts and serious equipment. TechFit delivers turnkey design, supply and installation across the tricity, from Sector 17 and Sector 35 to the newer Mohali and Panchkula developments.</p> <h2>Equipment Selection, Logistics & AMC</h2> <p>We combine imported commercial cardio and strength lines (BH Fitness, Tunturi, California Fitness) with custom functional rigs suited to Chandigarh's performance-minded members. Projects are delivered from our Mumbai factory with certified installation and an Annual Maintenance Contract backed by service engineers, so facilities stay in top condition.</p>",
   [['Do you cover Mohali and Panchkula as well as Chandigarh?','Yes. We serve the full tricity — Chandigarh, Mohali and Panchkula — with the same turnkey layout, supply, installation and maintenance service.'],
    ['Can you build a functional training or CrossFit-style rig?','Yes. We fabricate custom functional and rig systems in-house and integrate them into the layout alongside cardio and strength stations.']]],

  ['commercial-gym-setup-surat', 'Surat Local Setup',
   'Commercial Gym Setup in Surat | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Surat',
   'Turnkey commercial gym setup in Surat — luxury studios and clubhouses, premium equipment and pan-India AMC. Serving Vesu, Adajan, Piplod and Dumas Road.',
   "<h2>Luxury Gym & Clubhouse Setups for Surat</h2> <p>Surat's diamond and textile wealth supports a strong market for luxury private gyms, premium apartment clubhouses and boutique studios across Vesu, Adajan, Piplod and the Dumas Road belt. TechFit is the turnkey partner for Surat developers and operators who want imported-grade equipment and polished layouts delivered end-to-end, without juggling multiple suppliers.</p> <h2>Premium Equipment, Installation & Maintenance</h2> <p>We supply commercial cardio and strength lines (BH Fitness, Tunturi, California Fitness) with custom functional rigs, and can add Alteon recovery and longevity suites for flagship residential projects. Each Surat setup ships from our Mumbai facility with certified installation and an Annual Maintenance Contract, ensuring long-term reliability for high-footfall clubhouses.</p>",
   [['Do you equip luxury apartment clubhouses in Vesu or Adajan?','Yes. We design and equip premium residential clubhouse gyms across Surat, selecting durable, high-end machines for shared use, with full installation and maintenance support.'],
    ['Can recovery suites like hyperbaric or cryotherapy be added?','Yes. For flagship projects we can integrate Alteon hyperbaric oxygen and whole-body cryotherapy recovery suites into the wellness offering.']]],

  ['commercial-gym-setup-kochi', 'Kochi Local Setup',
   'Commercial Gym Setup in Kochi | Equipment Supplier',
   'Complete Commercial Gym Setup & Equipment Supplier in Kochi',
   'Turnkey commercial gym setup in Kochi — IT-park, hospitality and coastal-ready equipment with pan-India AMC. Serving Kakkanad, Marine Drive, Kaloor and Edappally.',
   "<h2>Gym Setups for Kochi's IT, Hospitality & Coastal Market</h2> <p>Kochi pairs the Kakkanad Infopark tech workforce with a thriving hospitality and backwater-resort sector around Marine Drive, Kaloor and Edappally. That mix drives demand for corporate gyms, hotel fitness centres and residential clubhouses that perform in a warm, humid coastal climate. TechFit provides turnkey layout, supply and installation across Kochi and greater Ernakulam.</p> <h2>Climate-Ready Equipment, Installation & Service</h2> <p>We specify commercial cardio and strength lines with corrosion-resistant finishes for coastal conditions, supported by custom functional rigs. Every Kochi project is delivered from our Mumbai facility with certified installation and an Annual Maintenance Contract, and can include Alteon recovery suites for premium hospitality and wellness clients.</p>",
   [['Do you serve Infopark Kakkanad and greater Ernakulam?','Yes. We equip corporate, hotel and residential gyms across Kochi — including Infopark Kakkanad, Marine Drive, Kaloor and Edappally — with installation and AMC.'],
    ['Is the equipment suited to Kochi\'s humid coastal climate?','Yes. We choose corrosion-resistant commercial equipment and advise on ventilation and maintenance so machines stay reliable in warm, humid conditions.']]],
];

// ---------- HOTEL / SOCIETY / CORPORATE (15) ----------
const CITIES = [
  ['mumbai','Mumbai','Mumbai — from Bandra-Kurla and Lower Parel to the western and harbour suburbs'],
  ['pune','Pune','Pune — across Hinjewadi, Kharadi, Baner and Koregaon Park'],
  ['bangalore','Bangalore','Bangalore — from Whitefield and the ORR tech belt to Koramangala and Indiranagar'],
  ['delhi-ncr','Delhi NCR','Delhi NCR — spanning Gurgaon, Noida and premium Delhi neighbourhoods'],
  ['hyderabad','Hyderabad','Hyderabad — around Gachibowli, HITEC City and Jubilee Hills'],
];

function hotel(cityKey, cityName, cityAreas) {
  return ['hotel-gym-setup-' + cityKey, cityName + ' Hotel Setup',
    'Hotel Gym Setup & Equipment Supplier in ' + cityName,
    'Premium Hotel & Resort Gym Setup in ' + cityName,
    'Premium hotel and hospitality gym setup in ' + cityName + '. Space-efficient cardio and multi-station layouts that elevate guest wellness, with installation and AMC.',
    "<h2>Premium Hotel & Resort Gym Setups in " + cityName + "</h2> <p>Hotels and resorts in " + cityAreas + " compete on guest experience, and a well-equipped fitness centre is now expected rather than optional. TechFit designs space-efficient hotel gyms that fit compact hospitality footprints while still feeling premium, with a considered mix of cardio, multi-station strength and free weights that suits guests of every ability.</p> <h2>Compact Layouts, Certified Installation & AMC</h2> <p>We plan the layout in 3D to maximise a limited room, specify quiet, low-maintenance commercial cardio and multi-gym equipment (BH Fitness, Tunturi), and deliver from our Mumbai facility with certified installation. An Annual Maintenance Contract keeps every machine presentable and fully operational, which matters when guests judge a property on its amenities.</p>",
    [['How much space is needed for a hotel gym in ' + cityName + '?','Even a compact room can work — we design space-efficient layouts that combine a few cardio units, a multi-station and free weights, tailored to the footprint available in your ' + cityName + ' property.'],
     ['Do you provide ongoing maintenance for hotel gyms?','Yes. Every setup includes an Annual Maintenance Contract with service engineers, so equipment stays reliable and guest-ready year-round.']]];
}

function society(cityKey, cityName, cityAreas) {
  return ['society-gym-setup-' + cityKey, cityName + ' Society Setup',
    'Society Gym Setup & Clubhouse Equipment in ' + cityName,
    'Clubhouse & Society Gym Setup in ' + cityName,
    'Turnkey clubhouse and society gym setup in ' + cityName + '. Durable, safe, cost-effective equipment built for high-traffic residential complexes, with installation and AMC.',
    "<h2>Clubhouse & Society Gym Setups in " + cityName + "</h2> <p>Residential complexes and townships in " + cityAreas + " increasingly treat a quality clubhouse gym as a core amenity that supports property value and resident wellbeing. TechFit provides turnkey society gym setups engineered for shared, high-traffic use — durable, safe and cost-effective — from committee-friendly budgets to premium developer specifications.</p> <h2>Durability, Safety & Low-Maintenance Service</h2> <p>We choose robust commercial equipment (BH Fitness, Tunturi and value-engineered Indian-built lines) with safety-first layouts for mixed-ability residents, then deliver from our Mumbai facility with certified installation. An Annual Maintenance Contract keeps the facility safe and reliable despite constant use, with a single accountable point of contact for the management committee.</p>",
    [['What equipment is best for a society clubhouse gym in ' + cityName + '?','We specify durable, low-maintenance commercial machines designed for shared use, with a safe layout suited to residents of all ages and abilities, matched to your committee budget.'],
     ['Can you work within a housing-society budget?','Yes. We offer a mix of imported and value-engineered Indian-built equipment so the setup fits the budget while staying commercial-grade and reliable for high footfall.']]];
}

function corporate(cityKey, cityName, cityAreas) {
  return ['corporate-gym-setup-' + cityKey, cityName + ' Corporate Setup',
    'Corporate Gym Setup & Employee Wellness in ' + cityName,
    'Corporate Gym & Wellness Setup in ' + cityName,
    'Design and equip corporate gyms and employee wellness rooms in ' + cityName + '. Boost productivity and retention with compact, high-impact fitness setups.',
    "<h2>Corporate Gym & Employee Wellness in " + cityName + "</h2> <p>Employers in " + cityAreas + " are investing in on-site fitness to improve productivity, wellbeing and retention. TechFit designs corporate gyms and compact wellness rooms that fit office floorplates and corporate parks, delivering a high-impact facility employees actually use — without demanding a large footprint or budget.</p> <h2>Compact, Productive Layouts with Installation & AMC</h2> <p>We plan the space in 3D, specify a balanced mix of cardio, strength and functional equipment (BH Fitness, Tunturi) sized to headcount, and deliver from our Mumbai facility with certified installation. An Annual Maintenance Contract keeps the facility safe and running, so HR and admin teams have a single dependable partner for the office wellness programme.</p>",
    [['How large does a corporate gym in ' + cityName + ' need to be?','It can be surprisingly compact — we design layouts sized to headcount and available floor space, from a small wellness room to a full office gym, for workplaces across ' + cityName + '.'],
     ['Do you handle installation and maintenance for office gyms?','Yes. We deliver certified installation and an Annual Maintenance Contract, giving your facilities and HR teams one accountable partner for the corporate gym.']]];
}

for (const [k, n, a] of CITIES) {
  PAGES.push(hotel(k, n, a));
  PAGES.push(society(k, n, a));
  PAGES.push(corporate(k, n, a));
}

// ---- Build GUIDES_DATA entry text ----
function faqJson(faqs) {
  return JSON.stringify(faqs.map(([q, a]) => ({ q, a })));
}
function entryText(p) {
  const [slug, badge, title, h1, desc, html, faqs] = p;
  return "  '" + slug + "': {\n" +
    "    title: `" + esc(title) + "`,\n" +
    "    badge: `" + esc(badge) + "`,\n" +
    "    desc: `" + esc(desc) + "`,\n" +
    "    h1: `" + esc(h1) + "`,\n" +
    "    author: `" + AUTHOR + "`,\n" +
    "    publishedDate: `" + DATE + "`,\n" +
    "    category: `City Setup`,\n" +
    "    related: " + REL + ",\n" +
    "    faqs: " + faqJson(faqs) + ",\n" +
    "    htmlContent: `" + esc(html) + "`\n" +
    "  },\n";
}

let src = fs.readFileSync(APP, 'utf8');
const slugs = PAGES.map(p => p[0]);

// idempotency guard
const already = slugs.filter(s => src.includes("'" + s + "':"));
// count only occurrences inside GUIDES_DATA region is complex; use a marker
const alreadyInData = slugs.filter(s => new RegExp("'" + s.replace(/[-\/]/g, '\\$&') + "'\\s*:\\s*\\{[\\s\\S]{0,40}badge").test(src));
if (alreadyInData.length) {
  console.log('Already inserted (skipping GUIDES_DATA):', alreadyInData.join(', '));
}

// 1) Insert GUIDES_DATA entries before its closing `};`
if (alreadyInData.length < slugs.length) {
  const marker = "'commercial-gym-setup-delhi-ncr': {";
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error('delhi-ncr GUIDES_DATA marker not found');
  // find the closing of GUIDES_DATA: first "\n};\n" after the delhi-ncr entry
  const closeIdx = src.indexOf('\n};', idx);
  if (closeIdx === -1) throw new Error('GUIDES_DATA close not found');
  const block = PAGES.map(entryText).join('');
  src = src.slice(0, closeIdx + 1) + block + src.slice(closeIdx + 1);
  console.log('Inserted', PAGES.length, 'GUIDES_DATA entries.');
}

// 2) Add slugs to guideSlugs array
const gsMarker = 'const guideSlugs = [';
const gsIdx = src.indexOf(gsMarker);
if (gsIdx === -1) throw new Error('guideSlugs not found');
const gsEnd = src.indexOf('];', gsIdx);
let gsArr = src.slice(gsIdx + gsMarker.length, gsEnd);
const toAdd = slugs.filter(s => !gsArr.includes('"' + s + '"'));
if (toAdd.length) {
  const addition = toAdd.map(s => '"' + s + '"').join(',');
  src = src.slice(0, gsEnd) + ',' + addition + src.slice(gsEnd);
  console.log('Added', toAdd.length, 'slugs to guideSlugs.');
} else {
  console.log('guideSlugs already contains all slugs.');
}

// 3) Add to commercialPages map (quote-form CTA)
const cpMarker = 'const commercialPages = {';
const cpIdx = src.indexOf(cpMarker);
if (cpIdx === -1) throw new Error('commercialPages not found');
const cpOpen = cpIdx + cpMarker.length;
const cpLabel = {
  'commercial': 'Commercial Gym Setup',
  'hotel': 'Hotel & Resort Gym Setup',
  'society': 'Society & Clubhouse Gym Setup',
  'corporate': 'Corporate Gym & Wellness Setup',
};
const cpAdditions = slugs
  .filter(s => !src.slice(cpIdx, src.indexOf('};', cpIdx)).includes("'" + s + "'"))
  .map(s => {
    const kind = s.split('-')[0];
    const city = s.replace(/^[a-z]+-gym-setup-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).replace('Ncr', 'NCR');
    return "        '" + s + "': '" + cpLabel[kind] + " in " + city + "'";
  });
if (cpAdditions.length) {
  src = src.slice(0, cpOpen) + '\n' + cpAdditions.join(',\n') + ',' + src.slice(cpOpen);
  console.log('Added', cpAdditions.length, 'entries to commercialPages.');
} else {
  console.log('commercialPages already contains all slugs.');
}

fs.writeFileSync(APP, src);
console.log('Done. app.js patched.');
