import os

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

old_text = "Official Partners &amp; Brands We Supply"
new_text = "Brands available with us"

app_js = app_js.replace(old_text, new_text)

with open(app_js_path, 'w') as f:
    f.write(app_js)

print("Replaced successfully.")
