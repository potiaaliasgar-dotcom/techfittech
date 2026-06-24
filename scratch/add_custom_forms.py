import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# Replace renderQuoteFormHtml
new_renderQuoteFormHtml = """function renderQuoteFormHtml(projectType) {
  let customFields = '';
  
  if (projectType === 'Custom MMA Cage & Boxing Ring Fabrication') {
    customFields = `
      <div class="eq-form-group" style="grid-column: 1 / -1;">
        <label for="eq-cage-size">Cage Size Requirement</label>
        <select id="eq-cage-size" style="width:100%; padding:0.8rem; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
          <option value="Not sure yet">Not sure yet</option>
          <option value="16ft (Training)">16ft (Training)</option>
          <option value="20ft (Standard)">20ft (Standard)</option>
          <option value="24ft (Competition)">24ft (Competition)</option>
          <option value="30ft (Broadcast/UFC spec)">30ft (Broadcast/UFC spec)</option>
        </select>
      </div>
      <div class="eq-form-group" style="grid-column: 1 / -1;">
        <label for="eq-cage-mounting">Mounting Type</label>
        <select id="eq-cage-mounting" style="width:100%; padding:0.8rem; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
          <option value="Not sure yet">Not sure yet</option>
          <option value="Floor Mounted (Direct to ground)">Floor Mounted (Direct to ground)</option>
          <option value="Elevated Podium (1ft - 3ft)">Elevated Podium (1ft - 3ft)</option>
        </select>
      </div>
    `;
  } else if (projectType === 'Wellness, Cryotherapy & Longevity Suites') {
    customFields = `
      <div class="eq-form-group" style="grid-column: 1 / -1;">
        <label>Select Required Modalities</label>
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
          <label style="display:flex; align-items:center; gap:0.5rem; color:rgba(255,255,255,0.8);"><input type="checkbox" class="eq-modality" value="Hyperbaric Oxygen Chamber (HBOT)"> Hyperbaric Oxygen Chamber (HBOT)</label>
          <label style="display:flex; align-items:center; gap:0.5rem; color:rgba(255,255,255,0.8);"><input type="checkbox" class="eq-modality" value="Whole Body Cryotherapy"> Whole Body Cryotherapy</label>
          <label style="display:flex; align-items:center; gap:0.5rem; color:rgba(255,255,255,0.8);"><input type="checkbox" class="eq-modality" value="Red Light Therapy Panel (PBM)"> Red Light Therapy Panel (PBM)</label>
          <label style="display:flex; align-items:center; gap:0.5rem; color:rgba(255,255,255,0.8);"><input type="checkbox" class="eq-modality" value="Ice Bath / Cold Plunge"> Ice Bath / Cold Plunge</label>
        </div>
      </div>
      <div class="eq-form-group" style="grid-column: 1 / -1; margin-top:1rem;">
        <label for="eq-facility-type">Facility Type</label>
        <select id="eq-facility-type" style="width:100%; padding:0.8rem; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
          <option value="Commercial Gym">Commercial Gym</option>
          <option value="Hotel/Resort">Hotel/Resort</option>
          <option value="Medical Clinic / Biohacking Studio">Medical Clinic / Biohacking Studio</option>
          <option value="Private Home / Villa">Private Home / Villa</option>
        </select>
      </div>
    `;
  } else if (projectType === 'Custom CrossFit & Functional Training Rigs') {
    customFields = `
      <div class="eq-form-group" style="grid-column: 1 / -1;">
        <label for="eq-rig-type">Customization Level</label>
        <select id="eq-rig-type" style="width:100%; padding:0.8rem; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px;">
          <option value="Standard Wall-Mounted Rig">Standard Wall-Mounted Rig</option>
          <option value="Freestanding Center Rig">Freestanding Center Rig</option>
          <option value="Full Custom Frame (Hyrox/CrossFit Spec)">Full Custom Frame (Hyrox/CrossFit Spec)</option>
        </select>
      </div>
      <div class="eq-form-group" style="grid-column: 1 / -1;">
        <label for="eq-floor-space">Available Floor Space</label>
        <input type="text" id="eq-floor-space" placeholder="e.g. 500 sq ft or 20ft x 20ft" />
      </div>
    `;
  }

  return `
<section class="sec embedded-quote-sec">
  <section class="sec-in">
    <div class="embedded-quote-form-wrap">
      <h3 class="eq-title">Request a Custom B2B Quote</h3>
      <p class="eq-desc">Interested in <strong>${projectType}</strong>? Submit your details below, and our experts will contact you within one business day with a customized B2B proposal.</p>
      <form id="embeddedQuoteForm" class="embedded-quote-form" onsubmit="event.preventDefault(); submitEmbeddedQuote('${projectType}'); return false;">
        <div class="eq-form-grid">
          <div class="eq-form-group">
            <label for="eq-name">Full Name *</label>
            <input type="text" id="eq-name" required placeholder="Enter your full name" />
          </div>
          <div class="eq-form-group">
            <label for="eq-email">Email Address *</label>
            <input type="email" id="eq-email" required placeholder="name@company.com" />
          </div>
          <div class="eq-form-group">
            <label for="eq-phone">Mobile Number (10-Digit) *</label>
            <input type="tel" id="eq-phone" required placeholder="9820166910" pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" />
          </div>
          <div class="eq-form-group">
            <label for="eq-location">City / Location *</label>
            <input type="text" id="eq-location" required placeholder="e.g. Mumbai, Maharashtra" />
          </div>
          ${customFields}
        </div>
        <button type="submit" class="eq-submit-btn">Get Custom B2B Quote →</button>
      </form>
    </div>
  </section>
</section>
  `;
}"""

