import re

index_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define SVG strings
phone_svg = '<svg style="width:20px;height:20px;margin-bottom:-4px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
chat_svg = '<svg style="width:20px;height:20px;margin-bottom:-4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>'
clipboard_svg = '<svg style="width:20px;height:20px;margin-bottom:-4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>'
cta_phone_svg = '<svg style="width:24px;height:24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'

# 1. Free Consultation
content = content.replace('📞 Free Consultation →', f'{phone_svg} Free Consultation →')

# 2. CTA icons
content = content.replace('<span class="cta-icon">📞</span>', f'<span class="cta-icon" style="display:flex;align-items:center;">{cta_phone_svg}</span>')
content = content.replace('<span class="cta-icon">💬</span>', f'<span class="cta-icon" style="display:flex;align-items:center;">{chat_svg.replace("20px","24px").replace("margin-bottom:-4px;","")}</span>')
content = content.replace('<span class="cta-icon">📋</span>', f'<span class="cta-icon" style="display:flex;align-items:center;">{clipboard_svg.replace("20px","24px").replace("margin-bottom:-4px;","")}</span>')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SVGs replaced!")
