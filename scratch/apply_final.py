import re

# 1. vercel.json updates
vercel_path = '/Users/batman/Desktop/techfittech/vercel.json'
with open(vercel_path, 'r', encoding='utf-8') as f:
    v_content = f.read()

new_redirects = '''  "redirects": [
    { "source": "/about-us", "destination": "/about", "permanent": true },
    { "source": "/about-us/", "destination": "/about", "permanent": true },
    { "source": "/jordan-fitness", "destination": "/free-weights", "permanent": true },
    { "source": "/jordan-fitness/", "destination": "/free-weights", "permanent": true },
    { "source": "/bendis-pilates", "destination": "/free-weights", "permanent": true },
    { "source": "/bendis-pilates/", "destination": "/free-weights", "permanent": true }
  ],'''

v_content = re.sub(r'  "redirects": \[[\s\S]*?  \],', new_redirects, v_content)

with open(vercel_path, 'w', encoding='utf-8') as f:
    f.write(v_content)

# 2. index.html updates
index_path = '/Users/batman/Desktop/techfittech/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    i_content = f.read()

# Remove Clarity
clarity_block = '''  <!-- Microsoft Clarity Tracking Code -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","your_clarity_project_id_placeholder");
  </script>
'''

i_content = i_content.replace(clarity_block, '')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(i_content)

print("done!")
