/**
 * prerender.mjs — Generates static HTML snapshots for each SPA route.
 * 
 * Usage:
 *   1. Start a local static server: npx serve . -l 3456
 *   2. Run: node prerender.mjs
 * 
 * Each route gets a fully-rendered HTML file saved under /prerendered/.
 * These can be served to bots via Vercel rewrites or Cloudflare Workers.
 *
 * Alternatively, install the Prerender.io Vercel Integration from the Vercel
 * Marketplace (https://vercel.com/integrations/prerender) — this is the
 * zero-config approach that Ali recommended.
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.BASE_URL || 'http://localhost:3456';
const OUTPUT_DIR = path.join(__dirname, 'prerendered');

const ROUTES = [
  '/',
  '/alteon',
  '/bh-fitness',
  '/tunturi',
  '/california-fitness',
  '/techfit',
  '/mma-cages',
  '/crossfit-rigs',
  '/free-weights',
  '/padel-pickleball',
  '/aqua',
  '/wellness-solutions',
  '/services',
  '/about',
  '/contact',
  '/for-gyms',
  '/for-developers',
  '/for-schools',
  '/for-hotels',
  '/blogs',
  '/blog-mfn',
  '/blog-sfl',
  '/blog-kumite',
  '/blog-mma-matrix',
  '/blog-one-stop',
  '/blog-wellness-boom',
  '/gym-flooring',
  '/thank-you',
];

async function prerender() {
  console.log(`🚀 Starting prerender of ${ROUTES.length} routes...`);
  console.log(`   Base URL: ${BASE_URL}`);
  console.log(`   Output:   ${OUTPUT_DIR}\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`  📄 Rendering: ${route}`);

    const page = await browser.newPage();
    
    // Set a bot-like user agent
    await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

      // Wait for the SPA to render content
      await page.waitForSelector('#app', { timeout: 5000 });
      await new Promise(r => setTimeout(r, 1000)); // extra buffer for JS

      const html = await page.content();

      // Determine output path
      const routePath = route === '/' ? '/index' : route;
      const outputFile = path.join(OUTPUT_DIR, `${routePath}.html`);
      const outputDir = path.dirname(outputFile);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputFile, html, 'utf8');
      console.log(`  ✅ Saved: ${outputFile}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\n🎉 Prerender complete! ${ROUTES.length} pages saved to ${OUTPUT_DIR}`);
}

prerender().catch(console.error);
