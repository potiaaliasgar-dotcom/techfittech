import json, os, re

data_file = 'public/assets/alteon-data.js'
with open(data_file, 'r') as f:
    content = f.read()

# Manual mapping for obvious renames
mappings = {
    "assets/images/alteon/roll-slimmer-203.webp": "assets/images/alteon/fit-roll-slimmer-1600.webp",
    "assets/images/alteon/vibrashape-205.webp": "assets/images/alteon/fit-vibrashape-1600.webp",
    "assets/images/alteon/infrastep-202.webp": "assets/images/alteon/fit-infrastep-1600.webp",
    "assets/images/alteon/red-couch-oxy-208.webp": "assets/images/alteon/fit-red-couch-oxy-1600.webp",
    "assets/images/alteon/infrashape-horizontal-201.webp": "assets/images/alteon/fit-infrashape-1600.webp",
    "assets/images/alteon/red-couch-360-209.webp": "assets/images/alteon/redlight-glow-1600.webp",
    "assets/images/alteon/va-body-sculpt-210.webp": "assets/images/alteon/fit-bodyshape-v2-1600.webp",
    "assets/images/alteon/cryo-flow-mini-214.webp": "assets/images/alteon/local-cryotherapy-23.webp",
    "assets/images/alteon/cryo-flow-213.webp": "assets/images/alteon/local-cryotherapy-23.webp",
    "assets/images/alteon/halo-renew-longevity-capsule-206.webp": "assets/images/alteon/fit-halo-renew-1600.webp",
    "assets/images/alteon/single-person-hbot-al3v36-100.webp": "assets/images/alteon/hbot-lying-al3v36-1600.webp",
    "assets/images/alteon/cryo-local-polar-bear-212.webp": "assets/images/alteon/local-cryotherapy-23.webp",
    "assets/images/alteon/roll-slimmer-xs-204.webp": "assets/images/alteon/fit-roll-slimmer-xs-1600.webp",
    "assets/images/alteon/activshape-pilates-207.webp": "assets/images/alteon/fit-activshape-pilates-1600.webp",
    "assets/images/alteon/va-endoactiv-211.webp": "assets/images/alteon/fit-bodyshape-1600.webp",
    "assets/images/alteon/bodyshape-200.webp": "assets/images/alteon/fit-bodyshape-1600.webp",
    "assets/images/alteon/cryo-touch-215.webp": "assets/images/alteon/local-cryotherapy-23.webp",
    "assets/images/clients-partners.webp": "assets/images/other/placeholder.webp",
    "https://alteontech.com/assets/logo/logo10.png": ""
}

# Apply mappings
for old, new in mappings.items():
    content = content.replace(old, new)

# Write back
with open(data_file, 'w') as f:
    f.write(content)

print("alteon-data.js images updated.")
