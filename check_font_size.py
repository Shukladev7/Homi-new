import re

with open('../diabrowser_temp/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Search for html { or :root { definitions
matches = re.finditer(r'html\s*\{([^}]+)\}', content)
for m in matches:
    print("html:", m.group(0).strip())

matches = re.finditer(r':root\s*\{([^}]+)\}', content)
for m in matches:
    print(":root:", m.group(0).strip()[:300]) # print first 300 chars
