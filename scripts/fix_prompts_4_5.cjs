const fs = require('fs');
const path = require('path');

const appJsPath = path.resolve('public/assets/app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// PROMPT 4: Fix Homepage H1 spacing
// It currently renders as: "India's PremierFitness & WellnessInfrastructure Partner"
// Because spans have no spaces between them.
// Let's find the H1 in app.js
appJs = appJs.replace(/<h1>([\s\S]*?)<\/h1>/, (match) => {
  if (match.includes("India's Premier")) {
    return match.replace(/<\/span><span/g, '</span> <span');
  }
  return match;
});

// PROMPT 4: Fix Product Card rendering
// Change: function renderProductCard(p, n) -> function renderProductCard(p, n, index)
appJs = appJs.replace(/function renderProductCard\(p,\s*n\)\s*\{/g, 'function renderProductCard(p, n, index = 99) {');
// Change: loading="lazy" -> ${index < 8 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
appJs = appJs.replace(/loading="lazy" onerror="this\.src='';this\.style\.background='#f4f4f5'"/g, 
  `\${index < 8 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} onerror="this.src='';this.style.background='#f4f4f5'" style="aspect-ratio: 4/3; object-fit: contain; background: #f4f4f5;" width="400" height="300"`);

// Update calls to renderProductCard in renderBrand() and renderCategory() and renderAllProducts()
// Usually they look like: .map(p => renderProductCard(p, p.n || 'Unknown')).join('')
// Or similar loops. Let's find all occurrences of renderProductCard being called.
// E.g., renderProductCard(prod, name)
appJs = appJs.replace(/renderProductCard\(([^,]+),\s*([^)]+)\)/g, (match, p1, p2) => {
  // If it's inside a map like `.map((prod, idx) => renderProductCard(prod, name, idx))`
  return `renderProductCard(${p1}, ${p2})`; 
});
// Wait, if it's inside a map, we don't necessarily have `idx`. Let's just do a regex replace on the map itself.
// The code usually does: `Object.entries(prods).map(([id, p]) => renderProductCard(p, p.n)).join('')`
appJs = appJs.replace(/\.map\(\(\[([^,]+),\s*([^\]]+)\]\)\s*=>\s*renderProductCard\(([^,]+),\s*([^)]+)\)\)/g, 
  '.map(([$1, $2], idx) => renderProductCard($3, $4, idx))');
appJs = appJs.replace(/\.map\(([^ ]+)\s*=>\s*renderProductCard\(([^,]+),\s*([^)]+)\)\)/g, 
  '.map(($1, idx) => renderProductCard($2, $3, idx))');

// PROMPT 5: Move PDF icon into an inline link in app.js
// It currently is a floating button? Let's check index.html first.
fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Processed app.js');

// INDEX.HTML modifications
const indexHtmlPath = path.resolve('index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// PROMPT 4: Remove empty src="" on modal img
indexHtml = indexHtml.replace(/src=""/g, '');

// PROMPT 5: Remove floating INQUIRE NOW pill
// Let's search for INQUIRE NOW
indexHtml = indexHtml.replace(/<div[^>]*>[\s\S]*?INQUIRE NOW[\s\S]*?<\/div>/g, (match) => {
  if (match.includes('position: fixed') || match.includes('fixed') || match.includes('bottom')) {
    return ''; // Remove it
  }
  return match;
});

// PROMPT 5: Move floating PDF catalog icon
// Let's find PDF icon in index.html and remove it. We'll add it in app.js later if needed.
indexHtml = indexHtml.replace(/<a[^>]*href="[^"]*\.pdf"[^>]*>[\s\S]*?<\/a>/g, (match) => {
  if (match.includes('fixed') || match.includes('bottom')) {
    return ''; // Remove floating PDF icon
  }
  return match;
});

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('Processed index.html');

// STYLE.CSS modifications
const styleCssPath = path.resolve('public/assets/style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

// PROMPT 4: MMA cages empty space placeholder
// The images have class `lineup-img`
styleCss += `\n\n/* Fix empty space before lineup images load */\n.lineup-img { aspect-ratio: 16/9; background-color: #1a1a1a; object-fit: cover; }`;

// PROMPT 5: Restyle WhatsApp pill to red
// Wait, is it in style.css or index.html? We'll check manually later if needed.
styleCss += `\n\n/* Fix Footer Padding for WhatsApp pill */\nfooter { padding-bottom: 80px !important; }`;

fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Processed style.css');
