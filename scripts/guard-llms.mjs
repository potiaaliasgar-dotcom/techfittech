import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('.');
const LLMS_PATHS = [
  path.join(ROOT, 'public/llms.txt'),
  path.join(ROOT, 'public/llms-full.txt'),
  path.join(ROOT, 'dist/llms.txt'),
  path.join(ROOT, 'dist/llms-full.txt')
];

// Current date formatted as YYYY-MM-DD
const now = new Date();
const todayStr = now.toISOString().split('T')[0];

console.log(`=== Updating and Validating llms.txt / llms-full.txt (Date: ${todayStr}) ===`);

for (const p of LLMS_PATHS) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/# Last updated: \d{4}-\d{2}-\d{2}/g, `# Last updated: ${todayStr}`);
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✔ Stamped today's date in ${path.relative(ROOT, p)}`);
  }
}

// Validate URLs in public/llms.txt against dist/
const llmsContent = fs.readFileSync(path.join(ROOT, 'public/llms.txt'), 'utf8');
const urlMatches = llmsContent.match(/https:\/\/www\.techfittech\.com\/[a-zA-Z0-9\-_/.]+/g) || [];
const uniqueUrls = [...new Set(urlMatches)];

let failed = false;
console.log(`\nValidating ${uniqueUrls.length} URLs from llms.txt...`);

for (const url of uniqueUrls) {
  const route = url.replace('https://www.techfittech.com/', '').replace(/^\/+/, '').replace(/\/+$/, '');
  if (route === '' || route === 'sitemap.xml' || route === 'llms-full.txt') continue;

  const targetHtml = path.join(ROOT, 'dist', route, 'index.html');
  const targetRoot = path.join(ROOT, 'dist', route);

  if (!fs.existsSync(targetHtml) && !fs.existsSync(targetRoot)) {
    console.error(`❌ Broken URL in llms.txt: ${url} (Could not find ${path.relative(ROOT, targetHtml)})`);
    failed = true;
  }
}

if (failed) {
  console.error('\n❌ llms.txt validation failed. Broken URLs found.');
  process.exit(1);
} else {
  console.log('✅ All URLs in llms.txt resolve to valid 200 static pages in dist/!\n');
}
