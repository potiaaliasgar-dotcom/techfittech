import fs from 'fs';
let code = fs.readFileSync('public/assets/app.js', 'utf8');

// 1. We replace the CSS block in renderHyroxStyle
let oldCss = `*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--black);color:var(--z100);line-height:1.6;-webkit-font-smoothing:antialiased}`;
let newCss = `.hyrox-page{--maxw:1400px;font-family:var(--font);background:var(--black);color:var(--z100);line-height:1.6;-webkit-font-smoothing:antialiased;padding-bottom:4rem}
.hyrox-page *{box-sizing:border-box}
.hyrox-page a{color:inherit;text-decoration:none}`;

if (code.includes(oldCss)) {
    code = code.replace(oldCss, newCss);
} else {
    // If exact match fails, use regex
    code = code.replace(/\*\{margin:0;padding:0;box-sizing:border-box\}[\s\S]*?-webkit-font-smoothing:antialiased\}/m, newCss);
}

// 2. We replace all raw selectors with .hyrox-page prefixed selectors
const selectorsToPrefix = [
    'img{',
    'a{',
    '.cnt{',
    '.btn{',
    '.btn-red{',
    '.btn-red:hover{',
    '.btn-outline{',
    '.btn-outline:hover{',
    '.btn-white{',
    '.btn-white:hover{',
    '.eyebrow{',
    '.sec-title{',
    '.sec-sub{',
    '.pad{',
    '.dot{',
    '.hero{',
    '.hero-grid{',
    '.hero h1{',
    '.hero h1 span{',
    '.hero p{',
    '.hero-btns{',
    '.hero-media{',
    '.hero-media img{',
    '.hero-tag{',
    '.strip{',
    '.strip-in{',
    '.strip-in b{',
    '.intro-grid{',
    '.intro p{',
    '.pill-row{',
    '.pill{',
    '.stat-grid{',
    '.stat{',
    '.stat span{',
    '.intro-img{',
    '.specs{',
    '.spec-group{',
    '.spec-row{',
    '.spec-row .k{',
    '.spec-row .v{',
    '.spec-row.full{',
    '.products{',
    '.prod-grid{',
    '.product{',
    '.product h3{',
    '.product p{',
    '.product-desc{',
    '.gal{',
    '.gal-main{',
    '.gal-main img{',
    '.gal-thumbs{',
    '.gal-thumbs img{',
    '.gal-thumbs img.active{',
    '.badge{',
    '.spec-table{',
    '.cat-grid{',
    '.cat-card{',
    '.cat-card h3{',
    '.cat-card p{',
    '.form-grid{',
    '.field{',
    '.field label{',
    '.field input, .field select, .field textarea{',
    '.field input:focus, .field select:focus, .field textarea:focus{',
    '.form-submit{'
];

for (let sel of selectorsToPrefix) {
    // replace `sel` with `.hyrox-page sel` globally
    // We have to be careful with commas if there are any. We don't have commas in our list except in form fields.
    if (sel.includes(',')) {
        let parts = sel.split(',').map(s => s.trim());
        let prefixed = parts.map(s => '.hyrox-page ' + s).join(', ');
        // Regex replace keeping the {
        let regex = new RegExp(sel.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        code = code.replace(regex, prefixed);
    } else {
        let regex = new RegExp(sel.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        code = code.replace(regex, '.hyrox-page ' + sel);
    }
}

// 3. Wrap the HTML output of renderHyrox in <div class="hyrox-page">...</div>
// Find `return \`\n${_style}\n\n${html}\`;`
code = code.replace('return `\\n${_style}\\n\\n${html}`;', 'return `\\n${_style}\\n\\n<div class="hyrox-page">${html}</div>`;');

fs.writeFileSync('public/assets/app.js', code);
console.log('HYROX CSS encapsulated!');
