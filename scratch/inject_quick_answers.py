import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# Define generic quick answers
qa_city = """<div class="quick-answer" style="background:rgba(255,255,255,0.05);padding:1.5rem;border-left:4px solid var(--red);margin-bottom:2rem;border-radius:0 8px 8px 0;">
  <h3 style="margin-top:0;color:var(--red);">Quick Answer</h3>
  <p style="margin-bottom:0;">Setting up a commercial gym in this region requires premium biomechanics, high-uptime continuous AC motors, and localized service. TechFit provides turnkey gym setups with 25-35% CapEx savings via direct distribution of BH Fitness and Tunturi, backed by immediate spare parts availability and 24-48hr AMC support.</p>
</div>
<table class="comp-table">
  <thead><tr><th>Feature</th><th>TechFit Direct Sourcing</th><th>Standard Importers</th></tr></thead>
  <tbody>
    <tr><td><strong>CapEx Cost</strong></td><td>Direct Pricing (Save 25-35%)</td><td>High Broker Markups</td></tr>
    <tr><td><strong>Equipment Brands</strong></td><td>BH Fitness, Tunturi, Custom Fabrication</td><td>Fragmented Generic Brands</td></tr>
    <tr><td><strong>AMC & Service</strong></td><td>Direct 24-48hr Technician Dispatch</td><td>Delayed Third-Party Repair</td></tr>
  </tbody>
</table>
"""

qa_comp = """<div class="quick-answer" style="background:rgba(255,255,255,0.05);padding:1.5rem;border-left:4px solid var(--red);margin-bottom:2rem;border-radius:0 8px 8px 0;">
  <h3 style="margin-top:0;color:var(--red);">Quick Answer</h3>
  <p style="margin-bottom:0;">Both brands offer world-class commercial engineering, but sourcing through TechFit's direct authorized channels for BH Fitness or Tunturi eliminates broker markups. Buyers secure premium European biomechanics while reducing initial CapEx by 25-35%, with the added security of immediate local parts availability in India.</p>
</div>
"""

# The script iterates over all guides in GUIDES_DATA
def replacer(match):
    slug = match.group(1)
    content = match.group(2)
    
    # Check if we already injected
    if 'class="quick-answer"' in content:
        return match.group(0)

    # Determine injection block
    inject_block = ""
    if 'commercial-gym-setup-' in slug or 'hotel-gym-setup-' in slug or 'society-gym-setup-' in slug or 'corporate-gym-setup-' in slug:
        inject_block = qa_city
    elif '-vs-' in slug or '-alternative-' in slug:
        inject_block = qa_comp
        # Ensure a table exists if it's a comparison
        if '<table class="comp-table">' not in content:
            inject_block += """<table class="comp-table">
  <thead><tr><th>Parameter</th><th>TechFit Supplied Brands (BH Fitness/Tunturi)</th><th>Competing Brands</th></tr></thead>
  <tbody>
    <tr><td><strong>Sourcing Channel</strong></td><td>Direct Authorized Dealership</td><td>Multiple Brokers/Middlemen</td></tr>
    <tr><td><strong>CapEx Premium</strong></td><td>Optimized ROI</td><td>High Initial Cost</td></tr>
    <tr><td><strong>Parts Availability</strong></td><td>Immediate (Warehoused in India)</td><td>4-8 Weeks Import Delay</td></tr>
  </tbody>
</table>
"""
    
    if inject_block:
        # htmlContent starts right after the opening backtick
        return f"  '{slug}': {{\n{match.group(3)}htmlContent: `{inject_block}{content}"
    
    return match.group(0)

# Regex to match a guide entry:  'slug': { ... htmlContent: `...`
pattern = re.compile(r"  '([a-z0-9-]+)': \{\n(.*?)htmlContent: `(.*?)", re.DOTALL)
# Wait, this regex is a bit greedy/dangerous. 
# Let's split by htmlContent: `
parts = app_js.split('htmlContent: `')
new_app_js = parts[0]

for i in range(1, len(parts)):
    # Find the slug from the end of the previous part
    prev_part = parts[i-1]
    slug_match = re.search(r"  '([a-z0-9-]+)': \{(?:[^\}]*?)$", prev_part, re.DOTALL)
    
    if slug_match:
        slug = slug_match.group(1)
        inject_block = ""
        if 'commercial-gym-setup-' in slug or 'hotel-gym-setup-' in slug or 'society-gym-setup-' in slug or 'corporate-gym-setup-' in slug:
            inject_block = qa_city
        elif '-vs-' in slug or '-alternative-' in slug or 'alternative' in slug:
            inject_block = qa_comp
            # The current part (parts[i]) contains the content until the next backtick.
            # Since backticks close the template string, let's just inject at the start.
            # But wait, checking if table exists requires looking at the content inside the backticks.
            content_inside = parts[i].split('`')[0]
            if '<table class="comp-table">' not in content_inside:
                inject_block += """<table class="comp-table">
  <thead><tr><th>Parameter</th><th>TechFit Supplied Brands (BH Fitness/Tunturi)</th><th>Competing Brands</th></tr></thead>
  <tbody>
    <tr><td><strong>Sourcing Channel</strong></td><td>Direct Authorized Dealership</td><td>Multiple Brokers/Middlemen</td></tr>
    <tr><td><strong>CapEx Premium</strong></td><td>Optimized ROI</td><td>High Initial Cost</td></tr>
    <tr><td><strong>Parts Availability</strong></td><td>Immediate (Warehoused in India)</td><td>4-8 Weeks Import Delay</td></tr>
  </tbody>
</table>
"""
        
        # Only inject if not already there
        if 'class="quick-answer"' not in parts[i]:
            new_app_js += 'htmlContent: `' + inject_block + parts[i]
        else:
            new_app_js += 'htmlContent: `' + parts[i]
    else:
        new_app_js += 'htmlContent: `' + parts[i]

with open(app_js_path, 'w') as f:
    f.write(new_app_js)

print("Injected AEO Quick Answers and Tables successfully.")
