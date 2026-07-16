const fs = require('fs');
let html = fs.readFileSync('public/pilates.html', 'utf-8');
html = html.replace(/src="\/pilates-assets\//g, 'src="images/');
html = html.replace(/"img":\s*"\/\/pilates-assets\//g, '"img":"images/');
fs.writeFileSync('/Users/batman/Documents/Claude/Projects/Fitness Recall LLP/pilates/website/pilates.html', html);
