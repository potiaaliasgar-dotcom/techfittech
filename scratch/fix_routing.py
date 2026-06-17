import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Move commercialPages out of render() to module scope
# Find "const commercialPages = {" inside render() and move it before render()
# The commercialPages block starts at the line "      const commercialPages = {" 
# and ends at the closing "      };" before "if (commercialPages[page])"

# Extract the commercialPages object
cp_match = re.search(r'(      const commercialPages = \{.*?\n      \});', content, re.DOTALL)
if cp_match:
    cp_block = cp_match.group(1)
    # Remove it from inside render()
    content = content.replace(cp_block, '')
    # Dedent it (remove 6 spaces) and place it before render()
    cp_dedented = '\n'.join(line[6:] if line.startswith('      ') else line for line in cp_block.split('\n'))
    content = content.replace('    function render() {', cp_dedented + '\n\n    function render() {')
    print("Moved commercialPages to module scope")
else:
    print("ERROR: Could not find commercialPages block")

# 2. Remove the bogus cross-link section from renderAlternativesHub
# It was accidentally injected between gridHtml and the return statement
hub_bad_block = """

  // Add cross linking for alternatives
  let crossLinkSection = '';
  if (slug.startsWith('alternatives/') || slug.includes('-alternative-') || slug.includes('-vs-')) {
    const alts = Object.keys(commercialPages).filter(k => (k.startsWith('alternatives/') || k.includes('-alternative-') || k.includes('-vs-')) && k !== slug).sort(() => 0.5 - Math.random()).slice(0, 3);
    if (alts.length > 0) {
      crossLinkSection = `
        <div style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1);">
          <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1.5rem;">Compare Other Brands</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(250px, 1fr));gap:1.5rem;">
            ${alts.map(a => `
              <div style="background:rgba(255,255,255,0.03);padding:1.5rem;border-radius:6px;border:1px solid rgba(255,255,255,0.05)">
                <h4 style="color:#fff;font-size:1.1rem;margin-bottom:1rem;line-height:1.4">${commercialPages[a] || 'Read Comparison'}</h4>
                <button class="btn btn-ghost" onclick="go('${a}')" style="width:100%;text-align:center">Read Guide</button>
              </div>
            `).join('')}
          </div>
          <div style="margin-top:2rem;text-align:center">
             <button class="btn btn-ghost" onclick="go('alternatives')">View All Brand Comparisons</button>
          </div>
        </div>
      `;
    }
  }

  return `"""

# Find and remove the bad block from renderAlternativesHub, replacing with just "  return `"
if hub_bad_block in content:
    content = content.replace(hub_bad_block, '\n\n  return `')
    print("Removed bogus cross-link from renderAlternativesHub")
else:
    print("WARNING: Could not find bogus cross-link block in hub - trying alternate approach")
    # Try to find it with the gridHtml closing
    idx = content.find("function renderAlternativesHub()")
    if idx > -1:
        end_idx = content.find("function render404()", idx)
        hub_func = content[idx:end_idx]
        # Remove the cross-link section
        clean_hub = re.sub(
            r'\n\n  // Add cross linking for alternatives.*?  return `',
            '\n\n  return `',
            hub_func,
            flags=re.DOTALL
        )
        content = content[:idx] + clean_hub + content[end_idx:]
        print("Removed bogus cross-link via regex")

# 3. Add 'alternatives' to validPages if not present
if "'alternatives', " not in content.split("const validPages")[1].split(";")[0]:
    content = content.replace(
        "const validPages = ['home', ",
        "const validPages = ['home', 'alternatives', "
    )
    print("Added 'alternatives' to validPages")
else:
    print("'alternatives' already in validPages")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! All fixes applied.")
