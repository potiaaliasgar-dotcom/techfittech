import fs from 'fs';
import path from 'path';

const appJsPath = '/Users/batman/Desktop/techfittech/public/assets/app.js';
const content = fs.readFileSync(appJsPath, 'utf8');

const match = content.match(/const PRODUCTS\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  console.log("Could not find PRODUCTS array!");
  process.exit(1);
}

const PRODUCTS = JSON.parse(match[1]);
const tunturiProducts = PRODUCTS.filter(p => p.b === 'Tunturi');

console.log(`Found ${tunturiProducts.length} Tunturi products:`);
tunturiProducts.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.sec}] ${p.n} (${p.s}) - img: ${p.img}`);
});
