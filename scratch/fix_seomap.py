import re

filepath = '/Users/batman/Desktop/techfittech/scratch/generate_seo_content.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace re.sub with str.replace for seo_content
content = content.replace('seo_content = seo_content.replace("\\n};\\n\\n// Add dynamic routes", seo_insert)', 'seo_content = seo_content.replace("\\n  \'commercial-gym-setup-delhi-ncr\': {\\n    title: \\"Commercial Gym Setup in Delhi NCR | Turnkey B2B Equipment | TechFit India\\",\\n    desc: \\"Turnkey B2B commercial gym setups, corporate fitness facilities, and custom functional training rigs in Delhi, Gurgaon, Noida, and the NCR.\\",\\n    h1: \\"Commercial Gym Setup in Delhi NCR: Turnkey Gym Sourcing & Alteon Recovery\\",\\n    lastmod: \\"2026-05-30\\",\\n    img: OG_RIGS\\n  }\\n};\\n\\n// ==========================================\\n// STATICALLY PRE-RENDERED JSON-LD SCHEMAS\\n// ==========================================\\", \\n\\"  \'commercial-gym-setup-delhi-ncr\': {\\n    title: \'Commercial Gym Setup in Delhi NCR | Turnkey B2B Equipment | TechFit India\',\\n    desc: \'Turnkey B2B commercial gym setups, corporate fitness facilities, and custom functional training rigs in Delhi, Gurgaon, Noida, and the NCR.\',\\n    h1: \'Commercial Gym Setup in Delhi NCR: Turnkey Gym Sourcing & Alteon Recovery\',\\n    lastmod: \'2026-05-30\',\\n    img: OG_RIGS\\n  }\\" + seo_insert + \\"\\n};\\n\\n// ==========================================\\n// STATICALLY PRE-RENDERED JSON-LD SCHEMAS\\n// ==========================================\\")')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
