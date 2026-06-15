import re

filepath = '/Users/batman/Desktop/techfittech/scratch/generate_seo_content.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the f-string issue again by preparing variables first
old_line = '''seo_map_str = ",\\n".join(f"  '{k}': {{\\n    title: '{v['title']}',\\n    desc: '\" + v['desc'].replace(\"'\", \"\\\\'\") + \"',\\n    h1: '\" + v['h1'].replace(\"'\", \"\\\\'\") + \"',\\n    lastmod: '{v['lastmod']}',\\n    img: {v['img']}\\n  }}" for k, v in seo_map.items())'''
new_line = '''seo_map_str = ""
for k, v in seo_map.items():
    desc_clean = v['desc'].replace("'", "\\\\'")
    h1_clean = v['h1'].replace("'", "\\\\'")
    block = f"  '{k}': {{\\n    title: '{v['title']}',\\n    desc: '{desc_clean}',\\n    h1: '{h1_clean}',\\n    lastmod: '{v['lastmod']}',\\n    img: {v['img']}\\n  }}"
    seo_map_str += block + ",\\n"
seo_map_str = seo_map_str.rstrip(",\\n")
'''

content = content.replace("seo_map_str = \",\\n\".join(f\"  '{k}': {{\\n    title: '{v['title']}',\\n    desc: '\" + v['desc'].replace(\"'\", \"\\\\'\") + \"',\\n    h1: '\" + v['h1'].replace(\"'\", \"\\\\'\") + \"',\\n    lastmod: '{v['lastmod']}',\\n    img: {v['img']}\\n  }}\" for k, v in seo_map.items())", new_line)

