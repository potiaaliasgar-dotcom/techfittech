import re

def titleize(s):
    return s.replace('-', ' ').title().replace('Ncr', 'NCR')

base_cities = ['mumbai', 'pune', 'bangalore', 'delhi-ncr', 'hyderabad']
new_cities = ['chennai', 'kolkata', 'ahmedabad', 'jaipur', 'goa', 'chandigarh', 'surat', 'kochi']
all_cities = base_cities + new_cities

seo_map = {}

# 1. Commercial Gym Setup (8 new cities)
for city in new_cities:
    slug = f"commercial-gym-setup-{city}"
    city_name = titleize(city)
    seo_map[slug] = {
        'title': f"Commercial Gym Setup in {city_name} | Equipment Supplier",
        'desc': f"Turnkey commercial gym setup services in {city_name}. TechFit provides 3D layout design, premium BH Fitness equipment supply, and local pan-India AMC support.",
        'h1': f"Complete Commercial Gym Setup & Equipment Supplier in {city_name}",
        'lastmod': "2026-06-15",
        'img': "OG_WEIGHTS"
    }

# 2. Hotel Gym Setup (5 base cities)
for city in base_cities:
    slug = f"hotel-gym-setup-{city}"
    city_name = titleize(city)
    seo_map[slug] = {
        'title': f"Hotel Gym Setup & Equipment Supplier in {city_name}",
        'desc': f"Premium hotel and hospitality gym setup in {city_name}. We design space-efficient fitness centers with smart cardio and multi-stations to elevate guest wellness experiences.",
        'h1': f"Premium Hotel & Resort Gym Setup in {city_name}",
        'lastmod': "2026-06-15",
        'img': "OG_CARDIO"
    }

# 3. Society Gym Setup (5 base cities)
for city in base_cities:
    slug = f"society-gym-setup-{city}"
    city_name = titleize(city)
    seo_map[slug] = {
        'title': f"Society Gym Setup & Clubhouse Equipment in {city_name}",
        'desc': f"Turnkey clubhouse and society gym setup in {city_name}. Durable, safe, and cost-effective fitness equipment tailored for residential complexes and apartment towers.",
        'h1': f"Clubhouse & Society Gym Setup in {city_name}",
        'lastmod': "2026-06-15",
        'img': "OG_WEIGHTS"
    }

# 4. Corporate Gym Setup (5 base cities)
for city in base_cities:
    slug = f"corporate-gym-setup-{city}"
    city_name = titleize(city)
    seo_map[slug] = {
        'title': f"Corporate Gym Setup & Employee Wellness in {city_name}",
        'desc': f"Design and equip corporate gyms and employee wellness rooms in {city_name}. Boost productivity and employee retention with TechFit's corporate fitness setups.",
        'h1': f"Corporate Gym & Wellness Setup in {city_name}",
        'lastmod': "2026-06-15",
        'img': "OG_CARDIO"
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
    seo_map[slug] = {
        'title': f"{comp_brand} Alternative India | {techfit_brand} vs {comp_brand}",
        'desc': f"Comparing {comp_brand} with {techfit_brand} for commercial gyms in India. Analyze pricing, biomechanics, motor reliability, and after-sales service.",
        'h1': f"The Best Alternative to {comp_brand} in India: Why Commercial Gyms Choose {techfit_brand}",
        'lastmod': "2026-06-15",
        'img': "OG_WEIGHTS"
    }

seo_map_str = ""
for k, v in seo_map.items():
    desc_clean = v['desc'].replace("'", "\\'")
    h1_clean = v['h1'].replace("'", "\\'")
    block = f"  '{k}': {{\n    title: '{v['title']}',\n    desc: '{desc_clean}',\n    h1: '{h1_clean}',\n    lastmod: '{v['lastmod']}',\n    img: {v['img']}\n  }}"
    seo_map_str += ",\n" + block

filepath = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

target = """  'commercial-gym-setup-delhi-ncr': {
    title: "Commercial Gym Setup in Delhi NCR | Turnkey B2B Equipment | TechFit India",
    desc: "Turnkey B2B commercial gym setups, corporate fitness facilities, and custom functional training rigs in Delhi, Gurgaon, Noida, and the NCR.",
    h1: "Commercial Gym Setup in Delhi NCR: Turnkey Gym Sourcing & Alteon Recovery",
    lastmod: "2026-05-30",
    img: OG_RIGS
  }"""

replacement = target + seo_map_str

if target in content:
    content = content.replace(target, replacement)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Injected SEO_MAP correctly!")
else:
    print("Target block not found in generate-seo-pages.mjs")
