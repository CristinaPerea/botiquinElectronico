from rest_framework.routers import DefaultRouter
from productos.api import ProductosEnStockViewSet
from django.conf.urls import url, include

router = DefaultRouter()
router.register(r'productos_en_stock', ProductosEnStockViewSet, base_name='user')

urlpatterns = [
    url(r'', include(router.urls)),
]