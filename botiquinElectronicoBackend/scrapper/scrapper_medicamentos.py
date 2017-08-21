from urllib.request import Request, urlopen
import time
import os
from bs4 import BeautifulSoup
import sqlite3
import random

from whoosh.fields import Schema, TEXT, ID
from whoosh.index import create_in, open_dir


#Definición de URL base
url_base = 'http://www.hipocrates.com/vademe/'
url_base_medicamentos = url_base + 'sacapros.phtml?n='

def lista_letras(url_base):
    '''Función que devuelve todos los enlaces a las distintas web donde se encuentran los medicamentos
    ordenados por letras de inicio'''
    print("Obteniedo enlaces de letras")
    request = Request(url_base + '/sacamedi.phtml', headers={'User-Agent': 'Mozilla/5.0'})
    url = urlopen(request)
    soup = BeautifulSoup(url, 'html.parser')
    enlaces_letras = []
    for elem in soup.find_all('td'):
        for child in elem.children:
            for a in child.children:
                enlaces_letras.append(a['href'])
    print("Obteniedo enlaces de letras")
    return enlaces_letras

def obtiene_enlaces_medicamentos(enlaces_letras, url_base):
    '''Función que devuelve todos los enlaces a los medicamentos que se encuentran categorizados por letra de inicio'''
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
    '''Función que devuelve los íncides únicos de cada uno de los medicamentos para posteriormente formar la url de la que
    se tomarán los datos de dichos medicamentos'''
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

def obtiene_detalles_medicamentos(url_base_medicamentos):
    '''Función que obtiene los detalles del medicamento mediente la lectura de los íncides que se han obtenido anteriormente.
     Estos detalles se guardarán en un fichero output.txt'''
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
            request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            url = urlopen(request)
            soup = BeautifulSoup(url, 'html.parser')
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

def almacena_medicamentos():
    ''' Almacena los medicamentos en la base de datos y genera un índice'''
    schema = Schema(nombre_producto=TEXT(stored=True), descripcion=TEXT(stored=True), id=ID(stored=True), descripcion_html=TEXT(stored=True))
    if not os.path.exists("index"):
        os.mkdir("index")
    ix = create_in("index", schema)

    lista_url_medicamento = lista_urls_fotos()
    contador = 1
    nombre = ''
    precio = ''
    descripcion = ''
    descripcion_html = ''
    conn = sqlite3.connect('../db.sqlite3')
    cursor = conn.cursor()
    fichero_output = open('output.txt', 'r')
    for line in fichero_output:
        if contador == 1:
            nombre = line
            contador += 1
        elif contador == 2:
            precio = line
            contador += 1
        elif contador == 3:
            descripcion = line
            contador += 1
        elif contador == 4:
            descripcion_html = line
            contador += 1
        else:
            contador = 1
            id = insertar_medicamento(conn, cursor, nombre, precio, descripcion, descripcion_html, lista_url_medicamento)
            insertar_en_indice(nombre, descripcion, descripcion_html, id, ix)
    conn.close()

def insertar_medicamento(conn, cursor, nombre, precio, descripcion, descripcion_html, lista_url_medicamento):
    '''Inserta el medicamento con sus propiedades en la base de datos'''
    foto_producto = random.choice(lista_url_medicamento)
    con_receta = bool(random.getrandbits(1))
    duraciones = [15, 30, 60]
    duracion = random.choice(duraciones)
    cursor.execute("""INSERT INTO productos_producto (nombre_producto, foto_producto, con_receta, duracion, descripcion, precio, descripcion_html) 
                      VALUES (?,?,?,?,?,?,?)""", (nombre, foto_producto, con_receta, duracion, descripcion, precio, descripcion_html))
    conn.commit()
    id = cursor.lastrowid
    return id


def insertar_en_indice(nombre, descripcion, descripcion_html, id, ix):
    '''Función que inserta en el índice de Whoosh el producto'''
    writer = ix.writer()
    writer.add_document(nombre_producto=nombre, descripcion=descripcion, id=str(id), descripcion_html=descripcion_html)
    writer.commit()


def lista_urls_fotos():
    '''Función que devuelve una lista con las urls de las imágenes obtenidas de un fichero'''
    lista_urls_fotos = []
    fichero = open('urls_fotos_medicamentos.txt', 'r')
    for linea in fichero:
        lista_urls_fotos.append(linea.replace('\n', ''))
    fichero.close()
    return lista_urls_fotos

''' Función para extraer todas las letras disponibles '''
enlaces_letras = lista_letras(url_base)
''' Función para obtener los enlaces a los medicamentos de cada una de las letras '''
enlaces_medicamentos = obtiene_enlaces_medicamentos(enlaces_letras, url_base)
''' Función para extraer todos los identificadoes de la web para construir la URL de cada producto '''
lista_ids = obtiene_indice_medicamento(url_base, enlaces_medicamentos)
''' Función para extraer los prospectos dado el identificador extraido en la función obtiene_indice_medicamento'''
obtiene_detalles_medicamentos(url_base_medicamentos)
''' Función que almacena los medicamentos en la base de datos y crea el índice de Whoosh'''
almacena_medicamentos()