# Replace submitEmbeddedQuote
new_submitEmbeddedQuote = """async function submitEmbeddedQuote(projectType) {
  const btn = document.querySelector('#embeddedQuoteForm button[type="submit"]');
  const originalText = btn.textContent;

  const name = document.getElementById('eq-name').value.trim();
  let phone = document.getElementById('eq-phone').value.trim();
  phone = phone.replace(/\\D/g, '').slice(0, 10);

  const email = document.getElementById('eq-email').value.trim();
  const city = document.getElementById('eq-location').value.trim();

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!name || phone.length !== 10) {
    alert('Please enter your name and a valid 10-digit mobile number.');
    return;
  }

  if (!city) {
    alert('Please enter your City / Location.');
    return;
  }

  let extraDetails = "";
  if (projectType === 'Custom MMA Cage & Boxing Ring Fabrication') {
    const size = document.getElementById('eq-cage-size')?.value || 'N/A';
    const mounting = document.getElementById('eq-cage-mounting')?.value || 'N/A';
    extraDetails = `\\n\\nCage Details:\\n- Size: ${size}\\n- Mounting: ${mounting}`;
  } else if (projectType === 'Wellness, Cryotherapy & Longevity Suites') {
    const checkboxes = document.querySelectorAll('.eq-modality:checked');
    const modalities = Array.from(checkboxes).map(c => c.value).join(', ') || 'None selected';
    const facility = document.getElementById('eq-facility-type')?.value || 'N/A';
    extraDetails = `\\n\\nWellness Details:\\n- Facility: ${facility}\\n- Modalities: ${modalities}`;
  } else if (projectType === 'Custom CrossFit & Functional Training Rigs') {
    const rigType = document.getElementById('eq-rig-type')?.value || 'N/A';
    const space = document.getElementById('eq-floor-space')?.value || 'N/A';
    extraDetails = `\\n\\nCrossFit/Hyrox Details:\\n- Rig Type: ${rigType}\\n- Floor Space: ${space}`;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = {
    name: name,
    email: email,
    phone: phone,
    gymName: `B2B Embedded Form: ${projectType}`,
    city: city,
    requirement: projectType,
    budget: "Not specified",
    message: `Requested custom B2B quote for category: ${projectType}${extraDetails}`
  };

  try {
    const response = await fetch("https://techfit-backend.vercel.app/api/gmail-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to send request.");
    toast('✓ Quote request sent! We will call you within one business day.');
    
    // Fire Google Ads conversion
    fireConversion(GAW_FORM_LABEL, projectType);

    // Save lead parameters in sessionStorage for GTM
    try {
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_name', name);

      if (window.dataLayer) {
        window.dataLayer.push({"""

# Find original renderQuoteFormHtml
start_render = app_js.find('function renderQuoteFormHtml(projectType) {')
end_render = app_js.find('async function submitEmbeddedQuote(projectType) {')

# Find original submitEmbeddedQuote
end_submit = app_js.find('          "event": "generate_lead"', end_render) # This is inside submitEmbeddedQuote

# Wait, finding end of submitEmbeddedQuote safely
submit_chunk = app_js[end_render:]
# Instead, regex replacement:
render_pattern = re.compile(r'function renderQuoteFormHtml\(projectType\) \{.*?\n\}', re.DOTALL)
submit_pattern = re.compile(r'async function submitEmbeddedQuote\(projectType\) \{.*?if \(window\.dataLayer\) \{[\s\S]*?window\.dataLayer\.push\(\{', re.DOTALL)

app_js = render_pattern.sub(new_renderQuoteFormHtml, app_js)
app_js = submit_pattern.sub(new_submitEmbeddedQuote, app_js)

with open(app_js_path, 'w') as f:
    f.write(app_js)

print("Custom quote forms added to app.js")