# Let me just rewrite the file fully to avoid replace issues
new_script = """import re
import json

base_cities = ['mumbai', 'pune', 'bangalore', 'delhi-ncr', 'hyderabad']
new_cities = ['chennai', 'kolkata', 'ahmedabad', 'jaipur', 'goa', 'chandigarh', 'surat', 'kochi']
all_cities = base_cities + new_cities

def titleize(s):
    return s.replace('-', ' ').title().replace('Ncr', 'NCR')

guides = {}
seo_map = {}
valid_pages = []

# 1. Commercial Gym Setup (8 new cities)
for city in new_cities:
    slug = f"commercial-gym-setup-{city}"
    city_name = titleize(city)
    valid_pages.append(slug)
    
    guides[slug] = {
        'title': f"Commercial Gym Setup in {city_name}: Cost, Equipment & Layout",
        'badge': "Commercial Setup",
        'desc': f"Turnkey commercial gym setup services in {city_name}. TechFit provides 3D layout design, premium BH Fitness equipment supply, and local pan-India AMC support.",
        'h1': f"Complete Commercial Gym Setup & Equipment Supplier in {city_name}",
        'author': "TechFit Turnkey Sourcing",
        'publishedDate': "2026-06-15",
        'category': "Commercial Gym Setup",
        'related': [{"slug": "commercial-gym-setup-cost-india", "name": "Commercial Gym Setup Cost India"}],
        'faqs': [
            {"q": f"How much does it cost to set up a commercial gym in {city_name}?", "a": f"Setting up a 2000 sq ft commercial gym in {city_name} typically costs between ₹15 Lakhs to ₹35 Lakhs, depending on whether you choose imported BH Fitness equipment or Indian-manufactured alternatives."},
            {"q": f"Do you provide gym equipment installation in {city_name}?", "a": f"Yes, TechFit provides end-to-end delivery, professional installation, and localized AMC maintenance support across {city_name} and surrounding regions."},
            {"q": "What is the minimum space required for a commercial gym?", "a": "A minimum of 1500 to 2000 square feet is recommended to comfortably accommodate cardio, selectorized strength, free weights, and functional training zones."}
        ],
        'htmlContent': f"<h2>Turnkey Gym Solutions in {city_name}</h2> <p>The fitness industry in {city_name} is growing rapidly, with increased demand for premium, modern commercial gym spaces. TechFit provides complete end-to-end commercial gym setup solutions tailored for the {city_name} market.</p> <h2>Strategic Layout & Floor Planning</h2> <p>We begin with comprehensive 3D spatial engineering. Our designs maximize floor ROI, ensuring optimal traffic flow between the cardiovascular zones, heavy free weight areas, and functional training rigs.</p> <h2>Premium Equipment Supply & Logistics</h2> <p>As the authorized distributor for premium brands like BH Fitness and Tunturi, we supply internationally engineered cardio and strength lines directly to your site in {city_name}. We also fabricate custom CrossFit rigs and MMA cages locally to save CapEx.</p> <h2>Local After-Sales Support</h2> <p>Gym profitability depends on equipment uptime. TechFit guarantees rapid response times and dedicated local AMC maintenance support in {city_name}, ensuring your treadmills and strength machines remain operational year-round.</p>"
    }
    seo_map[slug] = {
        'title': f"Commercial Gym Setup in {city_name} | Equipment Supplier",
        'desc': guides[slug]['desc'],
        'h1': guides[slug]['h1'],
        'lastmod': "2026-06-15",
        'img': "BASE + '/og/og-weights.jpg'"
    }

# 2. Hotel Gym Setup (5 base cities)
for city in base_cities:
    slug = f"hotel-gym-setup-{city}"
    city_name = titleize(city)
    valid_pages.append(slug)
    
    guides[slug] = {
        'title': f"Hotel & Resort Gym Setup in {city_name} | TechFit",
        'badge': "Hospitality Fitness",
        'desc': f"Premium hotel and hospitality gym setup in {city_name}. We design space-efficient fitness centers with smart cardio and multi-stations to elevate guest wellness experiences.",
        'h1': f"Premium Hotel & Resort Gym Setup in {city_name}",
        'author': "TechFit Hospitality",
        'publishedDate': "2026-06-15",
        'category': "Hotel Gym Setup",
        'related': [{"slug": "hotel-gym-setup-guide", "name": "Hotel Gym Setup Guide"}],
        'faqs': [
            {"q": f"What equipment is best for a hotel gym in {city_name}?", "a": "Hotels should focus on space-efficient, intuitive equipment. Smart cardio machines with screens (like BH Fitness Move Series), a dual adjustable pulley, and a set of urethane dumbbells are standard."},
            {"q": "How much space does a standard hotel gym need?", "a": "A standard boutique hotel fitness center can be fully equipped in 400 to 800 square feet using multi-functional dual cable stations and compact cardio units."},
            {"q": f"Do you service hotel gym equipment in {city_name}?", "a": f"Yes, we provide specialized preventative maintenance (AMC) contracts for hospitality clients in {city_name} to ensure 100% equipment uptime for guests."}
        ],
        'htmlContent': f"<h2>Elevating Hospitality Wellness in {city_name}</h2> <p>Modern travelers expect premium fitness and wellness amenities. TechFit partners with luxury hotels, boutique resorts, and corporate guesthouses in {city_name} to design high-end, space-efficient gym facilities.</p> <h2>Space-Efficient Dual-Function Equipment</h2> <p>Hotel gyms often operate in constrained spaces. We utilize intelligent, dual-function selectorized machines and multi-station cable crosses that offer full-body workouts without dominating the floor plan.</p> <h2>Smart Cardio & Guest Connectivity</h2> <p>We equip hotels with state-of-the-art cardiovascular machines featuring interactive touchscreens, screen mirroring, and virtual training apps. This ensures international guests in {city_name} can maintain their exact training routines while traveling.</p> <h2>Uncompromising Reliability</h2> <p>A broken treadmill leads to negative guest reviews. Our localized service teams in {city_name} provide rapid preventative maintenance, ensuring your hospitality fitness center remains a pristine, fully operational asset.</p>"
    }
    seo_map[slug] = {
        'title': f"Hotel Gym Setup & Equipment Supplier in {city_name}",
        'desc': guides[slug]['desc'],
        'h1': guides[slug]['h1'],
        'lastmod': "2026-06-15",
        'img': "BASE + '/og/og-cardio.jpg'"
    }

# 3. Society Gym Setup (5 base cities)
for city in base_cities:
    slug = f"society-gym-setup-{city}"
    city_name = titleize(city)
    valid_pages.append(slug)
    
    guides[slug] = {
        'title': f"Residential Society Gym Setup in {city_name} | TechFit",
        'badge': "Residential Fitness",
        'desc': f"Turnkey clubhouse and society gym setup in {city_name}. Durable, safe, and cost-effective fitness equipment tailored for residential complexes and apartment towers.",
        'h1': f"Clubhouse & Society Gym Setup in {city_name}",
        'author': "TechFit Residential",
        'publishedDate': "2026-06-15",
        'category': "Residential Setup",
        'related': [{"slug": "commercial-gym-setup-cost-india", "name": "Gym Setup Cost Guide"}],
        'faqs': [
            {"q": f"How much does a society gym setup cost in {city_name}?", "a": f"A comprehensive society gym in {city_name} typically ranges from ₹8 Lakhs to ₹20 Lakhs, depending on the clubhouse size and the ratio of cardio to strength equipment."},
            {"q": "What is the best flooring for a society gym on an upper floor?", "a": "For upper-floor clubhouse gyms, we mandate 20mm to 30mm high-density acoustic rubber flooring to completely dampen vibration and prevent weight-drop noise from disturbing residents below."},
            {"q": "Are commercial machines necessary for residential gyms?", "a": "Yes. While usage spikes primarily in the mornings and evenings, the total daily volume across hundreds of residents requires light-commercial or full-commercial grade motors and cables."}
        ],
        'htmlContent': f"<h2>Premium Clubhouse Amenities in {city_name}</h2> <p>A fully equipped, modern gym is now the most requested amenity in residential complexes across {city_name}. TechFit helps builders, developers, and managing committees design durable and safe society gyms.</p> <h2>High-Volume, Low-Maintenance Selection</h2> <p>Unlike commercial gyms with dedicated trainers, society gyms often operate unsupervised. We install heavy-duty, intuitive equipment that requires minimal adjustments, reducing the risk of injury and mechanical breakdown.</p> <h2>Acoustic Flooring Solutions</h2> <p>Noise complaints are the biggest issue for residential gyms. We supply premium vulcanized rubber flooring specifically designed to absorb heavy impacts and isolate acoustic vibrations from transferring to adjacent residential units in {city_name}.</p> <h2>Long-Term AMC for Societies</h2> <p>Managing committees change, but equipment needs constant care. TechFit offers structured, multi-year Annual Maintenance Contracts (AMC) in {city_name} to protect the society's capital investment.</p>"
    }
    seo_map[slug] = {
        'title': f"Society Gym Setup & Clubhouse Equipment in {city_name}",
        'desc': guides[slug]['desc'],
        'h1': guides[slug]['h1'],
        'lastmod': "2026-06-15",
        'img': "BASE + '/og/og-weights.jpg'"
    }

# 4. Corporate Gym Setup (5 base cities)
for city in base_cities:
    slug = f"corporate-gym-setup-{city}"
    city_name = titleize(city)
    valid_pages.append(slug)
    
    guides[slug] = {
        'title': f"Corporate Gym Setup & Wellness Rooms in {city_name}",
        'badge': "Corporate Wellness",
        'desc': f"Design and equip corporate gyms and employee wellness rooms in {city_name}. Boost productivity and employee retention with TechFit's corporate fitness setups.",
        'h1': f"Corporate Gym & Wellness Setup in {city_name}",
        'author': "TechFit Corporate",
        'publishedDate': "2026-06-15",
        'category': "Corporate Setup",
        'related': [{"slug": "wellness-solutions", "name": "Corporate Wellness Solutions"}],
        'faqs': [
            {"q": f"Why should a company in {city_name} invest in a corporate gym?", "a": "On-site corporate gyms drastically improve employee retention, reduce healthcare costs, and boost midday productivity. It is a massive talent acquisition asset in competitive hubs."},
            {"q": "Can you set up a gym in a standard office floor?", "a": "Yes, we specialize in corporate fit-outs using low-decibel cardio equipment and vibration-dampening flooring that integrates seamlessly into standard office acoustic environments."},
            {"q": "Do you provide wellness recovery equipment for corporate spaces?", "a": "Absolutely. Alongside standard gym gear, we integrate Alteon red-light therapy panels and zero-gravity massage chairs for active employee recovery and stress reduction."}
        ],
        'htmlContent': f"<h2>Investing in Employee Wellness in {city_name}</h2> <p>Forward-thinking companies in {city_name} understand that employee wellness directly correlates with productivity and retention. TechFit designs bespoke corporate fitness centers and active recovery wellness rooms tailored to modern office environments.</p> <h2>Office-Friendly Acoustic Designs</h2> <p>Corporate gyms require specialized acoustic planning. We utilize low-decibel AC motor treadmills and advanced impact-absorbing rubber flooring to ensure that heavy training does not disrupt adjoining conference rooms or executive suites in your {city_name} office.</p> <h2>Quick-Hit Functional Zones</h2> <p>Corporate employees often have limited 30-minute windows for exercise. We design high-efficiency functional training zones and HIIT circuits that allow employees to get maximum cardiovascular and strength benefits in minimal time.</p> <h2>Integrated Wellness & Recovery</h2> <p>Beyond traditional weights, we install advanced Alteon recovery technologies—including red light therapy and zero-gravity meditation chairs—providing stressed executives in {city_name} a dedicated space for mental decompression.</p>"
    }
    seo_map[slug] = {
        'title': f"Corporate Gym Setup & Employee Wellness in {city_name}",
        'desc': guides[slug]['desc'],
        'h1': guides[slug]['h1'],
        'lastmod': "2026-06-15",
        'img': "BASE + '/og/og-cardio.jpg'"
    }

# 5. Competitor Alternatives (7 pages)
competitors = [
    ("matrix-fitness-alternative-india", "Matrix Fitness", "BH Fitness"),
    ("cybex-alternative-india", "Cybex", "California Fitness"),
    ("hammer-strength-alternative-india", "Hammer Strength", "California Fitness"),
    ("nautilus-alternative-india", "Nautilus", "Tunturi"),
    ("cosco-vs-bh-fitness", "Cosco", "BH Fitness"),
    ("viva-vs-tunturi", "Viva Fitness", "Tunturi"),
    ("decathlon-domyos-vs-commercial-gym-equipment", "Decathlon Domyos", "Commercial Grade Brands")
]

for slug, comp_brand, techfit_brand in competitors:
    valid_pages.append(slug)
    
    guides[slug] = {
        'title': f"Best {comp_brand} Alternative in India: {techfit_brand}",
        'badge': "Brand Comparison",
        'desc': f"Comparing {comp_brand} with {techfit_brand} for commercial gyms in India. Analyze pricing, biomechanics, motor reliability, and after-sales service.",
        'h1': f"The Best Alternative to {comp_brand} in India: Why Commercial Gyms Choose {techfit_brand}",
        'author': "TechFit Equipment Analysis",
        'publishedDate': "2026-06-15",
        'category': "Equipment Comparisons",
        'related': [{"slug": "gym-equipment-suppliers-india-compared", "name": "India Gym Suppliers Compared"}],
        'faqs': [
            {"q": f"Is {techfit_brand} better than {comp_brand} for commercial use?", "a": f"For the Indian market, {techfit_brand} often provides superior ROI. It offers European-engineered biomechanics and heavy-duty AC motors at a more accessible price point than imported {comp_brand} units, with drastically faster spare parts availability."},
            {"q": f"How does the pricing of {comp_brand} compare to {techfit_brand}?", "a": f"{techfit_brand} is positioned as premium yet accessible. Gym owners typically save 20% to 35% on CapEx by choosing {techfit_brand} over {comp_brand} without sacrificing commercial durability."},
            {"q": f"Where can I buy {techfit_brand} in India?", "a": f"TechFit is the authorized turnkey distributor for {techfit_brand} in India, providing direct supply, installation, and comprehensive AMC warranties."}
        ],
        'htmlContent': f"<h2>Re-evaluating Commercial Gym Investments in India</h2> <p>When building a premium commercial gym, facility owners frequently benchmark against industry giants like {comp_brand}. However, import duties, prolonged spare part lead times, and massive brand premiums often drastically inflate CapEx and delay ROI. In India, {techfit_brand} has emerged as the premier high-yield alternative.</p> <h2>Biomechanical Engineering & Durability</h2> <p>While {comp_brand} is renowned for its heritage, {techfit_brand} utilizes cutting-edge European biomechanical engineering. The structural integrity, heavy-gauge steel framing, and self-lubricating phenolic decks in {techfit_brand} cardio equipment equal or surpass legacy commercial standards, ensuring decades of high-volume usage.</p> <h2>Total Cost of Ownership & CapEx ROI</h2> <p>The primary advantage of {techfit_brand} in the Indian market is the Total Cost of Ownership. By eliminating exorbitant international brand markups while maintaining rigorous commercial manufacturing tolerances, gym owners save substantial CapEx upfront, which can be reallocated to marketing and interior aesthetics.</p> <h2>The TechFit Service Advantage</h2> <p>Purchasing {comp_brand} through third-party traders often results in nightmare maintenance scenarios when proprietary motherboards fail. TechFit is the direct, authorized distributor for {techfit_brand}, maintaining a massive inventory of localized spare parts to ensure 48-hour resolution times across India.</p>"
    }
    seo_map[slug] = {
        'title': f"{comp_brand} Alternative India | {techfit_brand} vs {comp_brand}",
        'desc': guides[slug]['desc'],
        'h1': guides[slug]['h1'],
        'lastmod': "2026-06-15",
        'img': "BASE + '/og/og-weights.jpg'"
    }

# Generate the validPages insertion
valid_pages_str = ", ".join(f"'{p}'" for p in valid_pages)

# Generate GUIDES_DATA string
guides_data_str = ",\\n".join(f"'{k}': {json.dumps(v, indent=2)}" for k, v in guides.items())

# Generate SEO_MAP string
seo_map_str = ""
for k, v in seo_map.items():
    desc_clean = v['desc'].replace("'", "\\\\'")
    h1_clean = v['h1'].replace("'", "\\\\'")
    block = f"  '{k}': {{\\n    title: '{v['title']}',\\n    desc: '{desc_clean}',\\n    h1: '{h1_clean}',\\n    lastmod: '{v['lastmod']}',\\n    img: {v['img']}\\n  }}"
    seo_map_str += block + ",\\n"
seo_map_str = seo_map_str.rstrip(",\\n")

print("Generated data. Now injecting into files...")

# Inject into app.js
app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

valid_match = re.search(r"const validPages = \\[(.*?)\\];", app_content, re.DOTALL)
if valid_match:
    old_valid = valid_match.group(1)
    new_valid = old_valid + ", " + valid_pages_str
    app_content = app_content.replace(f"const validPages = [{old_valid}];", f"const validPages = [{new_valid}];")

guides_insert = ",\\n" + guides_data_str + "\\n};\\n\\n    const PRODUCTS_DATA ="
app_content = re.sub(r"\\n\\};\\n\\n    const PRODUCTS_DATA =", guides_insert, app_content)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

# Inject into generate-seo-pages.mjs
seo_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(seo_path, 'r', encoding='utf-8') as f:
    seo_content = f.read()

seo_insert = ",\\n" + seo_map_str + "\\n};\\n\\n// Add dynamic routes"
seo_content = re.sub(r"\\n\\};\\n\\n// Add dynamic routes", seo_insert, seo_content)

with open(seo_path, 'w', encoding='utf-8') as f:
    f.write(seo_content)

print("Injection complete!")
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_script)
