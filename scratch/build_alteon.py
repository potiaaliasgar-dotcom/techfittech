import re

app_js_path = '/Users/batman/Desktop/techfittech/public/assets/app.js'

with open(app_js_path, 'r') as f:
    app_js = f.read()

assignment_pattern = r"app\.innerHTML = \(views\[page\] \|\| render404\)\(\);"
assignment_match = re.search(assignment_pattern, app_js)

if assignment_match:
    new_assignment = """
        if (page === 'alteon' || page.startsWith('alteon/')) {
            const parts = page.split('/');
            if (parts.length === 3) {
                app.innerHTML = renderAlteonProduct(parts[1], parts[2]);
            } else if (parts.length === 2) {
                app.innerHTML = renderAlteonCategory(parts[1]);
            } else {
                app.innerHTML = renderAlteonHub();
            }
        } else {
            app.innerHTML = (views[page] || render404)();
        }
    """
    app_js = app_js[:assignment_match.start()] + new_assignment + app_js[assignment_match.end():]
    with open(app_js_path, 'w') as f:
        f.write(app_js)
    print("Assignment patched.")
else:
    print("Assignment not found.")

