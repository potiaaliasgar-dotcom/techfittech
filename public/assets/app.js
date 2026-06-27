let PRODUCTS = [];
let BLOG_POSTS = [];
const GAW_ID = 'AW-17959203178';
const GAW_FORM_LABEL = 'ObCTCPuJmv0bEOrizvNC';
const GAW_PHONE_LABEL = 'ou7UCNq77bscEOrizvNC';
const GAW_WHATSAPP_LABEL = 'bIN4CNS77bscEOrizvNC';
const GAW_EMAIL_LABEL = 'T_tdCNe77bscEOrizvNC';

// Expose constants to window so external scripts (like exit-intent.js) can read them
window.GAW_ID = GAW_ID;
window.GAW_FORM_LABEL = GAW_FORM_LABEL;
window.GAW_PHONE_LABEL = GAW_PHONE_LABEL;
window.GAW_WHATSAPP_LABEL = GAW_WHATSAPP_LABEL;
window.GAW_EMAIL_LABEL = GAW_EMAIL_LABEL;

function fireConversion(label, projectType = '') {
  if (typeof gtag !== 'function') return;
  const transactionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  gtag('event', 'conversion', {
    'send_to': `${GAW_ID}/${label}`,
    'value': 1.0,
    'currency': 'INR',
    'transaction_id': transactionId,
    'project_type': projectType
  });
  console.log(`[TechFit] Google Ads conversion fired for: ${label} (${projectType}) with transaction_id: ${transactionId}`);
}
window.fireConversion = fireConversion;

function pictureTag(src, alt = '', className = '', isLazy = true, inlineStyles = '', width = '', height = '', id = '') {
  if (!src) return '';
  if (src.startsWith('assets/')) {
    src = '/' + src;
  }
  const idAttr = id ? `id="${id}"` : '';
  const lazyAttr = isLazy ? 'loading="lazy"' : 'loading="eager" fetchpriority="high"';
  
  if (src.endsWith('.svg') || src.startsWith('data:') || !src.includes('/assets/images/')) {
    return `<img src="${src}" alt="${alt}" class="${className}" style="${inlineStyles}" ${idAttr} ${lazyAttr} decoding="async" ${width ? `width="${width}"` : ''} ${height ? `height="${height}"` : ''}>`;
  }
  
  const ext = src.slice(src.lastIndexOf('.'));
  const baseWithoutExt = src.slice(0, src.lastIndexOf('.'));
  
  const avifSrcset = `${baseWithoutExt}-400.avif 400w, ${baseWithoutExt}-800.avif 800w, ${baseWithoutExt}-1600.avif 1600w`;
  const webpSrcset = `${baseWithoutExt}-400.webp 400w, ${baseWithoutExt}-800.webp 800w, ${baseWithoutExt}-1600.webp 1600w`;
  
  return `<picture class="${className}" style="${inlineStyles}">
    <source type="image/avif" srcset="${avifSrcset}" sizes="(max-width: 768px) 100vw, 800px">
    <source type="image/webp" srcset="${webpSrcset}" sizes="(max-width: 768px) 100vw, 800px">
    <img src="${src}" alt="${alt}" class="${className}" style="${inlineStyles}" ${idAttr} ${lazyAttr} decoding="async" ${width ? `width="${width}"` : ''} ${height ? `height="${height}"` : ''}>
  </picture>`;
}

function renderQuoteFormHtml(projectType) {
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
        </div>
        <button type="submit" class="eq-submit-btn">Get Custom B2B Quote →</button>
      </form>
    </div>
  </section>
</section>
  `;
}

async function submitEmbeddedQuote(projectType) {
  const btn = document.querySelector('#embeddedQuoteForm button[type="submit"]');
  const originalText = btn.textContent;

  const name = document.getElementById('eq-name').value.trim();
  let phone = document.getElementById('eq-phone').value.trim();
  phone = phone.replace(/\D/g, '').slice(0, 10);

  const email = document.getElementById('eq-email').value.trim();
  const city = document.getElementById('eq-location').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    message: `Requested custom B2B quote for category: ${projectType}`
  };

  try {
    const response = await fetch("https://formsubmit.co/ajax/techfitpa@gmail.com", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok || result.success === "false") throw new Error(result.message || result.error || "Failed to send request.");
    toast('✓ Quote request sent! We will call you within one business day.');
    
    // Fire Google Ads conversion
    fireConversion(GAW_FORM_LABEL, projectType);

    // Save lead parameters in sessionStorage for GTM
    try {
      sessionStorage.setItem('lead_email', email);
      sessionStorage.setItem('lead_phone', phone);
      sessionStorage.setItem('lead_name', name);

      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'lead_submitted',
          'lead_email': email,
          'lead_phone': phone,
          'lead_name': name
        });
      }
    } catch (e) {
      
    }

    // Redirect to thank-you page
    history.pushState({}, '', '/thank-you');
    page = 'thank-you';
    render();
    navActive();
    updateSEO();
  } catch (error) {
    alert(error.message || 'Our factory mail server is currently experiencing issues. Please WhatsApp us on +91 98201 66910.');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

    const CLIENT_LOGOS = {
      "Fitness 360": "/assets/images/other/img-7d5d25049d.png",
      "Kumite 1 League": "/assets/images/other/img-6cbe8fa319.png",
      "TechFit": "/assets/images/other/img-7edcc2dfb4.png",
      "TechFit Active": "/assets/images/other/img-aea4e380c8.png",
      "Alteon": "/assets/images/other/img-833b7c3cda.png", "Clover": "/assets/images/other/img-0295b0f7dd.png", "BH Fitness Brand": "/assets/images/other/img-c6dd7720b3.png", "Tunturi Brand": "/assets/images/other/img-ab61fa334b.png", "California Brand": "/assets/images/other/img-2bac6c9f2a.png", "Google": "/assets/images/other/img-8fed004a13.png", "TCS": "/assets/images/other/img-c4cbb16202.png", "Hiranandani": "/assets/images/other/img-47e351af32.png", "Rustomjee": "/assets/images/other/img-1928a2e1d9.svg", "Kalpataru": "/assets/images/other/img-a8f8a60482.png", "Prestige Group": "/assets/images/other/img-152846cd9e.svg", "Adani": "/assets/images/other/img-f5756ba05b.jpg", "K Raheja Corp": "/assets/images/other/img-5a1569d8be.png", "Antariksh": "/assets/images/other/img-051ba6924e.png", "Dosti": "/assets/images/other/img-e399025149.png", "Ajmera": "/assets/images/other/img-9e85e97419.png", "S Raheja": "/assets/images/other/img-eb3dc96e5f.png", "Gold's Gym": "/assets/images/other/img-594af2ad47.png", "Cult.fit": "/assets/images/other/img-10afac4755.png", "MMA Matrix": "/assets/images/other/img-5c5039980a.png", "Fit Club": "/assets/images/other/img-93f02c8c06.png", "Equinox Fitness": "/assets/images/other/img-95e6649488.png", "SuperHuman Gym": "/assets/images/other/img-65be2d720e.png", "Chisel Gym": "/assets/images/other/img-1a75915c4b.png", "Cloud 9 Gyms": "/assets/images/other/img-bca9c9fbbf.png", "Matrix Fight Night": "/assets/images/other/img-5c4e1617f3.png"
    };

    let page = 'home', brand = null, cat = 'All', pg = 1, q = '';

    function showLoader() { const l = document.getElementById('global-loader'); if (l) l.classList.add('show'); }
    function hideLoader() { const l = document.getElementById('global-loader'); if (l) l.classList.remove('show'); }

    // ── SEO META TAG MANAGEMENT ───────────────────────────────────────────────────
    const BASE = 'https://www.techfittech.com';
    const DEFAULT_OG_IMG = BASE + '/og-image.jpg';

    const SEO_MAP = {
      'home': {
        title: 'TechFit | Gym, Wellness & Sports Infrastructure',
        desc: 'TechFit is a one-stop gym, wellness and sports infrastructure partner. Reseller for BH Fitness, Tunturi, California Fitness, and Alteon Wellness.',
        img: DEFAULT_OG_IMG
      },
      'alteon': {
        title: 'Alteon Wellness & Recovery | Reseller — Cryotherapy, HBOT, Red-Light',
        desc: 'TechFit is a reseller of Alteon Wellness & Recovery. Premium recovery technology — hyperbaric oxygen chambers, cryotherapy, red-light therapy, dry-float, IHHT and more.',
        img: DEFAULT_OG_IMG
      },
      'bh-fitness': {
        title: 'BH Fitness | Reseller — Treadmills, Bikes, Ellipticals',
        desc: 'TechFit is a reseller of BH Fitness commercial gym equipment. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',
        img: DEFAULT_OG_IMG
      },
      'tunturi': {
        title: 'Tunturi | Reseller — Nordic Fitness Equipment',
        desc: 'TechFit is a reseller of Tunturi fitness equipment. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',
        img: DEFAULT_OG_IMG
      },
      'california-fitness': {
        title: 'California Fitness | Reseller — Commercial Gym Equipment',
        desc: 'TechFit is a reseller of California Fitness. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',
        img: DEFAULT_OG_IMG
      },
      'techfit': {
        title: 'TechFit Active | In-House Gym & Sports Equipment Manufacturer India',
        desc: 'TechFit Active — India\'s in-house manufacturer of MMA cages, boxing rings, CrossFit rigs, free weights, padel courts and aqua fitness equipment. Factory in Mumbai.',
        img: DEFAULT_OG_IMG
      },
      'mma-cages': {
        title: 'MMA Cages & Boxing Rings India | TechFit — Manufacturer & Supplier',
        desc: 'Competition and training MMA octagons, floor cages, podium cages and boxing rings by TechFit. Trusted by Matrix Fight Night, Super Fight League and Kumite 1.',
        img: DEFAULT_OG_IMG
      },
      'crossfit-rigs': {
        title: 'CrossFit Rigs & Functional Training India | TechFit Manufacturer',
        desc: 'Custom CrossFit rigs, wall-mounted pull-up systems, calisthenics structures and modular functional-training rigs. Designed and manufactured by TechFit in Mumbai.',
        img: DEFAULT_OG_IMG
      },
      'free-weights': {
        title: 'Free Weights & Strength Equipment India | TechFit Manufacturer',
        desc: 'Olympic barbells, rubber-coated dumbbells, bumper plates, power racks, squat stands and deadlift platforms. Manufactured in India by TechFit.',
        img: DEFAULT_OG_IMG
      },
      'padel-pickleball': {
        title: 'Padel & Pickleball Courts India | TechFit — Design, Build & Install',
        desc: 'End-to-end padel and pickleball court construction in India. Design, fabrication and installation for clubs, resorts, housing societies and corporate campuses.',
        img: DEFAULT_OG_IMG
      },
      'aqua': {
        title: 'Aqua Fitness & Underwater Treadmills India | TechFit',
        desc: 'Underwater treadmills, aqua therapy pools and aqua fitness equipment by TechFit. Designed for physiotherapy clinics, hotels, wellness centres and rehabilitation facilities.',
        img: DEFAULT_OG_IMG
      },
      'wellness-solutions': {
        title: 'Wellness Solutions India | TechFit — Recovery, Longevity & Spa Equipment',
        desc: 'Complete wellness solutions by TechFit — from hyperbaric chambers and cryotherapy to infrared saunas and float pods. Turnkey wellness infrastructure for hotels, clinics and gyms.',
        img: DEFAULT_OG_IMG
      },
      'services': {
        title: 'Gym & Wellness Services India | TechFit — Design, Install, AMC',
        desc: 'TechFit services — gym design consultation, equipment supply, installation, flooring, AMC and after-sales support. Full turnkey solutions across India.',
        img: DEFAULT_OG_IMG
      },
      'about': {
        title: 'About TechFit | India\'s Premier Gym & Sports Infrastructure Company',
        desc: 'Founded in Mumbai, TechFit is India\'s leading gym, wellness and sports infrastructure company. Learn about our story, leadership, manufacturing facility and vision.',
        img: DEFAULT_OG_IMG
      },
      'contact': {
        title: 'Contact TechFit | Get a Free Gym & Wellness Consultation',
        desc: 'Get in touch with TechFit for a free gym setup consultation. Call +91 98201 66910 or visit us at Plot No 309, Coal Bunder Road E, Reay Road, Darukhana, Mumbai, Maharashtra 400010, India.',
        img: DEFAULT_OG_IMG
      },
      'for-gyms': {
        title: 'Gym & Studio Setup India | TechFit — Equipment, Design & Installation',
        desc: 'Complete gym and studio setup solutions by TechFit. From equipment selection to layout design, flooring and installation — get your gym running fast.',
        img: DEFAULT_OG_IMG
      },
      'for-developers': {
        title: 'Real-Estate Developer Gym Amenities India | TechFit',
        desc: 'Premium gym and wellness amenities for residential and commercial real-estate developers. TechFit partners with India\'s top builders for world-class fitness infrastructure.',
        img: DEFAULT_OG_IMG
      },
      'for-schools': {
        title: 'School & Institution Fitness Setup India | TechFit',
        desc: 'Safe, age-appropriate fitness equipment and sports infrastructure for schools, colleges and institutions. Designed and supplied by TechFit across India.',
        img: DEFAULT_OG_IMG
      },
      'for-hotels': {
        title: 'Hotel Gym & Wellness Setup India | TechFit',
        desc: 'Turnkey hotel gym and wellness solutions. Premium equipment from BH Fitness, Tunturi and California Fitness — plus spa, recovery and Alteon wellness technology.',
        img: DEFAULT_OG_IMG
      },
      'blogs': {
        title: 'TechFit Blog | Gym, Wellness & Sports Industry Insights India',
        desc: 'Industry insights, case studies and news from TechFit — India\'s leading gym, wellness and sports infrastructure company.',
        img: DEFAULT_OG_IMG
      },
      'blog-mfn': {
        title: 'Matrix Fight Night — MMA Cage by TechFit | Case Study',
        desc: 'How TechFit designed and built the competition-grade MMA octagon for Matrix Fight Night — India\'s premier mixed martial arts promotion.',
        img: DEFAULT_OG_IMG
      },
      'blog-sfl': {
        title: 'Super Fight League — MMA Cage by TechFit | Case Study',
        desc: 'TechFit manufactured the professional MMA cage for Super Fight League, one of India\'s biggest combat sports events.',
        img: DEFAULT_OG_IMG
      },
      'blog-kumite': {
        title: 'Kumite 1 League — Boxing Ring by TechFit | Case Study',
        desc: 'TechFit built the competition boxing ring for Kumite 1 League, India\'s high-profile combat sports league.',
        img: DEFAULT_OG_IMG
      },
      'blog-mma-matrix': {
        title: 'MMA Matrix — Tiger Shroff\'s Gym by TechFit | Case Study',
        desc: 'TechFit designed and equipped MMA Matrix — Bollywood actor Tiger Shroff\'s signature mixed martial arts training gym.',
        img: DEFAULT_OG_IMG
      },
      'blog-one-stop': {
        title: 'One-Stop Gym Infrastructure — TechFit Advantage | Blog',
        desc: 'Why TechFit is the one-stop solution for all gym infrastructure needs — from equipment and flooring to design, installation and maintenance.',
        img: DEFAULT_OG_IMG
      },
      'blog-wellness-boom': {
        title: 'India\'s Wellness Boom — Alteon & Recovery Tech | Blog',
        desc: 'Exploring India\'s growing wellness and longevity market, and how Alteon recovery technology is leading the charge.',
        img: DEFAULT_OG_IMG
      },
      'gym-flooring': {
        title: 'Gym Flooring India | TechFit — Rubber, Turf & Interlocking Tiles',
        desc: 'Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf and shock-absorbent mats. Supplied and installed by TechFit across India.',
        img: DEFAULT_OG_IMG
      },
      'flooring': {
        title: 'Gym Flooring India | TechFit — Rubber, Turf & Interlocking Tiles',
        desc: 'Professional gym flooring solutions — rubber rolls, interlocking tiles, artificial turf and shock-absorbent mats. Supplied and installed by TechFit across India.',
        img: DEFAULT_OG_IMG
      },
      'thank-you': {
        title: 'Thank You for Your Enquiry | TechFit India',
        desc: 'Thank you for contacting TechFit. We have received your inquiry and our team will get in touch with you shortly.',
        img: DEFAULT_OG_IMG
      }
    };

    function updateSEO() {
      const routeKey = page || 'home';
      const seo = SEO_MAP[routeKey] || SEO_MAP['home'];
      const path = routeKey === 'home' ? '/' : '/' + routeKey;
      const fullUrl = BASE + path;

      // 1. Canonical URL
      const canonical = document.getElementById('canonical-link');
      if (canonical) canonical.setAttribute('href', fullUrl);

      // 2. Title
      document.title = seo.title;

      // 3. Meta description
      const metaDesc = document.getElementById('meta-description');
      if (metaDesc) metaDesc.setAttribute('content', seo.desc);

      // 4. Open Graph tags
      const ogUrl = document.getElementById('og-url');
      if (ogUrl) ogUrl.setAttribute('content', fullUrl);

      const ogTitle = document.getElementById('og-title');
      if (ogTitle) ogTitle.setAttribute('content', seo.title);

      const ogDesc = document.getElementById('og-description');
      if (ogDesc) ogDesc.setAttribute('content', seo.desc);

      const ogImg = document.getElementById('og-image');
      if (ogImg) ogImg.setAttribute('content', seo.img || DEFAULT_OG_IMG);

      // 5. Twitter Card tags
      const twTitle = document.getElementById('tw-title');
      if (twTitle) twTitle.setAttribute('content', seo.title);

      const twDesc = document.getElementById('tw-description');
      if (twDesc) twDesc.setAttribute('content', seo.desc);

      const twImg = document.getElementById('tw-image');
      if (twImg) twImg.setAttribute('content', seo.img || DEFAULT_OG_IMG);

      // 6. Dynamic Route-Aware WhatsApp Prefill
      const waCta = document.getElementById('dynamic-whatsapp-cta');
      const waFloat = document.querySelector('a[aria-label="Chat on WhatsApp"]');
      
      let msg = "Hi TechFit, I'd like a quote for gym and wellness infrastructure.";
      const key = page || 'home';
      
      if (key === 'mma-cages') {
        msg = "Hi TechFit, I'd like a quote for an MMA Cage or Boxing Ring.";
      } else if (key === 'padel-pickleball') {
        msg = "Hi TechFit, I'd like a quote for a panoramic Padel Court or Pickleball Court.";
      } else if (key === 'alteon' || key === 'wellness-solutions') {
        msg = "Hi TechFit, I'd like a quote for Alteon Wellness & Recovery equipment.";
      } else if (key === 'crossfit-rigs') {
        msg = "Hi TechFit, I'd like a quote for a custom CrossFit Rig.";
      } else if (key === 'free-weights') {
        msg = "Hi TechFit, I'd like a quote for commercial free weights.";
      } else if (key === 'aqua') {
        msg = "Hi TechFit, I'd like a quote for SS316 underwater fitness equipment.";
      } else if (key === 'gym-flooring' || key === 'flooring') {
        msg = "Hi TechFit, I'd like a quote for commercial gym flooring.";
      } else if (key.startsWith('blog-')) {
        msg = `Hi TechFit, I read your case study on "${seo.title}" and would like to know more.`;
      } else if (key.startsWith('alternatives/')) {
        msg = `Hi TechFit, I read your sourcing guide on "${seo.title}" and would like a custom quote.`;
      } else if (key === 'for-gyms') {
        msg = "Hi TechFit, I'd like to consult on setting up a commercial gym or studio.";
      } else if (key === 'for-developers') {
        msg = "Hi TechFit, I'd like to consult on gym amenities for a real-estate development project.";
      } else if (key === 'for-schools') {
        msg = "Hi TechFit, I'd like to consult on safe sports and gym infrastructure for a school or college.";
      } else if (key === 'for-hotels') {
        msg = "Hi TechFit, I'd like to consult on hotel gym and wellness recovery amenities.";
      }
      
      const encodedMsg = encodeURIComponent(msg);
      const targetUrl = `https://wa.me/919820166910?text=${encodedMsg}`;
      
      if (waCta) waCta.setAttribute('href', targetUrl);
      if (waFloat) waFloat.setAttribute('href', targetUrl);
    }

    let searchTimeout;
    function handleSearch(val) {
      q = val; pg = 1;
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        render();
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
          searchBox.focus();
          const len = searchBox.value.length;
          searchBox.setSelectionRange(len, len);
          const grid = document.getElementById('prod-grid');
          if (grid) {
            const topPos = grid.getBoundingClientRect().top + window.scrollY - 150;
            window.scrollTo({ top: topPos, behavior: 'instant' });
          }
        }
      }, 350);
    }

    function go(p, b, c) {
      showLoader();
      page = p; brand = b || null; cat = c || 'All'; pg = 1; q = '';
      closeAllDD();
      const mob = document.getElementById('nav-mob');
      const btn = document.getElementById('nav-ham-btn');
      mob.classList.remove('open');
      if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }

      const searchParams = new URLSearchParams();
      if (b) searchParams.set('brand', b);
      if (c && c !== 'All') searchParams.set('cat', c);
      let url = `/${p}`;
      if ([...searchParams].length > 0) url += `?${searchParams.toString()}`;
      try {
        if (window.location.pathname !== url || window.location.search !== (searchParams.toString() ? `?${searchParams.toString()}` : '')) {
          history.pushState({ p, b, c }, '', url);
        }
      } catch (e) { }

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        render(); navActive(); updateSEO();
      window.prerenderReady = true;
      // Initialize scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }, 500);

        setTimeout(() => hideLoader(), 20);
      }, 50);
    }

    function render() {
      const app = document.getElementById('app');
      const views = {
        'home': renderHome,
        'for-gyms': () => renderSegment('gyms'),
        'for-developers': () => renderSegment('developers'),
        'for-schools': () => renderSegment('schools'),
        'for-hotels': () => renderSegment('hotels'),
        'techfit': renderTechFit,
        'alteon': renderAlteon,
        'bh-fitness': () => renderBrand('BH Fitness'),
        'tunturi': () => renderBrand('Tunturi'),
        'california-fitness': () => renderBrand('California Fitness'),
        'mma-cages': renderMMA,
        'crossfit-rigs': renderCrossFit,
        'free-weights': renderFreeWeights,
        'padel-pickleball': renderPadel,
        'aqua': renderAqua,
        'wellness-solutions': renderWellness,
        'services': renderServices,
        'about': renderAbout,
        'contact': renderContact,
        'thank-you': renderThankYou,
        'blogs': renderBlogs,
        'gym-flooring': renderFlooring,
        'flooring': renderFlooring,
        'blog-mfn': () => renderBlog('mfn'),
        'blog-sfl': () => renderBlog('sfl'),
        'blog-kumite': () => renderBlog('kumite'),
        'blog-mma-matrix': () => renderBlog('mma-matrix'),
        'blog-one-stop': () => renderBlog('one-stop'),
        'blog-wellness-boom': () => renderBlog('wellness-boom'),
        'privacy-policy': renderPrivacyPolicy,
        'terms-of-service': renderTermsOfService,
        'alternatives/technogym-india': renderTechnogymAlternative,
        'alternatives/life-fitness-india': renderLifeFitnessAlternative,
        'alternatives/sechrist-hyperbaric-india': renderSechristAlternative,
        'alternatives/precor-india': renderPrecorAlternative,
        'alternatives/mecotec-cryotherapy-india': renderMecotecAlternative,
        'alternatives/usi-cosco-techfit-cages': renderUsiCoscoAlternative,
        'alternatives': renderAlternativesHub,
        'case-studies': renderCaseStudies,
        'blog-mfn': () => renderCaseStudy('blog-mfn'),
        '404': render404
      };
      const guideSlugs = ["commercial-gym-setup-cost-india","how-to-set-up-a-commercial-gym","best-commercial-treadmills-india","commercial-gym-equipment-list","hotel-gym-setup-guide","bh-fitness-vs-life-fitness","tunturi-vs-precor","best-gym-equipment-brands-india","imported-vs-indian-gym-equipment","gym-equipment-suppliers-india-compared","commercial-gym-setup-mumbai","commercial-gym-setup-pune","commercial-gym-setup-bangalore","commercial-gym-setup-hyderabad","commercial-gym-setup-delhi-ncr"];
      if (guideSlugs.includes(page) || (typeof GUIDES_DATA !== 'undefined' && GUIDES_DATA[page])) {
        app.innerHTML = renderGuide(page);
      } else {
        app.innerHTML = (views[page] || render404)();
      }

      const commercialPages = {
        'for-gyms': 'Commercial Gym Setup',
        'for-developers': 'Real Estate & Developer Gym Amenities',
        'for-schools': 'Educational Institution Gym Setup',
        'for-hotels': 'Hotel & Corporate Wellness Suites',
        'bh-fitness': 'BH Fitness Commercial Gym Equipment',
        'tunturi': 'Tunturi Wellness & Strength Equipment',
        'california-fitness': 'California Fitness Strength Equipment',
        'mma-cages': 'Custom MMA Cage & Boxing Ring Fabrication',
        'crossfit-rigs': 'Custom CrossFit & Functional Training Rigs',
        'free-weights': 'Commercial Free Weights & Plate Setup',
        'padel-pickleball': 'Padel & Pickleball Court Infrastructure',
        'aqua': 'Aqua Fitness & Underwater Rehabilitation Systems',
        'wellness-solutions': 'Wellness, Cryotherapy & Longevity Suites',
        'gym-flooring': 'Commercial Gym & Sports Flooring',
        'flooring': 'Commercial Gym & Sports Flooring',
        'alteon': 'Alteon Hyperbaric & Wellness Chambers',
        'techfit': 'TechFit Custom fabricated Gym Rigs & Combat Systems',
        'alternatives/technogym-india': 'B2B Gym Equipment (Technogym India Alternative)',
        'alternatives/life-fitness-india': 'B2B Gym Equipment (Life Fitness India Alternative)',
        'alternatives/sechrist-hyperbaric-india': 'Clinical Hyperbaric Chambers (Sechrist India Alternative)',
        'alternatives/precor-india': 'B2B Cardio & Strength (Precor India Alternative)',
        'alternatives/mecotec-cryotherapy-india': 'Whole Body Cryotherapy (Mecotec India Alternative)',
        'alternatives/usi-cosco-techfit-cages': 'Custom MMA Cages & Fight Rings (USI/Cosco Alternative)',
        'alternatives/cybex-india': 'B2B Gym Equipment (Cybex Alternative)',
        'alternatives/hammer-strength-india': 'B2B Gym Equipment (Hammer Strength Alternative)',
        'alternatives/nautilus-india': 'B2B Gym Equipment (Nautilus Alternative)',
        'alternatives/star-trac-india': 'B2B Gym Equipment (Star Trac Alternative)',
        'alternatives/body-solid-india': 'B2B Gym Equipment (Body-Solid Alternative)',
        'alternatives/hoist-fitness-india': 'B2B Gym Equipment (Hoist Fitness Alternative)',
        'alternatives/freemotion-india': 'B2B Gym Equipment (FreeMotion Alternative)',
        'alternatives/true-fitness-india': 'B2B Gym Equipment (True Fitness Alternative)',
        'alternatives/american-fitness-india': 'B2B Gym Equipment (American Fitness Alternative)',
        'alternatives/atlantis-strength-india': 'B2B Gym Equipment (Atlantis Strength Alternative)',
        'alternatives/fitline-india': 'B2B Gym Equipment (Fitline Alternative)',
        'alternatives/matrix-fitness-india': 'B2B Gym Equipment (Matrix Fitness Alternative)',
        'alternatives/jerai-fitness-india': 'B2B Gym Equipment (Jerai Fitness Alternative)',
        'alternatives/being-strong-india': 'B2B Gym Equipment (Being Strong Alternative)'
      ,
        'commercial-gym-setup-cost-india': 'Commercial Gym Setup Cost in India (2026 Guide)',
        'how-to-set-up-a-commercial-gym': 'How to Set Up a Commercial Gym in India: Step-by-Step',
        'best-commercial-treadmills-india': 'Best Commercial Treadmills in India (2026 Buying Guide)',
        'commercial-gym-equipment-list': 'Complete Commercial Gym Equipment List & Budget (2026)',
        'hotel-gym-setup-guide': 'Hotel & Resort Gym Setup: Equipment, Layout & Cost',
        'bh-fitness-vs-life-fitness': 'BH Fitness vs Life Fitness: Commercial Gym Sourcing compared',
        'tunturi-vs-precor': 'Tunturi vs Precor: B2B Commercial Sourcing Guide',
        'best-gym-equipment-brands-india': 'Best Commercial Gym Equipment Brands in India Compared (2026)',
        'imported-vs-indian-gym-equipment': 'Imported vs Indian Gym Equipment: Which to Choose?',
        'gym-equipment-suppliers-india-compared': 'Gym Equipment Suppliers in India Compared (2026)',
        'commercial-gym-setup-mumbai': 'Commercial Gym Setup in Mumbai | Turnkey Manufacturer & Supplier',
        'commercial-gym-setup-pune': 'Commercial Gym Setup in Pune | Equipment & Custom Fabrication',
        'commercial-gym-setup-bangalore': 'Commercial Gym Setup in Bangalore | Turnkey Equipment Supplier',
        'commercial-gym-setup-hyderabad': 'Commercial Gym Setup in Hyderabad | Equipment & Court Setup',
        'commercial-gym-setup-delhi-ncr': 'Commercial Gym Setup in Delhi NCR | Turnkey B2B Equipment'
      };

      if (commercialPages[page]) {
        app.innerHTML += renderQuoteFormHtml(commercialPages[page]);
      }

      document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('.faq-item').classList.toggle('open'));
      });
      initCarousels();
    }

    /* ── CAROUSEL WITH < > ARROWS ── */
    function initCarousels() {
      if (window.innerWidth > 700) return;
      const selectors = ['.testi-grid', '.feat-grid', '.pillars', '.segments'];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(track => {
          if (track.closest('.carousel-wrap')) return; // already wrapped
          const wrap = document.createElement('div');
          wrap.className = 'carousel-wrap';
          track.parentNode.insertBefore(wrap, track);
          wrap.appendChild(track);
          track.classList.add('carousel-track');

          // Create prev button
          const prev = document.createElement('button');
          prev.className = 'carousel-btn prev';
          prev.setAttribute('aria-label', 'Previous');
          prev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
          wrap.appendChild(prev);

          // Create next button
          const next = document.createElement('button');
          next.className = 'carousel-btn next';
          next.setAttribute('aria-label', 'Next');
          next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';
          wrap.appendChild(next);

          // Create dots
          const items = track.children;
          if (items.length > 1) {
            const dotsWrap = document.createElement('div');
            dotsWrap.className = 'carousel-dots';
            for (let i = 0; i < items.length; i++) {
              const dot = document.createElement('button');
              dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
              dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
              dot.addEventListener('click', () => {
                items[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              });
              dotsWrap.appendChild(dot);
            }
            wrap.appendChild(dotsWrap);

            // Update dots on scroll
            let scrollTimer;
            track.addEventListener('scroll', () => {
              clearTimeout(scrollTimer);
              scrollTimer = setTimeout(() => {
                const scrollLeft = track.scrollLeft;
                const cardWidth = items[0].offsetWidth;
                const activeIdx = Math.round(scrollLeft / cardWidth);
                dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
                  d.classList.toggle('active', i === activeIdx);
                });
              }, 60);
            }, { passive: true });
          }

          // Button click handlers
          prev.addEventListener('click', () => {
            const cardWidth = items[0].offsetWidth + parseInt(getComputedStyle(track).gap || '16');
            track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
          });
          next.addEventListener('click', () => {
            const cardWidth = items[0].offsetWidth + parseInt(getComputedStyle(track).gap || '16');
            track.scrollBy({ left: cardWidth, behavior: 'smooth' });
          });
        });
      });
    }

    const navMap = {
      'home': 'nl-home',
      'for-gyms': 'nl-solutions', 'for-developers': 'nl-solutions', 'for-schools': 'nl-solutions', 'for-hotels': 'nl-solutions', 'wellness-solutions': 'nl-solutions',
      'bh-fitness': 'nl-products', 'tunturi': 'nl-products', 'california-fitness': 'nl-products',
      'mma-cages': 'nl-products', 'crossfit-rigs': 'nl-products', 'free-weights': 'nl-products',
      'padel-pickleball': 'nl-products', 'aqua': 'nl-products',
      'services': 'nl-services', 'about': 'nl-about', 'contact': 'nl-contact', 'blogs': 'nl-blogs', 'gym-flooring': 'nl-products', 'flooring': 'nl-products', 'blog-mfn': 'nl-blogs', 'blog-sfl': 'nl-blogs', 'blog-kumite': 'nl-blogs', 'blog-mma-matrix': 'nl-blogs', 'blog-one-stop': 'nl-blogs', 'blog-wellness-boom': 'nl-blogs', 'alteon': 'nl-products'
    };
    function navActive() {
      document.querySelectorAll('.nl,.nd-btn').forEach(el => el.classList.remove('active'));
      const id = navMap[page];
      if (id) document.getElementById(id)?.classList.add('active');
    }

    function toggleDD(id) {
      const menu = document.getElementById(id);
      const wasOpen = menu.classList.contains('open');
      closeAllDD();
      if (!wasOpen) menu.classList.add('open');
    }
    function closeAllDD() {
      document.querySelectorAll('.nd-menu').forEach(m => m.classList.remove('open'));
    }
    function toggleMob() {
      const mob = document.getElementById('nav-mob');
      const btn = document.getElementById('nav-ham-btn');
      mob.classList.toggle('open');
      const isOpen = mob.classList.contains('open');
      btn.classList.toggle('active', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    }
    document.addEventListener('click', e => {
      if (!e.target.closest('.nd')) closeAllDD();
    });

    // ── SHARED COMPONENTS ──────────────────────────────────────────────────────────
    function faqItem(q, a) {
      return `<div class="faq-item"><button class="faq-q">${q}<span>+</span></button><div class="faq-a">${a}</div></div>`;
    }

    function renderProductRange() {
      return `
<section class="product-range-sec">
  <div class="range-watermark">CRAFTED</div>
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Product Range</span>
      <h2 class="sec-title">WHAT WE BUILD</h2>
      <p class="sec-sub">Five product categories. All designed and fabricated in-house at our Byculla facility.</p>
    </div>
    <div class="seg-grid">
      <div class="seg-card reveal" onclick="go('mma-cages')">
        <div class="card-num">01</div>
        <div class="card-accent"></div>
        <h3>MMA Cages<br>&amp; Rings</h3>
        <p>Professional UFC-spec cages, boxing rings, and combat sports structures. Custom dimensions, powder-coat finishes, and full installation.</p>
        <button class="segment-cta">EXPLORE MMA &rarr;</button>
      </div>
      <div class="seg-card reveal" onclick="go('crossfit-rigs')">
        <div class="card-num">02</div>
        <div class="card-accent"></div>
        <h3>CrossFit<br>Rigs</h3>
        <p>Modular pull-up rigs, wall-mounted systems, and full functional training structures for CrossFit boxes and functional training areas.</p>
        <button class="segment-cta">EXPLORE RIGS &rarr;</button>
      </div>
      <div class="seg-card reveal" onclick="go('free-weights')">
        <div class="card-num">03</div>
        <div class="card-accent"></div>
        <h3>Free<br>Weights</h3>
        <p>Custom dumbbells, barbells, kettlebells, weight plates, and storage systems. Manufactured to commercial standards with anti-corrosion finishes.</p>
        <button class="segment-cta">EXPLORE WEIGHTS &rarr;</button>
      </div>
      <div class="seg-card reveal" onclick="go('padel-pickleball')">
        <div class="card-num">04</div>
        <div class="card-accent"></div>
        <h3>Padel &amp;<br>Pickleball</h3>
        <p>Full padel court construction and pickleball court fit-outs. From steel structure to glass panels, netting, and artificial turf — turnkey delivery.</p>
        <button class="segment-cta">EXPLORE COURTS &rarr;</button>
      </div>
      <div class="seg-card reveal" onclick="go('aqua')">
        <div class="card-num">05</div>
        <div class="card-accent"></div>
        <h3>Aqua<br>Fitness</h3>
        <p>Underwater treadmills, resistance bikes, and aqua therapy equipment. Corrosion-resistant builds for commercial pool environments.</p>
        <button class="segment-cta">EXPLORE AQUA &rarr;</button>
      </div>
    </div>
  </section>
</section>`;
    }

    function ctaBand(h, sub, btn, page) {
      return `<div class="cta-band">
  <h2>${h}</h2>
  ${sub ? `<p style="color:rgba(255,255,255,.7);font-size:.95rem;margin-bottom:1.5rem">${sub}</p>` : ''}
  <button class="btn-white" onclick="go('${page || 'contact'}')">${btn}</button>
</div>`;
    }

    function footer() {
      return `<footer>
  <div class="footer-in">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand-box"><img src="/assets/images/other/img-7edcc2dfb4.png" alt="TechFit" loading="lazy"></div>
        <p>India's premier gym, wellness &amp; sports infrastructure partner. Design, supply, installation and after-sales — all under one roof.</p>
      </div>
      <div class="footer-col">
        <h4>Solutions</h4>
        <button onclick="go('for-gyms')">For Gyms &amp; Studios</button>
        <button onclick="go('for-developers')">For Developers</button>
        <button onclick="go('for-schools')">For Schools</button>
        <button onclick="go('for-hotels')">For Hotels</button>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <button onclick="go('bh-fitness')">BH Fitness</button>
        <button onclick="go('tunturi')">Tunturi</button>
        <button onclick="go('california-fitness')">California Fitness</button>
        <button onclick="go('mma-cages')">MMA Cages</button>
        <button onclick="go('crossfit-rigs')">CrossFit Rigs</button>
        <button onclick="go('gym-flooring')">Gym Rubber Flooring</button>
        <button onclick="go('alteon')">Alteon Wellness &amp; Recovery</button>
      </div>
      <div class="footer-col">
        <h4>Get in Touch</h4>
        <a href="tel:+919820166910" class="footer-tel">+91 98201 66910</a>
        <a href="mailto:info@techfitactive.com" class="footer-email">info@techfitactive.com</a>
        <a href="https://share.google/IahWbxIMm9ywKR9qp" target="_blank" rel="noopener" class="footer-addr">Plot No 309, Coal Bunder Road E,<br>Reay Road, Darukhana,<br>Mumbai, Maharashtra 400010</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 TechFit. All Rights Reserved.</p>
      <div style="display:flex;gap:1.5rem;margin:1rem 0;justify-content:center;flex-wrap:wrap">
        <button onclick="go('privacy-policy')" style="background:none;border:none;color:rgba(255,255,255,.5);font-size:.85rem;cursor:pointer;padding:0;font-family:inherit" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,.5)'">Privacy Policy</button>
        <button onclick="go('terms-of-service')" style="background:none;border:none;color:rgba(255,255,255,.5);font-size:.85rem;cursor:pointer;padding:0;font-family:inherit" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,.5)'">Terms of Service</button>
      </div>
      <p>MUMBAI · INDIA</p>
    </div>
  </div>
</footer>`;
    }

    // ── CLIENT LOGO WALL ───────────────────────────────────────────────────────────
    // Order: Gyms first, then Developers, then Corporate
    const CLIENT_GROUPS = {
      all: {
        label: 'Our Clients',
        clients: [
          { name: "Gold's Gym", logo: "Gold's Gym" },
          { name: 'Cult.fit', logo: 'Cult.fit' },
          { name: 'MMA Matrix', logo: 'MMA Matrix' },
          { name: 'Fit Club', logo: 'Fit Club' },
          { name: 'Chisel Gym', logo: 'Chisel Gym' },
          { name: 'Cloud 9 Gyms', logo: 'Cloud 9 Gyms' },
          { name: 'Matrix Fight Night', logo: 'Matrix Fight Night' },
          { name: 'Equinox Fitness', logo: 'Equinox Fitness' },
          { name: 'SuperHuman Gym', logo: 'SuperHuman Gym' },
          { name: 'Fitness 360', logo: 'Fitness 360' },
          { name: 'Kumite 1 League', logo: 'Kumite 1 League' },
          { name: 'Tarun Fitness', logo: null },
          { name: 'Hiranandani', logo: 'Hiranandani' },
          { name: 'Rustomjee', logo: 'Rustomjee' },
          { name: 'Prestige Group', logo: 'Prestige Group' },
          { name: 'Kalpataru', logo: 'Kalpataru' },
          { name: 'Adani', logo: 'Adani' },
          { name: 'Dosti', logo: 'Dosti' },
          { name: 'Ajmera', logo: 'Ajmera' },
          { name: 'S Raheja', logo: 'S Raheja' },
          { name: 'Clover', logo: 'Clover' },
          { name: 'Google', logo: 'Google' },
          { name: 'TCS', logo: 'TCS' },
        ]
      },
    };

    function logoWall() {
      const allClients = CLIENT_GROUPS.all.clients;
      const cells = allClients.map(c => {
        if (c.logo && CLIENT_LOGOS[c.logo]) {
          return `<div class="logo-cell"><img src="${CLIENT_LOGOS[c.logo]}" alt="${c.name}" loading="lazy"></div>`;
        } else {
          return `<div class="logo-cell-noimg"><div class="logo-cell-name">${c.name}</div></div>`;
        }
      }).join('');
      const amm = `<div class="logo-cell-noimg"><div class="logo-cell-name" style="font-weight:900;letter-spacing:.15em;text-align:center;font-size:0.75rem;">AND MANY<br>MORE</div></div>`;
      return `<div class="logo-wall">${cells}${amm}</div>`;
    }

    // ── HOME ───────────────────────────────────────────────────────────────────────
    function renderTechFit() {
      return `
<section class="phero" style="background:linear-gradient(135deg,#09090b 60%,#1a0a00)">
  <section class="sec-in">
    <div class="phero-label">Made in Mumbai</div>
    <h1 style="color:#fff">TECHFIT<br><span style="color:var(--red)">CUSTOM</span></h1>
    <p class="phero-sub">India's own commercial-grade fitness fabrication. MMA cages, CrossFit rigs, free weights, padel courts, and aqua fitness equipment — custom built to your specs.</p>
    <div style="display:flex;gap:1.5rem;margin-top:2.5rem;flex-wrap:wrap;justify-content:center">
      <button class="btn-red" onclick="go('contact')">Get a Custom Quote</button>
      <button class="btn-outline" onclick="go('mma-cages')">Explore Products</button>
    </div>
  </section>
</section>

${renderProductRange()}

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">The TechFit Advantage</span>
      <h2 class="sec-title">BUILT FOR THE SPORT.<br>BUILT FOR YOUR BRAND.</h2>
    </div>
    <div class="pillars" style="margin-top:2.5rem">
      <div class="pillar">
        <h3>Made in India</h3>
        <p>Designed and fabricated at our Byculla facility in Mumbai. No import delays, no currency risk &mdash; and full accountability from quote to installation.</p>
      </div>
      <div class="pillar">
        <div class="pillar-icon">&#xFE0F;</div>
        <h3>Custom to Spec</h3>
        <p>Every product is built to your exact requirements &mdash; dimensions, colours, branding, load ratings. No catalogue constraints.</p>
      </div>
      <div class="pillar">
        <h3>Turnkey Delivery</h3>
        <p>We handle design, fabrication, logistics, and on-site installation. One point of contact from start to finish.</p>
      </div>
      <div class="pillar">
        <h3>Post-Installation Support</h3>
        <p>AMC and service contracts available. Our team responds quickly to any structural issues, ensuring your facility stays operational.</p>
      </div>
    </div>
  </section>
</section>

${ctaBand("Ready to Build Something Custom?", "Share your space specs and requirements. Our fabrication team will design a solution and give you a detailed quote \xe2\x80\x94 no commitment needed.", "Get a Free Quote")}
${footer()}
`;
    }

    function renderAlteon() {
      return `
<section class="phero" style="position:relative;overflow:hidden;min-height:72vh;display:flex;align-items:center;background:#000">
  <img src="/assets/images/other/img-ef2a03b968.jpg" alt="Alteon Wellness" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:.55" loading="lazy">
  <section class="sec-in" style="position:relative;z-index:2;padding:6rem 2rem">
    <div class="phero-label" style="color:#4ade80;letter-spacing:.18em">Recovery. Wellness. Longevity.</div>
    <h1 style="color:#fff;font-size:clamp(2.4rem,6vw,4.5rem);margin:.6rem 0 1.2rem;letter-spacing:.08em">ALTEON<br><span style="color:#4ade80;font-size:.65em;font-weight:600;letter-spacing:.12em">WELLNESS &amp; RECOVERY</span></h1>
    <p class="phero-sub" style="max-width:560px;color:rgba(255,255,255,.82);font-size:1.05rem;line-height:1.7">An integrated beauty, wellness and longevity technology company — delivering end-to-end solutions for next-generation wellness environments.</p>
    <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap">
      <button class="btn-red" onclick="go('contact')">Enquire About Alteon</button>
      <button style="background:transparent;border:1.5px solid rgba(255,255,255,.45);color:#fff;padding:.75rem 1.75rem;border-radius:.35rem;font-weight:700;cursor:pointer;letter-spacing:.04em;font-size:.9rem" onclick="document.getElementById('alteon-products').scrollIntoView({behavior:'smooth'})">VIEW PRODUCTS ↓</button>
    </div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center" class="rsp-1col">
      <div>
        <span class="sec-label" style="color:#4ade80">About Alteon</span>
        <h2 class="sec-title" style="color:#fff;margin-top:.5rem">A MULTIDISCIPLINARY WELLNESS DESIGN &amp; INNOVATION COLLECTIVE</h2>
        <p style="color:rgba(255,255,255,.7);line-height:1.8;margin-top:1.2rem;font-size:.95rem">From luxury wellness centers to performance clinics and longevity labs, we create integrated ecosystems where design, technology, and protocols work together to deliver recovery, optimization, and long-term health.</p>
        <p style="color:rgba(255,255,255,.7);line-height:1.8;margin-top:.8rem;font-size:.95rem">Alteon partners with TechFit to bring world-class wellness and recovery technology to India&#x2019;s <a href="/for-gyms" onclick="event.preventDefault();go('for-gyms')" style="text-decoration:underline;color:#4ade80">premium gyms</a>, <a href="/for-hotels" onclick="event.preventDefault();go('for-hotels')" style="text-decoration:underline;color:#4ade80">hotels</a>, and wellness centres.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem" class="rsp-1col">
        <div style="background:rgba(255,255,255,.05);border:1px solid rgba(74,222,128,.25);border-radius:.75rem;padding:1.4rem">
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.4rem">BIOSYSTEMS</div>
          <p style="font-size:.78rem;color:rgba(255,255,255,.6);line-height:1.6">Tech focused on diagnostics, longevity and recovery.</p>
        </div>
        <div style="background:rgba(255,255,255,.05);border:1px solid rgba(74,222,128,.25);border-radius:.75rem;padding:1.4rem">
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.4rem">AESTHETICS</div>
          <p style="font-size:.78rem;color:rgba(255,255,255,.6);line-height:1.6">Energy-based devices for non-invasive beauty solutions.</p>
        </div>
        <div style="background:rgba(255,255,255,.05);border:1px solid rgba(74,222,128,.25);border-radius:.75rem;padding:1.4rem">
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.4rem">GENETIX</div>
          <p style="font-size:.78rem;color:rgba(255,255,255,.6);line-height:1.6">Innovations in peptides and stem cell regenerative pathways.</p>
        </div>
        <div style="background:rgba(255,255,255,.05);border:1px solid rgba(74,222,128,.25);border-radius:.75rem;padding:1.4rem">
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.4rem">REGEN MEDICINE</div>
          <p style="font-size:.78rem;color:rgba(255,255,255,.6);line-height:1.6">World-leading collaborations for genetic and hormonal testing.</p>
        </div>
      </div>
    </div>
  </section>
</section>

<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:#4ade80">Why Alteon</span>
      <h2 class="sec-title" style="color:#fff">THE ALTEON ADVANTAGE</h2>
    </div>
    <div class="pillars" style="margin-top:2.5rem">
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <h3 style="color:#fff">Device-First DNA</h3>
        <p style="color:rgba(255,255,255,.65)">Technology is the foundation. Research and development is the holy grail. Every solution is built around world-leading devices.</p>
      </div>
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <h3 style="color:#fff">Design-Integrated Thinking</h3>
        <p style="color:rgba(255,255,255,.65)">Devices that enhance, not disrupt, spaces. Alteon builds wellness ecosystems that are as beautiful as they are functional.</p>
      </div>
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <h3 style="color:#fff">Global Standards</h3>
        <p style="color:rgba(255,255,255,.65)">World-leading certifications and compliance. FDA, CE, ROHS certified equipment. Clinical-grade technology for commercial environments.</p>
      </div>
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <h3 style="color:#fff">End-to-End Turnkey</h3>
        <p style="color:rgba(255,255,255,.65)">Idea. Execution. Operation. Alteon manages the complete journey from concept and design to installation, protocols, and ongoing support.</p>
      </div>
    </div>
  </section>
</section>

<section class="sec" id="alteon-products" style="background:#09090b;color:#fff">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:#4ade80">Product Range</span>
      <h2 class="sec-title" style="color:#fff">LONGEVITY &amp; RECOVERY TECHNOLOGIES</h2>
      <p class="sec-sub" style="color:rgba(255,255,255,.65)">Ten advanced technologies — from cellular recovery to cryotherapy — integrated into a single, cohesive wellness ecosystem.</p>
    </div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">COLD THERAPY — RECOVERY & VITALITY</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">CRYOTHERAPY CHAMBERS</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">One of the widest cryotherapy portfolios available — from nitrogen-based chambers for ultra-low temperatures to advanced electric cryotherapy systems. Delivers rapid cold exposure to support recovery, inflammation reduction, and overall vitality.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div style="font-size:1.3rem;flex-shrink:0;margin-top:.1rem">&#xFE0F;</div>
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Inflammation Reduction</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Reduces inflammation and swelling. Accelerates muscle recovery. Enhances circulation and oxygenation.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Mental Alertness</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Boosts energy and mental alertness. Supports pain relief and joint comfort.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Thermography Monitoring</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Real-time temperature tracking for precise and safe cryotherapy exposure.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Full-Electric Option</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Nitrogen-free electric chambers for enhanced safety and operational efficiency.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">-180°C</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">2-3 Minute Sessions</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">35% Recovery Boost</span></div>
        </div>
        <img src="/assets/images/other/img-9d9d8b67f8.jpg" alt="Cryotherapy Chambers" loading="lazy">
      </div>
  </section>
</section>

<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">HBOT — CELLULAR OXYGENATION</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">HYPERBARIC OXYGEN CHAMBERS</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">A pressurized oxygen chamber delivering high-purity oxygen at elevated atmospheric pressure, allowing oxygen to dissolve deeply into blood plasma and tissues for accelerated healing and cellular regeneration.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Cellular Oxygenation</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Enhances oxygen delivery at the cellular level, accelerating healing and tissue repair.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Brain & Mental Clarity</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Improves brain function and mental clarity. Supports anti-aging and longevity pathways.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Recovery Acceleration</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Reduces inflammation & oxidative stress. Boosts energy, endurance, and resilience.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Certified & Safe</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Medical-grade design. FDA / CE / ROHS certified. 1.5–2.0 ATA. 1–10 user capacity.</p></div>
        </div></div>
          <table style="border-collapse:collapse;margin-top:1.2rem;width:100%"><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Pressure Range</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">1.5 – 2.0 ATA</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Oxygen Delivery</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Up to 95–100% purity</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Seating</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">1–10 users (customizable)</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Session Duration</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">45–90 minutes</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Design</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Luxury modular</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Certifications</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">FDA / CE / ROHS</td></tr></table>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">FDA / CE / ROHS Certified</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Medical-Grade</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">1-10 User Capacity</span></div>
        </div>
        <img src="/assets/images/other/img-b40ca800b5.jpg" alt="Hyperbaric Oxygen Chambers" loading="lazy">
      </div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <img src="/assets/images/other/img-db141a8379.jpg" alt="Red Light Therapy" loading="lazy">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">PHOTOBIOMODULATION</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">RED LIGHT THERAPY</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">Uses targeted red and near-infrared wavelengths to stimulate mitochondrial activity, increasing ATP production at the cellular level — supporting faster recovery, improved tissue health, and physiological resilience without needles, heat, or downtime.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">ATP Production</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Enhances cellular energy at the mitochondrial level — the foundation of recovery and performance.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Tissue Repair</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Supports tissue repair and regeneration. Reduces inflammation and oxidative stress.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Circulation</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Improves circulation and oxygen utilization. Promotes faster recovery and relaxation.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Full-Body Coverage</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Localized to full-body coverage. 680/850 nm wavelengths. 10–30 minute sessions.</p></div>
        </div></div>
          <table style="border-collapse:collapse;margin-top:1.2rem;width:100%"><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Wavelengths</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Red & Near-IR (680 / 850 nm)</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Treatment Mode</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Non-thermal, non-invasive</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Coverage</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Localized to full-body</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Session Duration</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">10–30 minutes</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Operation</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Touch-controlled, programmable</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Safety</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Clinically compliant, zero downtime</td></tr></table>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Non-invasive & Pain-free</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Clinically Safe</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Zero Downtime</span></div>
        </div>
      </div>
  </section>
</section>

<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <img src="/assets/images/other/img-ab0d984233.jpg" alt="Infrared Sauna" loading="lazy">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">FULL-SPECTRUM INFRARED</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">INFRARED SAUNA</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">Infrared saunas use heat shock proteins to help the body recover. By promoting relaxation and detoxification, this therapy enhances circulation and supports overall wellness. Deep cellular detox with bioceramic-coated panels for maximum penetration.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Deep Cellular Detox</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Bioceramic-coated panels provide deep, uniform infrared penetration for effective detox and relaxation.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div style="font-size:1.3rem;flex-shrink:0;margin-top:.1rem">&#xFE0F;</div>
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Low-EMF Safety</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Engineered for minimal electromagnetic exposure, ensuring a calm and safe experience.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div style="font-size:1.3rem;flex-shrink:0;margin-top:.1rem">&#xFE0F;</div>
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Full-Spectrum IR</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Near, mid, and far infrared wavelengths support circulation, recovery, and cellular health.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Premium Build</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Premium Canadian Hemlock wood. Sizes from 4×4 ft. Adaptive ambient & therapeutic lighting.</p></div>
        </div></div>
          <table style="border-collapse:collapse;margin-top:1.2rem;width:100%"><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">IR Range</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">0.2–1 micron wavelength</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Cabin Size</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">From 4×4 ft (customizable)</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Material</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Premium Canadian Hemlock</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Configuration</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Fully customizable layout</td></tr><tr><td style="padding:.4rem .8rem .4rem 0;font-size:.75rem;color:rgba(255,255,255,.45);font-weight:600;letter-spacing:.06em;white-space:nowrap">Lighting</td><td style="padding:.4rem 0;font-size:.78rem;color:rgba(255,255,255,.8)">Adaptive ambient & therapeutic</td></tr></table>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Full-Spectrum Infrared</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Low-EMF Design</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Premium Canadian Hemlock</span></div>
        </div>
      </div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">QUANTUM HARMONICS — ZERO-LOAD RECOVERY</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">DRY FLOAT THERAPY</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">Creates a weightless, deeply calming experience without water contact, using a heated or cooled membrane that mimics natural buoyancy. Vibroacoustic sound gently guides the nervous system into deep relaxation, easing tension and mental fatigue.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Zero-Load Floating</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Zero-impact floating without water contact, reducing musculoskeletal load and joint stress.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div style="font-size:1.3rem;flex-shrink:0;margin-top:.1rem">&#xFE0F;</div>
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Thermoregulated Membrane</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Heated or cooled dry-float surface mimics natural buoyancy for nervous system regulation.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Vibroacoustic Neuromodulation</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Low-frequency sound resonance supports parasympathetic activation and guided relaxation.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Recovery & Stress</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Reduces inflammation, lowers stress hormones, eases muscle tension, and enhances circulation.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">No Water Contact</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Nervous System Recovery</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Mental Clarity & Calm</span></div>
        </div>
        <img src="/assets/images/other/img-dry-float.png" alt="Dry Float Therapy" loading="lazy">
      </div>
  </section>
</section>

<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <img src="/assets/images/other/img-ihht.png" alt="IHHT" loading="lazy">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">INTERMITTENT HYPOXIC–HYPEROXIC THERAPY</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">IHHT</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">A science-backed therapy that alternates low-oxygen and high-oxygen breathing to stimulate cellular adaptation and mitochondrial efficiency. Supports improved energy metabolism, cardiovascular health, and resilience — without physical strain.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Mitochondrial Function</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Enhances mitochondrial function and cellular energy production. Improves cardiovascular efficiency.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Endurance & Recovery</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Boosts recovery, endurance, and overall physical resilience. Promotes anti-aging cellular regeneration.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Real-Time Monitoring</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Continuously tracks SpO₂ and heart rate for safety, precision, and individualized delivery.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Fully Seated Therapy</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Mitochondrial and cardiovascular benefits without workout fatigue. Ideal for recovery and clinical use.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">No Physical Strain</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Fully Seated</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Bio-Adaptive Smart Protocols</span></div>
        </div>
      </div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <img src="/assets/images/other/img-biopod.png" alt="BIOPOD" loading="lazy">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">ALL-IN-ONE WELLNESS CAPSULE</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">BIOPOD</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">An all-in-one wellness capsule that seamlessly integrates salt therapy, oxygen therapy, red light therapy, and aromatherapy into a single, immersive environment — for recovery, relaxation, and long-term wellness.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Halotherapy</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Fine salt particles support respiratory health, skin clarity, and natural detoxification.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Oxygen Enrichment</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Increased oxygen availability enhances cellular recovery, energy, and vitality.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Red & Near-Infrared Light</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Light wavelengths stimulate cellular energy production and tissue regeneration.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Aromatic Infusion</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Therapeutic aromas promote relaxation, emotional balance, and stress reduction.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">4-in-1 Built-In Features</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Enhanced Respiratory Health</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Comprehensive Skin Rejuvenation</span></div>
        </div>
      </div>
  </section>
</section>

<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">MULTI-TECHNOLOGY RECOVERY</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">REVITALE CHAMBER</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">An advanced integrated therapy chamber designed for deep recovery, regeneration, and longevity. Brings multiple bioenergetic technologies into one immersive, intelligent experience.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">PEMF Therapy</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Multi-wave Pulsed Electromagnetic Fields support cellular renewal, pain relief, and enhanced recovery.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Vibroacoustic Sound</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Combines sound and vibration to relax the nervous system and improve mood, sleep, and overall wellbeing.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Multi-Wavelength Light</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Red & Near-IR photobiomodulation supports cellular restoration, circulation, and inflammation reduction.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Molecular Hydrogen</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">A powerful antioxidant approach that increases cellular resilience and supports systemic defense mechanisms.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Complete Full-Body Reset in One Session</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Cellular Renewal & Long-Term Vitality</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Effortless Zero-Gravity Restoration</span></div>
        </div>
        <img src="/assets/images/other/img-31bd74e2d0.jpg" alt="ReVITALE Chamber" loading="lazy">
      </div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">VACUUM CARDIO & INFRARED THERAPY</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">INFRASHAPE LYMPHATIC DRAINAGE</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">Combines vacuum technology with infrared therapy to support circulation, metabolic activation, and fat utilisation. Its low-impact, reclined cardio design offers a safe, joint-friendly way to improve mobility and overall vitality.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Accelerated Fat Burning</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Infrared heat increases metabolic rate and calorie expenditure, enhancing fat oxidation during sessions.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Lymphatic Drainage</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Deep-penetrating IR and vacuum pressure boost blood flow and lymph movement for detoxification.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Cellulite & Body Shaping</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Vacuum and infrared therapy helps smooth skin, reduce circumference, and target stubborn fat deposits.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Skin Rejuvenation</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Infrared and collagen light therapy improve skin elasticity and overall firmness.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Low-Impact Cardio</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Lymphatic Drainage</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Body Sculpting</span></div>
        </div>
        <img src="/assets/images/other/img-297328cce3.jpg" alt="Infrashape Lymphatic Drainage" loading="lazy">
      </div>
  </section>
</section>

<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    
      <div class="alteon-prod-card">
        <img src="/assets/images/other/img-acca158d8e.jpg" alt="Water Massage & Recovery" loading="lazy">
        <div class="body">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.5rem">HYDRO-MASSAGE RECOVERY COUCHES</div>
          <h2 style="color:#fff;font-size:1.6rem;font-weight:900;letter-spacing:.04em;margin:0 0 1rem">WATER MASSAGE & RECOVERY</h2>
          <p style="color:rgba(255,255,255,.7);font-size:.88rem;line-height:1.75;margin-bottom:1.4rem">Water Massage Beds & Recovery Couches offer deep relaxation and muscle relief through warm, hydro-massage and ergonomic support. Designed to accelerate recovery, reduce stress, and improve circulation — creating a calm reset zone within modern wellness spaces.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.9rem 1.2rem">
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Dry Hydro-Massage</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Targeted massage through warm water jets without direct skin contact — hygienic and therapist-free.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Full-Body Support</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Contoured ergonomic design ensures optimal spinal alignment and comfort during recovery.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Customizable Programs</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Adjustable intensity, speed, and massage zones for personalized recovery sessions.</p></div>
        </div>
        <div style="display:flex;gap:.9rem;align-items:flex-start">
          <div><div style="font-size:.82rem;font-weight:700;color:#4ade80;letter-spacing:.06em;margin-bottom:.2rem">Quiet Operation</div>
          <p style="font-size:.8rem;color:rgba(255,255,255,.62);line-height:1.6;margin:0">Designed for seamless integration into luxury wellness and performance spaces.</p></div>
        </div></div>
          
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem"><span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Therapist-Free</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Fully Customizable</span> <span style="background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.3);color:#4ade80;font-size:.7rem;font-weight:700;letter-spacing:.08em;padding:.35rem .8rem;border-radius:2rem">Luxury Wellness</span></div>
        </div>
      </div>
  </section>
</section>

<section class="sec" style="background:#060608;color:#fff">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:#4ade80">Hydrothermal Circuit</span>
      <h2 class="sec-title" style="color:#fff">HEAT, HYDRO &amp; CONTRAST THERAPY</h2>
      <p class="sec-sub" style="color:rgba(255,255,255,.6)">Detox. Recovery. Circulation. A complete hydrothermal circuit integrates multiple contrast therapy modalities for maximum wellness impact.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:2.5rem" class="rsp-1col">
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.15);border-radius:.9rem;padding:1.6rem;text-align:center">
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#4ade80;margin-bottom:.5rem">STEAM ROOM</div>
        <p style="font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.6">Deep heat and steam for respiratory cleansing, muscle relaxation, and skin detoxification.</p>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.15);border-radius:.9rem;padding:1.6rem;text-align:center">
        <div style="font-size:2rem;margin-bottom:.8rem">&#xFE0F;</div>
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#4ade80;margin-bottom:.5rem">COLD PLUNGE POOL</div>
        <p style="font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.6">Contrast hydrotherapy that reduces inflammation, boosts circulation, and accelerates recovery.</p>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.15);border-radius:.9rem;padding:1.6rem;text-align:center">
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#4ade80;margin-bottom:.5rem">VITALITY POOL</div>
        <p style="font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.6">Hydrotherapy pool for relaxation, joint mobility, and overall vitality restoration.</p>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.15);border-radius:.9rem;padding:1.6rem;text-align:center">
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#4ade80;margin-bottom:.5rem">FLOTATION POOL</div>
        <p style="font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.6">Sensory-reduced flotation for deep mental recovery, stress relief, and nervous system reset.</p>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.15);border-radius:.9rem;padding:1.6rem;text-align:center">
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#4ade80;margin-bottom:.5rem">EXPERIENCE SHOWERS</div>
        <p style="font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.6">Multi-sensory rain, mist, and contrast shower experiences for invigorating transitions.</p>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.15);border-radius:.9rem;padding:1.6rem;text-align:center">
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.1em;color:#4ade80;margin-bottom:.5rem">HIMALAYAN SALT CAVE</div>
        <p style="font-size:.78rem;color:rgba(255,255,255,.55);line-height:1.6">Natural halotherapy environment supporting respiratory health, skin care, and deep relaxation.</p>
      </div>
    </div>
  </section>
</section>

<section class="sec" style="background:#060608;color:#fff;border-top:1px solid rgba(74,222,128,.15)">
  <section class="sec-in">
    <div style="text-align:center;padding:1rem 0 2rem">
      <span class="sec-label" style="color:#4ade80">Get In Touch</span>
      <h2 class="sec-title" style="color:#fff;margin-top:.5rem">BRING ALTEON TO YOUR FACILITY</h2>
      <p class="sec-sub" style="color:rgba(255,255,255,.65);margin-top:1rem">Design a complete wellness ecosystem with Alteon's integrated recovery, assessment and experience technologies. Our team handles architectural planning, installation and staff training end to end.</p>
    </div>
    <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;margin-top:1.5rem">
      <button class="btn btn-primary" onclick="go('contact')" style="background:#4ade80;color:#09090b;border:none">Request Consultation</button>
      <a class="btn btn-outline" href="https://wa.me/919820166910" target="_blank" rel="noopener" style="color:#4ade80;border-color:#4ade80">WhatsApp Us</a>
    </div>
  </section>
</section>

      <!-- Additional Alteon Technologies -->
<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:#4ade80">Complete Portfolio</span>
      <h2 class="sec-title" style="color:#fff">ADDITIONAL ALTEON TECHNOLOGIES</h2>
      <p class="sec-sub" style="color:rgba(255,255,255,.65)">Beyond the flagship recovery systems, Alteon delivers a complete suite of assessment, diagnostics and hydrothermal experiences for integrated wellness facilities.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem;margin-top:2.5rem">
      
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">ASSESSMENT &amp; DIAGNOSIS</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">VLAD Performance Testing</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Precisely assesses strength, power, balance and neuromuscular function &mdash; delivering data-driven insights for performance tracking and personalised training or rehab.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">PERFORMANCE DIAGNOSTICS</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">VO&#x2082; Max Testing</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">The gold standard for assessing cardiovascular fitness and endurance &mdash; measures how efficiently your body uses oxygen during exercise.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">AI-POWERED IMAGING</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Infrared Thermography</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Non-invasive, contactless imaging of skin temperature distribution &mdash; used for blood-flow assessment, stress and recovery monitoring, and pain and tension mapping.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">MUSCULOSKELETAL AI</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Musculoskeletal Analysis</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Advanced AI analyses musculoskeletal health, providing essential insights for individualised interventions and training protocols.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">MULTI-THERAPY BED</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">ETERNA X Multi-Therapy Bed</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">A premium multi-modality therapy bed integrating red-light, PEMF, vibroacoustic and thermal elements into a single treatment platform for bespoke wellness protocols.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">HAMMAM RITUAL</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Hammam Table</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Traditional heated-stone hammam tables for ritual cleansing, exfoliation and deep relaxation treatments &mdash; the centrepiece of a luxury spa circuit.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">HYDROTHERMAL CIRCUIT</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Cold Plunge Pool</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Precision-controlled cold plunge pools for post-workout recovery, inflammation reduction and vagal activation &mdash; core to any hydrothermal circuit.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">HEAT THERAPY</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Traditional Sauna &amp; Steam Room</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Finnish sauna and steam room installations with commercial-grade heaters, controls and premium wood/tile finishing, engineered for spa, hotel and wellness-centre environments.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">RESPIRATORY WELLNESS</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Himalayan Salt Cave</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Immersive halotherapy salt caves for respiratory health, skin detoxification and deep relaxation &mdash; a signature experience for premium wellness destinations.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">RELAXATION POOL</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Flotation &amp; Vitality Pools</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Saltwater flotation pools and energising vitality pools with hydro-massage jets. Deep relaxation, joint unloading, and nervous-system reset.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">SENSORY RITUAL</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Experience Showers</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Multi-sensory shower cabins combining hot and cold jets, aromatherapy and chromotherapy for a stimulating pre- or post-spa ritual.</p>
      </div>

      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.12em;color:#4ade80;margin-bottom:.5rem">DETOX &amp; CONTOURING</div>
        <h3 style="color:#fff;font-size:1.15rem;font-weight:800;margin-bottom:.6rem;letter-spacing:-.01em">Lymphatic Drainage Machines</h3>
        <p style="color:rgba(255,255,255,.62);font-size:.85rem;line-height:1.7">Vacuum-assisted lymphatic drainage systems that enhance circulation, detoxification and body contouring &mdash; a proven aesthetics and recovery tool.</p>
      </div>

    </div>
  </section>
</section>

<!-- Growing Wellness Market Callout -->
<!-- Verticals -->
<section class="sec" style="background:#0d0d0f;color:#fff">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:#4ade80">Alteon Verticals</span>
      <h2 class="sec-title" style="color:#fff">FOUR INTEGRATED WELLNESS VERTICALS</h2>
    </div>
    <div class="pillars" style="margin-top:2rem">
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.4rem">AESTHETICS</div>
        <h3 style="color:#fff;font-size:1.1rem;font-weight:800;margin-bottom:.6rem">Energy-Based Aesthetics</h3>
        <p style="color:rgba(255,255,255,.65)">Energy-based devices for non-invasive beauty solutions &mdash; skin, body and rejuvenation.</p>
      </div>
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.4rem">BIOSYSTEMS</div>
        <h3 style="color:#fff;font-size:1.1rem;font-weight:800;margin-bottom:.6rem">Longevity &amp; Recovery Tech</h3>
        <p style="color:rgba(255,255,255,.65)">Device-first technology focused on diagnostics, longevity and recovery.</p>
      </div>
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.4rem">GENETIX</div>
        <h3 style="color:#fff;font-size:1.1rem;font-weight:800;margin-bottom:.6rem">Genetic &amp; Hormonal Testing</h3>
        <p style="color:rgba(255,255,255,.65)">World-leading collaborations for genetic and hormonal testing solutions.</p>
      </div>
      <div class="pillar" style="background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);border-radius:.75rem;padding:1.8rem">
        <div style="font-size:.7rem;font-weight:700;letter-spacing:.14em;color:#4ade80;margin-bottom:.4rem">REGEN MEDICINE</div>
        <h3 style="color:#fff;font-size:1.1rem;font-weight:800;margin-bottom:.6rem">Peptides &amp; Stem Cells</h3>
        <p style="color:rgba(255,255,255,.65)">Innovations in peptides and stem-cell regenerative pathways.</p>
      </div>
    </div>
  </section>
</section>

<!-- Select Alteon Clients -->
<section class="sec" style="background:#060608;color:#fff;border-top:1px solid rgba(74,222,128,.15)">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:#4ade80">In Good Company</span>
      <h2 class="sec-title" style="color:#fff">SELECT ALTEON CLIENTS</h2>
      <p class="sec-sub" style="color:rgba(255,255,255,.65);max-width:760px;margin:1rem auto 0">
        Wellness installations across India’s most discerning hospitality, longevity and performance brands.
      </p>
    </div>

    <div class="client-grid">

<!-- Hospitality -->
<div class="client-card">
  <img src="/assets/images/alteon/ritz-carlton.jpeg" alt="The Ritz-Carlton">
</div>

<!-- Real Estate -->
<div class="client-card">
  <img src="/assets/images/alteon/dlf.jpeg" alt="DLF">
</div>

<!-- Corporate -->
<div class="client-card">
  <img src="/assets/images/alteon/reliance.jpeg" alt="Reliance">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/zerodha.jpeg" alt="Zerodha">
</div>

<!-- Fitness -->
<div class="client-card">
  <img src="/assets/images/alteon/golds-gym.jpeg" alt="Gold's Gym">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/dy-patil.jpeg" alt="D Y Patil Healthcare">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/mma-matrix.jpeg" alt="MMA Matrix Gym">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/ultrahuman.jpeg" alt="Ultrahuman">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/biopeak.jpeg" alt="Biopeak">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/prana.jpeg" alt="Prana">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/oema.jpeg" alt="Oema">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/tulah.jpeg" alt="Tulah">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/dhun.jpeg" alt="Dhun">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/courtside.jpeg" alt="Courtside">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/potenza.jpeg" alt="Potenza">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/serve-society.jpeg" alt="Serve Society">
</div>

<div class="client-card">
  <img src="/assets/images/alteon/aline.jpeg" alt="Aline">
</div>
  </section>
</section>

<section class="sec" style="background:#09090b;color:#fff">
  <section class="sec-in" style="text-align:center">
    <img src="${CLIENT_LOGOS['Alteon']}" alt="Alteon Wellness &amp; Recovery" style="max-height:56px;width:auto;margin:0 auto 2rem;display:block" loading="lazy">
    <p style="color:rgba(255,255,255,.6);max-width:520px;margin:1rem auto 2rem;font-size:.92rem;line-height:1.7">TechFit is a reseller of Alteon Wellness &amp; Recovery. Speak to us about integrating Alteon&#x2019;s technology into your gym, hotel, or wellness centre.</p>
      <button class="btn-red" style="font-size:1rem;padding:1rem 2.5rem" onclick="go('contact')">Book a Consultation</button>
    </div>
  </section>
</section>
${renderProductRange()}
${footer()}
`;
    }

    function renderHome() {
      return `
<section class="hero" style="position:relative; overflow:hidden; min-height:80vh; display:flex; align-items:center; background:#000;">
  <div class="hero-bg"></div>
  <div class="hero-glow" style="z-index:1; position:absolute; bottom:0; left:0; right:0; height:50%; background:linear-gradient(to top, #000, transparent);"></div>
  
  <div class="hero-in" style="z-index:2; position:relative; text-align:center; padding:0 2rem;">
    <h1 class="hero-title" style="color:#fff; font-size:clamp(2.5rem, 6vw, 4.5rem); font-weight:900; line-height:1.1; margin-bottom:1.5rem; text-shadow: 0 4px 12px rgba(0,0,0,0.5);">
      <span style="color:var(--red);">India\'s Premier</span><br>Fitness, Wellness and<br>Sports Infrastructure Partner
    </h1>
    <p class="hero-sub" style="color:rgba(255,255,255,0.9); font-size:1.2rem; max-width:800px; margin:0 auto 2rem;">
      800+ installations delivered. Commercial fitness equipment setup, wellness and recovery equipment, gym and sports flooring, functional rigs, and professional MMA cages. Reseller for BH Fitness, Tunturi, and Alteon Wellness.
    </p>
    <div class="hero-btns" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
      <button class="btn-red" onclick="go('contact')">Get a Custom B2B Quote</button>
      <button class="btn" style="background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2);" onclick="go('for-gyms')">Commercial Gym Setup →</button>
    </div>
  </div>
</section>

<div class="ticker-wrap">
  <div class="ticker-in">
    ${['GYM DESIGN & LAYOUT', 'EQUIPMENT SUPPLY', 'GYM & SPORTS FLOORING', 'CUSTOM FABRICATION', 'WELLNESS & RECOVERY', 'INSTALLATION & AFTER-SALES', '800+ INSTALLATIONS COMPLETED', 'BH FITNESS · TUNTURI · CALIFORNIA FITNESS · ALTEON'].map(t => `<span class="ticker-item">${t}</span>`).join('').repeat(2)}
  </div>
</div>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">What We Do</span>
      <h2 class="sec-title">ONE PARTNER.<br>COMPLETE GYM, WELLNESS &amp; SPORTS SOLUTION.</h2>
      <p class="sec-sub">From concept to completion — we handle every part of setting up your gym, wellness or sports facility, so you don't have to coordinate with multiple vendors.</p>
    </div>
    <div class="pillars">
      <div class="pillar" role="button" tabindex="0" onclick="go('services')">
        <div class="pillar-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <rect x="6" y="36" width="36" height="4" rx="2" fill="currentColor" opacity=".2"/>
            <path d="M8 36V14h6v22H8z" fill="currentColor" opacity=".35"/>
            <path d="M34 36V14h6v22h-6z" fill="currentColor" opacity=".35"/>
            <path d="M14 20h20v2H14z" fill="currentColor"/>
            <path d="M14 26h20v2H14z" fill="currentColor"/>
            <path d="M14 32h20v2H14z" fill="currentColor"/>
            <path d="M22 10l2-4 2 4-2 2-2-2z" fill="currentColor"/>
            <path d="M24 12v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="pillar-num">01</div>
        <h3>Gym Design &amp; Layout</h3>
        <p>Space planning, equipment layout, zoning and 2D floor plans tailored to your facility type and budget.</p>
      </div>
      <div class="pillar" role="button" tabindex="0" onclick="go('for-gyms')">
        <div class="pillar-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <rect x="4" y="22" width="8" height="4" rx="2" fill="currentColor"/>
            <rect x="36" y="22" width="8" height="4" rx="2" fill="currentColor"/>
            <rect x="12" y="18" width="4" height="12" rx="2" fill="currentColor"/>
            <rect x="32" y="18" width="4" height="12" rx="2" fill="currentColor"/>
            <rect x="16" y="20" width="16" height="8" rx="2" fill="currentColor" opacity=".25"/>
            <rect x="22" y="16" width="4" height="16" rx="2" fill="currentColor" opacity=".5"/>
          </svg>
        </div>
        <div class="pillar-num">02</div>
        <h3>Commercial Equipment Supply</h3>
        <p>Reseller of BH Fitness, Tunturi and California Fitness, plus TechFit's own fabricated range.</p>
      </div>
      <div class="pillar" role="button" tabindex="0" onclick="go('services')">
        <div class="pillar-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <rect x="4" y="32" width="40" height="4" rx="1" fill="currentColor" opacity=".25"/>
            <rect x="4" y="38" width="40" height="4" rx="1" fill="currentColor" opacity=".15"/>
            <path d="M8 32V14l4 3 4-3 4 3 4-3 4 3 4-3 4 3 4-3v18" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
            <circle cx="24" cy="20" r="4" fill="currentColor" opacity=".4"/>
          </svg>
        </div>
        <div class="pillar-num">03</div>
        <h3>Gym &amp; Sports Flooring</h3>
        <p>Rubber flooring, foam tiles, artificial turf, and sports surfaces — supplied and installed for gyms, courts, and multi-sport areas.</p>
      </div>
      <div class="pillar" role="button" tabindex="0" onclick="go('mma-cages')">
        <div class="pillar-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2" opacity=".3"/>
            <path d="M16 32l-4 4M32 32l4 4M16 16l-4-4M32 16l4-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <rect x="16" y="16" width="16" height="16" rx="2" fill="currentColor" opacity=".15"/>
            <path d="M20 24h8M24 20v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="pillar-num">04</div>
        <h3>Custom Fabrication</h3>
        <p>In-house manufacturing of MMA cages, CrossFit rigs, boxing rings and custom strength equipment.</p>
      </div>
      <div class="pillar" role="button" tabindex="0" onclick="go('services')">
        <div class="pillar-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <path d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="2" opacity=".4"/>
            <circle cx="24" cy="20" r="6" stroke="currentColor" stroke-width="2"/>
            <path d="M30 30l6 6M18 30l-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M24 14v-4M24 30v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/>
            <circle cx="24" cy="20" r="2" fill="currentColor"/>
          </svg>
        </div>
        <div class="pillar-num">05</div>
        <h3>Installation &amp; After-Sales</h3>
        <p>Professional installation, commissioning, and ongoing maintenance AMC contracts across India.</p>
      </div>
      <div class="pillar" role="button" tabindex="0" onclick="go('alteon')">
        <div class="pillar-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="44" height="44">
            <circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2" opacity=".4"/>
            <path d="M24 14v20M14 24h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="24" cy="24" r="4" fill="currentColor"/>
          </svg>
        </div>
        <div class="pillar-num">06</div>
        <h3>Wellness &amp; Recovery</h3>
        <p>Alteon hyperbaric chambers, cryotherapy, red-light, dry-float and IHHT &mdash; turnkey recovery suites for premium gyms, hotels and longevity clinics.</p>
      </div>
    </div>
  
</section>

<div class="brands-strip">
  <section class="sec-in">
    <div class="brands-strip-label">Brands available with us</div>
    <div class="brands-logos">
      <a href="/bh-fitness" class="brand-logo-box" onclick="event.preventDefault();go('bh-fitness')">
        <img src="${CLIENT_LOGOS['BH Fitness Brand']}" alt="BH Fitness" style="max-height:44px;max-width:130px;object-fit:contain;filter:brightness(0) invert(1)" loading="lazy">
        <div class="brand-logo-name" style="margin-top:.4rem">Europe's No.1</div>
      </a>
      <a href="/tunturi" class="brand-logo-box" onclick="event.preventDefault();go('tunturi')">
        <img src="${CLIENT_LOGOS['Tunturi Brand']}" alt="Tunturi" style="max-height:36px;max-width:130px;object-fit:contain;filter:brightness(0) invert(1)" loading="lazy">
        <div class="brand-logo-name" style="margin-top:.4rem">Finnish Quality Since 1922</div>
      </a>
      <a href="/california-fitness" class="brand-logo-box" onclick="event.preventDefault();go('california-fitness')">
        <img src="${CLIENT_LOGOS['California Brand']}" alt="California Fitness" style="max-height:44px;max-width:140px;object-fit:contain;filter:brightness(0) invert(1)" loading="lazy">
        <div class="brand-logo-name" style="margin-top:.4rem">Commercial Grade</div>
      </a>
      <a href="/techfit" class="brand-logo-box" onclick="event.preventDefault();go('techfit')"><img src="/assets/images/other/img-7edcc2dfb4.png" alt="TechFit" style="max-height:52px;max-width:160px;object-fit:contain;background:#fff;padding:.35rem .6rem;border-radius:.25rem" loading="lazy">
        <div class="brand-logo-name" style="margin-top:.4rem">TechFit Custom · Made in Mumbai</div>
      </a>
      <a href="/alteon" class="brand-logo-box" onclick="event.preventDefault();go('alteon')"><div style="background:#fff;padding:.5rem .8rem;border-radius:.2rem;display:inline-block"><img src="${CLIENT_LOGOS['Alteon']}" alt="Alteon" style="max-height:34px;max-width:120px;object-fit:contain;display:block" loading="lazy"></div>
        <div class="brand-logo-name" style="margin-top:.4rem">Wellness &amp; Recovery</div>
      </a>
    </div>
  </div>
</div>

<section class="sec sec-gray">
  <div class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Who We Work With</span>
      <h2 class="sec-title">WE SET UP GYMS FOR</h2>
      <p class="sec-sub">Whether you're a gym owner, real estate developer, school, hotel or wellness operator — we configure the right solution for your space, budget, and users.</p>
    </div>
    <div class="segments">
      <a href="/for-gyms" class="segment" onclick="event.preventDefault();go('for-gyms')">
        <img class="segment-img" src="/assets/images/other/img-05cf274f17.jpg" alt="Gyms & Studios" width="450" height="300" loading="lazy">
        <div class="segment-body">
          <div class="segment-tag">Commercial</div>
          <h3>For Gyms &amp; Studios</h3>
          <p>Full-service gym fit-outs for standalone gyms, boutique studios, CrossFit boxes, and MMA academies.</p>
          <div class="segment-cta">EXPLORE SOLUTIONS →</div>
        </div>
      </a>
      <a href="/for-developers" class="segment" onclick="event.preventDefault();go('for-developers')">
        <img class="segment-img" src="/assets/images/other/img-944651fec5.jpg" alt="Developers" loading="lazy">
        <div class="segment-body">
          <div class="segment-tag">Real Estate</div>
          <h3>For Developers &amp; Builders</h3>
          <p>Turnkey gym amenity packages for residential towers, co-living spaces, and mixed-use developments.</p>
          <div class="segment-cta">EXPLORE SOLUTIONS →</div>
        </div>
      </a>
      <a href="/for-schools" class="segment" onclick="event.preventDefault();go('for-schools')">
        <img class="segment-img" src="/assets/images/other/img-9dedf4a699.jpg" alt="Schools" loading="lazy">
        <div class="segment-body">
          <div class="segment-tag">Institutions</div>
          <h3>For Schools &amp; Institutions</h3>
          <p>Age-appropriate fitness and sports infrastructure for schools, colleges, defence, and government facilities.</p>
          <div class="segment-cta">EXPLORE SOLUTIONS →</div>
        </div>
      </a>
      <div class="segment" onclick="go('for-hotels')">
        <img class="segment-img" src="/assets/images/other/img-d53678c1df.png" alt="Hotels & Corporates" loading="lazy">
        <div class="segment-body">
          <div class="segment-tag">Hospitality</div>
          <h3>For Hotels &amp; Corporates</h3>
          <p>Premium gym &amp; wellness setups for 3, 4 and 5-star hotels, corporate offices, and recovery-led wellness centres.</p>
          <button class="segment-cta">EXPLORE SOLUTIONS →</button>
        </div>
      </div>
    </div>
  </section>
</section>
<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Our Clients</span>
      <h2 class="sec-title">TRUSTED BY INDIA'S BEST</h2>
      <p class="sec-sub">From Google's offices to Tiger Shroff's MMA gyms, India's most recognised names trust TechFit for their fitness, wellness &amp; recovery infrastructure.</p>
    </div>
    <div style="margin-top:3rem">
      ${logoWall()}
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Client Feedback</span>
      <h2 class="sec-title">WHAT OUR CLIENTS SAY</h2>
    </div>
    <div class="testi-grid">
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"TechFit handled everything — design, equipment supply and installation. The BH Fitness range along with the TechFit customised products such as MMA Cage, CrossFit Rig and Free Weights we got has been durable, outstanding and aesthetically pleasing. Our members love it."</p>
        <div class="testi-byline">
          <img class="testi-photo" src="/assets/images/other/img-baf798fbd9.png" alt="Ayesha Shroff" loading="lazy">
          <div>
            <div class="testi-author">Ayesha Shroff</div>
            <div class="testi-role">Founder — MMA Matrix Gym by Tiger &amp; Krishna Shroff</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"We needed a complete gym amenity for our residential towers. TechFit provided a turnkey solution — on time, within budget, with excellent equipment quality and outstanding after-sales support."</p>
        <div class="testi-byline">
          <img class="testi-photo" src="/assets/images/other/img-19d6f6caaa.jpg" alt="Mr. Ram Raheja" loading="lazy">
          <div>
            <div class="testi-author">Mr. Ram Raheja</div>
            <div class="testi-role">S Raheja Group</div>
          </div>
        </div>
      </div>
      <div class="testi-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"TechFit has been a true partner across every Cloud 9 Gym we've built. They don't just supply equipment — they engineer a customised solution for each space, factoring in footfall, training programs, member experience and long-term serviceability. From BH Fitness commercial cardio to in-house MMA cages and CrossFit rigs, they've delivered on every commitment. It's rare to find a vendor you can call at any hour and know things will get sorted — that's TechFit."</p>
        <div class="testi-byline">
          <img class="testi-photo" src="/assets/images/other/img-a81850fe00.jpg" alt="Mr. Gurjeet Gandhi" loading="lazy">
          <div>
            <div class="testi-author">Mr. Gurjeet Gandhi</div>
            <div class="testi-role">Founder &amp; CEO — Cloud 9 Gyms</div>
          </div>
        </div>
      </div>
    </section>
</section>

<section class="sec sec-dark">
  <section class="sec-in">
    <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:3rem;align-items:center" class="rsp-1col">
      <div>
        <span class="sec-label" style="color:var(--red)">Sister Concern</span>
        <div style="background:#fff;padding:1.1rem 1.5rem;border-radius:.4rem;display:inline-block;margin-top:.5rem;margin-bottom:1.2rem"><img src="/assets/images/other/img-aea4e380c8.png" alt="TechFit Active" style="height:4.5rem;width:auto;display:block" loading="lazy"></div>
        <h2 class="sec-title white" style="margin-top:.4rem">TECHFIT ACTIVE</h2>
        <p class="sec-sub white" style="margin-top:1rem">Need a gym not just installed but run? Our sister company, TechFit Active, operates and manages gyms for residential communities, corporates and hotels &mdash; staffing, programming, maintenance and all.</p>
        <a href="https://www.techfitactive.com/" target="_blank" rel="noopener" class="btn-red" style="display:inline-block;text-decoration:none;margin-top:1.5rem">Visit TechFit Active &rarr;</a>
      </div>
      <div style="background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);padding:2rem">
        <h4 style="font-size:.85rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#fff;margin-bottom:1rem">What they do</h4>
        <ul style="list-style:none;padding:0;margin:0">
          <li style="padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);font-size:.9rem">Manages gyms for residential clubhouses &amp; gyms, corporates and hotels</li>
          <li style="padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);font-size:.9rem">Certified trainers &amp; class programming</li>
          <li style="padding:.5rem 0;color:rgba(255,255,255,.75);font-size:.9rem">SOPs, maintenance and member experience</li>
        </ul>
      </div>
    </div>
  </section>
</section>

${ctaBand("Ready to Set Up Your Facility?", "Talk to our gym consultants. We\'ll assess your space, recommend the right equipment, and give you a detailed proposal &mdash; at no cost.", "Get Your Free Consultation")}
${footer()}
`;
    }

    // ── SEGMENT PAGES ──────────────────────────────────────────────────────────────
    function renderSegment(type) {
      const data = {
        gyms: {
          label: 'For Gyms & Studios',
          badge: 'Commercial Fitness',
          title: 'GYM & STUDIO\nFIT-OUTS',
          sub: 'Complete solutions for standalone gyms, boutique studios, CrossFit boxes, MMA academies, and franchise fit-outs.',
          img: '/assets/images/other/img-05cf274f17.jpg',
          pillars: [
            { i: '', t: 'Space Planning', d: 'Optimised equipment layout for maximum revenue per square foot. Cardio zones, strength areas, functional zones, and locker planning.' },
            { i: '', t: 'Equipment Selection', d: 'We recommend the right equipment mix from BH Fitness, Tunturi, California Fitness, and our own fabricated range based on your target market.' },
            { i: '', t: 'Custom Fabrication', d: 'In-house MMA cages, CrossFit rigs, and boxing rings for gyms needing specialty combat or functional training infrastructure.' },
            { i: '', t: 'Installation & AMC', d: 'Professional installation, commissioning, and annual maintenance contracts so your equipment stays in peak condition.' },
          ],
          faqs: [
            ['What is the minimum size for a commercial gym?', 'A functional commercial gym can be set up from 2,000 sq ft. We have done fit-outs from 1,500 sq ft boutique studios to 15,000 sq ft large-format gyms.'],
            ['What brands do you supply?', 'We resell BH Fitness, Tunturi, and California Fitness. We also manufacture our own MMA cages, CrossFit rigs, and free weights.'],
            ['Do you offer EMI or financing?', 'We can connect you with equipment financing options. Speak to our team for details.'],
            ['Can you match a specific budget?', 'Yes. We will propose an equipment mix that maximises value within your budget. We work across all price points.'],
          ]
        },
        developers: {
          label: 'For Developers & Builders',
          badge: 'Real Estate Amenities',
          title: 'RESIDENTIAL & COMMERCIAL\nGYM AMENITIES',
          sub: 'Turnkey gym amenity packages for residential towers, co-living projects, IT parks, and mixed-use developments. We handle everything from layout to handover.',
          img: '/assets/images/other/img-944651fec5.jpg',
          pillars: [
            { i: '', t: 'Amenity Consulting', d: 'We advise on the right gym size and equipment spec for your project type — from compact 800 sq ft building gyms to 5,000 sq ft wellness floors.' },
            { i: '', t: 'Turnkey Supply & Install', d: 'Full project management from design to installation. One invoice, one point of contact. No coordination headache.' },
            { i: '', t: 'Bulk Project Pricing', d: 'Competitive pricing for multi-tower and multi-phase projects. Framework agreements available for ongoing deployments.' },
            { i: '', t: 'Resident Helpdesk', d: 'Post-handover maintenance and AMC so residents always have working equipment. Branded service for your project.' },
          ],
          faqs: [
            ['What is the typical gym size for a residential tower?', 'For residential projects, we recommend 1.5–2 sq ft per apartment. A 200-unit tower typically needs an 800–1,200 sq ft gym.'],
            ['Can you handle multiple sites?', 'Yes. We manage multi-site rollouts with standardised specifications, centralised procurement, and site-specific installation teams.'],
            ['Do you provide as-built drawings?', 'Yes. We provide layout drawings, equipment placement plans, and technical specs for all our projects.'],
            ['What is the lead time for a project?', 'From order to installation typically 4–8 weeks depending on scope. We work to your construction schedule.'],
          ]
        },
        schools: {
          label: 'For Schools & Institutions',
          badge: 'Educational & Institutional',
          title: 'FITNESS INFRASTRUCTURE\nFOR INSTITUTIONS',
          sub: 'Age-appropriate, durable, and low-maintenance fitness and sports equipment for schools, colleges, universities, defence facilities, and government institutions.',
          img: '/assets/images/other/img-9dedf4a699.jpg',
          pillars: [
            { i: '', t: 'Age-Appropriate Specification', d: 'We select equipment suitable for the age group — from school fitness trails to university-grade strength and cardio floors.' },
            { i: '', t: 'Safety & Compliance', d: 'All equipment meets relevant safety standards. We advise on layout to ensure safe supervised use.' },
            { i: '', t: 'Sports Infrastructure', d: 'Beyond gym equipment — MMA mats, boxing rings, outdoor fitness stations, and agility equipment for sports programmes.' },
            { i: '', t: 'Low-Maintenance Solutions', d: 'We recommend equipment appropriate for institutional use — durable, easy to maintain, and backed by service support.' },
          ],
          faqs: [
            ['Do you supply for government tenders?', 'Yes. We have supplied to government institutions and can provide GST invoices, warranty certificates, and all necessary documentation.'],
            ['What safety standards do your products meet?', 'Our equipment meets relevant Indian and international safety standards. We can provide test certificates and compliance documentation on request.'],
            ['Do you offer outdoor fitness equipment?', 'Yes. We supply outdoor gym stations, fitness trails, and sports infrastructure suitable for school grounds and public spaces.'],
            ['Can you work within a tender specification?', 'Yes. Send us the tender document and we will match specifications and prepare a compliant quote.'],
          ]
        },
        hotels: {
          label: 'For Hotels & Corporates',
          badge: 'Hospitality & Wellness',
          title: 'PREMIUM GYM SETUPS FOR\nHOTELS & CORPORATES',
          sub: 'Sophisticated gym and wellness infrastructure for 3, 4, and 5-star hotels, corporate campuses, and premium office buildings. Aesthetics, performance, and reliability combined.',
          img: '/assets/images/other/img-d53678c1df.png',
          pillars: [
            { i: '', t: 'Guest Loyalty & Experience', d: 'A premium gym facility directly impacts guest satisfaction scores and repeat bookings. BH Fitness INERTIA and MOVEMIA equipment with Smart Focus connectivity deliver the experience 4 and 5-star guests expect.' },
            { i: '', t: 'New Revenue Stream', d: 'A professionally managed gym becomes a revenue-generating amenity — from day passes to corporate wellness memberships. We help you build a business case around your fitness facility.' },
            { i: '', t: 'Maximise Space Utilisation', d: 'Intelligent layout design for limited floor area. We optimise every square foot — cardio zones, strength areas, functional training, and stretching — without compromising flow or aesthetics.' },
            { i: '', t: 'Flexible Supply & Service', d: 'Purchase outright or opt for a flexible supply arrangement. Full AMC and service contracts with priority response, ensuring your gym is always operational and guest-ready.' },
          ],
          faqs: [
            ['What brands are appropriate for a 5-star hotel?', 'BH Fitness INERTIA and MOVEMIA series are popular choices for luxury properties. Tunturi commercial range is also well-suited. We can advise based on your specific requirements.'],
            ['Can you provide equipment with connected features?', 'Yes. BH Fitness Smart Focus monitors offer app connectivity, fitness tracking, and entertainment integration suitable for premium gym experiences.'],
            ['Do you handle the full fit-out?', 'Yes. We can project-manage the complete gym fit-out including flooring, mirrors, equipment, and signage.'],
            ['What is the maintenance arrangement?', 'We offer annual maintenance contracts (AMC) with quarterly preventive maintenance visits and priority breakdown response.'],
          ]
        }
      };

      const d = data[type];
      const titleLines = d.title.split('\n');

      return `
<div class="phero">
  <section class="sec-in">
    <div class="phero-label">${d.badge}</div>
    <h1>${titleLines.join('<br>')}</h1>
    <p class="phero-sub">${d.sub}</p>
    <button class="btn-red" onclick="go('contact')">Get a Free Consultation</button>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Our Approach</span>
      <h2 class="sec-title">HOW WE HELP</h2>
    </div>
    <div class="pillars">
      ${d.pillars.map(p => `<div class="pillar"><div class="pillar-icon">${p.i}</div><h3>${p.t}</h3><p>${p.d}</p></div>`).join('')}
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="split-layout">
      <div>
        <div class="sec-hdr center">
          <span class="sec-label">Why TechFit</span>
          <h2 class="sec-title">BEST-IN-CLASS PRICING.<br>END-TO-END DELIVERY.</h2>
          <p class="sec-sub">We bring manufacturing capability, brand reselling, and installation expertise under one roof — giving you better pricing and a single point of accountability.</p>
        </div>
        <br>
        <div class="feat-grid">
          <div class="feat-card"><h4>800+ Installations Completed</h4><p>Proven track record across commercial, residential, institutional, and hospitality sectors.</p></div>
          <div class="feat-card"><h4>Indian + International Brands</h4><p>BH Fitness, Tunturi, and California Fitness alongside our own custom fabricated range.</p></div>
          <div class="feat-card"><h4>Custom Configured for Your Space</h4><p>No off-the-shelf packages. Every solution is tailored to your floor plan, user profile, and budget.</p></div>
        </div>
      </div>
      <div>
        <img src="${d.img}" alt="${d.label}" style="width:100%;height:400px;object-fit:cover;display:block" loading="lazy">
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Frequently Asked</span>
      <h2 class="sec-title">FAQ</h2>
    </div>
    <div class="faq">
      ${d.faqs.map(([q, a]) => faqItem(q, a)).join('')}
    </div>
  </section>
</section>

${ctaBand('Ready to Plan Your Facility?', '', 'Get a Free Consultation')}
${footer()}
`;
    }

    // ── BRAND PAGES ────────────────────────────────────────────────────────────────
    const brandMeta = {
      'BH Fitness': {
        slug: 'bh-fitness',
        badge: "Europe's No.1 Fitness Brand · Reseller",
        desc: "BH Fitness is Europe\'s leading fitness equipment brand, trusted by over 7,000 commercial gyms worldwide. As a reseller, we supply the full BH Fitness range — MOVEMIA connected cardio, INERTIA commercial line, PL Series selectorized strength, AFT360 functional training, and more.",
        why: ['MOVEMIA — connected cardio with Smart Focus app & entertainment integration', 'INERTIA — full commercial cardio and selectorized strength range', 'PL SERIES — premium plate-loaded strength equipment', 'AFT360 — modular functional training stations', 'Supplied to MMA Matrix, 5-star hotels, residential towers and premium gyms across India'],
        sortOrder: ['MOVEMIA', 'INERTIA', 'PL SERIES', 'AFT360', 'INDOOR CYCLING', 'OTHERS'],
        logo: (typeof CLIENT_LOGOS !== 'undefined' && CLIENT_LOGOS['BH Fitness Brand']) || ''
      },
      'Tunturi': {
        slug: 'tunturi',
        badge: 'Finnish Precision Since 1922 · Reseller',
        desc: 'Tunturi has been engineering premium fitness equipment in Finland since 1922. Reseller for the full commercial range — treadmills, ellipticals, rowers and spin bikes; and the complete strength line including SUBLIME (pin-loaded selectorised), STERLING (plate-loaded), PA and EVOLUTION series, plus benches, racks, power racks and free weights.',
        why: ['Over a century of Finnish engineering heritage', 'Commercial-grade steel construction and warranties', 'Clean Scandinavian aesthetics perfect for hotels, boutique studios and residential amenity gyms', 'Full cardio and strength range including Sublime, Sterling, PA and Evolution series', 'Reseller — local service, local stock, local spares'],
        sortOrder: ['SUBLIME', 'STERLING', 'PA', 'EVOLUTION', 'TriMotion', 'STRENGTH', 'FREE WEIGHTS', 'CARDIO'],
        logo: (typeof CLIENT_LOGOS !== 'undefined' && CLIENT_LOGOS['Tunturi Brand']) || ''
      },
      'California Fitness': {
        slug: 'california-fitness',
        badge: 'Commercial Grade · Reseller',
        desc: 'California Fitness delivers premium commercial treadmills, ellipticals, bikes and a comprehensive strength range — organised into JF, CL, V, CF, HK, EG and PT series for every gym type and budget. Trusted by over 1,500 gyms across India.',
        why: ['Premium commercial cardio — JF Series motorised treadmills, ellipticals and bikes', 'Strength engineered in multiple tiers — CL, V, CF, HK, EG, PT series for light to heavy commercial use', 'Best-in-class price-to-performance in the Indian commercial market', 'Full warranty + nationwide spares and service network', 'Popular choice for franchise gyms, residential amenity gyms, institutions and hotels'],
        sortOrder: ['JF SERIES', 'E SERIES', 'R SERIES', 'U SERIES', 'PREMIUM CARDIO', 'JS SERIES', 'JAB SERIES', 'JR SERIES', 'MG SERIES', 'V SERIES', 'CF SERIES', 'CL SERIES', 'HK SERIES', 'EG SERIES', 'PT SERIES', 'HG SERIES', 'OTHERS'],
        logo: (typeof CLIENT_LOGOS !== 'undefined' && CLIENT_LOGOS['California Brand']) || ''
      }
    };

    function renderBrand(brandName) {
      const prods = PRODUCTS.filter(p => p.b === brandName);
      const meta = brandMeta[brandName] || {};
      const slug = meta.slug || brandName.toLowerCase().replace(/ /g, '-');

      // Determine what filters mean based on current cat value
      // cat can be: 'All', 'Cardio', 'Strength', 'Functional Training', 'Free Weights', or
      // a compound key like 'Strength:MOVEMIA' (section:series) or 'Strength:MOVEMIA:SELECTORIZED - UPPER BODY' (section:series:category)
      const sections = ['All', 'Cardio', 'Indoor Cycling', 'Strength', 'Functional Training', 'Free Weights', 'Pilates'];
      const allSections = ['Cardio', 'Indoor Cycling', 'Strength', 'Functional Training', 'Free Weights', 'Pilates'];

      // Figure out which section is active
      let activeSec = 'All';
      let activeSeries = '';
      let activeCat = '';

      if (cat === 'All') { activeSec = 'All'; }
      else if (allSections.includes(cat)) { activeSec = cat; }
      else if (cat.includes(':')) {
        // Compound key: Section:Series or Section:Series:Category
        const parts = cat.split(':');
        activeSec = parts[0];
        if (parts[1]) activeSeries = parts[1];
        if (parts[2]) activeCat = parts[2];
      } else {
        // Legacy: just a series or category name. Find best match.
        const matched = prods.find(p => p.sr === cat || p.c === cat);
        if (matched) {
          activeSec = matched.sec;
          if (prods.some(p => p.sr === cat)) { activeSeries = cat; }
          else { activeCat = cat; }
        }
      }

      // Filter products
      let filtered = prods;
      if (activeSec !== 'All') filtered = filtered.filter(p => p.sec === activeSec);
      if (activeSeries) filtered = filtered.filter(p => p.sr === activeSeries);
      if (activeCat) filtered = filtered.filter(p => p.c === activeCat);
      if (q) filtered = filtered.filter(p => p.n.toLowerCase().includes(q.toLowerCase()) || p.c.toLowerCase().includes(q.toLowerCase()));

      // Build series tabs for current section
      let seriesList = [];
      if (activeSec !== 'All') {
        const secProds = prods.filter(p => p.sec === activeSec);
        const uniq = [...new Set(secProds.map(p => p.sr))].filter(Boolean);
        if (meta.sortOrder && meta.sortOrder.length) {
          seriesList = uniq.sort((a, b) => {
            const ai = meta.sortOrder.indexOf(a);
            const bi = meta.sortOrder.indexOf(b);
            const aa = ai === -1 ? 999 : ai;
            const bb = bi === -1 ? 999 : bi;
            if (aa !== bb) return aa - bb;
            return a.localeCompare(b);
          });
        } else {
          seriesList = uniq.sort();
        }
      }

      // Build sub-category tabs if a series is selected
      let catList = [];
      if (activeSeries) {
        catList = [...new Set(prods.filter(p => p.sr === activeSeries).map(p => p.c))].sort();
      }

      const PER = 30, total = Math.ceil(filtered.length / PER);
      const slice = filtered.slice((pg - 1) * PER, pg * PER);

      const cardioCount = prods.filter(p => p.sec === 'Cardio').length;
      const indoorCycleCount = prods.filter(p => p.sec === 'Indoor Cycling').length;
      const strengthCount = prods.filter(p => p.sec === 'Strength').length;
      const functionalCount = prods.filter(p => p.sec === 'Functional Training').length;
      const freeWeightCount = prods.filter(p => p.sec === 'Free Weights').length;

      return `
<div class="phero">
  <section class="sec-in">
    ${meta.logo ? `<div style="margin-bottom:1.5rem;text-align:center"><img src="${meta.logo}" alt="${brandName} logo" style="max-height:110px;max-width:380px;width:auto;height:auto;display:inline-block;object-fit:contain;filter:brightness(0) invert(1)" loading="lazy"></div>` : ''}
    <div class="phero-label" style="text-align:center">${meta.badge || brandName}</div>
    <h1 style="text-align:center">${brandName.toUpperCase()}</h1>
    <p class="phero-sub" style="text-align:center;max-width:900px;margin-left:auto;margin-right:auto">${meta.desc || ''}</p>
  </div>
</div>

<section class="sec sec-gray">
  <div class="sec-in">
    <div class="feat-grid">
      ${(meta.why || []).map(w => `<div class="feat-card"><p style="color:var(--z700);font-weight:600">${w}</p></div>`).join('')}
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Complete Product Range</span>
      <h2 class="sec-title">${prods.length} PRODUCTS</h2>
    </div>

    <div class="brand-filter-wrap">
      <!-- Level 1: Section tabs -->
      <div class="filter-row filter-row-main">
        <button class="cat-btn${activeSec === 'All' ? ' active' : ''}" onclick="cat='All';pg=1;render()">All <span class="cnt">${prods.length}</span></button>
        <button class="cat-btn${activeSec === 'Cardio' ? ' active' : ''}" onclick="cat='Cardio';pg=1;render()">Cardio <span class="cnt">${cardioCount}</span></button>
        ${indoorCycleCount > 0 ? `<button class="cat-btn${activeSec === 'Indoor Cycling' ? ' active' : ''}" onclick="cat='Indoor Cycling';pg=1;render()">Indoor Cycling <span class="cnt">${indoorCycleCount}</span></button>` : ''}
        <button class="cat-btn${activeSec === 'Strength' ? ' active' : ''}" onclick="cat='Strength';pg=1;render()">Strength <span class="cnt">${strengthCount}</span></button>
        ${functionalCount > 0 ? `<button class="cat-btn${activeSec === 'Functional Training' ? ' active' : ''}" onclick="cat='Functional Training';pg=1;render()">Functional Training <span class="cnt">${functionalCount}</span></button>` : ''}
        ${freeWeightCount > 0 ? `<button class="cat-btn${activeSec === 'Free Weights' ? ' active' : ''}" onclick="cat='Free Weights';pg=1;render()">Free Weights <span class="cnt">${freeWeightCount}</span></button>` : ''}
        <input class="search-box" type="search" placeholder="Search…" value="${q}" oninput="handleSearch(this.value)">
      </div>
      <!-- Level 2: Series tabs (only when a section is active) -->
      ${seriesList.length > 1 ? `<div class="filter-row filter-row-series">
        <span class="filter-label">Series:</span>
        ${seriesList.map(s => `<button class="cat-btn cat-btn-sm${activeSeries === s ? ' active' : ''}" onclick="cat='${activeSec}:${s}';pg=1;render()">${s}</button>`).join('')}
      </div>`: ''}
      <!-- Level 3: Category tabs (when a series is selected) -->
      ${catList.length > 1 ? `<div class="filter-row filter-row-cat">
        <span class="filter-label">Category:</span>
        ${catList.map(c => `<button class="cat-btn cat-btn-xs${activeCat === c ? ' active' : ''}" onclick="cat='${activeSec}:${activeSeries}:${c}';pg=1;render()">${c}</button>`).join('')}
      </div>`: ''}
    </div>

    <p style="color:var(--z500);font-size:0.85rem;margin-bottom:1.5rem">Showing ${filtered.length} products</p>
    <div class="prod-grid" id="prod-grid">
      ${slice.map(p => prodCard(p)).join('')}
    </div>
    ${total > 1 ? `<div class="pg-wrap">${Array.from({ length: total }, (_, i) => `<button class="pg-btn${pg === i + 1 ? ' active' : ''}" onclick="pg=${i + 1};render();window.scrollTo({top:0})">${i + 1}</button>`).join('')}</div>` : ''}
    ${slice.length === 0 ? '<p style="color:var(--z500);padding:2rem 0">No products found.</p>' : ''}
  </section>
</section>

${ctaBand('Interested in ' + brandName + '?', 'Get in touch for pricing, availability, and expert recommendations.', 'Enquire Now')}
${footer()}
`;
    }

    function prodCard(p) {
      const n = p.n.replace(/'/g, "&#39;").replace(/`/g, "&#96;");
      return `<div class="prod-card" onclick="openModal('${p.s}','${p.b}')">
  <img class="prod-img" src="${p.img}" alt="${n}" loading="lazy" onerror="this.src='';this.style.background='#f4f4f5'">
  <div class="prod-card-body">
    <div class="prod-brand-chip">${p.b}</div>
    <div class="prod-name">${n}</div>
    <div class="prod-cat">${p.c}</div>
    <button class="prod-enq" onclick="event.stopPropagation();openEnq('${p.s}','${p.b}')">Enquire</button>
  </div>
</div>`;
    }

    // ── TECHFIT CUSTOM PRODUCT PAGES ───────────────────────────────────────────────
    function renderMMA() {
      return `
<div class="phero" style="background-image:linear-gradient(to bottom,rgba(9,9,11,0.85),rgba(9,9,11,0.92)),url('/assets/images/other/seg-e74ca4429e.jpg');background-size:cover;background-position:center">
  <section class="sec-in">
    <div class="phero-label">TechFit Custom · Fabricated in Mumbai</div>
    <h2>PROFESSIONAL GRADE<br>MMA CAGES &amp; BOXING RINGS</h2>
    <p class="phero-sub">Floor mount, elevated &amp; competition grade. Custom sizes from 16ft to 30ft. Designed and fabricated in-house for gyms, academies, and arenas across India. Complete your combat zone with our <a href="/gym-flooring" onclick="event.preventDefault();go('gym-flooring')" style="text-decoration:underline;color:inherit">premium sports flooring</a> and <a href="/crossfit-rigs" onclick="event.preventDefault();go('crossfit-rigs')" style="text-decoration:underline;color:inherit">functional rigs</a>.</p>
    <div style="display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center">
      <button class="btn-red" onclick="go('contact')">Request Price List</button>
      <button class="btn-outline" onclick="go('contact')">Get A Quote</button>
    </div>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">The TechFit Advantage</span><h2 class="sec-title">BUILT FOR THE SPORT. BUILT FOR YOUR BRAND.</h2></div>
    <div class="feat-grid">
      <div class="feat-card"><h4>4mm+ Heavy Gauge Steel Poles</h4><p>Maximum impact resistance and zero sway during high-intensity grappling and striking. Exceeds professional standards.</p></div>
      <div class="feat-card"><h4>High-Tensile Chain Link Fencing</h4><p>Vinyl-coated chain link engineered for strength and visibility. No snag risk during training or competition.</p></div>
      <div class="feat-card"><h4>Multi-Layer Impact Foam Padding</h4><p>High-density foam padding on all poles and corner posts. Athlete safety built into every panel.</p></div>
      <div class="feat-card"><h4>Anti-Slip Canvas Flooring</h4><p>Premium textured canvas for superior grip even during the most intense, sweat-soaked sessions.</p></div>
      <div class="feat-card"><h4>Custom Logo Branding</h4><p>High-durability printing on canvas, corner pads, and apron panels. Your gym identity, front and centre.</p></div>
      <div class="feat-card"><h4>Factory-Direct Pricing</h4><p>No middlemen. Fabricated in Mumbai with full project support from quote to installation.</p></div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Full Product Lineup</span><h2 class="sec-title">CAGE &amp; RING OPTIONS</h2></div>
    <div class="lineup-grid">
      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-895bfd0f75.jpg" alt="TechFit Floor Mount MMA Cage" onerror="this.style.background='#1a1a1a'" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Floor Mount</div>
          <h3>Floor Cage</h3>
          <p>Ground-mounted academy cage. Ideal for gyms with height constraints. Compact and stable with direct floor anchoring. Professional-grade without the elevated platform.</p>
          <ul class="spec-list"><li>Sizes: 16ft – 30ft diameter</li><li>4mm+ steel poles</li><li>Moisture-resistant marine-grade plywood platform</li><li>Full padding and canvas included</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
        </div>
      </div>
      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-022feeaa5c.jpg" alt="TechFit Elevated Podium MMA Cage" onerror="this.style.background='#1a1a1a'" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Elevated · Competition</div>
          <h3>Podium Cage</h3>
          <p>Elevated platform cage for competitions and showcase events. Reinforced structural steel platform provides superior spectator visibility and professional broadcast-ready aesthetics.</p>
          <ul class="spec-list"><li>Reinforced steel framing platform</li><li>Enhanced visibility for events</li><li>Premium finishing throughout</li><li>Custom height specifications</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
        </div>
      </div>
      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-431ccdde96.jpg" alt="TechFit Professional Training Boxing Ring" onerror="this.style.background='#1a1a1a'" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Daily Training</div>
          <h3>Training Ring</h3>
          <p>Professional boxing and MMA ring engineered for daily use. Durable, shock-absorbing foundation built for the daily grind. Suitable for boxing academies and MMA training facilities.</p>
          <ul class="spec-list"><li>Shock-absorbing layered platform</li><li>Professional canvas surface</li><li>Corner pad and turnbuckle set included</li><li>Custom rope colour options</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
        </div>
      </div>
      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-2727704f45.jpg" alt="TechFit Competition Grade Boxing Ring" onerror="this.style.background='#1a1a1a'" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Competition Grade</div>
          <h3>Competition Ring</h3>
          <p>Full international-specification competition ring. Built for tournaments, promotions, and broadcast environments. Maximum stability, premium aesthetics, full international standards compliance.</p>
          <ul class="spec-list"><li>International spec dimensions</li><li>Broadcast-ready construction</li><li>Premium canvas and branding</li><li>Full installation support</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
        </div>
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Construction Specs</span><h2 class="sec-title">BUILT TO LAST. BUILT TO STANDARDS.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem">
      <div class="stat-box"><div class="stat-n">4mm+</div><div class="stat-l">Steel Pole Gauge</div></div>
      <div class="stat-box"><div class="stat-n">16–30ft</div><div class="stat-l">Available Sizes</div></div>
      <div class="stat-box"><div class="stat-n">5 Years</div><div class="stat-l">Structural Warranty</div></div>
      <div class="stat-box"><div class="stat-n">3–4 Wks</div><div class="stat-l">Standard Lead Time</div></div>
    </div>
  </section>
</section>

<section class="sec sec-gray"><section class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">FAQ</span><h2 class="sec-title">COMMON QUESTIONS</h2></div>
  <div class="faq">
    ${faqItem('What cage and ring types do you offer?', 'Professional-grade combat sports infrastructure including Floor-Mount Cages for gyms with height restrictions, Elevated (Podium) Cages for competition visuals, Training Rings for daily academy use, and Competition-Grade Rings meeting international standards.')}
    ${faqItem('What sizes are available?', 'Custom sizes ranging from 16ft to 30ft diameter. Whether a compact training cage for a boutique studio or a full-size competition arena — we custom-build to your exact specifications.')}
    ${faqItem('What are the construction specifications?', 'Cages feature 4mm+ heavy-gauge steel poles, high-tensile vinyl-coated chain link fencing, multi-layer high-density impact foam padding, reinforced steel framing platforms, and moisture-resistant marine-grade plywood.')}
    ${faqItem('What is the difference between a Floor Cage and a Podium Cage?', 'A Floor Cage is mounted directly to the ground — ideal for height constraints and daily training. A Podium Cage is elevated on a structural steel platform, providing superior visibility and a professional event atmosphere.')}
    ${faqItem('Can I get custom branding on the cage?', 'Yes. We provide high-durability custom logo printing on canvas, corner pads, apron and padding panels. Your gym identity, front and centre — built to last.')}
    ${faqItem('What is the lead time and warranty?', 'Standard fabrication and delivery is 3–4 weeks. Custom or competition-grade orders are 4–6 weeks. We offer a 5-year structural warranty and 1-year warranty on soft parts and mechanisms.')}
  </div>
</div></section>

${renderProductRange()}
${footer()}`;
    }

    function renderCrossFit() {
      return `
<div class="phero" style="background-image:linear-gradient(to bottom,rgba(9,9,11,0.85),rgba(9,9,11,0.92)),url('/assets/images/other/seg-d37a340a28.jpg');background-size:cover;background-position:center">
  <div class="sec-in">
    <div class="phero-label">TechFit Custom · Fabricated in Mumbai</div>
    <h2>HEAVY DUTY<br>FUNCTIONAL TRAINING RIGS</h2>
    <p class="phero-sub">Modular designs that grow with your gym. Wall-mounted or freestanding. Premium 11-gauge structural steel, engineered for the hardest use in commercial environments.</p>
    <div style="display:flex;gap:1.5rem;flex-wrap:wrap;justify-content:center">
      <button class="btn-red" onclick="go('contact')">Get Design Consultation</button>
      <button class="btn-outline" onclick="go('contact')">Request Price List</button>
    </div>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">The TechFit Build Quality</span><h2 class="sec-title">ENGINEERED TO WITHSTAND EVERYTHING.</h2></div>
    <div class="feat-grid">
      <div class="feat-card"><h4>11-Gauge (3mm+) Structural Steel</h4><p>Premium steel uprights and cross-members that take a beating day after day in high-volume commercial facilities.</p></div>
      <div class="feat-card"><h4>Modular Grid System</h4><p>Start with a basic wall-mount unit and expand indefinitely. Add uprights, pull-up bars, and attachments as your facility grows.</p></div>
      <div class="feat-card"><h4>360° Access Island Rigs</h4><p>Freestanding rigs allow maximum athlete throughput from all sides — the centrepiece for high-traffic CrossFit boxes.</p></div>
      <div class="feat-card"><h4>Standard Attachment Compatibility</h4><p>All attachments follow standard sizing: J-cups, spotter arms, dip bars, monkey bars, landmines. Easy add-ons, zero custom fabrication cost.</p></div>
      <div class="feat-card"><h4>Custom Configuration</h4><p>Low ceilings, awkward wall layouts, massive open floors — we engineer a rig solution that fits your exact blueprints.</p></div>
      <div class="feat-card"><h4>Factory-Direct Pricing</h4><p>Fabricated in Mumbai. No middlemen. Full project support from design consultation to installation.</p></div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Configuration Options</span><h2 class="sec-title">WALL MOUNTED vs ISLAND RIGS</h2></div>
    <div class="compare">
      <div class="compare-card">
        <img src="/assets/images/other/img-0fdfdb970a.jpg" alt="Wall Mounted Rig" onerror="this.style.background='#eee'" loading="lazy">
        <div class="compare-chip">Space Saver</div>
        <h3>Wall Mounted Series</h3>
        <p>Mounted directly to wall with heavy-duty anchoring. Maximum training capacity in a minimal footprint. Ideal for boutique studios, compact spaces, and facilities where floor space is premium.</p>
        <ul class="spec-list" style="margin-top:1rem"><li>Direct wall mounting</li><li>Space-efficient design</li><li>Full modular expansion</li><li>All standard attachments compatible</li></ul>
        <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
      </div>
      <div class="compare-card">
        <img src="/assets/images/other/img-747f609149.jpg" alt="Island Rig" onerror="this.style.background='#eee'" loading="lazy">
        <div class="compare-chip">Centerpiece</div>
        <h3>Island Rigs</h3>
        <p>Freestanding 360-degree access rigs. The ultimate centrepiece for high-traffic CrossFit boxes and functional training floors. Athletes access from every side — perfect traffic flow for busy facilities.</p>
        <ul class="spec-list" style="margin-top:1rem"><li>Freestanding — no wall required</li><li>360° athlete access</li><li>Infinite configuration options</li><li>Custom column counts and widths</li></ul>
        <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Compatible Attachments</span><h2 class="sec-title">EVERY ATTACHMENT. ONE RIG.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem">
      ${['J-Cups', 'Spotter Arms', 'Dip Bars', 'Monkey Bars', 'Landmines', 'Pull-Up Bars', 'Storage Solutions', 'Custom Branding'].map(a => `<div style="padding:1rem;background:var(--z50);border:1px solid var(--z200);font-weight:600;font-size:.85rem;color:var(--z700)">${a}</div>`).join('')}
    </div>
  </section>
</section>

<section class="sec sec-gray"><section class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">FAQ</span><h2 class="sec-title">COMMON QUESTIONS</h2></div>
  <div class="faq">
    ${faqItem('Are the CrossFit rigs modular?', 'Yes. TechFit rigs use a modular grid system. Start with a basic wall-mount unit and expand indefinitely — add uprights, pull-up bars, and attachments as your facility grows.')}
    ${faqItem('What attachments are compatible with the rigs?', 'Full range including J-Cups, Spotter Arms, Dip Bars, Monkey Bars, Landmines, Pull-Up Bars, and storage solutions. All attachments follow standard sizing for easy integration.')}
    ${faqItem('Can the rigs be customised for my gym space?', 'Absolutely. We specialise in custom solutions. Whether you have low ceilings, tight wall space, or need a massive island centrepiece — we engineer a rig that fits your exact blueprints.')}
    ${faqItem('What is the steel specification?', 'Premium 11-gauge (3mm+) heavy-duty structural steel for all uprights and cross-members. Engineered to withstand extreme abuse in high-volume commercial environments.')}
    ${faqItem('Do you handle installation?', 'Yes. Our team handles full installation across India, including layout consultation, structural assessment, and final commissioning.')}
  </div>
</div></section>

${ctaBand('Custom-Configured for Your Training Floor', 'Start with a design consultation — we engineer it to your exact space.', 'Get A Consultation', 'contact')}
${footer()}`;
    }

    function renderFreeWeights() {
      return `
<div class="phero" style="background:linear-gradient(135deg,#18181B 0%,#27272A 40%,#DC2626 120%)">
  <div class="sec-in" style="text-align:center">
    <div class="phero-label">TechFit Commercial · Wholesale Pricing</div>
    <h2>COMMERCIAL FREE WEIGHTS<br>&amp; STRENGTH EQUIPMENT</h2>
    <p class="phero-sub" style="margin-left:auto;margin-right:auto">Factory-direct pricing for gym owners and facility operators. Hex dumbbells, Olympic plates, power racks, deadlift platforms, and competition bars. Bulk order discounts available.</p>
    <div style="display:flex;gap:1.5rem;margin-top:2.5rem;flex-wrap:wrap;justify-content:center">
      <button class="btn-red" onclick="go('contact')">Get A Quote</button>
      <button class="btn-outline" onclick="go('contact')">Bulk Order Enquiry</button>
    </div>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Product Catalogue</span><h2 class="sec-title">FULL STRENGTH RANGE</h2></div>
    <div class="lineup-grid">
      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-356b7a8ee5.jpg" alt="TechFit Rubber Hex Dumbbells" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip best-seller-chip">Best Seller</div>
          <h3>Rubber Hex Dumbbells</h3>
          <p>Precision-balanced hex dumbbells with premium rubber coating and ergonomic knurled handles. Ideal for commercial gyms, hotels and high-throughput training environments.</p>
          <ul class="spec-list"><li>Range: 2.5 kg &ndash; 50 kg (0.5 kg increments)</li><li>Premium rubber coating, chrome handles</li><li>Knurled grip, ergonomic design</li><li>Custom logo branding available</li><li>Bulk order wholesale pricing</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-23f50c3f30.jpg" alt="TechFit Nitrile Rubber Dumbbells" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Premium</div>
          <h3>Nitrile Rubber Dumbbells</h3>
          <p>Premium nitrile rubber encased dumbbells with chrome handles. Higher durability and scratch-resistance vs standard rubber. Preferred by 5-star hotel gyms and premium commercial facilities.</p>
          <ul class="spec-list"><li>Range: 1 kg &ndash; 60 kg</li><li>Nitrile rubber coating (commercial grade)</li><li>Chrome-plated steel handle</li><li>Custom branding for bulk orders</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-a2f88d9acf.jpg" alt="TechFit Olympic Rubber Plates" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Olympic Series</div>
          <h3>Rubber Olympic Plates</h3>
          <p>High-density rubber Olympic plates with steel insert for smooth loading and minimal bounce. Drop-tested to 30,000+ drops from 7 feet. Suitable for Olympic lifting and CrossFit.</p>
          <ul class="spec-list"><li>Weights: 1.25 / 2.5 / 5 / 10 / 15 / 20 / 25 kg</li><li>High-density virgin rubber</li><li>Stainless steel inner hub (50mm Olympic)</li><li>Drop-tested 30,000+ times</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-2a6ba6d2ef.jpg" alt="TechFit Nitrile Olympic Plates" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Premium</div>
          <h3>Nitrile Rubber Olympic Plates</h3>
          <p>Nitrile rubber encased Olympic plates with colour-coded IWF sizing. Extra-thin profile allows more plates on the bar. Ideal for powerlifting and commercial strength facilities.</p>
          <ul class="spec-list"><li>IWF colour-coded: 5 kg Green, 10 kg Grey, 15 kg Yellow, 20 kg Blue, 25 kg Red</li><li>IWF diameter 450 mm</li><li>Premium nitrile rubber coating</li><li>Bulk-order pricing</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-b88d6d93e0.jpg" alt="TechFit Full Power Rack" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Pro Series</div>
          <h3>Full Power Rack</h3>
          <p>Heavy-duty 75 &times; 75 mm structural steel frame with laser-cut hole numbering. Static load tested to 500 kg+. Designed for hard commercial use in CrossFit boxes and premium gyms.</p>
          <ul class="spec-list"><li>75 &times; 75 mm structural steel frame</li><li>Laser-cut numbered holes for consistent setup</li><li>500 kg+ static load tested</li><li>Black or custom colour powder coating</li><li>Optional pull-up bars and attachments</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-6ab5d039c4.jpg" alt="TechFit Power Cage / Squat Rack" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Heavy Duty</div>
          <h3>Power Cage &amp; Squat Rack</h3>
          <p>Free-standing squat and power cage with full-length uprights, J-cups, spotter arms and pull-up bar. Core of every serious strength floor.</p>
          <ul class="spec-list"><li>Heavy-duty 11-gauge steel uprights</li><li>J-cups, spotter arms, pull-up bar included</li><li>Band pegs and plate storage options</li><li>Anchors to floor or freestanding</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-fbed50cb82.jpg" alt="TechFit Full Commercial Rack" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Commercial</div>
          <h3>Full Commercial Rack / Rig Combo</h3>
          <p>Full-length commercial rack with integrated plate storage, dumbbell holders and optional pull-up rig. One unit, everything a strength zone needs.</p>
          <ul class="spec-list"><li>Integrated plate &amp; dumbbell storage</li><li>Multi-grip pull-up bar</li><li>Multiple J-cup positions</li><li>Custom length &amp; colour</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-4f819e260f.jpg" alt="TechFit Accessories Rack" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Storage</div>
          <h3>Accessories / Storage Racks</h3>
          <p>Modular storage solutions for dumbbells, plates, kettlebells, medicine balls and accessories. Keeps your strength floor tidy and safe.</p>
          <ul class="spec-list"><li>Dumbbell trees &amp; horizontal racks</li><li>Olympic plate trees</li><li>Kettlebell &amp; medicine ball storage</li><li>Custom sizes and colours</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-e2758a4938.jpg" alt="TechFit Deadlift Platform" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Competition</div>
          <h3>Deadlift &amp; Weightlifting Platform</h3>
          <p>Triple-layer sound-reduction platform with heavy-duty rubber tiles and a central wood lifting surface. Commercial spec for powerlifting and Olympic weightlifting zones.</p>
          <ul class="spec-list"><li>Standard 8&#x2019; &times; 8&#x2019; (2.4 m &times; 2.4 m)</li><li>Triple-layer construction</li><li>Heavy-duty rubber borders</li><li>Hardwood or bamboo centre panel</li><li>Custom branding on centre</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <img class="lineup-img" src="/assets/images/other/img-ca5ff2656e.jpg" alt="TechFit Heavy Duty Olympic Bars" loading="lazy">
        <div class="lineup-card-body">
          <div class="lineup-chip">Barbells</div>
          <h3>Heavy Duty Olympic Bars</h3>
          <p>Precision-engineered 20 kg men&#x2019;s and 15 kg women&#x2019;s Olympic bars, plus specialty bars. 190 K+ PSI tensile strength, dual-knurl options, needle bearings.</p>
          <ul class="spec-list"><li>20 kg men&#x2019;s Olympic bar (7 ft / 2.2 m)</li><li>15 kg women&#x2019;s Olympic bar (6&#x2019;6&quot; / 2.01 m)</li><li>190K&ndash;220K PSI tensile strength</li><li>Dual-knurl (power &amp; Olympic marks)</li><li>Needle-bearing rotation</li><li>Speciality bars: Safety Squat, Trap / Hex, Swiss / Multi-Grip, Curl / EZ, Cambered</li></ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Technical Specifications</span><h2 class="sec-title">BUILT TO COMMERCIAL STANDARDS.</h2></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem">
      <div class="stat-box"><div class="stat-n">500kg+</div><div class="stat-l">Rack Load Rating</div></div>
      <div class="stat-box"><div class="stat-n">11-gauge</div><div class="stat-l">Steel Specification</div></div>
      <div class="stat-box"><div class="stat-n">30,000+</div><div class="stat-l">Drop Tests (Plates)</div></div>
      <div class="stat-box"><div class="stat-n">2.5–50kg</div><div class="stat-l">Dumbbell Range</div></div>
    </div>
    <div class="feat-grid" style="margin-top:2.5rem">
      <div class="feat-card"><h4>Custom Logo Plates &amp; Dumbbells</h4><p>High-durability branding on plates and dumbbells for bulk orders. Logos stay sharp after years of use.</p></div>
      <div class="feat-card"><h4>Drop-Safe Bumper Plates</h4><p>High-density virgin rubber with stainless steel inner hub. Fully tested for safety and long-term floor protection.</p></div>
      <div class="feat-card"><h4>Pan-India Delivery</h4><p>Factory-direct delivery across India. Bulk order discounts and wholesale pricing for gym operators.</p></div>
    </div>
  </section>
</section>

<section class="sec"><section class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">FAQ</span><h2 class="sec-title">COMMON QUESTIONS</h2></div>
  <div class="faq">
    ${faqItem('What strength equipment range is available?', 'Comprehensive range of commercial-grade strength equipment including hex rubber dumbbells (2.5–50kg), Olympic bumper plates, heavy-duty power racks, deadlift platforms, and competition-spec bars.')}
    ${faqItem('Do you offer branding on weights?', 'Yes. We provide custom logo bumper plates and branded dumbbells for bulk orders, giving your facility a premium, cohesive look. High-durability printing ensures logos stay sharp after years of use.')}
    ${faqItem('What is the weight capacity of your racks?', 'Commercial power racks are static load tested to 500kg+. All racks use 11-gauge structural steel (3mm+) to ensure zero-wobble performance under maximum loads.')}
    ${faqItem('Are your bumper plates drop-safe?', 'Absolutely. TechFit bumper plates use high-density virgin rubber with stainless steel inner hub. Drop-tested to 30,000+ drops from 7 feet for long-term performance and floor protection.')}
    ${faqItem('Do you offer wholesale pricing?', 'Yes. Factory-direct pricing with bulk order discounts for gym owners and operators. No middlemen. Pan-India delivery. Contact us for a wholesale quote.')}
  </div>
</div></section>

${renderProductRange()}
${footer()}`;
    }

    function renderPadel() {
      return `
<div class="phero">
  <div class="sec-in" style="text-align:center">
    <div class="phero-label">TechFit Sports Infrastructure</div>
    <h2>PROFESSIONAL GRADE<br>PADEL &amp; PICKLEBALL COURTS</h2>
    <p class="phero-sub" style="margin-left:auto;margin-right:auto">Engineered for performance, durability, and playability. Turnkey indoor and outdoor court solutions for clubs, academies, residential projects, and commercial sports facilities.</p>
    <div style="display:flex;gap:1.5rem;margin-top:2.5rem;flex-wrap:wrap;justify-content:center">
      <button class="btn-red" onclick="go('contact')">Request Price List</button>
      <button class="btn-outline" onclick="go('contact')">Get Design Consultation</button>
    </div>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Court Types</span><h2 class="sec-title">PADEL OR PICKLEBALL?</h2></div>
    <div class="compare">
      <div class="compare-card">
        <img src="/assets/images/other/img-853fb9b8b4.jpg" alt="Padel Court" onerror="this.style.background='#eee'" loading="lazy">
        <div class="compare-chip">Doubles Sport</div>
        <h3>Padel Courts</h3>
        <p>A padel court measures 10m × 20m (32.8ft × 65.6ft) and is fully enclosed by panoramic tempered glass and galvanised mesh walls — the walls are part of the game. Always played in doubles. Glass walls provide structural integrity and exceptional spectator visibility.</p>
        <ul class="spec-list" style="margin-top:1rem"><li>Court size: 10m × 20m (32.8ft × 65.6ft)</li><li>Net height: 0.88m (2.88ft) at centre, 0.92m (3.02ft) at posts</li><li>Playing height: min 6m (19.7ft) clear</li><li>Panoramic tempered glass walls &amp; mesh boundary</li><li>Professional artificial turf playing surface</li><li>LED floodlighting &amp; custom club branding</li></ul>
        <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
      </div>
      <div class="compare-card">
        <img src="/assets/images/other/img-2ce0bc3719.jpg" alt="Pickleball Court" onerror="this.style.background='#eee'" loading="lazy">
        <div class="compare-chip">Singles &amp; Doubles</div>
        <h3>Pickleball Courts</h3>
        <p>A pickleball court measures 6.1m × 13.41m (20ft × 44ft) — similar footprint to a doubles badminton court. Can be played singles or doubles. Multiple pickleball courts fit in the space of a single padel court, making them ideal for high-throughput clubs.</p>
        <ul class="spec-list" style="margin-top:1rem"><li>Court size: 6.1m × 13.41m (20ft × 44ft)</li><li>Net height: 0.914m (36 in) at sidelines, 0.864m (34 in) at centre</li><li>Non-volley zone: 2.13m (7ft) from net each side</li><li>Playing height: minimum 6m (19.7ft) clear for indoor</li><li>Acrylic or cushioned PU sports flooring</li><li>LED lighting, indoor or outdoor configurations</li></ul>
        <button class="lineup-cta" onclick="go('contact')">GET QUOTE →</button>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Key Features</span><h2 class="sec-title">EVERY DETAIL ENGINEERED.</h2></div>
    <div class="feat-grid">
      <div class="feat-card"><h4>Panoramic Glass Walls</h4><p>Structural integrity and maximum spectator visibility. The signature padel aesthetic, built to last.</p></div>
      <div class="feat-card"><h4>LED Lighting System</h4><p>Professional-grade LED systems for night play capability and broadcast-quality visibility.</p></div>
      <div class="feat-card"><h4>Custom Branding</h4><p>Club identity integration — custom branding and signage for a professional, cohesive facility look.</p></div>
      <div class="feat-card"><h4>Turnkey Installation</h4><p>End-to-end project management: design consultation, structural engineering, installation, and commissioning.</p></div>
    </div>
    <div class="feat-grid" style="margin-top:2rem">
      <div class="feat-card"><h4>Indoor &amp; Outdoor</h4><p>Engineered for India's climate — solutions for both climate-controlled indoor and open outdoor environments.</p></div>
      <div class="feat-card"><h4>Retrofit Installation</h4><p>New build or retrofit — our team handles both new constructions and fitting into existing facility spaces.</p></div>
    </div>
  </section>
</section>

<section class="sec"><section class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">Who We Serve</span><h2 class="sec-title">FACILITY APPLICATIONS</h2></div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem">
    ${['Sports Clubs & Academies', 'Residential Complexes', 'Commercial Sports Facilities', 'Hotel Resorts', 'Private Clubs', 'Multi-Court Complexes', 'Educational Institutions', 'Corporate Campuses'].map(a => `<div style="padding:1.25rem;background:var(--z50);border:1px solid var(--z200);font-weight:600;font-size:.85rem;color:var(--z700)">${a}</div>`).join('')}
  </div>
</div></section>


<section class="sec sec-gray"><div class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">FAQ</span><h2 class="sec-title">COMMON QUESTIONS</h2></div>
  <div class="faq">
    ${faqItem('What is the difference between Padel and Pickleball courts?', 'A Pickleball court measures 6.1m × 13.41m (20ft × 44ft) — similar to a doubles badminton court — and can be played singles or doubles. Padel courts are larger at 10m × 20m (32.8ft × 65.6ft) and enclosed by tempered glass and mesh walls which are part of the game — padel is always played in doubles.')}
    ${faqItem('Do you offer turnkey installation?', 'Yes. We provide end-to-end turnkey solutions from initial design consultation and structural engineering to professional installation and final court commissioning.')}
    ${faqItem('Can courts be installed outdoors in India?', 'Yes. Our court structures are engineered for India climate conditions — both indoor (climate-controlled) and outdoor configurations are available.')}
    ${faqItem('Can I fit multiple courts in my facility?', 'Yes. Multiple pickleball courts can fit in the space of a single padel court, making them ideal for high-throughput facilities. We design multi-court configurations for maximum usage.')}
  </div>
</div></section>

${ctaBand('Build Your Court', 'Design consultation included. Turnkey delivery across India.', 'Request Pricing', 'contact')}
${footer()}`;
    }

    function renderAqua() {
      return `
<div class="phero" style="background:linear-gradient(135deg,#09090B 0%,#0369a1 50%,#06b6d4 110%)">
  <div class="sec-in" style="text-align:center">
    <div class="phero-label">TechFit Aqua · SS316 Marine Grade</div>
    <h2>TECHFIT AQUA<br>FITNESS EQUIPMENT</h2>
    <p class="phero-sub" style="margin-left:auto;margin-right:auto">Premium SS316 marine-grade underwater stainless steel fitness equipment. Treadmills, bikes, and ellipticals engineered for aquatic training, rehabilitation, and luxury wellness facilities.</p>
    <div style="display:flex;gap:1.5rem;margin-top:2.5rem;flex-wrap:wrap;justify-content:center">
      <button class="btn-red" onclick="go('contact')">Request Price List</button>
      <button class="btn-outline" onclick="go('contact')">Get Technical Specs</button>
    </div>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">The Aqua Range</span><h2 class="sec-title">THREE PRODUCTS. COMPLETE AQUATIC FITNESS.</h2></div>
    <div class="aqua-grid">
      <div class="aqua-card" onclick="go('contact')">
        <img src="/assets/images/other/img-f8279c4249.jpg" alt="Aqua Treadmill" style="width:100%;height:auto;display:block" loading="lazy">
        <div class="aqua-card-body">
          <div class="aqua-label">Manual Underwater Treadmill</div>
          <h3>Aqua Treadmill</h3>
          <p>Self-paced underwater treadmill for hydrotherapy, rehabilitation, and aquatic fitness training. Dual stability support rails for safe operation at all fitness levels.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin:1rem 0;font-size:.8rem">
            <div style="background:var(--z50);padding:.5rem"><strong>Material</strong><br>SS316 Marine Grade</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Capacity</strong><br>160 kg</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Water Depth</strong><br>900–1200mm</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Operation</strong><br>Manual / Self-paced</div>
          </div>
          <button class="btn-red" onclick="go('contact')">GET QUOTE</button>
        </div>
      </div>
      <div class="aqua-card" onclick="go('contact')">
        <img src="/assets/images/other/img-c1af2fca09.jpg" alt="Aqua Bike" style="width:100%;height:auto;display:block" loading="lazy">
        <div class="aqua-card-body">
          <div class="aqua-label">Underwater Cycle</div>
          <h3>Aqua Bike</h3>
          <p>Commercial underwater cycling equipment for aqua fitness classes. Full SS316 marine-grade construction for zero corrosion in chlorinated and saltwater pool environments.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin:1rem 0;font-size:.8rem">
            <div style="background:var(--z50);padding:.5rem"><strong>Material</strong><br>SS316 Marine Grade</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Use Case</strong><br>Aqua Fitness Classes</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Water Depth</strong><br>900–1200mm</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Corrosion</strong><br>Zero Rust</div>
          </div>
          <button class="btn-red" onclick="go('contact')">GET QUOTE</button>
        </div>
      </div>
      <div class="aqua-card" onclick="go('contact')">
        <img src="/assets/images/other/img-11304bc7e5.jpg" alt="Aqua Moon Walker" style="width:100%;height:auto;display:block" loading="lazy">
        <div class="aqua-card-body">
          <div class="aqua-label">Underwater Elliptical</div>
          <h3>Aqua Moon Walker</h3>
          <p>Low-impact underwater elliptical for rehabilitation centres and wellness facilities. The ideal combination of cardiovascular training with joint-friendly aquatic resistance.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin:1rem 0;font-size:.8rem">
            <div style="background:var(--z50);padding:.5rem"><strong>Material</strong><br>SS316 Marine Grade</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Use Case</strong><br>Rehab &amp; Fitness</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Water Depth</strong><br>900–1200mm</div>
            <div style="background:var(--z50);padding:.5rem"><strong>Impact</strong><br>Low-Impact</div>
          </div>
          <button class="btn-red" onclick="go('contact')">GET QUOTE</button>
        </div>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Material Specification</span><h2 class="sec-title">SS316 MARINE GRADE STAINLESS STEEL</h2></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.5rem">
      <div class="stat-box"><div class="stat-n">SS316</div><div class="stat-l">Marine Grade Steel</div></div>
      <div class="stat-box"><div class="stat-n">160kg</div><div class="stat-l">Weight Capacity</div></div>
      <div class="stat-box"><div class="stat-n">5 Years</div><div class="stat-l">Structural Warranty</div></div>
      <div class="stat-box"><div class="stat-n">0</div><div class="stat-l">Rust Risk</div></div>
    </div>
    <div class="feat-grid" style="margin-top:2.5rem">
      <div class="feat-card"><h4>Superior Corrosion Resistance</h4><p>SS316 is a premium stainless steel alloy with superior resistance to chlorinated water and saltwater environments. Zero rust with continuous underwater use.</p></div>
      <div class="feat-card"><h4>New Build or Retrofit</h4><p>Modular design supports both new pool construction integration and retrofitting into existing pool facilities. Our installation team handles everything.</p></div>
      <div class="feat-card"><h4>Turnkey Installation</h4><p>From structural assessment to final commissioning — our team manages the full installation process for aquatic fitness equipment.</p></div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Ideal For</span><h2 class="sec-title">FACILITY APPLICATIONS</h2></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem">
      ${['Rehabilitation Centres', 'Aquatic Therapy Facilities', 'High-End Fitness Clubs', 'Sports Recovery Centres', 'Wellness Facilities', 'Medical Institutions', 'Resort & Spa Facilities', 'Hotel Aquatic Centres'].map(a => `<div style="padding:1.25rem;background:var(--z50);border:1px solid var(--z200);font-weight:600;font-size:.85rem;color:var(--z700)">${a}</div>`).join('')}
    </div>
  </section>
</section>

<section class="sec sec-gray"><section class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">FAQ</span><h2 class="sec-title">COMMON QUESTIONS</h2></div>
  <div class="faq">
    ${faqItem('What is SS316 Marine Grade Stainless Steel?', 'SS316 is a premium stainless steel alloy with superior corrosion resistance, especially in saltwater and chlorinated pool environments. All TechFit Aqua equipment uses SS316 for maximum longevity and zero rust with continuous underwater use.')}
    ${faqItem('What is the recommended water depth for Aqua equipment?', 'Aqua equipment is optimised for water depths of 900mm to 1200mm. This range provides the ideal balance of buoyancy and resistance for effective underwater training and rehabilitation.')}
    ${faqItem('What is the weight capacity?', 'The Aqua Treadmill supports a weight capacity of up to 160 kg. It features a heavy-duty manual treadmill belt and dual stability support rails for safe, self-paced underwater training.')}
    ${faqItem('Can the equipment be installed in existing pools?', 'Yes. Our modular Aqua equipment is designed for both new pool constructions and retrofitting into existing facilities. Our turnkey installation team handles everything from structural assessment to final commissioning.')}
    ${faqItem('What warranty is provided?', '5-year structural warranty against manufacturing defects. Technical support and installation included.')}
  </div>
</div></section>

${ctaBand('Enquire About Aqua Equipment', 'SS316 marine grade. Turnkey installation. Pan-India delivery.', 'Get in Touch', 'contact')}
${footer()}`;
    }

    // ── SERVICES PAGE ──────────────────────────────────────────────────────────────
    function renderServices() {
      return `
<div class="phero">
  <div class="sec-in">
    <div class="phero-label">Who We Help &amp; What We Do</div>
    <h2>SOLUTIONS &amp; SERVICES</h2>
    <p class="phero-sub">We serve gyms, real estate developers, schools, hotels, corporates and wellness operators. For every client type we offer the same thing — a complete, end-to-end gym, wellness &amp; sports setup under one roof.</p>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Who We Serve</span>
      <h2 class="sec-title">SOLUTIONS FOR EVERY CLIENT</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.5rem;margin-top:2.5rem">
      <div class="feat-card" style="cursor:pointer;border-top:3px solid var(--red);border-left:none" onclick="go('for-gyms')">
        <h4>Gyms &amp; Studios</h4>
        <p>Commercial fit-outs, CrossFit boxes, MMA academies, boutique studios. Full equipment range, installation, and after-sales.</p>
        <div style="margin-top:1rem;font-size:.75rem;font-weight:700;color:var(--red)">EXPLORE →</div>
      </div>
      <div class="feat-card" style="cursor:pointer;border-top:3px solid var(--red);border-left:none" onclick="go('for-developers')">
        <h4>Developers &amp; Builders</h4>
        <p>Residential and commercial gym amenities. Turnkey delivery to specification, on time. Trusted by Hiranandani, Prestige, Rustomjee and more.</p>
        <div style="margin-top:1rem;font-size:.75rem;font-weight:700;color:var(--red)">EXPLORE →</div>
      </div>
      <div class="feat-card" style="cursor:pointer;border-top:3px solid var(--red);border-left:none" onclick="go('for-schools')">
        <h4>Schools &amp; Institutions</h4>
        <p>Fitness infrastructure for educational institutions — outdoor stations, indoor gyms, sports flooring, and functional training areas.</p>
        <div style="margin-top:1rem;font-size:.75rem;font-weight:700;color:var(--red)">EXPLORE →</div>
      </div>
      <div class="feat-card" style="cursor:pointer;border-top:3px solid var(--red);border-left:none" onclick="go('for-hotels')">
        <h4>Hotels &amp; Corporates</h4>
        <p>Premium wellness infrastructure for 3–5 star hotels and corporate campuses. BH Fitness and Tunturi ranges with connected technology.</p>
        <div style="margin-top:1rem;font-size:.75rem;font-weight:700;color:var(--red)">EXPLORE →</div>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">What We Do</span>
      <h2 class="sec-title">OUR SERVICES</h2>
      <p class="sec-sub">Everything you need to set up and run a world-class gym — design, supply, fabrication, flooring, install, and support.</p>
    </div>
    <div class="services-grid" style="margin-top:2.5rem">
      <div class="service-card">
        <h3>Gym Design &amp; Layout</h3>
        <p>Expert space planning to maximise your floor area and revenue per square foot.</p>
        <ul class="service-steps">
          <li>Space assessment and measurement</li>
          <li>Equipment zoning and layout plan</li>
          <li>2D floor plan and placement drawing</li>
          <li>Capacity and revenue modelling</li>
        </ul>
      </div>
      <div class="service-card">
        <h3>Equipment Supply</h3>
        <p>Reseller of BH Fitness, Tunturi, and California Fitness plus TechFit's own fabricated range.</p>
        <ul class="service-steps">
          <li>Needs assessment and brand recommendation</li>
          <li>Detailed quote with full specifications</li>
          <li>Transparent pricing — no hidden costs</li>
          <li>Cardio, strength, functional, and combat equipment</li>
        </ul>
      </div>
      <div class="service-card">
        <h3>Gym &amp; Sports Flooring</h3>
        <p>Rubber flooring, EPDM, foam tiles, artificial turf, and sprung hardwood — supplied and installed.</p>
        <ul class="service-steps">
          <li>Gym rubber flooring (rolls and tiles)</li>
          <li>Artificial turf for functional areas</li>
          <li>Sports courts and multi-sport flooring</li>
          <li>Outdoor fitness area surfaces</li>
        </ul>
      </div>
      <div class="service-card">
        <h3>Custom Fabrication</h3>
        <p>In-house manufacturing of MMA cages, CrossFit rigs, boxing rings, and free weights at our Mumbai facility.</p>
        <ul class="service-steps">
          <li>Competition-grade MMA cages and rings</li>
          <li>CrossFit and functional training rigs</li>
          <li>Custom free weights and storage</li>
          <li>Faster lead times than imports</li>
        </ul>
      </div>
      <div class="service-card">
        <h3>Installation &amp; Setup</h3>
        <p>Professional installation by our own trained engineers. We commission and test every piece of equipment.</p>
        <ul class="service-steps">
          <li>Scheduled delivery to match your opening date</li>
          <li>Full commissioning and functional testing</li>
          <li>Staff training on equipment use</li>
          <li>Handover documentation provided</li>
        </ul>
      </div>
      <div class="service-card">
        <h3>Maintenance &amp; AMC</h3>
        <p>Annual Maintenance Contracts to keep your equipment in peak condition and protect your investment.</p>
        <ul class="service-steps">
          <li>Quarterly preventive maintenance visits</li>
          <li>Priority breakdown response</li>
          <li>Genuine spare parts supply</li>
          <li>Service history and compliance reports</li>
        </ul>
      </div>
      <div class="service-card">
        <h3>Wellness &amp; Recovery Suites</h3>
        <p>Hyperbaric chambers, cryo, red-light, dry-float and IHHT &mdash; designed and integrated through our Alteon partnership.</p>
        <ul class="service-steps">
          <li>Hyperbaric oxygen therapy chambers (HBOT)</li>
          <li>Cryotherapy &amp; localised cryo systems</li>
          <li>Red-light, IHHT &amp; dry-float technology</li>
          <li>Turnkey installation for gyms, hotels &amp; longevity clinics</li>
        </ul>
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">The Process</span>
      <h2 class="sec-title">FROM ENQUIRY TO OPENING DAY</h2>
      <p class="sec-sub">Our proven 4-step process ensures your gym is delivered on time, on budget, and exactly to specification.</p>
    </div>
    <div class="pillars" style="grid-template-columns:repeat(4,1fr)">
      <div class="pillar">
        <div class="pillar-num">Step 01</div>
        <h3>Free Consultation</h3>
        <p>We assess your space, understand your goals, and recommend the right solution. No obligation.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">Step 02</div>
        <h3>Proposal &amp; Plan</h3>
        <p>Detailed proposal with floor plan, equipment list, specs, pricing, and timeline — within 48 hours.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">Step 03</div>
        <h3>Delivery &amp; Install</h3>
        <p>Equipment delivered and installed by our team. We coordinate all logistics so you don't have to.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">Step 04</div>
        <h3>After-Sales Support</h3>
        <p>Warranty support, spare parts, and AMC contracts for long-term peace of mind.</p>
      </div>
    </div>
  </section>
</section>

${ctaBand("Let\'s Talk About Your Facility", "", "Start a Conversation", "contact")}
${footer()}`;
    }

    // ── PROJECTS PAGE ──────────────────────────────────────────────────────────────
    function renderProjects() {
      const projects = [
        { img: '/assets/images/other/img-c2478944df.jpg', loc: 'Byculla, Mumbai', name: 'TechFit Factory Facility', type: 'Combat Sports', detail: 'In-house MMA cage fabrication, boxing ring, and CrossFit rig manufacturing.' },
        { img: '/assets/images/other/img-05cf274f17.jpg', loc: 'Ludhiana', name: 'MMA Matrix Ludhiana', type: 'Strength & Cardio', detail: 'California Fitness treadmill line + custom free weights area.' },
        { img: '/assets/images/other/img-d0e15a6e90.jpg', loc: 'Amritsar', name: 'MMA Matrix Amritsar', type: 'Combat & Functional', detail: 'Full functional training floor with combat sports area.' },
        { img: '/assets/images/other/img-944651fec5.jpg', loc: 'Belagavi', name: 'MMA Matrix Belagavi', type: 'Commercial Gym', detail: 'Full commercial gym fit-out. Cardio floor + strength area.' },
        { img: '/assets/images/other/img-9dedf4a699.jpg', loc: 'Ghaziabad', name: 'MMA Matrix Ghaziabad', type: 'MMA & Fitness', detail: 'MMA training facility with TechFit custom cage and full equipment range.' },
      ];

      return `
<div class="phero">
  <section class="sec-in">
    <div class="phero-label">Our Portfolio</div>
    <h2>COMPLETED PROJECTS</h2>
    <p class="phero-sub">800+ installations and sports facilities delivered across India. Each project is custom-configured for the client's space, brand, and budget.</p>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="proj-grid">
      ${projects.map(p => `
      <div class="proj-card">
        <img class="proj-img" src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="proj-overlay">
          <div class="proj-location"> ${p.loc}</div>
          <div class="proj-name">${p.name}</div>
          <div class="proj-type">${p.type}</div>
        </div>
        <div style="padding:1.2rem;border-bottom:1px solid var(--z200)">
          <p style="font-size:.82rem;color:var(--z500);line-height:1.6">${p.detail}</p>
        </div>
      </div>`).join('')}
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Our Clients</span>
      <h2 class="sec-title">TRUSTED BY INDIA'S BEST</h2>
      <p class="sec-sub">From Google's offices to Tiger Shroff's MMA gyms — a cross-section of our client portfolio.</p>
    </div>
    <div style="margin-top:3rem">
      ${logoWall()}
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Installation Highlights</span>
      <h2 class="sec-title">INSIDE OUR INSTALLATIONS</h2>
      <p class="sec-sub">Real installations. Real results. Photos from gym fit-outs we have completed across India.</p>
    </div>
    <div class="install-grid" style="margin-top:2.5rem">
      
        <img src="/assets/images/other/img-05cf274f17.jpg" alt="Weight Training Area" loading="lazy">
        <div class="install-overlay"><div class="install-overlay-text">Commercial Strength Floor</div></div>
      </div>
      <div class="install-card">
        <img src="/assets/images/other/img-944651fec5.jpg" alt="Cardio Floor" loading="lazy">
        <div class="install-overlay"><div class="install-overlay-text">Cardio Training Floor</div></div>
      </div>
      <div class="install-card">
        <img src="/assets/images/other/img-c2478944df.jpg" alt="Boxing Setup" loading="lazy">
        <div class="install-overlay"><div class="install-overlay-text">Combat Sports Area · Custom Build</div></div>
      </div>
      <div class="install-card">
        <img src="/assets/images/other/img-d0e15a6e90.jpg" alt="Kickboxing Area" loading="lazy">
        <div class="install-overlay"><div class="install-overlay-text">Kickboxing & MMA Zone</div></div>
      </div>
      <div class="install-card">
        <img src="/assets/images/other/img-9dedf4a699.jpg" alt="MMA Classes" loading="lazy">
        <div class="install-overlay"><div class="install-overlay-text">MMA Training Facility</div></div>
      </div>
    </div>
    <p style="text-align:center;margin-top:2rem;font-size:.8rem;color:var(--z500)">
      More installation photos coming soon. Have a project in mind?
    </p>
  </section>
</section>

${ctaBand("Want Your Gym in This List?", "We\'d love to work on your facility. Get in touch for a free consultation.", "Plan Your Project")}
${footer()}`;
    }


    // ─── WELLNESS SOLUTIONS ──────────────────────────────────────────────────────
    function renderWellness() {
      return `
<div class="phero">
  <section class="sec-in">
    <div class="phero-label">Wellness Solutions</div>
    <h2>INTEGRATED WELLNESS INFRASTRUCTURE</h2>
    <p class="phero-sub">From longevity labs in luxury hotels to recovery suites in residential towers &mdash; we design, supply and install the full wellness tech stack for India&rsquo;s most ambitious spaces.</p>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Who We Build For</span>
      <h2 class="sec-title">BUILT FOR EVERY WELLNESS-LED SPACE</h2>
    </div>
    <div class="pillars" style="margin-top:2.5rem">
      <div class="pillar">
        <div class="pillar-num">01</div>
        <h3>Real Estate Developers</h3>
        <p>Turnkey wellness amenities that sell square feet and extend property tenure. Designed for residential towers, gated communities and mixed-use developments.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">02</div>
        <h3>Wellness Centres</h3>
        <p>Hyperbaric chambers, cryotherapy, red light therapy, IHHT, dry float, infrared sauna &mdash; the complete Alteon stack, engineered for standalone longevity &amp; recovery studios.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">03</div>
        <h3>Gyms &amp; Fitness Clubs</h3>
        <p>Add recovery suites that differentiate your club from the market, drive premium memberships and cut member churn.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">04</div>
        <h3>Hotels &amp; Resorts</h3>
        <p>Hospitality-grade wellness installations that turn your spa into a destination &mdash; for five-star urban hotels and standalone wellness resorts alike.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">05</div>
        <h3>Corporates</h3>
        <p>Executive wellness rooms, recovery pods and stress-recovery technology for high-performance workplaces.</p>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">What We Deliver</span>
      <h2 class="sec-title">FROM SPACE PLAN TO FULL INSTALLATION</h2>
    </div>
    <div class="pillars" style="margin-top:2.5rem">
      <div class="pillar">
        <div class="pillar-num">01</div>
        <h3>Space Planning</h3>
        <p>Layouts that balance client experience, throughput, staff workflow, hygiene and revenue per sq ft.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">02</div>
        <h3>Equipment Supply</h3>
        <p>Alteon-branded hyperbaric, cryotherapy, red light, IHHT, dry float, infrared sauna, lymphatic drainage, contrast therapy and more.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">03</div>
        <h3>Design Integration</h3>
        <p>Finishes, lighting and acoustics that match your brand &mdash; we work with your interior designer or bring our own.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">04</div>
        <h3>Install &amp; AMC</h3>
        <p>Factory-trained installation, annual maintenance, parts &amp; consumables &mdash; a single accountable vendor for the life of the facility.</p>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-dark">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label" style="color:var(--red)">Why Alteon + TechFit</span>
      <h2 class="sec-title white">A WELLNESS STACK BUILT IN INDIA, FOR INDIA</h2>
    </div>
    <div class="feat-grid" style="margin-top:2.5rem">
      <div class="feat-card"><h4>800+ Installations Delivered</h4><p>Proven track record across commercial gyms, hotels and residential projects &mdash; now extending into wellness.</p></div>
      <div class="feat-card"><h4>One Invoice, One PM</h4><p>Design through after-sales under one roof &mdash; a single accountable vendor from brief to handover.</p></div>
      <div class="feat-card"><h4>11.3% Annual Growth</h4><p>India is the 2nd fastest-growing wellness market globally, per Global Wellness Institute. We help you capture that tailwind.</p></div>
    </div>
  </section>
</section>

${ctaBand('Planning a wellness-led facility?', 'From residential towers to luxury hotels &mdash; let\'s talk space, equipment and ROI.', 'Talk to Us')}

${footer()}`;
    }

    // ── ABOUT PAGE ─────────────────────────────────────────────────────────────────
    function renderAbout() {
      return `
<div class="phero">
  <section class="sec-in">
    <div class="phero-label">About TechFit</div>
    <h2>ABOUT US</h2>
    <p class="phero-sub">From a Mumbai-based custom fabrication workshop to India&#x2019;s one-stop gym, wellness and sports infrastructure partner.</p>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:center" class="rsp-1col">
      <div>
        <span class="sec-label">Our Story</span>
        <h2 class="sec-title">ENGINEERED IN INDIA.<br>BUILT FOR THE WORLD.</h2>
        <p class="sec-sub" style="margin-top:1.2rem">TechFit started as a custom fabrication workshop in Mumbai &mdash; building MMA cages, boxing rings, CrossFit rigs, free weights and aqua equipment for some of India&#x2019;s most recognised gyms and fight leagues.</p>
        <p class="sec-sub">Today we are a one-stop solution for everything a gym, hotel, real-estate developer, school or institution needs. We distribute world-leading fitness brands across every budget segment, partner with Alteon for wellness and recovery technology, and continue to manufacture combat-sports, CrossFit and free-weight equipment in-house at our Byculla facility.</p>
        <p class="sec-sub">One team. One point of contact. Design, supply, installation and after-sales &mdash; all under one roof.</p>
        <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap">
          <button class="btn-red" onclick="go('contact')">Talk to Us</button>
        </div>
      </div>
      <div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
          <div style="background:var(--z50);border:1px solid var(--z200);padding:2rem 1rem;border-radius:1rem;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
            <h4 style="font-size:2.5rem;font-weight:900;color:var(--red);line-height:1;margin-bottom:0.5rem">2016</h4>
            <p style="font-size:0.85rem;font-weight:700;color:var(--z600);text-transform:uppercase;letter-spacing:0.1em;margin:0">Year Founded</p>
          </div>
          <div style="background:var(--z50);border:1px solid var(--z200);padding:2rem 1rem;border-radius:1rem;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
            <h4 style="font-size:2.5rem;font-weight:900;color:var(--red);line-height:1;margin-bottom:0.5rem">800+</h4>
            <p style="font-size:0.85rem;font-weight:700;color:var(--z600);text-transform:uppercase;letter-spacing:0.1em;margin:0">Gyms Completed</p>
          </div>
          <div style="background:var(--z50);border:1px solid var(--z200);padding:2rem 1rem;border-radius:1rem;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
            <h4 style="font-size:2.5rem;font-weight:900;color:var(--red);line-height:1;margin-bottom:0.5rem">5</h4>
            <p style="font-size:0.85rem;font-weight:700;color:var(--z600);text-transform:uppercase;letter-spacing:0.1em;margin:0">Global Brands</p>
          </div>
          <div style="background:var(--z50);border:1px solid var(--z200);padding:2rem 1rem;border-radius:1rem;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
            <h4 style="font-size:2.5rem;font-weight:900;color:var(--red);line-height:1;margin-bottom:0.5rem">20k</h4>
            <p style="font-size:0.85rem;font-weight:700;color:var(--z600);text-transform:uppercase;letter-spacing:0.1em;margin:0">Sq Ft Facility</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Leadership</span>
      <h2 class="sec-title">MEET THE FOUNDERS</h2>
      <p class="sec-sub">A builder and a strategist &mdash; united by a belief that India deserves world-class gym infrastructure at fair prices.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;margin-top:3rem" class="rsp-1col">
      <div class="feat-card" style="padding:0;overflow:hidden;text-align:center;display:flex;flex-direction:column;border-radius:1rem">
        <img src="/assets/images/other/img-aa1ee5f2ad.jpg" alt="Mr. Ali Asgar Salim Potia" style="width:200px;height:200px;border-radius:50%;object-fit:cover;object-position:center top;display:block;margin:2.5rem auto 0;box-shadow:0 8px 24px rgba(0,0,0,0.12)" loading="lazy">
        <div style="padding:2rem 2rem 2.5rem;flex:1;display:flex;flex-direction:column">
          <h3 style="font-size:1.25rem;font-weight:900;margin:0 0 .3rem;letter-spacing:-.01em">Mr. Ali Asgar Salim Potia</h3>
          <div style="font-size:.8rem;color:var(--red);font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin-bottom:1.5rem">Co-Founder &middot; Manufacturing &amp; Partnerships</div>
          <div style="text-align:left;position:relative;flex:1">
            <p class="founder-bio" style="font-size:.92rem;color:var(--z600);line-height:1.75;margin:0;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden">Ali has spent the last 15 years inside India's fitness industry &mdash; as an athlete, a buyer, and now a builder. Growing up playing competitive sports, he watched the gap between what Indian gyms wanted and what the market could actually deliver widen year after year. TechFit was his answer. Armed with a Bachelor of Business Administration (BBA) from Kingston University London and more than a decade on the supply side of fitness, Ali leads the manufacturing backbone of the business &mdash; the Byculla facility that fabricates MMA cages, boxing rings, CrossFit rigs, free weights and custom combat-sports environments for Matrix Fight Night, Super Fight League, Kumite 1 and India's top gyms. He also runs client relationships and brand partnerships across the full TechFit portfolio &mdash; BH Fitness, Tunturi, California Fitness and Alteon Wellness &mdash; ensuring every facility we design gets priced right, spec'd right, and supported for the long term.</p>
            <button onclick="this.previousElementSibling.style.display='block';this.style.display='none'" style="background:none;border:none;color:var(--red);font-size:.85rem;font-weight:800;padding:0;margin-top:1rem;cursor:pointer;text-transform:uppercase;letter-spacing:.05em">Read Full Bio &rarr;</button>
          </div>
        </div>
      </div>
      <div class="feat-card" style="padding:0;overflow:hidden;text-align:center;display:flex;flex-direction:column;border-radius:1rem">
        <img src="/assets/images/other/img-9be8676593.jpg" alt="Mr. Pranav Bagga" style="width:200px;height:200px;border-radius:50%;object-fit:cover;object-position:center top;display:block;margin:2.5rem auto 0;box-shadow:0 8px 24px rgba(0,0,0,0.12)" loading="lazy">
        <div style="padding:2rem 2rem 2.5rem;flex:1;display:flex;flex-direction:column">
          <h3 style="font-size:1.25rem;font-weight:900;margin:0 0 .3rem;letter-spacing:-.01em">Mr. Pranav Bagga</h3>
          <div style="font-size:.8rem;color:var(--red);font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin-bottom:1.5rem">Co-Founder &middot; Operations &amp; Delivery</div>
          <div style="text-align:left;position:relative;flex:1">
            <p class="founder-bio" style="font-size:.92rem;color:var(--z600);line-height:1.75;margin:0;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden">Pranav has lived and breathed sports, health and fitness his whole life. What started as a personal passion became a professional calling &mdash; and eventually, a business case. Too often, he saw Indian facilities commissioned with beautiful renders and then handed over half-finished, with no one to call when something broke. A Bachelor of Business Administration (BBA) from Kingston University London gave him the commercial lens; a decade of hands-on project work gave him the craft. Today, Pranav runs operations at TechFit &mdash; translating every brief into a space-planned, revenue-ready facility, managing delivery from concept through commissioning, and owning the relationship long after the last crate is unboxed. Gyms, wellness suites, padel courts, boxing rings &mdash; if it's been installed on a TechFit invoice, Pranav's team has a check-in schedule for it.</p>
            <button onclick="this.previousElementSibling.style.display='block';this.style.display='none'" style="background:none;border:none;color:var(--red);font-size:.85rem;font-weight:800;padding:0;margin-top:1rem;cursor:pointer;text-transform:uppercase;letter-spacing:.05em">Read Full Bio &rarr;</button>
          </div>
        </div>
      </div>
    </div>
    <p style="text-align:center;margin-top:2.5rem;font-size:1rem;color:var(--z600);line-height:1.8;max-width:760px;margin-left:auto;margin-right:auto;font-style:italic">Together, Ali Asgar and Pranav have built TechFit around a simple idea: the Indian market deserves a single, accountable partner for gym, wellness and sports infrastructure &mdash; one that manufactures, distributes, designs, installs, and services. From a Mumbai workshop to 800+ installations delivered across India, every project ships under one invoice, one project manager, and one phone number.</p>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Founders&rsquo; Conversation</span>
      <h2 class="sec-title">HEAR THE STORY, STRAIGHT FROM ALI &amp; PRANAV</h2>
      <p class="sec-sub">Watch Ali Asgar and Pranav talk about TechFit &mdash; the vision, the journey, the manufacturing floor, the brand partnerships, and what we bring to every gym, hotel and arena we build.</p>
    </div>
    <div style="max-width:900px;margin:2.5rem auto 0">
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;background:#000;border:1px solid var(--z200)">
        <iframe src="https://www.youtube.com/embed/iepAaopPbtI" title="TechFit Founders&apos; Conversation" frameborder="0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"></iframe>
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">What We Do</span>
      <h2 class="sec-title">ONE STOP SHOP FOR GYM, WELLNESS &amp; SPORTS INFRASTRUCTURE</h2>
    </div>
    <div class="pillars" style="margin-top:2.5rem">
      <div class="pillar">
        <div class="pillar-num">01</div>
        <h3>Equipment Sourcing</h3>
        <p>Reseller for BH Fitness, Tunturi and California Fitness &mdash; covering every commercial and residential budget segment.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">02</div>
        <h3>In-House Manufacturing</h3>
        <p>MMA cages, boxing rings, CrossFit &amp; calisthenics rigs, free weights, power racks, dumbbells and aqua fitness equipment &mdash; fabricated at our Byculla facility.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">03</div>
        <h3>Wellness &amp; Recovery</h3>
        <p>Integrated longevity, recovery and aesthetics technology from Alteon &mdash; hyperbaric chambers, cryotherapy, red-light therapy and more.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">04</div>
        <h3>Sports Infrastructure</h3>
        <p>Padel courts, pickleball courts, boxing rings and custom combat-sports environments for fight leagues, academies and luxury clubs.</p>
      </div>
      <div class="pillar">
        <div class="pillar-num">05</div>
        <h3>Turnkey Delivery</h3>
        <p>Design, supply, installation, AMC and after-sales &mdash; all co-ordinated by a single TechFit project manager, on one invoice.</p>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-dark">
  <section class="sec-in">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center" class="rsp-1col">
      <div>
        <span class="sec-label" style="color:var(--red)">Sister Concern</span>
        <div style="background:#fff;padding:1.1rem 1.5rem;border-radius:.4rem;display:inline-block;margin-top:.5rem;margin-bottom:1.2rem"><img src="/assets/images/other/img-aea4e380c8.png" alt="TechFit Active" style="height:4.5rem;width:auto;display:block" loading="lazy"></div>
        <h2 class="sec-title white" style="margin-top:.4rem">TECHFIT ACTIVE</h2>
        <p class="sec-sub white" style="margin-top:1rem">Our sister company, TechFit Active, operates and manages gyms on behalf of residential communities, corporates and hotels &mdash; from staffing and programming to equipment maintenance. If you need a managed gym, not just an installed one, we can run it end-to-end.</p>
        <a href="https://www.techfitactive.com/" target="_blank" rel="noopener" class="btn-red" style="display:inline-block;text-decoration:none;margin-top:1.5rem">Visit TechFit Active &rarr;</a>
      </div>
      <div style="background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.25);padding:2rem;border-radius:.6rem">
        <h4 style="font-size:.95rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#fff;margin-bottom:1rem">TechFit Active Services</h4>
        <ul style="list-style:none;padding:0;margin:0">
          <li style="padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);font-size:.9rem">Manages gyms for residential clubhouses &amp; gyms, corporates and hotels</li>
          <li style="padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);font-size:.9rem">Certified trainers &amp; group class programming</li>
          <li style="padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);font-size:.9rem">SOPs, maintenance and member experience</li>
          <li style="padding:.5rem 0;color:rgba(255,255,255,.75);font-size:.9rem">Monthly reporting &amp; member satisfaction tracking</li>
        </ul>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center">
      <span class="sec-label">Who We Serve</span>
      <h2 class="sec-title">ONE PARTNER. EVERY SEGMENT.</h2>
    </div>
    <div class="pillars" style="margin-top:2.5rem">
      <div class="pillar"><h3>Commercial Gyms</h3><p>Boutique studios, franchise gyms, large-format gyms, CrossFit boxes and MMA academies.</p></div>
      <div class="pillar"><h3>Real Estate Developers</h3><p>Residential tower amenity gyms, co-living projects, IT parks and mixed-use developments.</p></div>
      <div class="pillar"><h3>Hotels &amp; Resorts</h3><p>3, 4 and 5-star hotel fitness centres, wellness floors and guest recovery suites.</p></div>
      <div class="pillar"><h3>Schools &amp; Institutions</h3><p>Schools, colleges, universities, defence facilities and government institutions.</p></div>
      <div class="pillar"><h3>Fight Leagues &amp; Academies</h3><p>Matrix Fight Night, Super Fight League, Kumite 1, MMA Matrix and other combat-sports organisations.</p></div>
      <div class="pillar"><h3>Wellness &amp; Longevity Centres</h3><p>Recovery clinics, hotel wellness floors, longevity labs and aesthetic studios &mdash; Alteon hyperbaric, cryo, red-light and IHHT, integrated end-to-end.</p></div>
    </div>
  </section>
</section>

${ctaBand("Let&#x2019;s Plan Your Facility", "One phone call. One walk-through. One proposal. That&#x2019;s how simple setting up your facility should be.", "Book a Free Consultation")}
${footer()}
`;
    }

    // ── CONTACT PAGE ───────────────────────────────────────────────────────────────

    // ── BLOGS ─────────────────────────────────────────────────────────────────────
    

    function renderBlogs() {
      return `
<div class="phero">
  <section class="sec-in">
    <div class="phero-label">TechFit Insights</div>
    <h2>BLOG &amp; CASE STUDIES</h2>
    <p class="phero-sub">Stories from the workshop floor and the arena. Combat-sports installations, gym-fit-out playbooks, and what we&#x2019;ve learned building 800+ installations across India.</p>
  </div>
</div>

<section class="sec sec-gray">
  <div class="sec-in">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:2rem">
      ${BLOG_POSTS.map(p => `
        <article class="blog-card reveal" onclick="go('blog-'+'${p.slug}')" style="cursor:pointer;background:#fff;overflow:hidden;border:1px solid var(--z200);display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s">
          <img src="${p.image}" alt="${p.title}" style="width:100%;height:220px;object-fit:cover" loading="lazy">
          <div style="padding:1.5rem;display:flex;flex-direction:column;flex:1">
            <div style="display:flex;align-items:center;gap:.8rem;margin-bottom:.8rem">
              <span style="font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:var(--red);background:var(--red-10);padding:.25rem .6rem">${p.category}</span>
              <span style="font-size:.75rem;color:var(--z500)">${p.date}</span>
              <span style="font-size:.75rem;color:var(--z500)">· ${p.readTime}</span>
            </div>
            <h3 style="font-size:1.1rem;font-weight:900;line-height:1.35;margin:0 0 .8rem;color:var(--black)">${p.title}</h3>
            <p style="font-size:.88rem;color:var(--z600);line-height:1.7;margin:0 0 1.2rem;flex:1">${p.excerpt}</p>
            <button class="segment-cta" style="margin-top:auto;align-self:flex-start" onclick="event.stopPropagation();go('blog-'+'${p.slug}')">READ MORE &rarr;</button>
          </div>
        </article>
      `).join('')}
    </div>
  </section>
</section>

${ctaBand('Planning Your Own Fight-League Ready Facility?', 'Our team has delivered cages, rings and fit-outs for India\'s top combat-sports promotions.', 'Talk to Our Team')}
${footer()}
`;
    }

    

    function renderBlog(slug) {
      // Return a placeholder structure, then fetch and inject markdown
      setTimeout(async () => {
        try {
          const res = await fetch('/assets/blogs/' + slug + '.md');
          if (res.ok) {
            const md = await res.text();
            document.getElementById('blog-content-body').innerHTML = marked.parse(md);
          } else {
            document.getElementById('blog-content-body').innerHTML = '<p>Blog post not found.</p>';
          }
        } catch (e) {
          
        }
      }, 0);
      
      const post = BLOG_POSTS.find(p => p.slug === slug) || { title: '', category: '', date: '', readTime: '', image: '' };
      
      return `
<div class="phero" style="padding:5rem 1.5rem">
  <section class="sec-in" style="max-width:860px;margin:0 auto;text-align:center">
    <div class="phero-label">${post.category} &middot; ${post.date} &middot; ${post.readTime}</div>
    <h1 style="font-size:clamp(1.6rem,3.8vw,2.8rem);line-height:1.2">${post.title}</h1>
  </div>
</div>

<section class="sec">
  <div class="sec-in" style="max-width:860px;margin:0 auto">
    <img src="${post.image}" alt="${post.title}" style="width:100%;max-height:480px;object-fit:cover;margin-bottom:2.5rem;border-radius:.25rem" loading="lazy">
    <div id="blog-content-body" class="blog-body" style="font-size:1rem;line-height:1.85;color:var(--z700)">
      <!-- Markdown will be injected here -->
      Loading...
    </div>
    <div style="display:flex;justify-content:center;gap:1rem;margin-top:3rem;flex-wrap:wrap">
      <button class="btn-red" onclick="go('contact')">Start Your Project</button>
      <button class="btn-outline" onclick="go('blogs')">&larr; Back to Blog</button>
    </div>
  </section>
</section>
${footer()}
      `;
    }



    // ── GYM RUBBER FLOORING ──────────────────────────────────────────────────────
    function renderFlooring() {
      return `
<div class="phero" style="background:linear-gradient(135deg,#09090b 55%,#1a0a00)">
  <section class="sec-in">
    <div class="phero-label">TechFit Flooring &middot; Commercial Grade</div>
    <h2>GYM RUBBER FLOORING<br>&amp; SPORTS SURFACES</h2>
    <p class="phero-sub">Heavy-duty rubber floor tiles engineered for commercial gyms, CrossFit boxes, free-weight zones, functional training floors and sports facilities. 10 mm to 50 mm thickness, interlocking or seamless installation.</p>
    <div style="display:flex;gap:1rem;flex-wrap:wrap">
      <button class="btn-red" onclick="go('contact')">Request Flooring Quote</button>
      <button class="btn-outline" onclick="go('contact')">Get Samples</button>
    </div>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Why TechFit Flooring</span><h2 class="sec-title">BUILT FOR HEAVY IMPACT. BUILT TO LAST.</h2></div>
    <div class="feat-grid">
      <div class="feat-card"><h4>10 mm &ndash; 50 mm Thickness Options</h4><p>Choose the right thickness for your application: 10 mm and 12 mm for cardio &amp; functional zones, 15 mm&ndash;20 mm for free-weights, 25 mm&ndash;50 mm for deadlift platforms and heavy drop zones.</p></div>
      <div class="feat-card"><h4>Interlocking &amp; Seamless</h4><p>Interlocking puzzle tiles for fast installation, tool-free reconfiguration, and easy replacement. Seamless vulcanised rolls for a premium continuous finish.</p></div>
      <div class="feat-card"><h4>Vulcanised Virgin Rubber</h4><p>High-density vulcanised virgin rubber with EPDM colour fleck or solid black finish. Dimensionally stable. Does not shrink, curl or lift over time.</p></div>
      <div class="feat-card"><h4>Noise &amp; Vibration Dampening</h4><p>Multi-layer sound absorption dramatically reduces noise from dropped weights. Ideal for residential buildings, hotel gyms, and multi-storey facilities.</p></div>
      <div class="feat-card"><h4>Slip-Resistant &amp; Hygienic</h4><p>Textured anti-slip surface. Closed-cell rubber does not absorb sweat, bacteria or moisture. Simple mop-and-go maintenance.</p></div>
      <div class="feat-card"><h4>Full Colour Range</h4><p>Solid black, black with grey / red / blue / green EPDM fleck, full colour solids, and custom colour matching for branded facilities.</p></div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Tile Thickness Guide</span><h2 class="sec-title">CHOOSE THE RIGHT THICKNESS</h2></div>
    <div class="lineup-grid">
      <div class="lineup-card reveal" onclick="go('contact')">
        <div class="lineup-card-body" style="padding:2rem">
          <div class="lineup-chip">Light Use</div>
          <h3>10 &ndash; 12 mm Tiles</h3>
          <p>Ideal for cardio zones, functional training floors, studio spaces, stretching areas and Pilates rooms. Comfortable underfoot; protects sub-floor from treadmill &amp; equipment traffic.</p>
          <ul class="spec-list">
            <li>Interlocking or seamless</li>
            <li>Solid black or EPDM fleck</li>
            <li>Suitable for cardio / functional zones</li>
            <li>Minimal impact dampening</li>
          </ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <div class="lineup-card-body" style="padding:2rem">
          <div class="lineup-chip best-seller-chip">Best Seller</div>
          <h3>15 &ndash; 20 mm Tiles</h3>
          <p>The most popular commercial thickness. Suits the majority of gym floors &mdash; strength zones, functional training, CrossFit boxes, MMA academies and residential amenity gyms.</p>
          <ul class="spec-list">
            <li>Interlocking puzzle tiles (1 m &times; 1 m)</li>
            <li>Vulcanised virgin rubber</li>
            <li>Excellent impact dampening</li>
            <li>Black and EPDM fleck options</li>
          </ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>

      <div class="lineup-card reveal" onclick="go('contact')">
        <div class="lineup-card-body" style="padding:2rem">
          <div class="lineup-chip">Heavy Drop Zone</div>
          <h3>25 &ndash; 50 mm Tiles</h3>
          <p>Maximum shock absorption for deadlift platforms, Olympic lifting zones, CrossFit drop zones and powerlifting facilities. Protects concrete sub-floors from the heaviest drops.</p>
          <ul class="spec-list">
            <li>Typically 25 mm, 30 mm, 40 mm, 50 mm</li>
            <li>Heavy-duty vulcanised rubber</li>
            <li>Seamless tiles or roll format</li>
            <li>Maximum noise &amp; vibration reduction</li>
          </ul>
          <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
        </div>
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Tile Formats</span><h2 class="sec-title">INTERLOCKING OR SEAMLESS &mdash; YOU CHOOSE</h2></div>
    <div class="compare">
      <div class="compare-card">
        <div class="compare-chip">Puzzle / Interlocking</div>
        <h3 style="margin-top:0">Interlocking Rubber Tiles</h3>
        <p>Tool-free installation. Tiles interlock puzzle-style for fast install, easy reconfiguration and simple tile replacement. Ideal for areas that may need future reconfiguration.</p>
        <ul class="spec-list" style="margin-top:1rem">
          <li>1 m &times; 1 m or 50 cm &times; 50 cm modules</li>
          <li>Thickness: 10 mm, 12 mm, 15 mm, 20 mm, 25 mm</li>
          <li>Installation: dry-lay, no glue required</li>
          <li>Perfect for leased spaces and temporary setups</li>
        </ul>
        <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
      </div>
      <div class="compare-card">
        <div class="compare-chip">Seamless</div>
        <h3 style="margin-top:0">Seamless Rubber Tiles &amp; Rolls</h3>
        <p>Premium monolithic finish for commercial facilities. Vulcanised rubber rolls or bonded tiles create a seamless floor with a clean, premium aesthetic and zero joints.</p>
        <ul class="spec-list" style="margin-top:1rem">
          <li>Rolls: 1.25 m wide, 6&ndash;15 m length</li>
          <li>Thickness: 6 mm, 8 mm, 10 mm (rolls)</li>
          <li>Installation: adhered to sub-floor</li>
          <li>Best aesthetic finish for premium facilities</li>
        </ul>
        <button class="lineup-cta" onclick="go('contact')">GET QUOTE &rarr;</button>
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Colour Range</span><h2 class="sec-title">RUBBER FLOORING SHADES</h2><p class="sec-sub">From solid commercial black to EPDM colour flecks and full-colour solids &mdash; match your facility branding.</p></div>
    <div style="margin-top:2rem">
      <img src="/assets/images/other/img-7b195b3ffd.jpg" alt="TechFit Gym Rubber Flooring colour range" style="width:100%;max-height:720px;object-fit:contain;display:block;border-radius:.4rem;background:#fff;padding:1rem" loading="lazy">
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Technical Specifications</span><h2 class="sec-title">POWERFUL SERIES &mdash; COMMERCIAL RUBBER ROLLS</h2></div>
    <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2.5rem;align-items:center" class="rsp-1col">
      <div>
        <p style="color:var(--z600);line-height:1.8;font-size:.95rem;margin-bottom:1.5rem">High-performance gym rubber rolls designed for durability and impact resistance. Black base with 20% White EPDM sparkles for a modern, professional gym finish. Seamless joint installation creates a smooth, continuous surface for both aesthetics and performance.</p>
        <table style="width:100%;font-size:.88rem;border-collapse:collapse">
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700);width:40%">Material</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">20% EPDM + Recycled Rubber</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Roll Size</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">1 m &times; 10 m (107.64 sq ft)</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Thickness Options</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">6 mm / 8 mm / 10 mm</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Density</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">1,150 kg/m&sup2;</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Tensile Strength</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">374 psi</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Tear Strength</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">17.8 kN/m</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Slip Resistance</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">Dry &gt; 1.00 / &gt; 0.3 &micro;</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Impact Sound Reduction</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">19 dB (8 mm)</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Thermal Resistance</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">0.043 (m&sup2;&middot;K)/W</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Electrical Behaviour</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">&lt; 2 kV</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Fire Rating</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">E<sub>fl</sub></td></tr>
          <tr><td style="padding:.45rem .6rem;font-weight:700;color:var(--z700)">Heavy Metal Content</td><td style="padding:.45rem .6rem;color:var(--z600)">Pass</td></tr>
        </table>
      </div>
      <div>
        <img src="/assets/images/other/img-c3ce8249ad.jpg" alt="Powerful Rubber Rolls" style="width:100%;height:auto;border-radius:.3rem;box-shadow:0 4px 20px rgba(0,0,0,.08)" loading="lazy">
      </div>
    </div>
  </section>
</section>

<section class="sec sec-gray">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">PVC Sports Surfaces</span><h2 class="sec-title">JOYFUL PVC MULTIPURPOSE FLOORING</h2></div>
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:2.5rem;align-items:center" class="rsp-1col">
      <div>
        <img src="/assets/images/other/img-7e38d36a68.jpg" alt="Joyful PVC Flooring Gemstone Series" style="width:100%;height:auto;border-radius:.3rem;box-shadow:0 4px 20px rgba(0,0,0,.08)" loading="lazy">
      </div>
      <div>
        <p style="color:var(--z600);line-height:1.8;font-size:.95rem;margin-bottom:1.5rem">Joyful PVC multipurpose sports flooring in the Gemstone Series. Aesthetic, durable, and ideal for multipurpose sports halls, basketball courts, badminton courts, indoor football and school sports floors.</p>
        <div class="feat-grid" style="grid-template-columns:1fr 1fr">
          <div class="feat-card"><h4>Gemstone Series</h4><p>Textured patterned finish with high-impact performance. Available in 4.5 mm and 6.0 mm thickness.</p></div>
          <div class="feat-card"><h4>Roll Size</h4><p>1.8 m wide &times; 15 m long. Joint-welded for continuous seamless look.</p></div>
          <div class="feat-card"><h4>Wooden Series</h4><p>Wood-look PVC flooring in 4.5 to 6.0 mm thickness. Ideal for premium sports halls and multi-use studios.</p></div>
          <div class="feat-card"><h4>Colour Range</h4><p>Available in emerald green, red, grey, blue, orange, and wood-grain finishes with custom colour matching.</p></div>
        </div>
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Synthetic Turf</span><h2 class="sec-title">POWERFUL HIGH-RESILIENCE TURF</h2></div>
    <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:2.5rem;align-items:center" class="rsp-1col">
      <div>
        <p style="color:var(--z600);line-height:1.8;font-size:.95rem;margin-bottom:1.5rem">High-resilience turf in a curled double-helix woven structure. Made from high-polymer PE materials with excellent weather resistance, superior wear resistance, and long-life performance. Perfect for sled tracks, kids&#x2019; play zones, CrossFit functional strips, playgrounds and outdoor fitness.</p>
        <table style="width:100%;font-size:.88rem;border-collapse:collapse">
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700);width:40%">Pile Height</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">15 mm +/-</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Dtex</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">6,500</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Stitches</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">10 / 31 cm</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Density</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">63,000</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Gauge</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">3/16"</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Yarn</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">PE</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Backing</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">SPU Backing + Eco-SPU glue coating</td></tr>
          <tr><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);font-weight:700;color:var(--z700)">Warranty</td><td style="padding:.45rem .6rem;border-bottom:1px solid var(--z100);color:var(--z600)">5 years</td></tr>
          <tr><td style="padding:.45rem .6rem;font-weight:700;color:var(--z700)">Usage</td><td style="padding:.45rem .6rem;color:var(--z600)">Indoor / Outdoor</td></tr>
        </table>
      </div>
      <div>
        <img src="/assets/images/other/img-a745107373.jpg" alt="Powerful High Resilience Turf" style="width:100%;height:auto;border-radius:.3rem;box-shadow:0 4px 20px rgba(0,0,0,.08)" loading="lazy">
      </div>
    </div>
  </section>
</section>

<section class="sec">
  <section class="sec-in">
    <div class="sec-hdr center"><span class="sec-label">Additional Flooring Solutions</span><h2 class="sec-title">BEYOND RUBBER TILES</h2></div>
    <div class="feat-grid">
      <div class="feat-card"><h4>Artificial Turf / Astro Turf</h4><p>Sled push and functional training strips. 40 mm&ndash;60 mm synthetic turf for indoor functional zones and sled tracks. Custom lengths and widths.</p></div>
      <div class="feat-card"><h4>Acoustic Underlay</h4><p>Additional acoustic underlay beneath rubber tiles for heavy drop zones in multi-storey buildings, hotels and residential projects.</p></div>
      <div class="feat-card"><h4>Interlocking EVA Foam</h4><p>Ultra-light EVA foam tiles for Pilates studios, yoga rooms and kids&#x2019; zones. Low-cost, comfortable, colour options.</p></div>
      <div class="feat-card"><h4>Commercial Vinyl</h4><p>Sports vinyl for courts, aerobic studios and group-exercise spaces. Excellent wear performance and smooth clean finish.</p></div>
    </div>
  </section>
</section>

<section class="sec sec-gray"><section class="sec-in">
  <div class="sec-hdr center"><span class="sec-label">FAQ</span><h2 class="sec-title">COMMON QUESTIONS</h2></div>
  <div class="faq">
    ${faqItem('What thickness of rubber flooring do I need?', '10 mm&ndash;12 mm is fine for cardio and functional zones. 15 mm&ndash;20 mm is the commercial standard for most strength floors. 25 mm&ndash;50 mm is required for deadlift platforms, heavy drop zones and Olympic-lifting areas.')}
    ${faqItem('What&#x2019;s the difference between interlocking and seamless?', 'Interlocking tiles install tool-free (puzzle-fit) and are easily replaced or reconfigured. Seamless tiles/rolls are bonded to the sub-floor for a monolithic premium look but are less flexible once installed.')}
    ${faqItem('Can you do custom colours or branding?', 'Yes. EPDM colour fleck options, full-colour solids, and custom colour matching are all available. We can also include gym logos inlaid into deadlift platforms and reception entryways.')}
    ${faqItem('What is the warranty?', 'Commercial warranties typically range from 5 to 10 years depending on tile type and thickness. Residential installations carry a lifetime structural warranty.')}
    ${faqItem('Do you handle installation?', 'Yes. We provide full installation across India, including sub-floor preparation, cut-to-fit, adhesion for seamless formats, and site commissioning.')}
    ${faqItem('How much does gym rubber flooring cost?', 'Pricing depends on thickness, format and coverage. Indicative ranges: 10 mm tiles from &#x20B9;70/sq ft, 15 mm from &#x20B9;95/sq ft, 25 mm from &#x20B9;140/sq ft, 40 mm from &#x20B9;220/sq ft. Bulk-order pricing available.')}
  </div>
</div></section>

${ctaBand('Floor Your Facility with Confidence', 'From entry-level 10 mm tiles to premium 50 mm deadlift zones &mdash; we spec, supply and install the right floor for your facility.', 'Get a Flooring Quote', 'contact')}
${footer()}
`;
    }


    function renderContact() {
      return `
<div class="phero">
  <div class="sec-in">
    <div class="phero-label">Free Consultation</div>
    <h2>PLAN YOUR FACILITY</h2>
    <p class="phero-sub">Tell us about your project. We'll assess your space, recommend the right equipment and layout, and give you a detailed proposal — at no cost.</p>
  </div>
</div>

<section class="sec">
  <div class="sec-in">
    <div class="contact-grid">
      <div class="contact-info">
        <h3>Get in Touch</h3>
        <a href="tel:+919820166910" class="ci-link">
          <span class="ci-icon">📞</span>
          <div class="ci-text"><strong>+91 98201 66910</strong><br>Mon–Sat, 9am–6pm IST</div>
        </a>
        <a href="https://wa.me/919820166910?text=Hi%20TechFit!" target="_blank" rel="noopener" class="ci-link">
          <span class="ci-icon">💬</span>
          <div class="ci-text"><strong>WhatsApp</strong><br>Quick response on +91 98201 66910</div>
        </a>
        <a href="mailto:info@techfitactive.com" class="ci-link">
          <span class="ci-icon">✉️</span>
          <div class="ci-text"><strong>info@techfitactive.com</strong><br>We respond within 24 hours</div>
        </a>
        <a href="https://share.google/IahWbxIMm9ywKR9qp" target="_blank" rel="noopener" class="ci-link">
          <span class="ci-icon">📍</span>
          <div class="ci-text"><strong>TechFit</strong><br>Plot No 309, Coal Bunder Road E,<br>Reay Road, Darukhana,<br>Mumbai, Maharashtra 400010</div>
        </a>
        <br>
        <div class="feat-card"><h4>What happens next?</h4><p>After you submit, our team will call within one business day to understand your requirements and schedule a free consultation. No sales pressure — just expert advice.</p></div>
      </div>
      <div>
        <form id="contactForm" class="contact-form" onsubmit="event.preventDefault();submitContact();return false;">
          <h3>Send an Enquiry</h3>
          <input type="text" id="cf-name" name="name" placeholder="Your Name / Gym Name *">
          <input type="tel" id="cf-phone" name="phone" placeholder="Phone Number *">
          <input type="email" id="cf-email" name="email" placeholder="Email Address *">
          <select id="cf-type" name="facility_type">
            <option value="">Type of Facility *</option>
            <option>Commercial Gym / Studio</option>
            <option>Residential Development</option>
            <option>Hotel / Hospitality</option>
            <option>School / Institution</option>
            <option>Corporate Office</option>
            <option>MMA / Combat Sports Academy</option>
            <option>Wellness / Recovery / Longevity Centre</option>
            <option>Other</option>
          </select>
          <input type="text" id="cf-location" name="location" placeholder="City / Location *">
          <textarea id="cf-msg" name="message" rows="4" placeholder="Tell us about your requirements — size of space, budget range, preferred brands, timeline…"></textarea>
          <input type="hidden" name="_subject" value="TechFit Website Enquiry">
          <input type="hidden" name="_template" value="table">
          <input type="text" name="_honey" value="" style="display:none">
          <button type="submit" class="btn-red" style="width:100%;padding:1rem">Get a Free Consultation →</button>
        </form>
      </div>
    </div>
  </section>
</section>

<section class="sec" style="background:#f8f9fa;border-top:1px solid #eee;padding:4rem 0;">
  <section class="sec-in">
    <div style="text-align:center;margin-bottom:2.5rem;">
      <span class="sec-label" style="display:inline-block;color:var(--red);font-weight:700;font-size:0.85rem;letter-spacing:2px;text-transform:uppercase;margin-bottom:0.5rem;">Local Workshop &amp; Offices</span>
      <h3 style="font-size:2rem;margin-bottom:0.75rem;color:#111;font-weight:800;font-family:'Outfit',sans-serif;">VISIT OUR MUMBAI HEADQUARTERS</h3>
      <p style="color:#666;max-width:600px;margin:0 auto;font-size:0.95rem;line-height:1.6;">Our in-house custom steel fabrication facility, design studio, and primary product inventory showroom are located in Byculla. Schedule a visit to discuss your facility planning.</p>
    </div>
    <div style="border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);height:420px;background:#eee;border:1px solid #eee;">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.078440788647!2d72.84196147610072!3d18.977558682121303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf46e5ca113b%3A0x6b6d2be9b6a9fe2f!2s309%2C%20Boat%20Hard%20Rd%2C%20Darukhana%2C%20Byculla%2C%20Mumbai%2C%20Maharashtra%20400010!5e0!3m2!1sen!2sin!4v1716900000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</section>
${footer()}`;
    }

    // ── MODAL ──────────────────────────────────────────────────────────────────────
    function openModal(slug, brandName) {
      const p = PRODUCTS.find(x => x.s === slug && x.b === brandName);
      if (!p) return;
      if (typeof gtag === 'function') {
        gtag('event', 'view_item', {
          items: [{ item_name: p.n, item_brand: p.b, item_category: p.c }]
        });
      }
      document.getElementById('m-title').textContent = p.n;
      document.getElementById('m-brand').textContent = p.b + ' — ' + p.c;
      const img = document.getElementById('m-img');
      img.src = p.img || ''; img.style.display = p.img ? 'block' : 'none';
      // Gallery thumbnails: if p.imgs array present, render clickable thumbnails below hero
      const galWrap = document.getElementById('m-gallery');
      if (galWrap) {
        galWrap.innerHTML = '';
        if (p.imgs && p.imgs.length) {
          const all = [p.img, ...p.imgs].filter(Boolean);
          all.forEach((src, idx) => {
            const t = document.createElement('button');
            t.className = 'm-thumb' + (idx === 0 ? ' active' : '');
            t.innerHTML = `<img src="${src}" alt="${p.n}" loading="lazy">`;
            t.onclick = () => {
              img.src = src;
              galWrap.querySelectorAll('.m-thumb').forEach(el => el.classList.remove('active'));
              t.classList.add('active');
            };
            galWrap.appendChild(t);
          });
          galWrap.style.display = 'flex';
        } else {
          galWrap.style.display = 'none';
        }
      }

      // Parse description intelligently
      const desc = (p.d || '').trim();
      const parsed = parseProductDesc(desc);
      document.getElementById('m-desc').innerHTML = parsed.desc;

      const sp = document.getElementById('m-specs');
      let specsHtml = '';
      if (parsed.specs && parsed.specs.length) {
        specsHtml += '<h4>Specifications</h4><ul class="spec-ul">' + parsed.specs.map(s => `<li>${s}</li>`).join('') + '</ul>';
      }
      if (p.sp && p.sp.length) {
        specsHtml += '<div style="margin-top:1rem">' + p.sp.map(s => `<span class="spec-tag">${s}</span>`).join('') + '</div>';
      }
      sp.innerHTML = specsHtml;

      document.getElementById('modal').classList.add('open');
    }

    function parseProductDesc(text) {
      if (!text) return { desc: '', specs: [] };

      // Clean up excess whitespace but preserve structure
      text = text.replace(/\r\n/g, '\n').replace(/\n+/g, '\n').trim();

      // Try to split by bullet markers
      // Common patterns: *Something, -Something, •Something, or sentences starting with dash
      let intro = '';
      let specs = [];

      // Pattern 1: description then specs separated by bullets
      // Try to find spec list: look for items starting with * or - or •
      // Split on newlines or periods followed by * / -

      // First, split on bullet markers
      const bulletRegex = /(?:^|[\n\.])\s*[-*•]\s*/;
      const parts = text.split(bulletRegex).filter(s => s.trim());

      if (parts.length > 1) {
        // First part is intro, rest are specs
        intro = parts[0].replace(/^[-*•\s]+/, '').trim();
        specs = parts.slice(1).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length > 2);
      } else {
        // No bullet markers - check for sentences separated by periods that look like specs (e.g., "X: Y" pattern)
        intro = text;
      }

      // Clean intro - remove trailing colons, dots
      intro = intro.replace(/\.$/, '').replace(/^(The\s+)/i, 'The ').trim();

      // Further clean specs - split if there are multiple specs merged
      let cleanedSpecs = [];
      for (const s of specs) {
        // Check for multi-spec items split by periods
        if (s.length > 80 && s.includes('. ')) {
          const subparts = s.split(/\.\s+/).filter(x => x.trim().length > 2);
          for (const sub of subparts) {
            const t = sub.replace(/\.$/, '').trim();
            if (t.length > 2) cleanedSpecs.push(t);
          }
        } else {
          const t = s.replace(/\.$/, '').trim();
          if (t.length > 2) cleanedSpecs.push(t);
        }
      }

      return {
        desc: intro ? `<p style="line-height:1.75;color:#27272A">${intro}</p>` : '',
        specs: cleanedSpecs
      };
    }
    function openEnq(slug, brandName) { openModal(slug, brandName) }
    function closeModal(e) { if (e.target === document.getElementById('modal')) closeModalBtn() }
    function closeModalBtn() { document.getElementById('modal').classList.remove('open') }
    function submitEnq() {
      const btn = document.querySelector('.m-enq-btn');
      if (btn.disabled) return;
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Opening WhatsApp...';
      
      const prod = document.getElementById('m-title').textContent;
      const brand = document.getElementById('m-brand').textContent;
      const text = encodeURIComponent(`Hi TechFit! I'd like to enquire about the product: ${prod} (${brand})`);
      // Fire Google Ads conversion for WhatsApp enquiry
      fireConversion(GAW_WHATSAPP_LABEL, 'WhatsApp Enquiry (Product)');
      
      setTimeout(() => {
        window.open(`https://wa.me/919820166910?text=${text}`, '_blank');
        btn.disabled = false;
        btn.textContent = originalText;
        closeModalBtn();
      }, 500);
    }
    async function submitContact() {
      const btn = document.querySelector('.contact-form button[type="submit"]');
      if (btn.disabled) return;
      const originalText = btn.textContent;

      const name = document.getElementById('cf-name').value.trim();
      let phone = document.getElementById('cf-phone').value.trim();
      phone = phone.replace(/\D/g, '').slice(0, 10);

      const email = document.getElementById('cf-email').value.trim();
      const city = document.getElementById('cf-location').value.trim();
      const type = document.getElementById('cf-type').value;
      const msg = document.getElementById('cf-msg').value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!name || phone.length !== 10) {
        alert('Please enter your name and a valid 10-digit mobile number.');
        return;
      }

      if (!type) {
        alert('Please select the Type of Facility.');
        return;
      }

      if (!city) {
        alert('Please enter your City / Location.');
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;

      const data = {
        name: name,
        email: email,
        phone: phone,
        gymName: type,
        city: city,
        requirement: type,
        budget: "Not specified",
        message: msg || "Not provided"
      };

      try {
        const response = await fetch("https://formsubmit.co/ajax/techfitpa@gmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (!response.ok || result.success === "false") throw new Error(result.message || result.error || "Failed to send request.");
        toast('\u2713 Enquiry sent! We will call you within one business day.');
        // Fire Google Ads "Submit Lead Form" conversion
        fireConversion(GAW_FORM_LABEL, 'Contact Form');
        ['cf-name', 'cf-phone', 'cf-email', 'cf-location', 'cf-msg'].forEach(id => document.getElementById(id).value = '');
        document.getElementById('cf-type').selectedIndex = 0;

        // Save lead parameters in sessionStorage for Enhanced Conversions in GTM
        try {
          sessionStorage.setItem('lead_email', email);
          sessionStorage.setItem('lead_phone', phone);
          sessionStorage.setItem('lead_name', name);

          if (window.dataLayer) {
            window.dataLayer.push({
              'event': 'lead_submitted',
              'lead_email': email,
              'lead_phone': phone,
              'lead_name': name
            });
          }
          
        } catch (e) {
          
        }

        // Redirect to thank-you page for Enhanced Conversions tracking
        history.pushState({}, '', '/thank-you');
        page = 'thank-you';
        render();
        navActive();
        updateSEO();
      } catch (error) {
        alert(error.message || 'Our factory mail server is currently experiencing issues. Please WhatsApp us on +91 98201 66910.');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }
    function toast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg; t.className = 'toast show';
      setTimeout(() => t.className = 'toast', 2800);
    }

    function renderThankYou() {
      return `
<div class="phero">
  <section class="sec-in">
    <div class="phero-label">Thank You</div>
    <h1>ENQUIRY RECEIVED</h1>
    <p class="phero-sub" style="font-size:1.2rem;max-width:720px;">We'll call you within one business day to understand your requirements and schedule your free consultation.</p>
  </div>
</div>
<section class="sec">
  <div class="sec-in" style="text-align:center;padding:80px 20px;">
    <div class="feat-card" style="max-width:680px;margin:0 auto;padding:50px 40px;box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <h3 style="margin-bottom:20px;font-size:2.2rem;color:var(--red);">✓ You're all set!</h3>
      <p style="font-size:1.25rem;line-height:1.8;color:rgba(255,255,255,0.9);margin-bottom:24px;">
        Our team of fitness infrastructure experts will reach out shortly.<br>
        In the meantime, feel free to explore our solutions or WhatsApp us directly.
      </p>
      <div style="display:flex;gap:1.2rem;justify-content:center;margin-top:24px;flex-wrap:wrap">
        <a href="/contact" onclick="event.preventDefault();history.pushState({},'','/contact');render();" style="display:inline-block;padding:16px 36px;background:#e31e24;color:#fff;border-radius:4px;text-decoration:none;font-weight:700;font-size:1.05rem;transition:transform 0.2s ease;">← Back to Contact</a>
        <a href="https://wa.me/919820166910?text=Hi%20TechFit!%20I%20just%20submitted%20a%20form%20and%20wanted%20to%20follow%20up." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:#25D366;color:#fff;border-radius:4px;text-decoration:none;font-weight:700;font-size:1.05rem;">💬 Chat on WhatsApp</a>
      </div>
    </div>
  </section>
</section>
${footer()}`;
    }

    function renderPrivacyPolicy() {
      return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em">TechFit Compliance</div>
    <h1 style="color:#fff;font-size:2.8rem;margin:0.5rem 0">PRIVACY POLICY</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7)">Your privacy is critical to us. Learn how TechFit manages, stores, and protects your information.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.8);line-height:1.8">
  <section class="sec-in" style="max-width:800px;margin:0 auto">
    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">1. Information Collection</h3>
    <p style="margin-bottom:1.5rem">We collect information that you directly provide to us when submitting lead or quote consultation forms, including your name, email address, phone number, location, and details regarding your commercial or home gym projects. This information is gathered solely to provide personalized B2B quotes and consultation services.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">2. Use of Information</h3>
    <p style="margin-bottom:1.5rem">TechFit uses the gathered data exclusively to fulfill quote requests, establish sales contact, coordinate equipment design and layout consultations, schedule site surveys, and facilitate ongoing equipment service and Annual Maintenance Contracts (AMC).</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">3. Data Protection</h3>
    <p style="margin-bottom:1.5rem">We implement industry-standard administrative, physical, and digital security measures designed to protect your personal details against unauthorized access, loss, alteration, or disclosure. We do not sell, trade, or distribute your private lead details to any outside marketing networks.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">4. Cookies & Analytics</h3>
    <p style="margin-bottom:1.5rem">Our website uses tracking tags (including Google Analytics and Google Ads conversion tags) to measure site interactions and optimize landing page experiences. You can modify your browser settings to decline tracking cookies if preferred.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">5. Updates & Contact</h3>
    <p style="margin-bottom:2rem">This Privacy Policy may be updated periodically to align with evolving digital practices. For inquiries regarding your personal details, contact us at <strong>info@techfitactive.com</strong> or call <strong>+91 98201 66910</strong>.</p>
  </section>
</section>
${footer()}
`;
    }

    function renderTermsOfService() {
      return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em">TechFit Compliance</div>
    <h1 style="color:#fff;font-size:2.8rem;margin:0.5rem 0">TERMS OF SERVICE</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7)">Please read the terms governing the purchase, supply, custom fabrication, and installation of TechFit solutions.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.8);line-height:1.8">
  <section class="sec-in" style="max-width:800px;margin:0 auto">
    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">1. Scope of Service</h3>
    <p style="margin-bottom:1.5rem">TechFit (Techfit Health Fitness Private Limited) provides premium turnkey gym setup services, commercial fitness equipment supply (BH Fitness, Tunturi, California Fitness), custom combat sports fabrications (MMA cages, boxing rings), CrossFit rigs, and custom racket sports infrastructure (padel and pickleball court construction) across India.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">2. Orders & Specifications</h3>
    <p style="margin-bottom:1.5rem">All custom fabricated rigs, combat structures, and free weights are built to specific dimensions, brand requirements, and raw material tolerances agreed upon in writing. Order modifications submitted after structural steel cutting or painting has commenced are subject to separate revision costs.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">3. Sourcing & Lead Times</h3>
    <p style="margin-bottom:1.5rem">Lead times for custom fabrications and direct international product imports are estimated at the time of purchase and are subject to logistical factors. TechFit makes every professional effort to align fabrication and delivery timelines as promised in order specifications.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">4. Warranty & After-Sales Servicing</h3>
    <p style="margin-bottom:1.5rem">All commercial installations carry structural frame warranties. After-sales maintenance, parts sourcing, and localized Annual Maintenance Contracts (AMC) are serviced directly by TechFit engineers dispatched from our Mumbai facility across active regions.</p>

    <h3 style="color:#fff;font-size:1.4rem;margin:2rem 0 1rem">5. Governing Law</h3>
    <p style="margin-bottom:2rem">These Terms of Service and all commercial supply contracts are governed by and construed in accordance with the laws of India, subject to the jurisdiction of the courts of Mumbai, Maharashtra.</p>
  </section>
</section>
${footer()}
`;
    }

    function renderTechnogymAlternative() {
    
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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">B2B Evaluation Guide</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Technogym Commercial Equipment: In-Depth India Sourcing Guide</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">An objective analysis of premium commercial fitness equipment sourcing for luxury health clubs, hotels, and real estate developer amenities in India.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    <h2 style="color:#fff;font-size:1.8rem;margin:0 0 1.5rem">Considering a Premium Global Brand? Here is What to Evaluate</h2>
    <p style="margin-bottom:1.5rem">Setting up a commercial health club, real estate residential amenity, or five-star hotel fitness center in India is a major capital investment. When developers and gym operators evaluate high-end fitness equipment, premium international brands are routinely considered. However, securing the best equipment involves analyzing more than just name recognition. Smart business owners evaluate four critical factors: initial capital expenditure (CapEx), logistical shipping import lead times, equipment customization flexibility, and the speed and availability of localized after-sales Annual Maintenance Contracts (AMC).</p>
    
    <p style="margin-bottom:2rem">In India, importing directly from European manufacturers often introduces considerable shipping delays, customs duties, and high replacement part costs. A smart setup strategy balances premium international biomechanics with immediate local B2B support and modular structural integrity, ensuring long-term equipment uptime and superior member experiences.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2rem 0 1.5rem">When an Elite Global Importer is the Right Choice</h2>
    <p style="margin-bottom:1.5rem">Directly sourcing from world-renowned luxury fitness brands represents an excellent path for highly specific commercial projects where brand alignment is the primary criteria. These systems are well-suited for:</p>
    <ul style="margin-bottom:2rem;padding-left:1.5rem;list-style-type:disc">
      <li style="margin-bottom:0.8rem"><strong>Global Luxury Hotel Mandates:</strong> Five-star hospitality chains that maintain global corporate alignment agreements requiring specific high-end displays and displays.</li>
      <li style="margin-bottom:0.8rem"><strong>Cloud-Connected Digital Eco-systems:</strong> High-end medical clinics or specialized corporate hubs that depend on proprietary cloud software to track patient metrics globally.</li>
      <li style="margin-bottom:0.8rem"><strong>Standardized Global Configurations:</strong> Facilities that prioritize single-sourced uniformity across international locations over local customization or structural color preferences.</li>
    </ul>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1rem">Factual Commercial Sourcing Comparison</h2>
    <p style="margin-bottom:1rem">A detailed analysis of B2B equipment setup factors for Indian commercial facilities:</p>

    <style>
      .comp-table { width:100%; border-collapse:collapse; margin:2rem 0; font-size:0.9rem; text-align:left; background:#121214; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); }
      .comp-table th { background:#1a1a1d; padding:1.2rem; font-weight:600; color:#fff; border-bottom:1px solid rgba(255,255,255,0.08); }
      .comp-table td { padding:1.2rem; color:rgba(255,255,255,0.8); border-bottom:1px solid rgba(255,255,255,0.05); }
      .comp-table tr:last-child td { border-bottom:none; }
      .comp-badge-premium { background:rgba(227,30,36,0.15); color:var(--red); padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:600; display:inline-block; }
      .comp-badge-standard { background:rgba(255,255,255,0.08); color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem; display:inline-block; }
    </style>

    <table class="comp-table">
      <thead>
        <tr>
          <th>Evaluation Factor</th>
          <th>Standard Direct Import</th>
          <th>TechFit Turnkey Sourcing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Price Band</strong></td>
          <td><span class="comp-badge-standard">Ultra-Premium (Retail Markup)</span></td>
          <td><span class="comp-badge-premium">Direct-Import Value (CapEx Optimized)</span></td>
        </tr>
        <tr>
          <td><strong>Average Lead Time</strong></td>
          <td>16–24 Weeks (Sea Freight & Customs)</td>
          <td><span class="comp-badge-premium">4–8 Weeks (Ready Stock & In-House Build)</span></td>
        </tr>
        <tr>
          <td><strong>Customization & Paint</strong></td>
          <td>Standard Factory Colors Only</td>
          <td><span class="comp-badge-premium">Full Custom Color, Branding & Dimensions</span></td>
        </tr>
        <tr>
          <td><strong>Local Service & AMC</strong></td>
          <td>Third-Party Dealers (Variable Uptime)</td>
          <td><span class="comp-badge-premium">Direct Manufacturer Dispatch (24-48 HR)</span></td>
        </tr>
        <tr>
          <td><strong>Structural Steel Frame</strong></td>
          <td>Standard 2mm Steel Frames</td>
          <td><span class="comp-badge-premium">Heavy-Duty 11-Gauge (3.2mm+) Structural Steel</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">When TechFit May Suit Your B2B Facility Better</h2>
    <p style="margin-bottom:1.5rem">For operators and developers prioritizing operational uptime, high durability, and local responsiveness, TechFit provides a distinct strategic advantage. TechFit stands as India's premier B2B fitness partner by offering:</p>
    
    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">1. Direct-Import Value with Europe's Leading Biomechanics</h3>
    <p style="margin-bottom:1.5rem">TechFit is a B2B reseller of <strong>BH Fitness Spain</strong>—Europe's leading commercial gym manufacturer. This direct partnership bypasses multi-tier middleman markups, giving you world-class biomechanics, fluid movements, and cloud-connected cardio consoles at a highly optimized capital expenditure. You secure elite European engineering while conserving capital for other facility amenities.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">2. Bespoke In-House Manufacturing &amp; Customization</h3>
    <p style="margin-bottom:1.5rem">While imported brands limit you to fixed designs, TechFit operates a heavy industrial steel manufacturing facility in Mumbai. We design and build modular, heavy-duty CrossFit functional rigs, custom Olympic free weights, and competition-grade MMA cages/boxing rings to your exact site layout, custom color specifications, and club branding.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">3. Robust 11-Gauge Structural Steel Durability</h3>
    <p style="margin-bottom:1.5rem">Imported light commercial gear often compromises on frame thickness to minimize weight for shipping. TechFit custom-manufactures commercial racks and rigs using high-gauge structural steel (3mm+ thickness) with robotic welds. This delivers massive structural stability and a lifetime frame warranty capable of handling the most intense commercial athletic loads.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">4. Rapid Local AMC Dispatch and Spare Parts Stock</h3>
    <p style="margin-bottom:1.5rem">Waiting months for imported spare parts is highly damaging to a commercial gym's reputation. TechFit maintains an extensive parts repository in Mumbai. Our certified in-house engineering team is dispatched directly to your site, guaranteeing a response within 24 to 48 hours for immediate repair and AMC operations across active Indian metros.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Category Frequently Asked Questions</h2>
    
    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What is the standard lead time for high-end commercial gym equipment in India?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">For completely imported premium commercial lines, delivery times typically range from 16 to 24 weeks due to sea transport, container loading, and customs clearances. TechFit optimizes this by holding ready stock of BH Fitness cardio and manufacturing custom structural pieces at our Mumbai facility, reducing the complete setup timeline to 4–8 weeks.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>How does localized B2B service impact commercial facility operations?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Having direct, local manufacturer-backed maintenance prevents down-time that frustrates gym members. TechFit manages its own technical dispatch network and maintains full spare parts inventory in Mumbai. Instead of working through fragmented third-party dealers, you work directly with our central service team, ensuring immediate uptime.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Why is 11-gauge steel essential for commercial functional training areas?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Commercial settings subject rigs, cages, and platforms to constant, heavy kinetic loading. Standard light commercial steel (2mm thickness) will eventually bend or fatigue under extreme stress. TechFit uses thick-wall 11-gauge (3.2mm+) structural steel blocks to guarantee absolute safety, zero flex, and unmatched structural lifetime.</p>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;background:#121214;padding:3rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
      <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1rem">Plan Your Premium Turnkey Facility Today</h3>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto">Connect with a TechFit commercial layout consultant for custom layouts, 3D spatial models, direct B2B pricing models, and maintenance terms.</p>
      <button class="btn-red" onclick="go('contact')" style="padding:16px 36px;font-size:1rem;font-weight:700">Request Turnkey B2B Consultation →</button>
    </div>

  </section>
</section>
${footer()}
`;
    }

    function renderLifeFitnessAlternative() {
    
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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Commercial Gym Sourcing</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Life Fitness Sourcing Analysis: Premium India Alternatives</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">An industry perspective on commercial strength and cardio machine procurement, direct logistics, and servicing infrastructure in India.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    <h2 style="color:#fff;font-size:1.8rem;margin:0 0 1.5rem">Evaluating Commercial Strength &amp; Cardio Procurement</h2>
    <p style="margin-bottom:1.5rem">When planning high-traffic commercial gyms or luxury fitness spaces in India, choosing the right strength and conditioning equipment is the single most important decision for overall member conversion. While traditional global brands have historically dominated corporate specifications, modern operators are increasingly recognizing the high hidden costs of shipping imports, long container delays, lack of frame customization, and highly fragmented dealer networks that delay essential AMC support.</p>
    
    <p style="margin-bottom:2rem">Achieving a premium gym setup requires a smart balance of world-class biomechanics with highly durable, locally manufactured custom steel structures and reliable local AMC dispatches. By optimizing your procurement path, you protect your capital budget while ensuring your facility is highly personalized, functional, and active.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2rem 0 1.5rem">When a Standard Global Brand is the Right Choice</h2>
    <p style="margin-bottom:1.5rem">Procuring standard imported fitness equipment from classic global manufacturers is highly suitable for projects under specific criteria:</p>
    <ul style="margin-bottom:2rem;padding-left:1.5rem;list-style-type:disc">
      <li style="margin-bottom:0.8rem"><strong>Pre-Approved Real-Estate Master Plans:</strong> Large real estate developments that operate under fixed global pre-specifications that mandate a single imported supplier.</li>
      <li style="margin-bottom:0.8rem"><strong>Proprietary Digital Display Integrations:</strong> Specialized franchises that utilize custom cardio training apps synced exclusively with a single manufacturer's console.</li>
      <li style="margin-bottom:0.8rem"><strong>Non-Customized Standard Workspaces:</strong> Gyms that require only off-the-shelf standard colors and configurations, with no need for customized frame coloring or spatial rig planning.</li>
    </ul>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1rem">Factual Commercial Sourcing Comparison</h2>
    <p style="margin-bottom:1rem">A detailed B2B evaluation comparing standard imports with TechFit's customized turnkey approach:</p>

    <table class="comp-table">
      <thead>
        <tr>
          <th>Sourcing Dimension</th>
          <th>Standard Global Imports</th>
          <th>TechFit Sourcing Solutions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Procurement Method</strong></td>
          <td>Through third-party dealers (High Markups)</td>
          <td><span class="comp-badge-premium">Direct-Import + Local Manufacture</span></td>
        </tr>
        <tr>
          <td><strong>Import Timeline</strong></td>
          <td>4 to 6 Months (Ocean Freight & Duties)</td>
          <td><span class="comp-badge-premium">4 to 8 Weeks (Ready Stock & Local Build)</span></td>
        </tr>
        <tr>
          <td><strong>Frame Material</strong></td>
          <td>2mm to 2.5mm standard steel</td>
          <td><span class="comp-badge-premium">3mm to 3.5mm 11-Gauge Structural Steel</span></td>
        </tr>
        <tr>
          <td><strong>Branding & Color</strong></td>
          <td>Standard factory stock colors only</td>
          <td><span class="comp-badge-premium">Bespoke color matching & Laser-cut logos</span></td>
        </tr>
        <tr>
          <td><strong>Local AMC Services</strong></td>
          <td>Fragmented dealer dispatches</td>
          <td><span class="comp-badge-premium">Direct Mumbai factory technicians (24-48h)</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Why TechFit is a Superior Turnkey Sourcing Partner</h2>
    <p style="margin-bottom:1.5rem">TechFit provides a highly reliable, cost-effective, and fully customized alternative that ensures your gym stands out and runs without disruption:</p>
    
    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">1. Premium European Brands Backed by Local AMC</h3>
    <p style="margin-bottom:1.5rem">TechFit resells elite international brands, including Spain's premier **BH Fitness** (for commercial cardio and selectorized strength) and Finland's historic **Tunturi** (Nordic cardio and light-commercial conditioning gear). You secure the exact same high-level biomechanics, fluid motion, and display technologies as standard imports, but at direct B2B pricing, backed by direct local service.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">2. High-Gauge Steel In-House Fabrication</h3>
    <p style="margin-bottom:1.5rem">We operate a 20,000 sq ft industrial fabrication facility in Mumbai. TechFit custom-manufactures commercial Olympic barbell racks, freestanding CrossFit functional rigs, calisthenics zones, free weights, and competition-grade MMA cages. Every steel structure is built from high-gauge structural steel (11-gauge, 3mm+) with seamless robotic welding and a lifetime frame warranty.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">3. World-Class Aesthetics and Branding Freedom</h3>
    <p style="margin-bottom:1.5rem">Instead of standard black-and-grey equipment, TechFit allows you to custom-style your facility. We offer bespoke powder coating in any color, laser-cut name plates on racks, and custom anti-slip canvases for boxing rings. This lets you align your gym infrastructure perfectly with your brand identity.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">4. Fast Maintenance and Direct Engineer Support</h3>
    <p style="margin-bottom:1.5rem">Fragmented dealer networks often leave facilities stranded when individual parts break. TechFit holds an extensive inventory of components centrally in Mumbai. Our direct B2B service operates with absolute local accountability, dispatching technicians quickly to keep your commercial facility operating at 100% capacity.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Category Frequently Asked Questions</h2>
    
    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What makes European biomechanics stand out in commercial cardio?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">European brands like BH Fitness Spain invest heavily in mechanical orthopedic research. Their treadmills, ellipticals, and exercise bikes are engineered to mimic natural joint articulation, minimizing knee and lumbar impact. This delivers a smooth, pain-free cardio experience for club members across all fitness levels.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Can B2B buyers customize steel fitness frames to their exact facility layout?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Yes! TechFit provides complete 2D and 3D architectural modeling. Because we operate our own heavy manufacturing facility in Mumbai, we can modify the height, width, and functional attachments of CrossFit rigs, pull-up systems, and combat cages to fit around pillars, low ceilings, or unique spatial contours.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Why are direct-to-manufacturer dispatches critical for commercial AMCs?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Third-party dealers often lack technical certifications and direct spare part channels, leading to prolonged delays. Working directly with TechFit means you bypass brokers. Our engineers have direct access to our manufacturing warehouse, resolving mechanical issues instantly.</p>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;background:#121214;padding:3rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
      <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1rem">Upgrade Your Facility with TechFit Sourcing</h3>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto">Collaborate with our Mumbai engineering and layout team for a complete turnkey spatial plan, premium imports, and custom specifications.</p>
      <button class="btn-red" onclick="go('contact')" style="padding:16px 36px;font-size:1rem;font-weight:700">Request Turnkey B2B Consultation →</button>
    </div>

  </section>
</section>
${footer()}
`;
    }

    function renderSechristAlternative() {
    
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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Clinical Wellness Technology</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Hyperbaric Oxygen Chambers: Commercial India Sourcing Guide</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">An evaluation of premium clinical hard-shell monoplace hyperbaric chambers, localized engineering installation, and support in India.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    <h2 style="color:#fff;font-size:1.8rem;margin:0 0 1.5rem">Evaluating Clinical-Grade Hyperbaric Technology (HBOT)</h2>
    <p style="margin-bottom:1.5rem">Setting up a recovery clinic, advanced biohacking suite, luxury wellness resort, or athletic center in India requires the absolute highest standard of engineering safety. When medical directors and wellness developers evaluate clinical hard-shell monoplace hyperbaric oxygen chambers (HBOT), standard global clinical brands are often analyzed. Sourcing these specialized chambers, however, requires evaluating deep parameters: gas safety controls, ATA pressure limits, electrical layout demands, direct-import shipping times, and the absolute availability of local certified engineers for emergency maintenance.</p>
    
    <p style="margin-bottom:2rem">Because hyperbaric chambers operate under elevated pressures (1.5 to 2.0 ATA) with high-purity oxygen flows, they are subject to strict regulatory and engineering controls. Sourcing directly from overseas clinical manufacturers often brings prolonged logistics, expensive import duties, and major delays when seeking replacement valves or seals. Securing direct, local manufacturer-backed support is the primary factor for operational safety and continuous uptime.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2rem 0 1.5rem">When a Classic Global Clinical Importer is the Right Choice</h2>
    <p style="margin-bottom:1.5rem">Procuring standard clinical hyperbaric chambers from traditional overseas medical brands is suitable for specialized institutions under specific parameters:</p>
    <ul style="margin-bottom:2rem;padding-left:1.5rem;list-style-type:disc">
      <li style="margin-bottom:0.8rem"><strong>Hospital Institutional Mandates:</strong> Large tertiary hospitals that operate under specific medical equipment grants that require historically listed clinical brands.</li>
      <li style="margin-bottom:0.8rem"><strong>Established Hospital Integration:</strong> Facilities that have pre-existing centralized piping and gas distributions built around a specific imported chamber's valves.</li>
      <li style="margin-bottom:0.8rem"><strong>Global Clinical Trials:</strong> Research academic clinics that require identical equipment globally to align research metrics.</li>
    </ul>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1rem">Factual Commercial Sourcing Comparison</h2>
    <p style="margin-bottom:1rem">A detailed analysis comparing standard clinical imports against TechFit's luxury wellness technology B2B pathway:</p>

    <table class="comp-table">
      <thead>
        <tr>
          <th>Evaluation Dimension</th>
          <th>Standard Clinical Imports</th>
          <th>TechFit Alteon Sourcing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>B2B Service &amp; AMC</strong></td>
          <td>Fragmented third-party B2B brokers (High Uptime Risk)</td>
          <td><span class="comp-badge-premium">Direct Alteon India Engineering Team (24-48h)</span></td>
        </tr>
        <tr>
          <td><strong>Uptime Guarantee</strong></td>
          <td>Subject to international part logistics (Weeks to Months)</td>
          <td><span class="comp-badge-premium">Local Mumbai Spare Parts Repository (100% Uptime)</span></td>
        </tr>
        <tr>
          <td><strong>Chamber Design</strong></td>
          <td>Strictly clinical/medical aesthetics</td>
          <td><span class="comp-badge-premium">Luxury Wellness Cabin &amp; Custom Aesthetics</span></td>
        </tr>
        <tr>
          <td><strong>Sourcing &amp; Setup</strong></td>
          <td>Client manages site preparation, piping, and logistics</td>
          <td><span class="comp-badge-premium">End-to-End Site Layout, Piping &amp; Gas Setup</span></td>
        </tr>
        <tr>
          <td><strong>Pressure Capability</strong></td>
          <td>Up to 2.0 ATA standard</td>
          <td><span class="comp-badge-premium">Clinical Hard-Shell up to 2.0 ATA (Elysion Series)</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Why Alteon Wellness by TechFit is the Premier B2B Choice</h2>
    <p style="margin-bottom:1.5rem">TechFit provides a highly integrated, luxury, and safely supported alternative through our exclusive partnership with **Alteon Wellness**:</p>
    
    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">1. Clinical-Grade Safety with the Elysion Hard-Shell Series</h3>
    <p style="margin-bottom:1.5rem">Through Alteon Wellness, TechFit supplies the **Elysion Monoplace Hyperbaric Chamber**. The Elysion is a hard-shell clinical chamber operating safely at 1.5 ATA to 2.0 ATA. Engineered with high-strength structural materials, dual-sided safety valves, integrated communication systems, and clinical oxygen flow controls, it delivers the exact same safety ratings and oxygen purity as imported medical brands, but optimized for luxury wellness layouts.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">2. End-to-End B2B Site Preparation and Installation</h3>
    <p style="margin-bottom:1.5rem">Unlike clinical importers who simply drop a heavy shipping container at your door, TechFit provides comprehensive B2B setup. Our team maps your room layout, prepares specific electrical loads, integrates required oxygen concentrators, engineers proper exhaust ventilation, and conducts hands-on certified staff training, delivering a complete, ready-to-operate setup.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">3. Luxury Dark-Theme Custom Wellness Cabin Design</h3>
    <p style="margin-bottom:1.5rem">Clinical hospital chambers are styled like sterile medical tools. Alteon by TechFit designs chambers specifically for premium hotels, wellness centers, and elite athletic facilities. The Elysion features a luxury matte-dark carbon aesthetic, integrated sound systems, and comfortable interior seating, ensuring a premium experience for your clients.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">4. Immediate Local Mumbai Spare Parts &amp; Uptime Guarantee</h3>
    <p style="margin-bottom:1.5rem">A down chamber means lost revenue and broken appointments. TechFit maintains an active parts inventory at our Mumbai warehouse, including gaskets, pressure seals, display indicators, and valves. Our direct engineering support operates nationwide, providing immediate response to maintain 100% operational uptime.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Category Frequently Asked Questions</h2>
    
    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What is the difference between soft-shell and hard-shell hyperbaric chambers?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Soft-shell chambers (mild HBOT) typically operate at a maximum pressure of 1.3 ATA and are built from flexible fabrics. Clinical and sports recovery protocols often require hard-shell chambers (like the Alteon Elysion) which operate at 1.5 to 2.0 ATA. Hard-shell chambers deliver high-purity oxygen under greater atmospheric pressures, which is necessary for effective cellular gas absorption and systemic recovery.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What are the site utility requirements for installing clinical hyperbaric chambers?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Installing clinical hard-shell chambers requires dedicated electrical power outlets, proper exhaust ventilation to safely discharge high-concentration oxygen, stable floor-load capacity to support heavy-gauge steel, and space for companion oxygen concentrators. TechFit coordinates the entire mechanical, electrical, and plumbing (MEP) site survey to ensure complete safety and compliance.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Why is local engineering support critical for hyperbaric chamber operations?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Because hyperbaric chambers operate under elevated air pressures, they are subject to wear on seals, relief valves, and structural hinges. Having direct, manufacturer-backed engineers based locally ensures immediate support. TechFit operates its own nationwide service network to guarantee professional safety audits, certified parts dispatches, and zero down-time.</p>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;background:#121214;padding:3rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
      <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1rem">Design Your Advanced Recovery Suite Today</h3>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto">Collaborate with our Mumbai longevity experts for complete spatial plumbing designs, gas layouts, custom aesthetics, and AMC service terms.</p>
      <button class="btn-red" onclick="go('contact')" style="padding:16px 36px;font-size:1rem;font-weight:700">Request Turnkey B2B Consultation →</button>
    </div>

  </section>
</section>
${footer()}
`;
    }

    function renderPrecorAlternative() {
    
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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">B2B Evaluation Guide</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Precor India Commercial Gym Sourcing: In-Depth B2B Sourcing Guide</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">An objective analysis of premium commercial fitness equipment sourcing for luxury health clubs, hotels, and real estate developer amenities in India.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    <h2 style="color:#fff;font-size:1.8rem;margin:0 0 1.5rem">Considering a Premium Global Brand? Here is What to Evaluate</h2>
    <p style="margin-bottom:1.5rem">Setting up a commercial health club, real estate residential amenity, or five-star hotel fitness center in India is a major capital investment. When developers and gym operators evaluate high-end fitness equipment, premium international brands are routinely considered. However, securing the best equipment involves analyzing more than just name recognition. Smart business owners evaluate four critical factors: initial capital expenditure (CapEx), logistical shipping import lead times, equipment customization flexibility, and the speed and availability of localized after-sales Annual Maintenance Contracts (AMC).</p>
    
    <p style="margin-bottom:2rem">In India, importing directly from European or American manufacturers often introduces considerable shipping delays, customs duties, and high replacement part costs. A smart setup strategy balances premium international biomechanics with immediate local B2B support and modular structural integrity, ensuring long-term equipment uptime and superior member experiences.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2rem 0 1.5rem">When an Elite Global Importer is the Right Choice</h2>
    <p style="margin-bottom:1.5rem">Directly sourcing from world-renowned luxury fitness brands represents an excellent path for highly specific commercial projects where brand alignment is the primary criteria. These systems are well-suited for:</p>
    <ul style="margin-bottom:2rem;padding-left:1.5rem;list-style-type:disc">
      <li style="margin-bottom:0.8rem"><strong>Global Luxury Hotel Mandates:</strong> Five-star hospitality chains that maintain global corporate alignment agreements requiring specific high-end displays and displays.</li>
      <li style="margin-bottom:0.8rem"><strong>Standardized Global Configurations:</strong> Facilities that prioritize single-sourced uniformity across international locations over local customization or structural color preferences.</li>
    </ul>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1rem">Factual Commercial Sourcing Comparison</h2>
    <p style="margin-bottom:1rem">A detailed analysis of B2B equipment setup factors for Indian commercial facilities:</p>

    <table class="comp-table">
      <thead>
        <tr>
          <th>Evaluation Factor</th>
          <th>Standard Direct Import</th>
          <th>TechFit Turnkey Sourcing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Price Band</strong></td>
          <td><span class="comp-badge-standard">Ultra-Premium (Retail Markup)</span></td>
          <td><span class="comp-badge-premium">Direct-Import Value (CapEx Optimized)</span></td>
        </tr>
        <tr>
          <td><strong>Average Lead Time</strong></td>
          <td>16–24 Weeks (Sea Freight & Customs)</td>
          <td><span class="comp-badge-premium">4–8 Weeks (Ready Stock & In-House Build)</span></td>
        </tr>
        <tr>
          <td><strong>Customization & Paint</strong></td>
          <td>Standard Factory Colors Only</td>
          <td><span class="comp-badge-premium">Full Custom Color, Branding & Dimensions</span></td>
        </tr>
        <tr>
          <td><strong>Local Service & AMC</strong></td>
          <td>Third-Party Dealers (Variable Uptime)</td>
          <td><span class="comp-badge-premium">Direct Manufacturer Dispatch (24-48 HR)</span></td>
        </tr>
        <tr>
          <td><strong>Structural Steel Frame</strong></td>
          <td>Standard 2mm Steel Frames</td>
          <td><span class="comp-badge-premium">Heavy-Duty 11-Gauge (3.2mm+) Structural Steel</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">When TechFit May Suit Your B2B Facility Better</h2>
    <p style="margin-bottom:1.5rem">For operators and developers prioritizing operational uptime, high durability, and local responsiveness, TechFit provides a distinct strategic advantage. TechFit stands as India's premier B2B fitness partner by offering:</p>
    
    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">1. Direct-Import Value with Europe's Leading Biomechanics</h3>
    <p style="margin-bottom:1.5rem">TechFit is a B2B reseller of <strong>BH Fitness Spain</strong> and <strong>Tunturi Finland</strong>. This direct partnership bypasses multi-tier middleman markups, giving you world-class biomechanics, fluid movements, and cloud-connected cardio consoles at a highly optimized capital expenditure. You secure elite European engineering while conserving capital for other facility amenities.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">2. Bespoke In-House Manufacturing &amp; Customization</h3>
    <p style="margin-bottom:1.5rem">While imported brands limit you to fixed designs, TechFit operates a heavy industrial steel manufacturing facility in Mumbai. We design and build modular, heavy-duty CrossFit functional rigs, custom Olympic free weights, and competition-grade MMA cages/boxing rings to your exact site layout, custom color specifications, and club branding.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">3. Robust 11-Gauge Structural Steel Durability</h3>
    <p style="margin-bottom:1.5rem">Imported light commercial gear often compromises on frame thickness to minimize weight for shipping. TechFit custom-manufactures commercial racks and rigs using high-gauge structural steel (3mm+ thickness) with robotic welds. This delivers massive structural stability and a lifetime frame warranty capable of handling the most intense commercial athletic loads.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">4. Rapid Local AMC Dispatch and Spare Parts Stock</h3>
    <p style="margin-bottom:1.5rem">Waiting months for imported spare parts is highly damaging to a commercial gym's reputation. TechFit maintains an extensive parts repository in Mumbai. Our certified in-house engineering team is dispatched directly to your site, guaranteeing a response within 24 to 48 hours for immediate repair and AMC operations across active Indian metros.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Category Frequently Asked Questions</h2>
    
    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What makes European biomechanics stand out in commercial cardio?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">European brands like BH Fitness Spain invest heavily in mechanical orthopedic research. Their treadmills, ellipticals, and exercise bikes are engineered to mimic natural joint articulation, minimizing knee and lumbar impact. This delivers a smooth, pain-free cardio experience for club members across all fitness levels.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Can B2B buyers customize steel fitness frames to their exact facility layout?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Yes! TechFit provides complete 2D and 3D architectural modeling. Because we operate our own heavy manufacturing facility in Mumbai, we can modify the height, width, and functional attachments of CrossFit rigs, pull-up systems, and combat cages to fit around pillars, low ceilings, or unique spatial contours.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Why are direct-to-manufacturer dispatches critical for commercial AMCs?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Third-party dealers often lack technical certifications and direct spare part channels, leading to prolonged delays. Working directly with TechFit means you bypass brokers. Our engineers have direct access to our manufacturing warehouse, resolving mechanical issues instantly.</p>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;background:#121214;padding:3rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
      <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1rem">Upgrade Your Facility with TechFit Sourcing</h3>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto">Collaborate with our Mumbai engineering and layout team for a complete turnkey spatial plan, premium imports, and custom specifications.</p>
      <button class="btn-red" onclick="go('contact')" style="padding:16px 36px;font-size:1rem;font-weight:700">Request Turnkey B2B Consultation →</button>
    </div>

  </section>
</section>
${footer()}
`;
    }

    function renderMecotecAlternative() {
    
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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Clinical Wellness Technology</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Electric Cryotherapy Chambers: Mecotec India B2B Sourcing Guide</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">An evaluation of premium clinical nitrogen-free whole-body cryotherapy chambers, localized engineering installation, and support in India.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    <h2 style="color:#fff;font-size:1.8rem;margin:0 0 1.5rem">Evaluating Electric Whole-Body Cryotherapy (WBC)</h2>
    <p style="margin-bottom:1.5rem">Setting up a recovery clinic, advanced biohacking suite, luxury wellness resort, or athletic center in India requires the absolute highest standard of engineering safety. When medical directors and wellness developers evaluate electric whole-body cryotherapy chambers, standard global clinical brands are often analyzed. Sourcing these specialized chambers, however, requires evaluating deep parameters: safety configurations, electric nitrogen-free systems, operational costs, electrical layout demands, direct-import shipping times, and the absolute availability of local certified engineers for emergency maintenance.</p>
    
    <p style="margin-bottom:2rem">Because cryotherapy chambers operate under extremely low temperatures (down to -110°C to -140°C), they are subject to strict regulatory and engineering controls. Sourcing directly from overseas clinical manufacturers often brings prolonged logistics, expensive import duties, and major delays when seeking replacement parts or certified technicians. Securing direct, local manufacturer-backed support is the primary factor for operational safety and continuous uptime.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2rem 0 1.5rem">When an Elite Global Importer is the Right Choice</h2>
    <p style="margin-bottom:1.5rem">Directly sourcing from world-renowned luxury wellness brands represents an excellent path for highly specific commercial projects where brand alignment is the primary criteria. These systems are well-suited for:</p>
    <ul style="margin-bottom:2rem;padding-left:1.5rem;list-style-type:disc">
      <li style="margin-bottom:0.8rem"><strong>Hospital Institutional Mandates:</strong> Large tertiary hospitals that operate under specific medical equipment grants that require historically listed clinical brands.</li>
      <li style="margin-bottom:0.8rem"><strong>Global Clinical Trials:</strong> Research academic clinics that require identical equipment globally to align research metrics.</li>
    </ul>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1rem">Factual Commercial Sourcing Comparison</h2>
    <p style="margin-bottom:1rem">A detailed analysis comparing standard clinical imports against TechFit's luxury wellness technology B2B pathway:</p>

    <table class="comp-table">
      <thead>
        <tr>
          <th>Evaluation Dimension</th>
          <th>Standard Clinical Imports</th>
          <th>TechFit Alteon Sourcing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>B2B Service &amp; AMC</strong></td>
          <td>Fragmented third-party B2B brokers (High Uptime Risk)</td>
          <td><span class="comp-badge-premium">Direct Alteon India Engineering Team (24-48h)</span></td>
        </tr>
        <tr>
          <td><strong>Uptime Guarantee</strong></td>
          <td>Subject to international part logistics (Weeks to Months)</td>
          <td><span class="comp-badge-premium">Local Mumbai Spare Parts Repository (100% Uptime)</span></td>
        </tr>
        <tr>
          <td><strong>Chamber Design</strong></td>
          <td>Strictly clinical/medical aesthetics</td>
          <td><span class="comp-badge-premium">Luxury Wellness Cabin &amp; Custom Aesthetics</span></td>
        </tr>
        <tr>
          <td><strong>Sourcing &amp; Setup</strong></td>
          <td>Client manages site preparation, electrical parameters, and logistics</td>
          <td><span class="comp-badge-premium">End-to-End Site Layout &amp; Electric Setup</span></td>
        </tr>
        <tr>
          <td><strong>Cooling Technology</strong></td>
          <td>Standard electric cooling</td>
          <td><span class="comp-badge-premium">Nitrogen-Free 100% Safe Dry Electric Air</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Why Alteon Wellness by TechFit is the Premier B2B Choice</h2>
    <p style="margin-bottom:1.5rem">TechFit provides a highly integrated, luxury, and safely supported alternative through our exclusive partnership with <strong>Alteon Wellness</strong>:</p>
    
    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">1. 100% Safe Nitrogen-Free Cryotherapy with Cryoblast Pro</h3>
    <p style="margin-bottom:1.5rem">Through Alteon Wellness, TechFit supplies the <strong>Cryoblast Pro Whole-Body Cryotherapy Chamber</strong>. The Cryoblast Pro operates entirely on safe, dry electric air, eliminating the need for expensive and dangerous liquid nitrogen. With dual compressor technologies, comfortable interior cabins, and strict diagnostic monitoring, it provides the ultimate safe recovery environment.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">2. End-to-End B2B Site Preparation and Installation</h3>
    <p style="margin-bottom:1.5rem">Unlike clinical importers who simply drop a heavy shipping container at your door, TechFit provides comprehensive B2B setup. Our team maps your room layout, prepares specific electrical loads, manages exhaust requirements, and conducts hands-on certified staff training, delivering a complete, ready-to-operate setup.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">3. Luxury Custom Wellness Cabin Design</h3>
    <p style="margin-bottom:1.5rem">Alteon by TechFit designs chambers specifically for premium hotels, wellness centers, and elite athletic facilities. The Cryoblast Pro features dynamic interior lighting, integrated sound systems, and premium thermal doors, ensuring a premium guest experience.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">4. Immediate Local Mumbai Spare Parts &amp; Uptime Guarantee</h3>
    <p style="margin-bottom:1.5rem">A down chamber means lost revenue and broken appointments. TechFit maintains an active parts inventory at our Mumbai warehouse. Our direct engineering support operates nationwide, providing immediate response to maintain 100% operational uptime.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Category Frequently Asked Questions</h2>
    
    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Why is electric whole-body cryotherapy safer than nitrogen-based systems?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Nitrogen-based systems (cryosaunas) spray liquid nitrogen gas directly into the cabin, which poses a severe risk of asphyxiation and uneven skin burns. Electric whole-body cryotherapy chambers (like the Alteon Cryoblast Pro) utilize 100% breathable, dry electric air inside a fully closed cabin, delivering a highly uniform, completely safe cold exposure therapy.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What are the site utility requirements for installing electric cryotherapy chambers?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Installing clinical electric chambers requires dedicated 3-phase electrical power, standard exhaust ventilation to discharge thermal air, stable floor load support, and proper environmental air conditioning in the room. TechFit handles the complete site evaluation prior to delivery.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Why is local engineering support critical for cryotherapy operations?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Because these chambers operate under severe sub-zero temperatures, regular diagnostic checks and compressor tuning are required to ensure continuous performance. Sourcing through a local partner with direct engineering offices in Mumbai guarantees rapid service, local parts, and zero operational downtime.</p>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;background:#121214;padding:3rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
      <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1rem">Design Your Advanced Recovery Suite Today</h3>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto">Collaborate with our Mumbai longevity experts for complete spatial electrical designs, ventilation layouts, custom aesthetics, and AMC service terms.</p>
      <button class="btn-red" onclick="go('contact')" style="padding:16px 36px;font-size:1rem;font-weight:700">Request Turnkey B2B Consultation →</button>
    </div>

  </section>
</section>
${footer()}
`;
    }

    function renderUsiCoscoAlternative() {
    
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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Combat Sports Sourcing</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">Commercial Combat Infrastructure: USI &amp; Cosco vs TechFit Cages India</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">An evaluation of professional custom MMA cages, octagons, and competition boxing rings vs stock catalog fitness products in India.</p>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    <h2 style="color:#fff;font-size:1.8rem;margin:0 0 1.5rem">Evaluating Combat Sports Infrastructure in India</h2>
    <p style="margin-bottom:1.5rem">Setting up a professional fight academy, commercial combat fitness gym, or high-performance athletic training zone in India requires heavy structural steel infrastructure. When developers and gym operators evaluate combat rings and cages, standard catalog brands are often considered. Sourcing these heavy structures, however, requires analyzing more than generic sporting catalog lines. Operators must evaluate structural steel gauges, safety padding density, vinyl wire tension, spatial customization limits, and local structural engineering certifications.</p>
    
    <p style="margin-bottom:2rem">Because professional combat structures must withstand massive kinetic impact forces daily, stock retail catalog products can represent a safety risk. A professional combat gym setup requires custom fabrication from heavy structural steel, reinforced corner posts, high-density padding, and anti-slip canvases, bypassing imported markups while ensuring total B2B safety compliance.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2rem 0 1.5rem">When Stock Sporting Catalog Importers Are the Right Choice</h2>
    <p style="margin-bottom:1.5rem">Directly sourcing from catalog sporting goods brands represents an excellent path for light fitness settings under specific parameters:</p>
    <ul style="margin-bottom:2rem;padding-left:1.5rem;list-style-type:disc">
      <li style="margin-bottom:0.8rem"><strong>Residential Hobby Rooms:</strong> Home setups or light hobby spaces that do not host professional sparring or high-impact athletic classes.</li>
      <li style="margin-bottom:0.8rem"><strong>General Accessories:</strong> Sourcing light gloves, punch mitts, dynamic skipping ropes, and other retail accessories.</li>
    </ul>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1rem">Factual Commercial Sourcing Comparison</h2>
    <p style="margin-bottom:1rem">A detailed analysis comparing catalog imports against TechFit's bespoke B2B fabrication pathway:</p>

    <table class="comp-table">
      <thead>
        <tr>
          <th>Evaluation Factor</th>
          <th>Catalog Sporting Goods</th>
          <th>TechFit Bespoke Cages</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Price Band</strong></td>
          <td><span class="comp-badge-standard">Retail Markup (Standard sizes)</span></td>
          <td><span class="comp-badge-premium">Direct Factory Sourcing (Bespoke layouts)</span></td>
        </tr>
        <tr>
          <td><strong>Steel Post Thickness</strong></td>
          <td>Standard 2mm steel post columns</td>
          <td><span class="comp-badge-premium">Heavy-Duty 4mm+ Structural Columns</span></td>
        </tr>
        <tr>
          <td><strong>Safety Padding</strong></td>
          <td>Standard foam wraps</td>
          <td><span class="comp-badge-premium">High-Density Multi-Layer Anti-Impact Shielding</span></td>
        </tr>
        <tr>
          <td><strong>Canvases &amp; Custom Logos</strong></td>
          <td>Standard single-color stock options</td>
          <td><span class="comp-badge-premium">Bespoke Anti-Slip Canvas, Custom Team Branding</span></td>
        </tr>
        <tr>
          <td><strong>Professional Validation</strong></td>
          <td>Hobby-level usage</td>
          <td><span class="comp-badge-premium">Official Supplier: Matrix Fight Night, SFL, Kumite 1</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Why TechFit is India's Premier Combat Infrastructure Partner</h2>
    <p style="margin-bottom:1.5rem">For B2B gym operators, fight leagues, and luxury real estate amenities, TechFit provides a distinct custom manufacturing advantage:</p>
    
    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">1. Official Fight League Cage Supplier</h3>
    <p style="margin-bottom:1.5rem">TechFit is the official competition-grade MMA cage and boxing ring supplier to India's top professional combat sports promotions, including <strong>Matrix Fight Night (MFN)</strong>, <strong>Super Fight League (SFL)</strong>, and <strong>Kumite 1 League</strong>. We also equip signature celebrity gyms like Tiger Shroff's <strong>MMA Matrix</strong>. Sourcing from TechFit gives your facility the exact same professional-grade validation as top-tier televised fight promotions.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">2. Bespoke Manufacturing in Byculla, Mumbai</h3>
    <p style="margin-bottom:1.5rem">We do not sell stock boxed products. TechFit operates its own heavy-duty manufacturing and custom-fabrication facility in Byculla, Mumbai. We build custom octagons, elevated podium cages, floor-mounted training cages, and boxing rings to any exact dimensional layout, custom frame color, and facility logo scheme.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">3. Lifetime Frame Warranty</h3>
    <p style="margin-bottom:1.5rem">We construct all combat columns, framework, and base structures from heavy structural steel (4mm+ thickness) with precise robotic welds. This delivers immense load-bearing capacity and a lifetime warranty on all custom-fabricated structural steel frames, ensuring maximum athlete safety.</p>

    <h3 style="color:#fff;font-size:1.3rem;margin:1.5rem 0 0.5rem">4. Fast Delivery and Direct Service Uptime</h3>
    <p style="margin-bottom:1.5rem">Bypassing international sea freight means avoiding months of customs delays and exorbitant shipping costs for heavy steel boxes. TechFit handles direct delivery, turnkey professional installation, and localized maintenance contracts from our central Mumbai headquarters.</p>

    <h2 style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.5rem">Category Frequently Asked Questions</h2>
    
    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What structural thickness is required for a commercial MMA cage?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Commercial and competition-grade cages must utilize a minimum of 4mm+ thick structural steel tubing for all corner posts and support columns. Stock retail cages often use lighter 2mm steel which flexes and buckles under high-impact sparring, creating a major safety hazard. TechFit uses heavy-duty, robotic-welded steel columns that remain completely rigid under massive impact loads.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>Can boxing rings and MMA cages be customized to unique spatial sizes?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Yes! While traditional catalog brands sell only standardized box sizes (e.g. standard 16ft or 20ft squares), TechFit's in-house manufacturing allows us to design hex cages, octagon cages, and boxing rings to any bespoke dimensions (16ft–30ft) to fit your room's columns, low headers, or corner shapes perfectly.</p>
      </div>
    </div>

    <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.08);padding:1rem 0">
      <button class="faq-q" style="background:none;border:none;color:#fff;font-size:1.1rem;font-weight:600;width:100%;text-align:left;cursor:pointer;padding:0.5rem 0;display:flex;justify-content:space-between;align-items:center">
        <span>What makes TechFit safety padding superior to stock foam wraps?</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a" style="max-height:0;overflow:hidden;transition:max-height 0.3s ease;color:rgba(255,255,255,0.7)">
        <p style="padding:1rem 0">Standard stock foam wrap padding degrades and compacts over a few months of commercial use, exposing hard steel edges. TechFit utilizes multi-layer high-density closed-cell impact-absorbing polyurethane shielding encased in heavy-gauge reinforced vinyl covers. This ensures premium anti-impact defense that maintains its thickness and shape under the heaviest daily usage.</p>
      </div>
    </div>

    <div style="margin-top:3rem;text-align:center;background:#121214;padding:3rem 2rem;border-radius:8px;border:1px solid rgba(255,255,255,0.05)">
      <h3 style="color:#fff;font-size:1.5rem;margin-bottom:1rem">Build Your Custom Fight Venue Today</h3>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem;max-width:600px;margin-left:auto;margin-right:auto">Collaborate with our Mumbai engineering and layout team for a complete turnkey combat layout, premium frames, and custom specifications.</p>
      <button class="btn-red" onclick="go('contact')" style="padding:16px 36px;font-size:1rem;font-weight:700">Request Turnkey B2B Consultation →</button>
    </div>

  </section>
</section>
${footer()}
`;
    }

    const GUIDES_DATA = {
  'alternatives/cybex-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Cybex in India: Why Commercial Gyms Choose California Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Cybex</strong> alongside premium alternatives like <strong>California Fitness</strong>. While Cybex is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Cybex and California Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Cybex maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Cybex can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Cybex that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Cybex addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Cybex and the California Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/hammer-strength-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Hammer Strength in India: Why Commercial Gyms Choose California Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Hammer Strength</strong> alongside premium alternatives like <strong>California Fitness</strong>. While Hammer Strength is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Hammer Strength and California Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Hammer Strength maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Hammer Strength can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Hammer Strength that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Hammer Strength addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Hammer Strength and the California Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/nautilus-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Nautilus in India: Why Commercial Gyms Choose Tunturi',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Nautilus</strong> alongside premium alternatives like <strong>Tunturi</strong>. While Nautilus is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Nautilus and Tunturi engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Nautilus maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Nautilus can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Nautilus that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Nautilus addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Nautilus and the Tunturi portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/star-trac-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Star Trac in India: Why Commercial Gyms Choose BH Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Star Trac</strong> alongside premium alternatives like <strong>BH Fitness</strong>. While Star Trac is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Star Trac and BH Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Star Trac maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Star Trac can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Star Trac that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Star Trac addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Star Trac and the BH Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/body-solid-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Body-Solid in India: Why Commercial Gyms Choose California Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Body-Solid</strong> alongside premium alternatives like <strong>California Fitness</strong>. While Body-Solid is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Body-Solid and California Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Body-Solid maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Body-Solid can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Body-Solid that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Body-Solid addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Body-Solid and the California Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/hoist-fitness-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Hoist Fitness in India: Why Commercial Gyms Choose California Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Hoist Fitness</strong> alongside premium alternatives like <strong>California Fitness</strong>. While Hoist Fitness is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Hoist Fitness and California Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Hoist Fitness maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Hoist Fitness can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Hoist Fitness that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Hoist Fitness addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Hoist Fitness and the California Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/freemotion-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to FreeMotion in India: Why Commercial Gyms Choose BH Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>FreeMotion</strong> alongside premium alternatives like <strong>BH Fitness</strong>. While FreeMotion is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both FreeMotion and BH Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While FreeMotion maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like FreeMotion can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from FreeMotion that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing FreeMotion addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between FreeMotion and the BH Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/true-fitness-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to True Fitness in India: Why Commercial Gyms Choose Tunturi',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>True Fitness</strong> alongside premium alternatives like <strong>Tunturi</strong>. While True Fitness is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both True Fitness and Tunturi engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While True Fitness maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like True Fitness can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from True Fitness that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing True Fitness addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between True Fitness and the Tunturi portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/american-fitness-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to American Fitness in India: Why Commercial Gyms Choose California Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>American Fitness</strong> alongside premium alternatives like <strong>California Fitness</strong>. While American Fitness is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both American Fitness and California Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While American Fitness maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like American Fitness can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from American Fitness that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing American Fitness addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between American Fitness and the California Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/atlantis-strength-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Atlantis Strength in India: Why Commercial Gyms Choose TechFit',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Atlantis Strength</strong> alongside premium alternatives like <strong>TechFit</strong>. While Atlantis Strength is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Atlantis Strength and TechFit engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Atlantis Strength maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Atlantis Strength can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Atlantis Strength that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Atlantis Strength addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Atlantis Strength and the TechFit portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/fitline-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Fitline in India: Why Commercial Gyms Choose TechFit',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Fitline</strong> alongside premium alternatives like <strong>TechFit</strong>. While Fitline is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Fitline and TechFit engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Fitline maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Fitline can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Fitline that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Fitline addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Fitline and the TechFit portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/matrix-fitness-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Matrix Fitness in India: Why Commercial Gyms Choose BH Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "What is the capital cost difference between global imported brands and TechFit's European distribution?", "a": "Direct distribution eliminates mid-tier broker margins and warehousing markups, often reducing total CapEx by 25% to 35% while maintaining European biomechanics and engineering."}, {"q": "How does AMC and after-sales service compare?", "a": "TechFit maintains a massive localized spare-parts inventory in Mumbai with a pan-India dispatch network of certified engineers, drastically reducing downtime compared to standard import routes that wait for international shipping."}, {"q": "What is the typical lead time for commercial gym setups in India?", "a": "Standard imported setups can take 12-16 weeks. TechFit's optimized supply chain and local manufacturing capabilities deliver full setups in 4 to 6 weeks."}, {"q": "Are the warranties comprehensive?", "a": "Yes. We offer comprehensive commercial warranties matching global standards, backed entirely by local service level agreements (SLAs) so gym owners have zero exposure to international disputes."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Matrix Fitness</strong> alongside premium alternatives like <strong>BH Fitness</strong>. While Matrix Fitness is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Matrix Fitness and BH Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Matrix Fitness maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Matrix Fitness can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Matrix Fitness that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Matrix Fitness addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Matrix Fitness and the BH Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/jerai-fitness-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Jerai Fitness in India: Why Commercial Gyms Choose TechFit & BH Fitness',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "How does the equipment portfolio breadth compare?", "a": "TechFit offers a complete turnkey solution\u2014combining our heavy-duty custom steel fabrication for strength with premium imported European cardio (BH Fitness/Tunturi)\u2014meaning you don't have to compromise on either category."}, {"q": "Is the structural steel equipment commercial-grade?", "a": "Absolutely. Our custom rigs and plates use 11-gauge structural steel and drop-forged mechanics, matching or exceeding international load-rating standards while saving significantly on local costs."}, {"q": "Do you provide 3D layout and installation?", "a": "Yes. Every commercial setup includes bespoke 3D spatial planning, customized branding, and turnkey structural installation by our in-house engineering team."}, {"q": "Can the equipment be customized with gym logos?", "a": "Yes. Our local manufacturing capability allows for extensive customization, including laser-cut logos on rigs and custom upholstery colors to match your brand."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Jerai Fitness</strong> alongside premium alternatives like <strong>TechFit & BH Fitness</strong>. While Jerai Fitness is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Jerai Fitness and TechFit & BH Fitness engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Jerai Fitness maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Jerai Fitness can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Jerai Fitness that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Jerai Fitness addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Jerai Fitness and the TechFit & BH Fitness portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },
  'alternatives/being-strong-india': {
    badge: 'B2B Sourcing Guide',
    h1: 'The Best Alternative to Being Strong in India: Why Commercial Gyms Choose TechFit',
    desc: 'Comparing traditional distribution with TechFit\'s direct sourcing for commercial gyms in India. Analyze pricing, biomechanics, lead times, and after-sales service.',
    author: 'Ali Asgar Potia',
    publishedDate: '2026-06-15',
    related: ['bh-fitness', 'free-weights', 'commercial-gym-setup-cost-india'],
    faqs: [{"q": "How does the equipment portfolio breadth compare?", "a": "TechFit offers a complete turnkey solution\u2014combining our heavy-duty custom steel fabrication for strength with premium imported European cardio (BH Fitness/Tunturi)\u2014meaning you don't have to compromise on either category."}, {"q": "Is the structural steel equipment commercial-grade?", "a": "Absolutely. Our custom rigs and plates use 11-gauge structural steel and drop-forged mechanics, matching or exceeding international load-rating standards while saving significantly on local costs."}, {"q": "Do you provide 3D layout and installation?", "a": "Yes. Every commercial setup includes bespoke 3D spatial planning, customized branding, and turnkey structural installation by our in-house engineering team."}, {"q": "Can the equipment be customized with gym logos?", "a": "Yes. Our local manufacturing capability allows for extensive customization, including laser-cut logos on rigs and custom upholstery colors to match your brand."}],
    htmlContent: "\n    <div style=\"margin-bottom: 2rem;\">\n        <button class=\"btn btn-primary\" onclick=\"go('get-a-quote')\">Get a CapEx Comparison Quote</button>\n    </div>\n    \n    <p>When investing in a commercial gym, corporate wellness center, or hotel fitness suite in India, gym owners frequently evaluate <strong>Being Strong</strong> alongside premium alternatives like <strong>TechFit</strong>. While Being Strong is a highly respected name in the global fitness industry, sourcing heavy commercial equipment requires a deep analysis of total capital expenditure (CapEx), supply chain logistics, import duties, and most importantly, the reliability of local after-sales service and Annual Maintenance Contracts (AMC).</p>\n\n    <p>This comprehensive buying guide explores the factual, operational, and financial dimensions of sourcing commercial gym equipment in India, providing a transparent comparison between the traditional distribution model and TechFit's direct-supply infrastructure.</p>\n\n    <h2>The Impact of Import Markup and Distribution Layers</h2>\n    <p>The pricing architecture for premium commercial gym equipment in India is heavily influenced by distribution layers. When evaluating high-end brands, buyers must account for the factory cost, international freight, baseline customs duties, GST, and the compounded margins added by regional dealers and sub-dealers.</p>\n    \n    <p>TechFit's strategic approach involves direct authorized distribution of European brands (like BH Fitness and Tunturi) and in-house manufacturing for heavy structural steel and free weights. By collapsing the supply chain, gym operators typically observe a <strong>25% to 35% reduction in total CapEx</strong> without sacrificing biomechanical integrity or brand prestige. This capital efficiency allows facility owners to achieve faster ROI and allocate funds toward marketing or member acquisition rather than equipment markups.</p>\n\n    <h2>Biomechanical Engineering and Commercial Durability</h2>\n    <p>Both Being Strong and TechFit engineer equipment designed to withstand the rigorous demands of a 24/7 commercial environment. Key factors include the gauge of steel used in selectorized machines, the continuous duty rating (CHP) of treadmill AC motors, and the ergonomic paths of motion in plate-loaded strength lines.</p>\n    \n    <p>While Being Strong maintains global standards, TechFit ensures that every unit supplied\u2014whether an imported European cardio machine or a custom-fabricated functional rig\u2014meets strict commercial-grade specifications. Our strength setups utilize 11-gauge structural steel, marine-grade upholstery, and precision bearings. This robust construction guarantees longevity in high-traffic Indian gyms, clubs, and institutional fitness centers.</p>\n\n    <h2>Logistics: Lead Times and Customs Clearance</h2>\n    <p>Time-to-market is a critical variable for any new gym launch or facility upgrade. Standard international procurement cycles for brands like Being Strong can extend from 12 to 16 weeks, depending on global inventory levels and customs delays at Indian ports. A delayed opening translates directly to lost presale revenue and operational disruption.</p>\n    \n    <p>In contrast, TechFit's hybrid model of localized inventory and domestic manufacturing dramatically compresses lead times. For many complete commercial setups, we execute delivery and installation within <strong>4 to 6 weeks</strong>. Our massive Mumbai warehouse serves as a central hub, ensuring that your equipment deployment aligns predictably with your construction and launch schedule.</p>\n\n    <h2>The True Differentiator: After-Sales Service and Local AMC</h2>\n    <p>The most common failure point in the Indian fitness infrastructure market is not the equipment itself, but the lack of reliable after-sales support. A premium machine from Being Strong that sits out of order for three weeks due to an unavailable proprietary spare part creates severe member dissatisfaction and damages the facility's reputation.</p>\n    \n    <p>TechFit's operational model is built around minimizing downtime. We maintain a comprehensive local spare-parts inventory at our Mumbai facility, encompassing everything from running belts and motor control boards to specific cables and pulleys. Our pan-India network of certified service engineers is dispatched rapidly to handle preventative maintenance and emergency repairs. This robust AMC infrastructure provides peace of mind, ensuring your gym remains fully operational.</p>\n\n    <h2>Turnkey Solutions vs. Fragmented Sourcing</h2>\n    <p>Building a world-class fitness facility requires more than just buying machines. It involves 3D spatial layout, structural integration, specialized gym flooring, and sometimes adjacent wellness technologies like cryotherapy or hyperbaric chambers. While sourcing Being Strong addresses the equipment vertical, operators often have to manage multiple vendors for flooring, functional rigs, and recovery suites.</p>\n    \n    <p>TechFit operates as an end-to-end turnkey partner. We manage the entire lifecycle of the gym setup: from the initial CAD layouts to the final structural installation of our bespoke MMA cages, CrossFit rigs, and premium cardio lines. This consolidated approach eliminates vendor friction, ensures aesthetic consistency, and provides a single point of accountability for the entire project.</p>\n\n    <h2>Factual Comparison Matrix</h2>\n    <div style=\"overflow-x:auto;margin:2rem 0\">\n      <table style=\"width:100%;border-collapse:collapse;text-align:left;min-width:600px\">\n        <thead>\n          <tr style=\"background:rgba(255,255,255,0.1);border-bottom:2px solid var(--red)\">\n            <th style=\"padding:1rem\">Evaluation Metric</th>\n            <th style=\"padding:1rem\">Traditional Premium Import</th>\n            <th style=\"padding:1rem\">TechFit Turnkey Sourcing</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>CapEx Efficiency</strong></td>\n            <td style=\"padding:1rem\">High (Includes multi-tier distribution markup)</td>\n            <td style=\"padding:1rem\">Optimized (Direct distribution & local manufacturing)</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Delivery Lead Time</strong></td>\n            <td style=\"padding:1rem\">Typically 12\u201316 weeks</td>\n            <td style=\"padding:1rem\">4\u20136 weeks for standard setups</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>AMC & Spare Parts</strong></td>\n            <td style=\"padding:1rem\">Subject to international part shipping</td>\n            <td style=\"padding:1rem\">Massive local inventory in Mumbai</td>\n          </tr>\n          <tr style=\"border-bottom:1px solid rgba(255,255,255,0.05)\">\n            <td style=\"padding:1rem\"><strong>Custom Fabrication</strong></td>\n            <td style=\"padding:1rem\">Standardized global catalog</td>\n            <td style=\"padding:1rem\">Bespoke rigs, cages, and localized branding</td>\n          </tr>\n          <tr>\n            <td style=\"padding:1rem\"><strong>Turnkey Scope</strong></td>\n            <td style=\"padding:1rem\">Equipment supply</td>\n            <td style=\"padding:1rem\">Equipment, flooring, 3D design & recovery suites</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <p>Ultimately, the decision between Being Strong and the TechFit portfolio comes down to a gym's operational priorities. For buyers who prioritize optimized CapEx, rapid deployment, and guaranteed local service accountability, TechFit provides an unmatched proposition in the Indian market.</p>\n    "
  },

  'commercial-gym-setup-cost-india': {
    title: `Commercial Gym Setup Cost in India (2026 Guide)`,
    badge: `CapEx Analysis`,
    desc: `An in-depth, transparent breakdown of commercial gym setup costs in India for 2026, detailing CapEx, rent, equipment, flooring, HVAC, and AMC budgets.`,
    h1: `Commercial Gym Setup Cost in India: 2026 B2B Budget Guide`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-29`,
    category: `Commercial Gym Setup`,
    related: [{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"},{"slug":"commercial-gym-equipment-list","name":"Complete Gym Equipment Checklist"}],
    faqs: [{"q":"How much does it cost to set up a commercial gym in India?","a":"Setting up a standard commercial gym in India typically ranges from 15 Lakhs to 30 Lakhs for a mid-tier facility (2,000–3,000 sq ft). Premium health clubs (4,000+ sq ft) with imported European cardio, custom steel rigs, and spa amenities range from 35 Lakhs to 70 Lakhs, while small boutique studios can start at 8 Lakhs."},{"q":"What is the largest expense in gym setup?","a":"Commercial gym equipment (cardio machines, strength stacks, custom rigs) represents the largest capital expenditure, accounting for 50-60% of the total budget. This is followed by civil interiors, heavy-duty rubber flooring (10%), and HVAC air conditioning systems (10%)."},{"q":"How can I optimize gym setup CapEx?","a":"A hybrid sourcing strategy is highly effective: source heavy structural steel functional rigs and free weights directly from custom manufacturers like TechFit in Mumbai to save 40% on import markups, while importing premium cardio lines (like BH Fitness or Tunturi) for brand recognition and local AMC support."}],
    htmlContent: `<h2>The True Capital Expenditure of an Indian Commercial Gym</h2> <p>Launching a commercial gym in India is a highly lucrative but capital-intensive venture. In 2026, the success of a gym depends on optimizing your initial Capital Expenditure (CapEx) while delivering a premium, safe training environment. Smart operators categorize their setup budgets into three distinct tiers: <strong>Boutique Studios</strong> (8 to 15 Lakhs, ideal for functional fitness or personal training), <strong>Standard Commercial Gyms</strong> (15 to 30 Lakhs, the bulk of premium 2,500 sq ft neighborhood facilities), and <strong>Luxury Health Clubs</strong> (35 to 70+ Lakhs, featuring premium European imports, custom combat cages, and integrated recovery longevity suites).</p> <h2>Detailed Budget Allocation & Itemized Expenses</h2> <p>To avoid cash-flow bottlenecks during construction, it is critical to allocate budgets across major setup categories. On average, commercial gym operators experience the following expense distribution:</p> <ul> <li><strong>Commercial Gym Equipment (55%):</strong> B2B commercial cardio lines (LK and Move series), selectorized strength machines, modular functional training steel rigs, knurled Olympic barbells, and hex dumbbells.</li> <li><strong>Acoustic and Shock-Absorbent Flooring (10%):</strong> Vulcanised high-density rubber gym flooring tiles (15mm to 30mm thickness) to isolate vibration, protect the structural sub-base, and damp sound.</li> <li><strong>HVAC & Interior fit-out (15%):</strong> Commercial air conditioning systems (essential for maintaining air exchanges and sweat control in high-density spaces) plus mirrors, lockers, and reception area setups.</li> <li><strong>Electrical Load & Licensing (10%):</strong> Commercial power installation (typically 30kW to 50kW), municipal corporation trade licenses, police NOCs, and GAds conversion tracking setup.</li> <li><strong>Working Capital (10%):</strong> Pre-sales marketing, initial payroll, and Annual Maintenance Contracts (AMC) to protect equipment uptime.</li> </ul> <h2>B2B Setup Cost Matrix Comparison (INR)</h2> <table class="comp-table"> <thead> <tr> <th>Expense Category</th> <th>Bout boutique (1,000–1,500 sq ft)</th> <th>Commercial Mid-Tier (2,000–3,000 sq ft)</th> <th>Luxury Health Club (4,000+ sq ft)</th> </tr> </thead> <tbody> <tr> <td><strong>Cardio & Strength</strong></td> <td>5,00,000 - 8,00,000</td> <td>10,00,000 - 18,00,000</td> <td>22,00,000 - 45,00,000</td> </tr> <tr> <td><strong>Flooring & Turf</strong></td> <td>80,000 - 1,50,000</td> <td>2,00,000 - 3,50,000</td> <td>4,50,000 - 7,00,000</td> </tr> <tr> <td><strong>Interior Fit-out & HVAC</strong></td> <td>1,50,000 - 3,00,000</td> <td>4,00,000 - 6,00,000</td> <td>8,00,000 - 15,00,000</td> </tr> <tr> <td><strong>Total Est. Cost</strong></td> <td><strong>7,30,000 - 12,50,000</strong></td> <td><strong>16,00,000 - 27,50,000</strong></td> <td><strong>34,50,000 - 67,00,000</strong></td> </tr> </tbody> </table> <h2>How Hybrid Sourcing Optimizes Your Setup Budget</h2> <p>Sourcing 100% imported equipment exposes the operator to massive import duties, shipping markups, and long-term parts delays. Conversely, sourcing 100% cheap local equipment degrades the athlete experience and leads to rapid breakdown costs. TechFit pioneered the **hybrid sourcing model** in India. By importing high-biomechanical cardio machines (Spanish BH Fitness or Finnish Tunturi lines) and pairing them with high-gauge structural steel rigs, MMA cages, and free weights fabricated directly at our Mumbai factory, gym owners reduce initial CapEx by up to 35% without compromising aesthetics or performance.</p>`
  },
  'how-to-set-up-a-commercial-gym': {
    title: `How to Set Up a Commercial Gym in India: Step-by-Step`,
    badge: `Implementation Blueprint`,
    desc: `The complete step-by-step roadmap to setting up a successful commercial gym in India, covering licensing, spatial design, equipment selection, and pre-sales marketing.`,
    h1: `How to Set Up a Commercial Gym in India: The Ultimate Step-by-Step B2B Roadmap`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-29`,
    category: `Commercial Gym Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"imported-vs-indian-gym-equipment","name":"Imported vs Indian Gym Equipment"}],
    faqs: [{"q":"What licenses are required to open a gym in India?","a":"To open a commercial gym in India, you typically require: 1. MCA company incorporation or Partnership registration. 2. Municipal Trade License (health department). 3. Police Department NOC/registration. 4. Fire Department NOC. 5. GST Registration."},{"q":"What electrical load is needed for a commercial gym?","a":"A standard commercial gym requires a dedicated three-phase electrical connection of 30kW to 50kW, primarily driven by multiple commercial HVAC systems, high-horsepower treadmill motors, locker geysers, and aesthetic lighting."},{"q":"How long does it take to set up a gym?","a":"A standard commercial gym setup takes 8 to 12 weeks from signing the commercial lease to the grand opening. This includes 4 weeks for civil interiors and flooring, 2-3 weeks for equipment custom fabrication/import delivery, and 2 weeks for installation and trainer onboarding."}],
    htmlContent: `<h2>The Step-by-Step Journey to a High-Yield B2B Fitness Amenity</h2> <p>Launching a commercial gym is an excellent high-yield business model in India, but it requires thorough execution across multiple operational fronts. Many passionate fitness owners rush into lease agreements or equipment catalogues before mapping out regulatory, structural, and mechanical realities. This step-by-step blueprint details the exact setup process followed by India's top fitness chains and turnkey B2B consultants.</p> <h2>Step 1: Company Registration & Regulatory Compliance</h2> <p>Before committing capital, incorporate your business entity (usually as a Private Limited Company or LLP to secure liability protections). Apply for a <strong>Municipal Trade License</strong> from your local municipal corporation, obtain a <strong>Fire Department NOC</strong> by ensuring proper exits and fire suppression systems, and register for <strong>GST</strong>. Ensure you secure a <strong>Police Department NOC/Registration</strong> where applicable in your state.</p> <h2>Step 2: Location Scouting & Spatial Engineering</h2> <p>Scout locations with high visibility, ample structural load tolerance (essential for heavy weightlifting zones), and a minimum ceiling height of 10-12 feet to fit modular CrossFit upright steel rigs. Ensure the commercial building has a dedicated <strong>Three-Phase Electrical Connection</strong> (30kW to 50kW) to power multiple LK/Move treadmill motors, HVAC units, and showers.</p> <h2>Step 3: Turnkey Layout & Biomechanical Flow</h2> <p>Work with professional designers to map the spatial layout, dividing the space into distinct zones: Cardio (placed near the windows), Selectorized Strength lines (grouped logically by muscle area), Functional Training (centered around modular island steel rigs), Free Weights (reinforced with heavy-duty vulcanised rubber flooring), and the front reception area. Proper traffic flow reduces overcrowding and keeps members safe.</p> <h2>Step 4: Acoustic & Structural Flooring Setup</h2> <p>Do not compromise on flooring. Install a minimum of 15mm (preferably 20mm or 30mm in free weight zones) high-impact, sound-insulated vulcanised rubber tiles. Proper rubber flooring dampens dropped weights, prevents concrete micro-cracking, and absorbs high-frequency noise from transferring to commercial tenants below.</p> <h2>Step 5: Equipment Hybrid Sourcing</h2> <p>Execute your equipment strategy by combining premium imported cardio lines with heavy-duty custom-fabricated steel structures. TechFit recommends Spanish-engineered BH Fitness commercial cardio machines (LK/Move series) for long-term motor reliability, paired with bespoke CrossFit rigs, dumbbells, and competition combat cages manufactured at TechFit's Mumbai facility to save CapEx and ensure rapid spare parts delivery.</p> <h2>Step 6: Pre-sales & Membership Marketing</h2> <p>Do not wait for the gym door to open before selling memberships. Launch a 4-week pre-sales campaign when civil works are 70% complete. Build an on-site pre-sales cabin, use Google Ads with conversion tracking to capture local B2B leads, offer exclusive founder member discounts, and secure your initial recurring revenue before day one.</p>`
  },
  'best-commercial-treadmills-india': {
    title: `Best Commercial Treadmills in India (2026 Buying Guide)`,
    badge: `Equipment Sourcing`,
    desc: `An expert evaluation of the best B2B commercial treadmills in India for 2026, comparing motor duty, deck biomechanics, display technology, and AMC service uptime.`,
    h1: `Best Commercial Treadmills in India: 2026 Commercial Gym Sourcing Guide`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-29`,
    category: `Commercial Gym Setup`,
    related: [{"slug":"bh-fitness-vs-life-fitness","name":"BH Fitness vs Life Fitness Comparison"},{"slug":"commercial-gym-equipment-list","name":"Commercial Gym Equipment List"}],
    faqs: [{"q":"What motor capacity is needed for a commercial treadmill?","a":"A commercial treadmill must use an AC (Alternating Current) motor with a continuous-duty rating of at least 3.0 HP (preferably 4.0 to 5.0 HP peak). DC motors are not suitable for heavy-duty commercial environments."},{"q":"What is a phenolic resin deck on a treadmill?","a":"A phenolic resin deck (like the HST deck on BH Fitness treadmills) is a high-durability, self-lubricating running deck that reduces friction, protects the motor, and extends belt life, drastically cutting maintenance frequency."},{"q":"Which brand is the best for commercial treadmills in India?","a":"Spanish-engineered BH Fitness LK & Move Series treadmills are widely regarded as the best commercial treadmills in India, delivering premium biomechanics and advanced Smart Focus touchscreen connectivity, fully backed by TechFit's pan-India local AMC support."}],
    htmlContent: `<h2>The Critical Role of Cardio Equipment in Gym Retention</h2> <p>Cardio machines, specifically commercial treadmills, are the highest-usage, highest-wear assets in any fitness facility. If a treadmill breaks down, member satisfaction drops immediately. When B2B buyers (gym owners, real estate developers, hotel amenity managers) evaluate commercial treadmills in India, they must look beyond simple aesthetic design and analyze four core engineering components: continuous motor horsepower, self-lubricating deck technology, biomechanical shock absorption, and local after-sales spare-parts availability.</p> <h2>Continuous AC Motors vs peak Horsepower</h2> <p>A true commercial treadmill must use an <strong>AC (Alternating Current) motor</strong>, not a DC motor. Ensure the specification states "Continuous-Duty" (often written as CHP), representing the motor's ability to run continuously under full load for hours, rather than "Peak Horsepower" (PHP), which is a short-burst metric. Look for a minimum of <strong>3.0 CHP to 4.5 CHP</strong> AC motors. Lower-horsepower motors will overheat, trigger thermal shutdowns, and blow control boards under continuous usage.</p> <h2>Phenolic HST Decks & Biomechanical Cushioning</h2> <p>The running board is under constant impact. Elite treadmills, like the BH Fitness INERTIA and MOVEMIA series, feature **HST Phenolic Resin Decks**. These self-lubricating boards require zero manual wax application, preventing wax buildup that destroys drive belts and burns out motors. Additionally, premium multi-point cushioning systems (like the Pro-Tonic 10-point system) reduce joint impact by 30%, protecting athletes and keeping members coming back.</p> <h2>Top Commercial Treadmills Compared (2026 India Market)</h2> <table class="comp-table"> <thead> <tr> <th>Model / Feature</th> <th>BH Fitness INERTIA G688</th> <th>BH Fitness MOVEMIA TR1000</th> <th>Standard Catalog Import</th> </tr> </thead> <tbody> <tr> <td><strong>Motor Capacity</strong></td> <td>4.5 HP AC (Continuous)</td> <td>6.0 HP AC (Premium)</td> <td>3.0 HP AC (Basic)</td> </tr> <tr> <td><strong>Deck Technology</strong></td> <td>HST Self-Lubricating</td> <td>HST Self-Lubricating</td> <td>Manual Waxing Required</td> </tr> <tr> <td><strong>Display Console</strong></td> <td>LED / 19" Smart Focus</td> <td>22" Smart Focus Touchscreen</td> <td>Basic Segmented LCD</td> </tr> <tr> <td><strong>Local Uptime / AMC</strong></td> <td>TechFit Pan-India 24-hr Support</td> <td>TechFit Pan-India 24-hr Support</td> <td>Third-Party Spares Delayed</td> </tr> </tbody> </table> <h2>The TechFit AMC & Spares Assurance</h2> <p>Securing a premium treadmill is only half the battle; ensuring its uptime is what keeps your gym profitable. As the authorized dealer for BH Fitness and Tunturi in India, TechFit maintains an extensive spare-parts inventory at our Mumbai warehouse (including drive belts, console boards, and running decks) and dispatches certified local engineers to resolve B2B breakdowns within 24–48 hours, delivering the highest operational uptime in the Indian commercial market.</p>`
  },
  'commercial-gym-equipment-list': {
    title: `Complete Commercial Gym Equipment List & Budget (2026)`,
    badge: `Equipment Checklist`,
    desc: `The comprehensive, professional commercial gym equipment checklist and budget guide, categorized by cardio, selectorized strength, free weights, functional rigs, and recovery systems.`,
    h1: `Complete Commercial Gym Equipment List & Sourcing Budget Checklist (2026)`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Commercial Gym Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"imported-vs-indian-gym-equipment","name":"Imported vs Indian Gym Equipment"}],
    faqs: [{"q":"What is the standard equipment ratio for a commercial gym?","a":"A balanced commercial gym typically allocates space as: 30% Cardio zone, 40% Strength/Selectorized zone, 20% Free Weights, and 10% Functional/CrossFit training zone."},{"q":"How many treadmills do I need for a 2,000 sq ft gym?","a":"For a 2,000 sq ft commercial gym, a standard setup includes 3 to 4 commercial AC-motor treadmills, 2 spin bikes, 1 elliptical cross-trainer, and 1 commercial rowing machine."},{"q":"Why is steel gauge important in strength equipment?","a":"Commercial strength stations and power racks must use 11-gauge (3mm thick) or heavier structural steel framing. Cheap home-use racks use 14-gauge or thin steel, which bends under heavy commercial loads, presenting severe safety risks."}],
    htmlContent: `<h2>The Standard B2B Equipment Sourcing Master Checklist</h2> <p>Sourcing commercial gym equipment requires a meticulous approach to balance space utilization, athlete safety, biomechanical flow, and CapEx boundaries. Many new operators make the mistake of buying multiple redundant machines while missing essential modular functional racks or high-impact flooring layers. This master B2B equipment list outlines the complete catalog required to deliver a world-class fitness amenity in India.</p> <h2>1. The Cardio Zone (30% Area Allocation)</h2> <p>Ensure all cardio units are commercial grade with active cooling and cloud-connected display consoles. TechFit recommends:</p> <ul> <li><strong>Commercial Treadmills (3-5 Units):</strong> Premium AC-motor treadmills with self-lubricating HST phenolic decks (e.g. BH Fitness LK Series).</li> <li><strong>Elliptical Cross-Trainers (2 Units):</strong> Front-drive systems with natural stride lengths (50cm+) for low-impact conditioning.</li> <li><strong>Upright & Recumbent Bikes (2 Units):</strong> Open-frame recumbent bikes for rehabilitation and standard upright bikes with electromagnetic brakes.</li> <li><strong>HIIT Air Bikes & Rowers (1-2 Units):</strong> Air-resistance assault bikes and water/air rowers (e.g. Movemia Rower RW1200) for intense interval training.</li> </ul> <h2>2. Selectorized Strength Zone (40% Area Allocation)</h2> <p>Equip your strength floor with heavy-duty stack machines constructed from 11-gauge structural steel and premium cable pulley systems:</p> <ul> <li><strong>Upper Body Stations:</strong> Seated Chest Press, Lat Pulldown/Row, Shoulder Press, Butterfly/Pec Deck, and Assisted Chin/Dip.</li> <li><strong>Lower Body Stations:</strong> Leg Extension, Seated Leg Curl, Lying Leg Curl, Total Hip, and Commercial Leg Press (double-pulley configuration).</li> <li><strong>Dual-Function & Multi-Stations:</strong> Dual Bicep/Tricep machine, Adjustable Cable Crossover, and 4-Stack/5-Stack Multistation towers to maximize floor layout efficiency.</li> </ul> <h2>3. Free Weights & Functional Zone (30% Area Allocation)</h2> <p>Source heavy-duty custom-fabricated steel racks and weights directly from a manufacturer like TechFit to reduce CapEx by up to 40%:</p> <ul> <li><strong>Power Racks & Squat Stands:</strong> Structural steel modular upright power cages with compatibility for J-cups and spotter arms.</li> <li><strong>Olympic Bars & Bumper Plates:</strong> Knurled 20kg Olympic barbells, tri-grip rubber plates, and virgin rubber bumper plates.</li> <li><strong>Hex Dumbbells & Racks:</strong> Complete dumbbell sets (2.5kg to 50kg) with double-tier heavy-duty storage racks.</li> <li><strong>Acoustic Rubber Tiles:</strong> 15mm or 20mm high-density vulcanised rubber tiles to insulate vibration and protect structural floors.</li> <li><strong>integrated Longevity Recovery:</strong> Alteon whole-body cryotherapy and monoplace hyperbaric oxygen chambers (HBOT) to capture premium members.</li> </ul>`
  },
  'hotel-gym-setup-guide': {
    title: `Hotel & Resort Gym Setup: Equipment, Layout & Cost`,
    badge: `Hospitality Amenity`,
    desc: `The definitive B2B hospitality guide on luxury hotel, resort, and corporate gym setups, focusing on guest demography, spacing, equipment, and Alteon recovery suites.`,
    h1: `Hotel & Resort Gym Setup Guide: Premium Commercial Amenity Sourcing`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Commercial Gym Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"wellness-solutions","name":"Turnkey Wellness Recovery Solutions"}],
    faqs: [{"q":"What is the optimal size for a hotel gym?","a":"A standard hotel gym ranges from 800 to 1,500 sq ft, depending on guest capacity. Spacing must prioritize safety and elite aesthetics, ensuring a minimum of 4-5 feet of clearance around all active cardio machines."},{"q":"How does a premium gym amenity increase hotel revenue?","a":"A premium, state-of-the-art gym and recovery clubhouse (featuring Alteon wellness devices like hyperbaric chambers or red-light therapy) is a proven guest differentiator, letting hotels increase room premium rates by up to 15% and capture lucrative local wellness memberships."},{"q":"What cardio equipment is best suited for hotels?","a":"Hotel gyms require highly intuitive, silent, and premium-branded cardio equipment with integrated entertainment screens and easy user interfaces, such as the Spanish-engineered BH Fitness Smart Focus line."}],
    htmlContent: `<h2>The Hospitality Amenity as a Brand Differentiator</h2> <p>In the premium hospitality sector, the hotel gym is no longer a checklist afterthought confined to a windowless basement. Modern business travelers, wellness tourists, and high-net-worth guests select their hotels based on the caliber of the fitness and recovery amenities. A premium, thoughtfully designed gym clubhouse directly increases guest room premiums, elevates corporate booking capture, and builds long-term brand equity.</p> <h2>Guest Demographic Profiling & Equipment Selection</h2> <p>Unlike commercial gym members who train intensively, hotel guests represent a wide demographic range — from elite athletes maintaining training regimens to older guests seeking gentle conditioning. Equipment must be **highly intuitive, exceptionally safe, and whisper-silent**. TechFit recommends a curated collection of:</p> <ul> <li><strong>BH Fitness Smart Focus Cardio:</strong> Silent commercial treadmills, recumbent exercise bikes with open step-through frames, and ellipticals featuring intuitive touchscreen consoles, pre-loaded virtual routes, and Netflix/Spotify integration.</li> <li><strong>Premium Selectorized Strength:</strong> Double-pulley functional cable trainers and dual biceps/triceps machines to maximize exercise variety while saving floor layout space.</li> <li><strong>Integrated Recovery Longevity Suites:</strong> An adjacent recovery zone featuring an **Alteon Elysion Hyperbaric Oxygen Chamber** and a **PBM Neo Red Light Therapy Panel** to capture lucrative health-tourism markets.</li> </ul> <h2>Spacing, Acoustics & Safety Regulations</h2> <p>Ensure your layout allows a minimum of **5 feet of clearance** behind all treadmills to prevent high-speed slip injuries. Implement high-insulation **acoustic underlays** and 20mm soundproof rubber tiles to completely stop structure-borne vibration and noise from transferring into guest rooms adjacent or below. All equipment must carry robust commercial certifications (CE, FDA, RoHS) to maintain safety compliance and mitigate corporate liability.</p>`
  },
  'bh-fitness-vs-life-fitness': {
    title: `BH Fitness vs Life Fitness: Commercial Gym Sourcing compared`,
    badge: `Head-to-Head Brand Comparison`,
    desc: `An objective B2B comparison between BH Fitness (Spain) and Life Fitness, analyzing continuous motor duty, biomechanics, import CapEx, and local AMC speed in India.`,
    h1: `BH Fitness vs Life Fitness India: Commercial Equipment Sourcing Comparison`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Brand Comparison`,
    related: [{"slug":"best-commercial-treadmills-india","name":"Best Commercial Treadmills Guide"},{"slug":"imported-vs-indian-gym-equipment","name":"Imported vs Indian Gym Sourcing"}],
    faqs: [{"q":"Is BH Fitness a good brand for commercial gyms?","a":"Yes. BH Fitness is one of Europe's oldest and most prestigious fitness brands, engineered in Spain since 1909. It is widely used in commercial health clubs, premium hotels, and elite training facilities globally."},{"q":"What is the CapEx difference between BH Fitness and Life Fitness in India?","a":"BH Fitness delivers premium European engineering and biomechanics at a highly optimized capital cost — typically saving B2B buyers 25% to 35% on setup CapEx compared to Life Fitness, primarily due to TechFit's direct authorized distribution network and local parts warehousing."},{"q":"How does after-sales service compare in India?","a":"TechFit maintains an extensive local spare-parts inventory for BH Fitness at our Mumbai facility and dispatches certified engineers for AMC support within 24-48 hours, delivering superior operational uptime compared to standard import routes."}],
    htmlContent: `<h2>Objective B2B Brand Sourcing Analysis</h2> <p>For commercial gym owners, hotel developers, and real estate amenities in India, selecting the primary cardio and strength brand is one of the most critical decisions impacting CapEx return and member retention. Both **BH Fitness (Spain)** and **Life Fitness** are world-renowned, high-performance commercial brands. However, B2B buyers must evaluate these brands not just on historical name recognition, but on localized import duty exposures, continuous-duty motor specifications, and the availability of direct local after-sales engineers in India.</p> <h2>Continuous AC Motor Duty & self-Lubricating Decks</h2> <p>In high-traffic commercial environments, the drive system is under constant load. The BH Fitness INERTIA and MOVEMIA commercial treadmills feature <strong>4.5 HP to 6.0 HP continuous-duty AC motors</strong>, matching the heavy-duty outputs of Life Fitness commercial series. Additionally, BH Fitness includes self-lubricating **HST Phenolic Decks** as standard across its commercial models. This self-waxing technology cuts routine maintenance by 80% and extends drive belt life, whereas many standard import models still require manual waxing regimes.</p> <h2>Factual Brand Sourcing Matrix (2026 Indian Market)</h2> <table class="comp-table"> <thead> <tr> <th>Comparison Parameter</th> <th>Life Fitness Commercial Series</th> <th>BH Fitness (Spain) Commercial Series</th> </tr> </thead> <tbody> <tr> <td><strong>Biomechanical Engineering</strong></td> <td>World-Class Biomechanics</td> <td>World-Class European Biomechanics</td> </tr> <tr> <td><strong>Continuous AC Motor HP</strong></td> <td>3.0 HP - 4.5 HP AC</td> <td>4.5 HP - 6.0 HP AC (High Uptime)</td> </tr> <tr> <td><strong>CapEx Sourcing Cost</strong></td> <td>Premium Brand Markup (High CapEx)</td> <td>Optimized Direct Authorized Distribution (Save 25-35%)</td> </tr> <tr> <td><strong>India Spare-Parts Availability</strong></td> <td>Subject to import delays (4-8 weeks)</td> <td>Immediate Mumbai Factory Inventory (1-2 days)</td> </tr> <tr> <td><strong>AMC Technician Speed</strong></td> <td>Third-Party Dispatch dependent</td> <td>On-Call Direct TechFit Engineers (24-hr response)</td> </tr> </tbody> </table> <h2>The Direct Distribution Advantage</h2> <p>TechFit is the authorized exclusive dealer of BH Fitness in India. By eliminating intermediate brokers and maintaining direct-import pathways, we pass substantial savings directly to commercial operators. This direct pathway also ensures that every commercial gym, hotel clubhouse, or developer amenity setup receives a robust **Annual Maintenance Contract (AMC)** managed by certified in-house engineers, securing immediate parts replacement and maximum machine uptime.</p>`
  },
  'tunturi-vs-precor': {
    title: `Tunturi vs Precor: B2B Commercial Sourcing Guide`,
    badge: `Head-to-Head Brand Comparison`,
    desc: `An expert, factual B2B comparison between Tunturi (Finland) and Precor, analyzing Nordic ergonomics, durability, setup cost, and AMC response time in India.`,
    h1: `Tunturi vs Precor India: Commercial Fitness Sourcing Comparison`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Brand Comparison`,
    related: [{"slug":"best-commercial-treadmills-india","name":"Best Commercial Treadmills Guide"},{"slug":"gym-equipment-suppliers-india-compared","name":"Gym Equipment Suppliers India Compared"}],
    faqs: [{"q":"Is Tunturi suitable for commercial gym setups?","a":"Yes. Tunturi is a premium Finnish brand with a century-long legacy in Nordic fitness engineering. Its professional commercial lines feature exceptional ergonomics, heavy steel frames, and self-generated magnetic resistance systems designed for high-traffic environments."},{"q":"What are the main differences between Tunturi and Precor?","a":"While Precor is an excellent brand primarily focused on traditional club cardio, Tunturi specializes in Nordic ergonomic biomechanics and highly compact, self-generated cardio units. Tunturi offers significant CapEx savings (20-30%) and prompt local AMC support via TechFit's direct India distribution."}],
    htmlContent: `<h2>Factual Evaluation for B2B Fitness Sourcing</h2> <p>When B2B fitness buyers (real estate developers, commercial club owners, and corporate facility managers) source premium commercial gym equipment, they look for options that balance elite biomechanical performance with optimized CapEx and rapid local support. Both **Tunturi (Finland)** and **Precor** are highly prestigious global brands. This guide provides a factual, direct comparison to help you choose the right partner for your project in India.</p> <h2>Nordic Ergonomics & Self-Generated Systems</h2> <p>Tunturi is renowned for its **Nordic-engineered ergonomics**, focusing on user posture, joints alignment, and smooth resistance curves. Its commercial cardio line features advanced self-generating magnetic brake systems, allowing machines to power their own console monitors directly from the user's pedaling force. This self-generated DNA removes the need for electrical floor cabling, reduces utility bills, and provides exceptional layout flexibility in open-plan corporate and hotel wellness zones.</p> <h2>Sourcing and AMC Support in India</h2> <p>As the authorized India partner for Tunturi, TechFit provides commercial clients with direct, factory-authorized pricing, certified installation, and a guaranteed **Annual Maintenance Contract (AMC)** with immediate local dispatch. This localized infrastructure eliminates the common import delays and spare-parts backlog associated with non-represented brands, securing maximum uptime for your facility.</p>`
  },
  'best-gym-equipment-brands-india': {
    title: `Best Commercial Gym Equipment Brands in India Compared (2026)`,
    badge: `Brand Buying Guide`,
    desc: `An objective B2B comparison of the top commercial gym equipment brands in India for 2026, evaluating Technogym, Life Fitness, Precor, USI, Cosco, and TechFit.`,
    h1: `Best Commercial Gym Equipment Brands in India Compared (2026 Buyer Guide)`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Brand Comparison`,
    related: [{"slug":"imported-vs-indian-gym-equipment","name":"Imported vs Indian Gym Sourcing"},{"slug":"gym-equipment-suppliers-india-compared","name":"Gym Equipment Suppliers India Compared"}],
    faqs: [{"q":"What is the best commercial gym brand in India?","a":"For imported European commercial cardio, **BH Fitness** (Spain) and **Tunturi** (Finland) are highly recommended. For custom-fabricated functional rigs, combat cages, and heavy free weights, **TechFit** (Mumbai factory-direct) is the top Indian manufacturer."}],
    htmlContent: `<h2>Curating the Ideal Brand Consideration Set</h2> <p>Building a highly profitable commercial health club, real estate clubhouse, or B2B fitness amenity in India requires choosing the right brand portfolio. Gym operators are often presented with confusing catalog options, varying pricing structures, and tall claims about durability. This guide provides an objective, factual comparison of the top global and domestic gym equipment brands active in the Indian market for 2026.</p> <h2>Evaluation Metrics for B2B Sourcing</h2> <p>Smart commercial buyers evaluate brand options on five critical dimensions: 1. Continuous mechanical biomechanics. 2. Initial Capital Expenditure (CapEx). 3. Shipping import lead times. 4. Localized spare parts inventory. 5. Direct Annual Maintenance Contract (AMC) response times. Bidding on high-end luxury brands represents a great path when budget is infinite, but standard setups require maximizing ROI by pairing premium imported cardio with custom domestic steel structures.</p>`
  },
  'imported-vs-indian-gym-equipment': {
    title: `Imported vs Indian Gym Equipment: Which to Choose?`,
    badge: `Sourcing Strategy`,
    desc: `A comprehensive, factual guide analyzing imported European/American gym brands versus Indian custom fabrication, outlining the optimal hybrid sourcing strategy.`,
    h1: `Imported vs Indian Gym Equipment: Factual B2B Sourcing Analysis`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Brand Comparison`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"best-gym-equipment-brands-india","name":"Best Gym Equipment Brands India"}],
    faqs: [{"q":"Which is better, imported or Indian gym equipment?","a":"Imported European cardio (like BH Fitness) is superior for electronic connectivity, smooth biomechanics, and motor longevity. However, custom-fabricated Indian steel (like TechFit structural rigs and plates) matches or exceeds imported steel durability while saving up to 40% on import markups and shipping."}],
    htmlContent: `<h2>The Sourcing Dilemma: Import Markup vs Local Durability</h2> <p>Commercial gym operators and real estate developers in India face a common B2B sourcing choice: pay high CapEx premiums and face long shipping delays for fully imported international setups, or source low-cost domestic catalog equipment that may break down rapidly under commercial usage. This guide analyzes both pathways and demonstrates why a **hybrid sourcing strategy** delivers the best returns on capital.</p> <h2>A Factual Sourcing Comparison</h2> <table class="comp-table"> <thead> <tr> <th>Sourcing Factor</th> <th>100% Fully Imported Setup</th> <th>TechFit Hybrid Sourcing Strategy</th> </tr> </thead> <tbody> <tr> <td><strong>Cardio Biomechanics</strong></td> <td>Excellent (European/American)</td> <td>Excellent (Imported BH Fitness/Tunturi)</td> </tr> <tr> <td><strong>Functional Steel & Rigs</strong></td> <td>High Durability (High Import Markup)</td> <td>Equivalent 11-Gauge Structural Steel (Save 40%)</td> </tr> <tr> <td><strong>Total CapEx Required</strong></td> <td>Highest CapEx (Duties, shipping fees)</td> <td>Highly Optimized (Save 30-35% sitewide)</td> </tr> <tr> <td><strong>Spare Parts & AMC Uptime</strong></td> <td>4-8 weeks import parts delay</td> <td>Immediate Mumbai Factory dispatch (24-hr resolution)</td> </tr> </tbody> </table>`
  },
  'gym-equipment-suppliers-india-compared': {
    title: `Gym Equipment Suppliers in India Compared (2026)`,
    badge: `Supplier Audit`,
    desc: `An objective B2B buyer checklist and audit comparing commercial gym equipment suppliers in India, detailing manufacturing, distribution, and AMC speed.`,
    h1: `Commercial Gym Equipment Suppliers in India Compared (2026 Buyer Audit)`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `Brand Comparison`,
    related: [{"slug":"best-gym-equipment-brands-india","name":"Best Gym Equipment Brands Compared"},{"slug":"imported-vs-indian-gym-equipment","name":"Imported vs Indian Gym Sourcing"}],
    faqs: [{"q":"What should I look for in a commercial gym supplier?","a":"A reliable commercial gym supplier in India must possess: 1. Direct authorized manufacturer dealership (no middleman). 2. In-house heavy-gauge custom steel fabrication capabilities. 3. Certified in-house AMC technician coverage. 4. A massive local spare-parts inventory."}],
    htmlContent: `<h2>The Critical Role of the Turnkey Supplier Partner</h2> <p>Sourcing gym equipment is not a one-off transactional purchase; it is a long-term partnership that directly impacts the lifetime profitability of your commercial fitness facility. If a supplier fails to provide certified installation, delays customs clearances, or maintains no spare-parts inventory, your machines sit broken, members quit, and your B2B amenity becomes a liability. This guide provides a detailed B2B checklist to objectively audit gym equipment suppliers in India.</p>`
  },
  'commercial-gym-setup-mumbai': {
    title: `Commercial Gym Setup in Mumbai | Turnkey Manufacturer & Supplier`,
    badge: `Mumbai Local Setup`,
    desc: `The complete turnkey guide to commercial gym setups, hotel amenities, and custom fight infrastructure in Mumbai and the MMR, backed by TechFit Byculla factory.`,
    h1: `Commercial Gym Setup in Mumbai: Factory-Direct B2B Turnkey Sourcing`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `City Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"}],
    faqs: [{"q":"Where is TechFit's manufacturing facility located?","a":"TechFit's primary manufacturing factory and corporate headquarters are located at Plot No 309, Coal Bunder Road E, Reay Road, Darukhana, Mumbai, Maharashtra 400010, India."}],
    htmlContent: `<h2>Mumbai Factory-Direct Turnkey Advantages</h2> <p>For gym owners, real estate developers, and corporate facility managers in the Mumbai Metropolitan Region (MMR), TechFit represents the ultimate B2B partner. Our state-of-the-art manufacturing factory is located directly in the heart of Mumbai (Byculla). This coastal proximity gives Mumbai clients unmatched B2B advantages: <strong>zero interstate transport delays</strong>, rapid on-site spatial design consultations, factory-direct pricing on custom-fabricated steel rigs and competition MMA cages, and **immediate, same-day AMC engineer dispatches** for absolute facility uptime.</p> <h2>Acoustic & Moisture-Proof Sourcing for Mumbai</h2> <p>Operating a commercial facility in Mumbai introduces unique geographic challenges. Our high-humidity coastal climate degrades cheap steel quickly; TechFit applies **specialized dual powder-coating protection** to all custom fabricated functional structures, cages, and racks, completely preventing rust. Additionally, we customize high-impact, soundproof rubber flooring tiles for Mumbai's high-density commercial spaces to isolate dropped weights and protect concrete structural floors from transferring noise to residential tenants below.</p>`
  },
  'commercial-gym-setup-pune': {
    title: `Commercial Gym Setup in Pune | Equipment & Custom Fabrication`,
    badge: `Pune Local Setup`,
    desc: `Turnkey commercial gym setups, IT park fitness amenities, and corporate wellness suites in Pune, Hinjewadi, Magarpatta, and Baner, backed by TechFit local support.`,
    h1: `Commercial Gym Setup in Pune: Premium Turnkey B2B Fitness Solutions`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `City Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"}],
    faqs: [{"q":"Does TechFit deliver and install in Pune?","a":"Yes. TechFit provides turnkey delivery, structural installation, and on-call AMC services throughout Pune, including Hinjewadi, Magarpatta, Baner, Koregaon Park, and Pimpri-Chinchwad, dispatched directly from our Mumbai factory corridor."}],
    htmlContent: `<h2>Turnkey B2B Sourcing for Pune's IT & Residential Hubs</h2> <p>Pune has emerged as a premier hub for premium IT corridors, upscale residential townships, and elite sports academies. In 2026, the city demands world-class fitness and wellness amenities in locations like Hinjewadi, Magarpatta, Baner, and Koregaon Park. TechFit specializes in delivering complete turnkey fitness infrastructures for Pune, combining premium imported European cardio (BH Fitness and Tunturi lines) with heavy-duty custom steel structures fabricated at our nearby Mumbai facility.</p>`
  },
  'commercial-gym-setup-bangalore': {
    title: `Commercial Gym Setup in Bangalore | Turnkey Equipment Supplier`,
    badge: `Bangalore Local Setup`,
    desc: `The premier guide for turnkey commercial gym setups, corporate wellness centers, and developer clubhouse amenities in Bangalore, Whitefield, and Electronic City.`,
    h1: `Commercial Gym Setup in Bangalore: Turnkey Sourcing & TechFit AMC Support`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `City Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"}],
    faqs: [{"q":"What is TechFit's delivery time to Bangalore?","a":"TechFit provides direct freight shipping and certified installation throughout Bengaluru (Whitefield, Electronic City, Sarjapur, Indiranagar, etc.) within 4–5 business days, dispatched securely from our Mumbai manufacturing warehouse."}],
    htmlContent: `<h2>Serving Bengaluru's Tech and Luxury Clubhouse Markets</h2> <p>As India's Silicon Valley, Bengaluru maintains the highest density of upscale residential clubhouse amenities, sprawling IT tech parks, and boutique fitness studios. The city's fitness demographic demands state-of-the-art cloud connectivity, elite biomechanics, and integrated recovery longevity spaces. TechFit delivers complete turnkey fitness environments throughout Bengaluru, including Whitefield, Electronic City, Sarjapur, and Indiranagar.</p>`
  },
  'commercial-gym-setup-hyderabad': {
    title: `Commercial Gym Setup in Hyderabad | Equipment & Court Setup`,
    badge: `Hyderabad Local Setup`,
    desc: `Turnkey commercial gym setups, hotel fitness amenities, and sports court (padel/pickleball) installations in Hyderabad, Gachibowli, and Jubilee Hills.`,
    h1: `Commercial Gym Setup in Hyderabad: Turnkey Fitness & Sports Court Construction`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `City Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"}],
    faqs: [{"q":"Does TechFit construct padel and pickleball courts in Hyderabad?","a":"Yes. TechFit provides turnkey panoramic padel court and professional pickleball court construction, steel structural framing, tempered safety glass, monofilament turf, and local engineering management in Hyderabad."}],
    htmlContent: `<h2>Premium Turnkey Gym & Sports Infrastructure for Hyderabad</h2> <p>Hyderabad's rapid commercial growth in Gachibowli, HITEC City, and Jubilee Hills has triggered a massive demand for high-end B2B gym setups, hospitality clubhouses, and professional sports court infrastructure. TechFit is Hyderabad's premier turnkey partner, integrating world-class imported cardio (BH Fitness) and strength stack lines with panoramic padel courts, pickleball courts, and custom functional steel rigs.</p>`
  },
  'commercial-gym-setup-delhi-ncr': {
    title: `Commercial Gym Setup in Delhi NCR | Turnkey B2B Equipment`,
    badge: `Delhi NCR Local Setup`,
    desc: `Turnkey B2B commercial gym setups, corporate fitness facilities, and custom functional training rigs in Delhi, Gurgaon, Noida, and the NCR.`,
    h1: `Commercial Gym Setup in Delhi NCR: Turnkey Gym Sourcing & Alteon Recovery`,
    author: `Ali Asgar Potia`,
    publishedDate: `2026-05-30`,
    category: `City Setup`,
    related: [{"slug":"commercial-gym-setup-cost-india","name":"Commercial Gym Setup Cost Guide"},{"slug":"how-to-set-up-a-commercial-gym","name":"How to Set Up a Gym Step-by-Step"}],
    faqs: [{"q":"How does TechFit manage installation and AMC in Delhi NCR?","a":"TechFit operates dedicated transport logistics from our Mumbai factory to the Delhi NCR region (Delhi, Gurgaon, Noida, Faridabad), providing certified installation and robust Annual Maintenance Contracts (AMC) with dedicated local service engineers."}],
    htmlContent: `<h2>Serving Delhi NCR's High-Density Corporate & Luxury Markets</h2> <p>The Delhi National Capital Region (NCR) — including Gurgaon, Noida, and premium Delhi neighborhoods — is the epicenter of elite corporate wellness, sprawling residential townships, and highly lucrative boutique studios. Gym operators in Delhi NCR require heavy-duty, certified commercial equipment with advanced digital connectivity, and integrated recovery longevity suites (Alteon hyperbaric oxygen and whole-body cryotherapy) to stand out in a competitive market.</p>`
  },
};


function renderGuide(slug) {
  const g = GUIDES_DATA[slug];
  if (!g) return render404();

  // Create Table of Contents dynamically by scanning H2 tags
  const h2Headers = [];
  const regex = /<h2>(.*?)<\/h2>/g;
  let match;
  let idx = 1;
  while ((match = regex.exec(g.htmlContent)) !== null) {
    h2Headers.push({ id: `toc-${idx}`, text: match[1] });
    idx++;
  }

  // Add IDs to htmlContent H2s dynamically for anchor scrolling
  let processedHtml = g.htmlContent;
  h2Headers.forEach(header => {
    processedHtml = processedHtml.replace(`<h2>${header.text}</h2>`, `<h2 id="${header.id}" style="color:#fff;font-size:1.8rem;margin:2.5rem 0 1.2rem;scroll-margin-top:100px">${header.text}</h2>`);
  });

  // Auto-link brands and features to prevent orphan pages
  const linkMap = [
    { regex: /\\b(BH Fitness)\\b/g, url: '/bh-fitness' },
    { regex: /\\b(Tunturi)\\b/g, url: '/tunturi' },
    { regex: /\\b(Alteon)\\b/g, url: '/alteon' },
    { regex: /\\b(California Fitness)\\b/g, url: '/california-fitness' },
    { regex: /\\b(commercial gym setup)\\b/gi, url: '/how-to-set-up-a-commercial-gym' },
    { regex: /\\b(CrossFit rig[s]?)\\b/gi, url: '/crossfit-rigs' },
    { regex: /\\b(MMA cage[s]?)\\b/gi, url: '/mma-cages' },
    { regex: /\\b(wellness solutions?)\\b/gi, url: '/wellness-solutions' },
    { regex: /\\b(hotel gym setup)\\b/gi, url: '/hotel-gym-setup-guide' }
  ];
  
  // We only replace if they aren't already inside an <a> tag. A simple way is to replace outside of HTML tags, but since our content is simple <p> and <h2>, we can just be careful. We'll skip replacing if it's already in an href or <h>. 
  // Given the simplicity, we'll just do a global replace where it's not preceded by =\" or > (if we were inside an a tag).
  // Actually, a simpler way is just replacing text that is not inside an anchor tag.
  // We can use a regex that matches text not inside <a...</a>
  linkMap.forEach(({regex, url}) => {
    processedHtml = processedHtml.replace(regex, (match, offset, string) => {
      // Very basic check: are we inside an <a> tag?
      const before = string.slice(0, offset);
      const after = string.slice(offset + match.length);
      if (before.lastIndexOf('<a ') > before.lastIndexOf('</a>')) return match;
      if (before.lastIndexOf('<h2') > before.lastIndexOf('</h2>')) return match;
      return `<a href="${url}" style="color:var(--red);text-decoration:underline" onclick="event.preventDefault();go('${url.slice(1)}')">${match}</a>`;
    });
  });


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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">${g.badge}</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0;line-height:1.15;font-weight:800">${g.h1}</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px">${g.desc}</p>
    <div style="display:flex;gap:1.5rem;align-items:center;margin-top:1.5rem;color:rgba(255,255,255,0.55);font-size:0.88rem">
      <span>By <strong>${g.author}</strong></span>
      <span>Published <strong>${g.publishedDate}</strong></span>
    </div>
  </section>
</section>

<section class="sec" style="background:#0c0c0e;color:rgba(255,255,255,0.85);line-height:1.8;padding:4rem 2rem">
  <section class="sec-in" style="max-width:900px;margin:0 auto">
    
    ${h2Headers.length > 0 ? `
    <div style="background:#121214;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.5rem;margin-bottom:2.5rem">
      <h3 style="color:#fff;margin:0 0 1rem;font-size:1.15rem;font-weight:700;letter-spacing:0.04em">TABLE OF CONTENTS</h3>
      <ul style="list-style-type:none;padding-left:0;margin:0">
        ${h2Headers.map(h => `<li style="margin-bottom:0.6rem"><a href="#${h.id}" style="color:var(--red);text-decoration:none;font-weight:600;font-size:0.95rem" onclick="event.preventDefault(); document.getElementById('${h.id}').scrollIntoView({behavior:'smooth'})">→ ${h.text}</a></li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <div class="guide-body-text">
      ${processedHtml}
    </div>

    ${g.faqs.length > 0 ? `
    <h2 style="color:#fff;font-size:1.8rem;margin:3.5rem 0 1.5rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:2.5rem">Frequently Asked Questions</h2>
    <div class="faq" style="margin-bottom:3rem">
      ${g.faqs.map(f => `
      <div class="faq-item" style="border-bottom:1px solid rgba(255,255,255,0.05);padding:1.2rem 0">
        <button class="faq-q" style="width:100%;text-align:left;background:transparent;border:none;color:#fff;font-size:1.05rem;font-weight:700;cursor:pointer;display:flex;justify-content:between;align-items:center;padding:0;outline:none">
          <span>${f.q}</span>
        </button>
        <div class="faq-a" style="margin-top:0.8rem;color:rgba(255,255,255,0.7);line-height:1.75;font-size:0.95rem">${f.a}</div>
      </div>
      `).join('')}
    </div>
    ` : ''}

    ${g.related.length > 0 ? `
    <div style="background:#121214;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1.5rem;margin:3rem 0;text-align:center">
      <h3 style="color:#fff;margin:0 0 1rem;font-size:1.15rem;font-weight:700">Related Guides & Resources</h3>
      <div style="display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap">
        ${g.related.map(r => `<a href="/${r.slug}" style="color:var(--red);text-decoration:none;font-weight:700" onclick="event.preventDefault(); go('${r.slug}')">${r.name} →</a>`).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Direct WhatsApp & Consultation CTA -->
    <div style="background:linear-gradient(to right, #27272a, #18181b);border:2px solid var(--red);border-radius:12px;padding:2.5rem;margin:3.5rem 0;text-align:center">
      <h2 style="color:#fff;font-size:1.8rem;margin:0 0 0.8rem">Ready to Set Up Your Facility?</h2>
      <p style="color:rgba(255,255,255,0.8);max-width:600px;margin:0 auto 2rem;line-height:1.7">Get direct-import European cardio lines, custom heavy-gauge steel rigs manufactured in Mumbai, and Alteon recovery suites under a single turnkey contract.</p>
      <div style="display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap">
        <a href="https://wa.me/919820166910" target="_blank" class="btn-red" style="background:#25d366;border-color:#25d366;display:inline-flex;align-items:center;gap:0.6rem;text-decoration:none">
          <svg style="width:20px;height:20px" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.466L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.589 0 10.134-4.524 10.137-10.087.001-2.696-1.044-5.228-2.946-7.132C16.662 1.48 14.135.435 11.988.435 6.4 1.435 1.857 5.96 1.854 11.523c0 1.636.43 3.23 1.248 4.675l-1.018 3.718 3.825-.997z"/></svg>
          Chat on WhatsApp
        </a>
        <button class="btn-red" onclick="go('contact')">Request Free Consultation</button>
      </div>
    </div>

  </section>
</section>

${footer()}
  `;
}


function renderAlternativesHub() {
  const alts = Object.keys(commercialPages).filter(k => k.startsWith('alternatives/') || k.includes('-alternative-') || k.includes('-vs-'));
  
  let gridHtml = '<div class="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:2rem;margin-top:2rem;">';
  for (const slug of alts) {
    gridHtml += `
      <div class="card" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);padding:1.5rem;border-radius:8px;">
        <h3 style="color:#fff;font-size:1.2rem;margin-bottom:1rem;line-height:1.4">${commercialPages[slug]}</h3>
        <button class="btn btn-ghost" onclick="go('${slug}')" style="width:100%;text-align:center">Read Comparison</button>
      </div>
    `;
  }
  gridHtml += '</div>';


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

  return `
<section class="phero" style="background:#09090b;padding:8rem 2rem 4rem;border-bottom:1px solid rgba(255,255,255,0.05)">
  <section class="sec-in" style="max-width:1000px;margin:0 auto;text-align:center">
    <div class="phero-label" style="color:var(--red);letter-spacing:.12em;text-transform:uppercase;font-weight:600;font-size:0.85rem">Brand Comparisons</div>
    <h1 style="color:#fff;font-size:clamp(2.2rem,5vw,3.5rem);margin:0.5rem 0 1.5rem;line-height:1.15;font-weight:800">Compare Commercial Gym Equipment Brands</h1>
    <p class="phero-sub" style="color:rgba(255,255,255,0.7);max-width:800px;margin:0 auto">Comprehensive, factual CapEx and sourcing comparisons between major global fitness brands and TechFit's direct-supply commercial infrastructure.</p>
  </section>
</section>
<section class="sec" style="background:#000;padding:4rem 2rem">
  <section class="sec-in" style="max-width:1200px;margin:0 auto">
    ${gridHtml}
  </section>
</section>
${footer()}
  `;
}

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


function render404() {
      return `
  <section class="sec sec-dark" style="min-height:70vh;display:flex;align-items:center;justify-content:center;text-align:center">
    <div class="sec-in">
      <h1 style="font-size:6rem;color:var(--red);margin-bottom:1rem;line-height:1">404</h1>
      <h2 style="color:#fff;margin-bottom:1.5rem">Page Not Found</h2>
      <p style="color:rgba(255,255,255,0.7);margin-bottom:2rem">The page you are looking for doesn't exist or has been moved.</p>
      <button class="btn-red" onclick="go('home')">Return to Home</button>
    </div>
  </section>
  ${footer()}
  `;
    }

    // ── ROUTING & INIT ──
    function parseUrl() {
      const path = window.location.pathname.substring(1) || 'home';
      const urlParams = new URLSearchParams(window.location.search);

      const validPages = ['home', 'for-gyms', 'for-developers', 'for-schools', 'for-hotels', 'techfit', 'alteon', 'bh-fitness', 'tunturi', 'california-fitness', 'mma-cages', 'crossfit-rigs', 'free-weights', 'padel-pickleball', 'aqua', 'wellness-solutions', 'services', 'about', 'contact', 'blogs', 'gym-flooring', 'flooring', 'blog-mfn', 'blog-sfl', 'blog-kumite', 'blog-mma-matrix', 'blog-one-stop', 'blog-wellness-boom', 'privacy-policy', 'case-studies', 'terms-of-service', 'thank-you', 'alternatives/technogym-india', 'alternatives/life-fitness-india', 'alternatives/sechrist-hyperbaric-india', 'alternatives/precor-india', 'alternatives/mecotec-cryotherapy-india', 'alternatives/usi-cosco-techfit-cages', 'commercial-gym-setup-cost-india', 'how-to-set-up-a-commercial-gym', 'best-commercial-treadmills-india', 'commercial-gym-equipment-list', 'hotel-gym-setup-guide', 'bh-fitness-vs-life-fitness', 'tunturi-vs-precor', 'best-gym-equipment-brands-india', 'imported-vs-indian-gym-equipment', 'gym-equipment-suppliers-india-compared', 'commercial-gym-setup-mumbai', 'commercial-gym-setup-pune', 'commercial-gym-setup-bangalore', 'commercial-gym-setup-hyderabad', 'commercial-gym-setup-delhi-ncr', 'commercial-gym-setup-chennai', 'commercial-gym-setup-kolkata', 'commercial-gym-setup-ahmedabad', 'commercial-gym-setup-jaipur', 'commercial-gym-setup-goa', 'commercial-gym-setup-chandigarh', 'commercial-gym-setup-surat', 'commercial-gym-setup-kochi', 'hotel-gym-setup-mumbai', 'hotel-gym-setup-pune', 'hotel-gym-setup-bangalore', 'hotel-gym-setup-delhi-ncr', 'hotel-gym-setup-hyderabad', 'society-gym-setup-mumbai', 'society-gym-setup-pune', 'society-gym-setup-bangalore', 'society-gym-setup-delhi-ncr', 'society-gym-setup-hyderabad', 'corporate-gym-setup-mumbai', 'corporate-gym-setup-pune', 'corporate-gym-setup-bangalore', 'corporate-gym-setup-delhi-ncr', 'corporate-gym-setup-hyderabad', 'matrix-fitness-alternative-india', 'cybex-alternative-india', 'hammer-strength-alternative-india', 'nautilus-alternative-india', 'cosco-vs-bh-fitness', 'viva-vs-tunturi', 'decathlon-domyos-vs-commercial-gym-equipment', 'alternatives/cybex-india', 'alternatives/hammer-strength-india', 'alternatives/nautilus-india', 'alternatives/star-trac-india', 'alternatives/body-solid-india', 'alternatives/hoist-fitness-india', 'alternatives/freemotion-india', 'alternatives/true-fitness-india', 'alternatives/american-fitness-india', 'alternatives/atlantis-strength-india', 'alternatives/fitline-india', 'alternatives/matrix-fitness-india', 'alternatives/jerai-fitness-india', 'alternatives/being-strong-india'];

      if (validPages.includes(path) || path === '') {
        page = path || 'home';
      } else {
        page = '404';
      }
      brand = urlParams.get('brand') || null;
      cat = urlParams.get('cat') || 'All';
    }

    window.addEventListener('popstate', (e) => {
      if (e.state) {
        page = e.state.p;
        brand = e.state.b;
        cat = e.state.c || 'All';
      } else {
        parseUrl();
      }
      render(); navActive(); updateSEO();
      window.prerenderReady = true;
      // Initialize scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }, 500);

    });

    async function initApp() {
      try {
        const [prodRes, blogRes] = await Promise.all([
          fetch('/assets/products.json'),
          fetch('/assets/blogs.json')
        ]);
        PRODUCTS = await prodRes.json();
        BLOG_POSTS = await blogRes.json();
      } catch (e) {
        
      }
      parseUrl();
      render(); navActive(); updateSEO();
      window.prerenderReady = true;
      // Initialize scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }, 500);

    }
    initApp();

    // Global conversion tracking for WhatsApp, Phone Call, and Email link clicks
    document.addEventListener('click', function (e) {
      var waLink = e.target.closest('a[href*="wa.me"]');
      var telLink = e.target.closest('a[href^="tel:"]');
      var mailLink = e.target.closest('a[href^="mailto:"]');
      if (waLink) {
        fireConversion(GAW_WHATSAPP_LABEL, 'Global WhatsApp Click');
      } else if (telLink) {
        fireConversion(GAW_PHONE_LABEL, 'Global Phone Click');
      } else if (mailLink) {
        fireConversion(GAW_EMAIL_LABEL, 'Global Email Click');
      }
    });