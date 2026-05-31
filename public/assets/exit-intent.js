// Standalone Exit-Intent Detection & Lead-Capture Module
(function () {
  const PDF_FILENAME = 'TechFit-Commercial-Gym-Setup-Cost-Guide-India-2026.pdf';
  
  // Inject modal markup dynamically into the body
  function injectModal() {
    if (document.getElementById('exitIntentModal')) return;

    const modalHtml = `
      <div id="exitIntentModal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(9,9,11,0.85); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); align-items:center; justify-content:center; padding:20px; font-family:'Outfit',sans-serif;">
        <div style="max-width:480px; width:100%; background:#09090B; border:1px solid #27272A; border-radius:8px; padding:35px; box-shadow:0 20px 50px rgba(0,0,0,0.6); position:relative;">
          <h3 style="color:#DC2626; font-size:1.6rem; margin:0 0 8px 0; text-transform:uppercase; text-align:center; font-weight:800; letter-spacing:0.02em;">Wait! Before you leave...</h3>
          <h4 style="color:#fff; font-size:1.15rem; margin:0 0 12px 0; text-align:center; font-weight:700;">Get the 2026 Commercial Gym Setup Cost Guide</h4>
          <p style="color:#A1A1AA; font-size:0.92rem; text-align:center; margin:0 0 24px 0; line-height:1.5;">Get the authoritative sourcing blueprint: pricing bands, timeline roadmaps, and vendor matrices for India's cardio, strength, padel, and longevity setups.</p>
          <form id="exitIntentForm">
            <div style="margin-bottom:15px;">
              <label for="ei-name" style="display:block; color:#E4E4E7; margin-bottom:6px; font-weight:600; font-size:0.8rem; text-transform:uppercase;">Full Name *</label>
              <input type="text" id="ei-name" required placeholder="Ali Asgar" style="width:100%; padding:12px 16px; background:#18181B; border:1px solid #27272A; border-radius:4px; color:#fff; font-size:0.95rem; box-sizing:border-box; outline:none;" />
            </div>
            <div style="margin-bottom:25px;">
              <label for="ei-email" style="display:block; color:#E4E4E7; margin-bottom:6px; font-weight:600; font-size:0.8rem; text-transform:uppercase;">Email Address *</label>
              <input type="email" id="ei-email" required placeholder="ali@techfitactive.com" style="width:100%; padding:12px 16px; background:#18181B; border:1px solid #27272A; border-radius:4px; color:#fff; font-size:0.95rem; box-sizing:border-box; outline:none;" />
            </div>
            <button type="submit" style="width:100%; padding:14px; font-size:1rem; font-weight:700; text-transform:uppercase; border-radius:4px; margin-bottom:15px; cursor:pointer; background:#DC2626; color:#fff; border:none; transition:background 0.15s;">Send Me The Guide &rarr;</button>
            <div style="text-align:center;">
              <button type="button" id="ei-close-btn" style="background:none; border:none; color:#71717A; font-size:0.85rem; text-decoration:underline; cursor:pointer;">No thanks, continue browsing</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = modalHtml;
    document.body.appendChild(container.firstElementChild);

    // Add event listeners
    document.getElementById('exitIntentForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('ei-close-btn').addEventListener('click', closeModal);
    document.getElementById('exitIntentModal').addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }

  function showModal() {
    if (sessionStorage.getItem('exitIntentShown')) return;
    sessionStorage.setItem('exitIntentShown', 'true');
    injectModal();
    const modal = document.getElementById('exitIntentModal');
    if (modal) {
      modal.style.display = 'flex';
      console.log('[TechFit] Exit-Intent Modal shown');
    }
  }

  function closeModal() {
    const modal = document.getElementById('exitIntentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.querySelector('#exitIntentForm button[type="submit"]');
    const originalText = btn.textContent;

    const name = document.getElementById('ei-name').value.trim();
    const email = document.getElementById('ei-email').value.trim();

    if (!name || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    btn.textContent = 'Sending Guide...';
    btn.disabled = true;

    const data = {
      name: name,
      email: email,
      phone: "0000000000", // Default phone for lead magnet
      gymName: "Lead Magnet Download",
      city: "Exit-Intent Capture",
      requirement: "2026 Cost Guide Lead Magnet",
      budget: "Not specified",
      message: "Captured via Exit-Intent Lead Magnet Popup on bouncing traffic."
    };

    try {
      const response = await fetch("https://techfit-backend.vercel.app/api/gmail-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send lead.");

      // Fire Google Ads conversion (using global function defined in app.js if available)
      if (typeof window.fireConversion === 'function') {
        window.fireConversion(window.GAW_FORM_LABEL || 'ObCTCPuJmv0bEOrizvNC', 'lead_magnet');
      } else if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17959203178/ObCTCPuJmv0bEOrizvNC',
          'value': 1.0,
          'currency': 'INR'
        });
      }

      // Save parameters in sessionStorage for Enhanced Conversions
      try {
        sessionStorage.setItem('lead_email', email);
        sessionStorage.setItem('lead_name', name);
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'lead_submitted',
            'lead_email': email,
            'lead_name': name
          });
        }
      } catch (err) {}

      // Show success notification
      if (typeof window.toast === 'function') {
        window.toast('✓ Guide sent! Downloading now...');
      } else {
        alert('Enquiry registered! Your download will begin shortly.');
      }

      // Trigger direct PDF download
      const downloadLink = document.createElement('a');
      downloadLink.href = `/lead-magnets/${PDF_FILENAME}`;
      downloadLink.download = PDF_FILENAME;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      closeModal();
    } catch (error) {
      alert('Our factory mail server is currently experiencing issues. Please WhatsApp us on +91 98201 66910.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  // ── DETECTORS ─────────────────────────────────────────────────────────────
  
  // 1. Desktop: Cursor exit (mouseleave top of screen)
  function initDesktopDetection() {
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY < 10) {
        showModal();
      }
    });
  }

  // 2. Mobile: Rapid upward scroll after 3s of loading
  function initMobileDetection() {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    const loadTime = Date.now();

    window.addEventListener('scroll', function () {
      const now = Date.now();
      // Only detect within 30 seconds of landing, and after at least 3 seconds (engaging first)
      const elapsedSinceLoad = now - loadTime;
      if (elapsedSinceLoad < 3000 || elapsedSinceLoad > 30000) return;

      const currentScrollY = window.scrollY;
      const scrollDiff = lastScrollY - currentScrollY; // positive = scrolling up
      const timeDiff = now - lastTime;

      if (scrollDiff > 80 && timeDiff < 100) {
        // Scrolled up more than 80px within 100ms: rapid upward flick
        showModal();
      }

      lastScrollY = currentScrollY;
      lastTime = now;
    }, { passive: true });
  }

  // Initialize both detectors
  if (window.innerWidth > 768) {
    initDesktopDetection();
  } else {
    initMobileDetection();
  }

})();
