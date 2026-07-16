const fs = require('fs');

// 1. UPDATE CSS
let css = fs.readFileSync('public/assets/style.css', 'utf-8');

// We will replace the old float-wa/float-inq styles.
// They are defined around line 2691-2705.
// Let's just remove the old blocks by regex, or append new styles with !important, or replace them.
const cssOldRegex = /\.float-wa,\s*\.float-inq\s*\{[\s\S]*?\.float-inq\s*svg\s*\{[^\}]*\}/g;
// Actually, let's just find and replace the whole block exactly.
// It's safer to just comment them out or overwrite at the very end of the file.
css += `
/* NEW FLOATING BUTTON STYLES OVERRIDE */
.float-wa, .float-inq {
  position: fixed !important;
  width: auto !important;
  height: 48px !important;
  border-radius: 50px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
  z-index: 9998 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: transform .2s, background-color .2s !important;
  padding: 0 24px !important;
  font-weight: 800 !important;
  text-decoration: none !important;
  font-family: inherit;
  bottom: 30px !important;
  top: auto !important;
}
.float-inq {
  left: 30px !important;
  right: auto !important;
  background-color: #FFD13B !important;
  color: #000 !important;
  border: none !important;
  text-transform: uppercase !important;
  font-size: 14px !important;
}
.float-inq:hover {
  transform: scale(1.05) !important;
  background-color: #E6B82E !important;
  color: #000 !important;
}
.float-inq svg { display: none !important; }

.float-wa {
  right: 30px !important;
  left: auto !important;
  background-color: #25d366 !important;
  color: #FFF !important;
  text-transform: none !important;
  font-size: 15px !important;
}
.float-wa:hover {
  transform: scale(1.05) !important;
  background-color: #20BA56 !important;
  color: #FFF !important;
}
.float-wa svg {
  fill: currentColor !important;
  width: 24px !important;
  height: 24px !important;
  margin-right: 8px !important;
  display: block !important;
}

@media (max-width: 900px) {
  .float-wa, .float-inq {
    height: 44px !important;
    padding: 0 18px !important;
    bottom: 85px !important; 
  }
  .float-inq { left: 16px !important; font-size: 13px !important; }
  .float-wa { right: 16px !important; font-size: 14px !important; }
  .float-wa svg { width: 20px !important; height: 20px !important; margin-right: 6px !important; }
}
`;
fs.writeFileSync('public/assets/style.css', css);

// 2. UPDATE HTML FILES
const newInq = '<a href="/contact" class="float-inq js-lead" data-ch="floating_inq" aria-label="Inquire Now" title="Contact Us">INQUIRE NOW</a>';
const newWa = '<a href="https://wa.me/919820166910?text=Hi%20TechFit!%20I%27d%20like%20to%20know%20more%20about%20your%20services." class="float-wa js-lead" data-ch="floating_wa" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="WhatsApp Us"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>Chat with us</a>';

function replaceButtons(filePath, inqLink) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace old float-inq
  const inqRegex = /<a[^>]*class="[^"]*float-inq[^"]*"[^>]*>[\s\S]*?<\/a>/g;
  let inqHtml = newInq;
  if (inqLink) {
    inqHtml = inqHtml.replace('/contact', inqLink);
  }
  content = content.replace(inqRegex, inqHtml);

  // Replace old float-wa
  const waRegex = /<a[^>]*class="[^"]*float-wa[^"]*"[^>]*>[\s\S]*?<\/a>/g;
  content = content.replace(waRegex, newWa);
  
  fs.writeFileSync(filePath, content);
}

replaceButtons('index.html', '/contact');
replaceButtons('public/pilates.html', '#leadform');

console.log('Buttons updated!');
