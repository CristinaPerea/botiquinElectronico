from rest_framework.routers import DefaultRouter

from pedidos.api import PedidosSinRecetaViewSet, PedidosConRecetaViewSet
from productos.api import BuscaProspectoAPI
from users.api import ClienteViewSet
from django.conf.urls import url, include

router = DefaultRouter()
router.register(r'pedidos_sin_receta', PedidosSinRecetaViewSet, base_name='pedidos_sin_receta')
router.register(r'pedidos_con_receta', PedidosConRecetaViewSet, base_name='pedidos_con_receta')


urlpatterns = [
    url(r'', include(router.urls)),
]