from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import Cliente


class LogoutAPI(APIView):
    queryset = Cliente.objects.all()

    def get(self, request):
        # Borramos el token
        if hasattr(request.user, 'auth_token'):
            request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)