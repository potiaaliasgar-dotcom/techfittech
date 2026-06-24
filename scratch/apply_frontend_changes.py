import os

base_path = '/Users/batman/Desktop/techfittech'

# File paths
app_js_path = os.path.join(base_path, 'public/assets/app.js')
index_html_path = os.path.join(base_path, 'index.html')
gen_seo_path = os.path.join(base_path, 'scripts/generate-seo-pages.mjs')
pdf_guide_path = os.path.join(base_path, 'scripts/generate-pdf-guide.js')

def replace_in_file(path, replacements):
    if not os.path.exists(path):
        print(f"Skipping: {path} (not found)")
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_len = len(content)
    replaced_count = 0
    for target, replacement in replacements:
        if target in content:
            content = content.replace(target, replacement)
            replaced_count += 1
        else:
            print(f"Warning: target not found in {os.path.basename(path)}:\n{target[:100]}...")
            
    if replaced_count > 0:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated {os.path.basename(path)} with {replaced_count} changes.")
    else:
        print(f"No changes made in {os.path.basename(path)}.")

# 1. Replacements for app.js
app_js_replacements = [
    # SEO MAP replacements
    (
        "      'home': {\n        title: 'TechFit | Gym, Wellness & Sports Infrastructure India | Mumbai',\n        desc: 'TechFit is India\\'s one-stop gym, wellness and sports infrastructure partner. Authorised dealer for BH Fitness, Tunturi, California Fitness & Alteon. Mumbai-based.',\n        img: DEFAULT_OG_IMG\n      },",
        "      'home': {\n        title: 'TechFit | Gym, Wellness & Sports Infrastructure',\n        desc: 'TechFit is a one-stop gym, wellness and sports infrastructure partner. Reseller for BH Fitness, Tunturi, California Fitness, and Official Distributor for Alteon Wellness.',\n        img: DEFAULT_OG_IMG\n      },"
    ),
    (
        "      'alteon': {\n        title: 'Alteon Wellness & Recovery | Hyperbaric, Cryotherapy, Red-Light Therapy India',\n        desc: 'Alteon by TechFit — premium wellness and recovery technology. Hyperbaric oxygen chambers, cryotherapy, red-light therapy, dry-float, IHHT and more for clinics, hotels and gyms.',\n        img: DEFAULT_OG_IMG\n      },",
        "      'alteon': {\n        title: 'Alteon Wellness & Recovery | Official Distributor — Cryotherapy, HBOT, Red-Light',\n        desc: 'TechFit is the official distributor of Alteon Wellness & Recovery. Premium recovery technology — hyperbaric oxygen chambers, cryotherapy, red-light therapy, dry-float, IHHT and more.',\n        img: DEFAULT_OG_IMG\n      },"
    ),
    (
        "      'bh-fitness': {\n        title: 'BH Fitness India | Authorised Dealer — Treadmills, Bikes, Ellipticals',\n        desc: 'TechFit is the authorised dealer of BH Fitness commercial gym equipment in India. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',\n        img: DEFAULT_OG_IMG\n      },",
        "      'bh-fitness': {\n        title: 'BH Fitness | Reseller — Treadmills, Bikes, Ellipticals',\n        desc: 'TechFit is a reseller of BH Fitness commercial gym equipment. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',\n        img: DEFAULT_OG_IMG\n      },"
    ),
    (
        "      'tunturi': {\n        title: 'Tunturi India | Authorised Dealer — Nordic Fitness Equipment',\n        desc: 'TechFit is the authorised dealer of Tunturi fitness equipment in India. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',\n        img: DEFAULT_OG_IMG\n      },",
        "      'tunturi': {\n        title: 'Tunturi | Reseller — Nordic Fitness Equipment',\n        desc: 'TechFit is a reseller of Tunturi fitness equipment. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',\n        img: DEFAULT_OG_IMG\n      },"
    ),
    (
        "      'california-fitness': {\n        title: 'California Fitness India | Authorised Dealer — Commercial Gym Equipment',\n        desc: 'TechFit is the authorised dealer of California Fitness in India. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',\n        img: DEFAULT_OG_IMG\n      },",
        "      'california-fitness': {\n        title: 'California Fitness | Reseller — Commercial Gym Equipment',\n        desc: 'TechFit is a reseller of California Fitness. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',\n        img: DEFAULT_OG_IMG\n      },"
    ),
    # Alteon partner text in app.js
    (
        "TechFit is the authorised dealer for Alteon Wellness &amp; Recovery in India. Speak to us about integrating Alteon&#x2019;s technology into your gym, hotel, or wellness centre.",
        "TechFit is the official distributor of Alteon Wellness &amp; Recovery. Speak to us about integrating Alteon&#x2019;s technology into your gym, hotel, or wellness centre."
    ),
    # Hero text
    (
        "India's gym, wellness &amp; sports infrastructure partner. 800+ installations delivered. Authorised Dealer for BH Fitness, Tunturi, California, Alteon Wellness.",
        "Gym, wellness &amp; sports infrastructure partner. 800+ installations delivered. Reseller for BH Fitness, Tunturi, and California Fitness, and <a href=\"/alteon\" onclick=\"event.preventDefault(); go('alteon')\" style=\"color:var(--red);text-decoration:underline;font-weight:600\">Official Distributor for Alteon Wellness &amp; Recovery</a>."
    ),
    # Homepage custom supply text
    (
        "<p>Authorised dealer of BH Fitness, Tunturi and California Fitness, plus TechFit's own fabricated range.</p>",
        "<p>Reseller of BH Fitness, Tunturi and California Fitness, plus TechFit's own fabricated range.</p>"
    ),
    # Segment gyms FAQ
    (
        "['What brands do you supply?', 'We are the authorised dealer for BH Fitness, Tunturi, and California Fitness. We also manufacture our own MMA cages, CrossFit rigs, and free weights.'],",
        "['What brands do you supply?', 'We resell BH Fitness, Tunturi, and California Fitness. We also manufacture our own MMA cages, CrossFit rigs, and free weights.'],"
    ),
    # Services card description
    (
        "<p>Authorised dealer of BH Fitness, Tunturi, and California Fitness plus TechFit's own fabricated range.</p>",
        "<p>Reseller of BH Fitness, Tunturi, and California Fitness plus TechFit's own fabricated range.</p>"
    ),
    # About page dealership text
    (
        "<p>Authorised dealer for BH Fitness, Tunturi and California Fitness &mdash; covering every commercial and residential budget segment.</p>",
        "<p>Reseller for BH Fitness, Tunturi and California Fitness &mdash; covering every commercial and residential budget segment.</p>"
    ),
    # About page brand dealership card
    (
        "<h3>Equipment Distribution</h3>\n        <p>Authorised dealer for BH Fitness, Tunturi and California Fitness &mdash; covering every commercial and residential budget segment.</p>",
        "<h3>Equipment Sourcing</h3>\n        <p>Reseller for BH Fitness, Tunturi and California Fitness &mdash; covering every commercial and residential budget segment.</p>"
    ),
    # Brand details: BH Fitness
    (
        'badge: "Europe\'s No.1 Fitness Brand · Authorised Dealer India",',
        'badge: "Europe\'s No.1 Fitness Brand · Reseller",',
    ),
    (
        'desc: "BH Fitness is Europe\\\'s leading fitness equipment brand, trusted by over 7,000 commercial gyms worldwide. As the authorised dealer, we supply the full BH Fitness range — MOVEMIA connected cardio, INERTIA commercial line, PL Series selectorized strength, AFT360 functional training, and more.",',
        'desc: "BH Fitness is Europe\\\'s leading fitness equipment brand, trusted by over 7,000 commercial gyms worldwide. As a reseller, we supply the full BH Fitness range — MOVEMIA connected cardio, INERTIA commercial line, PL Series selectorized strength, AFT360 functional training, and more.",',
    ),
    # Brand details: Tunturi
    (
        "badge: 'Finnish Precision Since 1922 · Authorised Dealer India',",
        "badge: 'Finnish Precision Since 1922 · Reseller',",
    ),
    (
        "desc: 'Tunturi has been engineering premium fitness equipment in Finland since 1922. Authorised Indian partner for the full commercial range — treadmills, ellipticals, rowers and spin bikes; and the complete strength line including SUBLIME (pin-loaded selectorised), STERLING (plate-loaded), PA and EVOLUTION series, plus benches, racks, power racks and free weights.',",
        "desc: 'Tunturi has been engineering premium fitness equipment in Finland since 1922. Reseller for the full commercial range — treadmills, ellipticals, rowers and spin bikes; and the complete strength line including SUBLIME (pin-loaded selectorised), STERLING (plate-loaded), PA and EVOLUTION series, plus benches, racks, power racks and free weights.',",
    ),
    (
        "'Authorised India dealer — local service, local stock, local spares'",
        "'Reseller — local service, local stock, local spares'"
    ),
    # Brand details: California Fitness
    (
        "badge: 'Commercial Grade · Authorised Dealer India',",
        "badge: 'Commercial Grade · Reseller',",
    ),
    # app.js comparative guides
    (
        "TechFit is the authorized B2B dealer of <strong>BH Fitness Spain</strong>",
        "TechFit is a B2B reseller of <strong>BH Fitness Spain</strong>"
    ),
    (
        "holding ready stock of authorized BH Fitness cardio",
        "holding ready stock of BH Fitness cardio"
    ),
    (
        "TechFit holds direct authorized distribution rights in India for elite international brands, including Spain's premier **BH Fitness** (for commercial cardio and selectorized strength) and Finland's historic **Tunturi** (Nordic cardio and light-commercial conditioning gear).",
        "TechFit resells elite international brands, including Spain's premier **BH Fitness** (for commercial cardio and selectorized strength) and Finland's historic **Tunturi** (Nordic cardio and light-commercial conditioning gear)."
    ),
    (
        "TechFit is the authorized B2B dealer of <strong>BH Fitness Spain</strong> and <strong>Tunturi Finland</strong>.",
        "TechFit is a B2B reseller of <strong>BH Fitness Spain</strong> and <strong>Tunturi Finland</strong>."
    ),
    # Techfit page dealership text
    (
        "We bring manufacturing capability, brand dealership, and installation expertise under one roof",
        "We bring manufacturing capability, brand reselling, and installation expertise under one roof"
    )
]

