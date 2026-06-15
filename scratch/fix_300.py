import re

files = [
    '/Users/batman/Desktop/techfittech/index.html',
    '/Users/batman/Desktop/techfittech/public/assets/app.js',
    '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # index.html
    content = content.replace("300+ gyms delivered since 2016", "800+ installations delivered since 2014")
    content = content.replace("over 300 successful commercial gyms", "over 800 successful commercial gyms")
    content = content.replace("delivered since 2016", "delivered since 2014")

    # app.js
    content = content.replace("300+ gyms delivered", "800+ installations delivered")
    content = content.replace("300+ GYMS COMPLETED", "800+ INSTALLATIONS COMPLETED")
    content = content.replace("300+ Gyms Completed", "800+ Installations Completed")
    content = content.replace("300+ gym setups", "800+ installations")
    content = content.replace("300+ Gyms Delivered", "800+ Installations Delivered")
    content = content.replace(">300+<", ">800+<")
    content = content.replace("300+ facilities delivered", "800+ installations delivered")

    # generate-seo-pages.mjs
    content = content.replace("300 successful turnkeys", "800 successful turnkeys")
    content = content.replace("since 2016", "since 2014")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Copy updated!")
