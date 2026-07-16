const fs = require('fs');

let html = fs.readFileSync('public/pilates.html', 'utf8');

// 1. Fix plSend to use fetch
const oldPlSend = /function plSend\(e\)\{[\s\S]*?return false;\n\}/;
const newPlSend = `async function plSend(e){
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn ? btn.innerHTML : '';
  if(btn) btn.innerHTML = 'Sending...';
  try {
    const v = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const body = {
      Product: v('f-prod'),
      Name: v('f-name'),
      Phone: v('f-phone'),
      City: v('f-city'),
      Setup: v('f-type'),
      Details: v('f-msg')
    };
    await fetch('https://formsubmit.co/ajax/info@techfittech.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    });
    if(btn) btn.innerHTML = 'Sent Successfully!';
    setTimeout(() => { if (typeof plClose === 'function') plClose(); if(btn) btn.innerHTML = originalText; e.target.reset(); }, 2000);
  } catch(err) {
    if(btn) btn.innerHTML = 'Error. Please try again.';
  }
  return false;
}`;
html = html.replace(oldPlSend, newPlSend);

// Remove plMail
html = html.replace(/function plMail\(\)\{[\s\S]*?\n\}/, '');

// 2. Change the form buttons (for leadform)
// We need to replace the two buttons with a single "Submit Inquiry" button.
// And remove the js-lead double-fire issue mentioned in the brief.
// Wait, the brief says: "Drop js-lead from the submit button."
const oldButtons = `<button class="btn btn-wa " data-ch="form_wa" type="submit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg> Send via WhatsApp</button>\n<button class="btn btn-out" type="button" onclick="plMail()">Send by email instead</button>`;
const newButtons = `<button class="btn" style="background:var(--red);color:white;border-color:var(--red)" type="submit">Submit Inquiry</button>`;
html = html.replace(oldButtons, newButtons);
// Also replacing in case spacing differs
html = html.replace(/<button class="btn btn-wa " data-ch="form_wa" type="submit">[\s\S]*?<\/button>\s*<button class="btn btn-out" type="button" onclick="plMail\(\)">Send by email instead<\/button>/, newButtons);

