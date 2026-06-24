import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DIST_DIR = path.join(process.cwd(), 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');
const APP_JS_PATH = path.join(ASSETS_DIR, 'app.js');

if (!fs.existsSync(APP_JS_PATH)) {
  console.error('❌ Could not find app.js in dist/assets. Ensure Vite runs first.');
  process.exit(1);
}

// 1. Generate MD5 Hash of app.js
const fileBuffer = fs.readFileSync(APP_JS_PATH);
const hashSum = crypto.createHash('md5');
hashSum.update(fileBuffer);
const hash = hashSum.digest('hex').slice(0, 8); // 8-char hash
const hashedFilename = `app.${hash}.js`;

// 2. Rename the file
const hashedFilePath = path.join(ASSETS_DIR, hashedFilename);
fs.renameSync(APP_JS_PATH, hashedFilePath);
console.log(`✅ Hashed app.js -> ${hashedFilename}`);

// 3. Scan dist/**/*.html and replace src="/assets/app.js" with src="/assets/app.[hash].js"
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;
walkDir(DIST_DIR, function(filePath) {
  if (filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace "/assets/app.js" and also strip any old cache busters like "?v=4" just in case
    const regex = /\/assets\/app\.js(?:\?v=\d+)?/g;
    if (regex.test(content)) {
      content = content.replace(regex, `/assets/${hashedFilename}`);
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedCount++;
    }
  }
});

console.log(`✅ Updated script tags in ${modifiedCount} HTML files.`);
