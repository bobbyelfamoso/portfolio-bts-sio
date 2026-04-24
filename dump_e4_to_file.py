import openpyxl
import os

file_path = 'tableau_de_synthèse_E4.xlsx'
if os.path.exists(file_path):
    wb = openpyxl.load_workbook(file_path, data_only=True)
    sheet = wb.active
    
    with open('e4_dump.txt', 'w', encoding='utf-8') as f:
        for r in range(1, 100):
            row_values = []
            for c in range(1, 10):
                val = sheet.cell(row=r, column=c).value
                row_values.append(str(val) if val is not None else "")
            
            if any([v.strip() for v in row_values]):
                f.write(f"Row {r}: {' | '.join(row_values)}\n")
    print("Dumped to e4_dump.txt")
else:
    print("File not found")
