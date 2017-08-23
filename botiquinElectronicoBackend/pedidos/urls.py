from rest_framework.routers import DefaultRouter

from pedidos.api import PedidosSinRecetaViewSet
from users.api import ClienteViewSet
from django.conf.urls import url, include

router = DefaultRouter()
router.register(r'', PedidosSinRecetaViewSet, base_name='pedidos_sin_receta')

urlpatterns = [
    url(r'', include(router.urls)),
]