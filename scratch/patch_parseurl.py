import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# The target logic is:
#       if (validPages.includes(path) || path === '') {
#         page = path || 'home';
#       } else {

target = """      if (validPages.includes(path) || path === '') {"""
replacement = """      if (validPages.includes(path) || path === '' || path.startsWith('alteon/')) {"""

if target in app_js:
    app_js = app_js.replace(target, replacement)
    with open(app_js_path, 'w') as f:
        f.write(app_js)
    print("Patched parseUrl successfully!")
else:
    print("Could not find the target logic in parseUrl!")
