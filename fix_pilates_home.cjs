const fs = require('fs');
let html = fs.readFileSync('public/pilates.html', 'utf-8');

// Add a simple top nav bar for Pilates page
if (!html.includes('<div class="pilates-nav">')) {
  const navHtml = `
<style>
.pilates-nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; background: var(--black); position: sticky; top: 0; z-index: 999; border-bottom: 1px solid var(--z100); }
.pilates-nav a { color: var(--white); text-decoration: none; font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.pilates-nav img { height: 30px; width: auto; }
</style>
<div class="pilates-nav">
  <a href="/" aria-label="Back to TechFit Home">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    TechFit Home
  </a>
</div>
`;
  html = html.replace('<body>', '<body>\n' + navHtml);
  fs.writeFileSync('public/pilates.html', html);
  console.log('Added Pilates home nav');
}
