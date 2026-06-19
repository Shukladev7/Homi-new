import re

with open('../diabrowser_temp/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Find :root { ... }
root_match = re.search(r':root\s*\{([^}]+)\}', content)
if root_match:
    lines = root_match.group(1).split(';')
    print("=== Root Variables ===")
    for line in lines:
        if any(color_var in line for color_var in ['--primary', '--secondary', '--tertiary', '--quaternary', '--background', '--white', '--black', '--fill', '--stroke', '--light']):
            print(line.strip())
else:
    print(":root block not found.")
