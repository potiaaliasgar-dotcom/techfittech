import json
import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the `related` array for 'bh-fitness', 'free-weights', 'tunturi', 'california-fitness'
# and append the new competitor links.

# Let's write a targeted regex or just string replacement if we know the arrays.
# It's easier to use regex.

# Function to add items to a related array
def add_to_related(content, key, new_items):
    # Find the block for the key
    pattern = r"('" + key + r"':\s*\{[^\}]*?related:\s*\[)([^\]]*)(\])"
    def replace_func(match):
        existing = match.group(2).strip()
        items_to_add = []
        for item in new_items:
            if f"'{item}'" not in existing and f'"{item}"' not in existing:
                items_to_add.append(f"'{item}'")
        
        if not items_to_add:
            return match.group(0)
            
        if existing:
            new_array = existing + ", " + ", ".join(items_to_add)
        else:
            new_array = ", ".join(items_to_add)
            
        return match.group(1) + new_array + match.group(3)
    
    return re.sub(pattern, replace_func, content, flags=re.DOTALL)

bh_fitness_competitors = [
    'alternatives/star-trac-india',
    'alternatives/freemotion-india',
    'alternatives/matrix-fitness-india',
    'alternatives/jerai-fitness-india'
]

tunturi_competitors = [
    'alternatives/nautilus-india',
    'alternatives/true-fitness-india',
    'viva-vs-tunturi'
]

california_fitness_competitors = [
    'alternatives/cybex-india',
    'alternatives/hammer-strength-india',
    'alternatives/body-solid-india',
    'alternatives/hoist-fitness-india',
    'alternatives/american-fitness-india'
]

techfit_competitors = [
    'alternatives/atlantis-strength-india',
    'alternatives/fitline-india',
    'alternatives/being-strong-india'
]

content = add_to_related(content, 'bh-fitness', bh_fitness_competitors)
content = add_to_related(content, 'tunturi', tunturi_competitors)
content = add_to_related(content, 'california-fitness', california_fitness_competitors)
content = add_to_related(content, 'free-weights', california_fitness_competitors + techfit_competitors)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated internal links in app.js")
