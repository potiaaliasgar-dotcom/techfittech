const fs = require('fs');
let code = fs.readFileSync('public/assets/app.js', 'utf8');

code = code.replace(/<img\s+src="\/(\$\{.*?\.image\})"\s+alt="(\$\{esc\(.*?\.name\)\})"\s+loading="lazy">/g, (match, p1, p2) => {
    return `\${pictureTag('/' + ${p1.slice(2, -1)}, ${p2.slice(2, -1)}, '', true)}`;
});

code = code.replace(/<img\s+src="\/(\$\{c\.heroImage\})"\s+alt="(\$\{esc\(c\.name\)\})"\s+loading="lazy">/g, (match, p1, p2) => {
    return `\${pictureTag('/' + ${p1.slice(2, -1)}, ${p2.slice(2, -1)}, '', true)}`;
});

fs.writeFileSync('public/assets/app.js', code);
console.log('Optimized images in app.js');
