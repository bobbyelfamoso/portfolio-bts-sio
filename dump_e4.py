import openpyxl
import os

file_path = 'tableau_de_synthèse_E4.xlsx'
if os.path.exists(file_path):
    wb = openpyxl.load_workbook(file_path, data_only=True)
    sheet = wb.active
    print(f"Sheet: {sheet.title}")
    
    # Check realization rows
    for r in range(1, 100):
        row_values = []
        for c in range(1, 10):
            val = sheet.cell(row=r, column=c).value
            row_values.append(str(val) if val is not None else "")
        
        if any(row_values):
            line = f"Row {r}: {' | '.join(row_values)}"
            print(line.encode('utf-8', errors='replace').decode('utf-8'))
else:
    print("File not found")
