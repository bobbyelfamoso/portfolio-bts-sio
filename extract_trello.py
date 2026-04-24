import json
import re
import os

json_path = 'n:/project_curiculum/portfolio/QY2MUuDT - mon-tableau-trello.json'
if not os.path.exists(json_path):
    print(f"Error: {json_path} not found")
    exit(1)

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

cards = data.get('cards', [])
competencies = {}

for card in cards:
    name = card.get('name', '')
    desc = card.get('desc', '') or ''
    
    # Look for C followed by numbers
    matches = re.findall(r'C\d+', name + ' ' + desc)
    for m in matches:
        if m not in competencies:
            competencies[m] = []
        competencies[m].append(name)

if not competencies:
    print("No competencies found starting with 'C'")
else:
    for c in sorted(competencies.keys(), key=lambda x: int(x[1:]) if x[1:].isdigit() else 0):
        print(f"{c}:")
        for task in set(competencies[c]):
            print(f"  - {task}")
