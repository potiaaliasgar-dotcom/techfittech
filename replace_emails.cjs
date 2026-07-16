const fs = require('fs');
const path = require('path');

const OLD_EMAIL = 'info@techfittech.com';
const NEW_EMAIL = 'info@techfittech.com';
const EXCLUDE_DIRS = ['node_modules', '.git', '.gemini', 'dist', 'scratch'];
const EXCLUDE_EXTS = ['.md', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!EXCLUDE_DIRS.includes(file)) {
        walkAndReplace(fullPath);
      }
    } else {
      if (!EXCLUDE_EXTS.includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes(OLD_EMAIL)) {
          console.log('Replacing in', fullPath);
          content = content.replace(new RegExp(OLD_EMAIL, 'g'), NEW_EMAIL);
          fs.writeFileSync(fullPath, content);
        }
      }
    }
  }
}

walkAndReplace('.');
console.log('Done replacing emails.');
