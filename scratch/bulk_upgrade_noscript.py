import re

file_path = '/Users/batman/Desktop/techfittech/scripts/generate-seo-pages.mjs'

with open(file_path, 'r') as f:
    content = f.read()

# Extract NOSCRIPT_FALLBACKS object
match = re.search(r'const NOSCRIPT_FALLBACKS = \{(.*?)\};\n\nconst', content, re.DOTALL)
if not match:
    match = re.search(r'const NOSCRIPT_FALLBACKS = \{(.*?)\};\n', content, re.DOTALL)

if match:
    fallbacks_str = match.group(1)
    
    # We want to replace `<div style="...` with `<main style="...><article>`
    new_fallbacks = re.sub(
        r'<div (style="padding:2rem[^"]+")>', 
        r'<main \1>\n      <article>', 
        fallbacks_str
    )
    
    # Replace the very first <h2> in each fallback with a <header><h1>
    # Actually, simpler to just replace <h2> with <header><h1> and </h2> with </h1></header><section>
    # but only for the first occurrence.
    
    # Let's iterate through each key-value pair and transform it.
    entries = re.split(r"([ \t]*'[\w\-]+': `)", new_fallbacks)
    
    final_entries = []
    for entry in entries:
        if '<noscript>' in entry:
            # This is a value
            # Replace first <h2>
            entry = re.sub(r'<h2>(.*?)</h2>', r'<header>\n        <h1>\1</h1>\n      </header>\n      <section>', entry, count=1)
            # End of article
            entry = re.sub(r'</div>\n  </noscript>', r'</section>\n      </article>\n    </main>\n  </noscript>', entry)
            # Any <h3> can be converted to <h2>
            entry = entry.replace('<h3>', '</section>\n      <section>\n        <h2>').replace('</h3>', '</h2>')
            final_entries.append(entry)
        else:
            final_entries.append(entry)
            
    final_fallbacks_str = "".join(final_entries)
    
    content = content.replace(fallbacks_str, final_fallbacks_str)

    # Also update the default fallback in generatePage function
    default_fallback_old = """NOSCRIPT_FALLBACKS[route] || `  <noscript>
    <div style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <h2>TechFit | Gym Setup, Equipment &amp; Wellness Solutions</h2>
      <p>Gym, wellness &amp; sports infrastructure partner with 800+ installations delivered. Reseller for BH Fitness, Tunturi, California Fitness, and Alteon Wellness.</p>
      <p><strong>Services:</strong> Gym design &amp; layout, commercial equipment supply, custom fabrication of
        combat-sports equipment and CrossFit rigs, padel and pickleball courts, wellness and recovery technology from
        Alteon, installation, after-sales and AMC. Sister concern TechFit Active provides managed gym operations.</p>
    </div>
  </noscript>`"""

    default_fallback_new = """NOSCRIPT_FALLBACKS[route] || `  <noscript>
    <main style="padding:2rem;max-width:800px;margin:5rem auto;font-family:Arial,sans-serif;line-height:1.6">
      <article>
        <header>
          <h1>TechFit | Gym Setup, Equipment &amp; Wellness Solutions</h1>
        </header>
        <section>
          <h2>Quick Summary</h2>
          <p>Gym, wellness &amp; sports infrastructure partner with 800+ installations delivered. Reseller for BH Fitness, Tunturi, California Fitness, and Alteon Wellness.</p>
        </section>
        <section>
          <h2>Core Services</h2>
          <p><strong>Services:</strong> Gym design &amp; layout, commercial equipment supply, custom fabrication of
            combat-sports equipment and CrossFit rigs, padel and pickleball courts, wellness and recovery technology from
            Alteon, installation, after-sales and AMC. Sister concern TechFit Active provides managed gym operations.</p>
        </section>
      </article>
    </main>
  </noscript>`"""
  
    content = content.replace(default_fallback_old, default_fallback_new)

    with open(file_path, 'w') as f:
        f.write(content)
        print("NOSCRIPT_FALLBACKS globally upgraded to semantic HTML.")
else:
    print("Could not find NOSCRIPT_FALLBACKS block.")
