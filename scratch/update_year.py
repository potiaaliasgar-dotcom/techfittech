import os

# Files to update
files = {
    '/Users/batman/Desktop/techfittech/index.html': [
        ('"foundingDate": "2016"', '"foundingDate": "2014"'),
        ('since its founding in 2016.', 'since its founding in 2014.')
    ],
    '/Users/batman/Desktop/techfittech/public/assets/app.js': [
        ('<h4 style="font-size:2.5rem;font-weight:900;color:var(--red);line-height:1;margin-bottom:0.5rem">2016</h4>', '<h4 style="font-size:2.5rem;font-weight:900;color:var(--red);line-height:1;margin-bottom:0.5rem">2014</h4>')
    ],
    '/Users/batman/Desktop/techfittech/public/llms.txt': [
        ('since 2016', 'since 2014'),
        ('**Founded:** 2016', '**Founded:** 2014')
    ],
    '/Users/batman/Desktop/techfittech/public/llms-full.txt': [
        ('since 2016', 'since 2014'),
        ('**Founded:** 2016', '**Founded:** 2014')
    ]
}

for path, replacements in files.items():
    if os.path.exists(path):
        with open(path, 'r') as f:
            content = f.read()
        
        for old_text, new_text in replacements:
            content = content.replace(old_text, new_text)
            
        with open(path, 'w') as f:
            f.write(content)
        print(f"Updated {path}")
    else:
        print(f"File not found: {path}")
