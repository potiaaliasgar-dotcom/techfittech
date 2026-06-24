import re

file_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'

with open(file_path, 'r') as f:
    content = f.read()

services_old = """      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.techfittech.com/services" }
        ]
      }
    ]
  },
  'for-gyms': {"""

services_new = """      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What gym setup services does TechFit offer?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit provides turnkey gym setup services in India, including 2D/3D layout design, commercial equipment supply, custom MMA/CrossFit fabrication, sports flooring, and AMC maintenance." } },
          { "@type": "Question", "name": "Does TechFit install equipment across India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we handle professional gym installation, flooring setup, and AMC maintenance across all major Indian cities." } }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.techfittech.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.techfittech.com/services" }
        ]
      }
    ]
  },
  'for-gyms': {"""

content = content.replace(services_old, services_new)

with open(file_path, 'w') as f:
    f.write(content)

print("FAQPage schema added to services.")
