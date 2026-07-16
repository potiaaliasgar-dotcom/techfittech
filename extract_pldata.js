const fs = require('fs');
const html = fs.readFileSync('public/pilates.html', 'utf8');
const match = html.match(/const PL_DATA=\[(.*?)\];/);
if (match) {
  const json = '[' + match[1] + ']';
  fs.writeFileSync('scratch/pldata.json', json);
  console.log('Extracted', JSON.parse(json).length, 'items');
} else {
  console.log('Not found');
}
