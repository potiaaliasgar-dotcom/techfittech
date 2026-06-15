import json
import re
import os

with open('/Users/batman/Desktop/techfittech/public/assets/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract PRODUCTS
products_match = re.search(r'const PRODUCTS\s*=\s*(\[[\s\S]*?\]);', content)
if products_match:
    products_json = products_match.group(1)
    with open('/Users/batman/Desktop/techfittech/public/assets/products.json', 'w', encoding='utf-8') as f:
        f.write(products_json)
    # Remove PRODUCTS from app.js
    content = content[:products_match.start()] + "let PRODUCTS = [];\nlet BLOG_POSTS = [];\nlet BLOG_CONTENT = {};" + content[products_match.end():]
else:
    print("Could not find PRODUCTS")

# Extract BLOG_POSTS
blog_posts_match = re.search(r'const BLOG_POSTS\s*=\s*(\[[\s\S]*?\]);', content)
if blog_posts_match:
    blog_posts_str = blog_posts_match.group(1)
    # Convert JS object string to valid JSON using a dirty eval equivalent
    # Since it's valid JS but maybe not strict JSON (missing quotes on keys), 
    # we can't just json.loads. We will use node later to properly dump it, or just do it in Node.
    pass

with open('/Users/batman/Desktop/techfittech/scratch/extract_data.js', 'w', encoding='utf-8') as f:
    f.write("""
const fs = require('fs');
const path = require('path');

const appJsPath = '/Users/batman/Desktop/techfittech/public/assets/app.js';
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// 1. Extract PRODUCTS
const productsRegex = /const PRODUCTS\\s*=\\s*(\\[[\\s\\S]*?\\]);/;
const productsMatch = appJsContent.match(productsRegex);
if (productsMatch) {
  fs.writeFileSync('/Users/batman/Desktop/techfittech/public/assets/products.json', productsMatch[1]);
  appJsContent = appJsContent.replace(productsRegex, "let PRODUCTS = [];\\nlet BLOG_POSTS = [];\\nlet BLOG_CONTENT = {};");
  console.log("Extracted PRODUCTS");
}

// 2. Extract BLOG_POSTS
const blogPostsRegex = /const BLOG_POSTS\\s*=\\s*(\\[[\\s\\S]*?\\]);/;
const blogPostsMatch = appJsContent.match(blogPostsRegex);
if (blogPostsMatch) {
  // eval to get the object, then JSON stringify
  const blogPosts = eval(blogPostsMatch[1]);
  fs.writeFileSync('/Users/batman/Desktop/techfittech/public/assets/blogs.json', JSON.stringify(blogPosts, null, 2));
  appJsContent = appJsContent.replace(blogPostsRegex, "");
  console.log("Extracted BLOG_POSTS");
}

// 3. Extract BLOG_CONTENT
const blogContentRegex = /const BLOG_CONTENT\\s*=\\s*(\\{[\\s\\S]*?\\n\\s*\\});/;
const blogContentMatch = appJsContent.match(blogContentRegex);
if (blogContentMatch) {
  const blogContent = eval('(' + blogContentMatch[1] + ')');
  const blogsDir = '/Users/batman/Desktop/techfittech/public/assets/blogs';
  if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir);
  }
  for (const [slug, data] of Object.entries(blogContent)) {
    fs.writeFileSync(path.join(blogsDir, slug + '.md'), data.content);
  }
  appJsContent = appJsContent.replace(blogContentRegex, "");
  console.log("Extracted BLOG_CONTENT to markdown files");
}

fs.writeFileSync(appJsPath, appJsContent);
console.log("Updated app.js");
""")

print("Wrote extract_data.js")
