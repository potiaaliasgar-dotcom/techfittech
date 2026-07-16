import re
with open("public/assets/app.js", "r") as f:
    text = f.read()

text = re.sub(r",\s*'padel-pickleball'", "", text)
text = re.sub(r"\s*'padel-pickleball':\s*\{[\s\S]*?\},\s*(?='aqua':)", "\n      ", text)
text = re.sub(r"\s*\} else if \(key === 'padel-pickleball'\) \{[\s\S]*?(?=\} else if)", "", text)
text = re.sub(r"\s*'padel-pickleball':\s*renderPadel,", "", text)
text = re.sub(r"\s*'padel-pickleball':\s*'.*?',", "", text)
text = re.sub(r"\s*<div class=\"seg-card reveal\" onclick=\"go\('padel-pickleball'\)\">[\s\S]*?<\/div>\s*(?=<div class=\"seg-card)", "\n      ", text)
text = re.sub(r"\s*function renderPadel\(\) \{[\s\S]*?\}\s*(?=function renderAqua\(\) \{)", "\n\n    ", text)

with open("public/assets/app.js", "w") as f:
    f.write(text)