# 2. Replacements for index.html
index_html_replacements = [
    # Homepage descriptions (line 30, 43, 54)
    (
        'content="India\'s gym, wellness &amp; sports infrastructure partner. 800+ installations delivered. Authorised Dealer for BH Fitness, Tunturi, California, Alteon Wellness">',
        'content="Gym, wellness &amp; sports infrastructure partner. 800+ installations delivered. Reseller for BH Fitness, Tunturi, California, and Official Distributor for Alteon Wellness">'
    ),
    (
        'content="India\'s gym, wellness &amp; sports infrastructure partner. 800+ installations delivered. Authorised Dealer for BH Fitness, Tunturi, California, Alteon Wellness"',
        'content="Gym, wellness &amp; sports infrastructure partner. 800+ installations delivered. Reseller for BH Fitness, Tunturi, California, and Official Distributor for Alteon Wellness"'
    ),
    # Navbar updates for Alteon
    (
        '<button class="nd-item" onclick="go(\'alteon\')">Alteon Wellness</button>',
        '<button class="nd-item" onclick="go(\'alteon\')" style="color:var(--red);font-weight:600">Alteon Wellness &amp; Recovery (Official Distributor)</button>'
    ),
    (
        '<button class="mob-sub" onclick="go(\'alteon\')">Alteon Wellness</button>',
        '<button class="mob-sub" onclick="go(\'alteon\')" style="color:var(--red);font-weight:600">Alteon Wellness &amp; Recovery (Official Distributor)</button>'
    )
]

