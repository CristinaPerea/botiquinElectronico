from rest_framework.routers import DefaultRouter
from users.api import ClienteViewSet
from django.conf.urls import url, include

router = DefaultRouter()
router.register(r'api/v1/users', ClienteViewSet, base_name='user')

urlpatterns = [
    url(r'', include(router.urls)),
]