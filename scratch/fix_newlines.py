import sys

filepath = 'public/assets/alteon-data.js'
with open(filepath, 'r') as f:
    content = f.read()

result = []
in_string = False
escape = False

for char in content:
    if char == '"' and not escape:
        in_string = not in_string
        result.append(char)
    elif char == '\\':
        escape = not escape
        result.append(char)
    else:
        escape = False
        if char == '\n' and in_string:
            # We are inside a string and found a newline!
            # Replace it with a space or \n
            result.append(' ')
        else:
            result.append(char)

new_content = ''.join(result)

with open(filepath, 'w') as f:
    f.write(new_content)

print("Multiline strings fixed.")
