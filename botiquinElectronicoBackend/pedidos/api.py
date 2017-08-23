from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ReadOnlyModelViewSet
from rest_framework.response import Response
from pedidos.models import PedidosSinReceta, PedidosConReceta
from pedidos.permissions import PedidosSinRecetaPermission
from pedidos.serializers import PedidosSinRecetaSerializer, PedidosConRecetaSerializer
from django.shortcuts import get_object_or_404


class PedidosSinRecetaViewSet(ModelViewSet):

    search_fields = ('id', 'cliente__id')
    filter_fields = ('id', 'cliente__id')
    filter_backends = (DjangoFilterBackend, SearchFilter, )
    serializer_class = PedidosSinRecetaSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            pedidos = PedidosSinReceta.objects.all()
            return pedidos

    def get_serializer_class(self):
        return PedidosSinRecetaSerializer

    def perform_create(self, serializer):
        serializer.save()

class PedidosConRecetaViewSet(ReadOnlyModelViewSet):
    search_fields = ('id', 'cliente__id')
    filter_fields = ('id', 'cliente__id')
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    serializer_class = PedidosConRecetaSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            pedidos = PedidosConReceta.objects.all()
            return pedidos

    def get_serializer_class(self):
        return PedidosConRecetaSerializer

    def perform_create(self, serializer):
        serializer.save()


