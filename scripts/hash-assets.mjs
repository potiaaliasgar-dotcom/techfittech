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
const hash = hashSum.digest('hex').slice(0, 8);

console.log(`✅ Calculated app.js hash -> ${hash}`);

// 2. Scan dist/**/*.html and replace src="/assets/app.js" (and any old hashes) with src="/assets/app.js?v=[hash]"
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
    
    // Replace any reference to app.js, app.xxxxx.js, app.js?v=... with app.js?v=[hash]
    const regex = /\/assets\/app(?:.[a-f0-9]{8})?\.js(?:\?v=[\w\d]+)?/g;
    if (regex.test(content)) {
      content = content.replace(regex, `/assets/app.js?v=${hash}`);
      fs.writeFileSync(filePath, content, 'utf8');
      modifiedCount++;
    }
  }
});

console.log(`✅ Updated script tags in ${modifiedCount} HTML files to use ?v=${hash}.`);
