from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from pedidos.models import PedidosSinReceta
from pedidos.permissions import PedidosSinRecetaPermission
from pedidos.serializers import PedidosSinRecetaSerializer
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
    #
    # def create(self, request):
    #     '''
    #     Crea un usuario validandolo primero
    #     :param request:
    #     :return:
    #     '''
    #     # self.check_permissions(request)
    #     # Creamos un serializer con los datos del POST / data
    #     serializer = self.get_serializer(data=request.data)
    #     # Validamos el serializador como si fuese un form...
    #     if serializer.is_valid():
    #         # Guardamos el newUser
    #         new_user = serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    # def retrieve(self, request, pk):
    #     user = get_object_or_404(PedidosSinReceta, pk=pk)
    #     self.check_object_permissions(request, user)  # compruebo si el usuario autenticado puede hacer GET en este user
    #     serializer = PedidosSinRecetaSerializer(user)
    #     return Response(serializer.data)