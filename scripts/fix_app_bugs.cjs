const fs = require('fs');
const path = require('path');

const appJsPath = path.resolve('public/assets/app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Fix the 6 alternative renderers
const renderersToFix = [
  'renderTechnogymAlternative',
  'renderLifeFitnessAlternative',
  'renderSechristAlternative',
  'renderPrecorAlternative',
  'renderMecotecAlternative',
  'renderUsiCoscoAlternative'
];

for (const renderer of renderersToFix) {
  const regex = new RegExp(`(function \\s+${renderer}\\s*\\(\\)\\s*\\{)`, 'g');
  appJs = appJs.replace(regex, `$1\n      const slug = page;`);
}

// 2. Fix updateSEO function
const seoFunctionRegex = /function updateSEO\(\)\s*\{([\s\S]*?)\}\n\n    let searchTimeout;/g;

appJs = appJs.replace(seoFunctionRegex, (match, body) => {
  let newBody = body.replace(/const seo = SEO_MAP\[routeKey\] \|\| SEO_MAP\['home'\];/, 'const seo = SEO_MAP[routeKey];');
  
  const seoUpdatesRegex = /(\/\/ 1\. Canonical URL[\s\S]*?\/\/ 5\. Twitter Card tags[\s\S]*?if \(twImg\) twImg\.setAttribute\('content', seo\.img \|\| DEFAULT_OG_IMG\);)/;
  
  newBody = newBody.replace(seoUpdatesRegex, (updates) => {
    return `if (seo) {\n${updates}\n      }`;
  });

  newBody = newBody.replace(/\$\{seo\.title\}/g, '${seo ? seo.title : document.title}');
  
  return `function updateSEO() {${newBody}}\n\n    let searchTimeout;`;
});

// 3. Fix Markdown in htmlContent
function convertMarkdown(content) {
  // Replace **bold**
  let newContent = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Replace *italics*
  newContent = newContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Replace [text](url)
  newContent = newContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Replace backticks (only inline code for simplicity, assuming no block backticks)
  newContent = newContent.replace(/`([^`]+)`/g, '<code>$1</code>');
  return newContent;
}

const htmlContentRegex = /htmlContent:\s*`([\s\S]*?)`/g;
appJs = appJs.replace(htmlContentRegex, (match, content) => {
  return `htmlContent: \`${convertMarkdown(content)}\``;
});

const htmlContentQuoteRegex = /htmlContent:\s*"([\s\S]*?)"\n/g;
appJs = appJs.replace(htmlContentQuoteRegex, (match, content) => {
  return `htmlContent: "${convertMarkdown(content)}"\n`;
});

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Fixed app.js successfully!');
