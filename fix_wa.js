const fs = require('fs');
let css = fs.readFileSync('public/assets/style.css', 'utf-8');
css = css.replace(
  /\.cta-whatsapp\s*\{\s*color:\s*#25D366\s*!important;\s*text-shadow:\s*0\s*0\s*10px\s*rgba\(37,\s*211,\s*102,\s*0\.3\);\s*\}/,
  '.cta-whatsapp { background: #25D366; color: #fff !important; text-shadow: none; border-radius: 8px; }'
);
fs.writeFileSync('public/assets/style.css', css);
