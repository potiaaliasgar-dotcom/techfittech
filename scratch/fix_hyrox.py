import re
import os

file_path = "/Users/batman/Desktop/techfittech/public/assets/app.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

start = content.find("function renderHyrox() {")
end = content.find("\n}\n", start) + 3

hyrox_code = content[start:end]

# 1. Replace the WhatsApp button class and add inline style for green
# Current: <a class="hx-btn hx-btn-white" href="https://wa.me/919820166910...
hyrox_code = hyrox_code.replace(
    '<a class="hx-btn hx-btn-white" href="https://wa.me/919820166910',
    '<a class="hx-btn" style="background:#25D366;color:#fff;border-color:#25D366;" href="https://wa.me/919820166910'
)

# 2. Replace text dashes in hyrox_code
# We only want to replace ' — ' and ' - ' and '—' with ', ' or space.
hyrox_code = hyrox_code.replace(' — ', ', ')
hyrox_code = hyrox_code.replace(' - ', ', ')
hyrox_code = hyrox_code.replace('—', ', ')

# Also fix "provider of HYROX, Centr" in the stat block to "provider of HYROX: Centr" maybe?
# "provider of HYROX, Centr" is fine.

# Replace the old hyrox code with the new one
new_content = content[:start] + hyrox_code + content[end:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("HYROX page updated: green WA button + dashes removed.")
