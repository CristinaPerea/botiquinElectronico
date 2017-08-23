"""botiquinElectronicoBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken import views

from productos.api import BuscaProspectoAPI
from users.views import LogoutAPI

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/users/', include('users.urls')),
    url(r'^api/v1/', include('pedidos.urls')),
    url(r'^api/v1/', include('pedidos.urls')),
    url(r'^api/v1/productos/', include('productos.urls')),
    # API Rest login
    url(r'^api/v1/login', views.obtain_auth_token, name="users_api_login"),
    url(r'^api/v1/logout', LogoutAPI.as_view(), name="users_api_logout"),
    url(r'^api/v1/busca_prospecto', BuscaProspectoAPI.as_view(), name='busca_prospecto')
]
