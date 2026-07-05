import json

with open('vercel.json', 'r') as f:
    config = json.load(f)

if 'rewrites' not in config:
    config['rewrites'] = []

# Check if rewrite already exists
exists = any(r.get('source') == '/alteon/(.*)' for r in config['rewrites'])
if not exists:
    config['rewrites'].append({
        "source": "/alteon/(.*)",
        "destination": "/index.html"
    })

with open('vercel.json', 'w') as f:
    json.dump(config, f, indent=2)

print("Vercel config updated.")
