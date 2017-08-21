from whoosh.index import open_dir
from whoosh.qparser import QueryParser


def buscar(busqueda):
    ix = open_dir("index")
    searcher = ix.searcher()
    parser = QueryParser("descripcion", ix.schema)
    myquery = parser.parse(busqueda)
    results = searcher.search(myquery, limit=None)
    # for result in results:
    #     print(result)
    print(results)
    print('Resultado: ' + str(len(results)))
buscar('Comentarios')