// 3. Fix specs and typos in PL_DATA
let match = html.match(/const PL_DATA=\[(.*?)\];/);
let data = JSON.parse('[' + match[1] + ']');
data = data.map(p => {
  // Typos fix
  if (p.name === 'Rehab V2 max Reormer Bundle') p.name = 'Rehab V2 Max Reformer Bundle';
  if (p.name.includes('Charocal')) p.name = p.name.replace('Charocal', 'Charcoal');
  if (p.name.includes('V2 Max™Reformer')) p.name = p.name.replace('V2 Max™Reformer', 'V2 Max™ Reformer');
  if (p.name.includes('Spx Max Reformer')) p.name = p.name.replace('Spx Max Reformer', 'SPX Max Reformer');
  if (p.name.includes('Handweights1.1')) p.name = p.name.replace('Handweights1.1', 'Handweights 1.1');
  if (p.name.includes('( Jet Black)')) p.name = p.name.replace('( Jet Black)', '(Jet Black)');
  if (p.name.includes('( Eggplant)')) p.name = p.name.replace('( Eggplant)', '(Eggplant)');
  if (p.name.includes('( Pair / Floating )')) p.name = p.name.replace('( Pair / Floating )', '(Pair / Floating)');
  if (p.name.includes('(Grey )')) p.name = p.name.replace('(Grey )', '(Grey)');
  if (p.name.includes('(White )')) p.name = p.name.replace('(White )', '(White)');
  if (p.name.includes('(7.5Inch )')) p.name = p.name.replace('(7.5Inch )', '(7.5Inch)');
  
  if (p.name === 'SPX Max Reformer Bundle with Vertical Stand (Jet Black)' && p.sku === 'ST-11068') {
     p.name = 'SPX Max Reformer Bundle with Vertical Stand and High Precision Gearbar (Jet Black)';
  }
  
  if (p.name.includes('Spring Package · Reformer High  Precision')) p.name = p.name.replace('High  Precision', 'High Precision');

  // Specs fix
  if (p.specs && p.specs.length > 0 && typeof p.specs[0] === 'string') {
    let oldSpecs = p.specs;
    let newSpecs = [];
    oldSpecs.forEach(s => {
      if (s === 'Canadian FSC Maple') newSpecs.push(['Material', s]);
      else if (s === 'Black upholstery') newSpecs.push(['Upholstery', s]);
      else if (s.includes('PVC') || s.includes('EVA') || s.includes('steel/sponge') || s === 'Wood') newSpecs.push(['Material', s]);
      else if (s === 'EVA, 81cm') { newSpecs.push(['Material', 'EVA']); newSpecs.push(['Length', '81cm']); }
      else if (s === 'EVA, 91×15cm, 0.8kg') { newSpecs.push(['Material', 'EVA']); newSpecs.push(['Product size', '91×15cm']); newSpecs.push(['Weight', '0.8kg']); }
      else if (s === '70×40×28cm, 9kg') { newSpecs.push(['Product size', '70×40×28cm']); newSpecs.push(['Weight', '9kg']); }
      else if (s === '65.5×60cm, 7kg, steel') { newSpecs.push(['Product size', '65.5×60cm']); newSpecs.push(['Weight', '7kg']); newSpecs.push(['Material', 'Steel']); }
      else if (s === '60×55×19.5cm, 7kg') { newSpecs.push(['Product size', '60×55×19.5cm']); newSpecs.push(['Weight', '7kg']); }
      else if (s === '36.98cm, steel/sponge') { newSpecs.push(['Product size', '36.98cm']); newSpecs.push(['Material', 'Steel/sponge']); }
      else if (s === '400g' || s === '500g') { newSpecs.push(['Weight', s]); }
      else newSpecs.push(['Specification', s]);
    });
    p.specs = newSpecs;
  }
  
  // Category/filter taxonomy fix
  const barrelSkus = ['ST-11109', 'ST-11110', 'ST-01010', 'ST-01012', 'ST-01013', 'DC-85220'];
  if (barrelSkus.includes(p.sku)) {
    p.series = 'Barrels';
  }
  
  // Trademark and name
  if (p.name.includes('Gyrotonic')) p.name = p.name.replace('Gyrotonic', 'Tower');
  if (p.desc && p.desc.includes('Gyrotonic')) p.desc = p.desc.replace(/Gyrotonic/g, 'Tower');
  
  return p;
});

// Update PL_DATA in HTML
const newPL_DATA = JSON.stringify(data);
html = html.replace(/const PL_DATA=\[.*?\];/, `const PL_DATA=${newPL_DATA};`);

// 4. Update JSON-LD (Schema)
const jsonLdMatch = html.match(/("@type": "ItemList", "name": "Pilates Equipment India by TechFit", "numberOfItems": )\d+(, "itemListElement": \[)(.*?)(\])/);
if (jsonLdMatch) {
  const items = data.map((p, i) => {
    return {
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "image": "https://www.techfittech.com" + p.img,
        "sku": p.sku,
        "brand": { "@type": "Brand", "name": p.brand }
      }
    };
  });
  html = html.replace(/"@type": "ItemList"[\s\S]*?"itemListElement": \[.*?\]/s, `"@type": "ItemList", "name": "Pilates Equipment India by TechFit", "numberOfItems": ${items.length}, "itemListElement": ${JSON.stringify(items)}`);
}

// 5. Update counts in HTML
html = html.replace(/<i>139<\/i>/, `<i>157</i>`);
html = html.replace(/data-count="207"/g, `data-count="225"`);
html = html.replace(/<span class="pl-b-n">139<\/span>/g, `<span class="pl-b-n">157</span>`);
html = html.replace(/<div class="pl-b-n">139<\/div>/g, `<div class="pl-b-n">157</div>`);
html = html.replace(/46 apparatus · 93 accessories/g, `46 apparatus · 111 accessories`);

// 6. Fix "Gyrotonic Trainer (Oak)" in HTML data-q and name
html = html.replace(/Gyrotonic/g, 'Tower');
html = html.replace(/Limited lifetime warranties/g, 'Limited lifetime warranty on Merrithew apparatus');

// 7. Remove js-lead from View details & enquire
html = html.replace(/data-ch="modal"/g, 'data-ch="modal_open"');

fs.writeFileSync('public/pilates.html', html);
console.log('Fixes applied to public/pilates.html');
