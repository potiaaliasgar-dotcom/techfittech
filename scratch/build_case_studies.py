import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# 1. Add renderCaseStudies() and renderCaseStudy(slug)
case_studies_code = """
function renderCaseStudies() {
  const cases = [
    { slug: 'blog-mfn', title: "Matrix Fight Night × TechFit: 15 Events, 3 Cages", client: "Matrix Fight Night", segment: "Professional MMA", img: "/og/og-mma.jpg" }
  ];
  let html = `<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
    <section class="sec-in" style="max-width:1000px;margin:0 auto;text-align:center">
      <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Our Work</div>
      <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0 1.5rem;line-height:1.15;font-weight:800">Case Studies</h1>
      <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px;margin:0 auto">Deep dives into the engineering and execution behind India's premier gym, wellness, and sports infrastructure projects.</p>
    </section>
  </section>
  <section class="sec" style="background:#000;padding:4rem 2rem">
    <section class="sec-in" style="max-width:1200px;margin:0 auto">
      <div class="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:2rem;">`;
      
  for (const c of cases) {
    html += `
        <div class="card" onclick="go('${c.slug}')" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;overflow:hidden;cursor:pointer;transition:transform 0.2s">
          <img src="${c.img}" style="width:100%;height:220px;object-fit:cover;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="padding:1.5rem;">
            <div style="font-size:0.8rem;color:var(--red);text-transform:uppercase;font-weight:600;margin-bottom:0.5rem">${c.segment}</div>
            <h3 style="color:#fff;font-size:1.25rem;margin-bottom:1rem;line-height:1.4">${c.title}</h3>
            <p style="color:rgba(255,255,255,0.6);font-size:0.95rem;margin-bottom:0"><strong>Client:</strong> ${c.client}</p>
          </div>
        </div>`;
  }
  html += `</div></section></section>${footer()}`;
  return html;
}

function renderCaseStudy(slug) {
  if (slug === 'blog-mfn') {
    return `<section class="phero" style="background:linear-gradient(to bottom,rgba(9,9,11,0.8),rgba(9,9,11,1)),url('/og/og-mma.jpg');background-size:cover;background-position:center;padding:10rem 2rem 4rem;">
      <section class="sec-in" style="max-width:1000px;margin:0 auto;text-align:center">
        <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Professional MMA Infrastructure</div>
        <h1 style="color:#fff;font-size:clamp(2rem,4vw,3rem);margin:0.5rem 0 1.5rem;line-height:1.15;font-weight:800">Matrix Fight Night × TechFit: 15 Events, 3 Cages, and the Hexagon That Built India's Pathway to the UFC</h1>
      </section>
    </section>
    
    <section class="sec" style="background:#000;padding:4rem 2rem">
      <section class="sec-in" style="max-width:1000px;margin:0 auto">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;background:rgba(255,255,255,0.03);padding:2rem;border-radius:12px;margin-bottom:4rem;border:1px solid rgba(255,255,255,0.05)">
          <div><h4 style="color:var(--red);font-size:0.85rem;text-transform:uppercase;margin-bottom:0.5rem">Client</h4><p style="color:#fff;font-size:1.1rem;font-weight:600;margin:0">Matrix Fight Night</p></div>
          <div><h4 style="color:var(--red);font-size:0.85rem;text-transform:uppercase;margin-bottom:0.5rem">Segment</h4><p style="color:#fff;font-size:1.1rem;font-weight:600;margin:0">Professional MMA</p></div>
          <div><h4 style="color:var(--red);font-size:0.85rem;text-transform:uppercase;margin-bottom:0.5rem">Timeline</h4><p style="color:#fff;font-size:1.1rem;font-weight:600;margin:0">45 Days</p></div>
          <div><h4 style="color:var(--red);font-size:0.85rem;text-transform:uppercase;margin-bottom:0.5rem">Outcome</h4><p style="color:#fff;font-size:1.1rem;font-weight:600;margin:0">3 Cages across 15 Events</p></div>
        </div>
        
        <div class="prose" style="color:rgba(255,255,255,0.85);font-size:1.1rem;line-height:1.8">
          <p>When Matrix Fight Night staged its debut event at the <strong>NSCI Dome in Mumbai on 12 March 2019</strong>, India's MMA scene had fighters, fans, and an appetite for elite competition. What it didn't yet have was a homegrown promotion with infrastructure built to international standards, or a cage manufacturer who could build one without a 90-day ocean shipment from the United States.</p>
          <p>Seven years later, MFN has run 17 events, sealed a broadcast partnership with Disney+Hotstar, and produced two fighters — <strong>Anshul Jubli and Puja Tomar</strong> — who have gone on to sign with the UFC. TechFit was the official cage supplier for MFN 1 through MFN 15 — fifteen consecutive events, three full cage production cycles, two UFC signings, one continuous relationship.</p>
          
          <h2 style="color:#fff;font-size:1.8rem;margin:3rem 0 1.5rem">The brief: a broadcast-grade Indian cage, in 45 days</h2>
          <p>The brief MFN brought to TechFit was specific:</p>
          <ul style="margin-bottom:2rem">
            <li>A 30-foot fighting surface, the same nominal size as cages used at top global promotions</li>
            <li>Podium-mounted to elevate the action for both the live audience and camera operators</li>
            <li>A hexagonal layout, not octagonal — a deliberate brand and design choice</li>
            <li>Custom-printed canvas with MFN's logos, finished to a standard that holds up under HD broadcast cameras</li>
            <li>Fully portable — delivered in 45 days</li>
          </ul>

          <h2 style="color:#fff;font-size:1.8rem;margin:3rem 0 1.5rem">Why a hexagon, not an octagon</h2>
          <p>A hexagonal cage is its own visual signature on broadcast — instantly distinguishable from UFC footage. From a fight-dynamics perspective, six sides at a 30-foot diameter give fighters fewer but wider corners than an octagon at the same diameter. We engineered the hexagonal frame to the same load tolerances and impact specs as a top-level competition octagon.</p>

          <h2 style="color:#fff;font-size:1.8rem;margin:3rem 0 1.5rem">The build: 45 days from steel to canvas</h2>
          <p>Production for MFN 1 ran 45 days at our Mumbai facility. Four parallel workstreams:</p>
          <ul style="margin-bottom:2rem">
            <li><strong>Steel frame and podium substructure:</strong> Heavy-gauge structural steel for the six corner posts and the elevated platform.</li>
            <li><strong>Vinyl fencing:</strong> Heavy-gauge fencing tensioned across six panels at competition-spec dimensions.</li>
            <li><strong>High-density padding:</strong> Foam padding sleeves on every post and multi-layer floor padding.</li>
            <li><strong>The canvas:</strong> High-resolution, multi-color brand graphics on a competition canvas that has to remain anti-slip and read crisply under sports broadcast lighting.</li>
          </ul>

          <div style="background:rgba(255,255,255,0.03);border-left:4px solid var(--red);padding:2rem;margin:3rem 0;font-style:italic;font-size:1.2rem;color:#fff">
            "We have worked with TechFit from MFN 1 through MFN 15. Across fifteen events, the cage has done exactly what we needed it to — hold up to broadcast scrutiny, look right on camera, install on time, keep our fighters safe. They have been more than a vendor. They've been part of how MFN has grown."<br><br>
            <span style="font-size:1rem;font-style:normal;color:rgba(255,255,255,0.6)">— Ayesha Shroff, Co-founder, Matrix Fight Night</span>
          </div>
          
          <p style="margin-top:4rem;text-align:center">
             <button class="btn-red" onclick="go('mma-cages')">Explore MMA Cages & Boxing Rings →</button>
          </p>
        </div>
      </section>
    </section>
    ${footer()}`;
  }
  return render404();
}
"""

