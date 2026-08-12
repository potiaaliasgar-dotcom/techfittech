const fs = require('fs');
let html = fs.readFileSync('public/pilates.html', 'utf-8');

const newProducts = [
  { sku: 'ST-REMOVED-11092', name: 'NX3 Reformer Bundle', series: 'Reformers', img: '/pilates-assets/merrithew/mr-ST-REMOVED-11092.png', desc: 'Canadian FSC Maple, locking footbar, 26" carriage, EasyShift gearbar, black upholstery. Exceptional craftsmanship.', specs: ['Canadian FSC Maple', 'Black upholstery'] },
  { sku: 'ST-REMOVED-11093', name: 'NX3 Reformer Plus Bundle', series: 'Reformers', img: '/pilates-assets/merrithew/mr-ST-REMOVED-11093.png', desc: 'Canadian FSC Maple, locking footbar, 26" carriage, EasyShift gearbar, black upholstery. Exceptional craftsmanship.', specs: ['Canadian FSC Maple', 'Black upholstery'] },
  { sku: 'ST-11105', name: 'V2 Max™ Reformer Bundle (Jet Black)', series: 'Reformers', img: '/pilates-assets/merrithew/mr-ST-11105.png' },
  { sku: 'ST-11036', name: 'Complete Studio Package V2 Max™ Plus', series: 'Packages', img: '/pilates-assets/merrithew/mr-ST-11036.png' },
  { sku: 'ST-11038', name: 'Complete Studio Package SPX Max Plus', series: 'Packages', img: '/pilates-assets/merrithew/mr-ST-11038.png' },
  { sku: 'ST-01085', name: 'Rehab V2 Max Plus™ Reformer Bundle', series: 'Reformers', img: '/pilates-assets/merrithew/mr-ST-01085.png' },
  { sku: 'ST-01011', name: 'Spine Corrector (Baltic Birch wood)', series: 'Barrels', img: '/pilates-assets/merrithew/mr-ST-01011.png' },
  { sku: 'ST-02000', name: 'Reformer Box', series: 'Reformer Accessories', img: '/pilates-assets/merrithew/mr-ST-02000.png' },
  { sku: 'ST-02141', name: 'Pilates Express Mat (Sapphire)', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-ST-02141.png' },
  { sku: 'ST-02206', name: 'Parallel Stability Barres 8ft (Grey)', series: 'Stability Barre', img: '/pilates-assets/merrithew/mr-ST-02206.png' },
  { sku: 'ST-02253', name: 'Jumpboard & Cross-Bow™ (SPX/SPX Max)', series: 'Reformer Accessories', img: '/pilates-assets/merrithew/mr-ST-02253.png' },
  { sku: 'ST-05097', name: 'Reformer Spring · 125%', series: 'Reformer Accessories', img: '/pilates-assets/merrithew/mr-ST-05097.png' },
  { sku: 'ST-06071', name: 'Stability Cushion™ · Small', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-ST-06071.png' },
  { sku: 'ST-06106', name: 'Mini Handweights 2.75 lb', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-ST-06106.png' },
  { sku: 'ST-06169', name: 'Foam Roller™ Soft Density 36 inch', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-ST-06169.png' },
  { sku: 'ST-06176', name: 'BOSU® PRO Balance Trainer', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-ST-06176.png' },
  { sku: 'ST-06193', name: 'Resistance Loop™ · Regular Strength', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-ST-06193.png' },
  { sku: 'DC-85226', name: 'IMP Accessories Essential Bundle', series: 'Props & Small Equipment', img: '/pilates-assets/merrithew/mr-DC-85226.png' }
];

const newHTML = [];
let currentIndex = 0;

html = html.replace(/const PL_DATA=\[(.*?)\];/s, (match, inner) => {
  const data = JSON.parse('[' + inner + ']');
  currentIndex = data.length;
  
  data.forEach(item => {
    if (item.desc) item.desc = item.desc.replace(/craftmanship/gi, 'craftsmanship');
  });

  newProducts.forEach((p, i) => {
    p.id = currentIndex + i + 1; // Assigning ID
    p.brand = 'Merrithew';
    data.push(p);

    const q = (p.name + ' merr ' + p.sku + ' ' + p.series).toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const idx = currentIndex + i;
    
    newHTML.push(`<article class="pc" data-tab="merr" data-series="${p.series}" data-q="${q}" onclick="plOpen(${idx})" tabindex="0" onkeypress="if(event.key==='Enter')plOpen(${idx})"><div class="pc-img"><img src="${p.img}" alt="${p.name} | TechFit Pilates Pilates equipment India" loading="lazy" decoding="async"></div><div class="pc-b"><div class="pc-chip">${p.series === 'Barrels' ? 'Barrels &amp; Spine Correctors' : p.series}</div><h3 class="pc-n">${p.name}</h3><div class="pc-s">${p.sku}</div></div></article>`);
  });

  return 'const PL_DATA=' + JSON.stringify(data) + ';';
});

const emptyDivIdx = html.indexOf('<div class="empty" id="e-merr">');
if (emptyDivIdx > -1) {
  html = html.substring(0, emptyDivIdx) + newHTML.join('') + html.substring(emptyDivIdx);
}

html = html.replace(/<i>139<\/i>/g, '<i>157</i>');
html = html.replace(/data-count="207"/g, 'data-count="225"');
html = html.replace(/<h2 class="brand-title">Merrithew<span class="pill">139<\/span><\/h2>/, '<h2 class="brand-title">Merrithew<span class="pill">157</span></h2>');
html = html.replace(/numberOfItems":207/g, 'numberOfItems":225');
html = html.replace(/46 apparatus \&middot\; 93 accessories/, '53 apparatus &middot; 104 accessories');

let jsonLdMatch = html.match(/"@type": "ItemList",\s*"numberOfItems": 225,\s*"itemListElement": \[(.*?)\]\s*\}/s);
if (jsonLdMatch) {
  const listItems = JSON.parse('[' + jsonLdMatch[1] + ']');
  let itemPos = listItems.length;
  newProducts.forEach((p) => {
    itemPos++;
    listItems.push({
      "@type": "ListItem",
      "position": itemPos,
      "item": {
        "@type": "Product",
        "name": p.name,
        "sku": p.sku,
        "brand": { "@type": "Brand", "name": "Merrithew" },
        "image": `https://www.techfittech.com${p.img}`
      }
    });
  });
  html = html.replace(jsonLdMatch[1], JSON.stringify(listItems).slice(1, -1));
}

fs.writeFileSync('public/pilates.html', html);
console.log('Appended 18 new products and updated counts');
