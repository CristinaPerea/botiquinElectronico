from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from productos.models import ProductoEnStock
from productos.serializers import ProductoEnStockSerializer
from django.shortcuts import get_object_or_404

class ProductosEnStockViewSet(GenericViewSet):

    search_fields = ('id_pedido_con_receta__id',)
    filter_backends = (SearchFilter,)
    # serializer_class = PedidosSinRecetaSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            productos_en_stock = ProductoEnStock.objects.all()
            return productos_en_stock

    def get_serializer_class(self):
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
        serializer = self.get_serializer(instance=producto_en_stock, data=request.data)
        if serializer.is_valid() and producto_en_stock.id_pedido_sin_receta is None:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
