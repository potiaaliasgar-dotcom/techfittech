import re
import os

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find BLOG_CONTENT
blog_content_match = re.search(r'const BLOG_CONTENT\s*=\s*(\{[\s\S]*?\n    \});', content)

if blog_content_match:
    bc_text = blog_content_match.group(1)
    
    # We need to extract each slug's content.
    # Pattern: 'slug': { ... content: `...` ... }
    # A safer approach is to split by `content: \`` and then find the closing backtick.
    
    posts = re.findall(r"'([^']+)'\s*:\s*\{[\s\S]*?content\s*:\s*`([\s\S]*?)`\s*\}", bc_text)
    
    blogs_dir = '/Users/batman/Desktop/techfittech/public/assets/blogs'
    os.makedirs(blogs_dir, exist_ok=True)
    
    for slug, markdown in posts:
        with open(os.path.join(blogs_dir, slug + '.md'), 'w', encoding='utf-8') as mf:
            mf.write(markdown.strip())
            
    # Now remove BLOG_POSTS and BLOG_CONTENT from app.js
    # We know products was already replaced with "let PRODUCTS = []; let BLOG_POSTS = []; let BLOG_CONTENT = {};"
    # We will just remove the trailing definitions of BLOG_POSTS and BLOG_CONTENT.
    
    bp_match = re.search(r'const BLOG_POSTS\s*=\s*\[[\s\S]*?\n    \];', content)
    if bp_match:
        content = content[:bp_match.start()] + content[bp_match.end():]
        
    bc_match = re.search(r'const BLOG_CONTENT\s*=\s*\{[\s\S]*?\n    \};', content)
    if bc_match:
        content = content[:bc_match.start()] + content[bc_match.end():]
        
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Extracted {len(posts)} posts and cleaned app.js")
else:
    print("Could not find BLOG_CONTENT")
