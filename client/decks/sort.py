import json

# Read the JSON data from 'n3.json'
with open('n3.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Write the data to 'n3.js' as a JavaScript variable
with open('n3.js', 'w', encoding='utf-8') as js_file:
    js_file.write('const n3Data = ')
    json.dump(data, js_file, indent=2, ensure_ascii=False)
    js_file.write(';')
