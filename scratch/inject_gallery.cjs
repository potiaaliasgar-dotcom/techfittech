const fs = require('fs');
const path = require('path');

const dataPath = 'public/assets/alteon-data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

global.window = {};
eval(content);
const data = global.window.ALTEON_DATA;

const galleryDir = 'public/assets/images/alteon/gallery';
const files = fs.readdirSync(galleryDir).filter(f => !f.startsWith('.'));

const overrides = {
    'cryo blast': 'alteon-cryoblast-n',
    'alteon cryoblast n': 'alteon-cryoblast-n',
    'cry q one': 'cryo-q-one',
    'hbot 1 seater (a)': 'hbot-1-seater-39', 
    'heal spectra (64)': 'heal-spectra-6-4-9'
};

const mapped = {};
const products = data.products;

files.forEach(f => {
    const parts = f.split('__');
    if (parts.length > 1) {
        let prefix = parts[0].trim().toLowerCase();
        
        let bestMatch = null;
        if (overrides[prefix]) {
            bestMatch = overrides[prefix];
        } else {
            const normPrefix = prefix.replace(/[^a-z0-9]/g, '');
            for (let p of products) {
                const normName = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (normPrefix.includes(normName) || normName.includes(normPrefix)) {
                    bestMatch = p.id;
                    break;
                }
            }
        }
        
        if (bestMatch) {
            if (!mapped[bestMatch]) mapped[bestMatch] = [];
            mapped[bestMatch].push(`assets/images/alteon/gallery/${f}`);
        } else {
            console.warn("Unmapped: ", f);
        }
    }
});

for (let key in mapped) {
    mapped[key].sort();
}

data.products.forEach(p => {
    if (mapped[p.id]) {
        p.gallery = mapped[p.id];
    }
});

const newContent = `window.ALTEON_DATA = ${JSON.stringify(data, null, 1)};\n`;
fs.writeFileSync(dataPath, newContent, 'utf-8');
console.log("Successfully injected gallery data into alteon-data.js");
