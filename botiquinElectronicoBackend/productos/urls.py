from rest_framework.routers import DefaultRouter
from productos.api import ProductosEnStockViewSet, ProductosViewSet, BuscaProspectoAPI, PendientesViewSet
from django.conf.urls import url, include

router = DefaultRouter()
router.register(r'productos_en_stock', ProductosEnStockViewSet, base_name='productos_en_stock')
router.register(r'pendientes', PendientesViewSet, base_name='pendientes')
router.register(r'', ProductosViewSet, base_name='productos')


urlpatterns = [
    url(r'', include(router.urls)),
]