const fs = require('fs');
let html = fs.readFileSync('public/pilates.html', 'utf-8');
// Fix grid images
html = html.replace(/src="\/pilates-assets\//g, 'src="images/');
// Fix PL_DATA images
html = html.replace(/"img":\s*"\/pilates-assets\//g, '"img":"images/');
// Fix JSON-LD images
html = html.replace(/"image":\s*"https:\/\/www\.techfittech\.com\/pilates-assets\//g, '"image":"images/');
fs.writeFileSync('/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/pilates/website/pilates.html', html);
