const fs = require('fs');

// 1. index.html
let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace(/,\s*\{\s*"@type":\s*"ListItem",\s*"position":\s*8,\s*"name":\s*"Padel & Pickleball Courts",\s*"url":\s*"https:\/\/www\.techfittech\.com\/padel-pickleball"\s*\}/, '');
idx = idx.replace(/"padel-pickleball":\s*"Padel & Pickleball Courts",\s*/, '');
idx = idx.replace(/\s*<button class="nd-item" onclick="go\('padel-pickleball'\)">Padel &amp; Pickleball<\/button>/, '');
idx = idx.replace(/\s*<button class="mob-sub" onclick="go\('padel-pickleball'\)">Padel &amp; Pickleball<\/button>/, '');
fs.writeFileSync('index.html', idx);

// 3. public/assets/app.js
let app = fs.readFileSync('public/assets/app.js', 'utf8');
app = app.replace(/\s*'padel-pickleball':\s*\{[\s\S]*?\},\s*'aqua':/m, "\n      'aqua':");
app = app.replace(/\s*\} else if \(key === 'padel-pickleball'\) \{[\s\S]*?(?=\} else if)/m, "");
app = app.replace(/\s*'padel-pickleball':\s*renderPadel,/m, '');
app = app.replace(/\s*'padel-pickleball':\s*'.*?',/m, '');
app = app.replace(/\s*<div class="seg-card reveal" onclick="go\('padel-pickleball'\)">[\s\S]*?<\/div>\s*(?=<div class="seg-card)/m, '\n      ');
app = app.replace(/,\s*'padel-pickleball'/g, '');
app = app.replace(/\s*function renderPadel\(\) \{[\s\S]*?\}\s*(?=function renderAqua\(\) \{)/m, "\n    ");
fs.writeFileSync('public/assets/app.js', app);

// 2. generate-seo-pages.mjs
let seo = fs.readFileSync('scripts/generate-seo-pages.mjs', 'utf8');
seo = seo.replace(/\s*'padel-pickleball':\s*\{[\s\S]*?\},\s*'aqua':/m, "\n  'aqua':"); // SEO_MAP
seo = seo.replace(/,\s*'padel-pickleball'/g, ''); // arrays
seo = seo.replace(/\s*'padel-pickleball':\s*`[\s\S]*?`,\s*'aqua':/m, "\n  'aqua':"); // HTML block
seo = seo.replace(/\s*'padel-pickleball':\s*\{[\s\S]*?\},\s*'aqua':/m, "\n  'aqua':"); // alt map
seo = seo.replace(/\s*'padel-pickleball':\s*".*?",/g, ''); // descriptions
fs.writeFileSync('scripts/generate-seo-pages.mjs', seo);
