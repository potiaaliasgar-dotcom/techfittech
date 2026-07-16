const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('public/pilates.html', 'utf-8');

const usedImages = new Set();

// PL_DATA images
const plDataMatch = html.match(/const PL_DATA=\[(.*?)\];/s);
if (plDataMatch) {
  const data = JSON.parse('[' + plDataMatch[1] + ']');
  data.forEach(item => {
    usedImages.add(path.basename(item.img));
  });
}

// Other img tags
const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)];
imgMatches.forEach(m => {
  usedImages.add(path.basename(m[1]));
});

// Always keep the specific images mentioned just in case
usedImages.add('mr-ST-11092.png');
usedImages.add('mr-ST-11093.png');
usedImages.add('studio-pilates.jpg');
usedImages.add('hero-pilates.jpg');

// Check public/pilates-assets
function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      cleanDir(fullPath);
    } else {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.svg')) {
        if (!usedImages.has(file)) {
          console.log('Deleting unused image:', fullPath);
          fs.unlinkSync(fullPath);
        }
      }
    }
  }
}

cleanDir('public/pilates-assets');
console.log('Cleanup finished.');
