#!/usr/bin/env node
/*
 * add-comparison-guides.cjs
 * Fixes the last 3 orphaned routes that Soft-404 (in validPages + sitemap, no renderer):
 *   cosco-vs-bh-fitness, viva-vs-tunturi, decathlon-domyos-vs-commercial-gym-equipment
 * Adds a GUIDES_DATA entry + guideSlugs slug for each. Idempotent.
 */
const fs = require('fs');
const path = require('path');
const APP = path.resolve(__dirname, '..', 'public/assets/app.js');
const AUTHOR = 'Ali Asgar Potia';
const DATE = '2026-06-15';
const REL = '[{"slug":"best-gym-equipment-brands-india","name":"Best Gym Equipment Brands in India"},{"slug":"imported-vs-indian-gym-equipment","name":"Imported vs Indian Gym Equipment"}]';
function esc(s){return s.replace(/`/g,"'").replace(/\$\{/g,'(');}

const PAGES = [
  ['cosco-vs-bh-fitness','Sourcing Comparison',
   'Cosco vs BH Fitness: Commercial Gym Equipment Compared',
   'Cosco vs BH Fitness: Which to Choose for a Commercial Gym',
   'Cosco vs BH Fitness for commercial gym sourcing — build quality, warranty, service and total cost of ownership, compared by TechFit for B2B buyers in India.',
   "<h2>Cosco vs BH Fitness: What B2B Buyers Should Weigh</h2> <p>Cosco is a well-known Indian sports brand with broad availability and entry-level pricing, while BH Fitness is a Spanish manufacturer built around commercial-grade cardio and strength for high-footfall facilities. For a home or light-use corner, budget brands can be enough; for a commercial gym, hotel or society clubhouse running all day, the deciding factors are frame durability, console reliability, spare-part support and warranty — where dedicated commercial lines are engineered to last.</p> <h2>How TechFit Advises on the Choice</h2> <p>As a distributor of BH Fitness and other commercial brands, TechFit helps operators match equipment to real usage and budget rather than headline price. We supply commercial-grade cardio, strength and functional equipment with certified installation and an Annual Maintenance Contract, so total cost of ownership — not just the sticker price — drives the decision.</p>",
   [['Is BH Fitness better than Cosco for a commercial gym?','For continuous commercial use, commercial-grade brands like BH Fitness are built for higher footfall, with sturdier frames, better warranties and spare-part support. Cosco suits lighter or home use. TechFit advises based on your footfall and budget.'],
    ['Does TechFit provide warranty and service on commercial equipment?','Yes. Every setup includes certified installation and an Annual Maintenance Contract with service-engineer support, so equipment stays reliable over its full life.']]],

  ['viva-vs-tunturi','Sourcing Comparison',
   'Viva Fitness vs Tunturi: Commercial Equipment Compared',
   'Viva Fitness vs Tunturi: B2B Sourcing Compared',
   'Viva Fitness vs Tunturi for commercial and premium residential gyms — build, features, warranty and value, compared by TechFit for Indian B2B buyers.',
   "<h2>Viva Fitness vs Tunturi: Positioning for Your Project</h2> <p>Viva Fitness is a value-focused Indian brand offering strong specification for the price, while Tunturi is a heritage Finnish brand with a premium finish and feature set favoured by hotels and high-end residential clubhouses. The right choice depends on the project: value-engineered fit-outs and society gyms often lean Viva, while flagship and hospitality sites that trade on brand perception lean Tunturi.</p> <h2>One Partner, Both Brands</h2> <p>TechFit distributes both Viva Fitness and Tunturi, so our recommendation is guided by your footfall, positioning and budget rather than by pushing a single brand. We deliver turnkey supply, certified installation and an Annual Maintenance Contract across both, giving you a single accountable partner whichever line you choose.</p>",
   [['Should I choose Viva Fitness or Tunturi?','Viva offers strong value for society and value-engineered gyms; Tunturi suits premium hotel and residential projects where finish and brand matter. TechFit supplies both and advises based on your project.'],
    ['Can TechFit mix both brands in one gym?','Yes. We often combine value and premium lines within a single facility to hit the right balance of budget and positioning, with unified installation and maintenance.']]],

  ['decathlon-domyos-vs-commercial-gym-equipment','Sourcing Comparison',
   'Decathlon Domyos vs Commercial Gym Equipment',
   'Decathlon Domyos vs Commercial Gym Equipment: What to Buy',
   'Decathlon Domyos vs commercial gym equipment — why home-use ranges fall short for high-footfall gyms, and what commercial-grade sourcing looks like, from TechFit.',
   "<h2>Decathlon Domyos vs Commercial Gym Equipment</h2> <p>Decathlon's Domyos range is designed and priced for home and light personal use. It is excellent for that purpose, but a commercial gym, hotel fitness centre or society clubhouse sees continuous, multi-user footfall that home equipment is not warranted or engineered for — leading to faster wear, downtime and safety concerns. Commercial-grade cardio and strength equipment uses heavier frames, higher-duty motors and consoles rated for constant use.</p> <h2>What Commercial-Grade Sourcing Looks Like</h2> <p>TechFit supplies commercial-rated equipment (BH Fitness, Tunturi, California Fitness and more) with warranties and spare-part support intended for institutional use, plus custom functional rigs. Every project includes certified installation and an Annual Maintenance Contract, so a facility built for footfall stays safe and operational — the total-cost difference a consumer range cannot match.</p>",
   [['Can I use Decathlon Domyos equipment in a commercial gym?','Home-use ranges like Domyos are not warranted or engineered for continuous multi-user footfall, so they wear faster and can pose safety and downtime issues in commercial settings. Commercial-grade equipment is the appropriate choice.'],
    ['What makes equipment commercial-grade?','Heavier frames, higher-duty components and consoles rated for constant use, backed by commercial warranties and spare-part support. TechFit supplies this class of equipment with installation and AMC.']]],
];

function faqJson(f){return JSON.stringify(f.map(([q,a])=>({q,a})));}
function entryText(p){const[slug,badge,title,h1,desc,html,faqs]=p;
  return "  '"+slug+"': {\n"+
  "    title: `"+esc(title)+"`,\n"+
  "    badge: `"+esc(badge)+"`,\n"+
  "    desc: `"+esc(desc)+"`,\n"+
  "    h1: `"+esc(h1)+"`,\n"+
  "    author: `"+AUTHOR+"`,\n"+
  "    publishedDate: `"+DATE+"`,\n"+
  "    category: `Sourcing Comparison`,\n"+
  "    related: "+REL+",\n"+
  "    faqs: "+faqJson(faqs)+",\n"+
  "    htmlContent: `"+esc(html)+"`\n"+
  "  },\n";
}

let src=fs.readFileSync(APP,'utf8');
const slugs=PAGES.map(p=>p[0]);
const need=slugs.filter(s=>!new RegExp("'"+s.replace(/[-\/]/g,'\\$&')+"'\\s*:\\s*\\{[\\s\\S]{0,40}badge").test(src));
if(need.length){
  const marker="'commercial-gym-setup-delhi-ncr': {";
  const idx=src.indexOf(marker);
  const closeIdx=src.indexOf('\n};',idx);
  const block=PAGES.filter(p=>need.includes(p[0])).map(entryText).join('');
  src=src.slice(0,closeIdx+1)+block+src.slice(closeIdx+1);
  console.log('Inserted',need.length,'comparison GUIDES_DATA entries.');
} else { console.log('comparison entries already present.'); }

// guideSlugs
const gsMarker='const guideSlugs = [';
const gsIdx=src.indexOf(gsMarker);
const gsEnd=src.indexOf('];',gsIdx);
const gsArr=src.slice(gsIdx+gsMarker.length,gsEnd);
const toAdd=slugs.filter(s=>!gsArr.includes('"'+s+'"'));
if(toAdd.length){src=src.slice(0,gsEnd)+','+toAdd.map(s=>'"'+s+'"').join(',')+src.slice(gsEnd);console.log('Added',toAdd.length,'to guideSlugs.');}

fs.writeFileSync(APP,src);
console.log('Done.');
