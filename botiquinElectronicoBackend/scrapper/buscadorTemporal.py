from whoosh.index import open_dir
from whoosh.qparser import QueryParser


def buscar(busqueda):
    ix = open_dir("index")
    searcher = ix.searcher()
    parser = QueryParser("descripcion", ix.schema)
    myquery = parser.parse(busqueda)
    results = searcher.search(myquery, limit=50)
    print(results)
    print('Resultado: ' + str(len(results)))

def buscarNombre(busqueda):
    ix = open_dir("index")
    searcher = ix.searcher()
    parser = QueryParser("nombre_producto", ix.schema)
    myquery = parser.parse(busqueda)
    resultados = searcher.search(myquery, limit=None)
    print(resultados)

# buscar('pulmonar')
buscarNombre('ibuprofeno')
