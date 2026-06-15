import re

filepath = '/Users/batman/Desktop/techfittech/public/assets/exit-intent.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Update both 12000 delays to 25000
content = content.replace('12000', '25000')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("exit-intent.js updated to 25s!")
