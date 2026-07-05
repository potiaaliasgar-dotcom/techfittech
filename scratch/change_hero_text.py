import os

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# Define the old text
old_text = """<span style="color:var(--red);">India\\'s Premier</span><br>Gym & Combat Sports<br>Infrastructure"""
new_text = """<span style="color:var(--red);">India\\'s Premier</span><br>Fitness, Wellness and<br>Sports Infrastructure Partner"""

if old_text in app_js:
    app_js = app_js.replace(old_text, new_text)
    print("Replaced successfully via exact string match.")
else:
    # Try an alternative matching
    import re
    old_pattern = re.compile(r'<span style="color:var\(--red\);">India\\\'s Premier</span><br>\s*Gym & Combat Sports<br>\s*Infrastructure')
    app_js, count = old_pattern.subn(new_text, app_js)
    if count > 0:
        print("Replaced successfully via regex match.")
    else:
        print("Could not find the hero text to replace!")

with open(app_js_path, 'w') as f:
    f.write(app_js)
