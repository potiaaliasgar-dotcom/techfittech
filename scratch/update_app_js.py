import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace init
init_target = """    parseUrl();
    render(); navActive(); updateSEO();
    // Global conversion tracking"""

init_replacement = """    async function initApp() {
      try {
        const [prodRes, blogRes] = await Promise.all([
          fetch('/assets/products.json'),
          fetch('/assets/blogs.json')
        ]);
        PRODUCTS = await prodRes.json();
        BLOG_POSTS = await blogRes.json();
      } catch (e) {
        console.error('Failed to load JSON data', e);
      }
      parseUrl();
      render(); navActive(); updateSEO();
    }
    initApp();

    // Global conversion tracking"""

content = content.replace(init_target, init_replacement)

# Update renderBlog to fetch markdown
# We need to find the renderBlog function. Let's just find and replace it.
# Wait, I don't know the exact string. Let's use regex.
render_blog_regex = r'function renderBlog\([^)]*\)\s*\{[\s\S]*?return `[\s\S]*?`;\n    \}'

new_render_blog = """function renderBlog(slug) {
      // Return a placeholder structure, then fetch and inject markdown
      setTimeout(async () => {
        try {
          const res = await fetch('/assets/blogs/' + slug + '.md');
          if (res.ok) {
            const md = await res.text();
            document.getElementById('blog-content-body').innerHTML = marked.parse(md);
          } else {
            document.getElementById('blog-content-body').innerHTML = '<p>Blog post not found.</p>';
          }
        } catch (e) {
          console.error(e);
        }
      }, 0);
      
      const post = BLOG_POSTS.find(p => p.slug === slug) || { title: '', category: '', date: '', readTime: '', image: '' };
      
      return `
<div class="phero" style="padding:5rem 1.5rem">
  <div class="sec-in" style="max-width:860px;margin:0 auto;text-align:center">
    <div class="phero-label">${post.category} &middot; ${post.date} &middot; ${post.readTime}</div>
    <h1 style="font-size:clamp(1.6rem,3.8vw,2.8rem);line-height:1.2">${post.title}</h1>
  </div>
</div>

<section class="sec">
  <div class="sec-in" style="max-width:860px;margin:0 auto">
    <img src="${post.image}" alt="${post.title}" style="width:100%;max-height:480px;object-fit:cover;margin-bottom:2.5rem;border-radius:.25rem" loading="lazy">
    <div id="blog-content-body" class="blog-body" style="font-size:1rem;line-height:1.85;color:var(--z700)">
      <!-- Markdown will be injected here -->
      Loading...
    </div>
    <div style="display:flex;justify-content:center;gap:1rem;margin-top:3rem;flex-wrap:wrap">
      <button class="btn-red" onclick="go('contact')">Start Your Project</button>
      <button class="btn-outline" onclick="go('blogs')">&larr; Back to Blog</button>
    </div>
  </div>
</section>
${footer()}
      `;
    }"""

content = re.sub(render_blog_regex, new_render_blog, content)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated app.js init and renderBlog")
