from urllib.request import Request, urlopen

import time
from bs4 import BeautifulSoup


url_base = 'http://www.hipocrates.com/vademe/'
url_base_medicamentos = url_base + 'sacapros.phtml?n='

def lista_letras(url_base):
    # contador_global = 1
    print("Obteniedo enlaces de letras")
    request = Request(url_base + '/sacamedi.phtml', headers={'User-Agent': 'Mozilla/5.0'})
    url = urlopen(request)
    soup = BeautifulSoup(url, 'html.parser')
    enlaces_letras = []
    for elem in soup.find_all('td'):
        for child in elem.children:
            for a in child.children:
                enlaces_letras.append(a['href'])
                # contador_global -= 1
                # if contador_global == 0:
                #     print("Obteniedo enlaces de letras")
                #     return enlaces_letras
    print("Obteniedo enlaces de letras")
    return enlaces_letras

def obtiene_enlaces_medicamentos(enlaces_letras, url_base):
    print("Obteniedo enlaces de medicamentos")
    enlaces_medicamentos = []
    lista_enlaces_completos = []
    for enlace in enlaces_letras:
        enlace_completo = url_base + enlace
        lista_enlaces_completos.append(enlace_completo)
    for enlace in lista_enlaces_completos:
        print("Obteniedo enlaces de medicamentos de: " + enlace)
        request = Request(enlace, headers={'User-Agent': 'Mozilla/5.0'})
        url = urlopen(request)
        soup = BeautifulSoup(url, 'html.parser')
        for elem in soup.find_all('td'):
            for child in elem.children:
                cont = 0
                for a in child.children:
                    if cont == 0:
                        enlace = a['href'][10:]
                        cont += 1
                        if enlace[0] is not '.':
                            enlaces_medicamentos.append(enlace)
    return enlaces_medicamentos

def obtiene_indice_medicamento(url_base, enlaces_medicamentos):
    print("Obteniedo indices de medicamentos")
    lista_ids = []
    fichero_indices = open('indices.txt', 'w')
    for enlace in enlaces_medicamentos:
        url = url_base + enlace
        url = url.replace(' ', '%20')
        request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        url = urlopen(request)
        soup = BeautifulSoup(url, 'html.parser')
        for elem in soup.find_all('td'):
            print('Obteniendo indices de ' + str(elem))
            for child in elem.children:
                if child.name == "font":
                    for form in child.children:
                        if form.name == "form":
                            for input in form.children:
                                if input.name == "input" and input['type'] == "hidden":
                                    value = input['value']
                                    lista_ids.append(value)
    print("Obtenidos indices")
    for item in lista_ids:
        fichero_indices.write("%s\n" % item)
    fichero_indices.close()
    return lista_ids

def obtiene_detalles_medicamentos(url_base_medicamentos, lista_ids):
    contador_errores = 0
    fichero_output = open('output.txt', 'wt')
    lista_ids = open('indices.txt', 'r')
    longitud = 14692
    contador = 0
    for id in lista_ids:
        try:
            url = url_base_medicamentos + id
            # print('Obteniendo datos del medicamento ' + url)
            print(id + ' porcentaje realizado ' + str((contador*100)/longitud))
            # time.sleep(1)
            request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            url = urlopen(request)
            soup = BeautifulSoup(url, 'html.parser')
            cont = 0
            td = soup.find_all("td")
            fichero_output.write(td[1].get_text() + "\n")
            fichero_output.write(td[5].get_text() + "\n")
            fichero_output.write(td[10].get_text() + "\n")
            htmlString = ''
            for tag in td[10].contents:
                htmlString += str(tag)
            fichero_output.write(htmlString + "\n")
            fichero_output.write("------------\n")
            contador += 1
        except:
            contador_errores += 1
            contador += 1
    fichero_output.close()
    print('Finalizado con: ' + contador_errores + " errores")

# enlaces_letras = lista_letras(url_base)
# enlaces_medicamentos = obtiene_enlaces_medicamentos(enlaces_letras, url_base)
# lista_ids = obtiene_indice_medicamento(url_base, enlaces_medicamentos)
lista_ids = []
obtiene_detalles_medicamentos(url_base_medicamentos, lista_ids)

