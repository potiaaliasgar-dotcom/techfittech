const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const pilatesHtml = fs.readFileSync('public/pilates.html', 'utf8');
const navCss = fs.readFileSync('scratch/nav.css', 'utf8');

// Extract <nav> from index.html
const navStart = indexHtml.indexOf('<nav>');
const navEnd = indexHtml.indexOf('</nav>') + 6;
const navHtml = indexHtml.slice(navStart, navEnd);

// Scripts for routing in standalone page
const scripts = `
<script>
function go(p, b, c) {
  const searchParams = new URLSearchParams();
  if (b) searchParams.set('brand', b);
  if (c && c !== 'All') searchParams.set('cat', c);
  let url = '/' + p;
  if ([...searchParams].length > 0) url += '?' + searchParams.toString();
  window.location.href = url;
}
function toggleMob() {
  const mob = document.getElementById('nav-mob');
  const btn = document.getElementById('nav-ham-btn');
  mob.classList.toggle('open');
  const isOpen = mob.classList.contains('open');
  if(btn) {
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  }
}
function toggleDD(id) {
  const menu = document.getElementById(id);
  const wasOpen = menu.classList.contains('open');
  document.querySelectorAll('.nd-menu').forEach(m => m.classList.remove('open'));
  if (!wasOpen) menu.classList.add('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.nd')) {
    document.querySelectorAll('.nd-menu').forEach(m => m.classList.remove('open'));
  }
});
</script>
`;

const replacement = `
<style>
${navCss.replace(/var\(--bg\)/g, 'var(--white)')}
/* Fix for pilates page where --nav is not defined */
:root { --nav: 70px; }
nav { background: rgba(9, 9, 11, .95); border-bottom: 1px solid var(--z100); }
.nav-logo img { filter: invert(1); } /* Make logo white if it's black */
.nl, .nd-btn, .nav-ham { color: var(--white); }
.nav-ham span { background: var(--white); }
.nd-menu { background: var(--black); border-color: var(--z200); }
.nd-item { color: var(--white); border-bottom-color: var(--z100); }
.nav-mob { background: var(--black); border-top-color: var(--z100); }
.nav-mob button { color: var(--white); border-bottom-color: var(--z100); }
.mob-sub { background: var(--z900) !important; color: var(--z200) !important; }
.mob-group { background: var(--z800) !important; color: var(--z300) !important; border-top-color: var(--z700) !important; }
.pw { padding-top: var(--nav); }
</style>
${navHtml}
${scripts}
`;

const newPilatesHtml = pilatesHtml.replace(/<style>\s*\.pilates-nav[\s\S]*?<\/div>/, replacement);

fs.writeFileSync('public/pilates.html', newPilatesHtml);
console.log('Successfully injected nav into pilates.html');
