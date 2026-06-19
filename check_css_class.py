import re

with open('../diabrowser_temp/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's search for classes
classes = ['h2--exposure', 'chroma-text', 'site-grid', 'p2--body', 'p1--body', 'button--cta', 'svg-dashed-border-pattern', 'dashed-border-svg']
for cls in classes:
    matches = re.finditer(r'(?:\.[a-zA-Z0-9_:-]+)*\.' + re.escape(cls) + r'(?:::[a-zA-Z0-9_:-]+)*\s*\{([^}]+)\}', content)
    print(f"=== {cls} ===")
    found = False
    for m in matches:
        print(m.group(0).strip())
        found = True
    if not found:
        # try regex for partial matching
        partial_matches = re.findall(r'[^\}]*?' + re.escape(cls) + r'[^\}]*?\{[^\}]+?\}', content)
        for pm in partial_matches[:3]:
            print(pm.strip())
            print("-" * 20)
