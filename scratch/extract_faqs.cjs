const fs = require('fs');

const mjsPath = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs';
const content = fs.readFileSync(mjsPath, 'utf8');

// Find where SCHEMAS = { starts
const startIndex = content.indexOf('const SCHEMAS = {');
if (startIndex === -1) {
    console.error("Could not find const SCHEMAS = {");
    process.exit(1);
}

// Find the end of SCHEMAS. We know it ends before "const NOSCRIPT_FALLBACKS"
const endIndex = content.indexOf('const NOSCRIPT_FALLBACKS', startIndex);
if (endIndex === -1) {
    console.error("Could not find end of SCHEMAS");
    process.exit(1);
}

const schemasStr = content.substring(startIndex, endIndex).replace('const SCHEMAS = ', '').trim().replace(/;$/, '');

// Evaluate it safely
let SCHEMAS;
try {
    SCHEMAS = eval('(' + schemasStr + ')');
} catch (e) {
    console.error("Failed to parse SCHEMAS:", e);
    process.exit(1);
}

const routeFaqs = {};

for (const [route, schemaObj] of Object.entries(SCHEMAS)) {
    if (!schemaObj['@graph']) continue;
    
    for (const entity of schemaObj['@graph']) {
        if (entity['@type'] === 'FAQPage' && entity.mainEntity) {
            const faqs = [];
            for (const item of entity.mainEntity) {
                if (item['@type'] === 'Question' && item.acceptedAnswer && item.acceptedAnswer.text) {
                    faqs.push({
                        q: item.name,
                        a: item.acceptedAnswer.text
                    });
                }
            }
            if (faqs.length > 0) {
                routeFaqs[route] = faqs;
            }
        }
    }
}

fs.writeFileSync('/Users/batman/Desktop/techfittech/scratch/faqs.json', JSON.stringify(routeFaqs, null, 2));
console.log(`Extracted FAQs for ${Object.keys(routeFaqs).length} routes.`);
