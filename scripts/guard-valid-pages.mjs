import fs from 'fs';
import path from 'path';

const appJsPath = path.resolve('public/assets/app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// The easiest way to get keys is to regex search for string literals right before a colon inside the GUIDES_DATA section
// Since GUIDES_DATA starts at `const GUIDES_DATA = {` and ends before `// ── ROUTING & INIT ──`
const guidesDataStart = appJsContent.indexOf('const GUIDES_DATA = {');
const routingInit = appJsContent.indexOf('// ── ROUTING & INIT ──');
const guidesDataSection = appJsContent.substring(guidesDataStart, routingInit);

// All string literals followed by a colon
const keysMatch = guidesDataSection.match(/'([^']+)'\s*:/g) || [];
const guidesDataKeys = keysMatch.map(k => k.replace(/[':]/g, '').trim());

// Extract validPages
const validPagesMatch = appJsContent.match(/const\s+validPages\s*=\s*(\[.*?\]);/s);
const validPagesStr = validPagesMatch[1].replace(/'/g, '"');
const validPages = JSON.parse(validPagesStr);

// Extract views keys
const viewsMatch = appJsContent.match(/const\s+views\s*=\s*\{([\s\S]*?)\};\s*const\s+guideSlugs/);
let viewsKeys = [];
if (viewsMatch) {
  const viewsStr = viewsMatch[1];
  const vkeysMatch = viewsStr.match(/'([^']+)'\s*:/g) || [];
  viewsKeys = vkeysMatch.map(k => k.replace(/[':]/g, '').trim());
}

// Extract guideSlugs
const guideSlugsMatch = appJsContent.match(/const\s+guideSlugs\s*=\s*(\[.*?\]);/s);
const guideSlugsStr = guideSlugsMatch[1].replace(/'/g, '"');
let guideSlugs = [];
try { guideSlugs = JSON.parse(guideSlugsStr); } catch(e){}

const dedicatedRoutes = ['hyrox', 'alteon'];
let failed = false;

console.log("=== Validating validPages against router ===");
validPages.forEach(slug => {
  if (slug === 'home' || slug === 'get-a-quote' || slug === '') return;
  
  const inViews = viewsKeys.includes(slug);
  const inGuides = guideSlugs.includes(slug) || guidesDataKeys.includes(slug);
  const inDedicated = dedicatedRoutes.includes(slug) || slug.startsWith('alteon/');

  if (!inViews && !inGuides && !inDedicated) {
    console.error(`❌ Orphaned route found: '${slug}' is in validPages but has no render branch!`);
    failed = true;
  }
});

if (failed) {
  console.error("\n❌ Build guard failed. Orphaned routes will Soft 404 in production.");
  process.exit(1);
} else {
  console.log("✅ Build guard passed. All validPages resolve to real content.");
}