# 3. Replacements for generate-seo-pages.mjs
gen_seo_replacements = [
    # SEO Map replacements
    (
        "  'bh-fitness': {\n    title: 'BH Fitness India | Authorised Dealer — Treadmills, Bikes, Ellipticals',\n    desc: 'TechFit is the authorised dealer of BH Fitness commercial gym equipment in India. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',\n    h1: 'BH Fitness India | Authorised Dealer — Treadmills, Bikes, Ellipticals',",
        "  'bh-fitness': {\n    title: 'BH Fitness | Reseller — Treadmills, Bikes, Ellipticals',\n    desc: 'TechFit is a reseller of BH Fitness commercial gym equipment. Treadmills, exercise bikes, ellipticals and strength machines for gyms, hotels and corporates.',\n    h1: 'BH Fitness | Reseller — Treadmills, Bikes, Ellipticals',"
    ),
    (
        "  'tunturi': {\n    title: 'Tunturi India | Authorised Dealer — Nordic Fitness Equipment',\n    desc: 'TechFit is the authorised dealer of Tunturi fitness equipment in India. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',\n    h1: 'Tunturi India | Authorised Dealer — Nordic Fitness Equipment',",
        "  'tunturi': {\n    title: 'Tunturi | Reseller — Nordic Fitness Equipment',\n    desc: 'TechFit is a reseller of Tunturi fitness equipment. From Finland — premium cardio, strength and functional-training gear for commercial and home gyms.',\n    h1: 'Tunturi | Reseller — Nordic Fitness Equipment',"
    ),
    (
        "  'california-fitness': {\n    title: 'California Fitness India | Authorised Dealer — Commercial Gym Equipment',\n    desc: 'TechFit is the authorised dealer of California Fitness in India. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',\n    h1: 'California Fitness India | Authorised Dealer — Gym Equipment',",
        "  'california-fitness': {\n    title: 'California Fitness | Reseller — Commercial Gym Equipment',\n    desc: 'TechFit is a reseller of California Fitness. Professional-grade cardio and strength equipment for gyms, studios and fitness chains.',\n    h1: 'California Fitness | Reseller — Gym Equipment',"
    ),
    (
        "  'alteon': {\n    title: 'Alteon Wellness & Recovery | Hyperbaric, Cryotherapy, Red-Light Therapy India',\n    desc: 'Alteon by TechFit — premium wellness and recovery technology. Hyperbaric oxygen chambers, cryotherapy, red-light therapy, dry-float, IHHT and more for clinics, hotels and gyms.',\n    h1: 'Alteon Wellness & Recovery Technology India',",
        "  'alteon': {\n    title: 'Alteon Wellness & Recovery | Official Distributor — Cryotherapy, HBOT, Red-Light',\n    desc: 'TechFit is the official distributor of Alteon Wellness & Recovery. Premium recovery technology — hyperbaric oxygen chambers, cryotherapy, red-light therapy, dry-float, IHHT and more.',\n    h1: 'Alteon Wellness & Recovery Technology',"
    ),
    # category names in generate-seo-pages.mjs
    (
        "    'bh-fitness': 'BH Fitness Equipment',",
        "    'bh-fitness': 'BH Fitness Reselling',"
    ),
    (
        "    'tunturi': 'Tunturi Wellness Equipment',",
        "    'tunturi': 'Tunturi Wellness Sourcing',"
    ),
    (
        "    'california-fitness': 'California Fitness Strength Equipment',",
        "    'california-fitness': 'California Fitness Strength Sourcing',"
    ),
    (
        "    'alteon': 'Alteon Hyperbaric/Cryotherapy Setup',",
        "    'alteon': 'Alteon Longevity & Recovery',"
    )
]

