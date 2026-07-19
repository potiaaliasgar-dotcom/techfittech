const fs = require('fs');

let html = fs.readFileSync('public/pilates.html', 'utf-8');

// 1. Fix the logo link
html = html.replace(/onclick="go\('home'\)"/g, 'onclick="window.location.href=\'/\'"');
html = html.replace(/onclick="go\(&#39;home&#39;\)"/g, 'onclick="window.location.href=\'/\'"');

// 2. Fix the grid issue. We need to separate merrHtml and tfpHtml back into their respective grids.
// Currently, the first grid (p-merr) contains ALL articles.
// The second grid (p-tfp) is untouched from the original HTML?
// Wait, let's extract PL_DATA from HTML to regenerate the articles cleanly.

const plDataMatch = html.match(/const PL_DATA=\[(.*?)\];/s);
if (plDataMatch) {
  const plData = JSON.parse('[' + plDataMatch[1] + ']');
  
  let merrHtml = '';
  let tfpHtml = '';
  
  plData.forEach(p => {
    const q = (p.name + ' ' + (p.brand==='Merrithew STOTT PILATES'?'merr':'tfp') + ' ' + p.sku + ' ' + p.series).toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const tab = p.brand === 'Merrithew STOTT PILATES' ? 'merr' : 'tfp';
    const seriesLabel = p.series === 'Barrels' ? 'Barrels &amp; Spine Correctors' : p.series;
    
    const article = `<article class="pc" data-tab="${tab}" data-series="${seriesLabel.replace('&amp;', '&')}" data-q="${q}" onclick="plOpen(${p.id})" tabindex="0" onkeypress="if(event.key==='Enter')plOpen(${p.id})"><div class="pc-img"><img src="${p.img}" alt="${p.name} | TechFit Pilates Pilates equipment India" loading="lazy" decoding="async"></div><div class="pc-b"><div class="pc-chip">${seriesLabel}</div><h3 class="pc-n">${p.name.replace('&', '&amp;')}</h3><div class="pc-s">${p.sku}</div></div></article>`;
    
    if (tab === 'merr') merrHtml += article;
    else tfpHtml += article;
  });
  
  // Replace the contents of the merr grid
  const merrGridRegex = /(<section class="panel on" id="p-merr">[\s\S]*?<div class="grid" id="grid">)[\s\S]*?(<div class="empty" id="e-merr">)/;
  html = html.replace(merrGridRegex, `$1${merrHtml}$2`);
  
  // Replace the contents of the tfp grid
  const tfpGridRegex = /(<section class="panel" id="p-tfp">[\s\S]*?<div class="grid" id="grid">)[\s\S]*?(<div class="empty" id="e-tfp">)/;
  html = html.replace(tfpGridRegex, `$1${tfpHtml}$2`);
}

fs.writeFileSync('public/pilates.html', html);
console.log('Fixed grids and links in pilates.html');
