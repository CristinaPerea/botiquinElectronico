from rest_framework import status
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from users.models import Cliente
from users.permissions import ClientePermission
from users.serializers import ClienteSerializer, ClienteSerializerConPassword


class ClienteViewSet(GenericViewSet):
    permission_classes = [ClientePermission]
    # pagination_class = PageNumberPagination
    serializer_class = ClienteSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            return Cliente.objects.all()

    def get_serializer_class(self):
        if self.action in ['create']:
            return ClienteSerializerConPassword
        # else:
        #     return UserSerializer
        return ClienteSerializer

    def list(self, request):
        self.check_permissions(request)
        # self.paginate_queryset(self.get_queryset())
        querySet = self.get_queryset()
        serializer = self.get_serializer(querySet, many=True)
        return Response(serializer.data)

    def create(self, request):
        '''
        Crea un usuario validandolo primero
        :param request:
        :return:
        '''
        # self.check_permissions(request)
        # Creamos un serializer con los datos del POST / data
        serializer = self.get_serializer(data=request.data)
        # Validamos el serializador como si fuese un form...
        if serializer.is_valid():
            # Guardamos el newUser
            new_user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)