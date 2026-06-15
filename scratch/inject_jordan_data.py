import json
import re

APP_JS = "/Users/batman/Desktop/techfittech/public/assets/app.js"

with open(APP_JS, 'r') as f:
    content = f.read()

# 1. Parse products from javascript array
m = re.search(r'const PRODUCTS\s*=\s*(\[.*?\]);', content, re.DOTALL)
if not m:
    raise Exception("Could not find PRODUCTS array in app.js")

products = json.loads(m.group(1))

# Jordan products to append
jordan_products = [
  {
    "b": "Jordan Fitness",
    "n": "Jordan Custom Urethane Dumbbells (Pair)",
    "c": "DUMBBELLS",
    "sec": "Free Weights",
    "sr": "DUMBBELLS",
    "s": "jordan-custom-urethane-dumbbells",
    "img": "assets/images/products/jordan/urethane-dumbbells.jpg",
    "d": "Premium commercial-grade urethane dumbbells featuring a solid steel core, encapsulated in high-grade German polyurethane. High durability, drop-resistant, and optimized for extreme commercial usage. Custom brand logo option available on request to elevate your gym branding."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Hex Rubber Dumbbells (Pair)",
    "c": "DUMBBELLS",
    "sec": "Free Weights",
    "sr": "DUMBBELLS",
    "s": "jordan-hex-rubber-dumbbells",
    "img": "assets/images/products/jordan/hex-rubber-dumbbells.jpg",
    "d": "Classic anti-roll hexagonal design dumbbells encapsulated in high-durability vulcanized rubber to protect gym floors and reduce noise. Features contoured chrome handles with premium knurling for a secure and comfortable grip."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Chrome Dumbbells (Pair)",
    "c": "DUMBBELLS",
    "sec": "Free Weights",
    "sr": "DUMBBELLS",
    "s": "jordan-chrome-dumbbells",
    "img": "assets/images/products/jordan/chrome-dumbbells.jpg",
    "d": "Elegant and highly polished hybrid chrome dumbbells. Features pressed fitted ends and chip-proof plating, providing an ultra-premium aesthetic and durability for upscale fitness centers and personal training studios."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Neoprene Studio Dumbbells (Pair)",
    "c": "DUMBBELLS",
    "sec": "Free Weights",
    "sr": "DUMBBELLS",
    "s": "jordan-neoprene-studio-dumbbells",
    "img": "assets/images/products/jordan/neoprene-dumbbells.jpg",
    "d": "Colour-coded neoprene dumbbells designed for studio classes, group X, and rehabilitation. Comfortable, warm grip that won't slip even when wet, with flat anti-roll edges to keep them in place."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Urethane Dual Grip Olympic Plates",
    "c": "PLATES",
    "sec": "Free Weights",
    "sr": "BARBELLS & PLATES",
    "s": "jordan-urethane-dual-grip-plates",
    "img": "assets/images/products/jordan/urethane-plates.jpg",
    "d": "Premium polyurethane Olympic weight plates with a stylish textured dual-grip design. Highly durable, rust-resistant, and floor-protecting, with a precision-machined stainless steel center ring for smooth loading."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Black Rubber Bumper Plates",
    "c": "PLATES",
    "sec": "Free Weights",
    "sr": "BARBELLS & PLATES",
    "s": "jordan-black-rubber-bumper-plates",
    "img": "assets/images/products/jordan/rubber-bumper-plates.jpg",
    "d": "High-grade vulcanized rubber bumper plates designed for Olympic lifting, CrossFit, and functional training. Excellent shock absorption and minimal bounce to protect bars, floors, and platforms."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Aluminium Training Bar (6ft)",
    "c": "BARBELLS",
    "sec": "Free Weights",
    "sr": "BARBELLS & PLATES",
    "s": "jordan-aluminium-training-bar",
    "img": "assets/images/products/jordan/aluminium-bar.jpg",
    "d": "Lightweight 6ft aluminium Olympic technique training bar (approx. 7kg). Perfect for teaching barbell biomechanics, Olympic lifts, and beginner training, featuring a hard chrome sleeve and knurled grip."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Neoprene Cast Iron Kettlebells",
    "c": "KETTLEBELLS",
    "sec": "Free Weights",
    "sr": "KETTLEBELLS",
    "s": "jordan-neoprene-kettlebells",
    "img": "assets/images/products/jordan/neoprene-kettlebells.jpg",
    "d": "Cast iron kettlebells wrapped in a durable, colour-coded neoprene base. Designed to protect gym flooring, reduce noise, and provide a textured steel handle for excellent grip during swings and squats."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Double Grip Medicine Ball",
    "c": "MEDICINE BALLS",
    "sec": "Free Weights",
    "sr": "FUNCTIONAL",
    "s": "jordan-double-grip-medicine-ball",
    "img": "assets/images/products/jordan/double-grip-medicine-balls.jpg",
    "d": "Textured rubber medicine balls featuring dual ergonomic handles. Provides the utility of a medicine ball with the grip security of a dumbbell, ideal for rotational training, core exercises, and circuits."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Sandbag Extreme",
    "c": "POWER BAGS",
    "sec": "Free Weights",
    "sr": "FUNCTIONAL",
    "s": "jordan-sandbag-extreme",
    "img": "assets/images/products/jordan/sandbags.jpg",
    "d": "Heavy-duty functional training sandbag with multiple handles for carrying, throwing, pressing, and dynamic exercises. Designed for high-intensity functional training and combat sports preparation."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Black Slam Ball",
    "c": "SLAM BALLS",
    "sec": "Free Weights",
    "sr": "FUNCTIONAL",
    "s": "jordan-black-slam-ball",
    "img": "assets/images/products/jordan/slam-balls.jpg",
    "d": "No-bounce slam balls with a textured outer shell for ultimate grip. Reinforced, thicker outer layer designed to withstand extreme impact on walls or floors during high-velocity power training."
  },
  {
    "b": "Jordan Fitness",
    "n": "aerobis revvll ONE Endless Rope Trainer",
    "c": "ROPE TRAINERS",
    "sec": "Free Weights",
    "sr": "FUNCTIONAL",
    "s": "jordan-aerobis-revvll-one",
    "img": "assets/images/products/jordan/rope-trainer.jpg",
    "d": "Premium German-engineered endless rope trainer featuring a 3.5m PU rope. Offers adjustable resistance dial and dual-direction pulling for unmatched upper-body strength and metabolic endurance training."
  },
  {
    "b": "Jordan Fitness",
    "n": "AIREX Corona 185 Slate Mat",
    "c": "MATS",
    "sec": "Free Weights",
    "sr": "ACCESSORIES & MATS",
    "s": "jordan-airex-corona-mat",
    "img": "assets/images/products/jordan/airex-corona-mat.jpg",
    "d": "The gold standard in physiotherapy, clinical rehab, and personal training. 185cm length, 15mm thickness closed-cell foam providing unmatched cushioning, joint protection, and Sanitized hygiene treatment."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan Ignite Pump X Urethane Studio Barbell Set",
    "c": "STUDIO SETS",
    "sec": "Free Weights",
    "sr": "ACCESSORIES & MATS",
    "s": "jordan-ignite-pump-set",
    "img": "assets/images/products/jordan/ignite-pump-set.jpg",
    "d": "Full premium 17.5kg studio barbell set featuring colour-coded urethane plates with anti-roll edges, a 30mm steel bar with grip markings, and quick-release spring collars. Perfect for group training and cardio-strength classes."
  },
  {
    "b": "Jordan Fitness",
    "n": "Jordan 10 Pair 2-Tier Dumbbell Rack",
    "c": "STORAGE RACKS",
    "sec": "Free Weights",
    "sr": "ACCESSORIES & MATS",
    "s": "jordan-10-pair-dumbbell-rack",
    "img": "assets/images/products/jordan/dumbbell-rack.jpg",
    "d": "Heavy-duty commercial dumbbell storage rack with an oval steel frame and integrated rubber saddles. Protects dumbbells from wear, provides a professional appearance, and fits 10 pairs."
  }
]

