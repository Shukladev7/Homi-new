import re

with open('../diabrowser_temp/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's search for footer class or styles
matches = re.finditer(r'(?:\.[a-zA-Z0-9_:-]+)*footer[^\}]*?\{([^\}]+)\}', content)
for m in matches:
    print(m.group(0).strip())
    print("-" * 20)
