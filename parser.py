from bs4 import BeautifulSoup
import simplejson as json

f = open('templates/index.html')
html_doc = f.read()
soup = BeautifulSoup(html_doc, 'html.parser')

selects = soup.find_all('select')

structs = []
for select in selects:
    struct = {}
    key = select.attrs['id']
    struct[key] = {}
    for child in select.find_all('option'):
        struct[key][child.attrs['id']] = {'uri': child.string, 'child': {}}

    structs.append(struct)

print json.dumps(structs)
