const fs = require('fs');

const path = 'scripts/generate-seo-pages.mjs';
let content = fs.readFileSync(path, 'utf8');

// Insert dynamic Alteon sitemap paths before `pagesXml += '</urlset>\n';`
const injection = `
  // Dynamic Alteon Paths
  try {
    const alteonDataPath = './public/assets/alteon-data.js';
    if (fs.existsSync(alteonDataPath)) {
      let code = fs.readFileSync(alteonDataPath, 'utf8');
      code = code.replace('window.ALTEON_DATA = ', 'const ALTEON_DATA = ');
      code += '\\nmodule.exports = ALTEON_DATA;';
      fs.writeFileSync('./scripts/temp-alteon.cjs', code);
      const ALTEON_DATA = require('./temp-alteon.cjs');
      
      ALTEON_DATA.categories.forEach(c => {
        pagesXml += \`    <url><loc>https://www.techfittech.com/alteon/\${c.id}</loc><lastmod>2026-05-29</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\\n\`;
      });
      
      ALTEON_DATA.products.forEach(p => {
        const cat = ALTEON_DATA.categories.find(c => c.id === p.categoryId);
        if (cat) {
            pagesXml += \`    <url><loc>https://www.techfittech.com/alteon/\${cat.id}/\${p.id}</loc><lastmod>2026-05-29</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\\n\`;
        }
      });
      fs.unlinkSync('./scripts/temp-alteon.cjs');
    }
  } catch (e) {
    console.warn("Failed to inject Alteon sitemap paths", e);
  }
`;

if (!content.includes('Dynamic Alteon Paths')) {
    content = content.replace("pagesXml += '</urlset>\\n';", injection + "\\n  pagesXml += '</urlset>\\n';");
    fs.writeFileSync(path, content, 'utf8');
    console.log("Patched generate-seo-pages.mjs successfully.");
} else {
    console.log("Already patched.");
}