if "function renderCaseStudies" not in app_js:
    # Inject it before function render()
    app_js = app_js.replace("function render() {", case_studies_code + "\n    function render() {")

# 2. Add 'case-studies' to routing
if "'case-studies': renderCaseStudies," not in app_js:
    app_js = app_js.replace("'404': render404", "'case-studies': renderCaseStudies,\n        'blog-mfn': () => renderCaseStudy('blog-mfn'),\n        '404': render404")
    # Also update validPages
    app_js = app_js.replace("'terms-of-service',", "'case-studies', 'terms-of-service',")

# 3. Add internal links from related pages
if "go('blog-mfn')" not in app_js:
    # For MMA cages page, add a link to the case study
    app_js = app_js.replace("<h2>Manufacturing Specs & Customization</h2>", 
                            "<h2>Manufacturing Specs & Customization</h2>\n<div style=\"background:rgba(255,255,255,0.05);padding:1.5rem;border-radius:8px;margin-bottom:2rem;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(255,255,255,0.1)\"><div><h4 style=\"margin:0 0 0.5rem;color:#fff;font-size:1.2rem\">Matrix Fight Night Case Study</h4><p style=\"margin:0;color:rgba(255,255,255,0.7)\">Read how we built the 30ft broadcast-grade hexagonal cage for India's biggest MMA promotion.</p></div><button class=\"btn-red\" style=\"white-space:nowrap;margin-left:2rem\" onclick=\"go('blog-mfn')\">Read Case Study</button></div>\n")
                            
with open(app_js_path, 'w') as f:
    f.write(app_js)

# 4. Update scripts/generate-seo-pages.mjs to add 'case-studies' to validRoutes
with open('/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs', 'r') as f:
    seo_mjs = f.read()
    
if "'case-studies'" not in seo_mjs:
    seo_mjs = seo_mjs.replace("'contact',", "'contact',\n  'case-studies',")
    
with open('/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs', 'w') as f:
    f.write(seo_mjs)

print("Injected Case Studies Hub into app.js and updated generator script.")