# 4. Replacements for generate-pdf-guide.js
pdf_replacements = [
    (
        "     .text('AN AUTHORITATIVE SOURCE SOURCING BLUEPRINT FOR B2B DEVELOPERS, HOTELIERS, AND GYM OWNERS IN INDIA', 60, 310, { width: 450, lineGap: 4 });",
        "     .text('AN AUTHORITATIVE SOURCING BLUEPRINT FOR B2B DEVELOPERS, HOTELIERS, AND GYM OWNERS', 60, 310, { width: 450, lineGap: 4 });"
    ),
    (
        "     .text('TechFit is the authorized commercial partner and dealer in India for world-class, premium strength, recovery, and cardio brands.', 50, y, { width: 495, lineGap: 4 });",
        "     .text('TechFit is a commercial partner and reseller for world-class, premium strength, recovery, and cardio brands.', 50, y, { width: 495, lineGap: 4 });"
    ),
    (
        "     .text('Authorized Global Sourcing & Distribution', 50, y);",
        "     .text('Global Brands Sourcing & Reselling', 50, y);"
    ),
    # PDF page 6 brands list updates:
    (
        "      title: 'BH Fitness — Commercial Gym Equipment (Spain)',\n      desc: 'A world-leading commercial fitness brand with over 100 years of engineering heritage. Sourced directly from Spain, featuring unmatched ergonomics, biomechanics, and premium touchscreen displays (Movemia and Inertia lines).'",
        "      title: 'BH Fitness — Commercial Gym Equipment (Spain)',\n      desc: 'A world-leading commercial fitness brand with over 100 years of engineering heritage. Supplied by TechFit as reseller, featuring unmatched ergonomics, biomechanics, and premium touchscreen displays (Movemia and Inertia lines).'"
    ),
    (
        "      title: 'Tunturi — Premium Strength & Wellness (Netherlands)',\n      desc: 'Pioneers of European fitness and wellness. Tunturi cardio and commercial strength stations represent absolute precision engineering, clean Scandinavian aesthetics, and commercial-grade durability.'",
        "      title: 'Tunturi — Premium Strength & Wellness (Netherlands)',\n      desc: 'Pioneers of European fitness and wellness. TechFit acts as reseller for Tunturi cardio and commercial strength stations representing absolute precision engineering, clean Scandinavian aesthetics, and commercial-grade durability.'"
    ),
    (
        "      title: 'Alteon — Clinical Biohacking & Recovery Suites',\n      desc: 'Premium longevity and recovery equipment, including monoplace hyperbaric oxygen chambers (HBOT), pure electric electric whole-body cryotherapy cabins, waterless dry float beds, and high-performance red light panels.'",
        "      title: 'Alteon — Clinical Biohacking & Recovery Suites',\n      desc: 'Premium longevity and recovery equipment, supplied by TechFit as the Official Distributor. Includes monoplace hyperbaric oxygen chambers (HBOT), pure electric whole-body cryotherapy cabins, waterless dry float beds, and high-performance red light panels.'"
    ),
    (
        "      title: 'California Fitness — Heavy Selectorized Strength',\n      desc: 'Maximum strength selectorized machines and plate-loaded stations. Engineered using thick-wall structural steel, heavy-duty pulleys, and precise biomechanical pivot angles for commercial power gyms.'",
        "      title: 'California Fitness — Heavy Selectorized Strength',\n      desc: 'Maximum strength selectorized machines and plate-loaded stations, supplied by TechFit as reseller. Engineered using thick-wall structural steel, heavy-duty pulleys, and precise biomechanical pivot angles for commercial power gyms.'"
    )
]

print("Applying changes to app.js...")
replace_in_file(app_js_path, app_js_replacements)

print("\nApplying changes to index.html...")
replace_in_file(index_html_path, index_html_replacements)

print("\nApplying changes to generate-seo-pages.mjs...")
replace_in_file(gen_seo_path, gen_seo_replacements)

print("\nApplying changes to generate-pdf-guide.js...")
replace_in_file(pdf_guide_path, pdf_replacements)
