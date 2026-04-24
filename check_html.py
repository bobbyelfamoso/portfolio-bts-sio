import re

with open('index.html', encoding='utf-8') as f:
    content = f.read()

div_open = len(re.findall(r'<div', content, re.IGNORECASE))
div_close = len(re.findall(r'</div', content, re.IGNORECASE))
section_open = len(re.findall(r'<section', content, re.IGNORECASE))
section_close = len(re.findall(r'</section', content, re.IGNORECASE))
ul_open = len(re.findall(r'<ul', content, re.IGNORECASE))
ul_close = len(re.findall(r'</ul', content, re.IGNORECASE))
ol_open = len(re.findall(r'<ol', content, re.IGNORECASE))
ol_close = len(re.findall(r'</ol', content, re.IGNORECASE))

print(f"DIV: {div_open} / {div_close}")
print(f"SECTION: {section_open} / {section_close}")
print(f"UL: {ul_open} / {ul_close}")
print(f"OL: {ol_open} / {ol_close}")
