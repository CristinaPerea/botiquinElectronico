import os
from django.views import View
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from whoosh.filedb.filestore import FileStorage
from whoosh.index import open_dir
from whoosh.qparser import QueryParser

from productos.models import ProductoEnStock, Producto
from productos.serializers import ProductoEnStockSerializer, ProductoSerializer, ProductoWhooshSerializer
from django.shortcuts import get_object_or_404


class ProductosViewSet(ReadOnlyModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductosEnStockViewSet(GenericViewSet):

    search_fields = ('id_pedido_con_receta__id',)
    filter_backends = (SearchFilter,)
    # serializer_class = PedidosSinRecetaSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            productos_en_stock = ProductoEnStock.objects.all()
            return productos_en_stock

    def get_serializer_class(self):
        # serializer = ProductoEnStockSerializer(partial=True)
        # return serializer.__class__
        return ProductoEnStockSerializer

    def list(self, request):
        self.check_permissions(request)
        # self.paginate_queryset(self.get_queryset())
        querySet = self.get_queryset()
        serializer = self.get_serializer(querySet, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        producto_en_stock = get_object_or_404(ProductoEnStock, pk=pk)
        self.check_object_permissions(request, producto_en_stock)  # compruebo si el usuario autenticado puede hacer GET en este user
        serializer = ProductoEnStockSerializer(producto_en_stock)
        return Response(serializer.data)

    def update(self, request, pk):
        producto_en_stock = get_object_or_404(ProductoEnStock, pk=pk)
        serializer = self.get_serializer(instance=producto_en_stock, data=request.data, partial=True)
        if serializer.is_valid() and producto_en_stock.id_pedido_sin_receta is None:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BuscaProspectoAPI(APIView):

    def post(self, request):
        lista_ids = []
        terminos = request.data.get('termino')
        resultados = self.buscar(terminos)
        for resultado in resultados:
            # producto = Producto.objects.get(pk=resultado['id'])
            # lista_ids.append(Producto(id=resultado['id'], nombre_producto=resultado['hit']['nombre_producto'], con_receta=producto.con_receta, descripcion=resultado['texto_corto'], precio=producto.precio))
            lista_ids.append(Producto(id=resultado['id'], nombre_producto=resultado['hit']['nombre_producto'], descripcion=resultado['texto_corto']))
        serializador = ProductoWhooshSerializer(lista_ids, many=True)
        productos_serializados = serializador.data
        return Response(productos_serializados)

    def buscar(self, busqueda):
        print(os.getcwd())
        storage = FileStorage(os.getcwd() + "/scrapper/index")
        # ix = open_dir(storage)
        ix = storage.open_index()
        searcher = ix.searcher()
        parser = QueryParser("descripcion", ix.schema)
        myquery = parser.parse(busqueda)
        results = searcher.search(myquery, limit=50)
        results.fragmenter.maxchars = 300
        # Muestra mas contenido por delante y por detras del fragmento
        results.fragmenter.surround = 150

        formatted_results = []
        for hit in results:
            dict = {}
            dict['id'] = hit['id']
            try:
                valor = hit.highlights('descripcion', top=1)
            except UnicodeDecodeError:
                valor = 'Varias apariciones de <b class="match term0">'+ busqueda +'</b>'
            dict['texto_corto'] = valor
            dict['hit'] = hit
            formatted_results.append(dict)
        # searcher.close()
        return formatted_results

class BuscaNombreProductoAPI(APIView):

    def post(self, request):
        lista_ids = []
        termino = request.data.get('termino')
        resultados = self.buscarNombre(termino)
        for resultado in resultados:
            lista_ids.append(Producto(id=resultado['id'], nombre_producto=resultado['hit']['nombre_producto'], descripcion=resultado['texto_corto']))
        serializador = ProductoWhooshSerializer(lista_ids, many=True)
        productos_serializados = serializador.data
        return Response(productos_serializados)

    def buscarNombre(self, busqueda):
        storage = FileStorage(os.getcwd() + "/scrapper/index")
        ix = storage.open_index()
        searcher = ix.searcher()
        parser = QueryParser("nombre_producto", ix.schema)
        myquery = parser.parse(busqueda)
        results = searcher.search(myquery, limit=None)
        results.fragmenter.surround = 150

        formatted_results = []
        for hit in results:
            dict = {}
            dict['id'] = hit['id']
            try:
                valor = hit.highlights('nombre_producto', top=1)
            except UnicodeDecodeError:
                valor = 'Varias apariciones de <b class="match term0">' + busqueda + '</b>'
            dict['texto_corto'] = valor
            dict['hit'] = hit
            formatted_results.append(dict)
        # searcher.close()
        return formatted_results
