const fs = require('fs');
let html = fs.readFileSync('public/pilates.html', 'utf-8');

// The desired order of series
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
  'Props & Small Equipment'
];

function getSeriesScore(series) {
  const index = seriesOrder.indexOf(series);
  return index === -1 ? 999 : index;
}

// Extract PL_DATA
const plDataRegex = /const PL_DATA=\[(.*?)\];/s;
const plDataMatch = html.match(plDataRegex);
let plData = [];
if (plDataMatch) {
  plData = JSON.parse('[' + plDataMatch[1] + ']');
}

// 1. Sort PL_DATA
plData.sort((a, b) => {
  if (a.brand !== b.brand) return a.brand === 'Merrithew STOTT PILATES' ? -1 : 1;
  const scoreA = getSeriesScore(a.series.replace(/&/g, '&amp;'));
  const scoreB = getSeriesScore(b.series.replace(/&/g, '&amp;'));
  if (scoreA !== scoreB) return scoreA - scoreB;
  return 0; // retain original relative order for items in same category
});

// Assign new IDs
plData.forEach((item, i) => item.id = i);

// Replace PL_DATA in HTML
html = html.replace(plDataRegex, 'const PL_DATA=' + JSON.stringify(plData) + ';');

// 2. Regenerate HTML Grid
// It's safer to extract all <article> elements, parse their data-series, sort them, and inject them back.
const articleRegex = /<article class="pc"[\s\S]*?<\/article>/g;
const articles = html.match(articleRegex);

if (articles) {
  // Map articles to objects
  const articleObjects = articles.map(art => {
    const tabMatch = art.match(/data-tab="([^"]+)"/);
    const seriesMatch = art.match(/data-series="([^"]+)"/);
    const tab = tabMatch ? tabMatch[1] : '';
    let series = seriesMatch ? seriesMatch[1] : '';
    if (series === 'Barrels &amp; Spine Correctors') series = 'Barrels';
    return {
      html: art,
      tab: tab,
      series: series
    };
  });

  // Sort articles
  articleObjects.sort((a, b) => {
    if (a.tab !== b.tab) return a.tab === 'merr' ? -1 : 1;
    const scoreA = getSeriesScore(a.series.replace(/&/g, '&amp;'));
    const scoreB = getSeriesScore(b.series.replace(/&/g, '&amp;'));
    if (scoreA !== scoreB) return scoreA - scoreB;
    return 0;
  });

  // Since PL_DATA was sorted the exact same way, the index in PL_DATA might not perfectly align if we don't sync `plOpen(idx)`.
  // Let's rewrite the onclick="plOpen(idx)" in the sorted HTML.
  let merrHtml = '';
  let tfpHtml = '';

  articleObjects.forEach((obj) => {
    // We need to find the matching product in plData to get its new id
    const nameMatch = obj.html.match(/<h3 class="pc-n">(.*?)<\/h3>/);
    const skuMatch = obj.html.match(/<div class="pc-s">(.*?)<\/div>/);
    const name = nameMatch ? nameMatch[1].replace(/&amp;/g, '&') : '';
    const sku = skuMatch ? skuMatch[1] : '';
    
    const matchingItem = plData.find(p => p.sku === sku || p.name === name);
    let newHtml = obj.html;
    if (matchingItem) {
      newHtml = newHtml.replace(/onclick="plOpen\(\d+\)"/g, `onclick="plOpen(${matchingItem.id})"`);
      newHtml = newHtml.replace(/onkeypress="if\(event\.key==='Enter'\)plOpen\(\d+\)"/g, `onkeypress="if(event.key==='Enter')plOpen(${matchingItem.id})"`);
    }

    if (obj.tab === 'merr') merrHtml += newHtml;
    else tfpHtml += newHtml;
  });

  // Now replace the old articles in the HTML.
  // The articles are between <div class="grid" id="grid"> and <div class="empty" id="e-merr">
  const gridStartRegex = /<div class="grid" id="grid">[\s\S]*?(?=<div class="empty" id="e-merr">)/;
  html = html.replace(gridStartRegex, '<div class="grid" id="grid">' + merrHtml + tfpHtml);
}

// 3. Update JSON-LD
const jsonLdRegex = /"@type": "ItemList",\s*"numberOfItems": \d+,\s*"itemListElement": \[(.*?)\]\s*\}/s;
const jsonLdMatch = html.match(jsonLdRegex);
if (jsonLdMatch) {
  const listItems = [];
  plData.forEach((p, i) => {
    listItems.push({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "sku": p.sku,
        "brand": { "@type": "Brand", "name": p.brand },
        "image": p.img.startsWith('http') ? p.img : `https://www.techfittech.com${p.img}`
      }
    });
  });
  html = html.replace(jsonLdMatch[1], JSON.stringify(listItems).slice(1, -1));
}

fs.writeFileSync('public/pilates.html', html);
console.log('Successfully sorted products!');
