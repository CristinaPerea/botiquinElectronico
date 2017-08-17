from django.contrib import admin
from pedidos.models import PedidosSinReceta, PedidosConReceta

admin.site.register(PedidosSinReceta)
admin.site.register(PedidosConReceta)