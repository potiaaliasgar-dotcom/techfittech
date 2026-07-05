import sys

filepath = 'public/assets/alteon-data.js'
with open(filepath, 'r') as f:
    content = f.read()

# The error is:
# "Main Chamber to 64.96 x 57.09 x 65.35 in
# External Chamber to 39.4 x 27.6 x 60.5 in HBOT Air Conditioning to 16.4 x 15.9 x 34.3 in"

# Let's just fix it via regex or direct replace
bad_str = 'Main Chamber to 64.96 x 57.09 x 65.35 in\nExternal Chamber to 39.4 × 27.6 × 60.5 in HBOT Air Conditioning to 16.4 × 15.9 × 34.3 in'
good_str = 'Main Chamber to 64.96 x 57.09 x 65.35 in \\n External Chamber to 39.4 × 27.6 × 60.5 in HBOT Air Conditioning to 16.4 × 15.9 × 34.3 in'

if bad_str in content:
    content = content.replace(bad_str, good_str)
else:
    print("WARNING: Could not find exact bad string. Trying a more flexible regex.")
    import re
    # Find any unescaped newline inside a string.
    # Actually, we can just split the file by lines and look for lines that have an odd number of unescaped quotes?
    # Let's just replace the exact known substring.
    bad_str_2 = 'Main Chamber to 64.96 x 57.09 x 65.35 in\nExternal'
    good_str_2 = 'Main Chamber to 64.96 x 57.09 x 65.35 in \\n External'
    if bad_str_2 in content:
        content = content.replace(bad_str_2, good_str_2)
    else:
        print("Still couldn't find it.")

with open(filepath, 'w') as f:
    f.write(content)
print("Fix applied.")
