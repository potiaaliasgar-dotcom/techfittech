import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('.');
const SITEMAP_PAGES = path.join(ROOT, 'public/sitemap-pages.xml');
const VERCEL_JSON = path.join(ROOT, 'vercel.json');

if (!fs.existsSync(SITEMAP_PAGES)) {
  console.error('❌ sitemap-pages.xml does not exist in public/');
  process.exit(1);
}

const content = fs.readFileSync(SITEMAP_PAGES, 'utf8');
const locMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
const urls = locMatches.map(m => m.replace(/<\/?loc>/g, '').trim());

console.log(`\n=== Validating sitemap-pages.xml (${urls.length} entries) ===`);

// 1. Check for duplicates
const seen = new Set();
const duplicates = [];
for (const u of urls) {
  if (seen.has(u)) {
    duplicates.push(u);
  }
  seen.add(u);
}

if (duplicates.length > 0) {
  console.error(`❌ SITEMAP GUARD ERROR: Found ${duplicates.length} duplicate URLs in sitemap-pages.xml:`);
  duplicates.forEach(d => console.error(`   - ${d}`));
  process.exit(1);
} else {
  console.log(`✅ Zero duplicate URLs found (${urls.length} unique loc entries).`);
}

// 2. Check for redirecting URLs from vercel.json
if (fs.existsSync(VERCEL_JSON)) {
  try {
    const vJson = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
    const redirectSources = (vJson.redirects || []).map(r => r.source.replace(/^\/+|\/+$/g, ''));
    const conflicting = [];

    for (const u of urls) {
      const slug = u.replace('https://www.techfittech.com/', '').replace(/\/+$/, '');
      if (redirectSources.includes(slug)) {
        conflicting.push({ url: u, slug });
      }
    }

    if (conflicting.length > 0) {
      console.error(`❌ SITEMAP GUARD ERROR: Found ${conflicting.length} URLs that 301-redirect in vercel.json:`);
      conflicting.forEach(c => console.error(`   - ${c.url}`));
      process.exit(1);
    } else {
      console.log('✅ Zero redirecting URLs found in sitemap-pages.xml.');
    }
  } catch (e) {
    console.error('Warning: Failed to parse vercel.json for redirects:', e);
  }
}

console.log('🎉 Sitemap validation passed!\n');
