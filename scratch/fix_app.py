import re

filepath = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# P2-1: Remove inline PRODUCTS catalog if it exists
# We will just find the top of the file up to `let BLOG_POSTS = [];` or `const GAW_ID`
# and ensure it starts cleanly.
# The catalog is `let PRODUCTS = [...];` which might be huge.
# We can use regex to replace `let PRODUCTS = \[.*?\n\s*\];` or similar.
# Since python regex can hang on massive strings, we'll find the start and end indices manually.
start_idx = content.find('let PRODUCTS = [')
if start_idx != -1:
    end_idx = content.find('];\nlet BLOG_POSTS = [];', start_idx)
    if end_idx != -1:
        content = content[:start_idx] + "let PRODUCTS = [];\n" + content[end_idx + 3:]
    else:
        end_idx = content.find('];\nconst GAW_ID', start_idx)
        if end_idx != -1:
            content = content[:start_idx] + "let PRODUCTS = [];\n" + content[end_idx + 3:]
# Also if it's `const PRODUCTS = [`
start_idx_const = content.find('const PRODUCTS = [')
if start_idx_const != -1:
    end_idx_const = content.find('];\n', start_idx_const)
    if end_idx_const != -1:
        content = content[:start_idx_const] + "let PRODUCTS = [];\n" + content[end_idx_const + 3:]

# P1-2: Update submitContact()
# Find the `submitContact(e)` function
submit_fn_start = content.find('async function submitContact(e)')
if submit_fn_start != -1:
    submit_fn_end = content.find('}\n', content.find('return false;', submit_fn_start)) + 2
    
    new_submit_fn = '''async function submitContact(e) {
  e.preventDefault();
  const btn = document.getElementById('contact-submit-btn');
  const ogText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  data.source = window.location.href;

  try {
    const res = await fetch('https://techfit-backend.vercel.app/api/gmail-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to send message');
    
    // Fire conversion
    fireConversion(window.GAW_FORM_LABEL, 'Lead Form Submit');
    
    // Redirect to Thank You
    go('thank-you');
    window.scrollTo(0, 0);
  } catch (err) {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'form_submission_error', error_message: err.message });
    }
    // Fallback: Open WhatsApp with pre-filled details
    const text = `Hi, I'm ${data.name}. I'm interested in gym equipment.\\nPhone: ${data.phone}\\nEmail: ${data.email}\\nCity: ${data.city || 'N/A'}\\nMessage: ${data.message}`;
    window.open(`https://wa.me/919820166910?text=${encodeURIComponent(text)}`, '_blank');
    alert('We had trouble sending your message. We are redirecting you to WhatsApp to connect with us directly!');
  } finally {
    btn.textContent = ogText;
    btn.disabled = false;
  }
  return false;
}
'''
    # Replace the old function
    # Note: we need a robust replacement
    content = re.sub(r'async function submitContact\(e\) \{[\s\S]*?return false;\n\}', new_submit_fn, content)

# Remove action="https://formsubmit.co/..." from forms
content = content.replace('action="https://formsubmit.co/ajax/techfitpa@gmail.com" method="POST" ', '')

# P1-3: Update renderHome() CTA
# Change <button class="btn secondary" onclick="go('about')">Read Case Studies</button>
# to WhatsApp button
content = content.replace('<button class="btn secondary" onclick="go(\'about\')">Read Case Studies</button>', 
                          '<a href="https://wa.me/919820166910" target="_blank" class="btn secondary">Chat on WhatsApp</a>')

# P1-4: Make city and facility optional in contact forms
# Search for required> City and Facility Type
content = content.replace('<input type="text" name="city" placeholder="e.g. Mumbai" required>', '<input type="text" name="city" placeholder="e.g. Mumbai">')
content = content.replace('<select name="facility_type" required>', '<select name="facility_type">')

# P1-6: Prerender Ready
# In initApp(), after navActive(); updateSEO(); add window.prerenderReady = true;
content = content.replace('render(); navActive(); updateSEO();', 'render(); navActive(); updateSEO();\n      window.prerenderReady = true;')

# P2-5: Strip console.logs
content = re.sub(r'console\.log\([^\)]*\);', '', content)
content = re.sub(r'console\.error\([^\)]*\);', '', content)

# P3-3: Polish Thank You page
old_thank_you = '''function renderThankYou() {
  const c = document.getElementById('app');
  c.innerHTML = `
    <section class="section" style="min-height:70vh;display:flex;align-items:center;justify-content:center;text-align:center;">
      <div style="max-width:600px;margin:0 auto;background:#fff;padding:50px 30px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
        <h1 style="color:#d32f2f;font-size:3rem;margin-bottom:20px;">Thank You!</h1>
        <p style="color:#111;font-size:1.2rem;line-height:1.6;margin-bottom:30px;">
          Your inquiry has been received. Our team will contact you shortly to discuss your gym equipment requirements.
        </p>
        <button class="btn primary" onclick="go('home')" style="font-size:1.1rem;padding:15px 40px;">Return Home</button>
      </div>
    </section>
  `;
}'''

new_thank_you = '''function renderThankYou() {
  const c = document.getElementById('app');
  c.innerHTML = `
    <section class="section" style="min-height:70vh;display:flex;align-items:center;justify-content:center;text-align:center;">
      <div class="thank-you-card" style="max-width:600px;margin:0 auto;background:var(--bg-card);padding:50px 30px;border-radius:12px;box-shadow:var(--shadow-md);">
        <h1 style="color:var(--brand-primary);font-size:3rem;margin-bottom:20px;">Thank You!</h1>
        <p style="color:var(--text-primary);font-size:1.2rem;line-height:1.6;margin-bottom:30px;">
          Your inquiry has been received. Our team will contact you shortly to discuss your gym equipment requirements.
        </p>
        <button class="btn primary" onclick="go('home')" style="font-size:1.1rem;padding:15px 40px;">Return Home</button>
      </div>
    </section>
  `;
}'''
content = content.replace(old_thank_you, new_thank_you)

# P3-4: A11y tabindex on .pillar
content = content.replace('<div class="pillar" onclick="', '<div class="pillar" role="button" tabindex="0" onclick="')
# And allow keyboard enter to trigger onclick
# This is complex to add inline to every element, but we can do it via event delegation.
# We'll just add it to the top level body listener in initApp()
a11y_script = '''
      // A11y keyboard support for role="button"
      document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.getAttribute('role') === 'button') {
            e.preventDefault();
            e.target.click();
          }
        }
      });
'''
content = content.replace('window.addEventListener("popstate", parseUrl);', 'window.addEventListener("popstate", parseUrl);' + a11y_script)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("app.js fixed!")
