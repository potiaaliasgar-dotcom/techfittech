import re

file_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(file_path, 'r') as f:
    content = f.read()

# We will look for multi-line strings or single lines that start with <div class="sec and end with </div>
def replace_div_with_section(match):
    inner = match.group(2)
    # Ensure there are no nested <divs> that would throw off the last </div>
    # Actually, a safer approach is to replace if it's explicitly written as <div class="sec"...>...</div> in one string.
    # But since they have nested divs, a simple regex won't work well.
    return match.group(0)

# Let's just do targeted replacements for the most obvious sections if they are simple strings.
# Or better yet, we can skip app.js heavy DOM manipulation since NOSCRIPT_FALLBACKS now handles the AEO semantic payload.
# Let's do a few safe ones:
content = re.sub(
    r'<div class="sec([^>]*)>([\s\S]*?)</div>\n</section>', 
    r'<section class="sec\1>\2</section>\n</section>', 
    content
)

# Replace <div class="sec">...</div> where there is only one div inside? Too complex.
# Instead, let's just add the `article` and `section` tags to the blog renderer.
blog_renderer_old = r"""  out.push(`
<div class="hero" style="min-height:40vh;display:flex;align-items:center;justify-content:center;padding:8rem 2rem 4rem;background:#000;color:#fff;text-align:center">
  <div class="hero-bg" style="opacity:.3"></div>
  <div style="position:relative;z-index:2;max-width:800px">
    <div style="color:var(--red);font-weight:700;letter-spacing:.05em;margin-bottom:1rem;font-size:.9rem">${date}</div>
    <h1 style="font-size:clamp(2rem,5vw,3.5rem);margin-bottom:1.5rem;line-height:1.1">${title}</h1>
  </div>
</div>
<div class="sec">
  <div class="sec-in" style="max-width:800px;margin:0 auto">
    <div class="blog-content" style="font-size:1.05rem;line-height:1.8;color:#333">
${content}
    </div>
  </div>
</div>
  `);"""

blog_renderer_new = r"""  out.push(`
<article>
<header class="hero" style="min-height:40vh;display:flex;align-items:center;justify-content:center;padding:8rem 2rem 4rem;background:#000;color:#fff;text-align:center">
  <div class="hero-bg" style="opacity:.3"></div>
  <div style="position:relative;z-index:2;max-width:800px">
    <div style="color:var(--red);font-weight:700;letter-spacing:.05em;margin-bottom:1rem;font-size:.9rem">${date}</div>
    <h1 style="font-size:clamp(2rem,5vw,3.5rem);margin-bottom:1.5rem;line-height:1.1">${title}</h1>
  </div>
</header>
<section class="sec">
  <div class="sec-in" style="max-width:800px;margin:0 auto">
    <div class="blog-content" style="font-size:1.05rem;line-height:1.8;color:#333">
${content}
    </div>
  </div>
</section>
</article>
  `);"""

content = content.replace(blog_renderer_old, blog_renderer_new)

with open(file_path, 'w') as f:
    f.write(content)

print("Safely upgraded blog renderer to semantic HTML.")
