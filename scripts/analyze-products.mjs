import fs from 'fs';
import path from 'path';

const appJsPath = '/Users/batman/Desktop/techfittech/public/assets/app.js';
const content = fs.readFileSync(appJsPath, 'utf8');

// The PRODUCTS array is in const PRODUCTS = [...]
const match = content.match(/const PRODUCTS\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  console.log("Could not find PRODUCTS array!");
  process.exit(1);
}

const PRODUCTS = JSON.parse(match[1]);
console.log(`Found ${PRODUCTS.length} products in PRODUCTS array!`);

const brands = new Set();
const categories = new Set();
const sections = new Set();

PRODUCTS.forEach(p => {
  brands.add(p.b);
  categories.add(p.c);
  sections.add(p.sec);
});

console.log("Brands:", Array.from(brands));
console.log("Sections:", Array.from(sections));
console.log("Categories sample:", Array.from(categories).slice(0, 10));
