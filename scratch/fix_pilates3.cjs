const fs = require('fs');
let html = fs.readFileSync('public/pilates.html', 'utf-8');

const seriesOrder = [
  'Packages',
  'Reformers',
  'Cadillac &amp; Towers',
  'Cadillac & Towers',
  'Stability Chair',
  'Barrels',
  'Stability Barre',
  'Reformer Accessories',
  'Props &amp; Small Equipment',
  'Props & Small Equipment',
  'Wooden',
  'Aluminium',
  'Studio Gym',
  'Foldable'
];

function getSeriesScore(series, name) {
  const lowerName = name.toLowerCase();
  let baseScore = seriesOrder.indexOf(series);
  if (baseScore === -1) baseScore = 99;
  
  if (lowerName.includes('bundle') || lowerName.includes('package') || lowerName.includes('nx3')) {
    return baseScore - 1000;
  }
  return baseScore;
}

const plDataMatch = html.match(/const PL_DATA=\[(.*?)\];/s);
if (plDataMatch) {
  const plData = JSON.parse('[' + plDataMatch[1] + ']');
  
  // Sort PL_DATA
  plData.sort((a, b) => {
    if (a.brand !== b.brand) return a.brand === 'Merrithew STOTT PILATES' ? -1 : 1;
    const scoreA = getSeriesScore(a.series.replace(/&/g, '&amp;'), a.name);
    const scoreB = getSeriesScore(b.series.replace(/&/g, '&amp;'), b.name);
    if (scoreA !== scoreB) return scoreA - scoreB;
    // Secondary sort by name
    return a.name.localeCompare(b.name);
  });
  
  plData.forEach((item, i) => item.id = i);
  html = html.replace(plDataMatch[0], 'const PL_DATA=' + JSON.stringify(plData) + ';');
  
  // Generate HTML for both tabs
  let merrHtml = '';
  let tfpHtml = '';
  
  plData.forEach(p => {
    const q = (p.name + ' ' + (p.brand==='Merrithew STOTT PILATES'?'merr':'tfp') + ' ' + p.sku + ' ' + p.series).toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const tab = p.brand === 'Merrithew STOTT PILATES' ? 'merr' : 'tfp';
    let seriesLabel = p.series;
    if (seriesLabel === 'Barrels') seriesLabel = 'Barrels &amp; Spine Correctors';
    if (seriesLabel.includes('&')) seriesLabel = seriesLabel.replace(/&/g, '&amp;');
    seriesLabel = seriesLabel.replace(/&amp;amp;/g, '&amp;');
    
    const article = `<article class="pc" data-tab="${tab}" data-series="${seriesLabel}" data-q="${q}" onclick="plOpen(${p.id})" tabindex="0" onkeypress="if(event.key==='Enter')plOpen(${p.id})">\n<div class="pc-img"><img src="${p.img}" alt="${p.name.replace(/"/g, '&quot;')} | TechFit Pilates Pilates equipment India" loading="lazy" decoding="async"></div>\n<div class="pc-b"><div class="pc-chip">${seriesLabel}</div><h3 class="pc-n">${p.name.replace(/&/g, '&amp;').replace(/&amp;amp;/g, '&amp;')}</h3><div class="pc-s">${p.sku}</div></div>\n</article>\n`;
    
    if (tab === 'merr') merrHtml += article;
    else tfpHtml += article;
  });
  
  // Clean up the grids in the HTML
  const merrGridRegex = /(<section class="panel on" id="p-merr">[\s\S]*?<div class="pgrid" id="g-merr">)[\s\S]*?(<div class="empty" id="e-merr">)/;
  if (!merrGridRegex.test(html)) {
      console.error("merrGridRegex failed");
  } else {
      html = html.replace(merrGridRegex, `$1\n${merrHtml}$2`);
      console.log("merrGridRegex matched and replaced");
  }
  
  const tfpGridRegex = /(<section class="panel" id="p-tfp">[\s\S]*?<div class="pgrid" id="g-tfp">)[\s\S]*?(<div class="empty" id="e-tfp">)/;
  if (!tfpGridRegex.test(html)) {
      console.error("tfpGridRegex failed");
  } else {
      html = html.replace(tfpGridRegex, `$1\n${tfpHtml}$2`);
      console.log("tfpGridRegex matched and replaced");
  }
  
  // Update JSON-LD
  const jsonLdRegex = /"@type": "ItemList",\s*"numberOfItems": \d+,\s*"itemListElement": \[(.*?)\]\s*\}/s;
  const jsonLdMatch = html.match(jsonLdRegex);
  if (jsonLdMatch) {
    const listItems = plData.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "sku": p.sku,
        "brand": { "@type": "Brand", "name": p.brand },
        "image": p.img.startsWith('http') ? p.img : `https://www.techfittech.com${p.img}`
      }
    }));
    html = html.replace(jsonLdMatch[1], JSON.stringify(listItems).slice(1, -1));
    console.log("JSON-LD matched and replaced");
  }
}

fs.writeFileSync('public/pilates.html', html);
console.log('Successfully fixed pilates.html grids.');
