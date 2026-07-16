import os
import re

def update_file(path):
    with open(path, "r") as f:
        text = f.read()

    # Replace specific variants:
    # 1. Homepage hero:
    text = text.replace(
        "Fitness, Wellness and<br>Sports Infrastructure Partner",
        "Fitness &amp; Wellness<br>Infrastructure Partner"
    )
    
    # 2. SEO Title strings
    text = text.replace(
        "India's Premier Gym & Sports Infrastructure Company",
        "India's Premier Fitness & Wellness Infrastructure Partner"
    )
    text = text.replace(
        "India\\'s Premier Gym & Sports Infrastructure Company",
        "India\\'s Premier Fitness & Wellness Infrastructure Partner"
    )
    text = text.replace(
        "India's Premier Gym &amp; Sports Infrastructure Company",
        "India's Premier Fitness &amp; Wellness Infrastructure Partner"
    )
    
    # 3. Footer / generic text
    text = text.replace(
        "India's premier gym, wellness &amp; sports infrastructure partner.",
        "India's premier fitness &amp; wellness infrastructure partner."
    )
    text = text.replace(
        "India's premier gym, wellness, and sports infrastructure",
        "India's premier fitness and wellness infrastructure"
    )
    
    # 4. In case of escaped variants
    text = text.replace(
        "India\\'s Premier Gym &amp; Sports Infrastructure Company",
        "India\\'s Premier Fitness &amp; Wellness Infrastructure Partner"
    )

    with open(path, "w") as f:
        f.write(text)

update_file("public/assets/app.js")
update_file("scripts/generate-seo-pages.mjs")
update_file("index.html")

print("Replacements done.")