# Append Jordan products to products list
products.extend(jordan_products)

# Serialize back to string
new_products_js = "const PRODUCTS = " + json.dumps(products) + ";"

# Replace PRODUCTS in content
content = content[:m.start()] + new_products_js + content[m.end():]

# 2. Add Jordan Fitness metadata to brandMeta
# Let's locate the 'Bendis Pilates': { ... } block and insert 'Jordan Fitness' block after it.
bendis_pattern = r"'Bendis Pilates': \{.*?\n\s*\},"
m_meta = re.search(bendis_pattern, content, re.DOTALL)
if not m_meta:
    raise Exception("Could not find Bendis Pilates block in brandMeta")

jordan_meta = """
      'Jordan Fitness': {
        slug: 'jordan-fitness',
        badge: 'Premium UK Brand \\u00b7 Authorised Distributor India',
        desc: 'Jordan Fitness has been a leading UK designer and supplier of commercial functional fitness and free weight accessories since 1999. Trusted by elite health clubs, boutique studios, and corporate wellness spaces worldwide.',
        why: ['Premium commercial accessories \\u2014 Jordan urethane dumbbells, cast kettlebells and bumper plates', 'Authorized India distributor \\u2014 local warehousing, certified installations, and support', 'High-durability German polyurethane finishes and robust knurled steel cores', 'Suppliers to premium hotel fitness suites, boutique gyms, and combat sports academies'],
        sortOrder: ['DUMBBELLS', 'BARBELLS & PLATES', 'KETTLEBELLS', 'FUNCTIONAL', 'ACCESSORIES & MATS'],
        logo: ''
      },"""

insert_pos = m_meta.end()
content = content[:insert_pos] + jordan_meta + content[insert_pos:]

with open(APP_JS, 'w') as f:
    f.write(content)

print("Jordan products and brandMeta successfully injected into app.js!")
