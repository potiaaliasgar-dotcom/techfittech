import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const OUT_FILENAME = 'TechFit-Commercial-Gym-Setup-Cost-Guide-India-2026.pdf';

function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

async function generatePDF() {
  const publicPath = path.resolve('public/lead-magnets', OUT_FILENAME);
  const distPath = path.resolve('dist/lead-magnets', OUT_FILENAME);

  ensureDirectoryExists(publicPath);
  ensureDirectoryExists(distPath);

  // Initialize PDF Document
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    bufferPages: true // permits page numbering at end
  });

  // Pipe to files
  const publicStream = fs.createWriteStream(publicPath);
  doc.pipe(publicStream);

  // Styling Constants (TechFit Corporate Charcoal/Slate & Red Theme)
  const colors = {
    red: '#DC2626',
    charcoal: '#18181B',
    white: '#FFFFFF',
    gray: '#71717A',
    lightGray: '#F4F4F5',
    darkBg: '#09090B'
  };

  // ----------------------------------------------------
  // PAGE 1: COVER PAGE
  // ----------------------------------------------------
  // Background Block
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.darkBg);
  
  // Decorative red border on left
  doc.rect(0, 0, 15, doc.page.height).fill(colors.red);

  // Title elements
  doc.fillColor(colors.white)
     .font('Helvetica-Bold')
     .fontSize(16)
     .text('TECHFIT HEALTH & FITNESS', 60, 180, { characterSpacing: 1 });

  doc.fillColor(colors.red)
     .fontSize(32)
     .text('COMMERCIAL GYM SETUP', 60, 215, { characterSpacing: 0.5 });
     
  doc.fillColor(colors.white)
     .fontSize(32)
     .text('COST GUIDE & ROADMAP', 60, 255);

  doc.fillColor(colors.gray)
     .fontSize(13)
     .font('Helvetica')
     .text('AN AUTHORITATIVE SOURCE SOURCING BLUEPRINT FOR B2B DEVELOPERS, HOTELIERS, AND GYM OWNERS IN INDIA', 60, 310, { width: 450, lineGap: 4 });

  doc.rect(60, 360, 200, 2).fill(colors.red);

  doc.fillColor(colors.white)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('2026 EDITION', 60, 390);

  doc.fillColor(colors.gray)
     .fontSize(10)
     .font('Helvetica')
     .text('TECHFIT FACTORY & HEADQUARTERS: BYCULLA, MUMBAI', 60, doc.page.height - 80);

  // ----------------------------------------------------
  // PAGE 2: WHY LOCAL INDIAN GYM SETUP WINS
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'WHY LOCAL B2B FABRICATION & SETUP WINS', colors);
  
  let y = 100;
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('The B2B Commercial Advantage in India', 50, y);
  
  y += 25;
  doc.font('Helvetica')
     .fontSize(10.5)
     .fillColor(colors.charcoal)
     .text('Setting up a professional commercial gym or sports facility in India has traditionally suffered from two major operational bottlenecks: high import markups on standard brand catalogues and long shipping times. TechFit solves these bottlenecks through direct factory-sourcing and bespoke domestic fabrication.', 50, y, { width: 495, lineGap: 5 });

  y += 85;
  // Core advantages list
  const advantages = [
    {
      title: '1. Up to 40% Net Cost Savings via Factory-Direct Sourcing',
      desc: 'By sourcing directly from primary global brands like BH Fitness and Tunturi, and custom fabricating heavy steel rigs and cages domestically in Byculla, Mumbai, we completely bypass third-party trading markups and international sea-freight overheads.'
    },
    {
      title: '2. Zero Customs & Transit Delays',
      desc: 'Importing heavy steel structures from overseas frequently incurs 12-16 weeks of sea shipping and clearance bottlenecks. TechFit manufactures frames, rigs, and cages locally, enabling immediate delivery, seamless installation, and guaranteed schedules.'
    },
    {
      title: '3. Lifetime Structural Frame Warranty',
      desc: 'All custom-fabricated combat octagons, functional training rigs, and free weight storage frames are welded from structural-grade 11-gauge steel (4mm+ thickness) at our Mumbai facility. We stand behind our steelwork with an industry-leading lifetime warranty.'
    },
    {
      title: '4. Direct Localized Support & Annual Maintenance (AMC)',
      desc: 'Having a localized factory partner ensures immediate access to replacement parts, certified service engineers, and robust monthly preventive maintenance contracts, maximizing your operational uptime.'
    }
  ];

  advantages.forEach(adv => {
    doc.fillColor(colors.red)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text(adv.title, 50, y);
    
    y += 18;
    doc.fillColor(colors.charcoal)
       .font('Helvetica')
       .fontSize(9.5)
       .text(adv.desc, 50, y, { width: 495, lineGap: 4 });
    
    y += 45;
  });

  // ----------------------------------------------------
  // PAGE 3: EQUIPMENT CATEGORIES & INDICATIVE COST BANDS
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'EQUIPMENT CATEGORIES & COST BANDS', colors);

  y = 100;
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(13)
     .text('Indicative Commercial Project Estimates (INR)', 50, y);

  y += 20;
  doc.font('Helvetica')
     .fontSize(9.5)
     .fillColor(colors.charcoal)
     .text('The cost bands listed below are high-level indicative estimates for commercial project scoping. Exact figures depend heavily on facility dimensions, selected equipment lines, and structural steel customization.', 50, y, { width: 495 });

  // Table setup
  y += 45;
  const headers = ['Category', 'Indicative Price Range (INR)', 'Lead Time & Warranty'];
  const rows = [
    ['Commercial Cardio Line (BH/Tunturi)', '12,00,000 - 45,00,000', '15-45 Days / 3-Yr Motor'],
    ['Selectorized & Strength Stations', '15,00,000 - 55,00,000', '20-60 Days / Lifetime Frame'],
    ['Custom Custom-fabricated Rigs', '3,50,000 - 15,00,000', '15-25 Days / Lifetime Warranty'],
    ['MMA Cages & Competition Rings', '2,50,000 - 9,50,000', '10-20 Days / Lifetime Warranty'],
    ['Sports Infrastructure (Padel Courts)', '18,00,000 - 32,00,000', '30-45 Days / 5-Yr Turf & Glass'],
    ['Alteon Wellness & Longevity Suites', '25,00,000 - 95,00,000', '45-90 Days / 2-Yr Clinical'],
    ['Gym Flooring & Underlayments', '2,00,000 - 12,00,000', '10-15 Days / 2-Yr Warranty']
  ];

  // Draw Header Row
  doc.rect(50, y, 495, 24).fill(colors.charcoal);
  doc.fillColor(colors.white).font('Helvetica-Bold').fontSize(9.5);
  doc.text(headers[0], 60, y + 7, { width: 180 });
  doc.text(headers[1], 240, y + 7, { width: 160 });
  doc.text(headers[2], 410, y + 7, { width: 120 });
  
  y += 24;

  // Draw Rows
  doc.font('Helvetica').fontSize(9);
  rows.forEach((row, i) => {
    const bg = i % 2 === 0 ? colors.lightGray : colors.white;
    doc.rect(50, y, 495, 24).fill(bg);
    doc.fillColor(colors.charcoal);
    doc.text(row[0], 60, y + 7, { width: 180 });
    doc.text(row[1], 240, y + 7, { width: 160 });
    doc.text(row[2], 410, y + 7, { width: 120 });
    y += 24;
  });

  // Note text
  y += 25;
  doc.fillColor(colors.gray)
     .font('Helvetica-Oblique')
     .fontSize(8.5)
     .text('* Note: Pricing ranges represent standard premium commercial setups. Padel court pricing includes high-strength tempered glass, structural-steel support frames, and ITF-certified artificial turf systems. Wellness suite covers Elysion Hard-Shell HBOT, Cryoblast Electric Chambers, and Photobiomodulation (PBM) red-light setups.', 50, y, { width: 495, lineGap: 3 });

  // ----------------------------------------------------
  // PAGE 4: COMMERCIAL SETUP PHASES & ROADMAP
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'TURNKEY COMMERCIAL GYM SETUP ROADMAP', colors);

  y = 100;
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Step-by-Step B2B Implementation Flow', 50, y);

  y += 25;
  doc.font('Helvetica')
     .fontSize(10.5)
     .text('From initial space analysis to custom engineering, manufacturing, certified installation, and operational handover, TechFit guarantees a seamless implementation pipeline.', 50, y, { width: 495, lineGap: 4 });

  y += 55;
  const phases = [
    {
      num: 'PHASE 01',
      title: 'B2B Technical Space Audit & 3D Layout (Days 1 - 5)',
      desc: 'Our design team conducts a thorough space audit, mapping columns, electrical loads, and structural floor tolerances. We generate comprehensive 2D CAD and 3D mockups mapping equipment spacing, safety run-offs, and athlete flow patterns.'
    },
    {
      num: 'PHASE 02',
      title: 'Custom Fabrication & Equipment Sourcing (Days 5 - 25)',
      desc: 'Heavy strength frames, functional CrossFit rigs, and custom fight cages enter fabrication at our Byculla workshop. High-performance cardio systems and wellness capsules are prepared for dispatch with tailored console selections.'
    },
    {
      num: 'PHASE 03',
      title: 'Vibration & Acoustic Flooring Underlayment (Days 20 - 28)',
      desc: 'We lay down premium, high-density shock-absorption rubber tiles, acoustic underlayments, and dynamic sprint turfs. This prevents structural vibration transmission, eliminates sound issues, and protects the base sub-floor.'
    },
    {
      num: 'PHASE 04',
      title: 'Certified Technical Installation & Handover (Days 25 - 35)',
      desc: 'TechFit factory engineers perform complete, certified hardware assembly. We anchor custom rigs, tension cage wire panels, calibrate clinical Alteon wellness chambers, and run rigorous load-testing before operational handover.'
    }
  ];

  phases.forEach(phase => {
    // Left marker block
    doc.rect(50, y, 4, 45).fill(colors.red);

    doc.fillColor(colors.red)
       .font('Helvetica-Bold')
       .fontSize(9.5)
       .text(phase.num, 65, y);

    doc.fillColor(colors.charcoal)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text(phase.title, 65, y + 12);

    doc.fillColor(colors.charcoal)
       .font('Helvetica')
       .fontSize(9.5)
       .text(phase.desc, 65, y + 27, { width: 480, lineGap: 4 });

    y += 75;
  });

  // ----------------------------------------------------
  // PAGE 5: SIGNATURE CASE STUDIES
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'SIGNATURE B2B COMMERCIAL CASE STUDIES', colors);

  y = 100;
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Proven High-Performance Infrastructure In Action', 50, y);

  y += 25;
  doc.font('Helvetica')
     .fontSize(10.5)
     .text('TechFit has fabricated and supplied professional gym and combat-sports infrastructure to India\'s most prestigious fight leagues and signature sports academies.', 50, y, { width: 495, lineGap: 4 });

  y += 55;
  const cases = [
    {
      title: 'Matrix Fight Night (MFN) — Competition Cages & Rings',
      desc: 'TechFit is the official competition cage and boxing ring fabrication partner for Matrix Fight Night (MFN 1-15), India\'s premier professional MMA promotion founded by Tiger Shroff and Ayesha Shroff. We custom fabricate elevated competition octagons, floor training cages, and podium structures, engineered to withstand massive structural impact.'
    },
    {
      title: 'Super Fight League (SFL) — High-Strength Combat Infrastructure',
      desc: 'We manufactured and supplied the heavy-duty, reinforced structural steel combat cages for televised Super Fight League (SFL) stadium tournaments. Our octagons utilize customized corner cushion padding, high-tensile vinyl chainlink netting, and custom-tensioned canvas boards.'
    },
    {
      title: 'MMA Matrix Gyms — Custom Combat & CrossFit Setups',
      desc: 'TechFit engineered, manufactured, and installed complete, integrated functional training setups, custom strength rigs, combat training octagons, and specialized boxing frames for Tiger Shroff\'s signature MMA Matrix fitness centers across India, validating our commercial durability.'
    }
  ];

  cases.forEach(c => {
    doc.fillColor(colors.red)
       .font('Helvetica-Bold')
       .fontSize(11.5)
       .text(c.title, 50, y);

    y += 18;
    doc.fillColor(colors.charcoal)
       .font('Helvetica')
       .fontSize(9.5)
       .text(c.desc, 50, y, { width: 495, lineGap: 4 });

    y += 50;
  });

  // ----------------------------------------------------
  // PAGE 6: BRAND PORTFOLIO
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'PREMIUM COMMERCIAL BRAND PORTFOLIO', colors);

  y = 100;
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Authorized Global Sourcing & Distribution', 50, y);

  y += 25;
  doc.font('Helvetica')
     .fontSize(10.5)
     .text('TechFit is the authorized commercial partner and dealer in India for world-class, premium strength, recovery, and cardio brands.', 50, y, { width: 495, lineGap: 4 });

  y += 50;
  const brands = [
    {
      title: 'BH Fitness — Commercial Gym Equipment (Spain)',
      desc: 'A world-leading commercial fitness brand with over 100 years of engineering heritage. Sourced directly from Spain, featuring unmatched ergonomics, biomechanics, and premium touchscreen displays (Movemia and Inertia lines).'
    },
    {
      title: 'Tunturi — Premium Strength & Wellness (Netherlands)',
      desc: 'Pioneers of European fitness and wellness. Tunturi cardio and commercial strength stations represent absolute precision engineering, clean Scandinavian aesthetics, and commercial-grade durability.'
    },
    {
      title: 'Alteon — Clinical Biohacking & Recovery Suites',
      desc: 'Premium longevity and recovery equipment, including monoplace hyperbaric oxygen chambers (HBOT), pure electric electric whole-body cryotherapy cabins, waterless dry float beds, and high-performance red light panels.'
    },
    {
      title: 'California Fitness — Heavy Selectorized Strength',
      desc: 'Maximum strength selectorized machines and plate-loaded stations. Engineered using thick-wall structural steel, heavy-duty pulleys, and precise biomechanical pivot angles for commercial power gyms.'
    }
  ];

  brands.forEach(b => {
    doc.fillColor(colors.red)
       .font('Helvetica-Bold')
       .fontSize(11)
       .text(b.title, 50, y);

    y += 16;
    doc.fillColor(colors.charcoal)
       .font('Helvetica')
       .fontSize(9.5)
       .text(b.desc, 50, y, { width: 495, lineGap: 4 });

    y += 45;
  });

  // ----------------------------------------------------
  // PAGE 7: CONTACT & ENQUIRY
  // ----------------------------------------------------
  doc.addPage();
  drawPageHeader(doc, 'READY TO PLAN YOUR CUSTOM B2B GYM SETUP?', colors);

  y = 100;
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(14)
     .text('Collaborate Directly with our Mumbai Factory Team', 50, y);

  y += 25;
  doc.font('Helvetica')
     .fontSize(10.5)
     .text('Whether you are a developer scoping a residential high-rise amenity, a hotel chain developing a recovery lounge, or a premium gym owner building a signature venue — TechFit delivers turnkey B2B excellence.', 50, y, { width: 495, lineGap: 4.5 });

  y += 60;
  
  // Grey Contact box
  doc.rect(50, y, 495, 160).fill(colors.lightGray);
  
  doc.fillColor(colors.charcoal)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('TECHFIT HEALTH & FITNESS PVT. LTD.', 70, y + 20);

  doc.font('Helvetica')
     .fontSize(9.5)
     .fillColor(colors.charcoal)
     .text('Factory & HQ: Plot No 309, Coal Bunder Road E, Reay Road, Darukhana, Mumbai, Maharashtra 400010, India', 70, y + 45)
     .text('Sales Hotline: +91 98201 66910', 70, y + 65)
     .text('WhatsApp: +91 98201 66910 (Click Link on Website for Instant Chat)', 70, y + 85)
     .text('Email: info@techfitactive.com | Website: www.techfittech.com', 70, y + 105);

  y += 200;
  doc.fillColor(colors.red)
     .font('Helvetica-Bold')
     .fontSize(11)
     .text('Get a Free Turnkey Layout & B2B Quotation:', 50, y);

  y += 18;
  doc.fillColor(colors.charcoal)
     .font('Helvetica')
     .fontSize(9.5)
     .text('Scan the QR code on our website or visit www.techfittech.com/contact to submit your dimensional floor layouts. Our engineering team will supply detailed 2D/3D layouts and customized equipment quotes within 2 business days.', 50, y, { width: 495, lineGap: 4 });

  // ----------------------------------------------------
  // FOOTERS & PAGE NUMBERING (Walk backward over all pages)
  // ----------------------------------------------------
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    
    // Add page numbers to all pages except the cover page
    if (i > 0) {
      doc.fillColor(colors.gray)
         .font('Helvetica')
         .fontSize(8.5)
         .text(`Page ${i + 1} of ${range.count}`, 50, doc.page.height - 40, { align: 'right', width: 495 })
         .text('TECHFIT Active — 2026 Commercial Gym Setup Guide', 50, doc.page.height - 40, { align: 'left' });
    }
  }

  // End and write
  doc.end();

  // Wait for streams to finish
  const distStream = fs.createWriteStream(distPath);
  doc.pipe(distStream);

  await new Promise((resolve) => {
    publicStream.on('finish', resolve);
  });

  console.log(`\n🎉 PDF Guide generated successfully!`);
  console.log(`- Public path: ${publicPath}`);
  console.log(`- Dist path: ${distPath}`);
}

function drawPageHeader(doc, title, colors) {
  // Decorative red top line
  doc.rect(50, 45, 495, 2).fill(colors.red);
  
  // Page Title Header
  doc.fillColor(colors.gray)
     .font('Helvetica-Bold')
     .fontSize(8)
     .text('TECHFIT COMMERCIAL SETUP ROADMAP & B2B COST GUIDE', 50, 32, { characterSpacing: 0.5 });

  doc.fillColor(colors.red)
     .font('Helvetica-Bold')
     .fontSize(10)
     .text(title.toUpperCase(), 50, 60, { characterSpacing: 0.5 });
}

generatePDF().catch(err => {
  console.error('Fatal error generating B2B guide PDF:', err);
  process.exit(1);
});
