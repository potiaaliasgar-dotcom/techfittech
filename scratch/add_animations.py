import re

app_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add reveal to segment cards
content = content.replace('class="seg-card"', 'class="seg-card reveal"')
# Add reveal to brand cards
content = content.replace('class="brand-card"', 'class="brand-card reveal"')
# Add reveal to lineup cards
content = content.replace('class="lineup-card"', 'class="lineup-card reveal"')
# Add reveal to product items (if they use an inline style or class, usually we can just hook the intersection observer globally)
# Let's add the observer logic to initApp()

observer_code = """
      // Initialize scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
      
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      }, 500);
"""

# Find render(); navActive(); updateSEO(); inside initApp() and inject observer
content = content.replace('render(); navActive(); updateSEO();', 'render(); navActive(); updateSEO();' + observer_code)

# Add reveal to blog cards
content = content.replace('class="blog-card"', 'class="blog-card reveal"')

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Added micro-animations to app.js")
