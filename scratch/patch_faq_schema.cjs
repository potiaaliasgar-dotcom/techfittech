const fs = require('fs');
const path = 'public/assets/app.js';
let content = fs.readFileSync(path, 'utf8');

const injection = `
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (p.faqs||[]).map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
    };
    
    setSchema([
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Alteon", "item": "https://www.techfittech.com/alteon" },
                { "@type": "ListItem", "position": 2, "name": c.name, "item": "https://www.techfittech.com/alteon/" + c.id },
                { "@type": "ListItem", "position": 3, "name": p.name }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": p.name,
            "category": c.name,
            "brand": { "@type": "Brand", "name": "Alteon" },
            "image": "https://www.techfittech.com/" + p.image,
            "description": p.overview
        },
        faqSchema
    ]);
`;

if (!content.includes('faqSchema = {')) {
    // Find the original setSchema block in renderAlteonProduct
    const regex = /setSchema\(\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "Product".*?\n\s*\}\);/s;
    content = content.replace(regex, injection);
    // Remove the Breadcrumb setSchema right before it to avoid duplication
    const regex2 = /setSchema\(\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "BreadcrumbList".*?\n\s*\}\);/s;
    content = content.replace(regex2, '');
    fs.writeFileSync(path, content, 'utf8');
    console.log("Patched FAQ schema into app.js");
} else {
    console.log("Already patched.");
}
