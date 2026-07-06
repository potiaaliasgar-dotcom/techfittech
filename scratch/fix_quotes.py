import os

file_path = "/Users/batman/Desktop/techfittech/public/assets/app.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_content = content.replace("go('get-a-quote')", "go('contact')")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Replaced all 'get-a-quote' with 'contact'")
