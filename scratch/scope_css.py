import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'
with open(app_js_path, 'r') as f:
    app_js = f.read()

# We need to find the <style id="alteon-styles">...</style> equivalent
# Actually it is in `style.textContent = \` ... \``
start_marker = "style.textContent = `"
end_marker = "        `;"

start_idx = app_js.find(start_marker)
if start_idx != -1:
    end_idx = app_js.find(end_marker, start_idx)
    if end_idx != -1:
        css = app_js[start_idx + len(start_marker):end_idx]
        
        # Now we need to scope this CSS to .alteon-page
        # A simple way to scope CSS without a proper parser:
        # split by }
        blocks = css.split('}')
        scoped_blocks = []
        for block in blocks:
            if not block.strip():
                continue
            # Some might be media queries
            if '@media' in block:
                # We won't fully parse media queries, just scope the selectors inside.
                # Actually, the reference CSS is simple enough. Let's do it manually.
                pass
        
        # It's much easier to just load the reference HTML again, use a mini-parser, or just prepend `.alteon-page ` to known tags.
        # But wait, we can just use the standard TechFit css for typography, and only add Alteon specific classes?
        # No, the brief says "Theme (must match reference exactly) - Headings Archivo 800-900 uppercase... Product titles Playfair... Cards 16px radius"
        pass
