const fs = require('fs');
const files = [
  'scripts/generate-pdf-guide.js',
  'scripts/generate-seo-pages.mjs',
  'public/assets/app.js',
  'public/assets/blogs/mfn.md',
  'public/sitemap-images.xml'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/Byculla,\s*Mumbai/gi, 'Mumbai');
  content = content.replace(/Byculla/gi, 'Mumbai');
  fs.writeFileSync(file, content);
  console.log('Updated', file);
}
