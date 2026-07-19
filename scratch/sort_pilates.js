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

// 1. Sort PL_DATA
const plDataRegex = /const PL_DATA=\[(.*?)\];/s;
const plDataMatch = html.match(plDataRegex);
if (plDataMatch) {
  const data = JSON.parse('[' + plDataMatch[1] + ']');
  data.sort((a, b) => {
    if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
    const scoreA = getSeriesScore(a.series.replace(/&/g, '&amp;'));
    const scoreB = getSeriesScore(b.series.replace(/&/g, '&amp;'));
    if (scoreA !== scoreB) return scoreA - scoreB;
    return a.name.localeCompare(b.name);
  });
  
  // Reassign IDs 0 to n
  data.forEach((item, i) => item.id = i);
  
  html = html.replace(plDataRegex, 'const PL_DATA=' + JSON.stringify(data) + ';');
}

// 2. Sort JSON-LD
const jsonLdRegex = /"@type": "ItemList",\s*"numberOfItems": \d+,\s*"itemListElement": \[(.*?)\]\s*\}/s;
const jsonLdMatch = html.match(jsonLdRegex);
if (jsonLdMatch) {
  const listItems = JSON.parse('[' + jsonLdMatch[1] + ']');
  // Sort listItems to match the new PL_DATA order
  // Wait, JSON-LD doesn't have series, it just has brand and name.
  // We can just recreate it from the sorted PL_DATA!
}

// Actually, regenerating the entire HTML grid from PL_DATA is much cleaner.
// Let's see if we can just regenerate the HTML grid.
