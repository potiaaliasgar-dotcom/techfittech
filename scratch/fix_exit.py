import re

filepath = '/Users/batman/Desktop/techfittech/public/assets/exit-intent.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Modify Mobile Detection
content = content.replace(
    'if (elapsedSinceLoad < 3000 || elapsedSinceLoad > 30000) return;', 
    'if (elapsedSinceLoad < 12000 || elapsedSinceLoad > 60000) return;' # Wait 12 seconds
)
content = content.replace('scrollDiff > 80 && timeDiff < 100', 'scrollDiff > 120 && timeDiff < 150') # Make it slightly less sensitive

# Modify Desktop Detection to also require 12 seconds on page
desktop_old = '''  function initDesktopDetection() {
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY < 10) {
        showModal();
      }
    });
  }'''
desktop_new = '''  function initDesktopDetection() {
    const loadTime = Date.now();
    document.addEventListener('mouseleave', function (e) {
      const elapsedSinceLoad = Date.now() - loadTime;
      if (e.clientY < 10 && elapsedSinceLoad > 12000) {
        showModal();
      }
    });
  }'''
content = content.replace(desktop_old, desktop_new)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("exit-intent.js updated!")
