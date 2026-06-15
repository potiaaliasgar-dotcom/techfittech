import re

filepath = '/Users/batman/Desktop/techfittech/index.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# P1-6: window.prerenderReady = false
# Replace var defined = 'prerenderReady' in window ? window.prerenderReady : true;
# with var defined = false; window.prerenderReady = false;
content = content.replace("var defined = 'prerenderReady' in window ? window.prerenderReady : true;", "window.prerenderReady = false;")
content = content.replace("window.prerenderReady = defined;", "")

# P1-7: Remove hidden H1
content = re.sub(r'<h2 class="sr-h1" id="main-h1">[^<]*</h2>\s*', '', content)

# P1-9: Remove Clarity
clarity_regex = r'<!-- Microsoft Clarity -->[\s\S]*?</script>\s*'
content = re.sub(clarity_regex, '', content)

# P1-10: Trim global FAQ Schema. It's massive.
# Let's just keep the first 3 questions and close the array.
faq_start = content.find('{"@type": "FAQPage"')
if faq_start != -1:
    main_entity_start = content.find('"mainEntity": [', faq_start)
    if main_entity_start != -1:
        # Find the 4th '{ "@type": "Question"'
        q1 = content.find('{ "@type": "Question"', main_entity_start)
        q2 = content.find('{ "@type": "Question"', q1 + 1)
        q3 = content.find('{ "@type": "Question"', q2 + 1)
        q4 = content.find('{ "@type": "Question"', q3 + 1)
        if q4 != -1:
            # Find the end of the array ']' after the FAQ array
            # The global FAQ is inside the script tag.
            # We want to replace everything from q4 to the closing ']' with just ']'
            # But wait, it's safer to use regex to capture the whole FAQPage block and replace it.
            pass

# Let's do FAQ schema differently. Replace the entire FAQ block with a minimal one.
faq_regex = r'\{\s*"@type":\s*"FAQPage",\s*"mainEntity":\s*\[[\s\S]*?\]\s*\}'
minimal_faq = '''{
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is TechFit?", "acceptedAnswer": { "@type": "Answer", "text": "TechFit is India's leading manufacturer and supplier of premium commercial gym equipment." } },
        { "@type": "Question", "name": "Do you offer gym setup services?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide end-to-end commercial gym setup, including 3D layouts, flooring, and installation." } }
      ]
    }'''
content = re.sub(faq_regex, minimal_faq, content, count=1) # only replace the first one (global)

# P2-2: Add defer to marked.min.js
content = content.replace('<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>', '<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" defer></script>')

# P2-3: Update LCP preload from png to webp/avif
# Find <link rel="preload" as="image" href="/assets/images/hero/hero-bg.png" ...>
content = content.replace('href="/assets/images/hero/hero-bg.png"', 'href="/assets/images/hero/hero-bg.webp"')
content = content.replace('href="/assets/images/logo.png"', 'href="/assets/images/logo.webp"') # Just in case

# P3-1: Replace emojis with inline SVGs in mobile nav
# 🏠 -> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
# 📞 -> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
# 💬 -> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
# 📋 -> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>

content = content.replace('🏠 Home', '<svg style="width:20px;height:20px;margin-bottom:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Home')
content = content.replace('📞 Contact', '<svg style="width:20px;height:20px;margin-bottom:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Contact')
content = content.replace('📞 Call Us', '<svg style="width:18px;height:18px;margin-right:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Call Us')
content = content.replace('💬 WhatsApp', '<svg style="width:18px;height:18px;margin-right:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg> WhatsApp')
content = content.replace('📋 Get Quote', '<svg style="width:18px;height:18px;margin-right:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg> Get Quote')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html fixed!")
