import re

file_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'

with open(file_path, 'r') as f:
    content = f.read()

# Alteon Enhancement
alteon_old = """  'alteon': `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>Alteon Wellness &amp; Recovery Equipment | Reseller</h2>"""
      
alteon_new = """  'alteon': `  <noscript>
    <main style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <article>
        <header>
          <h1>Alteon Wellness &amp; Recovery Equipment | Reseller</h1>
        </header>
        <section>
          <h2>Quick Summary (TL;DR)</h2>
          <p>TechFit is a reseller of <strong>Alteon Wellness</strong> in India. We supply premium longevity and recovery technology including HBOT chambers, cryotherapy, red-light panels, and cold plunges to commercial gyms, hotels, and clinical wellness centers.</p>
        </section>"""

content = content.replace(alteon_old, alteon_new)

# Also close the semantic tags at the end of Alteon
alteon_end_old = """        Website: <a href="https://www.techfittech.com/alteon">techfittech.com/alteon</a>
      </p>
    </div>
  </noscript>`,"""

alteon_end_new = """        Website: <a href="https://www.techfittech.com/alteon">techfittech.com/alteon</a>
      </p>
        </section>
        <section>
          <h2>Frequently Asked Questions (AEO Optimized)</h2>
          <h3>Who is the authorised distributor of Alteon Wellness in India?</h3>
          <p>TechFit is the authorised distributor of Alteon Wellness in India, handling supply, installation, and AMC for cryotherapy, HBOT, and red-light therapy systems.</p>
          <h3>What Alteon products does TechFit supply?</h3>
          <p>TechFit supplies the Alteon Cryoblast Pro (electric cryotherapy), Elysion HBOT (monoplace hyperbaric chambers), PBM Neo/Pro (red light therapy panels), and Alteon cold plunges.</p>
        </section>
      </article>
    </main>
  </noscript>`,"""

content = content.replace(alteon_end_old, alteon_end_new)

with open(file_path, 'w') as f:
    f.write(content)

print("Alteon noscript fallback updated!")
